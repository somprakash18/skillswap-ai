import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, User, Key, Sparkles, ArrowRight, Activity, Eye } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function FounderPortalPage({ setCurrentPage }) {
  const { login } = useAuth();
  const [founderName, setFounderName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFounderSignIn = (e) => {
    e.preventDefault();
    setError(null);
    if (passcode !== 'FOUNDER2026' && passcode !== 'admin123') {
      setError('Invalid Founder Passcode. Default owner key: FOUNDER2026');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ownerUser = {
        id: 1,
        email: founderEmail || 'owner@skillswap.ai',
        fullName: founderName || 'Platform Founder & Owner',
        college: 'SkillSwap AI Founder Office',
        role: 'ROLE_FOUNDER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 9999,
        rating: 5.0,
        isFounder: true
      };
      localStorage.setItem('user', JSON.stringify(ownerUser));
      localStorage.setItem('token', 'founder-token-super-admin');
      window.location.reload();
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <GlassCard className="border border-amber-500/30 shadow-2xl space-y-6">
        
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Platform Owner Portal
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Founder & Owner Access</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track user sign-ins, OTP logs, and platform activity live.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleFounderSignIn} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder / Owner Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Platform Owner"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder Email / Gmail</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="owner@skillswap.ai"
                value={founderEmail}
                onChange={(e) => setFounderEmail(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder Secret Passcode</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="FOUNDER2026"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5 font-mono"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Default Owner Key: <code className="text-amber-500 font-bold">FOUNDER2026</code></span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            {loading ? 'Authenticating Founder Portal...' : 'Access Founder Control Center'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </GlassCard>
    </div>
  );
}
