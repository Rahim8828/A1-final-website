#!/usr/bin/env tsx

/**
 * Fix Orphan Pages Script
 * Creates internal links to fix orphan pages (pages with no incoming links)
 * Requirements: 1.1, 1.2 - Internal linking optimization and orphan page fixes
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { LinkManager } from '../src/seo/managers/LinkManager';
import { SEOPage, Link } from '../src/seo/types';
import { pagesData } from '../src/data/generatedPagesData';

const linkManager = new LinkManager({
  minOutgoingLinks: 3,
  maxOutgoingLinks: 10,
  contextualRelevanceThreshold: 0.7,
  avoidCircularReferences: true
});

interface LinkAnalysis {
  filePath: string;
  url: string;
  isOrphan: boolean;
  incomingLinks: string[];
  outgoingLinks: string[];
  suggestedIncomingLinks: Link[];
  suggestedOutgoingLinks: Link[];
  pageData: any;
}

/**
 * Analyzes a page for link structure
 */
function analyzeLinkStructure(filePath: string, allPages: any[]): LinkAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract page data
  const pageData = extractPageData(content);
  const url = pageData.url;
  
  // Find incoming links (pages that link to this page)
  const incomingLinks: string[] = [];
  allPages.forEach(page => {
    if (page.url !== url) {
      // Check if this page links to our target page
      const pageContent = getPageContent(page);
      if (pageContent && (
        pageContent.includes(`href="${url}"`) ||
        pageContent.includes(`"${url}"`) ||
        (page.internalLinks && page.internalLinks.some((link: any) => link.url === url))
      )) {
        incomingLinks.push(page.url);
      }
    }
  });
  
  // Extract outgoing links from current page
  const outgoingLinks = extractOutgoingLinks(content);
  
  // Determine if page is orphan (no incoming links)
  const isOrphan = incomingLinks.length === 0;
  
  // Generate suggested links
  const suggestedIncomingLinks = isOrphan ? generateIncomingLinks(pageData, allPages) : [];
  const suggestedOutgoingLinks = outgoingLinks.length < 3 ? generateOutgoingLinks(pageData, allPages) : [];
  
  return {
    filePath,
    url,
    isOrphan,
    incomingLinks,
    outgoingLinks,
    suggestedIncomingLinks,
    suggestedOutgoingLinks,
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
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  const serviceMatch = content.match(/"serviceName":\s*"([^"]+)"/);
  const locationMatch = content.match(/"location":\s*"([^"]+)"/);
  const categoryMatch = content.match(/"serviceCategory":\s*"([^"]+)"/);
  
  data.title = titleMatch ? titleMatch[1] : '';
  data.url = urlMatch ? urlMatch[1] : '';
  data.serviceName = serviceMatch ? serviceMatch[1] : '';
  data.location = locationMatch ? locationMatch[1] : '';
  data.serviceCategory = categoryMatch ? categoryMatch[1] : '';
  
  return data;
}

/**
 * Gets page content for analysis
 */
