import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Phone, User, GraduationCap, Gift, ArrowRight, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function RegisterPage({ setCurrentPage }) {
  const { sendOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState('phone');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [college, setCollege] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
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
    e?.preventDefault();
    setError(null);
    if (!mobileNumber.trim()) {
      setError('Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(mobileNumber);
      if (res.success) {
        setSentOtp(res.otp || '123456');
        setOtp(res.otp || '123456');
        setTimer(300);
        setStep('otp');
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

    setLoading(true);
    try {
      const res = await verifyOtp({
        mobileNumber,
        otp,
        fullName,
        email,
        college
      });
      if (res && res.success) {
        setCurrentPage('dashboard');
      }
    } catch (err) {
      setError('Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
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
            <span>{error}</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Gmail / Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-3"
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
                  className="w-full theme-input pl-11 text-xs py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University</label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  required
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
                  placeholder="e.g. ALEX2026 (+25 extra credits)"
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
    </div>
  );
}
