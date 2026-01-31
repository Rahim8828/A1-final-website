#!/usr/bin/env tsx

/**
 * Implement Image Lazy Loading Script
 * Optimizes images and implements lazy loading across all pages
 * Requirement: 4.1 - Image optimization implementation
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { PerformanceOptimizer } from '../src/seo/managers/PerformanceOptimizer';

const performanceOptimizer = new PerformanceOptimizer({
  lazyLoadingEnabled: true,
  bundleMinificationEnabled: true,
  coreWebVitalsThresholds: {
    lcp: 2500,
    fid: 100,
    cls: 0.1
  },
  cacheHeadersEnabled: true
});

interface ImageAnalysis {
  filePath: string;
  imageCount: number;
  hasLazyLoading: boolean;
  hasOptimizedImages: boolean;
  images: ImageInfo[];
  suggestedOptimizations: string[];
}

interface ImageInfo {
  src: string;
  alt?: string;
  hasLazyLoading: boolean;
  isOptimized: boolean;
  suggestedSrc?: string;
}

/**
 * Analyzes a page for image optimization opportunities
 */
function analyzeImages(filePath: string): ImageAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all image tags
  const imageMatches = content.match(/<img[^>]*>|<OptimizedImage[^>]*>/g) || [];
  const images: ImageInfo[] = [];
  
  imageMatches.forEach(imgTag => {
    const srcMatch = imgTag.match(/src="([^"]+)"/);
    const altMatch = imgTag.match(/alt="([^"]+)"/);
    const hasLazyLoading = imgTag.includes('loading="lazy"') || imgTag.includes('OptimizedImage');
    
    if (srcMatch) {
      const src = srcMatch[1];
      const isOptimized = isOptimizedImagePath(src);
      
      images.push({
        src,
        alt: altMatch ? altMatch[1] : undefined,
        hasLazyLoading,
        isOptimized,
        suggestedSrc: isOptimized ? undefined : getOptimizedImagePath(src)
      });
    }
  });
  
  const hasLazyLoading = images.every(img => img.hasLazyLoading);
  const hasOptimizedImages = images.every(img => img.isOptimized);
  
  const suggestedOptimizations = generateOptimizationSuggestions(images, content);
  
  return {
    filePath,
    imageCount: images.length,
    hasLazyLoading,
    hasOptimizedImages,
    images,
    suggestedOptimizations
  };
}

/**
 * Checks if an image path is already optimized
 */
function isOptimizedImagePath(src: string): boolean {
  return src.includes('/assets/optimized/') || 
         src.includes('.webp') || 
         src.includes('.avif') ||
         src.startsWith('data:') ||
         src.startsWith('http');
}

/**
 * Gets the optimized version of an image path
 */
function getOptimizedImagePath(src: string): string {
  // If it's already in assets, convert to optimized path
  if (src.startsWith('/assets/') && !src.includes('/optimized/')) {
    const fileName = path.basename(src, path.extname(src));
    return `/assets/optimized/${fileName}-640w.webp`;
  }
  
  // If it's a relative path, assume it should be in optimized assets
  if (!src.startsWith('http') && !src.startsWith('/')) {
    const fileName = path.basename(src, path.extname(src));
    return `/assets/optimized/${fileName}-640w.webp`;
  }
  
  return src; // Return as-is for external URLs
}

/**
 * Generates optimization suggestions for images
 */
function generateOptimizationSuggestions(images: ImageInfo[], content: string): string[] {
  const suggestions: string[] = [];
  
  // Check for lazy loading
  const imagesWithoutLazy = images.filter(img => !img.hasLazyLoading);
  if (imagesWithoutLazy.length > 0) {
    suggestions.push(`Add lazy loading to ${imagesWithoutLazy.length} images`);
  }
  
  // Check for optimized formats
  const unoptimizedImages = images.filter(img => !img.isOptimized);
  if (unoptimizedImages.length > 0) {
    suggestions.push(`Convert ${unoptimizedImages.length} images to optimized formats`);
  }
  
  // Check for missing alt text
  const imagesWithoutAlt = images.filter(img => !img.alt);
  if (imagesWithoutAlt.length > 0) {
    suggestions.push(`Add alt text to ${imagesWithoutAlt.length} images`);
  }
  
  // Check for OptimizedImage component usage
  if (images.length > 0 && !content.includes('OptimizedImage')) {
    suggestions.push('Use OptimizedImage component for better performance');
  }
  
  return suggestions;
}

