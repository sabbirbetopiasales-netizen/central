import React, { useState } from 'react';
import { CompanyTargetSummary, DepartmentData } from '../types';
import { Target, TrendingUp, DollarSign, Users, Award, Edit3, ArrowUpRight, ArrowDownRight, Zap, CheckCircle2, Sparkles, SlidersHorizontal, Calculator } from 'lucide-react';

interface TargetAchievementSummaryProps {
  summary: CompanyTargetSummary;
  timeLabel: string;
  onUpdateTarget: (newTarget: number, distributeToDepartments?: boolean) => void;
  onOpenAdmin?: () => void;
  departments?: DepartmentData[];
  isAdmin?: boolean;
  canEdit?: boolean;
  isTvMode?: boolean;
}

export const TargetAchievementSummary: React.FC<TargetAchievementSummaryProps> = ({
  summary,
  timeLabel,
  onUpdateTarget,
  onOpenAdmin,
  departments = [],
  isAdmin = false,
  canEdit = false,
  isTvMode = false
}) => {
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState((summary?.monthlyTarget !== undefined && summary?.monthlyTarget !== null ? summary.monthlyTarget : 0).toString());
  const [distributeToDepts, setDistributeToDepts] = useState(false);

  const safeMonthlyTarget = summary?.monthlyTarget !== undefined && summary?.monthlyTarget !== null ? Number(summary.monthlyTarget) : 0;
  const safeCurrentAchievement = Number(summary?.currentAchievement) || 0;

  const allowEdit = canEdit || isAdmin;
  const rawAttainmentPercent = safeMonthlyTarget > 0 ? Math.round((safeCurrentAchievement / safeMonthlyTarget) * 100) : 0;
  const attainmentPercent = Math.min(100, rawAttainmentPercent);
  const isTargetMet = safeMonthlyTarget > 0 && safeCurrentAchievement >= safeMonthlyTarget;
  const shortfall = Math.max(0, safeMonthlyTarget - safeCurrentAchievement);
  const surplus = Math.max(0, safeCurrentAchievement - safeMonthlyTarget);

  // Department sum calculations
  const deptTargetSum = departments.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
  const deptActualSum = departments.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);

  // Smart currency formatter: displays $10k, $750k, $1.5M, $10M cleanly without awkward $0.01M
  const formatBigCurrency = (val: number) => {
    if (val === undefined || val === null || isNaN(val)) return '$0';
    if (val >= 1000000) {
      const m = val / 1000000;
      return `$${m >= 100 ? Math.round(m) : m >= 10 ? m.toFixed(1) : m.toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `$${Math.round(val / 1000).toLocaleString()}k`;
    }
    return `$${val.toLocaleString()}`;
  };

  const formatCurrency = (val: number) => {
    if (val === undefined || val === null || isNaN(val)) return '$0';
    if (val >= 1000000) {
      const m = val / 1000000;
      return `$${m >= 10 ? m.toFixed(1) : m.toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `$${Math.round(val / 1000).toLocaleString()}k`;
    }
    return `$${val.toLocaleString()}`;
  };

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(targetInput.replace(/[^0-9.]/g, ''));
    if (num > 0) {
      onUpdateTarget(num, distributeToDepts);
      setIsEditingTarget(false);
    }
  };

  const handleApplyDeptSum = () => {
    if (deptTargetSum > 0) {
      setTargetInput(deptTargetSum.toString());
      onUpdateTarget(deptTargetSum, false);
      setIsEditingTarget(false);
    }
  };

  return (
    <div className={`card-dark rounded-2xl flex flex-col justify-between h-full shadow-xl border border-slate-800/80 relative overflow-hidden ${
      isTvMode ? 'p-3 sm:p-4' : 'p-5 sm:p-6'
    }`}>
      {/* Subtle background gradient circle */}
      <div className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
        isTargetMet ? 'bg-emerald-500/15' : 'bg-blue-600/15'
      }`}></div>

      {/* Header */}
      <div className={`flex items-center justify-between relative z-10 ${isTvMode ? 'mb-2' : 'mb-4'}`}>
        <div>
          <h2 className={`${isTvMode ? 'text-base sm:text-lg' : 'text-lg sm:text-xl md:text-2xl'} font-extrabold text-white tracking-tight flex items-center gap-2.5`}>
            <Target className={`${isTvMode ? 'w-5 h-5' : 'w-6 h-6'} text-emerald-400`} />
            <span>Target & Achievement</span>
          </h2>
        </div>

        {/* Edit Target Actions */}
        {allowEdit && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setIsEditingTarget(prev => !prev);
                setTargetInput(summary.monthlyTarget.toString());
              }}
              title="Set Target Quota"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                isEditingTarget 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                  : 'bg-[#111827] border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEditingTarget ? 'Cancel Edit' : 'Edit Target'}</span>
            </button>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                title="Open settings panel"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs transition-colors font-medium"
              >
                <span>{isAdmin ? 'Admin Panel' : 'Editor Panel'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Edit Target Inline Form */}
      {allowEdit && isEditingTarget && (
        <form onSubmit={handleSaveTarget} className="mb-3 p-3 rounded-xl bg-[#111827] border border-blue-500/40 shadow-lg space-y-2 z-20 animate-fadeIn">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Set Company Target Quota:
            </span>
            {deptTargetSum > 0 && (
              <button
                type="button"
                onClick={handleApplyDeptSum}
                className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 font-semibold flex items-center gap-1 transition-colors"
                title="Automatically set target to sum of all department targets"
              >
                <Calculator className="w-3 h-3" />
                <span>Use Dept Sum ({formatCurrency(deptTargetSum)})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
              <input
                type="number"
                step="1000"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g. 10000000"
                className="w-full bg-[#0b101b] border border-slate-600 rounded-lg pl-6 pr-3 py-1.5 text-xs text-white font-extrabold focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Save Target
            </button>
          </div>

          {/* Quick preset amount chips & Distribution Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[10px]">
            <div className="flex items-center gap-1 text-slate-400">
              <span>Presets:</span>
              {[10000, 100000, 500000, 1000000, 6000000, 10000000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTargetInput(val.toString())}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {formatCurrency(val)}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={distributeToDepts}
                onChange={(e) => setDistributeToDepts(e.target.checked)}
                className="rounded border-slate-700 bg-[#0b101b] text-blue-600 focus:ring-0 w-3 h-3"
              />
              <span>Distribute to Departments</span>
            </label>
          </div>
        </form>
      )}

      {/* Primary Target vs Achievement Big Numbers */}
      <div className={`grid grid-cols-2 gap-2 sm:gap-3 relative z-10 ${isTvMode ? 'my-1' : 'my-2'}`}>
        {/* Set Target Box */}
        <div className={`rounded-xl bg-[#111827]/80 border border-slate-800 flex flex-col justify-between ${
          isTvMode ? 'p-2.5 sm:p-3' : 'p-3.5'
        }`}>
          <span className="text-xs font-medium text-slate-400 flex items-center justify-between">
            <span>Set Target</span>
            <Target className="w-3.5 h-3.5 text-blue-400" />
          </span>
          <div className={`${
            isTvMode ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl'
          } font-extrabold text-white tracking-tight mt-0.5`}>
            {formatBigCurrency(summary.monthlyTarget)}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
            <span>Total Quota Goal</span>
            {deptTargetSum > 0 && Math.abs(deptTargetSum - summary.monthlyTarget) < 1 && (
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> Sum Synced
              </span>
            )}
          </div>
        </div>

        {/* Total Achievement Box */}
        <div className={`rounded-xl border flex flex-col justify-between ${
          isTvMode ? 'p-2.5 sm:p-3' : 'p-3.5'
        } ${
          isTargetMet
            ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/40'
            : 'bg-gradient-to-br from-[#111827] to-blue-950/30 border-blue-500/30'
        }`}>
          <span className={`text-xs font-semibold flex items-center justify-between ${
            isTargetMet ? 'text-emerald-400' : 'text-blue-400'
          }`}>
            <span>Total Achievement</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <div className={`${
            isTvMode ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl'
          } font-extrabold tracking-tight mt-0.5 ${
            isTargetMet ? 'text-emerald-400' : 'text-white'
          }`}>
            {formatBigCurrency(summary.currentAchievement)}
          </div>
          <div className="flex items-center justify-between mt-0.5 text-[10px]">
            <span className={isTargetMet ? 'text-emerald-300 font-semibold' : 'text-slate-400'}>
              {isTargetMet ? 'Target Accomplished' : `${Math.max(0, 100 - rawAttainmentPercent)}% to Target`}
            </span>
            <span className={`font-bold px-1.5 py-0.5 rounded ${
              isTargetMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
            }`}>
              {rawAttainmentPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Status Pill */}
      <div className={`relative z-10 ${isTvMode ? 'my-1.5' : 'my-2.5'}`}>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-slate-400 font-medium">Progress to Goal</span>
          <span className={`font-bold ${isTargetMet ? 'text-emerald-400' : 'text-slate-200'}`}>
            {rawAttainmentPercent}% Attainment
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isTargetMet
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-lg shadow-emerald-500/50'
                : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-lg shadow-blue-500/40'
            }`}
            style={{ width: `${attainmentPercent}%` }}
          />
        </div>
      </div>

      {/* Target Met vs Shortfall Status Ribbon */}
      <div className={`rounded-xl border flex items-center justify-between text-xs relative z-10 transition-all ${
        isTvMode ? 'p-2 my-1' : 'p-3 my-2'
      } ${
        isTargetMet
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}>
        <div className="flex items-center gap-2">
          {isTargetMet ? (
            <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <div>
            <span className="font-bold block">
              {isTargetMet ? 'Goal Surpassed!' : 'Current Shortfall'}
            </span>
            <span className="text-[10px] text-slate-300 opacity-90">
              {isTargetMet
                ? `Exceeded quota by ${formatCurrency(surplus)}`
                : `${formatCurrency(shortfall)} needed to reach target`}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider block font-semibold opacity-80">
            {isTargetMet ? 'Surplus' : 'Remaining'}
          </span>
          <span className="font-extrabold text-xs sm:text-sm">
            {formatCurrency(isTargetMet ? surplus : shortfall)}
          </span>
        </div>
      </div>

      {/* Inbound / Outbound / Upgrade Breakdown Pill */}
      <div className={`grid grid-cols-4 gap-2 border-t border-slate-800/80 text-[11px] text-slate-400 relative z-10 ${
        isTvMode ? 'pt-1.5' : 'pt-2'
      }`}>
        <div>
          <span className="block text-[10px] text-slate-400">Inbound</span>
          <span className="font-bold text-white text-xs">{summary.inboundPercent}%</span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-400">Outbound</span>
          <span className="font-bold text-white text-xs">{summary.outboundPercent}%</span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-400">Upgrade</span>
          <span className="font-bold text-white text-xs">{summary.upgradePercent}%</span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-400">New Clients</span>
          <span className="font-bold text-emerald-400 text-xs">+{summary.newCustomers}</span>
        </div>
      </div>
    </div>
  );
};
