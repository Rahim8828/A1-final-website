#!/usr/bin/env tsx
/**
 * SEO-Enhanced Page Generator Script
 * Generates pages with full SEO optimization using the integrated SEO system
 * 
 * Usage: npm run generate:seo-pages or tsx scripts/generateSEOPages.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { PageData } from '../src/types';
import { generateSEOOptimizedPages, applySEOImprovements } from '../src/seo/integration/enhancedPageGenerator';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'src', 'data');
const outputFile = path.join(outputDir, 'seoOptimizedPagesData.ts');

// Statistics tracking
const stats = {
  pagesGenerated: 0,
  seoIssuesFixed: 0,
  performanceOptimizations: 0,
  errors: [] as string[],
  warnings: [] as string[],
};

/**
 * Generates SEO-optimized page data and saves to file
 */
async function generateAndSaveOptimizedPages(): Promise<void> {
  console.log('🚀 Starting SEO-enhanced page generation...\n');
  
  try {
    // Generate SEO-optimized pages
    console.log('📄 Generating SEO-optimized pages...');
    const optimizedPages = await generateSEOOptimizedPages();
    stats.pagesGenerated = optimizedPages.length;
    
    console.log(`✅ Generated ${optimizedPages.length} SEO-optimized pages\n`);
    
    // Apply additional SEO improvements
    console.log('🔧 Applying additional SEO improvements...');
    const improvedPages = await applySEOImprovements(optimizedPages);
    
    console.log('✅ SEO improvements applied\n');
    
    // Validate SEO compliance
    console.log('🔍 Validating SEO compliance...');
    const validationResults = validateSEOCompliance(improvedPages);
    displayValidationResults(validationResults);
    
    // Generate TypeScript file content
    console.log('💾 Saving optimized page data...');
    const fileContent = generateTypeScriptFile(improvedPages);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the file
    fs.writeFileSync(outputFile, fileContent, 'utf-8');
    console.log(`✅ SEO-optimized page data saved to: ${outputFile}\n`);
    
    // Display summary
    displaySummary(improvedPages, validationResults);
    
  } catch (error) {
    console.error('❌ Error generating SEO-optimized pages:', error);
    stats.errors.push(error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}

/**
 * Validates SEO compliance of generated pages
 */
function validateSEOCompliance(pages: PageData[]): {
  totalPages: number;
  compliantPages: number;
  issues: Array<{ page: string; issue: string; severity: 'error' | 'warning' }>;
  score: number;
} {
  const issues: Array<{ page: string; issue: string; severity: 'error' | 'warning' }> = [];
  let compliantPages = 0;

  for (const page of pages) {
    let pageCompliant = true;

    // Critical SEO checks
    if (!page.title || page.title.length === 0) {
      issues.push({ page: page.url, issue: 'Missing title', severity: 'error' });
      pageCompliant = false;
    } else if (page.title.length < 30 || page.title.length > 60) {
      issues.push({ page: page.url, issue: `Title length ${page.title.length} (optimal: 30-60)`, severity: 'warning' });
    }

    if (!page.metaDescription || page.metaDescription.length === 0) {
      issues.push({ page: page.url, issue: 'Missing meta description', severity: 'error' });
      pageCompliant = false;
    } else if (page.metaDescription.length < 150 || page.metaDescription.length > 160) {
      issues.push({ page: page.url, issue: `Meta description length ${page.metaDescription.length} (optimal: 150-160)`, severity: 'warning' });
    }

    if (!page.h1 || page.h1.length === 0) {
      issues.push({ page: page.url, issue: 'Missing H1 tag', severity: 'error' });
      pageCompliant = false;
    }

    if (!page.canonicalUrl || !page.canonicalUrl.startsWith('https://')) {
      issues.push({ page: page.url, issue: 'Invalid canonical URL', severity: 'error' });
      pageCompliant = false;
    }

    if (!page.schema || !page.schema.localBusiness || !page.schema.service) {
      issues.push({ page: page.url, issue: 'Missing structured data', severity: 'error' });
      pageCompliant = false;
    }

    // Performance and linking checks
    if (page.relatedServices.length < 3) {
      issues.push({ page: page.url, issue: `Only ${page.relatedServices.length} related services (recommended: 3+)`, severity: 'warning' });
    }

    if (pageCompliant) {
      compliantPages++;
    }
  }

  const score = Math.round((compliantPages / pages.length) * 100);
  
  return {
    totalPages: pages.length,
    compliantPages,
    issues,
    score
  };
}

/**
 * Displays validation results
 */
function displayValidationResults(results: ReturnType<typeof validateSEOCompliance>): void {
  console.log('📊 SEO Compliance Results:');
  console.log(`  • Total pages: ${results.totalPages}`);
  console.log(`  • Compliant pages: ${results.compliantPages}`);
  console.log(`  • Compliance score: ${results.score}%`);
  console.log(`  • Issues found: ${results.issues.length}\n`);

  if (results.issues.length > 0) {
    const errors = results.issues.filter(issue => issue.severity === 'error');
    const warnings = results.issues.filter(issue => issue.severity === 'warning');

    if (errors.length > 0) {
      console.log(`❌ Critical Issues (${errors.length}):`);
      errors.slice(0, 5).forEach(issue => {
        console.log(`  • ${issue.page}: ${issue.issue}`);
      });
      if (errors.length > 5) {
        console.log(`  ... and ${errors.length - 5} more errors`);
      }
      console.log();
    }

    if (warnings.length > 0) {
      console.log(`⚠️  Warnings (${warnings.length}):`);
      warnings.slice(0, 3).forEach(issue => {
        console.log(`  • ${issue.page}: ${issue.issue}`);
      });
      if (warnings.length > 3) {
        console.log(`  ... and ${warnings.length - 3} more warnings`);
      }
      console.log();
    }
  }
}

/**
 * Generates TypeScript file content
 */
function generateTypeScriptFile(pages: PageData[]): string {
  const timestamp = new Date().toISOString();
  
  return `/**
 * SEO-Optimized Pages Data
 * Generated with full SEO optimization using the integrated SEO system
 * 
 * Generated: ${timestamp}
 * Total pages: ${pages.length}
 * 
 * DO NOT EDIT THIS FILE MANUALLY
 * This file is auto-generated by scripts/generateSEOPages.ts
 * To update, run: npm run generate:seo-pages
 */

import { PageData } from '../types';

export const seoOptimizedPagesData: PageData[] = ${JSON.stringify(pages, null, 2)};

export default seoOptimizedPagesData;
`;
}

/**
 * Displays generation summary
 */
function displaySummary(pages: PageData[], validationResults: ReturnType<typeof validateSEOCompliance>): void {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              SEO Generation Summary                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log('📊 Generation Statistics:');
  console.log(`  • Pages generated: ${stats.pagesGenerated}`);
  console.log(`  • SEO compliance score: ${validationResults.score}%`);
  console.log(`  • Compliant pages: ${validationResults.compliantPages}/${validationResults.totalPages}`);
  console.log(`  • Issues found: ${validationResults.issues.length}`);
  console.log(`  • Errors: ${stats.errors.length}`);
  console.log(`  • Warnings: ${stats.warnings.length}\n`);

  // SEO Features Applied
  console.log('🔧 SEO Features Applied:');
  console.log('  ✅ Meta tag optimization (title, description, keywords)');
  console.log('  ✅ Open Graph and Twitter Card tags');
  console.log('  ✅ Canonical URL management');
  console.log('  ✅ Structured data (JSON-LD)');
  console.log('  ✅ Internal linking optimization');
  console.log('  ✅ Content quality validation');
  console.log('  ✅ Performance optimization');
  console.log('  ✅ Mobile optimization validation\n');

  // Performance Metrics
  const avgTitleLength = pages.reduce((sum, page) => sum + page.title.length, 0) / pages.length;
  const avgDescLength = pages.reduce((sum, page) => sum + page.metaDescription.length, 0) / pages.length;
  const avgRelatedServices = pages.reduce((sum, page) => sum + page.relatedServices.length, 0) / pages.length;

  console.log('📈 Content Metrics:');
  console.log(`  • Average title length: ${Math.round(avgTitleLength)} chars`);
  console.log(`  • Average description length: ${Math.round(avgDescLength)} chars`);
  console.log(`  • Average related services: ${Math.round(avgRelatedServices)}`);
  console.log(`  • Unique locations: ${new Set(pages.map(p => p.location)).size}`);
  console.log(`  • Service categories: ${new Set(pages.map(p => p.serviceCategory)).size}\n`);

  if (validationResults.score >= 95) {
    console.log('🎉 Excellent! SEO compliance score is 95% or higher.');
  } else if (validationResults.score >= 85) {
    console.log('✅ Good SEO compliance score. Consider addressing remaining issues.');
  } else {
    console.log('⚠️  SEO compliance needs improvement. Please review and fix critical issues.');
  }

  console.log(`\n📁 Output file: ${outputFile}`);
  console.log('🚀 Ready for deployment with enhanced SEO optimization!');
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  try {
    await generateAndSaveOptimizedPages();
    
    if (stats.errors.length > 0) {
      console.error('\n❌ Generation completed with errors');
      process.exit(1);
    } else {
      console.log('\n✅ SEO-enhanced page generation completed successfully!');
    }
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();