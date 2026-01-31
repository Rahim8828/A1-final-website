#!/usr/bin/env tsx

/**
 * Fix Missing Meta Descriptions Script
 * Generates optimized meta descriptions (150-160 chars) for all pages
 * Requirement: 2.2 - Meta description optimization
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { MetaManager } from '../src/seo/managers/MetaManager';
import { SEOPage } from '../src/seo/types';

const metaManager = new MetaManager({
  metaDescriptionMinLength: 150,
  metaDescriptionMaxLength: 160,
  h1KeywordRequirement: true,
  socialMediaTagsRequired: true
});

interface MetaAnalysis {
  filePath: string;
  hasMetaDescription: boolean;
  currentMeta?: string;
  currentLength: number;
  isOptimal: boolean;
  suggestedMeta?: string;
  keywords: string[];
}

/**
 * Analyzes a page for meta description quality
 */
function analyzeMetaDescription(filePath: string): MetaAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract current meta description
  const metaMatch = content.match(/"metaDescription":\s*"([^"]+)"/);
  const hasMetaDescription = !!metaMatch && metaMatch[1].length > 0 && !metaMatch[1].includes('...');
  const currentMeta = metaMatch ? metaMatch[1] : undefined;
  const currentLength = currentMeta ? currentMeta.length : 0;
  
  // Check if current meta is optimal (150-160 chars)
  const isOptimal = currentLength >= 150 && currentLength <= 160;
  
  // Extract page data for generating new meta
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  const serviceMatch = content.match(/"serviceName":\s*"([^"]+)"/);
  const locationMatch = content.match(/"location":\s*"([^"]+)"/);
  
  const title = titleMatch ? titleMatch[1] : '';
  const url = urlMatch ? urlMatch[1] : '';
  const serviceName = serviceMatch ? serviceMatch[1] : '';
  const location = locationMatch ? locationMatch[1] : '';
  
  // Extract keywords
  const keywords = extractKeywords(title, url, serviceName, location);
  
  // Generate suggested meta if needed
  let suggestedMeta: string | undefined;
  if (!hasMetaDescription || !isOptimal) {
    suggestedMeta = generateOptimizedMetaDescription(title, url, serviceName, location, keywords);
  }
  
  return {
    filePath,
    hasMetaDescription,
    currentMeta,
    currentLength,
    isOptimal,
    suggestedMeta,
    keywords
  };
}

/**
 * Extracts relevant keywords for meta description
 */
