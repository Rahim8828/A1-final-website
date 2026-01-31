import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const OurProcess = () => {
  const steps = [
    {
      step: 1,
      title: 'Consultation & Booking',
      description: 'Detailed consultation to understand your needs',
      image: '/assets/consultation-booking.webp',
    },
    {
      step: 2,
      title: 'Select Polish Shade',
      description: 'Choose from 100+ polish shades',
      image: '/assets/select-wood-polish-shade.webp',
    },
    {
      step: 3,
      title: 'Cleaning & Sanding',
      description: 'Meticulous cleaning and surface preparation',
      image: '/assets/Cleaning & Sanding.webp',
    },
    {
      step: 4,
      title: 'Polish Application',
      description: 'Fill gaps and apply premium polish',
      image: '/assets/filling-gaps-polish-application.webp',
    },
    {
      step: 5,
      title: 'Drying & Finishing',
      description: 'Complete drying with final touches',
      image: '/assets/drying-finishing.webp',
    },
    {
      step: 6,
      title: 'Quality Check',
      description: 'Final inspection and payment',
      image: 'https://images.pexels.com/photos/7792815/pexels-photo-7792815.jpeg',
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Process
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Our 6-Step Wood Polishing Process
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            From consultation to final inspection, we ensure a flawless finish for your valuable furniture
          </p>
        </div>
        
        {/* Horizontal Scrollable on Mobile, Grid on Desktop */}
        <div className="relative">
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((item) => (
              <div 
                key={item.step} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-7">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {steps.map((item, index) => (
                <div 
                  key={item.step} 
                  className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  style={{ width: '280px' }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {item.step}
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-orange-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-10 md:mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm md:text-base">6-Step Quality Process Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
