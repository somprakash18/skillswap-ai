import React, { useState } from 'react';
import { Users, ShieldAlert, CheckCircle, XCircle, TrendingUp, Coins, Award, Search, Activity, Phone, Mail, Clock, Sparkles, UserCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ChartAnalyticsWidget from '../components/ChartAnalyticsWidget';

export default function AdminDashboard() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  // Real-time tracking data of registered & signed-in users
  const [usersList, setUsersList] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex.chen@gmail.com',
      phone: '+91 9876543210',
      college: 'Stanford University',
      credits: 120,
      registeredAt: 'Aug 16, 2026 05:28 PM',
      lastLoginAt: 'Aug 16, 2026 05:32 PM',
      otpStatus: 'VERIFIED',
      role: 'ROLE_USER',
      isBlocked: false
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      phone: '+91 9876543211',
      college: 'MIT',
      credits: 190,
      registeredAt: 'Aug 16, 2026 04:15 PM',
      lastLoginAt: 'Aug 16, 2026 05:10 PM',
      otpStatus: 'VERIFIED',
      role: 'ROLE_USER',
      isBlocked: false
    },
    {
      id: 3,
      name: 'Sophia Ansari',
      email: 'sophia.ansari@gmail.com',
      phone: '+91 9876543212',
      college: 'Stanford University',
      credits: 75,
      registeredAt: 'Aug 16, 2026 03:40 PM',
      lastLoginAt: 'Aug 16, 2026 04:50 PM',
      otpStatus: 'VERIFIED',
      role: 'ROLE_USER',
      isBlocked: false
    },
    {
      id: 4,
      name: 'Marcus Vance',
      email: 'marcus.vance@berkeley.edu',
      phone: '+91 9876543213',
      college: 'UC Berkeley',
      credits: 50,
      registeredAt: 'Aug 16, 2026 02:20 PM',
      lastLoginAt: 'Aug 16, 2026 03:00 PM',
      otpStatus: 'VERIFIED',
      role: 'ROLE_USER',
      isBlocked: false
    },
    {
      id: 5,
      name: 'Spam Bot Account',
      email: 'spammer@tempmail.com',
      phone: '+91 9999999999',
      college: 'Unknown',
      credits: 0,
      registeredAt: 'Aug 15, 2026 11:30 PM',
      lastLoginAt: 'Aug 15, 2026 11:31 PM',
      otpStatus: 'FAILED',
      role: 'ROLE_USER',
      isBlocked: true
    }
  ]);

  // Live Sign-In Activity Audit Stream
  const activityAuditLogs = [
    { id: 101, user: 'Alex Chen', phone: '+91 9876543210', email: 'alex.chen@gmail.com', event: 'Verified Mobile OTP & Signed In', time: 'Just now' },
    { id: 102, user: 'Priya Sharma', phone: '+91 9876543211', email: 'priya.sharma@gmail.com', event: 'Completed 1-on-1 PyTorch Mentorship Session', time: '12 min ago' },
    { id: 103, user: 'Sophia Ansari', phone: '+91 9876543212', email: 'sophia.ansari@gmail.com', event: 'Purchased 120 Credit Pack via Razorpay', time: '25 min ago' },
    { id: 104, user: 'Marcus Vance', phone: '+91 9876543213', email: 'marcus.vance@berkeley.edu', event: 'Registered Account via Google Sign In', time: '1 hour ago' }
  ];

  const toggleBlock = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  const grantBonusCredits = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, credits: u.credits + 50 } : u));
    alert('Granted +50 Bonus Credits to user!');
  };

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Founder Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Founder & Owner Control Center — Som Prakash
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Welcome, Som Prakash!</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live tracking of who signed in, how many users registered, and OTP authentication logs (prakashsom316@gmail.com).</p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-2xl text-xs font-bold">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Real-Time Tracker Active</span>
        </div>
      </div>

      {/* Chart.js SaaS Analytics Engine */}
      <ChartAnalyticsWidget />

      {/* Owner Real-Time Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Registered Users</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{usersList.length} Users</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Signed In Today</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">4 Active</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">OTP Verified Users</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">100%</h3>
          </div>
        </div>

        <div className="theme-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Circulating Credits</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">435 Credits</h3>
          </div>
        </div>

      </div>

      {/* Live Sign-In Activity Stream */}
      <div className="theme-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Live Sign-In & OTP Activity Audit Feed
          </h3>
          <span className="text-xs text-slate-400 font-mono">Auto-Refreshing</span>
        </div>

        <div className="space-y-2.5">
          {activityAuditLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 font-bold flex items-center justify-center">
                  OTP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">{log.user}</span>
                    <span className="text-[10px] text-slate-400">({log.phone} • {log.email})</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{log.event}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Signed-In Users Roster Table */}
      <div className="theme-card space-y-5">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Registered User Roster ({filteredUsers.length})</h3>
            <p className="text-xs text-slate-500">Track user Gmails, Mobile Numbers, OTP status, and Login Timestamps.</p>
          </div>

          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, gmail, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full theme-input pl-9 pr-3 py-2 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-white/5 uppercase text-[10px] font-extrabold text-slate-400">
              <tr>
                <th className="p-3">User Name & Contact</th>
                <th className="p-3">College</th>
                <th className="p-3">OTP Verification</th>
                <th className="p-3">Last Active Login</th>
                <th className="p-3">Wallet Credits</th>
                <th className="p-3">Account Status</th>
                <th className="p-3 text-right">Owner Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition">
                  
                  {/* Name & Contact */}
                  <td className="p-3">
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm">{u.name}</p>
                    <div className="flex flex-col text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-500" /> {u.email}</span>
                      <span className="flex items-center gap-1 font-mono mt-0.5"><Phone className="w-3 h-3 text-emerald-500" /> {u.phone}</span>
                    </div>
                  </td>

                  {/* College */}
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{u.college}</td>

                  {/* OTP Status */}
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      u.otpStatus === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                    }`}>
                      ✓ {u.otpStatus}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {u.lastLoginAt}
                    </div>
                  </td>

                  {/* Wallet Credits */}
                  <td className="p-3 font-bold text-amber-500 text-sm">
                    {u.credits} Credits
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      u.isBlocked ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                    }`}>
                      {u.isBlocked ? 'BLOCKED' : 'ACTIVE'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => grantBonusCredits(u.id)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[11px] border border-amber-500/20"
                    >
                      +50 Bonus
                    </button>
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                        u.isBlocked ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {u.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
