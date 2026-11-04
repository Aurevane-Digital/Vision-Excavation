import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { ASSETS, CONTACT_INFO } from '../data/siteData';

export const TopNotificationBar: React.FC = () => {
  return (
    <aside
      aria-label="Quick contact and location info"
      className="bg-zinc-950 text-zinc-400 text-xs py-2 px-3 sm:px-4 border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto flex flex-nowrap justify-between items-center gap-2 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <span className="flex items-center gap-1.5 text-zinc-300 text-[11px] sm:text-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-none">Kingston &amp; Eastern Ontario</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-zinc-300 text-xs">
            <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
            {CONTACT_INFO.hours}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden xs:flex items-center gap-1.5 pl-2 border-l border-zinc-800">
            <img
              src={ASSETS.bbbBadge}
              alt="BBB Accredited Business"
              width="48"
              height="24"
              className="h-5 sm:h-6 w-auto object-contain"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <a
            className="text-zinc-200 font-semibold hover:text-brand-red transition-colors flex items-center gap-1.5 py-1 px-1 text-[11px] sm:text-xs min-h-[36px]"
            href={`tel:${CONTACT_INFO.phoneRaw}`}
          >
            <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="font-mono font-bold tracking-tight">{CONTACT_INFO.phone}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
