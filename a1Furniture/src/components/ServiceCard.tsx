import React from 'react';
import { ServiceData } from '../types';
import OptimizedImage from '../../src/components/OptimizedImage';

interface ServiceCardProps {
  service: ServiceData;
  onViewDetails: (serviceId: string) => void;
  onQuickAdd?: (serviceId: string, optionIndex: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
}) => {
  // Get the starting price (minimum price from options)
  const startingPrice = Math.min(...service.options.map(opt => opt.price));
  
  // Get the number of options
  const optionsCount = service.options.length;

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    onViewDetails(service.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open modal instead of quick add
    onViewDetails(service.id);
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-out overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] border border-gray-100"
      role="listitem"
    >
      {/* Service Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={service.image}
          alt={`${service.name} service`}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          loading="lazy"
        />
      </div>

      {/* Service Content - Responsive padding */}
      <div className="p-2 sm:p-3 md:p-4">
        {/* Service Name - Responsive text size */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
          {service.name}
        </h3>

        {/* Rating and Reviews - Responsive sizing */}
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2" role="group" aria-label={`Rating ${service.rating} out of 5 stars with ${service.reviewCount} reviews`}>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-gray-900" aria-hidden="true">
              {service.rating}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 truncate" aria-hidden="true">
            ({service.reviewCount >= 1000 ? `${(service.reviewCount / 1000).toFixed(1)}K` : service.reviewCount})
          </span>
        </div>

        {/* Starting Price - Responsive sizing */}
        <div className="mb-2 sm:mb-3">
          <p className="text-xs sm:text-sm text-gray-600">Starts at</p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900" aria-label={`Starting price ${startingPrice} rupees`}>
            ₹{startingPrice.toLocaleString()}
          </p>
        </div>

        {/* Features - Hide on smallest screens, show 2-3 based on size */}
        <ul className="hidden sm:flex sm:flex-col space-y-1 sm:space-y-1.5 mb-2 sm:mb-4" aria-label="Service features">
          {service.features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-start gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Options Count - Responsive text */}
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3" aria-label={`${optionsCount} pricing ${optionsCount === 1 ? 'option' : 'options'} available`}>
          {optionsCount} {optionsCount === 1 ? 'option' : 'options'}
        </p>

        {/* Action Buttons - Touch-friendly sizes (min 44x44px) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={handleViewDetails}
            className="flex-1 text-amber-600 font-medium text-xs sm:text-sm hover:text-amber-700 hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 rounded-lg py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center justify-center active:scale-95"
            aria-label={`View details for ${service.name}`}
            type="button"
          >
            View details
          </button>
          <button
            onClick={handleQuickAdd}
            className="px-4 sm:px-6 py-2.5 sm:py-2 bg-amber-600 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-amber-700 hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 min-h-[44px] flex items-center justify-center shadow-sm"
            aria-label={`Add ${service.name} to booking`}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
