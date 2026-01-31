import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight, Shield, Award, Users, MessageCircle, Sparkles } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import JsonLd from '../../components/JsonLd';
import { FadeIn } from '../../components/ScrollAnimations';
import { getCanonicalURL } from '../../utils/canonicalURL';
import StickyWhatsApp from '../../components/StickyWhatsApp';
import OptimizedImage from '../../components/OptimizedImage';
import { COMMON_SIZES } from '../../utils/imageHelpers';

const DadarLocation = () => {
  const services = [
    'Wooden Furniture Polish',
    'Sofa & Chair Polishing',
    'Table & Bed Polishing',
    'Antique Furniture Restoration',
    'Scratch Repair & Touch-up',
    'Commercial Furniture Polish',
    'Cabinet & Wardrobe Polish',
    'Door & Window Polish',
    'Dining Set Polish',
    'Office Furniture Polish',
    'Home Furniture Refinishing'
  ];

  const landmarks = [
    'Dadar West',
    'Dadar East',
    'Dadar Station',
    'Shivaji Park',
    'Mahim',
    'Parel',
    'Lower Parel',
    'Matunga East',
    'Matunga West',
    'Worli',
    'Byculla',
    'Fort',
    'Colaba',
    'Churchgate',
    'Grant Road',
    'Prabhadevi',
    'Cosmos Plaza',
    'Bhavani Shankar Road',
    'Tilak Bridge Dadar',
    'Tardeo',
    'Mumbai Central',
    'Charni Road',
    'Marine Lines',
    'Breach Candy',
    'Malabar Hill',
    'Girgaon',
    'Kalbadevi',
    'Crawford Market',
    'CST',
    'Ballard Estate'
  ];

  const testimonials = [
    {
      name: 'Rajesh Patil',
      area: 'Dadar West',
      rating: 5,
      text: 'A1 Furniture Polish did an amazing job on my teak wood dining set near Cosmos Plaza. The team was professional and the results exceeded my expectations. Highly recommend for anyone in Dadar!'
    },
    {
      name: 'Priya Kulkarni',
      area: 'Shivaji Park',
      rating: 5,
      text: 'My old wooden furniture looks brand new after their polishing service. Quick service, reasonable rates, and excellent quality. Best furniture polish service in Dadar!'
    },
    {
      name: 'Vikram Joshi',
      area: 'Dadar East',
      rating: 5,
      text: 'They restored my antique cabinet beautifully. Very skilled craftsmen who know their work. Will definitely use their services again for my office furniture.'
    }
  ];

  const faqs = [
    {
      question: 'Do you provide furniture polishing services in all areas of Dadar?',
      answer: 'Yes, we cover all areas of Dadar including Dadar West, Dadar East, Shivaji Park, Mahim, Parel, Lower Parel, Matunga, Cosmos Plaza, Bhavani Shankar Road, and all surrounding localities.'
    },
    {
      question: 'How long does furniture polishing take in Dadar?',
      answer: 'Depending on the furniture type and condition, polishing typically takes 2-4 hours for small items and 1-2 days for complete furniture sets. We offer 24/7 service and same-day service for urgent requirements in Dadar.'
    },
    {
      question: 'What is the cost of furniture polishing in Dadar?',
      answer: 'Our pricing is competitive and depends on furniture type, size, and condition. We provide free quotes and estimates. Call us 24/7 at +91 8828709945 for exact pricing for your Dadar location.'
    },
    {
      question: 'Do you use eco-friendly polish products?',
      answer: 'Yes, we use high-quality, eco-friendly, and non-toxic polish products that are safe for your family and pets. All our products are certified and environmentally friendly.'
    },
    {
      question: 'Can you polish antique furniture in Dadar?',
      answer: 'Absolutely! We specialize in antique furniture restoration and polishing. Our skilled craftsmen have years of experience handling delicate and valuable antique pieces in Dadar.'
    }
  ];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'A1 Furniture Polish Service - Dadar to Colaba',
    'image': 'https://a1furniturepolish.in/assets/Sofa And chair.webp',
    'description': 'Professional furniture polishing and restoration services covering Dadar, Parel, Lower Parel, Worli, Byculla, Fort, Colaba, and South Mumbai. Expert wooden furniture polish, sofa restoration, and antique furniture restoration. Located at Shop No.13 near Cosmos Plaza, Bhavani Shankar Road, Dadar West.',
    'priceRange': '₹249-₹999',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Shop No.13, Nikam wadi, Bhavani Shankar Road Near Cosmos Plaza',
      'addressLocality': 'Dadar West, Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400025',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.0134143,
      'longitude': 72.833927
    },
    'telephone': '+918828709945',
    'openingHours': 'Mo-Su 00:00-23:59',
    'url': 'https://a1furniturepolish.in/dadar',
    'hasMap': 'https://www.google.com/maps/place/A1+Furniture+Polish+Service/@19.0134143,72.833927',
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Dadar, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Parel, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Lower Parel, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Worli, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Byculla, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Fort, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Colaba, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Shivaji Park, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Matunga, Mumbai'
      },
      {
        '@type': 'City',
        'name': 'Mahim, Mumbai'
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '87',
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': [
      'https://www.facebook.com/a1furniturepolish',
      'https://www.instagram.com/a1furniturepolish'
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://a1furniturepolish.in/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Locations',
        'item': 'https://a1furniturepolish.in/locations'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Dadar',
        'item': 'https://a1furniturepolish.in/dadar'
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Furniture Polishing and Restoration',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'A1 Furniture Polish Service'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Dadar, Mumbai'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Furniture Polishing Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Sofa & Chair Polish',
            'description': 'Complete sofa set polishing, scratch removal, and restoration'
          },
          'price': '999',
          'priceCurrency': 'INR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Dining Table Polish',
            'description': 'Complete dining set polishing with chair refinishing'
          },
          'price': '799',
          'priceCurrency': 'INR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Bed Polish & Repair',
            'description': 'Double bed polishing with side tables included'
          },
          'price': '699',
          'priceCurrency': 'INR'
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="⭐ Best Furniture Polish Dadar to Colaba | 24/7 Near Cosmos Plaza | ₹249 Starting - Shop No.13"
        description="Professional furniture polishing services from Dadar to Colaba. Expert wooden furniture polish, sofa restoration covering Dadar, Parel, Lower Parel, Worli, Byculla, Fort, Colaba. Shop No.13 Cosmos Plaza - Starting ₹249. Call +91 8828709945"
        keywords="furniture polish dadar to colaba, furniture polishing dadar parel worli, furniture polishing south mumbai, wooden furniture polish dadar, sofa polishing dadar to fort, furniture restoration dadar mumbai, table polishing dadar parel, bed polishing dadar, furniture polish near cosmos plaza, best furniture polish dadar, furniture polishing lower parel, furniture polishing worli, furniture polishing byculla, furniture polishing fort mumbai, furniture polishing colaba, antique furniture restoration south mumbai, furniture repair dadar, scratch repair dadar to colaba, furniture refinishing mumbai, teak wood polishing dadar, sheesham wood polishing south mumbai, furniture polish bhavani shankar road, furniture polish shivaji park, furniture polishing mahim, furniture polishing matunga, 24 hour furniture polish dadar, emergency furniture polishing south mumbai, same day furniture polish dadar to colaba, furniture polish dadar station, furniture polish near dadar, affordable furniture polishing mumbai, home furniture polish dadar, office furniture polish south mumbai, commercial furniture polishing mumbai central"
        ogImage="/assets/Sofa And chair.webp"
        canonical={getCanonicalURL('/dadar')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <StickyWhatsApp />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 md:py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 "></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30  "></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                {/* Location Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">Serving Dadar to Colaba</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Furniture Polish</span> in Dadar
                </h1>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Transform your furniture</strong> with Mumbai's most trusted experts in wooden furniture polishing, sofa restoration, and complete furniture refinishing. Covering <strong>Dadar, Parel, Lower Parel, Worli, Byculla, Fort, and Colaba</strong> with 24/7 emergency service.
                </p>
                
                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white p-3 rounded-lg shadow-md text-center">
                    <p className="text-2xl font-bold text-amber-600">5000+</p>
                    <p className="text-xs text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md text-center">
                    <p className="text-2xl font-bold text-amber-600">15+</p>
                    <p className="text-xs text-gray-600">Years Experience</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md text-center">
                    <p className="text-2xl font-bold text-amber-600">24/7</p>
                    <p className="text-xs text-gray-600">Service Available</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md text-center">
                    <p className="text-2xl font-bold text-amber-600">4.9★</p>
                    <p className="text-xs text-gray-600">Google Rating</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/918828709945?text=Hi, I need furniture polishing service in Dadar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200  shadow-2xl font-bold text-lg"
                  >
                    <MessageCircle size={24} />
                    <span>Book on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+918828709945"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200  shadow-2xl font-bold text-lg"
                  >
                    <Phone size={24} />
                    <span>Call: 9967834585</span>
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative">
                <OptimizedImage
                  src="/assets/wooden furniture .webp"
                  alt="Furniture polishing service in Dadar"
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
                  <p className="text-xs md:text-sm text-gray-600">87+ Happy Customers</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Service Cards Section with Pricing */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-amber-600">Professional Furniture Polish</span> Services & Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Book instantly via WhatsApp • 24/7 Service • Free Home Inspection
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Service Card 1 - Sofa Polish */}
            <FadeIn delay={100}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-100">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/Sofa And chair.webp"
                    alt="Sofa Polishing Service in Dadar"
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    POPULAR
                  </div>
                </div>
                <div className="p-4 md:p-5 bg-white">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Sofa & Chair Polish</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Complete sofa set polishing & restoration</p>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹1,449 - ₹6,449</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹2,999</span>
                      <span className="text-xs font-semibold text-green-600">Save 52%</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>3-Seater Sofa Polishing</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Scratch & Stain Removal</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>PU Polish Application</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Sofa Polish service in Dadar for ₹1,449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Book Now on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Service Card 2 - Dining Table */}
            <FadeIn delay={200}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-100">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/Dining-polish.webp"
                    alt="Dining Table Polish Service in Dadar"
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    TRENDING
                  </div>
                </div>
                <div className="p-4 md:p-5 bg-white">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Dining Table Polish</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Complete dining set polishing</p>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹3,849 - ₹5,099</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹5,999</span>
                      <span className="text-xs font-semibold text-green-600">Save 36%</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>6-Seater Dining Table</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Teak/Sheesham Polish</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Melamine Finish Option</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Dining Table Polish service in Dadar for ₹3,849"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Book Now on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Service Card 3 - Bed Polish */}
            <FadeIn delay={300}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-100">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/Bed-polish.webp"
                    alt="Bed Polishing Service in Dadar"
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Bed Polish & Repair</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Double bed polishing included</p>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹2,449 - ₹5,799</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹3,999</span>
                      <span className="text-xs font-semibold text-green-600">Save 39%</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>King/Queen Size Bed</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Headboard Polishing</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Minor Repairs Included</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Bed Polish service in Dadar for ₹2,449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Book Now on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Service Card 4 - Wardrobe */}
            <FadeIn delay={100}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-100">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/4-Door-Wardrobe.webp"
                    alt="Wardrobe Polishing Service in Dadar"
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    PREMIUM
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Wardrobe Polish</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Inside-outside polishing</p>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹3,499 - ₹6,799</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹4,999</span>
                      <span className="text-xs font-semibold text-green-600">Save 30%</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Interior & Exterior Polish</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Handle Cleaning Included</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Scratch Protection</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Wardrobe Polish service in Dadar for ₹3,499 (2 Door)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Book Now on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Service Card 5 - Door Polish */}
            <FadeIn delay={200}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-100">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/Door-polish.webp"
                    alt="Door Polishing Service in Dadar"
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Door Polish</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Wooden door with frame refinishing</p>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹2,449 - ₹5,899</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹3,999</span>
                      <span className="text-xs font-semibold text-green-600">Save 39%</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Both Sides Polishing</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Frame Polish Included</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Quick 2-Hour Service</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Door Polish service in Dadar for ₹2,449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Book Now on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Service Card 6 - Complete Home */}
            <FadeIn delay={300}>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-amber-300">
                <div className="relative h-56 md:h-60 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                  <OptimizedImage
                    src="/assets/consultation-booking.webp"
                    alt="Complete Home Furniture Polish in Dadar"
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    BEST DEAL
                  </div>
                </div>
                <div className="p-4 md:p-5 bg-gradient-to-br from-amber-50 to-orange-50">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 text-center">Complete Home Package</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 text-center line-clamp-2">Entire home furniture polishing</p>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-2xl md:text-3xl font-bold text-amber-600">₹249</span>
                      <span className="text-gray-500 text-xs md:text-sm">Per Item</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500 line-through mr-1.5">₹399</span>
                      <span className="text-xs font-semibold text-green-600">Save 38%</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>10+ Items Package Deal</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Free Home Inspection</span>
                    </li>
                    <li className="flex items-center text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>1 Year Polish Warranty</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/918828709945?text=Hi, I want to book Complete Home Package in Dadar at ₹249 per item"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Get Free Quote on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Special Offer Banner */}
          <FadeIn delay={400}>
            <div className="mt-12 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-8 text-center text-white shadow-2xl">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-2xl md:text-3xl font-bold">Limited Time Offer!</h3>
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-lg md:text-xl mb-4">
                Book Any 3 Services & Get <span className="font-bold text-2xl">10% Extra OFF</span>
              </p>
              <p className="text-sm opacity-90 mb-6">
                Offer Valid Until: 31st December 2025 • First 50 Bookings Only
              </p>
              <a
                href="https://wa.me/918828709945?text=Hi, I want to book 3 services and get 10% extra discount in Dadar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200  shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Claim Offer Now on WhatsApp</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us for Dadar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose A1 Furniture Polish in Dadar?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are Dadar's most trusted furniture polishing and restoration service with a proven track record of excellence. Specializing in wooden furniture polish, sofa polishing, table & bed polishing, cabinet refinishing, and antique restoration for homes and offices.
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
                <p className="text-gray-600">Available round the clock for urgent requirements in Dadar</p>
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
                <p className="text-gray-600">Deep understanding of Dadar area and customer needs</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services in Dadar */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                Our Services
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Our Furniture Polishing Services in Dadar
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                Comprehensive furniture care solutions including wooden furniture polish, sofa & chair polishing, table & bed refinishing, scratch repair, antique restoration, and commercial furniture polishing for homes and offices in Dadar East, Dadar West, Shivaji Park, Parel, Matunga, and all nearby areas.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-200 ">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-amber-600 flex-shrink-0 mt-0.5  transition-transform" />
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug group-hover:text-amber-600 transition-colors">{service}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200  shadow-lg font-semibold"
            >
              <span>View All Services</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Areas Covered in Dadar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 md:mb-4 gap-2">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Areas We Cover in Dadar
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                We provide furniture polishing services across all localities in Dadar and surrounding areas.
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
                What Dadar Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Trusted by hundreds of satisfied customers in Dadar
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
                    <p className="text-sm text-gray-600">{testimonial.area}, Dadar</p>
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
                Complete Furniture Polishing Solutions in Dadar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-gray-700">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-600 mb-3">Wood Types We Polish</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Teak Wood Furniture Polish - PREMIUM quality finish for teak furniture</span>
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
                  Serving all areas of Dadar including Dadar East, Dadar West, Shivaji Park, Parel, Lower Parel, Matunga, Mahim, Worli, and nearby localities with 24/7 emergency furniture polishing services.
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
                Common questions about furniture polishing services in Dadar
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
                        Shop No.13, Nikam wadi,<br />
                        Bhavani Shankar Road Near Cosmos Plaza,<br />
                        Dadar West, Mumbai,<br />
                        Maharashtra 400025
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                      <a href="tel:+918828709945" className="text-amber-600 font-semibold hover:text-amber-700 text-lg">
                        +91 9967834585
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
                      <p className="text-gray-700">Open 24/7 - Available anytime for your convenience</p>
                    </div>
                    <div className="pt-4">
                      <a
                        href="https://maps.google.com/?q=Shop+No.13,+Nikam+wadi,+Bhavani+Shankar+Road+Near+Cosmos+Plaza,+Dadar+West,+Mumbai,+Maharashtra+400025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all duration-200  shadow-lg font-semibold"
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.143114956721!2d72.833927!3d19.0134143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf9360626417%3A0x5d3faf15321bb243!2sA1%20Furniture%20Polish%20Service!5e0!3m2!1sen!2sin!4v1765633222945!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="A1 Furniture Polish Dadar Location"
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
            Ready to Transform Your Furniture in Dadar?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Contact A1 Furniture Polish today for professional furniture polishing services in Dadar. Available 24/7 with free quotes and same-day service!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918828709945"
              className="flex items-center justify-center space-x-2 bg-white text-amber-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200  shadow-lg font-semibold"
            >
              <Phone size={20} />
              <span>Call: +91 9967834585</span>
            </a>
            <a
              href="https://wa.me/918828709945?text=Hi, I need furniture polishing service in Dadar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200  shadow-lg font-semibold"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA - Removed as per requirements */}
    </>
  );
};

export default DadarLocation;
