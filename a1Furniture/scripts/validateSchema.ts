/**
 * Schema Markup Validation Script
 * Validates JSON-LD schema markup against schema.org specifications
 * 
 * Tests:
 * - LocalBusiness schema is valid
 * - Service schema is valid
 * - All required fields are present
 * - Data types are correct
 * - Nested objects are properly structured
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pagesData } from '../src/data/generatedPagesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SchemaValidationResult {
  passed: boolean;
  message: string;
  errors?: string[];
  warnings?: string[];
}

interface PageSchemaValidation {
  url: string;
  title: string;
  localBusinessValidation: SchemaValidationResult;
  serviceValidation: SchemaValidationResult;
}

class SchemaValidator {
  private validations: PageSchemaValidation[] = [];

  validateLocalBusinessSchema(schema: any, page: any): SchemaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields according to schema.org LocalBusiness
    const requiredFields = {
      '@context': 'string',
      '@type': 'string',
      'name': 'string',
      'url': 'string',
      'telephone': 'string',
      'address': 'object'
    };

    // Check required fields
    for (const [field, expectedType] of Object.entries(requiredFields)) {
      if (!schema[field]) {
        errors.push(`Missing required field: ${field}`);
      } else {
        const actualType = typeof schema[field];
        if (actualType !== expectedType) {
          errors.push(`Field ${field} should be ${expectedType}, got ${actualType}`);
        }
      }
    }

    // Validate @context
    if (schema['@context'] && schema['@context'] !== 'https://schema.org') {
      errors.push(`@context should be "https://schema.org", got "${schema['@context']}"`);
    }

    // Validate @type
    if (schema['@type'] && schema['@type'] !== 'LocalBusiness') {
      errors.push(`@type should be "LocalBusiness", got "${schema['@type']}"`);
    }

    // Validate address structure
    if (schema.address) {
      const address = schema.address;
      const requiredAddressFields = ['@type', 'addressLocality', 'addressRegion', 'addressCountry'];
      
      for (const field of requiredAddressFields) {
        if (!address[field]) {
          errors.push(`Address missing required field: ${field}`);
        }
      }

      if (address['@type'] && address['@type'] !== 'PostalAddress') {
        errors.push(`Address @type should be "PostalAddress", got "${address['@type']}"`);
      }

      // Validate address locality matches page location
      if (address.addressLocality && !address.addressLocality.includes(page.location)) {
        warnings.push(`Address locality "${address.addressLocality}" doesn't match page location "${page.location}"`);
      }
    }

    // Validate geo coordinates (optional but recommended)
    if (schema.geo) {
      const geo = schema.geo;
      if (!geo['@type'] || geo['@type'] !== 'GeoCoordinates') {
        errors.push(`Geo @type should be "GeoCoordinates", got "${geo['@type']}"`);
      }
      if (typeof geo.latitude !== 'number') {
        errors.push(`Geo latitude should be a number, got ${typeof geo.latitude}`);
      }
      if (typeof geo.longitude !== 'number') {
        errors.push(`Geo longitude should be a number, got ${typeof geo.longitude}`);
      }
    } else {
      warnings.push('Geo coordinates not provided (recommended for local businesses)');
    }

    // Validate opening hours (optional but recommended)
    if (schema.openingHoursSpecification) {
      const hours = schema.openingHoursSpecification;
      if (!hours['@type'] || hours['@type'] !== 'OpeningHoursSpecification') {
        errors.push(`OpeningHoursSpecification @type is incorrect`);
      }
      if (!hours.dayOfWeek || !Array.isArray(hours.dayOfWeek)) {
        errors.push(`OpeningHoursSpecification should have dayOfWeek array`);
      }
      if (!hours.opens || !hours.closes) {
        errors.push(`OpeningHoursSpecification should have opens and closes times`);
      }
    } else {
      warnings.push('Opening hours not provided (recommended for local businesses)');
    }

    // Validate aggregate rating (optional but good for SEO)
    if (schema.aggregateRating) {
      const rating = schema.aggregateRating;
      if (!rating['@type'] || rating['@type'] !== 'AggregateRating') {
        errors.push(`AggregateRating @type is incorrect`);
      }
      if (!rating.ratingValue) {
        errors.push(`AggregateRating missing ratingValue`);
      }
      if (!rating.reviewCount) {
        errors.push(`AggregateRating missing reviewCount`);
      }
      // Validate rating value is in valid range
      if (rating.ratingValue) {
        const ratingNum = parseFloat(rating.ratingValue);
        if (ratingNum < 0 || ratingNum > 5) {
          errors.push(`AggregateRating ratingValue should be between 0 and 5, got ${ratingNum}`);
        }
      }
    } else {
      warnings.push('Aggregate rating not provided (recommended for credibility)');
    }

    // Validate URL matches page
    if (schema.url && !schema.url.includes(page.url)) {
      errors.push(`Schema URL "${schema.url}" doesn't match page URL "${page.url}"`);
    }

    return {
      passed: errors.length === 0,
      message: errors.length === 0 
        ? 'LocalBusiness schema is valid' 
        : `LocalBusiness schema has ${errors.length} error(s)`,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }

  validateServiceSchema(schema: any, page: any): SchemaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields according to schema.org Service
    const requiredFields = {
      '@context': 'string',
      '@type': 'string',
      'serviceType': 'string',
      'provider': 'object',
      'areaServed': 'object'
    };

    // Check required fields
    for (const [field, expectedType] of Object.entries(requiredFields)) {
      if (!schema[field]) {
        errors.push(`Missing required field: ${field}`);
      } else {
        const actualType = typeof schema[field];
        if (actualType !== expectedType) {
          errors.push(`Field ${field} should be ${expectedType}, got ${actualType}`);
        }
      }
    }

    // Validate @context
    if (schema['@context'] && schema['@context'] !== 'https://schema.org') {
      errors.push(`@context should be "https://schema.org", got "${schema['@context']}"`);
    }

    // Validate @type
    if (schema['@type'] && schema['@type'] !== 'Service') {
      errors.push(`@type should be "Service", got "${schema['@type']}"`);
    }

    // Validate serviceType matches page
    if (schema.serviceType && !schema.serviceType.includes(page.serviceName.split(' ').slice(-2).join(' '))) {
      warnings.push(`Service type "${schema.serviceType}" may not match page service "${page.serviceName}"`);
    }

    // Validate provider
    if (schema.provider) {
      const provider = schema.provider;
      if (!provider['@type'] || provider['@type'] !== 'LocalBusiness') {
        errors.push(`Provider @type should be "LocalBusiness", got "${provider['@type']}"`);
      }
      if (!provider.name) {
        errors.push(`Provider missing name`);
      }
    }

    // Validate areaServed
    if (schema.areaServed) {
      const area = schema.areaServed;
      if (!area['@type'] || area['@type'] !== 'City') {
        errors.push(`AreaServed @type should be "City", got "${area['@type']}"`);
      }
      if (!area.name) {
        errors.push(`AreaServed missing name`);
      }
      // Check if area matches page location
      if (area.name && area.name !== page.location) {
        warnings.push(`AreaServed name "${area.name}" doesn't match page location "${page.location}"`);
      }
    }

    // Validate hasOfferCatalog (optional but recommended)
    if (schema.hasOfferCatalog) {
      const catalog = schema.hasOfferCatalog;
      if (!catalog['@type'] || catalog['@type'] !== 'OfferCatalog') {
        errors.push(`HasOfferCatalog @type should be "OfferCatalog", got "${catalog['@type']}"`);
      }
      if (!catalog.name) {
        errors.push(`HasOfferCatalog missing name`);
      }
      if (!catalog.itemListElement || !Array.isArray(catalog.itemListElement)) {
        errors.push(`HasOfferCatalog should have itemListElement array`);
      } else {
        // Validate each offer
        catalog.itemListElement.forEach((item: any, index: number) => {
          if (!item['@type'] || item['@type'] !== 'Offer') {
            errors.push(`Offer ${index} @type should be "Offer"`);
          }
          if (!item.itemOffered) {
            errors.push(`Offer ${index} missing itemOffered`);
          } else {
            if (!item.itemOffered['@type'] || item.itemOffered['@type'] !== 'Service') {
              errors.push(`Offer ${index} itemOffered @type should be "Service"`);
            }
            if (!item.itemOffered.name) {
              errors.push(`Offer ${index} itemOffered missing name`);
            }
          }
        });
      }
    } else {
      warnings.push('Offer catalog not provided (recommended for service listings)');
    }

    return {
      passed: errors.length === 0,
      message: errors.length === 0 
        ? 'Service schema is valid' 
        : `Service schema has ${errors.length} error(s)`,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }

  validatePage(page: any): PageSchemaValidation {
    const schema = page.schema;

    return {
      url: page.url,
      title: page.title,
      localBusinessValidation: this.validateLocalBusinessSchema(schema.localBusiness, page),
      serviceValidation: this.validateServiceSchema(schema.service, page)
    };
  }

  validateAllPages(): void {
    console.log('🔍 Starting Schema Markup Validation...\n');
    console.log(`Total pages to validate: ${pagesData.length}\n`);

    // Validate sample pages (first 5 for detailed output)
    const samplePages = pagesData.slice(0, 5);
    
    console.log('📋 Validating Sample Pages (First 5):\n');
    samplePages.forEach((page, index) => {
      const validation = this.validatePage(page);
      this.validations.push(validation);
      
      console.log(`\n${index + 1}. ${page.title}`);
      console.log(`   URL: ${page.url}`);
      
      // LocalBusiness validation
      const lbIcon = validation.localBusinessValidation.passed ? '✅' : '❌';
      console.log(`   ${lbIcon} LocalBusiness: ${validation.localBusinessValidation.message}`);
      if (validation.localBusinessValidation.errors) {
        validation.localBusinessValidation.errors.forEach(error => {
          console.log(`      ❌ ${error}`);
        });
      }
      if (validation.localBusinessValidation.warnings) {
        validation.localBusinessValidation.warnings.forEach(warning => {
          console.log(`      ⚠️  ${warning}`);
        });
      }
      
      // Service validation
      const svcIcon = validation.serviceValidation.passed ? '✅' : '❌';
      console.log(`   ${svcIcon} Service: ${validation.serviceValidation.message}`);
      if (validation.serviceValidation.errors) {
        validation.serviceValidation.errors.forEach(error => {
          console.log(`      ❌ ${error}`);
        });
      }
      if (validation.serviceValidation.warnings) {
        validation.serviceValidation.warnings.forEach(warning => {
          console.log(`      ⚠️  ${warning}`);
        });
      }
    });

    // Validate all pages for statistics
    console.log('\n\n📊 Validating All Pages for Statistics...\n');
    const allValidations = pagesData.map(page => this.validatePage(page));

    // Calculate statistics
    const stats = {
      total: allValidations.length,
      localBusiness: { passed: 0, failed: 0, totalErrors: 0, totalWarnings: 0 },
      service: { passed: 0, failed: 0, totalErrors: 0, totalWarnings: 0 }
    };

    allValidations.forEach(validation => {
      if (validation.localBusinessValidation.passed) {
        stats.localBusiness.passed++;
      } else {
        stats.localBusiness.failed++;
      }
      stats.localBusiness.totalErrors += validation.localBusinessValidation.errors?.length || 0;
      stats.localBusiness.totalWarnings += validation.localBusinessValidation.warnings?.length || 0;

      if (validation.serviceValidation.passed) {
        stats.service.passed++;
      } else {
        stats.service.failed++;
      }
      stats.service.totalErrors += validation.serviceValidation.errors?.length || 0;
      stats.service.totalWarnings += validation.serviceValidation.warnings?.length || 0;
    });

    // Print statistics
    console.log('📈 Validation Statistics:\n');
    console.log(`Total Pages Validated: ${stats.total}\n`);
    
    console.log('LocalBusiness Schema:');
    const lbPassRate = ((stats.localBusiness.passed / stats.total) * 100).toFixed(1);
    const lbIcon = stats.localBusiness.failed === 0 ? '✅' : '⚠️';
    console.log(`${lbIcon} Passed: ${stats.localBusiness.passed}/${stats.total} (${lbPassRate}%)`);
    console.log(`   Failed: ${stats.localBusiness.failed}/${stats.total}`);
    console.log(`   Total Errors: ${stats.localBusiness.totalErrors}`);
    console.log(`   Total Warnings: ${stats.localBusiness.totalWarnings}\n`);
    
    console.log('Service Schema:');
    const svcPassRate = ((stats.service.passed / stats.total) * 100).toFixed(1);
    const svcIcon = stats.service.failed === 0 ? '✅' : '⚠️';
    console.log(`${svcIcon} Passed: ${stats.service.passed}/${stats.total} (${svcPassRate}%)`);
    console.log(`   Failed: ${stats.service.failed}/${stats.total}`);
    console.log(`   Total Errors: ${stats.service.totalErrors}`);
    console.log(`   Total Warnings: ${stats.service.totalWarnings}\n`);

    // Overall pass rate
    const totalTests = stats.total * 2; // 2 schemas per page
    const totalPassed = stats.localBusiness.passed + stats.service.passed;
    const overallPassRate = ((totalPassed / totalTests) * 100).toFixed(1);

    console.log(`🎯 Overall Pass Rate: ${overallPassRate}%`);
    console.log(`   Total Schema Tests: ${totalTests}`);
    console.log(`   Passed: ${totalPassed}`);
    console.log(`   Failed: ${totalTests - totalPassed}`);

    // List pages with failures
    const failedPages = allValidations.filter(validation => 
      !validation.localBusinessValidation.passed || !validation.serviceValidation.passed
    );

    if (failedPages.length > 0) {
      console.log(`\n\n⚠️  Pages with Schema Failures (${failedPages.length}):\n`);
      failedPages.slice(0, 10).forEach((validation, index) => {
        console.log(`${index + 1}. ${validation.title}`);
        console.log(`   URL: ${validation.url}`);
        if (!validation.localBusinessValidation.passed) {
          console.log(`   ❌ LocalBusiness: ${validation.localBusinessValidation.message}`);
          validation.localBusinessValidation.errors?.forEach(error => {
            console.log(`      - ${error}`);
          });
        }
        if (!validation.serviceValidation.passed) {
          console.log(`   ❌ Service: ${validation.serviceValidation.message}`);
          validation.serviceValidation.errors?.forEach(error => {
            console.log(`      - ${error}`);
          });
        }
        console.log('');
      });

      if (failedPages.length > 10) {
        console.log(`   ... and ${failedPages.length - 10} more pages with failures\n`);
      }
    } else {
      console.log('\n\n✅ All pages have valid schema markup!\n');
    }

    // Export sample schema for Google Rich Results Test
    console.log('\n' + '='.repeat(80));
    console.log('SAMPLE SCHEMA FOR GOOGLE RICH RESULTS TEST');
    console.log('='.repeat(80));
    console.log('\nYou can test this schema at: https://search.google.com/test/rich-results\n');
    
    const samplePage = pagesData[0];
    const sampleSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        samplePage.schema.localBusiness,
        samplePage.schema.service
      ]
    };
    
    console.log(JSON.stringify(sampleSchema, null, 2));
    console.log('\n' + '='.repeat(80));

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('SCHEMA VALIDATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ LocalBusiness Schema: ${stats.localBusiness.passed}/${stats.total} valid`);
    console.log(`✅ Service Schema: ${stats.service.passed}/${stats.total} valid`);
    console.log(`📊 Total Errors: ${stats.localBusiness.totalErrors + stats.service.totalErrors}`);
    console.log(`⚠️  Total Warnings: ${stats.localBusiness.totalWarnings + stats.service.totalWarnings}`);
    console.log('='.repeat(80) + '\n');

    // Save sample schema to file for easy testing
    const outputPath = path.join(__dirname, '../schema-sample.json');
    fs.writeFileSync(outputPath, JSON.stringify(sampleSchema, null, 2));
    console.log(`📄 Sample schema saved to: ${outputPath}`);
    console.log('   You can upload this file to Google Rich Results Test\n');
  }
}

// Run validation
const validator = new SchemaValidator();
validator.validateAllPages();
