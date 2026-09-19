// Core SEO Management System Types

export interface SEOPage {
  url: string;
  title: string;
  metaDescription: string;
  h1Tag?: string;
  wordCount?: number;
  internalLinks?: Link[];
  outgoingLinks?: Link[];
  canonicalUrl?: string;
  openGraphTags?: OpenGraphData;
  twitterCardTags?: TwitterCardData;
  structuredData?: SchemaMarkup;
  lastModified: Date;
  seoScore?: number;
  // Sitemap-specific fields
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export interface Link {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  linkType: 'internal' | 'external';
  isNoFollow: boolean;
  context: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image: string;
  site?: string;
  creator?: string;
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SEOIssue {
  pageUrl: string;
  issueType: 'missing_h1' | 'low_word_count' | 'missing_meta' | 'orphan_page' | 'slow_loading' | 'duplicate_content' | 'missing_canonical' | 'poor_keyword_density';
  severity: 'critical' | 'warning' | 'info';
  description: string;
  autoFixable: boolean;
  fixAction?: string;
}

export interface SEOHealthCheck {
  pageUrl: string;
  timestamp: Date;
  issues: SEOIssue[];
  score: number;
  recommendations: string[];
}

export interface SEOReport {
  generatedAt: Date;
  totalPages: number;
  healthChecks: SEOHealthCheck[];
  overallScore: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  recommendations: string[];
}

// Manager Interface Types

export interface LinkManagerConfig {
  minOutgoingLinks: number;
  maxOutgoingLinks: number;
  contextualRelevanceThreshold: number;
  avoidCircularReferences: boolean;
}

export interface MetaManagerConfig {
  metaDescriptionMinLength: number;
  metaDescriptionMaxLength: number;
  h1KeywordRequirement: boolean;
  socialMediaTagsRequired: boolean;
}

export interface ContentValidatorConfig {
  minWordCount: number;
  keywordDensityMin: number;
  keywordDensityMax: number;
  headingStructureRequired: boolean;
  locationInfoRequired: boolean;
}

export interface PerformanceOptimizerConfig {
  lazyLoadingEnabled: boolean;
  bundleMinificationEnabled: boolean;
  coreWebVitalsThresholds: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  cacheHeadersEnabled: boolean;
}

export interface SitemapGeneratorConfig {
  includeLastModified: boolean;
  defaultPriority: number;
  defaultChangeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  robotsTxtEnabled: boolean;
  structuredDataEnabled: boolean;
}

export interface SEOMonitorConfig {
  healthCheckInterval: number; // in hours
  autoFixEnabled: boolean;
  alertingEnabled: boolean;
  bulkUpdateBatchSize: number;
  rollbackEnabled: boolean;
}

export interface SEOSystemConfig {
  linkManager: LinkManagerConfig;
  metaManager: MetaManagerConfig;
  contentValidator: ContentValidatorConfig;
  performanceOptimizer: PerformanceOptimizerConfig;
  sitemapGenerator: SitemapGeneratorConfig;
  seoMonitor: SEOMonitorConfig;
}

// Analysis and Processing Types

export interface LinkAnalysis {
  totalInternalLinks: number;
  totalOutgoingLinks: number;
  orphanPages: string[];
  circularReferences: string[];
  brokenLinks: string[];
  anchorTextDistribution: Map<string, number>;
}

export interface ContentAnalysis {
  wordCount: number;
  keywordDensity: Map<string, number>;
  headingStructure: HeadingStructure;
  readabilityScore: number;
  duplicateContentScore: number;
}

export interface HeadingStructure {
  h1: string[];
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Bulk Operations Types

export interface BulkUpdateOperation {
  id: string;
  type: 'meta_update' | 'link_update' | 'content_update' | 'performance_update';
  pages: string[];
  changes: Record<string, any>;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  createdAt: Date;
  completedAt?: Date;
  errors?: string[];
}

export interface BulkUpdateResult {
  operationId: string;
  successfulPages: string[];
  failedPages: string[];
  errors: Record<string, string>;
  rollbackAvailable: boolean;
}