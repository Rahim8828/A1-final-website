// Core SEO Management System Interfaces

import {
  SEOPage,
  Link,
  SEOIssue,
  SEOHealthCheck,
  SEOReport,
  LinkManagerConfig,
  MetaManagerConfig,
  ContentValidatorConfig,
  PerformanceOptimizerConfig,
  SitemapGeneratorConfig,
  SEOMonitorConfig,
  LinkAnalysis,
  ContentAnalysis,
  HeadingStructure,
  PerformanceMetrics,
  SitemapEntry,
  BulkUpdateOperation,
  BulkUpdateResult
} from '../types';

// Link Manager Interface
export interface ILinkManager {
  config: LinkManagerConfig;
  
  // Core link management methods
  analyzeLinks(page: SEOPage): LinkAnalysis;
  generateOutgoingLinks(page: SEOPage, targetCount: number): Link[];
  fixOrphanPages(orphanPages: string[], allPages: SEOPage[]): Link[];
  generateContextualAnchorText(sourcePage: SEOPage, targetPage: SEOPage): string;
  updateRedirectedLinks(pages: SEOPage[], redirectMap: Map<string, string>): SEOPage[];
  
  // Validation methods
  validateLinkHierarchy(pages: SEOPage[]): boolean;
  detectCircularReferences(pages: SEOPage[]): string[];
  
  // Bulk operations
  processLinkUpdates(pages: SEOPage[]): Promise<BulkUpdateResult>;
}

// Meta Manager Interface
export interface IMetaManager {
  config: MetaManagerConfig;
  
  // H1 tag management
  generateH1Tag(page: SEOPage, keywords: string[]): string;
  validateH1Uniqueness(pages: SEOPage[]): boolean;
  
  // Meta description management
  generateMetaDescription(page: SEOPage, keywords: string[]): string;
  validateMetaDescriptionLength(description: string): boolean;
  
  // Social media tags
  generateOpenGraphTags(page: SEOPage): Record<string, string>;
  generateTwitterCardTags(page: SEOPage): Record<string, string>;
  
  // Canonical tags
  generateCanonicalTag(page: SEOPage, duplicatePages?: SEOPage[]): string;
  
  // Validation methods
  validateMetaUniqueness(pages: SEOPage[]): boolean;
  
  // Bulk operations
  processMetaUpdates(pages: SEOPage[]): Promise<BulkUpdateResult>;
}

// Content Validator Interface
export interface IContentValidator {
  config: ContentValidatorConfig;
  
  // Content analysis
  analyzeContent(page: SEOPage): ContentAnalysis;
  validateWordCount(content: string): boolean;
  calculateKeywordDensity(content: string, keywords: string[]): Map<string, number>;
  validateKeywordDensity(density: Map<string, number>): boolean;
  
  // Heading structure validation
  validateHeadingStructure(content: string): boolean;
  extractHeadingStructure(content: string): HeadingStructure;
  
  // Location and service content
  validateLocationContent(page: SEOPage): boolean;
  validateServiceContent(page: SEOPage): boolean;
  
  // Duplicate content detection
  detectDuplicateContent(pages: SEOPage[]): Map<string, string[]>;
  
  // Content generation
  generateLocationSpecificContent(location: string, service: string): string;
  generateServiceSpecificContent(service: string): string;
  
  // Bulk operations
  processContentValidation(pages: SEOPage[]): Promise<BulkUpdateResult>;
}

// Performance Optimizer Interface
export interface IPerformanceOptimizer {
  config: PerformanceOptimizerConfig;
  
  // Image optimization
  optimizeImages(page: SEOPage): Promise<void>;
  implementLazyLoading(page: SEOPage): void;
  
  // Bundle optimization
  minimizeCSSBundles(cssFiles: string[]): Promise<string[]>;
  minimizeJSBundles(jsFiles: string[]): Promise<string[]>;
  
  // Core Web Vitals
  measureCoreWebVitals(pageUrl: string): Promise<PerformanceMetrics>;
  validateCoreWebVitals(metrics: PerformanceMetrics): boolean;
  
  // Cache management
  setCacheHeaders(page: SEOPage): Record<string, string>;
  
  // Mobile optimization
  validateMobileOptimization(page: SEOPage): boolean;
  
  // Bulk operations
  processPerformanceOptimization(pages: SEOPage[]): Promise<BulkUpdateResult>;
}

// Sitemap Generator Interface
export interface ISitemapGenerator {
  config: SitemapGeneratorConfig;
  
  // Sitemap generation
  generateXMLSitemap(pages: SEOPage[]): string;
  updateSitemapTimestamps(pages: SEOPage[]): void;
  addNewPagesToSitemap(newPages: SEOPage[]): void;
  
  // Robots.txt management
  generateRobotsTxt(sitemapUrl: string, disallowedPaths?: string[]): string;
  
  // Structured data
  generateStructuredData(page: SEOPage): Record<string, any>;
  validateStructuredData(structuredData: Record<string, any>): boolean;
  
  // Sitemap validation
  validateSitemap(sitemapXml: string): boolean;
  
  // Bulk operations
  processSitemapUpdates(pages: SEOPage[]): Promise<BulkUpdateResult>;
}

// SEO Monitor Interface
export interface ISEOMonitor {
  config: SEOMonitorConfig;
  
  // Health checks
  performHealthCheck(page: SEOPage): SEOHealthCheck;
  performBulkHealthCheck(pages: SEOPage[]): SEOHealthCheck[];
  
  // Issue detection and resolution
  detectSEOIssues(page: SEOPage): SEOIssue[];
  autoFixIssues(issues: SEOIssue[]): Promise<BulkUpdateResult>;
  
  // Alerting
  generateCriticalIssueAlert(issues: SEOIssue[]): string;
  sendAlert(alert: string): Promise<void>;
  
  // Reporting
  generateSEOReport(pages: SEOPage[]): SEOReport;
  generateRecommendations(healthChecks: SEOHealthCheck[]): string[];
  
  // Bulk operations management
  processBulkUpdate(operation: BulkUpdateOperation): Promise<BulkUpdateResult>;
  rollbackBulkUpdate(operationId: string): Promise<BulkUpdateResult>;
  
  // Data integrity
  validateDataIntegrity(pages: SEOPage[]): boolean;
  
  // Monitoring
  startHealthCheckScheduler(): void;
  stopHealthCheckScheduler(): void;
}

// Main SEO System Interface
export interface ISEOSystem {
  linkManager: ILinkManager;
  metaManager: IMetaManager;
  contentValidator: IContentValidator;
  performanceOptimizer: IPerformanceOptimizer;
  sitemapGenerator: ISitemapGenerator;
  seoMonitor: ISEOMonitor;
  
  // System-wide operations
  initialize(config: SEOSystemConfig): Promise<void>;
  processPage(page: SEOPage): Promise<SEOPage>;
  processPages(pages: SEOPage[]): Promise<SEOPage[]>;
  
  // Health and monitoring
  getSystemHealth(): Promise<SEOReport>;
  
  // Configuration management
  updateConfiguration(config: Partial<SEOSystemConfig>): void;
  getConfiguration(): SEOSystemConfig;
}

// System Configuration
export interface SEOSystemConfig {
  linkManager: LinkManagerConfig;
  metaManager: MetaManagerConfig;
  contentValidator: ContentValidatorConfig;
  performanceOptimizer: PerformanceOptimizerConfig;
  sitemapGenerator: SitemapGeneratorConfig;
  seoMonitor: SEOMonitorConfig;
}