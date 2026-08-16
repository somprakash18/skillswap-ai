import React from 'react';
import { BarChart2, Target, Award, Clock, TrendingUp, Sparkles, Zap, BookOpen } from 'lucide-react';

export default function AnalyticsRadarWidget() {
  const subjectBars = [
    { subject: 'JEE Physics Mechanics', score: 85, color: 'bg-blue-600' },
    { subject: 'NEET Organic Chemistry', score: 92, color: 'bg-emerald-600' },
    { subject: 'Java & DSA Microservices', score: 96, color: 'bg-purple-600' },
    { subject: 'JEE Mathematics Calculus', score: 78, color: 'bg-amber-500' }
  ];

  const weeklyHours = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.0 },
    { day: 'Wed', hours: 5.2 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 6.8 },
    { day: 'Sat', hours: 8.0 },
    { day: 'Sun', hours: 9.2 }
  ];

  return (
    <div className="theme-card space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              Performance Analytics & Mastery Radar
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md">Top 5% Performer</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Real-time learning stats & accuracy tracking</p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-400">Updated 1h ago</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Subject Mastery Radar Bars */}
        <div className="space-y-3.5">
          <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Subject Mastery Breakdown</h4>
          {subjectBars.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-200">{item.subject}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{item.score}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Study Time Bar Chart */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Weekly Study Hours (47.2h Total)</h4>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14% vs Last Week
            </span>
          </div>

          <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/40">
            {weeklyHours.map((wh, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-600 transition">{wh.hours}h</div>
                <div
                  className="w-full bg-blue-600/80 group-hover:bg-blue-600 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(wh.hours / 10) * 100}%` }}
                />
                <span className="text-[10px] font-extrabold text-slate-400 uppercase pb-1">{wh.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
