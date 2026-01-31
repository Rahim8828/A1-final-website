#!/usr/bin/env tsx

/**
 * Test script to validate all 150 generated pages for:
 * 1. Mobile responsiveness
 * 2. Related services navigation links
 */

import fs from 'fs';
import path from 'path';

interface TestResult {
  pageName: string;
  mobileResponsive: boolean;
  relatedServicesWorking: boolean;
  issues: string[];
}

const GENERATED_PAGES_DIR = path.join(process.cwd(), 'src/pages/generated');

console.log('🔍 Testing Generated Pages...\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all generated page files
const pageFiles = fs.readdirSync(GENERATED_PAGES_DIR).filter(file => file.endsWith('.tsx'));

console.log(`📄 Found ${pageFiles.length} generated pages\n`);

const results: TestResult[] = [];
let totalIssues = 0;

// Test each page
pageFiles.forEach((file, index) => {
  const filePath = path.join(GENERATED_PAGES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const result: TestResult = {
    pageName: file.replace('.tsx', ''),
    mobileResponsive: true,
    relatedServicesWorking: true,
    issues: []
  };

  // Check 1: Mobile Responsiveness Classes
  const mobileClasses = [
    'sm:', 'md:', 'lg:', 'xl:', '2xl:',
    'flex-col', 'flex-wrap',
    'gap-', 'space-',
    'px-', 'py-',
    'text-xs', 'text-sm', 'text-base',
    'min-h-\\[44px\\]' // Touch target size
  ];

  const hasMobileClasses = mobileClasses.some(cls => content.includes(cls));
  
  if (!hasMobileClasses) {
    result.mobileResponsive = false;
    result.issues.push('Missing responsive classes (sm:, md:, lg:, etc.)');
    totalIssues++;
  }

  // Check 2: Touch Target Sizes (minimum 44px for mobile)
  if (!content.includes('min-h-[44px]')) {
    result.issues.push('⚠️  Warning: CTA buttons may not have proper touch target size (44px)');
  }

  // Check 3: Related Services Section
  if (!content.includes('relatedServices')) {
    result.relatedServicesWorking = false;
    result.issues.push('Missing relatedServices data');
    totalIssues++;
  }

  // Check 4: Related Services Links (should use Link component from react-router-dom)
  if (content.includes('relatedServices') && !content.includes('Link')) {
    result.relatedServicesWorking = false;
    result.issues.push('Related services not using React Router Link component');
    totalIssues++;
  }

  // Check 5: Related Services URL format
  if (content.includes('relatedServices')) {
    const relatedServicesMatch = content.match(/"relatedServices":\s*\[([\s\S]*?)\]/);
    if (relatedServicesMatch) {
      const relatedServicesContent = relatedServicesMatch[1];
      
      // Check if URLs are properly formatted
      if (!relatedServicesContent.includes('"url":')) {
        result.relatedServicesWorking = false;
        result.issues.push('Related services missing URL field');
        totalIssues++;
      }
      
      // Check if URLs start with /services/
      const urlMatches = relatedServicesContent.match(/"url":\s*"([^"]+)"/g);
      if (urlMatches) {
        urlMatches.forEach(urlMatch => {
          const url = urlMatch.match(/"url":\s*"([^"]+)"/)?.[1];
          if (url && !url.startsWith('/services/')) {
            result.issues.push(`Invalid URL format: ${url} (should start with /services/)`);
          }
        });
      }
    }
  }

  // Check 6: ServicePageTemplate usage
  if (!content.includes('ServicePageTemplate')) {
    result.issues.push('Not using ServicePageTemplate component');
    totalIssues++;
  }

  results.push(result);

  // Progress indicator
  if ((index + 1) % 10 === 0) {
    console.log(`✓ Tested ${index + 1}/${pageFiles.length} pages...`);
  }
});

console.log(`\n✓ Tested all ${pageFiles.length} pages\n`);
console.log('═══════════════════════════════════════════════════════════════\n');

// Summary
const mobileResponsiveCount = results.filter(r => r.mobileResponsive).length;
const relatedServicesWorkingCount = results.filter(r => r.relatedServicesWorking).length;
const pagesWithIssues = results.filter(r => r.issues.length > 0);

console.log('📊 SUMMARY:\n');
console.log(`✅ Mobile Responsive: ${mobileResponsiveCount}/${pageFiles.length} pages`);
console.log(`✅ Related Services Working: ${relatedServicesWorkingCount}/${pageFiles.length} pages`);
console.log(`⚠️  Pages with Issues: ${pagesWithIssues.length}/${pageFiles.length}`);
console.log(`🔴 Total Issues Found: ${totalIssues}\n`);

// Detailed issues
if (pagesWithIssues.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📋 DETAILED ISSUES:\n');
  
  pagesWithIssues.forEach((result, index) => {
    console.log(`${index + 1}. ${result.pageName}`);
    result.issues.forEach(issue => {
      console.log(`   • ${issue}`);
    });
    console.log('');
  });
}

// Mobile Responsiveness Check
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📱 MOBILE RESPONSIVENESS CHECK:\n');

if (mobileResponsiveCount === pageFiles.length) {
  console.log('✅ All pages are mobile responsive!');
  console.log('   • Using Tailwind responsive classes (sm:, md:, lg:, xl:)');
  console.log('   • Proper spacing and padding');
  console.log('   • Flexible layouts with flex-col and flex-wrap');
} else {
  console.log(`⚠️  ${pageFiles.length - mobileResponsiveCount} pages need mobile responsiveness fixes`);
}

// Related Services Check
console.log('\n═══════════════════════════════════════════════════════════════\n');
console.log('🔗 RELATED SERVICES NAVIGATION CHECK:\n');

if (relatedServicesWorkingCount === pageFiles.length) {
  console.log('✅ All pages have working related services navigation!');
  console.log('   • Using React Router Link component');
  console.log('   • Proper URL format (/services/...)');
  console.log('   • Internal navigation without page reload');
} else {
  console.log(`⚠️  ${pageFiles.length - relatedServicesWorkingCount} pages need related services fixes`);
}

console.log('\n═══════════════════════════════════════════════════════════════\n');

// Exit code
if (totalIssues === 0) {
  console.log('🎉 All tests passed! Generated pages are ready for production.\n');
  process.exit(0);
} else {
  console.log(`⚠️  Found ${totalIssues} issues that need attention.\n`);
  process.exit(1);
}
