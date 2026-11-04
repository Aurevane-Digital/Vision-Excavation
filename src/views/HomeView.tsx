import React, { useState } from 'react';
import { PageView, ProjectItem } from '../types';
import { ASSETS, CONTACT_INFO, SERVICES, PROJECTS, REVIEWS, FAQS } from '../data/siteData';
import { Phone, ArrowDown, Check, ArrowRight, Shield, Star, MapPin } from 'lucide-react';

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
  onQuickQuoteSubmit
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [homeFormSuccess, setHomeFormSuccess] = useState(false);
  const [videoMounted, setVideoMounted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickQuoteSubmit(formState);
    setHomeFormSuccess(true);
    setTimeout(() => {
      setHomeFormSuccess(false);
      setFormState({ name: '', email: '', phone: '', service: '', message: '' });
    }, 4000);
  };

  React.useEffect(() => {
    // Mount video shortly after initial DOM and LCP paint to achieve 90+ mobile Lighthouse score
    const mountTimer = setTimeout(() => {
      setVideoMounted(true);
    }, 150);

    return () => clearTimeout(mountTimer);
  }, []);

  React.useEffect(() => {
    if (!videoMounted) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let isDisposed = false;

    // Stagger video start by 80ms to keep main thread completely unblocked
    const startTimer = setTimeout(() => {
      if (!isDisposed && video.paused) {
        video.play().catch(() => {});
      }
    }, 80);

    // Efficient IntersectionObserver: Pause video when scrolled out of view to save 100% GPU
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

    const handleUserInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    video.addEventListener('ended', handleEnded);
    window.addEventListener('touchstart', handleUserInteraction, { passive: true, once: true });

    return () => {
      isDisposed = true;
      clearTimeout(startTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (observer) observer.disconnect();
    };
  }, [videoMounted]);

  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div className="page-view">
      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-zinc-950 text-white min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Responsive High-res background image always underneath so there are never blank frames */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none">
            <source media="(max-width: 767px)" srcSet={ASSETS.heroBgMobile} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={ASSETS.heroBg} type="image/webp" />
            <img
              alt="Heavy excavators performing earthwork"
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
          {/* Full-width cinematic background video with hardware acceleration and no CSS filter overhead */}
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
          {/* Light gradient scrim for optimal text contrast without masking the action */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-black/15 to-black/25 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 flex flex-col items-center">
          <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 17l6-6 4 4 8-8M17 7h4v4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              ></path>
            </svg>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight mb-2 sm:mb-3 [text-shadow:_0_2px_12px_rgb(0_0_0_/_90%)]">
            VISION EXCAVATION
          </h1>
          <p className="text-xs sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold text-zinc-200 mb-6 sm:mb-8 max-w-xl font-heading [text-shadow:_0_2px_8px_rgb(0_0_0_/_90%)]">
            Residential &amp; Commercial Earthworks
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
            >
              Get A Free Estimate
            </button>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 text-xs sm:text-sm font-semibold tracking-wider transition-colors min-h-[48px]"
              href={`tel:${CONTACT_INFO.phoneRaw}`}
            >
              Call {CONTACT_INFO.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="mt-8 sm:mt-14 inline-flex flex-col items-center text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors min-h-[44px] justify-center cursor-pointer font-mono"
          >
            <span>Explore Services</span>
            <ArrowDown className="w-4 h-4 mt-1 animate-bounce text-brand-red" />
          </button>
        </div>
      </section>

      {/* Highlight Ticker Bar */}
      <section
        aria-label="Key highlights"
        style={{ contain: 'paint', transform: 'translate3d(0, 0, 0)' }}
        className="bg-zinc-100 border-y border-zinc-200 py-3.5 overflow-hidden relative select-none group"
      >
        <div className="animate-marquee items-center">
          <div className="flex items-center gap-10 sm:gap-14 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-700 shrink-0 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">✓</span> Free Estimates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">📍</span> Kingston &amp; Eastern Ontario
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🚜</span> Excavation • Retaining Walls • Utilities
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🛡️</span> Fully Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.bbbBadge}
                alt="BBB Accredited Business"
                width="57"
                height="32"
                className="h-8 w-auto object-contain"
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
              <span className="text-brand-red font-bold">✓</span> Free Estimates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">📍</span> Kingston &amp; Eastern Ontario
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🚜</span> Excavation • Retaining Walls • Utilities
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">🛡️</span> Fully Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.bbbBadge}
                alt="BBB Accredited Business"
                width="57"
                height="32"
                className="h-8 w-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <span className="text-zinc-900 font-bold text-xs">A+ Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-5xl font-extrabold font-heading text-zinc-950">
              Our Services
            </h2>
            <div className="w-12 h-1 bg-brand-red mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-zinc-200 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="h-48 sm:h-56 overflow-hidden bg-zinc-100 relative">
                  <img
                    alt={service.title}
                    width="384"
                    height="224"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={service.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-zinc-950/80 text-zinc-300 text-[10px] uppercase font-mono px-2 py-0.5">
                    {service.typicalDuration}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-zinc-950 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
                    {service.shortDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-darkRed text-left cursor-pointer min-h-[44px] font-mono"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Precision Callout */}
      <section className="bg-brand-charcoal text-white py-16 lg:py-24 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden shadow-2xl border border-zinc-700">
              <img
                alt="Vision Excavation heavy machinery and site development"
                width="576"
                height="384"
                className="w-full h-full object-cover"
                src={ASSETS.precisionCallout}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest font-mono">
                See The Difference
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
                PRECISION. EVERY DIG. EVERY TIME.
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                Watch how our crew transforms your site from the ground up — with laser-guided precision, 8+ years of field-tested engineering, and dependable craftsmanship that builders count on.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onRequestQuote()}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-mono"
                >
                  Get Your Free Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-zinc-950 text-white py-20 lg:py-28 border-b border-zinc-800" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest font-mono">
                Why Vision
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight">
                WHY KINGSTON HOMEOWNERS &amp; BUILDERS CHOOSE VISION EXCAVATION
              </h2>
              <div className="mt-8 p-6 bg-brand-darkCard border border-zinc-800 rounded-none flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-brand-red shrink-0">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm text-zinc-100 font-heading">
                    WSIB Certified &amp; Fully Insured
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                    $5M Commercial Liability Coverage
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-brand-darkCard border border-brand-borderDark p-6 sm:p-8 rounded-none flex items-start gap-6">
                <span className="text-brand-red font-heading text-3xl sm:text-4xl font-extrabold leading-none">
                  01
                </span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold tracking-wide text-white mb-2">
                    QUALITY WORKMANSHIP
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Every cut, trench, and grade is executed to millimeter tolerances using modern GPS-guided equipment and proven excavation methods that stand the test of time.
                  </p>
                </div>
              </div>

              <div className="bg-brand-darkCard border border-brand-borderDark p-6 sm:p-8 rounded-none flex items-start gap-6">
                <span className="text-brand-red font-heading text-3xl sm:text-4xl font-extrabold leading-none">
                  02
                </span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold tracking-wide text-white mb-2">
                    FREE ON-SITE ESTIMATES
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Complimentary site surveys and transparent, itemized bids before digging starts. Zero surprises, upfront scheduling, and no mobilization markups.
                  </p>
                </div>
              </div>

              <div className="bg-brand-darkCard border border-brand-borderDark p-6 sm:p-8 rounded-none flex items-start gap-6">
                <span className="text-brand-red font-heading text-3xl sm:text-4xl font-extrabold leading-none">
                  03
                </span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold tracking-wide text-white mb-2">
                    8+ YEARS LOCAL EXPERTISE
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Deep experience handling Eastern Ontario's unique limestone bedrock, tricky water tables, tight municipal clearances, and frozen ground conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 lg:py-28 bg-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-zinc-950">
              Recent Projects
            </h2>
            <div className="w-12 h-1 bg-brand-red mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group overflow-hidden border border-zinc-200 shadow-sm bg-zinc-50 cursor-pointer hover:border-brand-red transition-colors"
              >
                <div className="h-72 sm:h-80 overflow-hidden relative bg-zinc-900">
                  <img
                    alt={project.title}
                    width="576"
                    height="320"
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
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono">
                      {project.categoryTag}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-red" />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-zinc-950 mt-1">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 text-sm mt-2">{project.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center flex justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('our-work')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer font-mono"
            >
              View All Projects Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 lg:py-28 bg-zinc-50 border-t border-zinc-200" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              What Our Clients Say
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-zinc-950">
              Trusted By Eastern Ontario Homeowners
            </h2>
            <div className="w-12 h-1 bg-brand-red mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className={`bg-white p-8 border border-zinc-200 shadow-sm flex flex-col justify-between ${
                  review.featured ? 'border-t-4 border-t-brand-red' : ''
                }`}
              >
                <div>
                  <div className="text-amber-400 flex items-center gap-1 mb-4 text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-zinc-700 text-sm italic leading-relaxed mb-6">
                    "{review.content}"
                  </p>
                </div>
                <div className="border-t border-zinc-100 pt-4">
                  <h4 className="font-bold text-zinc-950 text-sm font-heading">{review.author}</h4>
                  <p className="text-xs text-zinc-500 font-mono">
                    {review.location} • {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 rounded-none bg-white hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider text-zinc-800 transition-colors shadow-sm cursor-pointer font-mono"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Verified 5.0 Star Client Rating Across Kingston
            </button>
          </div>
        </div>
      </section>

      {/* Action Reel Section */}
      <section className="bg-zinc-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            Follow Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            See Us In Action
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-12">
            Follow along on our social channels for job-site tours, heavy equipment operations, and behind-the-scenes build logs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6 mb-10">
            <div className="relative overflow-hidden aspect-[9/14] bg-zinc-900 border border-zinc-800 shadow-xl group">
              <img
                alt="Excavator grading rocky terrain"
                width="400"
                height="622"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={ASSETS.action1}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-red font-mono">
                  Field Highlight
                </span>
                <p className="text-white text-sm font-bold mt-1 font-heading">
                  Limestone Trenching &amp; Bedrock Breaking
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden aspect-[9/14] bg-zinc-900 border border-zinc-800 shadow-xl group">
              <img
                alt="Vision Excavation crew positioning armor stone"
                width="400"
                height="622"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={ASSETS.action2}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-red font-mono">
                  Job Completion
                </span>
                <p className="text-white text-sm font-bold mt-1 font-heading">
                  Armor Stone Retaining System Complete
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-none text-xs font-bold uppercase tracking-wider transition-colors font-mono cursor-pointer"
            >
              Connect On Facebook
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-none text-xs font-bold uppercase tracking-wider transition-colors font-mono cursor-pointer"
            >
              Follow On Instagram
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-zinc-200" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              Where We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-950 mb-6">
              EXCAVATION, RETAINING WALLS &amp; SITE PREP AROUND KINGSTON
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Vision Excavation proudly serves general contractors, developers, and homeowners throughout Kingston, Napanee, Trenton, Brockville, Kaladar, Tamworth, Sydenham, Verona, Tweed, and the surrounding Frontenac and Lennox &amp; Addington counties.
            </p>
          </div>

          <div className="text-center mb-10 pt-8 border-t border-zinc-200">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1 font-mono">
              FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-950">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-zinc-50 border border-zinc-200 p-5 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center font-bold text-zinc-900 cursor-pointer text-sm sm:text-base text-left focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-brand-red font-mono text-xl ml-4">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-sm text-zinc-600 leading-relaxed border-t border-zinc-200 pt-3">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Contact Form Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-brand-charcoal text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest font-mono">
                Get Started
              </span>
              <h2 className="text-2xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                READY TO GET YOUR PROJECT MOVING?
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Whether you need site clearing, a foundation excavation, custom armor stone retaining walls, or an emergency water line replacement, our crew is ready to mobilize. Call or submit your project details today.
              </p>
              <div className="pt-2 sm:pt-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center border border-brand-red/30 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 font-semibold tracking-wider font-mono">
                    Direct Phone Support
                  </span>
                  <a
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-brand-red transition-colors inline-block py-1 min-h-[44px] flex items-center font-mono"
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white text-zinc-900 p-6 sm:p-10 shadow-2xl">
                {homeFormSuccess ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-heading text-zinc-950">
                      Message Received!
                    </h4>
                    <p className="text-xs text-zinc-600">
                      Our estimators will review your inquiry and follow up within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                        Name *
                      </label>
                      <input
                        className="w-full text-base sm:text-sm border-zinc-300 rounded-none px-3.5 py-3 sm:py-2.5 focus:ring-brand-red focus:border-brand-red min-h-[48px] sm:min-h-0"
                        id="name"
                        placeholder="Your full name"
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                        Email *
                      </label>
                      <input
                        className="w-full text-base sm:text-sm border-zinc-300 rounded-none px-3.5 py-3 sm:py-2.5 focus:ring-brand-red focus:border-brand-red min-h-[48px] sm:min-h-0"
                        id="email"
                        placeholder="your@email.com"
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                        Phone *
                      </label>
                      <input
                        className="w-full text-base sm:text-sm border-zinc-300 rounded-none px-3.5 py-3 sm:py-2.5 focus:ring-brand-red focus:border-brand-red min-h-[48px] sm:min-h-0"
                        id="phone"
                        placeholder="(613) 000-0000"
                        required
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                        Service Interest
                      </label>
                      <select
                        className="w-full text-base sm:text-sm border-zinc-300 rounded-none px-3.5 py-3 sm:py-2.5 focus:ring-brand-red focus:border-brand-red min-h-[48px] sm:min-h-0 bg-white font-mono"
                        id="service"
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      >
                        <option value="">Select a service...</option>
                        <option value="excavation">Excavation &amp; Grading</option>
                        <option value="retaining-walls">Retaining Walls (Armor Stone)</option>
                        <option value="water-sewer">Water &amp; Sewer Trenching</option>
                        <option value="septic">Septic Systems</option>
                        <option value="concrete">Concrete Pads &amp; Footings</option>
                        <option value="waterproofing">Foundation Waterproofing</option>
                        <option value="other">Other Earthworks</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                        Message
                      </label>
                      <textarea
                        className="w-full text-base sm:text-sm border-zinc-300 rounded-none px-3.5 py-3 sm:py-2.5 focus:ring-brand-red focus:border-brand-red"
                        id="message"
                        placeholder="Tell us about your project location and timeline..."
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      ></textarea>
                    </div>
                    <button
                      className="w-full py-4 bg-black hover:bg-brand-red text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors shadow cursor-pointer min-h-[50px] flex items-center justify-center font-mono"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
