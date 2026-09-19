// Link Manager Implementation for Internal Linking Optimization

import { ILinkManager } from '../interfaces';
import {
  LinkManagerConfig,
  SEOPage,
  Link,
  LinkAnalysis,
  BulkUpdateResult
} from '../types';

export class LinkManager implements ILinkManager {
  public config: LinkManagerConfig;

  constructor(config: LinkManagerConfig) {
    this.config = config;
  }

  /**
   * Analyzes the link structure of a page
   * @param page - The SEO page to analyze
   * @returns LinkAnalysis with comprehensive link metrics
   */
  analyzeLinks(page: SEOPage): LinkAnalysis {
    const internalLinks = page.internalLinks || [];
    const outgoingLinks = page.outgoingLinks || [];
    
    // Calculate anchor text distribution
    const anchorTextDistribution = new Map<string, number>();
    internalLinks.forEach(link => {
      const anchorText = link.anchorText.toLowerCase().trim();
      anchorTextDistribution.set(anchorText, (anchorTextDistribution.get(anchorText) || 0) + 1);
    });

    return {
      totalInternalLinks: internalLinks.length,
      totalOutgoingLinks: outgoingLinks.length,
      orphanPages: [], // Will be populated by fixOrphanPages method
      circularReferences: [], // Will be populated by detectCircularReferences method
      brokenLinks: [], // Would need external validation
      anchorTextDistribution
    };
  }

  /**
   * Generates outgoing links for pages with insufficient links
   * @param page - The page that needs more outgoing links
   * @param targetCount - The desired number of outgoing links
   * @returns Array of generated links
   */
  generateOutgoingLinks(page: SEOPage, targetCount: number): Link[] {
    const currentLinks = page.outgoingLinks || [];
    const currentCount = currentLinks.length;
    
    if (currentCount >= targetCount) {
      return currentLinks;
    }

    const newLinks: Link[] = [...currentLinks];
    const linksNeeded = targetCount - currentCount;
    
    // Generate contextual links based on page content and category
    const potentialTargets = this.findRelatedPages(page);
    
    for (let i = 0; i < linksNeeded && i < potentialTargets.length; i++) {
      const targetPage = potentialTargets[i];
      const anchorText = this.generateContextualAnchorText(page, targetPage);
      
      const newLink: Link = {
        sourceUrl: page.url,
        targetUrl: targetPage.url,
        anchorText,
        linkType: 'internal',
        isNoFollow: false,
        context: this.extractLinkContext(page, targetPage)
      };
      
      newLinks.push(newLink);
    }

    return newLinks;
  }

  /**
   * Fixes orphan pages by creating incoming links from relevant parent pages
   * @param orphanPages - Array of orphan page URLs
   * @param allPages - All pages in the system
   * @returns Array of links created to fix orphan pages
   */
  fixOrphanPages(orphanPages: string[], allPages: SEOPage[]): Link[] {
    const createdLinks: Link[] = [];
    
    orphanPages.forEach(orphanUrl => {
      const orphanPage = allPages.find(page => page.url === orphanUrl);
      if (!orphanPage) return;

      // Find relevant parent pages that should link to this orphan
      const parentPages = this.findRelevantParentPages(orphanPage, allPages);
      
      parentPages.forEach(parentPage => {
        const anchorText = this.generateContextualAnchorText(parentPage, orphanPage);
        
        const newLink: Link = {
          sourceUrl: parentPage.url,
          targetUrl: orphanPage.url,
          anchorText,
          linkType: 'internal',
          isNoFollow: false,
          context: this.extractLinkContext(parentPage, orphanPage)
        };
        
        createdLinks.push(newLink);
        
        // Add the link to the parent page's outgoing links
        if (!parentPage.outgoingLinks) {
          parentPage.outgoingLinks = [];
        }
        parentPage.outgoingLinks.push(newLink);
        
        // Add the link to the orphan page's incoming links
        if (!orphanPage.internalLinks) {
          orphanPage.internalLinks = [];
        }
        orphanPage.internalLinks.push(newLink);
      });
    });

    return createdLinks;
  }

