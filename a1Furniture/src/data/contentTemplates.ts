/**
 * Content Templates for Bulk SEO Page Generation
 * This file contains template functions for generating unique content for each page
 */

import { ServiceItem, ProcessStep, PricingInfo, BenefitItem, FAQItem } from '../types';

/**
 * Generates introduction paragraph for a service page
 */
export function generateIntroduction(
  serviceName: string,
  location: string,
  titleVariation: string
): string {
  const variations = {
    affordable: `Looking for ${serviceName.toLowerCase()} in ${location}? A1 Furniture Polish offers budget-friendly furniture polishing services without compromising on quality. Our skilled craftsmen use premium materials and proven techniques to restore the natural beauty of your wooden furniture. With over 15 years of experience serving ${location} residents, we understand the unique needs of furniture in Mumbai's climate. Whether it's your dining table, wardrobe, or antique pieces, we provide professional polishing services that enhance durability and appearance. Our transparent pricing and commitment to customer satisfaction have made us the preferred choice for homeowners and businesses across ${location}.`,
    
    'top-rated': `A1 Furniture Polish is the top-rated ${serviceName.toLowerCase()} provider in ${location}, with a 4.9-star rating from over 500 satisfied customers. Our reputation is built on exceptional craftsmanship, attention to detail, and consistent results that exceed expectations. We specialize in all types of wood polishing, from modern PU finishes to traditional melamine and duco polish. Our team of expert polishers brings years of experience to every project, ensuring your furniture receives the care it deserves. Serving ${location} and surrounding areas, we've completed thousands of successful projects, earning trust through quality work and reliable service. Choose the service that ${location} residents recommend to their friends and family.`,
    
    professional: `Get professional ${serviceName.toLowerCase()} in ${location} with same-day service availability. A1 Furniture Polish combines technical expertise with efficient processes to deliver outstanding results quickly. Our certified polishers use industry-leading techniques and premium-grade materials to achieve flawless finishes on all furniture types. We understand that your time is valuable, which is why we offer flexible scheduling and prompt service without compromising quality. From initial consultation to final inspection, we maintain the highest professional standards. Serving ${location} with dedication, we handle everything from minor touch-ups to complete furniture restoration. Experience the difference that professional service makes.`,
    
    best: `Discover the best ${serviceName.toLowerCase()} in ${location} with A1 Furniture Polish's expert polishers. Our master craftsmen bring decades of combined experience and specialized training to every project. We don't just polish furniture – we restore its soul, bringing out the natural beauty of wood grain while protecting it for years to come. Using premium materials and time-tested techniques, we deliver results that stand the test of time. Our comprehensive service includes thorough cleaning, repair work, expert polishing, and protective finishing. ${location} residents trust us for our meticulous attention to detail and unwavering commitment to excellence. When only the best will do for your valuable furniture, choose A1 Furniture Polish.`
  };

  return variations[titleVariation as keyof typeof variations] || variations.affordable;
}

/**
 * Generates service list based on service category
 */
