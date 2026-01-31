#!/usr/bin/env tsx

/**
 * Comprehensive Favicon Audit & Fix Script
 * Analyzes entire website for favicon issues and consolidates everything
 */

import fs from 'fs';
import path from 'path';

interface FaviconIssue {
  file: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  fix?: string;
}

interface FaviconFile {
  name: string;
  path: string;
  size?: number;
  exists: boolean;
  purpose: string;
}

class FaviconAuditor {
  private issues: FaviconIssue[] = [];
  private faviconFiles: FaviconFile[] = [];
  
  constructor() {
    this.initializeExpectedFiles();
  }

  private initializeExpectedFiles(): void {
    this.faviconFiles = [
      { name: 'favicon.ico', path: 'public/favicon.ico', exists: false, purpose: 'Traditional favicon (required for Google)' },
      { name: 'favicon.svg', path: 'public/favicon.svg', exists: false, purpose: 'Modern SVG favicon' },
      { name: 'favicon-16x16.png', path: 'public/favicon-16x16.png', exists: false, purpose: 'Small PNG favicon' },
      { name: 'favicon-32x32.png', path: 'public/favicon-32x32.png', exists: false, purpose: 'Standard PNG favicon' },
      { name: 'favicon-48x48.png', path: 'public/favicon-48x48.png', exists: false, purpose: 'Large PNG favicon' },
      { name: 'apple-touch-icon.png', path: 'public/apple-touch-icon.png', exists: false, purpose: 'iOS home screen icon' },
      { name: 'android-chrome-192x192.png', path: 'public/android-chrome-192x192.png', exists: false, purpose: 'Android icon (small)' },
      { name: 'android-chrome-512x512.png', path: 'public/android-chrome-512x512.png', exists: false, purpose: 'Android icon (large)' },
      { name: 'site.webmanifest', path: 'public/site.webmanifest', exists: false, purpose: 'PWA manifest file' }
    ];
  }

  public async auditFaviconFiles(): Promise<void> {
    console.log('🔍 Auditing favicon files...\n');
    
    for (const file of this.faviconFiles) {
      const fullPath = path.join(process.cwd(), file.path);
      file.exists = fs.existsSync(fullPath);
      
      if (file.exists) {
        const stats = fs.statSync(fullPath);
        file.size = stats.size;
        console.log(`✅ ${file.name} - ${file.purpose} (${file.size} bytes)`);
      } else {
        console.log(`❌ ${file.name} - Missing`);
        this.issues.push({
          file: file.path,
          issue: `Missing ${file.name}`,
          severity: file.name === 'favicon.ico' ? 'high' : 'medium',
          fix: `Generate ${file.name}`
        });
      }
    }
  }

  public async auditHTMLFiles(): Promise<void> {
    console.log('\n🔍 Auditing HTML favicon references...\n');
    
    // Check main index.html
    await this.auditHTMLFile('index.html');
    
    // Check if there are any other HTML files
    const htmlFiles = this.findHTMLFiles('src');
    for (const htmlFile of htmlFiles) {
      await this.auditHTMLFile(htmlFile);
    }
  }

  private async auditHTMLFile(filePath: string): Promise<void> {
    if (!fs.existsSync(filePath)) {
      this.issues.push({
        file: filePath,
        issue: 'HTML file not found',
        severity: 'high'
      });
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`📄 Checking ${filePath}:`);

    // Check for favicon links
    const faviconChecks = [
      { pattern: /favicon\.ico/g, name: 'favicon.ico', required: true },
      { pattern: /favicon-16x16\.png/g, name: 'favicon-16x16.png', required: true },
      { pattern: /favicon-32x32\.png/g, name: 'favicon-32x32.png', required: true },
      { pattern: /apple-touch-icon\.png/g, name: 'apple-touch-icon.png', required: true },
      { pattern: /site\.webmanifest/g, name: 'site.webmanifest', required: true }
    ];

    for (const check of faviconChecks) {
      const matches = content.match(check.pattern);
      if (matches) {
        console.log(`  ✅ ${check.name} referenced`);
      } else if (check.required) {
        console.log(`  ❌ ${check.name} not referenced`);
        this.issues.push({
          file: filePath,
          issue: `Missing reference to ${check.name}`,
          severity: 'medium',
          fix: `Add <link> tag for ${check.name}`
        });
      }
    }

    // Check for duplicate favicon references
    const faviconLinks = content.match(/<link[^>]*(?:icon|shortcut icon)[^>]*>/g) || [];
    if (faviconLinks.length > 10) {
      this.issues.push({
        file: filePath,
        issue: `Too many favicon links (${faviconLinks.length})`,
        severity: 'low',
        fix: 'Consolidate favicon links'
      });
    }
  }

