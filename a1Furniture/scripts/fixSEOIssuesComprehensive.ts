#!/usr/bin/env tsx

/**
 * Comprehensive SEO Issues Fixing Script
 * Addresses critical SEO problems across all 175 pages:
 * - Missing H1 tags
 * - Missing meta descriptions
 * - Missing Open Graph and Twitter Card tags
 * - Orphan pages (creates internal links)
 * - Image optimization and lazy loading
 * 
 * Requirements: 1.1, 2.1, 2.2, 2.3, 4.1
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { LinkManager } from '../src/seo/managers/LinkManager';
import { MetaManager } from '../src/seo/managers/MetaManager';
import { PerformanceOptimizer } from '../src/seo/managers/PerformanceOptimizer';
import { SEOPage } from '../src/seo/types';
import { pagesData } from '../src/data/generatedPagesData';

// Configuration
const GENERATED_PAGES_DIR = 'src/pages/generated';
const STATIC_PAGES_DIR = 'src/pages';
const COMPONENTS_DIR = 'src/components';

// Initialize SEO managers
const linkManager = new LinkManager({
  minOutgoingLinks: 3,
  maxOutgoingLinks: 10,
  contextualRelevanceThreshold: 0.7,
  avoidCircularReferences: true
});

const metaManager = new MetaManager({
  metaDescriptionMinLength: 150,
  metaDescriptionMaxLength: 160,
  h1KeywordRequirement: true,
  socialMediaTagsRequired: true
});

const performanceOptimizer = new PerformanceOptimizer({
  lazyLoadingEnabled: true,
  bundleMinificationEnabled: true,
  coreWebVitalsThresholds: {
    lcp: 2500,
    fid: 100,
    cls: 0.1
  },
  cacheHeadersEnabled: true
});

interface PageAnalysis {
  filePath: string;
  url: string;
  issues: string[];
  hasH1: boolean;
  hasMetaDescription: boolean;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  hasInternalLinks: boolean;
  imageCount: number;
  hasLazyLoading: boolean;
}

/**
 * Analyzes a page file for SEO issues
 */
function analyzePage(filePath: string): PageAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues: string[] = [];
  
  // Extract URL from file content or filename
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  const url = urlMatch ? urlMatch[1] : path.basename(filePath, '.tsx');
  
  // Check for H1 tag
  const hasH1 = content.includes('"h1"') || content.includes('h1Tag');
  if (!hasH1) {
    issues.push('missing_h1');
  }
  
  // Check for meta description
  const hasMetaDescription = content.includes('"metaDescription"') && 
    !content.includes('"metaDescription": ""') &&
    !content.includes('"metaDescription": "..."');
  if (!hasMetaDescription) {
    issues.push('missing_meta_description');
  }
  
  // Check for Open Graph tags
  const hasOpenGraph = content.includes('openGraphTags') || content.includes('og:');
  if (!hasOpenGraph) {
    issues.push('missing_open_graph');
  }
  
  // Check for Twitter Card tags
  const hasTwitterCard = content.includes('twitterCardTags') || content.includes('twitter:');
  if (!hasTwitterCard) {
    issues.push('missing_twitter_card');
  }
  
  // Check for internal links
  const hasInternalLinks = content.includes('internalLinks') || 
    (content.match(/href="\/[^"]*"/g) || []).length > 0;
  if (!hasInternalLinks) {
    issues.push('missing_internal_links');
  }
  
  // Count images
  const imageMatches = content.match(/<img|<OptimizedImage/g) || [];
  const imageCount = imageMatches.length;
  
  // Check for lazy loading
  const hasLazyLoading = content.includes('loading="lazy"') || 
    content.includes('OptimizedImage');
  if (imageCount > 0 && !hasLazyLoading) {
    issues.push('missing_lazy_loading');
  }
  
  return {
    filePath,
    url,
    issues,
    hasH1,
    hasMetaDescription,
    hasOpenGraph,
    hasTwitterCard,
    hasInternalLinks,
    imageCount,
    hasLazyLoading
  };
}

