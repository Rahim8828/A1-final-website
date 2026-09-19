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
      <div className="max-w-2xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6">

        {/* MOBILE LAYOUT - Vertical with video on top */}
        <div className="md:hidden bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* Hero Image / Video Banner */}
          <div className="relative h-44 sm:h-56 overflow-hidden">
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
          <div className="px-5 py-8 sm:px-8">
            {/* Counter Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-5xl font-black text-gray-900 leading-none">
                47<sup className="text-2xl font-extrabold text-amber-600 relative -top-3">+</sup>
              </span>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 leading-tight">Service Locations</p>
                <p className="text-sm text-gray-400">Across Mumbai</p>
              </div>
            </div>

            {/* Location Circles */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-6 mb-8">
              {locations.map((loc) => (
                <Link
                  key={loc.name}
                  to={loc.link}
                  className="flex flex-col items-center group w-[70px] sm:w-[80px]"
                >
                  <div className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] rounded-full overflow-hidden border-[3px] border-amber-200/80 group-hover:border-amber-500 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-105">
                    <img
                      src={loc.image}
                      alt={`Furniture Polish in ${loc.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-gray-800 text-center group-hover:text-amber-700 transition-colors">
                    {loc.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {loc.serviceCount} Services
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href="tel:+918828709945"
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-bold text-center leading-tight">
                  Visit Polish<br />Centre
                </span>
              </a>
              <a
                href="https://wa.me/918828709945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-bold text-center leading-tight">
                  Get Free<br />Quote
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - Two columns: Locations left, Video right */}
        <div className="hidden md:block bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* LEFT SIDE - Locations */}
            <div className="px-8 py-10 lg:px-12 lg:py-12 flex flex-col justify-center">
              {/* Counter Header */}
              <div className="flex items-center gap-3 mb-8 lg:mb-10">
                <span className="text-5xl lg:text-6xl font-black text-gray-900 leading-none">
                  47<sup className="text-2xl lg:text-3xl font-extrabold text-amber-600 relative -top-3">+</sup>
                </span>
                <div className="text-left">
                  <p className="text-lg lg:text-xl font-bold text-gray-800 leading-tight">Service Locations</p>
                  <p className="text-sm lg:text-base text-gray-400">Across Mumbai</p>
                </div>
              </div>

              {/* Location Circles Grid */}
              <div className="grid grid-cols-4 gap-x-4 gap-y-6 lg:gap-x-6 lg:gap-y-8 mb-8 lg:mb-10">
                {locations.map((loc) => (
                  <Link
                    key={loc.name}
                    to={loc.link}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-[70px] h-[70px] lg:w-[84px] lg:h-[84px] rounded-full overflow-hidden border-[3px] border-amber-200/80 group-hover:border-amber-500 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-105">
                      <img
                        src={loc.image}
                        alt={`Furniture Polish in ${loc.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 text-xs lg:text-sm font-bold text-gray-800 text-center group-hover:text-amber-700 transition-colors">
                      {loc.name}
                    </span>
                    <span className="text-[10px] lg:text-xs text-gray-400 font-medium">
                      {loc.serviceCount} Services
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+918828709945"
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-xs font-bold text-center leading-tight">
                    Visit Polish<br />Centre
                  </span>
                </a>
                <a
                  href="https://wa.me/918828709945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-bold text-center leading-tight">
                    Get Free<br />Quote
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE - Video/Image */}
            <div className="relative h-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
              <video
                src="/media/banner_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/5" />
              {/* Brand Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-bold text-gray-700 tracking-wide">A1 Furniture Polish</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
