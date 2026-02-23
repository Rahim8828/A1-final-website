import React from 'react';
import { categories, products } from '../data/productCatalog';

const categoryImages: Record<string, string> = {
  sofas: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',
  beds: '/products/bed/king_bed/darkWoodenKing.webp',
  'dining-tables': '/products/dining_set/6_seater/darkbrown6seater.webp',
  'wardrobes-storage': '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
  shelves: '/products/shelves/brownShelve.webp',
  'tv-units': '/products/tvUnitPolish/WallMounted/darkBrownWallMounted.webp',
  doors: '/products/doors/single_door/darkWoodensingle.webp',
  'wood-polish': '/products/FloorPoshining/wooden_polish.webp',
  'pu-polish': '/products/pu_polish/glass_pu_polish.webp',
  'deco-paint': '/products/deco_paint/solid_decoPaint.webp',
  mandir: '/products/mandir/darkBrownmandir.webp',
  antique: '/products/antique/largeAntiqueImage.png',
};

const CategoryBar: React.FC = () => (
  <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
    {categories.map((cat) => (
      <button
        key={cat.id}
        className="flex flex-col items-center min-w-[80px] px-2 focus:outline-none"
      >
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-1 overflow-hidden border border-gray-200">
          <img
            src={categoryImages[cat.id] || '/assets/placeholder.webp'}
            alt={cat.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
          {cat.label}
        </span>
      </button>
    ))}
  </div>
);

export default CategoryBar;
