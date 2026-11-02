import React from 'react';
import { PageView } from '../types';
import { SERVICES, CONTACT_INFO, ASSETS } from '../data/siteData';
import { EstimatorCalculator } from '../components/EstimatorCalculator';
import { Check, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (view: PageView) => void;
  onRequestQuote: (service?: string) => void;
  onApplyEstimate: (data: { service: string; message: string }) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onRequestQuote,
  onApplyEstimate
}) => {
  return (
    <div className="page-view animate-in fade-in duration-300">
      {/* Services Top Banner */}
      <div className="bg-zinc-950 text-white pt-28 sm:pt-32 pb-20 text-center border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
            ENGINEERING &amp; EARTHWORKS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight mb-4">
            EXCAVATION &amp; SITE SERVICES
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From full foundation excavations to structural retaining walls and emergency utility repairs, Vision Excavation provides heavy-duty site prep built for decades.
          </p>
        </div>
      </div>

      {/* Deep-Dive Service Blocks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* 1. Excavation & Earthmoving */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                Discipline 01 // Site Preparation
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-zinc-950 mb-4">
                COMPREHENSIVE EXCAVATION SOLUTIONS
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Your site foundation is the most critical element of any building project. At Vision Excavation, we deliver tailored earthmoving solutions including bulk basement digs, bedrock trenching with hydraulic breakers, precise laser grading, and pad compaction.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Complete tree clearing, stump grubbing, and overburden stripping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Limestone bedrock breaking with heavy hydraulic hammer attachments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Laser-guided foundation pads, footing benches, and compaction testing.</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuote('excavation')}
                  className="px-6 py-3 bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-mono"
                >
                  Quote Foundation Dig
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  Equipment: CAT 315 NextGen + NPK Breakers
                </span>
              </div>
            </div>
            <div className="overflow-hidden shadow-xl border border-zinc-200 h-80 bg-zinc-900">
              <img
                src={ASSETS.precisionCallout}
                alt="Excavation site work"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 2. Retaining Walls & Shoreline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 overflow-hidden shadow-xl border border-zinc-200 h-80 bg-zinc-900">
              <img
                src={ASSETS.retainingWalls}
                alt="Retaining wall construction"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                Discipline 02 // Structural Rockwork
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-zinc-950 mb-4">
                RETAINING WALLS &amp; SHORELINE STABILIZATION
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Whether managing steep slope grades or protecting waterfront shorelines from erosion, we construct massive engineered armor stone and block retaining walls engineered for stability and longevity.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Tiered natural armor stone placement using heavy hydraulic thumbs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Granular clear-stone drainage beds and geotextile separation cloth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Shoreline permit assistance and Rideau canal conservation compliance.</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuote('retaining-walls')}
                  className="px-6 py-3 bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-mono"
                >
                  Quote Armor Stone Wall
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  Natural Ontario Quarry Slabs &amp; Gabions
                </span>
              </div>
            </div>
          </div>

          {/* 3. Septic & Utilities Infrastructure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                Discipline 03 // Civil Subsurface
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-zinc-950 mb-4">
                SEPTIC &amp; UTILITIES INFRASTRUCTURE
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Complete municipal connections, deep utility trenches, and full OBC-certified septic systems for rural and urban properties across Kingston and Frontenac.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Conventional and tertiary septic tank installation &amp; leaching beds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Water service line lateral replacements and emergency freeze repairs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Complete trench shoring, sand bedding, and backfill compaction.</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuote('septic')}
                  className="px-6 py-3 bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-mono"
                >
                  Quote Septic / Utility Work
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  OBC Part 8 Certified • Ontario One Call
                </span>
              </div>
            </div>
            <div className="overflow-hidden shadow-xl border border-zinc-200 h-80 bg-zinc-900">
              <img
                src={ASSETS.waterSewer}
                alt="Utility trenching installation"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 4. Concrete Pads & Waterproofing Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 overflow-hidden shadow-xl border border-zinc-200 h-80 bg-zinc-900">
              <img
                src={ASSETS.waterproofing}
                alt="Foundation waterproofing and weeping tile installation"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                Discipline 04 // Structural Protection
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-zinc-950 mb-4">
                FOUNDATION WATERPROOFING &amp; SUB-BASES
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Prevent subterranean hydraulic hydrostatic pressure from penetrating your basement. Complete exterior perimeter trenching, elastomeric coating, dimple core drainage board, and high-flow weeping tile beds.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Full-perimeter foundation excavation down to bedrock footings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Elastomeric membrane damp-proofing + Delta-MS dimple board.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red font-bold font-mono">•</span>
                  <span>Compacted Granular A commercial pads verified to 98% Proctor.</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuote('waterproofing')}
                  className="px-6 py-3 bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-mono"
                >
                  Quote Foundation Protection
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  Permanent Water Ingress Elimination
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Project Estimator Calculator */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimatorCalculator onApplyEstimate={onApplyEstimate} />
        </div>
      </section>

      {/* Callout Section */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-zinc-950 text-white p-10 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-3xl font-extrabold font-heading mb-3">
              PROTECT YOUR PROPERTY TODAY
            </h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-xl mx-auto">
              Schedule your free on-site survey and get a guaranteed written bid from Kingston's earthwork specialists.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onRequestQuote()}
                className="px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer font-mono"
              >
                SCHEDULE FREE INSPECTION
              </button>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-widest transition-colors font-mono"
              >
                CALL {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
