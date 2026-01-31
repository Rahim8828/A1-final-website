#!/usr/bin/env tsx

/**
 * Add Social Media Tags Script
 * Adds Open Graph and Twitter Card tags to all pages
 * Requirements: 2.3 - Complete social media tags
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { MetaManager } from '../src/seo/managers/MetaManager';
import { SEOPage, OpenGraphData, TwitterCardData } from '../src/seo/types';

const metaManager = new MetaManager({
  metaDescriptionMinLength: 150,
  metaDescriptionMaxLength: 160,
  h1KeywordRequirement: true,
  socialMediaTagsRequired: true
});

interface SocialMediaAnalysis {
  filePath: string;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  currentOG?: any;
  currentTwitter?: any;
  suggestedOG?: OpenGraphData;
  suggestedTwitter?: TwitterCardData;
  pageData: any;
}

/**
 * Analyzes a page for social media tags
 */
function analyzeSocialMediaTags(filePath: string): SocialMediaAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for existing Open Graph tags
  const hasOpenGraph = content.includes('openGraphTags') || content.includes('"og:');
  let currentOG: any = undefined;
  
  if (hasOpenGraph) {
    const ogMatch = content.match(/"openGraphTags":\s*({[^}]+})/);
    if (ogMatch) {
      try {
        currentOG = JSON.parse(ogMatch[1]);
      } catch (e) {
        // Invalid JSON, treat as missing
      }
    }
  }
  
  // Check for existing Twitter Card tags
  const hasTwitterCard = content.includes('twitterCardTags') || content.includes('"twitter:');
  let currentTwitter: any = undefined;
  
  if (hasTwitterCard) {
    const twitterMatch = content.match(/"twitterCardTags":\s*({[^}]+})/);
    if (twitterMatch) {
      try {
        currentTwitter = JSON.parse(twitterMatch[1]);
      } catch (e) {
        // Invalid JSON, treat as missing
      }
    }
  }
  
  // Extract page data
  const pageData = extractPageData(content);
  
  // Generate suggested tags if missing or incomplete
  let suggestedOG: OpenGraphData | undefined;
  let suggestedTwitter: TwitterCardData | undefined;
  
  if (!hasOpenGraph || !isCompleteOpenGraph(currentOG)) {
    suggestedOG = generateOpenGraphTags(pageData);
  }
  
  if (!hasTwitterCard || !isCompleteTwitterCard(currentTwitter)) {
    suggestedTwitter = generateTwitterCardTags(pageData);
  }
  
  return {
    filePath,
    hasOpenGraph,
    hasTwitterCard,
    currentOG,
    currentTwitter,
    suggestedOG,
    suggestedTwitter,
    pageData
  };
}

/**
 * Extracts page data from file content
 */
function extractPageData(content: string): any {
  const data: any = {};
  
  // Extract basic fields
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const metaMatch = content.match(/"metaDescription":\s*"([^"]+)"/);
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  const h1Match = content.match(/"h1":\s*"([^"]+)"/);
  const serviceMatch = content.match(/"serviceName":\s*"([^"]+)"/);
  const locationMatch = content.match(/"location":\s*"([^"]+)"/);
  
  data.title = titleMatch ? titleMatch[1] : '';
  data.metaDescription = metaMatch ? metaMatch[1] : '';
  data.url = urlMatch ? urlMatch[1] : '';
  data.h1 = h1Match ? h1Match[1] : '';
  data.serviceName = serviceMatch ? serviceMatch[1] : '';
  data.location = locationMatch ? locationMatch[1] : '';
  
  return data;
}

/**
 * Checks if Open Graph data is complete
 */
function isCompleteOpenGraph(og: any): boolean {
  if (!og) return false;
  
  const requiredFields = ['title', 'description', 'url', 'type', 'siteName'];
  return requiredFields.every(field => og[field] && og[field].length > 0);
}

/**
 * Checks if Twitter Card data is complete
 */
function isCompleteTwitterCard(twitter: any): boolean {
  if (!twitter) return false;
  
  const requiredFields = ['card', 'title', 'description'];
  return requiredFields.every(field => twitter[field] && twitter[field].length > 0);
}

/**
 * Generates Open Graph tags for a page
 */
function generateOpenGraphTags(pageData: any): OpenGraphData {
  // Create SEO page object
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
  
  // Use MetaManager to generate tags
  const ogTags = metaManager.generateOpenGraphTags(seoPage);
  
  return {
    title: ogTags['og:title'] || pageData.title || 'A1 Furniture Polish',
    description: ogTags['og:description'] || pageData.metaDescription || 'Professional furniture polishing services in Mumbai',
    image: ogTags['og:image'] || generateImageUrl(pageData),
    url: `https://www.a1furniturepolish.com${pageData.url || ''}`,
    type: 'website',
    siteName: 'A1 Furniture Polish'
  };
}

