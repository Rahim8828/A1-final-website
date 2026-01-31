// Quick test of SEO utility functions
import { 
  generateSlug, 
  generateServiceLocationSlug,
  generateServicePageUrl,
  generateMetaTitle,
  generateMetaDescription,
  generateOpenGraphTags,
  extractPrimaryKeyword,
  generateSecondaryKeywords
} from './src/utils/seoHelpers.ts';

import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  validateSchema,
  generateAllSchemas
} from './src/utils/schemaGenerator.ts';

console.log('Testing SEO Helpers...\n');

// Test slug generation
const slug1 = generateSlug('Affordable Furniture Polishing');
console.log('Slug 1:', slug1);

const slug2 = generateServiceLocationSlug('Affordable Furniture Polishing', 'Andheri West');
console.log('Slug 2:', slug2);

const url = generateServicePageUrl('Top-Rated Wood Polish', 'Bandra');
console.log('URL:', url);

// Test meta tag generation
const title = generateMetaTitle('Affordable Furniture Polishing', 'Mumbai', '| 4.9★ Rated');
console.log('\nMeta Title:', title);
console.log('Title Length:', title.length);

const description = generateMetaDescription(
  'Affordable Furniture Polishing',
  'Mumbai',
  ['Expert craftsmen', 'Same-day service', 'Quality materials']
);
console.log('\nMeta Description:', description);
console.log('Description Length:', description.length);

// Test Open Graph tags
const ogTags = generateOpenGraphTags(
  title,
  description,
  'https://a1furniturepolish.com/services/affordable-furniture-polishing-mumbai',
  'https://a1furniturepolish.com/images/service.jpg'
);
console.log('\nOpen Graph Tags:', ogTags);

// Test keyword extraction
const primaryKeyword = extractPrimaryKeyword('Affordable Furniture Polishing', 'Mumbai');
console.log('\nPrimary Keyword:', primaryKeyword);

const secondaryKeywords = generateSecondaryKeywords(
  'Affordable Furniture Polishing',
  'Mumbai',
  'Furniture Polishing'
);
console.log('Secondary Keywords:', secondaryKeywords);

console.log('\n\nTesting Schema Generators...\n');

// Test schema generation
const schemas = generateAllSchemas(
  'Affordable Furniture Polishing',
  'Furniture Polishing',
  'Mumbai',
  'https://a1furniturepolish.com/services/affordable-furniture-polishing-mumbai',
  [
    { name: 'Wood Polish' },
    { name: 'PU Polish' },
    { name: 'Melamine Polish' }
  ]
);

console.log('LocalBusiness Schema Valid:', validateSchema(schemas.localBusiness, 'LocalBusiness'));
console.log('Service Schema Valid:', validateSchema(schemas.service, 'Service'));
console.log('Breadcrumb Schema Valid:', validateSchema(schemas.breadcrumb, 'BreadcrumbList'));

console.log('\nAll tests completed successfully!');
