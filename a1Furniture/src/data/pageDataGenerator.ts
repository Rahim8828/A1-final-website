/**
 * Page Data Generator
 * Generates PageData objects for all 150 service pages
 * Phase 1: 80 Mumbai generic pages (20 categories × 4 variations)
 * Phase 2: 70 location-specific pages (balanced distribution)
 */

import { PageData } from '../types';
import {
  serviceCategories,
  mumbaiLocations,
  mumbaiGenericLocation,
  titleVariations,
} from './generatedPagesConfig';
import {
  generateIntroduction,
  generateServiceList,
  generateProcessSteps,
  generateLocationAreas,
  generateServiceAreaDescription,
  generatePricingInfo,
  generateWhyChooseUs,
  generateFAQs,
  generateRelatedServices,
  calculateWordCount,
} from './contentTemplates';
import {
  generateServicePageUrl,
  generateMetaTitle,
  generateMetaDescription,
  extractPrimaryKeyword,
  generateSecondaryKeywords,
  ensureUniqueUrl,
} from '../utils/seoHelpers';
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
} from '../utils/schemaGenerator';
import { seoIntegrationService } from '../seo/integration/SEOIntegrationService';

/**
 * Generates a single PageData object
 */
function generatePageData(
  serviceCategory: typeof serviceCategories[number],
  location: { id: string; name: string; slug: string; zone: string; priority: number },
  titleVariation: typeof titleVariations[number],
  existingUrls: Set<string>
): PageData {
  // Construct service name with title variation prefix
  const serviceName = `${titleVariation.prefix} ${serviceCategory.name}`;
  
  // Generate URL
  const baseUrl = generateServicePageUrl(serviceName, location.name);
  const url = ensureUniqueUrl(baseUrl, existingUrls);
  existingUrls.add(url);
  
  // Generate SEO elements
  const metaTitle = generateMetaTitle(serviceName, location.name, titleVariation.suffix);
  const benefits = ['Expert craftsmen', 'Quality materials', 'Affordable rates'];
  const metaDescription = generateMetaDescription(serviceName, location.name, benefits);
  const h1 = `${serviceName} in ${location.name}`;
  const canonicalUrl = `https://www.a1furniturepolish.com${url}`;
  
  // Generate content sections
  const introduction = generateIntroduction(serviceName, location.name, titleVariation.type);
  const services = generateServiceList(serviceCategory.id);
  const process = generateProcessSteps();
  const locationAreas = generateLocationAreas(location.name);
  const serviceAreaDescription = generateServiceAreaDescription(location.name);
  const pricing = generatePricingInfo(titleVariation.type, serviceCategory.id);
  const whyChooseUs = generateWhyChooseUs(titleVariation.type);
  const faqs = generateFAQs(serviceCategory.id, location.name);
  const relatedServices = generateRelatedServices(serviceCategory.id, location.slug, existingUrls);
  
  // Generate keywords
  const primaryKeyword = extractPrimaryKeyword(serviceName, location.name);
  const secondaryKeywords = generateSecondaryKeywords(serviceName, location.name, serviceCategory.name);
  
  // Generate schema markup
  const localBusinessSchema = generateLocalBusinessSchema(serviceName, location.name, canonicalUrl);
  const serviceSchema = generateServiceSchema(serviceName, serviceCategory.name, location.name, services);
  
  const pageData: PageData = {
    title: metaTitle,
    metaDescription,
    h1,
    url,
    canonicalUrl,
    serviceCategory: serviceCategory.id,
    serviceName,
    location: location.name,
    titleVariation: titleVariation.type,
    introduction,
    services,
    process,
    locationAreas,
    serviceAreaDescription,
    pricing,
    whyChooseUs,
    faqs,
    relatedServices,
    schema: {
      localBusiness: localBusinessSchema,
      service: serviceSchema,
    },
    primaryKeyword,
    secondaryKeywords,
  };
  
  return pageData;
}

/**
 * Phase 1: Generate 80 Mumbai generic pages
 * 20 categories × 4 title variations = 80 pages
 */
