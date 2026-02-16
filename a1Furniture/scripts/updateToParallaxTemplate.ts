/**
 * Script to update all generated service pages to use ParallaxServiceTemplate
 * Run with: npm run update:parallax
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GENERATED_PAGES_DIR = path.join(__dirname, '../src/pages/generated');

function updatePageToParallax(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace ServicePageTemplate with ParallaxServiceTemplate
  content = content.replace(
    /import ServicePageTemplate from '\.\.\/\.\.\/components\/ServicePageTemplate';/g,
    "import ParallaxServiceTemplate from '../../components/ParallaxServiceTemplate';"
  );
  
  content = content.replace(
    /<ServicePageTemplate pageData={pageData} \/>/g,
    '<ParallaxServiceTemplate pageData={pageData} />'
  );
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

function main() {
  console.log('🚀 Updating all generated pages to use ParallaxServiceTemplate...\n');
  
  if (!fs.existsSync(GENERATED_PAGES_DIR)) {
    console.error('❌ Generated pages directory not found!');
    process.exit(1);
  }
  
  const files = fs.readdirSync(GENERATED_PAGES_DIR);
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  
  let updatedCount = 0;
  
  tsxFiles.forEach(file => {
    const filePath = path.join(GENERATED_PAGES_DIR, file);
    try {
      updatePageToParallax(filePath);
      updatedCount++;
      console.log(`✅ Updated: ${file}`);
    } catch (error) {
      console.error(`❌ Error updating ${file}:`, error);
    }
  });
  
  console.log(`\n🎉 Successfully updated ${updatedCount} out of ${tsxFiles.length} pages!`);
}

main();
