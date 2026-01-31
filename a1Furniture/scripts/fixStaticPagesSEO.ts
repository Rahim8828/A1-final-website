#!/usr/bin/env tsx

/**
 * Fix Static Pages SEO Issues Script
 * Specifically fixes the remaining static pages with malformed syntax and missing SEO elements
 */

import fs from 'fs';
import path from 'path';

interface PageFix {
  filePath: string;
  title: string;
  metaDescription: string;
  h1: string;
}

const pagesToFix: PageFix[] = [
  {
    filePath: 'src/pages/AntiqueRestoration.tsx',
    title: 'Antique Furniture Restoration in Mumbai | A1 Furniture Polish',
    metaDescription: 'Expert antique furniture restoration in Mumbai. We preserve the value and beauty of your heirlooms with traditional techniques. Serving South Mumbai, Bandra, Juhu.',
    h1: 'Antique Furniture Restoration in Mumbai'
  },
  {
    filePath: 'src/pages/WoodenFurniturePolish.tsx',
    title: 'Wooden Furniture Polish in Mumbai | A1 Furniture Polish',
    metaDescription: 'Expert wooden furniture polishing in Mumbai. We restore sofas, chairs, tables, beds, and more. Get a free quote for services in Bandra, Andheri, Juhu, and South Mumbai.',
    h1: 'Wooden Furniture Polish in Mumbai'
  },
  {
    filePath: 'src/pages/TableAndBedPolishing.tsx',
    title: 'Table & Bed Polishing in Mumbai | A1 Furniture Polish',
    metaDescription: 'Professional table and bed polishing in Mumbai. We restore dining tables, coffee tables, and wooden beds in Jogeshwari, Andheri & Goregaon. Contact us!',
    h1: 'Table & Bed Polishing Services in Mumbai'
  },
  {
    filePath: 'src/pages/PowaiFurniturePolish.tsx',
    title: 'Furniture Polish in Powai | Best Furniture Polishing Services Near Me | A1 Furniture Polish',
    metaDescription: 'Professional furniture polishing services in Powai, Chandivali & Hiranandani Gardens. Expert wooden furniture polish, sofa restoration, table polishing, bed polishing, scratch repair, antique restoration. 24/7 service available. Call +91 9702209513',
    h1: 'Professional Furniture Polish Services in Powai'
  },
  {
    filePath: 'src/pages/GoregaonFurniturePolish.tsx',
    title: 'Furniture Polish in Goregaon | Best Furniture Polishing Services Near Me | A1 Furniture Polish',
    metaDescription: 'Professional furniture polishing services in Goregaon East & West. Expert wooden furniture polish, sofa restoration, table polishing, bed polishing, scratch repair, antique restoration. 24/7 service available. Call +91 8828709945',
    h1: 'Professional Furniture Polish Services in Goregaon'
  },
  {
    filePath: 'src/pages/CommercialPolishing.tsx',
    title: 'Commercial Furniture Polishing in Mumbai | A1 Furniture Polish',
    metaDescription: 'Professional commercial furniture polishing in Mumbai. We service offices, hotels, & restaurants in BKC, Andheri, Lower Parel. Flexible hours, durable finishes.',
    h1: 'Commercial Furniture Polishing in Mumbai'
  }
];

/**
 * Fixes malformed syntax at the end of React component files
 */
