// Performance Optimizer Tests

import * as fc from 'fast-check';
import { PerformanceOptimizer, defaultPerformanceOptimizerConfig } from './PerformanceOptimizer';
import { 
  seoPageArbitrary, 
  performanceMetricsArbitrary,
  urlArbitrary
} from '../test/generators';
import { SEOPage, PerformanceMetrics } from '../types';

describe('PerformanceOptimizer', () => {
  let performanceOptimizer: PerformanceOptimizer;

  beforeEach(() => {
    performanceOptimizer = new PerformanceOptimizer(defaultPerformanceOptimizerConfig);
  });

  describe('Unit Tests', () => {
    test('should implement lazy loading when enabled', () => {
      const page: SEOPage = {
        url: 'https://example.com/test',
        title: 'Test Page',
        metaDescription: 'Test description',
        h1Tag: 'Test H1',
        wordCount: 500,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: 'test.jpg',
          url: 'https://example.com/test',
          type: 'website',
          siteName: 'Test Site'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: 'test.jpg'
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 85
      };

      // Should not throw error
      expect(() => performanceOptimizer.implementLazyLoading(page)).not.toThrow();
    });

    test('should validate Core Web Vitals correctly', () => {
      const goodMetrics: PerformanceMetrics = {
        loadTime: 1500,
        firstContentfulPaint: 1000,
        largestContentfulPaint: 2000, // Under 2500ms threshold
        firstInputDelay: 50,           // Under 100ms threshold
        cumulativeLayoutShift: 0.05,   // Under 0.1 threshold
        totalBlockingTime: 100
      };

      const badMetrics: PerformanceMetrics = {
        loadTime: 5000,
        firstContentfulPaint: 3000,
        largestContentfulPaint: 4000, // Over 2500ms threshold
        firstInputDelay: 200,          // Over 100ms threshold
        cumulativeLayoutShift: 0.2,    // Over 0.1 threshold
        totalBlockingTime: 500
      };

      expect(performanceOptimizer.validateCoreWebVitals(goodMetrics)).toBe(true);
      expect(performanceOptimizer.validateCoreWebVitals(badMetrics)).toBe(false);
    });

    test('should generate appropriate cache headers', () => {
      const htmlPage: SEOPage = {
        url: 'https://example.com/page.html',
        title: 'Test Page',
        metaDescription: 'Test description',
        h1Tag: 'Test H1',
        wordCount: 500,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: 'test.jpg',
          url: 'https://example.com/page.html',
          type: 'website',
          siteName: 'Test Site'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: 'test.jpg'
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 85
      };

      const staticAsset: SEOPage = {
        ...htmlPage,
        url: 'https://example.com/style.css'
      };

      const htmlHeaders = performanceOptimizer.setCacheHeaders(htmlPage);
      const staticHeaders = performanceOptimizer.setCacheHeaders(staticAsset);

      expect(htmlHeaders['Cache-Control']).toContain('max-age=3600');
      expect(staticHeaders['Cache-Control']).toContain('max-age=31536000');
      expect(htmlHeaders['ETag']).toBeDefined();
      expect(staticHeaders['ETag']).toBeDefined();
    });

    test('should minimize CSS and JS bundles', async () => {
      const cssFiles = ['style.css', 'components.css'];
      const jsFiles = ['main.js', 'utils.js'];

      const minifiedCSS = await performanceOptimizer.minimizeCSSBundles(cssFiles);
      const minifiedJS = await performanceOptimizer.minimizeJSBundles(jsFiles);

      expect(minifiedCSS).toEqual(['style.min.css', 'components.min.css']);
      expect(minifiedJS).toEqual(['main.min.js', 'utils.min.js']);
    });
  });

  describe('Property-Based Tests', () => {
    test('Property 16: Image optimization implementation - should implement lazy loading and optimize formats', async () => {
      /**
       * Feature: comprehensive-seo-fixes, Property 16: Image optimization implementation
       * For any images processed by the Performance_Optimizer, lazy loading should be implemented and formats optimized
       * Validates: Requirements 4.1
       */
      await fc.assert(fc.asyncProperty(seoPageArbitrary, async (page: SEOPage) => {
        // Test that image optimization doesn't throw errors
        await performanceOptimizer.optimizeImages(page);
        
        // Test that lazy loading implementation doesn't throw errors
        performanceOptimizer.implementLazyLoading(page);
        
        return true;
      }), { numRuns: 100 });
    });

    test('Property 17: Asset bundle minimization - should minimize CSS and JavaScript bundles', async () => {
      /**
       * Feature: comprehensive-seo-fixes, Property 17: Asset bundle minimization
       * For any generated page, CSS and JavaScript bundles should be minimized
       * Validates: Requirements 4.2
       */
      await fc.assert(fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
        fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
        async (cssFiles: string[], jsFiles: string[]) => {
          const cssFilesWithExt = cssFiles.map(f => `${f.trim()}.css`);
          const jsFilesWithExt = jsFiles.map(f => `${f.trim()}.js`);
          
          const minifiedCSS = await performanceOptimizer.minimizeCSSBundles(cssFilesWithExt);
          const minifiedJS = await performanceOptimizer.minimizeJSBundles(jsFilesWithExt);
          
          // Should return same number of files
          expect(minifiedCSS).toHaveLength(cssFilesWithExt.length);
          expect(minifiedJS).toHaveLength(jsFilesWithExt.length);
          
          // Should have .min extension
          minifiedCSS.forEach(file => expect(file).toContain('.min.css'));
          minifiedJS.forEach(file => expect(file).toContain('.min.js'));
          
          return true;
        }
      ), { numRuns: 100 });
    });

    test('Property 18: Core Web Vitals compliance - should meet Google standards', async () => {
      /**
       * Feature: comprehensive-seo-fixes, Property 18: Core Web Vitals compliance
       * For any page analyzed by the Performance_Optimizer, Core Web Vitals should meet Google standards
       * Validates: Requirements 4.3
       */
      await fc.assert(fc.asyncProperty(urlArbitrary, async (pageUrl: string) => {
        const metrics = await performanceOptimizer.measureCoreWebVitals(pageUrl);
        const isValid = performanceOptimizer.validateCoreWebVitals(metrics);
        
        // The measured metrics should meet the configured thresholds
        expect(isValid).toBe(true);
        expect(metrics.largestContentfulPaint).toBeLessThanOrEqual(defaultPerformanceOptimizerConfig.coreWebVitalsThresholds.lcp);
        expect(metrics.firstInputDelay).toBeLessThanOrEqual(defaultPerformanceOptimizerConfig.coreWebVitalsThresholds.fid);
        expect(metrics.cumulativeLayoutShift).toBeLessThanOrEqual(defaultPerformanceOptimizerConfig.coreWebVitalsThresholds.cls);
        
        return true;
      }), { numRuns: 100 });
    });

    test('Property 19: Appropriate cache headers - should set proper cache headers for static assets', () => {
      /**
       * Feature: comprehensive-seo-fixes, Property 19: Appropriate cache headers
       * For any static asset processed by the system, appropriate cache headers should be set
       * Validates: Requirements 4.4
       */
      fc.assert(fc.property(seoPageArbitrary, (page: SEOPage) => {
        const headers = performanceOptimizer.setCacheHeaders(page);
        
        if (performanceOptimizer.config.cacheHeadersEnabled) {
          expect(headers['Cache-Control']).toBeDefined();
          expect(headers['Expires']).toBeDefined();
          expect(headers['ETag']).toBeDefined();
          
          // Static assets should have longer cache times
          if (page.url.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico)$/)) {
            expect(headers['Cache-Control']).toContain('max-age=31536000');
          } else {
            expect(headers['Cache-Control']).toContain('max-age=3600');
          }
        }
        
        return true;
      }), { numRuns: 100 });
    });

    test('Property 20: Mobile optimization - should ensure responsive design and mobile-first optimization', () => {
      /**
       * Feature: comprehensive-seo-fixes, Property 20: Mobile optimization
       * For any mobile request processed by the system, responsive design and mobile-first optimization should be ensured
       * Validates: Requirements 4.5
       */
      fc.assert(fc.property(seoPageArbitrary, (page: SEOPage) => {
        const isMobileOptimized = performanceOptimizer.validateMobileOptimization(page);
        
        // All pages should be mobile optimized
        expect(isMobileOptimized).toBe(true);
        
        return true;
      }), { numRuns: 100 });
    });
  });

  describe('Bulk Operations', () => {
    test('should process bulk performance optimization', async () => {
      const pages: SEOPage[] = [
        {
          url: 'https://example.com/page1',
          title: 'Page 1',
          metaDescription: 'Description 1',
          h1Tag: 'H1 1',
          wordCount: 500,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Page 1',
            description: 'Description 1',
            image: 'image1.jpg',
            url: 'https://example.com/page1',
            type: 'website',
            siteName: 'Test Site'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Page 1',
            description: 'Description 1',
            image: 'image1.jpg'
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 85
        }
      ];

      const result = await performanceOptimizer.processPerformanceOptimization(pages);

      expect(result.operationId).toBeDefined();
      expect(result.successfulPages).toContain('https://example.com/page1');
      expect(result.failedPages).toHaveLength(0);
      expect(result.rollbackAvailable).toBe(false);
    });
  });

  describe('Configuration Management', () => {
    test('should update configuration', () => {
      const newConfig = {
        lazyLoadingEnabled: false,
        bundleMinificationEnabled: false
      };

      performanceOptimizer.updateConfig(newConfig);
      const config = performanceOptimizer.getConfig();

      expect(config.lazyLoadingEnabled).toBe(false);
      expect(config.bundleMinificationEnabled).toBe(false);
      expect(config.cacheHeadersEnabled).toBe(true); // Should retain original value
    });
  });

  describe('Performance Analysis', () => {
    test('should analyze page performance characteristics', () => {
      const page: SEOPage = {
        url: 'https://example.com/test',
        title: 'Test Page',
        metaDescription: 'Test description',
        h1Tag: 'Test H1',
        wordCount: 1000,
        internalLinks: [
          {
            sourceUrl: 'https://example.com/test',
            targetUrl: 'https://example.com/other',
            anchorText: 'Other Page',
            linkType: 'internal',
            isNoFollow: false,
            context: 'test context'
          }
        ],
        outgoingLinks: [],
        openGraphTags: {
          title: 'Test',
          description: 'Test',
          image: 'test.jpg',
          url: 'https://example.com/test',
          type: 'website',
          siteName: 'Test Site'
        },
        twitterCardTags: {
          card: 'summary',
          title: 'Test',
          description: 'Test',
          image: 'test.jpg'
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage'
        },
        lastModified: new Date(),
        seoScore: 85
      };

      const analysis = performanceOptimizer.analyzePagePerformance(page);

      expect(analysis.hasLazyLoading).toBe(true);
      expect(analysis.hasCacheHeaders).toBe(true);
      expect(analysis.isMobileOptimized).toBe(true);
      expect(analysis.estimatedLoadTime).toBeGreaterThan(0);
    });
  });
});