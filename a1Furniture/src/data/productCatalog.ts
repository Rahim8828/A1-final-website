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
    image: '/products/sofa/1_seater_sofa/darkBrownSingleSofa.png',
    hoverImage: '/products/sofa/1_seater_sofa/lightBrownsingleSofa.png',
    startingPrice: 1449,
    serviceLink: '/services?service=sofa-1seater',
  },
  {
    id: 'sofa-2-seater',
    name: '2 Seater Sofa',
    category: 'sofas',
    image: '/products/sofa/2_seater/darkBrownDouble.png',
    hoverImage: '/products/sofa/2_seater/lightBrownDoubleSofa.png',
    startingPrice: 1999,
    serviceLink: '/services?service=sofa-2seater',
  },
  {
    id: 'sofa-3-seater',
    name: '3 Seater Sofa',
    category: 'sofas',
    image: '/products/sofa/3_seater/doubleTripleSeat.png',
    hoverImage: '/products/sofa/3_seater/lightbrowntriple.png',
    startingPrice: 2949,
    serviceLink: '/services?service=sofa-3seater',
  },

  // Beds
  {
    id: 'bed-single',
    name: 'Single Bed',
    category: 'beds',
    image: '/products/bed/single_bed/darkBrownsingle.png',
    hoverImage: '/products/bed/single_bed/lightbrownSingle.png',
    startingPrice: 2449,
    serviceLink: '/services?service=bed-single',
  },
  {
    id: 'bed-double',
    name: 'Double Bed',
    category: 'beds',
    image: '/products/bed/double_bed/darkbrowdouble.png',
    hoverImage: '/products/bed/double_bed/lightbrownDouble.png',
    startingPrice: 3449,
    serviceLink: '/services?service=bed-queen',
  },
  {
    id: 'bed-king',
    name: 'King Size Bed',
    category: 'beds',
    image: '/products/bed/king_bed/darkbrownKing.png',
    hoverImage: '/products/bed/king_bed/lightBrownKing.png',
    startingPrice: 3799,
    serviceLink: '/services?service=bed-king',
  },

  // Dining
  {
    id: 'dining-4-seater',
    name: '4 Seater Dining',
    category: 'dining-tables',
    image: '/products/dining_set/4_seater/darkbrowb_4.png',
    hoverImage: '/products/dining_set/4_seater/redbrown_4.png',
    startingPrice: 3949,
    serviceLink: '/services?service=dining-set-polish',
  },
  {
    id: 'dining-6-seater',
    name: '6 Seater Dining',
    category: 'dining-tables',
    image: '/products/dining_set/6_seater/darkbrowm_table.png',
    hoverImage: '/products/dining_set/6_seater/whiteseater_6.png',
    startingPrice: 5449,
    serviceLink: '/services?service=dining-set-polish',
  },
  {
    id: 'dining-chair',
    name: 'Dining Chair',
    category: 'dining-tables',
    image: '/products/dining_set/chair/darkBrown_singleChair.png',
    hoverImage: '/products/dining_set/chair/lightBrown_single.png',
    startingPrice: 799,
    serviceLink: '/services?service=dining-set-polish',
  },

  // Tables
  {
    id: 'table-coffee',
    name: 'Coffee Table',
    category: 'dining-tables',
    image: '/products/table/coffee_table/woodenCoffeTable.png',
    hoverImage: '/products/table/coffee_table/whiteCoffeTAble.png',
    startingPrice: 1549,
    serviceLink: '/services?service=table-coffee',
  },
  {
    id: 'table-center',
    name: 'Center Table',
    category: 'dining-tables',
    image: '/products/table/center_table/darkWoodenTable.png',
    hoverImage: '/products/table/center_table/lightBrowntable.png',
    startingPrice: 2899,
    serviceLink: '/services?service=table-center',
  },
  {
    id: 'table-study',
    name: 'Study Table',
    category: 'dining-tables',
    image: '/products/table/study_table/darkWoodenTAble.png',
    hoverImage: '/products/table/study_table/lightBrownStudy.png',
    startingPrice: 1999,
    serviceLink: '/services?service=table-polish',
  },

  // Wardrobes
  {
    id: 'wardrobe-single',
    name: 'Single Door Wardrobe',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/single/darkSingle.png',
    hoverImage: '/products/wardrobe/single/lightBrownWardrobe.png',
    startingPrice: 2449,
    serviceLink: '/services?service=wardrobe-polish',
  },
  {
    id: 'wardrobe-double',
    name: 'Double Door Wardrobe',
    category: 'wardrobes-storage',
    image: '/products/wardrobe/double/darkBrown.png',
    hoverImage: '/products/wardrobe/double/lightBrown.png',
    startingPrice: 3899,
    serviceLink: '/services?service=wardrobe-polish',
  },

  // Shelves
  {
    id: 'shelf-wooden',
    name: 'Wooden Shelf',
    category: 'shelves',
    image: '/products/shelves/brownShelve.png',
    hoverImage: '/products/shelves/ligt_brown_shelve.png',
    startingPrice: 1299,
    serviceLink: '/services?service=wooden-shelf-polish',
  },

  // TV Units
  {
    id: 'tv-solid-wood',
    name: 'Solid Wood TV Unit',
    category: 'tv-units',
    image: '/products/tvUnitPolish/solidWood/darkBrown_solidwood.png',
    hoverImage: '/products/tvUnitPolish/Modular/darkBrownModular.png',
    startingPrice: 2999,
    serviceLink: '/services?service=tv-unit-polish',
  },

  // Doors
  {
    id: 'door-single',
    name: 'Single Door',
    category: 'doors',
    image: '/products/doors/single_door/darkBrownDoor.png',
    hoverImage: '/products/doors/single_door/whiteBrownDoor.png',
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
    image: '/products/pu_polish/glass_pu_polish.png',
    hoverImage: '/products/pu_polish/glass_pu_polish.png',
    startingPrice: 3499,
    serviceLink: '/services/pu-polish-gloss',
  },
  {
    id: 'pu-polish-matt',
    name: 'PU Matt Finish Polish',
    category: 'pu-polish',
    image: '/products/pu_polish/pu_matt_polish.png',
    hoverImage: '/products/pu_polish/pu_matt_polish.png',
    startingPrice: 3299,
    serviceLink: '/services/pu-polish-matt',
  },
  {
    id: 'pu-polish-satin',
    name: 'PU Satin Finish',
    category: 'pu-polish',
    image: '/products/pu_polish/pu_satin_finish.png',
    hoverImage: '/products/pu_polish/pu_satin_finish.png',
    startingPrice: 3699,
    serviceLink: '/services/pu-polish-satin',
  },

  // Deco Paint
  {
    id: 'deco-paint-solid',
    name: 'Solid Colour Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/solid_decoPaint.png',
    hoverImage: '/products/deco_paint/solid_decoPaint.png',
    startingPrice: 2999,
    serviceLink: '/services/deco-paint-solid',
  },
  {
    id: 'deco-paint-texture',
    name: 'Texture Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/texture_deco_paint.png',
    hoverImage: '/products/deco_paint/texture_deco_paint.png',
    startingPrice: 3499,
    serviceLink: '/services/deco-paint-texture',
  },
  {
    id: 'deco-paint-designer',
    name: 'Designer Deco Paint',
    category: 'deco-paint',
    image: '/products/deco_paint/designer_deco_paint.png',
    hoverImage: '/products/deco_paint/designer_deco_paint.png',
    startingPrice: 4499,
    serviceLink: '/services/deco-paint-designer',
  },

  // Mandir
  {
    id: 'mandir-dark-wood',
    name: 'Dark Wooden Mandir',
    category: 'mandir',
    image: '/products/mandir/darkWoodenMandir.png',
    hoverImage: '/products/mandir/lightBrownMandir.png',
    startingPrice: 3999,
    serviceLink: '/services?service=mandir-polish',
  },
  {
    id: 'mandir-light-brown',
    name: 'Light Brown Mandir',
    category: 'mandir',
    image: '/products/mandir/lightBrownMandir.png',
    hoverImage: '/products/mandir/whiteMandir.png',
    startingPrice: 3999,
    serviceLink: '/services?service=mandir-polish',
  },
  {
    id: 'mandir-white',
    name: 'White Mandir',
    category: 'mandir',
    image: '/products/mandir/whiteMandir.png',
    hoverImage: '/products/mandir/darkWoodenMandir.png',
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