function generatePhase1Pages(existingUrls: Set<string>): PageData[] {
  const pages: PageData[] = [];
  
  for (const category of serviceCategories) {
    for (const variation of titleVariations) {
      const pageData = generatePageData(
        category,
        mumbaiGenericLocation,
        variation,
        existingUrls
      );
      pages.push(pageData);
    }
  }
  
  return pages;
}

/**
 * Phase 2: Generate 70 location-specific pages
 * Balanced distribution: 3-4 pages per category across specific locations
 * Strategy: Prioritize high-priority locations and mix title variations
 */
function generatePhase2Pages(existingUrls: Set<string>): PageData[] {
  const pages: PageData[] = [];
  
  // Get priority locations (priority 1 and 2)
  const priorityLocations = mumbaiLocations.filter(loc => loc.priority <= 2);
  
  // For each category, generate 3-4 location-specific pages
  for (let i = 0; i < serviceCategories.length; i++) {
    const category = serviceCategories[i];
    const pagesPerCategory = i % 2 === 0 ? 4 : 3; // Alternate between 3 and 4 pages
    
    // Select locations for this category (rotate through priority locations)
    const startIndex = (i * 4) % priorityLocations.length;
    const selectedLocations: typeof priorityLocations = [];
    
    for (let j = 0; j < pagesPerCategory; j++) {
      const locationIndex = (startIndex + j) % priorityLocations.length;
      selectedLocations.push(priorityLocations[locationIndex]);
    }
    
    // Generate pages with different title variations
    for (let j = 0; j < selectedLocations.length; j++) {
      const location = selectedLocations[j];
      const variation = titleVariations[j % titleVariations.length];
      
      const pageData = generatePageData(
        category,
        location,
        variation,
        existingUrls
      );
      pages.push(pageData);
    }
  }
  
  return pages;
}

/**
 * Main function to generate all 150 pages
 * Uses two-pass approach: first collect all URLs, then generate pages with valid related services
 * Integrates with SEO system for optimization
 */
export async function generateAllPages(): Promise<PageData[]> {
  const existingUrls = new Set<string>();
  
  // Phase 1: Generate 80 Mumbai generic pages (first pass - collect URLs)
  const phase1Pages = generatePhase1Pages(existingUrls);
  console.log(`Phase 1 complete: Generated ${phase1Pages.length} Mumbai generic pages`);
  
  // Phase 2: Generate 70 location-specific pages (first pass - collect URLs)
  const phase2Pages = generatePhase2Pages(existingUrls);
  console.log(`Phase 2 complete: Generated ${phase2Pages.length} location-specific pages`);
  
  // Combine all pages
  let allPages = [...phase1Pages, ...phase2Pages];
  console.log(`Total pages generated: ${allPages.length}`);
  console.log(`Total URLs collected: ${existingUrls.size}`);
  
  // Second pass: Update related services for all pages with valid URLs only
  console.log('Updating related services with valid URLs...');
  allPages.forEach(page => {
    page.relatedServices = generateRelatedServices(
      page.serviceCategory,
      page.location.toLowerCase().replace(/\s+/g, '-'),
      existingUrls
    );
  });
  
  // Count pages with related services
  const pagesWithRelatedServices = allPages.filter(p => p.relatedServices.length > 0).length;
  console.log(`Pages with related services: ${pagesWithRelatedServices}/${allPages.length}`);
  
  // Validate word count for sample pages
  const samplePage = allPages[0];
  const wordCount = calculateWordCount({
    introduction: samplePage.introduction,
    services: samplePage.services,
    process: samplePage.process,
    serviceAreaDescription: samplePage.serviceAreaDescription,
    pricing: samplePage.pricing,
    whyChooseUs: samplePage.whyChooseUs,
    faqs: samplePage.faqs,
  });
  console.log(`Sample page word count: ${wordCount} words`);
  
  // SEO Integration: Process all pages through SEO system
  console.log('Processing pages through SEO system...');
  try {
    allPages = await seoIntegrationService.processPages(allPages);
    console.log('SEO processing completed successfully');
    
    // Perform SEO health check
    const healthCheckResult = await seoIntegrationService.performHealthCheck(allPages);
    console.log(`SEO health check completed: ${healthCheckResult.successfulPages.length} pages checked`);
  } catch (error) {
    console.warn('SEO processing failed, continuing with original pages:', error);
  }
  
  return allPages;
}