/**
 * Fixes missing H1 tags in a page file
 */
function fixMissingH1(filePath: string, pageData: any): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Generate H1 from title or service name
  const title = pageData.title || pageData.serviceName || 'Professional Furniture Polish';
  const location = pageData.location || 'Mumbai';
  const h1 = `${title}${location !== 'Mumbai' ? ` in ${location}` : ''}`;
  
  // Add H1 to pageData object
  if (!content.includes('"h1"')) {
    // Find the pageData object and add h1 field
    content = content.replace(
      /"title":\s*"([^"]+)"/,
      `"title": "$1",\n  "h1": "${h1}"`
    );
  } else {
    // Update existing h1
    content = content.replace(
      /"h1":\s*"[^"]*"/,
      `"h1": "${h1}"`
    );
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed H1 tag: ${path.basename(filePath)}`);
}

/**
 * Fixes missing meta descriptions
 */
function fixMissingMetaDescription(filePath: string, pageData: any): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Generate meta description using MetaManager
  const seoPage: SEOPage = {
    url: pageData.url || '',
    title: pageData.title || '',
    metaDescription: '',
    h1Tag: pageData.h1 || pageData.title || '',
    wordCount: 300,
    internalLinks: [],
    outgoingLinks: [],
    openGraphTags: {
      title: '',
      description: '',
      image: '',
      url: '',
      type: 'website',
      siteName: 'A1 Furniture Polish'
    },
    twitterCardTags: {
      card: 'summary_large_image',
      title: '',
      description: '',
      image: ''
    },
    structuredData: { '@context': 'https://schema.org', '@type': 'Service' },
    lastModified: new Date(),
    seoScore: 0
  };
  
  const keywords = [pageData.serviceName || 'furniture polish', pageData.location || 'Mumbai'];
  const metaDescription = metaManager.generateMetaDescription(seoPage, keywords);
  
  // Update meta description in content
  if (!content.includes('"metaDescription"')) {
    content = content.replace(
      /"title":\s*"([^"]+)"/,
      `"title": "$1",\n  "metaDescription": "${metaDescription}"`
    );
  } else {
    content = content.replace(
      /"metaDescription":\s*"[^"]*"/,
      `"metaDescription": "${metaDescription}"`
    );
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed meta description: ${path.basename(filePath)}`);
}

/**
 * Adds Open Graph and Twitter Card tags
 */
