import React from 'react';
import { PageView } from '../types';
import { Check } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  onRequestQuote: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <div className="page-view animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-zinc-950 text-white py-20 text-center border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight mb-4">
            ABOUT VISION EXCAVATION
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eastern Ontario's trusted contractor for excavation, retaining walls, septic, and site prep. Built on honesty, quality, and precision earthworks.
          </p>
        </div>
      </div>

      {/* Story & Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest block font-mono">
                WHO ARE WE?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-zinc-950 leading-tight">
                KINGSTON &amp; EASTERN ONTARIO'S TRUSTED EARTHWORKS CONTRACTOR
              </h2>
              <p className="text-zinc-700 text-base leading-relaxed">
                At Vision Excavation, we are Eastern Ontario's premier earthworks and civil contracting company, proudly serving both residential homeowners and commercial clients throughout Central and Eastern Ontario. We specialize in foundation excavations, structural retaining walls, municipal water and sewer connections, and OBC-certified septic systems.
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Whether it's a rocky custom home build, complex bedrock demolition, or an emergency municipal utility repair, our certified crew brings precision engineering, heavy-duty CAT equipment, and deep local expertise to every dig. For homeowners, we focus on protecting your investment and solving water drainage permanently. For builders, we keep projects on schedule and within budget.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-brand-darkCard border border-zinc-800 p-8 text-white space-y-6 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="text-brand-red font-bold text-lg font-mono">✓</div>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                      HONEST COMMUNICATION
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      No surprises. No hidden fees. We provide clear itemized estimates and maintain daily progress updates with every site manager.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-brand-red font-bold text-lg font-mono">✓</div>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                      FAST &amp; RELIABLE SERVICE
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      We show up on schedule with the right heavy equipment, completing complex civil and grading work with minimal disruption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-brand-red font-bold text-lg font-mono">✓</div>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                      FINANCING OPTIONS AVAILABLE
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      Flexible payment terms and project financing available so you can protect your property without delay.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-brand-red font-bold text-lg font-mono">✓</div>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                      WE TREAT YOUR PROPERTY LIKE OUR OWN
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      Clean job sites, meticulous backfilling, and respect for neighboring borders because great results matter from tooth to turf.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="bg-zinc-950 text-white py-16 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="border-r border-zinc-800 last:border-0">
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">500+</div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-2 font-mono">
              PROJECTS COMPLETED
            </p>
          </div>
          <div className="border-r border-zinc-800 last:border-0">
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">15+</div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-2 font-mono">
              YEARS COMBINED EXPERIENCE
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-amber-400">5★</div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-2 font-mono">
              CUSTOMER RATING
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-zinc-950 mb-16">
            OUR PROCESS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-heading text-xl font-bold mb-4 shadow">
                01
              </div>
              <h4 className="font-heading font-bold text-base uppercase text-zinc-950 mb-2">
                FREE INSPECTION
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                On-site survey to assess bedrock, slopes, utilities, and soil condition without any obligation.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-heading text-xl font-bold mb-4 shadow">
                02
              </div>
              <h4 className="font-heading font-bold text-base uppercase text-zinc-950 mb-2">
                DETAILED ESTIMATE
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Transparent itemized bid detailing machine hours, materials, drainage specs, and clear timelines.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-heading text-xl font-bold mb-4 shadow">
                03
              </div>
              <h4 className="font-heading font-bold text-base uppercase text-zinc-950 mb-2">
                EXPERT INSTALLATION
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Precision earthworks, laser grading, and structural rockwork executed to millimeter tolerances.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-heading text-xl font-bold mb-4 shadow">
                04
              </div>
              <h4 className="font-heading font-bold text-base uppercase text-zinc-950 mb-2">
                FINAL WALKTHROUGH
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Comprehensive inspection with property owner to ensure 100% satisfaction before sign-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-zinc-950 text-white py-20 text-center border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4">
            READY TO GET STARTED?
          </h3>
          <p className="text-zinc-400 text-sm mb-8">
            Schedule your free on-site estimate today. No obligation, no pressure — just honest advice from Eastern Ontario's earthwork pros.
          </p>
          <button
            type="button"
            onClick={onRequestQuote}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-mono"
          >
            SCHEDULE FREE ESTIMATE
          </button>
        </div>
      </section>
    </div>
  );
};
