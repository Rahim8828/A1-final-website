#!/usr/bin/env tsx

/**
 * Fix Missing H1 Tags Script
 * Addresses missing H1 tags across all 175 pages
 * Requirement: 2.1 - Unique H1 tags with keywords
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { MetaManager } from '../src/seo/managers/MetaManager';

interface H1Analysis {
  filePath: string;
  hasH1: boolean;
  currentH1?: string;
  suggestedH1?: string;
  keywords: string[];
}

/**
 * Analyzes a page for H1 tag presence and quality
 */
function analyzeH1Tag(filePath: string): H1Analysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for existing H1 tag
  const h1Match = content.match(/"h1":\s*"([^"]+)"/);
  const hasH1 = !!h1Match;
  const currentH1 = h1Match ? h1Match[1] : undefined;
  
  // Extract keywords from file content
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  
  const title = titleMatch ? titleMatch[1] : '';
  const url = urlMatch ? urlMatch[1] : '';
  
  // Extract keywords from title and URL
  const keywords = extractKeywords(title, url);
  
  // Generate suggested H1 if missing or needs improvement
  let suggestedH1: string | undefined;
  if (!hasH1 || (currentH1 && !containsKeywords(currentH1, keywords))) {
    suggestedH1 = generateH1Tag(title, url, keywords);
  }
  
  return {
    filePath,
    hasH1,
    currentH1,
    suggestedH1,
    keywords
  };
}

/**
 * Extracts keywords from title and URL
 */
function extractKeywords(title: string, url: string): string[] {
  const keywords: string[] = [];
  
  // Extract from title
  const titleWords = title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  // Extract location from URL or title
  const locations = [
    'mumbai', 'andheri', 'bandra', 'goregaon', 'powai', 'thane', 'navi-mumbai',
    'borivali', 'malad', 'kandivali', 'jogeshwari', 'vile-parle', 'santacruz',
    'juhu', 'khar', 'bkc', 'worli', 'dadar', 'sion', 'kurla', 'ghatkopar',
    'vikhroli', 'mulund', 'bhandup', 'nahur', 'chembur', 'wadala'
  ];
  
  const location = locations.find(loc => 
    title.toLowerCase().includes(loc) || url.toLowerCase().includes(loc)
  );
  
  // Extract service type
  const services = [
    'furniture polish', 'wood polish', 'sofa polish', 'table polish',
    'wardrobe polish', 'cabinet polish', 'door polish', 'antique restoration',
    'pu polish', 'duco polish', 'melamine polish', 'teak wood polish'
  ];
  
  const service = services.find(svc => 
    title.toLowerCase().includes(svc) || url.toLowerCase().includes(svc)
  );
  
  // Add primary keywords
  if (service) keywords.push(service);
  if (location) keywords.push(location);
  
  // Add quality indicators
  const qualityWords = titleWords.filter(word => 
    ['professional', 'best', 'top-rated', 'affordable', 'expert', 'quality'].includes(word)
  );
  keywords.push(...qualityWords);
  
  return Array.from(new Set(keywords)); // Remove duplicates
}

/**
 * Checks if H1 contains relevant keywords
 */
function containsKeywords(h1: string, keywords: string[]): boolean {
  const h1Lower = h1.toLowerCase();
  return keywords.some(keyword => h1Lower.includes(keyword.toLowerCase()));
}

/**
 * Generates an optimized H1 tag with keywords
 */
function generateH1Tag(title: string, url: string, keywords: string[]): string {
  // Extract service and location
  const location = keywords.find(k => 
    ['mumbai', 'andheri', 'bandra', 'goregaon', 'powai'].includes(k.toLowerCase())
  );
  
  const service = keywords.find(k => 
    k.includes('polish') || k.includes('restoration')
  );
  
  const quality = keywords.find(k => 
    ['professional', 'best', 'top-rated', 'affordable'].includes(k.toLowerCase())
  );
  
  // Build H1 tag
  let h1 = '';
  
  if (quality) {
    h1 += quality.charAt(0).toUpperCase() + quality.slice(1) + ' ';
  }
  
  if (service) {
    h1 += service.charAt(0).toUpperCase() + service.slice(1);
  } else {
    h1 += 'Furniture Polish';
  }
  
  if (location && location.toLowerCase() !== 'mumbai') {
    h1 += ` in ${location.charAt(0).toUpperCase() + location.slice(1)}`;
  } else if (location) {
    h1 += ` Mumbai`;
  }
  
  // Fallback to title if generation fails
  if (h1.trim().length < 10) {
    h1 = title;
  }
  
  return h1.trim();
}

