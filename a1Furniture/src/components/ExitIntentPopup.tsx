import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, Gift } from 'lucide-react';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Only show on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scaleIn">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Wait! Special Offer 🎉
          </h2>
          
          <p className="text-lg text-gray-600 mb-2">
            Get <span className="text-amber-600 font-bold text-2xl">10% OFF</span> on your first service!
          </p>
          
          <p className="text-sm text-gray-500 mb-6">
            Limited time offer for new customers in Mumbai
          </p>

          <div className="space-y-3">
            <a
              href="tel:+918828709945"
              onClick={() => setIsVisible(false)}
              className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold w-full"
            >
              <Phone size={20} />
              <span>Call Now to Claim Offer</span>
            </a>
            
            <a
              href="https://wa.me/918828709945?text=Hi! I want to claim the 10% discount offer"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsVisible(false)}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold w-full"
            >
              <MessageCircle size={20} />
              <span>WhatsApp for Discount</span>
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Use code: <span className="font-mono font-bold text-amber-600">FIRST10</span> when booking
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
