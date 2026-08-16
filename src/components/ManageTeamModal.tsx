import React, { useState } from 'react';
import { SalesRep, DepartmentData } from '../types';
import { X, Plus, Trash2, RotateCcw, Edit2, Check, UserPlus, Image as ImageIcon } from 'lucide-react';

interface ManageTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  reps: SalesRep[];
  onUpdateRep: (rep: SalesRep) => void;
  onAddRep: (rep: Omit<SalesRep, 'id'>) => void;
  onDeleteRep: (id: string) => void;
  onResetDefaults: () => void;
  departments?: DepartmentData[];
}

export const ManageTeamModal: React.FC<ManageTeamModalProps> = ({
  isOpen,
  onClose,
  reps,
  onUpdateRep,
  onAddRep,
  onDeleteRep,
  onResetDefaults,
  departments
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEmployeeId, setEditEmployeeId] = useState('');
  const [editName, setEditName] = useState('');
  const [editDept, setEditDept] = useState<string>('Full Stack Development');
  const [editWonAmount, setEditWonAmount] = useState<number>(0);
  const [editDemos, setEditDemos] = useState<string | number>('');
  const [editAvatar, setEditAvatar] = useState<string>('');

  // New Rep Form
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState<string>('Full Stack Development');
  const [newRole, setNewRole] = useState('Account Executive');
  const [newRegion, setNewRegion] = useState('USA');
  const [newWonAmount, setNewWonAmount] = useState('0');
  const [newDemos, setNewDemos] = useState('0');
  const [newAvatar, setNewAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');

  const deptNames = departments && departments.length > 0
    ? departments.map(d => d.name)
    : ['CMS', 'Full Stack Development', 'AI Development', 'V&C', '2D & 3D Architech', 'T-shirt Design', 'Digital Marketing'];

  if (!isOpen) return null;

  const startEdit = (rep: SalesRep) => {
    setEditingId(rep.id);
    setEditEmployeeId(rep.employeeId || '');
    setEditName(rep.name);
    setEditDept(rep.department || 'Full Stack Development');
    setEditWonAmount(rep.wonDealsAmount);
    setEditDemos(rep.demosCount);
    setEditAvatar(rep.avatar);
  };

  const saveEdit = (rep: SalesRep) => {
    onUpdateRep({
      ...rep,
      employeeId: editEmployeeId.trim() || undefined,
      name: editName.trim() || rep.name,
      displayName: editName.trim() || rep.name,
      department: editDept,
      wonDealsAmount: Number(editWonAmount) || rep.wonDealsAmount,
      demosCount: editDemos || rep.demosCount,
      avatar: editAvatar.trim() || rep.avatar,
    });
    setEditingId(null);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddRep({
      employeeId: newEmployeeId.trim() || undefined,
      name: newName.trim(),
      displayName: newName.trim(),
      avatar: newAvatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      wonDealsAmount: parseFloat(newWonAmount) || 0,
      demosCount: newDemos || 0,
      badges: [],
      role: newRole,
      department: newDept,
      region: newRegion,
      targetAmount: 0,
      winRate: 0,
      recentDeals: []
    });

    setIsAddingNew(false);
    setNewEmployeeId('');
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl card-dark rounded-2xl p-6 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Manage Sales Team & Departments
            </h3>
            <p className="text-xs text-slate-400">
              Customize office representatives, department assignments, and quotas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all sales data back to default?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              title="Reset data to default"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#111827] border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add New Rep Toggle */}
        <div className="mb-4 shrink-0">
          {!isAddingNew ? (
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600/30 text-xs font-semibold transition-all w-full justify-center"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add New Representative</span>
            </button>
          ) : (
            <form onSubmit={handleAddNew} className="p-4 bg-[#111827] border border-slate-700 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">New Sales Rep</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Employee ID (e.g. 1034)"
                  value={newEmployeeId}
                  onChange={(e) => setNewEmployeeId(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Rep Full Name"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                >
                  {deptNames.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                >
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                </select>
                <input
                  type="number"
                  placeholder="Won Revenue ($)"
                  value={newWonAmount}
                  onChange={(e) => setNewWonAmount(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newAvatar}
                  onChange={(e) => setNewAvatar(e.target.value)}
                  className="bg-[#0b101b] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  Save Rep
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Reps List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800/50">
          {reps.map((rep) => {
            const isEditing = editingId === rep.id;

            return (
              <div
                key={rep.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#111827]/40 hover:bg-[#111827] border border-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={rep.avatar}
                    alt={rep.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                    }}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                  />

                  {isEditing ? (
                    <div className="flex flex-wrap items-center gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="ID"
                        value={editEmployeeId}
                        onChange={(e) => setEditEmployeeId(e.target.value)}
                        className="bg-[#0b101b] border border-slate-700 rounded px-2 py-1 text-xs text-blue-400 font-mono font-bold w-16 text-center"
                      />
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-[#0b101b] border border-slate-700 rounded px-2 py-1 text-xs text-white w-28"
                      />
                      <select
                        value={editDept}
                        onChange={(e) => setEditDept(e.target.value)}
                        className="bg-[#0b101b] border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      >
                        {deptNames.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={editWonAmount}
                        onChange={(e) => setEditWonAmount(Number(e.target.value))}
                        className="bg-[#0b101b] border border-slate-700 rounded px-2 py-1 text-xs text-white w-24"
                        placeholder="Won $"
                      />
                      <input
                        type="url"
                        value={editAvatar}
                        onChange={(e) => setEditAvatar(e.target.value)}
                        className="bg-[#0b101b] border border-slate-700 rounded px-2 py-1 text-xs text-white w-36 font-mono"
                        placeholder="Image URL"
                      />
                    </div>
                  ) : (
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {rep.employeeId && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            ID: {rep.employeeId}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-white truncate">{rep.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                          {rep.department}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {rep.region}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Won: <strong className="text-slate-200">${rep.wonDealsAmount.toLocaleString()}</strong> • Demos: {rep.demosCount}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 ml-3 shrink-0">
                  {isEditing ? (
                    <button
                      onClick={() => saveEdit(rep)}
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-xs"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(rep)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                      title="Edit representative"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${rep.name} from sales roster?`)) {
                        onDeleteRep(rep.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                    title="Delete representative"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
