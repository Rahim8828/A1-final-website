#!/usr/bin/env tsx

import fs from 'fs';
import { glob } from 'glob';

async function fixCaseSensitivityIssues() {
  console.log('🔧 Fixing case sensitivity issues...\n');

  try {
    // Check for duplicate files with different casing
    const files = await glob('src/**/*.{ts,tsx}', { 
      ignore: ['node_modules/**', 'dist/**'] 
    });

    const fileMap = new Map<string, string[]>();
    
    // Group files by lowercase name
    for (const file of files) {
      const lowerFile = file.toLowerCase();
      if (!fileMap.has(lowerFile)) {
        fileMap.set(lowerFile, []);
      }
      fileMap.get(lowerFile)!.push(file);
    }

    // Find duplicates
    let foundIssues = false;
    Array.from(fileMap.entries()).forEach(([lowerFile, actualFiles]) => {
      if (actualFiles.length > 1) {
        console.log(`❌ Case sensitivity issue found:`);
        console.log(`   Files: ${actualFiles.join(', ')}`);
        foundIssues = true;
      }
    });

    if (!foundIssues) {
      console.log('✅ No case sensitivity file duplicates found');
    }

    // Fix import statements in App.tsx and other files
    console.log('\n🔧 Fixing import statements...');
    
    const importFixes = [
      {
        pattern: /from\s+['"]\.\/pages\/contact['"]/gi,
        replacement: "from './pages/Contact'",
        description: "Fix Contact page import casing"
      },
      {
        pattern: /from\s+['"]\.\/pages\/about['"]/gi,
        replacement: "from './pages/About'",
        description: "Fix About page import casing"
      },
      {
        pattern: /from\s+['"]\.\/pages\/services['"]/gi,
        replacement: "from './pages/Services'",
        description: "Fix Services page import casing"
      }
    ];

    let fixedFiles = 0;
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      for (const fix of importFixes) {
        if (fix.pattern.test(content)) {
          content = content.replace(fix.pattern, fix.replacement);
          modified = true;
          console.log(`  ✓ ${file}: ${fix.description}`);
        }
      }

      if (modified) {
        fs.writeFileSync(file, content);
        fixedFiles++;
      }
    }

    console.log(`\n✅ Fixed ${fixedFiles} files with case sensitivity issues`);

  } catch (error) {
    console.error('❌ Error fixing case sensitivity issues:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixCaseSensitivityIssues().catch(console.error);
}

export default fixCaseSensitivityIssues;