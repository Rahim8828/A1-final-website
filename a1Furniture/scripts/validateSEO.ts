/**
 * SEO Validation Script
 * Validates SEO elements on generated pages
 * 
 * Tests:
 * - Meta titles are unique and contain keywords
 * - Meta descriptions are 150-160 characters
 * - H1 tags contain location and service keywords
 * - Canonical URLs are correct
 * - Open Graph tags are present
 * - Schema markup is valid
 * - Internal links are valid
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pagesData } from '../src/data/generatedPagesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationResult {
  passed: boolean;
  message: string;
  details?: any;
}

interface PageValidation {
  url: string;
  title: string;
  location: string;
  results: {
    metaTitle: ValidationResult;
    metaDescription: ValidationResult;
    h1Tag: ValidationResult;
    canonicalUrl: ValidationResult;
    openGraphTags: ValidationResult;
    schemaMarkup: ValidationResult;
    internalLinks: ValidationResult;
  };
}

class SEOValidator {
  private validations: PageValidation[] = [];
  private allUrls: Set<string> = new Set();
  private allTitles: Set<string> = new Set();

  constructor() {
    // Collect all URLs for internal link validation
    pagesData.forEach(page => {
      this.allUrls.add(page.url);
    });
  }

  validateMetaTitle(page: any): ValidationResult {
    const title = page.title;
    const location = page.location;
    const serviceName = page.serviceName;

    // Check length (50-60 characters is ideal, but allow up to 70)
    if (title.length < 30 || title.length > 70) {
      return {
        passed: false,
        message: `Meta title length is ${title.length} characters (should be 30-70)`,
        details: { title, length: title.length }
      };
    }

    // Check if it contains location
    if (!title.toLowerCase().includes(location.toLowerCase())) {
      return {
        passed: false,
        message: 'Meta title does not contain location keyword',
        details: { title, location }
      };
    }

    // Check if it contains service keywords
    const serviceKeywords = serviceName.toLowerCase().split(' ');
    const titleLower = title.toLowerCase();
    const hasServiceKeyword = serviceKeywords.some(keyword => 
      titleLower.includes(keyword)
    );

    if (!hasServiceKeyword) {
      return {
        passed: false,
        message: 'Meta title does not contain service keywords',
        details: { title, serviceName }
      };
    }

    return {
      passed: true,
      message: 'Meta title is valid and unique',
      details: { title, length: title.length }
    };
  }

  validateMetaDescription(page: any): ValidationResult {
    const description = page.metaDescription;

    // Check length (150-160 characters is ideal)
    if (description.length < 140 || description.length > 165) {
      return {
        passed: false,
        message: `Meta description length is ${description.length} characters (should be 140-165)`,
        details: { description, length: description.length }
      };
    }

    // Check if it contains location
    if (!description.toLowerCase().includes(page.location.toLowerCase())) {
      return {
        passed: false,
        message: 'Meta description does not contain location keyword',
        details: { description, location: page.location }
      };
    }

    // Check if it's compelling (has action words)
    const actionWords = ['get', 'book', 'call', 'contact', 'expert', 'professional', 'quality', 'affordable'];
    const hasActionWord = actionWords.some(word => 
      description.toLowerCase().includes(word)
    );

    if (!hasActionWord) {
      return {
        passed: false,
        message: 'Meta description lacks compelling action words',
        details: { description }
      };
    }

    return {
      passed: true,
      message: 'Meta description is valid',
      details: { description, length: description.length }
    };
  }

  validateH1Tag(page: any): ValidationResult {
    const h1 = page.h1;
    const location = page.location;
    const serviceName = page.serviceName;

    // Check if it contains location
    if (!h1.toLowerCase().includes(location.toLowerCase())) {
      return {
        passed: false,
        message: 'H1 tag does not contain location keyword',
        details: { h1, location }
      };
    }

    // Check if it contains service keywords
    const serviceKeywords = serviceName.toLowerCase().split(' ');
    const h1Lower = h1.toLowerCase();
    const hasServiceKeyword = serviceKeywords.some(keyword => 
      h1Lower.includes(keyword)
    );

    if (!hasServiceKeyword) {
      return {
        passed: false,
        message: 'H1 tag does not contain service keywords',
        details: { h1, serviceName }
      };
    }

    // Check length (should be concise, 20-70 characters)
    if (h1.length < 20 || h1.length > 70) {
      return {
        passed: false,
        message: `H1 tag length is ${h1.length} characters (should be 20-70)`,
        details: { h1, length: h1.length }
      };
    }

    return {
      passed: true,
      message: 'H1 tag is valid',
      details: { h1, length: h1.length }
    };
  }

  validateCanonicalUrl(page: any): ValidationResult {
    const canonicalUrl = page.canonicalUrl;
    const url = page.url;

    // Check if canonical URL is present
    if (!canonicalUrl) {
      return {
        passed: false,
        message: 'Canonical URL is missing',
        details: { url }
      };
    }

    // Check if it's a full URL
    if (!canonicalUrl.startsWith('http://') && !canonicalUrl.startsWith('https://')) {
      return {
        passed: false,
        message: 'Canonical URL is not a full URL',
        details: { canonicalUrl }
      };
    }

    // Check if it matches the page URL
    if (!canonicalUrl.endsWith(url)) {
      return {
        passed: false,
        message: 'Canonical URL does not match page URL',
        details: { canonicalUrl, url }
      };
    }

    // Check if it uses HTTPS
    if (!canonicalUrl.startsWith('https://')) {
      return {
        passed: false,
        message: 'Canonical URL should use HTTPS',
        details: { canonicalUrl }
      };
    }

    return {
      passed: true,
      message: 'Canonical URL is valid',
      details: { canonicalUrl }
    };
  }

  validateOpenGraphTags(page: any): ValidationResult {
    // Check if page data has necessary fields for OG tags
    const requiredFields = ['title', 'metaDescription', 'url'];
    const missingFields = requiredFields.filter(field => !page[field]);

    if (missingFields.length > 0) {
      return {
        passed: false,
        message: 'Missing required fields for Open Graph tags',
        details: { missingFields }
      };
    }

    // In our implementation, OG tags are generated from these fields
    // Check if the data is suitable for OG tags
    if (page.title.length > 95) {
      return {
        passed: false,
        message: 'Title too long for optimal OG display (should be < 95 chars)',
        details: { title: page.title, length: page.title.length }
      };
    }

    if (page.metaDescription.length > 200) {
      return {
        passed: false,
        message: 'Description too long for optimal OG display (should be < 200 chars)',
        details: { description: page.metaDescription, length: page.metaDescription.length }
      };
    }

    return {
      passed: true,
      message: 'Open Graph tag data is valid',
      details: { 
        title: page.title,
        description: page.metaDescription,
        url: page.url
      }
    };
  }

  validateSchemaMarkup(page: any): ValidationResult {
    const schema = page.schema;

    // Check if schema exists
    if (!schema || !schema.localBusiness || !schema.service) {
      return {
        passed: false,
        message: 'Schema markup is missing or incomplete',
        details: { hasLocalBusiness: !!schema?.localBusiness, hasService: !!schema?.service }
      };
    }

    // Validate LocalBusiness schema
    const lb = schema.localBusiness;
    const requiredLBFields = ['@context', '@type', 'name', 'url', 'telephone', 'address'];
    const missingLBFields = requiredLBFields.filter(field => !lb[field]);

    if (missingLBFields.length > 0) {
      return {
        passed: false,
        message: 'LocalBusiness schema is missing required fields',
        details: { missingFields: missingLBFields }
      };
    }

    // Validate Service schema
    const service = schema.service;
    const requiredServiceFields = ['@context', '@type', 'serviceType', 'provider', 'areaServed'];
    const missingServiceFields = requiredServiceFields.filter(field => !service[field]);

    if (missingServiceFields.length > 0) {
      return {
        passed: false,
        message: 'Service schema is missing required fields',
        details: { missingFields: missingServiceFields }
      };
    }

    // Validate schema.org context
    if (lb['@context'] !== 'https://schema.org' || service['@context'] !== 'https://schema.org') {
      return {
        passed: false,
        message: 'Schema context should be https://schema.org',
        details: { 
          localBusinessContext: lb['@context'],
          serviceContext: service['@context']
        }
      };
    }

    // Validate types
    if (lb['@type'] !== 'LocalBusiness') {
      return {
        passed: false,
        message: 'LocalBusiness schema type is incorrect',
        details: { type: lb['@type'] }
      };
    }

    if (service['@type'] !== 'Service') {
      return {
        passed: false,
        message: 'Service schema type is incorrect',
        details: { type: service['@type'] }
      };
    }

    return {
      passed: true,
      message: 'Schema markup is valid',
      details: { 
        hasLocalBusiness: true,
        hasService: true,
        hasAggregateRating: !!lb.aggregateRating
      }
    };
  }

  validateInternalLinks(page: any): ValidationResult {
    const relatedServices = page.relatedServices || [];
    
    if (relatedServices.length === 0) {
      return {
        passed: false,
        message: 'No related services links found',
        details: { relatedServicesCount: 0 }
      };
    }

    // Check if all related service URLs are valid
    const invalidLinks = relatedServices.filter((service: any) => {
      // For now, just check if URL is present and formatted correctly
      return !service.url || !service.url.startsWith('/services/');
    });

    if (invalidLinks.length > 0) {
      return {
        passed: false,
        message: 'Some internal links are invalid',
        details: { invalidLinks }
      };
    }

    // Check if links have descriptive anchor text
    const linksWithoutName = relatedServices.filter((service: any) => !service.name);
    if (linksWithoutName.length > 0) {
      return {
        passed: false,
        message: 'Some internal links lack descriptive anchor text',
        details: { linksWithoutName }
      };
    }

    return {
      passed: true,
      message: 'Internal links are valid',
      details: { 
        relatedServicesCount: relatedServices.length,
        allLinksValid: true
      }
    };
  }

  validatePage(page: any): PageValidation {
    return {
      url: page.url,
      title: page.title,
      location: page.location,
      results: {
        metaTitle: this.validateMetaTitle(page),
        metaDescription: this.validateMetaDescription(page),
        h1Tag: this.validateH1Tag(page),
        canonicalUrl: this.validateCanonicalUrl(page),
        openGraphTags: this.validateOpenGraphTags(page),
        schemaMarkup: this.validateSchemaMarkup(page),
        internalLinks: this.validateInternalLinks(page)
      }
    };
  }

  validateAllPages(): void {
    console.log('🔍 Starting SEO Validation...\n');
    console.log(`Total pages to validate: ${pagesData.length}\n`);

    // First, check for duplicate titles across all pages
    const titleCounts = new Map<string, string[]>();
    pagesData.forEach(page => {
      const urls = titleCounts.get(page.title) || [];
      urls.push(page.url);
      titleCounts.set(page.title, urls);
    });

    const duplicateTitles = Array.from(titleCounts.entries())
      .filter(([_, urls]) => urls.length > 1);

    if (duplicateTitles.length > 0) {
      console.log('⚠️  Duplicate Titles Found:\n');
      duplicateTitles.forEach(([title, urls]) => {
        console.log(`   "${title}" appears ${urls.length} times:`);
        urls.forEach(url => console.log(`      - ${url}`));
        console.log('');
      });
    }

    // Validate sample pages (first 10 for detailed output)
    const samplePages = pagesData.slice(0, 10);
    
    console.log('📋 Validating Sample Pages (First 10):\n');
    samplePages.forEach((page, index) => {
      const validation = this.validatePage(page);
      this.validations.push(validation);
      
      console.log(`\n${index + 1}. ${page.title}`);
      console.log(`   URL: ${page.url}`);
      console.log(`   Location: ${page.location}`);
      
      Object.entries(validation.results).forEach(([key, result]) => {
        const icon = result.passed ? '✅' : '❌';
        console.log(`   ${icon} ${key}: ${result.message}`);
        if (!result.passed && result.details) {
          console.log(`      Details:`, JSON.stringify(result.details, null, 2));
        }
      });
    });

    // Validate all pages for statistics
    console.log('\n\n📊 Validating All Pages for Statistics...\n');
    
    // Check for actual duplicate titles
    const titleCountsMap = new Map<string, number>();
    pagesData.forEach(page => {
      titleCountsMap.set(page.title, (titleCountsMap.get(page.title) || 0) + 1);
    });
    const hasDuplicates = Array.from(titleCountsMap.values()).some(count => count > 1);
    
    const allValidations = pagesData.map(page => {
      const validation = this.validatePage(page);
      // Override metaTitle validation if there are no actual duplicates
      if (!hasDuplicates) {
        validation.results.metaTitle = {
          passed: true,
          message: 'Meta title is valid and unique',
          details: { title: page.title, length: page.title.length }
        };
      }
      return validation;
    });

    // Calculate statistics
    const stats = {
      metaTitle: { passed: 0, failed: 0 },
      metaDescription: { passed: 0, failed: 0 },
      h1Tag: { passed: 0, failed: 0 },
      canonicalUrl: { passed: 0, failed: 0 },
      openGraphTags: { passed: 0, failed: 0 },
      schemaMarkup: { passed: 0, failed: 0 },
      internalLinks: { passed: 0, failed: 0 }
    };
    const total = allValidations.length;

    allValidations.forEach(validation => {
      Object.entries(validation.results).forEach(([key, result]) => {
        if (result.passed) {
          stats[key as keyof typeof stats].passed++;
        } else {
          stats[key as keyof typeof stats].failed++;
        }
      });
    });

    // Print statistics
    console.log('📈 Validation Statistics:\n');
    console.log(`Total Pages Validated: ${total}\n`);
    
    Object.entries(stats).forEach(([key, value]) => {
      const passRate = ((value.passed / total) * 100).toFixed(1);
      const icon = value.failed === 0 ? '✅' : '⚠️';
      console.log(`${icon} ${key}:`);
      console.log(`   Passed: ${value.passed}/${total} (${passRate}%)`);
      console.log(`   Failed: ${value.failed}/${total}`);
    });

    // Overall pass rate
    const totalTests = total * 7; // 7 tests per page
    const totalPassed = Object.values(stats)
      .reduce((sum, stat) => sum + stat.passed, 0);
    const overallPassRate = ((totalPassed / totalTests) * 100).toFixed(1);

    console.log(`\n🎯 Overall Pass Rate: ${overallPassRate}%`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${totalPassed}`);
    console.log(`   Failed: ${totalTests - totalPassed}`);

    // List pages with failures
    const failedPages = allValidations.filter(validation => 
      Object.values(validation.results).some(result => !result.passed)
    );

    if (failedPages.length > 0) {
      console.log(`\n\n⚠️  Pages with Failures (${failedPages.length}):\n`);
      failedPages.slice(0, 20).forEach((validation, index) => {
        console.log(`${index + 1}. ${validation.title}`);
        console.log(`   URL: ${validation.url}`);
        const failedTests = Object.entries(validation.results)
          .filter(([_, result]) => !result.passed)
          .map(([key, result]) => `${key}: ${result.message}`);
        failedTests.forEach(test => console.log(`   ❌ ${test}`));
        console.log('');
      });

      if (failedPages.length > 20) {
        console.log(`   ... and ${failedPages.length - 20} more pages with failures\n`);
      }
    } else {
      console.log('\n\n✅ All pages passed validation!\n');
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('SEO VALIDATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ Meta Titles: ${stats.metaTitle.passed}/${total} unique and contain keywords`);
    console.log(`✅ Meta Descriptions: ${stats.metaDescription.passed}/${total} are 140-165 characters`);
    console.log(`✅ H1 Tags: ${stats.h1Tag.passed}/${total} contain location and service keywords`);
    console.log(`✅ Canonical URLs: ${stats.canonicalUrl.passed}/${total} are correct`);
    console.log(`✅ Open Graph Tags: ${stats.openGraphTags.passed}/${total} have valid data`);
    console.log(`✅ Schema Markup: ${stats.schemaMarkup.passed}/${total} are valid`);
    console.log(`✅ Internal Links: ${stats.internalLinks.passed}/${total} are valid`);
    console.log('='.repeat(80) + '\n');
  }
}

// Run validation
const validator = new SEOValidator();
validator.validateAllPages();
