/**
 * Configuration data for bulk SEO page generation
 * This file contains the service categories, locations, and title variations
 * used to generate 150 unique service pages (80 Mumbai + 70 location-specific)
 */

// 20 Service Categories
export const serviceCategories = [
  {
    id: 'furniture-polishing',
    name: 'Furniture Polishing',
    slug: 'furniture-polishing',
  },
  {
    id: 'wood-polishing',
    name: 'Wood Polishing',
    slug: 'wood-polishing',
  },
  {
    id: 'pu-polish',
    name: 'PU Polish',
    slug: 'pu-polish',
  },
  {
    id: 'pu-gloss-polish',
    name: 'PU Gloss Polish',
    slug: 'pu-gloss-polish',
  },
  {
    id: 'pu-matt-polish',
    name: 'PU Matt Polish',
    slug: 'pu-matt-polish',
  },
  {
    id: 'melamine-polish',
    name: 'Melamine Polish',
    slug: 'melamine-polish',
  },
  {
    id: 'duco-polish',
    name: 'Duco Polish',
    slug: 'duco-polish',
  },
  {
    id: 'teak-wood-polish',
    name: 'Teak Wood Polish',
    slug: 'teak-wood-polish',
  },
  {
    id: 'interior-wood-finishing',
    name: 'Interior Wood Finishing',
    slug: 'interior-wood-finishing',
  },
  {
    id: 'door-polishing',
    name: 'Door Polishing',
    slug: 'door-polishing',
  },
  {
    id: 'wardrobe-polishing',
    name: 'Wardrobe Polishing',
    slug: 'wardrobe-polishing',
  },
  {
    id: 'dining-table-polishing',
    name: 'Dining Table Polishing',
    slug: 'dining-table-polishing',
  },
  {
    id: 'sofa-wood-polish',
    name: 'Sofa Wood Polish',
    slug: 'sofa-wood-polish',
  },
  {
    id: 'bed-wood-polish',
    name: 'Bed Wood Polish',
    slug: 'bed-wood-polish',
  },
  {
    id: 'cabinet-wood-polish',
    name: 'Cabinet Wood Polish',
    slug: 'cabinet-wood-polish',
  },
  {
    id: 'bookshelf-rack-polish',
    name: 'Bookshelf/Rack Polish',
    slug: 'bookshelf-rack-polish',
  },
  {
    id: 'mandir-polish',
    name: 'Mandir Polish',
    slug: 'mandir-polish',
  },
  {
    id: 'jhula-polish',
    name: 'Jhula Polish',
    slug: 'jhula-polish',
  },
  {
    id: 'wooden-floor-polishing',
    name: 'Wooden Floor Polishing',
    slug: 'wooden-floor-polishing',
  },
  {
    id: 'antique-furniture-polish',
    name: 'Antique Furniture Polish',
    slug: 'antique-furniture-polish',
  },
] as const;

