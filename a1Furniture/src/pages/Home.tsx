import { lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';
import { localBusiness } from '../data/localBusiness';
import { services as servicesSchema } from '../data/services';
import { reviews, aggregateRating } from '../data/reviews';
import HeroBanner from '../components/HeroBanner';
import TrustBadges from '../components/TrustBadges';
import MobileCategoryScroll from '../components/MobileCategoryScroll';
import ShopByCategories from '../components/ShopByCategories';
import PopularServices from '../components/PopularServices';
import PromoBanner from '../components/PromoBanner';
import OurProcess from '../components/OurProcess';
import StatsSection from '../components/StatsSection';
import CustomerPhotos from '../components/CustomerPhotos';
import ServiceAreas from '../components/ServiceAreas';
import QuickQuoteCalculator from '../components/QuickQuoteCalculator';
import FAQSection from '../components/FAQSection';
import ContactCTA from '../components/ContactCTA';
import ServiceCategoryBar from '../components/ServiceCategoryBar';

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 min-h-screen">
      {/* Mobile SEO Hero — visible only on mobile, after header */}
      <section
        className="md:hidden w-full px-5 pt-5 pb-4"
        style={{ background: 'linear-gradient(135deg, #FFFAF0 0%, #FFF3DC 60%, #FAEBD7 100%)' }}
        aria-label="Professional Furniture Polish Services in Mumbai"
      >
        <h1
          className="text-[1.65rem] font-black leading-tight mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1C0A00', letterSpacing: '-0.5px' }}
        >
          Professional{' '}
          <span style={{ color: '#D97706' }}>Furniture Polish</span>{' '}
          in Mumbai
        </h1>
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#4A2C0A', fontWeight: 500 }}
        >
          Transform your old furniture into brand-new! Expert polishing for sofas,
          beds, wardrobes &amp; more. Premium quality materials, skilled craftsmen,
          and 6-month warranty.
        </p>
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-extrabold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#7B3F00' }}
          >
            Starting at just{' '}
            <span style={{ color: '#D97706', fontSize: '1rem' }}>₹1,299</span>
          </span>
          <span className="h-4 w-px bg-amber-300" />
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: '#FDE68A', color: '#92400E', fontFamily: "'Cormorant Garamond', serif" }}
          >
            ★ 4.9 / 5 Rated
          </span>
        </div>
      </section>

      {/* Mobile Category Scroll - Only on mobile, positioned at top */}
      <div className="md:hidden">
        <MobileCategoryScroll />
      </div>

      {/* Hero Banner - Full width on mobile, below categories */}
      <section className="relative w-full bg-white md:hidden">
        <HeroBanner />
      </section>

      {/* Hero Banner - Desktop only, at top */}
      <section className="hidden md:block relative w-full bg-white">
        <HeroBanner />
      </section>

      {/* Service Category Bar - Horizontal icons for all devices */}
      <ServiceCategoryBar />

      {/* Trust Badges */}
      <section className="bg-white">
        <TrustBadges />
      </section>

      {/* Shop By Categories: Tabbed grid - Hidden on mobile, shown on desktop */}
      <section className="hidden md:block max-w-[1600px] mx-auto px-4 py-8">
        <ShopByCategories />
      </section>

      {/* Popular Services: Horizontal scroll, icons, and highlights */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-10 bg-white" />}>
          <PopularServices />
        </Suspense>
      </section>

      {/* Promo Banner: Golden Polish Sale with service highlights */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <PromoBanner />
      </section>

      {/* Our Process: Step-by-step visual */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16 bg-white" />}>
          <OurProcess />
        </Suspense>
      </section>

      {/* Stats Section: Achievements and Numbers */}
      <StatsSection />

      {/* Customer Photos: Gallery grid */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16" />}>
          <CustomerPhotos />
        </Suspense>
      </section>

      {/* Service Areas: Mumbai locations */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <ServiceAreas />
      </section>

      {/* Quick Quote Calculator */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-16" />}>
          <QuickQuoteCalculator />
        </Suspense>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <FAQSection />
      </section>

      {/* Contact CTA */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <ContactCTA />
      </section>
    </main>
  );
};

export default Home;
