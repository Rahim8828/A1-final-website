#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { SitemapGenerator } from '../src/seo/managers/SitemapGenerator';
import { SEOPage } from '../src/seo/types';
import { blogPosts } from '../blog/data/blogPosts';
import { pagesData } from '../src/data/generatedPagesData';

interface PageConfig {
  url: string;
  priority: number;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}

// Define page configurations with proper SEO priorities and change frequencies
const pageConfigs: PageConfig[] = [
  // Homepage - Highest priority, changes daily
  {
    url: 'https://a1furniturepolish.com/',
    priority: 1.0,
    changeFreq: 'daily',
    lastModified: new Date('2024-12-13')
  },
  
  // Main pages - High priority, changes weekly
  {
    url: 'https://a1furniturepolish.com/about',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-10')
  },
  {
    url: 'https://a1furniturepolish.com/services',
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-12')
  },
  {
    url: 'https://a1furniturepolish.com/contact',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-05')
  },
  {
    url: 'https://a1furniturepolish.com/blog',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-12')
  },
  {
    url: 'https://a1furniturepolish.com/products',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-08')
  },

  // Main service pages - High priority
  {
    url: 'https://a1furniturepolish.com/services/wooden-furniture-polish',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/sofa-chair-polishing',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/services/table-and-bed-polishing',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/services/antique-restoration',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/services/commercial-polishing',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/sofa-fabric-change',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/office-chair-repair',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },

  // Location-specific pages - Medium-high priority
  {
    url: 'https://a1furniturepolish.com/goregaon-furniture-polish',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: 'https://a1furniturepolish.com/powai-furniture-polish',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  }
];

function generateBlogPageConfigs(): PageConfig[] {
  return blogPosts.map(post => {
    // Parse date from DD/MM/YYYY format
    let lastModified = new Date('2024-12-13'); // Default date
    if (post.date) {
      try {
        const [day, month, year] = post.date.split('/');
        lastModified = new Date(`${year}-${month}-${day}`);
        // If date is invalid, use default
        if (isNaN(lastModified.getTime())) {
          lastModified = new Date('2024-12-13');
        }
      } catch (error) {
        lastModified = new Date('2024-12-13');
      }
    }

    return {
      url: `https://a1furniturepolish.com/blog/${post.slug}`,
      priority: 0.6,
      changeFreq: 'monthly' as const,
      lastModified
    };
  });
}

function generateServicePageConfigs(): PageConfig[] {
  return pagesData.map(page => {
    // Determine priority based on service type and location
    let priority = 0.6; // Base priority for generated pages
    
    // Higher priority for main service types
    if (page.url.includes('furniture-polishing') || 
        page.url.includes('wood-polishing') ||
        page.url.includes('pu-polish')) {
      priority = 0.7;
    }
    
    // Higher priority for premium locations
    if (page.url.includes('bandra') || 
        page.url.includes('juhu') ||
        page.url.includes('andheri') ||
        page.url.includes('goregaon')) {
      priority = Math.min(priority + 0.1, 0.8);
    }

    // Ensure URL is absolute
    const absoluteUrl = page.url.startsWith('http') 
      ? page.url 
      : `https://a1furniturepolish.com${page.url}`;

    return {
      url: absoluteUrl,
      priority,
      changeFreq: 'monthly' as const,
      lastModified: new Date('2024-12-12') // When these pages were generated
    };
  });
}

function createSEOPage(config: PageConfig): SEOPage {
  // Extract page info from URL
  const urlPath = config.url.replace('https://a1furniturepolish.com', '');
  let title = 'A1 Furniture Polish';
  let metaDescription = 'Professional furniture polishing services in Mumbai';

  // Generate appropriate title and description based on URL
  if (urlPath === '/' || urlPath === '') {
    title = 'A1 Furniture Polish - Professional Furniture Polishing Services in Mumbai';
    metaDescription = 'Expert furniture polishing, restoration & repair services in Mumbai. Transform your wooden furniture with our professional polishing solutions. Book now!';
  } else if (urlPath === '/about') {
    title = 'About A1 Furniture Polish - Mumbai\'s Trusted Furniture Experts';
    metaDescription = 'Learn about A1 Furniture Polish, Mumbai\'s leading furniture polishing service with years of experience in wooden furniture restoration and repair.';
  } else if (urlPath === '/services') {
    title = 'Furniture Polishing Services in Mumbai - A1 Furniture Polish';
    metaDescription = 'Complete range of furniture polishing services in Mumbai including wooden furniture polish, sofa repair, antique restoration & more. Professional results guaranteed.';
  } else if (urlPath === '/contact') {
    title = 'Contact A1 Furniture Polish - Book Your Service Today';
    metaDescription = 'Contact A1 Furniture Polish for professional furniture polishing services in Mumbai. Call now for free quotes and same-day service booking.';
  } else if (urlPath === '/blog') {
    title = 'Furniture Care Blog - Tips & Guides by A1 Furniture Polish';
    metaDescription = 'Expert furniture care tips, polishing guides, and maintenance advice from Mumbai\'s leading furniture polishing professionals at A1 Furniture Polish.';
  } else if (urlPath.startsWith('/blog/')) {
    // Find the blog post for more accurate title/description
    const slug = urlPath.replace('/blog/', '');
    const post = blogPosts.find(p => p.slug === slug);
    if (post) {
      title = post.title;
      metaDescription = post.description.substring(0, 160) + '...'; // Use description and truncate for meta
    }
  } else {
    // For service pages, generate title from URL
    const pageName = urlPath.split('/').pop() || '';
    title = pageName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') + ' - A1 Furniture Polish';
    metaDescription = `Professional ${pageName.replace(/-/g, ' ')} services in Mumbai. Expert furniture polishing and restoration by A1 Furniture Polish.`;
  }

  return {
    url: config.url,
    title,
    metaDescription,
    lastModified: config.lastModified || new Date(),
    priority: config.priority,
    changeFreq: config.changeFreq
  };
}

async function generateOptimizedSitemap() {
  console.log('🚀 Generating optimized sitemap with proper SEO settings...\n');

  try {
    // Combine all page configurations
    const blogConfigs = generateBlogPageConfigs();
    const serviceConfigs = generateServicePageConfigs();
    const allConfigs = [...pageConfigs, ...blogConfigs, ...serviceConfigs];

    console.log(`📊 Total pages to include: ${allConfigs.length}`);
    console.log(`   - Static pages: ${pageConfigs.length}`);
    console.log(`   - Blog posts: ${blogConfigs.length}`);
    console.log(`   - Generated service pages: ${serviceConfigs.length}\n`);

    // Convert to SEO pages
    const seoPages = allConfigs.map(createSEOPage);

    // Initialize sitemap generator with optimized config
    const sitemapGenerator = new SitemapGenerator({
      includeLastModified: true,
      defaultPriority: 0.6, // This won't be used since we set individual priorities
      defaultChangeFreq: 'monthly', // This won't be used since we set individual frequencies
      structuredDataEnabled: true
    });

    // Generate the optimized sitemap
    const optimizedSitemap = sitemapGenerator.generateXMLSitemap(seoPages);

    // Ensure dist directory exists
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write the optimized sitemap
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, optimizedSitemap, 'utf-8');

    console.log('✅ Optimized sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}\n`);

    // Generate statistics
    const stats = sitemapGenerator.getSitemapStats();
    console.log('📈 Sitemap Statistics:');
    console.log(`   - Total URLs: ${stats.totalPages}`);
    console.log(`   - Last updated: ${stats.lastUpdated?.toISOString()}\n`);

    // Analyze priority distribution
    const priorityDistribution = seoPages.reduce((acc, page) => {
      const priority = page.priority?.toString() || '0.6';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('🎯 Priority Distribution:');
    Object.entries(priorityDistribution)
      .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
      .forEach(([priority, count]) => {
        console.log(`   - Priority ${priority}: ${count} pages`);
      });

    // Analyze change frequency distribution
    const changeFreqDistribution = seoPages.reduce((acc, page) => {
      const freq = page.changeFreq || 'monthly';
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n⏰ Change Frequency Distribution:');
    Object.entries(changeFreqDistribution).forEach(([freq, count]) => {
      console.log(`   - ${freq}: ${count} pages`);
    });

    // Validate the generated sitemap
    const isValid = sitemapGenerator.validateSitemap(optimizedSitemap);
    console.log(`\n✅ Sitemap validation: ${isValid ? 'PASSED' : 'FAILED'}`);

    if (!isValid) {
      console.error('❌ Generated sitemap failed validation!');
      process.exit(1);
    }

    // Generate robots.txt as well
    const robotsTxt = sitemapGenerator.generateRobotsTxt(
      'https://a1furniturepolish.com/sitemap.xml'
    );

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');

    console.log(`🤖 Robots.txt generated: ${robotsPath}`);
    console.log('\n🎉 SEO optimization complete!');

  } catch (error) {
    console.error('❌ Error generating optimized sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateOptimizedSitemap();
}

export { generateOptimizedSitemap };