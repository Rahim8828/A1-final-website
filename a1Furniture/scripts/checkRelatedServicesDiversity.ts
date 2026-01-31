#!/usr/bin/env tsx

/**
 * Checks diversity of related services across all pages
 */

import fs from 'fs';
import path from 'path';

const GENERATED_PAGES_DIR = path.join(process.cwd(), 'src/pages/generated');

console.log('🔍 Checking Related Services Diversity...\n');
console.log('═══════════════════════════════════════════════════════════════\n');

const pageFiles = fs.readdirSync(GENERATED_PAGES_DIR).filter(file => file.endsWith('.tsx'));

let pagesWithDuplicates = 0;
let pagesWithDiversity = 0;
const examples: { page: string; services: string[] }[] = [];

pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(GENERATED_PAGES_DIR, file), 'utf-8');
  
  // Extract related services
  const relatedServicesMatch = content.match(/"relatedServices":\s*\[([\s\S]*?)\]/);
  if (relatedServicesMatch) {
    const relatedContent = relatedServicesMatch[1];
    const nameMatches = relatedContent.match(/"name":\s*"([^"]+)"/g) || [];
    const serviceNames = nameMatches.map(m => m.match(/"name":\s*"([^"]+)"/)?.[1] || '');
    
    // Check for duplicates
    const uniqueNames = new Set(serviceNames);
    
    if (uniqueNames.size < serviceNames.length) {
      pagesWithDuplicates++;
      
      // Save first 5 examples
      if (examples.length < 5) {
        examples.push({
          page: file.replace('.tsx', ''),
          services: serviceNames
        });
      }
    } else {
      pagesWithDiversity++;
    }
  }
});

console.log(`📊 DIVERSITY ANALYSIS:\n`);
console.log(`✅ Pages with diverse services: ${pagesWithDiversity}/${pageFiles.length} (${((pagesWithDiversity/pageFiles.length)*100).toFixed(1)}%)`);
console.log(`⚠️  Pages with duplicate names: ${pagesWithDuplicates}/${pageFiles.length} (${((pagesWithDuplicates/pageFiles.length)*100).toFixed(1)}%)\n`);

if (examples.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📋 EXAMPLES OF PAGES WITH DUPLICATE SERVICE NAMES:\n');
  
  examples.forEach((ex, index) => {
    console.log(`${index + 1}. ${ex.page}`);
    console.log(`   Related Services:`);
    ex.services.forEach((service, i) => {
      console.log(`   ${i + 1}. ${service}`);
    });
    console.log('');
  });
}

console.log('═══════════════════════════════════════════════════════════════\n');

if (pagesWithDuplicates === 0) {
  console.log('🎉 All pages have diverse related services!\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${pagesWithDuplicates} pages have duplicate service names.\n`);
  console.log('💡 TIP: This happens when showing same service with different variations.\n');
  console.log('   Consider showing different service types instead.\n');
  process.exit(1);
}
