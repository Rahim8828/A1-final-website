import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white pb-20 md:pb-16">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center p-5 sm:p-6 md:p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl md:rounded-2xl border-2 border-orange-200 shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
            Still have questions? We're here to help!
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <a
              href="tel:+918828709945"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:scale-95 min-h-[44px] text-sm sm:text-base touch-manipulation"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call Us Now
            </a>
            <a
              href="https://wa.me/918828709945"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:scale-95 min-h-[44px] text-sm sm:text-base touch-manipulation"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
