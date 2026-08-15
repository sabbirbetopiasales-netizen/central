/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { 
  SalesRep, 
  DepartmentData, 
  CompanyTargetSummary, 
  RegionRevenueData, 
  Deal, 
  TimeRange,
  AppUser,
  PeriodData
} from './types';
import { 
  INITIAL_REPS, 
  INITIAL_DEPARTMENTS, 
  INITIAL_SUMMARY, 
  INITIAL_REGIONS,
  INITIAL_USERS,
  INITIAL_PERIOD_DATA 
} from './data/initialData';
import { Header } from './components/Header';
import { PodiumTop10Card } from './components/PodiumTop10Card';
import { LeaderboardTable } from './components/LeaderboardTable';
import { TargetAchievementSummary } from './components/TargetAchievementSummary';
import { DepartmentAchievementCard } from './components/DepartmentAchievementCard';
import { LogDealModal } from './components/LogDealModal';
import { RepDetailsModal } from './components/RepDetailsModal';
import { ManageTeamModal } from './components/ManageTeamModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { 
  subscribeToPeriods, 
  savePeriodsToFirestore, 
  subscribeToUsers, 
  saveUsersToFirestore, 
  SyncedPeriodsData 
} from './services/firestoreSync';

export default function App() {
  // Current active time range ('month' | 'quarter' | 'year')
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  // Multi-Period Data State (Month, Quarter, YTD)
  const [periodsData, setPeriodsData] = useState<Record<TimeRange, PeriodData>>(() => {
    try {
      const saved = localStorage.getItem('office_leaderboard_periods_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      // Migrate v2 single month data if available
      const savedReps = localStorage.getItem('office_leaderboard_reps_v2');
      const savedDepts = localStorage.getItem('office_leaderboard_depts_v2');
      const savedSummary = localStorage.getItem('office_leaderboard_summary_v2');
      const savedRegions = localStorage.getItem('office_leaderboard_regions_v2');
      if (savedReps || savedDepts || savedSummary) {
        const monthData: PeriodData = {
          reps: savedReps ? JSON.parse(savedReps) : INITIAL_REPS,
          departments: savedDepts ? JSON.parse(savedDepts) : INITIAL_DEPARTMENTS,
          summary: savedSummary ? JSON.parse(savedSummary) : INITIAL_SUMMARY,
          regions: savedRegions ? JSON.parse(savedRegions) : INITIAL_REGIONS,
        };
        return {
          month: monthData,
          quarter: INITIAL_PERIOD_DATA.quarter as PeriodData,
          year: INITIAL_PERIOD_DATA.year as PeriodData,
        };
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PERIOD_DATA as Record<TimeRange, PeriodData>;
  });

  // Users for Role-Based Access Control (Admin vs Editor)
  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem('office_leaderboard_users_v2');
      if (saved) {
        const parsed: AppUser[] = JSON.parse(saved);
        // Ensure root admin has ID 11684 and password 51643600
        const hasValidAdmin = parsed.some(u => (u.id === '11684' || u.username === '11684') && u.password === '51643600');
        if (!hasValidAdmin) {
          const updated = parsed.map(u => {
            if (u.role === 'admin' || u.username === 'admin') {
              return {
                ...u,
                id: '11684',
                username: '11684',
                password: '51643600',
              };
            }
            return u;
          });
          if (!updated.some(u => u.id === '11684' || u.username === '11684')) {
            updated.unshift(INITIAL_USERS[0]);
          }
          return updated;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS;
  });

  // Currently Authenticated User (null if logged out / viewer)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('office_leaderboard_currentUser_v2');
      if (saved) {
        const parsed: AppUser = JSON.parse(saved);
        if (parsed.role === 'admin') {
          return {
            ...parsed,
            id: '11684',
            username: '11684',
            password: '51643600',
          };
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const isAdmin = currentUser?.role === 'admin';
  const isEditor = currentUser?.role === 'editor';
  const canEdit = isAdmin || isEditor;

  const [isLiveSimulation, setIsLiveSimulation] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isTvMode, setIsTvMode] = useState(false);
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string | null>(null);

  // Modals
  const [isLogDealOpen, setIsLogDealOpen] = useState(false);
  const [isManageTeamOpen, setIsManageTeamOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedRep, setSelectedRep] = useState<SalesRep | null>(null);
  const [preselectedRepIdForDeal, setPreselectedRepIdForDeal] = useState<string | undefined>(undefined);

  // Active period data projection
  const currentPeriod = periodsData[timeRange] || periodsData.month;
  const reps = currentPeriod.reps || INITIAL_REPS;
  const departments = currentPeriod.departments || INITIAL_DEPARTMENTS;
  const summary = currentPeriod.summary || INITIAL_SUMMARY;
  const regions = currentPeriod.regions || INITIAL_REGIONS;

  // Flag to avoid echo-writing cloud incoming snapshots back to the cloud
  const isIncomingFromCloudRef = useRef(false);
  const isIncomingUsersRef = useRef(false);
  const hasReceivedInitialCloudDataRef = useRef(false);
  const hasReceivedInitialUsersRef = useRef(false);

  // Subscribe to real-time Cloud Firestore updates
  useEffect(() => {
    // 1. Subscribe to Periods Data (Targets, Reps, Depts, Regions)
    const unsubPeriods = subscribeToPeriods((cloudData) => {
      if (cloudData && cloudData.month) {
        hasReceivedInitialCloudDataRef.current = true;
        isIncomingFromCloudRef.current = true;
        setPeriodsData(cloudData);
        setTimeout(() => {
          isIncomingFromCloudRef.current = false;
        }, 150);
      }
    });

    // 2. Subscribe to Users
    const unsubUsers = subscribeToUsers((cloudUsers) => {
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        hasReceivedInitialUsersRef.current = true;
        isIncomingUsersRef.current = true;
        setUsers(cloudUsers);
        setTimeout(() => {
          isIncomingUsersRef.current = false;
        }, 150);
      }
    });

    return () => {
      unsubPeriods();
      unsubUsers();
    };
  }, []);

  // Persist Current User Auth Session Locally
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('office_leaderboard_currentUser_v2', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('office_leaderboard_currentUser_v2');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Persist Users List to Local Storage & Cloud Firestore
  useEffect(() => {
    try {
      localStorage.setItem('office_leaderboard_users_v2', JSON.stringify(users));
      // Only push to cloud if this was a local modification by an authorized admin/editor
      if (isAdmin && !isIncomingUsersRef.current) {
        saveUsersToFirestore(users);
      }
    } catch (e) {
      console.error(e);
    }
  }, [users, isAdmin]);

  // Persist All Multi-Period Data (Month, Quarter, Year) to Local Storage & Cloud Firestore
  useEffect(() => {
    try {
      localStorage.setItem('office_leaderboard_periods_v4', JSON.stringify(periodsData));
      
      // If modification was done locally by authorized user/admin (not just received from cloud snapshot), push to Firestore
      if (canEdit && !isIncomingFromCloudRef.current) {
        savePeriodsToFirestore(periodsData as SyncedPeriodsData, currentUser?.username || 'admin', true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [periodsData, currentUser, canEdit]);

  // Live simulation ticker for office display
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      if (reps.length === 0) return;
      const randomIndex = Math.floor(Math.random() * reps.length);
      const randomRep = reps[randomIndex];
      const amounts = [15000, 25000, 45000, 60000, 80000];
      const dealAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const clients = ['Apex Logistics', 'Orbital AI', 'Vanguard Media', 'Summit Cloud', 'Prism Tech', 'Nordic Energy', 'Matrix Enterprise'];
      const clientName = clients[Math.floor(Math.random() * clients.length)];

      // For simulation ticks, don't write to cloud to preserve free tier quota
      isIncomingFromCloudRef.current = true;
      handleAddDeal({
        client: clientName,
        amount: dealAmount,
        type: 'Inbound',
        repId: randomRep.id,
        repName: randomRep.name,
        department: randomRep.department,
        region: randomRep.region,
      });
      setTimeout(() => {
        isIncomingFromCloudRef.current = false;
      }, 500);
    }, 12000);

    return () => clearInterval(interval);
  }, [isLiveSimulation, reps, timeRange]);

  // Time Label formatted
  const timeLabel = timeRange === 'month' ? 'Current Month' : timeRange === 'quarter' ? 'Q3 2026' : 'Year to Date';

  // Add Deal Handler - updates rep, department, summary and region simultaneously
  const handleAddDeal = (dealData: Omit<Deal, 'id' | 'date'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;

      // 1. Update Rep
      const updatedReps = active.reps.map((r) => {
        if (r.id === dealData.repId) {
          const currentDemos = typeof r.demosCount === 'number' ? r.demosCount : parseInt(String(r.demosCount).split('-')[1] || String(r.demosCount) || '0');
          return {
            ...r,
            wonDealsAmount: r.wonDealsAmount + dealData.amount,
            demosCount: currentDemos + 1,
            recentDeals: [newDeal, ...(r.recentDeals || [])],
          };
        }
        return r;
      });

      // 2. Update Department achievement
      const updatedDepts = active.departments.map((dept) => {
        if (dept.name === dealData.department) {
          return {
            ...dept,
            actual: dept.actual + dealData.amount,
            dealCount: (dept.dealCount || 0) + 1,
          };
        }
        return dept;
      });

      // 3. Update Overall Summary
      const updatedSummary: CompanyTargetSummary = {
        ...active.summary,
        currentAchievement: active.summary.currentAchievement + dealData.amount,
        newCustomers: (active.summary.newCustomers || 0) + 1,
        inboundPercent: dealData.type === 'Inbound' ? Math.min(95, active.summary.inboundPercent + 1) : active.summary.inboundPercent,
        outboundPercent: dealData.type === 'Outbound' ? Math.min(95, active.summary.outboundPercent + 1) : active.summary.outboundPercent,
        upgradePercent: dealData.type === 'Upgrade' ? Math.min(95, active.summary.upgradePercent + 1) : active.summary.upgradePercent,
      };

      // 4. Update Region
      const updatedRegions = active.regions.map((reg) => {
        if (
          reg.name.toLowerCase() === dealData.region.toLowerCase() ||
          reg.countryCode.toLowerCase() === dealData.region.toLowerCase()
        ) {
          const newActual = reg.actual + dealData.amount;
          return {
            ...reg,
            actual: newActual,
            actualLabel: `$${(newActual / 1000000).toFixed(2)}M`,
          };
        }
        return reg;
      });

      return {
        ...prev,
        [timeRange]: {
          reps: updatedReps,
          departments: updatedDepts,
          summary: updatedSummary,
          regions: updatedRegions,
        },
      };
    });
  };

  // Update Departments - automatically recalculates company target and achievement summary!
  const handleUpdateDepartments = (newDepts: DepartmentData[], targetPeriod: TimeRange = timeRange) => {
    setPeriodsData((prev) => {
      const active = prev[targetPeriod] || prev.month;
      const sumTarget = newDepts.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
      const sumActual = newDepts.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);

      const updatedSummary: CompanyTargetSummary = {
        ...active.summary,
        monthlyTarget: sumTarget > 0 ? sumTarget : active.summary.monthlyTarget,
        currentAchievement: sumActual > 0 ? sumActual : active.summary.currentAchievement,
      };

      return {
        ...prev,
        [targetPeriod]: {
          ...active,
          departments: newDepts,
          summary: updatedSummary,
        },
      };
    });
  };

  // Update Reps
  const handleUpdateReps = (newReps: SalesRep[], targetPeriod: TimeRange = timeRange) => {
    setPeriodsData((prev) => {
      const active = prev[targetPeriod] || prev.month;
      return {
        ...prev,
        [targetPeriod]: {
          ...active,
          reps: newReps,
        },
      };
    });
  };

  // Update Company Target Summary directly
  const handleUpdateSummary = (newSummary: CompanyTargetSummary, targetPeriod: TimeRange = timeRange) => {
    setPeriodsData((prev) => {
      const active = prev[targetPeriod] || prev.month;
      return {
        ...prev,
        [targetPeriod]: {
          ...active,
          summary: newSummary,
        },
      };
    });
  };

  // Update single Rep
  const handleUpdateRep = (updatedRep: SalesRep) => {
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      const updatedReps = active.reps.map((r) => (r.id === updatedRep.id ? updatedRep : r));
      return {
        ...prev,
        [timeRange]: {
          ...active,
          reps: updatedReps,
        },
      };
    });
  };

  // Add Rep
  const handleAddRep = (newRepData: Omit<SalesRep, 'id'>) => {
    const newRep: SalesRep = {
      ...newRepData,
      id: `rep-${Date.now()}`,
    };
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      return {
        ...prev,
        [timeRange]: {
          ...active,
          reps: [...active.reps, newRep],
        },
      };
    });
  };

  // Delete Rep
  const handleDeleteRep = (id: string) => {
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      return {
        ...prev,
        [timeRange]: {
          ...active,
          reps: active.reps.filter((r) => r.id !== id),
        },
      };
    });
  };

  // Update Company Target Quota
  const handleUpdateCompanyTarget = (newTarget: number, distributeToDepartments: boolean = false) => {
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      let updatedDepts = active.departments;

      if (distributeToDepartments && updatedDepts.length > 0) {
        const currentSum = updatedDepts.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
        if (currentSum > 0) {
          const ratio = newTarget / currentSum;
          updatedDepts = updatedDepts.map((d) => ({
            ...d,
            target: Math.round((Number(d.target) || 0) * ratio),
          }));
        } else {
          const perDept = Math.round(newTarget / updatedDepts.length);
          updatedDepts = updatedDepts.map((d) => ({
            ...d,
            target: perDept,
          }));
        }
      }

      return {
        ...prev,
        [timeRange]: {
          ...active,
          departments: updatedDepts,
          summary: {
            ...active.summary,
            monthlyTarget: newTarget,
          },
        },
      };
    });
  };

  // Update Individual Department Target - auto-simulates total company target!
  const handleUpdateDepartmentTarget = (deptId: string, newTarget: number) => {
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      const updatedDepts = active.departments.map((dept) =>
        dept.id === deptId ? { ...dept, target: newTarget } : dept
      );
      const sumTarget = updatedDepts.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
      const sumActual = updatedDepts.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);

      return {
        ...prev,
        [timeRange]: {
          ...active,
          departments: updatedDepts,
          summary: {
            ...active.summary,
            monthlyTarget: sumTarget,
            currentAchievement: sumActual,
          },
        },
      };
    });
  };

  // Update Individual Department Achievement - auto-simulates total company achievement!
  const handleUpdateDepartmentAchievement = (deptId: string, newActual: number) => {
    setPeriodsData((prev) => {
      const active = prev[timeRange] || prev.month;
      const updatedDepts = active.departments.map((dept) =>
        dept.id === deptId ? { ...dept, actual: newActual } : dept
      );
      const sumTarget = updatedDepts.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
      const sumActual = updatedDepts.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);

      return {
        ...prev,
        [timeRange]: {
          ...active,
          departments: updatedDepts,
          summary: {
            ...active.summary,
            monthlyTarget: sumTarget,
            currentAchievement: sumActual,
          },
        },
      };
    });
  };

  // Bulk update all departments
  const handleBulkUpdateDepartments = (newDepts: DepartmentData[]) => {
    handleUpdateDepartments(newDepts, timeRange);
  };

  // Reset Defaults across all periods and users
  const handleResetDefaults = () => {
    setPeriodsData(INITIAL_PERIOD_DATA as Record<TimeRange, PeriodData>);
    setUsers(INITIAL_USERS);
    setSelectedDepartmentFilter(null);
    localStorage.removeItem('office_leaderboard_periods_v4');
    localStorage.removeItem('office_leaderboard_reps_v2');
    localStorage.removeItem('office_leaderboard_depts_v2');
    localStorage.removeItem('office_leaderboard_summary_v2');
    localStorage.removeItem('office_leaderboard_regions_v2');
    localStorage.removeItem('office_leaderboard_users_v2');
  };

  // Open Admin Panel Handler (Guards for non-authenticated viewers)
  const handleOpenAdminPanel = () => {
    if (currentUser) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminPanelOpen(false);
    setIsManageTeamOpen(false);
  };

  const handleQuickLogDealForRep = (repId: string) => {
    setPreselectedRepIdForDeal(repId);
    setIsLogDealOpen(true);
  };

  return (
    <div className={`text-slate-100 transition-all ${
      isTvMode 
        ? 'h-screen w-screen overflow-hidden p-2 sm:p-3 bg-[#0b101b] flex flex-col justify-between select-none' 
        : 'min-h-screen bg-[#0b101b] p-4 sm:p-6 lg:p-8'
    }`}>
      <div className={`mx-auto flex flex-col justify-between ${
        isTvMode 
          ? 'w-full h-full max-w-[1920px] min-h-0 flex-1' 
          : 'max-w-[1600px] min-h-[96vh]'
      }`}>
        {/* Main Header */}
        <Header
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onOpenLogDeal={() => {
            setPreselectedRepIdForDeal(undefined);
            setIsLogDealOpen(true);
          }}
          onOpenManageTeam={() => {
            if (currentUser) {
              setIsManageTeamOpen(true);
            } else {
              setIsAdminLoginOpen(true);
            }
          }}
          onOpenAdminPanel={handleOpenAdminPanel}
          onResetData={handleResetDefaults}
          isLiveSimulation={isLiveSimulation}
          setIsLiveSimulation={setIsLiveSimulation}
          isSoundEnabled={isSoundEnabled}
          setIsSoundEnabled={setIsSoundEnabled}
          isTvMode={isTvMode}
          setIsTvMode={setIsTvMode}
          currentUser={currentUser}
          isAdmin={isAdmin}
          onOpenLogin={() => setIsAdminLoginOpen(true)}
          onLogout={handleLogout}
        />

        {/* Primary 4-Component Dashboard Layout (16:9 Fit in TV Mode) */}
        <main className={`${
          isTvMode 
            ? 'grid grid-cols-12 gap-2.5 flex-1 min-h-0 h-full' 
            : 'grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1'
        }`}>
          {/* LEFT COLUMN: 1. Top 10 Sellers Leaderboard + 2. All Sales Representatives & Manpower Roster */}
          <div className={`${
            isTvMode 
              ? 'col-span-7 flex flex-col gap-2.5 min-h-0 h-full' 
              : 'lg:col-span-7 flex flex-col gap-4 sm:gap-6'
          }`}>
            {/* Component 1: Top 10 Sellers Leaderboard */}
            <section className={isTvMode ? 'flex-[0.9] min-h-0' : 'flex-1'}>
              <PodiumTop10Card
                reps={reps}
                timeLabel={timeLabel}
                onSelectRep={(rep) => setSelectedRep(rep)}
                isTvMode={isTvMode}
              />
            </section>

            {/* Component 2: All Sales Representatives & Manpower Roster */}
            <section className={isTvMode ? 'flex-[1.1] min-h-0' : 'flex-1'}>
              <LeaderboardTable
                reps={reps}
                timeLabel={timeLabel}
                selectedDepartment={selectedDepartmentFilter}
                onSelectDepartment={setSelectedDepartmentFilter}
                onSelectRep={(rep) => setSelectedRep(rep)}
                onOpenAdmin={handleOpenAdminPanel}
                departments={departments}
                isAdmin={isAdmin}
                canEdit={canEdit}
                isTvMode={isTvMode}
                onQuickLogDeal={handleQuickLogDealForRep}
                onUpdateRep={handleUpdateRep}
                onDeleteRep={handleDeleteRep}
              />
            </section>
          </div>

          {/* RIGHT COLUMN: 3. Target & Achievement Summary + 4. Department Targets & Achievements */}
          <div className={`${
            isTvMode 
              ? 'col-span-5 flex flex-col gap-2.5 min-h-0 h-full' 
              : 'lg:col-span-5 flex flex-col gap-4 sm:gap-6'
          }`}>
            {/* Component 3: Target & Achievement Summary */}
            <section className={isTvMode ? 'flex-[0.85] min-h-0' : ''}>
              <TargetAchievementSummary
                summary={summary}
                departments={departments}
                timeLabel={timeLabel}
                onUpdateTarget={handleUpdateCompanyTarget}
                onOpenAdmin={handleOpenAdminPanel}
                isAdmin={isAdmin}
                canEdit={canEdit}
                isTvMode={isTvMode}
              />
            </section>

            {/* Component 4: Department Targets & Achievements */}
            <section className={isTvMode ? 'flex-[1.15] min-h-0' : 'flex-1'}>
              <DepartmentAchievementCard
                departments={departments}
                timeLabel={timeLabel}
                selectedDepartment={selectedDepartmentFilter}
                onSelectDepartment={setSelectedDepartmentFilter}
                onUpdateDepartmentTarget={handleUpdateDepartmentTarget}
                onUpdateDepartmentAchievement={handleUpdateDepartmentAchievement}
                onBulkUpdateDepartments={handleBulkUpdateDepartments}
                onOpenAdmin={handleOpenAdminPanel}
                isAdmin={isAdmin}
                canEdit={canEdit}
                isTvMode={isTvMode}
              />
            </section>
          </div>
        </main>

        {/* Footer Bar */}
        {!isTvMode && (
          <footer className="mt-4 pt-3 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Office Sales Performance & Department Quota Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{departments.length} Active Specialized Departments</span>
              <span>
                {currentUser 
                  ? `${currentUser.role === 'admin' ? 'Admin' : 'Editor'} Mode: Logged in as ${currentUser.name}`
                  : 'Viewer Mode: Read-Only'}
              </span>
              <span>Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </footer>
        )}
      </div>

      {/* Modals */}
      <LogDealModal
        isOpen={isLogDealOpen}
        onClose={() => {
          setIsLogDealOpen(false);
          setPreselectedRepIdForDeal(undefined);
        }}
        reps={reps}
        onAddDeal={handleAddDeal}
        isSoundEnabled={isSoundEnabled}
        initialRepId={preselectedRepIdForDeal}
      />

      <RepDetailsModal
        rep={selectedRep}
        onClose={() => setSelectedRep(null)}
        rank={selectedRep ? [...reps].sort((a, b) => b.wonDealsAmount - a.wonDealsAmount).findIndex((r) => r.id === selectedRep.id) + 1 : 1}
        canEdit={canEdit}
        isAdmin={isAdmin}
        onUpdateRep={handleUpdateRep}
        onDeleteRep={handleDeleteRep}
        onQuickLogDeal={(repId) => {
          setSelectedRep(null);
          handleQuickLogDealForRep(repId);
        }}
      />

      <ManageTeamModal
        isOpen={isManageTeamOpen}
        onClose={() => setIsManageTeamOpen(false)}
        reps={reps}
        onUpdateRep={handleUpdateRep}
        onAddRep={handleAddRep}
        onDeleteRep={handleDeleteRep}
        onResetDefaults={handleResetDefaults}
        departments={departments}
      />

      {/* Executive Admin / Editor Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        summary={summary}
        onUpdateSummary={handleUpdateSummary}
        departments={departments}
        onUpdateDepartments={handleUpdateDepartments}
        reps={reps}
        onUpdateReps={handleUpdateReps}
        onResetDefaults={handleResetDefaults}
        currentUser={currentUser}
        users={users}
        onUpdateUsers={setUsers}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {/* Role-Based Authentication & Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        users={users}
        onSuccessLogin={(user) => {
          setCurrentUser(user);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
