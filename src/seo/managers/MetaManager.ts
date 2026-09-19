// Meta Manager for complete meta tag optimization

import {
  SEOPage,
  MetaManagerConfig,
  BulkUpdateResult,
  OpenGraphData,
  TwitterCardData
} from '../types';
import { IMetaManager } from '../interfaces';

export class MetaManager implements IMetaManager {
  public config: MetaManagerConfig;

  constructor(config: MetaManagerConfig) {
    this.config = config;
  }

  // H1 tag management
  generateH1Tag(page: SEOPage, keywords: string[]): string {
    if (!keywords || keywords.length === 0) {
      return page.title || 'Default H1 Tag';
    }

    // Extract location and service from URL or title
    const urlParts = page.url.split('/').filter(part => part.length > 0);
    const location = this.extractLocationFromUrl(page.url);
    const service = this.extractServiceFromUrl(page.url);

    // Create H1 with primary keyword and location/service context
    const primaryKeyword = keywords[0];
    
    if (location && service) {
      return `${primaryKeyword} in ${location} - ${service}`;
    } else if (location) {
      return `${primaryKeyword} in ${location}`;
    } else if (service) {
      return `${primaryKeyword} - ${service}`;
    }

    return primaryKeyword;
  }

  validateH1Uniqueness(pages: SEOPage[]): boolean {
    const h1Tags = new Set<string>();
    
    for (const page of pages) {
      if (!page.h1Tag) continue;
      
      const normalizedH1 = page.h1Tag.toLowerCase().trim();
      if (h1Tags.has(normalizedH1)) {
        return false;
      }
      h1Tags.add(normalizedH1);
    }
    
    return true;
  }

  // Meta description management
  generateMetaDescription(page: SEOPage, keywords: string[]): string {
    const minLength = this.config.metaDescriptionMinLength;
    const maxLength = this.config.metaDescriptionMaxLength;
    
    // Extract context from page
    const location = this.extractLocationFromUrl(page.url);
    const service = this.extractServiceFromUrl(page.url);
    const primaryKeyword = keywords[0] || 'furniture polish';
    
    // Create base description
    let description = '';
    
    if (location && service) {
      description = `Professional ${primaryKeyword} services in ${location}. Expert ${service} with quality results. Book online for best rates and quick service.`;
    } else if (location) {
      description = `Professional ${primaryKeyword} services in ${location}. Quality furniture polishing with expert results. Book online today.`;
    } else if (service) {
      description = `Expert ${service} services. Professional ${primaryKeyword} with quality results and competitive pricing. Book online now.`;
    } else {
      description = `Professional ${primaryKeyword} services with expert results. Quality furniture polishing at competitive rates. Book online today.`;
    }

    // Ensure description is within length limits
    if (description.length < minLength) {
      description += ' Contact us for free consultation and quotes.';
    }
    
    if (description.length > maxLength) {
      description = description.substring(0, maxLength - 3) + '...';
    }

    return description;
  }

  validateMetaDescriptionLength(description: string): boolean {
    const length = description.length;
    return length >= this.config.metaDescriptionMinLength && 
           length <= this.config.metaDescriptionMaxLength;
  }

  // Social media tags
  generateOpenGraphTags(page: SEOPage): Record<string, string> {
    const location = this.extractLocationFromUrl(page.url);
    const service = this.extractServiceFromUrl(page.url);
    
    const ogTags: Record<string, string> = {
      'og:title': page.title || page.h1Tag || 'A1 Furniture Polish',
      'og:description': page.metaDescription || 'Professional furniture polishing services',
      'og:url': page.url,
      'og:type': 'website',
      'og:site_name': 'A1 Furniture Polish',
      'og:locale': 'en_US'
    };

    // Add location-specific image if available
    if (location || service) {
      ogTags['og:image'] = this.generateImageUrl(location, service);
      ogTags['og:image:alt'] = `${service || 'Furniture polishing'} in ${location || 'Mumbai'}`;
      ogTags['og:image:width'] = '1200';
      ogTags['og:image:height'] = '630';
    }

    return ogTags;
  }

  generateTwitterCardTags(page: SEOPage): Record<string, string> {
    const location = this.extractLocationFromUrl(page.url);
    const service = this.extractServiceFromUrl(page.url);
    
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title || page.h1Tag || 'A1 Furniture Polish',
      'twitter:description': page.metaDescription || 'Professional furniture polishing services',
      'twitter:site': '@A1FurniturePolish',
      'twitter:creator': '@A1FurniturePolish'
    };