function getPageContent(page: any): string | null {
  try {
    // Try to find the corresponding file
    const fileName = generateFileName(page.url);
    const possiblePaths = [
      `src/pages/generated/${fileName}.tsx`,
      `src/pages/${fileName}.tsx`
    ];
    
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Generates file name from URL
 */
function generateFileName(url: string): string {
  return url
    .replace(/^\/services\//, '')
    .replace(/^\//, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Extracts outgoing links from page content
 */
function extractOutgoingLinks(content: string): string[] {
  const links: string[] = [];
  
  // Extract from href attributes
  const hrefMatches = content.match(/href="(\/[^"]+)"/g) || [];
  hrefMatches.forEach(match => {
    const url = match.match(/href="([^"]+)"/)?.[1];
    if (url && url.startsWith('/') && !url.startsWith('//')) {
      links.push(url);
    }
  });
  
  // Extract from internalLinks array
  const internalLinksMatch = content.match(/"internalLinks":\s*\[([^\]]+)\]/);
  if (internalLinksMatch) {
    try {
      const linksArray = JSON.parse(`[${internalLinksMatch[1]}]`);
      linksArray.forEach((link: any) => {
        if (link.url) {
          links.push(link.url);
        }
      });
    } catch (e) {
      // Invalid JSON, skip
    }
  }
  
  return Array.from(new Set(links)); // Remove duplicates
}

/**
 * Generates incoming links for orphan pages
 */
function generateIncomingLinks(pageData: any, allPages: any[]): Link[] {
  const incomingLinks: Link[] = [];
  
  // Find related pages that should link to this page
  const relatedPages = findRelatedPages(pageData, allPages);
  
  relatedPages.slice(0, 3).forEach(relatedPage => {
    const anchorText = generateAnchorText(relatedPage, pageData);
    
    incomingLinks.push({
      sourceUrl: relatedPage.url,
      targetUrl: pageData.url,
      anchorText,
      linkType: 'internal',
      isNoFollow: false,
      context: generateLinkContext(relatedPage, pageData)
    });
  });
  
  return incomingLinks;
}

/**
 * Generates outgoing links for pages with insufficient links
 */
function generateOutgoingLinks(pageData: any, allPages: any[]): Link[] {
  const outgoingLinks: Link[] = [];
  
  // Find related pages to link to
  const relatedPages = findRelatedPages(pageData, allPages);
  
  relatedPages.slice(0, 5).forEach(relatedPage => {
    const anchorText = generateAnchorText(pageData, relatedPage);
    
    outgoingLinks.push({
      sourceUrl: pageData.url,
      targetUrl: relatedPage.url,
      anchorText,
      linkType: 'internal',
      isNoFollow: false,
      context: generateLinkContext(pageData, relatedPage)
    });
  });
  
  return outgoingLinks;
}

/**
 * Finds pages related to the given page
 */
function findRelatedPages(pageData: any, allPages: any[]): any[] {
  const relatedPages: any[] = [];
  
  allPages.forEach(page => {
    if (page.url === pageData.url) return; // Skip self
    
    let relevanceScore = 0;
    
    // Same service category
    if (page.serviceCategory === pageData.serviceCategory) {
      relevanceScore += 3;
    }
    
    // Same location
    if (page.location === pageData.location) {
      relevanceScore += 2;
    }
    
    // Similar service name
    if (page.serviceName && pageData.serviceName) {
      const commonWords = getCommonWords(page.serviceName, pageData.serviceName);
      relevanceScore += commonWords.length;
    }
    
    // Different title variation (affordable, best, professional, top-rated)
    if (page.titleVariation !== pageData.titleVariation) {
      relevanceScore += 1;
    }
    
    if (relevanceScore > 0) {
      relatedPages.push({ ...page, relevanceScore });
    }
  });
  
  // Sort by relevance score
  return relatedPages
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);
}

/**
 * Gets common words between two strings
 */
function getCommonWords(str1: string, str2: string): string[] {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  
  return words1.filter(word => 
    word.length > 2 && words2.includes(word)
  );
}

/**
 * Generates contextual anchor text
 */
function generateAnchorText(sourcePage: any, targetPage: any): string {
  // Use target page's service name or title
  let anchorText = targetPage.serviceName || targetPage.title;
  
  // Shorten if too long
  if (anchorText.length > 50) {
    const words = anchorText.split(' ');
    anchorText = words.slice(0, 4).join(' ');
  }
  
  // Add location if different and not Mumbai
  if (targetPage.location && 
      targetPage.location !== sourcePage.location && 
      targetPage.location !== 'Mumbai' &&
      !anchorText.includes(targetPage.location)) {
    anchorText += ` in ${targetPage.location}`;
  }
  
  return anchorText;
}

/**
 * Generates link context description
 */
function generateLinkContext(sourcePage: any, targetPage: any): string {
  if (sourcePage.serviceCategory === targetPage.serviceCategory) {
    return `Related ${sourcePage.serviceCategory} service`;
  } else if (sourcePage.location === targetPage.location) {
    return `Additional service in ${sourcePage.location}`;
  } else {
    return 'Related furniture polishing service';
  }
}

/**
 * Adds incoming links to source pages
 */
function addIncomingLinksToSourcePages(incomingLinks: Link[]): number {
  let addedCount = 0;
  
  incomingLinks.forEach(link => {
    try {
      // Find source page file
      const sourceFileName = generateFileName(link.sourceUrl);
      const possiblePaths = [
        `src/pages/generated/${sourceFileName}.tsx`,
        `src/pages/${sourceFileName}.tsx`
      ];
      
      let sourceFilePath: string | null = null;
      for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
          sourceFilePath = path;
          break;
        }
      }
      
      if (!sourceFilePath) {
        console.warn(`Source file not found for ${link.sourceUrl}`);
        return;
      }
      
      let content = fs.readFileSync(sourceFilePath, 'utf-8');
      
      // Add outgoing link to source page
      const linkData = {
        url: link.targetUrl,
        title: link.anchorText,
        anchorText: link.anchorText
      };
      
      // Check if internalLinks array exists
      if (content.includes('"internalLinks"')) {
        // Add to existing array
        content = content.replace(
          /"internalLinks":\s*\[([^\]]*)\]/,
          (match, existingLinks) => {
            const links = existingLinks.trim();
            const newLink = JSON.stringify(linkData, null, 6);
            return `"internalLinks": [${links}${links ? ',\n    ' : '\n    '}${newLink}\n  ]`;
          }
        );
      } else {
        // Add new internalLinks array
        const insertPoint = content.lastIndexOf('};');
        if (insertPoint > -1) {
          const beforeClosing = content.substring(0, insertPoint);
          const afterClosing = content.substring(insertPoint);
          
          const newLink = JSON.stringify([linkData], null, 4);
          content = beforeClosing + 
            `,\n  "internalLinks": ${newLink}\n` +
            afterClosing;
        }
      }
      
      fs.writeFileSync(sourceFilePath, content, 'utf-8');
      addedCount++;
      
    } catch (error) {
      console.error(`Error adding link to ${link.sourceUrl}:`, error);
    }
  });
  
  return addedCount;
}

