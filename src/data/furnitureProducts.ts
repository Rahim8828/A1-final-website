// Furniture product catalog with color variations, categories, and pricing
// Pricing sourced from servicePageData options

export type FurnitureCategory =
  | 'all'
  | 'sofas'
  | 'beds'
  | 'dining'
  | 'tables'
  | 'wardrobes'
  | 'cabinets'
  | 'doors'
  | 'mandir'
  | 'floor-polish'
  | 'consultation'
  | 'color-refresh';

export type ColorVariant = 'light-brown' | 'white' | 'dark-brown';

export interface ColorOption {
  id: ColorVariant;
  label: string;
  hex: string;
  image: string;
}

export interface FurnitureProduct {
  id: string;
  name: string;
  category: FurnitureCategory;
  seaterType?: string; // e.g., '1-seater', '2-seater', '3-seater', '4-seater', '6-seater'
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  serviceLink: string;
  estimatedTime?: string;
  description: string;
  image?: string; // Default image for products without color variants
  colorVariants?: ColorOption[]; // Optional - for products with color options
  features: string[];
  isBestSeller?: boolean;
}

export interface CategoryInfo {
  id: FurnitureCategory;
  label: string;
  icon: string;
  productCount?: number;
}

// Categories with icons (SVG paths)
export const furnitureCategories: CategoryInfo[] = [
  { id: 'all', label: 'View All', icon: 'grid' },
  { id: 'sofas', label: 'Sofas', icon: 'sofa' },
  { id: 'beds', label: 'Beds', icon: 'bed' },
  { id: 'dining', label: 'Dining Sets', icon: 'dining' },
  { id: 'tables', label: 'Tables', icon: 'table' },
  { id: 'wardrobes', label: 'Wardrobes', icon: 'wardrobe' },
  { id: 'cabinets', label: 'Cabinets', icon: 'cabinet' },
  { id: 'doors', label: 'Doors', icon: 'door' },
  { id: 'mandir', label: 'Mandir', icon: 'mandir' },
  { id: 'floor-polish', label: 'Floor Polish', icon: 'floor' },
  { id: 'consultation', label: 'Consultation', icon: 'sparkles' },
  { id: 'color-refresh', label: 'Colour Change', icon: 'palette' },
];

// Helper to generate color variants with product-specific images
function makeColorVariants(basePath: string, darkImg: string, lightImg: string, whiteImg?: string): ColorOption[] {
  // Determine which images are actually available
  const hasDark = darkImg && darkImg.trim() !== '';
  const hasLight = lightImg && lightImg.trim() !== '';
  const hasWhite = whiteImg && whiteImg.trim() !== '';
  
  // Use first available image as fallback
  const fallbackImg = hasDark ? darkImg : (hasLight ? lightImg : (hasWhite ? whiteImg : ''));
  
  return [
    {
      id: 'dark-brown',
      label: 'Dark Brown',
      hex: '#4A2C2A',
      image: hasDark ? `${basePath}/${darkImg}` : (fallbackImg ? `${basePath}/${fallbackImg}` : ''),
    },
    {
      id: 'light-brown',
      label: 'Light Brown',
      hex: '#C4956A',
      image: hasLight ? `${basePath}/${lightImg}` : (fallbackImg ? `${basePath}/${fallbackImg}` : ''),
    },
    {
      id: 'white',
      label: 'White',
      hex: '#F5F0E8',
      image: hasWhite ? `${basePath}/${whiteImg}` : (hasLight ? `${basePath}/${lightImg}` : (fallbackImg ? `${basePath}/${fallbackImg}` : '')),
    },
  ];
}

// Default color variants for items without specific images
const defaultColorVariants: ColorOption[] = [
  { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '' },
  { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '' },
  { id: 'white', label: 'White', hex: '#F5F0E8', image: '' },
];

