// Enhanced Page Generator with SEO Integration
// Integrates the existing page generation with SEO optimization

import { PageData } from '../../types';
import { generateAllPages } from '../../data/pageDataGenerator';
import { seoIntegrationService } from './SEOIntegrationService';

/**
 * Enhanced page generation with SEO optimization
 */
export async function generateSEOOptimizedPages(): Promise<PageData[]> {
  console.log('🚀 Starting enhanced page generation with SEO optimization...\n');
  
  try {
    // Generate base pages using existing system
    console.log('📄 Generating base page data...');
    const basePages = await generateAllPages();
    
    console.log(`✅ Generated ${basePages.length} base pages`);
    
    // Additional SEO processing if needed
    console.log('\n🔍 Performing additional SEO validation...');
    
    // Validate SEO compliance
    const seoValidationResults = await validateSEOCompliance(basePages);
    console.log(`📊 SEO Validation Results:`, seoValidationResults);
    
    return basePages;
  } catch (error) {
    console.error('❌ Error in enhanced page generation:', error);
    throw error;
  }
}

/**
 * Validates SEO compliance across all pages
 */
async function validateSEOCompliance(pages: PageData[]): Promise<{
  totalPages: number;
  validPages: number;
  issues: string[];
  recommendations: string[];
}> {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let validPages = 0;

  for (const page of pages) {
    let pageValid = true;

    // Check title length (50-60 characters optimal)
    if (page.title.length < 30 || page.title.length > 60) {
      issues.push(`${page.url}: Title length ${page.title.length} (optimal: 30-60 chars)`);
      pageValid = false;
    }

    // Check meta description length (150-160 characters optimal)
    if (page.metaDescription.length < 150 || page.metaDescription.length > 160) {
      issues.push(`${page.url}: Meta description length ${page.metaDescription.length} (optimal: 150-160 chars)`);
      pageValid = false;
    }

    // Check H1 tag presence and uniqueness
    if (!page.h1 || page.h1.length === 0) {
      issues.push(`${page.url}: Missing H1 tag`);
      pageValid = false;
    }

    // Check canonical URL
    if (!page.canonicalUrl || !page.canonicalUrl.startsWith('https://')) {
      issues.push(`${page.url}: Invalid or missing canonical URL`);
      pageValid = false;
    }

    // Check structured data
    if (!page.schema || !page.schema.localBusiness || !page.schema.service) {
      issues.push(`${page.url}: Missing or incomplete structured data`);
      pageValid = false;
    }

    // Check internal linking
    if (page.relatedServices.length < 3) {
      recommendations.push(`${page.url}: Consider adding more related services (current: ${page.relatedServices.length})`);
    }

    if (pageValid) {
      validPages++;
    }
  }

  // Generate recommendations
  if (issues.length > 0) {
    recommendations.push('Fix critical SEO issues identified above');
  }
  
  if (validPages / pages.length < 0.95) {
    recommendations.push('Improve SEO compliance rate (target: 95%+)');
  }

  return {
    totalPages: pages.length,
    validPages,
    issues: issues.slice(0, 10), // Limit to first 10 issues
    recommendations
  };
}

/**
 * Processes pages for specific SEO improvements
 */
