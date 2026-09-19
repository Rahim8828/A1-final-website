import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContact: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a polite helper tooltip after 3 seconds, auto-hide after 5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-[99] flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto mb-1 animate-bounce duration-1000">
          <div className="bg-gray-900 text-white text-xs md:text-sm font-medium py-1.5 px-3 rounded-xl shadow-2xl flex items-center gap-2 border border-gray-700">
            <span>👋 Need a quick quote? Chat with us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close message"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons Container */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Call Button */}
        <a
          href="tel:+918828709945"
          className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Call +91 8828709945"
          title="Call Now"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[2.5]" />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/918828709945?text=Hi!%20I%20am%20interested%20in%20your%20furniture%20polishing%20and%20repair%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7 text-white" />

          {/* Active online notification dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 md:h-3.5 md:w-3.5 bg-emerald-500 border-2 border-white shadow"></span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingContact;

