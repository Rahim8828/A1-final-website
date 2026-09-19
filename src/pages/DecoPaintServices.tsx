import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Phone, MapPin, CheckCircle, ChevronRight, Home, Award, Palette, Sparkles, Paintbrush, Layers } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';

/* ───────── Deco Paint Services ───────── */
const decoPaintServices = [
  {
    name: 'Solid Colour Deco Paint',
    image: '/products/deco_paint/solid_decoPaint.webp',
    price: '₹2,999',
    originalPrice: '₹3,899',
    badge: 'Popular',
    time: '4-5 hrs',
    description: 'Smooth, opaque, factory-style finish in any colour. Transform old furniture with a completely new look. Available in white, grey, pastels, and bold shades.',
    features: ['Any colour of your choice', 'Factory-level smooth finish', '6-month warranty', 'Scratch-resistant coating'],
    ideal: 'Wardrobes, kitchen shutters, TV units, bookshelves',
  },
  {
    name: 'Texture Deco Paint',
    image: '/products/deco_paint/texture_deco_paint.webp',
    price: '₹3,499',
    originalPrice: '₹4,499',
    badge: null,
    time: '5-6 hrs',
    description: 'Add dimension and character with stunning texture patterns — stone, linen, marble, and wood grain effects. A showstopper finish for statement furniture pieces.',
    features: ['Unique texture patterns', 'Stone & marble effects', '6-month warranty', 'Premium imported materials'],
    ideal: 'Feature walls, accent furniture, console tables',
  },
  {
    name: 'Designer Deco Paint',
    image: '/products/deco_paint/designer_deco_paint.webp',
    price: '₹4,499',
    originalPrice: '₹5,799',
    badge: 'Premium',
    time: '6-8 hrs',
    description: 'Custom hand-painted motifs, ombre effects, metallic accents, and designer patterns by expert artists. Luxury finishing for bespoke interiors.',
    features: ['Custom hand-painted designs', 'Metallic & ombre effects', '6-month warranty', 'Bespoke patterns'],
    ideal: 'Luxury homes, heritage furniture, bedroom statements',
  },
];

/* ───────── What We Paint ───────── */
const furnitureTypes = [
  { name: 'Wardrobes', icon: '🗄️' },
  { name: 'Kitchen Shutters', icon: '🚪' },
  { name: 'TV Units', icon: '📺' },
  { name: 'Dining Tables', icon: '🍽️' },
  { name: 'Bookshelves', icon: '📚' },
  { name: 'Bed Frames', icon: '🛏️' },
  { name: 'Cabinets', icon: '🏪' },
  { name: 'Console Tables', icon: '🪑' },
  { name: 'Study Tables', icon: '📖' },
  { name: 'Shoe Racks', icon: '👟' },
  { name: 'Mandir / Pooja Units', icon: '🪔' },
  { name: 'Door Frames', icon: '🚪' },
];

/* ───────── Process Steps ───────── */
const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'Our expert visits your home, inspects furniture, and discusses colour & finish options.' },
  { step: '02', title: 'Surface Preparation', desc: 'Thorough sanding, cleaning, and priming to ensure perfect paint adhesion.' },
  { step: '03', title: 'Paint Application', desc: 'Multiple coats of premium deco paint applied with professional spray equipment.' },
  { step: '04', title: 'Quality Check & Handover', desc: 'Final inspection, touch-ups, and handover with 6-month warranty card.' },
];

/* ───────── Service Areas ───────── */
const serviceAreas = [
  { name: 'Andheri East', link: null }, { name: 'Andheri West', link: null },
  { name: 'Bandra', link: null }, { name: 'Powai', link: '/powai-furniture-polish' },
  { name: 'Jogeshwari', link: null }, { name: 'Goregaon', link: '/goregaon-furniture-polish' },
  { name: 'Malad', link: null }, { name: 'Kandivali', link: null },
  { name: 'Borivali', link: null }, { name: 'Dahisar', link: null },
  { name: 'Santacruz', link: null }, { name: 'Vile Parle', link: null },
  { name: 'Juhu', link: null }, { name: 'Versova', link: null },
  { name: 'Oshiwara', link: null }, { name: 'Lokhandwala', link: null },
  { name: 'Khar', link: null }, { name: 'Dadar', link: '/dadar' },
  { name: 'Vikhroli', link: null }, { name: 'Ghatkopar', link: null },
];

