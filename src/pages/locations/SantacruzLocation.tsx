import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight, Shield, Award, Sparkles, Navigation, MessageCircle, Check } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import JsonLd from '../../components/JsonLd';
import { getCanonicalURL } from '../../utils/canonicalURL';
import StickyWhatsApp from '../../components/StickyWhatsApp';

const SantacruzLocation: React.FC = () => {
  const services = [
    'Wooden Furniture Polish',
    'Sofa & Chair Wood Restoration',
    'Dining Table & Center Table Polish',
    'PU (Polyurethane) & Melamine Coating',
    'Bed Polishing & Structural Repair',
    'Deco & Texture Paint Finish',
    'Antique Furniture Restoration',
    'Scratch & Water Damage Repair',
    'Teak & Rosewood Buffing',
    'Wardrobe & Kitchen Cabinet Polish',
    'Commercial & Office Furniture Polish'
  ];

  const landmarks = [
    'Santacruz West',
    'Santacruz East',
    'Gazdhar Bandh Road',
    'New Gulab Nagar',
    'Govind Nagar',
    'Khira Nagar',
    'Tagore Nagar',
    'Saraswat Colony',
    'Juhu Tara Road',
    'Milan Subway Area',
    'Podar School Area',
    'Willingdon Colony',
    'Vakola',
    'Kalina',
    'Khar West Border',
    'Linking Road Extension'
  ];

  const testimonials = [
    {
      name: 'Farhan Merchant',
      area: 'Gazdhar Bandh, Santacruz West',
      rating: 5,
      text: 'A1 Furniture Polish did a splendid job on our 8-seater dining table and wooden crockery unit. They came directly to our flat in Santacruz West and completed the PU finish without any dust. 5 stars for neatness and quality!'
    },
    {
      name: 'Ananya Roy',
      area: 'Tagore Nagar, Santacruz',
      rating: 5,
      text: 'Our antique teakwood sofa set had lost its sheen. A1 Furniture Polish team restored the wood grain beautifully. Polite workmen and very transparent pricing.'
    },
    {
      name: 'Sunil Mehta',
      area: 'Khira Nagar, Santacruz West',
      rating: 5,
      text: 'Prompt response on WhatsApp and quick doorstep inspection. Fixed our hydraulic bed and gave it a fresh melamine polish in a single day. Excellent service in Santacruz.'
    }
  ];

  const faqs = [
    {
      question: 'Where is A1 Furniture Polish Service located in Santacruz?',
      answer: 'Our Santacruz branch is located at Shop No 22, Bharat Seva Chawl, 3, Gazdhar Bandh Rd, opp. APPARTMENT 2, New Gulab Nagar, Govind Nagar, Santacruz (West), Mumbai 400053. We provide 100% doorstep polish & repair across all of Santacruz West & East.'
    },
    {
      question: 'Do you provide on-site / doorstep polish in Santacruz West & East?',
      answer: 'Yes! Our craftsmen come directly to your residence or office with all protective covers, sanders, and eco-friendly polishes. We ensure zero mess in your home.'
    },
    {
      question: 'What types of wood polishes do you offer in Santacruz?',
      answer: 'We offer Italian PU Polish (Glossy & Matte), Melamine Coating, Deco Paint, Polyester Finish, French Spirit Polish, Teak Oil Finish, and specialized antique furniture restoration.'
    },
    {
      question: 'How quickly can you start the work in Santacruz?',
      answer: 'We offer same-day inspection and service across Santacruz. Once you send photos on WhatsApp (+91 8828709945), we provide a free quote and can dispatch our team within 60-90 minutes.'
    }
  ];

  const gmbDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Shop+No+22+Bharat+Seva+Chawl+Gazdhar+Bandh+Rd+New+Gulab+Nagar+Govind+Nagar+Santacruz+West+Mumbai+400053';
  const gmbSearchUrl = 'https://www.google.com/maps/search/?api=1&query=A1+Furniture+Polish+Service+-+Santacruz+Shop+No+22+Gazdhar+Bandh+Rd';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://a1furniturepolish.com/santacruz#localbusiness',
    'name': 'A1 Furniture Polish Service - Santacruz',
    'image': 'https://a1furniturepolish.com/assets/Sofa%20And%20chair.webp',
    'description': 'A1 Furniture Polish Service - Santacruz (5.0★ Google Rated). Professional doorstep wooden furniture polishing, sofa repair, dining table PU polish, and antique restoration in Santacruz West & East, Mumbai.',
    'priceRange': '₹249 - ₹15000',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Shop No 22, Bharat Seva Chawl, 3, Gazdhar Bandh Rd, opp. APPARTMENT 2, New Gulab Nagar, Govind Nagar',
      'addressLocality': 'Santacruz (West), Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400053',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.0843,
      'longitude': 72.8360
    },
    'telephone': '+918828709945',
    'openingHours': 'Mo-Su 00:00-23:59',
    'url': 'https://a1furniturepolish.com/santacruz',
    'hasMap': gmbSearchUrl,
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'Santacruz West' },
      { '@type': 'AdministrativeArea', 'name': 'Santacruz East' },
      { '@type': 'AdministrativeArea', 'name': 'Gazdhar Bandh' },
      { '@type': 'AdministrativeArea', 'name': 'Khira Nagar' },
      { '@type': 'AdministrativeArea', 'name': 'Tagore Nagar' },
      { '@type': 'AdministrativeArea', 'name': 'Vakola' },
      { '@type': 'AdministrativeArea', 'name': 'Kalina' }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'reviewCount': '2',
      'bestRating': '5',
      'worstRating': '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://a1furniturepolish.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Locations', 'item': 'https://a1furniturepolish.com/service-areas-mumbai' },
      { '@type': 'ListItem', 'position': 3, 'name': 'A1 Furniture Polish Service - Santacruz', 'item': 'https://a1furniturepolish.com/santacruz' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
    }))
  };

  return (
    <>
      <SEOHead
        title="A1 Furniture Polish Service - Santacruz | Doorstep Polish & Repair"
        description="A1 Furniture Polish Service - Santacruz (5.0★ Google Rated). Doorstep wooden furniture polish, sofa repair, dining table PU polish at Gazdhar Bandh Rd, Santacruz West & East. Call +91 8828709945."
        canonical={getCanonicalURL('/santacruz')}
        keywords="A1 Furniture Polish Service Santacruz, furniture polish santacruz, furniture repair shop santacruz west, gazdhar bandh furniture polish, wood polishing santacruz east, sofa repair santacruz, pu polish santacruz"
      />

      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex text-sm text-gray-600">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/service-areas-mumbai" className="hover:text-amber-600 transition-colors">Locations</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-amber-600 font-semibold">Santacruz</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950 text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-amber-300 text-xs sm:text-sm font-medium">
                    Verified Google Business Profile • Santacruz (West)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                  A1 Furniture Polish Service - <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Santacruz</span>
                </h1>

                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  Professional doorstep wooden furniture polishing, PU Italian finishing, sofa restoration, and antique wood care across Santacruz West, Gazdhar Bandh, Khira Nagar & Santacruz East.
                </p>

                {/* Rating & GMB Highlights */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-white text-lg">5.0</span>
                  </div>
                  <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
                  <div className="text-sm text-slate-200">
                    <span className="font-bold text-white">2 Google Reviews</span> • 100% Recommended
                  </div>
                  <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-300 font-medium">
                    <Clock className="w-4 h-4" /> Open 24 Hours
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+918828709945"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Call: +91 8828709945
                  </a>
                  <a
                    href="https://wa.me/918828709945?text=Hi%20A1%20Furniture%20Polish%20Santacruz,%20I%20need%20a%20free%20quote%20for%20furniture%20polish/repair."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Photos
                  </a>
                  <a
                    href={gmbDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3.5 rounded-xl border border-white/20 transition-all"
                  >
                    <Navigation className="w-4 h-4 text-amber-400" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* GMB Card */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-100">
                  <div className="flex items-start justify-between mb-4 border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                        Santacruz Workshop & Office
                      </span>
                      <h3 className="font-bold text-xl text-slate-900 mt-2">
                        A1 Furniture Polish Service - Santacruz
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Furniture repair shop & polishing specialist in Santacruz West
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        5.0
                      </div>
                      <span className="text-xs text-gray-400">2 Reviews</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-700 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Address:</strong> Shop No 22, Bharat Seva Chawl, 3, Gazdhar Bandh Rd, opp. APPARTMENT 2, New Gulab Nagar, Govind Nagar, Santacruz (West), Mumbai, Maharashtra 400053
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span><strong>Hours:</strong> Open 24 Hours (7 Days a Week)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                      <span><strong>Helpline:</strong> +91 8828709945</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 text-xs">
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> Doorstep Service
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> Free Inspection
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> 1-Year Polish Warranty
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> Odourless PU Polish
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services in Santacruz */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Our Services in Santacruz
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Wood Polishing & Furniture Restoration Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-slate-50 p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{service}</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Doorstep service with high-durability finish across Santacruz.
                    </p>
                    <a
                      href={`https://wa.me/918828709945?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(service)}%20in%20Santacruz.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
                    >
                      Book on WhatsApp <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localities Covered in Santacruz */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Santacruz Coverage
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Localities We Serve in Santacruz
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {landmarks.map((landmark, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-white shadow-sm text-slate-700 text-sm px-3.5 py-2 rounded-lg font-medium border border-gray-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                  Santacruz Location
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                  Find Us in Santacruz West
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">A1 Furniture Polish Service - Santacruz</h4>
                    <p className="text-gray-600">
                      Shop No 22, Bharat Seva Chawl, 3, Gazdhar Bandh Rd, opp. APPARTMENT 2, New Gulab Nagar, Govind Nagar, Santacruz (West), Mumbai 400053
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">Rating</span>
                      <span className="font-bold text-amber-600">5.0 ★ (2 Google Reviews)</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Opening Hours</span>
                      <span className="font-bold text-emerald-600">Open 24 Hours</span>
                    </div>
                  </div>
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={gmbDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition-all"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Google Map Directions
                    </a>
                    <a
                      href="tel:+918828709945"
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      Call Helpline: +91 8828709945
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-lg overflow-hidden h-[380px]">
                  <iframe
                    title="A1 Furniture Polish Service - Santacruz Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8!2d72.836!3d19.0843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA1JzAzLjUiTiA3MsKwNTAnMDkuNiJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin&q=Gazdhar+Bandh+Rd+Santacruz+West+Mumbai"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0.75rem' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Furniture Polish FAQs for Santacruz
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-12 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Book Doorstep Furniture Polish in Santacruz Today
            </h2>
            <p className="text-amber-100 text-base mb-6">
              Call us now or send photos on WhatsApp for an instant free quote and doorstep inspection in Santacruz West or East.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918828709945"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Call +91 8828709945
              </a>
              <a
                href="https://wa.me/918828709945?text=Hi%20A1%20Furniture%20Polish%20Santacruz,%20I%20want%20to%20book%20a%20doorstep%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-amber-50 text-amber-800 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <StickyWhatsApp />
      </div>
    </>
  );
};

export default SantacruzLocation;
