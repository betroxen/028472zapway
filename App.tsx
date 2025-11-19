
'use client';

import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MinesGamePage from './pages/MinesGamePage';
import PlinkoGamePage from './pages/PlinkoGamePage';
import AboutUsPage from './pages/AboutUsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ResponsibleGamingPage from './pages/ResponsibleGamingPage';
import AMLPolicyPage from './pages/AMLPolicyPage';
import CommercialDisclosurePage from './pages/CommercialDisclosurePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';
import RewardsPage from './pages/RewardsPage';
import CasinoDirectoryPage from './pages/CasinoDirectoryPage';
import BonusOffersPage from './pages/BonusOffersPage';
import LiveRTPTrackerPage from './pages/LiveRTPTrackerPage';
import ReviewMethodologyPage from './pages/ReviewMethodologyPage';
import ProvablyFairPage from './pages/ProvablyFairPage';
import SupportPage from './pages/SupportPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import CertifiedPlatformsPage from './pages/CertifiedPlatformsPage';
import AffiliatePage from './pages/AffiliatePage';
import CopyrightNoticePage from './pages/CopyrightNoticePage';
import FAQPage from './pages/FAQPage';
import ProtocolDeepDivePage from './pages/ProtocolDeepDivePage';
import GuidePage from './pages/GuidePage';
import { BonusCalculatorPage } from './pages/BonusCalculatorPage';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { ReviewModal } from './components/ReviewModal';
import { Toaster } from './components/Toaster';

function App() {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const {
    isCollapsed, isMobileOpen, setIsMobileOpen,
    isLoggedIn, login, logout, openLoginModal, openRegisterModal, openReviewModal, setCurrentPage
  } = appContext;

  const renderPage = () => {
    switch (appContext.currentPage) {
      case 'Mines Game': return <MinesGamePage />;
      case 'Plinko Game': return <PlinkoGamePage />;
      case 'About Us': return <AboutUsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Terms of Service': return <TermsOfServicePage />;
      case 'Privacy Policy': return <PrivacyPolicyPage />;
      case 'Cookies Policy': return <CookiesPolicyPage />;
      case 'Responsible Gaming': return <ResponsibleGamingPage />;
      case 'AML & CTF Policy': return <AMLPolicyPage />;
      case 'Commercial Disclosure': return <CommercialDisclosurePage />;
      case 'Copyright Notice': return <CopyrightNoticePage />;
      case 'Profile': return <ProfilePage />;
      case 'Settings': return <SettingsPage />;
      case 'Messages': return <MessagesPage />;
      case 'Rewards': return <RewardsPage />;
      case 'Casino Directory': return <CasinoDirectoryPage />;
      case 'Bonus Offers': return <BonusOffersPage />;
      case 'Live RTP Tracker': return <LiveRTPTrackerPage />;
      case 'Bonus Calculator': return <BonusCalculatorPage />;
      case 'Review Methodology': return <ReviewMethodologyPage />;
      case 'Provably Fair': return <ProvablyFairPage />;
      case 'Protocol Deep Dive': return <ProtocolDeepDivePage />;
      case 'Tactical Guides': return <GuidePage />;
      case 'Support': return <SupportPage />;
      case 'FAQ': return <FAQPage />;
      case 'Certified Platforms': return <CertifiedPlatformsPage />;
      case 'Affiliate Program': return <AffiliatePage />;
      case 'Home': return <HomePage onRegisterClick={openRegisterModal} />;
      case 'Dashboard':
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-foundation text-text-primary font-rajdhani min-h-screen flex flex-col">
        <LoginModal />
        <RegisterModal />
        <Toaster />
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={logout}
          onOpenLogin={openLoginModal}
          onOpenRegister={openRegisterModal}
        />
        <main className="flex-grow">
          <HomePage onRegisterClick={openRegisterModal} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-foundation text-text-primary font-rajdhani min-h-screen">
      <LoginModal />
      <RegisterModal />
      <ReviewModal />
      <Toaster />
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onOpenLogin={openLoginModal}
        onOpenRegister={openRegisterModal}
        onOpenReview={openReviewModal}
        onToggleMobileNav={() => setIsMobileOpen(!isMobileOpen)}
      />
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={appContext.setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div
        className={`relative flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:pl-[var(--sidebar-width)]`}
        style={{ '--sidebar-width': isCollapsed ? '72px' : '256px' } as React.CSSProperties}
      >
        <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
             {renderPage()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
