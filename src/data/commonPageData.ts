/**
 * Common Page Data
 * Shared data structures used across all generated pages to reduce bundle size
 */

// Common business information
export const businessInfo = {
  name: 'A1 Furniture Polish',
  phone: '+91-9819519345',
  whatsapp: '+918828709945',
  email: 'info@a1furniturepolish.com',
  website: 'https://a1furniturepolish.com',
  logo: 'https://a1furniturepolish.com/logo.png',
  rating: '4.9',
  reviewCount: '500',
  priceRange: '₹₹',
  openingHours: {
    opens: '08:00',
    closes: '20:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/a1furniturepolish',
    instagram: 'https://www.instagram.com/a1furniturepolish'
  }
};

// Common location coordinates
export const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  'Mumbai': { lat: 19.076, lng: 72.8777 },
  'Andheri West': { lat: 19.1136, lng: 72.8697 },
  'Andheri East': { lat: 19.1197, lng: 72.8464 },
  'Bandra': { lat: 19.0596, lng: 72.8295 },
  'Goregaon': { lat: 19.1663, lng: 72.8526 },
  'Powai': { lat: 19.1176, lng: 72.9060 },
  'Thane': { lat: 19.2183, lng: 72.9781 },
  'Dadar': { lat: 19.0176, lng: 72.8479 },
  'Kurla': { lat: 19.0728, lng: 72.8826 },
  'Malad': { lat: 19.1868, lng: 72.8483 },
  'Borivali': { lat: 19.2403, lng: 72.8565 },
  'Kandivali': { lat: 19.2074, lng: 72.8479 },
  'Jogeshwari': { lat: 19.1354, lng: 72.8504 },
  'Santacruz': { lat: 19.0896, lng: 72.8406 },
  'Khar': { lat: 19.0728, lng: 72.8347 },
  'Vile Parle': { lat: 19.1012, lng: 72.8420 },
  'Juhu': { lat: 19.1075, lng: 72.8263 },
  'Chembur': { lat: 19.0622, lng: 72.8970 },
  'Ghatkopar': { lat: 19.0860, lng: 72.9081 },
  'Navi Mumbai': { lat: 19.0330, lng: 73.0297 },
  'Vashi': { lat: 19.0768, lng: 72.9989 },
  'Lokhandwala': { lat: 19.1389, lng: 72.8326 },
  'Matunga': { lat: 19.0270, lng: 72.8570 },
  'Vikhroli': { lat: 19.1095, lng: 72.9250 },
  'Bhandup': { lat: 19.1438, lng: 72.9371 },
  'Mulund': { lat: 19.1722, lng: 72.9565 },
  'Dahisar': { lat: 19.2544, lng: 72.8622 },
  'Sion': { lat: 19.0433, lng: 72.8618 },
  'Wadala': { lat: 19.0176, lng: 72.8561 },
  'Marol': { lat: 19.1136, lng: 72.8820 },
  'Saki Naka': { lat: 19.1068, lng: 72.8890 },
  'Chandivali': { lat: 19.1136, lng: 72.8989 },
  'BKC': { lat: 19.0653, lng: 72.8683 },
  'Mira Road': { lat: 19.2812, lng: 72.8644 },
};

// Common trust badges
export const trustBadges = [
  { text: '24/7 Available' },
  { text: 'Same-Day Service' },
  { text: 'Free Estimates' },
  { text: 'Expert Craftsmen' }
];

// Common process steps (used across all pages)
export const commonProcessSteps = [
  {
    step: 1,
    title: 'Free Consultation & Quote',
    description: 'Contact us for a free consultation. Our experts assess your furniture and provide a detailed quote with no hidden charges.',
    image: '/assets/optimized/consultation-booking.webp'
  },
  {
    step: 2,
    title: 'Cleaning & Preparation',
    description: 'We thoroughly clean your furniture, removing dust, dirt, and old polish. Surface preparation ensures optimal adhesion.',
    image: '/assets/optimized/Cleaning & Sanding.webp'
  },
  {
    step: 3,
    title: 'Repair & Sanding',
    description: 'Any damages, scratches, or dents are repaired. We sand the surface smooth for a perfect finish.',
    image: '/assets/optimized/Cleaning & Sanding (2).webp'
  },
  {
    step: 4,
    title: 'Polish Application',
    description: 'Multiple coats of premium polish are applied with proper drying time between each layer for durability.',
    image: '/assets/optimized/filling-gaps-polish-application.webp'
  },
  {
    step: 5,
    title: 'Finishing & Quality Check',
    description: 'Final finishing touches and thorough quality inspection ensure flawless results that exceed expectations.',
    image: '/assets/optimized/drying-finishing.webp'
  }
];

// Common pricing factors
export const commonPricingFactors = [
  'Furniture size and type',
  'Polish type (PU, Melamine, Duco)',
  'Condition of existing finish',
  'Number of items',
  'Additional repair work needed'
];

// Helper function to generate LocalBusiness schema
export function generateLocalBusinessSchema(location: string, url: string) {
  const coords = locationCoordinates[location] || locationCoordinates['Mumbai'];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: businessInfo.logo,
    '@id': businessInfo.website,
    url: url,
    telephone: businessInfo.phone,
    priceRange: businessInfo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location,
      addressLocality: location,
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: businessInfo.openingHours.days,
      opens: businessInfo.openingHours.opens,
      closes: businessInfo.openingHours.closes
    },
    sameAs: [
      businessInfo.socialMedia.facebook,
      businessInfo.socialMedia.instagram
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: businessInfo.rating,
      reviewCount: businessInfo.reviewCount
    }
  };
}

// Helper function to generate Service schema
export function generateServiceSchema(serviceName: string, location: string, services: Array<{ name: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.name
    },
    areaServed: {
      '@type': 'City',
      name: location
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Furniture Polishing Services',
      itemListElement: services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name
        }
      }))
    }
  };
}
