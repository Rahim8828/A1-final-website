import { PageData } from '../types';

/**
 * Sample page data for testing ServicePageTemplate component
 * This represents a typical generated page for "Affordable Furniture Polishing in Mumbai"
 */
export const samplePageData: PageData = {
  // SEO Fields
  title: 'Affordable Furniture Polishing in Mumbai | A1 Furniture Polish',
  metaDescription: 'Get affordable furniture polishing services in Mumbai. Expert wooden furniture polish, sofa restoration, and complete refinishing. 24/7 service. Call +91 8828709945',
  h1: 'Affordable Furniture Polishing Services in Mumbai',
  url: '/services/affordable-furniture-polishing-mumbai',
  canonicalUrl: 'https://a1furniturepolish.com/services/affordable-furniture-polishing-mumbai',
  
  // Service Information
  serviceCategory: 'furniture-polishing',
  serviceName: 'Furniture Polishing',
  location: 'Mumbai',
  titleVariation: 'affordable',
  
  // Content Sections
  introduction: 'Transform your furniture with A1 Furniture Polish - Mumbai\'s most trusted experts in affordable wooden furniture polishing, sofa restoration, table polishing, and complete furniture refinishing. We specialize in teak wood polish, PU polish, melamine polish, and antique restoration. Serving all areas of Mumbai with 24/7 emergency service and same-day availability.',
  
  services: [
    {
      name: 'Wooden Furniture Polish',
      description: 'Professional polishing for all types of wooden furniture including teak, sheesham, and mango wood',
    },
    {
      name: 'Sofa & Chair Polishing',
      description: 'Expert restoration and polishing services for sofa sets and chairs',
    },
    {
      name: 'Table & Bed Polishing',
      description: 'Complete refinishing for dining tables, coffee tables, and bed frames',
    },
    {
      name: 'Wardrobe & Cabinet Polish',
      description: 'Interior and exterior polishing for wardrobes, cabinets, and storage units',
    },
    {
      name: 'Door Polishing',
      description: 'Professional door polishing and refinishing services',
    },
    {
      name: 'Antique Restoration',
      description: 'Specialized care and restoration for antique and vintage furniture',
    },
  ],
  
  process: [
    {
      step: 1,
      title: 'Inspection',
      description: 'Our experts inspect your furniture and provide a detailed quote',
      image: '/assets/Cleaning & Sanding.webp',
    },
    {
      step: 2,
      title: 'Preparation',
      description: 'We clean, sand, and prepare the surface for polishing',
      image: '/assets/Cleaning & Sanding (2).webp',
    },
    {
      step: 3,
      title: 'Polishing',
      description: 'Apply premium quality polish with expert techniques',
      image: '/assets/filling-gaps-polish-application.webp',
    },
    {
      step: 4,
      title: 'Finishing',
      description: 'Final touches and quality check before delivery',
      image: '/assets/drying-finishing.webp',
    },
  ],
  
  locationAreas: [
    'Andheri West',
    'Andheri East',
    'Bandra',
    'Goregaon',
    'Malad',
    'Borivali',
    'Kandivali',
    'Jogeshwari',
    'Powai',
    'Dadar',
    'Kurla',
    'Thane',
    'Vile Parle',
    'Santacruz',
    'Juhu',
    'Chembur',
    'Ghatkopar',
    'Mulund',
    'Bhandup',
    'Vikhroli',
  ],
  
  serviceAreaDescription: 'We proudly serve all areas across Mumbai, including Western suburbs, Central Mumbai, Eastern suburbs, and Navi Mumbai. Our team of expert polishers is available throughout the city, ensuring convenient service no matter where you\'re located. We understand Mumbai\'s unique climate challenges and use appropriate materials and techniques that withstand humidity and temperature variations.',
  
  pricing: {
    startingPrice: 499,
    priceRange: '₹499 - ₹5,000',
    factors: [
      'Type and size of furniture',
      'Current condition and damage level',
      'Type of polish required (PU, Melamine, Duco)',
      'Number of coats needed',
      'Additional services like scratch repair or restoration',
    ],
  },
  
  whyChooseUs: [
    {
      title: 'Expert Craftsmen',
      description: 'Skilled professionals with 10+ years of experience in furniture polishing',
    },
    {
      title: '24/7 Service',
      description: 'Available round the clock for urgent requirements across Mumbai',
    },
    {
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee with 6 months warranty on all work',
    },
    {
      title: 'Local Experts',
      description: 'Deep understanding of Mumbai area and customer needs',
    },
  ],
  
  faqs: [
    {
      question: 'How quickly can you start the furniture polishing work?',
      answer: 'We offer same-day service for most areas in Mumbai. Book before 2 PM and we can start the same day. Emergency services available within 2-4 hours.',
    },
    {
      question: 'What type of polish do you use? Is it safe?',
      answer: 'We use premium quality PU (Polyurethane) polish, melamine polish, and duco paint. All materials are eco-friendly, non-toxic, and safe for homes with children and pets.',
    },
    {
      question: 'Do I need to empty my furniture before polishing?',
      answer: 'Yes, please empty all items from the furniture. Our team will handle the furniture carefully, but we recommend removing all contents for safety and better results.',
    },
    {
      question: 'How long does the polishing work take?',
      answer: 'Small items (1-2 shelves): 2-3 hours | Medium furniture (bookshelf, TV unit): 4-6 hours | Large items (wardrobes): 1-2 days. Drying time is additional 24-48 hours.',
    },
    {
      question: 'What is included in the price?',
      answer: 'Our price includes material cost (polish, sandpaper, primer), labor charges, transportation of materials, and 6 months service warranty. No hidden charges.',
    },
  ],
  
  relatedServices: [
    {
      name: 'Wood Polishing in Mumbai',
      url: '/services/affordable-wood-polishing-mumbai',
    },
    {
      name: 'PU Polish in Mumbai',
      url: '/services/affordable-pu-polish-mumbai',
    },
    {
      name: 'Door Polishing in Mumbai',
      url: '/services/affordable-door-polishing-mumbai',
    },
    {
      name: 'Wardrobe Polishing in Mumbai',
      url: '/services/affordable-wardrobe-polishing-mumbai',
    },
  ],
  
  // Schema Data
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'A1 Furniture Polish - Mumbai',
      image: 'https://a1furniturepolish.com/assets/wooden furniture .webp',
      '@id': 'https://a1furniturepolish.com',
      url: 'https://a1furniturepolish.com/services/affordable-furniture-polishing-mumbai',
      telephone: '+918828709945',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop No 18, Akbar Ali Compound, Relief Road',
        addressLocality: 'Jogeshwari West, Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400102',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.1450,
        longitude: 72.8450,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      sameAs: [
        'https://www.facebook.com/a1furniturepolish',
        'https://www.instagram.com/a1furniturepolish',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
      },
    },
    service: {
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Furniture Polishing Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wooden Furniture Polish',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sofa & Chair Polishing',
            },
          },
        ],
      },
    },
  },
  
  // Keywords
  primaryKeyword: 'affordable furniture polishing mumbai',
  secondaryKeywords: [
    'furniture polish mumbai',
    'wooden furniture polishing',
    'sofa polishing mumbai',
    'table polishing service',
    'furniture restoration mumbai',
    'cheap furniture polish',
    'budget furniture polishing',
  ],
};