    // Add location-specific image if available
    if (location || service) {
      twitterTags['twitter:image'] = this.generateImageUrl(location, service);
      twitterTags['twitter:image:alt'] = `${service || 'Furniture polishing'} in ${location || 'Mumbai'}`;
    }

    return twitterTags;
  }

  // Canonical tags
  generateCanonicalTag(page: SEOPage, duplicatePages?: SEOPage[]): string {
    // If no duplicates, use the page's own URL
    if (!duplicatePages || duplicatePages.length === 0) {
      return page.url;
    }

    // Find the preferred version (usually the shortest URL or the one with the most content)
    const allPages = [page, ...duplicatePages];
    
    // Prefer pages with more content
    const preferredPage = allPages.reduce((preferred, current) => {
      const currentWordCount = current.wordCount || 0;
      const preferredWordCount = preferred.wordCount || 0;
      
      if (currentWordCount > preferredWordCount) {
        return current;
      }
      if (currentWordCount === preferredWordCount && current.url.length < preferred.url.length) {
        return current;
      }
      return preferred;
    });

    return preferredPage.url;
  }

  // Validation methods
  validateMetaUniqueness(pages: SEOPage[]): boolean {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    
    for (const page of pages) {
      // Check title uniqueness
      if (page.title) {
        const normalizedTitle = page.title.toLowerCase().trim();
        if (titles.has(normalizedTitle)) {
          return false;
        }
        titles.add(normalizedTitle);
      }
      
      // Check meta description uniqueness
      if (page.metaDescription) {
        const normalizedDescription = page.metaDescription.toLowerCase().trim();
        if (descriptions.has(normalizedDescription)) {
          return false;
        }
        descriptions.add(normalizedDescription);
      }
    }
    
    return true;
  }

  // Bulk operations
  async processMetaUpdates(pages: SEOPage[]): Promise<BulkUpdateResult> {
    const operationId = `meta_update_${Date.now()}`;
    const successfulPages: string[] = [];
    const failedPages: string[] = [];
    const errors: Record<string, string> = {};

    for (const page of pages) {
      try {
        // Update meta information if missing or invalid
        if (!page.h1Tag || !this.config.h1KeywordRequirement) {
          const keywords = this.extractKeywordsFromPage(page);
          page.h1Tag = this.generateH1Tag(page, keywords);
        }

        if (!page.metaDescription || !this.validateMetaDescriptionLength(page.metaDescription)) {
          const keywords = this.extractKeywordsFromPage(page);
          page.metaDescription = this.generateMetaDescription(page, keywords);
        }

        // Update social media tags if required
        if (this.config.socialMediaTagsRequired) {
          const ogTags = this.generateOpenGraphTags(page);
          const twitterTags = this.generateTwitterCardTags(page);
          
          // Update the page's social media data
          page.openGraphTags = this.convertToOpenGraphData(ogTags);
          page.twitterCardTags = this.convertToTwitterCardData(twitterTags);
        }

        // Set canonical URL if not present
        if (!page.canonicalUrl) {
          page.canonicalUrl = this.generateCanonicalTag(page);
        }

        page.lastModified = new Date();
        successfulPages.push(page.url);
        
      } catch (error) {
        failedPages.push(page.url);
        errors[page.url] = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return {
      operationId,
      successfulPages,
      failedPages,
      errors,
      rollbackAvailable: true
    };
  }

  // Helper methods
  private extractLocationFromUrl(url: string): string | null {
    const locationPatterns = [
      /\/([a-z]+(?:-[a-z]+)*)-furniture-polish/i,
      /\/furniture-polish-([a-z]+(?:-[a-z]+)*)/i,
      /\/([a-z]+(?:-[a-z]+)*)-polish/i,
      /\/polish-([a-z]+(?:-[a-z]+)*)/i,
      /\/([a-z]+(?:-[a-z]+)*)-polishing/i,
      /\/polishing-([a-z]+(?:-[a-z]+)*)/i,
      // More specific patterns for common locations
      /\/(mumbai|bandra|andheri|goregaon|powai|santacruz|jogeshwari|malad|borivali|kandivali|dahisar|mira-road|thane|navi-mumbai)/i
    ];

    for (const pattern of locationPatterns) {
      const match = url.match(pattern);
      if (match) {
        return this.formatLocationName(match[1]);
      }
    }

    // Check if URL contains common Mumbai locations
    const mumbaiLocations = ['mumbai', 'bandra', 'andheri', 'goregaon', 'powai', 'santacruz', 'jogeshwari'];
    for (const location of mumbaiLocations) {
      if (url.toLowerCase().includes(location)) {
        return this.formatLocationName(location);
      }
    }

    return null;
  }

  private extractServiceFromUrl(url: string): string | null {
    const servicePatterns = [
      /\/(sofa|chair|table|bed|cabinet|wardrobe|door|antique)-/i,
      /\/(wooden|metal|steel|pu)-furniture/i,
      /\/furniture-(polishing|polish|repair|restoration)/i
    ];

    for (const pattern of servicePatterns) {
      const match = url.match(pattern);
      if (match) {
        return this.formatServiceName(match[1]);
      }
    }

    return null;
  }

  private formatLocationName(location: string): string {
    return location
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private formatServiceName(service: string): string {
    const serviceMap: Record<string, string> = {
      'sofa': 'Sofa Polishing',
      'chair': 'Chair Polishing',
      'table': 'Table Polishing',
      'bed': 'Bed Polishing',
      'cabinet': 'Cabinet Polishing',
      'wardrobe': 'Wardrobe Polishing',
      'door': 'Door Polishing',
      'antique': 'Antique Restoration',
      'wooden': 'Wooden Furniture Polish',
      'metal': 'Metal Furniture Polish',
      'steel': 'Steel Furniture Polish',
      'pu': 'PU Furniture Polish',
      'polishing': 'Furniture Polishing',
      'polish': 'Furniture Polish',
      'repair': 'Furniture Repair',
      'restoration': 'Furniture Restoration'
    };

    return serviceMap[service.toLowerCase()] || service;
  }

  private extractKeywordsFromPage(page: SEOPage): string[] {
    const keywords: string[] = [];
    
    // Extract from title
    if (page.title) {
      keywords.push(...this.extractKeywordsFromText(page.title));
    }
    
    // Extract from URL
    const location = this.extractLocationFromUrl(page.url);
    const service = this.extractServiceFromUrl(page.url);
    
    if (location) keywords.push(location);
    if (service) keywords.push(service);
    
    // Add default keywords
    keywords.push('furniture polish', 'furniture polishing', 'Mumbai');
    
    return Array.from(new Set(keywords)); // Remove duplicates
  }

  private extractKeywordsFromText(text: string): string[] {
    const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an']);
    
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word))
      .slice(0, 5); // Limit to 5 keywords
  }

  private generateImageUrl(location?: string | null, service?: string | null): string {
    // Generate appropriate image URL based on location and service
    const baseUrl = '/assets/optimized/';
    
    if (service?.toLowerCase().includes('sofa')) {
      return `${baseUrl}Sofa And chair-640w.webp`;
    } else if (service?.toLowerCase().includes('table')) {
      return `${baseUrl}Study-table-polish-640w.webp`;
    } else if (service?.toLowerCase().includes('bed')) {
      return `${baseUrl}Bed-polish-640w.webp`;
    } else if (service?.toLowerCase().includes('cabinet')) {
      return `${baseUrl}Cabinet-polish-640w.webp`;
    } else if (service?.toLowerCase().includes('wardrobe')) {
      return `${baseUrl}Wardrobe-polish-640w.webp`;
    } else if (service?.toLowerCase().includes('door')) {
      return `${baseUrl}Door-polish-640w.webp`;
    } else if (service?.toLowerCase().includes('antique')) {
      return `${baseUrl}Antique Restoration-640w.webp`;
    }
    
    // Default furniture polishing image
    return `${baseUrl}wooden furniture -640w.webp`;
  }

  private convertToOpenGraphData(ogTags: Record<string, string>): OpenGraphData {
    return {
      title: ogTags['og:title'] || '',
      description: ogTags['og:description'] || '',
      image: ogTags['og:image'] || '',
      url: ogTags['og:url'] || '',
      type: ogTags['og:type'] || 'website',
      siteName: ogTags['og:site_name'] || 'A1 Furniture Polish'
    };
  }

  private convertToTwitterCardData(twitterTags: Record<string, string>): TwitterCardData {
    return {
      card: (twitterTags['twitter:card'] as TwitterCardData['card']) || 'summary_large_image',
      title: twitterTags['twitter:title'] || '',
      description: twitterTags['twitter:description'] || '',
      image: twitterTags['twitter:image'] || '',
      site: twitterTags['twitter:site'],
      creator: twitterTags['twitter:creator']
    };
  }
}