import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SkillSwap AI caught runtime error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-2xl space-y-5">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">SkillSwap AI Web App</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                An unexpected state occurred. Click below to clear cache and restore the application cleanly.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset State & Open Home Page</span>
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