function fixMalformedSyntax(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove the malformed object definitions at the end
    // Look for the pattern: };\n\nexport default ComponentName;\n\n,\n  "openGraphTags": {
    const malformedPattern = /};\s*export\s+default\s+\w+;\s*,\s*"openGraphTags"[\s\S]*$/;
    
    if (malformedPattern.test(content)) {
      // Find the correct end point (after export default)
      const exportMatch = content.match(/(};\s*export\s+default\s+\w+;)/);
      if (exportMatch) {
        const correctEndIndex = content.indexOf(exportMatch[1]) + exportMatch[1].length;
        content = content.substring(0, correctEndIndex);
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Fixed malformed syntax: ${path.basename(filePath)}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing syntax in ${filePath}:`, error);
    return false;
  }
}

/**
 * Adds SEO Head component with proper meta tags if missing
 */
function addSEOHead(filePath: string, pageInfo: PageFix): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if SEOHead is already properly configured
    const hasSEOHead = content.includes('<SEOHead') && 
                      content.includes('title=') && 
                      content.includes('description=');
    
    if (hasSEOHead) {
      console.log(`✅ SEO Head already present: ${path.basename(filePath)}`);
      return true;
    }
    
    // Add SEOHead import if missing
    if (!content.includes("import SEOHead from '../../src/components/SEOHead'")) {
      content = content.replace(
        /import React from 'react';/,
        "import React from 'react';\nimport SEOHead from '../../src/components/SEOHead';"
      );
    }
    
    // Find the return statement and add SEOHead
    const returnMatch = content.match(/return\s*\(\s*<>/);
    if (returnMatch) {
      const seoHeadComponent = `      <SEOHead
        title="${pageInfo.title}"
        description="${pageInfo.metaDescription}"
        canonical={getCanonicalURL('${getUrlFromFilePath(filePath)}')}
      />`;
      
      content = content.replace(
        /return\s*\(\s*<>/,
        `return (
    <>
${seoHeadComponent}`
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Added SEO Head: ${path.basename(filePath)}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error adding SEO Head to ${filePath}:`, error);
    return false;
  }
}

/**
 * Ensures H1 tag is present in the component
 */
function ensureH1Tag(filePath: string, h1Text: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if H1 is already present
    const hasH1 = content.includes('<h1') || content.includes('text-4xl md:text-5xl font-extrabold');
    
    if (hasH1) {
      console.log(`✅ H1 tag already present: ${path.basename(filePath)}`);
      return true;
    }
    
    // Find the first heading and ensure it's an H1
    const headingMatch = content.match(/<h[2-6][^>]*>([^<]+)<\/h[2-6]>/);
    if (headingMatch) {
      const newH1 = `<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            ${h1Text}
          </h1>`;
      
      content = content.replace(headingMatch[0], newH1);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Updated heading to H1: ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error ensuring H1 in ${filePath}:`, error);
    return false;
  }
}

/**
 * Extracts URL path from file path
 */
function getUrlFromFilePath(filePath: string): string {
  const fileName = path.basename(filePath, '.tsx');
  
  // Convert PascalCase to kebab-case
  const kebabCase = fileName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  
  return `/${kebabCase}`;
}

/**
 * Main execution function
 */
async function main(): void {
  console.log('🎯 Fix Static Pages SEO Issues Script');
  console.log('====================================\n');
  
  let fixedCount = 0;
  
  for (const pageInfo of pagesToFix) {
    console.log(`\n🔧 Fixing: ${path.basename(pageInfo.filePath)}`);
    
    try {
      // Step 1: Fix malformed syntax
      fixMalformedSyntax(pageInfo.filePath);
      
      // Step 2: Add SEO Head component
      addSEOHead(pageInfo.filePath, pageInfo);
      
      // Step 3: Ensure H1 tag is present
      ensureH1Tag(pageInfo.filePath, pageInfo.h1);
      
      fixedCount++;
      
    } catch (error) {
      console.error(`❌ Failed to fix ${pageInfo.filePath}:`, error);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`- Pages processed: ${pagesToFix.length}`);
  console.log(`- Pages fixed: ${fixedCount}`);
  
  console.log('\n✅ Static pages SEO fixing completed!');
  console.log('\n📋 What was fixed:');
  console.log('- Removed malformed syntax at end of files');
  console.log('- Added proper SEO Head components');
  console.log('- Ensured H1 tags are present');
  console.log('- Fixed meta descriptions and titles');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixStaticPagesSEO };