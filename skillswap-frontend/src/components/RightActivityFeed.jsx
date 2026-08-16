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
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      id: 2,
      type: 'SWAP',
      user: 'Sarah Chen & Michael Torres',
      action: 'started a new skill swap (Guitar ↔ React)',
      time: '3 hours ago',
      icon: Users,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 3,
      type: 'EVENT',
      user: 'Community Workshop',
      action: 'AI Prompt Engineering Workshop this Saturday',
      time: '5 hours ago',
      icon: Calendar,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 4,
      type: 'SKILL',
      user: 'Emma Wilson',
      action: 'added a new skill: Modern Calligraphy & UI Design',
      time: '6 hours ago',
      icon: Lightbulb,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Photography & Lighting Masterclass', date: 'Sat, Aug 22 • 04:00 PM EST', host: 'Maya Chen' },
    { id: 2, title: 'PyTorch Model Fine-Tuning Study Group', date: 'Sun, Aug 23 • 02:00 PM EST', host: 'Priya Sharma' }
  ];

  return (
    <aside className="w-80 bg-white dark:bg-[#121026] border-l border-slate-200 dark:border-white/10 p-5 hidden xl:flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40 overflow-y-auto">
      
      <div className="space-y-6">
        {/* Add Skill Button Banner */}
        <button
          onClick={onAddSkill}
          className="w-full btn-primary-blue py-3 rounded-2xl font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Skill Swap</span>
        </button>

        {/* Activity Feed Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Activity Feed
            </h3>
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded-xl border shrink-0 ${act.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">{act.user}</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{act.action}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">{act.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Upcoming Workshops
            </h4>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{evt.title}</p>
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
