import { Link } from 'react-router-dom';
import { categories } from '../data/productCatalog';

// Category images for the category bar
const categoryImages: Record<string, string> = {
  all: '/products/front_page_service_products/sofa_polish.webp',
  sofas: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',
  beds: '/products/bed/king_bed/darkWoodenKing.webp',
  'dining-tables': '/products/dining_set/6_seater/darkbrown6seater.webp',
  'wardrobes-storage': '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
  'tv-units': '/products/tvUnitPolish/WallMounted/darkBrownWallMounted.webp',
  doors: '/products/doors/single_door/darkWoodensingle.webp',
  'floor-polish': '/products/FloorPoshining/lamination_polishing.webp',
  mandir: '/products/mandir/darkBrownmandir.webp',
  jhula: '/products/jhula/darkWoodenJhula.webp',
  consultation: '/products/consultation/visiting.png',
  'color-refresh': '/products/consultation/visiting2.png',
};

const ServiceCategoryBar = () => {
  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/' : `/services?category=${cat.id}#products`}
              className="flex flex-col items-center min-w-[100px] px-3 focus:outline-none group"
            >
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-2 overflow-hidden border-2 border-gray-200 group-hover:border-amber-400 transition-all duration-200 shadow-sm group-hover:shadow-md">
                <img
                  src={categoryImages[cat.id]}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap group-hover:text-amber-600 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategoryBar;
