#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

interface SitemapValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalUrls: number;
    uniqueUrls: number;
    dateRange: { earliest: string; latest: string };
    priorities: Record<string, number>;
    changeFreqs: Record<string, number>;
  };
}

function validateSitemap(sitemapPath: string): SitemapValidationResult {
  const result: SitemapValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalUrls: 0,
      uniqueUrls: 0,
      dateRange: { earliest: '', latest: '' },
      priorities: {},
      changeFreqs: {}
    }
  };

  try {
    // Check if file exists
    if (!fs.existsSync(sitemapPath)) {
      result.errors.push('Sitemap file does not exist');
      result.isValid = false;
      return result;
    }

    const content = fs.readFileSync(sitemapPath, 'utf-8');

    // Basic XML structure validation
    if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      result.errors.push('Missing XML declaration');
      result.isValid = false;
    }

    if (!content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      result.errors.push('Missing or incorrect urlset declaration');
      result.isValid = false;
    }

    // Extract URLs
    const urlMatches = content.match(/<url>[\s\S]*?<\/url>/g) || [];
    result.stats.totalUrls = urlMatches.length;

    const urls = new Set<string>();
    const dates: string[] = [];
    
    urlMatches.forEach((urlBlock, index) => {
      // Extract loc
      const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
      if (!locMatch) {
        result.errors.push(`URL block ${index + 1}: Missing <loc> tag`);
        result.isValid = false;
        return;
      }

      const url = locMatch[1];
      
      // Check for duplicate URLs
      if (urls.has(url)) {
        result.errors.push(`Duplicate URL found: ${url}`);
        result.isValid = false;
      }
      urls.add(url);

      // Validate URL format
      try {
        new URL(url);
      } catch (error) {
        result.errors.push(`Invalid URL format: ${url}`);
        result.isValid = false;
      }

      // Check HTTPS
      if (!url.startsWith('https://')) {
        result.warnings.push(`Non-HTTPS URL: ${url}`);
      }

      // Extract and validate lastmod
      const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
      if (lastmodMatch) {
        const dateStr = lastmodMatch[1];
        const date = new Date(dateStr);
        
        if (isNaN(date.getTime())) {
          result.errors.push(`Invalid date format in ${url}: ${dateStr}`);
          result.isValid = false;
        } else {
          dates.push(dateStr);
          
          // Check for future dates
          if (date > new Date()) {
            result.errors.push(`Future date found in ${url}: ${dateStr}`);
            result.isValid = false;
          }
        }
      }

      // Extract and validate priority
      const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);
      if (priorityMatch) {
        const priority = parseFloat(priorityMatch[1]);
        if (isNaN(priority) || priority < 0 || priority > 1) {
          result.errors.push(`Invalid priority in ${url}: ${priorityMatch[1]}`);
          result.isValid = false;
        } else {
          const priorityKey = priority.toString();
          result.stats.priorities[priorityKey] = (result.stats.priorities[priorityKey] || 0) + 1;
        }
      }

      // Extract changefreq
      const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
      if (changefreqMatch) {
        const changefreq = changefreqMatch[1];
        const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        if (!validFreqs.includes(changefreq)) {
          result.errors.push(`Invalid changefreq in ${url}: ${changefreq}`);
          result.isValid = false;
        } else {
          result.stats.changeFreqs[changefreq] = (result.stats.changeFreqs[changefreq] || 0) + 1;
        }
      }
    });

    result.stats.uniqueUrls = urls.size;

    // Calculate date range
    if (dates.length > 0) {
      dates.sort();
      result.stats.dateRange.earliest = dates[0];
      result.stats.dateRange.latest = dates[dates.length - 1];
    }

    // Additional validations
    if (result.stats.totalUrls === 0) {
      result.warnings.push('Sitemap contains no URLs');
    }

    if (result.stats.totalUrls > 50000) {
      result.warnings.push('Sitemap contains more than 50,000 URLs (consider splitting)');
    }

    // Check file size
    const fileSizeKB = fs.statSync(sitemapPath).size / 1024;
    if (fileSizeKB > 10240) { // 10MB
      result.warnings.push(`Sitemap file is large (${Math.round(fileSizeKB)}KB). Consider compressing or splitting.`);
    }

  } catch (error) {
    result.errors.push(`Error reading sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`);
    result.isValid = false;
  }

  return result;
}

function printValidationReport(result: SitemapValidationResult) {
  console.log('🗺️  Sitemap Validation Report');
  console.log('============================\n');

  // Overall status
  if (result.isValid) {
    console.log('✅ Sitemap is VALID\n');
  } else {
    console.log('❌ Sitemap has ERRORS\n');
  }

  // Errors
  if (result.errors.length > 0) {
    console.log('🚨 ERRORS:');
    result.errors.forEach(error => console.log(`   - ${error}`));
    console.log('');
  }

  // Warnings
  if (result.warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    result.warnings.forEach(warning => console.log(`   - ${warning}`));
    console.log('');
  }

  // Statistics
  console.log('📊 STATISTICS:');
  console.log(`   - Total URLs: ${result.stats.totalUrls}`);
  console.log(`   - Unique URLs: ${result.stats.uniqueUrls}`);
  
  if (result.stats.dateRange.earliest && result.stats.dateRange.latest) {
    console.log(`   - Date Range: ${result.stats.dateRange.earliest} to ${result.stats.dateRange.latest}`);
  }

  if (Object.keys(result.stats.priorities).length > 0) {
    console.log('   - Priority Distribution:');
    Object.entries(result.stats.priorities)
      .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
      .forEach(([priority, count]) => {
        console.log(`     * ${priority}: ${count} pages`);
      });
  }

  if (Object.keys(result.stats.changeFreqs).length > 0) {
    console.log('   - Change Frequency Distribution:');
    Object.entries(result.stats.changeFreqs).forEach(([freq, count]) => {
      console.log(`     * ${freq}: ${count} pages`);
    });
  }

  console.log('');

  // Recommendations
  console.log('💡 RECOMMENDATIONS:');
  
  if (result.stats.totalUrls > 0) {
    const homepageCount = Object.entries(result.stats.priorities).find(([p]) => p === '1')?.[1] || 0;
    if (homepageCount === 0) {
      console.log('   - Consider setting homepage priority to 1.0');
    } else if (homepageCount > 1) {
      console.log('   - Multiple pages have priority 1.0 - consider using this only for homepage');
    }

    const dailyCount = result.stats.changeFreqs.daily || 0;
    if (dailyCount > 5) {
      console.log('   - Many pages set to daily updates - consider if this is realistic');
    }
  }

  if (result.isValid) {
    console.log('   - Sitemap is ready for submission to search engines');
    console.log('   - Submit to Google Search Console and Bing Webmaster Tools');
  } else {
    console.log('   - Fix errors before submitting to search engines');
  }
}

async function main() {
  const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
  
  console.log(`Validating sitemap: ${sitemapPath}\n`);
  
  const result = validateSitemap(sitemapPath);
  printValidationReport(result);
  
  // Exit with error code if validation failed
  if (!result.isValid) {
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateSitemap, printValidationReport };