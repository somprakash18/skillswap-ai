import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Phone, User, CheckCircle2, ArrowRight, ShieldCheck, Clock, RefreshCw, MessageSquare, AlertCircle, Key, Flame, Zap, Award, Check } from 'lucide-react';
import GoogleOAuthModal from '../components/GoogleOAuthModal';

export default function LoginPage({ setCurrentPage }) {
  const { sendOtp, verifyOtp, loginWithGoogle, login } = useAuth();

  const [authTab, setAuthTab] = useState('otp'); // 'otp' or 'password'
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [showSmsBanner, setShowSmsBanner] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [timer, setTimer] = useState(300);
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
        setOtp('');
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
      setError('OTP has expired. Please click Resend OTP.');
      return;
    }

    if (!otp.trim() || otp.length < 6) {
      setError('Please enter the 6-digit OTP code sent to your phone.');
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
        college: 'SkillSwap AI Academy'
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

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res && res.success) {
        setCurrentPage('student-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials.');
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
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-4">
      
      {/* Real SMS Alert Notification Banner */}
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
              Your 6-digit SkillSwap AI verification code for <strong className="text-slate-900 dark:text-white">{mobileNumber}</strong> is:
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

      {/* Main 2-Column Split Authentication Card */}
      <div className="bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl rounded-[32px] border border-slate-200/80 dark:border-slate-700/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: Platform Branding & Highlights */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-10 text-white flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
              </div>
              <span className="font-black text-xl tracking-tight">SkillSwap <span className="text-amber-300">AI</span></span>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-black leading-snug">
                Learn, Swap & Master Skills with AIR Rankers 🎓
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Join 50,000+ students preparing for JEE, NEET, and Coding with real-time AI assistance & 1-on-1 mentorship.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <Flame className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Get <strong>50 FREE Wallet Credits</strong> instantly upon OTP verification</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <Award className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>Verified Certificates & Practice Quiz Engine</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 relative z-10 flex items-center justify-between text-xs text-blue-100">
            <span>SkillSwap AI 2026</span>
            <span className="font-semibold text-amber-300">v2.4 Production Ready</span>
          </div>
        </div>

        {/* Right Column: Tabbed Auth Inputs */}
        <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
          
          {/* Auth Method Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-xs">
            <button
              onClick={() => { setAuthTab('otp'); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold transition flex items-center justify-center gap-2 ${
                authTab === 'otp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Mobile OTP Sign In</span>
            </button>

            <button
              onClick={() => { setAuthTab('password'); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold transition flex items-center justify-center gap-2 ${
                authTab === 'password' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Password / Founder Login</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: MOBILE OTP AUTHENTICATION */}
          {authTab === 'otp' && (
            <>
              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile Number for OTP *</label>
                    <div className="flex items-center gap-2">
                      <div className="px-3.5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-300 shrink-0">
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number (e.g. 9876543210)"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="flex-1 theme-input text-xs py-3 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full theme-input text-xs py-2.5"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="your.email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full theme-input text-xs py-2.5"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? 'Generating Verification OTP...' : 'Send Verification OTP Code'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        Enter 6-Digit OTP Code
                      </p>

                      <span className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md ${
                        timer > 60 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-rose-500/10 text-rose-500 animate-pulse'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimer(timer)}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300">
                      OTP sent to <span className="font-bold text-slate-900 dark:text-white">+91 {mobileNumber}</span>
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
                      className="w-full theme-input text-center text-2xl font-mono tracking-widest py-3.5 font-extrabold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || timer === 0}
                    className="w-full btn-primary text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Enter Platform'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button type="button" onClick={() => setStep('phone')} className="text-slate-500 hover:underline">
                      &larr; Change Mobile Number
                    </button>
                    <button type="button" onClick={handleSendOtp} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                      Resend OTP Code
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* TAB 2: PASSWORD / FOUNDER LOGIN */}
          {authTab === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. prakashsom316@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full theme-input text-xs py-3"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Password / Founder Passkey</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password or 19451945"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full theme-input text-xs py-3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                {loading ? 'Signing In...' : 'Sign In to Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
            <span className="bg-white dark:bg-[#1E293B] px-3 text-[10px] uppercase font-bold text-slate-400 shrink-0">OR</span>
          </div>

          {/* Google Sign In Trigger Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google / Gmail</span>
          </button>

        </div>

      </div>

      {/* Google OAuth Account Selector Modal */}
      <GoogleOAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={handleGoogleAccountSelected}
      />

    </div>
  );
}
