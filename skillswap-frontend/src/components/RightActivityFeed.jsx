import React from 'react';
import { Filter, Lightbulb, Users, Calendar, Sparkles, Plus, ArrowRight } from 'lucide-react';

export default function RightActivityFeed({ onAddSkill, setCurrentPage }) {
  const activities = [
    {
      id: 1,
      type: 'SKILL',
      user: 'Alex Johnson',
      action: 'added a new skill: Web Development Mentoring',
      time: '2 hours ago',
      icon: Lightbulb,
      color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40'
    },
    {
      id: 2,
      type: 'SWAP',
      user: 'Sarah Chen & Michael Torres',
      action: 'started a new skill swap (Guitar ↔ React)',
      time: '3 hours ago',
      icon: Users,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40'
    },
    {
      id: 3,
      type: 'EVENT',
      user: 'Community Workshop',
      action: 'AI Prompt Engineering Workshop this Saturday',
      time: '5 hours ago',
      icon: Calendar,
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40'
    },
    {
      id: 4,
      type: 'SKILL',
      user: 'Emma Wilson',
      action: 'added a new skill: Modern Calligraphy & UI Design',
      time: '6 hours ago',
      icon: Lightbulb,
      color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Photography & Lighting Masterclass', date: 'Sat, Aug 22 • 04:00 PM EST', host: 'Maya Chen' },
    { id: 2, title: 'PyTorch Model Fine-Tuning Study Group', date: 'Sun, Aug 23 • 02:00 PM EST', host: 'Priya Sharma' }
  ];

  return (
    <aside className="w-80 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800 p-5 hidden xl:flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40 overflow-y-auto">
      
      <div className="space-y-6">
        {/* Add Skill Button Banner */}
        <button
          onClick={onAddSkill}
          className="w-full btn-primary py-3 rounded-xl font-semibold text-xs shadow-xs flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Swap</span>
        </button>

        {/* Activity Feed Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Activity Feed
            </h3>
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40 space-y-1 text-xs hover:border-slate-300 transition">
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded-lg border shrink-0 ${act.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white leading-tight">{act.user}</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px]">{act.action}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">{act.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Upcoming Workshops
            </h4>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs hover:border-emerald-300 transition">
                <p className="font-semibold text-slate-900 dark:text-white">{evt.title}</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">{evt.date}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Host: {evt.host}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}
