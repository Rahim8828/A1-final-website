// Curated product catalog for the homepage category showcase.
// This catalog is intentionally compact and sales-focused.

export type CategoryTab =
  | 'all'
  | 'sofas'
  | 'beds'
  | 'dining-tables'
  | 'wardrobes-storage'
  | 'doors'
  | 'floor-polish'
  | 'mandir'
  | 'consultation'
  | 'color-refresh';

export interface Product {
  id: string;
  name: string;
  category: CategoryTab;
  image: string;
  hoverImage: string;
  startingPrice: number;
  serviceLink: string;
}

export interface Category {
  id: CategoryTab;
  label: string;
}

export const categories: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'beds', label: 'Beds' },
  { id: 'dining-tables', label: 'Dining & Tables' },
  { id: 'wardrobes-storage', label: 'Wardrobes' },
  { id: 'doors', label: 'Doors' },
  { id: 'mandir', label: 'Mandir' },
  { id: 'floor-polish', label: 'Floor Polish' },
  { id: 'consultation', label: 'Consultation' },
  { id: 'color-refresh', label: 'Colour Change' },
];

export const products: Product[] = [
  {
    id: 'dining-table-premium',
    name: 'Dining Table',
    category: 'dining-tables',
    image: '/products/dining_set/6_seater/darkbrown6seater.webp',
    hoverImage: '/products/dining_set/6_seater/lightBrowb6seater.webp',
    startingPrice: 6499,
    serviceLink: '/services?category=dining',
  },
  {
    id: 'study-table-polish',
    name: 'Study Table',
    category: 'dining-tables',
    image: '/products/table/study_table/darkbrownStdytable.webp',
    hoverImage: '/products/table/study_table/lightBrown_study.webp',
    startingPrice: 4599,
    serviceLink: '/services?category=tables',
  },
  {
    id: 'center-table-polish',
    name: 'Center Table',
    category: 'dining-tables',
    image: '/products/table/single_table/darkSingleWoodentable.webp',
    hoverImage: '/products/table/single_table/lightbrowntable.webp',
    startingPrice: 2449,
    serviceLink: '/services?category=tables',
  },
  {
    id: 'chair-polish',
    name: 'Chair',
    category: 'dining-tables',
    image: '/products/dining_set/chair/darkbrownChair.webp',
    hoverImage: '/products/dining_set/chair/lightBrown.webp',
    startingPrice: 849,
    serviceLink: '/services?category=dining',
  },
  {
    id: 'dining-polish',
    name: 'Dining',
    category: 'dining-tables',
    image: '/products/dining_set/4_seater/4seaterDark.webp',
    hoverImage: '/products/dining_set/4_seater/4seaterlight.webp',
    startingPrice: 1999,
    serviceLink: '/services?category=dining',
  },
  {
    id: 'bench-polish',
    name: 'Bench',
    category: 'dining-tables',
    image: '/products/dining_set/2_seater_bench/darkWooden2seaterbench.webp',
    hoverImage: '/products/dining_set/2_seater_bench/lightBrown2seaterbench.webp',
    startingPrice: 1499,
    serviceLink: '/services?category=dining',
  },
  {
    id: 'bed-queen',
    name: 'Queen Size Bed',
    category: 'beds',
    image: '/products/bed/queen_bed/darkWoodenQueenSize.webp',
    hoverImage: '/products/bed/queen_bed/lightBrownQueen.webp',
    startingPrice: 4500,
    serviceLink: '/services?category=beds',
  },
  {
    id: 'bed-king',
    name: 'King Size Bed',
    category: 'beds',
    image: '/products/bed/king_bed/darkWoodenKing.webp',
    hoverImage: '/products/bed/king_bed/lightBrownKing.webp',
    startingPrice: 5899,
    serviceLink: '/services?category=beds',
  },

  {
    id: 'door-polish-premium',
    name: 'Door Polish',
    category: 'doors',
    image: '/products/doors/single_door/darkWoodensingle.webp',
    hoverImage: '/products/doors/single_door/lightBrownSingleDoor.webp',
    startingPrice: 2999,
    serviceLink: '/services?category=doors',
  },
  {
    id: 'wardrobe-2door',
    name: 'Wardrobe 2 Door',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
    hoverImage: '/products/wardrobe/double/lightBrowndoeublewardrobe.webp',
    startingPrice: 4449,
    serviceLink: '/services?category=wardrobes',
  },
  {
    id: 'wardrobe-3door',
    name: 'Wardrobe 3 Door',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/triple/darkbrownWardrobe.webp',
    hoverImage: '/products/wardrobe/triple/lightBrownWardrobe.webp',
    startingPrice: 5449,
    serviceLink: '/services?category=wardrobes',
  },
  {
    id: 'crockery-shelf',
    name: 'Crockery Shelf',
    category: 'wardrobes-storage',
    image: '/products/cabinet/crokery/darkBrownCrokery.webp',
    hoverImage: '/products/cabinet/crokery/lightBrown_crokery.webp',
    startingPrice: 4499,
    serviceLink: '/services?category=cabinets',
  },
  {
    id: 'mandir-standard',
    name: 'Mandir',
    category: 'mandir',
    image: '/products/mandir/darkBrownmandir.webp',
    hoverImage: '/products/mandir/lightBrownMandir.webp',
    startingPrice: 2499,
    serviceLink: '/services?category=mandir',
  },

  {
    id: 'floor-hand-polish',
    name: 'Floor Polish Hand',
    category: 'floor-polish',
    image: '/products/FloorPoshining/lamination_polishing.webp',
    hoverImage: '/products/FloorPoshining/darkBrownLamination.webp',
    startingPrice: 160,
    serviceLink: '/services?category=floor-polish',
  },
  {
    id: 'floor-machine-polish',
    name: 'Machine Polish',
    category: 'floor-polish',
    image: '/products/FloorPoshining/darkBrownMachinePolish.webp',
    hoverImage: '/products/FloorPoshining/lightBrownMachinePolish.webp',
    startingPrice: 170,
    serviceLink: '/services?category=floor-polish',
  },
  {
    id: 'consultation-booking',
    name: 'Consultation Booking',
    category: 'consultation',
    image: '/products/consultation/visiting.png',
    hoverImage: '/products/consultation/visiting2.png',
    startingPrice: 99,
    serviceLink: '/services?category=consultation',
  },
  {
    id: 'color-change-chair',
    name: 'Chair Colour Change',
    category: 'color-refresh',
    image: '/products/dining_set/chair/darkbrownChair.webp',
    hoverImage: '/products/dining_set/chair/whiteChair.webp',
    startingPrice: 1849,
    serviceLink: '/services?category=color-refresh',
  },
  {
    id: 'color-change-door',
    name: 'Door Colour Change',
    category: 'color-refresh',
    image: '/products/doors/double_door/darkbrowndoubledoor.webp',
    hoverImage: '/products/doors/double_door/whiteDoubleDoor.webp',
    startingPrice: 4500,
    serviceLink: '/services?category=color-refresh',
  },
  {
    id: 'color-change-frame',
    name: 'Frame Colour Change',
    category: 'color-refresh',
    image: '/products/bed/queen_bed/darkWoodenQueenSize.webp',
    hoverImage: '/products/bed/queen_bed/whitequeensize.webp',
    startingPrice: 3899,
    serviceLink: '/services?category=color-refresh',
  },
];

export const getProductsByCategory = (category: CategoryTab): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};
