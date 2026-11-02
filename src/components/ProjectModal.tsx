import React from 'react';
import { ProjectItem } from '../types';
import { X, MapPin, Wrench, CheckCircle2, Calendar, FileText } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuote: (serviceCategory: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestQuote
}) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-zinc-950 border border-zinc-700 text-white w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-900 border border-zinc-700 text-white hover:text-brand-red flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-zinc-800">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-red font-bold">
              {project.categoryTag}
            </span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              {project.location}
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            {project.title}
          </h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Photo */}
          <div className="h-64 sm:h-96 w-full overflow-hidden border border-zinc-800 bg-zinc-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase font-mono tracking-wider text-zinc-300">
              Project Brief &amp; Execution Summary
            </h4>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.fullDetails}
            </p>
          </div>

          {/* Engineering Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-zinc-900 p-5 border border-zinc-800">
            {project.specs.depth && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Excavation Depth
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.depth}
                </span>
              </div>
            )}
            {project.specs.bedrockType && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Subsurface Strata
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.bedrockType}
                </span>
              </div>
            )}
            {project.specs.stoneVolume && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Volume / Aggregates
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.stoneVolume}
                </span>
              </div>
            )}
            {project.specs.pipeSpec && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Utility Specs
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.pipeSpec}
                </span>
              </div>
            )}
            {project.specs.compaction && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Compaction Density
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.compaction}
                </span>
              </div>
            )}
            {project.specs.duration && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Completion Timeline
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {project.specs.duration}
                </span>
              </div>
            )}
          </div>

          {/* Equipment deployed badge */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/60 p-3 border border-zinc-800">
            <Wrench className="w-4 h-4 text-brand-red shrink-0" />
            <span>
              Primary Deployed Machinery:{' '}
              <strong className="text-white font-mono">{project.equipment}</strong>
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 font-mono">
            Complimentary site inspection available for this project type.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-3 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestQuote(project.category);
              }}
              className="w-1/2 sm:w-auto px-6 py-3 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Request Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