export const furnitureProducts: FurnitureProduct[] = [
  // ═══════════════════════════════════════
  // SOFAS
  // ═══════════════════════════════════════
  {
    id: 'sofa-1-seater',
    name: '1 Seater Sofa Polish',
    category: 'sofas',
    seaterType: '1-seater',
    price: 1449,
    originalPrice: 2099,
    rating: 4.9,
    reviewCount: 356,
    badge: 'Best Seller',
    serviceLink: '/services?service=sofa-1-seater',
    estimatedTime: '1.5 hrs',
    description: 'Professional single-seater sofa polish service with complete wood restoration. Includes thorough cleaning, scratch removal, premium polish application, and protective coating for lasting shine.',
    colorVariants: makeColorVariants('/products/sofa/1_seater_sofa', 'darkWooden1seaterSofa.webp', 'lightBrowns1seater.webp', 'white1seaterSofa.webp'),
    features: ['6 Months Warranty', 'Eco-friendly polish', 'Free pickup & delivery'],
    isBestSeller: true,
  },
  {
    id: 'sofa-2-seater',
    name: '2 Seater Sofa Polish',
    category: 'sofas',
    seaterType: '2-seater',
    price: 1999,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 456,
    badge: 'Best Seller',
    serviceLink: '/services?service=sofa-2-seater',
    estimatedTime: '2 hrs',
    description: 'Expert 2-seater sofa polishing service for loveseats and compact sofas. Restores natural wood grain beauty with multi-layer polish application and UV protection finish.',
    colorVariants: makeColorVariants('/products/sofa/2_seater', 'darkWoodeb2seatersofa.webp', 'lightBrown2seaterSofa.webp', 'white2seaterSofa.webp'),
    features: ['6 Months Warranty', 'UV protection coating', 'Same-day service available'],
    isBestSeller: true,
  },
  {
    id: 'sofa-3-seater',
    name: '3 Seater Sofa Polish',
    category: 'sofas',
    seaterType: '3-seater',
    price: 2949,
    originalPrice: 4199,
    rating: 4.8,
    reviewCount: 678,
    badge: 'Popular',
    serviceLink: '/services?service=sofa-3-seater',
    estimatedTime: '2.5 hrs',
    description: 'Complete 3-seater sofa restoration with deep wood cleaning, stain removal, and premium multi-coat polish. Includes armrest and leg polishing for uniform finish.',
    colorVariants: makeColorVariants('/products/sofa/3_seater', 'darkWooden3seatersofa.webp', 'lightBrown3seatersofa.webp', 'white3seaterSofa.webp'),
    features: ['6 Months Warranty', 'Deep stain removal', 'Armrest & leg polish included'],
    isBestSeller: true,
  },
  
  // ═══════════════════════════════════════
  // BEDS
  // ═══════════════════════════════════════
  {
    id: 'bed-king',
    name: 'King Size Bed Polish',
    category: 'beds',
    price: 5899,
    originalPrice: 7499,
    rating: 4.8,
    reviewCount: 284,
    badge: 'Popular',
    serviceLink: '/services?service=bed-king',
    estimatedTime: '4 hrs',
    description: 'Premium king size bed polishing service covering headboard, footboard, side panels, and legs. Includes deep scratch removal, wood nourishment, and heat-resistant protective coating.',
    colorVariants: makeColorVariants('/products/bed/king_bed', 'darkWoodenKing.webp', 'lightBrownKing.webp','whiteKing.webp'),
    features: ['6 Months Warranty', 'Heat-resistant coating', 'Headboard polish included'],
  },
  {
    id: 'bed-queen',
    name: 'Queen Size Bed Polish',
    category: 'beds',
    price: 4500,
    originalPrice: 6199,
    rating: 4.8,
    reviewCount: 284,
    badge: 'Popular',
    serviceLink: '/services?service=bed-queen',
    estimatedTime: '3.5 hrs',
    description: 'Professional queen size bed polish with complete frame restoration. Covers all wooden surfaces including storage drawers if applicable, with anti-termite treatment option.',
    colorVariants: makeColorVariants('/products/bed/queen_bed', 'darkWoodenQueenSize.webp', 'lightBrownQueen.webp','whitequeensize.webp'),
    features: ['6 Months Warranty', 'Storage drawer polish', 'Anti-termite treatment available'],
  },
  {
    id: 'bed-sofacumbed',
    name: 'Sofa Cum Bed Polish',
    category: 'beds',
    price: 4799,
    originalPrice: 6599,
    rating: 4.7,
    reviewCount: 89,
    serviceLink: '/services?service=bed-sofacumbed',
    estimatedTime: '4 hrs',
    description: 'Dual-function sofa cum bed polishing covering both seating and sleeping surfaces. Includes mechanism care, armrests, and convertible frame components.',
    colorVariants: makeColorVariants('/products/bed/sofa_cum_bed', 'darkBrownSofaCumBed.webp', 'lightBrownSofaCumbed.webp', 'whiteSofaCumbed.webp'),
    features: ['6 Months Warranty', 'Mechanism lubrication', 'Dual-surface polish'],
  },

  // ═══════════════════════════════════════
  // DOORS
  // ═══════════════════════════════════════
  {
    id: 'door-single',
    name: 'Single Door Polish',
    category: 'doors',
    seaterType: '1-seater',
    price: 2449,
    originalPrice: 3599,
    rating: 4.7,
    reviewCount: 523,
    badge: 'Best Seller',
    serviceLink: '/services?service=door-single',
    estimatedTime: '2 hrs',
    description: 'Professional single door polish covering both sides, edges, and door frame. Includes panel detailing, handle area care, and weather-resistant finish for main entrance doors.',
    colorVariants: makeColorVariants('/products/doors/single_door', 'darkWoodensingle.webp', 'lightBrownSingleDoor.webp','whitesingleDoor.webp'),
    features: ['Both sides polish', 'Weather-resistant finish', 'Handle area care'],
    isBestSeller: true,
  },

  // ═══════════════════════════════════════
  // TABLES
  // ═══════════════════════════════════════
  {
    id: 'table-center',
    name: 'Center Table Polish',
    category: 'tables',
    price: 2449,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=table-center',
    estimatedTime: '2.5 hrs',
    description: 'Premium center table polishing with food-safe, heat-resistant finish. Ideal for tables used for dining and entertaining with enhanced durability.',
    colorVariants: makeColorVariants('/products/table/single_table', 'darkSingleWoodentable.webp', 'lightbrowntable.webp','whitesingletable.webp'),
    features: ['Heat-resistant up to 80°C', 'Food-safe coating', 'Stain protection'],
    isBestSeller: true,
  },
  {
    id: 'table-side',
    name: 'Side Table Polish',
    category: 'tables',
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 456,
    serviceLink: '/services?service=table-side',
    estimatedTime: '2 hrs',
    description: 'Elegant side table polish for bedside and accent tables. Includes drawer polish if applicable with smooth glide treatment.',
    colorVariants: makeColorVariants('/products/table/side_table', 'darkBrownSideTable.webp', 'lightBrownsidetable.webp', 'whiteSideTable.webp'),
    features: ['Drawer glide treatment', 'Edge protection', 'Anti-dust coating'],
  },
  {
    id: 'table-study',
    name: 'Study Table Polish',
    category: 'tables',
    price: 4599,
    originalPrice: 5999,
    rating: 4.7,
    reviewCount: 310,
    serviceLink: '/services?service=table-study',
    estimatedTime: '3 hrs',
    description: 'Comprehensive study table polish covering desktop, drawers, and shelves. Scratch-resistant finish ideal for daily writing and computer use.',
    colorVariants: makeColorVariants('/products/table/study_table', 'darkbrownStdytable.webp', 'lightBrown_study.webp','whiteStudyTable.webp'),
    features: ['Scratch-resistant surface', 'Drawer polish included', 'Cable management area care'],
  },

  // ═══════════════════════════════════════
  // WARDROBES
  // ═══════════════════════════════════════
  {
    id: 'wardrobe-2door',
    name: '2 Door Wardrobe Polish',
    category: 'wardrobes',
    seaterType: '2-seater',
    price: 4449,
    originalPrice: 5899,
    rating: 4.9,
    reviewCount: 678,
    badge: 'Best Seller',
    serviceLink: '/services?service=wardrobe-2door',
    estimatedTime: '3.5 hrs',
    description: 'Complete 2-door wardrobe polish covering inside, outside, shelves, and hanging rods. Includes handle polishing, hinge lubrication, and anti-fungal treatment.',
    colorVariants: makeColorVariants('/products/wardrobe/double', 'darkWoodendoubleWardrobe.webp', 'lightBrowndoeublewardrobe.webp','whitedoublewardrobe.webp'),
    features: ['Inside & outside polish', 'Anti-fungal treatment', 'Hinge lubrication'],
    isBestSeller: true,
  },
  {
    id: 'wardrobe-3door',
    name: '3 Door Wardrobe Polish',
    category: 'wardrobes',
    seaterType: '3-seater',
    price: 5449,
    originalPrice: 6899,
    rating: 4.8,
    reviewCount: 892,
    badge: 'Popular',
    serviceLink: '/services?service=wardrobe-3door',
    estimatedTime: '4.5 hrs',
    description: 'Extensive 3-door wardrobe restoration with complete interior and exterior polish. Covers all compartments, drawers, and mirror frames if present.',
    colorVariants: makeColorVariants('/products/wardrobe/triple', 'darkbrownWardrobe.webp', 'lightBrownWardrobe.webp', 'whitetripleWardrobe.webp'),
    features: ['All compartments covered', 'Mirror frame polish', 'Drawer runners care'],
  },
  // ═══════════════════════════════════════
  // DINING SETS
  // ═══════════════════════════════════════
  {
    id: 'dining-table-premium',
    name: 'Dining Table Polish',
    category: 'dining',
    seaterType: '6-seater',
    price: 6499,
    originalPrice: 8499,
    rating: 4.9,
    reviewCount: 612,
    badge: 'Best Seller',
    serviceLink: '/services?service=dining-table-premium',
    estimatedTime: '5 hrs',
    description: 'Premium dining table polishing for statement pieces and family tables. Includes deep sanding, edge detailing, food-safe coating, and a rich final sheen made for daily use.',
    colorVariants: makeColorVariants('/products/dining_set/6_seater', 'darkbrown6seater.webp', 'lightbrown6seater.webp', 'white6seater.webp'),
    features: ['Food-safe coating', 'Heat-resistant finish', 'Premium dining surface care'],
    isBestSeller: true,
  },
  {
    id: 'dining-polish',
    name: 'Dining Polish',
    category: 'dining',
    seaterType: '2-seater',
    price: 1999,
    originalPrice: 2899,
    rating: 4.8,
    reviewCount: 402,
    serviceLink: '/services?service=dining-polish',
    estimatedTime: '2 hrs',
    description: 'Value-focused dining polish service for compact setups and routine refresh jobs. Great for improving shine, covering wear marks, and extending the life of everyday dining furniture.',
    colorVariants: makeColorVariants('/products/dining_set/4_seater', '4seaterDark.webp', '4seaterlight.webp', '4seaterwhite.webp'),
    features: ['Budget-friendly refresh', 'Fast turnaround', 'Daily-use protection'],
  },
  {
    id: 'dining-single-chair',
    name: 'Chair Polish',
    category: 'dining',
    seaterType: '1-seater',
    price: 849,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 189,
    serviceLink: '/services?service=chair-polish',
    estimatedTime: '1 hr',
    description: 'Individual chair polish for dining, lounge, and accent seating. Includes leg restoration, backrest finishing, and a durable top coat.',
    colorVariants: makeColorVariants('/products/dining_set/chair', 'darkbrownChair.webp', 'lightBrown.webp', 'whiteChair.webp'),
    features: ['Per chair pricing', 'Quick 1-hour service', 'Durable top coat'],
  },
  {
    id: 'bench-polish',
    name: 'Bench Polish',
    category: 'dining',
    seaterType: '2-seater',
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 208,
    serviceLink: '/services?service=bench-polish',
    estimatedTime: '1.5 hrs',
    description: 'Bench polishing service for dining benches, foyer seating, and compact wooden benches. Restores seat top, legs, and support frame with a clean satin finish.',
    colorVariants: makeColorVariants('/products/dining_set/2_seater_bench', 'darkWooden2seaterbench.webp', 'lightBrown2seaterbench.webp', 'white2seaterbench.webp'),
    features: ['Seat + leg restoration', 'Smooth satin finish', 'Compact-space friendly'],
  },

  // ═══════════════════════════════════════
  // CABINETS
  // ═══════════════════════════════════════
  
  {
    id: 'cabinet-double',
    name: 'Double Door Cabinet',
    category: 'cabinets',
    seaterType: '2-seater',
    price: 2999,
    originalPrice: 4399,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=cabinet-double',
    estimatedTime: '2.5 hrs',
    description: 'Professional double-door cabinet polish for kitchen and storage cabinets. Inside-outside coverage with shelf polishing and handle restoration.',
    colorVariants: makeColorVariants('/products/cabinet/double_cabinet', 'double_drawer.webp', '', 'white_DoubleDoor.webp'),
    features: ['Inside & outside polish', 'Shelf restoration', 'Handle refurbishment'],
    isBestSeller: true,
  },
  
  {
    id: 'cabinet-crockery',
    name: 'Crockery Shelf Polish',
    category: 'cabinets',
    price: 4499,
    originalPrice: 5999,
    rating: 4.8,
    reviewCount: 310,
    serviceLink: '/services?service=cabinet-crockery',
    estimatedTime: '3.5 hrs',
    description: 'Specialized crockery cabinet polish with glass-safe, non-toxic materials. Includes display shelf polishing and glass panel frame care.',
    colorVariants: makeColorVariants('/products/cabinet/crokery', 'darkBrownCrokery.webp', 'lightBrown_crokery.webp', 'whiteCrokery.webp'),
    features: ['Glass-safe materials', 'Display shelf care', 'Non-toxic formula'],
  },


  
  // ═══════════════════════════════════════
  // MANDIR
  // ═══════════════════════════════════════
  {
    id: 'mandir-standard',
    name: 'Mandir Polish',
    category: 'mandir',
    price: 2499,
    originalPrice: 3699,
    rating: 4.9,
    reviewCount: 987,
    badge: 'Best Seller',
    serviceLink: '/services?service=mandir-standard',
    estimatedTime: '3 hrs',
    description: 'Sacred mandir (temple) polish with traditional finish and meticulous carving care. Non-toxic, aromatic polish suitable for prayer spaces with custom color matching.',
    colorVariants: makeColorVariants('/products/mandir', 'darkBrownmandir.webp', 'lightBrownMandir.webp', 'whiteMandir.webp'),
    features: ['Non-toxic formula', 'Intricate carving care', 'Custom color matching'],
    isBestSeller: true,
  },

  // ═══════════════════════════════════════
  // FLOOR POLISH — 2 Types
  // ═══════════════════════════════════════
  {
    id: 'floor-hand-polish',
    name: 'Hand Polish Floor',
    category: 'floor-polish',
    price: 160,
    originalPrice: 210,
    rating: 4.9,
    reviewCount: 1234,
    badge: 'Best Seller',
    serviceLink: '/services?service=floor-polishing',
    estimatedTime: 'Varies by area',
    description: 'Professional hand polish floor service at ₹160 per sqft. Our skilled craftsmen meticulously hand-apply premium polish to restore your wooden floors to their original glory. This traditional method ensures even coverage, attention to detail, and a beautiful natural finish that enhances the wood grain. Perfect for residential spaces where quality and craftsmanship matter. Includes surface preparation, gap filling, premium polish application, and protective coating.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownLamination.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteLamination.webp' },
    ],
    features: ['₹160 per sqft', 'Hand-applied for precision', 'Premium polish materials', 'Natural wood grain enhancement'],
    isBestSeller: true,
  },
  {
    id: 'floor-machine-polish',
    name: 'Machine Polish Floor',
    category: 'floor-polish',
    price: 170,
    originalPrice: 230,
    rating: 4.9,
    reviewCount: 1111,
    badge: 'Popular',
    serviceLink: '/services?service=floor-polishing',
    estimatedTime: 'Varies by area',
    description: 'Advanced machine polish floor service at ₹170 per sqft. Using professional-grade polishing equipment, we deliver a uniform, high-gloss finish with superior durability. Machine polishing is faster and ideal for larger floor areas, commercial spaces, or when you need a perfectly even, mirror-like shine. The mechanical process ensures consistent coverage and deeper penetration of polish into the wood surface for long-lasting protection.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownMachinePolish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/lightBrownMachinePolish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteMachinePolish.webp' },
    ],
    features: ['₹170 per sqft', 'Professional machine application', 'High-gloss uniform finish', 'Faster for large areas'],
  },
  {
    id: 'consultation-booking',
    name: 'Consultation Booking',
    category: 'consultation',
    price: 99,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 1450,
    badge: 'Quick Start',
    serviceLink: '/services?service=consultation-booking',
    estimatedTime: '30 mins visit',
    image: '/products/consultation/visiting.png',
    description: 'Book an on-site consultation for just ₹99. Our expert will inspect the furniture, recommend the right finish, and share a clear quote during the visit.',
    features: ['₹99 visit fee', 'On-site assessment', 'Quote during visit'],
    isBestSeller: true,
  },
  {
    id: 'color-change-chair',
    name: 'Chair Colour Change',
    category: 'color-refresh',
    seaterType: '1-seater',
    price: 1849,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 260,
    serviceLink: '/services?service=color-change-chair',
    estimatedTime: '1.5 hrs',
    description: 'Colour refresh service for wooden chairs with complete sanding, tone correction, and a fresh protective finish matched to your space.',
    colorVariants: makeColorVariants('/products/dining_set/chair', 'darkbrownChair.webp', 'lightBrown.webp', 'whiteChair.webp'),
    features: ['Tone matching', 'Fresh top coat', 'Smooth sanding finish'],
  },
  {
    id: 'color-change-door',
    name: 'Door Colour Change',
    category: 'color-refresh',
    seaterType: '2-seater',
    price: 4500,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 324,
    badge: 'Popular',
    serviceLink: '/services?service=color-change-door',
    estimatedTime: '3 hrs',
    description: 'Full door colour change for entrance and interior doors. Includes shade transition, surface prep, and a durable final coating with premium finish options.',
    colorVariants: makeColorVariants('/products/doors/double_door', 'darkbrowndoubledoor.webp', 'lightBrownDoubleDoor.webp', 'whiteDoubleDoor.webp'),
    features: ['Shade transition service', 'Premium finish options', 'Durable protective layer'],
  },
  {
    id: 'color-change-frame',
    name: 'Frame Colour Change',
    category: 'color-refresh',
    seaterType: '3-seater',
    price: 3899,
    originalPrice: 5299,
    rating: 4.8,
    reviewCount: 198,
    serviceLink: '/services?service=color-change-frame',
    estimatedTime: '2.5 hrs',
    description: 'Frame colour change for bed frames, table frames, and structural wood members. Built for clients who want a clean modern shade upgrade without replacing the furniture.',
    colorVariants: makeColorVariants('/products/bed/queen_bed', 'darkWoodenQueenSize.webp', 'lightBrownQueen.webp', 'whitequeensize.webp'),
    features: ['Modern shade upgrade', 'Surface levelling', 'Protective top coat'],
  },

];

// Utility functions
export const getMinPrice = (): number =>
  Math.min(...furnitureProducts.map((p) => p.price));

export const getMaxPrice = (): number =>
  Math.max(...furnitureProducts.map((p) => p.price));

export const getProductsByCategory = (category: FurnitureCategory): FurnitureProduct[] => {
  if (category === 'all') return furnitureProducts;
  return furnitureProducts.filter((p) => p.category === category);
};

export const getSeaterTypes = (): string[] => {
  const types = new Set(furnitureProducts.filter(p => p.seaterType).map(p => p.seaterType!));
  return Array.from(types).sort();
};

export const getTotalProductCount = (): number => furnitureProducts.length;
