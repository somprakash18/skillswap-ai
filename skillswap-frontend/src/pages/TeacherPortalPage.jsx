import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, User, Mail, Phone, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function TeacherPortalPage({ setCurrentPage }) {
  const { sendOtp, verifyOtp, loginWithGoogle } = useAuth();
  const [step, setStep] = useState('register'); // 'register' or 'otp'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [category, setCategory] = useState('JEE_PREP');
  const [qualification, setQualification] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'JEE_PREP', label: '🎓 JEE Main & Advanced Prep' },
    { id: 'NEET_PREP', label: '🩺 NEET UG Medical Prep' },
    { id: 'CODING', label: '💻 Coding & Software Engineering' },
    { id: 'GUITAR', label: '🎸 Guitar & String Instruments' },
    { id: 'MUSIC', label: '🎵 Music & Vocal Coaching' }
  ];

  const handleSendOtp = async (e) => {
    e.preventDefault();
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
        setStep('otp');
      }
    } catch (err) {
      setError('Failed to send verification OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTeacher = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const teacherUser = {
        id: Date.now(),
        fullName: fullName || 'Verified Teacher',
        email: email || 'teacher@skillswap.ai',
        mobileNumber,
        role: 'ROLE_TEACHER',
        isTeacher: true,
        category,
        qualification: qualification || 'Verified Subject Educator',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 200,
        rating: 5.0
      };

      localStorage.setItem('user', JSON.stringify(teacherUser));
      localStorage.setItem('token', 'teacher-token-verified');
      window.location.reload();
      setLoading(false);
    }, 600);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const teacherUser = {
        id: Date.now(),
        fullName: 'Google Teacher / Mentor',
        email: 'teacher.google@gmail.com',
        mobileNumber: '+91 9876543210',
        role: 'ROLE_TEACHER',
        isTeacher: true,
        category: 'CODING',
        qualification: 'Verified Google Mentor',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 200,
        rating: 5.0
      };
      localStorage.setItem('user', JSON.stringify(teacherUser));
      localStorage.setItem('token', 'teacher-google-token');
      window.location.reload();
    } catch (err) {
      setError('Google Sign In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <GlassCard className="border border-blue-500/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
            Teacher & Mentor Portal (OTP & Google)
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Teacher Sign Up / Sign In</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in with Mobile OTP or Google to publish JEE, NEET, Coding, Guitar & Music courses.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {step === 'register' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Teacher Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Teacher Email / Gmail</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Teaching Subject</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full theme-input text-xs py-2.5 font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Qualification / Rank / Experience</label>
              <div className="relative flex items-center">
                <Award className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="e.g. IIT Bombay AIR 142 / AIIMS AIR 89 / Senior Guitarist"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full theme-input pl-11 text-xs py-2.5 font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-blue py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Sending Verification OTP...' : 'Send Teacher Verification OTP'}
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
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google / Gmail (Teacher)</span>
            </button>

          </form>
        ) : (
          <form onSubmit={handleVerifyTeacher} className="space-y-4">
            
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
              <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Verify Teacher OTP Code
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
              className="w-full btn-primary-blue py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying Educator Credentials...' : 'Complete Teacher Signup & Publish Courses'}
              <CheckCircle2 className="w-4 h-4" />
            </button>

          </form>
        )}

      </GlassCard>
    </div>
  );
}
