import React from 'react';
import { TimeRange, AppUser } from '../types';
import { 
  Tv, 
  PlusCircle, 
  Users, 
  Radio, 
  Sparkles, 
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Building2,
  Lock,
  LogOut,
  Unlock,
  Edit3,
  UserCheck,
  Shield
} from 'lucide-react';

interface HeaderProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  onOpenLogDeal: () => void;
  onOpenManageTeam: () => void;
  onOpenAdminPanel: () => void;
  onResetData: () => void;
  isLiveSimulation: boolean;
  setIsLiveSimulation: (val: boolean | ((prev: boolean) => boolean)) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  isTvMode: boolean;
  setIsTvMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: AppUser | null;
  isAdmin?: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  timeRange,
  setTimeRange,
  onOpenLogDeal,
  onOpenManageTeam,
  onOpenAdminPanel,
  onResetData,
  isLiveSimulation,
  setIsLiveSimulation,
  isSoundEnabled,
  setIsSoundEnabled,
  isTvMode,
  setIsTvMode,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const toggleFullscreen = () => {
    setIsTvMode(prev => !prev);
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    } catch (e) {
      // Ignore iframe fullscreen restrictions
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const isEditor = currentUser?.role === 'editor';
  const canEdit = isAdmin || isEditor;

  return (
    <header className={`flex flex-col md:flex-row md:items-center justify-between gap-2.5 transition-all ${
      isTvMode ? 'mb-2 pt-0.5' : 'mb-5 pt-1'
    }`}>
      {/* Brand Logo & Live Status */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          id="brand-logo"
          src="https://betopiagroup.com/media_kit_file/Betopia-Group-White-Logo.png"
          alt="Betopia Group"
          className={`${
            isTvMode ? 'h-8 sm:h-9 md:h-10' : 'h-10 sm:h-12 md:h-14 lg:h-16'
          } w-auto object-contain opacity-95 hover:opacity-100 transition-all drop-shadow-sm`}
          referrerPolicy="no-referrer"
        />
        {isLiveSimulation && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            LIVE OFFICE FEED
          </span>
        )}
        {isTvMode && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Tv className="w-3 h-3 text-amber-400" />
            16:9 TV VIEW
          </span>
        )}
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {/* Real-time Cloud Sync Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Cloud Sync</span>
        </div>

        {/* Fullscreen / TV Mode Button (Always Available to All Users & Public Screens) */}
        <button
          id="btn-toggle-tv"
          onClick={toggleFullscreen}
          title="Office TV / 16:9 Fullscreen Display Mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isTvMode
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/20'
              : 'bg-[#131b2c] border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          {isTvMode ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Tv className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isTvMode ? 'Exit TV Mode' : '16:9 TV Mode'}</span>
        </button>

        {/* Time Range Pills (Available to ALL viewers and users) */}
        <div className="flex items-center bg-[#131b2c] p-1 rounded-xl border border-slate-800/80 shadow-inner">
          <button
            id="btn-time-month"
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Current Month
          </button>
          <button
            id="btn-time-quarter"
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'quarter'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Quarter
          </button>
          <button
            id="btn-time-year"
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            YTD
          </button>
        </div>

        {canEdit ? (
          <>
            {/* Live Simulation Toggle */}
            <button
              id="btn-toggle-live"
              onClick={() => setIsLiveSimulation(prev => !prev)}
              title="Toggle live office deal simulator"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isLiveSimulation
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-[#131b2c] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveSimulation ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>{isLiveSimulation ? 'Live Feed' : 'Simulate'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={() => setIsSoundEnabled(prev => !prev)}
              title={isSoundEnabled ? "Mute celebratory chime" : "Enable celebratory chime"}
              className="p-1.5 rounded-xl bg-[#131b2c] border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Log New Deal Button */}
            <button
              id="btn-log-deal"
              onClick={onOpenLogDeal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>+ Log Sale</span>
            </button>

            {/* ROLE-SPECIFIC CONTROL PANEL & LOGOUT */}
            <div className="flex items-center gap-1.5 pl-1">
              {isAdmin ? (
                /* Super Admin: Shows Admin Panel with User Management */
                <button
                  id="btn-admin-panel"
                  onClick={onOpenAdminPanel}
                  title="Executive Admin Panel - Set Targets, Shortfall, Manpower & User Creation"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 border border-indigo-400/30 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Admin Panel</span>
                </button>
              ) : (
                /* Editor: Shows Target & Ops Editor (NO User Creation Rights) */
                <button
                  id="btn-editor-panel"
                  onClick={onOpenAdminPanel}
                  title="Editor Control Panel - Modify Targets, Quotas and Manpower"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-300" />
                  <span>Editor Panel</span>
                </button>
              )}

              {/* Logged in User Badge */}
              <div 
                className={`hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold border ${
                  isAdmin 
                    ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-200' 
                    : 'bg-blue-950/60 border-blue-500/30 text-blue-200'
                }`}
                title={`Logged in as ${currentUser?.name} (${currentUser?.username})`}
              >
                {isAdmin ? <Shield className="w-3 h-3 text-emerald-400" /> : <UserCheck className="w-3 h-3 text-blue-400" />}
                <span className="max-w-[110px] truncate">{currentUser?.name || currentUser?.username}</span>
              </div>

              {/* Logout Button */}
              <button
                id="btn-admin-logout"
                onClick={onLogout}
                title="Sign Out (Return to Viewer Mode)"
                className="p-1.5 rounded-xl bg-[#131b2c] border border-slate-700/80 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* VIEWER MODE: SHOW LOGIN ACCESS */
          <button
            id="btn-admin-login"
            onClick={onOpenLogin}
            title="Sign In - Enter admin or editor credentials to access editing controls"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#131b2c] border border-slate-700/80 hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Login Access</span>
          </button>
        )}
      </div>
    </header>
  );
};
