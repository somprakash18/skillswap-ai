import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, GraduationCap, Flame, Star, Coins, Edit3, Award, CheckCircle2, Copy } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function ProfilePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(user.referralCode || 'ALEX2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header */}
      <GlassCard className="border border-indigo-500/20">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500/40 shadow-xl"
          />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-white">{user.fullName}</h1>
                <p className="text-xs text-indigo-400 font-semibold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                  {user.college || 'Stanford University'}
                </p>
              </div>
              <button className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            </div>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {user.bio || 'Full-stack software developer passionate about React, Spring Boot, and AI architectures.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {user.rating || 4.9} Rating
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                {user.streakDays || 7} Day Streak
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Verified Student
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Referral Link & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Referral Card */}
        <GlassCard className="md:col-span-1 border border-purple-500/20 space-y-3">
          <h3 className="font-bold text-base text-white">Your Referral Code</h3>
          <p className="text-xs text-slate-400">Share with classmates to earn +25 credits per signup.</p>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-indigo-300 font-bold">
            <span>{user.referralCode || 'ALEX2026'}</span>
            <button onClick={handleCopyReferral} className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && <p className="text-[11px] text-emerald-400 font-semibold">Referral code copied to clipboard!</p>}
        </GlassCard>

        {/* Skills Offered & Wanted */}
        <GlassCard className="md:col-span-2 space-y-4">
          <div>
            <h3 className="font-bold text-base text-white mb-2">Skills You Offer (Mentoring)</h3>
            <div className="flex flex-wrap gap-2">
              {['Spring Boot & Microservices', 'React.js State Management', 'REST API Security'].map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <h3 className="font-bold text-base text-white mb-2">Skills You Want to Learn</h3>
            <div className="flex flex-wrap gap-2">
              {['Docker & Kubernetes Deployment', 'PyTorch LLM Fine-Tuning'].map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

      </div>

    </div>
  );
}
