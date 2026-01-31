#!/usr/bin/env tsx

import fs from 'fs';
import { glob } from 'glob';

async function quickFix() {
  console.log('⚡ Quick Fix: Resolving immediate build errors...\n');

  // Fix 1: Blog component import paths
  console.log('🔧 Fixing blog component imports...');
  
  const blogFiles = await glob('blog/**/*.{ts,tsx}', { 
    ignore: ['node_modules/**', 'dist/**'] 
  });

  for (const file of blogFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix OptimizedImage imports
    if (content.includes("from '../../src/components/OptimizedImage'") || content.includes("from '../../src/components/OptimizedImage'")) {
      content = content.replace(/from ['"]\.\/OptimizedImage['"]/g, "from '../../src/components/OptimizedImage'");
      content = content.replace(/from ['"]\.\.\/components\/OptimizedImage['"]/g, "from '../../src/components/OptimizedImage'");
      modified = true;
    }

    // Fix SEOHead imports
    if (content.includes("from '../../src/components/SEOHead'")) {
      content = content.replace(/from ['"]\.\.\/components\/SEOHead['"]/g, "from '../../src/components/SEOHead'");
      modified = true;
    }

    // Fix imageHelpers imports
    if (content.includes("from '../../src/utils/imageHelpers'") || content.includes("from '../../src/utils/imageHelpers'")) {
      content = content.replace(/from ['"]\.\.\/utils\/imageHelpers['"]/g, "from '../../src/utils/imageHelpers'");
      content = content.replace(/from ['"]\.\/imageHelpers['"]/g, "from '../../src/utils/imageHelpers'");
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`  ✅ Fixed: ${file}`);
    }
  }

  // Fix 2: Ensure critical files exist
  console.log('\n📁 Checking critical files...');
  
  const criticalFiles = [
    'src/components/OptimizedImage.tsx',
    'src/components/SEOHead.tsx', 
    'src/utils/imageHelpers.ts'
  ];

  for (const file of criticalFiles) {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file} exists`);
    } else {
      console.log(`  ❌ ${file} missing`);
    }
  }

  console.log('\n✅ Quick fix complete! Try building again.');
}

quickFix().catch(console.error);