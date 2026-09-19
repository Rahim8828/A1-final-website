// Tests for SEO System Configuration

import { describe, it, expect } from 'vitest';
import {
  defaultSEOSystemConfig,
  validateSEOSystemConfig,
  validateLinkManagerConfig,
  validateMetaManagerConfig,
  validateContentValidatorConfig,
  validatePerformanceOptimizerConfig,
  validateSitemapGeneratorConfig,
  validateSEOMonitorConfig,
  mergeSEOSystemConfig
} from './index';

describe('SEO System Configuration', () => {
  describe('Default Configuration', () => {
    it('should have valid default configuration', () => {
      const errors = validateSEOSystemConfig(defaultSEOSystemConfig);
      expect(errors).toEqual([]);
    });

    it('should have correct default values', () => {
      expect(defaultSEOSystemConfig.linkManager.minOutgoingLinks).toBe(3);
      expect(defaultSEOSystemConfig.metaManager.metaDescriptionMinLength).toBe(150);
      expect(defaultSEOSystemConfig.contentValidator.minWordCount).toBe(300);
      expect(defaultSEOSystemConfig.performanceOptimizer.lazyLoadingEnabled).toBe(true);
      expect(defaultSEOSystemConfig.sitemapGenerator.defaultPriority).toBe(0.8);
      expect(defaultSEOSystemConfig.seoMonitor.healthCheckInterval).toBe(24);
    });
  });

  describe('Configuration Validation', () => {
    it('should validate link manager config correctly', () => {
      const validConfig = {
        minOutgoingLinks: 3,
        maxOutgoingLinks: 10,
        contextualRelevanceThreshold: 0.7,
        avoidCircularReferences: true
      };
      expect(validateLinkManagerConfig(validConfig)).toEqual([]);

      const invalidConfig = {
        minOutgoingLinks: -1,
        maxOutgoingLinks: 2,
        contextualRelevanceThreshold: 1.5,
        avoidCircularReferences: true
      };
      const errors = validateLinkManagerConfig(invalidConfig);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('minOutgoingLinks must be non-negative');
      expect(errors).toContain('contextualRelevanceThreshold must be between 0 and 1');
      // Note: maxOutgoingLinks validation only triggers when minOutgoingLinks is valid
    });

    it('should validate meta manager config correctly', () => {
      const validConfig = {
        metaDescriptionMinLength: 150,
        metaDescriptionMaxLength: 160,
        h1KeywordRequirement: true,
        socialMediaTagsRequired: true
      };
      expect(validateMetaManagerConfig(validConfig)).toEqual([]);

      const invalidConfig = {
        metaDescriptionMinLength: -1,
        metaDescriptionMaxLength: 100,
        h1KeywordRequirement: true,
        socialMediaTagsRequired: true
      };
      const errors = validateMetaManagerConfig(invalidConfig);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate content validator config correctly', () => {
      const validConfig = {
        minWordCount: 300,
        keywordDensityMin: 0.01,
        keywordDensityMax: 0.03,
        headingStructureRequired: true,
        locationInfoRequired: true
      };
      expect(validateContentValidatorConfig(validConfig)).toEqual([]);

      const invalidConfig = {
        minWordCount: -1,
        keywordDensityMin: -0.1,
        keywordDensityMax: 1.5,
        headingStructureRequired: true,
        locationInfoRequired: true
      };
      const errors = validateContentValidatorConfig(invalidConfig);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('Configuration Merging', () => {
    it('should merge configurations correctly', () => {
      const overrides = {
        linkManager: {
          minOutgoingLinks: 5
        },
        contentValidator: {
          minWordCount: 500
        }
      };

      const merged = mergeSEOSystemConfig(defaultSEOSystemConfig, overrides);
      
      expect(merged.linkManager.minOutgoingLinks).toBe(5);
      expect(merged.linkManager.maxOutgoingLinks).toBe(defaultSEOSystemConfig.linkManager.maxOutgoingLinks);
      expect(merged.contentValidator.minWordCount).toBe(500);
      expect(merged.metaManager).toEqual(defaultSEOSystemConfig.metaManager);
    });
  });
});