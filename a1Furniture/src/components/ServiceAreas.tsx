import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';

interface ServiceLocation {
  name: string;
  link: string;
  image: string;
  serviceCount: number;
}

const locations: ServiceLocation[] = [
  { name: 'Andheri', link: '/furniture-polish-andheri', image: '/products/logo_symbols/andheri.webp', serviceCount: 12 },
  { name: 'Bandra', link: '/furniture-polish-bandra', image: '/products/logo_symbols/bandra.webp', serviceCount: 10 },
  { name: 'Goregaon', link: '/goregaon-furniture-polish', image: '/products/logo_symbols/goregaon.webp', serviceCount: 14 },
  { name: 'Jogeshwari', link: '/furniture-polish-jogeshwari', image: '/products/logo_symbols/jogeshwari.webp', serviceCount: 11 },
  { name: 'Malad', link: '/furniture-polish-malad', image: '/products/logo_symbols/malad.webp', serviceCount: 9 },
  { name: 'Dadar', link: '/dadar', image: '/products/logo_symbols/dadar.webp', serviceCount: 8 },
  { name: 'Mira Road', link: '/furniture-polish-mira-road', image: '/products/logo_symbols/mira_road.webp', serviceCount: 7 },
];

const ServiceAreas: React.FC = () => {
  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6">

        {/* Card Container — matches Wooden Street store locator design */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* Hero Image / Video Banner */}
          <div className="relative h-44 sm:h-56 md:h-72 overflow-hidden">
            <video
              src="/media/banner_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Brand Badge (top-right) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-xs font-bold text-gray-700 tracking-wide">A1 Furniture Polish</span>
            </div>
          </div>

          {/* White Content Section */}
          <div className="px-5 py-8 sm:px-8 md:px-12 md:py-10">

            {/* Counter Header */}
            <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
              <span className="text-5xl md:text-6xl font-black text-gray-900 leading-none">
                47<sup className="text-2xl md:text-3xl font-extrabold text-amber-600 relative -top-3">+</sup>
              </span>
              <div className="text-left">
                <p className="text-base md:text-lg font-bold text-gray-800 leading-tight">Service Locations</p>
                <p className="text-sm text-gray-400">Across Mumbai</p>
              </div>
            </div>

            {/* Location Circles — scrollable on mobile, centered grid on desktop */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-6 sm:gap-x-7 md:gap-x-10 mb-8 md:mb-10">
              {locations.map((loc) => (
                <Link
                  key={loc.name}
                  to={loc.link}
                  className="flex flex-col items-center group w-[70px] sm:w-[80px] md:w-[90px]"
                >
                  {/* Circle with landmark image */}
                  <div className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] md:w-[84px] md:h-[84px] rounded-full overflow-hidden border-[3px] border-amber-200/80 group-hover:border-amber-500 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-105">
                    <img
                      src={loc.image}
                      alt={`Furniture Polish in ${loc.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* City Name */}
                  <span className="mt-2 text-xs md:text-sm font-bold text-gray-800 text-center group-hover:text-amber-700 transition-colors">
                    {loc.name}
                  </span>
                  {/* Service Count */}
                  <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                    {loc.serviceCount} Services
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons — Grid structure with centered icons and text */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <a
                href="tel:+918828709945"
                className="flex flex-col items-center justify-center gap-2 py-4 sm:py-5 px-3 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm md:text-base font-bold text-center leading-tight">
                  Visit Polish<br />Centre
                </span>
              </a>
              <a
                href="https://wa.me/918828709945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 py-4 sm:py-5 px-3 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm md:text-base font-bold text-center leading-tight">
                  Get Free<br />Quote
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
