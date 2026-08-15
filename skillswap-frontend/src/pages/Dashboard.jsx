import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Coins, Flame, Calendar, Clock, ArrowUpRight, Video, CheckCircle2, Compass, MessageSquare, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { AIRoadmapWidget, AIMentorMatcherWidget } from '../components/AIWidgets';

export default function Dashboard({ setCurrentPage, setSelectedSkill }) {
  const { user, wallet } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingSessions = [
    {
      id: 1,
      skillTitle: 'Spring Boot & Microservices Mastery',
      mentorName: 'Priya Sharma',
      date: 'Tomorrow at 02:00 PM EST',
      status: 'CONFIRMED',
      meetingLink: 'https://meet.jit.si/skillswap-session-spring-101',
      creditCost: 15
    },
    {
      id: 2,
      skillTitle: 'Fine-Tuning LLMs with PyTorch',
      mentorName: 'Marcus Vance',
      date: 'Aug 18 at 04:30 PM EST',
      status: 'PENDING',
      meetingLink: 'https://meet.jit.si/skillswap-session-ai-303',
      creditCost: 25
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
                {user.college || 'Stanford University'} Student
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {user.streakDays || 7} Day Streak
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome back, <span className="gradient-text">{user.fullName}</span> 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              You have <span className="text-amber-400 font-bold">{wallet.balance} credits</span> available for booking sessions or generating AI roadmaps.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage('explore')}
              className="px-5 py-2.5 rounded-xl gradient-btn text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Book Mentorship
            </button>
            <button
              onClick={() => setCurrentPage('wallet')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold border border-white/10"
            >
              Add Credits
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Sessions & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Sessions Card */}
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Your Mentorship Sessions
              </h3>
              <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  History
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                        session.status === 'CONFIRMED' 
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}>
                        {session.status}
                      </span>
                      <h4 className="font-semibold text-base text-white mt-1.5">{session.skillTitle}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Mentor: {session.mentorName}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                      {session.creditCost} Credits
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-white/5 text-xs text-slate-400 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span>{session.date}</span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setCurrentPage('chat')}
                        className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-medium flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Call
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* AI Learning Hub Widget */}
          <AIRoadmapWidget />

        </div>

        {/* Right Column - AI Matcher & Badges */}
        <div className="space-y-6">
          
          {/* AI Mentor Matcher */}
          <AIMentorMatcherWidget onSelectMentor={(m) => {
            setSelectedSkill({ id: m.skillId, title: m.skillTitle, creditCost: m.creditCost, mentorName: m.mentorName });
            setCurrentPage('skill-detail');
          }} />

          {/* Gamification Achievements */}
          <GlassCard>
            <h3 className="font-bold text-base text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Badges & Milestones
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { title: 'Top Mentor', desc: '4.9+ Star Rating', icon: '⭐', unlocked: true },
                { title: '7-Day Streak', desc: 'Active daily', icon: '🔥', unlocked: true },
                { title: 'AI Scholar', desc: '10 Roadmaps generated', icon: '🤖', unlocked: true },
                { title: 'Century Master', desc: '100 Credits earned', icon: '💰', unlocked: false },
              ].map((badge, idx) => (
                <div key={idx} className={`p-3 rounded-xl border text-center ${
                  badge.unlocked ? 'bg-indigo-950/40 border-indigo-500/30' : 'bg-white/5 border-white/5 opacity-50'
                }`}>
                  <span className="text-2xl">{badge.icon}</span>
                  <p className="font-semibold text-xs text-white mt-1">{badge.title}</p>
                  <p className="text-[10px] text-slate-400">{badge.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
