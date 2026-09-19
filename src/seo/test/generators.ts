// Property-based test generators for SEO system

import * as fc from 'fast-check';
import { SEOPage, Link, OpenGraphData, TwitterCardData, SchemaMarkup } from '../types';

// URL generator
export const urlArbitrary = fc.webUrl();

// Title generator (30-60 characters for optimal SEO)
export const titleArbitrary = fc.string({ minLength: 30, maxLength: 60 });

// Meta description generator (150-160 characters for optimal SEO)
export const metaDescriptionArbitrary = fc.string({ minLength: 150, maxLength: 160 });

// H1 tag generator
export const h1TagArbitrary = fc.string({ minLength: 10, maxLength: 70 });

// Word count generator (minimum 300 for service pages)
export const wordCountArbitrary = fc.integer({ min: 300, max: 2000 });

// Link generator
export const linkArbitrary: fc.Arbitrary<Link> = fc.record({
  sourceUrl: urlArbitrary,
  targetUrl: urlArbitrary,
  anchorText: fc.string({ minLength: 2, maxLength: 50 }),
  linkType: fc.constantFrom('internal', 'external'),
  isNoFollow: fc.boolean(),
  context: fc.string({ minLength: 10, maxLength: 200 })
});

// Array of internal links (minimum 3 for SEO requirements)
export const internalLinksArbitrary = fc.array(
  linkArbitrary.map(link => ({ ...link, linkType: 'internal' as const })),
  { minLength: 3, maxLength: 10 }
);

// Array of outgoing links
export const outgoingLinksArbitrary = fc.array(linkArbitrary, { minLength: 0, maxLength: 5 });

// Open Graph data generator
export const openGraphDataArbitrary: fc.Arbitrary<OpenGraphData> = fc.record({
  title: titleArbitrary,
  description: metaDescriptionArbitrary,
  image: urlArbitrary,
  url: urlArbitrary,
  type: fc.constantFrom('website', 'article', 'product'),
  siteName: fc.constant('A1 Furniture Polish')
});

// Twitter Card data generator
export const twitterCardDataArbitrary: fc.Arbitrary<TwitterCardData> = fc.record({
  card: fc.constantFrom('summary', 'summary_large_image', 'app', 'player'),
  title: titleArbitrary,
  description: metaDescriptionArbitrary,
  image: urlArbitrary,
  site: fc.option(fc.string({ minLength: 1, maxLength: 15 })),
  creator: fc.option(fc.string({ minLength: 1, maxLength: 15 }))
});

// Schema markup generator
export const schemaMarkupArbitrary: fc.Arbitrary<SchemaMarkup> = fc.record({
  '@context': fc.constant('https://schema.org'),
  '@type': fc.constantFrom('WebPage', 'LocalBusiness', 'Service', 'Article'),
  name: titleArbitrary,
  description: metaDescriptionArbitrary,
  url: urlArbitrary
});

// Date generator (recent dates)
export const recentDateArbitrary = fc.integer({ 
  min: new Date('2023-01-01').getTime(), 
  max: new Date().getTime() 
}).map(timestamp => new Date(timestamp));

// SEO score generator (0-100)
export const seoScoreArbitrary = fc.integer({ min: 0, max: 100 });

// Complete SEO Page generator
export const seoPageArbitrary: fc.Arbitrary<SEOPage> = fc.record({
  url: urlArbitrary,
  title: titleArbitrary,
  metaDescription: metaDescriptionArbitrary,
  h1Tag: h1TagArbitrary,
  wordCount: wordCountArbitrary,
  internalLinks: internalLinksArbitrary,
  outgoingLinks: outgoingLinksArbitrary,
  canonicalUrl: fc.option(urlArbitrary),
  openGraphTags: openGraphDataArbitrary,
  twitterCardTags: twitterCardDataArbitrary,
  structuredData: schemaMarkupArbitrary,
  lastModified: recentDateArbitrary,
  seoScore: seoScoreArbitrary
});

// Array of SEO pages
export const seoPageArrayArbitrary = fc.array(seoPageArbitrary, { minLength: 1, maxLength: 20 });

// Service page specific generator (ensures service page requirements)
export const servicePageArbitrary: fc.Arbitrary<SEOPage> = seoPageArbitrary.map(page => ({
  ...page,
  wordCount: Math.max(page.wordCount, 300), // Ensure minimum word count
  internalLinks: page.internalLinks.length >= 3 ? page.internalLinks : [
    ...page.internalLinks,
    ...Array(3 - page.internalLinks.length).fill(null).map(() => ({
      sourceUrl: page.url,
      targetUrl: '/related-service',
      anchorText: 'Related Service',
      linkType: 'internal' as const,
      isNoFollow: false,
      context: 'Related service context'
    }))
  ]
}));

