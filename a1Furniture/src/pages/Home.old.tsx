import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Phone } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { getCanonicalURL } from '../utils/canonicalURL';
import { localBusiness } from '../data/localBusiness.ts';
import { services as servicesSchema } from '../data/services.ts';
import { reviews, aggregateRating } from '../data/reviews.ts';
import UrgencyNotification from '../components/UrgencyNotification';
import StickyWhatsApp from '../components/StickyWhatsApp';
import StickyBookButton from '../components/StickyBookButton';
import PopularServices from '../components/PopularServices';
import CustomerPhotos from '../components/CustomerPhotos';
import TrustBadges from '../components/TrustBadges.tsx';
import OfferBanner from '../components/OfferBanner.tsx';
import QuickQuoteCalculator from '../components/QuickQuoteCalculator.tsx';
import FAQSection from '../components/FAQSection.tsx';
import WhyBookOnline from '../components/WhyBookOnline.tsx';
import FinalCTA from '../components/FinalCTA';
import ContactCTA from '../components/ContactCTA';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

// Lazy load heavy components
const OurProcess = lazy(() => import('../components/OurProcess'));
const ExitIntentPopup = lazy(() => import('../components/ExitIntentPopup'));
const StatsCounter = lazy(() => import('../components/StatsCounter'));

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

      {/* Offer Banner */}
      <OfferBanner />

      {/* Exit Intent Popup */}
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>

      {/* Urgency Notifications */}
      <UrgencyNotification />

      {/* Sticky WhatsApp Button */}
      <StickyWhatsApp />

      {/* Sticky Book Button (Mobile) */}
      <StickyBookButton />

      {/* Hero Section - Simplified */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Professional <span className='text-amber-600'>Furniture Polish</span> in Mumbai
            </h1>
            <p className="text-sm md:text-lg text-gray-700 mb-6 leading-relaxed">
              Transform your old furniture into brand new! Expert polishing for sofas, beds, wardrobes & more. Premium quality materials, skilled craftsmen, and 6-month warranty. Starting at just ₹1,299.
            </p>
            <div className="relative mb-6">
              <OptimizedImage
                src="/assets/Sofa And chair.webp"
                alt="Professional furniture polishing in Mumbai"
                width={1920}
                height={1080}
                className="rounded-lg shadow-2xl"
                priority={true}
                sizes={COMMON_SIZES.hero}
                objectFit="cover"
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">4.8/5 Rating</span>
                </div>
                <p className="text-xs text-gray-600">127+ Happy Customers</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/services"
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-lg font-semibold"
              >
                <span>Book Now</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+918828709945"
                className="flex items-center justify-center space-x-2 bg-white text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-all duration-200 shadow-md font-semibold"
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Popular Services with Quick Book */}
      <PopularServices />

      {/* Our Process */}
      <Suspense fallback={<div className="py-16 bg-white"></div>}>
        <OurProcess />
      </Suspense>

      {/* Stats Counter */}
      <Suspense fallback={<div className="py-16"></div>}>
        <StatsCounter />
      </Suspense>

      {/* Customer Photos Carousel - Join 50,000+ Happy Customers */}
      <CustomerPhotos />

      {/* Quick Quote Calculator - Get Instant Quote */}
      <QuickQuoteCalculator />

      {/* Why Book Online */}
      <WhyBookOnline />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA - Join 50,000+ Happy Customers */}
      <FinalCTA />

      {/* Contact CTA - Still have questions */}
      <ContactCTA />
    </>
  );
};

export default Home;
