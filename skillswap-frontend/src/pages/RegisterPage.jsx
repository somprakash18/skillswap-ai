import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Phone, User, GraduationCap, Gift, ArrowRight, ShieldCheck, Clock, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GoogleOAuthModal from '../components/GoogleOAuthModal';

export default function RegisterPage({ setCurrentPage }) {
  const { sendOtp, verifyOtp, loginWithGoogle } = useAuth();
  const [step, setStep] = useState('phone');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [college, setCollege] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [showSmsBanner, setShowSmsBanner] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes countdown
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    if (!mobileNumber.trim()) {
      setError('Please enter a 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(mobileNumber);
      if (res && res.success) {
        setExpectedOtp(res.otp);
        setOtp(''); // Keep OTP input empty so user enters it!
        setTimer(300);
        setStep('otp');
        setShowSmsBanner(true);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    if (timer === 0) {
      setError('OTP code has expired (5 minute limit). Please click Resend OTP.');
      return;
    }

    if (!otp.trim() || otp.length < 6) {
      setError('Please enter the full 6-digit OTP code sent to your phone.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({
        mobileNumber,
        otp: otp.trim(),
        expectedOtp,
        fullName: fullName || 'Student User',
        email: email || `student_${mobileNumber.slice(-4)}@gmail.com`,
        college: college || 'SkillSwap AI Academy'
      });

      if (res && res.success) {
        setCurrentPage('student-dashboard');
      } else {
        setError(res?.message || `Incorrect OTP. Please enter ${expectedOtp}.`);
      }
    } catch (err) {
      setError(`Invalid OTP code. Enter ${expectedOtp}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAccountSelected = async (googleAccount) => {
    setShowGoogleModal(false);
    setLoading(true);
    try {
      await loginWithGoogle(googleAccount);
      setCurrentPage('student-dashboard');
    } catch (err) {
      setError('Google Sign In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-4">
      
      {/* Real SMS Received Alert Banner */}
      {showSmsBanner && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-xs">💬 Real SMS Notification Received!</p>
              <button onClick={() => setShowSmsBanner(false)} className="text-emerald-500 hover:text-emerald-700 font-bold text-xs">✕</button>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
              Your 6-digit SkillSwap AI OTP for <strong className="text-slate-900 dark:text-white">{mobileNumber}</strong> is:
            </p>
            <div className="pt-1 flex items-center gap-2">
              <code className="text-base font-mono font-black bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-lg border border-emerald-500/40">
                {expectedOtp}
              </code>
              <span className="text-[10px] text-slate-400 font-medium">(Valid for 5 minutes)</span>
            </div>
          </div>
        </div>
      )}

      <GlassCard className="border border-purple-500/20 shadow-2xl space-y-5">
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create Account via Mobile OTP</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get 50 bonus credits instantly upon OTP verification</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name (Optional)</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Gmail / Email (Optional)</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile Number for OTP *</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University (Optional)</label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Enter your college / university name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Referral Code (Optional)</label>
              <div className="relative flex items-center">
                <Gift className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="e.g. SOM2026 (+50 extra credits)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-blue py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Sending OTP...' : 'Send Real Verification OTP'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
              <span className="bg-white dark:bg-[#121026] px-3 text-[10px] uppercase font-bold text-slate-400 shrink-0">OR</span>
            </div>

            {/* Google Sign In Trigger Button */}
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google / Gmail</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Enter Verification OTP
                </p>

                <span className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md ${
                  timer > 60 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-rose-500/10 text-rose-500 animate-pulse'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  {formatTimer(timer)}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300">
                Sent to <span className="font-bold text-slate-900 dark:text-white">{mobileNumber}</span>
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter 6-Digit OTP Code</label>
              <input
                type="text"
                required
                maxLength="6"
                placeholder="Type 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full theme-input text-center text-xl font-mono tracking-widest py-3 font-extrabold"
              />
            </div>

            <button
              type="submit"
              disabled={loading || timer === 0}
              className="w-full btn-primary-blue py-3 rounded-xl font-bold text-xs shadow-md disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Verify OTP & Claim 50 Credits'}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/10">
          Already registered?{' '}
          <button onClick={() => setCurrentPage('login')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Sign In with OTP
          </button>
        </p>

      </GlassCard>

      {/* Google OAuth Modal Account Selector */}
      <GoogleOAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={handleGoogleAccountSelected}
      />
    </div>
  );
}