/**
 * Adds outgoing links to target page
 */
function addOutgoingLinksToPage(filePath: string, outgoingLinks: Link[]): boolean {
  if (outgoingLinks.length === 0) return false;
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const linkData = outgoingLinks.map(link => ({
      url: link.targetUrl,
      title: link.anchorText,
      anchorText: link.anchorText
    }));
    
    // Check if internalLinks array exists
    if (content.includes('"internalLinks"')) {
      // Add to existing array
      content = content.replace(
        /"internalLinks":\s*\[([^\]]*)\]/,
        (match, existingLinks) => {
          const links = existingLinks.trim();
          const newLinks = linkData.map(link => JSON.stringify(link, null, 6)).join(',\n    ');
          return `"internalLinks": [${links}${links ? ',\n    ' : '\n    '}${newLinks}\n  ]`;
        }
      );
    } else {
      // Add new internalLinks array
      const insertPoint = content.lastIndexOf('};');
      if (insertPoint > -1) {
        const beforeClosing = content.substring(0, insertPoint);
        const afterClosing = content.substring(insertPoint);
        
        const newLinks = JSON.stringify(linkData, null, 4);
        content = beforeClosing + 
          `,\n  "internalLinks": ${newLinks}\n` +
          afterClosing;
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
    
  } catch (error) {
    console.error(`Error adding outgoing links to ${filePath}:`, error);
    return false;
  }
}

/**
 * Generates a comprehensive report
 */
function generateOrphanPagesReport(analyses: LinkAnalysis[]): void {
  const orphanPages = analyses.filter(a => a.isOrphan);
  const pagesWithFewLinks = analyses.filter(a => a.outgoingLinks.length < 3);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: analyses.length,
    orphanPages: {
      count: orphanPages.length,
      pages: orphanPages.map(a => ({
        url: a.url,
        filePath: path.basename(a.filePath),
        suggestedIncomingLinks: a.suggestedIncomingLinks.length
      }))
    },
    pagesWithFewOutgoingLinks: {
      count: pagesWithFewLinks.length,
      pages: pagesWithFewLinks.map(a => ({
        url: a.url,
        filePath: path.basename(a.filePath),
        currentOutgoingLinks: a.outgoingLinks.length,
        suggestedOutgoingLinks: a.suggestedOutgoingLinks.length
      }))
    },
    linkDistribution: getLinkDistribution(analyses)
  };
  
  fs.writeFileSync('orphan-pages-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Orphan pages report saved to orphan-pages-report.json');
}

/**
 * Gets distribution of link counts
 */
