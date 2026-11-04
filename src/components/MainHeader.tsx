import React, { useState } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { PageView } from '../types';
import { ASSETS, CONTACT_INFO } from '../data/siteData';

interface MainHeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onRequestQuote: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  currentView,
  onNavigate,
  onRequestQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Services', view: 'services' },
    { label: 'Our Work', view: 'our-work' },
    { label: 'Contact', view: 'contact' }
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 -mb-16 sm:-mb-20 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm'
          : mobileMenuOpen
          ? 'bg-zinc-950 border-b border-zinc-800'
          : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Zone */}
          <button
            type="button"
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            onClick={() => handleNavClick('home')}
            aria-label="Vision Excavation Home"
          >
            <div className="h-10 sm:h-12 flex items-center">
              <img
                src={ASSETS.logo}
                alt="Vision Excavation"
                width="160"
                height="44"
                decoding="async"
                className={`h-8 sm:h-11 max-h-12 w-auto object-contain hover:opacity-90 transition-all duration-300 ${
                  !isScrolled && !mobileMenuOpen
                    ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter'
                    : ''
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          {/* Navigation Links (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleNavClick(item.view)}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer pb-1 border-b-2 ${
                    isActive
                      ? 'text-brand-red border-brand-red'
                      : isScrolled
                      ? 'text-zinc-800 hover:text-brand-red border-transparent'
                      : 'text-zinc-100 hover:text-brand-red border-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Zone */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onRequestQuote}
              className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold tracking-widest uppercase transition-all shadow hover:shadow-md cursor-pointer min-h-[44px]"
            >
              Request A Quote
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Mobile Menu"
              className={`lg:hidden p-2.5 -mr-2 focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center rounded cursor-pointer transition-colors ${
                isScrolled && !mobileMenuOpen
                  ? 'text-zinc-800 hover:text-brand-red'
                  : 'text-white hover:text-brand-red'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 shadow-2xl transition-all duration-300">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left py-3 px-4 rounded text-base font-bold tracking-wider uppercase flex items-center justify-between border-b border-zinc-900 min-h-[48px] cursor-pointer ${
                  currentView === item.view
                    ? 'text-brand-red bg-zinc-900/50'
                    : 'text-white hover:bg-zinc-900 hover:text-brand-red'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-brand-red">→</span>
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest text-center shadow min-h-[48px] flex items-center justify-center cursor-pointer"
              >
                Request A Free Quote
              </button>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                Call {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
