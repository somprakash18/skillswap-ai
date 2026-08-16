import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, User, Key, Sparkles, ArrowRight, Activity, Phone, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function FounderPortalPage({ setCurrentPage }) {
  const { sendOtp, verifyOtp, loginWithGoogle } = useAuth();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [founderName, setFounderName] = useState('Som Prakash');
  const [founderEmail, setFounderEmail] = useState('prakashsom316@gmail.com');
  const [mobileNumber, setMobileNumber] = useState('+91 9876543210');
  const [passcode, setPasscode] = useState('19451945');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    if (passcode !== '19451945' && passcode !== 'FOUNDER2026' && passcode !== 'admin123') {
      setError('Invalid Founder Passkey. Owner Passkey: 19451945');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(mobileNumber);
      if (res.success) {
        setSentOtp(res.otp || '123456');
        setOtp(res.otp || '123456');
        setStep('otp');
      }
    } catch (err) {
      setError('Failed to send Founder OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFounderOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const ownerUser = {
        id: 1,
        email: founderEmail || 'prakashsom316@gmail.com',
        fullName: founderName || 'Som Prakash (Founder & Owner)',
        mobileNumber,
        college: 'SkillSwap AI Founder Office',
        role: 'ROLE_FOUNDER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 9999,
        rating: 5.0,
        isFounder: true
      };
      localStorage.setItem('user', JSON.stringify(ownerUser));
      localStorage.setItem('token', 'founder-token-som-prakash-19451945');
      window.location.reload();
      setLoading(false);
    }, 600);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const ownerUser = {
        id: 1,
        email: 'prakashsom316@gmail.com',
        fullName: 'Som Prakash (Founder & Owner)',
        mobileNumber: '+91 9876543210',
        college: 'SkillSwap AI Founder Office',
        role: 'ROLE_FOUNDER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 9999,
        rating: 5.0,
        isFounder: true
      };
      localStorage.setItem('user', JSON.stringify(ownerUser));
      localStorage.setItem('token', 'founder-google-token-som-prakash');
      window.location.reload();
    } catch (err) {
      setError('Google Founder Access failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <GlassCard className="border border-amber-500/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Founder & Owner Portal (OTP & Google)
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Som Prakash's Owner Access</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Authenticate via Mobile OTP or Google to access platform control center.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder / Owner Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="Som Prakash"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder Email / Gmail</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="email"
                  required
                  placeholder="prakashsom316@gmail.com"
                  value={founderEmail}
                  onChange={(e) => setFounderEmail(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile Number for OTP</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Founder Secret Passkey</label>
              <div className="relative flex items-center">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none z-10" />
                <input
                  type="password"
                  required
                  placeholder="19451945"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-mono font-bold tracking-wider"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Owner Passkey: <code className="text-amber-500 font-bold">19451945</code></span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
            >
              {loading ? 'Sending Founder OTP...' : 'Send Founder Verification OTP'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
              <span className="bg-white dark:bg-[#121026] px-3 text-[10px] uppercase font-bold text-slate-400 shrink-0">OR</span>
            </div>

            {/* 1-Click Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 rounded-xl border border-amber-500/30 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-amber-500/10 flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google / Gmail (Owner)</span>
            </button>

          </form>
        ) : (
          <form onSubmit={handleVerifyFounderOtp} className="space-y-4">
            
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
              <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Verify Founder OTP Code
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                OTP sent to <span className="font-bold text-slate-900 dark:text-white">{mobileNumber}</span>
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block pt-1">
                Demo OTP Code: <code className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-300">{sentOtp || '123456'}</code>
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">6-Digit OTP</label>
              <input
                type="text"
                required
                maxLength="6"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full theme-input text-center text-lg font-mono tracking-widest py-3 font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying Owner Access...' : 'Verify OTP & Enter Founder Portal'}
              <CheckCircle2 className="w-4 h-4" />
            </button>

          </form>
        )}

      </GlassCard>
    </div>
  );
}