  private findHTMLFiles(dir: string): string[] {
    const htmlFiles: string[] = [];
    
    if (!fs.existsSync(dir)) return htmlFiles;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
        htmlFiles.push(...this.findHTMLFiles(fullPath));
      } else if (file.isFile() && file.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
    
    return htmlFiles;
  }

  public async auditBuildOutput(): Promise<void> {
    console.log('\n🔍 Auditing build output...\n');
    
    const distPath = 'dist';
    if (!fs.existsSync(distPath)) {
      console.log('⚠️  Dist folder not found. Run npm run build first.');
      return;
    }

    // Check if favicon files are copied to dist
    for (const file of this.faviconFiles) {
      const distFilePath = path.join(distPath, path.basename(file.path));
      const exists = fs.existsSync(distFilePath);
      
      if (exists) {
        console.log(`✅ ${path.basename(file.path)} copied to dist`);
      } else {
        console.log(`❌ ${path.basename(file.path)} missing in dist`);
        this.issues.push({
          file: distFilePath,
          issue: `Favicon not copied to build output`,
          severity: 'high',
          fix: 'Check build configuration'
        });
      }
    }
  }

  public async auditDuplicateScripts(): Promise<void> {
    console.log('\n🔍 Checking for duplicate favicon generation scripts...\n');
    
    const scriptFiles = [
      'scripts/generateFavicons.ts',
      'scripts/generateFaviconIco.ts'
    ];

    const existingScripts = scriptFiles.filter(script => fs.existsSync(script));
    
    if (existingScripts.length > 1) {
      console.log('⚠️  Multiple favicon generation scripts found:');
      existingScripts.forEach(script => console.log(`  - ${script}`));
      
      this.issues.push({
        file: 'scripts/',
        issue: 'Duplicate favicon generation scripts',
        severity: 'medium',
        fix: 'Consolidate into single script'
      });
    } else {
      console.log('✅ No duplicate scripts found');
    }
  }

  public generateReport(): void {
    console.log('\n📊 FAVICON AUDIT REPORT\n');
    console.log('='.repeat(50));
    
    // Summary
    const highIssues = this.issues.filter(i => i.severity === 'high').length;
    const mediumIssues = this.issues.filter(i => i.severity === 'medium').length;
    const lowIssues = this.issues.filter(i => i.severity === 'low').length;
    
    console.log(`\n📈 Summary:`);
    console.log(`  🔴 High Priority Issues: ${highIssues}`);
    console.log(`  🟡 Medium Priority Issues: ${mediumIssues}`);
    console.log(`  🟢 Low Priority Issues: ${lowIssues}`);
    console.log(`  📁 Total Favicon Files: ${this.faviconFiles.filter(f => f.exists).length}/${this.faviconFiles.length}`);

    // Issues
    if (this.issues.length > 0) {
      console.log(`\n🚨 Issues Found:`);
      this.issues.forEach((issue, index) => {
        const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`\n${index + 1}. ${icon} ${issue.issue}`);
        console.log(`   File: ${issue.file}`);
        if (issue.fix) {
          console.log(`   Fix: ${issue.fix}`);
        }
      });
    } else {
      console.log('\n✅ No issues found! Favicon setup is perfect.');
    }

    // Recommendations
    console.log(`\n💡 Recommendations:`);
    console.log(`  1. Keep only one favicon generation script`);
    console.log(`  2. Ensure favicon.ico is always present (Google requirement)`);
    console.log(`  3. Test favicons across different browsers`);
    console.log(`  4. Use Google Search Console to monitor favicon indexing`);
    console.log(`  5. Clear browser cache after favicon updates`);
  }

  public async fixIssues(): Promise<void> {
    console.log('\n🔧 Auto-fixing issues...\n');
    
    // Remove duplicate script if exists
    if (fs.existsSync('scripts/generateFaviconIco.ts') && fs.existsSync('scripts/generateFavicons.ts')) {
      console.log('🗑️  Removing duplicate favicon generation script...');
      fs.unlinkSync('scripts/generateFaviconIco.ts');
      console.log('✅ Removed scripts/generateFaviconIco.ts');
    }

    console.log('✅ Auto-fix completed!');
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Comprehensive Favicon Audit...\n');
  
  const auditor = new FaviconAuditor();
  
  await auditor.auditFaviconFiles();
  await auditor.auditHTMLFiles();
  await auditor.auditBuildOutput();
  await auditor.auditDuplicateScripts();
  
  auditor.generateReport();
  
  // Ask for auto-fix
  console.log('\n🤖 Auto-fixing issues...');
  await auditor.fixIssues();
  
  console.log('\n✅ Favicon audit completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Run: npm run build');
  console.log('2. Test favicon in browser');
  console.log('3. Deploy to production');
  console.log('4. Submit to Google Search Console');
}

// Run the audit
main().catch(console.error);