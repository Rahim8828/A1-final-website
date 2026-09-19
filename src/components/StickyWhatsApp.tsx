import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const StickyWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show buttons after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip for 3 seconds
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-50 flex flex-col gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-slideInUp">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-2 rounded-lg shadow-2xl text-xs md:text-sm whitespace-nowrap relative">
            <span className="font-semibold">💬 Need help? Contact us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1.5 -right-1.5 bg-white text-green-600 rounded-full p-0.5 hover:bg-gray-100 shadow-md"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-green-500"></div>
          </div>
        </div>
      )}

      {/* Call Button */}
      <a
        href="tel:+918828709945"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        aria-label="Call us"
      >
        {/* Pulse Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping"></span>
        
        {/* Phone Icon */}
        <Phone className="relative w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918828709945?text=Hi! I'm interested in your furniture polishing services."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping"></span>
        
        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-lg" />
        
        {/* Notification Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-red-500 border-2 border-white shadow-lg"></span>
        </span>
      </a>
    </div>
  );
};

export default StickyWhatsApp;
