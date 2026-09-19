import React from 'react';

interface ServiceSelectionSummaryProps {
  selectedCount: number;
  totalPrice: number;
  onDone: () => void;
  isLoading?: boolean;
}

/**
 * ServiceSelectionSummary Component
 * 
 * Displays a sticky bottom bar showing:
 * - Number of items selected
 * - Total price
 * - Done / View Cart button to proceed to checkout
 * 
 * Styled with Teakwood theme and safe bottom area for mobile and desktop.
 */
const ServiceSelectionSummary: React.FC<ServiceSelectionSummaryProps> = ({
  selectedCount,
  totalPrice,
  onDone,
  isLoading = false,
}) => {
  // Only render if items are selected
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex-shrink-0 bg-gradient-to-t from-[#F5EBE0] to-[#FDF8F3] border-t border-[#D2B48C]/30 px-4 py-3.5 pb-6 md:pb-4 rounded-b-3xl md:rounded-b-2xl shadow-inner z-20">
      <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
        {/* Left Side - Summary */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-xs text-[#5D3A1A]/70 uppercase font-medium tracking-wide">
            {selectedCount} {selectedCount === 1 ? 'service' : 'services'} selected
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#5D3A1A] truncate">
            Total: ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Right Side - Done Button */}
        <button
          onClick={onDone}
          disabled={isLoading}
          className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D]
                     text-white text-sm sm:text-base font-semibold rounded-xl
                     hover:from-[#8B4513] hover:via-[#A0522D] hover:to-[#CD853F]
                     active:scale-[0.98] transition-all duration-200
                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[120px]"
          type="button"
          aria-label="Proceed to cart"
        >
          {isLoading ? 'Loading...' : 'View Cart →'}
        </button>
      </div>
    </div>
  );
};

export default ServiceSelectionSummary;

