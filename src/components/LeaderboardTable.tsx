import React, { useState } from 'react';
import { SalesRep, DepartmentData } from '../types';
import { 
  Search, 
  ArrowUpDown, 
  Filter, 
  Award, 
  Trophy, 
  Star, 
  TrendingUp, 
  Users,
  ChevronDown,
  CheckCircle2,
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';

interface LeaderboardTableProps {
  reps: SalesRep[];
  timeLabel: string;
  selectedDepartment: string | null;
  onSelectDepartment: (dept: string | null) => void;
  onSelectRep: (rep: SalesRep) => void;
  onOpenAdmin?: () => void;
  departments?: DepartmentData[];
  isAdmin?: boolean;
  canEdit?: boolean;
  isTvMode?: boolean;
  onQuickLogDeal?: (repId: string) => void;
  onUpdateRep?: (rep: SalesRep) => void;
  onDeleteRep?: (id: string) => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  reps,
  timeLabel,
  selectedDepartment,
  onSelectDepartment,
  onSelectRep,
  onOpenAdmin,
  departments,
  isAdmin = false,
  canEdit = false,
  isTvMode = false,
  onQuickLogDeal,
  onUpdateRep,
  onDeleteRep,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'revenue' | 'name' | 'attainment' | 'demos'>('revenue');

  // Dynamically extract all available departments from departments list or reps
  const availableDepartments: string[] = departments && departments.length > 0
    ? departments.map(d => d.name)
    : Array.from(new Set(reps.map(r => r.department)));

  // Filter and sort reps
  const filteredReps = reps
    .filter(rep => {
      const repName = String(rep?.name || '');
      const repDept = String(rep?.department || '');
      const repRegion = String(rep?.region || '');
      const repRole = String(rep?.role || '');

      const matchesSearch = 
        repName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repDept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repRole.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = selectedDepartment ? rep.department === selectedDepartment : true;

      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortBy === 'revenue') {
        return b.wonDealsAmount - a.wonDealsAmount;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'attainment') {
        const attA = (a.wonDealsAmount / a.targetAmount);
        const attB = (b.wonDealsAmount / b.targetAmount);
        return attB - attA;
      }
      if (sortBy === 'demos') {
        const dA = typeof a.demosCount === 'number' ? a.demosCount : parseInt(String(a.demosCount).split('-')[1] || String(a.demosCount) || '0');
        const dB = typeof b.demosCount === 'number' ? b.demosCount : parseInt(String(b.demosCount).split('-')[1] || String(b.demosCount) || '0');
        return dB - dA;
      }
      return 0;
    });

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US')}`;
  };

  const formatShort = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${Math.round(amount / 1000)}k`;
    return `$${amount}`;
  };

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case 'CMS': return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'Full Stack Development': return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'AI Development': return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'V&C': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case '2D & 3D Architech': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'T-shirt Design': return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Digital Marketing': return 'bg-pink-500/15 text-pink-400 border-pink-500/30';
      default: return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }
  };

  const renderBadge = (badge: 'trophy' | 'silver-medal' | 'bronze-medal' | 'star', index: number) => {
    if (badge === 'trophy') {
      return (
        <span key={index} title="Top Performer Trophy" className="inline-flex items-center text-sm">
          🏆
        </span>
      );
    }
    if (badge === 'silver-medal') {
      return (
        <span key={index} title="Silver Medalist" className="inline-flex items-center text-sm">
          🥈
        </span>
      );
    }
    if (badge === 'bronze-medal') {
      return (
        <span key={index} title="Bronze Medalist" className="inline-flex items-center text-sm">
          🥉
        </span>
      );
    }
    if (badge === 'star') {
      return (
        <span key={index} title="Star Performer" className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">
          ⭐
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`card-dark rounded-2xl flex flex-col h-full shadow-xl border border-slate-800/80 min-h-0 ${
      isTvMode ? 'p-3 sm:p-4' : 'p-5 sm:p-6'
    }`}>
      {/* Table Header */}
      {!isAdmin ? (
        <div className={`flex items-center justify-center relative z-10 border-b border-slate-800/80 ${
          isTvMode ? 'pb-2 mb-1.5' : 'pb-3 mb-2'
        }`}>
          <h2 className={`${isTvMode ? 'text-base sm:text-lg' : 'text-lg sm:text-xl md:text-2xl'} font-bold text-white tracking-tight text-center`}>
            Sales Execution Panel Report
          </h2>
        </div>
      ) : (
        /* Admin Table Header & Interactive Filters */
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 ${
          isTvMode ? 'pb-2 mb-1.5' : 'pb-4 mb-2'
        }`}>
          <div>
            <h2 className={`${isTvMode ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-bold text-white tracking-tight flex items-center gap-2`}>
              <Users className="w-4 h-4 text-blue-400" />
              All Sales Representatives & Manpower Roster
            </h2>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">
              {timeLabel} • Individual target achievement & shortfall status
            </p>
          </div>

          {/* Search, Department Filter & Sorting */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Department Filter Select */}
            <div className="relative">
              <select
                value={selectedDepartment || 'all'}
                onChange={(e) => onSelectDepartment(e.target.value === 'all' ? null : e.target.value)}
                className="px-2 py-0.5 text-xs bg-[#111827] border border-slate-700/70 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Departments ({availableDepartments.length})</option>
                {availableDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search manpower..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-2 py-0.5 text-xs bg-[#111827] border border-slate-700/70 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-24 sm:w-32 transition-all"
              />
            </div>

            {/* Sort By Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-0.5 text-xs bg-[#111827] border border-slate-700/70 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="revenue">Sort: Revenue (High to Low)</option>
              <option value="attainment">Sort: Quota Attainment %</option>
              <option value="demos">Sort: Demos Completed</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      {/* Table Headers */}
      <div className="grid grid-cols-12 text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wider uppercase px-3 py-1.5 bg-slate-900/40 rounded-lg mb-1">
        <div className="col-span-4 sm:col-span-4 flex items-center">
          EMPLOYEE / MANPOWER
        </div>
        <div className="col-span-3 sm:col-span-3">
          DEPARTMENT
        </div>
        <div className="col-span-3 sm:col-span-3 text-right">
          ACHIEVEMENT / TARGET
        </div>
        <div className="col-span-2 sm:col-span-2 text-right">
          STATUS / SHORTFALL
        </div>
      </div>

      {/* Table Rows (Scrollable) */}
      <div className={`flex-1 overflow-y-auto divide-y divide-slate-800/40 pr-1 min-h-0 ${
        isTvMode ? 'max-h-[220px] lg:max-h-full' : 'max-h-[380px]'
      }`}>
        {filteredReps.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No manpower records found matching your filters.
          </div>
        ) : (
          filteredReps.map((rep, idx) => {
            const rank = idx + 1;
            const attainment = Math.round((rep.wonDealsAmount / rep.targetAmount) * 100);
            const isTargetMet = rep.wonDealsAmount >= rep.targetAmount;
            const shortfall = Math.max(0, rep.targetAmount - rep.wonDealsAmount);

            return (
              <div
                key={rep.id}
                id={`rep-row-${rep.id}`}
                onClick={() => onSelectRep(rep)}
                className={`grid grid-cols-12 items-center px-3 rounded-xl hover:bg-slate-800/40 cursor-pointer transition-all duration-150 group ${
                  isTvMode ? 'py-1.5' : 'py-2.5'
                }`}
              >
                {/* Employee column with Rank Number, Avatar, Name & Badges */}
                <div className="col-span-4 sm:col-span-4 flex items-center gap-2 min-w-0">
                  {/* Rank Badge */}
                  <span className={`w-4.5 h-4.5 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ${
                    rank === 1 ? 'bg-amber-400/20 text-yellow-400 border border-amber-400/40' :
                    rank === 2 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40' :
                    rank === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                    'bg-slate-800/80 text-slate-400'
                  }`}>
                    {rank}
                  </span>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={rep.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                      alt={rep.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback image if broken URL
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                      }}
                      className={`${isTvMode ? 'w-7 h-7' : 'w-8 h-8'} rounded-full object-cover border border-slate-700/80`}
                    />
                  </div>

                  {/* Rep Name */}
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                        {rep.name}
                      </span>
                      {rep.badges && rep.badges.map((b, bi) => renderBadge(b, bi))}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {rep.role}
                    </span>
                  </div>
                </div>

                {/* Department Tag */}
                <div className="col-span-3 sm:col-span-3 pr-2">
                  <span className={`inline-block px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium border truncate max-w-full ${getDeptColor(rep.department)}`}>
                    {rep.department}
                  </span>
                </div>

                {/* Won Deals Amount & Target */}
                <div className="col-span-3 sm:col-span-3 text-right">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight block">
                    {formatCurrency(rep.wonDealsAmount)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                    Target: {formatShort(rep.targetAmount)} ({attainment}%)
                  </span>
                </div>

                {/* Shortfall or Target Met */}
                <div className="col-span-2 sm:col-span-2 text-right">
                  {isTargetMet ? (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                      Target Met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                      -{formatShort(shortfall)}
                    </span>
                  )}
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5">
                    {rep.demosCount} demos
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className={`border-t border-slate-800/60 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 ${
        isTvMode ? 'pt-1.5 mt-1' : 'pt-3 mt-2'
      }`}>
        <span>Showing {filteredReps.length} of {reps.length} active manpower profiles</span>
        <div className="flex items-center gap-2">
          {isAdmin && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Manpower & Department Manager</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