  /**
   * Generates contextual anchor text based on target page content
   * @param sourcePage - The page containing the link
   * @param targetPage - The page being linked to
   * @returns Contextually relevant anchor text
   */
  generateContextualAnchorText(sourcePage: SEOPage, targetPage: SEOPage): string {
    // Extract key terms from target page
    const targetKeywords = this.extractKeywords(targetPage);
    const sourceKeywords = this.extractKeywords(sourcePage);
    
    // Find common themes or related concepts
    const commonThemes = this.findCommonThemes(sourceKeywords, targetKeywords);
    
    if (commonThemes.length > 0) {
      // Use the most relevant common theme
      return this.formatAnchorText(commonThemes[0], targetPage);
    }
    
    // Fallback to target page's primary keyword or title
    if (targetKeywords.length > 0) {
      return this.formatAnchorText(targetKeywords[0], targetPage);
    }
    
    // Final fallback to a portion of the target page title
    return this.formatAnchorText(targetPage.title.split(' ').slice(0, 3).join(' '), targetPage);
  }

  /**
   * Updates links that point to redirected pages
   * @param pages - All pages in the system
   * @param redirectMap - Map of old URLs to new URLs
   * @returns Updated pages with corrected links
   */
  updateRedirectedLinks(pages: SEOPage[], redirectMap: Map<string, string>): SEOPage[] {
    return pages.map(page => {
      // Update outgoing links
      if (page.outgoingLinks) {
        page.outgoingLinks = page.outgoingLinks.map(link => {
          const newTargetUrl = redirectMap.get(link.targetUrl);
          if (newTargetUrl) {
            return { ...link, targetUrl: newTargetUrl };
          }
          return link;
        });
      }

      // Update internal links
      if (page.internalLinks) {
        page.internalLinks = page.internalLinks.map(link => {
          const newTargetUrl = redirectMap.get(link.targetUrl);
          if (newTargetUrl) {
            return { ...link, targetUrl: newTargetUrl };
          }
          return link;
        });
      }

      return page;
    });
  }

  /**
   * Validates that link hierarchy is maintained without circular references
   * @param pages - All pages to validate
   * @returns True if hierarchy is valid
   */
  validateLinkHierarchy(pages: SEOPage[]): boolean {
    const circularRefs = this.detectCircularReferences(pages);
    return circularRefs.length === 0;
  }

  /**
   * Detects circular references in the link structure
   * @param pages - All pages to check
   * @returns Array of URLs involved in circular references
   */
  detectCircularReferences(pages: SEOPage[]): string[] {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const circularRefs: string[] = [];

    const dfs = (pageUrl: string, pageMap: Map<string, SEOPage>): boolean => {
      if (recursionStack.has(pageUrl)) {
        circularRefs.push(pageUrl);
        return true;
      }

      if (visited.has(pageUrl)) {
        return false;
      }

      visited.add(pageUrl);
      recursionStack.add(pageUrl);

      const page = pageMap.get(pageUrl);
      if (page && page.outgoingLinks) {
        for (const link of page.outgoingLinks) {
          if (link.linkType === 'internal' && dfs(link.targetUrl, pageMap)) {
            return true;
          }
        }
      }

      recursionStack.delete(pageUrl);
      return false;
    };

    const pageMap = new Map(pages.map(page => [page.url, page]));
    
    for (const page of pages) {
      if (!visited.has(page.url)) {
        dfs(page.url, pageMap);
      }
    }

    return Array.from(new Set(circularRefs));
  }