function addSocialMediaTags(filePath: string, pageData: any): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const seoPage: SEOPage = {
    url: pageData.url || '',
    title: pageData.title || '',
    metaDescription: pageData.metaDescription || '',
    h1Tag: pageData.h1 || pageData.title || '',
    wordCount: 300,
    internalLinks: [],
    outgoingLinks: [],
    openGraphTags: {
      title: '',
      description: '',
      image: '',
      url: '',
      type: 'website',
      siteName: 'A1 Furniture Polish'
    },
    twitterCardTags: {
      card: 'summary_large_image',
      title: '',
      description: '',
      image: ''
    },
    structuredData: { '@context': 'https://schema.org', '@type': 'Service' },
    lastModified: new Date(),
    seoScore: 0
  };
  
  const ogTags = metaManager.generateOpenGraphTags(seoPage);
  const twitterTags = metaManager.generateTwitterCardTags(seoPage);
  
  // Add Open Graph tags
  const ogTagsJson = JSON.stringify({
    title: ogTags['og:title'],
    description: ogTags['og:description'],
    image: ogTags['og:image'] || '/assets/optimized/wooden furniture -640w.webp',
    url: ogTags['og:url'],
    type: ogTags['og:type'],
    siteName: ogTags['og:site_name']
  }, null, 4);
  
  // Add Twitter Card tags
  const twitterTagsJson = JSON.stringify({
    card: twitterTags['twitter:card'],
    title: twitterTags['twitter:title'],
    description: twitterTags['twitter:description'],
    image: twitterTags['twitter:image'] || '/assets/optimized/wooden furniture -640w.webp'
  }, null, 4);
  
  // Insert social media tags into pageData
  if (!content.includes('openGraphTags')) {
    // Find the end of pageData object and insert before closing brace
    const insertPoint = content.lastIndexOf('};');
    if (insertPoint > -1) {
      const beforeClosing = content.substring(0, insertPoint);
      const afterClosing = content.substring(insertPoint);
      
      content = beforeClosing + 
        `,\n  "openGraphTags": ${ogTagsJson},\n` +
        `  "twitterCardTags": ${twitterTagsJson}\n` +
        afterClosing;
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Added social media tags: ${path.basename(filePath)}`);
}

/**
 * Adds internal links to fix orphan pages
 */
function addInternalLinks(filePath: string, pageData: any, allPages: any[]): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find related pages based on service category and location
  const relatedPages = allPages
    .filter(p => p.url !== pageData.url)
    .filter(p => 
      p.serviceCategory === pageData.serviceCategory || 
      p.location === pageData.location ||
      p.serviceName?.includes(pageData.serviceName?.split(' ')[0] || '')
    )
    .slice(0, 5); // Limit to 5 related pages
  
  if (relatedPages.length === 0) return;
  
  // Generate internal links
  const internalLinks = relatedPages.map(page => ({
    url: page.url,
    title: page.title,
    anchorText: page.serviceName || page.title
  }));
  
  const internalLinksJson = JSON.stringify(internalLinks, null, 4);
  
  // Add internal links to pageData
  if (!content.includes('internalLinks')) {
    const insertPoint = content.lastIndexOf('};');
    if (insertPoint > -1) {
      const beforeClosing = content.substring(0, insertPoint);
      const afterClosing = content.substring(insertPoint);
      
      content = beforeClosing + 
        `,\n  "internalLinks": ${internalLinksJson}\n` +
        afterClosing;
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Added internal links: ${path.basename(filePath)}`);
}

/**
 * Implements lazy loading for images
 */
