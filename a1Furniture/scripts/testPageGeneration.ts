/**
 * Test script to verify page generation
 */

import { pagesData, pageStats } from '../src/data/generatedPagesData';

console.log('=== Page Generation Test ===\n');
console.log(`Total pages generated: ${pagesData.length}`);
console.log(`Expected: 150 pages\n`);

console.log('Page Statistics:');
console.log(JSON.stringify(pageStats, null, 2));

console.log('\n=== Sample Pages ===\n');

// Show first page from Phase 1 (Mumbai)
const phase1Sample = pagesData.find(p => p.location === 'Mumbai');
if (phase1Sample) {
  console.log('Phase 1 Sample (Mumbai):');
  console.log(`  URL: ${phase1Sample.url}`);
  console.log(`  Title: ${phase1Sample.title}`);
  console.log(`  Service: ${phase1Sample.serviceName}`);
  console.log(`  Location: ${phase1Sample.location}`);
  console.log(`  Variation: ${phase1Sample.titleVariation}`);
}

// Show first page from Phase 2 (specific location)
const phase2Sample = pagesData.find(p => p.location !== 'Mumbai');
if (phase2Sample) {
  console.log('\nPhase 2 Sample (Specific Location):');
  console.log(`  URL: ${phase2Sample.url}`);
  console.log(`  Title: ${phase2Sample.title}`);
  console.log(`  Service: ${phase2Sample.serviceName}`);
  console.log(`  Location: ${phase2Sample.location}`);
  console.log(`  Variation: ${phase2Sample.titleVariation}`);
}

// Verify URL uniqueness
const urls = pagesData.map(p => p.url);
const uniqueUrls = new Set(urls);
console.log(`\n=== URL Uniqueness Check ===`);
console.log(`Total URLs: ${urls.length}`);
console.log(`Unique URLs: ${uniqueUrls.size}`);
console.log(`Duplicates: ${urls.length - uniqueUrls.size}`);

if (urls.length === uniqueUrls.size) {
  console.log('✓ All URLs are unique');
} else {
  console.log('✗ Duplicate URLs found!');
}

console.log('\n=== Test Complete ===');
