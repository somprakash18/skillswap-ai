import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Coins, Bell, User as UserIcon, LogOut, ShieldCheck, Award, MessageSquare, Compass, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const { user, wallet, notifications, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              SkillSwap <span className="gradient-text">AI</span>
            </span>
            <span className="text-[10px] block font-mono tracking-widest text-indigo-300 uppercase -mt-1">Campus Marketplace</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'explore', label: 'Explore Skills', icon: Compass },
            { id: 'chat', label: 'Session Chat', icon: MessageSquare },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'pricing', label: 'Pricing', icon: Coins },
          ].map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          {user && user.role === 'ROLE_ADMIN' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'admin'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Wallet Credits Badge */}
              <button 
                onClick={() => setCurrentPage('wallet')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold hover:bg-amber-500/20 transition"
              >
                <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{wallet.balance} Credits</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 relative transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      <span className="text-xs text-indigo-400">{unreadCount} new</span>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                          <p className="font-medium text-slate-200">{n.title}</p>
                          <p className="text-slate-400 mt-0.5">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-3 shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <p className="font-semibold text-sm text-white">{user.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setCurrentPage('profile'); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl transition"
                    >
                      <UserIcon className="w-4 h-4 text-indigo-400" />
                      View Profile
                    </button>
                    <button
                      onClick={() => { logout(); setCurrentPage('landing'); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition"
              >
                Log In
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="px-4 py-2 rounded-xl text-sm font-semibold gradient-btn text-white shadow-lg shadow-indigo-500/25"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
