#!/usr/bin/env tsx

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Script to fix JSON corruption in React component files
 * Removes invalid JSON content that was accidentally added to JSX files
 */

function getAllTsxFiles(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string) {
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function fixFile(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Check if file has the corruption pattern
    if (!content.includes('"openGraphTags":')) {
      return false; // No corruption found
    }
    
    console.log(`Fixing: ${filePath}`);
    
    // Find the pattern: );, followed by JSON content OR return statement followed by JSON
    const corruptionPattern1 = /\s*\);\s*,\s*"openGraphTags"[\s\S]*$/;
    const corruptionPattern2 = /\s*return\s+<ServicePageTemplate[\s\S]*?\/>\s*;\s*,\s*"openGraphTags"[\s\S]*$/;
    
    if (corruptionPattern1.test(content)) {
      // Replace the corrupted content with proper component ending
      let fixedContent = content.replace(corruptionPattern1, '\n  );\n};\n');
      
      // Also ensure proper export statement exists
      if (!fixedContent.includes('export default')) {
        // Extract component name from file path
        const fileName = filePath.split('/').pop()?.replace('.tsx', '') || 'Component';
        fixedContent = fixedContent + `\nexport default ${fileName};\n`;
      }
      
      writeFileSync(filePath, fixedContent, 'utf-8');
      return true;
    } else if (corruptionPattern2.test(content)) {
      // Handle the ServicePageTemplate pattern
      let fixedContent = content.replace(corruptionPattern2, '\n  return <ServicePageTemplate pageData={pageData} />;\n};\n');
      
      // Also ensure proper export statement exists
      if (!fixedContent.includes('export default')) {
        // Extract component name from file path
        const fileName = filePath.split('/').pop()?.replace('.tsx', '') || 'Component';
        fixedContent = fixedContent + `\nexport default ${fileName};\n`;
      }
      
      writeFileSync(filePath, fixedContent, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
    return false;
  }
}

function main() {
  console.log('🔧 Starting JSON corruption fix...');
  
  const srcDir = 'src';
  const tsxFiles = getAllTsxFiles(srcDir);
  
  console.log(`Found ${tsxFiles.length} TSX files to check`);
  
  let fixedCount = 0;
  
  for (const file of tsxFiles) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`✅ Fixed ${fixedCount} files with JSON corruption`);
  
  if (fixedCount === 0) {
    console.log('No files needed fixing');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}