#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface BuildError {
  type: 'import' | 'typescript' | 'missing-file' | 'syntax' | 'dependency';
  file?: string;
  message: string;
  fix?: () => void;
}

class BuildErrorHandler {
  private errors: BuildError[] = [];

  async handleBuildErrors(): Promise<boolean> {
    console.log('🔧 Comprehensive Build Error Handler');
    console.log('===================================\n');

    try {
      // Step 1: Fix common import issues
      await this.fixImportIssues();
      
      // Step 2: Fix missing files
      await this.fixMissingFiles();
      
      // Step 3: Fix TypeScript issues
      await this.fixTypeScriptIssues();
      
      // Step 4: Fix dependency issues
      await this.fixDependencyIssues();
      
      // Step 5: Test build
      const buildSuccess = await this.testBuild();
      
      return buildSuccess;
    } catch (error) {
      console.error('❌ Critical error in build handler:', error);
      return false;
    }
  }

  private async fixImportIssues(): Promise<void> {
    console.log('📦 Fixing Import Issues...');
    
    const importFixes = [
      {
        pattern: /from ['"]\.\/OptimizedImage['"]/g,
        replacement: "from '../../src/components/OptimizedImage'",
        files: ['blog/**/*.tsx']
      },
      {
        pattern: /from ['"]\.\.\/components\/OptimizedImage['"]/g,
        replacement: "from '../../src/components/OptimizedImage'",
        files: ['blog/**/*.tsx']
      },
      {
        pattern: /from ['"]\.\.\/components\/SEOHead['"]/g,
        replacement: "from '../../src/components/SEOHead'",
        files: ['blog/**/*.tsx']
      },
      {
        pattern: /from ['"]\.\.\/utils\/imageHelpers['"]/g,
        replacement: "from '../../src/utils/imageHelpers'",
        files: ['blog/**/*.tsx']
      }
    ];

    for (const fix of importFixes) {
      await this.applyFixToFiles(fix.pattern, fix.replacement, fix.files);
    }
  }

  private async fixMissingFiles(): Promise<void> {
    console.log('\n📁 Checking and Creating Missing Files...');
    
    // Create missing component files if they don't exist
    const criticalFiles = [
      {
        path: 'src/components/OptimizedImage.tsx',
        content: this.getOptimizedImageTemplate()
      },
      {
        path: 'src/components/SEOHead.tsx',
        content: this.getSEOHeadTemplate()
      },
      {
        path: 'src/utils/imageHelpers.ts',
        content: this.getImageHelpersTemplate()
      }
    ];

    for (const file of criticalFiles) {
      if (!fs.existsSync(file.path)) {
        console.log(`  📝 Creating missing file: ${file.path}`);
        this.ensureDirectoryExists(path.dirname(file.path));
        fs.writeFileSync(file.path, file.content);
      } else {
        console.log(`  ✅ File exists: ${file.path}`);
      }
    }
  }

  private async fixTypeScriptIssues(): Promise<void> {
    console.log('\n🔍 Fixing TypeScript Issues...');
    
    try {
      // Run TypeScript check and capture errors
      execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
      console.log('  ✅ No TypeScript errors found');
    } catch (error: any) {
      const output = error.stdout?.toString() || error.stderr?.toString() || '';
      console.log('  ⚠️  TypeScript errors found, attempting fixes...');
      
      // Common TS fixes
      await this.fixCommonTSErrors(output);
    }
  }

  private async fixDependencyIssues(): Promise<void> {
    console.log('\n📦 Checking Dependencies...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check for missing critical dependencies
      const criticalDeps = [
        'react',
        'react-dom',
        'react-router-dom',
        '@vitejs/plugin-react',
        'vite',
        'typescript'
      ];
      
      const missing = criticalDeps.filter(dep => 
        !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
      );
      
      if (missing.length > 0) {
        console.log(`  ❌ Missing dependencies: ${missing.join(', ')}`);
        console.log('  💡 Run: npm install to fix dependency issues');
      } else {
        console.log('  ✅ All critical dependencies found');
      }
    } catch (error) {
      console.log('  ❌ Error checking dependencies:', error);
    }
  }

  private async testBuild(): Promise<boolean> {
    console.log('\n🧪 Testing Build...');
    
    try {
      // Try a dry run build
      execSync('npx vite build --mode development', { 
        stdio: 'pipe',
        timeout: 30000 // 30 second timeout
      });
      
      console.log('  ✅ Build test successful!');
      return true;
    } catch (error: any) {
      console.log('  ❌ Build test failed');
      console.log('  Error:', error.message);
      
      // Try to extract and fix specific build errors
      const output = error.stdout?.toString() || error.stderr?.toString() || '';
      await this.handleSpecificBuildErrors(output);
      
      return false;
    }
  }

  private async applyFixToFiles(pattern: RegExp, replacement: string, fileGlobs: string[]): Promise<void> {
    const { glob } = await import('glob');
    
    for (const fileGlob of fileGlobs) {
      const files = await glob(fileGlob, { ignore: ['node_modules/**', 'dist/**'] });
      
      for (const file of files) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          
          if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            fs.writeFileSync(file, content);
            console.log(`  ✅ Fixed imports in: ${file}`);
          }
        } catch (error) {
          console.log(`  ❌ Error fixing ${file}:`, error);
        }
      }
    }
  }

  private async fixCommonTSErrors(output: string): Promise<void> {
    // Fix common TypeScript errors
    const fixes = [
      {
        error: "Cannot find module",
        fix: () => this.fixMissingModules(output)
      },
      {
        error: "Property does not exist",
        fix: () => this.fixMissingProperties(output)
      }
    ];

    for (const fix of fixes) {
      if (output.includes(fix.error)) {
        fix.fix();
      }
    }
  }

  private async handleSpecificBuildErrors(output: string): Promise<void> {
    // Handle specific Vite build errors
    if (output.includes('Could not resolve')) {
      console.log('  🔧 Attempting to fix module resolution errors...');
      await this.fixModuleResolution(output);
    }
    
    if (output.includes('Unexpected token')) {
      console.log('  🔧 Attempting to fix syntax errors...');
      await this.fixSyntaxErrors(output);
    }
  }

  private fixMissingModules(output: string): void {
    // Extract module names and suggest fixes
    const moduleMatches = output.match(/Cannot find module ['"]([^'"]+)['"]/g);
    if (moduleMatches) {
      console.log('  📦 Missing modules detected:');
      moduleMatches.forEach(match => {
        const module = match.match(/['"]([^'"]+)['"]/)?.[1];
        console.log(`    - ${module}`);
      });
    }
  }

  private fixMissingProperties(output: string): void {
    // Handle missing property errors
    console.log('  🔧 Property errors detected - check type definitions');
  }

  private async fixModuleResolution(output: string): Promise<void> {
    // Fix module resolution issues
    const resolveMatches = output.match(/Could not resolve "([^"]+)"/g);
    if (resolveMatches) {
      console.log('  🔧 Module resolution issues:');
      resolveMatches.forEach(match => {
        const module = match.match(/"([^"]+)"/)?.[1];
        console.log(`    - ${module}`);
      });
    }
  }

  private async fixSyntaxErrors(output: string): Promise<void> {
    // Handle syntax errors
    console.log('  🔧 Syntax errors detected - check file formatting');
  }

  private ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Template generators
  private getOptimizedImageTemplate(): string {
    return `import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  objectFit = 'cover'
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit }}
      loading="lazy"
    />
  );
};

export default OptimizedImage;
`;
  }

  private getSEOHeadTemplate(): string {
    return `import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogUrl?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogUrl,
  ogImage
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEOHead;
`;
  }

  private getImageHelpersTemplate(): string {
    return `export const COMMON_SIZES = {
  grid: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  fullWidth: '100vw',
  hero: '(min-width: 1024px) 100vw, (min-width: 768px) 100vw, 100vw'
};

export const generateSrcSet = (basePath: string, sizes: number[]): string => {
  return sizes.map(size => \`\${basePath}-\${size}w.webp \${size}w\`).join(', ');
};
`;
  }
}

// Main execution
async function main() {
  const handler = new BuildErrorHandler();
  const success = await handler.handleBuildErrors();
  
  if (success) {
    console.log('\n🎉 All build errors fixed! Ready to build.');
    process.exit(0);
  } else {
    console.log('\n❌ Some issues remain. Please check the errors above.');
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default BuildErrorHandler;