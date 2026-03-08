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
    price: 3799,
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
    price: 3449,
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
    price: 2999,
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
  {
    id: 'bed-bunk',
    name: 'Bunk Bed Polish',
    category: 'beds',
    price: 5799,
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
    price: 2449,
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
  {
    id: 'door-2door',
    name: '2 Door Polish',
    category: 'doors',
    seaterType: '2-seater',
    price: 3899,
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
    price: 4899,
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
    price: 5899,
    originalPrice: 8699,
    rating: 4.8,
    reviewCount: 277,
    serviceLink: '/services?service=door-4door',
    estimatedTime: '4 hrs',
    description: 'Comprehensive four-door polish for large wardrobes and storage units. All panels polished inside-out with special attention to hinges, handles, and alignment.',
    colorVariants: makeColorVariants('/products/doors/four_doors', 'fourDoordarkBrown.webp', 'lightBrown4door.webp', 'white4doors.webp'),
    features: ['Both sides polish', 'Hinge care included', 'Alignment check'],
  },

  // ═══════════════════════════════════════
  // TABLES
  // ═══════════════════════════════════════
  {
    id: 'table-coffee',
    name: 'Coffee Table Polish',
    category: 'tables',
    price: 1549,
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
    price: 2899,
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
    price: 3899,
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
    price: 3499,
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
    price: 4449,
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
    price: 5849,
    originalPrice: 8299,
    rating: 4.9,
    reviewCount: 456,
    serviceLink: '/services?service=wardrobe-4door',
    estimatedTime: '5 hrs',
    description: 'Premium 4-door wardrobe polish service for large storage units. Complete inside-outside coverage with special attention to multiple compartments and accessories.',
    colorVariants: makeColorVariants('/products/wardrobe/four', 'darkBrownFourWardrobe.webp', 'lightBrown4Wardrobe.webp', 'white4wardrobe.webp'),
    features: ['Premium finish', 'All accessories polished', 'Odor removal treatment'],
  },
  {
    id: 'wardrobe-single',
    name: 'Single Door Wardrobe Polish',
    category: 'wardrobes',
    price: 2449,
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
    price: 3449,
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
    price: 3899,
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
    price: 5399,
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
    price: 999,
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
    price: 3999,
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
    price: 999,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 234,
    serviceLink: '/services?service=shelf-wooden',
    estimatedTime: '1 hr',
    description: 'Multi-tier wooden shelf polish for wall-mounted and freestanding units. Covers all tiers, brackets, and support structures with dust-resistant finish.',
    colorVariants: makeColorVariants('/products/shelves', 'brownShelve.webp', 'lightBrownShelve.webp', 'whiteShelve.webp'),
    features: ['All tiers covered', 'Dust-resistant coating', 'Bracket care included'],
  },

  // ═══════════════════════════════════════
  // TV UNITS
  // ═══════════════════════════════════════
 
  {
    id: 'tv-cabinet',
    name: 'Cabinet TV Unit Polish',
    category: 'tv-units',
    price: 2899,
    originalPrice: 5599,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=tv-cabinet',
    estimatedTime: '4 hrs',
    description: 'Complete TV cabinet unit polish covering main panel, side cabinets, drawers, and shelves. Cable management area included with dust-resistant finish.',
    colorVariants: makeColorVariants('/products/tvUnitPolish/cabinets', 'darkWoodentvunit.webp', 'lightBrowntvUnit.webp', 'whiteTvunit.webp'),
    features: ['Cable area care', 'Drawer polish included', 'Dust-resistant coating'],
    isBestSeller: true,
  },
  {
    id: 'tv-wall-mounted',
    name: 'Wall Mounted TV Unit Polish',
    category: 'tv-units',
    price: 3899,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 211,
    serviceLink: '/services?service=tv-wall-mounted',
    estimatedTime: '5 hrs',
    description: 'Specialized wall-mounted TV unit polish with floating shelf care. Includes bracket area cleaning and complete panel restoration.',
    colorVariants: makeColorVariants('/products/tvUnitPolish/WallMounted', 'darkBrownWallMounted.webp', 'lightBrownTvMounte.webp', 'whitewalllmountedTvunit.webp'),
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
    price: 1999,
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
    price: 2999,
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
    price: 2449,
    originalPrice: 3699,
    rating: 4.9,
    reviewCount: 156,
    serviceLink: '/services?service=antique-small',
    estimatedTime: '4 hrs',
    description: 'Delicate antique restoration for small pieces with heritage value. Expert carving preservation, age-appropriate finish, and traditional techniques for heirloom furniture.',
    image: '/products/antique/ivory_smallAntique.png',
    features: ['Heritage preservation', 'Traditional techniques', 'Age-appropriate finish'],
  },
  {
    id: 'antique-medium',
    name: 'Medium Antique Furniture',
    category: 'antique',
    price: 2999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 189,
    badge: 'Popular',
    serviceLink: '/services?service=antique-medium',
    estimatedTime: '5 hrs',
    description: 'Medium-sized antique furniture restoration with expert craftsmanship. Includes structural assessment, wood repair, and period-correct finishing techniques.',
    image: '/products/antique/mediumAntique.png',
    features: ['Structural assessment', 'Wood repair included', 'Period-correct finish'],
  },
  {
    id: 'antique-large',
    name: 'Large Antique Furniture',
    category: 'antique',
    price: 3799,
    originalPrice: 6699,
    rating: 4.8,
    reviewCount: 111,
    serviceLink: '/services?service=antique-large',
    estimatedTime: '6 hrs',
    description: 'Comprehensive large antique furniture restoration for valuable pieces. Complete structural care, ornate carving restoration, and museum-quality finishing.',
    image: '/products/antique/largeAntiqueImage.png',
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
    description: 'The gold standard of wood finishing — and one of the rarest crafts still practised in Mumbai. A1\'s French Polish uses pure dewaxed shellac hand-rubbed in 20+ translucent layers with a traditional pad, building a depth and warmth that no spray finish on earth can replicate. Every coat is flatted by hand before the next is applied, creating a finish that glows from within. Why A1? Our craftsmen carry 10+ years of French polishing mastery and deliver this heritage technique at nearly 60% below what Bandra and Juhu studios charge. When to use: Antique furniture, solid wood colonial pieces, display cabinets, and any heirloom where visual richness matters above everyday durability. Ideal on teak, sheesham, walnut, mahogany, and rosewood. Not recommended for kitchens or bathrooms — shellac is sensitive to water and direct heat. We serve three timeless tones: Dark Brown (rich mahogany depth), Light Brown (warm honey oak), and Off White (bleached ivory patina).',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownFrenchPolish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/french_polishh.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteFrenchPolish.webp' },
    ],
    features: ['Pure shellac, 20+ hand-rubbed coats', 'Antique & heirloom restoration specialist', 'Warmth no spray gun can replicate'],
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
    description: 'Armour for your furniture. A1\'s Lamination Polish bonds an industrial-grade protective film directly to the wood surface — shielding against scratches, moisture rings, UV discolouration, and years of daily punishment. Unlike surface polishes that sit on top, our BOPP-grade laminate is applied with HPMC adhesive and hand-trimmed to a seamless flush edge — no peeling corners, no bubbles, no gaps. Why A1? At ₹1,999 you\'re getting a surface treatment that interior studios charge ₹4,500+ for, using the same grade of laminate films. Lifespan: 8–10 years under normal home use. When to use: Best for high-traffic hardworking furniture — kitchen cabinets, children\'s study tables, home office desks, and dining sets that need genuine long-term protection. Best surfaces: MDF, plywood, particle board, and engineered wood. Available in Dark Brown, Light Brown, and Off White to match every interior palette.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownLamination.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteLamination.webp' },
    ],
    features: ['Industrial BOPP-grade laminate film', 'Peel-resistant flush edge finish', '8–10 year surface durability'],
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
    description: 'The most trusted wood finish in Mumbai homes — and A1\'s single most requested service. Melamine (NC Lacquer + Melamine Hardener) is a catalysed spray finish that cures into a hard, smooth, satin-silk film that enhances the wood\'s natural grain without masking it. Our process: sand to 220-grit, apply a wash coat, fill the grain, spray 3–4 catalysed melamine coats, and final-flat with an ultra-fine abrasive pad. Why A1? We use Nippon Paints and Asian Paints melamine systems calibrated for Mumbai\'s monsoon humidity — the finish will not crack in the rains or fade in summer heat. Comparable studio work costs ₹5,000–₹6,000; at ₹2,199, nothing else in this bracket comes close. When to use: New furniture, bedroom sets, wardrobes, beds, and all panel furniture where you want a clean, natural result that holds up for years. Best surfaces: Plywood, MDF, teak, sheesham, and all commercial hardwoods. Available in Dark Brown, Light Brown, and Off White — the three most-used tones in Mumbai interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownMelamine.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/melamine_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteMelamine.webp' },
    ],
    features: ['Nippon & Asian Paints NC melamine system', 'Monsoon & humidity-resistant formula', 'Mumbai\'s most requested wood finish'],
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
    description: 'Rubio Monocoat is not a polish — it is a revolution in wood finishing. This Belgian plant-based oil bonds molecularly with the top wood fibres in a single coat, meaning no film forms on the surface. The wood stays wood — just richer, deeper, and permanently protected. Zero VOC. Zero solvents. Zero yellowing. Ever. It is the finish that global architects specify for flagship hotels and designer residences. Why A1? We are one of the very few certified Rubio Monocoat applicators in Mumbai — correct application requires precise oil dosing and a strict 3-minute working window. Wrong application gives patchy results; correct application gives results that look 10× the price you paid. A premium Andheri interior studio quotes ₹8,000+ for this; at ₹2,799 A1 makes it accessible. When to use: Premium solid wood furniture — walnut dining tables, oak bookshelves, teak bed frames, mango wood sideboards — where you want the piece to look raw, natural, and utterly luxurious. Unique advantage: spot re-coatable years later without sanding the entire piece. Best surfaces: Solid hardwood only — teak, walnut, oak, ash, mango, acacia. Available in Dark Brown, Light Brown, and Off White.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownMorgon.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/morgon_monocoat.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteMorgon.webp' },
    ],
    features: ['Belgian plant-based molecular oil', 'Zero VOC, solvents & yellowing', 'Spot re-coatable — no full sanding needed'],
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
    description: 'PU (Polyurethane) Polish is the toughest, most durable wood finish available — the same system used in furniture factories, and for very good reason. A1\'s process involves catalysed two-component PU sprayed in controlled conditions: primer, grain filler, base coat, and topcoat, each sanded between applications. The result is a hard, chemical-resistant, heat-resistant, water-resistant surface that stays showroom-new for 10–15 years under normal home use. Why A1? We use industrial HVLP spray equipment and purpose-mixed PU catalysts — not brush-applied PU, which gives an uneven result and peels within months. Available in high gloss, satin, or matt sheen on request. At ₹3,299, factory-quality PU typically costs ₹7,000–₹10,000 at premium studios — making A1 an exceptional value proposition. When to use: The ultimate finish for wardrobes, bedroom panels, main doors, TV units, and any furniture where maximum durability and premium aesthetics are both non-negotiable. Best surfaces: Plywood, MDF, HDF, teak, sheesham, and all solid hardwoods. Available in Dark Brown, Light Brown, and Off White — with Off White in high-gloss PU being particularly spectacular.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownPU.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/pu_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whitePU.webp' },
    ],
    features: ['Factory HVLP two-component spray', 'Chemical, heat & water resistant 15+ yrs', 'Gloss, Satin or Matt on request'],
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
    description: 'All the performance of PU polish — none of the harsh chemicals. A1\'s Water-Based PU uses an acrylic-polyurethane emulsion where water is the carrier instead of toxic solvents. The result is crystal-clear, non-yellowing protection that stays true on Off White and light-toned furniture for years — a critical advantage over solvent PU, which notoriously turns white furniture orange within 2–3 years. Why A1? We use Sirca and Sayerlack water-based PU systems — the same brands specified by premium Italian furniture manufacturers. Dry time is just 45 minutes between coats versus 4+ hours for solvent PU, enabling same-day furniture return in most cases. At ₹2,999, studio pricing for equivalent work starts at ₹6,000. When to use: Children\'s bedrooms, nurseries, wardrobes storing fabric, and any light or Off White furniture where non-yellowing is critical. Also ideal for occupied homes where strong chemical odours are disruptive. Best surfaces: All MDF, plywood, and hardwood — particularly powerful on Off White and Light Brown finishes. Available in Dark Brown, Light Brown, and Off White.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownWaterPU.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/water_pu_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteWaterPU.webp' },
    ],
    features: ['Sirca & Sayerlack water-based PU', 'Zero yellowing on Off White & light tones', 'Child, pet & asthma-safe, low VOC'],
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
    description: 'The oldest and most beloved furniture finish in the world — and still unmatched for the feeling it gives. A1\'s Wax Polish uses a precise blend of natural beeswax and Brazilian carnauba wax (the hardest natural wax on earth), hand-buffed with lambswool pads to a luminous sheen that feels like silk and looks like it belongs in a heritage bungalow or a luxury boutique hotel. Unlike film-forming finishes, wax penetrates the wood fibres and nourishes them from within — like a moisturiser for your furniture — making the wood feel genuinely alive rather than coated. Why A1? We apply 3 full coats of wax, letting each cure completely before buffing, producing a depth that a single home-applied tin of wax simply cannot achieve. At ₹1,499, this is our most accessible finish and the most maintenance-friendly of all: a light home re-wax every 6–12 months keeps it perfect indefinitely — no professional re-visit needed. When to use: Solid wood pieces you want to look organically rich — antique-style furniture, rustic dining tables, farmhouse pieces, wooden decor, and any heirloom already carrying a wax finish. Best surfaces: All solid hardwoods — teak, sheesham, oak, walnut, mango wood. Not suited to MDF or kitchen surfaces. Available in Dark Brown (deep antique wax), Light Brown (golden honey wax), and Off White (clear natural wax for light woods).',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrownWaxPolish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wax_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteWaxPolish.webp' },
    ],
    features: ['Beeswax + Brazilian carnauba blend', '3-coat lambswool hand-buff process', 'DIY re-waxable — no professional re-visit'],
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
    description: 'A1\'s Wooden Polish is the everyday hero of wood finishing — the clean, multi-stage NC (Nitrocellulose) lacquer treatment that makes good wood look great, and great wood look extraordinary. Our process goes far beyond a hardware store bottle: thorough sanding, grain filler application, 2–3 coats of premium clear NC lacquer flat-sanded between each coat, and a final ultra-fine abrasive pass for a smooth, satin glow. Why A1? Wooden polish is our most versatile service — perfected across a decade of Mumbai homes, from teak apartments in Andheri to sheesham furniture in Powai and rosewood heirlooms in Bandra. We know exactly how each wood species responds and adjust formulation accordingly. At ₹1,599, this is the best-value professional wood finish in Mumbai, full stop. When to use: Perfect for any wood furniture that has lost its lustre, developed surface scratches, or looks dull and tired. Applicable on almost all furniture types, old and new alike. Best surfaces: Teak, sheesham, rosewood, rubberwood, plywood, and MDF — the full spectrum of Mumbai home furniture. Available in Dark Brown, Light Brown, and Off White — the three most timeless tones for Indian interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/darkBrown-WoodentPolish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wooden_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/FloorPoshining/whiteWoodenPolish.webp' },
    ],
    features: ['NC lacquer multi-stage spray system', 'Grain filler + 3 flatted coats', 'Works on all Mumbai wood species'],
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
    description: 'The showstopper. A1\'s High Gloss PU Polish delivers a mirror-like, piano-finish depth that makes furniture look like precision-engineered art rather than wood. Our process is meticulous: wood sanded to 320-grit, sealed with a PU primer, two base coats of catalysed PU with flatting between each, then two topcoats of high-gloss PU lacquer, machine-buffed through 3 stages of polishing compound to achieve a reflection that rivals automotive paintwork. Why A1? High-gloss PU is uniquely unforgiving — every dust particle, sag, or surface imperfection becomes visible in a mirror surface. We apply in a controlled HVLP spray environment, and our technicians have specifically mastered the flatting-and-buffing stage that separates true glass clarity from an amateur attempt. At ₹3,799, a Juhu or Bandra interior studio quotes ₹12,000–₹15,000 for comparable work. When to use: Wardrobes, bedroom panel headboards, TV units, and main entry doors when making a bold, luxurious statement is the brief. Spectacular on Dark Brown tones where the gloss adds extraordinary depth, and on Off White for a pearl lacquer effect. Best surfaces: MDF and plywood deliver the smoothest results; grain-filling applied for solid wood. Available in Dark Brown, Light Brown, and Off White.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/pu_polish/glass_pu_polish.webp' },
    ],
    features: ['HVLP spray + 3-stage polishing compound buff', 'Automotive-grade mirror clarity', 'Dust-controlled environment application'],
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
    description: 'The architect\'s favourite. A1\'s PU Matt Finish is the choice of designers and architects who know that a restrained, non-reflective surface signals genuine quality. Where high gloss says "look at me," matt says "I don\'t need to." Our matt PU uses a flatting agent calibrated to a precise 10–15% sheen level — smooth as glass to the touch, zero fingerprint visibility, and zero glare under Mumbai\'s bright LED lighting. Why A1? Matt PU is technically harder than gloss — wrong catalyst ratios produce a cloudy, uneven sheen. Our technicians nail the exact formula for Mumbai\'s ambient humidity, delivering a consistent dead-flat, silky surface every time. This finish is our most popular choice among interior designer partners in Bandra, Worli, and Lower Parel. At ₹3,599, it is market-leading value for a professional matt PU result. When to use: Modern, minimalist, Scandinavian, and Japandi interiors. Wardrobes, bedroom panels, wall-mounted cabinets, and any furniture in a room with strong directional LED lighting where gloss would create glare. Best surfaces: MDF and pre-laminated boards give the most consistent dead-flat result. Available in Dark Brown (muted charcoal depth), Light Brown (brushed oak matt), and Off White (linen white matt).',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/pu_polish/pu_matt_polish.webp' },
    ],
    features: ['10–15% calibrated dead-flat sheen', 'Zero fingerprint & zero LED glare', 'Architect & designer preferred finish'],
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
    description: 'The perfect middle — and the finish that interior designers actually use in 70% of luxury projects. A1\'s PU Satin Finish has a refined 30–40% sheen level that catches light softly, gives furniture depth and warmth, and reads as unmistakably premium without being loud about it. It photographs beautifully, looks exceptional under all lighting conditions, and hides everyday wear better than both gloss and matt extremes. Why A1? True, consistent satin sheen requires the right flatting agent concentration and a specific buffing technique — too much abrasion pushes it into gloss; too little leaves it flat. Our technicians execute this precision coating with multi-stage flatting pads and a final 800-grit hand finishing pass that most mass-market finishers skip entirely. At ₹3,999, this is genuinely the best investment for premium furniture finishing in Mumbai. When to use: Bedrooms, living rooms, luxury wardrobes, dining furniture, and any piece where warmth and premium aesthetics must coexist. Our top recommendation for Off White furniture — satin sheen elevates ivory and cream tones into something extraordinary. Best surfaces: Both solid wood and all engineered wood panels. Available in Dark Brown (cognac satin), Light Brown (honey satin), and Off White (ivory cream satin).',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'white', label: 'Off White', hex: '#FAF6EE', image: '/products/pu_polish/pu_satin_finish.webp' },
    ],
    features: ['30–40% calibrated satin sheen', '800-grit final hand finishing pass', 'Top choice for luxury interior projects'],
  },

  // ═══════════════════════════════════════
  // DECO PAINT — Designer Finishes
  // ═══════════════════════════════════════
  {
    id: 'deco-paint-solid',
    name: 'Solid Colour Furniture Paint',
    category: 'deco-paint',
    price: 3299,
    originalPrice: 4399,
    rating: 4.8,
    reviewCount: 345,
    badge: 'Popular',
    serviceLink: '/services?service=deco-paint-solid',
    estimatedTime: '4-5 hrs',
    description: 'The most dramatic single-day furniture transformation you can make. A1\'s Solid Colour Deco Paint service takes any tired, scratched, or outdated wooden piece and delivers a flawless, factory-grade opaque finish in virtually any colour — chalk white, deep charcoal, sage green, dusty rose, navy, terracotta, pastels, or bold primaries. Our process is rigorous: surface sanding to 180-grit, application of a bonding primer formulated for adhesion to existing finishes, followed by 2–3 coats of premium water-based chalk or acrylic paint with flat-sanding between each coat, finished with a clear sealer coat for durability. Why A1? Most painters apply solid paint directly over old surfaces without proper priming — the result peels within weeks. Our 5-step preparation protocol ensures the colour bonds permanently to the substrate, not just sits on top of it. This service is priced at ₹3,299 where interior studios charge ₹8,000–₹12,000 for the same outcome. When to use: When you want to completely change the personality of a piece — an old sheesham wardrobe reborn in Off White, a dark dining table reinvented in sage green, children\'s furniture brightened in cheerful pastels. Also ideal for rental furniture that needs a fresh look without replacement. Best surfaces: Works on all wooden substrates — solid wood, plywood, MDF, and even pre-laminated panels with our adhesion primer. Primary tones served: Dark Brown, Light Brown, and Off White — the three most requested furniture colour tones in Mumbai homes.',
    colorVariants: [
      { id: 'dark-brown', label: 'Charcoal', hex: '#3C3C3C', image: '/products/deco_paint/solid_decoPaint.webp' },
    ],
    features: ['5-step bonding primer preparation', 'Any RAL or NCS colour matched', 'Clear sealer coat for lasting durability'],
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
    description: 'Turn your furniture into a conversation piece. A1\'s Texture Deco Paint service adds tactile, three-dimensional surface character to wooden furniture using specialist textured coatings — stone effect, linen weave, suede microfibre, concrete grey, rough plaster, and weathered wood grain, among others. Unlike flat paint, texture finishes mask surface dents, old scratches, and filler repairs completely, making them ideal for restoring older furniture without full sanding. The texture compound is hand-applied and hand-tooled by our artisans using rollers, brushes, and palette knives to achieve the desired pattern depth, then sealed with a tinted topcoat for colour richness. Why A1? Textured paint application is a skilled trade — an uneven hand produces a patchy, amateur result. Our artisans have applied texture finishes across high-end residences in Worli, Prabhadevi, and Juhu, building a repertoire of techniques that produce consistently professional outcomes. Interior studios bill ₹12,000–₹18,000 for this service; at ₹3,899, A1 is genuinely unmatched value. When to use: Statement sideboards, TV consoles, decorative cabinets, bar units, accent chairs, and feature headboards where flat colour would be too ordinary. Exceptional for pieces in living rooms, lounges, home offices, and dining areas that need visual weight. Best surfaces: MDF and plywood take texture coatings most evenly; applicable on solid wood and particle board with preparation. Primary tones: Dark Brown (warm stone), Light Brown (raw linen), and Off White (plaster white) — all three available on request.',
    colorVariants: [
      { id: 'dark-brown', label: 'Stone', hex: '#8B7355', image: '/products/deco_paint/texture_deco_paint.webp' },
    ],
    features: ['Hand-tooled 3D texture application', 'Masks dents, scratches & old repairs', 'Stone, linen, suede & concrete effects'],
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
    description: 'The pinnacle of furniture artistry — and the service our clients talk about for years. A1\'s Designer Deco Paint is a bespoke, handcrafted finish that elevates furniture from functional object to decorative centrepiece. This is not paint-by-numbers: each piece receives a fully custom treatment designed and executed by our senior artisans, using techniques that include ombré colour gradients (two or three tones blending seamlessly across the surface), metallic leaf accents in gold, silver, bronze, or copper, hand-painted botanical, geometric, or abstract motifs, tortoiseshell and marbling effects, distressed and aged patina treatments reminiscent of European antique furniture, and gilded trim detailing on carved edges and mouldings. The base is prepared to the same standard as our solid colour service, then built up in layers as the custom design is executed in real time — no stencils, no vinyl wraps, no transfers. Why A1? True decorative painting is rare and commands premium rates globally. Our senior artisans have trained in European and Rajasthani decorative traditions and apply that craft to Mumbai homes and commercial spaces. Interior design studios and luxury home decor brands charge ₹20,000–₹40,000 for equivalent bespoke furniture painting; at ₹4,999, A1 makes luxury furniture art accessible to those who appreciate it. When to use: Showcase wardrobes, statement dining tables in open-plan homes, head-of-table feature chairs, mantelpiece consoles, bar cabinets, nursery furniture (hand-painted murals on wardrobes and cots), and any piece that deserves to be noticed and remembered. Also extraordinarily effective for gifting — a hand-painted heirloom piece is a gift unlike anything that can be bought in a store. Best surfaces: All solid wood, MDF, and plywood. Particularly spectacular on carved and turned furniture where gilded detailing follows the three-dimensional form. Primary tones served: Dark Brown (deep cognac with gold metallic), Light Brown (warm honey with bronze leaf), and Off White (ivory pearl with silver or rose gold accents) — or fully custom upon consultation.',
    colorVariants: [
      { id: 'dark-brown', label: 'Metallic', hex: '#B8860B', image: '/products/deco_paint/designer_deco_paint.webp' },
    ],
    features: ['Bespoke hand-painted motifs & ombré gradients', 'Metallic leaf in gold, bronze, silver & copper', 'Senior artisan — trained in European decorative traditions'],
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
