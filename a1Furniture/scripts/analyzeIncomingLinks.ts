/**
 * Analyze Incoming Links Distribution
 * Check how incoming links are distributed across title variations
 */

import { generateAllPages } from '../src/data/pageDataGenerator';

const pages = generateAllPages();

// Build incoming links map
const incomingLinksMap = new Map<string, string[]>();

pages.forEach(page => {
  page.relatedServices.forEach(related => {
    if (!incomingLinksMap.has(related.url)) {
      incomingLinksMap.set(related.url, []);
    }
    incomingLinksMap.get(related.url)!.push(page.url);
  });
});

// Analyze by title variation
const variationStats = {
  affordable: { total: 0, withLinks: 0, totalIncoming: 0 },
  'top-rated': { total: 0, withLinks: 0, totalIncoming: 0 },
  professional: { total: 0, withLinks: 0, totalIncoming: 0 },
  best: { total: 0, withLinks: 0, totalIncoming: 0 },
};

pages.forEach(page => {
  const variation = page.titleVariation;
  variationStats[variation].total++;
  
  const incomingLinks = incomingLinksMap.get(page.url) || [];
  if (incomingLinks.length > 0) {
    variationStats[variation].withLinks++;
    variationStats[variation].totalIncoming += incomingLinks.length;
  }
});

console.log('\n📊 Incoming Links Distribution by Title Variation:\n');
console.log('═'.repeat(70));

Object.entries(variationStats).forEach(([variation, stats]) => {
  const percentage = ((stats.withLinks / stats.total) * 100).toFixed(1);
  const avgIncoming = stats.withLinks > 0 ? (stats.totalIncoming / stats.withLinks).toFixed(1) : '0';
  
  console.log(`\n${variation.toUpperCase()}:`);
  console.log(`  Total Pages: ${stats.total}`);
  console.log(`  Pages with Incoming Links: ${stats.withLinks} (${percentage}%)`);
  console.log(`  Pages with NO Incoming Links: ${stats.total - stats.withLinks}`);
  console.log(`  Total Incoming Links: ${stats.totalIncoming}`);
  console.log(`  Avg Links per Page (with links): ${avgIncoming}`);
});

console.log('\n═'.repeat(70));

// Show top pages by incoming links
const pagesByIncoming = pages
  .map(page => ({
    title: page.title,
    url: page.url,
    variation: page.titleVariation,
    incomingCount: (incomingLinksMap.get(page.url) || []).length
  }))
  .sort((a, b) => b.incomingCount - a.incomingCount);

console.log('\n🏆 Top 20 Pages by Incoming Links:\n');
pagesByIncoming.slice(0, 20).forEach((page, index) => {
  console.log(`${index + 1}. [${page.variation.toUpperCase()}] ${page.title}`);
  console.log(`   URL: ${page.url}`);
  console.log(`   Incoming Links: ${page.incomingCount}\n`);
});

// Show pages with no incoming links by variation
console.log('\n⚠️  Pages with NO Incoming Links by Variation:\n');
Object.keys(variationStats).forEach(variation => {
  const pagesWithNoLinks = pagesByIncoming.filter(
    p => p.variation === variation && p.incomingCount === 0
  );
  
  if (pagesWithNoLinks.length > 0) {
    console.log(`\n${variation.toUpperCase()}: ${pagesWithNoLinks.length} pages`);
    pagesWithNoLinks.slice(0, 5).forEach(page => {
      console.log(`  • ${page.title}`);
    });
    if (pagesWithNoLinks.length > 5) {
      console.log(`  ... and ${pagesWithNoLinks.length - 5} more`);
    }
  }
});

console.log('\n═'.repeat(70));
console.log('\n✅ Analysis Complete!\n');
