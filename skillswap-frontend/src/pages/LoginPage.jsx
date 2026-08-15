import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function LoginPage({ setCurrentPage }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res && res.success) {
        setCurrentPage('dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <GlassCard className="border border-indigo-500/20 shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Log in to manage your skill sessions & credits</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">College Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="alex.chen@stanford.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-1 flex gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => { setEmail('alex.chen@stanford.edu'); setPassword('Password123!'); }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-indigo-300 font-medium border border-white/5"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@skillswap.ai'); setPassword('Password123!'); }}
              className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-medium border border-rose-500/20"
            >
              Demo Admin
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3 rounded-xl font-bold text-white text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('register')} className="text-indigo-400 font-semibold hover:underline">
            Register now (+50 Credits)
          </button>
        </p>

      </GlassCard>
    </div>
  );
}
