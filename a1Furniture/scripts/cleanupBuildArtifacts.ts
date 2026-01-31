#!/usr/bin/env tsx

import fs from 'fs';
import { glob } from 'glob';

async function cleanupBuildArtifacts() {
  console.log('🧹 Cleaning up build artifacts...\n');

  try {
    // Remove .d.ts files that conflict with source files
    console.log('🗑️  Removing conflicting .d.ts files...');
    
    const dtsFiles = await glob('**/*.d.ts', { 
      ignore: ['node_modules/**', 'dist/**'] 
    });

    let removedCount = 0;
    for (const dtsFile of dtsFiles) {
      // Check if corresponding .ts file exists
      const tsFile = dtsFile.replace('.d.ts', '.ts');
      if (fs.existsSync(tsFile)) {
        fs.unlinkSync(dtsFile);
        console.log(`  ✓ Removed: ${dtsFile}`);
        removedCount++;
      }
    }

    console.log(`\n✅ Removed ${removedCount} conflicting .d.ts files`);

    // Clean up other build artifacts
    console.log('\n🧹 Cleaning other build artifacts...');
    
    const artifactPatterns = [
      'dist/**/*',
      '.vite/**/*',
      'coverage/**/*'
    ];

    for (const pattern of artifactPatterns) {
      const files = await glob(pattern, { ignore: ['node_modules/**'] });
      if (files.length > 0) {
        console.log(`  ℹ️  Found ${files.length} files in ${pattern.split('/')[0]}/`);
      }
    }

    console.log('\n✅ Build artifacts cleanup complete!');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupBuildArtifacts().catch(console.error);
}

export default cleanupBuildArtifacts;