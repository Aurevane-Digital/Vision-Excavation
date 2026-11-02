import { ServiceItem, ProjectItem, CoverageTown, ReviewItem } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkvxa8yaJCx6qEdrbNPdro8e1IcWTzwn22atCFMj2Td1h3XQVUNWGzxfPKhueMc3Q6v85nbh04I42YBnbG5JTvKVTEKI-9vzT7aMGZQiTe86n3IiHJV7mbRNQgSAE2FQV1lYfWLHVxDJm0E85UbdB4jeap1qeHk6gUCA9i9r8v2G1PgQYN_wibUVmF_shOC03GHwdT-EGoMc4HIpA9XehpObS-deacLOhcd4E0qLi7A0a_SSp2c7p-',
  footerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPNiL2lfYFM3EWvxa1OracV43BVKAA_xSPwtsNyv_PGHdCXw4aao49pwmkHB_SmlJE2bHXb1C9mAeRGJFNOaY3if9tB1AjDJW3FuAEfPdg73BKl6LQX3O1xeJL1bgdthr1B3kRsd0IzDBDBKisvU3dch78R91x4HrRO0XA6QpQMmc5UWqnDVfuhc1dQLcuqMFxxt61s9_0akeZwSAo7OjctY5IdvNJjSnf12KqIkxyEeRwnfkNAX9M',
  bbbBadge: 'https://lh3.googleusercontent.com/aida/AEtjO1UbUaKsuJ6Tg9OHTcf17UZWFPeMAKV7uXR-eLasZNjPis0whAD6mhWhSMJrtI11YeWNcxn1EBkdXdxDUXgQp0zqX1OfMsiuj7u2IDhM6cld1z-foJBywl78Q0gKvnRq8LjqEq5MhizbL9RhYELpuQ3P8JKZn9kVVE8YBT3nnzlb_6dBIGnXWlHLAxPsX0q0KE32431Qww0E1Uu9Zn-lMihglFYqHaut2FK61aPff_AT',
  bbbBadgeAlt: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwB13kBbT5WHK_MNT_SeTDFm7C7r0bRNOYfpXeyyCAAjy6FxfA6s1F-wRDHXmuJNCYBoj6s950LmGPnDdqPgtPxsiJBqgfbb4Gf-rQQCffdrMaiOxbZmk5VrILoq7xpqKh8juOGCq7uwfbeeWb8fUhfH3z7xfDhpeMTfCZ5_l5PvRkn31qcoRc9aeUjqphv0dfZeyPT7xL4zZjSZamlclsnUx-6vdQLJAeTHMcnRg',
  heroBg: '/src/assets/images/hero_excavator_site_1793633309300.jpg',
  heroVideo: '/assets/aistudio/hero-video_379d1614.mp4',
  excavation: '/src/assets/images/excavation_foundation_prep_1793633308598.jpg',
  retainingWalls: '/src/assets/images/armor_stone_retaining_wall_1793633310516.jpg',
  waterSewer: '/src/assets/images/utility_sewer_trench_1793633310559.jpg',
  septic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcFYHPyiICdNGKJ7JXBWiGoXWP-JaIIyiQ8mexDPSXggZ2Gp6WQz_1I0udnk3GB1srk1dSw57kfAR61kR9CdAiRAN3H0kEcoGFX8gDs4hW-ou_cD8oknwp1_72q1xg9fgCyO95715cmNDyK9w1mhi_WPKKQ0dNPv8xVNzlDcI3L5QovfDzxJHc6Sch3XTohnYxpLG9fqOVX1Xzg83tvAKmEO65TpD2BJZKwh0Bkx0',
  concrete: '/src/assets/images/foundation_waterproofing_1793633310257.jpg',
  waterproofing: '/src/assets/images/foundation_waterproofing_1793633310257.jpg',
  precisionCallout: '/src/assets/images/excavation_foundation_prep_1793633308598.jpg',
  projectBasement: '/src/assets/images/excavation_foundation_prep_1793633308598.jpg',
  projectRetainingWall: '/src/assets/images/armor_stone_retaining_wall_1793633310516.jpg',
  projectWaterMain: '/src/assets/images/utility_sewer_trench_1793633310559.jpg',
  projectSeptic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiXAN_BiaaPiLyurtt9WtHa7Y7oXFPfPPfrpvI-ihgD_rM_NANq6mRQyctQu-GrcdlgQLGUTCaaE6pffRAnJVuVdZe65GU-HsoUxErQcbP8P7L0dzf8HRY-bbk2dA3c9----vLNaFV7ZKO_NeSo6ksrbpoOzl781wGqYn9kD2wxLW1YrE1uOOicegl81JB2KFivzUgF0lMFzEO7KJZxTB9QYnWdAVKCHUJcDor5_k',
  action1: '/src/assets/images/excavation_foundation_prep_1793633308598.jpg',
  action2: '/src/assets/images/armor_stone_retaining_wall_1793633310516.jpg'
};

