import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import RightActivityFeed from './components/RightActivityFeed';
import NewSwapModal from './components/NewSwapModal';
import LiveVideoCallRoom from './components/LiveVideoCallRoom';
import GeminiAiChatbot from './components/GeminiAiChatbot';
import GeminiVoiceWidget from './components/GeminiVoiceWidget';
import { Search, Bell, Mail, Plus, ShieldCheck, User, LogOut, GraduationCap, ChevronDown, Sparkles, HelpCircle, FileText, Gift } from 'lucide-react';

// EdTech Pages
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import OwnerDashboard from './pages/AdminDashboard'; // Owner Admin Dashboard
import ExploreSkills from './pages/ExploreSkills';
import MatchesPage from './pages/MatchesPage';
import SkillDetailPage from './pages/SkillDetailPage';
import StudyMaterialsPage from './pages/StudyMaterialsPage';
import PdfLibraryPage from './pages/PdfLibraryPage';
import QuizEnginePage from './pages/QuizEnginePage';
import ReferralPage from './pages/ReferralPage';
import UserProfilePage from './pages/UserProfilePage';
import ChatPage from './pages/ChatPage';
import WalletPage from './pages/WalletPage';
import CertificatesPage from './pages/CertificatesPage';
import NotificationsPage from './pages/NotificationsPage';
import FounderPortalPage from './pages/FounderPortalPage';
import TeacherPortalPage from './pages/TeacherPortalPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('student-dashboard');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showNewSwapModal, setShowNewSwapModal] = useState(false);
  const [activeVideoSession, setActiveVideoSession] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderMainView = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'founder-portal':
        return <FounderPortalPage setCurrentPage={setCurrentPage} />;
      case 'teacher-signup':
        return <TeacherPortalPage setCurrentPage={setCurrentPage} />;
      case 'student-dashboard':
      case 'dashboard':
        return (
          <StudentDashboard
            setCurrentPage={setCurrentPage}
            setSelectedSkill={setSelectedSkill}
            onOpenNewSwap={() => setShowNewSwapModal(true)}
            onOpenVideoCall={(course) => setActiveVideoSession({ mentorName: course.mentor, skillTitle: course.title })}
          />
        );
      case 'teacher-dashboard':
        return <TeacherDashboard setCurrentPage={setCurrentPage} />;
      case 'owner-dashboard':
      case 'admin':
        return <OwnerDashboard />;
      case 'quiz-engine':
        return <QuizEnginePage setCurrentPage={setCurrentPage} />;
      case 'pdf-library':
      case 'materials':
        return <PdfLibraryPage />;
      case 'referral':
        return <ReferralPage />;
      case 'user-profile':
      case 'profile':
        return <UserProfilePage />;
      case 'explore':
        return <ExploreSkills setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
      case 'matches':
        return <MatchesPage setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
      case 'skill-detail':
        return <SkillDetailPage skill={selectedSkill} setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <ChatPage />;
      case 'wallet':
        return <WalletPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'pricing':
        return <PricingPage setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <StudentDashboard
            setCurrentPage={setCurrentPage}
            setSelectedSkill={setSelectedSkill}
            onOpenNewSwap={() => setShowNewSwapModal(true)}
            onOpenVideoCall={(course) => setActiveVideoSession({ mentorName: course.mentor, skillTitle: course.title })}
          />
        );
    }
  };

  if (['landing', 'login', 'register', 'founder-portal', 'teacher-signup'].includes(currentPage)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]">
        {renderMainView()}
        <GeminiAiChatbot />
        <GeminiVoiceWidget />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] font-sans">
      
      {/* Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Center Main Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between gap-6">
          
          {/* Rounded Pill Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search JEE, NEET, Coding, PDFs, Quizzes... (⌘K)"
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-900 dark:text-white rounded-full pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            <button
              onClick={() => setCurrentPage('notifications')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            </button>

            <button
              onClick={() => setCurrentPage('chat')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Messages"
            >
              <Mail className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => setShowNewSwapModal(true)}
              className="btn-primary text-xs font-semibold px-4 py-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course / Swap</span>
            </button>

            {/* Profile Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 pl-2 cursor-pointer focus:outline-none"
                >
                  <img
                    src={user.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700/60">
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">{user.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email || 'student@skillswap.ai'}</p>
                    </div>

                    <div className="py-1 text-xs text-slate-700 dark:text-slate-300">
                      <button
                        onClick={() => { setCurrentPage('student-dashboard'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <User className="w-4 h-4 text-blue-500" />
                        <span>Student Dashboard</span>
                      </button>

                      <button
                        onClick={() => { setCurrentPage('teacher-dashboard'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-purple-600 dark:text-purple-400"
                      >
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                        <span>Teacher Dashboard</span>
                      </button>

                      <button
                        onClick={() => { setCurrentPage('owner-dashboard'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span>Owner Dashboard</span>
                      </button>

                      <button
                        onClick={() => { setCurrentPage('user-profile'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Dedicated Profile</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-700/60">
                      <button
                        onClick={() => { logout(); setCurrentPage('login'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </header>

        {/* Dynamic Main Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {renderMainView()}
        </main>

      </div>

      {/* Right Sidebar Activity Feed */}
      {!['chat', 'settings', 'certificates', 'admin', 'owner-dashboard'].includes(currentPage) && (
        <RightActivityFeed
          onAddSkill={() => setShowNewSwapModal(true)}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Global Floating Gemini AI Chatbot */}
      <GeminiAiChatbot />

      {/* Global Floating Gemini Voice AI Assistant */}
      <GeminiVoiceWidget />

      {/* New Swap Request Modal */}
      {showNewSwapModal && (
        <NewSwapModal
          onClose={() => setShowNewSwapModal(false)}
          onSubmitSuccess={() => setCurrentPage('matches')}
        />
      )}

      {/* Full Live 1-on-1 Video Call Room Overlay */}
      {activeVideoSession && (
        <LiveVideoCallRoom
          session={activeVideoSession}
          onEndCall={() => setActiveVideoSession(null)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
