
import React, { useState } from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { FaArrowRight } from 'react-icons/fa';
import BookingModal from '../components/BookingModal';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const sofaService = {
  id: 'sofa-fabric-change',
  name: 'Sofa Fabric Change',
  image: '../assets/Sofa_Fabric_Change_20.webp',
  categories: [
    {
      name: 'Sofa & Miscellaneous',
      options: [
        { name: '1 seater Sofa', price: 3499 },
        { name: '2 seater Sofa', price: 4499 },
        { name: '3 seater Sofa', price: 5999 },
        { name: 'L shape Sofa', price: 8999 },
        { name: 'Sofa cumbed', price: 5999 },
        { name: 'Bed side 3 side', price: 3499 },
      ],
    },
    {
      name: 'Recliner Sofa',
      options: [
        { name: 'Recliner 1 seater', price: 4499 },
        { name: 'Recliner 2 seater', price: 7499 },
        { name: 'Recliner 3 seater', price: 9999 },
        { name: 'Recliner 3-1-1 seater', price: 13999 },
      ],
    },
    {
      name: 'Office Chair Repair',
      options: [
        { name: 'Steel Finish Base', price: 749 },
        { name: 'Black Finish Base', price: 619 },
        { name: 'Nylon Base', price: 549 },
        { name: 'Plastic Base', price: 549 },
        { name: 'Wheel Replacement', price: 449 },
        { name: 'Hydraulic Replacement', price: 599 },
      ],
    },
  ],
  features: [
    'Sofa Fabric Change: Labor costs only, fabric cost separate',
    'High-quality fabric in a variety of colors and textures',
    'Professional removal of old fabric and installation of new fabric',
    'Office Chair Repair: On-site repair with high-quality spare parts',
    'Warranty on all replaced chair parts',
    'Free consultation at your home',
  ],
};

const SofaFabricChange: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<{ cat: number; opt: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({ variant: '' });

  const allOptions = sofaService.categories.flatMap(c => c.options);
  const minPrice = Math.min(...allOptions.map(o => o.price));

  const handleOptionChange = (catIndex: number, optIndex: number) => {
    setSelectedOption({ cat: catIndex, opt: optIndex });
    setFormErrors({ variant: '' });
  };

  const openBookingModal = () => {
    if (!selectedOption) {
      setFormErrors({ variant: 'Please select a service option.' });
      return;
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  const selectedService = selectedOption
    ? sofaService.categories[selectedOption.cat].options[selectedOption.opt]
    : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: sofaService.name,
    provider: {
      '@type': 'LocalBusiness',
      name: 'A1 Furniture Polish',
      telephone: '+918828709945',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jogeshwari West',
        addressLocality: 'Mumbai',
        addressRegion: 'MH',
        postalCode: '400102',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Mumbai',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sofa Fabric Change Services',
      itemListElement: sofaService.categories.map(cat => ({
        '@type': 'OfferCatalog',
        name: cat.name,
        itemListElement: cat.options.map(opt => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: opt.name,
          },
          price: opt.price,
          priceCurrency: 'INR',
        })),
      })),
    },
  };

  return (
    <>
      <SEOHead
        title="Sofa Fabric Change Services in Mumbai | A1 Furniture Polish"
        description="Professional sofa fabric change services in Mumbai. Get the best prices for 1, 2, 3-seater, L-shape sofas, recliners, and more."
        keywords={'sofa fabric change, sofa repair, furniture upholstery, mumbai, recliner fabric change'}
        canonical={getCanonicalURL('/sofa-fabric-change')}
      />
      <JsonLd data={serviceSchema} />

      <div className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <OptimizedImage 
              src={sofaService.image} 
              alt="Sofa Fabric Change" 
              width={1920} 
              height={1080} 
              className="w-full h-48 md:h-64" 
              sizes={COMMON_SIZES.fullWidth}
              objectFit="cover"
            />
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{sofaService.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-0 mt-2 mb-6">
                <span className="text-xl md:text-2xl font-bold text-amber-600">Starts at ₹{minPrice}</span>
                <span className="sm:ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs md:text-sm font-semibold rounded-full w-fit">
                  20% Lower than competitors
                </span>
              </div>

              {sofaService.categories.map((category, catIndex) => (
                <div key={catIndex} className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {category.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        onClick={() => handleOptionChange(catIndex, optIndex)}
                        className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedOption?.cat === catIndex && selectedOption?.opt === optIndex
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-400'
                        }`}>
                        <p className="text-sm md:text-base font-semibold text-gray-800">{option.name}</p>
                        <p className="text-base md:text-lg font-bold text-gray-900">₹{option.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {formErrors.variant && <p className="text-red-500 text-sm mt-2">{formErrors.variant}</p>}

              <div className="mt-6 md:mt-8">
                <h4 className="text-base md:text-xl font-semibold text-gray-800 mb-3">What's Included</h4>
                <ul className="text-gray-600 space-y-2">
                  {sofaService.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <button
                  onClick={openBookingModal}
                  className="w-full sm:w-auto bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-base md:text-lg inline-flex items-center justify-center transition-transform duration-200 hover:scale-105"
                >
                  Book Now <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {isModalOpen && selectedService && (
          <BookingModal
            service={selectedService.name}
            price={`₹${selectedService.price}`}
            onClose={closeBookingModal}
          />
        )}
      </div>
    </>
  );
};

export default SofaFabricChange;
