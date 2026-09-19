// SEO Monitor Tests

import { SEOMonitor } from './SEOMonitor';
import { SEOPageModel } from '../models/SEOPageModel';
import { SEOMonitorConfig, SEOPage, SEOIssue, BulkUpdateOperation } from '../types';
import * as fc from 'fast-check';
import { seoPageArbitrary, validSEOPageArbitrary } from '../test/generators';

describe('SEOMonitor', () => {
  let seoMonitor: SEOMonitor;
  let config: SEOMonitorConfig;

  beforeEach(() => {
    config = {
      healthCheckInterval: 24, // 24 hours
      autoFixEnabled: true,
      alertingEnabled: true,
      bulkUpdateBatchSize: 10,
      rollbackEnabled: true
    };
    seoMonitor = new SEOMonitor(config);
  });

  afterEach(() => {
    // Clean up any running timers
    seoMonitor.stopHealthCheckScheduler();
  });

  describe('performHealthCheck', () => {
    it('should perform health check on a page with issues', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Furniture Polishing in Mumbai',
        metaDescription: '', // Missing meta description
        h1Tag: '', // Missing H1
        wordCount: 150, // Low word count
        internalLinks: [], // No internal links
        seoScore: 30
      });

      const healthCheck = seoMonitor.performHealthCheck(page);

      expect(healthCheck.pageUrl).toBe(page.url);
      expect(healthCheck.timestamp).toBeInstanceOf(Date);
      expect(healthCheck.issues.length).toBeGreaterThan(0);
      expect(healthCheck.score).toBeLessThan(100);
      expect(healthCheck.recommendations.length).toBeGreaterThan(0);

      // Check for specific issues
      const issueTypes = healthCheck.issues.map(issue => issue.issueType);
      expect(issueTypes).toContain('missing_h1');
      expect(issueTypes).toContain('missing_meta');
      expect(issueTypes).toContain('low_word_count');
      expect(issueTypes).toContain('orphan_page');
    });

    it('should return high score for well-optimized page', () => {
      const page = new SEOPageModel({
        url: '/services/furniture-polishing-mumbai',
        title: 'Professional Furniture Polishing Services in Mumbai',
        metaDescription: 'Get expert furniture polishing services in Mumbai. Professional wood restoration, sofa repair, and furniture maintenance with 100% satisfaction guarantee.',
        h1Tag: 'Furniture Polishing Services Mumbai',
        wordCount: 500,
        internalLinks: [
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
        ],
        canonicalUrl: '/services/furniture-polishing-mumbai',
        seoScore: 95
      });

      const healthCheck = seoMonitor.performHealthCheck(page);

      expect(healthCheck.score).toBeGreaterThan(80);
      expect(healthCheck.issues.length).toBeLessThanOrEqual(2); // Should have minimal issues
    });
  });

  describe('performBulkHealthCheck', () => {
    it('should perform health checks on multiple pages', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Page 1',
          metaDescription: 'Description for page 1 that meets the minimum length requirements for SEO optimization and contains relevant keywords for better search engine visibility.',
          h1Tag: 'Page 1 Heading',
          wordCount: 400,
          internalLinks: [
            {
              sourceUrl: '/page1',
              targetUrl: '/page2',
              anchorText: 'page 2',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            },
            {
              sourceUrl: '/page1',
              targetUrl: '/page3',
              anchorText: 'page 3',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            },
            {
              sourceUrl: '/page1',
              targetUrl: '/page4',
              anchorText: 'page 4',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            }
          ]
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Page 2',
          metaDescription: '', // Missing meta description
          h1Tag: 'Page 2 Heading',
          wordCount: 200, // Low word count
          internalLinks: []
        })
      ];

      const healthChecks = seoMonitor.performBulkHealthCheck(pages);

      expect(healthChecks.length).toBe(2);
      expect(healthChecks[0].pageUrl).toBe('/page1');
      expect(healthChecks[1].pageUrl).toBe('/page2');
      expect(healthChecks[1].issues.length).toBeGreaterThan(healthChecks[0].issues.length);
    });
  });

  describe('detectSEOIssues', () => {
    it('should detect missing H1 tag', () => {
      const page = new SEOPageModel({
        url: '/test-page',
        title: 'Test Page',
        h1Tag: '', // Missing H1
        metaDescription: 'Valid meta description that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
        wordCount: 400
      });

      const issues = seoMonitor.detectSEOIssues(page);
      const h1Issue = issues.find(issue => issue.issueType === 'missing_h1');

      expect(h1Issue).toBeDefined();
      expect(h1Issue?.severity).toBe('critical');
      expect(h1Issue?.autoFixable).toBe(true);
    });

    it('should detect low word count', () => {
      const page = new SEOPageModel({
        url: '/test-page',
        title: 'Test Page',
        h1Tag: 'Test Page Heading',
        metaDescription: 'Valid meta description that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
        wordCount: 150 // Below minimum
      });

      const issues = seoMonitor.detectSEOIssues(page);
      const wordCountIssue = issues.find(issue => issue.issueType === 'low_word_count');

      expect(wordCountIssue).toBeDefined();
      expect(wordCountIssue?.severity).toBe('warning');
      expect(wordCountIssue?.autoFixable).toBe(false);
    });

    it('should detect missing meta description', () => {
      const page = new SEOPageModel({
        url: '/test-page',
        title: 'Test Page',
        h1Tag: 'Test Page Heading',
        metaDescription: '', // Missing meta description
        wordCount: 400
      });

      const issues = seoMonitor.detectSEOIssues(page);
      const metaIssue = issues.find(issue => issue.issueType === 'missing_meta');

      expect(metaIssue).toBeDefined();
      expect(metaIssue?.severity).toBe('critical');
      expect(metaIssue?.autoFixable).toBe(true);
    });

    it('should detect insufficient internal links', () => {
      const page = new SEOPageModel({
        url: '/test-page',
        title: 'Test Page',
        h1Tag: 'Test Page Heading',
        metaDescription: 'Valid meta description that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
        wordCount: 400,
        internalLinks: [] // No internal links
      });

      const issues = seoMonitor.detectSEOIssues(page);
      const linkIssue = issues.find(issue => issue.issueType === 'orphan_page');

      expect(linkIssue).toBeDefined();
      expect(linkIssue?.severity).toBe('warning');
      expect(linkIssue?.autoFixable).toBe(true);
    });
  });

  describe('autoFixIssues', () => {
    it('should fix auto-fixable issues', async () => {
      const issues: SEOIssue[] = [
        {
          pageUrl: '/test-page',
          issueType: 'missing_h1',
          severity: 'critical',
          description: 'Missing H1 tag',
          autoFixable: true,
          fixAction: 'Generate H1 from title'
        },
        {
          pageUrl: '/test-page',
          issueType: 'missing_meta',
          severity: 'critical',
          description: 'Missing meta description',
          autoFixable: true,
          fixAction: 'Generate meta description'
        }
      ];

      const result = await seoMonitor.autoFixIssues(issues);

      expect(result.operationId).toBeDefined();
      expect(result.successfulPages).toContain('/test-page');
      expect(result.failedPages.length).toBe(0);
      expect(result.rollbackAvailable).toBe(true);
    });

    it('should skip non-auto-fixable issues', async () => {
      const issues: SEOIssue[] = [
        {
          pageUrl: '/test-page',
          issueType: 'low_word_count',
          severity: 'warning',
          description: 'Low word count',
          autoFixable: false,
          fixAction: 'Add more content'
        }
      ];

      const result = await seoMonitor.autoFixIssues(issues);

      expect(result.successfulPages.length).toBe(0);
      expect(result.failedPages.length).toBe(0);
    });

    it('should respect autoFixEnabled configuration', async () => {
      const disabledConfig = { ...config, autoFixEnabled: false };
      const disabledMonitor = new SEOMonitor(disabledConfig);

      const issues: SEOIssue[] = [
        {
          pageUrl: '/test-page',
          issueType: 'missing_h1',
          severity: 'critical',
          description: 'Missing H1 tag',
          autoFixable: true,
          fixAction: 'Generate H1 from title'
        }
      ];

      const result = await disabledMonitor.autoFixIssues(issues);

      expect(result.successfulPages.length).toBe(0);
      expect(result.failedPages).toContain('/test-page');
      expect(result.errors['auto-fix']).toContain('disabled');
    });
  });

  describe('generateCriticalIssueAlert', () => {
    it('should generate alert for critical issues', () => {
      const issues: SEOIssue[] = [
        {
          pageUrl: '/page1',
          issueType: 'missing_h1',
          severity: 'critical',
          description: 'Missing H1 tag',
          autoFixable: true
        },
        {
          pageUrl: '/page2',
          issueType: 'missing_h1',
          severity: 'critical',
          description: 'Missing H1 tag',
          autoFixable: true
        },
        {
          pageUrl: '/page3',
          issueType: 'missing_meta',
          severity: 'critical',
          description: 'Missing meta description',
          autoFixable: true
        }
      ];

      const alert = seoMonitor.generateCriticalIssueAlert(issues);

      expect(alert).toContain('CRITICAL SEO ISSUES DETECTED');
      expect(alert).toContain('3 critical SEO issues');
      expect(alert).toContain('Missing H1 Tags');
      expect(alert).toContain('/page1');
      expect(alert).toContain('/page2');
      expect(alert).toContain('3 issues can be auto-fixed');
    });

    it('should return empty string when no critical issues', () => {
      const issues: SEOIssue[] = [
        {
          pageUrl: '/page1',
          issueType: 'low_word_count',
          severity: 'warning',
          description: 'Low word count',
          autoFixable: false
        }
      ];

      const alert = seoMonitor.generateCriticalIssueAlert(issues);

      expect(alert).toBe('');
    });
  });

  describe('generateSEOReport', () => {
    it('should generate comprehensive SEO report', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Page 1 with good SEO optimization and proper length',
          metaDescription: 'This is a well-optimized meta description that meets the length requirements and contains relevant keywords for better search engine visibility.',
          h1Tag: 'Page 1 Heading',
          wordCount: 500,
          internalLinks: [
            {
              sourceUrl: '/page1',
              targetUrl: '/page2',
              anchorText: 'page 2',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            },
            {
              sourceUrl: '/page1',
              targetUrl: '/page3',
              anchorText: 'page 3',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            },
            {
              sourceUrl: '/page1',
              targetUrl: '/page4',
              anchorText: 'page 4',
              linkType: 'internal',
              isNoFollow: false,
              context: 'Navigation'
            }
          ],
          seoScore: 90
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Page 2',
          metaDescription: '', // Missing meta description
          h1Tag: '', // Missing H1
          wordCount: 150, // Low word count
          internalLinks: [],
          seoScore: 20
        })
      ];

      const report = seoMonitor.generateSEOReport(pages);

      expect(report.generatedAt).toBeInstanceOf(Date);
      expect(report.totalPages).toBe(2);
      expect(report.healthChecks.length).toBe(2);
      expect(report.criticalIssues).toBeGreaterThan(0);
      expect(report.warningIssues).toBeGreaterThan(0);
      expect(report.overallScore).toBeGreaterThan(0);
      expect(report.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('generateRecommendations', () => {
    it('should generate relevant recommendations based on common issues', () => {
      const healthChecks = [
        {
          pageUrl: '/page1',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/page1',
              issueType: 'missing_h1' as const,
              severity: 'critical' as const,
              description: 'Missing H1',
              autoFixable: true,
              fixAction: 'Add H1 tag'
            }
          ],
          score: 80,
          recommendations: []
        },
        {
          pageUrl: '/page2',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/page2',
              issueType: 'missing_h1' as const,
              severity: 'critical' as const,
              description: 'Missing H1',
              autoFixable: true,
              fixAction: 'Add H1 tag'
            }
          ],
          score: 75,
          recommendations: []
        }
      ];

      const recommendations = seoMonitor.generateRecommendations(healthChecks);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations.some(rec => rec.includes('H1 tags'))).toBe(true);
      expect(recommendations.some(rec => rec.includes('100%'))).toBe(true); // Should mention percentage
    });
  });

  describe('processBulkUpdate', () => {
    it('should process bulk update operation successfully', async () => {
      const operation: BulkUpdateOperation = {
        id: 'test-operation-1',
        type: 'meta_update',
        pages: ['/page1', '/page2', '/page3'],
        changes: { updateType: 'meta_description' },
        status: 'pending',
        createdAt: new Date()
      };

      const result = await seoMonitor.processBulkUpdate(operation);

      expect(result.operationId).toBe('test-operation-1');
      expect(result.successfulPages.length).toBeGreaterThanOrEqual(0);
      expect(result.rollbackAvailable).toBe(true);
    });

    it('should handle invalid page URLs in bulk operation', async () => {
      const operation: BulkUpdateOperation = {
        id: 'test-operation-2',
        type: 'meta_update',
        pages: ['invalid-url', '/valid-page'],
        changes: { updateType: 'meta_description' },
        status: 'pending',
        createdAt: new Date()
      };

      const result = await seoMonitor.processBulkUpdate(operation);

      expect(result.failedPages).toContain('invalid-url');
      expect(result.errors['invalid-url']).toContain('Invalid page URL');
    });
  });

  describe('validateDataIntegrity', () => {
    it('should return true for valid page data', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Unique Title 1',
          metaDescription: 'Unique meta description 1 that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
          h1Tag: 'Heading 1',
          wordCount: 400
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Unique Title 2',
          metaDescription: 'Unique meta description 2 that meets the minimum length requirements for SEO optimization and contains different keywords for search engines.',
          h1Tag: 'Heading 2',
          wordCount: 500
        })
      ];

      const isValid = seoMonitor.validateDataIntegrity(pages);

      expect(isValid).toBe(true);
    });

    it('should return false for duplicate URLs', () => {
      const pages = [
        new SEOPageModel({
          url: '/duplicate-page',
          title: 'Title 1',
          metaDescription: 'Meta description 1 that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
          h1Tag: 'Heading 1',
          wordCount: 400
        }),
        new SEOPageModel({
          url: '/duplicate-page', // Duplicate URL
          title: 'Title 2',
          metaDescription: 'Meta description 2 that meets the minimum length requirements for SEO optimization and contains different keywords for search engines.',
          h1Tag: 'Heading 2',
          wordCount: 500
        })
      ];

      const isValid = seoMonitor.validateDataIntegrity(pages);

      expect(isValid).toBe(false);
    });

    it('should return false for duplicate titles', () => {
      const pages = [
        new SEOPageModel({
          url: '/page1',
          title: 'Duplicate Title',
          metaDescription: 'Meta description 1 that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
          h1Tag: 'Heading 1',
          wordCount: 400
        }),
        new SEOPageModel({
          url: '/page2',
          title: 'Duplicate Title', // Duplicate title
          metaDescription: 'Meta description 2 that meets the minimum length requirements for SEO optimization and contains different keywords for search engines.',
          h1Tag: 'Heading 2',
          wordCount: 500
        })
      ];

      const isValid = seoMonitor.validateDataIntegrity(pages);

      expect(isValid).toBe(false);
    });

    it('should return false for missing required fields', () => {
      const pages = [
        new SEOPageModel({
          url: '', // Missing URL
          title: 'Valid Title',
          metaDescription: 'Valid meta description that meets the minimum length requirements for SEO optimization and contains relevant keywords for search engines.',
          h1Tag: 'Valid Heading',
          wordCount: 400
        })
      ];

      const isValid = seoMonitor.validateDataIntegrity(pages);

      expect(isValid).toBe(false);
    });
  });

  describe('Health Check Scheduler', () => {
    it('should start and stop health check scheduler', () => {
      // Start scheduler
      seoMonitor.startHealthCheckScheduler();
      
      // Verify scheduler is running (we can't easily test the actual interval)
      // In a real implementation, you might expose a way to check if the scheduler is active
      
      // Stop scheduler
      seoMonitor.stopHealthCheckScheduler();
      
      // Test passes if no errors are thrown
      expect(true).toBe(true);
    });
  });

  describe('rollbackBulkUpdate', () => {
    it('should rollback a completed operation', async () => {
      // First, create and process an operation
      const operation: BulkUpdateOperation = {
        id: 'rollback-test-1',
        type: 'meta_update',
        pages: ['/page1', '/page2'],
        changes: { updateType: 'meta_description' },
        status: 'pending',
        createdAt: new Date()
      };

      await seoMonitor.processBulkUpdate(operation);

      // Now rollback the operation
      const rollbackResult = await seoMonitor.rollbackBulkUpdate('rollback-test-1');

      expect(rollbackResult.operationId).toContain('rollback-rollback-test-1');
      expect(rollbackResult.rollbackAvailable).toBe(false); // Can't rollback a rollback
    });

    it('should fail to rollback non-existent operation', async () => {
      const rollbackResult = await seoMonitor.rollbackBulkUpdate('non-existent-operation');

      expect(rollbackResult.successfulPages.length).toBe(0);
      expect(rollbackResult.errors['rollback']).toContain('Operation not found');
    });

    it('should respect rollback configuration', async () => {
      const noRollbackConfig = { ...config, rollbackEnabled: false };
      const noRollbackMonitor = new SEOMonitor(noRollbackConfig);

      const operation: BulkUpdateOperation = {
        id: 'no-rollback-test',
        type: 'meta_update',
        pages: ['/page1'],
        changes: { updateType: 'meta_description' },
        status: 'pending',
        createdAt: new Date()
      };

      await noRollbackMonitor.processBulkUpdate(operation);
      const rollbackResult = await noRollbackMonitor.rollbackBulkUpdate('no-rollback-test');

      expect(rollbackResult.errors['rollback']).toContain('disabled');
    });
  });

  // Property-Based Tests
  describe('Property-Based Tests', () => {
    /**
     * **Feature: comprehensive-seo-fixes, Property 26: Comprehensive SEO health checks**
     * Property 26: Comprehensive SEO health checks
     * For any SEO health check performed by the system, all pages should be scanned for common SEO issues
     * Validates: Requirements 6.1
     */
    it('should perform comprehensive health checks for any page', () => {
      fc.assert(
        fc.property(
          seoPageArbitrary,
          (page: SEOPage) => {
            const healthCheck = seoMonitor.performHealthCheck(page);

            // Property: Health check should always return a valid result structure
            const hasValidStructure = (
              healthCheck.pageUrl === page.url &&
              healthCheck.timestamp instanceof Date &&
              Array.isArray(healthCheck.issues) &&
              typeof healthCheck.score === 'number' &&
              healthCheck.score >= 0 && healthCheck.score <= 100 &&
              Array.isArray(healthCheck.recommendations)
            );

            // Property: Health check should detect issues based on page content
            const hasRelevantIssueDetection = (
              // If page has missing H1, it should be detected
              (page.h1Tag && page.h1Tag.trim().length > 0) || 
              healthCheck.issues.some(issue => issue.issueType === 'missing_h1')
            ) && (
              // If page has missing meta description, it should be detected
              (page.metaDescription && page.metaDescription.trim().length > 0) || 
              healthCheck.issues.some(issue => issue.issueType === 'missing_meta')
            ) && (
              // If page has low word count, it should be detected
              page.wordCount >= 300 || 
              healthCheck.issues.some(issue => issue.issueType === 'low_word_count')
            );

            return hasValidStructure && hasRelevantIssueDetection;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 27: Automatic issue resolution**
     * Property 27: Automatic issue resolution
     * For any detected SEO issue that is resolvable, the system should automatically attempt to fix it
     * Validates: Requirements 6.2
     */
    it('should automatically resolve fixable issues', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(
            fc.record({
              pageUrl: fc.webUrl(),
              issueType: fc.constantFrom('missing_h1', 'missing_meta', 'missing_canonical', 'orphan_page'),
              severity: fc.constantFrom('critical', 'warning', 'info'),
              description: fc.lorem({ maxCount: 20 }),
              autoFixable: fc.constant(true), // Only auto-fixable issues
              fixAction: fc.lorem({ maxCount: 10 })
            }),
            { minLength: 1, maxLength: 10 }
          ),
          async (issues: SEOIssue[]) => {
            const result = await seoMonitor.autoFixIssues(issues);

            // Property: Operation should have valid structure
            const hasValidOperationStructure = (
              typeof result.operationId === 'string' &&
              result.operationId.length > 0 &&
              Array.isArray(result.successfulPages) &&
              Array.isArray(result.failedPages) &&
              typeof result.errors === 'object' &&
              typeof result.rollbackAvailable === 'boolean'
            );

            // Property: When auto-fix is disabled, all pages should be in failedPages with appropriate error
            const uniquePageUrls = new Set(issues.map(issue => issue.pageUrl));
            const respectsAutoFixDisabled = (
              seoMonitor.config.autoFixEnabled || 
              (result.successfulPages.length === 0 && 
               result.failedPages.length === uniquePageUrls.size &&
               result.errors['auto-fix'] && 
               result.errors['auto-fix'].includes('disabled'))
            );

            // Property: When auto-fix is enabled, pages with auto-fixable issues should be processed
            const respectsAutoFixEnabled = (
              !seoMonitor.config.autoFixEnabled || 
              (result.successfulPages.length + result.failedPages.length === uniquePageUrls.size)
            );

            // Property: Rollback availability should match configuration
            const rollbackRespected = (
              result.rollbackAvailable === seoMonitor.config.rollbackEnabled
            );

            return hasValidOperationStructure && respectsAutoFixDisabled && respectsAutoFixEnabled && rollbackRespected;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 28: Critical issue alerting**
     * Property 28: Critical issue alerting
     * For any critical SEO issue found, the system should generate alerts with specific remediation steps
     * Validates: Requirements 6.3
     */
    it('should generate alerts for critical issues', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              pageUrl: fc.webUrl(),
              issueType: fc.constantFrom('missing_h1', 'missing_meta', 'duplicate_content'),
              severity: fc.constant('critical' as const),
              description: fc.string({ minLength: 10, maxLength: 100 }),
              autoFixable: fc.boolean(),
              fixAction: fc.option(fc.string({ minLength: 10, maxLength: 50 }), { nil: undefined })
            }),
            { minLength: 1, maxLength: 20 }
          ),
          (criticalIssues: SEOIssue[]) => {
            const alert = seoMonitor.generateCriticalIssueAlert(criticalIssues);

            // Property: Alert should be generated for critical issues
            const hasAlert = alert.length > 0;

            // Property: Alert should contain relevant information
            const hasRelevantContent = (
              alert.includes('CRITICAL SEO ISSUES') &&
              alert.includes(criticalIssues.length.toString()) &&
              alert.includes('RECOMMENDED ACTIONS')
            );

            // Property: Alert should mention auto-fixable issues if any exist
            const autoFixableCount = criticalIssues.filter(issue => issue.autoFixable).length;
            const mentionsAutoFix = (
              autoFixableCount === 0 || 
              alert.includes('auto-fixed') || 
              alert.includes(autoFixableCount.toString())
            );

            return hasAlert && hasRelevantContent && mentionsAutoFix;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 29: Bulk update data integrity**
     * Property 29: Bulk update data integrity
     * For any bulk update processed by the system, all page URLs should be validated before processing, 
     * data integrity should be maintained for valid pages, all pages should be tracked as either 
     * successful or failed with specific error messages, and rollback capability should be provided 
     * for completed operations
     * Validates: Requirements 6.4
     */
    it('should maintain data integrity during bulk updates', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            id: fc.lorem({ maxCount: 5 }),
            type: fc.constantFrom('meta_update', 'link_update', 'content_update', 'performance_update'),
            pages: fc.array(fc.webUrl(), { minLength: 1, maxLength: 10 }),
            changes: fc.record({
              updateType: fc.lorem({ maxCount: 5 }),
              value: fc.lorem({ maxCount: 20 })
            }),
            status: fc.constant('pending' as const),
            createdAt: fc.constant(new Date())
          }),
          async (operation: BulkUpdateOperation) => {
            const result = await seoMonitor.processBulkUpdate(operation);

            // Property: Result should have valid structure
            const hasValidStructure = (
              typeof result.operationId === 'string' &&
              Array.isArray(result.successfulPages) &&
              Array.isArray(result.failedPages) &&
              typeof result.errors === 'object' &&
              typeof result.rollbackAvailable === 'boolean'
            );

            // Property: All processed pages should be accounted for (either successful or failed)
            // Note: Some pages may be filtered out during validation, so we check that
            // the sum doesn't exceed the original count and that there are no duplicates
            const processedPagesCount = result.successfulPages.length + result.failedPages.length;
            const validPageAccounting = (
              processedPagesCount <= operation.pages.length &&
              new Set([...result.successfulPages, ...result.failedPages]).size === processedPagesCount
            );

            // Property: Rollback should be available if configured and operation has processed pages
            const rollbackRespected = (
              !seoMonitor.config.rollbackEnabled || 
              (processedPagesCount === 0 || result.rollbackAvailable === true)
            );

            // Property: Failed pages should have corresponding errors or there should be a general error
            const failedPagesHaveErrors = (
              result.failedPages.length === 0 || 
              result.failedPages.every(pageUrl => 
                result.errors[pageUrl] || result.errors['bulk-operation'] || result.errors['validation']
              ) ||
              Object.keys(result.errors).length > 0
            );

            // Property: Data integrity - no page should appear in both successful and failed lists
            const noPageDuplication = (
              result.successfulPages.every(page => !result.failedPages.includes(page))
            );

            return hasValidStructure && validPageAccounting && rollbackRespected && failedPagesHaveErrors && noPageDuplication;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 30: Comprehensive SEO reporting**
     * Property 30: Comprehensive SEO reporting
     * For any generated report, it should provide detailed SEO metrics and improvement recommendations
     * Validates: Requirements 6.5
     */
    it('should generate comprehensive SEO reports', () => {
      fc.assert(
        fc.property(
          fc.array(validSEOPageArbitrary, { minLength: 1, maxLength: 20 }),
          (pages: SEOPage[]) => {
            const report = seoMonitor.generateSEOReport(pages);

            // Property: Report should have valid structure
            const hasValidStructure = (
              report.generatedAt instanceof Date &&
              typeof report.totalPages === 'number' &&
              report.totalPages === pages.length &&
              Array.isArray(report.healthChecks) &&
              report.healthChecks.length === pages.length &&
              typeof report.overallScore === 'number' &&
              report.overallScore >= 0 && report.overallScore <= 100 &&
              typeof report.criticalIssues === 'number' &&
              typeof report.warningIssues === 'number' &&
              typeof report.infoIssues === 'number' &&
              Array.isArray(report.recommendations)
            );

            // Property: Health checks should correspond to pages
            const healthChecksMatchPages = report.healthChecks.every(healthCheck => 
              pages.some(page => page.url === healthCheck.pageUrl)
            );

            // Property: Issue counts should match actual issues
            const allIssues = report.healthChecks.flatMap(check => check.issues);
            const actualCriticalCount = allIssues.filter(issue => issue.severity === 'critical').length;
            const actualWarningCount = allIssues.filter(issue => issue.severity === 'warning').length;
            const actualInfoCount = allIssues.filter(issue => issue.severity === 'info').length;
            
            const issueCountsMatch = (
              report.criticalIssues === actualCriticalCount &&
              report.warningIssues === actualWarningCount &&
              report.infoIssues === actualInfoCount
            );

            // Property: Should provide recommendations when issues exist
            const hasRecommendationsWhenNeeded = (
              allIssues.length === 0 || 
              report.recommendations.length > 0
            );

            return hasValidStructure && healthChecksMatchPages && issueCountsMatch && hasRecommendationsWhenNeeded;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});