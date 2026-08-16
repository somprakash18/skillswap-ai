import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import RightActivityFeed from './components/RightActivityFeed';
import NewSwapModal from './components/NewSwapModal';
import LiveVideoCallRoom from './components/LiveVideoCallRoom';
import { Search, Bell, Mail, Plus, ShieldCheck, User, LogOut, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import ExploreSkills from './pages/ExploreSkills';
import MatchesPage from './pages/MatchesPage';
import SkillDetailPage from './pages/SkillDetailPage';
import StudyMaterialsPage from './pages/StudyMaterialsPage';
import ChatPage from './pages/ChatPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import CertificatesPage from './pages/CertificatesPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminDashboard from './pages/AdminDashboard';
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
  const [currentPage, setCurrentPage] = useState('dashboard');
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
      case 'dashboard':
        return (
          <Dashboard
            setCurrentPage={setCurrentPage}
            setSelectedSkill={setSelectedSkill}
            onOpenNewSwap={() => setShowNewSwapModal(true)}
            onOpenVideoCall={(course) => setActiveVideoSession({ mentorName: course.mentor, skillTitle: course.title })}
          />
        );
      case 'explore':
        return <ExploreSkills setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
      case 'matches':
        return <MatchesPage setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
      case 'materials':
        return <StudyMaterialsPage setCurrentPage={setCurrentPage} />;
      case 'skill-detail':
        return <SkillDetailPage skill={selectedSkill} setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <ChatPage />;
      case 'wallet':
        return <WalletPage />;
      case 'profile':
        return <ProfilePage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'pricing':
        return <PricingPage setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <Dashboard
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
        
        {/* Top Header Bar — Modern & Minimal (Linear / Stripe Style) */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between gap-6">
          
          {/* Rounded Pill Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search for skills, mentors, or courses... (⌘K)"
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-900 dark:text-white rounded-full pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition"
            />
          </div>

          {/* Right Header Navigation Icons & Profile Dropdown */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell */}
            <button
              onClick={() => setCurrentPage('notifications')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            </button>

            {/* Messages */}
            <button
              onClick={() => setCurrentPage('chat')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Messages"
            >
              <Mail className="w-4.5 h-4.5" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setShowNewSwapModal(true)}
              className="btn-primary text-xs font-semibold px-4 py-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill Swap</span>
            </button>

            {/* Clean User Profile Dropdown */}
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
                      <p className="text-[11px] text-slate-400 truncate">{user.email || 'user@skillswap.ai'}</p>
                    </div>

                    <div className="py-1 text-xs text-slate-700 dark:text-slate-300">
                      <button
                        onClick={() => { setCurrentPage('profile'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => { setCurrentPage('admin'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span>Owner Analytics</span>
                      </button>

                      <button
                        onClick={() => { setCurrentPage('teacher-signup'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        <span>Teacher Portal</span>
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

        {/* Dynamic Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {renderMainView()}
        </main>

      </div>

      {/* Right Sidebar Activity Feed */}
      {!['chat', 'settings', 'certificates', 'admin'].includes(currentPage) && (
        <RightActivityFeed
          onAddSkill={() => setShowNewSwapModal(true)}
          setCurrentPage={setCurrentPage}
        />
      )}

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
