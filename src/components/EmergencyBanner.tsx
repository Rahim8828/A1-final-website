import React, { useState } from 'react';
import { AlertCircle, X, Phone } from 'lucide-react';

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AlertCircle className="w-4 h-4 flex-shrink-0 hidden sm:block" />
          <p className="text-xs sm:text-sm md:text-base font-semibold truncate">
            🚨 Need Urgent Furniture Polishing? Same-Day Service Available!
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="tel:+918828709945"
            className="hidden md:flex items-center gap-1.5 bg-white text-orange-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm whitespace-nowrap"
          >
            <Phone size={14} />
            <span>Call Now</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
