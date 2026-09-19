// Link Manager Integration Example
// This example demonstrates how to use the Link Manager with existing page data

import { LinkManager } from '../managers/LinkManager';
import { SEOPageModel } from '../models/SEOPageModel';
import { LinkManagerConfig } from '../types';

// Example configuration
const config: LinkManagerConfig = {
  minOutgoingLinks: 3,
  maxOutgoingLinks: 10,
  contextualRelevanceThreshold: 0.7,
  avoidCircularReferences: true
};

// Create Link Manager instance
const linkManager = new LinkManager(config);

// Example pages from the existing website
const examplePages = [
  new SEOPageModel({
    url: '/services/furniture-polishing-mumbai',
    title: 'Furniture Polishing in Mumbai',
    metaDescription: 'Professional furniture polishing services in Mumbai. Expert craftsmen, quality materials.',
    h1Tag: 'Furniture Polishing Mumbai',
    wordCount: 450,
    outgoingLinks: [
      {
        sourceUrl: '/services/furniture-polishing-mumbai',
        targetUrl: '/services/sofa-polishing-mumbai',
        anchorText: 'sofa polishing services',
        linkType: 'internal',
        isNoFollow: false,
        context: 'Related furniture service'
      }
    ]
  }),
  
  new SEOPageModel({
    url: '/services/sofa-polishing-mumbai',
    title: 'Sofa Polishing in Mumbai',
    metaDescription: 'Expert sofa polishing services in Mumbai. Restore your sofa to like-new condition.',
    h1Tag: 'Sofa Polishing Mumbai',
    wordCount: 380,
    outgoingLinks: []
  }),
  
  new SEOPageModel({
    url: '/services/table-polishing-mumbai',
    title: 'Table Polishing in Mumbai',
    metaDescription: 'Professional table polishing services in Mumbai. Dining tables, coffee tables, and more.',
    h1Tag: 'Table Polishing Mumbai',
    wordCount: 320,
    outgoingLinks: []
  }),
  
  new SEOPageModel({
    url: '/services/wardrobe-polishing-mumbai',
    title: 'Wardrobe Polishing in Mumbai',
    metaDescription: 'Expert wardrobe polishing services in Mumbai. Inside and outside polishing available.',
    h1Tag: 'Wardrobe Polishing Mumbai',
    wordCount: 410,
    outgoingLinks: []
  })
];

// Example usage functions
export async function demonstrateLinkManager() {
  console.log('=== Link Manager Demonstration ===\n');

  // 1. Analyze current link structure
  console.log('1. Analyzing current link structure:');
  examplePages.forEach(page => {
    const analysis = linkManager.analyzeLinks(page);
    console.log(`${page.url}:`);
    console.log(`  - Internal links: ${analysis.totalInternalLinks}`);
    console.log(`  - Outgoing links: ${analysis.totalOutgoingLinks}`);
    console.log(`  - Needs more links: ${analysis.totalOutgoingLinks < config.minOutgoingLinks ? 'Yes' : 'No'}`);
  });

  // 2. Identify orphan pages
  console.log('\n2. Identifying orphan pages:');
  const allInternalTargets = new Set<string>();
  examplePages.forEach(page => {
    page.internalLinks?.forEach(link => {
      if (link.linkType === 'internal') {
        allInternalTargets.add(link.targetUrl);
      }
    });
  });

  const orphanPages = examplePages
    .filter(page => !allInternalTargets.has(page.url))
    .map(page => page.url);
  
  console.log(`Found ${orphanPages.length} orphan pages:`, orphanPages);

  // 3. Generate missing outgoing links
  console.log('\n3. Generating missing outgoing links:');
  examplePages.forEach(page => {
    const currentCount = page.outgoingLinks?.length || 0;
    if (currentCount < config.minOutgoingLinks) {
      console.log(`\nGenerating links for ${page.url}:`);
      const newLinks = linkManager.generateOutgoingLinks(page, config.minOutgoingLinks);
      console.log(`  - Generated ${newLinks.length - currentCount} new links`);
      newLinks.slice(currentCount).forEach(link => {
        console.log(`    → ${link.targetUrl} (${link.anchorText})`);
      });
    }
  });

  // 4. Fix orphan pages
  console.log('\n4. Fixing orphan pages:');
  if (orphanPages.length > 0) {
    const createdLinks = linkManager.fixOrphanPages(orphanPages, examplePages);
    console.log(`Created ${createdLinks.length} links to fix orphan pages:`);
    createdLinks.forEach(link => {
      console.log(`  ${link.sourceUrl} → ${link.targetUrl} (${link.anchorText})`);
    });
  } else {
    console.log('No orphan pages to fix.');
  }

  // 5. Validate link hierarchy
  console.log('\n5. Validating link hierarchy:');
  const isValid = linkManager.validateLinkHierarchy(examplePages);
  console.log(`Link hierarchy is valid: ${isValid}`);
  
  if (!isValid) {
    const circularRefs = linkManager.detectCircularReferences(examplePages);
    console.log(`Circular references found: ${circularRefs.join(', ')}`);
  }

  // 6. Process bulk updates
  console.log('\n6. Processing bulk link updates:');
  const result = await linkManager.processLinkUpdates(examplePages);
  console.log(`Operation ID: ${result.operationId}`);
  console.log(`Successful pages: ${result.successfulPages.length}`);
  console.log(`Failed pages: ${result.failedPages.length}`);
  console.log(`Rollback available: ${result.rollbackAvailable}`);
  
  if (result.failedPages.length > 0) {
    console.log('Errors:');
    Object.entries(result.errors).forEach(([url, error]) => {
      console.log(`  ${url}: ${error}`);
    });
  }

  // 7. Final analysis
  console.log('\n7. Final link analysis after updates:');
  examplePages.forEach(page => {
    const analysis = linkManager.analyzeLinks(page);
    console.log(`${page.url}:`);
    console.log(`  - Internal links: ${analysis.totalInternalLinks}`);
    console.log(`  - Outgoing links: ${analysis.totalOutgoingLinks}`);
    console.log(`  - Meets minimum: ${analysis.totalOutgoingLinks >= config.minOutgoingLinks ? 'Yes' : 'No'}`);
  });

  console.log('\n=== Link Manager Demonstration Complete ===');
}

// Export for use in other files
export { linkManager, examplePages, config };