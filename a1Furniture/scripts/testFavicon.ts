#!/usr/bin/env tsx

/**
 * Favicon Testing Script
 * Tests if favicon is accessible and properly configured
 */

import fs from 'fs';
import path from 'path';

interface FaviconTest {
  name: string;
  path: string;
  expected: boolean;
  result?: boolean;
  size?: number;
  error?: string;
}

class FaviconTester {
  private tests: FaviconTest[] = [];

  constructor() {
    this.initializeTests();
  }

  private initializeTests(): void {
    this.tests = [
      { name: 'favicon.ico', path: 'public/favicon.ico', expected: true },
      { name: 'favicon.svg', path: 'public/favicon.svg', expected: true },
      { name: 'favicon-16x16.png', path: 'public/favicon-16x16.png', expected: true },
      { name: 'favicon-32x32.png', path: 'public/favicon-32x32.png', expected: true },
      { name: 'apple-touch-icon.png', path: 'public/apple-touch-icon.png', expected: true },
      { name: 'android-chrome-192x192.png', path: 'public/android-chrome-192x192.png', expected: true },
      { name: 'android-chrome-512x512.png', path: 'public/android-chrome-512x512.png', expected: true },
      { name: 'site.webmanifest', path: 'public/site.webmanifest', expected: true },
      { name: 'browserconfig.xml', path: 'public/browserconfig.xml', expected: true }
    ];
  }

  public async runTests(): Promise<void> {
    console.log('🧪 Testing Favicon Files...\n');

    for (const test of this.tests) {
      try {
        const fullPath = path.join(process.cwd(), test.path);
        const exists = fs.existsSync(fullPath);
        
        if (exists) {
          const stats = fs.statSync(fullPath);
          test.size = stats.size;
          test.result = true;
          
          // Additional validation for specific files
          if (test.name === 'favicon.ico' && test.size < 100) {
            test.error = 'File too small, might be corrupted';
          } else if (test.name === 'site.webmanifest') {
            const content = fs.readFileSync(fullPath, 'utf-8');
            try {
              JSON.parse(content);
            } catch {
              test.error = 'Invalid JSON format';
            }
          }
          
          console.log(`✅ ${test.name} - ${test.size} bytes`);
          if (test.error) {
            console.log(`   ⚠️  ${test.error}`);
          }
        } else {
          test.result = false;
          test.error = 'File not found';
          console.log(`❌ ${test.name} - Missing`);
        }
      } catch (error) {
        test.result = false;
        test.error = `Error: ${error}`;
        console.log(`❌ ${test.name} - ${test.error}`);
      }
    }
  }

  public async testHTMLReferences(): Promise<void> {
    console.log('\n🔍 Testing HTML References...\n');

    const indexPath = 'index.html';
    if (!fs.existsSync(indexPath)) {
      console.log('❌ index.html not found');
      return;
    }

    const content = fs.readFileSync(indexPath, 'utf-8');
    
    const requiredRefs = [
      { pattern: /favicon\.ico/, name: 'favicon.ico' },
      { pattern: /favicon-16x16\.png/, name: 'favicon-16x16.png' },
      { pattern: /favicon-32x32\.png/, name: 'favicon-32x32.png' },
      { pattern: /apple-touch-icon\.png/, name: 'apple-touch-icon.png' },
      { pattern: /site\.webmanifest/, name: 'site.webmanifest' }
    ];

    for (const ref of requiredRefs) {
      if (content.match(ref.pattern)) {
        console.log(`✅ ${ref.name} referenced in HTML`);
      } else {
        console.log(`❌ ${ref.name} NOT referenced in HTML`);
      }
    }
  }

  public async testBuildOutput(): Promise<void> {
    console.log('\n🏗️  Testing Build Output...\n');

    const distPath = 'dist';
    if (!fs.existsSync(distPath)) {
      console.log('⚠️  Build output not found. Run: npm run build');
      return;
    }

    for (const test of this.tests) {
      const fileName = path.basename(test.path);
      const distFilePath = path.join(distPath, fileName);
      
      if (fs.existsSync(distFilePath)) {
        const stats = fs.statSync(distFilePath);
        console.log(`✅ ${fileName} in build - ${stats.size} bytes`);
      } else {
        console.log(`❌ ${fileName} missing from build`);
      }
    }
  }

  public generateReport(): void {
    console.log('\n📊 FAVICON TEST REPORT\n');
    console.log('='.repeat(50));

    const passed = this.tests.filter(t => t.result === true).length;
    const failed = this.tests.filter(t => t.result === false).length;

    console.log(`\n📈 Results:`);
    console.log(`  ✅ Passed: ${passed}/${this.tests.length}`);
    console.log(`  ❌ Failed: ${failed}/${this.tests.length}`);

    if (failed > 0) {
      console.log(`\n🚨 Failed Tests:`);
      this.tests
        .filter(t => t.result === false)
        .forEach(test => {
          console.log(`  - ${test.name}: ${test.error}`);
        });
    }

    console.log(`\n💡 Recommendations:`);
    console.log(`  1. Ensure all favicon files exist and are not corrupted`);
    console.log(`  2. Run 'npm run build' to test build output`);
    console.log(`  3. Clear browser cache after changes`);
    console.log(`  4. Test in different browsers`);
    console.log(`  5. Submit updated sitemap to Google Search Console`);
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Favicon Tests...\n');
  
  const tester = new FaviconTester();
  
  await tester.runTests();
  await tester.testHTMLReferences();
  await tester.testBuildOutput();
  
  tester.generateReport();
  
  console.log('\n✅ Favicon testing completed!');
}

// Run the tests
main().catch(console.error);