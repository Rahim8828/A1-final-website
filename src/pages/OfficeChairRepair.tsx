
import React, { useState } from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { FaArrowRight } from 'react-icons/fa';
import BookingModal from '../components/BookingModal';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const repairService = {
  id: 'office-chair-repair',
  name: 'Office Chair Repair',
  image: '/assets/Chair Repair.jpg',
  categories: [
    {
      name: 'Chair Base Replacement',
      options: [
        { name: 'Steel Finish', price: 749 },
        { name: 'Black Finish', price: 619 },
        { name: 'Nylon', price: 549 },
        { name: 'Plastic', price: 549 },
      ],
    },
    {
      name: 'Other Repairs',
      options: [
        { name: 'Wheel Replacement', price: 449 },
        { name: 'Hydraulic Replacement', price: 599 },
      ],
    },
  ],
  features: [
    'On-site repair and service for office chairs.',
    'High-quality spare parts for all major brands.',
    'Experienced technicians for reliable repairs.',
    'Warranty on all replaced parts.',
    'A labour charge of ₹249 is included in all service prices.',
  ],
};

const OfficeChairRepair: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<{ cat: number; opt: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({ variant: '' });

  const allOptions = repairService.categories.flatMap(c => c.options);
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
    ? repairService.categories[selectedOption.cat].options[selectedOption.opt]
    : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: repairService.name,
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
      name: 'Chair Repair Services',
      itemListElement: repairService.categories.map(cat => ({
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
        title="Office Chair Repair Services in Mumbai | A1 Furniture Polish"
        description="Expert office chair repair in Mumbai. We offer base, wheel, and hydraulic replacement with on-site service at competitive prices."
        keywords="office chair repair, chair repair mumbai, chair base replacement, chair wheel replacement, hydraulic replacement, furniture repair"
        canonical={getCanonicalURL('/office-chair-repair')}
      />
      <JsonLd data={serviceSchema} />

      <div className="bg-gray-100 min-h-screen block">
        <main className="container mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <OptimizedImage 
              src={repairService.image} 
              alt={repairService.name} 
              width={1920} 
              height={1080} 
              className="w-full h-48 md:h-64" 
              sizes={COMMON_SIZES.fullWidth}
              objectFit="cover"
            />
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{repairService.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-0 mt-2 mb-6">
                <span className="text-xl md:text-2xl font-bold text-amber-600">Starts at ₹{minPrice}</span>
                <span className="sm:ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs md:text-sm font-semibold rounded-full w-fit">
                  Includes Labour Cost of ₹249
                </span>
              </div>

              {repairService.categories.map((category, catIndex) => (
                <div key={catIndex} className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                  {repairService.features.map((feature, i) => (
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

export default OfficeChairRepair;
