import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import RightActivityFeed from './components/RightActivityFeed';
import NewSwapModal from './components/NewSwapModal';
import LiveVideoCallRoom from './components/LiveVideoCallRoom';
import { Search, Bell, Mail, Plus, ShieldCheck } from 'lucide-react';

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

  if (['landing', 'login', 'register', 'founder-portal'].includes(currentPage)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0914] text-slate-900 dark:text-white">
        {renderMainView()}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0914] text-slate-900 dark:text-white font-sans">
      
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
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#121026]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Top Search Bar */}
          <div className="relative flex-1 max-w-sm sm:max-w-md md:max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search for skills, people, or events..."
              className="w-full theme-input pl-11 text-xs py-2 font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            
            {/* Owner Control Center Button */}
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/20 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Owner Analytics</span>
            </button>

            <button
              onClick={() => setCurrentPage('notifications')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 relative transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>

            <button
              onClick={() => setCurrentPage('chat')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
            >
              <Mail className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowNewSwapModal(true)}
              className="btn-primary-blue text-xs font-bold px-3.5 py-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Skill</span>
            </button>

            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 hidden md:inline">
                  Hi, {user.fullName.split(' ')[0].toLowerCase()}
                </span>
                <button
                  onClick={() => { logout(); setCurrentPage('login'); }}
                  className="btn-danger-red"
                >
                  Logout
                </button>
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
