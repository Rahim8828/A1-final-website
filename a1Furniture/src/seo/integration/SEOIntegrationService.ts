// SEO Integration Service
// Integrates SEO managers with existing page generation system

import { PageData } from '../../types';
import { SEOPage, SEOSystemConfig, BulkUpdateResult } from '../types';
import { LinkManager } from '../managers/LinkManager';
import { MetaManager } from '../managers/MetaManager';
import { ContentValidator } from '../managers/ContentValidator';
import { PerformanceOptimizer } from '../managers/PerformanceOptimizer';
import { SEOMonitor } from '../managers/SEOMonitor';
import { defaultSEOSystemConfig } from '../config';

export class SEOIntegrationService {
  private linkManager: LinkManager;
  private metaManager: MetaManager;
  private contentValidator: ContentValidator;
  private performanceOptimizer: PerformanceOptimizer;
  private seoMonitor: SEOMonitor;
  private config: SEOSystemConfig;

  constructor(config: SEOSystemConfig = defaultSEOSystemConfig) {
    this.config = config;
    this.linkManager = new LinkManager(config.linkManager);
    this.metaManager = new MetaManager(config.metaManager);
    this.contentValidator = new ContentValidator(config.contentValidator);
    this.performanceOptimizer = new PerformanceOptimizer(config.performanceOptimizer);
    this.seoMonitor = new SEOMonitor(config.seoMonitor);
  }

  /**
   * Converts PageData to SEOPage format for processing
   */
  private convertPageDataToSEOPage(pageData: PageData): SEOPage {
    return {
      url: pageData.url,
      title: pageData.title,
      metaDescription: pageData.metaDescription,
      h1Tag: pageData.h1,
      wordCount: this.calculateWordCount(pageData),
      internalLinks: [],
      outgoingLinks: pageData.relatedServices.map(service => ({
        sourceUrl: pageData.url,
        targetUrl: service.url,
        anchorText: service.name,
        linkType: 'internal' as const,
        isNoFollow: false,
        context: 'related-services'
      })),
      canonicalUrl: pageData.canonicalUrl,
      openGraphTags: {
        title: pageData.title,
        description: pageData.metaDescription,
        image: '/assets/wooden furniture .webp',
        url: pageData.canonicalUrl,
        type: 'website',
        siteName: 'A1 Furniture Polish'
      },
      twitterCardTags: {
        card: 'summary_large_image',
        title: pageData.title,
        description: pageData.metaDescription,
        image: '/assets/wooden furniture .webp'
      },
      structuredData: pageData.schema,
      lastModified: new Date(),
      seoScore: 0 // Will be calculated by SEO Monitor
    };
  }

  /**
   * Converts SEOPage back to PageData format
   */
  private convertSEOPageToPageData(seoPage: SEOPage, originalPageData: PageData): PageData {
    return {
      ...originalPageData,
      title: seoPage.title,
      metaDescription: seoPage.metaDescription,
      h1: seoPage.h1Tag,
      canonicalUrl: seoPage.canonicalUrl || originalPageData.canonicalUrl,
      relatedServices: seoPage.outgoingLinks
        .filter(link => link.linkType === 'internal')
        .map(link => ({
          name: link.anchorText,
          url: link.targetUrl
        }))
    };
  }

