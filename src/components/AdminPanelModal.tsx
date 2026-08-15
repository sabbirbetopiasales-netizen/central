import React, { useState, useEffect } from 'react';
import { SalesRep, DepartmentData, CompanyTargetSummary, AppUser, UserRole, TimeRange } from '../types';
import { 
  X, 
  ShieldCheck, 
  Target, 
  Users, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDownRight, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  Image as ImageIcon,
  Search,
  Check,
  Briefcase,
  Mail,
  Calendar,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Calculator,
  ArrowUpRight,
  SlidersHorizontal
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: CompanyTargetSummary;
  onUpdateSummary: (newSummary: CompanyTargetSummary, period?: TimeRange) => void;
  departments: DepartmentData[];
  onUpdateDepartments: (newDepts: DepartmentData[], period?: TimeRange) => void;
  reps: SalesRep[];
  onUpdateReps: (newReps: SalesRep[], period?: TimeRange) => void;
  onResetDefaults: () => void;
  currentUser?: AppUser | null;
  users?: AppUser[];
  onUpdateUsers?: (newUsers: AppUser[]) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

// Preset color options for new departments
const PRESET_COLORS = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Lime', hex: '#84cc16' }
];

// Preset icon options for departments
const PRESET_ICONS = [
  'Code2',
  'Cpu',
  'Megaphone',
  'LayoutTemplate',
  'Box',
  'Video',
  'Shirt',
  'Shield',
  'Smartphone',
  'Globe',
  'Briefcase',
  'Zap',
  'Layers',
  'Palette',
  'Server',
  'Target'
];

