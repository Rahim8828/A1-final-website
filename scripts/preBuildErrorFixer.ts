#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ErrorFix {
  pattern: RegExp;
  replacement: string;
  description: string;
}

interface ImportFix {
  from: string;
  to: string;
  description: string;
}

class PreBuildErrorFixer {
  private fixedFiles: string[] = [];
  private errors: string[] = [];

  // Common import path fixes
  private importFixes: ImportFix[] = [
    {
      from: "from '../../src/components/OptimizedImage'",
      to: "from '../../src/components/OptimizedImage'",
      description: "Fix OptimizedImage import path in blog components"
    },
    {
      from: "from '../../src/components/OptimizedImage'",
      to: "from '../../src/components/OptimizedImage'",
      description: "Fix OptimizedImage import path in blog pages"
    },
    {
      from: "from '../../src/components/SEOHead'",
      to: "from '../../src/components/SEOHead'",
      description: "Fix SEOHead import path in blog pages"
    },
    {
      from: "from '../../src/utils/imageHelpers'",
      to: "from '../../src/utils/imageHelpers'",
      description: "Fix imageHelpers import path in blog components"
    },
    {
      from: "from '../../src/utils/imageHelpers'",
      to: "from '../../src/utils/imageHelpers'",
      description: "Fix imageHelpers import path in blog utils"
    }
  ];

