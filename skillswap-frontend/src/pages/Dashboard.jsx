import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, BookOpen, Coins, Star, ArrowRight, MessageSquare, CheckCircle, Sparkles, Flame, ShieldCheck, Zap, FileText, BarChart2, CreditCard, Radio } from 'lucide-react';
import { AIRoadmapWidget } from '../components/AIWidgets';
import ActiveLearningWidget from '../components/ActiveLearningWidget';
import CourseColumnsWidget from '../components/CourseColumnsWidget';
import ChartAnalyticsWidget from '../components/ChartAnalyticsWidget';

export default function Dashboard({ setCurrentPage, setSelectedSkill, onOpenNewSwap, onOpenVideoCall }) {
  const { user } = useAuth();
  const userName = user && user.fullName && typeof user.fullName === 'string' ? user.fullName.trim().split(' ')[0].toLowerCase() : 'student';
  const userCredits = user ? user.credits || 120 : 120;

  const bestMatches = [
    {
      id: 101,
      name: 'Maya Chen',
      verified: true,
      distance: '2 km',
      rating: 4.9,
      reviews: 36,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: "Looking to trade expertise! I'm offering my skills in Photography and I'm eager to learn Guitar in return. Let's connect!",
      offers: ['Portrait Photography', 'DSLR Camera Tips', 'Lighting Techniques'],
      lookingFor: ['Guitar Lessons', 'Sourdough Baking', 'Advanced Spanish']
    },
    {
      id: 102,
      name: 'Sophia Ansari',
      verified: true,
      distance: '3 km',
      rating: 4.8,
      reviews: 42,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bio: 'Versatile UI/UX designer and frontend dev specializing in React, Tailwind, and Framer Motion animations.',
      offers: ['UI/UX Design Systems', 'Figma Prototyping', 'React Hooks'],
      lookingFor: ['Spring Boot Backend', 'Docker & Kubernetes', 'Python Data Science']
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* 🚀 Production SaaS Master Control Bar */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-xl space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Live Production SaaS Architecture Active
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Spring Boot 3 + MySQL 8.0 + WebSockets STOMP</span>
        </div>

        {/* Quick Portal Switcher Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setCurrentPage('teacher-signup')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <GraduationCap className="w-4 h-4 text-blue-200" />
            <span>🚀 Teacher Signup Portal</span>
          </button>

          <button
            onClick={() => setCurrentPage('founder-portal')}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>👑 Som Prakash Founder Control</span>
          </button>

          <button
            onClick={() => setCurrentPage('materials')}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-purple-200" />
            <span>📚 JEE/NEET Question Bank PDFs</span>
          </button>

          <button
            onClick={() => setCurrentPage('chat')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Radio className="w-4 h-4 text-emerald-200" />
            <span>💬 WebSockets Live Chat</span>
          </button>

          <button
            onClick={() => setCurrentPage('wallet')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <CreditCard className="w-4 h-4 text-indigo-200" />
            <span>💳 Razorpay Credit Top-Up</span>
          </button>
        </div>
      </div>

      {/* Premium Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
        
        {/* Ambient Glow Circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          
          {/* Live Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              7 Day Learning Streak
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-bold text-amber-200 border border-amber-400/30 shadow-xs">
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              {userCredits} Wallet Credits
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
              Ready to exchange skills and grow together? Learn from AIR toppers, IIT seniors & tech mentors today.
            </p>
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setCurrentPage('matches')}
              className="px-3.5 py-1.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs hover:bg-slate-100 transition shadow-sm flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Instant AI Match
            </button>
            <button
              onClick={() => setCurrentPage('materials')}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              JEE/NEET PDF Question Banks
            </button>
            <button
              onClick={onOpenNewSwap}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5"
            >
              + Post Swap Request
            </button>
          </div>

        </div>
      </div>

      {/* Real-Time Chart.js SaaS Analytics Engine */}
      <ChartAnalyticsWidget />

      {/* 4 Enhanced Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="theme-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
              +12% this week
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">50+</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Swappers</p>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded-md">
              Active Mentor
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">2</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skills I Teach</p>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded-md">
              Enrolled
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">1</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skills I Learn</p>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
              Available
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">4</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Potential Matches</p>
          </div>
        </div>

      </div>

      {/* 2 Primary Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="theme-card flex flex-col justify-between space-y-4 border border-slate-100 dark:border-white/10 hover:border-blue-500/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Update Your Skills</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Keep your teaching and learning skills up to date for better matches.
            </p>
          </div>
          <button onClick={() => setCurrentPage('profile')} className="btn-primary-blue w-fit text-xs px-5 py-2.5">
            Edit Skills &gt;
          </button>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-4 border border-slate-100 dark:border-white/10 hover:border-emerald-500/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Find Matches</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Discover people who want to learn what you teach and vice versa.
            </p>
          </div>
          <button onClick={() => setCurrentPage('matches')} className="btn-success-green w-fit text-xs px-5 py-2.5">
            View Matches &gt;
          </button>
        </div>
      </div>

      {/* "Learn Doing Stuff." Active Learning Track */}
      <ActiveLearningWidget
        onOpenVideoCall={onOpenVideoCall}
        onAddSkill={onOpenNewSwap}
      />

      {/* Categorized Course Columns: Java, Python, Web Dev, JEE & NEET */}
      <CourseColumnsWidget
        setCurrentPage={setCurrentPage}
        setSelectedSkill={setSelectedSkill}
      />

      {/* Your Best Match ⭐ Section */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Your Best Match <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </h2>
          <button onClick={() => setCurrentPage('matches')} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            View All Matches &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestMatches.map((match) => (
            <div key={match.id} className="theme-card space-y-4">
              <div className="flex items-center gap-3">
                <img src={match.avatar} alt={match.name} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{match.name}</h4>
                    {match.verified && <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {match.rating} ({match.reviews})
                    </span>
                    <span>•</span>
                    <span>{match.distance}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{match.bio}</p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Offers...</span>
                <div className="flex flex-wrap gap-1.5">
                  {match.offers.map((off, i) => <span key={i} className="tag-offer">{off}</span>)}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 block">Looking For...</span>
                <div className="flex flex-wrap gap-1.5">
                  {match.lookingFor.map((look, i) => <span key={i} className="tag-looking">{look}</span>)}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <button onClick={() => setCurrentPage('chat')} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  Chat to Swap
                </button>
                <button
                  onClick={() => {
                    setSelectedSkill({ id: match.id, title: match.offers[0], mentorName: match.name, creditCost: 10 });
                    setCurrentPage('skill-detail');
                  }}
                  className="flex-1 btn-primary-blue text-xs font-bold py-2.5"
                >
                  Confirm Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIRoadmapWidget />

    </div>
  );
}
