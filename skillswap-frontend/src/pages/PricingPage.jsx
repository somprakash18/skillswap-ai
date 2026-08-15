import React from 'react';
import { Coins, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function PricingPage({ setCurrentPage }) {
  const plans = [
    {
      name: 'Free Student',
      price: '₹0',
      credits: '50 Starter Credits',
      desc: 'Perfect for exploring peer mentorship & generating AI roadmaps.',
      features: ['50 Sign-up Credits', 'Access to Skill Marketplace', 'AI Learning Roadmap Generator', 'Basic Jitsi Video Calls'],
      btnText: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro Learner',
      price: '₹599',
      credits: '120 Credits / Mo',
      desc: 'Ideal for active students booking multiple 1-on-1 mentorship sessions.',
      features: ['120 Monthly Credits (+20 Bonus)', 'Priority AI Mentor Matching', 'Unlimited Session Summaries', 'Verifiable Certificates', 'Razorpay Instant Top-up'],
      btnText: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Campus Guild',
      price: '₹1,299',
      credits: '300 Credits / Mo',
      desc: 'For tech society leads & power mentors building project teams.',
      features: ['300 Monthly Credits (+60 Bonus)', 'Verified Mentor Badge', 'Society Leaderboard Highlight', 'Custom AI Mock Interviews', 'Dedicated Support'],
      btnText: 'Claim Guild Pass',
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Transparent Pricing
        </span>
        <h1 className="text-4xl font-extrabold text-white">Simple, Credit-Based Plans</h1>
        <p className="text-slate-400 text-sm">Earn credits by teaching skills or pick a monthly top-up plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <GlassCard key={idx} className={`flex flex-col justify-between relative ${plan.popular ? 'border-2 border-indigo-500 shadow-indigo-500/20' : ''}`}>
            {plan.popular && (
              <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-xs text-slate-400">/ package</span>
              </div>
              <p className="text-xs text-slate-400">{plan.desc}</p>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                {plan.credits}
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setCurrentPage('wallet')}
              className={`w-full mt-6 py-3 rounded-xl font-bold text-xs shadow-lg transition ${
                plan.popular ? 'gradient-btn text-white shadow-indigo-500/25' : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              {plan.btnText}
            </button>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
