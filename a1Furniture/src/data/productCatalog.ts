// Product catalog for Service by Categories section
// Each product has a primary image and a hover image for the swap effect

export type CategoryTab = 'all' | 'sofas' | 'beds' | 'dining-tables' | 'wardrobes-storage' | 'shelves' | 'tv-units' | 'doors' | 'wood-polish' | 'pu-polish' | 'deco-paint' | 'mandir' | 'antique';

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
  { id: 'sofas', label: 'Sofas' },
  { id: 'beds', label: 'Beds' },
  { id: 'dining-tables', label: 'Dining & Tables' },
  { id: 'wardrobes-storage', label: 'Wardrobes & Storage' },
  { id: 'shelves', label: 'Shelves' },
  { id: 'tv-units', label: 'TV Units' },
  { id: 'doors', label: 'Doors' },
  { id: 'wood-polish', label: 'Wood Polish' },
  { id: 'pu-polish', label: 'PU Polish' },
  { id: 'deco-paint', label: 'Deco Paint' },
  { id: 'mandir', label: 'Mandir' },
  { id: 'antique', label: 'Antique' },
];

export const products: Product[] = [
  // Sofas
  {
    id: 'sofa-1-seater',
    name: '1 Seater Sofa',
    category: 'sofas',
    image: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',
    hoverImage: '/products/sofa/1_seater_sofa/lightBrowns1seater.webp',
    startingPrice: 1449,
    serviceLink: '/services?service=sofa-1seater',
  },
  {
    id: 'sofa-2-seater',
    name: '2 Seater Sofa',
    category: 'sofas',
    image: '/products/sofa/2_seater/darkWoodeb2seatersofa.webp',
    hoverImage: '/products/sofa/2_seater/lightBrown2seaterSofa.webp',
    startingPrice: 1999,
    serviceLink: '/services?service=sofa-2seater',
  },
  {
    id: 'sofa-3-seater',
    name: '3 Seater Sofa',
    category: 'sofas',
    image: '/products/sofa/3_seater/darkWooden3seatersofa.webp',
    hoverImage: '/products/sofa/3_seater/lightBrown3seatersofa.webp',
    startingPrice: 2949,
    serviceLink: '/services?service=sofa-3seater',
  },

  // Beds
  {
    id: 'bed-single',
    name: 'Single Bed',
    category: 'beds',
    image: '/products/bed/single_bed/darkWoodensinglebed.webp',
    hoverImage: '/products/bed/single_bed/lightBrownsinglebed.webp',
    startingPrice: 2449,
    serviceLink: '/services?service=bed-single',
  },
  {
    id: 'bed-double',
    name: 'Double Bed',
    category: 'beds',
    image: '/products/bed/queen_bed/darkWoodenQueenSize.webp',
    hoverImage: '/products/bed/queen_bed/lightBrownQueen.webp',
    startingPrice: 3449,
    serviceLink: '/services?service=bed-queen',
  },
  {
    id: 'bed-king',
    name: 'King Size Bed',
    category: 'beds',
    image: '/products/bed/king_bed/darkWoodenKing.webp',
    hoverImage: '/products/bed/king_bed/lightBrownKing.webp',
    startingPrice: 3799,
    serviceLink: '/services?service=bed-king',
  },

  // Dining
  {
    id: 'dining-4-seater',
    name: '4 Seater Dining',
    category: 'dining-tables',
    image: '/products/dining_set/4_seater/4seaterDark.webp',
    hoverImage: '/products/dining_set/4_seater/4seaterlight.webp',
    startingPrice: 3949,
    serviceLink: '/services?service=dining-set-polish',
  },
  {
    id: 'dining-6-seater',
    name: '6 Seater Dining',
    category: 'dining-tables',
    image: '/products/dining_set/6_seater/darkbrown6seater.webp',
    hoverImage: '/products/dining_set/6_seater/lightBrowb6seater.webp',
    startingPrice: 5449,
    serviceLink: '/services?service=dining-set-polish',
  },
  {
    id: 'dining-chair',
    name: 'Dining Chair',
    category: 'dining-tables',
    image: '/products/dining_set/chair/darkbrownChair.webp',
    hoverImage: '/products/dining_set/chair/lightBrown.webp',
    startingPrice: 799,
    serviceLink: '/services?service=dining-set-polish',
  },

  // Tables
  {
    id: 'table-coffee',
    name: 'Coffee Table',
    category: 'dining-tables',
    image: '/products/table/coffee_table/darkwoodenCoffeTable.webp',
    hoverImage: '/products/table/coffee_table/lightBrownCoffetable.webp',
    startingPrice: 1549,
    serviceLink: '/services?service=table-coffee',
  },
  {
    id: 'table-center',
    name: 'Center Table',
    category: 'dining-tables',
    image: '/products/table/single_table/darkSingleWoodentable.webp',
    hoverImage: '/products/table/single_table/lightbrowntable.webp',
    startingPrice: 2899,
    serviceLink: '/services?service=table-center',
  },
  {
    id: 'table-study',
    name: 'Study Table',
    category: 'dining-tables',
    image: '/products/table/study_table/darkbrownStdytable.webp',
    hoverImage: '/products/table/study_table/lightBrown_study.webp',
    startingPrice: 1999,
    serviceLink: '/services?service=table-polish',
  },

  // Wardrobes
  {
    id: 'wardrobe-single',
    name: 'Single Door Wardrobe',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/single/darkbrownsinglewardrobe.webp',
    hoverImage: '/products/wardrobe/single/lightBrownsinglewardrobe.webp',
    startingPrice: 2449,
    serviceLink: '/services?service=wardrobe-polish',
  },
  {
    id: 'wardrobe-double',
    name: 'Double Door Wardrobe',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
    hoverImage: '/products/wardrobe/double/lightBrowndoeublewardrobe.webp',
    startingPrice: 3899,
    serviceLink: '/services?service=wardrobe-polish',
  },

  // Shelves
  {
    id: 'shelf-wooden',
    name: 'Wooden Shelf',
    category: 'shelves',
    image: '/products/shelves/brownShelve.webp',
    hoverImage: '/products/shelves/lightBrownShelve.webp',
    startingPrice: 1299,
    serviceLink: '/services?service=wooden-shelf-polish',
  },

  // TV Units
  {
    id: 'tv-solid-wood',
    name: 'Solid Wood TV Unit',
    category: 'tv-units',
    image: '/products/tvUnitPolish/cabinets/darkWoodentvunit.webp',
    hoverImage: '/products/tvUnitPolish/cabinets/lightBrowntvUnit.webp',
    startingPrice: 2999,
    serviceLink: '/services?service=tv-unit-polish',
  },

  // Doors
  {
    id: 'door-single',
    name: 'Single Door',
    category: 'doors',
    image: '/products/doors/single_door/darkWoodensingle.webp',
    hoverImage: '/products/doors/single_door/lightBrownSingleDoor.webp',
    startingPrice: 2449,
    serviceLink: '/services?service=door-polish',
  },

  // Wood Polish — 8 Types
  {
    id: 'french-polish',
    name: 'French Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/french_polishh.webp',
    hoverImage: '/products/FloorPoshining/wooden_polish.webp',
    startingPrice: 1499,
    serviceLink: '/services/french-polish',
  },
  {
    id: 'lamination-polish',
    name: 'Lamination Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/lamination_polishing.webp',
    hoverImage: '/products/FloorPoshining/melamine_polish.webp',
    startingPrice: 1799,
    serviceLink: '/services/lamination-polish',
  },
  {
    id: 'melamine-polish',
    name: 'Melamine Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/melamine_polish.webp',
    hoverImage: '/products/FloorPoshining/lamination_polishing.webp',
    startingPrice: 1999,
    serviceLink: '/services/melamine-polish',
  },
  {
    id: 'monocoat-polish',
    name: 'Morgon Monocoat',
    category: 'wood-polish',
    image: '/products/FloorPoshining/morgon_monocoat.webp',
    hoverImage: '/products/FloorPoshining/french_polishh.webp',
    startingPrice: 2499,
    serviceLink: '/services/monocoat-polish',
  },
  {
    id: 'pu-polish-wood',
    name: 'PU Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/pu_polish.webp',
    hoverImage: '/products/FloorPoshining/water_pu_polish.webp',
    startingPrice: 2999,
    serviceLink: '/services/pu-polish-wood',
  },
  {
    id: 'water-pu-polish',
    name: 'Water PU Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/water_pu_polish.webp',
    hoverImage: '/products/FloorPoshining/pu_polish.webp',
    startingPrice: 2799,
    serviceLink: '/services/water-pu-polish',
  },
  {
    id: 'wax-polish',
    name: 'Wax Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/wax_polish.webp',
    hoverImage: '/products/FloorPoshining/wooden_polish.webp',
    startingPrice: 1299,
    serviceLink: '/services/wax-polish',
  },
  {
    id: 'wooden-polish',
    name: 'Wooden Polish',
    category: 'wood-polish',
    image: '/products/FloorPoshining/wooden_polish.webp',
    hoverImage: '/products/FloorPoshining/french_polishh.webp',
    startingPrice: 1399,
    serviceLink: '/services/wooden-polish',
  },

  // PU Polish
  {
    id: 'pu-polish-gloss',
    name: 'PU Gloss Polish',
    category: 'pu-polish',
    image: '/products/pu_polish/glass_pu_polish.webp',
    hoverImage: '/products/pu_polish/glass_pu_polish.webp',
    startingPrice: 3499,
    serviceLink: '/services/pu-polish-gloss',
  },
  {
    id: 'pu-polish-matt',
    name: 'PU Matt Finish Polish',
    category: 'pu-polish',
    image: '/products/pu_polish/pu_matt_polish.webp',
    hoverImage: '/products/pu_polish/pu_matt_polish.webp',
    startingPrice: 3299,
    serviceLink: '/services/pu-polish-matt',
  },
  {
    id: 'pu-polish-satin',
    name: 'PU Satin Finish',
    category: 'pu-polish',
    image: '/products/pu_polish/pu_satin_finish.webp',
    hoverImage: '/products/pu_polish/pu_satin_finish.webp',
    startingPrice: 3699,
    serviceLink: '/services/pu-polish-satin',
  },

  // Deco Paint
  {
    id: 'deco-paint-solid',
    name: 'Solid Colour Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/solid_decoPaint.webp',
    hoverImage: '/products/deco_paint/solid_decoPaint.webp',
    startingPrice: 2999,
    serviceLink: '/services/deco-paint-solid',
  },
  {
    id: 'deco-paint-texture',
    name: 'Texture Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/texture_deco_paint.webp',
    hoverImage: '/products/deco_paint/texture_deco_paint.webp',
    startingPrice: 3499,
    serviceLink: '/services/deco-paint-texture',
  },
  {
    id: 'deco-paint-designer',
    name: 'Designer Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/designer_deco_paint.webp',
    hoverImage: '/products/deco_paint/designer_deco_paint.webp',
    startingPrice: 4499,
    serviceLink: '/services/deco-paint-designer',
  },

  // Mandir
  {
    id: 'mandir-polish',
    name: 'Mandir Polish',
    category: 'mandir',
    image: '/products/mandir/darkBrownmandir.webp',
    hoverImage: '/products/mandir/lightBrownMandir.webp',
    startingPrice: 3999,
    serviceLink: '/services?service=mandir-polish',
  },

  // Antique
  {
    id: 'antique-small',
    name: 'Small Antique Furniture',
    category: 'antique',
    image: '/products/antique/ivory_smallAntique.png',
    hoverImage: '/products/antique/mediumAntique.png',
    startingPrice: 2449,
    serviceLink: '/services?service=antique-polish',
  },
  {
    id: 'antique-medium',
    name: 'Medium Antique Furniture',
    category: 'antique',
    image: '/products/antique/mediumAntique.png',
    hoverImage: '/products/antique/largeAntiqueImage.png',
    startingPrice: 2999,
    serviceLink: '/services?service=antique-polish',
  },
  {
    id: 'antique-large',
    name: 'Large Antique Furniture',
    category: 'antique',
    image: '/products/antique/largeAntiqueImage.png',
    hoverImage: '/products/antique/ivory_smallAntique.png',
    startingPrice: 3799,
    serviceLink: '/services?service=antique-polish',
  },
];

// Get products filtered by category
export const getProductsByCategory = (category: CategoryTab): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};
