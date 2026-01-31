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
 * - Done button to proceed to cart
 * 
 * This is a standalone component that can be used independently
 * of ServiceDetailModal, making it resilient to modal changes.
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
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 flex-shrink-0 safe-area-bottom">
      <div className="px-4 py-3 md:py-4 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left Side - Summary */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600">
            {selectedCount} item{selectedCount > 1 ? 's' : ''} added
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
            Total: ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Right Side - Done Button */}
        <button
          onClick={onDone}
          disabled={isLoading}
          className="px-8 py-3 md:py-3.5 bg-amber-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap min-w-[100px]"
          type="button"
          aria-label="Proceed to cart"
        >
          {isLoading ? 'Loading...' : 'Done'}
        </button>
      </div>
    </div>
  );
};

export default ServiceSelectionSummary;