/* ───────── FAQs ───────── */
const faqs = [
  { q: 'What is deco paint for furniture?', a: 'Deco paint is a specialised decorative paint service that gives your furniture a completely new, factory-finish look. Unlike traditional polish, it covers the wood entirely with smooth, coloured paint — available in solid colours, textures, metallic finishes, and custom designer patterns.' },
  { q: 'How much does deco paint cost in Mumbai?', a: 'Deco paint for furniture starts from ₹2,999 for solid colour finishes. Texture paint starts from ₹3,499 and designer/hand-painted finishes start from ₹4,499. Final pricing depends on furniture size, surface condition, and chosen design.' },
  { q: 'How long does deco paint last on furniture?', a: 'Professional deco paint lasts 5-8 years with proper care. We use premium imported paints with scratch-resistant clear coat protection. All our work comes with a 6-month warranty.' },
  { q: 'Can you change the colour of dark wood furniture to white?', a: 'Absolutely! Deco paint can completely transform dark wood furniture into any colour — white, grey, pastels, or bold shades. We sand and prime the surface thoroughly for perfect colour coverage.' },
  { q: 'Is deco paint better than regular polish for old furniture?', a: 'If your furniture has extensive damage, stains, or you want a completely new colour/look, deco paint is ideal. It covers imperfections and gives a fresh, modern appearance. For preserving natural wood grain, traditional polish is better.' },
  { q: 'Do you do deco paint on kitchen cabinets?', a: 'Yes! Kitchen cabinet deco paint is one of our most popular services. We use water-resistant, heat-resistant paint specifically designed for kitchen environments. Available in hundreds of colours.' },
  { q: 'Can I choose any custom colour for deco paint?', a: 'Yes, we offer unlimited colour choices! Bring a sample, share a photo, or pick from our colour catalogue. We can colour-match to any shade you desire, including metallic and pearlescent finishes.' },
  { q: 'Do you provide on-site deco paint service?', a: 'Yes, all our deco paint services are done on-site at your home or office. Our team brings professional spray equipment and protective covering to ensure a clean, hassle-free experience.' },
];

