// SEO System Configuration

import {
  SEOSystemConfig,
  LinkManagerConfig,
  MetaManagerConfig,
  ContentValidatorConfig,
  PerformanceOptimizerConfig,
  SitemapGeneratorConfig,
  SEOMonitorConfig
} from '../types';

// Default Link Manager Configuration
export const defaultLinkManagerConfig: LinkManagerConfig = {
  minOutgoingLinks: 3,
  maxOutgoingLinks: 10,
  contextualRelevanceThreshold: 0.7,
  avoidCircularReferences: true
};

// Default Meta Manager Configuration
export const defaultMetaManagerConfig: MetaManagerConfig = {
  metaDescriptionMinLength: 150,
  metaDescriptionMaxLength: 160,
  h1KeywordRequirement: true,
  socialMediaTagsRequired: true
};

// Default Content Validator Configuration
export const defaultContentValidatorConfig: ContentValidatorConfig = {
  minWordCount: 300,
  keywordDensityMin: 0.01, // 1%
  keywordDensityMax: 0.03, // 3%
  headingStructureRequired: true,
  locationInfoRequired: true
};

// Default Performance Optimizer Configuration
export const defaultPerformanceOptimizerConfig: PerformanceOptimizerConfig = {
  lazyLoadingEnabled: true,
  bundleMinificationEnabled: true,
  coreWebVitalsThresholds: {
    lcp: 2.5, // Largest Contentful Paint (seconds)
    fid: 0.1, // First Input Delay (seconds)
    cls: 0.1  // Cumulative Layout Shift
  },
  cacheHeadersEnabled: true
};

// Default Sitemap Generator Configuration
export const defaultSitemapGeneratorConfig: SitemapGeneratorConfig = {
  includeLastModified: true,
  defaultPriority: 0.8,
  defaultChangeFreq: 'weekly',
  robotsTxtEnabled: true,
  structuredDataEnabled: true
};

// Default SEO Monitor Configuration
export const defaultSEOMonitorConfig: SEOMonitorConfig = {
  healthCheckInterval: 24, // hours
  autoFixEnabled: true,
  alertingEnabled: true,
  bulkUpdateBatchSize: 50,
  rollbackEnabled: true
};

// Complete Default SEO System Configuration
export const defaultSEOSystemConfig: SEOSystemConfig = {
  linkManager: defaultLinkManagerConfig,
  metaManager: defaultMetaManagerConfig,
  contentValidator: defaultContentValidatorConfig,
  performanceOptimizer: defaultPerformanceOptimizerConfig,
  sitemapGenerator: defaultSitemapGeneratorConfig,
  seoMonitor: defaultSEOMonitorConfig
};

// Configuration validation functions
export function validateLinkManagerConfig(config: LinkManagerConfig): string[] {
  const errors: string[] = [];
  
  if (config.minOutgoingLinks < 0) {
    errors.push('minOutgoingLinks must be non-negative');
  }
  
  if (config.maxOutgoingLinks < config.minOutgoingLinks) {
    errors.push('maxOutgoingLinks must be greater than or equal to minOutgoingLinks');
  }
  
  if (config.contextualRelevanceThreshold < 0 || config.contextualRelevanceThreshold > 1) {
    errors.push('contextualRelevanceThreshold must be between 0 and 1');
  }
  
  return errors;
}

export function validateMetaManagerConfig(config: MetaManagerConfig): string[] {
  const errors: string[] = [];
  
  if (config.metaDescriptionMinLength < 0) {
    errors.push('metaDescriptionMinLength must be non-negative');
  }
  
  if (config.metaDescriptionMaxLength < config.metaDescriptionMinLength) {
    errors.push('metaDescriptionMaxLength must be greater than or equal to metaDescriptionMinLength');
  }
  
  return errors;
}

export function validateContentValidatorConfig(config: ContentValidatorConfig): string[] {
  const errors: string[] = [];
  
  if (config.minWordCount < 0) {
    errors.push('minWordCount must be non-negative');
  }
  
  if (config.keywordDensityMin < 0 || config.keywordDensityMin > 1) {
    errors.push('keywordDensityMin must be between 0 and 1');
  }
  
  if (config.keywordDensityMax < config.keywordDensityMin || config.keywordDensityMax > 1) {
    errors.push('keywordDensityMax must be between keywordDensityMin and 1');
  }
  
  return errors;
}

export function validatePerformanceOptimizerConfig(config: PerformanceOptimizerConfig): string[] {
  const errors: string[] = [];
  
  if (config.coreWebVitalsThresholds.lcp <= 0) {
    errors.push('LCP threshold must be positive');
  }
  
  if (config.coreWebVitalsThresholds.fid <= 0) {
    errors.push('FID threshold must be positive');
  }
  
  if (config.coreWebVitalsThresholds.cls < 0) {
    errors.push('CLS threshold must be non-negative');
  }
  
  return errors;
}

export function validateSitemapGeneratorConfig(config: SitemapGeneratorConfig): string[] {
  const errors: string[] = [];
  
  if (config.defaultPriority < 0 || config.defaultPriority > 1) {
    errors.push('defaultPriority must be between 0 and 1');
  }
  
  const validChangeFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  if (!validChangeFreqs.includes(config.defaultChangeFreq)) {
    errors.push(`defaultChangeFreq must be one of: ${validChangeFreqs.join(', ')}`);
  }
  
  return errors;
}

export function validateSEOMonitorConfig(config: SEOMonitorConfig): string[] {
  const errors: string[] = [];
  
  if (config.healthCheckInterval <= 0) {
    errors.push('healthCheckInterval must be positive');
  }
  
  if (config.bulkUpdateBatchSize <= 0) {
    errors.push('bulkUpdateBatchSize must be positive');
  }
  
  return errors;
}

export function validateSEOSystemConfig(config: SEOSystemConfig): string[] {
  const errors: string[] = [];
  
  errors.push(...validateLinkManagerConfig(config.linkManager));
  errors.push(...validateMetaManagerConfig(config.metaManager));
  errors.push(...validateContentValidatorConfig(config.contentValidator));
  errors.push(...validatePerformanceOptimizerConfig(config.performanceOptimizer));
  errors.push(...validateSitemapGeneratorConfig(config.sitemapGenerator));
  errors.push(...validateSEOMonitorConfig(config.seoMonitor));
  
  return errors;
}

// Configuration merging utility
export function mergeSEOSystemConfig(
  baseConfig: SEOSystemConfig,
  overrides: Partial<SEOSystemConfig>
): SEOSystemConfig {
  return {
    linkManager: { ...baseConfig.linkManager, ...overrides.linkManager },
    metaManager: { ...baseConfig.metaManager, ...overrides.metaManager },
    contentValidator: { ...baseConfig.contentValidator, ...overrides.contentValidator },
    performanceOptimizer: { ...baseConfig.performanceOptimizer, ...overrides.performanceOptimizer },
    sitemapGenerator: { ...baseConfig.sitemapGenerator, ...overrides.sitemapGenerator },
    seoMonitor: { ...baseConfig.seoMonitor, ...overrides.seoMonitor }
  };
}