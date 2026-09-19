import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight, Shield, Award, Users, MessageCircle, Sparkles, Navigation, Check } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import JsonLd from '../../components/JsonLd';
import { FadeIn } from '../../components/ScrollAnimations';
import { getCanonicalURL } from '../../utils/canonicalURL';
import OptimizedImage from '../../components/OptimizedImage';
import { COMMON_SIZES } from '../../utils/imageHelpers';

const ThaneLocation: React.FC = () => {
  const services = [
    'Wooden Furniture Polish',
    'Bed Polishing & Structural Repair',
    'Sofa & Chair Polishing',
    'Dining Table & Center Table Polish',
    'PU (Polyurethane) & Melamine Coating',
    'Deco & Texture Paint Finish',
    'Antique Furniture Restoration',
    'Scratch & Water Damage Repair',
    'Termite Treatment & Polish',
    'Wardrobe & Modular Cabinet Polish',
    'Commercial & Office Furniture Polish'
  ];

  const landmarks = [
    'Pokharan Road No. 2',
    'Talwar Compound',
    'Subhash Nagar',
    'Tirupati Apartments',
    'Thane West',
    'Thane East',
    'Majiwada',
    'Ghodbunder Road',
    'Hiranandani Estate',
    'Vartak Nagar',
    'Naupada',
    'Panch Pakhadi',
    'Korum Mall Area',
    'Viviana Mall Area',
    'Manpada',
    'Upvan Lake Area',
    'Wagle Industrial Estate',
    'Kasarvadavali',
    'Brahmand',
    'Kapurbaoli',
    'Balkum',
    'Meadows',
    'Kalwa',
    'Kolshet Road'
  ];

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      area: 'Pokharan Road No. 2, Thane',
      rating: 5,
      text: 'Found A1 Furniture Polish from Google near Talwar Compound. They restored our 6-seater teak dining table and hydraulic king bed at our home. Flawless PU finish and on-time service. Highly recommended!'
    },
    {
      name: 'Sneha Kulkarni',
      area: 'Hiranandani Estate, Thane West',
      rating: 5,
      text: 'My wooden sofa and center table were scratched and dull. The A1 team polished them at our doorstep with zero mess. Super clean work and very polite craftsmen. 5/5 stars!'
    },
    {
      name: 'Dr. Manish Shah',
      area: 'Majiwada, Thane',
      rating: 5,
      text: 'Superb antique cabinet and wardrobe polishing service. They gave a new life to our 15-year-old rosewood furniture. Very reasonable pricing and genuine professional quality.'
    },
    {
      name: 'Pooja Nair',
      area: 'Vartak Nagar, Thane West',
      rating: 5,
      text: 'Best furniture polish shop in Thane! Quick response on WhatsApp, free inspection, and completed the bed & sofa polish on the same day. Great job!'
    }
  ];

  const faqs = [
    {
      question: 'Where is A1 Furniture Polish Service located in Thane?',
      answer: 'Our Thane workshop is located at Shop No 12, Talwar Compound, Pokharan Rd No. 2, near Tirupati Apartments, Subhash Nagar, Thane West, Thane, Maharashtra 400601. We provide 100% doorstep services across all areas of Thane.'
    },
    {
      question: 'Do you offer doorstep furniture polishing in Thane?',
      answer: 'Yes, we provide complete doorstep furniture polishing and repair services across Thane West, Thane East, Ghodbunder Road, Majiwada, Naupada, Hiranandani Estate, and surrounding areas. Our technicians come equipped with all materials to finish work at your home.'
    },
    {
      question: 'What types of furniture polish services do you provide in Thane?',
      answer: 'We provide PU (Polyurethane) Polish (Matt & Gloss), Melamine Polish, Deco Paint, Polyester/Lacquered Finish, French Polish, Antique Wood Restoration, Teakwood Buffing, Bed Repair & Polish, and Sofa Wooden Polishing.'
    },
    {
      question: 'How much does furniture polishing cost in Thane?',
      answer: 'Our rates start from ₹249 for minor touchups/chairs, ₹999 for small tables, and customized package rates for dining sets, beds, and full home furniture. We offer a free doorstep inspection and quote. Call us 24/7 at +91 8828709945.'
    },
    {
      question: 'How can I get an instant quote for my furniture in Thane?',
      answer: 'Simply click the WhatsApp button or call +91 8828709945. You can share photos of your furniture on WhatsApp, and our master polisher will provide an instant transparent quote within 10 minutes.'
    }
  ];

  const gmbProfileUrl = 'https://www.google.com/maps/search/?api=1&query=A1+Furniture+Polish+Service+-+Thane+Shop+No+12+Talwar+Compound+Pokharan+Rd+No+2';
  const gmbDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Shop+No+12+Talwar+Compound+Pokharan+Rd+No+2+near+Tirupati+Apartments+Subhash+Nagar+Thane+West+Maharashtra+400601';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://a1furniturepolish.com/thane#localbusiness',
    'name': 'A1 Furniture Polish Service - Thane',
    'alternateName': 'A1 Furniture Polish & Repair Shop Thane',
    'image': 'https://a1furniturepolish.com/assets/Sofa%20And%20chair.webp',
    'description': 'A1 Furniture Polish Service - Thane provides top-rated wooden furniture polishing, bed repair, sofa polishing, PU & Melamine polish at doorstep in Thane West, Pokharan Road, Majiwada, Ghodbunder Road and across Thane.',
    'priceRange': '₹249 - ₹15000',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Shop No 12, Talwar Compound, Pokharan Rd No. 2, near Tirupati Apartments, Subhash Nagar',
      'addressLocality': 'Thane West',
      'addressRegion': 'Maharashtra',
      'postalCode': '400601',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.2183,
      'longitude': 72.9781
    },
    'telephone': '+918828709945',
    'openingHours': 'Mo-Su 00:00-23:59',
    'url': 'https://a1furniturepolish.com/thane',
    'hasMap': gmbProfileUrl,
    'areaServed': [
      { '@type': 'City', 'name': 'Thane' },
      { '@type': 'AdministrativeArea', 'name': 'Thane West' },
      { '@type': 'AdministrativeArea', 'name': 'Pokharan Road No 2' },
      { '@type': 'AdministrativeArea', 'name': 'Ghodbunder Road' },
      { '@type': 'AdministrativeArea', 'name': 'Majiwada' },
      { '@type': 'AdministrativeArea', 'name': 'Hiranandani Estate' },
      { '@type': 'AdministrativeArea', 'name': 'Vartak Nagar' },
      { '@type': 'AdministrativeArea', 'name': 'Naupada' },
      { '@type': 'AdministrativeArea', 'name': 'Panch Pakhadi' }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'reviewCount': '8',
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
        'item': 'https://a1furniturepolish.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Service Locations',
        'item': 'https://a1furniturepolish.com/service-areas-mumbai'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'A1 Furniture Polish Service - Thane',
        'item': 'https://a1furniturepolish.com/thane'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="A1 Furniture Polish Service - Thane | Doorstep Polish & Repair"
        description="A1 Furniture Polish Service - Thane (5.0★ Google Rated). Doorstep wooden furniture polish, bed repair, sofa polish, PU & Melamine polish at Pokharan Rd No 2, Thane West & all Thane areas. Call +91 8828709945."
        canonical={getCanonicalURL('/thane')}
        keywords="A1 Furniture Polish Service Thane, furniture polish thane, furniture repair shop thane, bed repair thane, sofa polish thane, pu polish thane west, talwar compound pokharan road furniture polish, wood polishing thane"
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
              <span className="text-amber-600 font-semibold">Thane</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950 text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7">
                {/* GMB Verified Badge */}
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-amber-300 text-xs sm:text-sm font-medium">
                    Verified Google Business Profile • Thane West
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                  A1 Furniture Polish Service - <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Thane</span>
                </h1>

                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  Top-rated doorstep wooden furniture polishing, bed structural repair, sofa restoration & PU lacquer finishing in Thane. Serving Pokharan Road, Majiwada, Ghodbunder Road & all Thane West & East localities.
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
                    <span className="font-bold text-white">8 Google Reviews</span> • 100% Satisfied Customers
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
                    href="https://wa.me/918828709945?text=Hi%20A1%20Furniture%20Polish%20Thane,%20I%20need%20a%20free%20quote%20for%20furniture%20polish/repair%20in%20Thane."
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

              {/* GMB Card / Map Quick Info */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-100">
                  <div className="flex items-start justify-between mb-4 border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                        Thane Workshop & Office
                      </span>
                      <h3 className="font-bold text-xl text-slate-900 mt-2">
                        A1 Furniture Polish Service - Thane
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Furniture repair shop & polishing specialist in Thane
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        5.0
                      </div>
                      <span className="text-xs text-gray-400">8 Reviews</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-700 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Address:</strong> Shop No 12, Talwar Compound, Pokharan Rd No. 2, near Tirupati Apartments, Subhash Nagar, Thane West, Thane, Maharashtra 400601
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span><strong>Hours:</strong> Open 24 Hours (7 Days a Week)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                      <span><strong>Direct Contact:</strong> +91 8828709945</span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 text-xs">
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> 100% Doorstep Service
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> Free Inspection & Quote
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> 1-Year Polish Warranty
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg flex items-center gap-2 text-amber-900 font-medium">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" /> Eco-friendly PU Polish
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Us for Thane */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Premier Furniture Care in Thane
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Why Thane Residents Trust A1 Furniture Polish Service
              </h2>
              <p className="text-gray-600 mt-3">
                From luxury apartments in Hiranandani Estate to heritage homes across Thane West & East, we bring master woodcraft directly to your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Doorstep Clean Polish</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No hassle of transporting bulky furniture. Our team brings all protective sheets, odour-less polish, and tools to complete the work safely inside your Thane residence.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Master Italian PU & Melamine</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We use premium Asian Paints PU, Sirca, and ICA Italian polyurethane coatings for mirror-gloss or modern ultra-matte finishes that resist water, tea stains & scratches.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Bed & Sofa Specialists</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialized repair for hydraulic bed lifts, squeaky frames, broken headboards, sofa frame alignment, and upholstery fabric care across Thane.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Complete Woodcare Solutions
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Furniture Polishing & Repair Services in Thane
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{service}</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Expert on-site service with free estimate for all Thane locations.
                    </p>
                    <a
                      href={`https://wa.me/918828709945?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(service)}%20in%20Thane.`}
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

        {/* Landmarks / Localities Served in Thane */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Local Coverage
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Areas We Serve Across Thane
              </h2>
              <p className="text-gray-600 mt-2">
                Our mobile technician units are stationed across Thane for rapid same-day response within 60 minutes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {landmarks.map((landmark, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-sm px-3.5 py-2 rounded-lg font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Google Map & GMB Location Embed Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                  Visit Or Call Our Thane Branch
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                  Find Us in Thane West
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">A1 Furniture Polish Service - Thane</h4>
                    <p className="text-gray-600">
                      Shop No 12, Talwar Compound, Pokharan Rd No. 2, near Tirupati Apartments, Subhash Nagar, Thane West, Thane, Maharashtra 400601
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">Rating</span>
                      <span className="font-bold text-amber-600">5.0 ★ (8 Reviews)</span>
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

              {/* Map Embed */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-lg overflow-hidden h-[380px]">
                  <iframe
                    title="A1 Furniture Polish Service - Thane Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.123!2d72.969!3d19.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEzJzA1LjkiTiA3MsKwNTgnNDEuMiJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin&q=Talwar+Compound+Pokharan+Rd+No+2+Thane+West"
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

        {/* Customer Testimonials (from GMB 5.0 Rating) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Verified Google Feedback
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                What Thane Customers Say
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">5.0 Out of 5 Stars</span>
                <span className="text-gray-400 text-sm">(8 Google Reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <span className="text-xs text-amber-600 font-medium">{t.area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-slate-50 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Questions About Furniture Polish in Thane
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-12 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Need Furniture Polish or Bed Repair in Thane Today?
            </h2>
            <p className="text-amber-100 text-base mb-6">
              Call us now or send photos on WhatsApp for an instant free quote and doorstep inspection anywhere in Thane.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918828709945"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Call +91 8828709945
              </a>
              <a
                href="https://wa.me/918828709945?text=Hi%20A1%20Furniture%20Polish%20Thane,%20I%20want%20to%20book%20a%20free%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-amber-50 text-amber-800 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ThaneLocation;
