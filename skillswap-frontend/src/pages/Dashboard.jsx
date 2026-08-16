import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, BookOpen, Coins, Star, ArrowRight, MessageSquare, CheckCircle, Sparkles, Flame, Zap, Compass, Clock, Calendar, Video, CheckCircle2, TrendingUp } from 'lucide-react';
import { AIRoadmapWidget } from '../components/AIWidgets';
import ActiveLearningWidget from '../components/ActiveLearningWidget';
import CourseColumnsWidget from '../components/CourseColumnsWidget';

export default function Dashboard({ setCurrentPage, setSelectedSkill, onOpenNewSwap, onOpenVideoCall }) {
  const { user } = useAuth();
  const userName = user && user.fullName && typeof user.fullName === 'string' ? user.fullName.trim().split(' ')[0] : 'Som';
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
      bio: "Offering expertise in Photography & Lighting. Eager to learn Acoustic Guitar in return!",
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
      bio: 'Versatile UI/UX designer and frontend dev specializing in React, Tailwind, and Framer Motion.',
      offers: ['UI/UX Design Systems', 'Figma Prototyping', 'React Hooks'],
      lookingFor: ['Spring Boot Backend', 'Docker & Kubernetes', 'Python Data Science']
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Spring Boot 3 Microservices Architecture',
      mentor: 'Alex Chen',
      time: 'Today, 02:00 PM - 03:00 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'Confirmed'
    },
    {
      id: 2,
      title: 'JEE Advanced Physics Problem Solving',
      mentor: 'Rohan Verma (AIR 142)',
      time: 'Tomorrow, 10:00 AM - 11:30 AM',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* 🚀 Minimal, Elegant Hero Section (Linear / Stripe / Vercel Aesthetic) */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[32px] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow Circles */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            
            {/* Live Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
                <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                7 Day Streak
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-semibold text-amber-200 border border-amber-400/30">
                <Coins className="w-3.5 h-3.5 text-amber-300" />
                {userCredits} Credits Available
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-blue-100 text-sm sm:text-base mt-2 leading-relaxed font-normal">
                Exchange skills with top mentors, AIR rankers, and developers. What would you like to learn today?
              </p>
            </div>

            {/* ONLY TWO PRIMARY CTAs (As Requested by User Design Rules) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('matches')}
                className="px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
              >
                <span>Find a Mentor</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => setCurrentPage('explore')}
                className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Skills</span>
              </button>
            </div>

          </div>

          {/* Floating Stats Card Preview */}
          <div className="hidden lg:flex flex-col gap-3 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 text-xs shrink-0 w-72">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 font-medium">Weekly Learning Goal</span>
              <span className="font-bold text-amber-300">80% Completed</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-[80%]" />
            </div>
            <p className="text-[11px] text-blue-100 pt-1">4 of 5 sessions completed this week 🔥</p>
          </div>

        </div>
      </div>

      {/* 📊 4 Clean Stats Cards Grid (Hover Lift + Soft Shadow) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">50+</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Swappers Connected</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">2</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Skills I Teach</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
              Enrolled
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Skills I Learn</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
              Available
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{userCredits}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Wallet Credits</p>
          </div>
        </div>

      </div>

      {/* 2 Dashboard Cards: Today's Goal & Upcoming Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Goal Card (1 Col) */}
        <div className="lg:col-span-1 theme-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Today's Focus Goal</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete your 1-on-1 Java Spring Boot microservices code review with mentor Alex Chen.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Session Progress</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">1/2 Hrs</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[50%]" />
            </div>
          </div>

          <button
            onClick={() => onOpenVideoCall({ mentor: 'Alex Chen', title: 'Spring Boot 3 Review' })}
            className="w-full btn-primary text-xs font-semibold py-2.5"
          >
            <Video className="w-4 h-4" />
            <span>Launch Video Call</span>
          </button>
        </div>

        {/* Upcoming Sessions Timeline (2 Cols) */}
        <div className="lg:col-span-2 theme-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Upcoming Sessions Timeline</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Synced with Google Calendar</span>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={session.avatar} alt={session.mentor} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{session.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {session.time} • Host: <span className="font-semibold text-slate-700 dark:text-slate-300">{session.mentor}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenVideoCall({ mentor: session.mentor, title: session.title })}
                  className="btn-secondary text-xs font-medium px-4 py-2 self-start sm:self-center"
                >
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  <span>Join Session</span>
                </button>
              </div>
            ))}
          </div>
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
            Recommended Skill Swappers <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </h2>
          <button onClick={() => setCurrentPage('matches')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            View All Matches &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestMatches.map((match) => (
            <div key={match.id} className="theme-card space-y-4">
              <div className="flex items-center gap-3">
                <img src={match.avatar} alt={match.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{match.name}</h4>
                    {match.verified && <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-600 text-white" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">Looking For...</span>
                <div className="flex flex-wrap gap-1.5">
                  {match.lookingFor.map((look, i) => <span key={i} className="tag-looking">{look}</span>)}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => setCurrentPage('chat')} className="flex-1 btn-secondary text-xs font-semibold py-2.5">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Chat to Swap</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedSkill({ id: match.id, title: match.offers[0], mentorName: match.name, creditCost: 10 });
                    setCurrentPage('skill-detail');
                  }}
                  className="flex-1 btn-primary text-xs font-semibold py-2.5"
                >
                  <span>Confirm Swap</span>
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
