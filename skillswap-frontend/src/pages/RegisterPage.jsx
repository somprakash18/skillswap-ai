import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, GraduationCap, Gift, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function RegisterPage({ setCurrentPage }) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('Stanford University');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ fullName, email, password, college, referralCode });
      setCurrentPage('dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <GlassCard className="border border-purple-500/20 shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create SkillSwap AI Account</h2>
          <p className="text-xs text-slate-400 mt-1">Get 50 bonus credits instantly upon registration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Alex Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

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
            <label className="text-xs font-medium text-slate-300 block mb-1">College / University</label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Stanford University"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
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

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Referral Code (Optional)</label>
            <div className="relative">
              <Gift className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
              <input
                type="text"
                placeholder="e.g. ALEX2026 (+25 extra credits)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3 rounded-xl font-bold text-white text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 mt-3"
          >
            {loading ? 'Creating Account...' : 'Register & Claim 50 Credits'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <button onClick={() => setCurrentPage('login')} className="text-indigo-400 font-semibold hover:underline">
            Log in
          </button>
        </p>

      </GlassCard>
    </div>
  );
}
