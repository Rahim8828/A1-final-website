import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Phone, MapPin, CheckCircle, ChevronRight, Home, Award, Droplets, Sparkles } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';

/* ───────── Popular Services (Circular cards) ───────── */
const popularServices = [
  { name: 'Sofa Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=sofa-polish' },
  { name: 'Bed Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=bed-polish' },
  { name: 'Wardrobe Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=wardrobe-polish' },
  { name: 'Door Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=door-polish' },
  { name: 'Dining Set Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=dining-set-polish' },
  { name: 'Table Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=table-polish' },
  { name: 'Cabinet Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=cabinet-polish' },
  { name: 'Mandir Polish', image: '/assets/Antique Restoration.jpg', link: '/services?service=mandir-polish' },
];

/* ───────── Types of Wood We Polish ───────── */
const woodTypes = [
  { name: 'TEAKWOOD', image: '/assets/Antique Restoration.jpg' },
  { name: 'VENEER', image: '/assets/Antique Restoration.jpg' },
  { name: 'WALNUT', image: '/assets/Antique Restoration.jpg' },
  { name: 'MDF', image: '/assets/Antique Restoration.jpg' },
  { name: 'SOLID WOOD', image: '/assets/Antique Restoration.jpg' },
  { name: 'PLYWOOD', image: '/assets/Antique Restoration.jpg' },
];

/* ───────── Our Polishing Services (Detail cards) ───────── */
const polishingServices = [
  {
    name: 'Melamine Polish',
    image: '/products/FloorPoshining/melamine_polish.webp',
    finish: 'Matte / Glossy.',
    base: 'Synthetic resin.',
    use: 'Modern furniture, interior panels.',
    pros: 'Durable, water-resistant.',
    cons: 'Requires professional application.',
  },
  {
    name: 'Natural Wood Polish',
    image: '/products/FloorPoshining/wooden_polish.webp',
    finish: 'Depends on wood type.',
    use: 'For highlighting raw wood texture.',
    pros: 'Organic look.',
    cons: 'Needs frequent maintenance.',
  },
  {
    name: 'French Polish',
    image: '/products/FloorPoshining/french_polishh.webp',
    finish: 'High-gloss, mirror-like sheen.',
    base: 'Shellac dissolved in alcohol.',
    use: 'Heritage furniture, traditional pieces.',
    pros: 'Beautiful deep finish, enhances wood grain.',
    cons: 'Not scratch-resistant, needs care.',
  },
  {
    name: 'Lamination Polish (Polyester Coating)',
    image: '/products/FloorPoshining/lamination_polishing.webp',
    finish: 'Ultra-glossy, smooth.',
    base: 'Polyester resin.',
    use: 'Kitchen shutters, modern furniture.',
    pros: 'Mirror finish, very durable.',
    cons: 'Requires professional application.',
  },
  {
    name: 'Wax Polish',
    image: '/products/FloorPoshining/wax_polish.webp',
    finish: 'Soft satin sheen.',
    base: 'Natural beeswax or carnauba.',
    use: 'Traditional furniture, solid wood pieces.',
    pros: 'Natural, easy to apply, pleasant aroma.',
    cons: 'Needs re-application, not water-resistant.',
  },
  {
    name: 'Monocoat Oil Polish',
    image: '/products/FloorPoshining/morgon_monocoat.webp',
    finish: 'Natural matte.',
    base: 'Plant-based oil.',
    use: 'Solid hardwood, tabletops, floors.',
    pros: 'One-coat application, eco-friendly, food-safe.',
    cons: 'Premium pricing.',
  },
];

/* ───────── Service Areas ───────── */
const serviceAreas = [
  { name: 'Andheri East', link: null },
  { name: 'Andheri West', link: null },
  { name: 'Bandra', link: null },
  { name: 'Powai', link: '/powai-furniture-polish' },
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
  { name: 'Dadar', link: '/dadar' },
  { name: 'Vikhroli', link: null },
  { name: 'Ghatkopar', link: null },
];

