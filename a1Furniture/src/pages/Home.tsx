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
import CustomerPhotos from '../components/CustomerPhotos';
import ServiceAreas from '../components/ServiceAreas';
import QuickQuoteCalculator from '../components/QuickQuoteCalculator';
import FAQSection from '../components/FAQSection';
import ContactCTA from '../components/ContactCTA';

const Home = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
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
