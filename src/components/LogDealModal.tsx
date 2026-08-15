import React, { useState } from 'react';
import { SalesRep, Deal } from '../types';
import { X, Sparkles, DollarSign, Building, User, Tag, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationSound } from '../utils/audio';

interface LogDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  reps: SalesRep[];
  onAddDeal: (deal: Omit<Deal, 'id' | 'date'>) => void;
  isSoundEnabled: boolean;
  initialRepId?: string;
}

export const LogDealModal: React.FC<LogDealModalProps> = ({
  isOpen,
  onClose,
  reps,
  onAddDeal,
  isSoundEnabled,
  initialRepId
}) => {
  const [selectedRepId, setSelectedRepId] = useState(initialRepId || reps[0]?.id || '');
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [dealType, setDealType] = useState<'Inbound' | 'Outbound' | 'Upgrade'>('Inbound');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!numAmount || numAmount <= 0) return;

    const rep = reps.find(r => r.id === selectedRepId) || reps[0];

    onAddDeal({
      client: clientName.trim() || 'Strategic Enterprise Partner',
      amount: numAmount,
      type: dealType,
      repId: rep.id,
      repName: rep.name,
      department: rep.department,
      region: rep.region,
    });

    // Fire Confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#eab308', '#10b981', '#f97316', '#6366f1']
    });

    // Sound
    if (isSoundEnabled) {
      playCelebrationSound();
    }

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
      // Reset
      setClientName('');
      setAmount('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg card-dark rounded-2xl p-6 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Log Closed-Won Deal
              </h3>
              <p className="text-xs text-slate-400">
                Celebrate a win and update leaderboard live
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-xl font-bold text-white">Deal Logged Successfully!</h4>
            <p className="text-xs text-slate-400 mt-1">Leaderboard and quotas updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sales Rep Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Sales Representative
              </label>
              <select
                value={selectedRepId}
                onChange={(e) => setSelectedRepId(e.target.value)}
                className="w-full bg-[#111827] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {reps.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name} ({rep.region}) — Currently ${rep.wonDealsAmount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Deal Value */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Deal Value (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  step="1000"
                  required
                  placeholder="e.g. 150000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#111827] border border-slate-700/80 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>
            </div>

            {/* Client / Account Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                Client / Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Global Technologies"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#111827] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-600"
              />
            </div>

            {/* Deal Type Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Revenue Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Inbound', 'Outbound', 'Upgrade'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDealType(type)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      dealType === type
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                        : 'bg-[#111827] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Submit & Celebrate</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
