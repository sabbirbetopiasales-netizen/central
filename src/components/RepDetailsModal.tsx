import React from 'react';
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
  CheckCircle2
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

  const attainment = Math.round((rep.wonDealsAmount / rep.targetAmount) * 100);

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

        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close details"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 text-slate-300 hover:text-white border border-slate-700/60 shadow-md transition-all z-30 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

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
      </div>
    </div>
  );
};