export async function applySEOImprovements(pages: PageData[]): Promise<PageData[]> {
  console.log('🔧 Applying SEO improvements...');
  
  try {
    // Process through individual managers for specific improvements
    const managers = seoIntegrationService.getManagers();
    
    // Convert to SEO format for processing
    const seoPages = pages.map(page => ({
      url: page.url,
      title: page.title,
      metaDescription: page.metaDescription,
      h1Tag: page.h1,
      wordCount: calculateWordCount(page),
      internalLinks: [],
      outgoingLinks: page.relatedServices.map(service => ({
        sourceUrl: page.url,
        targetUrl: service.url,
        anchorText: service.name,
        linkType: 'internal' as const,
        isNoFollow: false,
        context: 'related-services'
      })),
      canonicalUrl: page.canonicalUrl,
      openGraphTags: {
        title: page.title,
        description: page.metaDescription,
        image: '/assets/wooden furniture .webp',
        url: page.canonicalUrl,
        type: 'website',
        siteName: 'A1 Furniture Polish'
      },
      twitterCardTags: {
        card: 'summary_large_image' as const,
        title: page.title,
        description: page.metaDescription,
        image: '/assets/wooden furniture .webp'
      },
      structuredData: page.schema,
      lastModified: new Date(),
      seoScore: 0
    }));

    // Apply link improvements
    console.log('  🔗 Optimizing internal links...');
    await managers.linkManager.processLinkUpdates(seoPages);
    
    // Apply meta improvements
    console.log('  📝 Optimizing meta tags...');
    await managers.metaManager.processMetaUpdates(seoPages);
    
    // Apply content improvements
    console.log('  📄 Validating content quality...');
    await managers.contentValidator.processContentValidation(seoPages);
    
    // Apply performance improvements
    console.log('  ⚡ Optimizing performance...');
    await managers.performanceOptimizer.processPerformanceOptimization(seoPages);
    
    console.log('✅ SEO improvements applied successfully');
    
    // Convert back to PageData format
    return seoPages.map((seoPage, index) => ({
      ...pages[index],
      title: seoPage.title,
      metaDescription: seoPage.metaDescription,
      h1: seoPage.h1Tag,
      canonicalUrl: seoPage.canonicalUrl || pages[index].canonicalUrl,
      relatedServices: seoPage.outgoingLinks
        .filter(link => link.linkType === 'internal')
        .map(link => ({
          name: link.anchorText,
          url: link.targetUrl
        }))
    }));
  } catch (error) {
    console.error('❌ Error applying SEO improvements:', error);
    return pages; // Return original pages if improvements fail
  }
}

/**
 * Helper function to calculate word count
 */
function calculateWordCount(pageData: PageData): number {
  const content = [
    pageData.introduction,
    pageData.services.map(s => `${s.name} ${s.description}`).join(' '),
    pageData.process.map(p => `${p.title} ${p.description}`).join(' '),
    pageData.serviceAreaDescription,
    pageData.pricing.factors.join(' '),
    pageData.whyChooseUs.map(w => `${w.title} ${w.description}`).join(' '),
    pageData.faqs.map(f => `${f.question} ${f.answer}`).join(' ')
  ].join(' ');

  return content.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Generates performance-optimized pages
 */
export async function generatePerformanceOptimizedPages(): Promise<PageData[]> {
  console.log('⚡ Generating performance-optimized pages...');
  
  const pages = await generateSEOOptimizedPages();
  
  // Apply additional performance optimizations
  const managers = seoIntegrationService.getManagers();
  
  // Set cache headers for all pages
  console.log('  🗄️ Setting cache headers...');
  pages.forEach(page => {
    const seoPage = {
      url: page.url,
      title: page.title,
      metaDescription: page.metaDescription,
      h1Tag: page.h1,
      wordCount: calculateWordCount(page),
      internalLinks: [],
      outgoingLinks: [],
      canonicalUrl: page.canonicalUrl,
      openGraphTags: {
        title: page.title,
        description: page.metaDescription,
        image: '/assets/wooden furniture .webp',
        url: page.canonicalUrl,
        type: 'website',
        siteName: 'A1 Furniture Polish'
      },
      twitterCardTags: {
        card: 'summary_large_image' as const,
        title: page.title,
        description: page.metaDescription,
        image: '/assets/wooden furniture .webp'
      },
      structuredData: page.schema,
      lastModified: new Date(),
      seoScore: 0
    };
    
    const cacheHeaders = managers.performanceOptimizer.setCacheHeaders(seoPage);
    console.log(`    📄 ${page.url}: Cache headers set`);
  });
  
  console.log('✅ Performance optimization complete');
  return pages;
}

export default {
  generateSEOOptimizedPages,
  applySEOImprovements,
  generatePerformanceOptimizedPages
};