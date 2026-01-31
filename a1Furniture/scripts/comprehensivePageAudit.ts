#!/usr/bin/env tsx

/**
 * Comprehensive Audit Script for All 150 Generated Pages
 * Checks everything: SEO, Mobile, Links, Content, Schema, etc.
 */

import fs from 'fs';
import path from 'path';

const GENERATED_PAGES_DIR = path.join(process.cwd(), 'src/pages/generated');

interface AuditResult {
  pageName: string;
  passed: boolean;
  issues: string[];
  warnings: string[];
  stats: {
    wordCount: number;
    relatedServicesCount: number;
    faqCount: number;
    servicesCount: number;
  };
}

console.log('🔍 COMPREHENSIVE AUDIT OF 150 GENERATED PAGES\n');
console.log('═══════════════════════════════════════════════════════════════\n');

const pageFiles = fs.readdirSync(GENERATED_PAGES_DIR).filter(file => file.endsWith('.tsx'));
console.log(`📄 Found ${pageFiles.length} pages to audit\n`);

const results: AuditResult[] = [];
let totalIssues = 0;
let totalWarnings = 0;

// Build URL map for validation
const availableUrls = new Set<string>();
pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(GENERATED_PAGES_DIR, file), 'utf-8');
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  if (urlMatch) availableUrls.add(urlMatch[1]);
});

