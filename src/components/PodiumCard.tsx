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

      {/* 3 Podium Avatars (2nd Left - 1st Center Elevated - 3rd Right) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end justify-items-center pb-4 pt-2 relative z-10">
        {/* 2nd Place (Rank 2) - Left */}
        {rep2 && (
          <div 
            onClick={() => onSelectRep(rep2)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 w-full"
          >
            {/* Avatar with Silver Ring */}
            <div className="relative mb-3.5">
              <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-2xl p-1 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 silver-glow relative aspect-square shadow-xl">
                <img
                  src={rep2.avatar}
                  alt={rep2.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
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

        {/* 1st Place (Rank 1) - Center Elevated */}
        {rep1 && (
          <div 
            onClick={() => onSelectRep(rep1)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 w-full -translate-y-2 sm:-translate-y-4"
          >
            {/* Avatar with Golden Ring */}
            <div className="relative mb-3.5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 gold-glow relative aspect-square shadow-2xl">
                <img
                  src={rep1.avatar}
                  alt={rep1.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
                />
              </div>

              {/* Gold Rank Badge #1 with sparkles */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-md border-2 border-[#151c2d]">
                    1
                  </div>
                  {/* Sparkle Icons */}
                  <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-2 -right-3 animate-pulse" />
                  <Sparkles className="w-3 h-3 text-amber-300 absolute -bottom-1 -left-2.5" />
                </div>
              </div>
            </div>

            {/* Rep Info */}
            <span className="text-xs sm:text-base text-slate-100 font-bold mt-1 truncate max-w-[120px] sm:max-w-none">
              {rep1.name}
            </span>
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-0.5">
              {formatRevenue(rep1.wonDealsAmount)}
            </span>
          </div>
        )}

        {/* 3rd Place (Rank 3) - Right */}
        {rep3 && (
          <div 
            onClick={() => onSelectRep(rep3)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 w-full"
          >
            {/* Avatar with Bronze Ring */}
            <div className="relative mb-3.5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl p-1 bg-gradient-to-tr from-amber-700 via-orange-500 to-amber-400 bronze-glow relative aspect-square shadow-xl">
                <img
                  src={rep3.avatar}
                  alt={rep3.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
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