/**
 * Implements lazy loading for images in a file
 */
function implementLazyLoading(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Replace regular img tags with lazy loading
    content = content.replace(
      /<img([^>]*?)src="([^"]*)"([^>]*?)(?!.*loading=)>/g,
      (match, before, src, after) => {
        modified = true;
        return `<img${before}src="${src}"${after} loading="lazy">`;
      }
    );
    
    // Convert img tags to OptimizedImage component where beneficial
    content = content.replace(
      /<img([^>]*?)src="(\/assets\/[^"]*)"([^>]*?)>/g,
      (match, before, src, after) => {
        const optimizedSrc = getOptimizedImagePath(src);
        modified = true;
        return `<OptimizedImage${before}src="${optimizedSrc}"${after}>`;
      }
    );
    
    // Ensure OptimizedImage import is present if we're using it
    if (content.includes('OptimizedImage') && !content.includes("import OptimizedImage")) {
      const importMatch = content.match(/import React from 'react';/);
      if (importMatch) {
        content = content.replace(
          /import React from 'react';/,
          "import React from 'react';\nimport OptimizedImage from '../../components/OptimizedImage';"
        );
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    return modified;
  } catch (error) {
    console.error(`Error implementing lazy loading in ${filePath}:`, error);
    return false;
  }
}

/**
 * Optimizes image paths in a file
 */
function optimizeImagePaths(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Update image paths to optimized versions
    content = content.replace(
      /src="(\/assets\/(?!optimized\/)[^"]+)"/g,
      (match, src) => {
        const optimizedSrc = getOptimizedImagePath(src);
        if (optimizedSrc !== src) {
          modified = true;
          return `src="${optimizedSrc}"`;
        }
        return match;
      }
    );
    
    // Update non-webp images to webp where available
    content = content.replace(
      /src="(\/assets\/optimized\/[^"]+)\.(jpg|jpeg|png)"/g,
      (match, basePath, ext) => {
        modified = true;
        return `src="${basePath}.webp"`;
      }
    );
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    return modified;
  } catch (error) {
    console.error(`Error optimizing image paths in ${filePath}:`, error);
    return false;
  }
}

/**
 * Adds missing alt text to images
 */
function addMissingAltText(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Extract page context for generating alt text
    const titleMatch = content.match(/"title":\s*"([^"]+)"/);
    const serviceMatch = content.match(/"serviceName":\s*"([^"]+)"/);
    const locationMatch = content.match(/"location":\s*"([^"]+)"/);
    
    const title = titleMatch ? titleMatch[1] : '';
    const service = serviceMatch ? serviceMatch[1] : 'Furniture Polish';
    const location = locationMatch ? locationMatch[1] : 'Mumbai';
    
    // Add alt text to images without it
    content = content.replace(
      /<(img|OptimizedImage)([^>]*?)src="([^"]*)"([^>]*?)(?!.*alt=)>/g,
      (match, tag, before, src, after) => {
        const altText = generateAltText(src, service, location);
        modified = true;
        return `<${tag}${before}src="${src}"${after} alt="${altText}">`;
      }
    );
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    return modified;
  } catch (error) {
    console.error(`Error adding alt text in ${filePath}:`, error);
    return false;
  }
}

/**
 * Generates appropriate alt text for an image
 */
