import React, { useState } from 'react';
import { PageView, ProjectItem } from './types';
import { TopNotificationBar } from './components/TopNotificationBar';
import { MainHeader } from './components/MainHeader';
import { MainFooter } from './components/MainFooter';
import { QuoteModal } from './components/QuoteModal';
import { ProjectModal } from './components/ProjectModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { OurWorkView } from './views/OurWorkView';
import { ContactView } from './views/ContactView';

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
      </main>

      {/* Main Footer */}
      <MainFooter
        onNavigate={handleNavigate}
        onSelectService={handleSelectServiceFromFooter}
      />

      {/* Global Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        initialService={prefilledService}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={(serviceCategory) => {
          setSelectedProject(null);
          handleOpenQuoteModal(serviceCategory);
        }}
      />
    </div>
  );
}