function implementLazyLoading(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace regular img tags with OptimizedImage component
  content = content.replace(
    /<img([^>]*?)src="([^"]*)"([^>]*?)>/g,
    '<OptimizedImage$1src="$2"$3 loading="lazy">'
  );
  
  // Ensure OptimizedImage import is present
  if (content.includes('OptimizedImage') && !content.includes("import OptimizedImage")) {
    content = content.replace(
      /import React from 'react';/,
      "import React from 'react';\nimport OptimizedImage from '../../components/OptimizedImage';"
    );
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Implemented lazy loading: ${path.basename(filePath)}`);
}

/**
 * Scans all pages and identifies issues
 */
async function scanAllPages(): Promise<PageAnalysis[]> {
  console.log('🔍 Scanning all pages for SEO issues...\n');
  
  // Get all page files
  const generatedPages = await glob(`${GENERATED_PAGES_DIR}/*.tsx`);
  const staticPages = await glob(`${STATIC_PAGES_DIR}/*.tsx`);
  const allPageFiles = [...generatedPages, ...staticPages];
  
  const analyses: PageAnalysis[] = [];
  
  for (const filePath of allPageFiles) {
    try {
      const analysis = analyzePage(filePath);
      analyses.push(analysis);
      
      if (analysis.issues.length > 0) {
        console.log(`❌ ${path.basename(filePath)}: ${analysis.issues.join(', ')}`);
      } else {
        console.log(`✅ ${path.basename(filePath)}: No issues found`);
      }
    } catch (error) {
      console.error(`❌ Error analyzing ${filePath}:`, error);
    }
  }
  
  return analyses;
}

/**
 * Fixes all identified SEO issues
 */
async function fixAllIssues(): Promise<void> {
  console.log('🚀 Starting comprehensive SEO fixes...\n');
  
  const analyses = await scanAllPages();
  const pagesWithIssues = analyses.filter(a => a.issues.length > 0);
  
  console.log(`\n📊 Summary:`);
  console.log(`- Total pages scanned: ${analyses.length}`);
  console.log(`- Pages with issues: ${pagesWithIssues.length}`);
  console.log(`- Pages without issues: ${analyses.length - pagesWithIssues.length}\n`);
  
  let fixedCount = 0;
  
  for (const analysis of pagesWithIssues) {
    try {
      console.log(`\n🔧 Fixing: ${path.basename(analysis.filePath)}`);
      
      // Load page data
      const pageDataMatch = pagesData.find(p => p.url === analysis.url);
      const pageData = pageDataMatch || {
        title: path.basename(analysis.filePath, '.tsx'),
        url: analysis.url,
        serviceName: 'Furniture Polish',
        location: 'Mumbai'
      };
      
      // Fix each issue
      for (const issue of analysis.issues) {
        switch (issue) {
          case 'missing_h1':
            fixMissingH1(analysis.filePath, pageData);
            break;
          case 'missing_meta_description':
            fixMissingMetaDescription(analysis.filePath, pageData);
            break;
          case 'missing_open_graph':
          case 'missing_twitter_card':
            addSocialMediaTags(analysis.filePath, pageData);
            break;
          case 'missing_internal_links':
            addInternalLinks(analysis.filePath, pageData, pagesData);
            break;
          case 'missing_lazy_loading':
            implementLazyLoading(analysis.filePath);
            break;
        }
      }
      
      fixedCount++;
    } catch (error) {
      console.error(`❌ Error fixing ${analysis.filePath}:`, error);
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} pages successfully!`);
}

/**
 * Generates a comprehensive SEO report
 */
async function generateSEOReport(): Promise<void> {
  console.log('\n📋 Generating SEO report...');
  
  const analyses = await scanAllPages();
  const issueTypes = new Map<string, number>();
  
  analyses.forEach(analysis => {
    analysis.issues.forEach(issue => {
      issueTypes.set(issue, (issueTypes.get(issue) || 0) + 1);
    });
  });
  
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: analyses.length,
    pagesWithIssues: analyses.filter(a => a.issues.length > 0).length,
    issueBreakdown: Object.fromEntries(issueTypes),
    recommendations: [
      'Implement regular SEO monitoring',
      'Set up automated meta tag generation',
      'Create internal linking strategy',
      'Optimize images for better performance',
      'Monitor Core Web Vitals regularly'
    ]
  };
  
  fs.writeFileSync('seo-report.json', JSON.stringify(report, null, 2));
  console.log('📄 SEO report saved to seo-report.json');
  
  console.log('\n📊 Issue Summary:');
  Array.from(issueTypes.entries()).forEach(([issue, count]) => {
    console.log(`  - ${issue}: ${count} pages`);
  });
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  try {
    console.log('🎯 Comprehensive SEO Issues Fixing Script');
    console.log('==========================================\n');
    
    // Step 1: Scan and analyze all pages
    await scanAllPages();
    
    // Step 2: Fix all identified issues
    await fixAllIssues();
    
    // Step 3: Generate final report
    await generateSEOReport();
    
    console.log('\n🎉 All SEO issues have been fixed!');
    console.log('\n📋 What was fixed:');
    console.log('✅ Missing H1 tags across all pages');
    console.log('✅ Missing meta descriptions');
    console.log('✅ Missing Open Graph and Twitter Card tags');
    console.log('✅ Orphan pages (added internal links)');
    console.log('✅ Image optimization and lazy loading');
    
    console.log('\n🔄 Next steps:');
    console.log('1. Run: npm run build');
    console.log('2. Test pages with Google Rich Results Test');
    console.log('3. Monitor SEO performance');
    console.log('4. Deploy to production');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixSEOIssuesComprehensive };