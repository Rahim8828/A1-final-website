#!/usr/bin/env tsx

/**
 * Validates that all related services links point to existing pages
 */

import fs from 'fs';
import path from 'path';

const GENERATED_PAGES_DIR = path.join(process.cwd(), 'src/pages/generated');

console.log('🔗 Validating Related Services Links...\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all generated page files
const pageFiles = fs.readdirSync(GENERATED_PAGES_DIR).filter(file => file.endsWith('.tsx'));

// Build a map of all available URLs
const availableUrls = new Set<string>();
pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(GENERATED_PAGES_DIR, file), 'utf-8');
  const urlMatch = content.match(/"url":\s*"([^"]+)"/);
  if (urlMatch) {
    availableUrls.add(urlMatch[1]);
  }
});

console.log(`📄 Found ${pageFiles.length} generated pages`);
console.log(`🔗 Total available URLs: ${availableUrls.size}\n`);

// Validate related services links
let totalLinks = 0;
let validLinks = 0;
let brokenLinks = 0;
const brokenLinkDetails: { page: string; brokenUrl: string }[] = [];

pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(GENERATED_PAGES_DIR, file), 'utf-8');
  
  // Extract related services
  const relatedServicesMatch = content.match(/"relatedServices":\s*\[([\s\S]*?)\]/);
  if (relatedServicesMatch) {
    const relatedServicesContent = relatedServicesMatch[1];
    const urlMatches = relatedServicesContent.match(/"url":\s*"([^"]+)"/g);
    
    if (urlMatches) {
      urlMatches.forEach(urlMatch => {
        const url = urlMatch.match(/"url":\s*"([^"]+)"/)?.[1];
        if (url) {
          totalLinks++;
          if (availableUrls.has(url)) {
            validLinks++;
          } else {
            brokenLinks++;
            brokenLinkDetails.push({
              page: file.replace('.tsx', ''),
              brokenUrl: url
            });
          }
        }
      });
    }
  }
});

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📊 VALIDATION RESULTS:\n');
console.log(`✅ Valid Links: ${validLinks}/${totalLinks} (${((validLinks/totalLinks)*100).toFixed(1)}%)`);
console.log(`❌ Broken Links: ${brokenLinks}/${totalLinks} (${((brokenLinks/totalLinks)*100).toFixed(1)}%)\n`);

if (brokenLinks > 0) {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('🔴 BROKEN LINKS DETAILS:\n');
  
  // Group by broken URL
  const brokenByUrl = new Map<string, string[]>();
  brokenLinkDetails.forEach(({ page, brokenUrl }) => {
    if (!brokenByUrl.has(brokenUrl)) {
      brokenByUrl.set(brokenUrl, []);
    }
    brokenByUrl.get(brokenUrl)!.push(page);
  });
  
  let count = 1;
  brokenByUrl.forEach((pages, url) => {
    console.log(`${count}. ${url}`);
    console.log(`   Referenced by ${pages.length} page(s):`);
    pages.slice(0, 3).forEach(page => {
      console.log(`   • ${page}`);
    });
    if (pages.length > 3) {
      console.log(`   ... and ${pages.length - 3} more`);
    }
    console.log('');
    count++;
  });
}

console.log('═══════════════════════════════════════════════════════════════\n');

if (brokenLinks === 0) {
  console.log('🎉 All related services links are valid!\n');
  process.exit(0);
} else {
  console.log(`⚠️  Found ${brokenLinks} broken links that need attention.\n`);
  console.log('💡 TIP: Make sure all related service URLs match existing generated pages.\n');
  process.exit(1);
}
