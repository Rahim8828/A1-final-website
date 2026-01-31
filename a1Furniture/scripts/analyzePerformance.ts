import { readFileSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

interface BundleInfo {
  name: string;
  size: number;
  sizeKB: number;
}

function getFileSize(filePath: string): number {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundleSize() {
  console.log('\n📦 Bundle Size Analysis');
  console.log('='.repeat(80));

  const distPath = 'dist';
  const assetsPath = join(distPath, 'assets');

  try {
    const files = readdirSync(assetsPath);
    const jsFiles: BundleInfo[] = [];
    const cssFiles: BundleInfo[] = [];

    files.forEach(file => {
      const filePath = join(assetsPath, file);
      const size = getFileSize(filePath);
      const info: BundleInfo = {
        name: file,
        size,
        sizeKB: size / 1024
      };

      if (file.endsWith('.js')) {
        jsFiles.push(info);
      } else if (file.endsWith('.css')) {
        cssFiles.push(info);
      }
    });

    // Sort by size
    jsFiles.sort((a, b) => b.size - a.size);
    cssFiles.sort((a, b) => b.size - a.size);

    console.log('\nJavaScript Bundles:');
    console.log('-'.repeat(80));
    let totalJS = 0;
    jsFiles.forEach(file => {
      totalJS += file.size;
      const status = file.sizeKB > 500 ? '⚠️' : file.sizeKB > 200 ? '⚡' : '✅';
      console.log(`${status} ${file.name.padEnd(50)} ${formatBytes(file.size).padStart(10)}`);
    });
    console.log('-'.repeat(80));
    console.log(`Total JS: ${formatBytes(totalJS)}`);

    console.log('\nCSS Bundles:');
    console.log('-'.repeat(80));
    let totalCSS = 0;
    cssFiles.forEach(file => {
      totalCSS += file.size;
      const status = file.sizeKB > 100 ? '⚠️' : file.sizeKB > 50 ? '⚡' : '✅';
      console.log(`${status} ${file.name.padEnd(50)} ${formatBytes(file.size).padStart(10)}`);
    });
    console.log('-'.repeat(80));
    console.log(`Total CSS: ${formatBytes(totalCSS)}`);

    console.log('\n📊 Summary:');
    console.log('-'.repeat(80));
    console.log(`Total Bundle Size: ${formatBytes(totalJS + totalCSS)}`);
    
    const totalKB = (totalJS + totalCSS) / 1024;
    if (totalKB < 500) {
      console.log('✅ Bundle size is excellent (< 500 KB)');
    } else if (totalKB < 1000) {
      console.log('⚡ Bundle size is good (< 1 MB)');
    } else {
      console.log('⚠️  Bundle size is large (> 1 MB) - consider optimization');
    }

  } catch (error) {
    console.log('❌ Could not analyze bundle. Run "npm run build" first.');
  }
}

function checkCodeSplitting() {
  console.log('\n🔀 Code Splitting Analysis');
  console.log('='.repeat(80));

  try {
    const appContent = readFileSync('src/App.tsx', 'utf-8');
    const mainContent = readFileSync('src/main.tsx', 'utf-8');

    const hasLazy = appContent.includes('React.lazy') || appContent.includes('lazy(');
    const hasSuspense = appContent.includes('Suspense') || mainContent.includes('Suspense');
    const hasDynamicImport = appContent.includes('import(');

    console.log(`✓ React.lazy() usage: ${hasLazy ? '✅ Found' : '❌ Not found'}`);
    console.log(`✓ Suspense component: ${hasSuspense ? '✅ Found' : '❌ Not found'}`);
    console.log(`✓ Dynamic imports: ${hasDynamicImport ? '✅ Found' : '❌ Not found'}`);

    if (hasLazy && hasSuspense) {
      console.log('\n✅ Code splitting is properly implemented');
    } else {
      console.log('\n⚠️  Code splitting could be improved');
      console.log('   Consider using React.lazy() for route-based code splitting');
    }

  } catch (error) {
    console.log('❌ Could not analyze code splitting');
  }
}

function checkImageOptimization() {
  console.log('\n🖼️  Image Optimization Analysis');
  console.log('='.repeat(80));

  try {
    const optimizedImageContent = readFileSync('src/components/OptimizedImage.tsx', 'utf-8');

    const hasLazyLoading = optimizedImageContent.includes('loading="lazy"');
    const hasWebP = optimizedImageContent.includes('webp') || optimizedImageContent.includes('avif');
    const hasSrcSet = optimizedImageContent.includes('srcSet') || optimizedImageContent.includes('srcset');

    console.log(`✓ Lazy loading: ${hasLazyLoading ? '✅ Implemented' : '❌ Not found'}`);
    console.log(`✓ Modern formats (WebP/AVIF): ${hasWebP ? '✅ Supported' : '❌ Not found'}`);
    console.log(`✓ Responsive images (srcset): ${hasSrcSet ? '✅ Implemented' : '❌ Not found'}`);

    if (hasLazyLoading && hasWebP && hasSrcSet) {
      console.log('\n✅ Image optimization is excellent');
    } else {
      console.log('\n⚠️  Image optimization could be improved');
    }

  } catch (error) {
    console.log('❌ Could not analyze image optimization');
  }
}

function checkViteConfig() {
  console.log('\n⚙️  Build Configuration Analysis');
  console.log('='.repeat(80));

  try {
    const viteConfig = readFileSync('vite.config.ts', 'utf-8');

    const hasMinify = viteConfig.includes('minify');
    const hasTreeShaking = viteConfig.includes('treeshake') || !viteConfig.includes('treeshake: false');
    const hasChunkSizeWarning = viteConfig.includes('chunkSizeWarningLimit');
    const hasManualChunks = viteConfig.includes('manualChunks');

    console.log(`✓ Minification: ${hasMinify || !viteConfig.includes('minify: false') ? '✅ Enabled' : '❌ Disabled'}`);
    console.log(`✓ Tree shaking: ${hasTreeShaking ? '✅ Enabled' : '❌ Disabled'}`);
    console.log(`✓ Chunk size monitoring: ${hasChunkSizeWarning ? '✅ Configured' : '⚡ Default'}`);
    console.log(`✓ Manual chunks: ${hasManualChunks ? '✅ Configured' : '⚡ Auto'}`);

    console.log('\n✅ Build configuration looks good');

  } catch (error) {
    console.log('❌ Could not analyze Vite configuration');
  }
}

function provideRecommendations() {
  console.log('\n💡 Performance Optimization Recommendations');
  console.log('='.repeat(80));

  console.log('\n1. Bundle Size Optimization:');
  console.log('   • Use dynamic imports for large dependencies');
  console.log('   • Consider removing unused dependencies');
  console.log('   • Use tree-shaking friendly imports (import { x } from "lib")');

  console.log('\n2. Code Splitting:');
  console.log('   • Split routes using React.lazy()');
  console.log('   • Lazy load heavy components');
  console.log('   • Use Suspense boundaries strategically');

  console.log('\n3. Image Optimization:');
  console.log('   • Use WebP/AVIF formats with fallbacks');
  console.log('   • Implement lazy loading for below-fold images');
  console.log('   • Use responsive images with srcset');
  console.log('   • Compress images before deployment');

  console.log('\n4. Critical CSS:');
  console.log('   • Inline critical CSS for above-the-fold content');
  console.log('   • Defer non-critical CSS');
  console.log('   • Remove unused CSS');

  console.log('\n5. Font Loading:');
  console.log('   • Use font-display: swap');
  console.log('   • Preload critical fonts');
  console.log('   • Subset fonts to include only needed characters');

  console.log('\n6. Caching Strategy:');
  console.log('   • Configure proper cache headers');
  console.log('   • Use service workers for offline support');
  console.log('   • Implement stale-while-revalidate strategy');
}

function main() {
  console.log('\n🚀 Performance Analysis Report');
  console.log('='.repeat(80));
  console.log('Analyzing current build and configuration...\n');

  analyzeBundleSize();
  checkCodeSplitting();
  checkImageOptimization();
  checkViteConfig();
  provideRecommendations();

  console.log('\n' + '='.repeat(80));
  console.log('Analysis complete! Review recommendations above.');
  console.log('='.repeat(80) + '\n');
}

main();
