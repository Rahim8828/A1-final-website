import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import { getCanonicalURL } from '../utils/canonicalURL';
import { FaShoppingBag } from 'react-icons/fa';

const Products: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Products | A1 Furniture Polish"
        description="Browse our range of furniture care products and accessories"
        canonical={getCanonicalURL('/products')}
      />
      
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FaShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Products Coming Soon
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              We're working on bringing you the best furniture care products and accessories. 
              Stay tuned for updates!
            </p>
            
            <div className="space-y-3 sm:space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Premium wood polish products</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Furniture care accessories</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Professional cleaning tools</p>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <a
                href="tel:+918828709945"
                className="inline-block bg-amber-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-sm sm:text-base"
              >
                Contact Us for Product Inquiries
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
