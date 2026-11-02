import React, { useState } from 'react';
import { Calculator, HardHat, Clock, AlertTriangle, ArrowRight, Check } from 'lucide-react';

interface EstimatorCalculatorProps {
  onApplyEstimate: (data: { service: string; message: string }) => void;
}

export const EstimatorCalculator: React.FC<EstimatorCalculatorProps> = ({ onApplyEstimate }) => {
  const [projectType, setProjectType] = useState<string>('excavation');
  const [size, setSize] = useState<number>(1500); // sq ft or linear ft
  const [groundCondition, setGroundCondition] = useState<string>('limestone');
  const [accessEase, setAccessEase] = useState<string>('normal');
  const [transferred, setTransferred] = useState<boolean>(false);

  // Calculation Logic
  const calculateEstimate = () => {
    let baseMin = 4500;
    let baseMax = 8500;
    let durationDays = '2 - 3 Days';
    let equipment = 'CAT 315 Excavator + Tandem Dump Truck';

    if (projectType === 'excavation') {
      const multiplier = size > 2500 ? 1.8 : size > 1500 ? 1.3 : 1.0;
      baseMin = Math.round(5500 * multiplier);
      baseMax = Math.round(11000 * multiplier);
      durationDays = size > 2500 ? '4 - 6 Days' : '3 - 4 Days';
      equipment = groundCondition === 'limestone' 
        ? 'CAT 315 NextGen + NPK Hydraulic Breaker + Laser Level'
        : 'CAT 315 Excavator + Track Skid Steer';
    } else if (projectType === 'retaining-walls') {
      // Linear feet
      const ft = Math.min(size, 200);
      baseMin = Math.round(ft * 180);
      baseMax = Math.round(ft * 320);
      durationDays = ft > 80 ? '4 - 7 Days' : '2 - 4 Days';
      equipment = 'Excavator with Heavy Hydraulic Thumb + Vibratory Granular Compactor';
    } else if (projectType === 'septic') {
      baseMin = groundCondition === 'limestone' ? 22000 : 16000;
      baseMax = groundCondition === 'limestone' ? 34000 : 25000;
      durationDays = '4 - 6 Days';
      equipment = 'Mini Excavator + Site Dumper + Laser Transit + Filter Sand Transport';
    } else if (projectType === 'water-sewer') {
      const ft = Math.min(size, 300);
      baseMin = Math.round(ft * 95 + 2500);
      baseMax = Math.round(ft * 165 + 4000);
      durationDays = '1 - 3 Days';
      equipment = 'Trench Shoring Box + Pipe Laser + Compaction Tamper';
    } else if (projectType === 'concrete') {
      const sqft = size;
      baseMin = Math.round(sqft * 4.5);
      baseMax = Math.round(sqft * 7.5);
      durationDays = '2 - 3 Days';
      equipment = 'Dual-Slope Rotary Laser + 10-Ton Vibratory Drum Roller';
    } else if (projectType === 'waterproofing') {
      const ft = Math.min(size, 250);
      baseMin = Math.round(ft * 140);
      baseMax = Math.round(ft * 210);
      durationDays = '3 - 5 Days';
      equipment = 'Rubber Track Zero-Swing Mini + Elastomeric Hot-Spray + French Drain Gear';
    }

    if (groundCondition === 'limestone' && projectType !== 'septic') {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.35);
    }

    if (accessEase === 'tight') {
      baseMin = Math.round(baseMin * 1.15);
      baseMax = Math.round(baseMax * 1.2);
    }

    return {
      min: baseMin,
      max: baseMax,
      durationDays,
      equipment
    };
  };

  const estimate = calculateEstimate();

  const handleTransfer = () => {
    const serviceNameMap: Record<string, string> = {
      'excavation': 'Excavation & Site Prep',
      'retaining-walls': 'Retaining Walls (Armor Stone)',
      'septic': 'Septic Installation',
      'water-sewer': 'Water & Sewer Trenching',
      'concrete': 'Concrete Solutions',
      'waterproofing': 'Foundation Waterproofing'
    };

    const details = `Estimated Project Scope: ${serviceNameMap[projectType]} | Dimension: ${size} ${projectType === 'excavation' || projectType === 'concrete' ? 'sq ft' : 'linear ft'} | Ground: ${groundCondition} | Access: ${accessEase} | Preliminary range: $${estimate.min.toLocaleString()} - $${estimate.max.toLocaleString()} CAD.`;

    onApplyEstimate({
      service: projectType,
      message: details
    });

    setTransferred(true);
    setTimeout(() => setTransferred(false), 3000);
  };

  return (
    <div className="bg-zinc-950 text-white border border-zinc-800 rounded-none p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-4 h-4 text-brand-red" />
            <span className="text-xs uppercase font-mono tracking-widest text-brand-red font-bold">
              Precision Scope &amp; Budget Planner
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-heading">
            Preliminary Earthworks Estimator
          </h3>
        </div>
        <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5">
          <HardHat className="w-3.5 h-3.5 text-amber-400" />
          <span>Ontario Prevailing Heavy Equipment Rates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Input Parameters */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Select Earthwork Discipline:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'excavation', label: 'Basement Dig' },
                { id: 'retaining-walls', label: 'Armor Stone Wall' },
                { id: 'septic', label: 'Septic Bed' },
                { id: 'water-sewer', label: 'Water & Sewer' },
                { id: 'concrete', label: 'Sub-Base Pad' },
                { id: 'waterproofing', label: 'Waterproofing' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectType(item.id)}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-colors border text-left cursor-pointer ${
                    projectType === item.id
                      ? 'bg-brand-red border-brand-red text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Project Footprint / Dimensions:
              </label>
              <span className="text-xs font-mono text-brand-red font-bold">
                {size} {projectType === 'excavation' || projectType === 'concrete' ? 'Sq Ft' : 'Linear Ft'}
              </span>
            </div>
            <input
              type="range"
              min={projectType === 'excavation' || projectType === 'concrete' ? 500 : 30}
              max={projectType === 'excavation' || projectType === 'concrete' ? 5000 : 250}
              step={projectType === 'excavation' || projectType === 'concrete' ? 100 : 10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[#E31B23] bg-zinc-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>{projectType === 'excavation' || projectType === 'concrete' ? '500 sq ft' : '30 lin ft'}</span>
              <span>{projectType === 'excavation' || projectType === 'concrete' ? '5,000 sq ft' : '250 lin ft'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Subsurface Geology:
              </label>
              <select
                value={groundCondition}
                onChange={(e) => setGroundCondition(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-none focus:border-brand-red focus:ring-0 font-mono"
              >
                <option value="soil">Standard Soil / Clay Loam</option>
                <option value="limestone">Limestone Bedrock (Hydraulic Hammer)</option>
                <option value="high-water">High Water Table / Sandy Silt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Job Site Access:
              </label>
              <select
                value={accessEase}
                onChange={(e) => setAccessEase(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-none focus:border-brand-red focus:ring-0 font-mono"
              >
                <option value="normal">Unrestricted Machine Access</option>
                <option value="tight">Tight Urban / Waterfront Property</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-1">
              Estimated Budgetary Range (CAD)
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">
              *Preliminary guideline subject to complimentary on-site survey and locates.
            </p>

            <div className="mt-5 space-y-3 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-400 block text-[11px] font-mono">Estimated Turnaround:</span>
                  <span className="font-bold text-white font-mono">{estimate.durationDays}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-400 block text-[11px] font-mono">Designated Machinery Package:</span>
                  <span className="font-bold text-zinc-200 text-[11px]">{estimate.equipment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleTransfer}
              className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                transferred
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-red hover:bg-brand-darkRed text-white'
              }`}
            >
              {transferred ? (
                <>
                  <Check className="w-4 h-4" /> Transferred to Contact Form!
                </>
              ) : (
                <>
                  Lock In Exact Quote <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
