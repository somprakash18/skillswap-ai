import React from 'react';
import { Filter, Lightbulb, Users, Calendar, Sparkles, Plus, ArrowRight, Clock, Zap } from 'lucide-react';

export default function RightActivityFeed({ onAddSkill, setCurrentPage }) {
  const activities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'started mentoring in Web Development & React',
      time: '2 hours ago',
      category: 'CODING',
      dotColor: 'bg-blue-500 ring-blue-500/20'
    },
    {
      id: 2,
      user: 'Sarah Chen & Michael Torres',
      action: 'completed 1-on-1 Swap: Guitar ↔ React.js',
      time: '3 hours ago',
      category: 'SWAP',
      dotColor: 'bg-emerald-500 ring-emerald-500/20'
    },
    {
      id: 3,
      user: 'Rohan Verma (AIR 142)',
      action: 'published JEE Advanced Mechanics PYQ Notes',
      time: '5 hours ago',
      category: 'JEE',
      dotColor: 'bg-amber-500 ring-amber-500/20'
    },
    {
      id: 4,
      user: 'Ananya Deshmukh (AIIMS AIR 89)',
      action: 'scheduled NEET Biology 360/360 NCERT Live Class',
      time: '6 hours ago',
      category: 'NEET',
      dotColor: 'bg-purple-500 ring-purple-500/20'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'JEE Physics Mechanics Problem Solving', date: 'Today • 04:00 PM', host: 'Rohan Verma (AIR 142)' },
    { id: 2, title: 'Fullstack React & Next.js Workshop', date: 'Tomorrow • 11:00 AM', host: 'Sophia Ansari' }
  ];

  return (
    <aside className="w-80 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800 p-5 hidden xl:flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 overflow-y-auto pb-32">
      
      <div className="space-y-6">
        
        {/* Add Skill Swap Primary CTA Banner */}
        <button
          onClick={onAddSkill}
          className="w-full btn-primary py-3 rounded-2xl font-bold text-xs shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Swap</span>
        </button>

        {/* Timeline Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              Live Activity Feed
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Real-time</span>
          </div>

          {/* Vertical Timeline Line & Items */}
          <div className="relative pl-4 space-y-4 border-l-2 border-slate-200/80 dark:border-slate-700/80 ml-2">
            {activities.map((act) => (
              <div key={act.id} className="relative group text-xs space-y-1">
                {/* Glowing Dot Node */}
                <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ${act.dotColor}`} />

                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{act.user}</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{act.category}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed font-medium">
                  {act.action}
                </p>

                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Upcoming Live Sessions
            </h4>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-1 hover:border-emerald-500/40 transition">
                <p className="font-extrabold text-slate-900 dark:text-white leading-snug">{evt.title}</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{evt.date}</p>
                <p className="text-[10px] text-slate-400 font-medium">Host: {evt.host}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </aside>
  );
}
