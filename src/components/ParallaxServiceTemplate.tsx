import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle, 
  MessageCircle,
  Home,
  ChevronRight,
  X,
  Info
} from 'lucide-react';
import { PageData } from '../types';
import SEOHead from './SEOHead';
import DraggablePricingModal from './DraggablePricingModal';
import ParallaxSection from './ParallaxSection';

interface ParallaxServiceTemplateProps {
  pageData: PageData;
}

const ParallaxServiceTemplate: React.FC<ParallaxServiceTemplateProps> = ({ pageData }) => {
  const {
    title,
    metaDescription,
    h1,
    canonicalUrl,
    introduction,
    services,
    process,
    locationAreas,
    pricing,
    whyChooseUs,
    faqs,
    relatedServices,
    schema,
    primaryKeyword,
    secondaryKeywords,
    serviceName,
    location,
  } = pageData;

  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEOHead
        title={title}
        description={metaDescription}
        keywords={[primaryKeyword, ...secondaryKeywords].join(', ')}
        canonical={canonicalUrl}
        structuredData={[schema.localBusiness, schema.service]}
        ogTitle={title}
        ogDescription={metaDescription}
        ogImage="/assets/wooden furniture .webp"
      />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-3 border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
              <Home size={16} className="mr-1" />
              Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/services" className="text-gray-600 hover:text-amber-600 transition-colors">
              Services
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-amber-600 font-medium">{serviceName} in {location}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section with Parallax */}
      <ParallaxSection speed={0.5} className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/assets/wooden furniture .webp)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-900/60 to-orange-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div 
              className="flex items-center space-x-2 mb-6"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            >
              <MapPin className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-bold text-2xl">{location}</span>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
              {h1}
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              {introduction.substring(0, 200)}...
            </p>
            
            <div 
              className="flex flex-wrap gap-4 mb-10"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              {['24/7 Available', 'Same-Day Service', 'Free Estimates', 'Expert Craftsmen'].map((badge, i) => (
                <div key={i} className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">{badge}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+918828709945"
                className="flex items-center justify-center space-x-3 bg-amber-500 text-white px-10 py-5 rounded-2xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-lg"
              >
                <Phone size={24} />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/918828709945?text=Hi, I need ${serviceName} service in ${location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-green-500 text-white px-10 py-5 rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-lg"
              >
                <MessageCircle size={24} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Rating Card */}
        <div 
          className="absolute bottom-10 right-10 bg-white p-6 rounded-2xl shadow-2xl hidden lg:block"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9/5</span>
          </div>
          <p className="text-gray-600 font-medium">500+ Happy Customers</p>
        </div>
      </ParallaxSection>

      {/* Transparent Pricing Section with Parallax */}
      <ParallaxSection speed={0.3} className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Affordable {serviceName} services in {location} with no hidden charges
            </p>
          </div>

          {/* Big Pricing Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-amber-200 transform hover:scale-105 transition-all duration-500">
              {/* Starting Price Badge */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white px-12 py-6 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <span className="text-lg font-semibold block mb-2">Starting From</span>
                    <div className="text-6xl font-black">₹{pricing.startingPrice}</div>
                  </div>
                </div>
              </div>

              <div className="mt-20 text-center mb-8">
                <p className="text-2xl text-gray-600 font-semibold">
                  Price Range: <span className="text-amber-600">{pricing.priceRange}</span>
                </p>
              </div>

              {/* Pricing Factors with Draggable Modals */}
              <div className="border-t-4 border-amber-100 pt-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Pricing Factors:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pricing.factors.map((factor, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveModal(index)}
                      className="group relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                        <span className="text-lg font-semibold text-gray-800 text-left group-hover:text-amber-600 transition-colors">
                          {factor}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info className="w-5 h-5 text-amber-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-12 text-center">
                <a
                  href="tel:+918828709945"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-6 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-xl"
                >
                  <Phone size={24} />
                  <span>Call for Exact Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Draggable Modals for Pricing Factors */}
      {activeModal !== null && (
        <DraggablePricingModal
          title={pricing.factors[activeModal]}
          content={getPricingFactorDetails(pricing.factors[activeModal])}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Services Section with Parallax */}
      <ParallaxSection speed={0.4} className="relative py-32">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive furniture care solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-300 transform hover:-translate-y-3"
                style={{
                  transform: `translateY(${Math.sin((scrollY + index * 100) * 0.001) * 10}px)`,
                }}
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-10 h-10 text-amber-600 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Process Section with Parallax */}
      <ParallaxSection speed={0.35} className="relative py-32">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-white/80">
              Simple and transparent process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4"
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-black text-3xl shadow-2xl">
                  {step.step}
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Why Choose Us with Parallax */}
      <ParallaxSection speed={0.25} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Why Choose Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* FAQ Section */}
      <ParallaxSection speed={0.2} className="relative py-32">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              FAQ
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <summary className="flex items-start justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronRight className="w-6 h-6 text-amber-600 flex-shrink-0 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-6 text-gray-700 leading-relaxed border-t-2 border-amber-200 pt-6">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Ready to Transform Your Furniture?
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Get a free quote today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+918828709945"
              className="flex items-center justify-center space-x-3 bg-white text-amber-600 px-12 py-6 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-xl"
            >
              <Phone size={24} />
              <span>Call +91 8828709945</span>
            </a>
            <a
              href={`https://wa.me/918828709945?text=Hi, I need ${serviceName} service in ${location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 bg-green-600 text-white px-12 py-6 rounded-2xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-xl"
            >
              <MessageCircle size={24} />
              <span>WhatsApp Now</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// Helper function for pricing factor details
function getPricingFactorDetails(factor: string): string {
  const details: Record<string, string> = {
    'Furniture size and type': 'Larger furniture pieces like wardrobes and dining tables require more materials and time, affecting the overall cost. We provide detailed measurements and estimates.',
    'Polish type (PU, Melamine, Duco)': 'Different polish types have varying costs. PU polish is durable and premium, Melamine offers good value, and Duco provides a smooth finish. We help you choose the best option.',
    'Condition of existing finish': 'Furniture with damaged or worn finishes may require additional preparation work, including stripping old polish, repairing scratches, and extensive sanding.',
    'Number of items': 'We offer package discounts for multiple furniture pieces. The more items you polish together, the better value you get per piece.',
    'Additional repair work needed': 'Structural repairs, veneer replacement, or fixing broken parts are quoted separately. We provide transparent estimates for all repair work required.',
  };
  return details[factor] || 'This factor affects the final pricing. Contact us for detailed information specific to your furniture.';
}

export default ParallaxServiceTemplate;