export function generateServiceList(serviceCategory: string): ServiceItem[] {
  const serviceTemplates: Record<string, ServiceItem[]> = {
    'furniture-polishing': [
      { name: 'Complete Furniture Polish', description: 'Comprehensive polishing service for all furniture types including thorough cleaning, surface preparation, expert sanding, multiple polish coats, and protective finishing. Perfect for wardrobes, dining tables, beds, cabinets, and all wooden furniture pieces.' },
      { name: 'Furniture Restoration', description: 'Professional restoration service to bring old and damaged furniture back to life. Includes repair of scratches, dents, and structural issues, followed by complete refinishing with premium polish materials for a brand new appearance.' },
      { name: 'Custom Color Matching', description: 'Expert color matching service to perfectly match your existing furniture or create custom shades. Our craftsmen can replicate any wood tone or create unique finishes that complement your interior design perfectly.' },
      { name: 'Protective Coating', description: 'Advanced protective coating application using premium sealants and finishes. Protects furniture from scratches, stains, moisture damage, and daily wear. Extends furniture life significantly while maintaining beautiful appearance.' },
      { name: 'Antique Furniture Care', description: 'Specialized care for valuable antique pieces using traditional techniques and gentle materials. Preserves original character while enhancing beauty and protecting for future generations.' },
      { name: 'Modern Furniture Polish', description: 'Contemporary polishing solutions for modern furniture designs. Includes sleek finishes, minimalist aesthetics, and durable protection suitable for contemporary living spaces.' },
    ],
    'wood-polishing': [
      { name: 'Natural Wood Polish', description: 'Premium natural wood polishing that enhances and protects the inherent beauty of wood grain. Uses transparent finishes that showcase natural patterns while providing excellent protection against environmental factors.' },
      { name: 'Teak Wood Polishing', description: 'Specialized polishing service for teak wood furniture using appropriate oils, sealants, and finishing techniques. Brings out the rich golden-brown color and protects against moisture and insects.' },
      { name: 'Sheesham Wood Polish', description: 'Expert polishing for sheesham (Indian rosewood) furniture with rich, deep finishes. Enhances the natural dark grain patterns and provides long-lasting protection with premium materials.' },
      { name: 'Mango Wood Polish', description: 'Professional polishing service for mango wood pieces with color enhancement and grain highlighting. Perfect for rustic and contemporary furniture styles with durable protective finishes.' },
      { name: 'Oak Wood Polish', description: 'Specialized oak wood polishing that highlights the distinctive grain patterns and natural beauty. Uses premium finishes suitable for this durable hardwood species.' },
      { name: 'Pine Wood Polish', description: 'Expert polishing for pine furniture with appropriate sealers and finishes. Protects the softer wood while enhancing its light, natural appearance.' },
    ],
    'pu-polish': [
      { name: 'PU Gloss Finish', description: 'Premium high-gloss polyurethane finish creating a mirror-like shine with maximum protection. Ideal for modern furniture, dining tables, and pieces requiring a luxurious appearance with excellent durability.' },
      { name: 'PU Matt Finish', description: 'Sophisticated matte polyurethane finish for contemporary and minimalist designs. Provides excellent protection without shine, perfect for modern interiors and professional spaces.' },
      { name: 'PU Semi-Gloss', description: 'Balanced semi-gloss polyurethane finish combining subtle shine with elegant appearance. Versatile option suitable for various furniture styles and interior designs.' },
      { name: 'PU Touch-Up', description: 'Professional repair and touch-up service for existing PU polish. Fixes scratches, chips, and wear spots to restore original appearance without complete refinishing.' },
      { name: 'PU Coating Application', description: 'Multi-layer PU coating application for maximum durability and protection. Includes surface preparation, primer, multiple coats, and final finishing for long-lasting results.' },
      { name: 'PU Color Polish', description: 'Colored PU polish application in various shades and tones. Combines color enhancement with polyurethane protection for beautiful and durable finishes.' },
    ],
  };

  // Return category-specific services or default furniture polishing services
  return serviceTemplates[serviceCategory] || serviceTemplates['furniture-polishing'];
}

/**
 * Generates process steps for the service
 */