/* ───────── FAQs ───────── */
const faqs = [
  {
    q: 'What types of wooden furniture do you polish?',
    a: 'We polish all kinds of wooden furniture — beds, sofas, dining tables, wardrobes, doors, cabinets, mandirs, TV units, bookshelves, jhulas, and more. If it\'s wood, we can polish it!',
  },
  {
    q: 'Which wood polish is best for kitchen cabinets?',
    a: 'Melamine polish is the best choice for kitchen cabinets due to its superior scratch-resistance, water-resistance, and long-lasting durability. Available in gloss and matte finishes.',
  },
  {
    q: 'How much does furniture polish cost in Mumbai?',
    a: 'Our professional furniture polishing starts from ₹1,299 for small items. Cost depends on furniture size, wood type, polish type, and surface condition. We provide free on-site estimates.',
  },
  {
    q: 'Can you remove scratches and water stains from wooden furniture?',
    a: 'Yes! Our skilled technicians specialize in removing scratches, water marks, heat stains, and other blemishes before applying a fresh coat of polish to restore your furniture\'s beauty.',
  },
  {
    q: 'What is the difference between French Polish and Melamine Polish?',
    a: 'French Polish gives a deep, mirror-like finish using shellac — perfect for heritage pieces but requires more delicate care. Melamine Polish provides a durable, scratch-resistant film ideal for modern furniture and high-traffic areas.',
  },
  {
    q: 'Do you offer on-site polishing or pickup/delivery service?',
    a: 'Yes, we offer on-site polishing at your home or office across Mumbai. For larger jobs, we also provide pickup and delivery service. Same-day service available in select areas.',
  },
  {
    q: 'How long does furniture polishing take?',
    a: 'Most single items are completed in 1–2 days. Larger projects like full-home furniture polishing may take 3–5 days depending on the number of items and polish type.',
  },
  {
    q: 'Do you provide a warranty on polishing work?',
    a: 'Yes, we provide a 6-month warranty on all polishing services. Our quality craftsmanship ensures long-lasting results.',
  },
];

