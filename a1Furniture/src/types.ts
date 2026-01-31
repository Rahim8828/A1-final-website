import { ComponentType } from 'react';

export interface BlogPostData {
  slug: string;
  title: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  description: string;
  keywords: string;
  content: string;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  relatedPosts?: string[];
  tableOfContents?: boolean;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  icon?: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Urban Company Style Service UI Types

export interface ServiceOption {
  id?: string;
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  estimatedTime?: string;
  image?: string;
  badge?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TrustBadge {
  icon: string;
  text: string;
}

export interface ServiceData {
  id: string;
  name: string;
  category: string;
  tabCategory?: 'polish' | 'sofa' | 'product' | 'ikea';
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  features: string[];
  options: ServiceOption[];
  selectedOption?: number;
  priceIncludes: string[];
  materials: string[];
  processSteps: ProcessStep[];
  faqs: FAQ[];
  trustBadges: TrustBadge[];
}

export interface SelectedService {
  serviceId: string;
  serviceName: string;
  optionId: string;
  optionName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface BookingData {
  services: SelectedService[];
  totalPrice: number;
  customerInfo?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

// Bulk SEO Page Generator Types

export interface ServiceItem {
  name: string;
  description: string;
  icon?: string;
}

export interface PricingInfo {
  startingPrice: number;
  priceRange: string;
  factors: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedService {
  name: string;
  url: string;
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs: string[];
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    bestRating: string;
    worstRating: string;
    ratingCount: string;
  };
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  serviceType: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: {
    '@type': string;
    name: string;
  };
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
      };
    }>;
  };
}

export interface PageData {
  // SEO Fields
  title: string;
  metaDescription: string;
  h1: string;
  url: string;
  canonicalUrl: string;
  
  // Service Information
  serviceCategory: string;
  serviceName: string;
  location: string;
  titleVariation: 'affordable' | 'top-rated' | 'professional' | 'best';
  
  // Content Sections
  introduction: string;
  services: ServiceItem[];
  process: ProcessStep[];
  locationAreas: string[];
  serviceAreaDescription: string;
  pricing: PricingInfo;
  whyChooseUs: BenefitItem[];
  faqs: FAQItem[];
  relatedServices: RelatedService[];
  
  // Schema Data
  schema: {
    localBusiness: LocalBusinessSchema;
    service: ServiceSchema;
  };
  
  // Keywords
  primaryKeyword: string;
  secondaryKeywords: string[];
}
