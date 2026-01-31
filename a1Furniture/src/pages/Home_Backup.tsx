import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Phone, MessageCircle, Wrench } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { localBusiness } from '../data/localBusiness.ts';
import { services as servicesSchema } from '../data/services.ts';
import { reviews, aggregateRating } from '../data/reviews.ts';
import EmergencyBanner from '../components/EmergencyBanner';
import UrgencyNotification from '../components/UrgencyNotification';
import StickyWhatsApp from '../components/StickyWhatsApp';
import LocationSelector from '../components/LocationSelector';
import LiveBookingNotification from '../components/LiveBookingNotification';
import StickyBookButton from '../components/StickyBookButton';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import PopularServices from '../components/PopularServices';
import CustomerPhotos from '../components/CustomerPhotos';
import { FadeIn } from '../components/ScrollAnimations';

// Lazy load heavy components
const OurProcess = lazy(() => import('../components/OurProcess'));
const ServiceAreaCoverage = lazy(() => import('../components/ServiceAreaCoverage'));
const BlogPreview = lazy(() => import('../components/BlogPreview'));
const ExitIntentPopup = lazy(() => import('../components/ExitIntentPopup'));
const ComparisonTable = lazy(() => import('../components/ComparisonTable'));
const StatsCounter = lazy(() => import('../components/StatsCounter'));

const Home = () => {
  const services = [
    {
      title: 'Wooden Furniture Polish',
      description: 'Professional polishing for all types of wooden furniture',
      image: '/assets/wooden furniture .webp',
      link: '/services/wooden-furniture-polish'
    },
    {
      title: 'Sofa & Chair Polishing',
      description: 'Restore the shine and beauty of your upholstered furniture',
      image: '/assets/Sofa And chair.jpg',
      link: '/sofa-chair-polishing'
    },
    {
      title: 'Table & Bed Polishing',
      description: 'Specialized care for dining tables, beds, and more',
      image: '/assets/Table & Bed Polishing.jpg',
      link: '/services/table-and-bed-polishing'
    },
    {
      title: 'Antique Restoration',
      description: 'Specialized care for vintage and antique furniture pieces',
      image: '/assets/Antique Restoration.jpg',
      link: '/services/antique-restoration'
    },
    {
      title: 'Commercial Polishing',
      description: 'Professional furniture polishing for offices and businesses',
      image: '/assets/drying-finishing.webp',
      link: '/services/commercial-polishing'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Bandra, Mumbai',
      rating: 5,
      text: 'Excellent service! My dining table looks brand new after A1 Furniture Polish treatment. Highly recommended for anyone in Mumbai.'
    },
    {
      name: 'Rajesh Patel',
      location: 'Andheri, Mumbai',
      rating: 5,
      text: 'Professional team and amazing results. They polished all my wooden furniture and the quality is outstanding. Best furniture polish service in Mumbai!'
    },
    {
      name: 'Meera Joshi',
      location: 'Powai, Mumbai',
      rating: 5,
      text: 'Very satisfied with their antique furniture restoration work. They brought my grandmother\'s cabinet back to life. Great craftsmanship!'
    }
  ];

  return (
    <>
      <SEOHead
        title="A1 Furniture Polish — Professional Wooden Furniture Polishing in Mumbai"
        description="Leading furniture polishing services in Mumbai. We restore and polish your wooden furniture to perfection with eco-friendly products and skilled craftsmen. Expert sofa, bed, door, table, wardrobe polish. 6 months warranty. Book now!"
        keywords="furniture polish Mumbai, wood polishing services, sofa polish, bed polish, door polish, table polish, wardrobe polish, furniture restoration Mumbai, A1 furniture polish"
        ogUrl="https://a1furniturepolish.com/"
        ogImage="/assets/Sofa And chair.jpg"
        canonical="https://a1furniturepolish.com/"
      />
      <JsonLd data={localBusiness} />
      <JsonLd data={servicesSchema} />
      {reviews.map((review, index) => (
        <JsonLd key={`review-${index}`} data={review} />
      ))}
      <JsonLd data={aggregateRating} />

      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Exit Intent Popup */}
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>

      {/* Urgency Notifications */}
      <UrgencyNotification />

      {/* Sticky WhatsApp Button */}
      <StickyWhatsApp />

      {/* Live Booking Notifications */}
      <LiveBookingNotification />

      {/* Sticky Book Button (Mobile) */}
      <StickyBookButton />

      {/* Hero Section - Simplified */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Location Selector */}
          <div className="mb-6">
            <LocationSelector />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Professional <span className='text-amber-600'>Furniture Polish</span> in Mumbai
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Book expert furniture polishing services. Starting at ₹1,299 with 6 months warranty.
              </p>
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
            <div className="relative mt-8 lg:mt-0">
              <img
                src="/assets/Sofa And chair.jpg"
                alt="Professional furniture polishing in Mumbai"
                className="rounded-lg shadow-2xl w-full h-80 md:h-96 object-cover"
                loading="lazy"
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
          </div>
        </div>
      </section>

      {/* Popular Services with Quick Book */}
      <PopularServices />

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Customer Photos Carousel */}
      <CustomerPhotos />

      <Suspense fallback={<div className="py-16 bg-white"></div>}>
        <OurProcess />
      </Suspense>

      {/* Stats Counter */}
      <Suspense fallback={<div className="py-16"></div>}>
        <StatsCounter />
      </Suspense>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose A1 Furniture Polish in Mumbai?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are Mumbai's most trusted furniture polishing service with years of experience in restoring and maintaining wooden furniture.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FadeIn delay={100}>
              <div className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Quality Guaranteed</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">100% satisfaction guarantee on all our furniture polishing services in Mumbai.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Wrench className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Expert Team</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">Skilled craftsmen with 10+ years experience in furniture polishing and restoration.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Quick Service</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">Fast and efficient furniture polishing service delivery across Mumbai.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Star className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Eco-Friendly</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">Safe, non-toxic polish products that are environmentally friendly and family-safe.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Furniture Polishing Services in Mumbai
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From wooden furniture polish to complete restoration, we offer comprehensive furniture care services across Mumbai.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 5).map((service, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      to={service.link}
                      className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-200"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Coverage */}
      <Suspense fallback={<div className="py-16 bg-gradient-to-br from-amber-50 to-orange-50"></div>}>
        <ServiceAreaCoverage />
      </Suspense>

      {/* Comparison Table */}
      <Suspense fallback={<div className="py-16"></div>}>
        <ComparisonTable />
      </Suspense>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Mumbai Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Trusted by hundreds of satisfied customers across Mumbai
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 150}>
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <Suspense fallback={<div className="py-16 bg-gray-50"></div>}>
        <BlogPreview />
      </Suspense>

      {/* CTA Section */}
      <section className="py-12 md:py-16 pb-24 md:pb-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Restore Your Furniture's Beauty?
          </h2>
          <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Contact A1 Furniture Polish today for professional furniture polishing services in Mumbai. Free quotes available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918828709945"
              className="flex items-center justify-center space-x-2 bg-white text-amber-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
            >
              <Phone size={20} />
              <span>Call: +91 8828709945</span>
            </a>
            <a
              href="https://wa.me/918828709945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home_Backup;
