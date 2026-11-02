import React, { useState } from 'react';
import { PageView, ProjectItem } from '../types';
import { PROJECTS, ASSETS, CONTACT_INFO } from '../data/siteData';
import { MapPin, Wrench, ArrowRight } from 'lucide-react';

interface OurWorkViewProps {
  onNavigate: (view: PageView) => void;
  onRequestQuote: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const OurWorkView: React.FC<OurWorkViewProps> = ({
  onNavigate,
  onRequestQuote,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'excavation', label: 'Excavation & Foundations' },
    { id: 'retaining-walls', label: 'Retaining Walls' },
    { id: 'water-sewer', label: 'Utilities & Sewer' },
    { id: 'septic', label: 'Septic Systems' },
    { id: 'concrete', label: 'Concrete Solutions' },
    { id: 'waterproofing', label: 'Foundation Protection' }
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="page-view animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-zinc-950 text-white pt-28 sm:pt-32 pb-20 text-center border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            PROVEN TRACK RECORD
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight mb-4">
            OUR WORK
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Recent excavation, retaining wall, foundation &amp; earthworks projects executed across Kingston and Eastern Ontario.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="py-8 bg-zinc-100 border-b border-zinc-200 sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-brand-red text-white border-brand-red shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-200 border-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group overflow-hidden border border-zinc-200 shadow-sm bg-zinc-50 flex flex-col cursor-pointer hover:border-brand-red hover:shadow-md transition-all"
              >
                <div className="h-64 overflow-hidden relative bg-zinc-900">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={project.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-zinc-950/80 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                    {project.status}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono">
                      {project.categoryTag}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-zinc-950 mt-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="border-t border-zinc-200 pt-3 text-xs text-zinc-500 flex justify-between items-center font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" />
                      {project.location}
                    </span>
                    <span className="font-semibold text-zinc-800 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-brand-red" />
                      {project.specs.duration || 'Fast Turnaround'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-zinc-50 border border-zinc-200 p-8">
              <p className="text-zinc-600 text-sm font-mono">
                No archived jobs currently matching this category filter.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-6 py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider font-mono cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Process Workflow Refresher */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            HOW WE DELIVER EXCELLENCE
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
                On-site survey to assess bedrock, slopes, utilities, and soil conditions without obligation.
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
                Transparent itemized bid detailing machine hours, rock breaking, materials, and clear schedules.
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
                Comprehensive site inspection with property owner to ensure 100% satisfaction before sign-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Fleet Callout */}
      <section className="bg-brand-charcoal text-white py-16 lg:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden shadow-2xl border border-zinc-700 bg-zinc-900">
              <img
                alt="Vision Excavation fleet on site"
                className="w-full h-full object-cover"
                src={ASSETS.precisionCallout}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest font-mono">
                Field Proven Quality
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
                PRECISION. EVERY DIG. EVERY TIME.
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                Our modern fleet of excavators, skid steers, and hydraulic hammers combined with experienced operators ensures your project is completed safely, on budget, and built to outlast the harshest Ontario seasons.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-mono"
                >
                  Get Your Free Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-950 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4">
            READY TO START YOUR NEXT PROJECT?
          </h3>
          <p className="text-zinc-400 text-sm mb-8">
            Schedule your free on-site estimate today. No obligation, no pressure — just honest advice and transparent pricing from Eastern Ontario's earthwork pros.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onRequestQuote}
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-mono"
            >
              SCHEDULE FREE ON-SITE ESTIMATE
            </button>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-widest transition-colors font-mono"
            >
              CALL {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
