import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Compass, Users, MessageSquare, Calendar, Award, Settings, Moon, Sun, ShieldCheck, FileText, GraduationCap, Zap, LogOut } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, isDarkMode, setIsDarkMode }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore Skills', icon: Compass },
    { id: 'matches', label: 'Connections', icon: Users },
    { id: 'materials', label: 'PDFs & Quizzes', icon: FileText },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'events', label: 'Events & Sessions', icon: Calendar },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'admin', label: 'Owner Analytics', icon: ShieldCheck, isOwner: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800 flex flex-col justify-between p-4 h-screen sticky top-0 shrink-0 z-40">
      
      <div>
        {/* Brand Logo Header */}
        <div 
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-3 px-3 py-3 cursor-pointer group mb-4"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              SkillSwap <span className="text-blue-600 dark:text-blue-400">AI</span>
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-0.5">Campus Exchange</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id || (item.id === 'dashboard' && currentPage === 'landing');
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : item.isOwner
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : item.isOwner ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
        
        {/* Teacher Portal Button */}
        <button
          onClick={() => setCurrentPage('teacher-signup')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100/70 border border-blue-100 dark:border-blue-900/40 transition"
        >
          <span className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Teacher Portal</span>
          </span>
          <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md font-bold">TEACH</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-200/80 transition"
        >
          <span className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </span>
          <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md font-medium text-slate-500 dark:text-slate-400">⌘D</span>
        </button>

        {/* User Card Profile */}
        {user ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"}
                alt={user.fullName}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="truncate">
                <p className="font-semibold text-xs text-slate-900 dark:text-white truncate">{user.fullName}</p>
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
            className="w-full btn-primary text-xs font-semibold py-2.5"
          >
            Sign In
          </button>
        )}

      </div>

    </aside>
  );
}
