import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ExploreSkills from './pages/ExploreSkills';
import SkillDetailPage from './pages/SkillDetailPage';
import ChatPage from './pages/ChatPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import CertificatesPage from './pages/CertificatesPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminDashboard from './pages/AdminDashboard';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
      case 'explore':
        return <ExploreSkills setCurrentPage={setCurrentPage} setSelectedSkill={setSelectedSkill} />;
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
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#0b0914] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <div>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main>{renderPage()}</main>
        </div>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </AuthProvider>
  );
}
