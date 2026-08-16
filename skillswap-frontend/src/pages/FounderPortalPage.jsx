import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, User, Key, Sparkles, ArrowRight, Activity, Eye, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function FounderPortalPage({ setCurrentPage }) {
  const [founderName, setFounderName] = useState('Som Prakash');
  const [founderEmail, setFounderEmail] = useState('prakashsom316@gmail.com');
  const [passcode, setPasscode] = useState('19451945');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFounderSignIn = (e) => {
    e.preventDefault();
    setError(null);
    if (passcode !== '19451945' && passcode !== 'FOUNDER2026' && passcode !== 'admin123') {
      setError('Invalid Founder Passkey. Owner Passkey: 19451945');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ownerUser = {
        id: 1,
        email: founderEmail || 'prakashsom316@gmail.com',
        fullName: founderName || 'Som Prakash (Founder & Owner)',
        college: 'SkillSwap AI Founder Office',
        role: 'ROLE_FOUNDER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 9999,
        rating: 5.0,
        isFounder: true
      };
      localStorage.setItem('user', JSON.stringify(ownerUser));
      localStorage.setItem('token', 'founder-token-som-prakash-19451945');
      window.location.reload();
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <GlassCard className="border border-amber-500/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Platform Founder Portal
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Som Prakash's Owner Access</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live tracking of signed-in users, mobile OTP logs, and platform stats.</p>
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
                placeholder="Som Prakash"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5 font-bold"
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
                placeholder="prakashsom316@gmail.com"
                value={founderEmail}
                onChange={(e) => setFounderEmail(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder Secret Passkey</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="19451945"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5 font-mono font-bold tracking-wider"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Owner Passkey: <code className="text-amber-500 font-bold">19451945</code></span>
          </div>

          {/* Quick Fill Button */}
          <button
            type="button"
            onClick={() => { setFounderName('Som Prakash'); setFounderEmail('prakashsom316@gmail.com'); setPasscode('19451945'); }}
            className="w-full py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20"
          >
            Autofill Som Prakash Credentials
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            {loading ? 'Authenticating Founder Access...' : 'Access Founder Control Center'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </GlassCard>
    </div>
  );
}