export const CONTACT_INFO = {
  phone: '(613) 893-4425',
  phoneRaw: '6138934425',
  email: 'info@visionexcavation.ca',
  hours: 'Mon - Sat: 7:00 AM - 6:00 PM',
  serviceArea: 'Kingston, Frontenac, Napanee & Surrounding Eastern Ontario',
  coverageRadius: '100km radius from Kingston, ON'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'excavation',
    category: 'excavation',
    title: 'Excavation & Earthmoving',
    shortDesc: 'Complete residential and commercial site clearing, bulk digging, site grading, and laser-guided leveling tailored for custom home builders and property developers.',
    fullDesc: 'Your site foundation is the most critical element of any building project. At Vision Excavation, we deliver tailored earthmoving solutions including bulk basement digs, bedrock trenching with hydraulic breakers, precise laser grading, and pad compaction.',
    image: ASSETS.excavation,
    bullets: [
      'Complete tree clearing, stump grubbing, and overburden stripping',
      'Limestone bedrock breaking with heavy hydraulic hammer attachments',
      'Laser-guided foundation pads, footing benches, and compaction testing',
      'GPS elevation profiling and cut/fill site balance'
    ],
    equipment: ['CAT 315 NextGen Excavator', 'NPK Hydraulic Breaker', 'John Deere 333G Track Loader'],
    typicalDuration: '2 - 5 days'
  },
  {
    id: 'retaining-walls',
    category: 'retaining-walls',
    title: 'Retaining Walls (Armor Stone)',
    shortDesc: 'Custom engineered armor stone, concrete block, and natural rock retaining walls designed to arrest slope erosion and create stunning usable terraces.',
    fullDesc: 'Whether managing steep slope grades or protecting waterfront shorelines from erosion, we construct massive engineered armor stone and block retaining walls engineered for stability and longevity.',
    image: ASSETS.retainingWalls,
    bullets: [
      'Tiered natural armor stone placement using heavy hydraulic thumbs',
      'Granular clear-stone drainage beds and geotextile separation cloth',
      'Shoreline permit assistance and Rideau canal conservation compliance',
      'Structural geogrid reinforcement on commercial slope retainment'
    ],
    equipment: ['Excavator with Rotating Grapple', 'Laser Transit', 'Granular Compaction Roller'],
    typicalDuration: '3 - 7 days'
  },
  {
    id: 'water-sewer',
    category: 'water-sewer',
    title: 'Water & Sewer Trenching',
    shortDesc: 'Water service replacements, municipal sewer lateral tie-ins, storm mains, deep utility trenching, and emergency line repairs performed safely and efficiently.',
    fullDesc: 'Complete municipal connections, deep utility trenches, and full OBC-certified waterline infrastructure for rural and urban developments across Eastern Ontario.',
    image: ASSETS.waterSewer,
    bullets: [
      'Deep trench shoring and Ontario One Call utility locate coordination',
      'Water service line lateral replacements and emergency freeze repairs',
      'Complete trench shoring, sand bedding, and backfill compaction',
      'Municipal inspection sign-off and pressure testing'
    ],
    equipment: ['Steel Trench Shoring Box', 'Laser Pipe Level', 'Compactor Rammer'],
    typicalDuration: '1 - 3 days'
  },
  {
    id: 'septic',
    category: 'septic',
    title: 'Septic Systems (OBC Certified)',
    shortDesc: 'Full-scope design and installation for conventional and tertiary septic systems, tank replacements, leaching bed restoration, and OBC-certified inspections.',
    fullDesc: 'Turnkey installation of conventional gravity beds, raised absorption mantles, and advanced tertiary wastewater systems (Ecoflo, Waterloo Biofilter) engineered to protect local groundwater.',
    image: ASSETS.septic,
    bullets: [
      'Conventional and tertiary septic tank installation & leaching beds',
      'Percolation test evaluation and imported filter media sand mantle',
      'Septic tank replacements and distribution box renewals',
      'OBC Part 8 compliance certification and municipal filings'
    ],
    equipment: ['Mini Excavator & Dumper', 'Transit Level', 'Tamping Plate'],
    typicalDuration: '3 - 6 days'
  },
  {
    id: 'concrete',
    category: 'concrete',
    title: 'Concrete Solutions & Sub-Bases',
    shortDesc: 'Sub-base grading, compaction, structural footings, poured foundations, commercial garage pads, walkways, curbs, and heavy-duty approach installations.',
    fullDesc: 'Rock-solid foundations start below the surface. We provide high-spec sub-base excavation, granular crushing, compaction to 98% Standard Proctor, and structural formwork preparation.',
    image: ASSETS.concrete,
    bullets: [
      'Granular A and clear stone base installation with laser grading',
      'Heavy vibratory compaction with proctor density verification',
      'Engineered monolithic slab-on-grade excavation and preparation',
      'Commercial apron and loading dock gravel foundation cuts'
    ],
    equipment: ['Smooth Drum Vibratory Roller', 'Dual-Slope Rotary Laser', 'Skid Steer'],
    typicalDuration: '2 - 4 days'
  },
  {
    id: 'waterproofing',
    category: 'waterproofing',
    title: 'Foundation Waterproofing',
    shortDesc: 'Full-perimeter foundation excavation, dimple membrane application, elastomeric rubber damp-proofing, and replacement of weeping tiles with French drain ties.',
    fullDesc: 'End wet basements permanently. We excavate down to the footings, power-wash existing foundation walls, apply multi-layer elastomeric coatings, install high-density dimple drainage boards, and lay perforated weeping tiles surrounded by clear gravel.',
    image: ASSETS.waterproofing,
    bullets: [
      'Full perimeter foundation excavation with utmost yard protection',
      'Heavy elastomeric liquid rubber membrane & dimple drainage board',
      'Weeping tile pipe replacement with clean-out ports and filter socks',
      'Clear stone backfill layer and sloped surface clay cap'
    ],
    equipment: ['Rubber-Track Excavator', 'Hot Spray Applicator', 'Hydrovac Support'],
    typicalDuration: '3 - 5 days'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'kingston-east-foundation',
    title: 'Full Basement & Footing Dig - Kingston East',
    category: 'excavation',
    categoryTag: 'Residential Excavation',
    location: 'Kingston East, ON',
    equipment: 'CAT 315 & NPK Breaker',
    summary: 'Precision bulk dig into dense limestone bedrock with laser-guided footing benches and comprehensive perimeter drainage tile system.',
    fullDetails: 'Excavation for a 3,400 sq. ft. custom estate home. Encountered massive solid limestone shelf at 3 feet depth. Deployed our 15-ton excavator with hydraulic breaker attachment to hammer 750 cubic meters of bedrock to precise engineer footing elevations within 1/4-inch tolerance.',
    specs: {
      depth: '9.5 Feet',
      bedrockType: 'Solid Black River Limestone',
      stoneVolume: '750 m³ Bedrock Removed',
      compaction: '98% Proctor Certified',
      duration: '4 Days'
    },
    image: ASSETS.projectBasement,
    status: 'Completed'
  },
  {
    id: 'rideau-lakes-retaining-wall',
    title: 'Multi-Tier Armor Stone Shoreline Wall - Rideau Lakes',
    category: 'retaining-walls',
    categoryTag: 'Structural Retaining Wall',
    location: 'Rideau Lakes, ON',
    equipment: '180 Tons Natural Armor Stone',
    summary: 'Engineered 3-tier natural armor stone shoreline stabilization preventing erosion and maximizing waterfront usable lawn terrace space.',
    fullDetails: 'Waterfront property facing steep bank collapse during spring runoff. Engineered a three-tier retaining wall using heavy 2-man and 3-man local limestone armor stones. Included geotextile barrier fabric, 3/4 clear stone backfill, and 4-inch perforated drainage pipe discharging to a rip-rap splash basin, fully compliant with Rideau Valley Conservation Authority permits.',
    specs: {
      stoneVolume: '180 Metric Tons',
      depth: '14 Feet Total Rise (3 Tiers)',
      permitJurisdiction: 'RVCA Approved',
      duration: '6 Days'
    },
    image: ASSETS.projectRetainingWall,
    status: 'Completed'
  },
  {
    id: 'napanee-commercial-utility',
    title: 'Commercial Water Main & Sanitary Tie-In - Napanee',
    category: 'water-sewer',
    categoryTag: 'Utilities & Sewer',
    location: 'Napanee, ON',
    equipment: '14ft Depth Shoring Box & Trench Box',
    summary: 'Deep trenching, shoring box installation, dual 8-inch utility lines connection, sand encasement and compaction with municipal inspection sign-off.',
    fullDetails: 'Emergency infrastructure connection for a commercial light-industrial complex. Cut across asphalt municipal right-of-way, placed OSHA-rated trench shoring boxes down to 14 feet, tapped live water main and laid SDR-35 PVC sanitary sewer pipe with laser gradient tracking. Reinstated roadway base in single shift.',
    specs: {
      depth: '14 Feet Depth',
      pipeSpec: '8" C900 Watermain & SDR-35 Sewer',
      permitJurisdiction: 'Town of Greater Napanee Sign-Off',
      duration: '2 Days'
    },
    image: ASSETS.projectWaterMain,
    status: 'Completed'
  },
  {
    id: 'sydenham-tertiary-septic',
    title: 'Tertiary Septic System & Leaching Bed - Sydenham',
    category: 'septic',
    categoryTag: 'Septic Engineering',
    location: 'Sydenham, ON',
    equipment: 'Ecoflo Tertiary Unit & Filter Sand',
    summary: 'Turnkey Ecoflo tertiary septic installation including bedrock excavation, imported sand mantle grading, and final hydroseed restoration.',
    fullDetails: 'Challenging high-water table waterfront cottage conversion requiring an advanced treatment unit. Blasted granite outcroppings, hauled in 240 tons of specialized filter sand, placed precast concrete septic tank and peat-filter tertiary module, completed distribution plumbing, and performed final grading with hydroseed finish.',
    specs: {
      bedrockType: 'Precambrian Granite Outcropping',
      stoneVolume: '240 Tons Filter Sand Mantle',
      permitJurisdiction: 'KFL&A Public Health Inspected',
      duration: '5 Days'
    },
    image: ASSETS.projectSeptic,
    status: 'Completed'
  },
  {
    id: 'brockville-subbase-pad',
    title: 'Laser-Guided Commercial Sub-Base - Brockville',
    category: 'concrete',
    categoryTag: 'Concrete Solutions',
    location: 'Brockville, ON',
    equipment: 'Vibratory Roller & Dual Laser',
    summary: 'Overburden strip, heavy sub-base granular placement, 98% Proctor compaction testing, and laser-guided grading for heavy equipment garage pad.',
    fullDetails: 'Stripped 18 inches of soft topsoil over 12,000 square feet. Placed non-woven geotextile stabilization fabric, topped with 12 inches of Granular B and 4 inches of Granular A crushed limestone. Compacted in 4-inch lifts using a 10-ton vibratory drum roller, achieving 99.2% Standard Proctor density across all test points.',
    specs: {
      stoneVolume: '12,000 Sq Ft Pad Base',
      compaction: '99.2% Proctor Density',
      duration: '3 Days'
    },
    image: ASSETS.concrete,
    status: 'Completed'
  },
  {
    id: 'gananoque-foundation-waterproofing',
    title: 'Engineered Foundation Waterproofing - Gananoque',
    category: 'waterproofing',
    categoryTag: 'Foundation Protection',
    location: 'Gananoque, ON',
    equipment: 'Rubber-Track Mini & Dimple Board',
    summary: 'Full-perimeter excavation down to bedrock footings, dimple drainage membrane, elastomeric spray barrier, and clean stone French drain trench.',
    fullDetails: 'Historic home plagued with cellar dampness and spring basement flooding. Carefully excavated entire 140-foot perimeter using zero-swing rubber tracked excavator without disturbing mature trees. Repaired masonry joints, sprayed 60-mil elastomeric liquid rubber, anchored Delta-MS dimple membrane, and installed clean-stone weeping tiles connected to sump pump.',
    specs: {
      depth: '8.5 Feet Down to Footing',
      stoneVolume: '65 Tons 3/4 Clear Stone',
      permitJurisdiction: 'Town of Gananoque Inspected',
      duration: '4 Days'
    },
    image: ASSETS.waterproofing,
    status: 'Completed'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'David M.',
    role: 'Homeowner',
    location: 'Kingston East',
    rating: 5,
    featured: true,
    content: 'Vision Excavation exceeded our expectations on our new build foundation dig. They hit limestone early, navigated it effortlessly with their hydraulic hammer, and left the site completely tidy. Highly recommend them!'
  },
  {
    id: 'rev-2',
    author: 'Robert N.',
    role: 'Property Owner',
    location: 'Rideau Lakes',
    rating: 5,
    featured: true,
    content: 'These guys are the best. Built a massive armor stone retaining wall on our sloped lot overlooking the water. Rock solid engineering, straightforward price quote, and finished three days ahead of schedule.'
  },
  {
    id: 'rev-3',
    author: 'Sarah L.',
    role: 'Commercial Client',
    location: 'Napanee',
    rating: 5,
    featured: true,
    content: 'Immediate response for an emergency sewer line replacement. Transparent pricing, top-of-the-line equipment, and great communication from start to backfilling. Wouldn’t trust anyone else with earthworks.'
  }
];

