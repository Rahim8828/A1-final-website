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
