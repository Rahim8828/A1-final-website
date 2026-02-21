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
  return [
    {
      id: 'dark-brown',
      label: 'Dark Brown',
      hex: '#4A2C2A',
      image: `${basePath}/${darkImg}`,
    },
    {
      id: 'light-brown',
      label: 'Light Brown',
      hex: '#C4956A',
      image: `${basePath}/${lightImg}`,
    },
    {
      id: 'white',
      label: 'White',
      hex: '#F5F0E8',
      image: whiteImg ? `${basePath}/${whiteImg}` : `${basePath}/${lightImg}`,
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
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 356,
    badge: 'Best Seller',
    serviceLink: '/services?service=sofa-1seater',
    estimatedTime: '1.5 hrs',
    description: 'Complete wood polish restoration for single-seater sofas. Includes surface preparation, scratch removal, premium polish application, and protective finish.',
    colorVariants: makeColorVariants('/products/sofa/1_seater_sofa', 'darkWooden1seaterSofa.webp', 'lightBrown1seater.webp', 'white1seaterSofa.webp'),
    features: ['6 Months Warranty', 'Premium polish', 'Scratch removal'],
    isBestSeller: true,
  },
  {
    id: 'sofa-2-seater',
    name: '2 Seater Sofa Polish',
    category: 'sofas',
    seaterType: '2-seater',
    price: 1999,
    originalPrice: 2599,
    rating: 4.9,
    reviewCount: 456,
    badge: 'Best Seller',
    serviceLink: '/services?service=sofa-2seater',
    estimatedTime: '2 hrs',
    description: 'Professional polish service for 2-seater sofas and loveseats. Restores natural wood grain and applies durable finish.',
    colorVariants: makeColorVariants('/products/sofa/2_seater', 'darkWoodeb2seatersofa.webp', 'lightBrown2seaterSofa.webp', 'white2seaterSofa.webp'),
    features: ['6 Months Warranty', 'Premium polish', 'Scratch removal'],
    isBestSeller: true,
  },
  {
    id: 'sofa-3-seater',
    name: '3 Seater Sofa Polish',
    category: 'sofas',
    seaterType: '3-seater',
    price: 2949,
    originalPrice: 3799,
    rating: 4.8,
    reviewCount: 678,
    badge: 'Popular',
    serviceLink: '/services?service=sofa-3seater',
    estimatedTime: '2.5 hrs',
    description: 'Full restoration polish for 3-seater sofas with deep cleaning, stain removal, and multi-coat polish application.',
    colorVariants: makeColorVariants('/products/sofa/3_seater', 'darkWooden3seatersofa.webp', 'lightBrown3seaterSofa.webp', 'white3seaterSofa.webp'),
    features: ['6 Months Warranty', 'Deep cleaning', 'Multi-coat polish'],
    isBestSeller: true,
  },


  // ═══════════════════════════════════════
  // BEDS
  // ═══════════════════════════════════════
  {
    id: 'bed-king',
    name: 'King Size Bed Polish',
    category: 'beds',
    seaterType: '2 seater',
    price: 3799,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 284,
    badge: 'Popular',
    serviceLink: '/services?service=bed-king',
    estimatedTime: '4 hrs',
    description: 'Complete wood polish for king size beds with scratch removal and long-lasting protective finish.',
    colorVariants: makeColorVariants('/products/bed/king_bed', 'darkWoodenKing.webp', 'lightBrownKing.webp','whiteKing.webp'),
    features: ['6 Months Warranty', 'Scratch removal', 'Long-lasting finish'],
  },
  {
    id: 'bed-sofacumbed',
    name: 'Sofa Cum Bed Polish',
    category: 'beds',
    price: 4799,
    originalPrice: 5999,
    rating: 4.7,
    reviewCount: 89,
    serviceLink: '/services?service=bed-sofacumbed',
    estimatedTime: '4 hrs',
    description: 'Specialized polish for sofa-cum-bed covering both sofa and bed mechanisms.',
    colorVariants: makeColorVariants('/products/bed/sofa_cum_bed', 'darkBrownSofaCumBed.webp', 'lightBrownSofaCumbed.webp', 'whiteSofaCumbed.webp'),
    features: ['6 Months Warranty', 'Dual coverage', 'Joint care'],
  },
  {
    id: 'bed-bunk',
    name: 'Bunk Bed Polish',
    category: 'beds',
    price: 5799,
    originalPrice: 7499,
    rating: 4.7,
    reviewCount: 100,
    serviceLink: '/services?service=bed-bunk',
    estimatedTime: '5 hrs',
    description: 'Complete polish for bunk beds including upper and lower frames, ladder, and safety rails.',
    colorVariants: makeColorVariants('/products/bed/climbing_bed', 'darkWoodenBunkerBed.webp', 'lightbrownBunkerBed.webp', 'whiteBunkerbed.webp'),
    features: ['6 Months Warranty', 'All levels covered', 'Safety rails included'],
  },
  {
  id: 'bed-queen',
  name: 'Queen Size Bed Polish',
  category: 'beds',
  price: 5799,
  originalPrice: 7499,
  rating: 4.7,
  reviewCount: 100,
  serviceLink: '/services?service=bed-queen',
  estimatedTime: '5 hrs',
  description: 'Complete polishing service for queen size beds, including headboard, footboard, side panels, and base frame for a smooth and premium finish.',
  colorVariants: makeColorVariants('/products/bed/queen_bed', 'darkWoodenQueenSize.webp', 'lightBrownQueen.webp', 'whitequeensize.webp'),
  features: ['6 Months Warranty', 'Headboard & frame covered', 'Premium finish polish'],
},{
  id: 'bed-lshape',
  name: 'L Shape Bed Polish',
  category: 'beds',
  price: 6999,
  originalPrice: 8999,
  rating: 4.8,
  reviewCount: 82,
  serviceLink: '/services?service=bed-lshape',
  estimatedTime: '6 hrs',
  description: 'Complete polishing for L-shape beds including extended frame sections, headboards, side panels, and storage units for a uniform and elegant finish.',
  colorVariants: makeColorVariants('/products/bed/L_shape_bed', 'darkBrown_l_shape_bed.webp', 'lightBrownLShaped.webp', 'whiteLShapeBed.webp'),
  features: ['6 Months Warranty', 'Extended frame covered', 'Storage panels polished'],
},
{
  id: 'bed-single',
  name: 'Single Bed Polish',
  category: 'beds',
  price: 3499,
  originalPrice: 4499,
  rating: 4.6,
  reviewCount: 64,
  serviceLink: '/services?service=bed-single',
  estimatedTime: '3 hrs',
  description: 'Complete polishing for single beds including headboard, footboard, side frames, and base support to restore shine and durability.',
  colorVariants: makeColorVariants('/products/bed/single_bed', 'darkWoodensinglebed.webp', 'lightBrownsinglebed.webp', 'whiteSingleBed.webp'),
  features: ['6 Months Warranty', 'Full frame coverage', 'Smooth protective finish'],
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
    originalPrice: 3199,
    rating: 4.7,
    reviewCount: 523,
    badge: 'Best Seller',
    serviceLink: '/services?service=door-single',
    estimatedTime: '2 hrs',
    description: 'Professional polish for single doors with both sides polishing and frame care.',
    colorVariants: makeColorVariants('/products/doors/single_door', 'darkWoodensingle.webp', 'lightBrownSingleDoor.webp','whitesingleDoor.webp'),
    features: ['Both sides polish', 'Frame included', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'door-2door',
    name: '2 Door Polish',
    category: 'doors',
    seaterType: '2-seater',
    price: 3899,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 789,
    badge: 'Popular',
    serviceLink: '/services?service=door-2door',
    estimatedTime: '3 hrs',
    description: 'Both sides polishing for double doors with frame polishing included.',
    colorVariants: makeColorVariants('/products/doors/double_door', 'darkBrowndoubledoor.webp', 'lightBrownDoubleDoor.webp', 'whiteDoubleDoor.webp'),
    features: ['Both sides polish', 'Frame included', '6 Months Warranty'],
  },
  {
    id: 'door-3door',
    name: '3 Door Polish',
    category: 'doors',
    seaterType: '3-seater',
    price: 4899,
    originalPrice: 6299,
    rating: 4.7,
    reviewCount: 345,
    serviceLink: '/services?service=door-3door',
    estimatedTime: '3.5 hrs',
    description: 'Professional polish for triple doors on both sides.',
    colorVariants: makeColorVariants('/products/doors/triple_doors', 'DarkBrowntripleDoor.webp', 'lightBrowntripleDoor.webp', 'whiteTripledoor.webp'),
    features: ['Both sides polish', 'Frame included', '6 Months Warranty'],
  },
  {
    id: 'door-4door',
    name: '4 Door Polish',
    category: 'doors',
    seaterType: '4-seater',
    price: 5899,
    originalPrice: 7599,
    rating: 4.8,
    reviewCount: 277,
    serviceLink: '/services?service=door-4door',
    estimatedTime: '4 hrs',
    description: 'Complete polish for four doors with both sides and frame polishing.',
    colorVariants: makeColorVariants('/products/doors/four_doors', 'fourDoordarkBrown.webp', 'lightBrown4door.webp', 'lightBrownfourdoors.png'),
    features: ['Both sides polish', 'Frame included', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // TABLES
  // ═══════════════════════════════════════
  {
    id: 'table-coffee',
    name: 'Coffee Table Polish',
    category: 'tables',
    price: 1549,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 234,
    serviceLink: '/services?service=table-coffee',
    estimatedTime: '1.5 hrs',
    description: 'Professional polish for coffee tables with scratch-resistant finish.',
    colorVariants: makeColorVariants('/products/table/coffee_table', 'darkwoodenCoffeTable.webp', 'lightBrownCoffeetable.webp', 'whitecoffetable.webp'),
    features: ['Scratch-resistant', 'Food-safe options', '6 Months Warranty'],
  },
 
  {
    id: 'table-side',
    name: 'Side Table Polish',
    category: 'tables',
    price: 1999,
    originalPrice: 2599,
    rating: 4.8,
    reviewCount: 456,
    serviceLink: '/services?service=table-side',
    estimatedTime: '2 hrs',
    description: 'Professional side table polish with durable finish.',
    colorVariants: makeColorVariants('/products/table/side_table', 'darkBrownSideTable.webp', 'lightBrownsidetable.webp', 'whiteSideTable.webp'),
    features: ['Durable finish', 'Premium brand', '6 Months Warranty'],
  },
  {
    id: 'table-center',
    name: 'Study Table Polish',
    category: 'tables',
    price: 3899,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 310,
    serviceLink: '/services?service=table-study',
    estimatedTime: '3 hrs',
    description: 'Professional center table polish with scratch-resistant finish.',
    colorVariants: makeColorVariants('/products/table/single_table', 'darkSingleWoodentable.webp', 'lightbrowntable.webp','whitesingletable.webp'),
    features: ['Scratch-resistant', 'Premium finish', '6 Months Warranty'],
  },
  {
    id: 'table-study',
    name: 'Study Table Polish',
    category: 'tables',
    price: 3899,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 310,
    serviceLink: '/services?service=table-study',
    estimatedTime: '3 hrs',
    description: 'Professional study table polish with scratch-resistant finish.',
    colorVariants: makeColorVariants('/products/table/study_table', 'darkbrownStdytable.webp', 'lightBrown_study.webp','whiteStudyTable.webp'),
    features: ['Scratch-resistant', 'Premium finish', '6 Months Warranty'],
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
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 678,
    badge: 'Best Seller',
    serviceLink: '/services?service=wardrobe-2door',
    estimatedTime: '3.5 hrs',
    description: 'Inside & outside polishing for 2-door wardrobes with handles & fittings care.',
    colorVariants: makeColorVariants('/products/wardrobe/double', 'darkWoodendoubleWardrobe.webp', 'lightBrowndoublewardrobe.webp','whitedoublewardrobe.webp'),
    features: ['Inside & outside', 'Handle care', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'wardrobe-3door',
    name: '3 Door Wardrobe Polish',
    category: 'wardrobes',
    seaterType: '3-seater',
    price: 4449,
    originalPrice: 5799,
    rating: 4.8,
    reviewCount: 892,
    badge: 'Popular',
    serviceLink: '/services?service=wardrobe-3door',
    estimatedTime: '4.5 hrs',
    description: 'Complete 3-door wardrobe polish with inside and outside coverage.',
    colorVariants: makeColorVariants('/products/wardrobe/triple', 'darkbrownWardrobe.webp', 'lightBrownWardrobe.webp', 'whitetripleWardrobe.webp'),
    features: ['Inside & outside', 'Handle care', '6 Months Warranty'],
  },
  {
    id: 'wardrobe-4door',
    name: '4 Door Wardrobe Polish',
    category: 'wardrobes',
    seaterType: '4-seater',
    price: 5849,
    originalPrice: 7499,
    rating: 4.9,
    reviewCount: 456,
    serviceLink: '/services?service=wardrobe-4door',
    estimatedTime: '5 hrs',
    description: 'Premium 4-door wardrobe polish with complete inside and outside coverage.',
    colorVariants: makeColorVariants('/products/wardrobe/four', 'darkWoodenfourwardrobe.webp', 'lightBrown4wardrobe.webp', 'white4wardrobe.webp'),
    features: ['Inside & outside', 'Handle care', '6 Months Warranty'],
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
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 467,
    serviceLink: '/services?service=dining-2seater',
    estimatedTime: '3.5 hrs',
    description: 'Complete dining set polish for 2-seater table with bench.',
    colorVariants: makeColorVariants('/products/dining_set/2_seater_bench', 'darkWooden2seaterbench.webp', 'lightBrown2seaterbench.webp', 'white2seaterbench.webp'),
    features: ['Table + bench', 'Heat resistant', '6 Months Warranty'],
  },
  {
    id: 'dining-4seater',
    name: '4 Seater Dining Set',
    category: 'dining',
    seaterType: '4-seater',
    price: 3899,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=dining-4seater',
    estimatedTime: '4 hrs',
    description: 'Complete 4-seater dining set polish including table and all 4 chairs.',
    colorVariants: makeColorVariants('/products/dining_set/4_seater', '4seaterDark.webp', '4seaterlight.webp','4seaterwhite.webp'),
    features: ['Table + 4 chairs', 'Heat resistant', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'dining-6seater',
    name: '6 Seater Dining Set',
    category: 'dining',
    seaterType: '6-seater',
    price: 5399,
    originalPrice: 6999,
    rating: 4.9,
    reviewCount: 789,
    badge: 'Popular',
    serviceLink: '/services?service=dining-6seater',
    estimatedTime: '5 hrs',
    description: 'Complete 6-seater dining set polish for table and all 6 chairs.',
    colorVariants: makeColorVariants('/products/dining_set/6_seater', 'darkbrown6seater.webp', 'lightBrowb6seater.webp', 'white6seater.webp'),
    features: ['Table + 6 chairs', 'Heat resistant', '6 Months Warranty'],
  },
   {
    id: 'dining-8seater',
    name: '8 Seater Dining Set',
    category: 'dining',
    seaterType: '8-seater',
    price: 6399,
    originalPrice: 7999,
    rating: 4.9,
    reviewCount: 789,
    badge: 'Popular',
    serviceLink: '/services?service=dining-6seater',
    estimatedTime: '5 hrs',
    description: 'Complete 8-seater dining set polish for table and all 6 chairs.',
    colorVariants: makeColorVariants('/products/dining_set/8_seater', '8seaterdar.webp', '8seaterlightBrown.webp', '8seaterWite.webp'),
    features: ['Table + 6 chairs', 'Heat resistant', '6 Months Warranty'],
  },
 

  // ═══════════════════════════════════════
  // CABINETS
  // ═══════════════════════════════════════
 
  {
    id: 'cabinet-double',
    name: 'Double Door Cabinet',
    category: 'cabinets',
    seaterType: '2 Door',
    price: 2999,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=cabinet-double',
    estimatedTime: '2.5 hrs',
    description: 'Complete polish for double door cabinets inside and outside.',
    colorVariants: makeColorVariants('/products/cabinet/double_cabinet', 'double_drawer.webp', '', 'white_DoubleDoor.webp'),
    features: ['Inside & outside', 'Handle care', '6 Months Warranty'],
    isBestSeller: true,
  },
  
  {
    id: 'cabinet-crockery',
    name: 'Crockery Shelf Polish',
    category: 'cabinets',
    price: 3999,
    originalPrice: 5199,
    rating: 4.8,
    reviewCount: 310,
    serviceLink: '/services?service=cabinet-crockery',
    estimatedTime: '3.5 hrs',
    description: 'Premium crockery shelf polish with glass-safe materials.',
    colorVariants: makeColorVariants('/products/cabinet/crokery', 'darkBrownCrokery.webp', 'lightBrown_crokery.webp', 'whiteCrokery.webp'),
    features: ['Glass-safe', 'Inside & outside', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // SHELVES
  // ═══════════════════════════════════════
  {
    id: 'shelf-wooden',
    name: 'Wooden Shelf Polish',
    category: 'shelves',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviewCount: 234,
    serviceLink: '/services?service=wooden-shelf-polish',
    estimatedTime: '1 hr',
    description: 'Professional wooden shelf polish service.',
    colorVariants: makeColorVariants('/products/shelves', 'brownShelve.webp', 'ligt_brown_shelve.webp', 'lightWhite_shelve.webp'),
    features: ['Premium finish', 'Post-service cleaning', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // TV UNITS
  // ═══════════════════════════════════════
  {
    id: 'tv-unit-cabinet',
    name: 'Tv Cabinet Unit Polish',
    category: 'tv-units',
    price: 2899,
    originalPrice: 3799,
    rating: 4.8,
    reviewCount: 345,
    serviceLink: '/services?service=tv-small',
    estimatedTime: '3 hrs',
    description: 'Professional polishing services for Cabinet of Tv Polish',
    colorVariants: makeColorVariants('/products/tvUnitPolish/cabinets', 'darkWoodentvunit.webp', 'lightBrowntvUnit.webp', 'whiteTvunit.webp'),
    features: ['Premium finish', '6 Months Warranty', 'Post-service cleaning'],
  },
  {
    id: 'tv-unit-WallMounted',
    name: 'WallMounted units for TV',
    category: 'tv-units',
    price: 3899,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 567,
    badge: 'Best Seller',
    serviceLink: '/services?service=tv-medium',
    estimatedTime: '4 hrs',
    description: 'Professional polishing of Wall Mounted TV units.',
    colorVariants: makeColorVariants('/products/tvUnitPolish/WallMounted', 'darkBrownWallMounted.webp', '', 'whitewalllmountedTvunit.webp'),
    features: ['Premium finish', '6 Months Warranty', 'Post-service cleaning'],
    isBestSeller: true,
  },


  // ═══════════════════════════════════════
  // JHULA
  // ═══════════════════════════════════════
  {
    id: 'jhula-1seater',
    name: 'Multi-seater Jhula Polish',
    category: 'jhula',
    seaterType: '1-seater',
    price: 1999,
    originalPrice: 2599,
    rating: 4.8,
    reviewCount: 465,
    serviceLink: '/services?service=jhula-1seater',
    estimatedTime: '3 hrs',
    description: ' jhula polish with premium finish.',
    colorVariants: makeColorVariants('/products/jhula', 'darkWoodenJhula.webp', 'lightBrownJhula.webp', 'whiteJhula.webp'),
    features: ['Premium finish', 'All joints covered', '6 Months Warranty'],
  },
  

  // ═══════════════════════════════════════
  // MANDIR
  // ═══════════════════════════════════════
  {
    id: 'mandir-standard',
    name: 'Mandir Polish',
    category: 'mandir',
    price: 2999,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 987,
    badge: 'Best Seller',
    serviceLink: '/services?service=mandir-standard',
    estimatedTime: '3 hrs',
    description: 'Mandir polish with traditional finish and custom color options.',
    colorVariants: makeColorVariants('/products/mandir', 'darkBrownmandir.webp', 'lightBrownMandir.webp', 'whiteMandir.webp'),
    features: ['Traditional finish', 'Carving care', '6 Months Warranty'],
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
    originalPrice: 3199,
    rating: 4.9,
    reviewCount: 156,
    serviceLink: '/services?service=antique-small',
    estimatedTime: '4 hrs',
    description: 'Antique wood restoration with intricate carving preservation.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/ivory_smallAntique.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/ivory_smallAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Carving preservation', 'Traditional finish', '6 Months Warranty'],
  },
  {
    id: 'antique-medium',
    name: 'Medium Antique Furniture',
    category: 'antique',
    price: 2999,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 189,
    badge: 'Popular',
    serviceLink: '/services?service=antique-medium',
    estimatedTime: '5 hrs',
    description: 'Medium antique furniture restoration with expert care.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/mediumAntique.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/mediumAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Carving preservation', 'Traditional finish', '6 Months Warranty'],
  },
  {
    id: 'antique-large',
    name: 'Large Antique Furniture',
    category: 'antique',
    price: 3799,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 111,
    serviceLink: '/services?service=antique-large',
    estimatedTime: '6 hrs',
    description: 'Large antique furniture complete restoration.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/antique/largeAntiqueImage.png' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/antique/mediumAntique.png' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/antique/ivory_smallAntique.png' },
    ],
    features: ['Carving preservation', 'Detail enhancement', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // WOOD POLISH — 8 Types
  // ═══════════════════════════════════════
  {
    id: 'french-polish',
    name: 'French Polish',
    category: 'wood-polish',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 1245,
    badge: 'Best Seller',
    serviceLink: '/services/french-polish',
    estimatedTime: '3-4 hrs',
    description: 'Traditional French polish creates a warm, deep lustre using shellac dissolved in alcohol. Applied by hand in thin layers, it gives antique and classic furniture an unmatched richness and depth that no spray finish can replicate.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/french_polishh.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/french_polishh.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/french_polishh.webp' },
    ],
    features: ['Hand-applied shellac', 'Deep lustre finish', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'lamination-polish',
    name: 'Lamination Polish',
    category: 'wood-polish',
    price: 1799,
    originalPrice: 2399,
    rating: 4.8,
    reviewCount: 876,
    badge: 'Popular',
    serviceLink: '/services/lamination-polish',
    estimatedTime: '2-3 hrs',
    description: 'Lamination polish adds a durable protective film over the wood surface, shielding it from scratches, moisture, and UV damage. Ideal for high-traffic furniture like dining tables, desks, and kitchen cabinets.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/lamination_polishing.webp' },
    ],
    features: ['UV protection', 'Scratch resistant', '6 Months Warranty'],
  },
  {
    id: 'melamine-polish',
    name: 'Melamine Polish',
    category: 'wood-polish',
    price: 1999,
    originalPrice: 2599,
    rating: 4.9,
    reviewCount: 2134,
    badge: 'Best Seller',
    serviceLink: '/services/melamine-polish',
    estimatedTime: '3-4 hrs',
    description: 'Melamine polish is the most popular choice for Indian homes. It provides a smooth, natural-looking finish that is highly durable, water-resistant, and affordable. Perfect for all types of wooden furniture from beds to wardrobes.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/melamine_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/melamine_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/melamine_polish.webp' },
    ],
    features: ['Most popular', 'Water resistant', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'monocoat-polish',
    name: 'Morgon Monocoat',
    category: 'wood-polish',
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 534,
    serviceLink: '/services/monocoat-polish',
    estimatedTime: '2-3 hrs',
    description: 'Rubio Monocoat is a single-coat, plant-based oil finish that bonds with the top fibres of the wood. It enhances the natural grain, is zero-VOC, and gives a modern matte look. Best for premium and designer furniture.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/morgon_monocoat.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/morgon_monocoat.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/morgon_monocoat.webp' },
    ],
    features: ['Zero VOC', 'Single coat', '6 Months Warranty'],
  },
  {
    id: 'pu-polish-wood',
    name: 'PU Polish',
    category: 'wood-polish',
    price: 2999,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 1567,
    badge: 'Popular',
    serviceLink: '/services/pu-polish-wood',
    estimatedTime: '4-5 hrs',
    description: 'PU (Polyurethane) polish is the premium choice for a mirror-like glossy or elegant matte finish. Extremely durable, water and heat resistant, and provides a factory-quality sheen. Ideal for new furniture and luxury interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/pu_polish.webp' },
    ],
    features: ['Mirror finish', 'Heat resistant', '6 Months Warranty'],
  },
  {
    id: 'water-pu-polish',
    name: 'Water PU Polish',
    category: 'wood-polish',
    price: 2799,
    originalPrice: 3599,
    rating: 4.8,
    reviewCount: 678,
    serviceLink: '/services/water-pu-polish',
    estimatedTime: '3-4 hrs',
    description: 'Water-based PU polish is an eco-friendly alternative to solvent-based PU. It has low odour, dries faster, and retains the natural colour of wood without yellowing over time. Perfect for homes with children and pets.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/water_pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/water_pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/water_pu_polish.webp' },
    ],
    features: ['Eco-friendly', 'Low odour', '6 Months Warranty'],
  },
  {
    id: 'wax-polish',
    name: 'Wax Polish',
    category: 'wood-polish',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviewCount: 456,
    serviceLink: '/services/wax-polish',
    estimatedTime: '2-3 hrs',
    description: 'Natural wax polish gives a soft, warm sheen with a buttery smooth feel. Made from beeswax and carnauba wax, it nourishes the wood and provides a classic, understated finish that is easy to maintain.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/wax_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wax_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/wax_polish.webp' },
    ],
    features: ['Natural beeswax', 'Easy maintenance', '6 Months Warranty'],
  },
  {
    id: 'wooden-polish',
    name: 'Wooden Polish',
    category: 'wood-polish',
    price: 1399,
    originalPrice: 1799,
    rating: 4.8,
    reviewCount: 987,
    badge: 'Popular',
    serviceLink: '/services/wooden-polish',
    estimatedTime: '2-3 hrs',
    description: 'Classic wooden polish restores the natural beauty and grain of the wood with a clear protective coat. Suitable for all types of wooden furniture — from teak to sheesham, plywood to solid hardwood.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/FloorPoshining/wooden_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/FloorPoshining/wooden_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/FloorPoshining/wooden_polish.webp' },
    ],
    features: ['All wood types', 'Clear protective coat', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // PU POLISH — Premium Finishes
  // ═══════════════════════════════════════
  {
    id: 'pu-polish-gloss',
    name: 'PU Gloss Polish',
    category: 'pu-polish',
    price: 3499,
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 789,
    badge: 'Best Seller',
    serviceLink: '/services/pu-polish-gloss',
    estimatedTime: '5-6 hrs',
    description: 'High-gloss PU polish delivers a mirror-like, piano-finish sheen. Multi-coat application with buffing between layers creates depth and brilliance. Ideal for wardrobes, doors, and premium furniture.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/glass_pu_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/glass_pu_polish.webp' },
    ],
    features: ['Mirror finish', 'Multi-coat buffing', '6 Months Warranty'],
    isBestSeller: true,
  },
  {
    id: 'pu-polish-matt',
    name: 'PU Matt Finish Polish',
    category: 'pu-polish',
    price: 3299,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 567,
    badge: 'Popular',
    serviceLink: '/services/pu-polish-matt',
    estimatedTime: '4-5 hrs',
    description: 'PU matt finish offers a sleek, contemporary look with a smooth, non-reflective surface. Hides fingerprints and minor scratches. Perfect for modern, minimalist interiors.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_matt_polish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/pu_matt_polish.webp' },
    ],
    features: ['Modern matte look', 'Fingerprint resistant', '6 Months Warranty'],
  },
  {
    id: 'pu-polish-satin',
    name: 'PU Satin Finish',
    category: 'pu-polish',
    price: 3699,
    originalPrice: 4799,
    rating: 4.9,
    reviewCount: 432,
    serviceLink: '/services/pu-polish-satin',
    estimatedTime: '5 hrs',
    description: 'PU satin finish strikes the perfect balance between glossy and matte — a soft, elegant sheen that looks premium without being flashy. Best pick for bedrooms and living rooms.',
    colorVariants: [
      { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', image: '/products/pu_polish/pu_satin_finish.webp' },
      { id: 'white', label: 'White', hex: '#F5F0E8', image: '/products/pu_polish/pu_satin_finish.webp' },
    ],
    features: ['Elegant sheen', 'Premium feel', '6 Months Warranty'],
  },

  // ═══════════════════════════════════════
  // DECO PAINT — Designer Finishes
  // ═══════════════════════════════════════
  {
    id: 'deco-paint-solid',
    name: 'Solid Colour Deco Paint',
    category: 'deco-paint',
    price: 2999,
    originalPrice: 3899,
    rating: 4.8,
    reviewCount: 345,
    badge: 'Popular',
    serviceLink: '/services/deco-paint-solid',
    estimatedTime: '4-5 hrs',
    description: 'Solid colour deco paint transforms your furniture with a smooth, opaque, factory-style finish in any colour. Perfect for giving old furniture a completely new look. Available in white, grey, pastels, and bold colours.',
    colorVariants: [
      { id: 'dark-brown', label: 'Charcoal', hex: '#3C3C3C', image: '/products/deco_paint/solid_decoPaint.webp' },
      { id: 'light-brown', label: 'Pastel', hex: '#E8D5B7', image: '/products/deco_paint/solid_decoPaint.webp' },
      { id: 'white', label: 'White', hex: '#FFFFFF', image: '/products/deco_paint/solid_decoPaint.webp' },
    ],
    features: ['Any colour choice', 'Factory finish', '6 Months Warranty'],
  },
  {
    id: 'deco-paint-texture',
    name: 'Texture Deco Paint',
    category: 'deco-paint',
    price: 3499,
    originalPrice: 4499,
    rating: 4.8,
    reviewCount: 234,
    serviceLink: '/services/deco-paint-texture',
    estimatedTime: '5-6 hrs',
    description: 'Textured deco paint adds dimension and character to your furniture with patterns like stone, linen, and wood grain effects. A showstopper finish for statement pieces.',
    colorVariants: [
      { id: 'dark-brown', label: 'Stone', hex: '#8B7355', image: '/products/deco_paint/texture_deco_paint.webp' },
      { id: 'light-brown', label: 'Linen', hex: '#D4C5A9', image: '/products/deco_paint/texture_deco_paint.webp' },
      { id: 'white', label: 'Marble', hex: '#F0EDE8', image: '/products/deco_paint/texture_deco_paint.webp' },
    ],
    features: ['Unique textures', 'Statement finish', '6 Months Warranty'],
  },
  {
    id: 'deco-paint-designer',
    name: 'Designer Deco Paint',
    category: 'deco-paint',
    price: 4499,
    originalPrice: 5799,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Premium',
    serviceLink: '/services/deco-paint-designer',
    estimatedTime: '6-8 hrs',
    description: 'Our premium designer deco paint service includes custom hand-painted motifs, ombre effects, metallic accents, and designer patterns. Perfect for luxury homes and bespoke furniture makeovers.',
    colorVariants: [
      { id: 'dark-brown', label: 'Metallic', hex: '#B8860B', image: '/products/deco_paint/designer_deco_paint.webp' },
      { id: 'light-brown', label: 'Ombre', hex: '#C4956A', image: '/products/deco_paint/designer_deco_paint.webp' },
      { id: 'white', label: 'Pearl', hex: '#F5F0E8', image: '/products/deco_paint/designer_deco_paint.webp' },
    ],
    features: ['Hand-painted', 'Metallic accents', '6 Months Warranty'],
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