export const FAQS = [
  {
    q: 'How fast can you provide a free quote?',
    a: 'We typically visit your site within 24 to 48 hours of contact. After reviewing civil drawings and site conditions, we deliver a comprehensive itemized estimate within 2 business days.'
  },
  {
    q: 'Do you handle municipal excavation and utility permits?',
    a: 'Yes. We coordinate Ontario One Call utility locates before any tooth touches the ground, and assist with municipal road-cut, entrance, and sewer connection permits across our service territories.'
  },
  {
    q: 'What types of retaining walls do you build?',
    a: 'We specialize in natural armor stone walls, precast Redi-Rock/engineered commercial block walls, and compacted gabion systems, all installed with free-draining granular backfill and geogrid reinforcement.'
  },
  {
    q: 'Are you fully insured and WSIB compliant?',
    a: 'Absolutely. Vision Excavation carries full WSIB clearance for all crew members on-site along with $5,000,000 in commercial general liability insurance. Proof of coverage is supplied with every contract.'
  },
  {
    q: 'Can you excavate through solid Eastern Ontario bedrock?',
    a: 'Yes. Our heavy excavators are equipped with high-impact hydraulic hammers and rock rippers specifically sized to break down tough Frontenac and Napanee limestone without dangerous blasting.'
  },
  {
    q: 'Do you offer seasonal or winter excavation work?',
    a: 'Yes! We operate year-round for emergency water line freezes, foundation digs with ground thaw blankets, and structural rock placement before spring frost melts.'
  }
];