  /**
   * Processes bulk link updates for multiple pages
   * @param pages - Pages to update
   * @returns Result of the bulk operation
   */
  async processLinkUpdates(pages: SEOPage[]): Promise<BulkUpdateResult> {
    const operationId = `link-update-${Date.now()}`;
    const successfulPages: string[] = [];
    const failedPages: string[] = [];
    const errors: Record<string, string> = {};

    try {
      // Detect and fix orphan pages
      const orphanPages = this.identifyOrphanPages(pages);
      if (orphanPages.length > 0) {
        this.fixOrphanPages(orphanPages, pages);
      }

      // Ensure minimum outgoing links for each page
      for (const page of pages) {
        try {
          const analysis = this.analyzeLinks(page);
          if (analysis.totalOutgoingLinks < this.config.minOutgoingLinks) {
            const newLinks = this.generateOutgoingLinks(page, this.config.minOutgoingLinks);
            page.outgoingLinks = newLinks;
          }
          successfulPages.push(page.url);
        } catch (error) {
          failedPages.push(page.url);
          errors[page.url] = error instanceof Error ? error.message : 'Unknown error';
        }
      }

      // Validate link hierarchy after all updates
      if (this.config.avoidCircularReferences) {
        const circularRefs = this.detectCircularReferences(pages);
        if (circularRefs.length > 0) {
          // Remove circular references from successful pages and add to failed
          circularRefs.forEach(url => {
            const successIndex = successfulPages.indexOf(url);
            if (successIndex > -1) {
              successfulPages.splice(successIndex, 1);
            }
            if (!failedPages.includes(url)) {
              failedPages.push(url);
            }
            errors[url] = 'Circular reference detected';
          });
        }
      }

      return {
        operationId,
        successfulPages,
        failedPages,
        errors,
        rollbackAvailable: true
      };
    } catch (error) {
      return {
        operationId,
        successfulPages: [],
        failedPages: pages.map(p => p.url),
        errors: { 'bulk-operation': error instanceof Error ? error.message : 'Unknown error' },
        rollbackAvailable: false
      };
    }
  }

  // Private helper methods

  /**
   * Finds pages related to the given page based on content similarity
   */
  private findRelatedPages(page: SEOPage): SEOPage[] {
    // This would typically query a database or search index
    // For now, return mock related pages based on URL patterns
    const mockRelatedPages: SEOPage[] = [];
    
    // Extract service category from URL or title
    const serviceCategory = this.extractServiceCategory(page);
    const location = this.extractLocation(page);
    
    // Generate related service URLs
    const relatedServices = [
      'furniture-polishing',
      'wood-polishing', 
      'sofa-polishing',
      'table-polishing',
      'wardrobe-polishing'
    ].filter(service => !page.url.includes(service));

    relatedServices.slice(0, 3).forEach((service, index) => {
      mockRelatedPages.push({
        url: `/services/${service}-${location.toLowerCase().replace(/\s+/g, '-')}`,
        title: `${service.replace('-', ' ')} in ${location}`,
        metaDescription: `Professional ${service.replace('-', ' ')} services in ${location}`,
        h1Tag: `${service.replace('-', ' ')} ${location}`,
        wordCount: 300,
        internalLinks: [],
        outgoingLinks: [],
        openGraphTags: {
          title: `${service.replace('-', ' ')} in ${location}`,
          description: `Professional ${service.replace('-', ' ')} services in ${location}`,
          image: '',
          url: `/services/${service}-${location.toLowerCase().replace(/\s+/g, '-')}`,
          type: 'website',
          siteName: 'A1 Furniture Polish'
        },
        twitterCardTags: {
          card: 'summary_large_image',
          title: `${service.replace('-', ' ')} in ${location}`,
          description: `Professional ${service.replace('-', ' ')} services in ${location}`,
          image: ''
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service'
        },
        lastModified: new Date(),
        seoScore: 75
      });
    });

    return mockRelatedPages;
  }

  /**
   * Finds relevant parent pages that should link to an orphan page
   */
  private findRelevantParentPages(orphanPage: SEOPage, allPages: SEOPage[]): SEOPage[] {
    const relevantParents: SEOPage[] = [];
    
    const orphanCategory = this.extractServiceCategory(orphanPage);
    const orphanLocation = this.extractLocation(orphanPage);
    
    // Find pages in the same category or location
    allPages.forEach(page => {
      if (page.url === orphanPage.url) return;
      
      const pageCategory = this.extractServiceCategory(page);
      const pageLocation = this.extractLocation(page);
      
      // Check if pages are related by category or location
      if (pageCategory === orphanCategory || pageLocation === orphanLocation) {
        // Ensure the page doesn't already link to the orphan
        const alreadyLinked = page.outgoingLinks?.some(link => link.targetUrl === orphanPage.url);
        if (!alreadyLinked) {
          relevantParents.push(page);
        }
      }
    });

    // Limit to top 3 most relevant parents
    return relevantParents.slice(0, 3);
  }