// 41 Mumbai Locations
export const mumbaiLocations = [
  // Western Line (16 locations)
  {
    id: 'andheri-west',
    name: 'Andheri West',
    slug: 'andheri-west',
    zone: 'western',
    priority: 1, // High priority location
  },
  {
    id: 'andheri-east',
    name: 'Andheri East',
    slug: 'andheri-east',
    zone: 'western',
    priority: 1,
  },
  {
    id: 'jogeshwari',
    name: 'Jogeshwari',
    slug: 'jogeshwari',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'goregaon',
    name: 'Goregaon',
    slug: 'goregaon',
    zone: 'western',
    priority: 1,
  },
  {
    id: 'malad',
    name: 'Malad',
    slug: 'malad',
    zone: 'western',
    priority: 1,
  },
  {
    id: 'kandivali',
    name: 'Kandivali',
    slug: 'kandivali',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'borivali',
    name: 'Borivali',
    slug: 'borivali',
    zone: 'western',
    priority: 1,
  },
  {
    id: 'dahisar',
    name: 'Dahisar',
    slug: 'dahisar',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'bandra',
    name: 'Bandra',
    slug: 'bandra',
    zone: 'western',
    priority: 1,
  },
  {
    id: 'khar',
    name: 'Khar',
    slug: 'khar',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'santacruz',
    name: 'Santacruz',
    slug: 'santacruz',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'vile-parle',
    name: 'Vile Parle',
    slug: 'vile-parle',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'juhu',
    name: 'Juhu',
    slug: 'juhu',
    zone: 'western',
    priority: 2,
  },
  {
    id: 'versova',
    name: 'Versova',
    slug: 'versova',
    zone: 'western',
    priority: 3,
  },
  {
    id: 'oshiwara',
    name: 'Oshiwara',
    slug: 'oshiwara',
    zone: 'western',
    priority: 3,
  },
  {
    id: 'lokhandwala',
    name: 'Lokhandwala',
    slug: 'lokhandwala',
    zone: 'western',
    priority: 2,
  },
  
  // Central Line (10 locations)
  {
    id: 'dadar',
    name: 'Dadar',
    slug: 'dadar',
    zone: 'central',
    priority: 1,
  },
  {
    id: 'sion',
    name: 'Sion',
    slug: 'sion',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'matunga',
    name: 'Matunga',
    slug: 'matunga',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'kurla',
    name: 'Kurla',
    slug: 'kurla',
    zone: 'central',
    priority: 1,
  },
  {
    id: 'ghatkopar',
    name: 'Ghatkopar',
    slug: 'ghatkopar',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'vikhroli',
    name: 'Vikhroli',
    slug: 'vikhroli',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'bhandup',
    name: 'Bhandup',
    slug: 'bhandup',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'mulund',
    name: 'Mulund',
    slug: 'mulund',
    zone: 'central',
    priority: 2,
  },
  {
    id: 'thane',
    name: 'Thane',
    slug: 'thane',
    zone: 'central',
    priority: 1,
  },
  {
    id: 'wadala',
    name: 'Wadala',
    slug: 'wadala',
    zone: 'central',
    priority: 2,
  },
  
  // Harbour Line (5 locations)
  {
    id: 'chembur',
    name: 'Chembur',
    slug: 'chembur',
    zone: 'harbour',
    priority: 2,
  },
  {
    id: 'govandi',
    name: 'Govandi',
    slug: 'govandi',
    zone: 'harbour',
    priority: 3,
  },
  {
    id: 'mankhurd',
    name: 'Mankhurd',
    slug: 'mankhurd',
    zone: 'harbour',
    priority: 3,
  },
  {
    id: 'navi-mumbai',
    name: 'Navi Mumbai',
    slug: 'navi-mumbai',
    zone: 'harbour',
    priority: 1,
  },
  {
    id: 'vashi',
    name: 'Vashi',
    slug: 'vashi',
    zone: 'harbour',
    priority: 2,
  },
  
  // Other Hotspots (10 locations)
  {
    id: 'powai',
    name: 'Powai',
    slug: 'powai',
    zone: 'other',
    priority: 1,
  },
  {
    id: 'marol',
    name: 'Marol',
    slug: 'marol',
    zone: 'other',
    priority: 2,
  },
  {
    id: 'saki-naka',
    name: 'Saki Naka',
    slug: 'saki-naka',
    zone: 'other',
    priority: 2,
  },
  {
    id: 'chandivali',
    name: 'Chandivali',
    slug: 'chandivali',
    zone: 'other',
    priority: 2,
  },
  {
    id: 'bkc',
    name: 'BKC',
    slug: 'bkc',
    zone: 'other',
    priority: 2,
  },
  {
    id: 'mira-road',
    name: 'Mira Road',
    slug: 'mira-road',
    zone: 'other',
    priority: 2,
  },
  {
    id: 'bhayandar',
    name: 'Bhayandar',
    slug: 'bhayandar',
    zone: 'other',
    priority: 3,
  },
  {
    id: 'ghansoli',
    name: 'Ghansoli',
    slug: 'ghansoli',
    zone: 'other',
    priority: 3,
  },
  {
    id: 'airoli',
    name: 'Airoli',
    slug: 'airoli',
    zone: 'other',
    priority: 3,
  },
  {
    id: 'nerul',
    name: 'Nerul',
    slug: 'nerul',
    zone: 'other',
    priority: 3,
  },
] as const;

// Mumbai as a generic location for Phase 1
export const mumbaiGenericLocation = {
  id: 'mumbai',
  name: 'Mumbai',
  slug: 'mumbai',
  zone: 'all',
  priority: 0, // Special priority for generic Mumbai pages
} as const;

// 4 Title Variations
export const titleVariations = [
  {
    type: 'affordable' as const,
    prefix: 'Affordable',
    suffix: '',
    description: 'Budget-friendly service option',
  },
  {
    type: 'top-rated' as const,
    prefix: 'Top-Rated',
    suffix: '| 4.9★ Rated',
    description: 'Highly rated by customers',
  },
  {
    type: 'professional' as const,
    prefix: 'Professional',
    suffix: '| Same-Day Service',
    description: 'Professional service with quick turnaround',
  },
  {
    type: 'best' as const,
    prefix: 'Best',
    suffix: '| Expert Polishers',
    description: 'Premium service with expert craftsmen',
  },
] as const;

// Page Generation Strategy
export const pageGenerationStrategy = {
  phase1: {
    description: 'Mumbai generic pages',
    count: 80,
    formula: '20 categories × 4 title variations',
    location: 'Mumbai',
  },
  phase2: {
    description: 'Location-specific pages',
    count: 70,
    formula: '3-4 pages per category with specific locations',
    distribution: 'Balanced across priority locations and title variations',
  },
  total: 150,
} as const;

// Helper function to get priority locations for Phase 2
export function getPriorityLocations(priorityLevel: 1 | 2 | 3 = 1) {
  return mumbaiLocations.filter(loc => loc.priority === priorityLevel);
}

// Helper function to get all locations by zone
export function getLocationsByZone(zone: 'western' | 'central' | 'harbour' | 'other') {
  return mumbaiLocations.filter(loc => loc.zone === zone);
}
