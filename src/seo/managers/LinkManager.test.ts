// Link Manager Tests

import { LinkManager } from './LinkManager';
import { SEOPageModel } from '../models/SEOPageModel';
import { LinkManagerConfig, SEOPage } from '../types';
import * as fc from 'fast-check';
import { seoPageArbitrary } from '../test/generators';

describe('LinkManager', () => {
  let linkManager: LinkManager;
  let config: LinkManagerConfig;

  beforeEach(() => {
    config = {
      minOutgoingLinks: 3,
      maxOutgoingLinks: 10,
      contextualRelevanceThreshold: 0.7,
      avoidCircularReferences: true
    };
    linkManager = new LinkManager(config);
  });

  describe('analyzeLinks', () => {
    it('should analyze link structure correctly', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: 'Professional furniture polishing services in Mumbai',
        h1Tag: 'Furniture Polishing Mumbai',
        internalLinks: [
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/sofa-polishing-mumbai',
            anchorText: 'sofa polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          }
        ],
        outgoingLinks: [
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/table-polishing-mumbai',
            anchorText: 'table polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          }
        ]
      });

      const analysis = linkManager.analyzeLinks(page);

      expect(analysis.totalInternalLinks).toBe(1);
      expect(analysis.totalOutgoingLinks).toBe(1);
      expect(analysis.anchorTextDistribution.get('sofa polishing')).toBe(1);
    });
  });

  describe('generateOutgoingLinks', () => {
    it('should generate additional outgoing links when needed', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: 'Professional furniture polishing services in Mumbai',
        h1Tag: 'Furniture Polishing Mumbai',
        outgoingLinks: [
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/sofa-polishing-mumbai',
            anchorText: 'sofa polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          }
        ]
      });

      const newLinks = linkManager.generateOutgoingLinks(page, 3);

      expect(newLinks.length).toBeGreaterThanOrEqual(3);
      expect(newLinks[0].sourceUrl).toBe(page.url);
      expect(newLinks[0].linkType).toBe('internal');
    });

    it('should not generate links if target count is already met', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: 'Professional furniture polishing services in Mumbai',
        h1Tag: 'Furniture Polishing Mumbai',
        outgoingLinks: [
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/sofa-polishing-mumbai',
            anchorText: 'sofa polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          },
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/table-polishing-mumbai',
            anchorText: 'table polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          },
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/services/wardrobe-polishing-mumbai',
            anchorText: 'wardrobe polishing',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Related service'
          }
        ]
      });

      const newLinks = linkManager.generateOutgoingLinks(page, 3);

      expect(newLinks.length).toBe(3);
      expect(newLinks).toEqual(page.outgoingLinks);
    });
  });

  describe('generateContextualAnchorText', () => {
    it('should generate relevant anchor text based on target page content', () => {
      const sourcePage = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: 'Professional furniture polishing services in Mumbai',
        h1Tag: 'Furniture Polishing Mumbai'
      });

      const targetPage = new SEOPageModel({
        url: '/services/sofa-polishing-mumbai',
        title: 'Sofa Polishing in Mumbai',
        metaDescription: 'Professional sofa polishing services in Mumbai',
        h1Tag: 'Sofa Polishing Mumbai'
      });

      const anchorText = linkManager.generateContextualAnchorText(sourcePage, targetPage);

      expect(typeof anchorText).toBe('string');
      expect(anchorText.length).toBeGreaterThan(0);
      // The anchor text should be contextually relevant - either contain common keywords or target page info
      expect(anchorText.toLowerCase()).toMatch(/(sofa|polishing|mumbai)/);
    });
  });

  describe('detectCircularReferences', () => {
    it('should detect circular references in link structure', () => {
      const page1 = new SEOPageModel({
        url: '/page1',
        title: 'Page 1',
        outgoingLinks: [
          {
            sourceUrl: '/page1',
            targetUrl: '/page2',
            anchorText: 'Page 2',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const page2 = new SEOPageModel({
        url: '/page2',
        title: 'Page 2',
        outgoingLinks: [
          {
            sourceUrl: '/page2',
            targetUrl: '/page1',
            anchorText: 'Page 1',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const circularRefs = linkManager.detectCircularReferences([page1, page2]);

      expect(circularRefs.length).toBeGreaterThan(0);
    });

    it('should return empty array when no circular references exist', () => {
      const page1 = new SEOPageModel({
        url: '/page1',
        title: 'Page 1',
        outgoingLinks: [
          {
            sourceUrl: '/page1',
            targetUrl: '/page2',
            anchorText: 'Page 2',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const page2 = new SEOPageModel({
        url: '/page2',
        title: 'Page 2',
        outgoingLinks: []
      });

      const circularRefs = linkManager.detectCircularReferences([page1, page2]);

      expect(circularRefs.length).toBe(0);
    });
  });

  describe('fixOrphanPages', () => {
    it('should create incoming links for orphan pages', () => {
      const orphanPage = new SEOPageModel({
        url: '/services/orphan-service-mumbai',
        title: 'Orphan Service in Mumbai',
        metaDescription: 'Orphan service description',
        h1Tag: 'Orphan Service Mumbai',
        internalLinks: []
      });

      const parentPage = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: 'Professional furniture polishing services in Mumbai',
        h1Tag: 'Furniture Polishing Mumbai',
        outgoingLinks: []
      });

      const allPages = [orphanPage, parentPage];
      const orphanUrls = [orphanPage.url];

      const createdLinks = linkManager.fixOrphanPages(orphanUrls, allPages);

      expect(createdLinks.length).toBeGreaterThan(0);
      expect(createdLinks[0].targetUrl).toBe(orphanPage.url);
      expect(createdLinks[0].sourceUrl).toBe(parentPage.url);
      expect(parentPage.outgoingLinks?.length).toBeGreaterThan(0);
      expect(orphanPage.internalLinks?.length).toBeGreaterThan(0);
    });
  });

  describe('updateRedirectedLinks', () => {
    it('should update links that point to redirected URLs', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        outgoingLinks: [
          {
            sourceUrl: '/services/furniture-polishing-mumbai',
            targetUrl: '/old-url',
            anchorText: 'Old Link',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const redirectMap = new Map([
        ['/old-url', '/new-url']
      ]);

      const updatedPages = linkManager.updateRedirectedLinks([page], redirectMap);

      expect(updatedPages[0].outgoingLinks?.[0].targetUrl).toBe('/new-url');
    });
  });

  describe('validateLinkHierarchy', () => {
    it('should return true for valid link hierarchy', () => {
      const page1 = new SEOPageModel({
        url: '/page1',
        title: 'Page 1',
        outgoingLinks: [
          {
            sourceUrl: '/page1',
            targetUrl: '/page2',
            anchorText: 'Page 2',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const page2 = new SEOPageModel({
        url: '/page2',
        title: 'Page 2',
        outgoingLinks: []
      });

      const isValid = linkManager.validateLinkHierarchy([page1, page2]);

      expect(isValid).toBe(true);
    });

    it('should return false for invalid link hierarchy with circular references', () => {
      const page1 = new SEOPageModel({
        url: '/page1',
        title: 'Page 1',
        outgoingLinks: [
          {
            sourceUrl: '/page1',
            targetUrl: '/page2',
            anchorText: 'Page 2',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const page2 = new SEOPageModel({
        url: '/page2',
        title: 'Page 2',
        outgoingLinks: [
          {
            sourceUrl: '/page2',
            targetUrl: '/page1',
            anchorText: 'Page 1',
            linkType: 'internal',
            isNoFollow: false,
            context: 'Navigation'
          }
        ]
      });

      const isValid = linkManager.validateLinkHierarchy([page1, page2]);

      expect(isValid).toBe(false);
    });
  });

  describe('processLinkUpdates', () => {
    it('should process bulk link updates successfully', async () => {
      const pages = [
        new SEOPageModel({
          url: '/services/furniture-polishing-mumbai',
          title: 'Furniture Polishing in Mumbai',
          metaDescription: 'Professional furniture polishing services in Mumbai',
          h1Tag: 'Furniture Polishing Mumbai',
          outgoingLinks: [] // Insufficient links
        }),
        new SEOPageModel({
          url: '/services/sofa-polishing-mumbai',
          title: 'Sofa Polishing in Mumbai',
          metaDescription: 'Professional sofa polishing services in Mumbai',
          h1Tag: 'Sofa Polishing Mumbai',
          outgoingLinks: [] // Insufficient links
        })
      ];

      const result = await linkManager.processLinkUpdates(pages);

      expect(result.operationId).toBeDefined();
      expect(result.successfulPages.length).toBeGreaterThanOrEqual(1);
      expect(result.rollbackAvailable).toBe(true);
      
      // Verify that at least some pages now have sufficient outgoing links
      const pagesWithSufficientLinks = pages.filter(page => 
        page.outgoingLinks && page.outgoingLinks.length >= config.minOutgoingLinks
      );
      expect(pagesWithSufficientLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  // Property-Based Tests
  describe('Property-Based Tests', () => {
    /**
     * **Feature: comprehensive-seo-fixes, Property 1: Link Manager ensures minimum outgoing links**
     * Property 1: Link Manager ensures minimum outgoing links
     * For any page processed by the Link_Manager, the page should have at least 3 outgoing internal links to related content
     * Validates: Requirements 1.1
     */
    it('should ensure minimum outgoing links for any page', () => {
      fc.assert(
        fc.property(
          seoPageArbitrary,
          (page: SEOPage) => {
            // Create a LinkManager with minimum 3 links as per requirement
            const testConfig: LinkManagerConfig = {
              minOutgoingLinks: 3,
              maxOutgoingLinks: 20,
              contextualRelevanceThreshold: 0.7,
              avoidCircularReferences: true
            };
            const linkManager = new LinkManager(testConfig);

            // Generate outgoing links for the page to meet minimum requirement
            const resultLinks = linkManager.generateOutgoingLinks(page, 3);

            // Property: The result should have at least 3 outgoing links
            // This tests the specific requirement that each page should have at least 3 outgoing internal links
            return resultLinks.length >= 3;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 2: Orphan pages receive incoming links**
     * Property 2: Orphan pages receive incoming links
     * For any orphan page identified by the Link_Manager, the system should automatically create incoming links from relevant parent pages
     * Validates: Requirements 1.2
     */
    it('should create incoming links for any orphan page', () => {
      fc.assert(
        fc.property(
          fc.array(seoPageArbitrary, { minLength: 2, maxLength: 10 }),
          (allPages: SEOPage[]) => {
            // Create a LinkManager instance
            const testConfig: LinkManagerConfig = {
              minOutgoingLinks: 3,
              maxOutgoingLinks: 20,
              contextualRelevanceThreshold: 0.7,
              avoidCircularReferences: true
            };
            const linkManager = new LinkManager(testConfig);

            // Identify orphan pages (pages with no incoming internal links)
            const orphanUrls: string[] = [];
            
            // Create a set of all pages that are targets of internal links
            const linkedPages = new Set<string>();
            allPages.forEach(page => {
              page.internalLinks?.forEach(link => {
                if (link.linkType === 'internal') {
                  linkedPages.add(link.targetUrl);
                }
              });
            });

            // Find pages that are not linked to (orphans)
            allPages.forEach(page => {
              if (!linkedPages.has(page.url)) {
                orphanUrls.push(page.url);
              }
            });

            // If there are no orphan pages, the property is trivially satisfied
            if (orphanUrls.length === 0) {
              return true;
            }

            // Store initial state for comparison
            const initialIncomingLinksCount = new Map<string, number>();
            allPages.forEach(page => {
              initialIncomingLinksCount.set(page.url, page.internalLinks?.length || 0);
            });

            // Fix orphan pages
            const createdLinks = linkManager.fixOrphanPages(orphanUrls, allPages);

            // Property: Each orphan page should now have at least one incoming link
            // Check that orphan pages received incoming links
            let allOrphansFixed = true;
            orphanUrls.forEach(orphanUrl => {
              const orphanPage = allPages.find(page => page.url === orphanUrl);
              if (orphanPage) {
                const currentIncomingLinks = orphanPage.internalLinks?.length || 0;
                const initialIncomingLinks = initialIncomingLinksCount.get(orphanUrl) || 0;
                
                // The orphan page should have more incoming links than before
                if (currentIncomingLinks <= initialIncomingLinks) {
                  allOrphansFixed = false;
                }
              }
            });

            // Additional check: All created links should target orphan pages
            const allCreatedLinksTargetOrphans = createdLinks.every(link => 
              orphanUrls.includes(link.targetUrl)
            );

            // Property validation: All orphans should be fixed AND all created links should target orphans
            return allOrphansFixed && allCreatedLinksTargetOrphans;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});