import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { servicePageData } from '../data/servicePageData';

const PopularServices: React.FC = () => {
  const navigate = useNavigate();

  // Get top 6 popular services
  const popularServices = servicePageData.slice(0, 6);

  const handleQuickBook = (serviceId: string) => {
    // Navigate to services page with service ID in URL
    navigate(`/services?service=${serviceId}`);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Popular Services
              </h2>
              <p className="text-gray-600">Most booked furniture polishing services</p>
            </div>
            <Link
              to="/services"
              className="hidden md:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {popularServices.map((service) => {
              const minPrice = Math.min(...service.options.map(opt => opt.price));
              
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Service Image */}
                  <div className="relative h-32 md:h-40 overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {service.options[0]?.badge && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        {service.options[0].badge}
                      </div>
                    )}
                  </div>

                  {/* Service Info */}
                  <div className="p-2.5 md:p-3">
                    <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1.5 line-clamp-1">
                      {service.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-gray-900">{service.rating}</span>
                      <span className="text-[10px] text-gray-500">
                        ({service.reviewCount >= 1000 ? `${(service.reviewCount / 1000).toFixed(1)}K` : service.reviewCount})
                      </span>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] text-gray-500">From</p>
                        <p className="text-sm md:text-base font-bold text-gray-900">
                          ₹{minPrice.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleQuickBook(service.id)}
                        className="px-2.5 py-1.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-semibold text-[10px] md:text-xs whitespace-nowrap"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button - Mobile */}
          <div className="mt-6 text-center md:hidden">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularServices;