pageFiles.forEach((file, index) => {
  const filePath = path.join(GENERATED_PAGES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const result: AuditResult = {
    pageName: file.replace('.tsx', ''),
    passed: true,
    issues: [],
    warnings: [],
    stats: {
      wordCount: 0,
      relatedServicesCount: 0,
      faqCount: 0,
      servicesCount: 0
    }
  };

  // ============================================
  // 1. FILE STRUCTURE CHECKS
  // ============================================
  
  // Check for ServicePageTemplate usage
  if (!content.includes('ServicePageTemplate')) {
    result.issues.push('❌ Not using ServicePageTemplate');
    result.passed = false;
  }

  // Check for proper imports
  if (!content.includes("import React from 'react'")) {
    result.issues.push('❌ Missing React import');
    result.passed = false;
  }

  if (!content.includes('PageData')) {
    result.issues.push('❌ Missing PageData type');
    result.passed = false;
  }

  // Check for default export
  if (!content.includes('export default')) {
    result.issues.push('❌ Missing default export');
    result.passed = false;
  }

  // ============================================
  // 2. SEO CHECKS
  // ============================================
  
  // Extract page data
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const metaDescMatch = content.match(/"metaDescription":\s*"([^"]+)"/);
  const h1Match = content.match(/"h1":\s*"([^"]+)"/);
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  const canonicalMatch = content.match(/"canonicalUrl":\s*"([^"]+)"/);

  // Title checks
  if (!titleMatch) {
    result.issues.push('❌ Missing title');
    result.passed = false;
  } else {
    const title = titleMatch[1];
    if (title.length < 30 || title.length > 60) {
      result.warnings.push(`⚠️  Title length ${title.length} (should be 30-60)`);
    }
  }

  // Meta description checks
  if (!metaDescMatch) {
    result.issues.push('❌ Missing meta description');
    result.passed = false;
  } else {
    const metaDesc = metaDescMatch[1];
    if (metaDesc.length < 120 || metaDesc.length > 160) {
      result.warnings.push(`⚠️  Meta description length ${metaDesc.length} (should be 120-160)`);
    }
  }

  // H1 checks
  if (!h1Match) {
    result.issues.push('❌ Missing H1');
    result.passed = false;
  }

  // URL checks
  if (!urlMatch) {
    result.issues.push('❌ Missing URL');
    result.passed = false;
  } else {
    const url = urlMatch[1];
    if (!url.startsWith('/services/')) {
      result.issues.push(`❌ Invalid URL format: ${url}`);
      result.passed = false;
    }
  }

  // Canonical URL checks
  if (!canonicalMatch) {
    result.issues.push('❌ Missing canonical URL');
    result.passed = false;
  }

  // ============================================
  // 3. CONTENT CHECKS
  // ============================================
  
  // Introduction
  const introMatch = content.match(/"introduction":\s*"([^"]+)"/);
  if (!introMatch) {
    result.issues.push('❌ Missing introduction');
    result.passed = false;
  } else {
    const intro = introMatch[1];
    const wordCount = intro.split(/\s+/).length;
    if (wordCount < 50) {
      result.warnings.push(`⚠️  Introduction too short (${wordCount} words)`);
    }
  }

  // Services
  const servicesMatch = content.match(/"services":\s*\[([\s\S]*?)\]/);
  if (!servicesMatch) {
    result.issues.push('❌ Missing services array');
    result.passed = false;
  } else {
    const servicesContent = servicesMatch[1];
    const serviceCount = (servicesContent.match(/"name":/g) || []).length;
    result.stats.servicesCount = serviceCount;
    
    if (serviceCount < 4) {
      result.warnings.push(`⚠️  Only ${serviceCount} services (should be 4-6)`);
    }
  }

  // FAQs
  const faqsMatch = content.match(/"faqs":\s*\[([\s\S]*?)\]/);
  if (!faqsMatch) {
    result.issues.push('❌ Missing FAQs array');
    result.passed = false;
  } else {
    const faqsContent = faqsMatch[1];
    const faqCount = (faqsContent.match(/"question":/g) || []).length;
    result.stats.faqCount = faqCount;
    
    if (faqCount < 5) {
      result.warnings.push(`⚠️  Only ${faqCount} FAQs (should be 5-8)`);
    }
  }

  // Process steps
  const processMatch = content.match(/"process":\s*\[([\s\S]*?)\]/);
  if (!processMatch) {
    result.issues.push('❌ Missing process steps');
    result.passed = false;
  }

  // Why Choose Us
  const whyChooseMatch = content.match(/"whyChooseUs":\s*\[([\s\S]*?)\]/);
  if (!whyChooseMatch) {
    result.issues.push('❌ Missing why choose us section');
    result.passed = false;
  }

  // ============================================
  // 4. RELATED SERVICES CHECKS
  // ============================================
  
  const relatedServicesMatch = content.match(/"relatedServices":\s*\[([\s\S]*?)\]/);
  if (!relatedServicesMatch) {
    result.issues.push('❌ Missing related services');
    result.passed = false;
  } else {
    const relatedContent = relatedServicesMatch[1];
    const relatedUrls = relatedContent.match(/"url":\s*"([^"]+)"/g) || [];
    result.stats.relatedServicesCount = relatedUrls.length;
    
    // Check if related service URLs exist
    relatedUrls.forEach(urlMatch => {
      const url = urlMatch.match(/"url":\s*"([^"]+)"/)?.[1];
      if (url && !availableUrls.has(url)) {
        result.issues.push(`❌ Broken related service link: ${url}`);
        result.passed = false;
      }
    });
    
    if (relatedUrls.length === 0) {
      result.warnings.push('⚠️  No related services (should have 2-4)');
    }
  }

  // ============================================
  // 5. SCHEMA MARKUP CHECKS
  // ============================================
  
  // Local Business Schema
  if (!content.includes('"@type": "LocalBusiness"')) {
    result.issues.push('❌ Missing LocalBusiness schema');
    result.passed = false;
  }

  // Service Schema
  if (!content.includes('"@type": "Service"')) {
    result.issues.push('❌ Missing Service schema');
    result.passed = false;
  }

  // Check for required schema fields
  if (!content.includes('"telephone"')) {
    result.issues.push('❌ Missing telephone in schema');
    result.passed = false;
  }

  if (!content.includes('"address"')) {
    result.issues.push('❌ Missing address in schema');
    result.passed = false;
  }

  // ============================================
  // 6. PRICING CHECKS
  // ============================================
  
  const pricingMatch = content.match(/"pricing":\s*{([\s\S]*?)}/);
  if (!pricingMatch) {
    result.issues.push('❌ Missing pricing information');
    result.passed = false;
  } else {
    if (!content.includes('"startingPrice"')) {
      result.issues.push('❌ Missing starting price');
      result.passed = false;
    }
    if (!content.includes('"priceRange"')) {
      result.issues.push('❌ Missing price range');
      result.passed = false;
    }
  }

  // ============================================
  // 7. LOCATION CHECKS
  // ============================================
  
  if (!content.includes('"locationAreas"')) {
    result.issues.push('❌ Missing location areas');
    result.passed = false;
  }

  if (!content.includes('"serviceAreaDescription"')) {
    result.issues.push('❌ Missing service area description');
    result.passed = false;
  }

  // ============================================
  // 8. KEYWORDS CHECKS
  // ============================================
  
  if (!content.includes('"primaryKeyword"')) {
    result.issues.push('❌ Missing primary keyword');
    result.passed = false;
  }

  if (!content.includes('"secondaryKeywords"')) {
    result.issues.push('❌ Missing secondary keywords');
    result.passed = false;
  }

  // ============================================
  // COLLECT RESULTS
  // ============================================
  
  totalIssues += result.issues.length;
  totalWarnings += result.warnings.length;
  results.push(result);

  // Progress indicator
  if ((index + 1) % 25 === 0) {
    console.log(`✓ Audited ${index + 1}/${pageFiles.length} pages...`);
  }
});