function getLinkDistribution(analyses: LinkAnalysis[]): Record<string, number> {
  const distribution: Record<string, number> = {
    '0-links': 0,
    '1-2-links': 0,
    '3-5-links': 0,
    '6-10-links': 0,
    '10+-links': 0
  };
  
  analyses.forEach(analysis => {
    const linkCount = analysis.outgoingLinks.length;
    
    if (linkCount === 0) {
      distribution['0-links']++;
    } else if (linkCount <= 2) {
      distribution['1-2-links']++;
    } else if (linkCount <= 5) {
      distribution['3-5-links']++;
    } else if (linkCount <= 10) {
      distribution['6-10-links']++;
    } else {
      distribution['10+-links']++;
    }
  });
  
  return distribution;
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🎯 Fix Orphan Pages Script');
  console.log('===========================\n');
  
  try {
    // Get all page files
    const generatedPages = await glob('src/pages/generated/*.tsx');
    const staticPages = await glob('src/pages/*.tsx');
    const allPageFiles = [...generatedPages, ...staticPages];
    
    console.log(`📄 Analyzing ${allPageFiles.length} pages for link structure...\n`);
    
    // Analyze all pages
    const analyses: LinkAnalysis[] = [];
    for (const filePath of allPageFiles) {
      const analysis = analyzeLinkStructure(filePath, pagesData);
      analyses.push(analysis);
      
      const status = analysis.isOrphan ? '🔴 ORPHAN' : 
                    analysis.outgoingLinks.length < 3 ? '🟡 FEW LINKS' : '🟢 GOOD';
      
      console.log(`${status} ${path.basename(filePath)}: ${analysis.incomingLinks.length} in, ${analysis.outgoingLinks.length} out`);
    }
    
    // Initial statistics
    const orphanPages = analyses.filter(a => a.isOrphan);
    const pagesWithFewLinks = analyses.filter(a => a.outgoingLinks.length < 3);
    
    console.log(`\n📊 Initial Statistics:`);
    console.log(`- Total pages: ${analyses.length}`);
    console.log(`- Orphan pages: ${orphanPages.length}`);
    console.log(`- Pages with <3 outgoing links: ${pagesWithFewLinks.length}`);
    
    // Fix orphan pages
    console.log(`\n🔧 Fixing orphan pages...\n`);
    let fixedOrphans = 0;
    
    for (const analysis of orphanPages) {
      if (analysis.suggestedIncomingLinks.length > 0) {
        const addedLinks = addIncomingLinksToSourcePages(analysis.suggestedIncomingLinks);
        if (addedLinks > 0) {
          console.log(`✅ Fixed orphan: ${path.basename(analysis.filePath)} (${addedLinks} incoming links added)`);
          fixedOrphans++;
        } else {
          console.log(`❌ Failed to fix: ${path.basename(analysis.filePath)}`);
        }
      }
    }
    
    // Add outgoing links to pages with few links
    console.log(`\n🔧 Adding outgoing links to pages with insufficient links...\n`);
    let fixedOutgoing = 0;
    
    for (const analysis of pagesWithFewLinks) {
      if (analysis.suggestedOutgoingLinks.length > 0) {
        if (addOutgoingLinksToPage(analysis.filePath, analysis.suggestedOutgoingLinks)) {
          console.log(`✅ Added outgoing links: ${path.basename(analysis.filePath)} (${analysis.suggestedOutgoingLinks.length} links)`);
          fixedOutgoing++;
        } else {
          console.log(`❌ Failed to add links: ${path.basename(analysis.filePath)}`);
        }
      }
    }
    
    // Final validation
    console.log('\n🔍 Final validation...');
    const finalAnalyses = allPageFiles.map(filePath => analyzeLinkStructure(filePath, pagesData));
    const finalOrphans = finalAnalyses.filter(a => a.isOrphan);
    const finalFewLinks = finalAnalyses.filter(a => a.outgoingLinks.length < 3);
    
    // Generate report
    generateOrphanPagesReport(finalAnalyses);
    
    console.log(`\n📊 Final Summary:`);
    console.log(`- Total pages: ${analyses.length}`);
    console.log(`- Orphan pages fixed: ${fixedOrphans}`);
    console.log(`- Pages with outgoing links added: ${fixedOutgoing}`);
    console.log(`- Remaining orphan pages: ${finalOrphans.length}`);
    console.log(`- Remaining pages with <3 links: ${finalFewLinks.length}`);
    
    const orphanReduction = Math.round(((orphanPages.length - finalOrphans.length) / orphanPages.length) * 100);
    console.log(`- Orphan reduction: ${orphanReduction}%`);
    
    console.log('\n✅ Orphan pages fixing completed!');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixOrphanPages };