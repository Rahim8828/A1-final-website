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
  | 'shelves'
  | 'tv-units'
  | 'doors'
  | 'jhula'
  | 'mandir'
  | 'antique'
  | 'wood-polish'
  | 'pu-polish'
  | 'deco-paint';

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
  colorVariants: ColorOption[];
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
  { id: 'shelves', label: 'Shelves', icon: 'shelf' },
  { id: 'tv-units', label: 'TV Units', icon: 'tv' },
  { id: 'doors', label: 'Doors', icon: 'door' },
  { id: 'jhula', label: 'Jhula', icon: 'jhula' },
  { id: 'mandir', label: 'Mandir', icon: 'mandir' },
  { id: 'antique', label: 'Antique', icon: 'antique' },
  { id: 'wood-polish', label: 'Wood Polish', icon: 'polish' },
  { id: 'pu-polish', label: 'PU Polish', icon: 'polish' },
  { id: 'deco-paint', label: 'Deco Paint', icon: 'paint' },
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
    price: 1599,
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
    price: 2199,
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
    price: 3199,
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
    price: 4299,
    originalPrice: 5699,
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
    price: 3899,
    originalPrice: 5199,
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
    id: 'bed-l-shaped',
    name: 'L Shaped Bed Polish',
    category: 'beds',
    price: 4599,
    originalPrice: 6099,
    rating: 4.8,
    reviewCount: 284,
    badge: 'Popular',
    serviceLink: '/services?service=bed-l-shaped',
    estimatedTime: '4.5 hrs',
    description: 'Specialized L-shaped bed polishing covering extended corner sections, main frame, and storage compartments. Perfect for modern bedroom designs with complex geometry.',
    colorVariants: makeColorVariants('/products/bed/L_shape_bed', 'darkBrown_l_shape_bed.webp', 'lightBrownLShaped.webp','whiteLShapeBed.webp'),
    features: ['6 Months Warranty', 'Corner section care', 'Storage compartment polish'],
  },
  {
    id: 'bed-diwan',
    name: 'Diwan Bed Polish',
    category: 'beds',
    price: 3299,
    originalPrice: 4399,
    rating: 4.8,
    reviewCount: 284,
    badge: 'Popular',
    serviceLink: '/services?service=bed-diwan',
    estimatedTime: '3 hrs',
    description: 'Traditional diwan bed polish service with focus on intricate carvings and decorative elements. Includes backrest, side panels, and under-storage polishing.',
    colorVariants: makeColorVariants('/products/bed/diwan', 'darkWoodenDiwan.webp', 'lightBrownWoodenDiwan.webp','whitediwan.webp'),
    features: ['6 Months Warranty', 'Carving detail care', 'Backrest polish included'],
  },
  {
    id: 'bed-sofacumbed',
    name: 'Sofa Cum Bed Polish',
    category: 'beds',
    price: 4999,
    originalPrice: 6599,
    rating: 4.7,
    reviewCount: 89,
    serviceLink: '/services?service=bed-sofacumbed',
    estimatedTime: '4 hrs',
    description: 'Dual-function sofa cum bed polishing covering both seating and sleeping surfaces. Includes mechanism care, armrests, and convertible frame components.',
    colorVariants: makeColorVariants('/products/bed/sofa_cum_bed', 'darkBrownSofaCumBed.webp', 'lightBrownSofaCumbed.webp', 'whiteSofaCumbed.webp'),
    features: ['6 Months Warranty', 'Mechanism lubrication', 'Dual-surface polish'],
  },
  {
    id: 'bed-bunk',
    name: 'Bunk Bed Polish',
    category: 'beds',
    price: 5999,
    originalPrice: 7999,
    rating: 4.7,
    reviewCount: 100,
    serviceLink: '/services?service=bed-bunk',
    estimatedTime: '5 hrs',
    description: 'Complete bunk bed polishing including upper and lower berths, ladder, safety rails, and support beams. Child-safe, non-toxic polish materials used.',
    colorVariants: makeColorVariants('/products/bed/climbing_bed', 'darkWoodenBunkerBed.webp', 'lightBrownBunkerBed.webp', 'whiteBunkerbed.webp'),
    features: ['6 Months Warranty', 'Child-safe materials', 'Ladder & rails included'],
  },
  {
    id: 'bed-single',
    name: 'Single Bed Polish',
    category: 'beds',
    price: 2799,
    originalPrice: 3699,
    rating: 4.7,
    reviewCount: 100,
    serviceLink: '/services?service=bed-single',
    estimatedTime: '2.5 hrs',
    description: 'Affordable single bed polish service ideal for kids and guest rooms. Covers headboard, footboard, side rails, and legs with durable finish.',
    colorVariants: makeColorVariants('/products/bed/single_bed', 'darkWoodensinglebed.webp', 'lightBrownsinglebed.webp', 'whiteSingleBed.webp'),
    features: ['6 Months Warranty', 'Quick turnaround', 'Budget-friendly option'],
  },

  // ═══════════════════════════════════════
  // DOORS
  // ═══════════════════════════════════════
  {
    id: 'door-single',
    name: 'Single Door Polish',
    category: 'doors',
    seaterType: '1-seater',
    price: 2699,
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
  {
    id: 'door-2door',
    name: '2 Door Polish',
    category: 'doors',
    seaterType: '2-seater',
    price: 4299,
    originalPrice: 5699,
    rating: 4.8,
    reviewCount: 789,
    badge: 'Popular',
    serviceLink: '/services?service=door-2door',
    estimatedTime: '3 hrs',
    description: 'Double door polishing service for main entrance and bedroom doors. Covers both panels inside-out, center meeting edges, and complete frame with anti-fungal treatment.',
    colorVariants: makeColorVariants('/products/doors/double_door', 'darkbrowndoubledoor.webp', 'lightBrownDoubleDoor.webp', 'whiteDoubleDoor.webp'),
    features: ['Both sides polish', 'Anti-fungal treatment', 'Center edge finishing'],
  },
  {
    id: 'door-3door',
    name: '3 Door Polish',
    category: 'doors',
    seaterType: '3-seater',
    price: 5399,
    originalPrice: 7199,
    rating: 4.7,
    reviewCount: 345,
    serviceLink: '/services?service=door-3door',
    estimatedTime: '3.5 hrs',
    description: 'Triple door polish service ideal for large wardrobes and room dividers. Complete coverage of all three panels, joining edges, and frame with moisture protection.',
    colorVariants: makeColorVariants('/products/doors/triple_doors', 'DarkBrowntripleDoor.webp', 'lightBrowntripleDoor.webp', 'whiteTripledoor.webp'),
    features: ['Both sides polish', 'Moisture protection', 'Edge alignment care'],
  },
  {
    id: 'door-4door',
    name: '4 Door Polish',
    category: 'doors',
    seaterType: '4-seater',
    price: 6499,
    originalPrice: 8699,
    rating: 4.8,
    reviewCount: 277,
    serviceLink: '/services?service=door-4door',
    estimatedTime: '4 hrs',
    description: 'Comprehensive four-door polish for large wardrobes and storage units. All panels polished inside-out with special attention to hinges, handles, and alignment.',
    colorVariants: makeColorVariants('/products/doors/four_doors', 'fourDoordarkBrown.webp', 'lightBrown4door.webp', ''),
    features: ['Both sides polish', 'Hinge care included', 'Alignment check'],
  },

  // ═══════════════════════════════════════
  // TABLES
  // ═══════════════════════════════════════
  {
    id: 'table-coffee',
    name: 'Coffee Table Polish',
    category: 'tables',
    price: 1699,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 234,
    serviceLink: '/services?service=table-coffee',
    estimatedTime: '1.5 hrs',
    description: 'Compact coffee table polish service with scratch-resistant and water-repellent finish. Perfect for living room centerpieces with daily use protection.',
    colorVariants: makeColorVariants('/products/table/coffee_table', 'darkwoodenCoffeTable.webp', 'lightBrownCoffeetable.webp', 'whitecofffetable.webp'),
    features: ['Water-repellent finish', 'Ring mark removal', 'Quick-dry formula'],
  },
  {
    id: 'table-center',
    name: 'Center Table Polish',
    category: 'tables',
    price: 2999,
    originalPrice: 3899,
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
    price: 1899,
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
    price: 3599,
    originalPrice: 4799,
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
    price: 3799,
    originalPrice: 4999,
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
    price: 4899,
    originalPrice: 6499,
    rating: 4.8,
    reviewCount: 892,
    badge: 'Popular',
    serviceLink: '/services?service=wardrobe-3door',
    estimatedTime: '4.5 hrs',
    description: 'Extensive 3-door wardrobe restoration with complete interior and exterior polish. Covers all compartments, drawers, and mirror frames if present.',
    colorVariants: makeColorVariants('/products/wardrobe/triple', 'darkbrownWardrobe.webp', 'lightBrownWardrobe.webp', 'whitetripleWardrobe.webp'),
    features: ['All compartments covered', 'Mirror frame polish', 'Drawer runners care'],
  },
  {
    id: 'wardrobe-4door',
    name: '4 Door Wardrobe Polish',
    category: 'wardrobes',
    seaterType: '4-seater',
    price: 6299,
    originalPrice: 8299,
    rating: 4.9,
    reviewCount: 456,
    serviceLink: '/services?service=wardrobe-4door',
    estimatedTime: '5 hrs',
    description: 'Premium 4-door wardrobe polish service for large storage units. Complete inside-outside coverage with special attention to multiple compartments and accessories.',
    colorVariants: makeColorVariants('/products/wardrobe/four', 'darkWoodenfourwardrobe.webp', 'lightBrown4wardrobe.webp', 'white4wardrobe.webp'),
    features: ['Premium finish', 'All accessories polished', 'Odor removal treatment'],
  },
  {
    id: 'wardrobe-single',
    name: 'Single Door Wardrobe Polish',
    category: 'wardrobes',
    price: 2899,
    originalPrice: 3799,
    rating: 4.8,
    reviewCount: 319,
    serviceLink: '/services?service=wardrobe-single',
    estimatedTime: '3 hrs',
    description: 'Compact single-door wardrobe polish perfect for small bedrooms. Includes interior shelves, hanging rod, and complete door panel restoration.',
    colorVariants: makeColorVariants('/products/wardrobe/single', 'darkbrownsinglewardrobe.webp', 'lightBrownsinglewardrobe.webp', 'whitesingleeardrobe.webp'),
    features: ['Space-saving solution', 'Interior shelf polish', 'Quick service'],
  },

  // ═══════════════════════════════════════
  // DINING SETS
  // ═══════════════════════════════════════
  {
    id: 'dining-2seater',
    name: '2 Seater + Bench Dining',
    category: 'dining',
    seaterType: '2-seater',
    price: 3699,
    originalPrice: 4899,
    rating: 4.9,
    reviewCount: 467,
    serviceLink: '/services?service=dining-2seater',
    estimatedTime: '3.5 hrs',
    description: 'Compact 2-seater dining set polish including table and bench. Heat-resistant finish perfect for small apartments and breakfast nooks.',
    colorVariants: makeColorVariants('/products/dining_set/2_seater_bench', 'darkWooden2seaterbench.webp', 'lightBrown2seaterbench.webp', 'white2seaterbench.webp'),
    features: ['Table + bench included', 'Heat-resistant up to 100°C', 'Space-saving design'],
  },
  {
    id: 'dining-4seater',
    name: '4 Seater Dining Set',
    category: 'dining',
    seaterType: '4-seater',
    price: 4299,
    originalPrice: 5699,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=dining-4seater',
    estimatedTime: '4 hrs',
    description: 'Complete 4-seater dining set restoration with table and all 4 chairs. Food-safe, heat-resistant polish ideal for family dining with daily use protection.',
    colorVariants: makeColorVariants('/products/dining_set/4_seater', '4seaterDark.webp', '4seaterlight.webp','4seaterwhite.webp'),
    features: ['Table + 4 chairs', 'Food-safe coating', 'Spill-resistant finish'],
    isBestSeller: true,
  },
  {
    id: 'dining-6seater',
    name: '6 Seater Dining Set',
    category: 'dining',
    seaterType: '6-seater',
    price: 5899,
    originalPrice: 7799,
    rating: 4.9,
    reviewCount: 789,
    badge: 'Popular',
    serviceLink: '/services?service=dining-6seater',
    estimatedTime: '5 hrs',
    description: 'Premium 6-seater dining set polish covering large table and all 6 chairs. Perfect for family gatherings with enhanced durability and elegant finish.',
    colorVariants: makeColorVariants('/products/dining_set/6_seater', 'darkbrown6seater.webp', 'lightbrown6seater.webp', 'white6seater.webp'),
    features: ['Table + 6 chairs', 'Extended warranty', 'Chair cushion area care'],
  },
  {
    id: 'dining-8seater',
    name: '8 Seater Dining Set',
    category: 'dining',
    price: 7499,
    originalPrice: 9999,
    rating: 4.8,
    reviewCount: 234,
    serviceLink: '/services?service=dining-8seater',
    estimatedTime: '7 hrs',
    description: 'Luxury 8-seater dining set polish for grand dining tables and 8 chairs. Commercial-grade finish suitable for large families and entertaining.',
    colorVariants: makeColorVariants('/products/dining_set/8_seater', '8seaterdar.webp', '8seaterlightBrown.webp', '8seaterWite.webp'),
    features: ['Table + 8 chairs', 'Commercial-grade finish', 'Scratch & heat resistant'],
  },
  {
    id: 'dining-single-chair',
    name: 'Dining Chair Polish',
    category: 'dining',
    seaterType: '1-seater',
    price: 799,
    originalPrice: 1099,
    rating: 4.7,
    reviewCount: 189,
    serviceLink: '/services?service=dining-single-chair',
    estimatedTime: '1 hr',
    description: 'Individual dining chair polish service for replacement or additional chairs. Includes backrest, seat frame, and leg polishing.',
    colorVariants: makeColorVariants('/products/dining_set/chair', 'darkbrownChair.webp', 'lightBrown.webp', 'whiteChair.webp'),
    features: ['Per chair pricing', 'Quick 1-hour service', 'Bulk discount available'],
  },

  // ═══════════════════════════════════════
  // CABINETS
  // ═══════════════════════════════════════
  
  {
    id: 'cabinet-double',
    name: 'Double Door Cabinet',
    category: 'cabinets',
    seaterType: '2-seater',
    price: 3299,
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
    price: 4299,
    originalPrice: 5799,
    rating: 4.8,
    reviewCount: 310,
    serviceLink: '/services?service=cabinet-crockery',
    estimatedTime: '3.5 hrs',
    description: 'Specialized crockery cabinet polish with glass-safe, non-toxic materials. Includes display shelf polishing and glass panel frame care.',
    colorVariants: makeColorVariants('/products/cabinet/crokery', 'darkBrownCrokery.webp', 'lightBrown_crokery.webp', 'whiteCrokery.webp'),
    features: ['Glass-safe materials', 'Display shelf care', 'Non-toxic formula'],
  },

  // ═══════════════════════════════════════
  // SHELVES
  // ═══════════════════════════════════════
  {
    id: 'shelf-wooden',
    name: 'Wooden Shelf Polish',
    category: 'shelves',
    price: 1499,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 234,
    serviceLink: '/services?service=shelf-wooden',
    estimatedTime: '1 hr',
    description: 'Multi-tier wooden shelf polish for wall-mounted and freestanding units. Covers all tiers, brackets, and support structures with dust-resistant finish.',
    colorVariants: makeColorVariants('/products/shelves', 'brownShelve.webp', 'ligtBrownShelve.webp', 'whiteShelve.webp'),
    features: ['All tiers covered', 'Dust-resistant coating', 'Bracket care included'],
  },

  // ═══════════════════════════════════════
  // TV UNITS
  // ═══════════════════════════════════════
 
  {
    id: 'tv-cabinet',
    name: 'Cabinet TV Unit Polish',
    category: 'tv-units',
    price: 4199,
    originalPrice: 5599,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=tv-cabinet',
    estimatedTime: '4 hrs',
    description: 'Complete TV cabinet unit polish covering main panel, side cabinets, drawers, and shelves. Cable management area included with dust-resistant finish.',
    colorVariants: makeColorVariants('/products/tvUnitPolish/cabinets', 'darkWoodentvunit.webp', 'LightBrowntvUnit.webp', 'whiteTvunit.webp'),
    features: ['Cable area care', 'Drawer polish included', 'Dust-resistant coating'],
    isBestSeller: true,
  },
  {
    id: 'tv-wall-mounted',
    name: 'Wall Mounted TV Unit Polish',
    category: 'tv-units',
    price: 5299,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 211,
    serviceLink: '/services?service=tv-wall-mounted',
    estimatedTime: '5 hrs',
    description: 'Specialized wall-mounted TV unit polish with floating shelf care. Includes bracket area cleaning and complete panel restoration.',
    colorVariants: makeColorVariants('/products/tvUnitPolish/WallMounted', 'darkBrownWallMounted.webp', '', 'whitewalllmountedTvunit.webp'),
    features: ['Floating shelf care', 'Bracket area cleaning', 'Modern finish'],
  },

  // ═══════════════════════════════════════
  // JHULA
  // ═══════════════════════════════════════
  {
    id: 'jhula',
    name: 'Jhula Polish',
    category: 'jhula',
    seaterType: '1-seater',
    price: 3499,
    originalPrice: 4699,
    rating: 4.8,
    reviewCount: 465,
    serviceLink: '/services?service=jhula',
    estimatedTime: '3 hrs',
    description: 'Traditional jhula (swing) polish service covering seat, backrest, armrests, chains, and decorative carvings. Weather-resistant finish for outdoor use.',
    colorVariants: makeColorVariants('/products/jhula', 'darkWoodenJhula.webp', 'lightBrownJhula.webp', 'whiteJhula.webp'),
    features: ['Weather-resistant finish', 'Chain lubrication', 'Carving detail care'],
  },
  
  // ═══════════════════════════════════════
  // MANDIR
  // ═══════════════════════════════════════
  {
    id: 'mandir-standard',
    name: 'Mandir Polish',
    category: 'mandir',
    price: 3499,
    originalPrice: 4699,
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
  // ANTIQUE
  // ═══════════════════════════════════════
  {
    id: 'antique-small',
    name: 'Small Antique Furniture',
    category: 'antique',
    price: 2799,
    originalPrice: 3699,
    rating: 4.9,
    reviewCount: 156,
    serviceLink: '/services?service=antique-small',
    estimatedTime: '4 hrs',
    description: 'Delicate antique restoration for small pieces with heritage value. Expert carving preservation, age-appropriate finish, and traditional techniques for heirloom furniture.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/ivory_smallAntique.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/ivory_smallAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Heritage preservation', 'Traditional techniques', 'Age-appropriate finish'],
  },
  {
    id: 'antique-medium',
    name: 'Medium Antique Furniture',
    category: 'antique',
    price: 3799,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 189,
    badge: 'Popular',
    serviceLink: '/services?service=antique-medium',
    estimatedTime: '5 hrs',
    description: 'Medium-sized antique furniture restoration with expert craftsmanship. Includes structural assessment, wood repair, and period-correct finishing techniques.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/mediumAntique.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/mediumAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Structural assessment', 'Wood repair included', 'Period-correct finish'],
  },
  {
    id: 'antique-large',
    name: 'Large Antique Furniture',
    category: 'antique',
    price: 4999,
    originalPrice: 6699,
    rating: 4.8,
    reviewCount: 111,
    serviceLink: '/services?service=antique-large',
    estimatedTime: '6 hrs',
    description: 'Comprehensive large antique furniture restoration for valuable pieces. Complete structural care, ornate carving restoration, and museum-quality finishing.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/largeAntiqueImage.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/mediumAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Museum-quality finish', 'Ornate carving restoration', 'Complete structural care'],
  },

  // ═══════════════════════════════════════
  // WOOD POLISH — 8 Types
  // ═══════════════════════════════════════
  {
    id: 'french-polish',
    name: 'French Polish',
    category: 'wood-polish',
    price: 1699,
    originalPrice: 2299,
    rating: 4.9,
    reviewCount: 1245,
    badge: 'Best Seller',
    serviceLink: '/services?service=french-polish',
    estimatedTime: '3-4 hrs',
    description: 'Traditional French polish creates a warm, deep lustre using shellac dissolved in alcohol. Applied by hand in thin layers, it gives antique and classic furniture an unmatched richness and depth that no spray finish can replicate.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/french_polishh.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/french_polishh.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/french_polishh.webp' },
    ],
    features: ['Hand-applied shellac', 'Deep lustre finish', 'Antique restoration'],
    isBestSeller: true,
  },
  {
    id: 'lamination-polish',
    name: 'Lamination Polish',
    category: 'wood-polish',
    price: 1999,
    originalPrice: 2699,
    rating: 4.8,
    reviewCount: 876,
    badge: 'Popular',
    serviceLink: '/services?service=lamination-polish',
    estimatedTime: '2-3 hrs',
    description: 'Lamination polish adds a durable protective film over the wood surface, shielding it from scratches, moisture, and UV damage. Ideal for high-traffic furniture like dining tables, desks, and kitchen cabinets.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/lamination_polishing.webp' },
    ],
    features: ['UV protection', 'Moisture barrier', 'High-traffic durability'],
  },
  {
    id: 'melamine-polish',
    name: 'Melamine Polish',
    category: 'wood-polish',
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 2134,
    badge: 'Best Seller',
    serviceLink: '/services?service=melamine-polish',
    estimatedTime: '3-4 hrs',
    description: 'Melamine polish is the most popular choice for Indian homes. It provides a smooth, natural-looking finish that is highly durable, water-resistant, and affordable. Perfect for all types of wooden furniture from beds to wardrobes.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/melamine_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/melamine_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/melamine_polish.webp' },
    ],
    features: ['Most popular choice', 'Water-resistant', 'Budget-friendly'],
    isBestSeller: true,
  },
  {
    id: 'monocoat-polish',
    name: 'Rubio Monocoat',
    category: 'wood-polish',
    price: 2799,
    originalPrice: 3699,
    rating: 4.8,
    reviewCount: 534,
    serviceLink: '/services?service=monocoat-polish',
    estimatedTime: '2-3 hrs',
    description: 'Rubio Monocoat is a single-coat, plant-based oil finish that bonds with the top fibres of the wood. It enhances the natural grain, is zero-VOC, and gives a modern matte look. Best for premium and designer furniture.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/morgon_monocoat.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/morgon_monocoat.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/morgon_monocoat.webp' },
    ],
    features: ['Zero VOC', 'Plant-based oil', 'Single-coat application'],
  },
  {
    id: 'pu-polish-wood',
    name: 'PU Polish',
    category: 'wood-polish',
    price: 3299,
    originalPrice: 4399,
    rating: 4.9,
    reviewCount: 1567,
    badge: 'Popular',
    serviceLink: '/services?service=pu-polish-wood',
    estimatedTime: '4-5 hrs',
    description: 'PU (Polyurethane) polish is the premium choice for a mirror-like glossy or elegant matte finish. Extremely durable, water and heat resistant, and provides a factory-quality sheen. Ideal for new furniture and luxury interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/pu_polish.webp' },
    ],
    features: ['Factory-quality sheen', 'Heat & water resistant', 'Premium durability'],
  },
  {
    id: 'water-pu-polish',
    name: 'Water PU Polish',
    category: 'wood-polish',
    price: 2999,
    originalPrice: 3999,
    rating: 4.8,
    reviewCount: 678,
    serviceLink: '/services?service=water-pu-polish',
    estimatedTime: '3-4 hrs',
    description: 'Water-based PU polish is an eco-friendly alternative to solvent-based PU. It has low odour, dries faster, and retains the natural colour of wood without yellowing over time. Perfect for homes with children and pets.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/water_pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/water_pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/water_pu_polish.webp' },
    ],
    features: ['Eco-friendly', 'Low odour', 'Child & pet safe'],
  },
  {
    id: 'wax-polish',
    name: 'Wax Polish',
    category: 'wood-polish',
    price: 1499,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 456,
    serviceLink: '/services?service=wax-polish',
    estimatedTime: '2-3 hrs',
    description: 'Natural wax polish gives a soft, warm sheen with a buttery smooth feel. Made from beeswax and carnauba wax, it nourishes the wood and provides a classic, understated finish that is easy to maintain.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/wax_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wax_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/wax_polish.webp' },
    ],
    features: ['Natural beeswax', 'Easy maintenance', 'Soft warm sheen'],
  },
  {
    id: 'wooden-polish',
    name: 'Wooden Polish',
    category: 'wood-polish',
    price: 1599,
    originalPrice: 2099,
    rating: 4.8,
    reviewCount: 987,
    badge: 'Popular',
    serviceLink: '/services?service=wooden-polish',
    estimatedTime: '2-3 hrs',
    description: 'Classic wooden polish restores the natural beauty and grain of the wood with a clear protective coat. Suitable for all types of wooden furniture — from teak to sheesham, plywood to solid hardwood.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/wooden_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wooden_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/wooden_polish.webp' },
    ],
    features: ['All wood types', 'Clear protective coat', 'Natural grain enhancement'],
  },

  // ═══════════════════════════════════════
  // PU POLISH — Premium Finishes
  // ═══════════════════════════════════════
  {
    id: 'pu-polish-gloss',
    name: 'PU Gloss Polish',
    category: 'pu-polish',
    price: 3799,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 789,
    badge: 'Best Seller',
    serviceLink: '/services?service=pu-polish-gloss',
    estimatedTime: '5-6 hrs',
    description: 'High-gloss PU polish delivers a mirror-like, piano-finish sheen. Multi-coat application with buffing between layers creates depth and brilliance. Ideal for wardrobes, doors, and premium furniture.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/glass_pu_polish.webp' },
    ],
    features: ['Mirror-like finish', 'Multi-coat buffing', 'Piano-finish quality'],
    isBestSeller: true,
  },
  {
    id: 'pu-polish-matt',
    name: 'PU Matt Finish Polish',
    category: 'pu-polish',
    price: 3599,
    originalPrice: 4799,
    rating: 4.8,
    reviewCount: 567,
    badge: 'Popular',
    serviceLink: '/services?service=pu-polish-matt',
    estimatedTime: '4-5 hrs',
    description: 'PU matt finish offers a sleek, contemporary look with a smooth, non-reflective surface. Hides fingerprints and minor scratches. Perfect for modern, minimalist interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/pu_matt_polish.webp' },
    ],
    features: ['Modern matte look', 'Fingerprint resistant', 'Minimalist aesthetic'],
  },
  {
    id: 'pu-polish-satin',
    name: 'PU Satin Finish',
    category: 'pu-polish',
    price: 3999,
    originalPrice: 5299,
    rating: 4.9,
    reviewCount: 432,
    serviceLink: '/services?service=pu-polish-satin',
    estimatedTime: '5 hrs',
    description: 'PU satin finish strikes the perfect balance between glossy and matte — a soft, elegant sheen that looks premium without being flashy. Best pick for bedrooms and living rooms.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/pu_satin_finish.webp' },
    ],
    features: ['Elegant soft sheen', 'Premium feel', 'Balanced finish'],
  },

  // ═══════════════════════════════════════
  // DECO PAINT — Designer Finishes
  // ═══════════════════════════════════════
  {
    id: 'deco-paint-solid',
    name: 'Solid Colour Deco Paint',
    category: 'deco-paint',
    price: 3299,
    originalPrice: 4399,
    rating: 4.8,
    reviewCount: 345,
    badge: 'Popular',
    serviceLink: '/services?service=deco-paint-solid',
    estimatedTime: '4-5 hrs',
    description: 'Solid colour deco paint transforms your furniture with a smooth, opaque, factory-style finish in any colour. Perfect for giving old furniture a completely new look. Available in white, grey, pastels, and bold colours.',
    colorVariants: [
      { id: 'dark-brown', label: 'Charcoal', hex: '#3C3C3C', image: '/products/deco_paint/solid_decoPaint.webp' },
      { id: 'light-brown', label: 'Pastel', hex: '#E8D5B7', image: '/products/deco_paint/solid_decoPaint.webp' },
      { id: 'white', label: 'White', hex: '#FFFFFF', image: '/products/deco_paint/solid_decoPaint.webp' },
    ],
    features: ['Any colour choice', 'Factory-style finish', 'Complete transformation'],
  },
  {
    id: 'deco-paint-texture',
    name: 'Texture Deco Paint',
    category: 'deco-paint',
    price: 3899,
    originalPrice: 5199,
    rating: 4.8,
    reviewCount: 234,
    serviceLink: '/services?service=deco-paint-texture',
    estimatedTime: '5-6 hrs',
    description: 'Textured deco paint adds dimension and character to your furniture with patterns like stone, linen, and wood grain effects. A showstopper finish for statement pieces.',
    colorVariants: [
      { id: 'dark-brown', label: 'Stone', hex: '#8B7355', image: '/products/deco_paint/texture_deco_paint.webp' },
      { id: 'light-brown', label: 'Linen', hex: '#D4C5A9', image: '/products/deco_paint/texture_deco_paint.webp' },
      { id: 'white', label: 'Marble', hex: '#F0EDE8', image: '/products/deco_paint/texture_deco_paint.webp' },
    ],
    features: ['Unique textures', 'Statement finish', '3D dimensional effect'],
  },
  {
    id: 'deco-paint-designer',
    name: 'Designer Deco Paint',
    category: 'deco-paint',
    price: 4999,
    originalPrice: 6699,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Premium',
    serviceLink: '/services?service=deco-paint-designer',
    estimatedTime: '6-8 hrs',
    description: 'Our premium designer deco paint service includes custom hand-painted motifs, ombre effects, metallic accents, and designer patterns. Perfect for luxury homes and bespoke furniture makeovers.',
    colorVariants: [
      { id: 'dark-brown', label: 'Metallic', hex: '#B8860B', image: '/products/deco_paint/designer_deco_paint.webp' },
      { id: 'light-brown', label: 'Ombre', hex: '#C4956A', image: '/products/deco_paint/designer_deco_paint.webp' },
      { id: 'white', label: 'Pearl', hex: '#F5F0E8', image: '/products/deco_paint/designer_deco_paint.webp' },
    ],
    features: ['Hand-painted motifs', 'Metallic accents', 'Bespoke design'],
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
