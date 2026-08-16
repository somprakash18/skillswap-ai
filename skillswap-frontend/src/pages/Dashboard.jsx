import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, BookOpen, Coins, Star, ArrowRight, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { AIRoadmapWidget } from '../components/AIWidgets';
import ActiveLearningWidget from '../components/ActiveLearningWidget';
import CourseColumnsWidget from '../components/CourseColumnsWidget';

export default function Dashboard({ setCurrentPage, setSelectedSkill, onOpenNewSwap, onOpenVideoCall }) {
  const { user } = useAuth();
  const userName = user ? user.fullName.split(' ')[0].toLowerCase() : 'som';

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
    <div className="space-y-8 pb-12">
      
      {/* Royal Blue Welcome Banner (Matching Image 1 & 4) */}
      <div className="bg-banner-blue rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Ready to exchange skills and grow together? Find your perfect match today.
          </p>
        </div>

        <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden md:block opacity-30 pointer-events-none">
          <Sparkles className="w-32 h-32 text-white" />
        </div>
      </div>

      {/* 4 Stat Cards Grid (Matching Image 1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Users</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">50+</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skills I Teach</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">2</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skills I Learn</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">1</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Potential Matches</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">4</h3>
          </div>
        </div>
      </div>

      {/* 2 Primary Action Cards (Matching Image 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="theme-card flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Update Your Skills</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Keep your teaching and learning skills up to date for better matches.
            </p>
          </div>
          <button onClick={() => setCurrentPage('profile')} className="btn-primary-blue w-fit text-xs px-5 py-2.5">
            Edit Skills &gt;
          </button>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Find Matches</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Discover people who want to learn what you teach and vice versa.
            </p>
          </div>
          <button onClick={() => setCurrentPage('matches')} className="btn-success-green w-fit text-xs px-5 py-2.5">
            View Matches &gt;
          </button>
        </div>
      </div>

      {/* "Learn Doing Stuff." Active Learning Courses (Matching Image 2 Screen 1) */}
      <ActiveLearningWidget
        onOpenVideoCall={onOpenVideoCall}
        onAddSkill={onOpenNewSwap}
      />

      {/* Categorized Course Columns: Java, Python, Web Dev, JEE & NEET */}
      <CourseColumnsWidget
        setCurrentPage={setCurrentPage}
        setSelectedSkill={setSelectedSkill}
      />

      {/* Your Best Match ⭐ Section (Matching Image 1 & 2) */}
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
