import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PeriodData, Deal, AppUser } from '../types';
import { INITIAL_PERIOD_DATA, INITIAL_USERS } from '../data/initialData';

export interface SyncedPeriodsData {
  month: PeriodData;
  quarter: PeriodData;
  year: PeriodData;
}

// Collection and Document paths
const PERIODS_DOC = doc(db, 'leaderboard_data', 'periods');
const USERS_DOC = doc(db, 'leaderboard_data', 'users');

let isQuotaExceeded = false;
let quotaListeners: ((exceeded: boolean) => void)[] = [];

export function getIsQuotaExceeded(): boolean {
  return isQuotaExceeded;
}

export function subscribeToQuotaStatus(listener: (exceeded: boolean) => void) {
  quotaListeners.push(listener);
  return () => {
    quotaListeners = quotaListeners.filter(l => l !== listener);
  };
}

function notifyQuotaExceeded() {
  if (!isQuotaExceeded) {
    isQuotaExceeded = true;
    quotaListeners.forEach(l => l(true));
  }
}

function isQuotaError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes('Quota exceeded') || msg.includes('resource-exhausted');
}

/**
 * Safely sanitize and merge cloud periods data to guarantee structural integrity
 */
function sanitizePeriodsData(raw: any): SyncedPeriodsData {
  const initial = INITIAL_PERIOD_DATA as unknown as SyncedPeriodsData;
  if (!raw) return initial;

  const sanitizeReps = (reps: any[], fallbackReps: any[]): any[] => {
    if (!Array.isArray(reps)) return fallbackReps;
    return reps.map((r, idx) => {
      const repName = String(r.name || r.displayName || 'Sales Representative');
      return {
        id: String(r.id || `rep-${Date.now()}-${idx}`),
        name: repName,
        displayName: repName,
        avatar: String(r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'),
        wonDealsAmount: typeof r.wonDealsAmount === 'number' ? r.wonDealsAmount : Number(r.wonDealsAmount) || 0,
        targetAmount: typeof r.targetAmount === 'number' ? r.targetAmount : Number(r.targetAmount) || 400000,
        department: String(r.department || 'Full Stack Development'),
        role: String(r.role || 'Account Executive'),
        region: String(r.region || 'USA'),
        demosCount: r.demosCount ?? 5,
        winRate: typeof r.winRate === 'number' ? r.winRate : Number(r.winRate) || 70,
        badges: Array.isArray(r.badges) ? r.badges : ['star'],
        recentDeals: Array.isArray(r.recentDeals) ? r.recentDeals : [],
        email: r.email || '',
        phone: r.phone || ''
      };
    });
  };

  const sanitizeDepartments = (depts: any[], fallbackDepts: any[]): any[] => {
    if (!Array.isArray(depts)) return fallbackDepts;
    return depts.map((d, idx) => ({
      id: String(d.id || `dept-${Date.now()}-${idx}`),
      name: String(d.name || 'Department'),
      shortName: String(d.shortName || d.name || 'Dept'),
      target: typeof d.target === 'number' ? d.target : Number(d.target) || 500000,
      actual: typeof d.actual === 'number' ? d.actual : Number(d.actual) || 0,
      color: String(d.color || '#3b82f6'),
      iconName: String(d.iconName || 'Briefcase'),
      dealCount: typeof d.dealCount === 'number' ? d.dealCount : Number(d.dealCount) || 0,
      leadRep: String(d.leadRep || 'Team Lead')
    }));
  };

  const sanitizePeriod = (period: any, fallback: PeriodData): PeriodData => {
    if (!period) return fallback;
    return {
      reps: sanitizeReps(period.reps, fallback.reps),
      departments: sanitizeDepartments(period.departments, fallback.departments),
      summary: period.summary && typeof period.summary.monthlyTarget === 'number' ? period.summary : fallback.summary,
      regions: Array.isArray(period.regions) && period.regions.length > 0 ? period.regions : fallback.regions,
    };
  };

  return {
    month: sanitizePeriod(raw.month, initial.month),
    quarter: sanitizePeriod(raw.quarter, initial.quarter),
    year: sanitizePeriod(raw.year, initial.year),
  };
}

/**
 * Listen to real-time changes to the leaderboard period data
 */
export function subscribeToPeriods(
  onData: (data: SyncedPeriodsData) => void,
  onError?: (err: unknown) => void
) {
  if (isQuotaExceeded) return () => {};

  try {
    return onSnapshot(
      PERIODS_DOC,
      (snapshot) => {
        if (snapshot.exists()) {
          const payload = snapshot.data();
          if (payload?.periodsData) {
            const clean = sanitizePeriodsData(payload.periodsData);
            try {
              localStorage.setItem('office_leaderboard_periods_v4', JSON.stringify(clean));
            } catch (e) {}
            onData(clean);
          }
        } else {
          // Only if cloud document is non-existent in a brand new database, seed with initial template
          savePeriodsToFirestore(INITIAL_PERIOD_DATA as unknown as SyncedPeriodsData, 'system-init');
        }
      },
      (error) => {
        if (isQuotaError(error)) {
          notifyQuotaExceeded();
          console.warn('Firestore Quota exceeded. Local persistence fallback active.');
        } else {
          handleFirestoreError(error, OperationType.GET, 'leaderboard_data/periods');
        }
        if (onError) onError(error);
      }
    );
  } catch (err) {
    if (isQuotaError(err)) {
      notifyQuotaExceeded();
    }
    return () => {};
  }
}

let periodsDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Save updated periods data to Firestore immediately or debounced
 */
export async function savePeriodsToFirestore(
  periodsData: SyncedPeriodsData,
  updatedBy: string = 'admin',
  immediate: boolean = false
) {
  if (isQuotaExceeded) return;

  if (periodsDebounceTimer) {
    clearTimeout(periodsDebounceTimer);
    periodsDebounceTimer = null;
  }

  const executeSave = async () => {
    try {
      await setDoc(PERIODS_DOC, {
        periodsData,
        updatedAt: new Date().toISOString(),
        updatedBy,
      }, { merge: true });
    } catch (error) {
      if (isQuotaError(error)) {
        notifyQuotaExceeded();
        console.warn('Firestore Quota reached during save. Saved to LocalStorage.');
      } else {
        handleFirestoreError(error, OperationType.WRITE, 'leaderboard_data/periods');
      }
    }
  };

  if (immediate) {
    await executeSave();
  } else {
    periodsDebounceTimer = setTimeout(executeSave, 150);
  }
}

/**
 * Listen to real-time changes to the user accounts list
 */
export function subscribeToUsers(
  onData: (users: AppUser[]) => void,
  onError?: (err: unknown) => void
) {
  if (isQuotaExceeded) return () => {};

  try {
    return onSnapshot(
      USERS_DOC,
      (snapshot) => {
        if (snapshot.exists()) {
          const payload = snapshot.data();
          if (Array.isArray(payload?.users) && payload.users.length > 0) {
            let cleanUsers: AppUser[] = payload.users;
            // Guarantee admin 11684 exists
            if (!cleanUsers.some(u => u.id === '11684' || u.username === '11684')) {
              cleanUsers = [INITIAL_USERS[0], ...cleanUsers];
            }
            try {
              localStorage.setItem('office_leaderboard_users_v2', JSON.stringify(cleanUsers));
            } catch (e) {}
            onData(cleanUsers);
          }
        } else {
          saveUsersToFirestore(INITIAL_USERS);
        }
      },
      (error) => {
        if (isQuotaError(error)) {
          notifyQuotaExceeded();
          console.warn('Firestore Quota reached. Using local users cache.');
        } else {
          handleFirestoreError(error, OperationType.GET, 'leaderboard_data/users');
        }
        if (onError) onError(error);
      }
    );
  } catch (err) {
    if (isQuotaError(err)) {
      notifyQuotaExceeded();
    }
    return () => {};
  }
}

let usersDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Save updated user accounts list to Firestore
 */
export async function saveUsersToFirestore(users: AppUser[]) {
  if (isQuotaExceeded) return;

  if (usersDebounceTimer) {
    clearTimeout(usersDebounceTimer);
  }

  usersDebounceTimer = setTimeout(async () => {
    try {
      await setDoc(USERS_DOC, {
        users,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      if (isQuotaError(error)) {
        notifyQuotaExceeded();
        console.warn('Firestore Quota reached during users save.');
      } else {
        handleFirestoreError(error, OperationType.WRITE, 'leaderboard_data/users');
      }
    }
  }, 500);
}