/* ───────── Component ───────── */
const DecoPaintServices: React.FC = () => {
  const a1Tel = '+918828709945';
  const a1Whatsapp = 'https://wa.me/918828709945';
  const pageUrl = 'https://a1furniturepolish.com/deco-paint-services';

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish — Deco Paint Services',
    image: 'https://a1furniturepolish.com/logo.png',
    telephone: a1Tel,
    address: { '@type': 'PostalAddress', streetAddress: 'Jogeshwari West', addressLocality: 'Mumbai', addressRegion: 'MH', postalCode: '400102', addressCountry: 'IN' },
    url: pageUrl, priceRange: '₹₹',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1850' },
    serviceType: 'Deco Paint Services',
    areaServed: [{ '@type': 'City', name: 'Mumbai' }, { '@type': 'City', name: 'Navi Mumbai' }, { '@type': 'City', name: 'Thane' }],
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://a1furniturepolish.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://a1furniturepolish.com/services' },
      { '@type': 'ListItem', position: 3, name: 'Deco Paint Services', item: pageUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title="Deco Paint Services in Mumbai | Solid, Texture & Designer Finishes — A1 Furniture Polish"
        description="Professional deco paint services for furniture in Mumbai. Solid colour, texture, metallic & designer hand-painted finishes. Transform old furniture into stunning statement pieces. Starting ₹2,999. 6-month warranty. Call now!"
        keywords="deco paint mumbai, furniture deco paint, decorative paint furniture, texture paint furniture, designer paint furniture, solid colour paint furniture, kitchen cabinet paint mumbai, furniture makeover mumbai, furniture painting service"
        ogImage="/products/deco_paint/decoPaint_Header/deco_paint_page_header.webp"
        canonical={getCanonicalURL('/deco-paint-services')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ══════════ BREADCRUMB ══════════ */}
      <section className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center hover:text-amber-600 transition-colors"><Home size={14} className="mr-1" /> Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/services" className="hover:text-amber-600 transition-colors">Services</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-amber-600 font-medium">Deco Paint Services</span>
          </nav>
        </div>
      </section>

      {/* ══════════ HERO BANNER ══════════ */}
      <section className="relative overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[480px]">
          <img
            src="/products/deco_paint/decoPaint_Header/deco_paint_page_header.webp"
            alt="Professional Deco Paint Services in Mumbai — A1 Furniture Polish"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">DECORATIVE FINISHES</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    <span className="text-white text-xs ml-1">4.9/5</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  Professional <span className="text-amber-400">Deco Paint</span> Services in Mumbai
                </h1>
                <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-5 leading-relaxed">
                  Give your furniture a stunning new identity. Solid colours, artistic textures, metallic accents, and custom designer finishes by expert painters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${a1Tel}`} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-lg">
                    <Phone size={16} /> Call Now
                  </a>
                  <a href={a1Whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-lg">
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ DECO PAINT SERVICES — Main Cards ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Palette size={16} /> Our Deco Paint Collection
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Transform Your Furniture with Deco Paint</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from three stunning finish categories — each crafted to breathe new life into your furniture.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {decoPaintServices.map((service) => (
              <div key={service.name} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 relative">
                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${service.badge === 'Premium' ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' : 'bg-amber-500 text-white'}`}>
                      {service.badge}
                    </span>
                  </div>
                )}
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-black text-amber-600">{service.price}</span>
                    <span className="text-sm text-gray-400 line-through">{service.originalPrice}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                      SAVE {Math.round(((parseInt(service.originalPrice.replace(/[₹,]/g, '')) - parseInt(service.price.replace(/[₹,]/g, ''))) / parseInt(service.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Clock size={14} /> <span>Estimated: {service.time}</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">Ideal for: {service.ideal}</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href={`tel:${a1Tel}`} className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md group-hover:shadow-lg">
                    <Phone size={16} /> Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE PAINT ══════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Furniture We Deco Paint</h2>
            <p className="text-gray-400 max-w-xl mx-auto">From kitchen cabinets to bedroom wardrobes — we paint it all.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {furnitureTypes.map((item) => (
              <div key={item.name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 hover:border-amber-500/40 transition-all duration-300 group">
                <div className="text-3xl mb-2">{item.icon}</div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-amber-400 transition-colors">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OUR PROCESS ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600">Our streamlined 4-step process ensures a perfect finish every time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 group hover:shadow-lg transition-all duration-300">
                <div className="text-5xl font-black text-amber-200 mb-3 group-hover:text-amber-300 transition-colors">{step.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-amber-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Why Choose A1 for Deco Paint?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Paintbrush className="w-8 h-8 text-amber-600" />, title: 'Expert Painters', desc: 'Skilled artists with 10+ years in decorative furniture finishing.' },
              { icon: <Palette className="w-8 h-8 text-amber-600" />, title: 'Unlimited Colours', desc: 'Choose from thousands of shades. Custom colour matching available.' },
              { icon: <Layers className="w-8 h-8 text-amber-600" />, title: 'Premium Paints', desc: 'We use top imported brands for scratch-resistant, long-lasting finishes.' },
              { icon: <Shield className="w-8 h-8 text-amber-600" />, title: '6-Month Warranty', desc: 'Full warranty on all deco paint work. Quality you can trust.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BEFORE & AFTER GALLERY CONCEPT ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Deco Paint Finishes</h2>
            <p className="text-gray-600">See the stunning finishes we deliver</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {decoPaintServices.map((s) => (
              <div key={s.name} className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={s.image} alt={s.name} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg">{s.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-amber-400 font-bold">{s.price}</span>
                    <span className="text-sm text-gray-300">onwards</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE AREAS ══════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-3 gap-2">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Deco Paint Service Areas in Mumbai</h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Professional deco paint services across Mumbai. Same-day consultations available!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {serviceAreas.map((area, i) =>
              area.link ? (
                <Link key={i} to={area.link} className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-lg transition-all hover:bg-amber-50 group border border-transparent hover:border-amber-200">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-amber-600" />
                  <span className="text-sm md:text-base text-gray-700 font-medium group-hover:text-amber-600">{area.name}</span>
                </Link>
              ) : (
                <div key={i} className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-700 font-medium">{area.name}</span>
                </div>
              )
            )}
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-sm md:text-base text-gray-600 mb-4">Don't see your area? <span className="font-semibold">We cover all of Mumbai!</span></p>
            <a href={`tel:${a1Tel}`} className="inline-flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-sm md:text-base w-full sm:w-auto">
              <Phone size={16} /><span>Call to Check Availability</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ SEO DESCRIPTION ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Professional Deco Paint Services in Mumbai — A1 Furniture Polish</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p><strong>A1 Furniture Polish</strong> offers Mumbai's finest <strong>deco paint services for furniture</strong>. Whether you want to transform a tired old wardrobe into a sleek white beauty, add artistic texture to your TV unit, or create a one-of-a-kind designer finish for your bedroom furniture — our expert painters deliver stunning results.</p>
            <p>Our <strong>solid colour deco paint</strong> gives furniture a flawless, factory-smooth finish in any shade — from classic whites and greys to bold reds and navy blues. <strong>Texture deco paint</strong> adds depth with stone, marble, linen, and wood grain effects that turn ordinary furniture into statement pieces. For luxury homes, our <strong>designer deco paint</strong> includes custom hand-painted motifs, ombre gradients, metallic gold/silver accents, and bespoke patterns.</p>
            <p>We specialise in deco painting all types of furniture: <strong>kitchen cabinets, wardrobes, TV units, dining tables, bookshelves, bed frames, console tables, shoe racks, mandirs</strong>, and more. Using <strong>premium imported paints</strong> and professional spray equipment, we ensure a smooth, scratch-resistant finish that lasts years.</p>
            <p>Available across <strong>Mumbai, Navi Mumbai, and Thane</strong> — including <strong>Andheri, Bandra, Powai, Goregaon, Juhu, Malad, Borivali, Dadar</strong>, and all other areas. Every project includes a <strong>6-month warranty</strong> and free colour consultation. <strong>Starting from just ₹2,999.</strong></p>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ SECTION ══════════ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 group" {...(idx === 0 ? { open: true } : {})}>
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:text-amber-700 transition-colors">
                  <span className="pr-4">{faq.q}</span>
                  <ChevronRight size={18} className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sparkles className="w-10 h-10 mx-auto mb-4 text-amber-200" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Furniture?</h2>
          <p className="text-amber-100 text-lg mb-8">Get a free colour consultation and quote. Share a photo on WhatsApp for instant pricing!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${a1Tel}`} className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg">
              <Phone size={20} /> Call +91 88287 09945
            </a>
            <a href={a1Whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default DecoPaintServices;