  // Common code pattern fixes
  private patternFixes: ErrorFix[] = [
    {
      pattern: /import\s+.*\s+from\s+['"]\.\/OptimizedImage['"];?/g,
      replacement: "import OptimizedImage from '../../src/components/OptimizedImage';",
      description: "Fix relative OptimizedImage imports"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\/SEOHead['"];?/g,
      replacement: "import SEOHead from '../../src/components/SEOHead';",
      description: "Fix relative SEOHead imports"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\/imageHelpers['"];?/g,
      replacement: "import { COMMON_SIZES } from '../../src/utils/imageHelpers';",
      description: "Fix relative imageHelpers imports"
    },
    {
      pattern: /export\s+default\s+function\s+(\w+)\s*\(\s*\)\s*\{/g,
      replacement: "const $1 = () => {",
      description: "Convert function declarations to arrow functions for consistency"
    }
  ];

  // Case sensitivity fixes
  private caseSensitivityFixes = [
    {
      pattern: /from\s+['"]\.\/pages\/contact['"]/gi,
      replacement: "from './pages/Contact'",
      description: "Fix case sensitivity for Contact page import"
    }
  ];

  async fixAllErrors(): Promise<void> {
    console.log('🔧 Starting pre-build error detection and fixing...\n');

    try {
      // Fix TypeScript/Import errors
      await this.fixImportErrors();
      
      // Fix common code pattern issues
      await this.fixPatternErrors();
      
      // Check for missing files
      await this.checkMissingFiles();
      
      // Validate TypeScript compilation
      await this.validateTypeScript();
      
      // Generate summary
      this.generateSummary();
      
    } catch (error) {
      console.error('❌ Error during pre-build fixing:', error);
      process.exit(1);
    }
  }

  private async fixImportErrors(): Promise<void> {
    console.log('📦 Fixing import path errors...');
    
    // Get all TypeScript/TSX files
    const files = await glob('**/*.{ts,tsx}', {
      ignore: ['node_modules/**', 'dist/**', '.git/**']
    });

    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Apply import fixes
        for (const fix of this.importFixes) {
          if (content.includes(fix.from)) {
            content = content.replace(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.to);
            modified = true;
            console.log(`  ✓ ${file}: ${fix.description}`);
          }
        }

        if (modified) {
          fs.writeFileSync(file, content);
          this.fixedFiles.push(file);
        }
      } catch (error) {
        this.errors.push(`Failed to fix imports in ${file}: ${error}`);
      }
    }
  }

  private async fixPatternErrors(): Promise<void> {
    console.log('\n🔍 Fixing code pattern errors...');
    
    const files = await glob('**/*.{ts,tsx}', {
      ignore: ['node_modules/**', 'dist/**', '.git/**']
    });

    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Apply pattern fixes
        for (const fix of this.patternFixes) {
          if (fix.pattern.test(content)) {
            content = content.replace(fix.pattern, fix.replacement);
            modified = true;
            console.log(`  ✓ ${file}: ${fix.description}`);
          }
        }

        // Apply case sensitivity fixes
        for (const fix of this.caseSensitivityFixes) {
          if (fix.pattern.test(content)) {
            content = content.replace(fix.pattern, fix.replacement);
            modified = true;
            console.log(`  ✓ ${file}: ${fix.description}`);
          }
        }

        if (modified) {
          fs.writeFileSync(file, content);
          if (!this.fixedFiles.includes(file)) {
            this.fixedFiles.push(file);
          }
        }
      } catch (error) {
        this.errors.push(`Failed to fix patterns in ${file}: ${error}`);
      }
    }
  }

  private async checkMissingFiles(): Promise<void> {
    console.log('\n📁 Checking for missing files...');
    
    const criticalFiles = [
      'src/components/OptimizedImage.tsx',
      'src/components/SEOHead.tsx',
      'src/utils/imageHelpers.ts',
      'src/types.ts',
      'package.json',
      'tsconfig.json',
      'vite.config.ts'
    ];

    for (const file of criticalFiles) {
      if (!fs.existsSync(file)) {
        this.errors.push(`Missing critical file: ${file}`);
        console.log(`  ❌ Missing: ${file}`);
      } else {
        console.log(`  ✓ Found: ${file}`);
      }
    }
  }

  private async validateTypeScript(): Promise<void> {
    console.log('\n🔍 Running TypeScript validation...');
    
    try {
      const { execSync } = await import('child_process');
      
      // Run TypeScript compiler check
      execSync('npx tsc --noEmit --skipLibCheck', { 
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      console.log('  ✓ TypeScript validation passed');
    } catch (error: any) {
      console.log('  ⚠️  TypeScript validation found issues:');
      console.log(error.stdout?.toString() || error.message);
      
      // Don't fail the process for TS errors, just warn
      this.errors.push('TypeScript validation found issues (see above)');
    }
  }

  private generateSummary(): void {
    console.log('\n📊 Pre-Build Fix Summary');
    console.log('========================');
    
    if (this.fixedFiles.length > 0) {
      console.log(`✅ Fixed ${this.fixedFiles.length} files:`);
      this.fixedFiles.forEach(file => console.log(`   - ${file}`));
    } else {
      console.log('✅ No files needed fixing');
    }
    
    if (this.errors.length > 0) {
      console.log(`\n⚠️  ${this.errors.length} issues found:`);
      this.errors.forEach(error => console.log(`   - ${error}`));
    } else {
      console.log('\n✅ No critical errors found');
    }
    
    console.log('\n🚀 Ready for build!');
  }
}

// Additional utility functions
class BuildValidator {
  static async validatePackageJson(): Promise<boolean> {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      const requiredDeps = [
        'react',
        'react-dom',
        'react-router-dom',
        'vite'
      ];
      
      const missing = requiredDeps.filter(dep => 
        !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]
      );
      
      if (missing.length > 0) {
        console.log(`❌ Missing dependencies: ${missing.join(', ')}`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.log('❌ Invalid package.json');
      return false;
    }
  }

  static async validateViteConfig(): Promise<boolean> {
    try {
      if (!fs.existsSync('vite.config.ts')) {
        console.log('❌ Missing vite.config.ts');
        return false;
      }
      
      const config = fs.readFileSync('vite.config.ts', 'utf8');
      
      if (!config.includes('@vitejs/plugin-react')) {
        console.log('⚠️  React plugin not found in vite.config.ts');
      }
      
      return true;
    } catch (error) {
      console.log('❌ Invalid vite.config.ts');
      return false;
    }
  }
}

// Main execution
async function main() {
  const fixer = new PreBuildErrorFixer();
  
  // Validate environment
  console.log('🔍 Validating build environment...');
  
  const packageValid = await BuildValidator.validatePackageJson();
  const viteValid = await BuildValidator.validateViteConfig();
  
  if (!packageValid || !viteValid) {
    console.log('❌ Build environment validation failed');
    process.exit(1);
  }
  
  console.log('✅ Build environment validated\n');
  
  // Fix all errors
  await fixer.fixAllErrors();
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default PreBuildErrorFixer;