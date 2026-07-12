import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Star } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';
import { localBusiness } from '../data/localBusiness';
import { services as servicesSchema } from '../data/services';
import { reviews, aggregateRating } from '../data/reviews';
import TrustBadges from '../components/TrustBadges';
import MobileCategoryScroll from '../components/MobileCategoryScroll';
import ShopByCategories from '../components/ShopByCategories';
import OurProcess from '../components/OurProcess';
import StatsSection from '../components/StatsSection';
import CustomerPhotos from '../components/CustomerPhotos';
import ServiceAreas from '../components/ServiceAreas';
import QuickQuoteCalculator from '../components/QuickQuoteCalculator';
import FAQSection from '../components/FAQSection';
import ContactCTA from '../components/ContactCTA';
import ServiceCategoryBar from '../components/ServiceCategoryBar';

// FAQ data for JSON-LD structured data
const homeFaqs = [
  {
    question: 'How quickly can you start the furniture polishing work?',
    answer: 'We offer same-day service for most areas in Mumbai. Book before 2 PM and we can start the same day. Emergency services available within 2-4 hours.',
  },
  {
    question: 'What type of polish do you use? Is it safe?',
    answer: 'We use premium quality PU (Polyurethane) polish, Deco paint, and melamine polish. All materials are eco-friendly, non-toxic, and safe for homes with children and pets. We provide 6 months warranty on all polishing work.',
  },
  {
    question: 'How long does the polishing work take?',
    answer: 'Small items (1-2 shelves): 2-3 hours | Medium furniture (bookshelf, TV unit): 4-6 hours | Large items (wardrobes): 1-2 days. Drying time is additional 24-48 hours depending on weather.',
  },
  {
    question: 'What is included in the price?',
    answer: 'Our price includes: Material cost (polish, sandpaper, primer), Labor charges, Transportation of materials, and 6 months service warranty. No hidden charges.',
  },
  {
    question: 'Do you provide color matching service?',
    answer: 'Yes! We can match any existing color or help you choose from 100+ shade options. We do a test patch before starting the full work to ensure perfect color match.',
  },
  {
    question: 'What if I am not satisfied with the work?',
    answer: 'We offer 100% satisfaction guarantee. If you are not happy with the work, we will redo it for free within 7 days. We also provide 6 months warranty against peeling or color fading.',
  },
];

// JSON-LD structured data for SEO
const homeStructuredData = [
  // LocalBusiness schema
  localBusiness,
  // WebSite schema with search action
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'A1 Furniture Polish',
    url: 'https://a1furniturepolish.com',
    description: 'Professional furniture polishing services in Mumbai. 15+ services including sofa, bed, door, table, wardrobe polish with 1-year warranty.',
  },
  // FAQPage schema
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Furniture Polish Services in Mumbai | A1 Furniture Polish</title>
        <meta name="description" content="Professional furniture polishing services in Mumbai. Expert wood polish, sofa repair, bed polish & more. Same-day booking & 6-month warranty. Book now!" />
        <meta name="keywords" content="furniture polish mumbai, wood polish mumbai, sofa polish, bed polish, wardrobe polish, door polish, antique restoration, furniture polishing near me, best furniture polish services" />
        <link rel="canonical" href={getCanonicalURL('/')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="A1 Furniture Polish" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Furniture Polish Services in Mumbai | A1 Furniture Polish" />
        <meta property="og:description" content="Professional furniture polishing services in Mumbai. 15+ services, same-day booking, 6-month warranty." />
        <meta property="og:url" content={getCanonicalURL('/')} />
        <meta property="og:site_name" content="A1 Furniture Polish" />
        <meta property="og:image" content="https://a1furniturepolish.com/android-chrome-512x512.png" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Furniture Polish Services in Mumbai | A1 Furniture Polish" />
        <meta name="twitter:description" content="Professional furniture polishing services in Mumbai. 15+ services, same-day booking, 6-month warranty." />
        <meta name="twitter:image" content="https://a1furniturepolish.com/android-chrome-512x512.png" />

        {/* Structured Data */}
        {homeStructuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>
      {/* Unified Premium Hero Section (matching screenshot UI) */}
      <section className="bg-[#FAF6F0] pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-start text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 max-w-4xl">
            Professional <span className="text-[#D97706]">Furniture Polish</span> in Mumbai
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">
            Transform your old furniture into brand new! Expert polishing for sofas, beds, wardrobes &amp; more. Premium quality materials, skilled craftsmen, and 6-month warranty. Starting at just ₹1,299.
          </p>

          {/* Hero Image with Rating Badge */}
          <div className="relative w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100 aspect-[16/10] bg-gray-50">
            <img
              src="/assets/Homepage-Header.webp"
              alt="Professional Furniture Polish Service"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Rating Overlay */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-50 z-10 flex flex-col items-start">
              <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </div>
              <span className="font-extrabold text-gray-900 text-xs sm:text-sm">4.8/5 Rating</span>
              <span className="text-[10px] text-gray-500 font-medium">127+ Happy Customers</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45F06] text-white px-8 py-3.5 rounded-xl font-bold uppercase text-sm tracking-wider shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+918828709945"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-[#D97706] border-2 border-[#D97706] px-8 py-3.5 rounded-xl font-bold uppercase text-sm tracking-wider transition-all duration-200 active:scale-95"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Service Category Bar - Horizontal icons for all devices */}
      <ServiceCategoryBar />

      {/* Trust Badges */}
      <section className="bg-white">
        <TrustBadges />
      </section>

      {/* Shop By Categories: Tabbed grid - Hidden on mobile, shown on desktop */}
      <section className="hidden md:block max-w-6xl mx-auto px-4 py-8">
        <ShopByCategories />
      </section>





      {/* Our Process: Step-by-step visual */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16 bg-white" />}>
          <OurProcess />
        </Suspense>
      </section>

      {/* Stats Section: Achievements and Numbers */}
      <StatsSection />

      {/* Customer Photos: Gallery grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16" />}>
          <CustomerPhotos />
        </Suspense>
      </section>

      {/* Service Areas: Mumbai locations */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <ServiceAreas />
      </section>

      {/* Quick Quote Calculator */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16" />}>
          <QuickQuoteCalculator />
        </Suspense>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <FAQSection />
      </section>

      {/* Contact CTA */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <ContactCTA />
      </section>
    </main>
  );
};

export default Home;