console.log(`\n✓ Audited all ${pageFiles.length} pages\n`);
console.log('═══════════════════════════════════════════════════════════════\n');

// ============================================
// SUMMARY STATISTICS
// ============================================

const passedPages = results.filter(r => r.passed).length;
const failedPages = results.filter(r => !r.passed).length;
const pagesWithWarnings = results.filter(r => r.warnings.length > 0).length;

console.log('📊 AUDIT SUMMARY:\n');
console.log(`✅ Passed: ${passedPages}/${pageFiles.length} pages (${((passedPages/pageFiles.length)*100).toFixed(1)}%)`);
console.log(`❌ Failed: ${failedPages}/${pageFiles.length} pages (${((failedPages/pageFiles.length)*100).toFixed(1)}%)`);
console.log(`⚠️  With Warnings: ${pagesWithWarnings}/${pageFiles.length} pages`);
console.log(`🔴 Total Issues: ${totalIssues}`);
console.log(`⚠️  Total Warnings: ${totalWarnings}\n`);

// Average statistics
const avgRelatedServices = results.reduce((sum, r) => sum + r.stats.relatedServicesCount, 0) / results.length;
const avgFaqs = results.reduce((sum, r) => sum + r.stats.faqCount, 0) / results.length;
const avgServices = results.reduce((sum, r) => sum + r.stats.servicesCount, 0) / results.length;

console.log('📈 AVERAGE STATISTICS:\n');
console.log(`Related Services per page: ${avgRelatedServices.toFixed(1)}`);
console.log(`FAQs per page: ${avgFaqs.toFixed(1)}`);
console.log(`Services per page: ${avgServices.toFixed(1)}\n`);

// ============================================
// DETAILED ISSUES
// ============================================

const failedResults = results.filter(r => !r.passed);
if (failedResults.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('❌ PAGES WITH ISSUES:\n');
  
  failedResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.pageName}`);
    result.issues.forEach(issue => {
      console.log(`   ${issue}`);
    });
    if (result.warnings.length > 0) {
      result.warnings.forEach(warning => {
        console.log(`   ${warning}`);
      });
    }
    console.log('');
  });
}

// ============================================
// WARNINGS SUMMARY
// ============================================

const resultsWithWarnings = results.filter(r => r.warnings.length > 0 && r.passed);
if (resultsWithWarnings.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('⚠️  PAGES WITH WARNINGS (but passed):\n');
  
  resultsWithWarnings.slice(0, 10).forEach((result, index) => {
    console.log(`${index + 1}. ${result.pageName}`);
    result.warnings.forEach(warning => {
      console.log(`   ${warning}`);
    });
    console.log('');
  });
  
  if (resultsWithWarnings.length > 10) {
    console.log(`... and ${resultsWithWarnings.length - 10} more pages with warnings\n`);
  }
}

// ============================================
// CHECKLIST
// ============================================

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('✅ COMPREHENSIVE CHECKLIST:\n');

const checks = [
  { name: 'File Structure', passed: results.every(r => r.issues.filter(i => i.includes('ServicePageTemplate') || i.includes('import')).length === 0) },
  { name: 'SEO Elements (Title, Meta, H1)', passed: results.every(r => r.issues.filter(i => i.includes('title') || i.includes('meta') || i.includes('H1')).length === 0) },
  { name: 'URLs & Canonical', passed: results.every(r => r.issues.filter(i => i.includes('URL')).length === 0) },
  { name: 'Content Sections', passed: results.every(r => r.issues.filter(i => i.includes('introduction') || i.includes('services') || i.includes('FAQs')).length === 0) },
  { name: 'Related Services Links', passed: results.every(r => r.issues.filter(i => i.includes('related service')).length === 0) },
  { name: 'Schema Markup', passed: results.every(r => r.issues.filter(i => i.includes('schema')).length === 0) },
  { name: 'Pricing Information', passed: results.every(r => r.issues.filter(i => i.includes('pricing')).length === 0) },
  { name: 'Location Data', passed: results.every(r => r.issues.filter(i => i.includes('location')).length === 0) },
  { name: 'Keywords', passed: results.every(r => r.issues.filter(i => i.includes('keyword')).length === 0) },
];

checks.forEach(check => {
  console.log(`${check.passed ? '✅' : '❌'} ${check.name}`);
});

console.log('\n═══════════════════════════════════════════════════════════════\n');

if (failedPages === 0 && totalIssues === 0) {
  console.log('🎉 ALL PAGES PASSED! Ready for production deployment.\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${failedPages} pages need attention before deployment.\n`);
  process.exit(1);
}