/**
 * Fixes missing or poor H1 tags in a file
 */
function fixH1Tag(analysis: H1Analysis): boolean {
  if (!analysis.suggestedH1) {
    return false; // No fix needed
  }
  
  try {
    let content = fs.readFileSync(analysis.filePath, 'utf-8');
    
    if (analysis.hasH1) {
      // Update existing H1
      content = content.replace(
        /"h1":\s*"[^"]*"/,
        `"h1": "${analysis.suggestedH1}"`
      );
    } else {
      // Add new H1 after title
      content = content.replace(
        /"title":\s*"([^"]+)"/,
        `"title": "$1",\n  "h1": "${analysis.suggestedH1}"`
      );
    }
    
    fs.writeFileSync(analysis.filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error fixing H1 in ${analysis.filePath}:`, error);
    return false;
  }
}

/**
 * Validates H1 uniqueness across all pages
 */
function validateH1Uniqueness(analyses: H1Analysis[]): { isUnique: boolean; duplicates: string[] } {
  const h1Tags = new Map<string, string[]>();
  
  analyses.forEach(analysis => {
    const h1 = analysis.currentH1 || analysis.suggestedH1;
    if (h1) {
      const normalized = h1.toLowerCase().trim();
      if (!h1Tags.has(normalized)) {
        h1Tags.set(normalized, []);
      }
      h1Tags.get(normalized)!.push(analysis.filePath);
    }
  });
  
  const duplicates: string[] = [];
  h1Tags.forEach((files, h1) => {
    if (files.length > 1) {
      duplicates.push(`"${h1}" appears in: ${files.map(f => path.basename(f)).join(', ')}`);
    }
  });
  
  return {
    isUnique: duplicates.length === 0,
    duplicates
  };
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🎯 Fix Missing H1 Tags Script');
  console.log('==============================\n');
  
  try {
    // Get all page files
    const generatedPages = await glob('src/pages/generated/*.tsx');
    const staticPages = await glob('src/pages/*.tsx');
    const allPageFiles = [...generatedPages, ...staticPages];
    
    console.log(`📄 Analyzing ${allPageFiles.length} pages for H1 tags...\n`);
    
    // Analyze all pages
    const analyses: H1Analysis[] = [];
    for (const filePath of allPageFiles) {
      const analysis = analyzeH1Tag(filePath);
      analyses.push(analysis);
      
      if (!analysis.hasH1) {
        console.log(`❌ Missing H1: ${path.basename(filePath)}`);
      } else if (analysis.suggestedH1 && analysis.suggestedH1 !== analysis.currentH1) {
        console.log(`⚠️  Poor H1: ${path.basename(filePath)} - "${analysis.currentH1}"`);
      } else {
        console.log(`✅ Good H1: ${path.basename(filePath)} - "${analysis.currentH1}"`);
      }
    }
    
    // Check uniqueness before fixing
    console.log('\n🔍 Checking H1 uniqueness...');
    const uniquenessCheck = validateH1Uniqueness(analyses);
    if (!uniquenessCheck.isUnique) {
      console.log('⚠️  Found duplicate H1 tags:');
      uniquenessCheck.duplicates.forEach(dup => console.log(`  - ${dup}`));
    }
    
    // Fix issues
    const pagesToFix = analyses.filter(a => a.suggestedH1);
    console.log(`\n🔧 Fixing ${pagesToFix.length} pages...\n`);
    
    let fixedCount = 0;
    for (const analysis of pagesToFix) {
      if (fixH1Tag(analysis)) {
        console.log(`✅ Fixed: ${path.basename(analysis.filePath)} - "${analysis.suggestedH1}"`);
        fixedCount++;
      } else {
        console.log(`❌ Failed: ${path.basename(analysis.filePath)}`);
      }
    }
    
    // Final validation
    console.log('\n🔍 Final validation...');
    const finalAnalyses = allPageFiles.map(analyzeH1Tag);
    const finalUniqueness = validateH1Uniqueness(finalAnalyses);
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total pages: ${analyses.length}`);
    console.log(`- Pages fixed: ${fixedCount}`);
    console.log(`- Pages with H1: ${finalAnalyses.filter(a => a.hasH1).length}`);
    console.log(`- H1 uniqueness: ${finalUniqueness.isUnique ? '✅ All unique' : '❌ Duplicates found'}`);
    
    if (!finalUniqueness.isUnique) {
      console.log('\n⚠️  Remaining duplicate H1 tags:');
      finalUniqueness.duplicates.forEach(dup => console.log(`  - ${dup}`));
    }
    
    console.log('\n✅ H1 tag fixing completed!');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixMissingH1Tags };