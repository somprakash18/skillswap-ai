import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, BookOpen, Coins, Star, ArrowRight, MessageSquare, CheckCircle, Sparkles, Flame, Zap, FileText, Video, Play, Award, CheckCircle2, Clock, Bookmark, HelpCircle, Terminal, Mic } from 'lucide-react';
import { AIRoadmapWidget } from '../components/AIWidgets';
import CourseColumnsWidget from '../components/CourseColumnsWidget';
import AnalyticsRadarWidget from '../components/AnalyticsRadarWidget';
import CodePlaygroundModal from '../components/CodePlaygroundModal';

export default function StudentDashboard({ setCurrentPage, setSelectedSkill, onOpenNewSwap, onOpenVideoCall }) {
  const { user } = useAuth();
  const userName = user && user.fullName && typeof user.fullName === 'string' ? user.fullName.trim().split(' ')[0] : 'Priya';
  const userCredits = user ? user.credits || 120 : 120;
  const [showCodePlayground, setShowCodePlayground] = useState(false);

  const enrolledCourses = [
    {
      id: 1,
      title: 'JEE Advanced Physics Rotational Dynamics & Calculus',
      instructor: 'Rohan Verma (IIT Bombay AIR 142)',
      progress: 75,
      completedLessons: '9 of 12 Lessons',
      nextLesson: 'Lesson 10: Angular Momentum & Conservation Laws',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      category: 'JEE'
    },
    {
      id: 2,
      title: 'Java Spring Boot 3 Microservices Architecture',
      instructor: 'Alex Chen (Stanford Senior)',
      progress: 50,
      completedLessons: '8 of 16 Lessons',
      nextLesson: 'Lesson 9: Spring Security JWT Authentication',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      category: 'CODING'
    }
  ];

  const upcomingClasses = [
    {
      id: 101,
      title: 'NEET Biology 360/360 NCERT Line-by-Line Revision',
      instructor: 'Ananya Deshmukh (AIIMS AIR 89)',
      time: 'Today, 04:00 PM EST',
      meetUrl: 'https://meet.jit.si/skillswap-neet-biology-live',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    {
      id: 102,
      title: 'Fullstack React & Next.js Server Actions Workshop',
      instructor: 'Sophia Ansari (Senior Lead)',
      time: 'Tomorrow, 11:00 AM EST',
      meetUrl: 'https://meet.jit.si/skillswap-react-nextjs-live',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Student Portal Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[32px] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
                <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                7 Day Learning Streak 🔥
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-semibold text-amber-200 border border-amber-400/30">
                <Coins className="w-3.5 h-3.5 text-amber-300" />
                {userCredits} Wallet Credits
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Welcome to Student Portal, {userName}! 🎓
              </h1>
              <p className="text-blue-100 text-sm sm:text-base mt-2 leading-relaxed font-normal">
                Track your active courses, run code in the sandbox, solve practice quizzes, and download formula PDFs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowCodePlayground(true)}
                className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition shadow-md flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-slate-950" />
                <span>⚡ Open Code Sandbox</span>
              </button>

              <button
                onClick={() => setCurrentPage('quiz-engine')}
                className="px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Start Practice Quiz</span>
              </button>

              <button
                onClick={() => setCurrentPage('pdf-library')}
                className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Download PDFs & PYQs</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 text-xs shrink-0 w-72">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 font-medium">Exam Target</span>
              <span className="font-bold text-amber-300">JEE Advanced 2026</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-[75%]" />
            </div>
            <p className="text-[11px] text-blue-100 pt-1">14 Quizzes & 3 Certificates Earned 🏆</p>
          </div>
        </div>
      </div>

      {/* Subject Performance Analytics Radar Widget */}
      <AnalyticsRadarWidget />

      {/* Continue Learning Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
            Continue Learning
          </h2>
          <button onClick={() => setCurrentPage('explore')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            View Enrolled Courses &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((crs) => (
            <div key={crs.id} className="theme-card space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300">
                    {crs.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{crs.completedLessons}</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">{crs.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Instructor: <strong className="text-slate-700 dark:text-slate-200">{crs.instructor}</strong></p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{crs.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${crs.progress}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 truncate pt-1">Up Next: {crs.nextLesson}</p>
              </div>

              <button
                onClick={() => onOpenVideoCall({ mentor: crs.instructor, title: crs.title })}
                className="w-full btn-primary text-xs font-semibold py-2.5"
              >
                <span>Resume Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Live Classes */}
      <div className="theme-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Live Interactive Classes Today</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Automatic Google Meet Sync</span>
        </div>

        <div className="space-y-3">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={cls.avatar} alt={cls.instructor} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{cls.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {cls.time} • Host: <span className="font-semibold text-slate-700 dark:text-slate-300">{cls.instructor}</span>
                  </p>
                </div>
              </div>

              <a
                href={cls.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs font-semibold px-4 py-2 self-start sm:self-center"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Class</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Course Columns */}
      <CourseColumnsWidget setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />

      {/* AI Learning Roadmap */}
      <AIRoadmapWidget />

      {/* Interactive Code Playground Modal */}
      <CodePlaygroundModal
        isOpen={showCodePlayground}
        onClose={() => setShowCodePlayground(false)}
      />

    </div>
  );
}
