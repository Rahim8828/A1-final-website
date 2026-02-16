/**
 * Script to revert all generated service pages back to ServicePageTemplate
 * Run with: npm run revert:template
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GENERATED_PAGES_DIR = path.join(__dirname, '../src/pages/generated');

function revertPageToServiceTemplate(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace ParallaxServiceTemplate with ServicePageTemplate
  content = content.replace(
    /import ParallaxServiceTemplate from '\.\.\/\.\.\/components\/ParallaxServiceTemplate';/g,
    "import ServicePageTemplate from '../../components/ServicePageTemplate';"
  );
  
  content = content.replace(
    /<ParallaxServiceTemplate pageData={pageData} \/>/g,
    '<ServicePageTemplate pageData={pageData} />'
  );
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

function main() {
  console.log('🔄 Reverting all generated pages to use ServicePageTemplate...\n');
  
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
      revertPageToServiceTemplate(filePath);
      updatedCount++;
      console.log(`✅ Reverted: ${file}`);
    } catch (error) {
      console.error(`❌ Error reverting ${file}:`, error);
    }
  });
  
  console.log(`\n🎉 Successfully reverted ${updatedCount} out of ${tsxFiles.length} pages!`);
}

main();
