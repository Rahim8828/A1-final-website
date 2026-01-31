import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle } from 'lucide-react';

const ServiceAreaCoverage = () => {
  const areas = [
    { name: 'Andheri East', link: null },
    { name: 'Andheri West', link: null },
    { name: 'Bandra', link: null },
    { name: 'Powai', link: null },
    { name: 'Jogeshwari', link: null },
    { name: 'Goregaon', link: '/goregaon-furniture-polish' },
    { name: 'Malad', link: null },
    { name: 'Kandivali', link: null },
    { name: 'Borivali', link: null },
    { name: 'Dahisar', link: null },
    { name: 'Santacruz', link: null },
    { name: 'Vile Parle', link: null },
    { name: 'Juhu', link: null },
    { name: 'Versova', link: null },
    { name: 'Oshiwara', link: null },
    { name: 'Lokhandwala', link: null },
    { name: 'Khar', link: null },
    { name: 'Bandra Kurla Complex', link: null },
    { name: 'Vikhroli', link: null },
    { name: 'Ghatkopar', link: null }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 md:mb-4 gap-2">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Service Areas in Mumbai
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            We provide professional furniture polishing services across Mumbai. Same-day service available in select areas!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
          {areas.map((area, index) => (
            area.link ? (
              <Link
                key={index}
                to={area.link}
                className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-amber-50 group border border-transparent hover:border-amber-200"
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-amber-600 transition-colors" />
                <span className="text-sm md:text-base text-gray-700 font-medium group-hover:text-amber-600 leading-snug transition-colors">{area.name}</span>
              </Link>
            ) : (
              <div 
                key={index}
                className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700 font-medium leading-snug">{area.name}</span>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Don't see your area? <span className="font-semibold">We cover all of Mumbai!</span>
          </p>
          <a
            href="tel:+918828709945"
            className="inline-flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold text-sm md:text-base w-full sm:w-auto"
          >
            <span>Call to Check Availability</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaCoverage;