/**
 * Generates Twitter Card tags for a page
 */
function generateTwitterCardTags(pageData: any): TwitterCardData {
  // Create SEO page object
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
  
  // Use MetaManager to generate tags
  const twitterTags = metaManager.generateTwitterCardTags(seoPage);
  
  return {
    card: 'summary_large_image',
    title: twitterTags['twitter:title'] || pageData.title || 'A1 Furniture Polish',
    description: twitterTags['twitter:description'] || pageData.metaDescription || 'Professional furniture polishing services in Mumbai',
    image: twitterTags['twitter:image'] || generateImageUrl(pageData),
    site: '@A1FurniturePolish',
    creator: '@A1FurniturePolish'
  };
}

/**
 * Generates appropriate image URL based on page content
 */
function generateImageUrl(pageData: any): string {
  const baseUrl = '/assets/optimized/';
  const serviceName = (pageData.serviceName || pageData.title || '').toLowerCase();
  
  // Map service types to appropriate images
  if (serviceName.includes('sofa')) {
    return `${baseUrl}Sofa And chair-640w.webp`;
  } else if (serviceName.includes('table') || serviceName.includes('dining')) {
    return `${baseUrl}Study-table-polish-640w.webp`;
  } else if (serviceName.includes('bed')) {
    return `${baseUrl}Bed-polish-640w.webp`;
  } else if (serviceName.includes('cabinet')) {
    return `${baseUrl}Cabinet-polish-640w.webp`;
  } else if (serviceName.includes('wardrobe')) {
    return `${baseUrl}Wardrobe-polish-640w.webp`;
  } else if (serviceName.includes('door')) {
    return `${baseUrl}Door-polish-640w.webp`;
  } else if (serviceName.includes('antique')) {
    return `${baseUrl}Antique Restoration-640w.webp`;
  } else if (serviceName.includes('mandir')) {
    return `${baseUrl}Mandir-polish-640w.webp`;
  } else if (serviceName.includes('jhula')) {
    return `${baseUrl}Jhula-Polish-640w.webp`;
  }
  
  // Default furniture polishing image
  return `${baseUrl}wooden furniture -640w.webp`;
}

/**
 * Adds social media tags to a file
 */