  /**
   * Identifies orphan pages (pages with no incoming internal links)
   */
  private identifyOrphanPages(pages: SEOPage[]): string[] {
    const allInternalTargets = new Set<string>();
    
    // Collect all internal link targets
    pages.forEach(page => {
      page.internalLinks?.forEach(link => {
        if (link.linkType === 'internal') {
          allInternalTargets.add(link.targetUrl);
        }
      });
    });

    // Find pages that are not targets of any internal links
    const orphanPages: string[] = [];
    pages.forEach(page => {
      if (!allInternalTargets.has(page.url)) {
        orphanPages.push(page.url);
      }
    });

    return orphanPages;
  }

  /**
   * Extracts keywords from a page's content
   */
  private extractKeywords(page: SEOPage): string[] {
    const keywords: string[] = [];
    
    // Extract from title
    const titleWords = page.title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    keywords.push(...titleWords);
    
    // Extract from H1
    if (page.h1Tag) {
      const h1Words = page.h1Tag.toLowerCase().split(/\s+/).filter(word => word.length > 3);
      keywords.push(...h1Words);
    }
    
    // Extract from meta description
    const metaWords = page.metaDescription.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    keywords.push(...metaWords);
    
    // Remove duplicates and common stop words
    const stopWords = new Set(['the', 'and', 'for', 'with', 'this', 'that', 'from', 'they', 'have', 'been']);
    return Array.from(new Set(keywords)).filter(word => !stopWords.has(word));
  }

  /**
   * Finds common themes between two sets of keywords
   */
  private findCommonThemes(sourceKeywords: string[], targetKeywords: string[]): string[] {
    const commonThemes: string[] = [];
    
    sourceKeywords.forEach(sourceWord => {
      targetKeywords.forEach(targetWord => {
        if (sourceWord === targetWord) {
          commonThemes.push(sourceWord);
        }
        // Check for partial matches (e.g., "polish" and "polishing")
        else if (sourceWord.includes(targetWord) || targetWord.includes(sourceWord)) {
          commonThemes.push(targetWord);
        }
      });
    });

    // If no common themes found, use target keywords directly
    if (commonThemes.length === 0 && targetKeywords.length > 0) {
      return [targetKeywords[0]];
    }

    return Array.from(new Set(commonThemes));
  }

  /**
   * Formats anchor text to be natural and SEO-friendly
   */
  private formatAnchorText(keyword: string, targetPage: SEOPage): string {
    // Capitalize first letter and ensure proper formatting
    const formatted = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    
    // Add context if needed
    const location = this.extractLocation(targetPage);
    if (location && !formatted.includes(location)) {
      return `${formatted} in ${location}`;
    }
    
    return formatted;
  }

  /**
   * Extracts link context for better relevance
   */
  private extractLinkContext(sourcePage: SEOPage, targetPage: SEOPage): string {
    const sourceCategory = this.extractServiceCategory(sourcePage);
    const targetCategory = this.extractServiceCategory(targetPage);
    
    if (sourceCategory === targetCategory) {
      return `Related ${sourceCategory} service`;
    }
    
    return `Additional service offering`;
  }

  /**
   * Extracts service category from page URL or title
   */
  private extractServiceCategory(page: SEOPage): string {
    const url = page.url.toLowerCase();
    const title = page.title.toLowerCase();
    
    if (url.includes('furniture') || title.includes('furniture')) return 'furniture-polishing';
    if (url.includes('sofa') || title.includes('sofa')) return 'sofa-polishing';
    if (url.includes('wood') || title.includes('wood')) return 'wood-polishing';
    if (url.includes('table') || title.includes('table')) return 'table-polishing';
    if (url.includes('wardrobe') || title.includes('wardrobe')) return 'wardrobe-polishing';
    
    return 'general-polishing';
  }

  /**
   * Extracts location from page URL or title
   */
  private extractLocation(page: SEOPage): string {
    const url = page.url.toLowerCase();
    const title = page.title.toLowerCase();
    
    // Common Mumbai locations
    const locations = [
      'mumbai', 'andheri', 'bandra', 'goregaon', 'powai', 'thane', 'navi-mumbai',
      'borivali', 'malad', 'kandivali', 'jogeshwari', 'vile-parle', 'santacruz'
    ];
    
    for (const location of locations) {
      if (url.includes(location) || title.includes(location)) {
        return location.charAt(0).toUpperCase() + location.slice(1).replace('-', ' ');
      }
    }
    
    return 'Mumbai';
  }
}