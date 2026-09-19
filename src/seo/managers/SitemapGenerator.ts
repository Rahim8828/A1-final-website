// Sitemap Generator Implementation

import { ISitemapGenerator } from '../interfaces';
import {
  SEOPage,
  SitemapGeneratorConfig,
  SitemapEntry,
  BulkUpdateResult,
  SchemaMarkup
} from '../types';
import { defaultSitemapGeneratorConfig } from '../config';

export class SitemapGenerator implements ISitemapGenerator {
  public config: SitemapGeneratorConfig;
  private sitemapEntries: Map<string, SitemapEntry> = new Map();
  private baseUrl: string;

  constructor(config?: Partial<SitemapGeneratorConfig>, baseUrl: string = 'https://a1furniturepolish.com') {
    this.config = { ...defaultSitemapGeneratorConfig, ...config };
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  // Generate XML sitemap from pages
  generateXMLSitemap(pages: SEOPage[]): string {
    const entries = pages.map(page => this.createSitemapEntry(page));
    
    // Update internal sitemap entries
    entries.forEach(entry => {
      this.sitemapEntries.set(entry.url, entry);
    });

    return this.buildXMLSitemap(entries);
  }

  // Update sitemap timestamps for modified pages
  updateSitemapTimestamps(pages: SEOPage[]): void {
    pages.forEach(page => {
      const entry = this.sitemapEntries.get(page.url);
      if (entry) {
        entry.lastModified = page.lastModified;
        this.sitemapEntries.set(page.url, entry);
      }
    });
  }

  // Add new pages to sitemap
  addNewPagesToSitemap(newPages: SEOPage[]): void {
    newPages.forEach(page => {
      const entry = this.createSitemapEntry(page);
      this.sitemapEntries.set(page.url, entry);
    });
  }

  // Generate robots.txt content
  generateRobotsTxt(sitemapUrl: string, disallowedPaths?: string[]): string {
    let robotsTxt = 'User-agent: *\n';
    
    if (disallowedPaths && disallowedPaths.length > 0) {
      disallowedPaths.forEach(path => {
        robotsTxt += `Disallow: ${path}\n`;
      });
    } else {
      robotsTxt += 'Allow: /\n';
    }
    
    robotsTxt += '\n# Sitemap\n';
    robotsTxt += `Sitemap: ${sitemapUrl}\n`;
    
    // Add common allowed paths (only if not explicitly disallowing everything)
    if (!disallowedPaths || disallowedPaths.length === 0) {
      robotsTxt += '\n# Favicon\n';
      robotsTxt += 'Allow: /favicon.ico\n';
      robotsTxt += 'Allow: /favicon-*.png\n';
      robotsTxt += 'Allow: /apple-touch-icon.png\n';
      robotsTxt += 'Allow: /android-chrome-*.png\n';
    }
    
    return robotsTxt;
  }

  // Generate structured data for local business
  generateStructuredData(page: SEOPage): Record<string, any> {
    if (!this.config.structuredDataEnabled) {
      return {};
    }

    const baseStructuredData: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'A1 Furniture Polish',
      description: page.metaDescription || 'Professional furniture polishing services in Mumbai',
      url: page.url,
      telephone: '+91-9819999999',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mumbai',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.0760,
        longitude: 72.8777
      },
      openingHours: 'Mo-Su 09:00-18:00',
      priceRange: '₹₹',
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 19.0760,
          longitude: 72.8777
        },
        geoRadius: '50000' // 50km radius
      }
    };

    // Add service-specific structured data
    if (this.isServicePage(page)) {
      return this.generateServiceStructuredData(page, baseStructuredData);
    }

    // Add webpage structured data
    const webPageData: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.metaDescription,
      url: page.url,
      mainEntity: baseStructuredData
    };

    return webPageData;
  }

  // Validate structured data
  validateStructuredData(structuredData: Record<string, any>): boolean {
    if (!structuredData || typeof structuredData !== 'object') {
      return false;
    }

    // Check required fields
    const requiredFields = ['@context', '@type'];
    return requiredFields.every(field => field in structuredData);
  }

  // Validate sitemap XML
  validateSitemap(sitemapXml: string): boolean {
    try {
      // Basic XML validation
      if (!sitemapXml.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
        return false;
      }

      // Check for urlset with sitemap namespace (more flexible matching)
      if (!sitemapXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
        return false;
      }

      if (!sitemapXml.includes('</urlset>')) {
        return false;
      }

      // Check for valid URL entries (allow empty sitemaps)
      const urlMatches = sitemapXml.match(/<url>/g);
      const urlEndMatches = sitemapXml.match(/<\/url>/g);
      
      // If there are URL entries, they must be properly closed
      if (urlMatches || urlEndMatches) {
        if (!urlMatches || !urlEndMatches || urlMatches.length !== urlEndMatches.length) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // Process bulk sitemap updates
  async processSitemapUpdates(pages: SEOPage[]): Promise<BulkUpdateResult> {
    const operationId = `sitemap_update_${Date.now()}`;
    const successfulPages: string[] = [];
    const failedPages: string[] = [];
    const errors: Record<string, string> = {};

    try {
      // Update sitemap entries for all pages
      pages.forEach(page => {
        try {
          const entry = this.createSitemapEntry(page);
          this.sitemapEntries.set(page.url, entry);
          successfulPages.push(page.url);
        } catch (error) {
          failedPages.push(page.url);
          errors[page.url] = error instanceof Error ? error.message : 'Unknown error';
        }
      });

      return {
        operationId,
        successfulPages,
        failedPages,
        errors,
        rollbackAvailable: true
      };
    } catch (error) {
      // If bulk operation fails, mark all as failed
      pages.forEach(page => {
        failedPages.push(page.url);
        errors[page.url] = error instanceof Error ? error.message : 'Bulk operation failed';
      });

      return {
        operationId,
        successfulPages: [],
        failedPages,
        errors,
        rollbackAvailable: false
      };
    }
  }

  // Get current sitemap entries
  getSitemapEntries(): SitemapEntry[] {
    return Array.from(this.sitemapEntries.values());
  }

  // Remove pages from sitemap
  removePagesFromSitemap(urls: string[]): void {
    urls.forEach(url => {
      this.sitemapEntries.delete(url);
    });
  }

  // Get sitemap statistics
  getSitemapStats(): { totalPages: number; lastUpdated: Date | null } {
    const entries = Array.from(this.sitemapEntries.values());
    const lastUpdated = entries.length > 0 
      ? new Date(Math.max(...entries.map(e => e.lastModified.getTime())))
      : null;

    return {
      totalPages: entries.length,
      lastUpdated
    };
  }

  // Private helper methods

  private createSitemapEntry(page: SEOPage): SitemapEntry {
    // Use page-specific priority if provided, otherwise determine based on page type and URL
    let priority = page.priority ?? this.config.defaultPriority;
    
    if (!page.priority) {
      if (page.url === this.baseUrl || page.url === `${this.baseUrl}/`) {
        priority = 1.0; // Homepage gets highest priority
      } else if (page.url.includes('/services/')) {
        priority = 0.9; // Service pages get high priority
      } else if (page.url.includes('/blog/')) {
        priority = 0.7; // Blog pages get medium priority
      }
    }

    // Use page-specific change frequency if provided, otherwise determine based on page type
    let changeFreq = page.changeFreq ?? this.config.defaultChangeFreq;
    
    if (!page.changeFreq) {
      if (page.url.includes('/blog/')) {
        changeFreq = 'monthly'; // Blog posts change less frequently
      } else if (page.url.includes('/services/')) {
        changeFreq = 'weekly'; // Service pages change weekly
      } else if (page.url === this.baseUrl || page.url === `${this.baseUrl}/`) {
        changeFreq = 'daily'; // Homepage changes daily
      }
    }

    return {
      url: page.url,
      lastModified: page.lastModified,
      changeFreq,
      priority: Math.min(Math.max(priority, 0), 1) // Ensure priority is between 0 and 1
    };
  }

  private buildXMLSitemap(entries: SitemapEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
    xml += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';
    xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
    xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
    xml += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    // Sort entries by priority (highest first) and then by URL
    const sortedEntries = entries.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.url.localeCompare(b.url);
    });

    sortedEntries.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(entry.url)}</loc>\n`;
      
      if (this.config.includeLastModified) {
        xml += `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n`;
      }
      
      xml += `    <changefreq>${entry.changeFreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  private escapeXml(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private isServicePage(page: SEOPage): boolean {
    // Only consider explicit service pages, not homepage with furniture keywords
    return page.url.includes('/services/') || 
           (page.url !== this.baseUrl && 
            page.url !== `${this.baseUrl}/` && 
            (page.url.includes('polish') || 
             page.url.includes('restoration') ||
             page.url.includes('repair')));
  }

  private generateServiceStructuredData(page: SEOPage, baseData: SchemaMarkup): SchemaMarkup {
    const serviceData: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.metaDescription,
      provider: baseData,
      areaServed: {
        '@type': 'City',
        name: 'Mumbai',
        addressCountry: 'IN'
      },
      serviceType: this.extractServiceType(page.url),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceRange: '₹₹'
      }
    };

    return serviceData;
  }

  private extractServiceType(url: string): string {
    if (url.includes('furniture-polish')) return 'Furniture Polishing';
    if (url.includes('wood-polish')) return 'Wood Polishing';
    if (url.includes('antique-restoration')) return 'Antique Restoration';
    if (url.includes('sofa')) return 'Sofa Services';
    if (url.includes('door-polish')) return 'Door Polishing';
    if (url.includes('wardrobe-polish')) return 'Wardrobe Polishing';
    if (url.includes('dining-table')) return 'Dining Table Polishing';
    if (url.includes('bed-polish')) return 'Bed Polishing';
    if (url.includes('cabinet-polish')) return 'Cabinet Polishing';
    return 'Furniture Services';
  }
}