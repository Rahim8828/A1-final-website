/**
 * SEO Helper Utilities
 * Functions for generating SEO-friendly URLs, meta tags, and content
 */

/**
 * Converts a string to a URL-friendly slug in kebab-case
 * Handles special characters, spaces, and ensures uniqueness
 * 
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug in kebab-case
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace special characters and spaces with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a unique URL slug from service name and location
 * 
 * @param serviceName - The service name (e.g., "Affordable Furniture Polishing")
 * @param location - The location (e.g., "Andheri West")
 * @returns URL slug (e.g., "affordable-furniture-polishing-andheri-west")
 */
export function generateServiceLocationSlug(serviceName: string, location: string): string {
  const serviceSlug = generateSlug(serviceName);
  const locationSlug = generateSlug(location);
  
  return `${serviceSlug}-${locationSlug}`;
}

/**
 * Generates a complete service page URL
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @returns Full URL path (e.g., "/services/affordable-furniture-polishing-andheri-west")
 */
export function generateServicePageUrl(serviceName: string, location: string): string {
  const slug = generateServiceLocationSlug(serviceName, location);
  return `/services/${slug}`;
}

/**
 * Ensures URL uniqueness by checking against existing URLs
 * If duplicate found, appends a number
 * 
 * @param url - The URL to check
 * @param existingUrls - Set of existing URLs
 * @returns Unique URL
 */
export function ensureUniqueUrl(url: string, existingUrls: Set<string>): string {
  let uniqueUrl = url;
  let counter = 1;
  
  while (existingUrls.has(uniqueUrl)) {
    uniqueUrl = `${url}-${counter}`;
    counter++;
  }
  
  return uniqueUrl;
}

/**
 * Generates an SEO-optimized meta title with keywords
 * Ensures title is within optimal length (50-60 characters)
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @param suffix - Optional suffix (e.g., "| 4.9★ Rated")
 * @returns Optimized meta title
 */
export function generateMetaTitle(
  serviceName: string,
  location: string,
  suffix?: string
): string {
  let title = `${serviceName} in ${location}`;
  
  if (suffix) {
    title = `${title} ${suffix}`;
  }
  
  // Ensure title is not too long (max 60 characters for SEO)
  if (title.length > 60) {
    // Try without suffix first
    if (suffix) {
      title = `${serviceName} in ${location}`;
    }
    
    // If still too long, truncate service name
    if (title.length > 60) {
      const maxServiceLength = 60 - location.length - 5; // " in " = 4 chars + buffer
      const truncatedService = serviceName.substring(0, maxServiceLength);
      title = `${truncatedService} in ${location}`;
    }
  }
  
  return title;
}

/**
 * Generates an SEO-optimized meta description
 * Ensures description is within optimal length (150-160 characters)
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @param benefits - Array of key benefits to include
 * @returns Optimized meta description
 */
export function generateMetaDescription(
  serviceName: string,
  location: string,
  benefits: string[] = []
): string {
  const baseDescription = `Get ${serviceName.toLowerCase()} in ${location}.`;
  
  // Add benefits if space allows
  let description = baseDescription;
  
  if (benefits.length > 0) {
    const benefitsText = benefits.join(', ');
    const fullDescription = `${baseDescription} ${benefitsText}. Book now!`;
    
    // Ensure within 150-160 character range
    if (fullDescription.length <= 160) {
      description = fullDescription;
    } else if (fullDescription.length <= 170) {
      // Try with fewer benefits
      const shorterBenefits = benefits.slice(0, 2).join(', ');
      description = `${baseDescription} ${shorterBenefits}. Book now!`;
    } else {
      // Just use base with call to action
      description = `${baseDescription} Professional service, affordable rates. Book online today!`;
    }
  } else {
    description = `${baseDescription} Professional service, affordable rates. Book online today!`;
  }
  
  // Ensure minimum length of 150 characters
  if (description.length < 150) {
    description = `${baseDescription} Expert craftsmen, quality materials, affordable pricing. Same-day service available. Book your appointment online now!`;
  }
  
  // Final check - truncate if too long
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}

/**
 * Generates Open Graph meta tags for social sharing
 * 
 * @param title - Page title
 * @param description - Page description
 * @param url - Page URL
 * @param image - Image URL for social sharing
 * @returns Object containing Open Graph tags
 */
export function generateOpenGraphTags(
  title: string,
  description: string,
  url: string,
  image?: string
): Record<string, string> {
  const ogTags: Record<string, string> = {
    'og:type': 'website',
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:site_name': 'A1 Furniture Polish',
  };
  
  if (image) {
    ogTags['og:image'] = image;
    ogTags['og:image:alt'] = title;
  }
  
  // Twitter Card tags
  ogTags['twitter:card'] = 'summary_large_image';
  ogTags['twitter:title'] = title;
  ogTags['twitter:description'] = description;
  
  if (image) {
    ogTags['twitter:image'] = image;
  }
  
  return ogTags;
}

/**
 * Extracts primary keyword from service name and location
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @returns Primary keyword phrase
 */
export function extractPrimaryKeyword(serviceName: string, location: string): string {
  // Remove common prefixes like "Affordable", "Best", "Top-Rated", "Professional"
  const cleanedService = serviceName
    .replace(/^(Affordable|Best|Top-Rated|Professional)\s+/i, '')
    .trim();
  
  return `${cleanedService} ${location}`;
}

/**
 * Generates secondary keywords for SEO
 * 
 * @param serviceName - The service name
 * @param location - The location
 * @param serviceCategory - The service category
 * @returns Array of secondary keywords
 */
export function generateSecondaryKeywords(
  serviceName: string,
  location: string,
  serviceCategory: string
): string[] {
  const cleanedService = serviceName
    .replace(/^(Affordable|Best|Top-Rated|Professional)\s+/i, '')
    .trim();
  
  const keywords: string[] = [
    `${cleanedService} near me`,
    `${cleanedService} ${location} price`,
    `${cleanedService} ${location} cost`,
    `${serviceCategory} ${location}`,
    `${serviceCategory} services ${location}`,
    `furniture polish ${location}`,
    `wood polish ${location}`,
  ];
  
  return keywords;
}
