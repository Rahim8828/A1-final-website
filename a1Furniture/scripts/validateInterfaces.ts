/**
 * Validation script for TypeScript interfaces
 * Verifies that all required interfaces are properly defined
 */

import type {
  PageData,
  ServiceItem,
  ProcessStep,
  PricingInfo,
  BenefitItem,
  FAQItem,
  RelatedService,
  LocalBusinessSchema,
  ServiceSchema,
} from '../src/types';

console.log('=== TypeScript Interface Validation ===\n');

// Create sample data to verify interfaces
const sampleServiceItem: ServiceItem = {
  name: 'Test Service',
  description: 'Test Description',
  icon: 'test-icon',
};

const sampleProcessStep: ProcessStep = {
  step: 1,
  title: 'Test Step',
  description: 'Test Description',
  image: 'test.jpg',
};

const samplePricingInfo: PricingInfo = {
  startingPrice: 1000,
  priceRange: '₹1000 - ₹5000',
  factors: ['Size', 'Material', 'Condition'],
};

const sampleBenefitItem: BenefitItem = {
  title: 'Test Benefit',
  description: 'Test Description',
  icon: 'test-icon',
};

const sampleFAQItem: FAQItem = {
  question: 'Test Question?',
  answer: 'Test Answer',
};

const sampleRelatedService: RelatedService = {
  name: 'Related Service',
  url: '/services/related-service',
};

const sampleLocalBusinessSchema: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'A1 Furniture Polish',
  image: 'https://example.com/image.jpg',
  '@id': 'https://example.com',
  url: 'https://example.com',
  telephone: '+91-1234567890',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Test Street',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.0760,
    longitude: 72.8777,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: ['https://facebook.com/test', 'https://instagram.com/test'],
};

const sampleServiceSchema: ServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Furniture Polishing',
  provider: {
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish',
  },
  areaServed: {
    '@type': 'City',
    name: 'Mumbai',
  },
};

const samplePageData: PageData = {
  title: 'Test Page Title',
  metaDescription: 'Test meta description',
  h1: 'Test H1 Heading',
  url: '/services/test-page',
  canonicalUrl: 'https://example.com/services/test-page',
  serviceCategory: 'furniture-polishing',
  serviceName: 'Furniture Polishing',
  location: 'Mumbai',
  titleVariation: 'affordable',
  introduction: 'Test introduction paragraph',
  services: [sampleServiceItem],
  process: [sampleProcessStep],
  locationAreas: ['Andheri', 'Bandra', 'Goregaon'],
  pricing: samplePricingInfo,
  whyChooseUs: [sampleBenefitItem],
  faqs: [sampleFAQItem],
  relatedServices: [sampleRelatedService],
  schema: {
    localBusiness: sampleLocalBusinessSchema,
    service: sampleServiceSchema,
  },
  primaryKeyword: 'furniture polishing mumbai',
  secondaryKeywords: ['wood polish', 'furniture restoration'],
};

console.log('✓ ServiceItem interface validated');
console.log('✓ ProcessStep interface validated');
console.log('✓ PricingInfo interface validated');
console.log('✓ BenefitItem interface validated');
console.log('✓ FAQItem interface validated');
console.log('✓ RelatedService interface validated');
console.log('✓ LocalBusinessSchema interface validated');
console.log('✓ ServiceSchema interface validated');
console.log('✓ PageData interface validated');

console.log('\n✅ All TypeScript interfaces validated successfully!');
console.log('\nInterfaces defined:');
console.log('- PageData (main interface)');
console.log('- ServiceItem');
console.log('- ProcessStep');
console.log('- PricingInfo');
console.log('- BenefitItem');
console.log('- FAQItem');
console.log('- RelatedService');
console.log('- LocalBusinessSchema');
console.log('- ServiceSchema');
