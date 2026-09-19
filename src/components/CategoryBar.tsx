import React from 'react';
import { categories, products } from '../data/productCatalog';

const categoryImages: Record<string, string> = {
  sofas: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',
  beds: '/products/bed/king_bed/darkWoodenKing.webp',
  'dining-tables': '/products/dining_set/6_seater/darkbrown6seater.webp',
  'wardrobes-storage': '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
  'tv-units': '/products/tvUnitPolish/WallMounted/darkBrownWallMounted.webp',
  doors: '/products/doors/single_door/darkWoodensingle.webp',
  'floor-polish': '/assets/Door-polish.webp',
  mandir: '/products/mandir/darkBrownmandir.webp',
  jhula: '/products/jhula/darkWoodenJhula.webp',
  consultation: '/products/consultation/visiting.png',
  'color-refresh': '/products/consultation/visiting2.png',
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
            src={categoryImages[cat.id] || '/assets/Antique Restoration.jpg'}
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
