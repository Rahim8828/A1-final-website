// SEO Dashboard System Tests

import { SEOMonitor } from '../managers/SEOMonitor';
import { SEOReportGenerator } from './SEOReportGenerator';
import { IssueTracker } from './IssueTracker';
import { PerformanceTracker } from './PerformanceTracker';
import { RecommendationEngine } from './RecommendationEngine';
import { SEODashboardSystem } from './index';
import { SEOPage, SEOMonitorConfig } from '../types';
import * as fc from 'fast-check';

describe('SEO Dashboard System', () => {
  let seoMonitor: SEOMonitor;
  let reportGenerator: SEOReportGenerator;
  let issueTracker: IssueTracker;
  let performanceTracker: PerformanceTracker;
  let recommendationEngine: RecommendationEngine;
  let dashboardSystem: SEODashboardSystem;

  const mockConfig = {
    seoMonitor: {
      healthCheckInterval: 24,
      autoFixEnabled: true,
      alertingEnabled: true,
      bulkUpdateBatchSize: 10,
      rollbackEnabled: true
    } as SEOMonitorConfig,
    dailyReport: {
      reportFormat: 'html' as const,
      includeDetailedIssues: true,
      includeRecommendations: true,
      includePerformanceMetrics: true,
      scheduledTime: '09:00',
      timezone: 'UTC'
    },
    performanceThresholds: {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      seoScore: { good: 80, needsImprovement: 60 },
      loadTime: { good: 3000, needsImprovement: 5000 }
    }
  };

  beforeEach(() => {
    seoMonitor = new SEOMonitor(mockConfig.seoMonitor);
    reportGenerator = new SEOReportGenerator(seoMonitor, mockConfig.dailyReport);
    issueTracker = new IssueTracker();
    performanceTracker = new PerformanceTracker(mockConfig.performanceThresholds);
    recommendationEngine = new RecommendationEngine();
    dashboardSystem = new SEODashboardSystem(mockConfig);
  });

  describe('SEO Report Generator', () => {
    test('should generate HTML report with correct structure', async () => {
      const mockPages: SEOPage[] = [
        {
          url: '/test-page',
          title: 'Test Page',
          metaDescription: 'Test description',
          h1Tag: 'Test H1',
          wordCount: 500,
          internalLinks: [],
          outgoingLinks: [],
          canonicalUrl: '/test-page',
          openGraphTags: {
            title: 'Test Page',
            description: 'Test description',
            image: '/test-image.jpg',
            url: '/test-page',
            type: 'website',
            siteName: 'Test Site'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Test Page',
            description: 'Test description',
            image: '/test-image.jpg'
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 85
        }
      ];

      const htmlReport = await reportGenerator.generateDailyReport(mockPages);
      
      expect(htmlReport).toContain('<!DOCTYPE html>');
      expect(htmlReport).toContain('Daily SEO Health Report');
      expect(htmlReport).toContain('Total Pages');
      expect(htmlReport).toContain('Average SEO Score');
    });

    test('should generate JSON report with correct data structure', async () => {
      const mockPages: SEOPage[] = [
        {
          url: '/test-page',
          title: 'Test Page',
          metaDescription: 'Test description',
          h1Tag: 'Test H1',
          wordCount: 500,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: 'Test Page',
            description: 'Test description',
            image: '/test-image.jpg',
            url: '/test-page',
            type: 'website',
            siteName: 'Test Site'
          },
          twitterCardTags: {
            card: 'summary',
            title: 'Test Page',
            description: 'Test description',
            image: '/test-image.jpg'
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 85
        }
      ];

      // Update config to JSON format
      reportGenerator.updateConfig({ reportFormat: 'json' });
      const jsonReport = await reportGenerator.generateDailyReport(mockPages);
      
      const reportData = JSON.parse(jsonReport);
      expect(reportData).toHaveProperty('metadata');
      expect(reportData).toHaveProperty('summary');
      expect(reportData).toHaveProperty('healthChecks');
      expect(reportData.metadata.totalPages).toBe(1);
    });

    test('should calculate next run time correctly', () => {
      const schedulerStatus = reportGenerator.getSchedulerStatus();
      expect(schedulerStatus.nextRunTime).toBeInstanceOf(Date);
      expect(schedulerStatus.isActive).toBe(false);
    });
  });

  describe('Issue Tracker', () => {
    test('should track issues correctly', () => {
      const mockHealthChecks = [
        {
          pageUrl: '/test-page',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/test-page',
              issueType: 'missing_h1' as const,
              severity: 'critical' as const,
              description: 'Missing H1 tag',
              autoFixable: true,
              fixAction: 'Add H1 tag'
            }
          ],
          score: 60,
          recommendations: []
        }
      ];

      const metrics = issueTracker.updateIssues(mockHealthChecks);
      
      expect(metrics.totalIssues).toBe(1);
      expect(metrics.criticalIssues).toBe(1);
      expect(metrics.openIssues).toBe(1);
    });

    test('should resolve issues when they disappear', () => {
      // First, add an issue
      const mockHealthChecksWithIssue = [
        {
          pageUrl: '/test-page',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/test-page',
              issueType: 'missing_h1' as const,
              severity: 'critical' as const,
              description: 'Missing H1 tag',
              autoFixable: true
            }
          ],
          score: 60,
          recommendations: []
        }
      ];

      issueTracker.updateIssues(mockHealthChecksWithIssue);

      // Then, remove the issue
      const mockHealthChecksWithoutIssue = [
        {
          pageUrl: '/test-page',
          timestamp: new Date(),
          issues: [],
          score: 90,
          recommendations: []
        }
      ];

      const metrics = issueTracker.updateIssues(mockHealthChecksWithoutIssue);
      
      expect(metrics.openIssues).toBe(0);
      expect(metrics.resolvedIssues).toBe(1);
    });

    test('should filter issues correctly', () => {
      const mockHealthChecks = [
        {
          pageUrl: '/test-page-1',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/test-page-1',
              issueType: 'missing_h1' as const,
              severity: 'critical' as const,
              description: 'Missing H1 tag',
              autoFixable: true
            }
          ],
          score: 60,
          recommendations: []
        },
        {
          pageUrl: '/test-page-2',
          timestamp: new Date(),
          issues: [
            {
              pageUrl: '/test-page-2',
              issueType: 'low_word_count' as const,
              severity: 'warning' as const,
              description: 'Low word count',
              autoFixable: false
            }
          ],
          score: 70,
          recommendations: []
        }
      ];

      issueTracker.updateIssues(mockHealthChecks);

      const criticalIssues = issueTracker.getIssues({ severity: 'critical' });
      const warningIssues = issueTracker.getIssues({ severity: 'warning' });

      expect(criticalIssues).toHaveLength(1);
      expect(warningIssues).toHaveLength(1);
      expect(criticalIssues[0].severity).toBe('critical');
      expect(warningIssues[0].severity).toBe('warning');
    });
  });

  describe('Performance Tracker', () => {
    test('should record Core Web Vitals correctly', () => {
      const mockMetrics = {
        url: '/test-page',
        timestamp: new Date(),
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 200,
        tbt: 100
      };

      performanceTracker.recordCoreWebVitals(mockMetrics);
      const latestMetrics = performanceTracker.getLatestCoreWebVitals('/test-page');

      expect(latestMetrics).toEqual(mockMetrics);
    });

    test('should generate performance alerts for poor metrics', () => {
      const poorMetrics = {
        url: '/slow-page',
        timestamp: new Date(),
        lcp: 5000, // Above threshold
        fid: 400,  // Above threshold
        cls: 0.3,  // Above threshold
        fcp: 3000,
        ttfb: 1000,
        tbt: 500
      };

      performanceTracker.recordCoreWebVitals(poorMetrics);
      const alerts = performanceTracker.getActiveAlerts();

      expect(alerts.length).toBeGreaterThan(0);
      expect(alerts.some(alert => alert.message.includes('LCP'))).toBe(true);
      expect(alerts.some(alert => alert.message.includes('FID'))).toBe(true);
      expect(alerts.some(alert => alert.message.includes('CLS'))).toBe(true);
    });

    test('should calculate performance summary correctly', () => {
      const goodMetrics = {
        url: '/good-page',
        timestamp: new Date(),
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 200,
        tbt: 100
      };

      const poorMetrics = {
        url: '/poor-page',
        timestamp: new Date(),
        lcp: 5000,
        fid: 400,
        cls: 0.3,
        fcp: 3000,
        ttfb: 1000,
        tbt: 500
      };

      performanceTracker.recordCoreWebVitals(goodMetrics);
      performanceTracker.recordCoreWebVitals(poorMetrics);

      const summary = performanceTracker.getPerformanceSummary();

      expect(summary.totalPages).toBe(2);
      expect(summary.goodCoreWebVitals).toBe(1);
      expect(summary.poorCoreWebVitals).toBe(1);
    });
  });

  describe('Recommendation Engine', () => {
    test('should generate recommendations for critical issues', () => {
      const mockReport = {
        generatedAt: new Date(),
        totalPages: 2,
        healthChecks: [
          {
            pageUrl: '/page-1',
            timestamp: new Date(),
            issues: [
              {
                pageUrl: '/page-1',
                issueType: 'missing_h1' as const,
                severity: 'critical' as const,
                description: 'Missing H1 tag',
                autoFixable: true
              }
            ],
            score: 50,
            recommendations: []
          },
          {
            pageUrl: '/page-2',
            timestamp: new Date(),
            issues: [
              {
                pageUrl: '/page-2',
                issueType: 'missing_meta' as const,
                severity: 'critical' as const,
                description: 'Missing meta description',
                autoFixable: true
              }
            ],
            score: 45,
            recommendations: []
          }
        ],
        overallScore: 47,
        criticalIssues: 2,
        warningIssues: 0,
        infoIssues: 0,
        recommendations: []
      };

      const recommendations = recommendationEngine.generateRecommendations(mockReport);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations.some(rec => rec.title.includes('H1'))).toBe(true);
      expect(recommendations.some(rec => rec.title.includes('Meta'))).toBe(true);
      expect(recommendations.some(rec => rec.priority === 'critical')).toBe(true);
    });

    test('should prioritize recommendations correctly', () => {
      const mockReport = {
        generatedAt: new Date(),
        totalPages: 1,
        healthChecks: [
          {
            pageUrl: '/page-1',
            timestamp: new Date(),
            issues: [
              {
                pageUrl: '/page-1',
                issueType: 'missing_h1' as const,
                severity: 'critical' as const,
                description: 'Missing H1 tag',
                autoFixable: true
              },
              {
                pageUrl: '/page-1',
                issueType: 'low_word_count' as const,
                severity: 'warning' as const,
                description: 'Low word count',
                autoFixable: false
              }
            ],
            score: 40,
            recommendations: []
          }
        ],
        overallScore: 40,
        criticalIssues: 1,
        warningIssues: 1,
        infoIssues: 0,
        recommendations: []
      };

      const recommendations = recommendationEngine.generateRecommendations(mockReport);
      const actionPlan = recommendationEngine.getPrioritizedActionPlan(5);

      expect(actionPlan.length).toBeGreaterThan(0);
      // Critical priority should come first
      expect(actionPlan[0].priority).toBe('critical');
    });

    test('should update recommendation status', () => {
      const mockReport = {
        generatedAt: new Date(),
        totalPages: 1,
        healthChecks: [
          {
            pageUrl: '/page-1',
            timestamp: new Date(),
            issues: [
              {
                pageUrl: '/page-1',
                issueType: 'missing_h1' as const,
                severity: 'critical' as const,
                description: 'Missing H1 tag',
                autoFixable: true
              }
            ],
            score: 50,
            recommendations: []
          }
        ],
        overallScore: 50,
        criticalIssues: 1,
        warningIssues: 0,
        infoIssues: 0,
        recommendations: []
      };

      const recommendations = recommendationEngine.generateRecommendations(mockReport);
      const recommendationId = recommendations[0].id;

      const updateResult = recommendationEngine.updateRecommendationStatus(recommendationId, 'completed');
      expect(updateResult).toBe(true);

      const updatedRecommendations = recommendationEngine.getRecommendations({ status: 'completed' });
      expect(updatedRecommendations).toHaveLength(1);
      expect(updatedRecommendations[0].implementationStatus).toBe('completed');
    });
  });

  describe('Dashboard System Integration', () => {
    test('should perform comprehensive analysis', async () => {
      const mockPages: SEOPage[] = [
        {
          url: '/test-page',
          title: 'Test Page',
          metaDescription: '',
          h1Tag: '',
          wordCount: 200,
          internalLinks: [],
          outgoingLinks: [],
          openGraphTags: {
            title: '',
            description: '',
            image: '',
            url: '',
            type: 'website',
            siteName: ''
          },
          twitterCardTags: {
            card: 'summary',
            title: '',
            description: '',
            image: ''
          },
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage'
          },
          lastModified: new Date(),
          seoScore: 30
        }
      ];

      const analysis = await dashboardSystem.performComprehensiveAnalysis(mockPages);

      expect(analysis.report).toBeDefined();
      expect(analysis.issueMetrics).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
      expect(analysis.performanceSummary).toBeDefined();
      expect(analysis.recommendationMetrics).toBeDefined();

      // Should detect issues
      expect(analysis.report.criticalIssues).toBeGreaterThan(0);
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });

    test('should provide access to all components', () => {
      const components = dashboardSystem.getComponents();

      expect(components.seoMonitor).toBeInstanceOf(SEOMonitor);
      expect(components.reportGenerator).toBeInstanceOf(SEOReportGenerator);
      expect(components.issueTracker).toBeInstanceOf(IssueTracker);
      expect(components.performanceTracker).toBeInstanceOf(PerformanceTracker);
      expect(components.recommendationEngine).toBeInstanceOf(RecommendationEngine);
    });
  });

  // Property-based tests
  describe('Property-Based Tests', () => {
    /**
     * **Feature: comprehensive-seo-fixes, Property 26: Comprehensive SEO health checks**
     * **Validates: Requirements 6.1**
     */
    test('Property 26: SEO health checks scan all pages for common issues', () => {
      fc.assert(fc.property(
        fc.array(fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 100 }),
          metaDescription: fc.string({ maxLength: 200 }),
          h1Tag: fc.string({ maxLength: 100 }),
          wordCount: fc.integer({ min: 0, max: 2000 }),
          internalLinks: fc.array(fc.record({
            sourceUrl: fc.webUrl(),
            targetUrl: fc.webUrl(),
            anchorText: fc.string({ minLength: 1, maxLength: 50 }),
            linkType: fc.constantFrom('internal', 'external'),
            isNoFollow: fc.boolean(),
            context: fc.string()
          }), { maxLength: 10 }),
          outgoingLinks: fc.array(fc.record({
            sourceUrl: fc.webUrl(),
            targetUrl: fc.webUrl(),
            anchorText: fc.string({ minLength: 1, maxLength: 50 }),
            linkType: fc.constantFrom('internal', 'external'),
            isNoFollow: fc.boolean(),
            context: fc.string()
          }), { maxLength: 10 }),
          canonicalUrl: fc.option(fc.webUrl()),
          openGraphTags: fc.record({
            title: fc.string(),
            description: fc.string(),
            image: fc.string(),
            url: fc.string(),
            type: fc.string(),
            siteName: fc.string()
          }),
          twitterCardTags: fc.record({
            card: fc.constantFrom('summary', 'summary_large_image', 'app', 'player'),
            title: fc.string(),
            description: fc.string(),
            image: fc.string(),
            site: fc.option(fc.string()),
            creator: fc.option(fc.string())
          }),
          structuredData: fc.record({
            '@context': fc.constant('https://schema.org'),
            '@type': fc.string()
          }),
          lastModified: fc.date(),
          seoScore: fc.integer({ min: 0, max: 100 })
        }), { minLength: 1, maxLength: 20 }),
        (pages) => {
          const healthChecks = seoMonitor.performBulkHealthCheck(pages);
          
          // Every page should have a health check
          expect(healthChecks).toHaveLength(pages.length);
          
          // Every health check should have the required properties
          healthChecks.forEach((check, index) => {
            expect(check.pageUrl).toBe(pages[index].url);
            expect(check.timestamp).toBeInstanceOf(Date);
            expect(Array.isArray(check.issues)).toBe(true);
            expect(typeof check.score).toBe('number');
            expect(check.score).toBeGreaterThanOrEqual(0);
            expect(check.score).toBeLessThanOrEqual(100);
            expect(Array.isArray(check.recommendations)).toBe(true);
          });
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 28: Critical issue alerting**
     * **Validates: Requirements 6.3**
     */
    test('Property 28: Critical issues generate alerts with remediation steps', () => {
      fc.assert(fc.property(
        fc.array(fc.record({
          pageUrl: fc.webUrl(),
          issueType: fc.constantFrom('missing_h1', 'low_word_count', 'missing_meta', 'orphan_page', 'slow_loading'),
          severity: fc.constantFrom('critical', 'warning', 'info'),
          description: fc.string({ minLength: 10, maxLength: 200 }),
          autoFixable: fc.boolean(),
          fixAction: fc.option(fc.string({ minLength: 10, maxLength: 100 }))
        }), { minLength: 1, maxLength: 50 }),
        (issues) => {
          const criticalIssues = issues.filter(issue => issue.severity === 'critical');
          
          if (criticalIssues.length > 0) {
            const alert = seoMonitor.generateCriticalIssueAlert(criticalIssues);
            
            // Alert should be generated for critical issues
            expect(alert).toBeTruthy();
            expect(alert.length).toBeGreaterThan(0);
            
            // Alert should contain key information
            expect(alert).toContain('CRITICAL SEO ISSUES DETECTED');
            expect(alert).toContain('RECOMMENDED ACTIONS');
            
            // Should mention the number of critical issues
            expect(alert).toContain(criticalIssues.length.toString());
          }
        }
      ), { numRuns: 100 });
    });

    /**
     * **Feature: comprehensive-seo-fixes, Property 30: Comprehensive SEO reporting**
     * **Validates: Requirements 6.5**
     */
    test('Property 30: SEO reports provide detailed metrics and recommendations', () => {
      fc.assert(fc.property(
        fc.array(fc.record({
          url: fc.webUrl(),
          title: fc.string({ minLength: 1, maxLength: 100 }),
          metaDescription: fc.string({ maxLength: 200 }),
          h1Tag: fc.string({ maxLength: 100 }),
          wordCount: fc.integer({ min: 0, max: 2000 }),
          internalLinks: fc.array(fc.record({
            sourceUrl: fc.webUrl(),
            targetUrl: fc.webUrl(),
            anchorText: fc.string({ minLength: 1, maxLength: 50 }),
            linkType: fc.constantFrom('internal', 'external'),
            isNoFollow: fc.boolean(),
            context: fc.string()
          }), { maxLength: 5 }),
          outgoingLinks: fc.array(fc.record({
            sourceUrl: fc.webUrl(),
            targetUrl: fc.webUrl(),
            anchorText: fc.string({ minLength: 1, maxLength: 50 }),
            linkType: fc.constantFrom('internal', 'external'),
            isNoFollow: fc.boolean(),
            context: fc.string()
          }), { maxLength: 5 }),
          canonicalUrl: fc.option(fc.webUrl()),
          openGraphTags: fc.record({
            title: fc.string(),
            description: fc.string(),
            image: fc.string(),
            url: fc.string(),
            type: fc.string(),
            siteName: fc.string()
          }),
          twitterCardTags: fc.record({
            card: fc.constantFrom('summary', 'summary_large_image', 'app', 'player'),
            title: fc.string(),
            description: fc.string(),
            image: fc.string()
          }),
          structuredData: fc.record({
            '@context': fc.constant('https://schema.org'),
            '@type': fc.string()
          }),
          lastModified: fc.date(),
          seoScore: fc.integer({ min: 0, max: 100 })
        }), { minLength: 1, maxLength: 10 }),
        (pages) => {
          const report = seoMonitor.generateSEOReport(pages);
          
          // Report should have all required properties
          expect(report.generatedAt).toBeInstanceOf(Date);
          expect(report.totalPages).toBe(pages.length);
          expect(Array.isArray(report.healthChecks)).toBe(true);
          expect(report.healthChecks).toHaveLength(pages.length);
          expect(typeof report.overallScore).toBe('number');
          expect(report.overallScore).toBeGreaterThanOrEqual(0);
          expect(report.overallScore).toBeLessThanOrEqual(100);
          expect(typeof report.criticalIssues).toBe('number');
          expect(typeof report.warningIssues).toBe('number');
          expect(typeof report.infoIssues).toBe('number');
          expect(Array.isArray(report.recommendations)).toBe(true);
          
          // Issue counts should be consistent with health checks
          const actualCriticalIssues = report.healthChecks.flatMap(check => 
            check.issues.filter(issue => issue.severity === 'critical')
          ).length;
          const actualWarningIssues = report.healthChecks.flatMap(check => 
            check.issues.filter(issue => issue.severity === 'warning')
          ).length;
          const actualInfoIssues = report.healthChecks.flatMap(check => 
            check.issues.filter(issue => issue.severity === 'info')
          ).length;
          
          expect(report.criticalIssues).toBe(actualCriticalIssues);
          expect(report.warningIssues).toBe(actualWarningIssues);
          expect(report.infoIssues).toBe(actualInfoIssues);
        }
      ), { numRuns: 100 });
    });
  });
});