import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Compass, Users, MessageSquare, Calendar, Award, Settings, Moon, Sun, ArrowRight, RefreshCw, LogOut, ShieldCheck } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, isDarkMode, setIsDarkMode }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'matches', label: 'Connections', icon: Users },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'events', label: 'Events & Sessions', icon: Calendar },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'admin', label: 'Owner Analytics', icon: ShieldCheck, isOwner: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#121026] border-r border-slate-200 dark:border-white/10 flex flex-col justify-between p-4 h-screen sticky top-0 shrink-0 z-40">
      
      <div>
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-3 px-2 py-3 cursor-pointer group mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              SkillSwap <span className="text-blue-600 dark:text-blue-400">AI</span>
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">Campus Exchange</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id || (item.id === 'dashboard' && currentPage === 'landing');
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 shadow-sm'
                    : item.isOwner
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : item.isOwner ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
        
        {/* Founder Portal Shortcut */}
        <button
          onClick={() => setCurrentPage('founder-portal')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold transition border border-amber-500/20"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Founder Portal</span>
          </span>
          <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black">OWNER</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition"
        >
          <span className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </span>
          <span className="text-[10px] bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-md">Toggle</span>
        </button>

        {/* User Card */}
        {user ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"}
                alt={user.fullName}
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div className="truncate">
                <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{user.fullName}</p>
                <button onClick={() => setCurrentPage('profile')} className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline block font-medium">
                  View Profile
                </button>
              </div>
            </div>

            <button
              onClick={() => { logout(); setCurrentPage('login'); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCurrentPage('login')}
            className="w-full btn-primary-blue text-xs font-bold py-2.5"
          >
            Sign In
          </button>
        )}

      </div>

    </aside>
  );
}
