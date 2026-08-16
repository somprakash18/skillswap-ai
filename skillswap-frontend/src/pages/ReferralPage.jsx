import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Gift, Share2, Copy, Check, Users, Coins, Trophy, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export default function ReferralPage() {
  const { user } = useAuth();
  const referralCode = user && user.referralCode ? user.referralCode : 'SOM2026';
  const referralLink = `https://skillswap.ai/register?ref=${referralCode}`;
  const [copied, setCopied] = useState(false);

  const referralStats = [
    { label: 'Total Friends Invited', value: '8 Friends' },
    { label: 'Successful Signups', value: '6 Verified' },
    { label: 'Bonus Credits Earned', value: '300 🪙 Credits' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Som Prakash (Founder)', code: 'SOM2026', count: 42, credits: '2,100 🪙' },
    { rank: 2, name: 'Rohan Verma (AIR 142)', code: 'ROHAN142', count: 28, credits: '1,400 🪙' },
    { rank: 3, name: 'Ananya Deshmukh (AIIMS AIR 89)', code: 'ANANYA89', count: 24, credits: '1,200 🪙' },
    { rank: 4, name: 'Priya Sharma', code: 'PRIYA2026', count: 18, credits: '900 🪙' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Hey! Join me on SkillSwap AI to exchange skills and learn from IIT & AIIMS rankers. Use my code ${referralCode} to get 50 FREE Wallet Credits! ${referralLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Referral Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-[32px] p-8 sm:p-10 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-100">
            Refer & Earn Program
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Invite Friends & Earn 50 Bonus Credits! 🎁
          </h1>
          <p className="text-amber-100 text-sm mt-1 max-w-xl">
            Give your friends 50 free credits when they sign up with your code. You get 50 credits as soon as they complete their first skill swap session.
          </p>
        </div>

        {/* Share Link Input Box */}
        <div className="pt-2 max-w-xl">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <div className="px-3 text-xs font-mono font-bold text-white shrink-0">
              Code: <span className="bg-white/20 px-2 py-0.5 rounded text-amber-200">{referralCode}</span>
            </div>

            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-transparent text-xs text-white px-2 py-1 focus:outline-none truncate w-full"
            />

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {referralStats.map((stat, i) => (
          <div key={i} className="theme-card text-center space-y-1">
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Referral Leaderboard */}
      <div className="theme-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Top Referrer Leaderboard</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Monthly Top Ranking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] font-extrabold text-slate-400">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Referrer Name</th>
                <th className="p-3">Referral Code</th>
                <th className="p-3">Successful Invites</th>
                <th className="p-3">Bonus Credits Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboard.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-extrabold text-amber-500">#{row.rank}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{row.name}</td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-300">{row.code}</td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{row.count} Friends</td>
                  <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">{row.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
