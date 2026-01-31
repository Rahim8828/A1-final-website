import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  MessageCircle,
  Home,
  ChevronRight
} from 'lucide-react';
import { PageData } from '../types';
import SEOHead from '../../src/components/SEOHead';
import StickyWhatsApp from './StickyWhatsApp';
import OptimizedImage from '../../src/components/OptimizedImage';
import { FadeIn } from './ScrollAnimations';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

interface ServicePageTemplateProps {
  pageData: PageData;
}

const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ pageData }) => {
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

  return (
    <>
      {/* SEO Head Section */}
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

      <StickyWhatsApp />

      {/* Content without Header/Footer as they're in App.tsx layout */}
        {/* Breadcrumb Navigation */}
        <section className="bg-gray-50 py-3 border-b border-gray-200">
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

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-6 h-6 text-amber-600" />
                    <span className="text-amber-600 font-semibold text-lg">{location}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {h1}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                    {introduction}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
                    <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-3 md:px-4 py-2 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">24/7 Available</span>
                    </div>
                    <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-3 md:px-4 py-2 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">Same-Day Service</span>
                    </div>
                    <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-3 md:px-4 py-2 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">Free Estimates</span>
                    </div>
                    <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-3 md:px-4 py-2 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">Expert Craftsmen</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:+918828709945"
                      className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg min-h-[44px]"
                    >
                      <Phone size={20} />
                      <span className="font-semibold">Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/918828709945?text=Hi, I need ${serviceName} service in ${location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg min-h-[44px]"
                    >
                      <MessageCircle size={20} />
                      <span className="font-semibold">WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="relative">
                  <OptimizedImage
                    src="/assets/wooden furniture .webp"
                    alt={`${serviceName} service in ${location}`}
                    width={1920}
                    height={1080}
                    className="rounded-lg shadow-2xl"
                    priority={true}
                    sizes={COMMON_SIZES.hero}
                    objectFit="cover"
                  />
                  <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-1.5 md:space-x-2 mb-1 md:mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-base md:text-lg font-bold text-gray-900">4.9/5</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">500+ Happy Customers</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Service List Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                  Our Services
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  {serviceName} Services in {location}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                  Comprehensive furniture care solutions for your home and office
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => (
                <FadeIn key={index} delay={index * 50}>
                  <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200 hover:-translate-y-1">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug group-hover:text-amber-600 transition-colors mb-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <a
                href="tel:+918828709945"
                className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
              >
                <Phone size={20} />
                <span>Get Free Quote</span>
              </a>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  Our Process
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                  Simple and transparent process for {serviceName} in {location}
                </p>
              </div>
            </FadeIn>
            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {process.map((step, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {process.map((step, index) => (
                  <FadeIn key={index} delay={index * 100}>
                    <div 
                      className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 snap-center"
                      style={{ width: '280px' }}
                    >
                      {/* Step Number Badge - Top Right for Mobile */}
                      <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                      
                      {/* Image Section */}
                      {step.image && (
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={step.image} 
                            alt={step.title} 
                            className="w-full h-full object-cover" 
                            loading="lazy" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <h3 className="text-base font-bold text-gray-900 leading-tight pr-8">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed pl-6">
                          {step.description}
                        </p>
                      </div>

                      {/* Arrow for mobile */}
                      {index < process.length - 1 && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                          <div className="bg-white rounded-full p-1 shadow-lg">
                            <ArrowRight className="w-5 h-5 text-amber-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator for Mobile */}
            <div className="md:hidden flex justify-center gap-2 mt-4">
              {process.map((_, index) => (
                <div 
                  key={index} 
                  className="w-2 h-2 rounded-full bg-amber-300"
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Coverage Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center mb-3 md:mb-4 gap-2">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    Areas We Serve in {location}
                  </h2>
                </div>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                  We provide {serviceName} services across all localities in {location} and surrounding areas
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {locationAreas.map((area, index) => (
                <FadeIn key={index} delay={index * 20}>
                  <div className="flex items-start space-x-2 bg-gradient-to-br from-amber-50 to-orange-50 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-medium text-gray-700 leading-snug">{area}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <a
                href={`https://wa.me/918828709945?text=Hi, I need ${serviceName} service in ${location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
              >
                <MessageCircle size={20} />
                <span>Book Service Now</span>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  Transparent Pricing
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                  Affordable {serviceName} services in {location} with no hidden charges
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-br from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full mb-4">
                    <span className="text-sm font-semibold">Starting From</span>
                    <div className="text-3xl md:text-4xl font-bold">₹{pricing.startingPrice}</div>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">
                    Price Range: {pricing.priceRange}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Pricing Factors:
                  </h3>
                  <ul className="space-y-3">
                    {pricing.factors.map((factor, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="tel:+918828709945"
                    className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
                  >
                    <Phone size={20} />
                    <span>Call for Exact Quote</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  Why Choose Us for {serviceName} in {location}?
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                  Your trusted partner for professional furniture polishing services
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {whyChooseUs.map((benefit, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Award className="w-8 h-8 text-white" />}
                      {index === 1 && <Clock className="w-8 h-8 text-white" />}
                      {index === 2 && <Shield className="w-8 h-8 text-white" />}
                      {index === 3 && <Users className="w-8 h-8 text-white" />}
                      {index > 3 && <CheckCircle className="w-8 h-8 text-white" />}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                  Common questions about {serviceName} in {location}
                </p>
              </div>
            </FadeIn>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FadeIn key={index} delay={index * 50}>
                  <details className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <summary className="flex items-start justify-between cursor-pointer list-none">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-amber-600 flex-shrink-0 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </p>
                  </details>
                </FadeIn>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <a
                href={`https://wa.me/918828709945?text=Hi, I have a question about ${serviceName} in ${location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
              >
                <MessageCircle size={20} />
                <span>Ask a Question</span>
              </a>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Related Services
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                    Explore our other furniture polishing services
                  </p>
                </div>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedServices.map((service, index) => (
                  <FadeIn key={index} delay={index * 50}>
                    <Link
                      to={service.url}
                      className="group block bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {service.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-amber-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Furniture?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Get a free quote for {serviceName} in {location} today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918828709945"
                  className="flex items-center justify-center space-x-2 bg-white text-amber-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
                >
                  <Phone size={20} />
                  <span>Call +91 8828709945</span>
                </a>
                <a
                  href={`https://wa.me/918828709945?text=Hi, I need ${serviceName} service in ${location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold min-h-[44px]"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
    </>
  );
};

export default ServicePageTemplate;
