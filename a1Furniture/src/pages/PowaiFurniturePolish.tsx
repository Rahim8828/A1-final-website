import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight, Shield, Award, Users, MessageCircle } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { FadeIn } from '../components/ScrollAnimations';
import { getCanonicalURL } from '../utils/canonicalURL';
import StickyWhatsApp from '../components/StickyWhatsApp';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const PowaiFurniturePolish = () => {
  const services = [
    'Wooden Furniture Polish',
    'Sofa & Chair Polishing',
    'Table & Bed Polishing',
    'Antique Furniture Restoration',
    'Scratch Repair & Touch-up',
    'Commercial Furniture Polish',
    'Cabinet & Wardrobe Polish',
    'Teak Wood Polishing',
    'Sheesham Wood Polish',
    'Office Furniture Polish',
    'Home Furniture Refinishing'
  ];

  const landmarks = [
    'Powai',
    'Chandivali',
    'Yadav Nagar',
    'Hiranandani Gardens',
    'Powai Lake Area',
    'IIT Bombay Area',
    'Vikhroli Link Road',
    'Chandivali Studio',
    'Powai Plaza',
    'Galleria Mall Area',
    'Renaissance Mall Area',
    'Rodas Hotel Area',
    'Raheja Vihar',
    'Haiko Mall Area',
    'Powai Vihar Complex',
    'Jogeshwari Vikhroli Link Road',
    'Saki Vihar Road',
    'Chandivali Junction'
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      area: 'Hiranandani Gardens',
      rating: 5,
      text: 'A1 Furniture Polish did an outstanding job on my teak wood dining set. The team was professional and the results exceeded my expectations. Highly recommend for anyone in Powai!'
    },
    {
      name: 'Priya Sharma',
      area: 'Chandivali',
      rating: 5,
      text: 'My old wooden furniture looks brand new after their polishing service. Quick service, reasonable rates, and excellent quality. Best furniture polish service in Powai!'
    },
    {
      name: 'Amit Patel',
      area: 'Powai Vihar',
      rating: 5,
      text: 'They restored my antique cabinet beautifully. Very skilled craftsmen who know their work. Will definitely use their services again for my office furniture.'
    }
  ];

  const faqs = [
    {
      question: 'Do you provide furniture polishing services in all areas of Powai?',
      answer: 'Yes, we cover all areas of Powai including Hiranandani Gardens, Chandivali, Yadav Nagar, IIT Bombay area, Powai Lake area, Vikhroli Link Road, and all surrounding localities.'
    },
    {
      question: 'How long does furniture polishing take in Powai?',
      answer: 'Depending on the furniture type and condition, polishing typically takes 2-4 hours for small items and 1-2 days for complete furniture sets. We offer 24/7 service and same-day service for urgent requirements in Powai.'
    },
    {
      question: 'What is the cost of furniture polishing in Powai?',
      answer: 'Our pricing is competitive and depends on furniture type, size, and condition. We provide free quotes and estimates. Call us 24/7 at +91 9702209513 for exact pricing for your Powai location.'
    },
    {
      question: 'Do you use eco-friendly polish products?',
      answer: 'Yes, we use high-quality, eco-friendly, and non-toxic polish products that are safe for your family and pets. All our products are certified and environmentally friendly.'
    },
    {
      question: 'Can you polish antique furniture in Powai?',
      answer: 'Absolutely! We specialize in antique furniture restoration and polishing. Our skilled craftsmen have years of experience handling delicate and valuable antique pieces in Powai.'
    }
  ];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'A1 Furniture Polish - Powai',
    'image': '/assets/Sofa And chair.webp',
    'description': 'Professional furniture polishing and restoration services in Powai, Mumbai. Expert wooden furniture polish, sofa polishing, and antique restoration.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Shop No.8, Shivam Complex, near Chandivali Studio, Yadav Nagar, Chandivali',
      'addressLocality': 'Powai, Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400072',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.1176,
      'longitude': 72.9060
    },
    'telephone': '+919702209513',
    'priceRange': '₹₹',
    'openingHours': 'Mo-Su 00:00-23:59',
    'areaServed': {
      '@type': 'City',
      'name': 'Powai, Mumbai'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '92'
    }
  };

  return (
    <>
      <SEOHead
        title="Furniture Polish in Powai | Best Furniture Polishing Services Near Me | A1 Furniture Polish"
        description="Professional furniture polishing services in Powai, Chandivali & Hiranandani Gardens. Expert wooden furniture polish, sofa restoration, table polishing, bed polishing, scratch repair, antique restoration. 24/7 service available. Call +91 9702209513"
        keywords="furniture polish powai, furniture polishing powai, furniture polishing chandivali, furniture polishing hiranandani gardens, wooden furniture polish powai, sofa polishing powai, furniture restoration powai mumbai, table polishing powai, bed polishing powai, chair polishing powai, cabinet polishing powai, wardrobe polishing powai, door polishing powai, antique furniture restoration powai, furniture repair powai, scratch repair powai, furniture refinishing powai, teak wood polishing powai, sheesham wood polishing powai, furniture polish near me powai, best furniture polish powai, affordable furniture polishing powai, furniture polishing service powai, home furniture polish powai, office furniture polish powai, commercial furniture polishing powai, furniture polish chandivali mumbai, furniture polishing yadav nagar, furniture polishing vikhroli link road, furniture polishing iit bombay area, 24 hour furniture polish powai, emergency furniture polishing powai, same day furniture polish powai, quick furniture polishing powai"
        ogImage="/assets/Sofa And chair.webp"
        canonical={getCanonicalURL('/powai-furniture-polish')}
      />
      <JsonLd data={localBusinessSchema} />
      <StickyWhatsApp />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <div className="flex flex-col">
                    <span className="text-amber-600 font-semibold">Powai, Mumbai</span>
                    <span className="text-sm text-gray-600">Shop No.8, Shivam Complex, near Chandivali Studio, Yadav Nagar, Chandivali, Powai - 400072</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Professional <span className="text-amber-600">Furniture Polish</span> Services in Powai
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  Transform your furniture with A1 Furniture Polish - Powai's most trusted experts in wooden furniture polishing, sofa restoration, table polishing, bed polishing, and complete furniture refinishing. We specialize in teak wood polish, sheesham wood polish, antique restoration, and scratch repair. Serving Powai, Chandivali, Hiranandani Gardens, IIT Bombay area, Vikhroli Link Road, and all nearby areas with 24/7 emergency service.
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
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">10+ Years Experience</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+919702209513"
                    className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Phone size={20} />
                    <span className="font-semibold">Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919702209513?text=Hi, I need furniture polishing service in Powai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
                  alt="Furniture polishing service in Powai"
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
                  <p className="text-xs md:text-sm text-gray-600">92+ Happy Customers</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Powai */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose A1 Furniture Polish in Powai?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are Powai's most trusted furniture polishing and restoration service with a proven track record of excellence. Specializing in wooden furniture polish, sofa polishing, table & bed polishing, cabinet refinishing, and antique restoration for homes and offices.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={100}>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Craftsmen</h3>
                <p className="text-gray-600">Skilled professionals with 10+ years of experience in furniture polishing</p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Service</h3>
                <p className="text-gray-600">Available round the clock for urgent requirements in Powai</p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">100% satisfaction guarantee on all our polishing services</p>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Experts</h3>
                <p className="text-gray-600">Deep understanding of Powai area and customer needs</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services in Powai */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                Our Services
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Our Furniture Polishing Services in Powai
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                Comprehensive furniture care solutions including wooden furniture polish, sofa & chair polishing, table & bed refinishing, scratch repair, antique restoration, and commercial furniture polishing for homes and offices in Powai, Chandivali, Hiranandani Gardens, and all nearby areas.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200 hover:-translate-y-1">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug group-hover:text-amber-600 transition-colors">{service}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
            >
              <span>View All Services</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Areas Covered in Powai */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 md:mb-4 gap-2">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Areas We Cover in Powai
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                We provide furniture polishing services across all localities in Powai and surrounding areas.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {landmarks.map((landmark, index) => (
              <FadeIn key={index} delay={index * 30}>
                <div className="flex items-start space-x-2 bg-gradient-to-br from-amber-50 to-orange-50 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium text-gray-700 leading-snug">{landmark}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Powai Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Trusted by hundreds of satisfied customers in Powai
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 150}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.area}, Powai</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                Complete Furniture Polishing Solutions in Powai
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-gray-700">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-600 mb-3">Wood Types We Polish</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Teak Wood Furniture Polish - Premium quality finish for teak furniture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Sheesham Wood Polish - Expert polishing for sheesham furniture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Mango Wood Polish - Specialized care for mango wood pieces</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Oak Wood Polish - Professional oak furniture refinishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Mahogany Polish - Expert mahogany furniture restoration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-600 mb-3">Furniture Types We Service</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Dining Table Polish - Restore shine to your dining tables</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Bed Frame Polishing - Complete bed furniture refinishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Sofa Set Polish - Professional sofa and chair polishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Wardrobe & Cabinet Polish - Interior and exterior polishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Office Desk Polish - Commercial furniture polishing services</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 md:mt-8 text-center">
                <p className="text-gray-700 text-sm md:text-base lg:text-lg px-2">
                  Serving all areas of Powai including Chandivali, Hiranandani Gardens, Yadav Nagar, IIT Bombay area, Powai Lake area, Vikhroli Link Road, and nearby localities with 24/7 emergency furniture polishing services.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about furniture polishing services in Powai
              </p>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Address Info */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <MapPin className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Visit Our Shop</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Shop No.8, Shivam Complex,<br />
                        near Chandivali Studio,<br />
                        Yadav Nagar, Chandivali,<br />
                        Powai, Mumbai,<br />
                        Maharashtra 400072
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                      <a href="tel:+919702209513" className="text-amber-600 font-semibold hover:text-amber-700 text-lg">
                        +91 9702209513
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
                      <p className="text-gray-700">Open 24/7 - Available anytime for your convenience</p>
                    </div>
                    <div className="pt-4">
                      <a
                        href="https://maps.google.com/?q=Shop+No.8,+Shivam+Complex,+near+Chandivali+Studio,+Yadav+Nagar,+Chandivali,+Powai,+Mumbai,+Maharashtra+400072"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                      >
                        <MapPin size={20} />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Right - Map */}
                <div className="h-full min-h-[400px] bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.906!3d19.1176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzAzLjQiTiA3MsKwNTQnMjEuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="A1 Furniture Polish Powai Location"
                    className="rounded-r-2xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Furniture in Powai?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Contact A1 Furniture Polish today for professional furniture polishing services in Powai. Available 24/7 with free quotes and same-day service!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919702209513"
              className="flex items-center justify-center space-x-2 bg-white text-amber-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
            >
              <Phone size={20} />
              <span>Call: +91 9702209513</span>
            </a>
            <a
              href="https://wa.me/919702209513?text=Hi, I need furniture polishing service in Powai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PowaiFurniturePolish;
