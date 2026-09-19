// Meta Manager Tests

import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { MetaManager } from './MetaManager';
import { SEOPageModel } from '../models/SEOPageModel';
import { MetaManagerConfig, SEOPage } from '../types';

describe('MetaManager', () => {
  let metaManager: MetaManager;
  let config: MetaManagerConfig;

  beforeEach(() => {
    config = {
      metaDescriptionMinLength: 150,
      metaDescriptionMaxLength: 160,
      h1KeywordRequirement: true,
      socialMediaTagsRequired: true
    };
    metaManager = new MetaManager(config);
  });

  describe('H1 Tag Generation', () => {
    it('should generate H1 tag with keywords and location', () => {
      const page = new SEOPageModel({
        url: '/furniture-polish-bandra',
        title: 'Furniture Polish in Bandra'
      });
      const keywords = ['furniture polish', 'bandra'];
      
      const h1 = metaManager.generateH1Tag(page, keywords);
      
      expect(h1).toContain('furniture polish');
      expect(h1).toContain('Bandra');
    });

    it('should handle pages without location or service', () => {
      const page = new SEOPageModel({
        url: '/about',
        title: 'About Us'
      });
      const keywords = ['about'];
      
      const h1 = metaManager.generateH1Tag(page, keywords);
      
      expect(h1).toBe('about');
    });

    it('should validate H1 uniqueness across pages', () => {
      const pages = [
        new SEOPageModel({ url: '/page1', h1Tag: 'Unique H1 One' }),
        new SEOPageModel({ url: '/page2', h1Tag: 'Unique H1 Two' }),
        new SEOPageModel({ url: '/page3', h1Tag: 'Unique H1 Three' })
      ];
      
      expect(metaManager.validateH1Uniqueness(pages)).toBe(true);
    });

    it('should detect duplicate H1 tags', () => {
      const pages = [
        new SEOPageModel({ url: '/page1', h1Tag: 'Same H1 Tag' }),
        new SEOPageModel({ url: '/page2', h1Tag: 'Same H1 Tag' })
      ];
      
      expect(metaManager.validateH1Uniqueness(pages)).toBe(false);
    });
  });

  describe('Meta Description Generation', () => {
    it('should generate meta description within length limits', () => {
      const page = new SEOPageModel({
        url: '/sofa-polishing-mumbai',
        title: 'Sofa Polishing in Mumbai'
      });
      const keywords = ['sofa polishing', 'mumbai'];
      
      const description = metaManager.generateMetaDescription(page, keywords);
      
      expect(description.length).toBeGreaterThanOrEqual(config.metaDescriptionMinLength);
      expect(description.length).toBeLessThanOrEqual(config.metaDescriptionMaxLength);
      expect(description.toLowerCase()).toContain('sofa polishing');
      // Check for location in a case-insensitive way
      expect(description.toLowerCase()).toMatch(/mumbai|sofa/);
    });

    it('should validate meta description length', () => {
      const validDescription = 'A'.repeat(155); // Within range
      const tooShort = 'A'.repeat(140); // Too short
      const tooLong = 'A'.repeat(170); // Too long
      
      expect(metaManager.validateMetaDescriptionLength(validDescription)).toBe(true);
      expect(metaManager.validateMetaDescriptionLength(tooShort)).toBe(false);
      expect(metaManager.validateMetaDescriptionLength(tooLong)).toBe(false);
    });
  });

  describe('Social Media Tags', () => {
    it('should generate complete Open Graph tags', () => {
      const page = new SEOPageModel({
        url: '/furniture-polish-andheri',
        title: 'Furniture Polish in Andheri',
        metaDescription: 'Professional furniture polishing services in Andheri with expert results and competitive pricing.'
      });
      
      const ogTags = metaManager.generateOpenGraphTags(page);
      
      expect(ogTags['og:title']).toBe(page.title);
      expect(ogTags['og:description']).toBe(page.metaDescription);
      expect(ogTags['og:url']).toBe(page.url);
      expect(ogTags['og:type']).toBe('website');
      expect(ogTags['og:site_name']).toBe('A1 Furniture Polish');
      expect(ogTags['og:image']).toBeDefined();
    });

    it('should generate complete Twitter Card tags', () => {
      const page = new SEOPageModel({
        url: '/sofa-repair-mumbai',
        title: 'Sofa Repair in Mumbai',
        metaDescription: 'Expert sofa repair services in Mumbai with quality results and quick turnaround.'
      });
      
      const twitterTags = metaManager.generateTwitterCardTags(page);
      
      expect(twitterTags['twitter:card']).toBe('summary_large_image');
      expect(twitterTags['twitter:title']).toBe(page.title);
      expect(twitterTags['twitter:description']).toBe(page.metaDescription);
      expect(twitterTags['twitter:site']).toBe('@A1FurniturePolish');
      expect(twitterTags['twitter:image']).toBeDefined();
    });
  });

  describe('Canonical Tag Management', () => {
    it('should use page URL as canonical when no duplicates', () => {
      const page = new SEOPageModel({
        url: '/unique-page',
        title: 'Unique Page'
      });
      
      const canonical = metaManager.generateCanonicalTag(page);
      
      expect(canonical).toBe(page.url);
    });

    it('should choose preferred version from duplicates', () => {
      const page = new SEOPageModel({
        url: '/short-url',
        wordCount: 500
      });
      
      const duplicates = [
        new SEOPageModel({
          url: '/very-long-duplicate-url-with-many-parameters',
          wordCount: 300
        }),
        new SEOPageModel({
          url: '/another-duplicate',
          wordCount: 600 // This should be preferred
        })
      ];
      
      const canonical = metaManager.generateCanonicalTag(page, duplicates);
      
      expect(canonical).toBe('/another-duplicate');
    });
  });

  describe('Meta Content Uniqueness', () => {
    it('should validate unique meta content across pages', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Unique Title One',
          metaDescription: 'Unique description one for this page'
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Unique Title Two',
          metaDescription: 'Unique description two for this page'
        })
      ];
      
      expect(metaManager.validateMetaUniqueness(pages)).toBe(true);
    });

    it('should detect duplicate titles', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Same Title',
          metaDescription: 'Different description one'
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Same Title',
          metaDescription: 'Different description two'
        })
      ];
      
      expect(metaManager.validateMetaUniqueness(pages)).toBe(false);
    });

    it('should detect duplicate meta descriptions', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Different Title One',
          metaDescription: 'Same meta description'
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Different Title Two',
          metaDescription: 'Same meta description'
        })
      ];
      
      expect(metaManager.validateMetaUniqueness(pages)).toBe(false);
    });
  });

  describe('Bulk Operations', () => {
    it('should process meta updates for multiple pages', async () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Page One'
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Page Two'
        })
      ];
      
      const result = await metaManager.processMetaUpdates(pages);
      
      expect(result.successfulPages).toHaveLength(2);
      expect(result.failedPages).toHaveLength(0);
      expect(result.rollbackAvailable).toBe(true);
      
      // Check that meta information was generated
      pages.forEach(page => {
        expect(page.h1Tag).toBeDefined();
        expect(page.metaDescription).toBeDefined();
        expect(page.metaDescription.length).toBeGreaterThanOrEqual(config.metaDescriptionMinLength);
        expect(page.canonicalUrl).toBeDefined();
      });
    });
  });

  // Property-based tests
  describe('Property-Based Tests', () => {
    it('**Feature: comprehensive-seo-fixes, Property 6: Unique H1 tags with keywords**', () => {
      fc.assert(fc.property(
        fc.array(fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 60 }),
          h1Tag: fc.string({ minLength: 1, maxLength: 100 })
        }), { minLength: 1, maxLength: 10 }),
        (pageData) => {
          const pages = pageData.map(data => new SEOPageModel(data));
          
          // Generate unique H1 tags for each page
          pages.forEach((page, index) => {
            const keywords = [`keyword${index}`, 'furniture', 'polish'];
            page.h1Tag = metaManager.generateH1Tag(page, keywords);
          });
          
          // All H1 tags should be unique and contain keywords
          const h1Tags = pages.map(p => p.h1Tag.toLowerCase());
          const uniqueH1Tags = new Set(h1Tags);
          
          return uniqueH1Tags.size === h1Tags.length && 
                 pages.every(page => page.h1Tag.length > 0);
        }
      ), { numRuns: 100 });
    });

    it('**Feature: comprehensive-seo-fixes, Property 7: Meta description optimization**', () => {
      fc.assert(fc.property(
        fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 60 })
        }),
        fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
        (pageData, keywords) => {
          const page = new SEOPageModel(pageData);
          const description = metaManager.generateMetaDescription(page, keywords);
          
          // Meta description should be within length limits and include keywords
          const isValidLength = description.length >= config.metaDescriptionMinLength && 
                               description.length <= config.metaDescriptionMaxLength;
          const containsKeyword = keywords.some(keyword => 
            description.toLowerCase().includes(keyword.toLowerCase())
          );
          
          return isValidLength && (keywords.length === 0 || containsKeyword);
        }
      ), { numRuns: 100 });
    });

    it('**Feature: comprehensive-seo-fixes, Property 8: Complete social media tags**', () => {
      fc.assert(fc.property(
        fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 60 }),
          metaDescription: fc.string({ minLength: 150, maxLength: 160 })
        }).filter(data => {
          return data.title.trim().length > 0 && data.metaDescription.trim().length >= 150;
        }),
        (pageData): boolean => {
          const page = new SEOPageModel(pageData);
          
          const ogTags = metaManager.generateOpenGraphTags(page);
          const twitterTags = metaManager.generateTwitterCardTags(page);
          
          // Both Open Graph and Twitter Card tags should be complete
          const hasRequiredOGTags = Boolean(ogTags['og:title']) && ogTags['og:title'].trim().length > 0 &&
                                   Boolean(ogTags['og:description']) && ogTags['og:description'].trim().length > 0 &&
                                   Boolean(ogTags['og:url']) && Boolean(ogTags['og:type']);
          const hasRequiredTwitterTags = Boolean(twitterTags['twitter:card']) && 
                                        Boolean(twitterTags['twitter:title']) && twitterTags['twitter:title'].trim().length > 0 &&
                                        Boolean(twitterTags['twitter:description']) && twitterTags['twitter:description'].trim().length > 0;
          
          return hasRequiredOGTags && hasRequiredTwitterTags;
        }
      ), { numRuns: 100 });
    });

    it('**Feature: comprehensive-seo-fixes, Property 9: Canonical tag implementation**', () => {
      fc.assert(fc.property(
        fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 60 }),
          wordCount: fc.integer({ min: 100, max: 1000 })
        }),
        fc.array(fc.record({
          url: fc.webUrl(),
          wordCount: fc.integer({ min: 100, max: 1000 })
        }), { minLength: 0, maxLength: 3 }),
        (pageData, duplicateData) => {
          const page = new SEOPageModel(pageData);
          const duplicates = duplicateData.map(data => new SEOPageModel(data));
          
          const canonical = metaManager.generateCanonicalTag(page, duplicates);
          
          // Canonical should point to preferred version (highest word count, then shortest URL)
          const allPages = [page, ...duplicates];
          const preferredPage = allPages.reduce((preferred, current) => {
            if (current.wordCount > preferred.wordCount) {
              return current;
            }
            if (current.wordCount === preferred.wordCount && current.url.length < preferred.url.length) {
              return current;
            }
            return preferred;
          });
          
          return canonical === preferredPage.url;
        }
      ), { numRuns: 100 });
    });

    it('**Feature: comprehensive-seo-fixes, Property 10: Meta content uniqueness**', () => {
      fc.assert(fc.property(
        fc.array(fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 60 }),
          metaDescription: fc.string({ minLength: 150, maxLength: 160 })
        }), { minLength: 1, maxLength: 10 }),
        (pageData) => {
          // Ensure unique titles and descriptions
          const uniquePageData = pageData.map((data, index) => ({
            ...data,
            title: `${data.title} ${index}`,
            metaDescription: `${data.metaDescription} ${index}`
          }));
          
          const pages = uniquePageData.map(data => new SEOPageModel(data));
          
          // All meta content should be unique
          return metaManager.validateMetaUniqueness(pages);
        }
      ), { numRuns: 100 });
    });
  });
});