// Sitemap Generator Tests

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { SitemapGenerator } from './SitemapGenerator';
import { SEOPage, SitemapGeneratorConfig } from '../types';
import { seoPageArbitrary, urlArbitrary } from '../test/generators';

describe('SitemapGenerator', () => {
  let sitemapGenerator: SitemapGenerator;
  let config: SitemapGeneratorConfig;

  beforeEach(() => {
    config = {
      includeLastModified: true,
      defaultPriority: 0.8,
      defaultChangeFreq: 'weekly',
      robotsTxtEnabled: true,
      structuredDataEnabled: true
    };
    sitemapGenerator = new SitemapGenerator(config);
  });

  describe('XML Sitemap Generation', () => {
    it('should generate valid XML sitemap for single page', () => {
      const page: SEOPage = {
        url: 'https://a1furniturepolish.com/test',
        title: 'Test Page',
        metaDescription: 'Test description',
        h1Tag: 'Test H1',
        wordCount: 300,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: '',
          url: 'https://a1furniturepolish.com/test',
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date('2023-01-01'),
        seoScore: 85
      };

      const sitemap = sitemapGenerator.generateXMLSitemap([page]);

      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(sitemap).toContain('<loc>https://a1furniturepolish.com/test</loc>');
      expect(sitemap).toContain('<lastmod>2023-01-01T00:00:00.000Z</lastmod>');
      expect(sitemap).toContain('<changefreq>weekly</changefreq>');
      expect(sitemap).toContain('<priority>0.8</priority>');
      expect(sitemap).toContain('</urlset>');
    });

    it('should handle empty pages array', () => {
      const sitemap = sitemapGenerator.generateXMLSitemap([]);
      
      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(sitemap).toContain('</urlset>');
      expect(sitemap).not.toContain('<url>');
    });

    it('should prioritize homepage correctly', () => {
      const pages: SEOPage[] = [
        {
          url: 'https://a1furniturepolish.com/',
          title: 'Homepage',
          metaDescription: 'Homepage description',
          h1Tag: 'Homepage H1',
          wordCount: 500,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Homepage',
            description: 'Homepage',
            image: '',
            url: 'https://a1furniturepolish.com/',
            type: 'website',
            siteName: 'A1 Furniture Polish'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Homepage',
            description: 'Homepage',
            image: ''
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 95
        },
        {
          url: 'https://a1furniturepolish.com/services/test',
          title: 'Service Page',
          metaDescription: 'Service description',
          h1Tag: 'Service H1',
          wordCount: 400,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Service',
            description: 'Service',
            image: '',
            url: 'https://a1furniturepolish.com/services/test',
            type: 'website',
            siteName: 'A1 Furniture Polish'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Service',
            description: 'Service',
            image: ''
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 88
        }
      ];

      const sitemap = sitemapGenerator.generateXMLSitemap(pages);
      const homepageIndex = sitemap.indexOf('https://a1furniturepolish.com/');
      const serviceIndex = sitemap.indexOf('https://a1furniturepolish.com/services/test');
      
      // Homepage should appear first (higher priority)
      expect(homepageIndex).toBeLessThan(serviceIndex);
      expect(sitemap).toContain('<priority>1.0</priority>');
      expect(sitemap).toContain('<priority>0.9</priority>');
    });
  });

  describe('Robots.txt Generation', () => {
    it('should generate basic robots.txt', () => {
      const sitemapUrl = 'https://a1furniturepolish.com/sitemap.xml';
      const robotsTxt = sitemapGenerator.generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain('User-agent: *');
      expect(robotsTxt).toContain('Allow: /');
      expect(robotsTxt).toContain(`Sitemap: ${sitemapUrl}`);
      expect(robotsTxt).toContain('Allow: /favicon.ico');
    });

    it('should handle disallowed paths', () => {
      const sitemapUrl = 'https://a1furniturepolish.com/sitemap.xml';
      const disallowedPaths = ['/admin/', '/private/'];
      const robotsTxt = sitemapGenerator.generateRobotsTxt(sitemapUrl, disallowedPaths);

      expect(robotsTxt).toContain('Disallow: /admin/');
      expect(robotsTxt).toContain('Disallow: /private/');
      expect(robotsTxt).not.toContain('Allow: /');
      expect(robotsTxt).not.toContain('Allow: /favicon.ico'); // Favicon should not be allowed when paths are disallowed
    });
  });

  describe('Structured Data Generation', () => {
    it('should generate local business structured data', () => {
      const page: SEOPage = {
        url: 'https://a1furniturepolish.com/',
        title: 'A1 Furniture Polish',
        metaDescription: 'Professional furniture polishing services',
        h1Tag: 'Furniture Polishing Services',
        wordCount: 500,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'A1 Furniture Polish',
          description: 'Professional furniture polishing services',
          image: '',
          url: 'https://a1furniturepolish.com/',
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'A1 Furniture Polish',
          description: 'Professional furniture polishing services',
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 95
      };

      const structuredData = sitemapGenerator.generateStructuredData(page);

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('WebPage');
      expect(structuredData.mainEntity['@type']).toBe('LocalBusiness');
      expect(structuredData.mainEntity.name).toBe('A1 Furniture Polish');
      expect(structuredData.mainEntity.address).toBeDefined();
      expect(structuredData.mainEntity.geo).toBeDefined();
    });

    it('should generate service structured data for service pages', () => {
      const page: SEOPage = {
        url: 'https://a1furniturepolish.com/services/furniture-polish',
        title: 'Furniture Polishing Service',
        metaDescription: 'Professional furniture polishing in Mumbai',
        h1Tag: 'Furniture Polishing',
        wordCount: 400,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Furniture Polishing Service',
          description: 'Professional furniture polishing in Mumbai',
          image: '',
          url: 'https://a1furniturepolish.com/services/furniture-polish',
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Furniture Polishing Service',
          description: 'Professional furniture polishing in Mumbai',
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 88
      };

      const structuredData = sitemapGenerator.generateStructuredData(page);

      expect(structuredData['@type']).toBe('Service');
      expect(structuredData.serviceType).toBe('Furniture Polishing');
      expect(structuredData.areaServed).toBeDefined();
      expect(structuredData.offers).toBeDefined();
    });

    it('should return empty object when structured data is disabled', () => {
      const disabledConfig = { ...config, structuredDataEnabled: false };
      const generator = new SitemapGenerator(disabledConfig);
      
      const page: SEOPage = {
        url: 'https://a1furniturepolish.com/test',
        title: 'Test',
        metaDescription: 'Test',
        h1Tag: 'Test',
        wordCount: 300,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: '',
          url: 'https://a1furniturepolish.com/test',
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 85
      };

      const structuredData = generator.generateStructuredData(page);
      expect(structuredData).toEqual({});
    });
  });

  describe('Sitemap Validation', () => {
    it('should validate correct XML sitemap', () => {
      const validSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2023-01-01T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

      expect(sitemapGenerator.validateSitemap(validSitemap)).toBe(true);
    });

    it('should reject invalid XML sitemap', () => {
      const invalidSitemap = '<invalid>xml</invalid>';
      expect(sitemapGenerator.validateSitemap(invalidSitemap)).toBe(false);
    });

    it('should reject sitemap with mismatched URL tags', () => {
      const invalidSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  <!-- Missing closing url tag -->
</urlset>`;

      expect(sitemapGenerator.validateSitemap(invalidSitemap)).toBe(false);
    });
  });

  describe('Structured Data Validation', () => {
    it('should validate correct structured data', () => {
      const validData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Test Business'
      };

      expect(sitemapGenerator.validateStructuredData(validData)).toBe(true);
    });

    it('should reject invalid structured data', () => {
      expect(sitemapGenerator.validateStructuredData(null as any)).toBe(false);
      expect(sitemapGenerator.validateStructuredData({})).toBe(false);
      expect(sitemapGenerator.validateStructuredData({ name: 'Test' })).toBe(false);
    });
  });

  describe('Timestamp Updates', () => {
    it('should update timestamps for existing pages', () => {
      const page: SEOPage = {
        url: 'https://a1furniturepolish.com/test',
        title: 'Test Page',
        metaDescription: 'Test description',
        h1Tag: 'Test H1',
        wordCount: 300,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: '',
          url: 'https://a1furniturepolish.com/test',
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date('2023-01-01'),
        seoScore: 85
      };

      // Generate initial sitemap
      sitemapGenerator.generateXMLSitemap([page]);

      // Update page timestamp
      const updatedPage = { ...page, lastModified: new Date('2023-06-01') };
      sitemapGenerator.updateSitemapTimestamps([updatedPage]);

      const entries = sitemapGenerator.getSitemapEntries();
      const entry = entries.find(e => e.url === page.url);
      
      expect(entry?.lastModified).toEqual(new Date('2023-06-01'));
    });
  });

  describe('Bulk Operations', () => {
    it('should process bulk sitemap updates successfully', async () => {
      const pages: SEOPage[] = [
        {
          url: 'https://a1furniturepolish.com/page1',
          title: 'Page 1',
          metaDescription: 'Description 1',
          h1Tag: 'H1 1',
          wordCount: 300,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Page 1',
            description: 'Description 1',
            image: '',
            url: 'https://a1furniturepolish.com/page1',
            type: 'website',
            siteName: 'A1 Furniture Polish'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Page 1',
            description: 'Description 1',
            image: ''
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 85
        },
        {
          url: 'https://a1furniturepolish.com/page2',
          title: 'Page 2',
          metaDescription: 'Description 2',
          h1Tag: 'H1 2',
          wordCount: 400,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Page 2',
            description: 'Description 2',
            image: '',
            url: 'https://a1furniturepolish.com/page2',
            type: 'website',
            siteName: 'A1 Furniture Polish'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Page 2',
            description: 'Description 2',
            image: ''
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 88
        }
      ];

      const result = await sitemapGenerator.processSitemapUpdates(pages);

      expect(result.successfulPages).toHaveLength(2);
      expect(result.failedPages).toHaveLength(0);
      expect(result.rollbackAvailable).toBe(true);
    });
  });

  // Property-based tests
  describe('Property-Based Tests', () => {
    /**
     * **Feature: comprehensive-seo-fixes, Property 21: Complete sitemap generation**
     * For any XML sitemap created by the Sitemap_Generator, all indexable pages should be included with proper priority and frequency
     * **Validates: Requirements 5.1**
     */
    it('Property 21: Complete sitemap generation', () => {
      fc.assert(fc.property(
        fc.array(seoPageArbitrary, { minLength: 1, maxLength: 10 }),
        (pages) => {
          const sitemap = sitemapGenerator.generateXMLSitemap(pages);
          
          // All pages should be included in sitemap (with proper XML escaping)
          pages.forEach(page => {
            const escapedUrl = page.url
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
            expect(sitemap).toContain(`<loc>${escapedUrl}</loc>`);
          });
          
          // Sitemap should be valid XML
          expect(sitemapGenerator.validateSitemap(sitemap)).toBe(true);
          
          // Should contain proper priority and frequency for each page
          pages.forEach(page => {
            const escapedUrl = page.url
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
            const urlIndex = sitemap.indexOf(`<loc>${escapedUrl}</loc>`);
            if (urlIndex !== -1) {
              const nextUrlIndex = sitemap.indexOf('<url>', urlIndex + 1);
              const urlSection = nextUrlIndex === -1 
                ? sitemap.substring(urlIndex) 
                : sitemap.substring(urlIndex, nextUrlIndex);
              
              expect(urlSection).toMatch(/<priority>\d+\.\d+<\/priority>/);
              expect(urlSection).toMatch(/<changefreq>(always|hourly|daily|weekly|monthly|yearly|never)<\/changefreq>/);
            }
          });
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 22: Automatic sitemap timestamp updates**
     * For any page update processed by the system, sitemap timestamps should be automatically updated
     * **Validates: Requirements 5.2**
     */
    it('Property 22: Automatic sitemap timestamp updates', () => {
      fc.assert(fc.property(
        seoPageArbitrary,
        fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }),
        (page, newDate) => {
          // Generate initial sitemap
          sitemapGenerator.generateXMLSitemap([page]);
          
          // Update page timestamp
          const updatedPage = { ...page, lastModified: newDate };
          sitemapGenerator.updateSitemapTimestamps([updatedPage]);
          
          // Check that timestamp was updated
          const entries = sitemapGenerator.getSitemapEntries();
          const entry = entries.find(e => e.url === page.url);
          
          expect(entry?.lastModified).toEqual(newDate);
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 23: Automatic new page inclusion**
     * For any new page identified by the Sitemap_Generator, it should be automatically added to the sitemap
     * **Validates: Requirements 5.3**
     */
    it('Property 23: Automatic new page inclusion', () => {
      fc.assert(fc.property(
        fc.array(seoPageArbitrary, { minLength: 1, maxLength: 5 }),
        fc.array(seoPageArbitrary, { minLength: 1, maxLength: 5 }),
        (initialPages, newPages) => {
          // Ensure new pages have different URLs
          const initialUrls = new Set(initialPages.map(p => p.url));
          const uniqueNewPages = newPages.filter(p => !initialUrls.has(p.url));
          
          if (uniqueNewPages.length === 0) return; // Skip if no unique new pages
          
          // Generate initial sitemap
          sitemapGenerator.generateXMLSitemap(initialPages);
          const initialEntries = sitemapGenerator.getSitemapEntries();
          
          // Add new pages
          sitemapGenerator.addNewPagesToSitemap(uniqueNewPages);
          const updatedEntries = sitemapGenerator.getSitemapEntries();
          
          // Check that new pages were added
          expect(updatedEntries.length).toBe(initialEntries.length + uniqueNewPages.length);
          
          uniqueNewPages.forEach(page => {
            const entry = updatedEntries.find(e => e.url === page.url);
            expect(entry).toBeDefined();
            expect(entry?.url).toBe(page.url);
          });
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 24: Proper robots.txt configuration**
     * For any robots.txt implementation, it should properly direct crawlers to important content while blocking unnecessary pages
     * **Validates: Requirements 5.4**
     */
    it('Property 24: Proper robots.txt configuration', () => {
      fc.assert(fc.property(
        urlArbitrary,
        fc.option(fc.array(fc.string().map(s => `/${s}/`), { minLength: 0, maxLength: 5 })),
        (sitemapUrl, disallowedPaths) => {
          const robotsTxt = sitemapGenerator.generateRobotsTxt(sitemapUrl, disallowedPaths || undefined);
          
          // Should contain user agent directive
          expect(robotsTxt).toContain('User-agent: *');
          
          // Should contain sitemap reference
          expect(robotsTxt).toContain(`Sitemap: ${sitemapUrl}`);
          
          // Should handle disallowed paths correctly
          if (disallowedPaths && disallowedPaths.length > 0) {
            disallowedPaths.forEach(path => {
              expect(robotsTxt).toContain(`Disallow: ${path}`);
            });
          } else {
            expect(robotsTxt).toContain('Allow: /');
          }
          
          // Should allow favicon files only if no disallowed paths
          if (!disallowedPaths || disallowedPaths.length === 0) {
            expect(robotsTxt).toContain('Allow: /favicon.ico');
          }
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 25: Structured data implementation**
     * For any page with generated structured data, appropriate schema markup for local business and services should be implemented
     * **Validates: Requirements 5.5**
     */
    it('Property 25: Structured data implementation', () => {
      fc.assert(fc.property(
        seoPageArbitrary,
        (page) => {
          const structuredData = sitemapGenerator.generateStructuredData(page);
          
          // Should be valid structured data
          expect(sitemapGenerator.validateStructuredData(structuredData)).toBe(true);
          
          // Should contain required schema.org context
          expect(structuredData['@context']).toBe('https://schema.org');
          
          // Should have appropriate type
          expect(['WebPage', 'Service']).toContain(structuredData['@type']);
          
          // If it's a service page, should have service-specific data
          if (page.url.includes('/services/') || page.url.includes('polish')) {
            expect(structuredData['@type']).toBe('Service');
            expect(structuredData.serviceType).toBeDefined();
            expect(structuredData.areaServed).toBeDefined();
          } else {
            // Should contain local business data in mainEntity
            expect(structuredData.mainEntity).toBeDefined();
            expect(structuredData.mainEntity['@type']).toBe('LocalBusiness');
          }
        }
      ), { numRuns: 100 });
    });
  });
});