import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white shadow-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
            Join 50,000+ Happy Customers
          </h2>
          <p className="text-amber-100 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            Trusted by thousands of homes and offices across Mumbai for quality furniture polishing services
          </p>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg font-bold hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 min-h-[44px] text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs mx-auto"
          >
            Book Your Service Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