function addSocialMediaTags(analysis: SocialMediaAnalysis): boolean {
  if (!analysis.suggestedOG && !analysis.suggestedTwitter) {
    return false; // No changes needed
  }
  
  try {
    let content = fs.readFileSync(analysis.filePath, 'utf-8');
    
    // Add Open Graph tags
    if (analysis.suggestedOG) {
      const ogTagsJson = JSON.stringify(analysis.suggestedOG, null, 4);
      
      if (analysis.hasOpenGraph) {
        // Update existing Open Graph tags
        content = content.replace(
          /"openGraphTags":\s*{[^}]+}/,
          `"openGraphTags": ${ogTagsJson}`
        );
      } else {
        // Add new Open Graph tags
        const insertPoint = content.lastIndexOf('};');
        if (insertPoint > -1) {
          const beforeClosing = content.substring(0, insertPoint);
          const afterClosing = content.substring(insertPoint);
          
          content = beforeClosing + 
            `,\n  "openGraphTags": ${ogTagsJson}` +
            (analysis.suggestedTwitter ? '' : '\n') +
            afterClosing;
        }
      }
    }
    
    // Add Twitter Card tags
    if (analysis.suggestedTwitter) {
      const twitterTagsJson = JSON.stringify(analysis.suggestedTwitter, null, 4);
      
      if (analysis.hasTwitterCard) {
        // Update existing Twitter Card tags
        content = content.replace(
          /"twitterCardTags":\s*{[^}]+}/,
          `"twitterCardTags": ${twitterTagsJson}`
        );
      } else {
        // Add new Twitter Card tags
        const insertPoint = content.lastIndexOf('};');
        if (insertPoint > -1) {
          const beforeClosing = content.substring(0, insertPoint);
          const afterClosing = content.substring(insertPoint);
          
          content = beforeClosing + 
            `,\n  "twitterCardTags": ${twitterTagsJson}\n` +
            afterClosing;
        }
      }
    }
    
    fs.writeFileSync(analysis.filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error adding social media tags to ${analysis.filePath}:`, error);
    return false;
  }
}

/**
 * Validates social media tags completeness
 */
function validateSocialMediaTags(analyses: SocialMediaAnalysis[]): {
  completeOG: number;
  completeTwitter: number;
  bothComplete: number;
} {
  let completeOG = 0;
  let completeTwitter = 0;
  let bothComplete = 0;
  
  analyses.forEach(analysis => {
    const hasCompleteOG = analysis.hasOpenGraph && isCompleteOpenGraph(analysis.currentOG);
    const hasCompleteTwitter = analysis.hasTwitterCard && isCompleteTwitterCard(analysis.currentTwitter);
    
    if (hasCompleteOG) completeOG++;
    if (hasCompleteTwitter) completeTwitter++;
    if (hasCompleteOG && hasCompleteTwitter) bothComplete++;
  });
  
  return { completeOG, completeTwitter, bothComplete };
}

/**
 * Generates a comprehensive report
 */
function generateSocialMediaReport(analyses: SocialMediaAnalysis[]): void {
  const validation = validateSocialMediaTags(analyses);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: analyses.length,
    openGraphStats: {
      present: analyses.filter(a => a.hasOpenGraph).length,
      complete: validation.completeOG,
      missing: analyses.filter(a => !a.hasOpenGraph).length
    },
    twitterCardStats: {
      present: analyses.filter(a => a.hasTwitterCard).length,
      complete: validation.completeTwitter,
      missing: analyses.filter(a => !a.hasTwitterCard).length
    },
    bothComplete: validation.bothComplete,
    imageDistribution: getImageDistribution(analyses)
  };
  
  fs.writeFileSync('social-media-tags-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Social media tags report saved to social-media-tags-report.json');
}

/**
 * Gets distribution of images used in social media tags
 */
function getImageDistribution(analyses: SocialMediaAnalysis[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  
  analyses.forEach(analysis => {
    const image = analysis.suggestedOG?.image || analysis.currentOG?.image;
    if (image) {
      const imageName = path.basename(image);
      distribution[imageName] = (distribution[imageName] || 0) + 1;
    }
  });
  
  return distribution;
}

/**
 * Main execution function
 */
async function main(): void {
  console.log('🎯 Add Social Media Tags Script');
  console.log('================================\n');
  
  try {
    // Get all page files
    const generatedPages = await glob('src/pages/generated/*.tsx');
    const staticPages = await glob('src/pages/*.tsx');
    const allPageFiles = [...generatedPages, ...staticPages];
    
    console.log(`📄 Analyzing ${allPageFiles.length} pages for social media tags...\n`);
    
    // Analyze all pages
    const analyses: SocialMediaAnalysis[] = [];
    for (const filePath of allPageFiles) {
      const analysis = analyzeSocialMediaTags(filePath);
      analyses.push(analysis);
      
      const ogStatus = analysis.hasOpenGraph ? '✅' : '❌';
      const twitterStatus = analysis.hasTwitterCard ? '✅' : '❌';
      
      console.log(`${path.basename(filePath)}: OG ${ogStatus} Twitter ${twitterStatus}`);
    }
    
    // Initial validation
    console.log('\n🔍 Initial validation...');
    const initialValidation = validateSocialMediaTags(analyses);
    console.log(`- Complete Open Graph: ${initialValidation.completeOG}/${analyses.length}`);
    console.log(`- Complete Twitter Cards: ${initialValidation.completeTwitter}/${analyses.length}`);
    console.log(`- Both complete: ${initialValidation.bothComplete}/${analyses.length}`);
    
    // Fix issues
    const pagesToFix = analyses.filter(a => a.suggestedOG || a.suggestedTwitter);
    console.log(`\n🔧 Adding social media tags to ${pagesToFix.length} pages...\n`);
    
    let fixedCount = 0;
    for (const analysis of pagesToFix) {
      if (addSocialMediaTags(analysis)) {
        const changes = [];
        if (analysis.suggestedOG) changes.push('Open Graph');
        if (analysis.suggestedTwitter) changes.push('Twitter Card');
        
        console.log(`✅ Added ${changes.join(' + ')}: ${path.basename(analysis.filePath)}`);
        fixedCount++;
      } else {
        console.log(`❌ Failed: ${path.basename(analysis.filePath)}`);
      }
    }
    
    // Final validation
    console.log('\n🔍 Final validation...');
    const finalAnalyses = allPageFiles.map(analyzeSocialMediaTags);
    const finalValidation = validateSocialMediaTags(finalAnalyses);
    
    // Generate report
    generateSocialMediaReport(finalAnalyses);
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total pages: ${analyses.length}`);
    console.log(`- Pages fixed: ${fixedCount}`);
    console.log(`- Complete Open Graph: ${finalValidation.completeOG}/${analyses.length}`);
    console.log(`- Complete Twitter Cards: ${finalValidation.completeTwitter}/${analyses.length}`);
    console.log(`- Both complete: ${finalValidation.bothComplete}/${analyses.length}`);
    
    const completionRate = Math.round((finalValidation.bothComplete / analyses.length) * 100);
    console.log(`- Completion rate: ${completionRate}%`);
    
    console.log('\n✅ Social media tags addition completed!');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as addSocialMediaTags };