  /**
   * Calculates word count from PageData content
   */
  private calculateWordCount(pageData: PageData): number {
    const content = [
      pageData.introduction,
      pageData.services.map(s => `${s.name} ${s.description}`).join(' '),
      pageData.process.map(p => `${p.title} ${p.description}`).join(' '),
      pageData.serviceAreaDescription,
      pageData.pricing.factors.join(' '),
      pageData.whyChooseUs.map(w => `${w.title} ${w.description}`).join(' '),
      pageData.faqs.map(f => `${f.question} ${f.answer}`).join(' ')
    ].join(' ');

    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Processes a single page through all SEO managers
   */
  async processPage(pageData: PageData): Promise<PageData> {
    try {
      // Convert to SEO format
      const seoPage = this.convertPageDataToSEOPage(pageData);

      // Extract keywords for processing
      const keywords = this.extractKeywords(pageData);

      // Process through Meta Manager
      if (!seoPage.h1Tag || seoPage.h1Tag.length === 0) {
        seoPage.h1Tag = this.metaManager.generateH1Tag(seoPage, keywords);
      }

      if (!seoPage.metaDescription || !this.metaManager.validateMetaDescriptionLength(seoPage.metaDescription)) {
        seoPage.metaDescription = this.metaManager.generateMetaDescription(seoPage, keywords);
      }

      // Update social media tags
      const ogTags = this.metaManager.generateOpenGraphTags(seoPage);
      const twitterTags = this.metaManager.generateTwitterCardTags(seoPage);
      
      seoPage.openGraphTags = {
        title: ogTags['og:title'] || seoPage.title,
        description: ogTags['og:description'] || seoPage.metaDescription,
        image: ogTags['og:image'] || '/assets/wooden furniture .webp',
        url: ogTags['og:url'] || seoPage.url,
        type: ogTags['og:type'] || 'website',
        siteName: ogTags['og:site_name'] || 'A1 Furniture Polish'
      };

      seoPage.twitterCardTags = {
        card: (twitterTags['twitter:card'] as any) || 'summary_large_image',
        title: twitterTags['twitter:title'] || seoPage.title,
        description: twitterTags['twitter:description'] || seoPage.metaDescription,
        image: twitterTags['twitter:image'] || '/assets/wooden furniture .webp'
      };

      // Set canonical URL if not present
      if (!seoPage.canonicalUrl) {
        seoPage.canonicalUrl = this.metaManager.generateCanonicalTag(seoPage);
      }

      // Process through Performance Optimizer
      await this.performanceOptimizer.optimizeImages(seoPage);
      this.performanceOptimizer.implementLazyLoading(seoPage);

      // Update last modified timestamp
      seoPage.lastModified = new Date();

      // Convert back to PageData format
      return this.convertSEOPageToPageData(seoPage, pageData);
    } catch (error) {
      console.error(`Error processing page ${pageData.url}:`, error);
      return pageData; // Return original data if processing fails
    }
  }

  /**
   * Processes multiple pages with link optimization
   */
  async processPages(pagesData: PageData[]): Promise<PageData[]> {
    try {
      // Convert all pages to SEO format
      const seoPages = pagesData.map(pageData => this.convertPageDataToSEOPage(pageData));

      // Process through Link Manager for internal linking optimization
      const linkUpdateResult = await this.linkManager.processLinkUpdates(seoPages);
      
      if (linkUpdateResult.failedPages.length > 0) {
        console.warn(`Link optimization failed for ${linkUpdateResult.failedPages.length} pages:`, linkUpdateResult.errors);
      }

      // Process through Content Validator
      const contentValidationResult = await this.contentValidator.processContentValidation(seoPages);
      
      if (contentValidationResult.failedPages.length > 0) {
        console.warn(`Content validation failed for ${contentValidationResult.failedPages.length} pages:`, contentValidationResult.errors);
      }

      // Process through Meta Manager for bulk updates
      const metaUpdateResult = await this.metaManager.processMetaUpdates(seoPages);
      
      if (metaUpdateResult.failedPages.length > 0) {
        console.warn(`Meta updates failed for ${metaUpdateResult.failedPages.length} pages:`, metaUpdateResult.errors);
      }

      // Process through Performance Optimizer
      const performanceResult = await this.performanceOptimizer.processPerformanceOptimization(seoPages);
      
      if (performanceResult.failedPages.length > 0) {
        console.warn(`Performance optimization failed for ${performanceResult.failedPages.length} pages:`, performanceResult.errors);
      }

      // Convert back to PageData format
      const processedPages = seoPages.map((seoPage, index) => 
        this.convertSEOPageToPageData(seoPage, pagesData[index])
      );

      console.log(`SEO processing complete: ${processedPages.length} pages processed`);
      return processedPages;
    } catch (error) {
      console.error('Error processing pages:', error);
      return pagesData; // Return original data if processing fails
    }
  }

  /**
   * Performs SEO health check on pages
   */
  async performHealthCheck(pagesData: PageData[]): Promise<BulkUpdateResult> {
    try {
      const seoPages = pagesData.map(pageData => this.convertPageDataToSEOPage(pageData));
      
      // Perform health checks
      const healthChecks = this.seoMonitor.performBulkHealthCheck(seoPages);
      
      // Detect issues
      const allIssues = seoPages.flatMap(page => this.seoMonitor.detectSEOIssues(page));
      
      // Generate report
      const report = this.seoMonitor.generateSEOReport(seoPages);
      
      console.log(`SEO Health Check Results:`, {
        totalPages: seoPages.length,
        totalIssues: allIssues.length,
        averageScore: report.averageScore,
        criticalIssues: allIssues.filter(issue => issue.severity === 'critical').length
      });

      return {
        operationId: `health-check-${Date.now()}`,
        successfulPages: seoPages.map(page => page.url),
        failedPages: [],
        errors: {},
        rollbackAvailable: false
      };
    } catch (error) {
      console.error('Error performing health check:', error);
      return {
        operationId: `health-check-${Date.now()}`,
        successfulPages: [],
        failedPages: pagesData.map(page => page.url),
        errors: { 'health-check': error instanceof Error ? error.message : 'Unknown error' },
        rollbackAvailable: false
      };
    }
  }

  /**
   * Extracts keywords from PageData
   */
  private extractKeywords(pageData: PageData): string[] {
    const keywords = [
      pageData.primaryKeyword,
      ...pageData.secondaryKeywords
    ].filter(Boolean);

    // Add default keywords if none provided
    if (keywords.length === 0) {
      keywords.push(
        'furniture polish',
        'furniture polishing',
        pageData.location || 'Mumbai'
      );
    }

    return keywords;
  }

  /**
   * Updates configuration
   */
  updateConfiguration(newConfig: Partial<SEOSystemConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.linkManager) {
      this.linkManager = new LinkManager(this.config.linkManager);
    }
    if (newConfig.metaManager) {
      this.metaManager = new MetaManager(this.config.metaManager);
    }
    if (newConfig.contentValidator) {
      this.contentValidator = new ContentValidator(this.config.contentValidator);
    }
    if (newConfig.performanceOptimizer) {
      this.performanceOptimizer = new PerformanceOptimizer(this.config.performanceOptimizer);
    }
    if (newConfig.seoMonitor) {
      this.seoMonitor = new SEOMonitor(this.config.seoMonitor);
    }
  }

  /**
   * Gets current configuration
   */
  getConfiguration(): SEOSystemConfig {
    return { ...this.config };
  }

  /**
   * Gets individual managers for direct access
   */
  getManagers() {
    return {
      linkManager: this.linkManager,
      metaManager: this.metaManager,
      contentValidator: this.contentValidator,
      performanceOptimizer: this.performanceOptimizer,
      seoMonitor: this.seoMonitor
    };
  }
}

// Create singleton instance
export const seoIntegrationService = new SEOIntegrationService();