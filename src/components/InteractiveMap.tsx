import React, { useState } from 'react';
import { COVERAGE_TOWNS } from '../data/siteData';
import { CoverageTown } from '../types';
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InteractiveMapProps {
  onSelectTown?: (town: CoverageTown) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectTown }) => {
  const [selectedTown, setSelectedTown] = useState<CoverageTown>(COVERAGE_TOWNS[0]);

  const handleSelect = (town: CoverageTown) => {
    setSelectedTown(town);
    if (onSelectTown) onSelectTown(town);
  };

  return (
    <div className="bg-zinc-100 border border-zinc-300 rounded-xl overflow-hidden shadow-sm">
      {/* Map Header & Filter Chips */}
      <div className="bg-zinc-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-red rounded-none"></span>
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-300 font-bold">
              Eastern Ontario Dispatch Radius
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Click any regional hub to view bedrock conditions and mobilization ETA
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 border border-zinc-800">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
          <span>Municipal Road &amp; Locate Permits Handled</span>
        </div>
      </div>

      {/* Main Map Body with Canvas and Town Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Interactive Stylized Regional Canvas */}
        <div className="lg:col-span-7 bg-[#171b1e] relative p-6 flex flex-col justify-between overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-zinc-800">
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Lake Ontario / St. Lawrence Watermark */}
          <div className="absolute -bottom-8 -right-8 w-64 h-48 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-3 right-4 text-[10px] uppercase font-mono tracking-wider text-zinc-600">
            Lake Ontario / St. Lawrence River Basin ∿∿
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>GRID: ON-FRONTENAC-SE</span>
            <span>SCALE: 1:50,000</span>
          </div>

          {/* Interactive Town Pins */}
          <div className="relative z-10 my-auto h-64 sm:h-72 w-full">
            {COVERAGE_TOWNS.map((town) => {
              const isSelected = selectedTown.id === town.id;
              return (
                <button
                  key={town.id}
                  type="button"
                  onClick={() => handleSelect(town)}
                  style={{
                    left: `${town.coordinates.x}%`,
                    top: `${town.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute group cursor-pointer flex flex-col items-center focus:outline-none transition-transform ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-20'
                  }`}
                  aria-label={`View coverage for ${town.name}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-brand-red border-white text-white shadow-lg ring-2 ring-brand-red/50'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-brand-red hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span
                    className={`mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-none whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-brand-red text-white'
                        : 'bg-zinc-950/80 text-zinc-300 group-hover:text-white group-hover:bg-zinc-900'
                    }`}
                  >
                    {town.name.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-brand-red" />
            <span>Click any node to inspect local geology &amp; fleet readiness</span>
          </div>
        </div>

        {/* Selected Hub Details Panel */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono">
                {selectedTown.county}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5">
                <Clock className="w-3 h-3" /> {selectedTown.responseTime}
              </span>
            </div>

            <h4 className="text-2xl font-bold font-heading text-zinc-950 mt-3 mb-1">
              {selectedTown.name}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
              {selectedTown.highlight}
            </p>

            <div className="space-y-3 bg-zinc-50 p-4 border border-zinc-200">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Ground &amp; Bedrock Profile
                </span>
                <p className="text-xs font-bold text-zinc-800 font-mono">
                  {selectedTown.geology}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  Historical Earthworks Executed
                </span>
                <p className="text-xs font-bold text-zinc-800 font-mono">
                  {selectedTown.recentProjectsCount}+ Residential &amp; Commercial Jobs
                </p>
              </div>

              <div className="pt-1 text-[11px] text-zinc-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>Zero mobilization markup within municipal zone limits.</span>
              </div>
            </div>
          </div>

          {/* Quick Town Button List */}
          <div className="pt-4 border-t border-zinc-200 mt-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-2">
              Switch Regional Municipality:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COVERAGE_TOWNS.map((town) => (
                <button
                  key={town.id}
                  type="button"
                  onClick={() => handleSelect(town)}
                  className={`text-[11px] px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                    selectedTown.id === town.id
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100 border-zinc-300'
                  }`}
                >
                  {town.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