// Keywords generator
export const keywordsArbitrary = fc.array(
  fc.string({ minLength: 3, maxLength: 20 }),
  { minLength: 1, maxLength: 10 }
);

// Location generator
export const locationArbitrary = fc.constantFrom(
  'Mumbai', 'Andheri', 'Bandra', 'Goregaon', 'Powai', 'Santacruz', 'Jogeshwari'
);

// Service type generator
export const serviceTypeArbitrary = fc.constantFrom(
  'Furniture Polish', 'Sofa Repair', 'Chair Repair', 'Table Polish', 'Wardrobe Polish'
);

// Content generator with minimum word count
export const contentArbitrary = fc.string({ minLength: 300 * 5, maxLength: 2000 * 5 }); // Approximate 5 chars per word

// Keyword density generator (1-3% range)
export const keywordDensityArbitrary = fc.float({ min: Math.fround(0.01), max: Math.fround(0.03) });

// Performance metrics generator
export const performanceMetricsArbitrary = fc.record({
  loadTime: fc.float({ min: Math.fround(0.5), max: Math.fround(5.0) }),
  firstContentfulPaint: fc.float({ min: Math.fround(0.3), max: Math.fround(3.0) }),
  largestContentfulPaint: fc.float({ min: Math.fround(1.0), max: Math.fround(4.0) }),
  firstInputDelay: fc.float({ min: Math.fround(0.01), max: Math.fround(0.3) }),
  cumulativeLayoutShift: fc.float({ min: Math.fround(0.0), max: Math.fround(0.25) }),
  totalBlockingTime: fc.float({ min: Math.fround(0.0), max: Math.fround(600.0) })
});

// Heading structure generator
export const headingStructureArbitrary = fc.record({
  h1: fc.array(fc.string({ minLength: 10, maxLength: 70 }), { minLength: 1, maxLength: 1 }), // Only one H1
  h2: fc.array(fc.string({ minLength: 5, maxLength: 60 }), { minLength: 0, maxLength: 10 }),
  h3: fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 0, maxLength: 15 }),
  h4: fc.array(fc.string({ minLength: 5, maxLength: 40 }), { minLength: 0, maxLength: 10 }),
  h5: fc.array(fc.string({ minLength: 5, maxLength: 30 }), { minLength: 0, maxLength: 5 }),
  h6: fc.array(fc.string({ minLength: 5, maxLength: 25 }), { minLength: 0, maxLength: 3 })
});

// Orphan page generator (pages with no incoming links)
export const orphanPageArbitrary = seoPageArbitrary.map(page => ({
  ...page,
  internalLinks: [] // No incoming links makes it an orphan
}));

// Page with circular reference generator
export const circularReferencePageArbitrary = fc.tuple(seoPageArbitrary, seoPageArbitrary)
  .map(([page1, page2]) => {
    // Create circular reference
    const link1to2: Link = {
      sourceUrl: page1.url,
      targetUrl: page2.url,
      anchorText: 'Link to page 2',
      linkType: 'internal',
      isNoFollow: false,
      context: 'Context for link'
    };
    
    const link2to1: Link = {
      sourceUrl: page2.url,
      targetUrl: page1.url,
      anchorText: 'Link to page 1',
      linkType: 'internal',
      isNoFollow: false,
      context: 'Context for link'
    };
    
    return [
      { ...page1, outgoingLinks: [link1to2] },
      { ...page2, outgoingLinks: [link2to1] }
    ];
  });

// Duplicate content generator
export const duplicateContentArbitrary = fc.tuple(seoPageArbitrary, seoPageArbitrary)
  .map(([page1, page2]) => [
    page1,
    { ...page2, title: page1.title, metaDescription: page1.metaDescription }
  ]);

// Valid SEO page generator (meets all requirements)
export const validSEOPageArbitrary: fc.Arbitrary<SEOPage> = fc.record({
  url: urlArbitrary,
  title: fc.string({ minLength: 30, maxLength: 60 }),
  metaDescription: fc.string({ minLength: 150, maxLength: 160 }),
  h1Tag: fc.string({ minLength: 10, maxLength: 70 }),
  wordCount: fc.integer({ min: 300, max: 2000 }),
  internalLinks: fc.array(
    linkArbitrary.map(link => ({ ...link, linkType: 'internal' as const })),
    { minLength: 3, maxLength: 10 }
  ),
  outgoingLinks: outgoingLinksArbitrary,
  canonicalUrl: fc.option(urlArbitrary),
  openGraphTags: openGraphDataArbitrary,
  twitterCardTags: twitterCardDataArbitrary,
  structuredData: schemaMarkupArbitrary,
  lastModified: recentDateArbitrary,
  seoScore: fc.integer({ min: 80, max: 100 }) // High SEO score for valid pages
});