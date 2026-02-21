import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PromoCard {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  badge?: string;
}

const promoCards: PromoCard[] = [
  {
    image: '/products/front_page_service_products/sofa_polish.webp',
    title: 'Sofa Polish',
    subtitle: 'Starts at ₹1,449',
    link: '/services?service=sofa-polish',
    badge: 'Bestseller',
  },
  {
    image: '/products/front_page_service_products/bed_polish.webp',
    title: 'Bed Polish',
    subtitle: 'Starts at ₹2,449',
    link: '/services?service=bed-polish',
    badge: 'Popular',
  },
  {
    image: '/products/front_page_service_products/pu_polish_front.webp',
    title: 'PU Polish',
    subtitle: 'Starts at ₹270/sqft',
    link: '/wood-polishing-services',
    badge: 'Premium',
  },
  {
    image: '/products/front_page_service_products/deco_paint_front.webp',
    title: 'Deco Paint',
    subtitle: 'Starts at ₹249/sqft',
    link: '/deco-paint-services',
    badge: 'Trending',
  },
];

const PromoBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-orange-50 to-white py-10 md:py-14">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Creative Sale Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-amber-600 font-semibold text-sm tracking-[0.2em] uppercase mb-2">
            Limited Time Offer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            The <span className="text-amber-600 italic">Golden</span> Polish Sale
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-400" />
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600">
              UPTO 50% OFF
            </span>
            <div className="h-px w-12 bg-amber-400" />
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Premium furniture polishing services at unbeatable prices. Expert craftsmen, 6-month warranty, same-day service.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {promoCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Badge */}
              {card.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>
              )}

              {/* Image Container — image fills completely */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Text on image */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-base sm:text-lg md:text-xl drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm font-medium drop-shadow-md">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="p-3 sm:p-4 flex items-center justify-between">
                <span className="text-amber-600 font-semibold text-xs sm:text-sm">
                  Book Now
                </span>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