// Quick avatar presets for convenience
const PRESET_AVATARS = [
  { label: 'Executive Woman', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { label: 'Solutions Architect', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { label: 'Growth Director', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
  { label: 'Enterprise VP', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { label: 'Creative Lead', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { label: 'Sales Engineer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  { label: 'Account Executive', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
  { label: 'Global Director', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400' },
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  summary,
  onUpdateSummary,
  departments,
  onUpdateDepartments,
  reps,
  onUpdateReps,
  onResetDefaults,
  currentUser,
  users = [],
  onUpdateUsers,
  timeRange,
  setTimeRange
}) => {
  const isAdmin = currentUser?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'departments' | 'manpower' | 'summary' | 'users'>('departments');

  // Summary State
  const [editMonthlyTarget, setEditMonthlyTarget] = useState(summary.monthlyTarget);
  const [editAchievement, setEditAchievement] = useState(summary.currentAchievement);
  const [editInbound, setEditInbound] = useState(summary.inboundPercent);
  const [editOutbound, setEditOutbound] = useState(summary.outboundPercent);
  const [editUpgrade, setEditUpgrade] = useState(summary.upgradePercent);
  const [editNewCustomers, setEditNewCustomers] = useState(summary.newCustomers);

  // Departments State
  const [deptList, setDeptList] = useState<DepartmentData[]>(departments);
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptShortName, setNewDeptShortName] = useState('');
  const [newDeptTarget, setNewDeptTarget] = useState('750000');
  const [newDeptActual, setNewDeptActual] = useState('500000');
  const [newDeptColor, setNewDeptColor] = useState('#3b82f6');
  const [newDeptIcon, setNewDeptIcon] = useState('Briefcase');
  const [newDeptLead, setNewDeptLead] = useState('');
  const [newDeptDeals, setNewDeptDeals] = useState('15');

  // Manpower State
  const [repList, setRepList] = useState<SalesRep[]>(reps);
  const [manpowerSearch, setManpowerSearch] = useState('');
  const [manpowerDeptFilter, setManpowerDeptFilter] = useState('all');
  const [showAddManpower, setShowAddManpower] = useState(false);
  
  // New Manpower Form State
  const [newManpowerName, setNewManpowerName] = useState('');
  const [newManpowerImageUrl, setNewManpowerImageUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
  const [newManpowerDept, setNewManpowerDept] = useState(departments[0]?.name || 'Full Stack Development');
  const [newManpowerRole, setNewManpowerRole] = useState('Account Executive');
  const [newManpowerRegion, setNewManpowerRegion] = useState('USA');
  const [newManpowerTarget, setNewManpowerTarget] = useState('500000');
  const [newManpowerWon, setNewManpowerWon] = useState('350000');
  const [newManpowerDemos, setNewManpowerDemos] = useState('10');
  const [newManpowerWinRate, setNewManpowerWinRate] = useState('75');
  const [newManpowerEmail, setNewManpowerEmail] = useState('');
  const [newManpowerPhone, setNewManpowerPhone] = useState('');
  const [newManpowerBadges] = useState<('trophy' | 'silver-medal' | 'bronze-medal' | 'star')[]>(['star']);

  // Editing single manpower image quick modal
  const [editingImageUrlRepId, setEditingImageUrlRepId] = useState<string | null>(null);
  const [quickImageUrlInput, setQuickImageUrlInput] = useState('');

  // User Management State (ADMIN ONLY)
  const [userList, setUserList] = useState<AppUser[]>(users);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('editor');
  const [userFormError, setUserFormError] = useState('');
  const [showPasswordMap, setShowPasswordMap] = useState<{ [userId: string]: boolean }>({});

  // Sync with prop changes when modal opens or period switches
  useEffect(() => {
    if (isOpen) {
      setEditMonthlyTarget(summary.monthlyTarget);
      setEditAchievement(summary.currentAchievement);
      setEditInbound(summary.inboundPercent);
      setEditOutbound(summary.outboundPercent);
      setEditUpgrade(summary.upgradePercent);
      setEditNewCustomers(summary.newCustomers);
      setDeptList(departments);
      setRepList(reps);
      setUserList(users);
      if (departments.length > 0 && !newManpowerDept) {
        setNewManpowerDept(departments[0].name);
      }
      // If an editor opens the panel and tab is users, switch to departments
      if (!isAdmin && activeTab === 'users') {
        setActiveTab('departments');
      }
    }
  }, [isOpen, summary, departments, reps, users, isAdmin, activeTab, timeRange]);

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${Math.round(val / 1000)}k`;
    return `$${val.toLocaleString()}`;
  };

  // Calculate live department totals
  const totalDeptTargetSum = deptList.reduce((sum, d) => sum + (Number(d.target) || 0), 0);
  const totalDeptActualSum = deptList.reduce((sum, d) => sum + (Number(d.actual) || 0), 0);
  const deptAttainmentPercent = totalDeptTargetSum > 0 ? Math.round((totalDeptActualSum / totalDeptTargetSum) * 100) : 0;

  // Calculate live reps totals
  const totalRepTargetSum = repList.reduce((sum, r) => sum + (Number(r.targetAmount) || 0), 0);
  const totalRepWonSum = repList.reduce((sum, r) => sum + (Number(r.wonDealsAmount) || 0), 0);

  // --- Department Actions ---
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    const newDept: DepartmentData = {
      id: `dept-${Date.now()}`,
      name: newDeptName.trim(),
      shortName: newDeptShortName.trim() || newDeptName.trim().slice(0, 10),
      target: Number(newDeptTarget) || 500000,
      actual: Number(newDeptActual) || 0,
      color: newDeptColor,
      iconName: newDeptIcon,
      dealCount: Number(newDeptDeals) || 0,
      leadRep: newDeptLead.trim() || 'Team Lead'
    };

    const updated = [...deptList, newDept];
    setDeptList(updated);
    onUpdateDepartments(updated, timeRange);

    // Reset Form
    setNewDeptName('');
    setNewDeptShortName('');
    setNewDeptLead('');
    setShowAddDept(false);
  };

  const handleDeptFieldChange = (id: string, field: keyof DepartmentData, value: any) => {
    const updated = deptList.map(d => {
      if (d.id === id) {
        return { ...d, [field]: value };
      }
      return d;
    });
    setDeptList(updated);
    onUpdateDepartments(updated, timeRange);
  };

  const handleDeleteDepartment = (id: string) => {
    if (deptList.length <= 1) {
      alert('You must have at least one active department.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this department?')) {
      const updated = deptList.filter(d => d.id !== id);
      setDeptList(updated);
      onUpdateDepartments(updated, timeRange);
    }
  };

  const handleSyncSummaryFromDepartments = () => {
    const updated: CompanyTargetSummary = {
      ...summary,
      monthlyTarget: totalDeptTargetSum,
      currentAchievement: totalDeptActualSum,
    };
    setEditMonthlyTarget(totalDeptTargetSum);
    setEditAchievement(totalDeptActualSum);
    onUpdateSummary(updated, timeRange);
  };

  const handleDistributeTargetToDepts = () => {
    if (deptList.length === 0 || editMonthlyTarget <= 0) return;
    const currentSum = deptList.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
    let updatedDepts: DepartmentData[];
    if (currentSum > 0) {
      const ratio = editMonthlyTarget / currentSum;
      updatedDepts = deptList.map(d => ({
        ...d,
        target: Math.round((Number(d.target) || 0) * ratio),
      }));
    } else {
      const perDept = Math.round(editMonthlyTarget / deptList.length);
      updatedDepts = deptList.map(d => ({
        ...d,
        target: perDept,
      }));
    }
    setDeptList(updatedDepts);
    onUpdateDepartments(updatedDepts, timeRange);
  };

  // --- Manpower Actions ---
  const handleCreateManpower = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManpowerName.trim()) return;

    const newRep: SalesRep = {
      id: `rep-${Date.now()}`,
      name: newManpowerName.trim(),
      displayName: newManpowerName.trim(),
      avatar: newManpowerImageUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      wonDealsAmount: Number(newManpowerWon) || 0,
      targetAmount: Number(newManpowerTarget) || 400000,
      department: newManpowerDept || deptList[0]?.name || 'Full Stack Development',
      role: newManpowerRole || 'Account Executive',
      region: newManpowerRegion || 'USA',
      demosCount: Number(newManpowerDemos) || 6,
      winRate: Number(newManpowerWinRate) || 70,
      email: newManpowerEmail.trim() || `${newManpowerName.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      phone: newManpowerPhone.trim() || '+1 (555) 019-2834',
      badges: newManpowerBadges,
      recentDeals: []
    };

    const updated = [...repList, newRep];
    setRepList(updated);
    onUpdateReps(updated, timeRange);

    // Reset Form
    setNewManpowerName('');
    setNewManpowerEmail('');
    setNewManpowerPhone('');
    setShowAddManpower(false);
  };

  const handleRepFieldChange = (id: string, field: keyof SalesRep, value: any) => {
    const updated = repList.map(r => {
      if (r.id === id) {
        if (field === 'name') {
          return { ...r, name: value, displayName: value };
        }
        return { ...r, [field]: value };
      }
      return r;
    });
    setRepList(updated);
    onUpdateReps(updated, timeRange);
  };

  const handleQuickSaveAvatar = (repId: string) => {
    if (quickImageUrlInput.trim()) {
      handleRepFieldChange(repId, 'avatar', quickImageUrlInput.trim());
    }
    setEditingImageUrlRepId(null);
    setQuickImageUrlInput('');
  };

  const handleDeleteManpower = (id: string) => {
    if (window.confirm('Remove this representative from the team?')) {
      const updated = repList.filter(r => r.id !== id);
      setRepList(updated);
      onUpdateReps(updated, timeRange);
    }
  };

  // --- Summary Actions ---
  const handleSaveSummary = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CompanyTargetSummary = {
      monthlyTarget: Number(editMonthlyTarget),
      currentAchievement: Number(editAchievement),
      inboundPercent: Number(editInbound),
      outboundPercent: Number(editOutbound),
      upgradePercent: Number(editUpgrade),
      newCustomers: Number(editNewCustomers),
    };
    onUpdateSummary(updated, timeRange);
  };

  // --- User Management Actions (ADMIN ONLY) ---
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserFormError('');

    const cleanUsername = newUserUsername.trim().toLowerCase();
    const cleanName = newUserName.trim();
    const cleanPassword = newUserPassword.trim();
    const cleanEmail = newUserEmail.trim();

    if (!cleanUsername || !cleanPassword || !cleanName) {
      setUserFormError('Please fill in all required fields (Name, Username, Password).');
      return;
    }

    // Check if username already exists
    if (userList.some(u => u.username.toLowerCase() === cleanUsername)) {
      setUserFormError('This username already exists. Please choose a different username.');
      return;
    }

    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      name: cleanName,
      email: cleanEmail || `${cleanUsername}@betopiagroup.com`,
      password: cleanPassword,
      role: newUserRole,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...userList, newUser];
    setUserList(updated);
    if (onUpdateUsers) {
      onUpdateUsers(updated);
    }

    // Reset Form
    setNewUserName('');
    setNewUserUsername('');
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserRole('editor');
    setShowAddUser(false);
    setUserFormError('');
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (username === '11684' || userId === '11684' || username === 'admin') {
      alert('The primary Executive Administrator cannot be deleted.');
      return;
    }

    if (window.confirm(`Are you sure you want to remove user access for "${username}"?`)) {
      const updated = userList.filter(u => u.id !== userId);
      setUserList(updated);
      if (onUpdateUsers) {
        onUpdateUsers(updated);
      }
    }
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswordMap(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Filtered reps
  const filteredReps = repList.filter(rep => {
    const matchesSearch = rep.name.toLowerCase().includes(manpowerSearch.toLowerCase()) ||
                          rep.role.toLowerCase().includes(manpowerSearch.toLowerCase());
    const matchesDept = manpowerDeptFilter === 'all' || rep.department === manpowerDeptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl card-dark rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl text-white shadow-lg ${
              isAdmin 
                ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-indigo-500/20' 
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/20'
            }`}>
              {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {isAdmin ? 'Executive Admin & Operations Control Center' : 'Sales Operations & Target Editor'}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  isAdmin 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                }`}>
                  {isAdmin ? 'Super Admin Privileges' : 'Editor Access'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage quarter/month/YTD targets, simulated auto-sums, salesperson quotas, and role security.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all office data, targets, and employee records to defaults?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              title="Reset all data to defaults"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#111827] border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TIME PERIOD SELECTOR (Current Month / Quarter Q3 / Year to Date) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-200">Active Target Period:</span>
            <span className="text-[11px] text-slate-400">Settings below will apply to this timeframe</span>
          </div>

          <div className="flex items-center gap-1 bg-[#0b101b] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeRange === 'month'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Current Month
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeRange === 'quarter'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quarter (Q3)
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeRange === 'year'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Year to Date (YTD)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800/80 shrink-0 overflow-x-auto">
          {/* TAB 1: Departments */}
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'departments'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Department Targets & Quotas ({deptList.length})</span>
          </button>

          {/* TAB 2: Manpower */}
          <button
            onClick={() => setActiveTab('manpower')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'manpower'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Salesperson Quotas & Avatars ({repList.length})</span>
          </button>

          {/* TAB 3: Summary */}
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'summary'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Target & Achievement Summary</span>
          </button>

          {/* TAB 4: USER ACCESS MANAGEMENT (ADMIN ONLY - Strictly hidden from Editors) */}
          {isAdmin && (
            <button
              id="tab-user-access"
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 border border-indigo-400/40'
                  : 'bg-indigo-950/30 text-indigo-300 border border-indigo-500/30 hover:text-white hover:bg-indigo-900/40'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-300" />
              <span>User Access & Accounts ({userList.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: DEPARTMENTS & TARGET QUOTAS */}
        {activeTab === 'departments' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {/* Top Action Bar & Live Auto-Sum Simulation Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white">
                    Department Quotas & Auto-Simulation Engine
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span>Total Targets: <strong className="text-white">{formatCurrency(totalDeptTargetSum)}</strong></span>
                  <span>•</span>
                  <span>Total Actuals: <strong className="text-emerald-400">{formatCurrency(totalDeptActualSum)}</strong></span>
                  <span>•</span>
                  <span>Attainment: <strong className="text-blue-300">{deptAttainmentPercent}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncSummaryFromDepartments}
                  title="Simulate and sync company summary targets to match sum of all departments"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-bold transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sync to Office Target</span>
                </button>

                <button
                  onClick={() => setShowAddDept(prev => !prev)}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddDept ? 'Close Form' : '+ Add Department'}</span>
                </button>
              </div>
            </div>

            {/* Add Department Form */}
            {showAddDept && (
              <form onSubmit={handleCreateDepartment} className="p-4 rounded-xl bg-[#111827] border border-blue-500/40 shadow-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Create New Department
                  </h4>
                  <span className="text-[10px] text-slate-400">Will automatically appear across all leaderboard tables</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Department Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud Security Solutions"
                      required
                      value={newDeptName}
                      onChange={(e) => setNewDeptName(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Short Name / Code</label>
                    <input
                      type="text"
                      placeholder="e.g. CloudSec"
                      value={newDeptShortName}
                      onChange={(e) => setNewDeptShortName(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Lead Representative</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={newDeptLead}
                      onChange={(e) => setNewDeptLead(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Target Quota ($)</label>
                    <input
                      type="number"
                      step="10000"
                      required
                      placeholder="750000"
                      value={newDeptTarget}
                      onChange={(e) => setNewDeptTarget(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Initial Won Achievement ($)</label>
                    <input
                      type="number"
                      step="10000"
                      placeholder="500000"
                      value={newDeptActual}
                      onChange={(e) => setNewDeptActual(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Deals Count</label>
                    <input
                      type="number"
                      value={newDeptDeals}
                      onChange={(e) => setNewDeptDeals(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Brand Color</label>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_COLORS.map(c => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => setNewDeptColor(c.hex)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            newDeptColor === c.hex ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Icon Style</label>
                    <select
                      value={newDeptIcon}
                      onChange={(e) => setNewDeptIcon(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      {PRESET_ICONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddDept(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    Create Department
                  </button>
                </div>
              </form>
            )}

            {/* Department Table List */}
            <div className="space-y-2">
              {deptList.map((dept) => {
                const attainment = Math.round((dept.actual / (dept.target || 1)) * 100);
                const isMet = dept.actual >= dept.target;
                const shortfall = Math.max(0, dept.target - dept.actual);

                return (
                  <div
                    key={dept.id}
                    className="p-3.5 rounded-xl bg-[#111827]/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    {/* Left: Info */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow"
                        style={{ backgroundColor: dept.color }}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={dept.name}
                          onChange={(e) => handleDeptFieldChange(dept.id, 'name', e.target.value)}
                          className="bg-transparent font-bold text-white text-sm focus:bg-[#0b101b] px-1 py-0.5 rounded border border-transparent focus:border-blue-500"
                        />
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 pl-1">
                          <span>Lead:</span>
                          <input
                            type="text"
                            value={dept.leadRep}
                            onChange={(e) => handleDeptFieldChange(dept.id, 'leadRep', e.target.value)}
                            className="bg-transparent text-slate-300 font-medium focus:bg-[#0b101b] px-1 py-0.2 rounded border border-transparent focus:border-blue-500 w-28"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Quota & Actual Inputs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-center flex-1 max-w-xl">
                      <div>
                        <label className="text-[10px] text-slate-400 block font-semibold">Target Quota ($)</label>
                        <div className="relative">
                          <DollarSign className="w-3 h-3 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            step="10000"
                            value={dept.target}
                            onChange={(e) => handleDeptFieldChange(dept.id, 'target', Number(e.target.value))}
                            className="w-full bg-[#0b101b] border border-slate-700 rounded-lg pl-6 pr-2 py-1 text-xs text-white font-bold focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block font-semibold">Actual Won ($)</label>
                        <div className="relative">
                          <DollarSign className="w-3 h-3 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            step="10000"
                            value={dept.actual}
                            onChange={(e) => handleDeptFieldChange(dept.id, 'actual', Number(e.target.value))}
                            className="w-full bg-[#0b101b] border border-slate-700 rounded-lg pl-6 pr-2 py-1 text-xs text-emerald-400 font-bold focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-start gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">
                            {isMet ? 'Target Met' : `Shortfall: ${formatCurrency(shortfall)}`}
                          </span>
                          <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full inline-block ${
                            isMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {attainment}%
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteDepartment(dept.id)}
                          title="Delete Department"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-auto sm:ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MANPOWER & SALESPERSON QUOTAS */}
        {activeTab === 'manpower' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-blue-950/20 border border-blue-500/20">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <div className="relative min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search representative..."
                    value={manpowerSearch}
                    onChange={(e) => setManpowerSearch(e.target.value)}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg pl-8 pr-2.5 py-1 text-xs text-white"
                  />
                </div>

                <select
                  value={manpowerDeptFilter}
                  onChange={(e) => setManpowerDeptFilter(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="all">All Departments ({repList.length})</option>
                  {deptList.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowAddManpower(prev => !prev)}
                className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{showAddManpower ? 'Close Form' : '+ Add Representative'}</span>
              </button>
            </div>

            {/* Add Manpower Form */}
            {showAddManpower && (
              <form onSubmit={handleCreateManpower} className="p-4 rounded-xl bg-[#111827] border border-blue-500/40 shadow-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" /> Add Sales Executive to Leaderboard
                  </h4>
                  <span className="text-[10px] text-slate-400">Specify avatar photo URL, quota, and assigned department</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Jessica Sterling"
                      required
                      value={newManpowerName}
                      onChange={(e) => setNewManpowerName(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Department Assignment *</label>
                    <select
                      value={newManpowerDept}
                      onChange={(e) => setNewManpowerDept(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      {deptList.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Solutions Director"
                      value={newManpowerRole}
                      onChange={(e) => setNewManpowerRole(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Target Quota ($)</label>
                    <input
                      type="number"
                      step="10000"
                      value={newManpowerTarget}
                      onChange={(e) => setNewManpowerTarget(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Won Revenue ($)</label>
                    <input
                      type="number"
                      step="10000"
                      value={newManpowerWon}
                      onChange={(e) => setNewManpowerWon(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Territory Region</label>
                    <input
                      type="text"
                      placeholder="e.g. USA, UK, Germany"
                      value={newManpowerRegion}
                      onChange={(e) => setNewManpowerRegion(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Avatar Image URL & Presets */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-[10px] text-slate-400 block mb-1 font-semibold flex items-center justify-between">
                    <span>Profile Photo Image URL</span>
                    <span className="text-slate-500">Unsplash or company CDN link</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newManpowerImageUrl}
                      onChange={(e) => setNewManpowerImageUrl(e.target.value)}
                      className="flex-1 bg-[#0b101b] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <img
                      src={newManpowerImageUrl}
                      alt="Preview"
                      className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                  </div>

                  {/* Quick Avatar Suggestions */}
                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                    <span className="text-[9px] text-slate-500 shrink-0 font-medium">Quick Avatars:</span>
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewManpowerImageUrl(av.url)}
                        title={av.label}
                        className="w-6 h-6 rounded-full overflow-hidden border border-slate-700 hover:scale-110 transition-transform shrink-0"
                      >
                        <img src={av.url} alt={av.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddManpower(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    Add Representative
                  </button>
                </div>
              </form>
            )}

            {/* Manpower Cards / Rows with Inline Target & Shortfall Editor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredReps.map((rep) => {
                const attainment = Math.round((rep.wonDealsAmount / (rep.targetAmount || 1)) * 100);
                const isMet = rep.wonDealsAmount >= rep.targetAmount;
                const shortfall = Math.max(0, rep.targetAmount - rep.wonDealsAmount);
                const surplus = Math.max(0, rep.wonDealsAmount - rep.targetAmount);

                return (
                  <div
                    key={rep.id}
                    className="p-3 rounded-xl bg-[#111827]/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-2.5"
                  >
                    {/* Top Row: Avatar & Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative group/avatar shrink-0">
                        <img
                          src={rep.avatar}
                          alt={rep.name}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                          }}
                        />
                        <button
                          onClick={() => {
                            setEditingImageUrlRepId(rep.id);
                            setQuickImageUrlInput(rep.avatar);
                          }}
                          title="Change profile image URL"
                          className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <ImageIcon className="w-4 h-4 text-blue-400" />
                        </button>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <input
                            type="text"
                            value={rep.name}
                            onChange={(e) => handleRepFieldChange(rep.id, 'name', e.target.value)}
                            className="bg-transparent font-bold text-white text-xs truncate focus:bg-[#0b101b] px-1 py-0.5 rounded border border-transparent focus:border-blue-500 w-36"
                          />
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium shrink-0">
                            {rep.region}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 truncate">
                          {rep.role} • <strong className="text-blue-400">{rep.department}</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteManpower(rep.id)}
                        title="Delete representative"
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Row: Editable Target & Actual Quotas */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 items-center">
                      <div>
                        <label className="text-[9px] text-slate-400 block font-semibold">Target Quota ($)</label>
                        <input
                          type="number"
                          step="10000"
                          value={rep.targetAmount}
                          onChange={(e) => handleRepFieldChange(rep.id, 'targetAmount', Number(e.target.value))}
                          className="w-full bg-[#0b101b] border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 block font-semibold">Won Revenue ($)</label>
                        <input
                          type="number"
                          step="10000"
                          value={rep.wonDealsAmount}
                          onChange={(e) => handleRepFieldChange(rep.id, 'wonDealsAmount', Number(e.target.value))}
                          className="w-full bg-[#0b101b] border border-slate-700 rounded px-1.5 py-0.5 text-xs text-emerald-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 block font-semibold">Status</label>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded block text-center truncate ${
                          isMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {isMet ? `+${formatCurrency(surplus)}` : `-${formatCurrency(shortfall)}`} ({attainment}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Image URL Edit Modal Overlay */}
            {editingImageUrlRepId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-md bg-[#0e1524] border border-blue-500/40 rounded-2xl p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      Update Profile Image Icon URL
                    </h4>
                    <button
                      onClick={() => setEditingImageUrlRepId(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Direct Image URL</label>
                    <input
                      type="url"
                      value={quickImageUrlInput}
                      onChange={(e) => setQuickImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500"
                    />
                  </div>

                  {/* Preview Image */}
                  <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <img
                      src={quickImageUrlInput}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                    <div className="text-[11px] text-slate-400">
                      <span>Image will display on individual card popups, leaderboard rank rows, and TV broadcast view.</span>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold block">Select from executive presets:</span>
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_AVATARS.map((av, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setQuickImageUrlInput(av.url)}
                          className="flex flex-col items-center p-1.5 rounded-lg border border-slate-800 hover:border-blue-500 bg-slate-900/50 hover:bg-blue-950/40 transition-all"
                        >
                          <img src={av.url} alt={av.label} className="w-8 h-8 rounded-full object-cover mb-1" referrerPolicy="no-referrer" />
                          <span className="text-[9px] text-slate-300 truncate w-full text-center">{av.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setEditingImageUrlRepId(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleQuickSaveAvatar(editingImageUrlRepId)}
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                    >
                      Save Photo URL
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SUMMARY & SHORTFALL PARAMETERS */}
        {activeTab === 'summary' && (
          <form onSubmit={handleSaveSummary} className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white">
                    Executive Pipeline & Overall Office Target Controls
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Update the company-wide quota goal, total achievement, deal breakdown ratios, and customer volume.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleSyncSummaryFromDepartments}
                    title="Calculate and sync office target and achievement from sum of all departments"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Auto-Sum from Depts (${formatCurrency(totalDeptTargetSum)})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDistributeTargetToDepts}
                    title="Scale and distribute this target quota proportionally to all departments"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Distribute Target to Depts</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Quota Goal ($)
                  </label>
                  <input
                    type="number"
                    step="100000"
                    value={editMonthlyTarget}
                    onChange={(e) => setEditMonthlyTarget(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Current Total Achievement ($)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={editAchievement}
                    onChange={(e) => setEditAchievement(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Inbound Revenue Ratio (%)
                  </label>
                  <input
                    type="number"
                    value={editInbound}
                    onChange={(e) => setEditInbound(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Outbound Revenue Ratio (%)
                  </label>
                  <input
                    type="number"
                    value={editOutbound}
                    onChange={(e) => setEditOutbound(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Upgrade Revenue Ratio (%)
                  </label>
                  <input
                    type="number"
                    value={editUpgrade}
                    onChange={(e) => setEditUpgrade(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Total New Customers Signed
                  </label>
                  <input
                    type="number"
                    value={editNewCustomers}
                    onChange={(e) => setEditNewCustomers(Number(e.target.value))}
                    className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200">Current Office Status ({timeRange.toUpperCase()}):</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {editAchievement >= editMonthlyTarget
                      ? `Target Met with a surplus of ${formatCurrency(editAchievement - editMonthlyTarget)}`
                      : `Current shortfall is ${formatCurrency(editMonthlyTarget - editAchievement)} to reach goal`}
                  </p>
                </div>

                {editAchievement >= editMonthlyTarget ? (
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                    Target Met 🎉
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                    Shortfall: {formatCurrency(editMonthlyTarget - editAchievement)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Office Target Settings ({timeRange.toUpperCase()})</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: USER ACCESS & CREATOR MANAGEMENT (ADMIN EXCLUSIVE) */}
        {isAdmin && activeTab === 'users' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {/* Top Info Banner with Create User Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 border border-indigo-500/30 shadow-lg">
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>User Authentication & Access Management</span>
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5 max-w-2xl">
                  Administrators can provision user accounts. Created <strong className="text-blue-300">Editor</strong> accounts receive editing access for department targets, deals, and manpower, but <strong className="text-amber-300">do not have creator rights or user creation buttons</strong>.
                </p>
              </div>

              <button
                id="btn-open-create-user"
                onClick={() => setShowAddUser(prev => !prev)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all shrink-0 active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>{showAddUser ? 'Close Form' : '+ Create User Access'}</span>
              </button>
            </div>

            {/* Create User Form */}
            {showAddUser && (
              <form onSubmit={handleCreateUser} className="p-4 rounded-xl bg-[#111827] border border-indigo-500/50 shadow-2xl space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-indigo-400" />
                      <span>Provision New User Credentials</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Configure user login credentials and assign role permissions.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                    Admin Creator Mode
                  </span>
                </div>

                {userFormError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{userFormError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Anderson"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-semibold">
                      Username (Login ID) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. john_editor"
                      required
                      value={newUserUsername}
                      onChange={(e) => setNewUserUsername(e.target.value)}
                      className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-semibold">
                      Password (Passcode) *
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Create strong password"
                        required
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        className="w-full bg-[#0b101b] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-semibold">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="e.g. john@betopiagroup.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="w-full bg-[#0b101b] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Assignment */}
                <div className="pt-2">
                  <label className="text-[11px] text-slate-300 block mb-1.5 font-semibold">
                    Assigned User Role & Permission Level *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label 
                      onClick={() => setNewUserRole('editor')}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        newUserRole === 'editor'
                          ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500/50'
                          : 'bg-[#0b101b] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userRole"
                        checked={newUserRole === 'editor'}
                        onChange={() => setNewUserRole('editor')}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-xs text-blue-300">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editor (Standard Access)</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          Can edit department targets, adjust manpower, and log sales. <strong>Does not have user creation buttons or rights.</strong>
                        </p>
                      </div>
                    </label>

                    <label 
                      onClick={() => setNewUserRole('admin')}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        newUserRole === 'admin'
                          ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                          : 'bg-[#0b101b] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userRole"
                        checked={newUserRole === 'admin'}
                        onChange={() => setNewUserRole('admin')}
                        className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-300">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Administrator (Super Access)</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          Full master control over everything, including creating user access, deleting records, and resetting data.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false);
                      setUserFormError('');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all"
                  >
                    Authorize & Create User Account
                  </button>
                </div>
              </form>
            )}

            {/* List of Active User Accounts */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Provisioned Accounts ({userList.length})
                </span>
                <span className="text-[10px] text-slate-500">
                  Click on passwords to show/hide passcodes
                </span>
              </div>

              {userList.map((u) => {
                const isSuperAdmin = u.username === '11684' || u.id === '11684' || u.username === 'admin';
                const isUserAdminRole = u.role === 'admin';
                const isPasswordRevealed = !!showPasswordMap[u.id];

                return (
                  <div
                    key={u.id}
                    className="p-3.5 rounded-xl bg-[#111827]/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow ${
                        isUserAdminRole 
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' 
                          : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                      }`}>
                        {(u.name || u.username || 'U').charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{u.name || u.username}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide border ${
                            isUserAdminRole 
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}>
                            {u.role || 'editor'}
                          </span>
                          {isSuperAdmin && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-semibold">
                              Primary Root
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                          <span>User ID: <strong className="text-slate-300 font-mono">{u.username}</strong></span>
                          <span>•</span>
                          <span>{u.email || `${u.username}@company.com`}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      {/* Password Reveal Container */}
                      <div className="flex items-center gap-1.5 bg-[#0b101b] border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
                        <span className="text-[10px] text-slate-500 font-semibold">Pass:</span>
                        <span className="font-mono text-slate-300 font-bold">
                          {isPasswordRevealed ? u.password : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(u.id)}
                          title={isPasswordRevealed ? 'Hide Password' : 'Show Password'}
                          className="text-slate-400 hover:text-white ml-1"
                        >
                          {isPasswordRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Delete User Button (Root Admin cannot be deleted) */}
                      {!isSuperAdmin && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          title={`Revoke user access for ${u.username}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isAdmin 
                ? `Editing active period: ${timeRange.toUpperCase()} — changes are automatically saved.` 
                : `Editor Mode: Modifications save to ${timeRange.toUpperCase()} dataset.`}
            </span>
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
