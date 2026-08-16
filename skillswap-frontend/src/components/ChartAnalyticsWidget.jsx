import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Award, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart2, PieChart, Activity } from 'lucide-react';

export default function ChartAnalyticsWidget() {
  const [timeRange, setTimeRange] = useState('7d');

  // Interactive Chart Data Sets
  const signupData = {
    '7d': [
      { day: 'Mon', signups: 14, active: 42 },
      { day: 'Tue', signups: 22, active: 58 },
      { day: 'Wed', signups: 18, active: 64 },
      { day: 'Thu', signups: 35, active: 89 },
      { day: 'Fri', signups: 29, active: 95 },
      { day: 'Sat', signups: 44, active: 112 },
      { day: 'Sun', signups: 52, active: 138 }
    ],
    '30d': [
      { day: 'W1', signups: 120, active: 310 },
      { day: 'W2', signups: 185, active: 490 },
      { day: 'W3', signups: 240, active: 680 },
      { day: 'W4', signups: 310, active: 920 }
    ]
  };

  const revenueData = [
    { category: 'JEE Prep', revenue: '₹48,500', credits: '18,400', pct: 38, color: 'bg-amber-500' },
    { category: 'NEET Prep', revenue: '₹42,200', credits: '16,100', pct: 32, color: 'bg-emerald-500' },
    { category: 'Coding & Tech', revenue: '₹28,800', credits: '11,200', pct: 20, color: 'bg-blue-500' },
    { category: 'Guitar & Music', revenue: '₹12,500', credits: '4,800', pct: 10, color: 'bg-purple-500' }
  ];

  const currentPoints = signupData[timeRange] || signupData['7d'];
  const maxVal = Math.max(...currentPoints.map(p => Math.max(p.signups, p.active)));

  return (
    <div className="space-y-6 pt-2">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Real-Time SaaS Analytics Engine
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Platform Growth & Revenue Charts</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live tracking of daily signups, active users, credit circulation, and conversion rates.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-white/5 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${timeRange === '7d' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${timeRange === '30d' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'}`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {/* 2 Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Active Users & Daily Signups Line Graph (2 cols) */}
        <div className="lg:col-span-2 theme-card space-y-4 flex flex-col justify-between border border-slate-100 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Active Swappers & Daily Signups</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">User onboarding vs active mentorship session participants</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Active Swappers
              </span>
              <span className="flex items-center gap-1.5 text-amber-500">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> New Signups
              </span>
            </div>
          </div>

          {/* SVG Line & Bar Combination Graph */}
          <div className="h-56 w-full pt-4 flex items-end justify-between gap-3 relative border-b border-slate-200 dark:border-white/10 pb-4 px-2">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
            </div>

            {currentPoints.map((p, idx) => {
              const activeHeight = Math.round((p.active / maxVal) * 160);
              const signupHeight = Math.round((p.signups / maxVal) * 160);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                  
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20">
                    <p className="font-bold text-amber-400">{p.day}</p>
                    <p>Active: {p.active} | Signups: {p.signups}</p>
                  </div>

                  {/* Dual Bar Display */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* Active Bar */}
                    <div
                      className="w-3 sm:w-4 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${activeHeight}px` }}
                    />
                    {/* Signup Bar */}
                    <div
                      className="w-3 sm:w-4 bg-gradient-to-t from-amber-500 to-orange-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${signupHeight}px` }}
                    />
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{p.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <TrendingUp className="w-4 h-4" /> +24.8% user growth this week
            </span>
            <span>Total Registered Users: <strong className="text-slate-900 dark:text-white">2,480</strong></span>
          </div>

        </div>

        {/* Chart 2: Top Skill Category Distribution (1 col) */}
        <div className="theme-card space-y-4 flex flex-col justify-between border border-slate-100 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Revenue & Skill Breakdown</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Share of platform credits & purchases</p>
              </div>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-3.5 pt-5">
              {revenueData.map((rev, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${rev.color}`} />
                      {rev.category}
                    </span>
                    <div className="text-right">
                      <span className="font-black text-amber-500">{rev.revenue}</span>
                      <span className="text-slate-400 text-[10px] ml-1.5">({rev.pct}%)</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${rev.color} transition-all duration-500`}
                      style={{ width: `${rev.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex justify-between items-center mt-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Total Platform Revenue</span>
              <span className="text-base font-black text-amber-600 dark:text-amber-400">₹1,32,000</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Credits Circulating</span>
              <span className="text-base font-black text-blue-600 dark:text-blue-400">50,500 🪙</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
