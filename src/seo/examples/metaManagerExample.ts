// Meta Manager Usage Example

import { MetaManager } from '../managers/MetaManager';
import { SEOPageModel } from '../models/SEOPageModel';
import { MetaManagerConfig } from '../types';

// Example configuration
const config: MetaManagerConfig = {
  metaDescriptionMinLength: 150,
  metaDescriptionMaxLength: 160,
  h1KeywordRequirement: true,
  socialMediaTagsRequired: true
};

// Create Meta Manager instance
const metaManager = new MetaManager(config);

// Example: Generate meta information for a furniture polishing page
async function generateMetaForFurniturePage() {
  console.log('=== Meta Manager Example ===\n');

  // Create a sample page
  const page = new SEOPageModel({
    url: '/sofa-polishing-bandra',
    title: 'Professional Sofa Polishing Services',
    wordCount: 450
  });

  console.log('Original page:', {
    url: page.url,
    title: page.title,
    h1Tag: page.h1Tag,
    metaDescription: page.metaDescription
  });

  // Define keywords for the page
  const keywords = ['sofa polishing', 'bandra', 'furniture polish', 'mumbai'];

  // Generate H1 tag
  const h1Tag = metaManager.generateH1Tag(page, keywords);
  console.log('\nGenerated H1 tag:', h1Tag);

  // Generate meta description
  const metaDescription = metaManager.generateMetaDescription(page, keywords);
  console.log('Generated meta description:', metaDescription);
  console.log('Meta description length:', metaDescription.length);

  // Generate Open Graph tags
  page.title = 'Professional Sofa Polishing in Bandra';
  page.metaDescription = metaDescription;
  const ogTags = metaManager.generateOpenGraphTags(page);
  console.log('\nOpen Graph tags:', ogTags);

  // Generate Twitter Card tags
  const twitterTags = metaManager.generateTwitterCardTags(page);
  console.log('\nTwitter Card tags:', twitterTags);

  // Generate canonical tag
  const canonicalTag = metaManager.generateCanonicalTag(page);
  console.log('\nCanonical tag:', canonicalTag);

  return {
    h1Tag,
    metaDescription,
    ogTags,
    twitterTags,
    canonicalTag
  };
}

// Example: Process multiple pages with bulk operations
async function bulkMetaProcessing() {
  console.log('\n=== Bulk Meta Processing Example ===\n');

  // Create multiple sample pages
  const pages = [
    new SEOPageModel({
      url: '/table-polishing-andheri',
      title: 'Table Polishing Services'
    }),
    new SEOPageModel({
      url: '/chair-repair-mumbai',
      title: 'Chair Repair Services'
    }),
    new SEOPageModel({
      url: '/wardrobe-polishing-goregaon',
      title: 'Wardrobe Polishing Services'
    })
  ];

  console.log('Processing', pages.length, 'pages...');

  // Process all pages
  const result = await metaManager.processMetaUpdates(pages);

  console.log('Bulk update result:', {
    operationId: result.operationId,
    successful: result.successfulPages.length,
    failed: result.failedPages.length,
    rollbackAvailable: result.rollbackAvailable
  });

  // Display updated pages
  pages.forEach((page, index) => {
    console.log(`\nPage ${index + 1}:`, {
      url: page.url,
      h1Tag: page.h1Tag,
      metaDescription: page.metaDescription,
      canonicalUrl: page.canonicalUrl
    });
  });

  return result;
}

// Example: Validate meta content uniqueness
async function validateMetaUniqueness() {
  console.log('\n=== Meta Uniqueness Validation Example ===\n');

  // Create pages with potential duplicate content
  const pages = [
    new SEOPageModel({
      url: '/page1',
      title: 'Furniture Polish Services in Mumbai',
      metaDescription: 'Professional furniture polishing services in Mumbai with expert results and competitive pricing.'
    }),
    new SEOPageModel({
      url: '/page2',
      title: 'Quality Furniture Polishing in Bandra',
      metaDescription: 'Expert furniture polishing services in Bandra with quality results and quick turnaround times.'
    }),
    new SEOPageModel({
      url: '/page3',
      title: 'Furniture Polish Services in Mumbai', // Duplicate title
      metaDescription: 'Premium furniture polishing services in Andheri with professional results and best rates.'
    })
  ];

  const isUnique = metaManager.validateMetaUniqueness(pages);
  console.log('Meta content is unique:', isUnique);

  if (!isUnique) {
    console.log('Found duplicate meta content. Consider updating titles and descriptions.');
  }

  // Validate H1 uniqueness
  pages.forEach(page => {
    const keywords = ['furniture polish', 'mumbai'];
    page.h1Tag = metaManager.generateH1Tag(page, keywords);
  });

  const h1Unique = metaManager.validateH1Uniqueness(pages);
  console.log('H1 tags are unique:', h1Unique);

  return { isUnique, h1Unique };
}

// Example: Handle duplicate content with canonical tags
async function handleDuplicateContent() {
  console.log('\n=== Duplicate Content Handling Example ===\n');

  // Main page
  const mainPage = new SEOPageModel({
    url: '/furniture-polishing-mumbai',
    title: 'Furniture Polishing in Mumbai',
    wordCount: 800
  });

  // Duplicate pages with less content
  const duplicatePages = [
    new SEOPageModel({
      url: '/furniture-polishing-mumbai?ref=google',
      title: 'Furniture Polishing in Mumbai',
      wordCount: 600
    }),
    new SEOPageModel({
      url: '/mumbai-furniture-polishing',
      title: 'Furniture Polishing in Mumbai',
      wordCount: 700
    })
  ];

  console.log('Main page:', mainPage.url, '(', mainPage.wordCount, 'words)');
  console.log('Duplicate pages:');
  duplicatePages.forEach(page => {
    console.log(' -', page.url, '(', page.wordCount, 'words)');
  });

  // Generate canonical tag pointing to the preferred version
  const canonicalTag = metaManager.generateCanonicalTag(mainPage, duplicatePages);
  console.log('\nCanonical tag should point to:', canonicalTag);

  return canonicalTag;
}

// Run examples
async function runExamples() {
  try {
    await generateMetaForFurniturePage();
    await bulkMetaProcessing();
    await validateMetaUniqueness();
    await handleDuplicateContent();
    
    console.log('\n=== All Meta Manager examples completed successfully! ===');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Export for use in other files
export {
  generateMetaForFurniturePage,
  bulkMetaProcessing,
  validateMetaUniqueness,
  handleDuplicateContent,
  runExamples
};

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples();
}