export const COVERAGE_TOWNS: CoverageTown[] = [
  {
    id: 'kingston',
    name: 'Kingston & Frontenac',
    county: 'Frontenac County',
    responseTime: '< 24 Hours',
    geology: 'Limestone Bedrock & Shallow Topsoil',
    recentProjectsCount: 142,
    highlight: 'Central operations hub, rapid dispatch for foundation digs & utility laterals.',
    coordinates: { x: 50, y: 70 }
  },
  {
    id: 'napanee',
    name: 'Greater Napanee',
    county: 'Lennox & Addington',
    responseTime: '< 24 Hours',
    geology: 'Dense Limestone & Clay Loam',
    recentProjectsCount: 68,
    highlight: 'Active municipal tie-ins, commercial pads & farmland grading.',
    coordinates: { x: 30, y: 65 }
  },
  {
    id: 'rideau-lakes',
    name: 'Rideau Lakes & Westport',
    county: 'Leeds and Grenville',
    responseTime: '24 - 48 Hours',
    geology: 'Granite Ridges & Waterfront Slopes',
    recentProjectsCount: 74,
    highlight: 'Shoreline stabilization, tiered armor stone walls, RVCA permitting experts.',
    coordinates: { x: 62, y: 35 }
  },
  {
    id: 'sydenham',
    name: 'Sydenham & South Frontenac',
    county: 'Frontenac County',
    responseTime: '< 24 Hours',
    geology: 'Precambrian Shield Granite',
    recentProjectsCount: 51,
    highlight: 'Cottage septic installations, rock clearing, driveway roadbuilding.',
    coordinates: { x: 44, y: 48 }
  },
  {
    id: 'gananoque',
    name: 'Gananoque & 1000 Islands',
    county: 'Leeds and Grenville',
    responseTime: '< 24 Hours',
    geology: 'Bedrock Shorelines & St. Lawrence Basin',
    recentProjectsCount: 46,
    highlight: 'Foundation waterproofing, island barge material logistics, septic renewals.',
    coordinates: { x: 68, y: 72 }
  },
  {
    id: 'brockville',
    name: 'Brockville & Prescott',
    county: 'Leeds and Grenville',
    responseTime: '24 - 48 Hours',
    geology: 'Glacial Till & Heavy Silty Clay',
    recentProjectsCount: 39,
    highlight: 'Commercial sub-base compaction, laser leveling, drainage French drains.',
    coordinates: { x: 84, y: 60 }
  },
  {
    id: 'tweed',
    name: 'Tweed & Tamworth',
    county: 'Hastings / Lennox & Addington',
    responseTime: '24 - 48 Hours',
    geology: 'Outcroppings & Sandy Till',
    recentProjectsCount: 28,
    highlight: 'Rural acreage clearing, pond excavation, culvert replacements.',
    coordinates: { x: 22, y: 32 }
  },
  {
    id: 'kaladar',
    name: 'Kaladar & North Frontenac',
    county: 'Frontenac County',
    responseTime: '24 - 48 Hours',
    geology: 'High Canadian Shield Granite Formations',
    recentProjectsCount: 22,
    highlight: 'Rugged topography road cuts, hydraulic rock demolition, off-grid pads.',
    coordinates: { x: 32, y: 20 }
  }
];
