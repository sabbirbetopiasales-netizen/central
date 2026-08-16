import React from 'react';
import { SalesRep } from '../types';
import { Sparkles, Trophy, Award, TrendingUp } from 'lucide-react';

interface PodiumTop10CardProps {
  reps: SalesRep[];
  timeLabel: string;
  onSelectRep: (rep: SalesRep) => void;
  isTvMode?: boolean;
}

export const PodiumTop10Card: React.FC<PodiumTop10CardProps> = ({
  reps,
  timeLabel,
  onSelectRep,
  isTvMode = false
}) => {
  // Sort reps descending by won revenue to get top 10
  const sortedReps = [...reps].sort((a, b) => b.wonDealsAmount - a.wonDealsAmount);
  const top10 = sortedReps.slice(0, 10);

  const rep1 = top10[0];
  const rep2 = top10[1];
  const rep3 = top10[2];
  const rest7 = top10.slice(3, 10);

  const formatRevenue = (val: number) => {
    if (!val) return '$0';
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `$${Math.round(val / 1000)}k`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className={`card-dark rounded-2xl flex flex-col justify-between h-full relative overflow-hidden shadow-xl border border-slate-800/80 ${
      isTvMode ? 'p-3 sm:p-4' : 'p-5 sm:p-6'
    }`}>
      {/* Background ambient glow */}
      <div className="absolute -top-20 left-1/3 w-80 h-44 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header - Centered & Larger Title */}
      <div className={`flex items-center justify-center relative z-10 ${isTvMode ? 'mb-2' : 'mb-3'}`}>
        <h2 className={`${isTvMode ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'} font-extrabold text-white tracking-tight text-center drop-shadow-sm`}>
          Top 10 Sellers Leaderboard
        </h2>
      </div>

      {/* TOP 3 PODIUM (Square Box Frames, 2nd Left - 1st Center Elevated - 3rd Right) */}
      <div className={`grid grid-cols-3 gap-2 sm:gap-4 items-end justify-items-center relative z-10 border-b border-slate-800/60 ${
        isTvMode ? 'pb-2 pt-2' : 'pb-4 pt-3'
      }`}>
        {/* 2nd Place (Left side, slightly smaller than 1st) */}
        {rep2 ? (
          <div 
            id={`podium-2-${rep2.id}`}
            onClick={() => onSelectRep(rep2)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 group w-full"
          >
            <div className={`relative ${isTvMode ? 'mb-2.5' : 'mb-3.5'}`}>
              <div className={`rounded-2xl p-1 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 silver-glow relative aspect-square shadow-xl ${
                isTvMode ? 'w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24' : 'w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28'
              }`}>
                <img
                  src={rep2.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={rep2.name || 'Seller'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                  }}
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
                />
              </div>

              {/* Silver Rank Badge #2 */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className={`${
                  isTvMode ? 'w-6 h-6 text-xs' : 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm'
                } rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-slate-950 font-extrabold flex items-center justify-center shadow-md border-2 border-[#151c2d]`}>
                  2
                </div>
              </div>
            </div>

            <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-1 truncate max-w-[110px] sm:max-w-[130px] group-hover:text-blue-400 transition-colors">
              {rep2.name}
            </span>
            <span className="text-[10px] text-indigo-400 font-medium truncate max-w-[100px] sm:max-w-[120px]">
              {rep2.department}
            </span>
            <span className={`${
              isTvMode ? 'text-base sm:text-xl md:text-2xl' : 'text-lg sm:text-2xl md:text-3xl'
            } font-bold text-white tracking-tight mt-0.5`}>
              {formatRevenue(rep2.wonDealsAmount)}
            </span>
          </div>
        ) : <div className="w-full" />}

        {/* 1st Place (Middle / Center, elevated up top, biggest square box) */}
        {rep1 ? (
          <div 
            id={`podium-1-${rep1.id}`}
            onClick={() => onSelectRep(rep1)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 group w-full -translate-y-2 sm:-translate-y-4"
          >
            <div className={`relative ${isTvMode ? 'mb-2.5' : 'mb-3.5'}`}>
              <div className={`rounded-2xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 gold-glow relative aspect-square shadow-2xl ${
                isTvMode ? 'w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30' : 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36'
              }`}>
                <img
                  src={rep1.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={rep1.name || 'Top Seller'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                  }}
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
                />
              </div>

              {/* Gold Rank Badge #1 with Sparkles */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="relative">
                  <div className={`${
                    isTvMode ? 'w-7 h-7 text-xs' : 'w-8 h-8 sm:w-9 sm:h-9 text-sm'
                  } rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 text-slate-950 font-extrabold flex items-center justify-center shadow-md border-2 border-[#151c2d]`}>
                    1
                  </div>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 absolute -top-2 -right-2.5 animate-pulse" />
                </div>
              </div>
            </div>

            <span className="text-xs sm:text-base text-slate-100 font-bold mt-1 truncate max-w-[120px] sm:max-w-[150px] group-hover:text-amber-400 transition-colors">
              {rep1.name}
            </span>
            <span className="text-[10px] sm:text-xs text-amber-400/90 font-medium truncate max-w-[110px] sm:max-w-[130px]">
              {rep1.department}
            </span>
            <span className={`${
              isTvMode ? 'text-lg sm:text-2xl md:text-3xl' : 'text-xl sm:text-3xl md:text-4xl'
            } font-extrabold text-white tracking-tight mt-0.5 drop-shadow-sm`}>
              {formatRevenue(rep1.wonDealsAmount)}
            </span>
          </div>
        ) : <div className="w-full" />}

        {/* 3rd Place (Right side, slightly smaller than 1st) */}
        {rep3 ? (
          <div 
            id={`podium-3-${rep3.id}`}
            onClick={() => onSelectRep(rep3)}
            className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 group w-full"
          >
            <div className={`relative ${isTvMode ? 'mb-2.5' : 'mb-3.5'}`}>
              <div className={`rounded-2xl p-1 bg-gradient-to-tr from-amber-700 via-orange-500 to-amber-400 bronze-glow relative aspect-square shadow-xl ${
                isTvMode ? 'w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24' : 'w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26'
              }`}>
                <img
                  src={rep3.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={rep3.name || 'Seller'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                  }}
                  className="w-full h-full object-cover rounded-xl border-2 border-[#151c2d]"
                />
              </div>

              {/* Bronze Rank Badge #3 */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className={`${
                  isTvMode ? 'w-6 h-6 text-xs' : 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm'
                } rounded-full bg-gradient-to-b from-amber-400 to-orange-600 text-white font-extrabold flex items-center justify-center shadow-md border-2 border-[#151c2d]`}>
                  3
                </div>
              </div>
            </div>

            <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-1 truncate max-w-[110px] sm:max-w-[130px] group-hover:text-blue-400 transition-colors">
              {rep3.name}
            </span>
            <span className="text-[10px] text-purple-400 font-medium truncate max-w-[100px] sm:max-w-[120px]">
              {rep3.department}
            </span>
            <span className={`${
              isTvMode ? 'text-base sm:text-xl md:text-2xl' : 'text-lg sm:text-2xl md:text-3xl'
            } font-bold text-white tracking-tight mt-0.5`}>
              {formatRevenue(rep3.wonDealsAmount)}
            </span>
          </div>
        ) : <div className="w-full" />}
      </div>

      {/* OTHER 7 TOP SELLERS (Ranks 4 to 10 - Smaller Icons with Achievement Sales) */}
      <div className={`relative z-10 ${isTvMode ? 'pt-1.5' : 'pt-3'}`}>
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
          <span className="text-[11px]">Ranks 4 - 10 Sellers</span>
          <span className="text-[10px] text-slate-400">Click icon to view pipeline</span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {rest7.map((rep, idx) => {
            const rank = idx + 4;
            return (
              <div
                key={rep.id}
                id={`top-seller-${rank}`}
                onClick={() => onSelectRep(rep)}
                className="flex flex-col items-center text-center cursor-pointer p-1 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group"
              >
                {/* Smaller Avatar with Rank Badge */}
                <div className="relative mb-1">
                  <div className={`rounded-full p-0.5 bg-slate-700/80 group-hover:bg-blue-500 transition-colors ${
                    isTvMode ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-13 sm:h-13'
                  }`}>
                    <img
                      src={rep.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                      alt={rep.name || 'Sales Representative'}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                      }}
                      className="w-full h-full object-cover rounded-full border border-[#151c2d]"
                    />
                  </div>
                  {/* Rank tag #4-#10 */}
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 text-[9px] font-bold text-slate-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {rank}
                  </span>
                </div>

                {/* Name */}
                <span className="text-[10px] font-medium text-slate-300 truncate w-full group-hover:text-blue-400 transition-colors">
                  {(rep.name || 'Rep').length > 13 ? `${(rep.name || 'Rep').split(' ')[0]} ${(rep.name || 'Rep').split(' ')[1] ? `${(rep.name || 'Rep').split(' ')[1][0]}.` : ''}`.trim() : (rep.name || 'Rep')}
                </span>

                {/* Achievement Sales Amount */}
                <span className="text-[11px] font-bold text-white tracking-tight mt-0.5">
                  {formatRevenue(rep.wonDealsAmount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
