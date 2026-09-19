// Sitemap Generator Usage Examples

import { SitemapGenerator } from '../managers/SitemapGenerator';
import { SEOPageModel } from '../models/SEOPageModel';
import { SEOPage } from '../types';

// Example usage of the Sitemap Generator
export function demonstrateSitemapGenerator() {
  console.log('=== Sitemap Generator Examples ===\n');

  // Initialize the Sitemap Generator
  const sitemapGenerator = new SitemapGenerator({
    includeLastModified: true,
    defaultPriority: 0.8,
    defaultChangeFreq: 'weekly',
    robotsTxtEnabled: true,
    structuredDataEnabled: true
  });

  // Create sample pages
  const pages: SEOPage[] = [
    new SEOPageModel({
      url: 'https://a1furniturepolish.com/',
      title: 'A1 Furniture Polish - Professional Furniture Polishing Services Mumbai',
      metaDescription: 'Professional furniture polishing services in Mumbai. Expert wood polish, sofa repair, and antique restoration. Book online for best rates.',
      h1Tag: 'Professional Furniture Polishing Services in Mumbai',
      wordCount: 850,
      lastModified: new Date('2023-12-01')
    }),
    new SEOPageModel({
      url: 'https://a1furniturepolish.com/services/wooden-furniture-polish',
      title: 'Wooden Furniture Polish Services - Expert Wood Restoration Mumbai',
      metaDescription: 'Expert wooden furniture polishing services in Mumbai. Professional wood restoration, PU polish, melamine polish. Get instant quote online.',
      h1Tag: 'Wooden Furniture Polish Services',
      wordCount: 650,
      lastModified: new Date('2023-11-15')
    }),
    new SEOPageModel({
      url: 'https://a1furniturepolish.com/services/sofa-repair',
      title: 'Sofa Repair Services Mumbai - Professional Upholstery Repair',
      metaDescription: 'Professional sofa repair and upholstery services in Mumbai. Fabric change, cushion repair, frame fixing. Expert craftsmen, affordable rates.',
      h1Tag: 'Professional Sofa Repair Services',
      wordCount: 720,
      lastModified: new Date('2023-11-20')
    }),
    new SEOPageModel({
      url: 'https://a1furniturepolish.com/blog/furniture-care-tips',
      title: 'Essential Furniture Care Tips - Maintain Your Wooden Furniture',
      metaDescription: 'Learn essential furniture care tips to maintain your wooden furniture. Expert advice on cleaning, polishing, and preserving furniture longevity.',
      h1Tag: 'Essential Furniture Care Tips',
      wordCount: 450,
      lastModified: new Date('2023-10-30')
    })
  ];

  console.log('1. Generate XML Sitemap');
  console.log('======================');
  const xmlSitemap = sitemapGenerator.generateXMLSitemap(pages);
  console.log(xmlSitemap);
  console.log('\n');

  console.log('2. Generate Robots.txt');
  console.log('======================');
  const robotsTxt = sitemapGenerator.generateRobotsTxt(
    'https://a1furniturepolish.com/sitemap.xml'
  );
  console.log(robotsTxt);
  console.log('\n');

  console.log('3. Generate Robots.txt with Disallowed Paths');
  console.log('============================================');
  const restrictiveRobotsTxt = sitemapGenerator.generateRobotsTxt(
    'https://a1furniturepolish.com/sitemap.xml',
    ['/admin/', '/private/', '/temp/']
  );
  console.log(restrictiveRobotsTxt);
  console.log('\n');

  console.log('4. Generate Structured Data for Homepage');
  console.log('=======================================');
  const homepageStructuredData = sitemapGenerator.generateStructuredData(pages[0]);
  console.log(JSON.stringify(homepageStructuredData, null, 2));
  console.log('\n');

  console.log('5. Generate Structured Data for Service Page');
  console.log('============================================');
  const serviceStructuredData = sitemapGenerator.generateStructuredData(pages[1]);
  console.log(JSON.stringify(serviceStructuredData, null, 2));
  console.log('\n');

  console.log('6. Validate Generated Sitemap');
  console.log('=============================');
  const isValid = sitemapGenerator.validateSitemap(xmlSitemap);
  console.log(`Sitemap is valid: ${isValid}`);
  console.log('\n');

  console.log('7. Add New Pages to Sitemap');
  console.log('===========================');
  const newPages: SEOPage[] = [
    new SEOPageModel({
      url: 'https://a1furniturepolish.com/services/antique-restoration',
      title: 'Antique Furniture Restoration Mumbai - Expert Restoration Services',
      metaDescription: 'Professional antique furniture restoration in Mumbai. Expert craftsmen restore vintage furniture to original beauty. Free consultation available.',
      h1Tag: 'Antique Furniture Restoration Services',
      wordCount: 580,
      lastModified: new Date('2023-12-10')
    })
  ];

  sitemapGenerator.addNewPagesToSitemap(newPages);
  const updatedSitemap = sitemapGenerator.generateXMLSitemap([...pages, ...newPages]);
  console.log('Updated sitemap with new pages:');
  console.log(updatedSitemap.substring(0, 500) + '...');
  console.log('\n');

  console.log('8. Update Timestamps');
  console.log('===================');
  const updatedPages = pages.map(page => ({
    ...page,
    lastModified: new Date('2023-12-12')
  }));
  
  sitemapGenerator.updateSitemapTimestamps(updatedPages);
  console.log('Timestamps updated for existing pages');
  console.log('\n');

  console.log('9. Get Sitemap Statistics');
  console.log('========================');
  const stats = sitemapGenerator.getSitemapStats();
  console.log(`Total pages in sitemap: ${stats.totalPages}`);
  console.log(`Last updated: ${stats.lastUpdated?.toISOString()}`);
  console.log('\n');

  console.log('10. Bulk Sitemap Updates');
  console.log('=======================');
  sitemapGenerator.processSitemapUpdates([...pages, ...newPages])
    .then(result => {
      console.log(`Bulk update completed:`);
      console.log(`- Successful pages: ${result.successfulPages.length}`);
      console.log(`- Failed pages: ${result.failedPages.length}`);
      console.log(`- Rollback available: ${result.rollbackAvailable}`);
    })
    .catch(error => {
      console.error('Bulk update failed:', error);
    });
}

