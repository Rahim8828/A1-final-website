/**
 * Fix aggregateRating schema in all generated pages
 * Adds bestRating, worstRating and changes reviewCount to ratingCount
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GENERATED_PAGES_DIR = path.join(__dirname, '../src/pages/generated');

function fixAggregateRating(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find and replace the aggregateRating block
  const oldPattern = /"aggregateRating": \{\s*"@type": "AggregateRating",\s*"ratingValue": "4\.9",\s*"reviewCount": "500"\s*\}/g;
  
  const newRating = `"aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "500"
      }`;
  
  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newRating);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${path.basename(filePath)}`);
    return;
  }
  
  console.log(`⚠ Skipped (already fixed or pattern not found): ${path.basename(filePath)}`);
}

function main(): void {
  console.log('🔧 Fixing aggregateRating in all generated pages...\n');
  
  const files = fs.readdirSync(GENERATED_PAGES_DIR);
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  
  let fixedCount = 0;
  
  tsxFiles.forEach(file => {
    const filePath = path.join(GENERATED_PAGES_DIR, file);
    fixAggregateRating(filePath);
    fixedCount++;
  });
  
  console.log(`\n✅ Processed ${fixedCount} files`);
}

main();
