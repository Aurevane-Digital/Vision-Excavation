import React, { useState } from 'react';
import { PageView, ProjectItem } from './types';
import { TopNotificationBar } from './components/TopNotificationBar';
import { MainHeader } from './components/MainHeader';
import { MainFooter } from './components/MainFooter';
import { HomeView } from './views/HomeView';
import { SpeedInsights } from '@vercel/speed-insights/next';

const AboutView = React.lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const ServicesView = React.lazy(() => import('./views/ServicesView').then(m => ({ default: m.ServicesView })));
const OurWorkView = React.lazy(() => import('./views/OurWorkView').then(m => ({ default: m.OurWorkView })));
const ContactView = React.lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const QuoteModal = React.lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));
const ProjectModal = React.lazy(() => import('./components/ProjectModal').then(m => ({ default: m.ProjectModal })));

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('excavation');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (service?: string) => {
    if (service) {
      setPrefilledService(service);
    }
    setIsQuoteModalOpen(true);
  };

  const handleApplyEstimate = (data: { service: string; message: string }) => {
    setPrefilledService(data.service);
    setPrefilledMessage(data.message);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceFromFooter = (serviceId: string) => {
    setPrefilledService(serviceId);
    setCurrentView('services');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#E31B23] selection:text-white">
      {/* Top Contact & Hours Bar */}
      <TopNotificationBar />

      {/* Main Header */}
      <MainHeader
        currentView={currentView}
        onNavigate={handleNavigate}
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
            onSelectProject={setSelectedProject}
            onQuickQuoteSubmit={(data) => {
              // Can also transition or show toast
            }}
          />
        )}

        <React.Suspense fallback={<div className="min-h-[600px] bg-white flex items-center justify-center"><div className="w-8 h-8 border-3 border-zinc-200 border-t-[#E31B23] rounded-full animate-spin"></div></div>}>
          {currentView === 'about' && (
            <AboutView
              onNavigate={handleNavigate}
              onRequestQuote={() => handleOpenQuoteModal()}
            />
          )}

          {currentView === 'services' && (
            <ServicesView
              onNavigate={handleNavigate}
              onRequestQuote={handleOpenQuoteModal}
              onApplyEstimate={handleApplyEstimate}
            />
          )}

          {currentView === 'our-work' && (
            <OurWorkView
              onNavigate={handleNavigate}
              onRequestQuote={() => handleOpenQuoteModal()}
              onSelectProject={setSelectedProject}
            />
          )}

          {currentView === 'contact' && (
            <ContactView
              prefilledService={prefilledService}
              prefilledMessage={prefilledMessage}
            />
          )}

          {/* Global Modals */}
          {isQuoteModalOpen && (
            <QuoteModal
              isOpen={isQuoteModalOpen}
              initialService={prefilledService}
              onClose={() => setIsQuoteModalOpen(false)}
            />
          )}

          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onRequestQuote={(serviceCategory) => {
                setSelectedProject(null);
                handleOpenQuoteModal(serviceCategory);
              }}
            />
          )}
        </React.Suspense>
      </main>

      {/* Main Footer */}
      <MainFooter
        onNavigate={handleNavigate}
        onSelectService={handleSelectServiceFromFooter}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