function extractKeywords(title: string, url: string, serviceName: string, location: string): string[] {
  const keywords: string[] = [];
  
  // Service-related keywords
  const serviceKeywords = [
    'furniture polish', 'wood polish', 'furniture polishing', 'professional',
    'expert', 'quality', 'affordable', 'best', 'top-rated'
  ];
  
  serviceKeywords.forEach(keyword => {
    if (title.toLowerCase().includes(keyword) || 
        url.toLowerCase().includes(keyword) || 
        serviceName.toLowerCase().includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  // Location keywords
  if (location) {
    keywords.push(location);
    if (location.toLowerCase() !== 'mumbai') {
      keywords.push('Mumbai'); // Always include Mumbai as it's the main city
    }
  }
  
  // Service type keywords
  const serviceTypes = [
    'sofa', 'table', 'wardrobe', 'cabinet', 'door', 'antique', 'wooden',
    'pu polish', 'duco', 'melamine', 'teak wood'
  ];
  
  serviceTypes.forEach(type => {
    if (title.toLowerCase().includes(type) || 
        url.toLowerCase().includes(type) || 
        serviceName.toLowerCase().includes(type)) {
      keywords.push(type);
    }
  });
  
  return Array.from(new Set(keywords)); // Remove duplicates
}

/**
 * Generates an optimized meta description (150-160 characters)
 */
function generateOptimizedMetaDescription(
  title: string, 
  url: string, 
  serviceName: string, 
  location: string, 
  keywords: string[]
): string {
  // Create SEO page object for MetaManager
  const seoPage: SEOPage = {
    url: url || '',
    title: title || '',
    metaDescription: '',
    h1Tag: title || '',
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
  
  // Use MetaManager to generate description
  const generatedMeta = metaManager.generateMetaDescription(seoPage, keywords);
  
  // Ensure it's within optimal length
  if (generatedMeta.length > 160) {
    return generatedMeta.substring(0, 157) + '...';
  } else if (generatedMeta.length < 150) {
    // Add call-to-action to reach minimum length
    const cta = ' Call now for free quote!';
    if (generatedMeta.length + cta.length <= 160) {
      return generatedMeta + cta;
    }
  }
  
  return generatedMeta;
}

/**
 * Fixes meta description in a file
 */
function fixMetaDescription(analysis: MetaAnalysis): boolean {
  if (!analysis.suggestedMeta) {
    return false; // No fix needed
  }
  
  try {
    let content = fs.readFileSync(analysis.filePath, 'utf-8');
    
    if (analysis.hasMetaDescription) {
      // Update existing meta description
      content = content.replace(
        /"metaDescription":\s*"[^"]*"/,
        `"metaDescription": "${analysis.suggestedMeta}"`
      );
    } else {
      // Add new meta description after title
      content = content.replace(
        /"title":\s*"([^"]+)"/,
        `"title": "$1",\n  "metaDescription": "${analysis.suggestedMeta}"`
      );
    }
    
    fs.writeFileSync(analysis.filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error fixing meta description in ${analysis.filePath}:`, error);
    return false;
  }
}

/**
 * Validates meta description uniqueness
 */
function validateMetaUniqueness(analyses: MetaAnalysis[]): { isUnique: boolean; duplicates: string[] } {
  const metaDescriptions = new Map<string, string[]>();
  
  analyses.forEach(analysis => {
    const meta = analysis.currentMeta || analysis.suggestedMeta;
    if (meta) {
      const normalized = meta.toLowerCase().trim();
      if (!metaDescriptions.has(normalized)) {
        metaDescriptions.set(normalized, []);
      }
      metaDescriptions.get(normalized)!.push(analysis.filePath);
    }
  });
  
  const duplicates: string[] = [];
  metaDescriptions.forEach((files, meta) => {
    if (files.length > 1) {
      duplicates.push(`"${meta.substring(0, 50)}..." appears in: ${files.map(f => path.basename(f)).join(', ')}`);
    }
  });
  
  return {
    isUnique: duplicates.length === 0,
    duplicates
  };
}

/**
 * Generates a comprehensive report
 */
function generateMetaReport(analyses: MetaAnalysis[]): void {
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: analyses.length,
    pagesWithMeta: analyses.filter(a => a.hasMetaDescription).length,
    pagesWithOptimalMeta: analyses.filter(a => a.isOptimal).length,
    averageLength: Math.round(
      analyses
        .filter(a => a.currentMeta)
        .reduce((sum, a) => sum + a.currentLength, 0) / 
      analyses.filter(a => a.currentMeta).length
    ),
    lengthDistribution: {
      tooShort: analyses.filter(a => a.currentLength > 0 && a.currentLength < 150).length,
      optimal: analyses.filter(a => a.currentLength >= 150 && a.currentLength <= 160).length,
      tooLong: analyses.filter(a => a.currentLength > 160).length,
      missing: analyses.filter(a => a.currentLength === 0).length
    }
  };
  
  fs.writeFileSync('meta-description-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Meta description report saved to meta-description-report.json');
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🎯 Fix Missing Meta Descriptions Script');
  console.log('======================================\n');
  
  try {
    // Get all page files
    const generatedPages = await glob('src/pages/generated/*.tsx');
    const staticPages = await glob('src/pages/*.tsx');
    const allPageFiles = [...generatedPages, ...staticPages];
    
    console.log(`📄 Analyzing ${allPageFiles.length} pages for meta descriptions...\n`);
    
    // Analyze all pages
    const analyses: MetaAnalysis[] = [];
    for (const filePath of allPageFiles) {
      const analysis = analyzeMetaDescription(filePath);
      analyses.push(analysis);
      
      if (!analysis.hasMetaDescription) {
        console.log(`❌ Missing: ${path.basename(filePath)}`);
      } else if (!analysis.isOptimal) {
        console.log(`⚠️  Suboptimal: ${path.basename(filePath)} (${analysis.currentLength} chars)`);
      } else {
        console.log(`✅ Optimal: ${path.basename(filePath)} (${analysis.currentLength} chars)`);
      }
    }
    
    // Check uniqueness
    console.log('\n🔍 Checking meta description uniqueness...');
    const uniquenessCheck = validateMetaUniqueness(analyses);
    if (!uniquenessCheck.isUnique) {
      console.log('⚠️  Found duplicate meta descriptions:');
      uniquenessCheck.duplicates.forEach(dup => console.log(`  - ${dup}`));
    }
    
    // Fix issues
    const pagesToFix = analyses.filter(a => a.suggestedMeta);
    console.log(`\n🔧 Fixing ${pagesToFix.length} pages...\n`);
    
    let fixedCount = 0;
    for (const analysis of pagesToFix) {
      if (fixMetaDescription(analysis)) {
        console.log(`✅ Fixed: ${path.basename(analysis.filePath)} (${analysis.suggestedMeta?.length} chars)`);
        console.log(`   "${analysis.suggestedMeta}"`);
        fixedCount++;
      } else {
        console.log(`❌ Failed: ${path.basename(analysis.filePath)}`);
      }
    }
    
    // Final validation
    console.log('\n🔍 Final validation...');
    const finalAnalyses = allPageFiles.map(analyzeMetaDescription);
    const finalUniqueness = validateMetaUniqueness(finalAnalyses);
    
    // Generate report
    generateMetaReport(finalAnalyses);
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total pages: ${analyses.length}`);
    console.log(`- Pages fixed: ${fixedCount}`);
    console.log(`- Pages with meta: ${finalAnalyses.filter(a => a.hasMetaDescription).length}`);
    console.log(`- Optimal length: ${finalAnalyses.filter(a => a.isOptimal).length}`);
    console.log(`- Uniqueness: ${finalUniqueness.isUnique ? '✅ All unique' : '❌ Duplicates found'}`);
    
    if (!finalUniqueness.isUnique) {
      console.log('\n⚠️  Remaining duplicate meta descriptions:');
      finalUniqueness.duplicates.forEach(dup => console.log(`  - ${dup}`));
    }
    
    console.log('\n✅ Meta description fixing completed!');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixMissingMetaDescriptions };