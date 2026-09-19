#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { SitemapGenerator } from '../src/seo/managers/SitemapGenerator';
import { SEOPage } from '../src/seo/types';
import { blogPosts } from '../blog/data/blogPosts';
import { pagesData } from '../src/data/generatedPagesData';
import { allSeoGapPages } from '../src/data/seoGapPagesData';

const SITE_URL = 'https://a1furniturepolish.com';
const MAX_URLS_PER_SITEMAP = 200;

interface PageConfig {
  url: string;
  priority: number;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}

const pageConfigs: PageConfig[] = [
  {
    url: `${SITE_URL}/`,
    priority: 1.0,
    changeFreq: 'daily',
    lastModified: new Date('2024-12-13')
  },
  {
    url: `${SITE_URL}/about`,
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-10')
  },
  {
    url: `${SITE_URL}/services`,
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-12')
  },
  {
    url: `${SITE_URL}/contact`,
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-05')
  },
  {
    url: `${SITE_URL}/blog`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-12')
  },
  {
    url: `${SITE_URL}/products`,
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-08')
  },
  {
    url: `${SITE_URL}/services/wooden-furniture-polish`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/sofa-chair-polishing`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/services/table-and-bed-polishing`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/services/antique-restoration`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/services/commercial-polishing`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/sofa-fabric-change`,
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/office-chair-repair`,
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/goregaon-furniture-polish`,
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  },
  {
    url: `${SITE_URL}/powai-furniture-polish`,
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date('2024-12-11')
  }
];

function toAbsoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

function dedupePageConfigs(configs: PageConfig[]): PageConfig[] {
  const unique = new Map<string, PageConfig>();

  for (const config of configs) {
    if (!unique.has(config.url)) {
      unique.set(config.url, config);
    }
  }

  return [...unique.values()];
}

function chunkItems<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

function extractRoutePathsFromFile(relativeFilePath: string): string[] {
  const absoluteFilePath = path.join(process.cwd(), relativeFilePath);
  const content = fs.readFileSync(absoluteFilePath, 'utf-8');
  return [...content.matchAll(/<Route\s+path="([^"]+)"/g)].map(match => match[1]);
}

function createRouteConfigs(
  relativeFilePath: string,
  priority: number,
  changeFreq: PageConfig['changeFreq'],
  lastModified: Date
): PageConfig[] {
  return extractRoutePathsFromFile(relativeFilePath).map(routePath => ({
    url: toAbsoluteUrl(routePath),
    priority,
    changeFreq,
    lastModified
  }));
}

function generateBlogPageConfigs(): PageConfig[] {
  return blogPosts.map(post => {
    let lastModified = new Date('2024-12-13');

    if (post.date) {
      try {
        const [day, month, year] = post.date.split('/');
        lastModified = new Date(`${year}-${month}-${day}`);
        if (isNaN(lastModified.getTime())) {
          lastModified = new Date('2024-12-13');
        }
      } catch {
        lastModified = new Date('2024-12-13');
      }
    }

    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      priority: 0.6,
      changeFreq: 'monthly',
      lastModified
    };
  });
}

function generateServicePageConfigs(): PageConfig[] {
  return pagesData.map(page => {
    let priority = 0.6;

    if (
      page.url.includes('furniture-polishing') ||
      page.url.includes('wood-polishing') ||
      page.url.includes('pu-polish')
    ) {
      priority = 0.7;
    }

    if (
      page.url.includes('bandra') ||
      page.url.includes('juhu') ||
      page.url.includes('andheri') ||
      page.url.includes('goregaon')
    ) {
      priority = Math.min(priority + 0.1, 0.8);
    }

    return {
      url: toAbsoluteUrl(page.url),
      priority,
      changeFreq: 'monthly',
      lastModified: new Date('2024-12-12')
    };
  });
}

function generateSeoGapPageConfigs(): PageConfig[] {
  return allSeoGapPages.map(page => ({
    url: toAbsoluteUrl(page.path),
    priority: 0.65,
    changeFreq: 'monthly',
    lastModified: new Date('2024-12-12')
  }));
}

function createSEOPage(config: PageConfig): SEOPage {
  const urlPath = config.url.replace(SITE_URL, '');
  let title = 'A1 Furniture Polish';
  let metaDescription = 'Professional furniture polishing services in Mumbai';

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
    const slug = urlPath.replace('/blog/', '');
    const post = blogPosts.find(entry => entry.slug === slug);
    if (post) {
      title = post.title;
      metaDescription = `${post.description.substring(0, 160)}...`;
    }
  } else {
    const pageName = urlPath.split('/').pop() || '';
    title = `${pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')} - A1 Furniture Polish`;
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

function generateSitemapIndexXml(fileNames: string[], lastModified: Date): string {
  const lastmod = lastModified.toISOString();
  const entries = fileNames
    .map(fileName => `  <sitemap>
    <loc>${SITE_URL}/${fileName}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
}

async function generateOptimizedSitemap() {
  console.log('🚀 Generating optimized sitemap with proper SEO settings...\n');

  try {
    const blogConfigs = generateBlogPageConfigs();
    const serviceConfigs = generateServicePageConfigs();
    const seoGapConfigs = generateSeoGapPageConfigs();
    const sofaRepairConfigs = createRouteConfigs(
      'src/routes/sofaRepairRoutes.tsx',
      0.65,
      'monthly',
      new Date('2024-12-12')
    );
    const bedRepairConfigs = createRouteConfigs(
      'src/routes/bedRepairRoutes.tsx',
      0.65,
      'monthly',
      new Date('2024-12-12')
    );

    const allConfigs = dedupePageConfigs([
      ...pageConfigs,
      ...blogConfigs,
      ...serviceConfigs,
      ...seoGapConfigs,
      ...sofaRepairConfigs,
      ...bedRepairConfigs,
    ]);

    console.log(`📊 Total pages to include: ${allConfigs.length}`);
    console.log(`   - Static pages: ${pageConfigs.length}`);
    console.log(`   - Blog posts: ${blogConfigs.length}`);
    console.log(`   - Generated service pages: ${serviceConfigs.length}`);
    console.log(`   - SEO gap pages: ${seoGapConfigs.length}`);
    console.log(`   - Sofa repair pages: ${sofaRepairConfigs.length}`);
    console.log(`   - Bed repair pages: ${bedRepairConfigs.length}\n`);

    const seoPages = allConfigs.map(createSEOPage);

    const sitemapGenerator = new SitemapGenerator({
      includeLastModified: true,
      defaultPriority: 0.6,
      defaultChangeFreq: 'monthly',
      structuredDataEnabled: true
    });

    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    const chunks = chunkItems(seoPages, MAX_URLS_PER_SITEMAP);
    const fileNames: string[] = [];

    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      const fileName = `sitemap-${index + 1}.xml`;
      const sitemapXml = sitemapGenerator.generateXMLSitemap(chunk);

      if (!sitemapGenerator.validateSitemap(sitemapXml)) {
        throw new Error(`Generated sitemap chunk ${fileName} failed validation`);
      }

      fs.writeFileSync(path.join(distDir, fileName), sitemapXml, 'utf-8');
      fileNames.push(fileName);
    }

    const sitemapIndexXml = generateSitemapIndexXml(fileNames, new Date());
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapIndexXml, 'utf-8');

    console.log('✅ Optimized sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`🗂️  Generated ${fileNames.length} sitemap files with up to ${MAX_URLS_PER_SITEMAP} URLs each\n`);
    fileNames.forEach((fileName, index) => {
      console.log(`   - ${fileName}: ${chunks[index].length} URLs`);
    });

    const stats = sitemapGenerator.getSitemapStats();
    console.log('\n📈 Sitemap Statistics:');
    console.log(`   - Total URLs: ${seoPages.length}`);
    console.log(`   - Last updated: ${stats.lastUpdated?.toISOString()}\n`);

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

    const changeFreqDistribution = seoPages.reduce((acc, page) => {
      const freq = page.changeFreq || 'monthly';
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n⏰ Change Frequency Distribution:');
    Object.entries(changeFreqDistribution).forEach(([freq, count]) => {
      console.log(`   - ${freq}: ${count} pages`);
    });

    console.log('\n✅ Sitemap validation: PASSED');

    const robotsTxt = sitemapGenerator.generateRobotsTxt(`${SITE_URL}/sitemap.xml`);
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

generateOptimizedSitemap().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export { generateOptimizedSitemap };
