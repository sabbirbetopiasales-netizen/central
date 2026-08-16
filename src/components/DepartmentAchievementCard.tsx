import React, { useState } from 'react';
import { DepartmentData } from '../types';
import { 
  Code2, 
  Cpu, 
  Megaphone, 
  LayoutTemplate, 
  Box, 
  Video, 
  Shirt, 
  Target, 
  CheckCircle2, 
  ArrowDownRight, 
  Edit2, 
  Check, 
  X, 
  Plus,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  Calculator,
  Sparkles
} from 'lucide-react';

interface DepartmentAchievementCardProps {
  departments: DepartmentData[];
  timeLabel: string;
  selectedDepartment: string | null;
  onSelectDepartment: (deptName: string | null) => void;
  onUpdateDepartmentTarget: (deptId: string, newTarget: number) => void;
  onUpdateDepartmentAchievement?: (deptId: string, newActual: number) => void;
  onBulkUpdateDepartments?: (newDepts: DepartmentData[]) => void;
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
  canEdit?: boolean;
  isTvMode?: boolean;
}

export const DepartmentAchievementCard: React.FC<DepartmentAchievementCardProps> = ({
  departments,
  timeLabel,
  selectedDepartment,
  onSelectDepartment,
  onUpdateDepartmentTarget,
  onUpdateDepartmentAchievement,
  onBulkUpdateDepartments,
  onOpenAdmin,
  isAdmin = false,
  canEdit = false,
  isTvMode = false
}) => {
  const [editingTargetDeptId, setEditingTargetDeptId] = useState<string | null>(null);
  const [editTargetValue, setEditTargetValue] = useState<string>('');

  const [editingActualDeptId, setEditingActualDeptId] = useState<string | null>(null);
  const [editActualValue, setEditActualValue] = useState<string>('');

  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkList, setBulkList] = useState<DepartmentData[]>([]);

  const allowEdit = canEdit || isAdmin;

  const renderIcon = (name: string, color: string) => {
    const iconProps = { className: isTvMode ? 'w-3 h-3 shrink-0' : 'w-3.5 h-3.5 shrink-0', style: { color } };
    switch (name) {
      case 'Code2':
        return <Code2 {...iconProps} />;
      case 'Cpu':
        return <Cpu {...iconProps} />;
      case 'Megaphone':
        return <Megaphone {...iconProps} />;
      case 'LayoutTemplate':
        return <LayoutTemplate {...iconProps} />;
      case 'Box':
        return <Box {...iconProps} />;
      case 'Video':
        return <Video {...iconProps} />;
      case 'Shirt':
        return <Shirt {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
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

  // Target Editing
  const startEditTarget = (dept: DepartmentData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTargetDeptId(dept.id);
    setEditTargetValue(dept.target.toString());
    setEditingActualDeptId(null);
  };

  const saveEditTarget = (deptId: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    const num = parseFloat(editTargetValue.replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num >= 0) {
      onUpdateDepartmentTarget(deptId, num);
    }
    setEditingTargetDeptId(null);
  };

  // Actual Achievement Editing
  const startEditActual = (dept: DepartmentData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingActualDeptId(dept.id);
    setEditActualValue(dept.actual.toString());
    setEditingTargetDeptId(null);
  };

  const saveEditActual = (deptId: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    const num = parseFloat(editActualValue.replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num >= 0 && onUpdateDepartmentAchievement) {
      onUpdateDepartmentAchievement(deptId, num);
    }
    setEditingActualDeptId(null);
  };

  // Bulk Edit Dialog
  const openBulkEditor = () => {
    setBulkList(JSON.parse(JSON.stringify(departments)));
    setShowBulkEdit(true);
  };

  const handleBulkChange = (id: string, field: 'target' | 'actual', val: number) => {
    setBulkList(prev => prev.map(d => d.id === id ? { ...d, [field]: val } : d));
  };

  const handleSaveBulk = (e: React.FormEvent) => {
    e.preventDefault();
    if (onBulkUpdateDepartments) {
      onBulkUpdateDepartments(bulkList);
    } else {
      bulkList.forEach(d => {
        onUpdateDepartmentTarget(d.id, d.target);
        if (onUpdateDepartmentAchievement) {
          onUpdateDepartmentAchievement(d.id, d.actual);
        }
      });
    }
    setShowBulkEdit(false);
  };

  // Calculate overall totals
  const totalTarget = departments.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
  const totalActual = departments.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);
  const overallAttainment = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0;

  const bulkTotalTarget = bulkList.reduce((acc, d) => acc + (Number(d.target) || 0), 0);
  const bulkTotalActual = bulkList.reduce((acc, d) => acc + (Number(d.actual) || 0), 0);

  return (
    <div className={`card-dark rounded-2xl flex flex-col justify-between h-full shadow-2xl border border-slate-800/80 bg-[#0e1424] min-h-0 ${
      isTvMode ? 'p-3 sm:p-4' : 'p-5 sm:p-6'
    }`}>
      {/* Title & Filter Header */}
      <div className={`flex items-center justify-between ${isTvMode ? 'mb-2' : 'mb-4'}`}>
        <div>
          <h2 className={`${isTvMode ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-bold text-white tracking-tight flex items-center gap-2`}>
            <Target className="w-4 h-4 text-amber-400" />
            <span>Department Targets & Achievements</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            {timeLabel} • Breakdown across all company units
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {selectedDepartment && (
            <button
              onClick={() => onSelectDepartment(null)}
              className="text-[11px] px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center gap-1 font-semibold"
            >
              <X className="w-3 h-3" />
              <span>Clear ({selectedDepartment})</span>
            </button>
          )}

          {allowEdit && (
            <button
              onClick={openBulkEditor}
              title="Quickly set all department targets in a single modal"
              className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition-colors flex items-center gap-1 font-semibold"
            >
              <Calculator className="w-3 h-3 text-emerald-400" />
              <span>Set All Targets</span>
            </button>
          )}

          {allowEdit && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3 h-3" />
              <span>Manage</span>
            </button>
          )}
        </div>
      </div>

      {/* Structured Department Table Inspired by Spreadsheet/Executive Layout */}
      <div className="w-full rounded-xl border border-amber-500/40 overflow-hidden shadow-lg bg-[#0b101b] flex-1 min-h-0 flex flex-col">
        {/* Golden / Amber Header Bar */}
        <div className={`grid grid-cols-12 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black px-3 font-black tracking-wide uppercase shadow-md select-none shrink-0 ${
          isTvMode ? 'py-1.5 text-xs' : 'py-2.5 text-xs sm:text-sm'
        }`}>
          <div className="col-span-5 sm:col-span-5 text-left flex items-center gap-2">
            <span>Department Name</span>
          </div>
          <div className="col-span-3 sm:col-span-3 text-center">
            <span>Target</span>
          </div>
          <div className="col-span-4 sm:col-span-4 text-right pr-1">
            <span>Achievement</span>
          </div>
        </div>

        {/* Department Table Rows (scrolls internally if needed in small screens) */}
        <div className="divide-y divide-slate-800/80 overflow-y-auto flex-1 min-h-0">
          {departments.map((dept, index) => {
            const attainment = dept.target > 0 ? Math.round((dept.actual / dept.target) * 100) : 0;
            const isSelected = selectedDepartment === dept.name;
            const isEditingTarget = allowEdit && editingTargetDeptId === dept.id;
            const isEditingActual = allowEdit && editingActualDeptId === dept.id;
            const isTargetMet = dept.target > 0 && dept.actual >= dept.target;
            const shortfall = Math.max(0, dept.target - dept.actual);
            const surplus = Math.max(0, dept.actual - dept.target);

            return (
              <div
                key={dept.id}
                id={`dept-table-row-${dept.id}`}
                onClick={() => onSelectDepartment(isSelected ? null : dept.name)}
                className={`grid grid-cols-12 items-center px-3 transition-all cursor-pointer group ${
                  isTvMode ? 'py-1.5' : 'py-2.5'
                } ${
                  isSelected
                    ? 'bg-amber-500/15 border-l-4 border-l-amber-400 font-semibold ring-1 ring-amber-500/30'
                    : index % 2 === 0
                    ? 'bg-[#0f172a]/50 hover:bg-slate-800/60'
                    : 'bg-[#0b1120]/70 hover:bg-slate-800/60'
                }`}
              >
                {/* Column 1: Department Name & Details */}
                <div className="col-span-5 sm:col-span-5 flex items-center gap-2 min-w-0 pr-1">
                  <div 
                    className="p-1 rounded-lg border border-slate-700/60 bg-[#0b101b] shrink-0"
                    style={{ borderColor: `${dept.color || '#3b82f6'}50` }}
                  >
                    {renderIcon(dept.iconName, dept.color || '#3b82f6')}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white block truncate tracking-tight group-hover:text-amber-300 transition-colors">
                      {dept.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      Lead: <strong className="text-slate-300 font-medium">{dept.leadRep || 'Team Lead'}</strong> • {dept.dealCount || 0} Deals
                    </span>
                  </div>
                </div>

                {/* Column 2: Target Amount */}
                <div className="col-span-3 sm:col-span-3 text-center">
                  {isEditingTarget ? (
                    <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        step="1000"
                        value={editTargetValue}
                        onChange={(e) => setEditTargetValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditTarget(dept.id, e);
                          if (e.key === 'Escape') setEditingTargetDeptId(null);
                        }}
                        className="w-20 bg-[#0b101b] border border-amber-400 rounded px-1.5 py-0.5 text-xs text-white font-bold focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={(e) => saveEditTarget(dept.id, e)}
                        className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                        title="Save Target"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTargetDeptId(null);
                        }}
                        className="p-1 rounded bg-slate-700 text-white hover:bg-slate-600"
                        title="Cancel"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={(e) => allowEdit && startEditTarget(dept, e)}
                      className={`inline-flex items-center justify-center gap-1 group/target rounded px-1.5 py-0.5 transition-colors ${
                        allowEdit ? 'hover:bg-slate-800/80 hover:text-amber-300 cursor-pointer' : ''
                      }`}
                      title={allowEdit ? 'Click to change target' : undefined}
                    >
                      <span className="text-xs sm:text-sm font-extrabold text-slate-200 tracking-tight">
                        {formatCurrency(dept.target)}
                      </span>
                      {allowEdit && (
                        <Edit2 className="w-3 h-3 opacity-0 group-hover/target:opacity-100 text-amber-400 transition-opacity" />
                      )}
                    </div>
                  )}
                </div>

                {/* Column 3: Achievement Amount & Attainment Indicator */}
                <div className="col-span-4 sm:col-span-4 text-right pr-1">
                  <div className="flex flex-col items-end">
                    {isEditingActual ? (
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="number"
                          step="1000"
                          value={editActualValue}
                          onChange={(e) => setEditActualValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditActual(dept.id, e);
                            if (e.key === 'Escape') setEditingActualDeptId(null);
                          }}
                          className="w-20 bg-[#0b101b] border border-emerald-400 rounded px-1.5 py-0.5 text-xs text-emerald-400 font-bold focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={(e) => saveEditActual(dept.id, e)}
                          className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                          title="Save Achievement"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingActualDeptId(null);
                          }}
                          className="p-1 rounded bg-slate-700 text-white hover:bg-slate-600"
                          title="Cancel"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={(e) => allowEdit && onUpdateDepartmentAchievement && startEditActual(dept, e)}
                        className={`flex items-center justify-end gap-1 rounded px-1 py-0.5 transition-colors group/actual ${
                          allowEdit && onUpdateDepartmentAchievement ? 'hover:bg-slate-800/80 cursor-pointer' : ''
                        }`}
                        title={allowEdit ? 'Click to edit achievement' : undefined}
                      >
                        <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                          {formatCurrency(dept.actual)}
                        </span>
                        {allowEdit && onUpdateDepartmentAchievement && (
                          <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover/actual:opacity-100 text-emerald-400 transition-opacity" />
                        )}
                        <span 
                          className={`text-[9px] sm:text-xs font-bold px-1.5 py-0.2 rounded ml-0.5 ${
                            isTargetMet 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {attainment}%
                        </span>
                      </div>
                    )}

                    {/* Progress Bar & Shortfall/Surplus Note */}
                    <div className="w-full max-w-[130px] mt-0.5 hidden sm:block">
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isTargetMet ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : ''
                          }`}
                          style={{
                            width: `${Math.min(100, attainment)}%`,
                            backgroundColor: isTargetMet ? undefined : dept.color || '#f59e0b',
                          }}
                        />
                      </div>
                      <div className="text-[9px] text-slate-400 truncate text-right">
                        {isTargetMet ? (
                          <span className="text-emerald-400 font-semibold">Met (+{formatCurrency(surplus)})</span>
                        ) : (
                          <span className="text-amber-400/90 font-medium">Gap: {formatCurrency(shortfall)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals Summary Footer Row */}
        <div className={`grid grid-cols-12 items-center px-3 bg-[#0d1627] border-t-2 border-amber-500/40 text-xs sm:text-sm font-extrabold text-white shrink-0 ${
          isTvMode ? 'py-2' : 'py-3'
        }`}>
          <div className="col-span-5 sm:col-span-5 flex items-center gap-1.5 text-amber-400 uppercase tracking-wide">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Total All Departments</span>
          </div>
          <div className="col-span-3 sm:col-span-3 text-center text-amber-300 font-extrabold flex items-center justify-center gap-1">
            <span>{formatCurrency(totalTarget)}</span>
          </div>
          <div className="col-span-4 sm:col-span-4 text-right pr-1 flex items-center justify-end gap-1.5">
            <span className="text-emerald-400 font-extrabold">{formatCurrency(totalActual)}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {overallAttainment}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className={`border-t border-slate-800/60 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 ${
        isTvMode ? 'pt-1.5 mt-1' : 'pt-3 mt-3'
      }`}>
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3 text-amber-400" />
          <span>Click any row to filter • Click numbers to edit inline</span>
        </span>
        <span className="text-amber-400 font-semibold">{departments.length} Specialized Departments</span>
      </div>

      {/* Bulk Set All Targets Modal */}
      {showBulkEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Set All Department Targets & Achievements</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Update targets for all departments. The total sum will automatically synchronize to company targets.
                </p>
              </div>
              <button
                onClick={() => setShowBulkEdit(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Departments Grid Form */}
            <form onSubmit={handleSaveBulk} className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="space-y-2">
                {bulkList.map((dept) => {
                  const attainment = Math.round((dept.actual / (dept.target || 1)) * 100);
                  return (
                    <div
                      key={dept.id}
                      className="p-3 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-[160px]">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: dept.color }}
                        >
                          {dept.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block truncate">{dept.name}</span>
                          <span className="text-[10px] text-slate-400 block">{dept.leadRep}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 flex-1 max-w-xs">
                        <div>
                          <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">Target ($)</label>
                          <input
                            type="number"
                            step="1000"
                            value={dept.target}
                            onChange={(e) => handleBulkChange(dept.id, 'target', Number(e.target.value))}
                            className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">Achievement ($)</label>
                          <input
                            type="number"
                            step="1000"
                            value={dept.actual}
                            onChange={(e) => handleBulkChange(dept.id, 'actual', Number(e.target.value))}
                            className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold"
                          />
                        </div>
                      </div>

                      <div className="text-right min-w-[60px]">
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                          dept.actual >= dept.target ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {attainment}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Sum Simulation Bar */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Simulated Total Office Target Sum:</span>
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    Saving will automatically update Company Quota Goal to <strong>{formatCurrency(bulkTotalTarget)}</strong> and Total Won to <strong>{formatCurrency(bulkTotalActual)}</strong>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-400 block">
                    {formatCurrency(bulkTotalTarget)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Won: {formatCurrency(bulkTotalActual)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBulkEdit(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply & Auto-Sum Target</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
