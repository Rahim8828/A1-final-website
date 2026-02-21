import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

const services: ServiceItem[] = [
  { id: 'sofa', name: 'Sofa Polish', image: '/products/front_page_service_products/sofa_polish.webp', link: '/services?service=sofa-polish' },
  { id: 'bed', name: 'Bed Polish', image: '/products/front_page_service_products/bed_polish.webp', link: '/services?service=bed-polish' },
  { id: 'wardrobe', name: 'Wardrobe Polish', image: '/products/front_page_service_products/wardrobe_polish.webp', link: '/services?service=wardrobe-polish' },
  { id: 'door', name: 'Door Polish', image: '/products/front_page_service_products/door_polish.webp', link: '/services?service=door-polish' },
  { id: 'dining', name: 'Dining Set Polish', image: '/products/front_page_service_products/dining_set_polish.webp', link: '/services?service=dining-set-polish' },
  { id: 'table', name: 'Table Polish', image: '/products/front_page_service_products/table_polish.webp', link: '/services?service=table-polish' },
  { id: 'crockery', name: 'Crockery Polish', image: '/products/front_page_service_products/crokery_polish.webp', link: '/services?service=cabinet-polish' },
  { id: 'shelf', name: 'Shelve Polish', image: '/products/front_page_service_products/shelve_polish.webp', link: '/services?service=wooden-shelf-polish' },
  { id: 'tv-unit', name: 'TV Polish', image: '/products/front_page_service_products/tv_polish.webp', link: '/services?service=tv-unit-polish' },
  { id: 'jhula', name: 'Jhula Polish', image: '/products/front_page_service_products/jhula_polish.webp', link: '/services?service=jhula-polish' },
  { id: 'pu-polish', name: 'PU Polish', image: '/products/front_page_service_products/pu_polish_front.webp', link: '/wood-polishing-services' },
  { id: 'deco-paint', name: 'Deco Paint', image: '/products/front_page_service_products/deco_paint_front.webp', link: '/deco-paint-services' },
  { id: 'mandir', name: 'Mandir Polish', image: '/products/front_page_service_products/mandir_polish.webp', link: '/services?service=mandir-polish' },
  { id: 'antique', name: 'Antique Polish', image: '/products/front_page_service_products/antique_polish.png', link: '/services?service=antique-carving-furniture' },
];

const PopularServices: React.FC = () => {
  return (
    <section className="pt-4 pb-5 md:py-10 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Popular Services</h2>
            <p className="text-gray-400 text-xs md:text-sm mt-0.5">Shop by category</p>
          </div>
          <Link
            to="/services"
            className="hidden md:flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ===== Mobile: Square Grid (4 columns) ===== */}
        <div className="md:hidden grid grid-cols-4 gap-x-3 gap-y-4">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="flex flex-col items-center group"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group-active:scale-95 transition-transform">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="mt-1.5 text-[11px] font-medium text-gray-700 text-center leading-tight line-clamp-2">
                {service.name}
              </span>
            </Link>
          ))}
        </div>

        {/* ===== Desktop: Circular Grid (7 columns × 2 rows) ===== */}
        <div className="hidden md:grid md:grid-cols-7 gap-x-6 gap-y-8 justify-items-center">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="flex flex-col items-center gap-2.5 group"
            >
              <div className="w-[110px] h-[110px] lg:w-[128px] lg:h-[128px] rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-gray-100 group-hover:border-amber-300">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-amber-700 transition-colors">
                {service.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile: View All Link */}
        <div className="mt-4 text-center md:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold text-sm"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
