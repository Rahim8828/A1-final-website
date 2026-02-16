/**
 * Generated Pages Data
 * This file contains all 150 PageData objects for the bulk SEO page generation
 * Generated using the pageDataGenerator functions
 * 
 * Phase 1: 80 Mumbai generic pages (20 categories × 4 variations)
 * Phase 2: 70 location-specific pages (balanced distribution)
 */

import { PageData } from '../types';
import { generateAllPagesSync, validatePages } from './pageDataGenerator';
import { allSeoGapPages } from './seoGapPagesData';

// Generate all 150 pages synchronously (without SEO processing)
export const pagesData: PageData[] = generateAllPagesSync();

// Validate the generated pages
const validation = validatePages(pagesData);

if (!validation.isValid) {
  console.error('Page generation validation failed:');
  validation.errors.forEach(error => console.error(`  - ${error}`));
  throw new Error('Page generation validation failed. See console for details.');
}

console.log('✓ All 150 pages generated and validated successfully');
console.log(`  - Phase 1: 80 Mumbai generic pages`);
console.log(`  - Phase 2: 70 location-specific pages`);
console.log(`  - Total: ${pagesData.length} pages`);

// SEO Gap pages count
const seoGapCount = allSeoGapPages.length;
const seoGapByCategory = allSeoGapPages.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// Print full SEO page summary
console.log('\n══════════════════════════════════════════════');
console.log('  📊 TOTAL SEO PAGES SUMMARY');
console.log('══════════════════════════════════════════════');
console.log(`  ✅ Generated Service Pages : ${pagesData.length}`);
console.log(`  ✅ Sofa Repair Pages       : 160`);
console.log(`  ✅ Bed Repair Pages         : 96`);
console.log(`  ✅ SEO Gap Pages            : ${seoGapCount}`);
console.log(`     ├─ Near Me              : ${seoGapByCategory['near-me'] || 0}`);
console.log(`     ├─ Location Hubs        : ${seoGapByCategory['location-hub'] || 0}`);
console.log(`     ├─ Wooden Polishing In  : ${seoGapByCategory['wooden-polishing-in'] || 0}`);
console.log(`     ├─ Furniture Polish In  : ${seoGapByCategory['furniture-polish-in'] || 0}`);
console.log(`     ├─ Wood Polishing In    : ${seoGapByCategory['wood-polishing-in'] || 0}`);
console.log(`     ├─ Sofa Repair Standalone: ${seoGapByCategory['sofa-repair'] || 0}`);
console.log(`     └─ Bed Repair Standalone : ${seoGapByCategory['bed-repair'] || 0}`);
console.log('──────────────────────────────────────────────');
console.log(`  🚀 GRAND TOTAL             : ${pagesData.length + 160 + 96 + seoGapCount} SEO pages`);
console.log('══════════════════════════════════════════════\n');

// Export helper functions to find pages
export function getPageByUrl(url: string): PageData | undefined {
  return pagesData.find(page => page.url === url);
}

export function getPagesByLocation(location: string): PageData[] {
  return pagesData.filter(page => page.location === location);
}

export function getPagesByCategory(category: string): PageData[] {
  return pagesData.filter(page => page.serviceCategory === category);
}

export function getPagesByTitleVariation(variation: 'affordable' | 'top-rated' | 'professional' | 'best'): PageData[] {
  return pagesData.filter(page => page.titleVariation === variation);
}

// Export statistics
export const pageStats = {
  total: pagesData.length,
  phase1: pagesData.filter(page => page.location === 'Mumbai').length,
  phase2: pagesData.filter(page => page.location !== 'Mumbai').length,
  byVariation: {
    affordable: pagesData.filter(page => page.titleVariation === 'affordable').length,
    topRated: pagesData.filter(page => page.titleVariation === 'top-rated').length,
    professional: pagesData.filter(page => page.titleVariation === 'professional').length,
    best: pagesData.filter(page => page.titleVariation === 'best').length,
  },
  uniqueUrls: new Set(pagesData.map(page => page.url)).size,
  uniqueLocations: new Set(pagesData.map(page => page.location)).size,
  uniqueCategories: new Set(pagesData.map(page => page.serviceCategory)).size,
};

console.log('Page Statistics:', pageStats);