export function generateProcessSteps(): ProcessStep[] {
  return [
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
}

/**
 * Generates location coverage areas based on the main location
 */
export function generateLocationAreas(location: string): string[] {
  // If Mumbai generic, list major areas
  if (location === 'Mumbai') {
    return [
      'Andheri West', 'Andheri East', 'Bandra', 'Goregaon', 'Malad',
      'Borivali', 'Powai', 'Thane', 'Dadar', 'Kurla',
      'Chembur', 'Ghatkopar', 'Navi Mumbai', 'Vile Parle', 'Juhu',
      'Kandivali', 'Jogeshwari', 'Santacruz', 'Khar', 'Mulund'
    ];
  }
  
  // For specific locations, include nearby areas
  const nearbyAreas: Record<string, string[]> = {
    'Andheri West': ['Andheri East', 'Jogeshwari', 'Versova', 'Oshiwara', 'Lokhandwala', 'Juhu', 'Vile Parle', 'Santacruz'],
    'Andheri East': ['Andheri West', 'Marol', 'Saki Naka', 'Chandivali', 'Powai', 'Jogeshwari', 'Ghatkopar', 'Vikhroli'],
    'Bandra': ['Khar', 'Santacruz', 'BKC', 'Mahim', 'Kurla', 'Dadar', 'Andheri'],
    'Goregaon': ['Malad', 'Jogeshwari', 'Borivali', 'Kandivali', 'Andheri', 'Dahisar'],
    'Powai': ['Chandivali', 'Vikhroli', 'Kanjurmarg', 'Andheri East', 'Ghatkopar', 'Bhandup', 'Mulund'],
    'Thane': ['Mulund', 'Bhandup', 'Ghodbunder Road', 'Majiwada', 'Naupada', 'Dombivli', 'Kalyan'],
  };
  
  return nearbyAreas[location] || ['Mumbai', 'Navi Mumbai', 'Thane', 'Andheri', 'Bandra', 'Goregaon', 'Powai'];
}

/**
 * Generates a detailed service area description
 */
export function generateServiceAreaDescription(location: string): string {
  if (location === 'Mumbai') {
    return `We proudly serve all areas across Mumbai, including Western suburbs, Central Mumbai, Eastern suburbs, and Navi Mumbai. Our team of expert polishers is available throughout the city, ensuring convenient service no matter where you're located. We understand Mumbai's unique climate challenges and use appropriate materials and techniques that withstand humidity and temperature variations. With multiple service teams across different zones, we offer flexible scheduling and quick response times. Whether you're in a high-rise apartment, independent house, or commercial space, our professionals bring all necessary equipment and materials to your location. We've successfully completed thousands of projects across Mumbai, earning the trust of residents and businesses in every neighborhood.`;
  }
  
  return `Our ${location} service center provides comprehensive furniture polishing services to residents and businesses in ${location} and surrounding neighborhoods. We understand the local area well and offer convenient scheduling that works with your busy lifestyle. Our experienced team brings professional equipment and premium materials directly to your location, whether it's a residential apartment, villa, or commercial office. We've built a strong reputation in ${location} through quality work, transparent pricing, and excellent customer service. Many of our clients come through referrals from satisfied customers in the area. We also serve nearby localities, making it easy for you to access our expert polishing services. Our local presence means faster response times and better understanding of regional preferences and requirements.`;
}

/**
 * Category-wise base pricing mapping
 * Based on actual service pricing from servicePageData.ts
 */
const categoryBasePricing: Record<string, { min: number; max: number }> = {
  'furniture-polishing': { min: 299, max: 6449 },  // General furniture
  'wood-polishing': { min: 399, max: 5999 },       // Wood specific
  'pu-polish': { min: 499, max: 6999 },            // PU polish
  'pu-gloss-polish': { min: 549, max: 7499 },      // PU Gloss
  'pu-matt-polish': { min: 549, max: 7499 },       // PU Matt
  'melamine-polish': { min: 449, max: 5999 },      // Melamine
  'duco-polish': { min: 599, max: 7999 },          // Duco
  'teak-wood-polish': { min: 699, max: 8999 },     // Teak wood
  'interior-wood-finishing': { min: 799, max: 9999 }, // Interior finishing
  'door-polishing': { min: 349, max: 2999 },       // Doors
  'wardrobe-polishing': { min: 1449, max: 8999 },  // Wardrobes
  'dining-table-polishing': { min: 999, max: 5999 }, // Dining tables
  'sofa-wood-polish': { min: 1449, max: 6449 },    // Sofa wood
  'bed-wood-polish': { min: 1299, max: 5999 },     // Beds
  'cabinet-wood-polish': { min: 799, max: 4999 },  // Cabinets
  'bookshelf-polish': { min: 599, max: 3999 },     // Bookshelves
  'mandir-polish': { min: 899, max: 4999 },        // Mandir
  'jhula-polish': { min: 1999, max: 7999 },        // Jhula
  'wooden-floor-polishing': { min: 2999, max: 19999 }, // Floor (per room)
  'antique-furniture-polish': { min: 1499, max: 14999 }, // Antiques
};

/**
 * Generates pricing information based on service category and title variation
 */
export function generatePricingInfo(titleVariation: string, serviceCategory: string = 'furniture-polishing'): PricingInfo {
  // Get base pricing for category
  const basePricing = categoryBasePricing[serviceCategory] || categoryBasePricing['furniture-polishing'];
  
  // Adjust pricing based on title variation
  const variationMultipliers = {
    affordable: { multiplier: 1.0, label: 'Budget-Friendly' },
    'top-rated': { multiplier: 1.15, label: 'Premium Quality' },
    professional: { multiplier: 1.25, label: 'Professional Service' },
    best: { multiplier: 1.35, label: 'Expert Craftsman' }
  };
  
  const variation = variationMultipliers[titleVariation as keyof typeof variationMultipliers] || variationMultipliers.affordable;
  
  const startingPrice = Math.round(basePricing.min * variation.multiplier);
  const maxPrice = Math.round(basePricing.max * variation.multiplier);
  
  const pricingFactors = {
    affordable: [
      'Furniture size and type',
      'Polish type (PU, Melamine, Duco)',
      'Condition of existing finish',
      'Number of items',
      'Additional repair work needed'
    ],
    'top-rated': [
      'Premium materials used',
      'Furniture dimensions',
      'Complexity of design',
      'Type of wood',
      'Finish quality level'
    ],
    professional: [
      'Same-day service premium',
      'Furniture type and size',
      'Polish specification',
      'Surface preparation required',
      'Protective coating options'
    ],
    best: [
      'Expert craftsman service',
      'Premium polish materials',
      'Furniture size and complexity',
      'Restoration work included',
      'Extended warranty coverage'
    ]
  };

  return {
    startingPrice,
    priceRange: `₹${startingPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`,
    factors: pricingFactors[titleVariation as keyof typeof pricingFactors] || pricingFactors.affordable
  };
}

/**
 * Generates "Why Choose Us" benefits based on title variation
 */
export function generateWhyChooseUs(titleVariation: string): BenefitItem[] {
  const benefitVariations = {
    affordable: [
      { title: 'Budget-Friendly Pricing', description: 'Competitive rates without compromising on quality. Transparent pricing with no hidden charges. We believe quality furniture polishing should be accessible to everyone, which is why we offer flexible pricing options and package deals for multiple furniture pieces.' },
      { title: 'Quality Materials', description: 'We use premium polish and materials to ensure long-lasting results at affordable prices. Our suppliers provide professional-grade products that deliver excellent durability and appearance, giving you the best value for your investment.' },
      { title: 'Experienced Team', description: '15+ years of experience in furniture polishing with skilled craftsmen who have worked on thousands of projects. Our team stays updated with latest techniques and materials to provide modern solutions for all furniture types.' },
      { title: 'Free Consultation', description: 'Get expert advice and accurate quotes at no cost before starting work. Our consultants visit your location, assess furniture condition, recommend appropriate polish types, and provide detailed estimates with no obligation to proceed.' },
      { title: 'Satisfaction Guarantee', description: 'We stand behind our work with a satisfaction guarantee on all services. If you\'re not completely happy with the results, we\'ll make it right at no additional cost. Your satisfaction is our top priority.' },
      { title: 'Flexible Payment Options', description: 'Multiple payment methods accepted including cash, online transfer, and digital wallets. Pay after work completion and inspection. We make the payment process convenient and hassle-free for all customers.' },
    ],
    'top-rated': [
      { title: '4.9★ Customer Rating', description: 'Consistently rated 4.9 stars by over 500 satisfied customers across Mumbai. Our excellent ratings reflect our commitment to quality work, professional service, and customer satisfaction. Read authentic reviews from real customers on Google and Facebook.' },
      { title: 'Proven Track Record', description: 'Thousands of successful projects completed with exceptional results over 15+ years. From small apartments to large commercial spaces, we\'ve handled diverse requirements with consistent excellence. Our portfolio includes residential, commercial, and institutional projects.' },
      { title: 'Expert Craftsmen', description: 'Highly trained polishers with specialized skills in all polish types including PU, melamine, duco, and natural finishes. Our team undergoes regular training to stay current with industry best practices and new materials.' },
      { title: 'Quality Assurance', description: 'Rigorous quality checks at every stage ensure flawless finishing. We inspect work at multiple points during the process and conduct final quality verification before handover. Only perfect results leave our hands.' },
      { title: 'Customer Reviews', description: 'Read authentic reviews from real customers who trust our service. We maintain transparency by displaying genuine feedback and addressing any concerns promptly. Our reputation is built on honest work and satisfied customers.' },
      { title: 'Award-Winning Service', description: 'Recognized for excellence in furniture polishing and customer service. Our commitment to quality has earned us industry recognition and numerous customer appreciation awards over the years.' },
    ],
    professional: [
      { title: 'Same-Day Service', description: 'Quick turnaround without compromising quality. Book today, get it done today for urgent requirements. We maintain dedicated teams for express service while ensuring the same high standards of workmanship and finish quality.' },
      { title: 'Professional Standards', description: 'Industry-leading techniques and processes for consistent excellence. We follow systematic procedures for every project, from initial assessment to final delivery, ensuring predictable and superior results every time.' },
      { title: 'Certified Polishers', description: 'Trained and certified professionals who follow best practices in furniture polishing. Our craftsmen have completed professional training programs and possess certifications in various polishing techniques and materials.' },
      { title: 'Premium Materials', description: 'Only the finest polish brands and materials for superior results. We source products from reputable manufacturers known for quality and durability. All materials meet international standards for safety and performance.' },
      { title: 'Flexible Scheduling', description: 'Convenient appointment times that work with your busy schedule. We offer early morning, evening, and weekend slots. Our team works around your availability to minimize disruption to your routine.' },
      { title: 'Professional Equipment', description: 'State-of-the-art tools and equipment for efficient and precise work. We invest in modern machinery and tools that enable better results, faster completion, and cleaner work processes.' },
    ],
    best: [
      { title: 'Master Craftsmen', description: 'Expert polishers with decades of combined experience and specialized training in traditional and modern techniques. Our master craftsmen have honed their skills through years of practice and continuous learning, delivering artistry in every project.' },
      { title: 'Premium Service', description: 'Comprehensive service including thorough cleaning, structural repair, expert polishing, and protective finishing. We handle every aspect of furniture care with meticulous attention to detail and commitment to perfection.' },
      { title: 'Finest Materials', description: 'Top-grade polish and finishing products for exceptional durability and appearance. We use premium brands that offer superior protection, longer life, and beautiful finishes that enhance your furniture\'s natural beauty.' },
      { title: 'Attention to Detail', description: 'Meticulous care in every aspect from preparation to final inspection. We don\'t rush through projects. Every surface is carefully prepared, every coat is properly applied, and every detail is perfected before completion.' },
      { title: 'Extended Warranty', description: 'Longer warranty coverage reflecting our confidence in quality work. We offer extended warranty periods because we use the best materials and techniques. Our work is built to last, and we guarantee it.' },
      { title: 'Personalized Service', description: 'Customized solutions tailored to your specific furniture and requirements. We understand that every piece is unique and deserves individual attention. Our experts create personalized finishing plans for optimal results.' },
    ]
  };

  return benefitVariations[titleVariation as keyof typeof benefitVariations] || benefitVariations.affordable;
}

/**
 * Generates FAQs based on service category and location
 */
export function generateFAQs(serviceCategory: string, location: string): FAQItem[] {
  const baseFAQs: FAQItem[] = [
    {
      question: `How much does ${serviceCategory.replace(/-/g, ' ')} cost in ${location}?`,
      answer: `The cost varies based on furniture size, type, and condition. Prices typically range from ₹299 to ₹4,999. We provide free consultations and accurate quotes before starting work. Contact us for a personalized estimate for your specific needs.`
    },
    {
      question: `How long does the polishing process take?`,
      answer: `Most furniture pieces take 2-5 days depending on size and complexity. We offer same-day service for urgent requirements. The process includes cleaning, preparation, multiple polish coats with drying time, and final finishing. We'll provide an accurate timeline during consultation.`
    },
    {
      question: `What types of polish do you offer?`,
      answer: `We offer PU polish (gloss and matt), melamine polish, duco polish, natural wood polish, and specialized finishes. Our experts will recommend the best option based on your furniture type, wood species, and desired appearance. All materials are premium quality for lasting results.`
    },
    {
      question: `Do you provide service in ${location}?`,
      answer: `Yes, we provide comprehensive furniture polishing services throughout ${location} and surrounding areas. Our team is familiar with the locality and offers convenient scheduling. We also serve nearby neighborhoods for your convenience.`
    },
    {
      question: `Is furniture polishing safe for antique pieces?`,
      answer: `Absolutely! We specialize in antique furniture restoration with gentle techniques that preserve original character. Our craftsmen have extensive experience with delicate and valuable pieces. We use appropriate materials and methods to enhance beauty while maintaining authenticity.`
    },
    {
      question: `What is included in your polishing service?`,
      answer: `Our comprehensive service includes thorough cleaning, surface preparation, repair of minor damages, sanding, multiple coats of premium polish, protective finishing, and quality inspection. We also provide post-service care instructions to maintain the finish.`
    },
    {
      question: `How long will the polish last?`,
      answer: `With proper care, our professional polish typically lasts 3-5 years or longer. Durability depends on usage, maintenance, and environmental factors. We provide care instructions and offer maintenance services to extend the life of your furniture's finish.`
    },
    {
      question: `Do you offer any warranty on your work?`,
      answer: `Yes, we provide a warranty on our polishing work. The warranty period varies based on the service package chosen. We stand behind our craftsmanship and will address any issues that arise during the warranty period at no additional cost.`
    }
  ];

  return baseFAQs;
}

/**
 * Generates related services based on the current service category
 * Now filters to only show URLs that actually exist in the generated pages
 * UPDATED: Uses diverse title variations for better internal linking
 */
export function generateRelatedServices(
  currentServiceCategory: string,
  currentLocation: string,
  existingUrls?: Set<string>
): { name: string; url: string }[] {
  // Map of service categories to their related services (EXPANDED to 6 services each)
  const relatedServicesMap: Record<string, string[]> = {
    'furniture-polishing': ['wood-polishing', 'pu-polish', 'wardrobe-polishing', 'dining-table-polishing', 'door-polishing', 'teak-wood-polish'],
    'wood-polishing': ['furniture-polishing', 'teak-wood-polish', 'door-polishing', 'cabinet-wood-polish', 'wardrobe-polishing', 'pu-polish'],
    'pu-polish': ['pu-gloss-polish', 'pu-matt-polish', 'furniture-polishing', 'melamine-polish', 'wood-polishing', 'duco-polish'],
    'pu-gloss-polish': ['pu-polish', 'pu-matt-polish', 'furniture-polishing', 'melamine-polish', 'wood-polishing', 'duco-polish'],
    'pu-matt-polish': ['pu-polish', 'pu-gloss-polish', 'furniture-polishing', 'melamine-polish', 'wood-polishing', 'duco-polish'],
    'melamine-polish': ['pu-polish', 'duco-polish', 'furniture-polishing', 'wood-polishing', 'pu-gloss-polish', 'pu-matt-polish'],
    'duco-polish': ['melamine-polish', 'pu-polish', 'furniture-polishing', 'wood-polishing', 'pu-gloss-polish', 'pu-matt-polish'],
    'teak-wood-polish': ['wood-polishing', 'furniture-polishing', 'door-polishing', 'wardrobe-polishing', 'antique-furniture-polish', 'mandir-polish'],
    'interior-wood-finishing': ['wood-polishing', 'furniture-polishing', 'door-polishing', 'wardrobe-polishing', 'teak-wood-polish', 'wooden-floor-polishing'],
    'door-polishing': ['wardrobe-polishing', 'furniture-polishing', 'wood-polishing', 'cabinet-wood-polish', 'interior-wood-finishing', 'teak-wood-polish'],
    'wardrobe-polishing': ['furniture-polishing', 'door-polishing', 'cabinet-wood-polish', 'bed-wood-polish', 'wood-polishing', 'bookshelfrack-polish'],
    'dining-table-polishing': ['furniture-polishing', 'wood-polishing', 'sofa-wood-polish', 'bed-wood-polish', 'teak-wood-polish', 'antique-furniture-polish'],
    'sofa-wood-polish': ['furniture-polishing', 'wood-polishing', 'dining-table-polishing', 'bed-wood-polish', 'teak-wood-polish', 'antique-furniture-polish'],
    'bed-wood-polish': ['furniture-polishing', 'wood-polishing', 'wardrobe-polishing', 'sofa-wood-polish', 'dining-table-polishing', 'cabinet-wood-polish'],
    'cabinet-wood-polish': ['wardrobe-polishing', 'furniture-polishing', 'door-polishing', 'bookshelfrack-polish', 'wood-polishing', 'bed-wood-polish'],
    'bookshelfrack-polish': ['cabinet-wood-polish', 'furniture-polishing', 'wood-polishing', 'wardrobe-polishing', 'door-polishing', 'mandir-polish'],
    'mandir-polish': ['furniture-polishing', 'wood-polishing', 'teak-wood-polish', 'cabinet-wood-polish', 'antique-furniture-polish', 'bookshelfrack-polish'],
    'jhula-polish': ['furniture-polishing', 'wood-polishing', 'teak-wood-polish', 'sofa-wood-polish', 'antique-furniture-polish', 'dining-table-polishing'],
    'wooden-floor-polishing': ['wood-polishing', 'furniture-polishing', 'interior-wood-finishing', 'teak-wood-polish', 'door-polishing', 'wardrobe-polishing'],
    'antique-furniture-polish': ['furniture-polishing', 'wood-polishing', 'teak-wood-polish', 'cabinet-wood-polish', 'dining-table-polishing', 'mandir-polish'],
  };

  const related = relatedServicesMap[currentServiceCategory] || ['furniture-polishing', 'wood-polishing', 'pu-polish', 'wardrobe-polishing', 'door-polishing', 'teak-wood-polish'];
  
  // Title variations to use for related services - DIVERSE MIX
  // Rotate through all 4 variations to ensure even distribution
  const titleVariations = ['affordable', 'top-rated', 'professional', 'best'];
  
  // Generate diverse related service URLs (THREE variations per service type for maximum coverage)
  // This increases from 8 to 12 related services per page
  const diverseRelated: { name: string; url: string; serviceSlug: string; variation: string }[] = [];
  
  // First pass: Add one link per service with rotating variations (6 services)
  for (let i = 0; i < related.length && i < 6; i++) {
    const serviceSlug = related[i];
    const variation = titleVariations[i % titleVariations.length]; // Rotate through variations
    const serviceName = serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const locationSlug = currentLocation.toLowerCase().replace(/\s+/g, '-');
    const url = `/services/${variation}-${serviceSlug}-${locationSlug}`;
    
    diverseRelated.push({
      name: serviceName,
      url,
      serviceSlug,
      variation
    });
  }
  
  // Second pass: Add another variation for each service (different from first pass)
  for (let i = 0; i < related.length && i < 6; i++) {
    const serviceSlug = related[i];
    // Use different variation than first pass (offset by 2)
    const variation = titleVariations[(i + 2) % titleVariations.length];
    const serviceName = serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const locationSlug = currentLocation.toLowerCase().replace(/\s+/g, '-');
    const url = `/services/${variation}-${serviceSlug}-${locationSlug}`;
    
    diverseRelated.push({
      name: serviceName,
      url,
      serviceSlug,
      variation
    });
  }
  
  // If existingUrls is provided, filter to only show URLs that exist
  if (existingUrls && existingUrls.size > 0) {
    const finalRelated: { name: string; url: string }[] = [];
    const addedUrls = new Set<string>(); // Track to avoid duplicates
    
    // Try to find each diverse related service in order
    for (const relatedService of diverseRelated) {
      // First try: exact match (same location, diverse variation)
      if (existingUrls.has(relatedService.url) && !addedUrls.has(relatedService.url)) {
        finalRelated.push({
          name: relatedService.name,
          url: relatedService.url
        });
        addedUrls.add(relatedService.url);
        continue;
      }
      
      // Second try: Mumbai fallback with SAME variation (to maintain diversity)
      const mumbaiUrl = `/services/${relatedService.variation}-${relatedService.serviceSlug}-mumbai`;
      if (existingUrls.has(mumbaiUrl) && !addedUrls.has(mumbaiUrl)) {
        finalRelated.push({
          name: relatedService.name,
          url: mumbaiUrl
        });
        addedUrls.add(mumbaiUrl);
        continue;
      }
      
      // Third try: Mumbai fallback with ANY variation (last resort)
      for (const variation of titleVariations) {
        const fallbackUrl = `/services/${variation}-${relatedService.serviceSlug}-mumbai`;
        if (existingUrls.has(fallbackUrl) && !addedUrls.has(fallbackUrl)) {
          finalRelated.push({
            name: relatedService.name,
            url: fallbackUrl
          });
          addedUrls.add(fallbackUrl);
          break;
        }
      }
      
      // If we found 12 services, we're done
      if (finalRelated.length >= 12) break;
    }
    
    return finalRelated.slice(0, 12); // Return up to 12 related services
  }
  
  // Fallback: return diverse related services (for backward compatibility during generation)
  return diverseRelated.map(r => ({ name: r.name, url: r.url })).slice(0, 12);
}

/**
 * Calculates approximate word count of generated content
 */
export function calculateWordCount(content: {
  introduction: string;
  services: ServiceItem[];
  process: ProcessStep[];
  serviceAreaDescription?: string;
  pricing: PricingInfo;
  whyChooseUs: BenefitItem[];
  faqs: FAQItem[];
}): number {
  let wordCount = 0;
  
  // Count introduction words
  wordCount += content.introduction.split(/\s+/).length;
  
  // Count service descriptions
  content.services.forEach(service => {
    wordCount += service.name.split(/\s+/).length;
    wordCount += service.description.split(/\s+/).length;
  });
  
  // Count process steps
  content.process.forEach(step => {
    wordCount += step.title.split(/\s+/).length;
    wordCount += step.description.split(/\s+/).length;
  });
  
  // Count service area description
  if (content.serviceAreaDescription) {
    wordCount += content.serviceAreaDescription.split(/\s+/).length;
  }
  
  // Count pricing factors
  content.pricing.factors.forEach(factor => {
    wordCount += factor.split(/\s+/).length;
  });
  
  // Count benefits
  content.whyChooseUs.forEach(benefit => {
    wordCount += benefit.title.split(/\s+/).length;
    wordCount += benefit.description.split(/\s+/).length;
  });
  
  // Count FAQs
  content.faqs.forEach(faq => {
    wordCount += faq.question.split(/\s+/).length;
    wordCount += faq.answer.split(/\s+/).length;
  });
  
  return wordCount;
}