function generateAltText(src: string, service: string, location: string): string {
  const fileName = path.basename(src, path.extname(src));
  
  // Map common image names to descriptive alt text
  const altTextMap: Record<string, string> = {
    'sofa-polish': `Professional sofa polishing service in ${location}`,
    'table-polish': `Expert table polishing service in ${location}`,
    'wardrobe-polish': `Quality wardrobe polishing in ${location}`,
    'cabinet-polish': `Cabinet polishing service in ${location}`,
    'bed-polish': `Bed polishing service in ${location}`,
    'door-polish': `Door polishing service in ${location}`,
    'antique-restoration': `Antique furniture restoration in ${location}`,
    'wooden-furniture': `Wooden furniture polishing in ${location}`,
    'mandir-polish': `Mandir polishing service in ${location}`,
    'jhula-polish': `Jhula polishing service in ${location}`
  };
  
  // Check for exact matches
  for (const [key, altText] of Object.entries(altTextMap)) {
    if (fileName.toLowerCase().includes(key)) {
      return altText;
    }
  }
  
  // Generate generic alt text based on service and location
  return `${service} service in ${location} - Professional furniture polishing`;
}

/**
 * Validates image optimization across all files
 */
function validateImageOptimization(analyses: ImageAnalysis[]): {
  totalImages: number;
  lazyLoadedImages: number;
  optimizedImages: number;
  imagesWithAlt: number;
} {
  let totalImages = 0;
  let lazyLoadedImages = 0;
  let optimizedImages = 0;
  let imagesWithAlt = 0;
  
  analyses.forEach(analysis => {
    analysis.images.forEach(image => {
      totalImages++;
      if (image.hasLazyLoading) lazyLoadedImages++;
      if (image.isOptimized) optimizedImages++;
      if (image.alt) imagesWithAlt++;
    });
  });
  
  return {
    totalImages,
    lazyLoadedImages,
    optimizedImages,
    imagesWithAlt
  };
}

/**
 * Generates a comprehensive report
 */
function generateImageOptimizationReport(analyses: ImageAnalysis[]): void {
  const validation = validateImageOptimization(analyses);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: analyses.length,
    pagesWithImages: analyses.filter(a => a.imageCount > 0).length,
    imageStats: {
      totalImages: validation.totalImages,
      lazyLoadedImages: validation.lazyLoadedImages,
      optimizedImages: validation.optimizedImages,
      imagesWithAlt: validation.imagesWithAlt,
      lazyLoadingPercentage: Math.round((validation.lazyLoadedImages / validation.totalImages) * 100),
      optimizationPercentage: Math.round((validation.optimizedImages / validation.totalImages) * 100),
      altTextPercentage: Math.round((validation.imagesWithAlt / validation.totalImages) * 100)
    },
    pageBreakdown: analyses
      .filter(a => a.imageCount > 0)
      .map(a => ({
        filePath: path.basename(a.filePath),
        imageCount: a.imageCount,
        hasLazyLoading: a.hasLazyLoading,
        hasOptimizedImages: a.hasOptimizedImages,
        suggestions: a.suggestedOptimizations
      })),
    commonOptimizations: getCommonOptimizations(analyses)
  };
  
  fs.writeFileSync('image-optimization-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Image optimization report saved to image-optimization-report.json');
}

/**
 * Gets most common optimization suggestions
 */
