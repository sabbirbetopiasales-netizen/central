import React, { useState } from 'react';
import { AppUser } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  X, 
  Eye, 
  EyeOff, 
  User, 
  Shield, 
  Sparkles,
  LogIn
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: AppUser[];
  onSuccessLogin: (user: AppUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  users,
  onSuccessLogin,
}) => {
  const [userIdInput, setUserIdInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const cleanId = userIdInput.trim();
      const cleanPassword = password.trim();

      if (!cleanId || !cleanPassword) {
        setError('Please enter both your User ID / Username and Password.');
        setIsSubmitting(false);
        return;
      }

      // Check for Admin credentials (ID: 11684, Pass: 51643600)
      if ((cleanId === '11684' || cleanId.toLowerCase() === 'admin') && cleanPassword === '51643600') {
        const adminUser = users.find(u => u.role === 'admin' || u.id === '11684' || u.username === '11684') || {
          id: '11684',
          username: '11684',
          name: 'Executive Administrator',
          role: 'admin' as const,
          password: '51643600',
          createdAt: new Date().toISOString()
        };
        onSuccessLogin({ ...adminUser, role: 'admin' });
        setUserIdInput('');
        setPassword('');
        setError('');
        setIsSubmitting(false);
        onClose();
        return;
      }

      // Find user by ID, username, or email in users database
      const matchedUser = users.find(
        u => u.id === cleanId || 
             u.username.toLowerCase() === cleanId.toLowerCase() || 
             (u.email && u.email.toLowerCase() === cleanId.toLowerCase())
      );

      if (matchedUser) {
        if (matchedUser.password === cleanPassword) {
          onSuccessLogin(matchedUser);
          setUserIdInput('');
          setPassword('');
          setError('');
          setIsSubmitting(false);
          onClose();
          return;
        } else {
          setError('Incorrect password. Please verify your passcode and try again.');
          setIsSubmitting(false);
          return;
        }
      }

      // Fallback for default editor if user database isn't yet hydrated
      if (cleanId.toLowerCase() === 'editor' && (cleanPassword === 'editor' || cleanPassword === 'editor123')) {
        const editorUser: AppUser = {
          id: 'user-editor-1',
          username: 'editor',
          name: 'Sales Operations Editor',
          role: 'editor',
          password: cleanPassword,
          createdAt: new Date().toISOString()
        };
        onSuccessLogin(editorUser);
        setUserIdInput('');
        setPassword('');
        setError('');
        setIsSubmitting(false);
        onClose();
        return;
      }

      setError('Authentication failed. No matching account found for this ID.');
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Outer Card Container matching the reference design */}
      <div className="relative w-full max-w-[420px] rounded-3xl shadow-2xl overflow-hidden border border-slate-800 bg-[#080d18] transition-all">
        
        {/* Top Dark Header with Radial Ambient Glow & Betopia Brand */}
        <div className="relative pt-8 pb-6 px-6 text-center flex flex-col items-center bg-[#070b14] overflow-hidden border-b border-slate-800/80">
          
          {/* Radiant Orange Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-gradient-to-br from-amber-500/40 via-orange-600/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo Badge */}
          <div className="relative z-10 px-4 py-2.5 rounded-2xl bg-white/95 shadow-2xl border border-white/40 mb-4 ring-2 ring-amber-500/40 flex items-center justify-center">
            <img
              src="https://betopiagroup.com/media_kit_file/Betopia-Group-Black-Logo.png"
              alt="Betopia Group"
              className="h-9 w-auto max-w-[140px] object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title Header */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 text-lg sm:text-xl font-black tracking-wider uppercase">
            <span className="text-white">BETOPIA</span>
            <span className="text-orange-500">SALES DASHBOARD</span>
          </div>

          {/* Pill Badge */}
          <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 text-[11px] text-slate-300 font-mono tracking-wide shadow-inner">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Mandatory Authentication Required</span>
          </div>
        </div>

        {/* Bottom White Container matching reference */}
        <div className="bg-[#f8fafc] px-6 sm:px-7 py-7 text-slate-900">
          
          {/* Subheading */}
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sign In To Access Platform
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Enter your User ID and Password below to enter.
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* User ID Field */}
            <div>
              <label className="text-[11px] font-mono font-bold text-slate-600 tracking-wider uppercase block mb-1.5">
                WEB USER ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userIdInput}
                  onChange={(e) => {
                    setUserIdInput(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your User ID"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-mono shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-[11px] font-mono font-bold text-slate-600 tracking-wider uppercase block mb-1.5">
                PASSWORD / PASSCODE
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-mono shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl animate-fadeIn font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Vibrant Orange Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-sm font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span className="font-mono tracking-wide">
                  {isSubmitting ? 'Authenticating...' : 'Authenticate & Enter'}
                </span>
              </button>
            </div>
          </form>

          {/* Footer with System Info matching ref */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-[10px] font-mono text-slate-500 justify-center text-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>User accounts are provisioned and managed by System Admin.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
