import React from 'react';
import { SalesRep } from '../types';
import { Sparkles, Trophy, Award } from 'lucide-react';

interface PodiumCardProps {
  topReps: SalesRep[];
  timeLabel: string;
  onSelectRep: (rep: SalesRep) => void;
}

export const PodiumCard: React.FC<PodiumCardProps> = ({
  topReps,
  timeLabel,
  onSelectRep
}) => {
  const rep1 = topReps[0];
  const rep2 = topReps[1];
  const rep3 = topReps[2];

  const formatRevenue = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `$${Math.round(val / 1000)}k`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="card-dark rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden group shadow-lg">
      {/* Subtle top ambient glow */}
      <div className="absolute -top-16 left-1/4 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header */}
      <div className="mb-6 relative z-10">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          Global Sales Performance Leaderboard
        </h2>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          {timeLabel}
        </p>
      </div>

      {/* 3 Podium Avatars */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pb-4 pt-2 relative z-10">
        {/* 1st Place (Karen C. - Rank 1) */}
        {rep1 && (
          <div 
            onClick={() => onSelectRep(rep1)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Avatar with Golden Ring */}
            <div className="relative mb-3.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 gold-glow relative">
                <img
                  src={rep1.avatar}
                  alt={rep1.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border-2 border-[#151c2d]"
                />
              </div>

              {/* Gold Rank Badge #1 with sparkles */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-md border-2 border-[#151c2d]">
                    1
                  </div>
                  {/* Sparkle Icons */}
                  <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-2 -right-3 animate-pulse" />
                  <Sparkles className="w-3 h-3 text-amber-300 absolute -bottom-1 -left-2.5" />
                </div>
              </div>
            </div>

            {/* Rep Info */}
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1 truncate max-w-[110px] sm:max-w-none">
              {rep1.name}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              {formatRevenue(rep1.wonDealsAmount)}
            </span>
          </div>
        )}

        {/* 2nd Place (Rank 2) */}
        {rep2 && (
          <div 
            onClick={() => onSelectRep(rep2)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Avatar with Silver Ring */}
            <div className="relative mb-3.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 silver-glow relative">
                <img
                  src={rep2.avatar}
                  alt={rep2.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border-2 border-[#151c2d]"
                />
              </div>

              {/* Silver Rank Badge #2 */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-md border-2 border-[#151c2d]">
                  2
                </div>
              </div>
            </div>

            {/* Rep Info */}
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1 truncate max-w-[110px] sm:max-w-none">
              {rep2.name}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              {formatRevenue(rep2.wonDealsAmount)}
            </span>
          </div>
        )}

        {/* 3rd Place (Rank 3) */}
        {rep3 && (
          <div 
            onClick={() => onSelectRep(rep3)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Avatar with Bronze Ring */}
            <div className="relative mb-3.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-700 via-orange-500 to-amber-400 bronze-glow relative">
                <img
                  src={rep3.avatar}
                  alt={rep3.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full border-2 border-[#151c2d]"
                />
              </div>

              {/* Bronze Rank Badge #3 */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-amber-400 to-orange-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md border-2 border-[#151c2d]">
                  3
                </div>
              </div>
            </div>

            {/* Rep Info */}
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1 truncate max-w-[110px] sm:max-w-none">
              {rep3.name}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              {formatRevenue(rep3.wonDealsAmount)}
            </span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800/40 flex justify-between items-center text-[11px] text-slate-400">
        <span>Click any top performer to see complete deals pipeline</span>
        <span className="flex items-center gap-1 text-blue-400 font-medium">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          President's Club Q3
        </span>
      </div>
    </div>
  );
};
