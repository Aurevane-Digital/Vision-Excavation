import React from 'react';
import { PageView } from '../types';
import { ASSETS, CONTACT_INFO, SERVICES } from '../data/siteData';

interface MainFooterProps {
  onNavigate: (view: PageView) => void;
  onSelectService?: (serviceId: string) => void;
}

export const MainFooter: React.FC<MainFooterProps> = ({ onNavigate, onSelectService }) => {
  const handleNav = (view: PageView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    onNavigate('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800 pt-12 sm:pt-16 pb-10 sm:pb-12" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 sm:h-12 w-auto flex items-center">
                <img
                  src={ASSETS.footerLogo}
                  alt="Vision Excavation"
                  className="h-9 sm:h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-2 font-mono">
              Built to last. Driven by precision.
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-2">
              Serving Kingston, Frontenac, and surrounding Eastern Ontario with heavy-duty excavation, bedrock demolition, retaining walls, and civil infrastructure earthworks.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 font-medium">
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px]">
                WSIB Insured
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px]">
                Licensed Ontario Contractor
              </span>
              <img
                src={ASSETS.bbbBadgeAlt}
                alt="BBB Accredited Business"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase mb-3 sm:mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('our-work')}
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase mb-3 sm:mb-4 text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <button
                    type="button"
                    onClick={() => handleServiceClick(srv.id)}
                    className="hover:text-white transition-colors text-left py-1 min-h-[36px] flex items-center cursor-pointer"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase mb-3 sm:mb-4 text-white">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2 py-1">
                <span className="text-brand-red font-bold">📍</span>
                <span>{CONTACT_INFO.serviceArea}</span>
              </li>
              <li className="flex items-center gap-2 py-1">
                <span className="text-brand-red font-bold">📞</span>
                <a
                  className="hover:text-white transition-colors font-medium min-h-[36px] flex items-center"
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 py-1">
                <span className="text-brand-red font-bold">✉️</span>
                <a
                  className="hover:text-white transition-colors min-h-[36px] flex items-center"
                  href={`mailto:${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4 text-zinc-400">
                <a
                  aria-label="Facebook"
                  className="hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('contact');
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                  </svg>
                </a>
                <a
                  aria-label="Instagram"
                  className="hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('contact');
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs gap-3 text-center sm:text-left">
          <p>© 2026 Vision Excavation. All rights reserved.</p>
          <p className="text-zinc-600 font-mono">
            Precision Earthworks &amp; Engineering | Kingston, ON
          </p>
        </div>
      </div>
    </footer>
  );
};
