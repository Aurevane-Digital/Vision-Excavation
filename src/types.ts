export type PageView = 'home' | 'about' | 'services' | 'our-work' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  bullets: string[];
  equipment: string[];
  typicalDuration: string;
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryTag: string;
  location: string;
  equipment: string;
  summary: string;
  fullDetails: string;
  specs: {
    depth?: string;
    bedrockType?: string;
    stoneVolume?: string;
    pipeSpec?: string;
    compaction?: string;
    permitJurisdiction?: string;
    duration?: string;
  };
  image: string;
  status: 'Completed' | 'In Progress';
}

export interface CoverageTown {
  id: string;
  name: string;
  county: string;
  responseTime: string;
  geology: string;
  recentProjectsCount: number;
  highlight: string;
  coordinates: { x: number; y: number }; // percentage on map
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  featured?: boolean;
  content: string;
}

export interface QuoteFormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  timeline: string;
  message: string;
}