// Example of integrating with existing page generation system
export function integrateWithPageGeneration() {
  console.log('=== Integration with Page Generation ===\n');

  const sitemapGenerator = new SitemapGenerator();

  // Simulate existing page data from your system
  const existingPageData = [
    {
      url: 'https://a1furniturepolish.com/services/furniture-polish-andheri',
      title: 'Furniture Polish Services in Andheri - A1 Furniture Polish',
      metaDescription: 'Professional furniture polishing services in Andheri. Expert wood polish, sofa repair. Book online for best rates in Andheri East & West.',
      content: 'Professional furniture polishing services...',
      canonicalUrl: 'https://a1furniturepolish.com/services/furniture-polish-andheri'
    }
  ];

  // Convert existing data to SEO pages
  const seoPages = existingPageData.map(pageData => 
    SEOPageModel.fromPageData(pageData)
  );

  // Generate sitemap
  const sitemap = sitemapGenerator.generateXMLSitemap(seoPages);
  console.log('Generated sitemap from existing page data:');
  console.log(sitemap);
  console.log('\n');

  // Generate structured data for local business
  seoPages.forEach(page => {
    const structuredData = sitemapGenerator.generateStructuredData(page);
    console.log(`Structured data for ${page.url}:`);
    console.log(JSON.stringify(structuredData, null, 2));
    console.log('\n');
  });
}

// Example of error handling and validation
export function demonstrateErrorHandling() {
  console.log('=== Error Handling Examples ===\n');

  const sitemapGenerator = new SitemapGenerator();

  // Test invalid sitemap validation
  const invalidSitemap = '<invalid>xml</invalid>';
  console.log(`Invalid sitemap validation: ${sitemapGenerator.validateSitemap(invalidSitemap)}`);

  // Test invalid structured data validation
  const invalidStructuredData = { name: 'Test' }; // Missing required fields
  console.log(`Invalid structured data validation: ${sitemapGenerator.validateStructuredData(invalidStructuredData)}`);

  // Test valid structured data validation
  const validStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish'
  };
  console.log(`Valid structured data validation: ${sitemapGenerator.validateStructuredData(validStructuredData)}`);
}

// Run examples if this file is executed directly
if (require.main === module) {
  demonstrateSitemapGenerator();
  integrateWithPageGeneration();
  demonstrateErrorHandling();
}