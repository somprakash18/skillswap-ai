import React, { useState } from 'react';
import { Users, ShieldAlert, CheckCircle, XCircle, TrendingUp, Coins, Award, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  const stats = [
    { label: 'Total Platform Users', val: '2,450', icon: Users, color: 'text-indigo-400' },
    { label: 'Completed Sessions', val: '18,520', icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Credits Circulating', val: '450,000', icon: Coins, color: 'text-amber-400' },
    { label: 'Certificates Issued', val: '12,100', icon: Award, color: 'text-purple-400' }
  ];

  const sampleUsers = [
    { id: 1, name: 'Alex Chen', email: 'alex.chen@stanford.edu', college: 'Stanford University', rating: 4.9, role: 'ROLE_USER', isBlocked: false },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@mit.edu', college: 'MIT', rating: 5.0, role: 'ROLE_USER', isBlocked: false },
    { id: 3, name: 'Marcus Vance', email: 'marcus.vance@berkeley.edu', college: 'UC Berkeley', rating: 4.8, role: 'ROLE_USER', isBlocked: false },
    { id: 4, name: 'Spam Bot Account', email: 'spammer@tempmail.com', college: 'Unknown', rating: 1.2, role: 'ROLE_USER', isBlocked: true }
  ];

  const [usersList, setUsersList] = useState(sampleUsers);

  const toggleBlock = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          Admin Portal
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-2">Platform Analytics & Management</h1>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <GlassCard key={i} className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${st.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{st.label}</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{st.val}</h3>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* User Management Table */}
      <GlassCard>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-white">Registered Users ({usersList.length})</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search user..."
              className="w-full glass-input pl-9 pr-3 py-1.5 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 uppercase text-[10px] text-slate-400">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">College</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-white">
                    <div>{u.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                  </td>
                  <td className="p-3">{u.college}</td>
                  <td className="p-3 font-bold text-amber-400">⭐ {u.rating}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      u.isBlocked ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {u.isBlocked ? 'BLOCKED' : 'ACTIVE'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className={`px-3 py-1 rounded-lg font-semibold text-[11px] ${
                        u.isBlocked ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'
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
      </GlassCard>

    </div>
  );
}
