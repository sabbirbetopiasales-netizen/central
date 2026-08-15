import React from 'react';
import { KpiMetrics } from '../types';
import { TrendingUp, ArrowUpRight, Users, Zap, Compass, RefreshCw } from 'lucide-react';

interface KpiGridProps {
  kpis: KpiMetrics;
  timeLabel: string;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ kpis, timeLabel }) => {
  const cards = [
    {
      id: 'kpi-inbound',
      title: 'Inbound Revenue',
      subtitle: timeLabel,
      value: `${kpis.inboundRevenuePercent}%`,
      subtext: '+8.4% vs last period',
      icon: Compass,
      accentColor: 'text-blue-400',
    },
    {
      id: 'kpi-outbound',
      title: 'Outbound Revenue',
      subtitle: timeLabel,
      value: `${kpis.outboundRevenuePercent}%`,
      subtext: '+4.2% vs target',
      icon: Zap,
      accentColor: 'text-indigo-400',
    },
    {
      id: 'kpi-upgrade',
      title: 'Revenue from Upgrade',
      subtitle: timeLabel,
      value: `${kpis.upgradeRevenuePercent}%`,
      subtext: '+2.1% expansion',
      icon: RefreshCw,
      accentColor: 'text-emerald-400',
    },
    {
      id: 'kpi-new-customers',
      title: 'New Customers',
      subtitle: timeLabel,
      value: `${kpis.newCustomers}`,
      subtext: 'Target: 170 accounts',
      icon: Users,
      accentColor: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className="card-dark rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200 group shadow-md"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 tracking-tight leading-snug">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                {card.subtitle}
              </p>
            </div>

            {/* Big Value Number */}
            <div className="my-2 sm:my-3">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {card.value}
              </span>
            </div>

            {/* Footer / Trend */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/40">
              <span className="truncate">{card.subtext}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
