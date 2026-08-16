import React, { useState } from 'react';
import { SalesRep } from '../types';
import { 
  X, 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  TrendingUp, 
  Calendar, 
  Building, 
  DollarSign, 
  Mail, 
  Phone,
  CheckCircle2,
  Edit3,
  Save,
  Upload,
  ImageIcon
} from 'lucide-react';

interface RepDetailsModalProps {
  rep: SalesRep | null;
  onClose: () => void;
  rank: number;
  canEdit?: boolean;
  isAdmin?: boolean;
  onUpdateRep?: (rep: SalesRep) => void;
  onDeleteRep?: (id: string) => void;
  onQuickLogDeal?: (repId: string) => void;
}

export const RepDetailsModal: React.FC<RepDetailsModalProps> = ({
  rep,
  onClose,
  rank,
  canEdit,
  isAdmin,
  onUpdateRep,
  onDeleteRep,
  onQuickLogDeal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<SalesRep | null>(null);

  React.useEffect(() => {
    if (rep) {
      setEditFormData(rep);
      setIsEditing(false);
    }
  }, [rep]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!rep) return null;

  const currentRep = isEditing && editFormData ? editFormData : rep;
  const attainment = Math.round((currentRep.wonDealsAmount / (currentRep.targetAmount || 1)) * 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    const updatedRep: SalesRep = {
      ...editFormData,
      name: editFormData.name.trim(),
      displayName: editFormData.name.trim(),
      employeeId: editFormData.employeeId ? editFormData.employeeId.trim() : undefined,
      targetAmount: Number(editFormData.targetAmount) || 0,
      wonDealsAmount: Number(editFormData.wonDealsAmount) || 0,
      demosCount: Number(editFormData.demosCount) || 0,
      winRate: Number(editFormData.winRate) || 0,
    };

    onUpdateRep?.(updatedRep);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editFormData) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setEditFormData({ ...editFormData, avatar: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl card-dark rounded-2xl p-6 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Background Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Actions: Edit Toggle & Close Button */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
          {(canEdit || isAdmin) && onUpdateRep && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing) {
                  setIsEditing(false);
                  setEditFormData(rep);
                } else {
                  setEditFormData(rep);
                  setIsEditing(true);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                isEditing 
                  ? 'bg-amber-600/30 text-amber-300 border-amber-500/40 hover:bg-amber-600/50' 
                  : 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close details"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 text-slate-300 hover:text-white border border-slate-700/60 shadow-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isEditing && editFormData ? (
          /* ================= EDIT MODE FORM ================= */
          <form onSubmit={handleSave} className="space-y-4 pt-2 relative z-10">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="relative group">
                <img
                  src={editFormData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={editFormData.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                />
                <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                  <Upload className="w-4 h-4 text-blue-400" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-blue-400" />
                  Edit Sales Representative Details
                </h3>
                <p className="text-xs text-slate-400">All fields are editable and will update rankings across all dashboards.</p>
              </div>
            </div>

            {/* Row 1: Employee ID & Name & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Employee ID</label>
                <input
                  type="text"
                  value={editFormData.employeeId || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, employeeId: e.target.value })}
                  placeholder="e.g. 1034"
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value, displayName: e.target.value })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-semibold focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Region</label>
                <input
                  type="text"
                  value={editFormData.region}
                  onChange={(e) => setEditFormData({ ...editFormData, region: e.target.value })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 2: Department & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Department</label>
                <input
                  type="text"
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Role / Job Title</label>
                <input
                  type="text"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 3: Target, Won, Demos, Win Rate */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Target Quota ($)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={editFormData.targetAmount}
                  onChange={(e) => setEditFormData({ ...editFormData, targetAmount: Number(e.target.value) })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Won Revenue ($)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={editFormData.wonDealsAmount}
                  onChange={(e) => setEditFormData({ ...editFormData, wonDealsAmount: Number(e.target.value) })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Demos Given</label>
                <input
                  type="number"
                  min="0"
                  value={editFormData.demosCount}
                  onChange={(e) => setEditFormData({ ...editFormData, demosCount: Number(e.target.value) })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Win Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editFormData.winRate}
                  onChange={(e) => setEditFormData({ ...editFormData, winRate: Number(e.target.value) })}
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-blue-400 font-bold"
                />
              </div>
            </div>

            {/* Row 4: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editFormData.email || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editFormData.phone || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 5: Photo URL & Upload */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-slate-300 font-semibold">Avatar Image URL</label>
                <label className="cursor-pointer text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>Upload Local Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
              <input
                type="url"
                value={editFormData.avatar}
                onChange={(e) => setEditFormData({ ...editFormData, avatar: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#0b101b] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
              />
            </div>

            {/* Save & Cancel */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditFormData(rep);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* ================= VIEW MODE ================= */
          <>
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-slate-800 relative z-10">
              <div className="relative">
                <img
                  src={rep.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={rep.name || 'Sales Representative'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                  }}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
                />
                <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md border border-slate-900">
                  #{rank}
                </div>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {rep.name}
                  </h3>
                  {rep.employeeId && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      ID: {rep.employeeId}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {rep.department}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                    {rep.region}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-0.5">
                  {rep.role}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 mt-2">
                  {rep.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {rep.email}
                    </span>
                  )}
                  {rep.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {rep.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* KPI Mini-Cards */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Won Revenue</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  ${rep.wonDealsAmount.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-400">{attainment}% Quota Met</span>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Win Rate</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  {rep.winRate}%
                </div>
                <span className="text-[10px] text-blue-400">Top Tier</span>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Demos Given</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  {rep.demosCount}
                </div>
                <span className="text-[10px] text-indigo-400">Active Pipeline</span>
              </div>
            </div>

            {/* Quota Attainment Progress Bar */}
            <div className="bg-[#111827] border border-slate-800/80 rounded-xl p-3.5 mb-4">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Monthly Target (${rep.targetAmount.toLocaleString()})</span>
                <span className="text-blue-400 font-bold">{attainment}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, attainment)}%` }}
                ></div>
              </div>
            </div>

            {/* Recent Deals Section */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                Recent Closed-Won Deals
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {rep.recentDeals && rep.recentDeals.length > 0 ? (
                  rep.recentDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#111827]/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-semibold text-white truncate">
                            {deal.client}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {deal.type} Channel • {deal.date}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-white shrink-0 ml-2">
                        +${deal.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-slate-500">
                    No recent individual transactions recorded.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

