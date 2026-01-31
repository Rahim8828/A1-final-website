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

// Count orphaned pages
const orphanedPages = pages.filter(page => {
  const incomingLinks = incomingLinksMap.get(page.url) || [];
  return incomingLinks.length === 0;
});

console.log(`\n📊 Orphaned Pages Count: ${orphanedPages.length}/150\n`);
console.log(`✅ Pages with Links: ${150 - orphanedPages.length}/150 (${((150 - orphanedPages.length) / 150 * 100).toFixed(1)}%)\n`);
