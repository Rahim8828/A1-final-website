import React from 'react';
import { SelectedService } from '../types';

interface BookingSummaryItemProps {
  service: SelectedService;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

/**
 * BookingSummaryItem Component
 * Displays individual service item in the booking summary
 * Requirements: 6.5 - Display service with thumbnail, name, option, quantity selector, price, and remove button
 */
const BookingSummaryItem: React.FC<BookingSummaryItemProps> = ({
  service,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleDecrease = () => {
    if (service.quantity > 1) {
      onUpdateQuantity(service.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (service.quantity < 10) {
      onUpdateQuantity(service.quantity + 1);
    }
  };

  return (
    <li className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200 ease-out rounded-lg px-2">
      {/* Service Thumbnail - Responsive sizing */}
      <img
        src={service.image}
        alt={`${service.serviceName} - ${service.optionName}`}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0 shadow-sm"
      />

      {/* Service Details - Responsive text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
          {service.serviceName}
        </h3>
        <p className="text-xs text-gray-600 truncate">{service.optionName}</p>
        <p className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5 sm:mt-1" aria-label={`Price ${service.price} rupees`}>
          ₹{service.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Selector - Touch-friendly buttons (min 44x44px on mobile) */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0" role="group" aria-label={`Quantity selector for ${service.serviceName}`}>
        <button
          onClick={handleDecrease}
          disabled={service.quantity <= 1}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-600 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-out min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          aria-label={`Decrease quantity of ${service.serviceName}, current quantity ${service.quantity}`}
          type="button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <span className="text-xs sm:text-sm font-semibold text-gray-900 w-5 sm:w-6 text-center" aria-label={`Quantity: ${service.quantity}`}>
          {service.quantity}
        </span>
        <button
          onClick={handleIncrease}
          disabled={service.quantity >= 10}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-600 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-out min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          aria-label={`Increase quantity of ${service.serviceName}, current quantity ${service.quantity}`}
          type="button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Remove Button - Touch-friendly (min 44x44px on mobile) */}
      <button
        onClick={onRemove}
        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 active:scale-90 transition-all duration-150 ease-out flex-shrink-0 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        aria-label={`Remove ${service.serviceName} ${service.optionName} from booking`}
        type="button"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
};

export default BookingSummaryItem;
