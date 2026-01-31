/**
 * Schema Markup Generator
 * Functions for generating JSON-LD structured data for SEO
 */

import type { LocalBusinessSchema, ServiceSchema } from '../types';

/**
 * Generates LocalBusiness schema markup
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @param url - The page URL
 * @returns LocalBusiness schema object
 */
export function generateLocalBusinessSchema(
  serviceName: string,
  location: string,
  url: string
): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish',
    image: 'https://a1furniturepolish.com/logo.png',
    '@id': 'https://a1furniturepolish.com',
    url: url,
    telephone: '+91-9819519345',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mumbai',
      addressLocality: location,
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
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
    sameAs: [
      'https://www.facebook.com/a1furniturepolish',
      'https://www.instagram.com/a1furniturepolish',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '500',
    },
  };
  
  return schema;
}

/**
 * Generates Service schema markup
 * 
 * @param serviceName - The service name
 * @param serviceCategory - The service category
 * @param location - The location
 * @param services - Array of service items offered
 * @returns Service schema object
 */
export function generateServiceSchema(
  serviceName: string,
  serviceCategory: string,
  location: string,
  services?: Array<{ name: string }>
): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: 'A1 Furniture Polish',
    },
    areaServed: {
      '@type': 'City',
      name: location,
    },
  };
  
  // Add service catalog if services are provided
  if (services && services.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${serviceCategory} Services`,
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
        },
      })),
    };
  }
  
  return schema;
}

/**
 * Generates BreadcrumbList schema markup
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @param url - The page URL
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbSchema(
  serviceName: string,
  location: string,
  url: string
): Record<string, any> {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://a1furniturepolish.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://a1furniturepolish.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${serviceName} in ${location}`,
        item: url,
      },
    ],
  };
  
  return schema;
}

/**
 * Validates JSON-LD schema output
 * Ensures all required fields are present and properly formatted
 * 
 * @param schema - The schema object to validate
 * @param schemaType - The type of schema ('LocalBusiness', 'Service', 'BreadcrumbList')
 * @returns True if valid, false otherwise
 */
export function validateSchema(
  schema: Record<string, any>,
  schemaType: 'LocalBusiness' | 'Service' | 'BreadcrumbList'
): boolean {
  try {
    // Check for required @context and @type
    if (!schema['@context'] || !schema['@type']) {
      return false;
    }
    
    // Validate based on schema type
    switch (schemaType) {
      case 'LocalBusiness':
        return validateLocalBusinessSchema(schema);
      case 'Service':
        return validateServiceSchema(schema);
      case 'BreadcrumbList':
        return validateBreadcrumbSchema(schema);
      default:
        return false;
    }
  } catch (error) {
    console.error('Schema validation error:', error);
    return false;
  }
}

/**
 * Validates LocalBusiness schema
 */
function validateLocalBusinessSchema(schema: Record<string, any>): boolean {
  const requiredFields = ['name', 'address', 'telephone'];
  
  for (const field of requiredFields) {
    if (!schema[field]) {
      return false;
    }
  }
  
  // Validate address structure
  if (!schema.address['@type'] || !schema.address.addressLocality) {
    return false;
  }
  
  return true;
}

/**
 * Validates Service schema
 */
function validateServiceSchema(schema: Record<string, any>): boolean {
  const requiredFields = ['serviceType', 'provider', 'areaServed'];
  
  for (const field of requiredFields) {
    if (!schema[field]) {
      return false;
    }
  }
  
  // Validate provider structure
  if (!schema.provider['@type'] || !schema.provider.name) {
    return false;
  }
  
  // Validate areaServed structure
  if (!schema.areaServed['@type'] || !schema.areaServed.name) {
    return false;
  }
  
  return true;
}

/**
 * Validates BreadcrumbList schema
 */
function validateBreadcrumbSchema(schema: Record<string, any>): boolean {
  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    return false;
  }
  
  // Validate each breadcrumb item
  for (const item of schema.itemListElement) {
    if (!item['@type'] || !item.position || !item.name || !item.item) {
      return false;
    }
  }
  
  return true;
}

/**
 * Converts schema object to JSON-LD string
 * 
 * @param schema - The schema object
 * @returns JSON-LD string
 */
export function schemaToJsonLd(schema: Record<string, any>): string {
  return JSON.stringify(schema, null, 2);
}

/**
 * Generates all schema markup for a service page
 * 
 * @param serviceName - The service name
 * @param serviceCategory - The service category
 * @param location - The location
 * @param url - The page URL
 * @param services - Optional array of service items
 * @returns Object containing all schema types
 */
export function generateAllSchemas(
  serviceName: string,
  serviceCategory: string,
  location: string,
  url: string,
  services?: Array<{ name: string }>
): {
  localBusiness: LocalBusinessSchema;
  service: ServiceSchema;
  breadcrumb: Record<string, any>;
} {
  const localBusiness = generateLocalBusinessSchema(serviceName, location, url);
  const service = generateServiceSchema(serviceName, serviceCategory, location, services);
  const breadcrumb = generateBreadcrumbSchema(serviceName, location, url);
  
  // Validate schemas
  if (!validateSchema(localBusiness, 'LocalBusiness')) {
    console.warn('LocalBusiness schema validation failed');
  }
  
  if (!validateSchema(service, 'Service')) {
    console.warn('Service schema validation failed');
  }
  
  if (!validateSchema(breadcrumb, 'BreadcrumbList')) {
    console.warn('BreadcrumbList schema validation failed');
  }
  
  return {
    localBusiness,
    service,
    breadcrumb,
  };
}