/**
 * Generate Mumbai generic pages (Phase 1)
 */
export function generateMumbaiGenericPages(): PageData[] {
  return generatePhase1Pages(new Set());
}

/**
 * Generate location-specific pages (Phase 2)
 */
export function generateLocationSpecificPages(): PageData[] {
  const existingUrls = new Set(generatePhase1Pages(new Set()).map(page => page.url));
  return generatePhase2Pages(existingUrls);
}

/**
 * Generates all pages synchronously (without SEO processing)
 * Used for validation and testing
 */
export function generateAllPagesSync(): PageData[] {
  console.log('Phase 1: Generating 80 Mumbai generic pages...');
  const phase1Pages = generateMumbaiGenericPages();
  console.log(`Phase 1 complete: Generated ${phase1Pages.length} Mumbai generic pages`);

  console.log('Phase 2: Generating 70 location-specific pages...');
  const phase2Pages = generateLocationSpecificPages();
  console.log(`Phase 2 complete: Generated ${phase2Pages.length} location-specific pages`);

  const allPages = [...phase1Pages, ...phase2Pages];
  console.log(`Total pages generated: ${allPages.length}`);

  // Collect all URLs for related services
  const existingUrls = new Set(allPages.map(page => page.url));
  console.log(`Total URLs collected: ${existingUrls.size}`);

  // Second pass: Update related services for all pages with valid URLs only
  console.log('Updating related services with valid URLs...');
  allPages.forEach(page => {
    page.relatedServices = generateRelatedServices(
      page.serviceCategory,
      page.location.toLowerCase().replace(/\s+/g, '-'),
      existingUrls
    );
  });

  // Count pages with related services
  const pagesWithRelatedServices = allPages.filter(p => p.relatedServices.length > 0).length;
  console.log(`Pages with related services: ${pagesWithRelatedServices}/${allPages.length}`);

  // Validate word count for sample pages
  const samplePage = allPages[0];
  const wordCount = calculateWordCount({
    introduction: samplePage.introduction,
    services: samplePage.services,
    process: samplePage.process,
    serviceAreaDescription: samplePage.serviceAreaDescription,
    pricing: samplePage.pricing,
    whyChooseUs: samplePage.whyChooseUs,
    faqs: samplePage.faqs,
  });
  console.log(`Sample page word count: ${wordCount} words`);

  return allPages;
}

/**
 * Validates that all pages meet requirements
 */
export function validatePages(pages: PageData[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check total count
  if (pages.length !== 150) {
    errors.push(`Expected 150 pages, got ${pages.length}`);
  }
  
  // Check for duplicate URLs
  const urls = new Set<string>();
  pages.forEach((page, index) => {
    if (urls.has(page.url)) {
      errors.push(`Duplicate URL found: ${page.url} at index ${index}`);
    }
    urls.add(page.url);
  });
  
  // Check required fields
  pages.forEach((page, index) => {
    if (!page.title || !page.metaDescription || !page.h1 || !page.url) {
      errors.push(`Missing required SEO fields at index ${index}`);
    }
    if (!page.introduction || page.services.length === 0 || page.faqs.length === 0) {
      errors.push(`Missing required content sections at index ${index}`);
    }
  });
  
  // Check word count for sample pages (first 5)
  for (let i = 0; i < Math.min(5, pages.length); i++) {
    const page = pages[i];
    const wordCount = calculateWordCount({
      introduction: page.introduction,
      services: page.services,
      process: page.process,
      serviceAreaDescription: page.serviceAreaDescription,
      pricing: page.pricing,
      whyChooseUs: page.whyChooseUs,
      faqs: page.faqs,
    });
    
    if (wordCount < 1000 || wordCount > 1500) {
      errors.push(`Page ${i} word count ${wordCount} is outside range 1000-1500`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
