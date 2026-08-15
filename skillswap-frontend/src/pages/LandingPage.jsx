import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Users, Coins, Award, CheckCircle2, Star, ChevronDown, Play, Code, Cpu, Layout } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { AIRoadmapWidget } from '../components/AIWidgets';

export default function LandingPage({ setCurrentPage }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-5xl mx-auto px-4 pt-12">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>The #1 Peer-to-Peer AI Skill Exchange Platform for Tech Societies</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Teach What You Know. <br />
          <span className="gradient-text">Learn Anything for Free with AI Credits.</span>
        </h1>

        <p className="mt-6 text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          SkillSwap AI connects ambitious students and campus creators. Earn credits by mentoring junior developers, and spend credits to unlock 1-on-1 mentorship with upperclassmen and AI learning roadmaps.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('register')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-white gradient-btn shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 text-base group"
          >
            Join SkillSwap AI
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentPage('explore')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-slate-200 glass-card hover:text-white text-base"
          >
            Explore Skill Marketplace
          </button>
        </div>

        {/* Live Metrics Pills */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Active Mentors', val: '2,400+' },
            { label: 'Sessions Completed', val: '18,500+' },
            { label: 'Credits Circulating', val: '450,000+' },
            { label: 'Verified Certificates', val: '12,100+' },
          ].map((stat, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <p className="text-xl font-black text-white gradient-text">{stat.val}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live AI Demo Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Interactive AI Preview
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">Experience OpenAI-Powered Learning Roadmaps</h2>
          <p className="text-slate-400 text-sm mt-2">Test our AI engine right now to see how SkillSwap AI builds customized 4-week step-by-step curricula for any technology.</p>
        </div>

        <AIRoadmapWidget />
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">Built Like Stripe, Linear & Notion for Students</h2>
          <p className="text-slate-400 text-sm mt-2">Everything you need to master new tech skills without paying thousands for online bootcamps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Credit-Based Skill Economy</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Earn credits when you teach what you know (Git, React, Python). Spend credits when you want 1-on-1 guidance from top student engineers.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">AI Mentor Matcher</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              OpenAI algorithms analyze your target skill and learning style to automatically recommend the highest-rated mentors in your college society.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Cryptographic Certificates</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Upon completing mentorship sessions, receive verifiable digital completion certificates to feature on your LinkedIn & GitHub profile.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="max-w-6xl mx-auto px-4 glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">How SkillSwap AI Works in 4 Steps</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Create Profile', desc: 'Sign up with your college email and list the skills you can offer and want to learn.' },
            { step: '02', title: 'Get Free Credits', desc: 'Receive 50 free starter credits automatically added to your wallet upon joining.' },
            { step: '03', title: 'Book Sessions', desc: 'Browse mentor profiles or use AI matching to schedule 1-on-1 Jitsi/Google Meet video sessions.' },
            { step: '04', title: 'Earn & Level Up', desc: 'Teach others to replenish your credit balance, climb the leaderboard, and unlock badges.' }
          ].map((item, idx) => (
            <div key={idx} className="relative space-y-2">
              <span className="text-4xl font-black text-indigo-500/40">{item.step}</span>
              <h4 className="font-bold text-base text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {[
            { q: 'Is SkillSwap AI completely free for students?', a: 'Yes! Every student gets 50 free credits upon signup. You can earn unlimited additional credits by teaching skills to peers.' },
            { q: 'How does the AI Mentor Matching work?', a: 'Our OpenAI integration evaluates mentor ratings, past session feedback, and experience levels to present the optimal match for your learning goals.' },
            { q: 'Can I purchase credits with real money?', a: 'Yes, via our secure Razorpay integration you can purchase credit top-ups if you prefer learning without teaching.' }
          ].map((faq, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              className="glass-card rounded-2xl p-4 cursor-pointer transition border border-white/5"
            >
              <div className="flex justify-between items-center font-semibold text-sm text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {activeFaq === idx && (
                <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="gradient-btn rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">Ready to Swap Skills & Elevate Your Resume?</h2>
          <p className="text-indigo-100 text-sm max-w-xl mx-auto mt-2">Join thousands of student developers at top universities building projects together.</p>
          <button
            onClick={() => setCurrentPage('register')}
            className="mt-6 px-8 py-3.5 bg-white text-indigo-900 rounded-2xl font-bold text-sm hover:bg-slate-100 transition shadow-lg"
          >
            Create Free Account
          </button>
        </div>
      </section>

    </div>
  );
}
