import React, { useState, useEffect, useRef } from 'react';
import { PageView, ProjectItem } from '../types';
import { ASSETS, CONTACT_INFO, SERVICES, PROJECTS } from '../data/siteData';
import { Phone, ArrowRight, Shield, Award, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onRequestQuote: (service?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onQuickQuoteSubmit: (formData: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onRequestQuote,
  onSelectProject,
}) => {
  const [videoMounted, setVideoMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Focus only on the top 3 core services and 2 featured projects for a concise homepage
  const coreServices = SERVICES.slice(0, 3);
  const featuredProjects = PROJECTS.slice(0, 2);

  useEffect(() => {
    // Mount video shortly after initial paint for fast mobile LCP
    const mountTimer = setTimeout(() => {
      setVideoMounted(true);
    }, 150);

    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!videoMounted) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let isDisposed = false;

    const startTimer = setTimeout(() => {
      if (!isDisposed && video.paused) {
        video.play().catch(() => {});
      }
    }, 80);

    // Pause video when scrolled out of view to save battery and GPU
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (video.paused && !document.hidden) {
                video.play().catch(() => {});
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(video);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (observer && !video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    document.addEventListener('visibilitychange', handleVisibility);
    video.addEventListener('ended', handleEnded);

    return () => {
      isDisposed = true;
      clearTimeout(startTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      video.removeEventListener('ended', handleEnded);
      if (observer) observer.disconnect();
    };
  }, [videoMounted]);

  return (
    <div className="page-view">
      {/* 1. Hero Section */}
      <section
        id="home"
        className="relative bg-zinc-950 text-white min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Responsive High-res background image */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none">
            <source media="(max-width: 767px)" srcSet={ASSETS.heroBgMobile} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={ASSETS.heroBg} type="image/webp" />
            <img
              alt="Heavy excavator performing precision earthwork on site"
              className="w-full h-full object-cover opacity-90"
              src={ASSETS.heroBg}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1376"
              height="768"
              referrerPolicy="no-referrer"
            />
          </picture>

          {/* Full-width cinematic background video with hardware acceleration */}
          {videoMounted && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={ASSETS.heroBgMobile}
              className="absolute inset-0 w-full h-full object-cover opacity-90 motion-reduce:hidden pointer-events-none"
            >
              <source src={ASSETS.heroVideoMobile} media="(max-width: 767px)" type="video/mp4" />
              <source src={ASSETS.heroVideo} type="video/mp4" />
            </video>
          )}

          {/* Scrim for contrast without obscuring action */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-black/35 to-black/35 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-18 flex flex-col items-center">
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900/80 border border-zinc-700/80 text-zinc-300 text-xs font-mono uppercase tracking-widest backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Kingston &amp; Eastern Ontario
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight mb-2 sm:mb-3 [text-shadow:_0_2px_12px_rgb(0_0_0_/_90%)]">
            VISION EXCAVATION
          </h1>
          <p className="text-xs sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-zinc-200 mb-6 sm:mb-8 max-w-xl font-heading [text-shadow:_0_2px_8px_rgb(0_0_0_/_90%)]">
            Residential &amp; Commercial Earthworks
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-9 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
            >
              Get A Free Estimate
            </button>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 text-xs sm:text-sm font-semibold tracking-wider transition-colors min-h-[48px] gap-2 font-mono"
              href={`tel:${CONTACT_INFO.phoneRaw}`}
            >
              <Phone className="w-4 h-4 text-brand-red" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Highlight Credentials Ticker */}
      <section
        aria-label="Key highlights"
        style={{ contain: 'paint', transform: 'translate3d(0, 0, 0)' }}
        className="bg-zinc-100 border-y border-zinc-200 py-3.5 overflow-hidden relative select-none group"
      >
        <div className="animate-marquee items-center">
          <div className="flex items-center gap-10 sm:gap-14 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-700 shrink-0 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">✓</span> Free On-Site Estimates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">📍</span> Kingston &amp; Eastern Ontario
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🚜</span> Excavation • Retaining Walls • Utilities
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🛡️</span> Fully Licensed &amp; Insured ($5M)
            </div>
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.bbbBadge}
                alt="BBB Accredited Business"
                width="57"
                height="32"
                className="h-7 w-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <span className="text-zinc-900 font-bold text-xs">A+ Accredited</span>
            </div>
          </div>
          <div
            className="flex items-center gap-10 sm:gap-14 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-700 shrink-0 font-mono"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">✓</span> Free On-Site Estimates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">📍</span> Kingston &amp; Eastern Ontario
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🚜</span> Excavation • Retaining Walls • Utilities
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🛡️</span> Fully Licensed &amp; Insured ($5M)
            </div>
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.bbbBadge}
                alt="BBB Accredited Business"
                width="57"
                height="32"
                className="h-7 w-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <span className="text-zinc-900 font-bold text-xs">A+ Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Snapshot (Short & Focused) */}
      <section className="py-14 sm:py-20 bg-white" id="services-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1.5 font-mono">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-zinc-950">
                What We Do
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-darkRed font-mono transition-colors"
            >
              <span>View All Services &amp; Equipment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {coreServices.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col group"
              >
                <div className="h-44 sm:h-48 overflow-hidden bg-zinc-100 relative">
                  <img
                    alt={service.title}
                    width="384"
                    height="192"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={service.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-zinc-950/85 text-zinc-300 text-[10px] uppercase font-mono px-2 py-0.5">
                    {service.typicalDuration}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-zinc-950 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-darkRed cursor-pointer min-h-[40px] font-mono"
                  >
                    Details &amp; Specs <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Work Teaser (2 projects only) */}
      <section className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-200" id="work-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1.5 font-mono">
                Recent Projects
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-zinc-950">
                Field Highlights
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('our-work')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-darkRed font-mono transition-colors"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group overflow-hidden border border-zinc-200 bg-white shadow-sm cursor-pointer hover:border-brand-red transition-all"
              >
                <div className="h-56 sm:h-64 overflow-hidden relative bg-zinc-900">
                  <img
                    alt={project.title}
                    width="576"
                    height="256"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={project.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-zinc-950/85 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                    {project.status}
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono">
                      {project.categoryTag}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-zinc-950 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 text-xs sm:text-sm line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      Equip: {project.equipment}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-mono inline-flex items-center">
                      View Project <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Vision / Trust Strip */}
      <section className="bg-zinc-950 text-white py-14 sm:py-20 border-t border-zinc-800" id="trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              Why Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Built on Precision, Safety &amp; Integrity
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-3">
              Kingston homeowners, developers, and general contractors rely on us for dependable earthwork delivered to millimeter tolerances.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-red block mb-1">
                8+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-heading block">
                Years Local Experience
              </span>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-mono">
                Kingston bedrock &amp; soils
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-red block mb-1">
                150+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-heading block">
                Projects Completed
              </span>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-mono">
                On-time &amp; within budget
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-red block mb-1">
                A+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-heading block">
                BBB Accredited
              </span>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-mono">
                Exemplary client rating
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-red block mb-1">
                $5M
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-heading block">
                Commercial Liability
              </span>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-mono">
                WSIB certified &amp; bonded
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white font-mono transition-colors"
            >
              <span>Learn About Our Crew, Standards &amp; Safety Fleet</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Closing Direct CTA Banner (Concise, no duplicate form) */}
      <section className="py-14 sm:py-20 bg-brand-charcoal text-white border-t border-zinc-800" id="quote-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            Get Moving
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-4">
            READY TO BREAK GROUND ON YOUR PROJECT?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Complimentary site surveys and itemized bids with zero surprises. Contact our team today or request a quick estimate online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer font-mono min-h-[48px]"
            >
              Request Free Estimate
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer font-mono min-h-[48px]"
            >
              Contact Our Office
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>Call us directly at</span>
            <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-white font-bold hover:underline">
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
