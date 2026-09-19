import React, { useState } from 'react';
import { SelectedService } from '../types';
import BookingSummaryItem from './BookingSummaryItem';

interface BookingSummaryProps {
  selectedServices: SelectedService[];
  totalPrice: number;
  onUpdateQuantity: (serviceId: string, optionId: string, quantity: number) => void;
  onRemoveService: (serviceId: string, optionId: string) => void;
  onBookNow: () => void;
  onViewCart?: () => void;
  showDoneButton?: boolean;
}

/**
 * BookingSummary Component
 * Sticky bottom component showing selected services and total
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5 - Display booking summary with collapsible functionality
 */
const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedServices,
  totalPrice,
  onUpdateQuantity,
  onRemoveService,
  onBookNow,
  onViewCart,
  showDoneButton = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Empty state - Requirements 6.5
  if (selectedServices.length === 0) {
    return null; // Don't show anything when empty
  }

  const itemCount = selectedServices.length;
  const itemText = itemCount === 1 ? 'service' : 'services';

  return (
    <aside 
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40 animate-slide-up"
      aria-label="Booking summary"
      role="complementary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Expanded View - Full List */}
        {isExpanded && (
          <div className="max-h-[60vh] overflow-y-auto px-3 sm:px-4 pt-3 sm:pt-4 border-b border-gray-100 animate-slide-down">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Your Booking ({itemCount} {itemText})
              </h2>
              <button
                onClick={toggleExpand}
                className="text-gray-500 hover:text-gray-700 active:scale-95 transition-all duration-200 ease-out min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                aria-label="Collapse booking summary"
                aria-expanded="true"
                type="button"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Service List */}
            <ul className="space-y-0" aria-label="Selected services">
              {selectedServices.map((service) => (
                <BookingSummaryItem
                  key={`${service.serviceId}-${service.optionId}`}
                  service={service}
                  onUpdateQuantity={(quantity) =>
                    onUpdateQuantity(service.serviceId, service.optionId, quantity)
                  }
                  onRemove={() => onRemoveService(service.serviceId, service.optionId)}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Collapsed/Bottom Bar - Always Visible, touch-friendly */}
        <div className="px-4 py-3 pb-16 md:pb-3.5 bg-gradient-to-t from-[#F5EBE0] to-[#FDF8F3] border-t border-[#D2B48C]/30 shadow-inner">
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
            {/* Left Side - Summary Info - Touch-friendly */}
            <button
              onClick={toggleExpand}
              className="flex-1 text-left min-h-[44px] flex items-center rounded-lg hover:bg-white/60 active:bg-white/80 px-2 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
              aria-label={isExpanded ? 'Collapse booking summary' : 'Expand booking summary to view selected services'}
              aria-expanded={isExpanded}
              type="button"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#5D3A1A]/70 uppercase font-medium">
                    {itemCount} {itemText} selected
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#5D3A1A] truncate" aria-label={`Total price ${totalPrice} rupees`}>
                    Total: ₹{totalPrice.toLocaleString()}
                  </p>
                </div>
                {!isExpanded && (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B4513] flex-shrink-0 transition-transform duration-300 ease-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Right Side - Action Buttons */}
            {showDoneButton ? (
              <button
                onClick={onViewCart}
                className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] text-white text-sm sm:text-base font-semibold rounded-xl hover:from-[#8B4513] hover:via-[#A0522D] hover:to-[#CD853F] hover:shadow-xl active:scale-95 transition-all duration-200 ease-out shadow-md flex-shrink-0 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
                aria-label="View cart"
                type="button"
              >
                View Cart →
              </button>
            ) : (
              <button
                onClick={onBookNow}
                className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-[#059669] to-[#047857] text-white text-sm sm:text-base font-semibold rounded-xl hover:from-[#047857] hover:to-[#065f46] hover:shadow-xl active:scale-95 transition-all duration-200 ease-out shadow-md flex-shrink-0 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                aria-label={`Book ${itemCount} ${itemText} via WhatsApp for ${totalPrice} rupees`}
                type="button"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BookingSummary;
