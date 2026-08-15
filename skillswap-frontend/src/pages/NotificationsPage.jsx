import React from 'react';
import { Bell, CheckCircle2, Calendar, Coins, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

export default function NotificationsPage() {
  const { notifications } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="w-6 h-6 text-indigo-400" />
        <h1 className="text-2xl font-extrabold text-white">Activity Notifications</h1>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <GlassCard key={n.id} className="flex items-center justify-between p-4 border-l-4 border-indigo-500">
            <div>
              <h4 className="font-semibold text-sm text-white">{n.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
            </div>
            <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-full text-slate-400">
              {n.type}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