/* ───────── Component ───────── */
const WoodPolishingServices: React.FC = () => {
  const pageUrl = 'https://a1furniturepolish.com/wood-polishing-services';
  const a1Tel = '+918828709945';
  const a1Whatsapp = 'https://wa.me/918828709945';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish',
    image: 'https://a1furniturepolish.com/logo.png',
    telephone: a1Tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jogeshwari West',
      addressLocality: 'Mumbai',
      addressRegion: 'MH',
      postalCode: '400102',
      addressCountry: 'IN',
    },
    url: pageUrl,
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2340',
    },
    serviceType: 'Wood Polishing Services',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bandra' },
      { '@type': 'City', name: 'Andheri' },
      { '@type': 'City', name: 'Goregaon' },
      { '@type': 'City', name: 'Powai' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://a1furniturepolish.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://a1furniturepolish.com/services' },
      { '@type': 'ListItem', position: 3, name: 'Wood Polishing Services', item: pageUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title="Wood Polishing Services in Mumbai | French, Melamine, Wax Polish — A1 Furniture Polish"
        description="Professional wood polishing services in Mumbai. Expert French polish, Melamine, Wax, Monocoat & Lamination polish for all wooden furniture. 30+ years experience, 6-month warranty. Starting ₹1,299. Call now!"
        keywords="wood polishing services mumbai, furniture polish mumbai, french polish, melamine polish, wax polish, monocoat, lamination polish, wooden furniture polishing, best wood polish mumbai, furniture restoration, wood refinishing mumbai"
        ogImage="/products/FloorPoshining/wooden_polish.webp"
        canonical={getCanonicalURL('/wood-polishing-services')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ══════════ BREADCRUMB ══════════ */}
      <section className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center hover:text-amber-600 transition-colors">
              <Home size={14} className="mr-1" /> Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/services" className="hover:text-amber-600 transition-colors">Services</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-amber-600 font-medium">Wood Polishing Services</span>
          </nav>
        </div>
      </section>

      {/* ══════════ HERO BANNER ══════════ */}
      <section className="relative overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[480px]">
          <img
            src="/products/FloorPoshining/wooden_polish.webp"
            alt="Professional Wood Polishing Services in Mumbai — A1 Furniture Polish"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">30+ YEARS EXPERIENCE</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    <span className="text-white text-xs ml-1">4.9/5</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  Professional <span className="text-amber-400">Wood Polishing</span> Services in Mumbai
                </h1>
                <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-5 leading-relaxed">
                  From classic French Polish to modern PU and Melamine — we bring 30+ years of craftsmanship to every piece of furniture.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${a1Tel}`}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-lg"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href={a1Whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-lg"
                  >
                    WhatsApp Us
                  </a>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                  >
                    View All Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ POPULAR SERVICES — Circular Cards ══════════ */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Our Furniture Polishing Services</h2>
              <p className="text-gray-500 text-sm">Expert polish for every piece of furniture</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-x-6 gap-y-8 justify-items-center">
            {popularServices.map((service) => (
              <Link key={service.name} to={service.link} className="flex flex-col items-center gap-3 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 ring-2 ring-amber-100 group-hover:ring-amber-300">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-amber-700 transition-colors">{service.name}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to="/services" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ TYPES OF WOOD WE POLISH ══════════ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Wood grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {woodTypes.map((wood) => (
                <div key={wood.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={wood.image} alt={`${wood.name} furniture polishing`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <p className="text-center py-3 font-bold text-gray-800 text-sm tracking-wide">{wood.name}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Types of Wood We Polish</h2>
              <p className="text-gray-600 leading-relaxed">
                We bring 30+ years of craftsmanship and expertise in premium wood polishing — from classic French Polish to modern Melamine, Monocoat, and high-gloss Polyester Lamination. Whether it's open grain or smooth filled finish, our skilled team ensures perfection in every stroke.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield size={16} className="text-amber-600" /> 6-Month Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Award size={16} className="text-amber-600" /> Expert Craftsmen
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Droplets size={16} className="text-amber-600" /> Eco-Friendly Materials
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ OUR WOOD POLISHING SERVICES — Detail Cards ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Wood Polishing Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from 6+ professional wood polish types. Each polish is carefully selected based on your furniture type, usage, and desired finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {polishingServices.map((service) => (
              <div key={service.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-3 uppercase tracking-wide">{service.name}</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p><span className="font-bold">Finish</span>: {service.finish}</p>
                    {service.base && <p><span className="font-bold">Base</span>: {service.base}</p>}
                    <p><span className="font-bold">Use</span>: {service.use}</p>
                    <p><span className="font-bold">Pros</span>: {service.pros}</p>
                    <p><span className="font-bold">Cons</span>: {service.cons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Why Choose A1 Furniture Polish?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award className="w-8 h-8 text-amber-600" />, title: '30+ Years Experience', desc: 'Trusted by thousands of Mumbai families for premium furniture polishing.' },
              { icon: <Shield className="w-8 h-8 text-amber-600" />, title: '6-Month Warranty', desc: 'Our confidence in quality — every job comes with full warranty coverage.' },
              { icon: <Sparkles className="w-8 h-8 text-amber-600" />, title: 'Premium Materials', desc: 'We use only top-grade polish materials from trusted brands for lasting results.' },
              { icon: <Clock className="w-8 h-8 text-amber-600" />, title: 'On-Time Delivery', desc: 'Punctual, professional service — we respect your time and schedule.' },
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

      {/* ══════════ SERVICE AREAS ══════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-3 md:mb-4 gap-2">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Wood Polishing Service Areas in Mumbai
              </h2>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              We provide professional wood polishing services across Mumbai. Same-day service available in select areas!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {serviceAreas.map((area, index) =>
              area.link ? (
                <Link key={index} to={area.link} className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-amber-50 group border border-transparent hover:border-amber-200">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-amber-600 transition-colors" />
                  <span className="text-sm md:text-base text-gray-700 font-medium group-hover:text-amber-600 leading-snug transition-colors">{area.name}</span>
                </Link>
              ) : (
                <div key={index} className="flex items-start space-x-2 bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-700 font-medium leading-snug">{area.name}</span>
                </div>
              )
            )}
          </div>

          <div className="mt-8 md:mt-12 text-center px-4">
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Don't see your area? <span className="font-semibold">We cover all of Mumbai!</span>
            </p>
            <a
              href={`tel:${a1Tel}`}
              className="inline-flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold text-sm md:text-base w-full sm:w-auto"
            >
              <Phone size={16} />
              <span>Call to Check Availability</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ SEO DESCRIPTION ══════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Professional Wood Polishing Services in Mumbai — A1 Furniture Polish
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              <strong>A1 Furniture Polish</strong> is Mumbai's most trusted name for professional <strong>wood polishing services</strong>. With over <strong>30 years of experience</strong> and a team of skilled craftsmen, we specialize in restoring and refinishing all types of wooden furniture — from antique heirlooms to modern modular pieces.
            </p>
            <p>
              Our comprehensive range of wood polish options includes <strong>French Polish</strong> for classic mirror-shine beauty, <strong>Melamine Polish</strong> for durable waterproofing, <strong>Wax Polish</strong> for natural wood warmth, <strong>Monocoat Oil</strong> for single-coat hardwood protection, and <strong>Lamination (Polyester) Polish</strong> for ultra-glossy modern furniture.
            </p>
            <p>
              We polish all types of wood including <strong>Teakwood, Walnut, Veneer, MDF, Solid Wood, and Plywood</strong>. Our services cover sofas, beds, dining tables, wardrobes, doors, cabinets, TV units, bookshelves, mandirs, jhulas, kitchen cabinets, and more.
            </p>
            <p>
              Whether you need <strong>furniture restoration in Andheri</strong>, <strong>French polish in Bandra</strong>, <strong>Melamine polish in Goregaon</strong>, or <strong>wood refinishing in Powai</strong> — A1 Furniture Polish delivers factory-quality results at your doorstep. We serve all areas across <strong>Mumbai, Navi Mumbai, and Thane</strong>.
            </p>
            <p>
              Every project comes with a <strong>6-month warranty</strong>, premium eco-friendly materials, and our commitment to 100% customer satisfaction. <strong>Starting from just ₹1,299</strong>, professional wood polishing has never been more affordable.
            </p>
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
                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Furniture?</h2>
          <p className="text-amber-100 text-lg mb-8">
            Get a free consultation and quote. Our expert team is just a call away!
          </p>
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

export default WoodPolishingServices;
