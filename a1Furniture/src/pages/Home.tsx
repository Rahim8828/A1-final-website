import { lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';
import { localBusiness } from '../data/localBusiness';
import { services as servicesSchema } from '../data/services';
import { reviews, aggregateRating } from '../data/reviews';
import HeroBanner from '../components/HeroBanner';
import PromoBanner from '../components/PromoBanner';
import ShopByCategories from '../components/ShopByCategories';
import ServiceAreas from '../components/ServiceAreas';
import StickyWhatsApp from '../components/StickyWhatsApp';
import StickyBookButton from '../components/StickyBookButton';
import TrustBadges from '../components/TrustBadges';
import FAQSection from '../components/FAQSection';
import ContactCTA from '../components/ContactCTA';

// Lazy load heavier sections
const PopularServices = lazy(() => import('../components/PopularServices'));
const OurProcess = lazy(() => import('../components/OurProcess'));
const CustomerPhotos = lazy(() => import('../components/CustomerPhotos'));
const QuickQuoteCalculator = lazy(() => import('../components/QuickQuoteCalculator'));

const Home = () => {
  return (
    <>
      <SEOHead
        title="A1 Furniture Polish — Professional Wooden Furniture Polishing in Mumbai"
        description="Leading furniture polishing services in Mumbai. We restore and polish your wooden furniture to perfection with eco-friendly products and skilled craftsmen. Expert sofa, bed, door, table, wardrobe polish. 6 months warranty. Book now!"
        keywords="furniture polish Mumbai, wood polishing services, sofa polish, bed polish, door polish, table polish, wardrobe polish, furniture restoration Mumbai, A1 furniture polish"
        ogImage="/assets/Sofa And chair.webp"
        canonical={getCanonicalURL('/')}
      />
      <JsonLd data={localBusiness} />
      <JsonLd data={servicesSchema} />
      {reviews.map((review, index) => (
        <JsonLd key={`review-${index}`} data={review} />
      ))}
      <JsonLd data={aggregateRating} />

      {/* Sticky Buttons */}
      <StickyWhatsApp />
      <StickyBookButton />

      {/* Desktop: Banner first, Services second | Mobile: Services first, Banner second */}
      <div className="flex flex-col">
        {/* Popular Services — shows first on mobile (order-1), second on desktop (md:order-2) */}
        <div className="order-1 md:order-2">
          <Suspense fallback={<div className="py-10 bg-white" />}>
            <PopularServices />
          </Suspense>
        </div>

        {/* Hero Banner — shows second on mobile (order-2), first on desktop (md:order-1) */}
        <div className="order-2 md:order-1">
          <HeroBanner />
        </div>
      </div>

      {/* 3. Sales Promo — Golden Polish Sale with service highlights */}
      <PromoBanner />

      {/* 4. Service By Categories — Tabbed product grid with hover image swap */}
      <ShopByCategories />

      {/* 4. Trust Badges */}
      <TrustBadges />

      {/* 5. Our Process */}
      <Suspense fallback={<div className="py-16 bg-white" />}>
        <OurProcess />
      </Suspense>

      {/* 6. Customer Photos */}
      <Suspense fallback={<div className="py-16" />}>
        <CustomerPhotos />
      </Suspense>

      {/* 7. Service Areas — Mumbai locations */}
      <ServiceAreas />

      {/* 8. Quick Quote Calculator */}
      <Suspense fallback={<div className="py-16" />}>
        <QuickQuoteCalculator />
      </Suspense>

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Contact CTA */}
      <ContactCTA />
    </>
  );
};

export default Home;
