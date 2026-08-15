import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b101b] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#131b2c] border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Dashboard Display Notice</h2>
            <p className="text-sm text-slate-400">
              An unexpected display issue occurred. Clicking reload will clear local cache and restore all latest cloud data.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload & Restore Dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
