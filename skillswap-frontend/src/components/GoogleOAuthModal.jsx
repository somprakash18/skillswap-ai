import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function GoogleOAuthModal({ isOpen, onClose, onSelectAccount }) {
  const [loadingAccount, setLoadingAccount] = useState(null);

  if (!isOpen) return null;

  const accounts = [
    {
      id: 1,
      name: 'Som Prakash (Founder)',
      email: 'prakashsom316@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'ROLE_OWNER'
    },
    {
      id: 2,
      name: 'Priya Sharma (Student)',
      email: 'priya.sharma2026@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      role: 'ROLE_STUDENT'
    },
    {
      id: 3,
      name: 'Rohan Verma (AIR 142)',
      email: 'rohan.verma142@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'ROLE_TEACHER'
    }
  ];

  const handleSelect = (account) => {
    setLoadingAccount(account.id);
    setTimeout(() => {
      onSelectAccount(account);
      setLoadingAccount(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Google Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Choose an Account</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">to continue to <strong className="text-blue-600">SkillSwap AI</strong></p>
        </div>

        {/* Account List */}
        <div className="space-y-2.5">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              onClick={() => handleSelect(acc)}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3">
                <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition">{acc.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{acc.email}</p>
                </div>
              </div>

              {loadingAccount === acc.id ? (
                <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              )}
            </div>
          ))}

          <div
            onClick={() => handleSelect({ name: 'Google Student', email: 'student.google@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'ROLE_STUDENT' })}
            className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center gap-3 text-xs font-semibold"
          >
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <span>Use another Google account</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
