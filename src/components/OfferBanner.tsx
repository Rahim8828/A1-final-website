import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';

const OfferBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white py-2 sm:py-2.5 px-3 sm:px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 animate-bounce hidden sm:block" />
          <p className="text-[11px] sm:text-xs md:text-sm font-bold leading-tight">
            🎉 FIRST BOOKING OFFER: Get 10% OFF | Code: <span className="bg-white text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-bold text-[11px] sm:text-xs">FIRST10</span>
            <span className="hidden md:inline ml-1.5 text-yellow-300">• New Customers!</span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-1.5 p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
          aria-label="Close offer banner"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default OfferBanner;