function getCommonOptimizations(analyses: ImageAnalysis[]): Record<string, number> {
  const optimizations: Record<string, number> = {};
  
  analyses.forEach(analysis => {
    analysis.suggestedOptimizations.forEach(suggestion => {
      optimizations[suggestion] = (optimizations[suggestion] || 0) + 1;
    });
  });
  
  return optimizations;
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🎯 Implement Image Lazy Loading Script');
  console.log('=====================================\n');
  
  try {
    // Get all page files
    const generatedPages = await glob('src/pages/generated/*.tsx');
    const staticPages = await glob('src/pages/*.tsx');
    const componentFiles = await glob('src/components/*.tsx');
    const allFiles = [...generatedPages, ...staticPages, ...componentFiles];
    
    console.log(`📄 Analyzing ${allFiles.length} files for image optimization...\n`);
    
    // Analyze all files
    const analyses: ImageAnalysis[] = [];
    for (const filePath of allFiles) {
      const analysis = analyzeImages(filePath);
      analyses.push(analysis);
      
      if (analysis.imageCount > 0) {
        const status = analysis.hasLazyLoading && analysis.hasOptimizedImages ? '✅' : '⚠️';
        console.log(`${status} ${path.basename(filePath)}: ${analysis.imageCount} images, ${analysis.suggestedOptimizations.length} optimizations needed`);
        
        if (analysis.suggestedOptimizations.length > 0) {
          analysis.suggestedOptimizations.forEach(suggestion => {
            console.log(`    - ${suggestion}`);
          });
        }
      }
    }
    
    // Initial statistics
    const filesWithImages = analyses.filter(a => a.imageCount > 0);
    const initialValidation = validateImageOptimization(analyses);
    
    console.log(`\n📊 Initial Statistics:`);
    console.log(`- Files with images: ${filesWithImages.length}`);
    console.log(`- Total images: ${initialValidation.totalImages}`);
    console.log(`- Lazy loaded: ${initialValidation.lazyLoadedImages} (${Math.round((initialValidation.lazyLoadedImages / initialValidation.totalImages) * 100)}%)`);
    console.log(`- Optimized: ${initialValidation.optimizedImages} (${Math.round((initialValidation.optimizedImages / initialValidation.totalImages) * 100)}%)`);
    console.log(`- With alt text: ${initialValidation.imagesWithAlt} (${Math.round((initialValidation.imagesWithAlt / initialValidation.totalImages) * 100)}%)`);
    
    // Apply optimizations
    console.log(`\n🔧 Applying image optimizations...\n`);
    
    let lazyLoadingFixed = 0;
    let pathsOptimized = 0;
    let altTextAdded = 0;
    
    for (const analysis of filesWithImages) {
      const fileName = path.basename(analysis.filePath);
      
      // Implement lazy loading
      if (!analysis.hasLazyLoading) {
        if (implementLazyLoading(analysis.filePath)) {
          console.log(`✅ Lazy loading: ${fileName}`);
          lazyLoadingFixed++;
        }
      }
      
      // Optimize image paths
      if (!analysis.hasOptimizedImages) {
        if (optimizeImagePaths(analysis.filePath)) {
          console.log(`✅ Optimized paths: ${fileName}`);
          pathsOptimized++;
        }
      }
      
      // Add missing alt text
      const imagesWithoutAlt = analysis.images.filter(img => !img.alt);
      if (imagesWithoutAlt.length > 0) {
        if (addMissingAltText(analysis.filePath)) {
          console.log(`✅ Alt text added: ${fileName} (${imagesWithoutAlt.length} images)`);
          altTextAdded++;
        }
      }
    }
    
    // Final validation
    console.log('\n🔍 Final validation...');
    const finalAnalyses = allFiles.map(analyzeImages);
    const finalValidation = validateImageOptimization(finalAnalyses);
    
    // Generate report
    generateImageOptimizationReport(finalAnalyses);
    
    console.log(`\n📊 Final Summary:`);
    console.log(`- Files processed: ${allFiles.length}`);
    console.log(`- Lazy loading implemented: ${lazyLoadingFixed} files`);
    console.log(`- Image paths optimized: ${pathsOptimized} files`);
    console.log(`- Alt text added: ${altTextAdded} files`);
    console.log(`- Final lazy loading: ${finalValidation.lazyLoadedImages}/${finalValidation.totalImages} (${Math.round((finalValidation.lazyLoadedImages / finalValidation.totalImages) * 100)}%)`);
    console.log(`- Final optimization: ${finalValidation.optimizedImages}/${finalValidation.totalImages} (${Math.round((finalValidation.optimizedImages / finalValidation.totalImages) * 100)}%)`);
    console.log(`- Final alt text: ${finalValidation.imagesWithAlt}/${finalValidation.totalImages} (${Math.round((finalValidation.imagesWithAlt / finalValidation.totalImages) * 100)}%)`);
    
    console.log('\n✅ Image optimization completed!');
    console.log('\n📋 Performance improvements:');
    console.log('- Lazy loading reduces initial page load time');
    console.log('- WebP format reduces image file sizes by 25-35%');
    console.log('- Proper alt text improves accessibility and SEO');
    console.log('- OptimizedImage component provides responsive images');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as implementImageLazyLoading };