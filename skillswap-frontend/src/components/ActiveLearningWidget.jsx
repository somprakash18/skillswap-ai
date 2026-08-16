import React from 'react';
import { Plus, ArrowRight, BookOpen, CheckCircle2, Play } from 'lucide-react';

export default function ActiveLearningWidget({ onOpenVideoCall, onAddSkill }) {
  const activeCourses = [
    {
      id: 1,
      title: 'Learning to Paint',
      mentor: 'Al Harden',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      progress: '2/10',
      percentage: 77,
      subtopic: 'Still Life',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Learning to Play Chess',
      mentor: 'Jake',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      progress: '3/10',
      percentage: 30,
      subtopic: 'Opening Strategies',
      color: 'from-slate-600 to-slate-800'
    },
    {
      id: 3,
      title: 'Learning to Juggle',
      mentor: 'Angelica',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      progress: '9/15',
      percentage: 60,
      subtopic: '3-Ball Cascade',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="theme-card space-y-5">
      
      {/* Header (Matching Image 2 Screen 1) */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">Hello Jenny</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Learn Doing Stuff.</h2>
        </div>
        
        <button
          onClick={onAddSkill}
          className="btn-success-green text-xs font-bold px-4 py-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skills &rarr;</span>
        </button>
      </div>

      {/* Grid of Active Learning Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeCourses.map((course) => (
          <div key={course.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">
                  Track {course.progress}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{course.percentage}%</span>
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{course.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <img src={course.avatar} alt={course.mentor} className="w-5 h-5 rounded-full object-cover" />
                <span>with {course.mentor}</span>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${course.color}`}
                style={{ width: `${course.percentage}%` }}
              />
            </div>

            {/* Start Live Session Call Button */}
            <button
              onClick={() => onOpenVideoCall && onOpenVideoCall(course)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Join Live Session
            </button>

          </div>
        ))}
      </div>

      {/* Current Students Banner (Matching Image 2 Screen 1 Bottom) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
            5
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Current Mentorship Students</h4>
            <p className="text-xs text-slate-500">Students learning your listed skills this week</p>
          </div>
        </div>

        <div className="flex -space-x-2">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        </div>
      </div>

    </div>
  );
}
