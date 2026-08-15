import React, { useState } from 'react';
import { RegionRevenueData } from '../types';
import { Info } from 'lucide-react';

interface RegionalRevenueChartProps {
  regions: RegionRevenueData[];
  timeLabel: string;
}

export const RegionalRevenueChart: React.FC<RegionalRevenueChartProps> = ({
  regions,
  timeLabel
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionRevenueData | null>(null);

  const maxVal = 2000000; // 2,000k scale as shown in screenshot

  const yTicks = [
    { label: '2,000k', value: 2000000 },
    { label: '1,500k', value: 1500000 },
    { label: '1,000k', value: 1000000 },
    { label: '500k', value: 500000 },
    { label: '0', value: 0 },
  ];

  // Helper for country flags styling
  const renderFlag = (region: RegionRevenueData) => {
    if (region.countryCode === 'US') {
      return (
        <span className="text-2xl shadow-sm filter drop-shadow hover:scale-110 transition-transform">
          🇺🇸
        </span>
      );
    }
    if (region.countryCode === 'GB') {
      return (
        <span className="text-2xl shadow-sm filter drop-shadow hover:scale-110 transition-transform">
          🇬🇧
        </span>
      );
    }
    if (region.countryCode === 'SE') {
      return (
        <span className="text-2xl shadow-sm filter drop-shadow hover:scale-110 transition-transform">
          🇸🇪
        </span>
      );
    }
    if (region.countryCode === 'KE') {
      return (
        <span className="text-2xl shadow-sm filter drop-shadow hover:scale-110 transition-transform">
          🇰🇪
        </span>
      );
    }
    return (
      <span className="text-xl">
        {region.flagEmoji}
      </span>
    );
  };

  return (
    <div className="card-dark rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-lg relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight">
            Global Sales Revenue by Region (Actual vs Target)
          </h2>
          <p className="text-xs text-slate-400 font-normal mt-0.5">
            {timeLabel}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6]"></span>
            <span>Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#93c5fd]"></span>
            <span>Target</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative flex-1 min-h-[260px] flex items-end pt-8 pb-4 pl-12 pr-4">
        {/* Y Axis Grid Lines & Labels */}
        <div className="absolute inset-0 pl-1 pr-4 pt-8 pb-10 flex flex-col justify-between pointer-events-none">
          {yTicks.map((tick) => (
            <div key={tick.label} className="flex items-center w-full">
              <span className="text-[11px] text-slate-400 font-medium w-11 text-right pr-2 shrink-0">
                {tick.label}
              </span>
              <div className="w-full h-[1px] bg-slate-800/80"></div>
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="grid grid-cols-4 gap-4 sm:gap-8 w-full h-[190px] items-end relative z-10">
          {regions.map((reg) => {
            // Target height as percentage of maxVal (2,000k)
            const targetHeightPercent = Math.min(100, (reg.target / maxVal) * 100);
            // Actual height as percentage of target height or maxVal
            const actualHeightPercent = Math.min(100, (reg.actual / reg.target) * 100);
            const attainmentPercent = Math.round((reg.actual / reg.target) * 100);

            return (
              <div
                key={reg.id}
                onMouseEnter={() => setHoveredRegion(reg)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="flex flex-col items-center h-full justify-end relative group cursor-pointer"
              >
                {/* Target Label On Top */}
                <div className="mb-1 text-xs font-semibold text-slate-200 tracking-tight transition-transform group-hover:-translate-y-0.5">
                  {reg.targetLabel}
                </div>

                {/* The Bar Stack */}
                <div 
                  className="w-10 sm:w-12 md:w-14 rounded-t-md relative overflow-hidden transition-all duration-300 group-hover:brightness-110"
                  style={{
                    height: `${targetHeightPercent}%`,
                    backgroundColor: '#93c5fd' // Target light blue cap / background
                  }}
                >
                  {/* Actual filled bar (vibrant darker blue) */}
                  <div
                    className="absolute bottom-0 inset-x-0 bg-[#3b82f6] transition-all duration-500 rounded-b-sm"
                    style={{
                      height: `${actualHeightPercent}%`
                    }}
                  >
                    {/* Inner subtle gradient shine */}
                    <div className="w-full h-full bg-gradient-to-t from-blue-700/40 to-blue-400/20"></div>
                  </div>
                </div>

                {/* Country Flag Circle at bottom */}
                <div className="mt-3 flex items-center justify-center">
                  {renderFlag(reg)}
                </div>

                {/* Attainment badge on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900/95 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white shadow-xl pointer-events-none whitespace-nowrap z-20">
                  <div className="font-semibold text-blue-400">{reg.name}</div>
                  <div className="text-slate-300">Actual: {reg.actualLabel || `$${(reg.actual / 1000000).toFixed(2)}M`} ({attainmentPercent}%)</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Footer with Global Attainment summary */}
      <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          Average Quota Attainment: <strong className="text-slate-200">62.8%</strong>
        </span>
        <span className="text-slate-400">Target Pace: On Track (+4.1%)</span>
      </div>
    </div>
  );
};
