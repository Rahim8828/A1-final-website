// Base SEO Page Model Implementation

import {
  SEOPage,
  Link,
  OpenGraphData,
  TwitterCardData,
  SchemaMarkup,
  ContentAnalysis,
  HeadingStructure
} from '../types';

export class SEOPageModel implements SEOPage {
  public url: string;
  public title: string;
  public metaDescription: string;
  public h1Tag: string;
  public wordCount: number;
  public internalLinks: Link[];
  public outgoingLinks: Link[];
  public canonicalUrl?: string;
  public openGraphTags: OpenGraphData;
  public twitterCardTags: TwitterCardData;
  public structuredData: SchemaMarkup;
  public lastModified: Date;
  public seoScore: number;

  constructor(data: Partial<SEOPage>) {
    this.url = data.url || '';
    this.title = data.title || '';
    this.metaDescription = data.metaDescription || '';
    this.h1Tag = data.h1Tag || '';
    this.wordCount = data.wordCount || 0;
    this.internalLinks = data.internalLinks || [];
    this.outgoingLinks = data.outgoingLinks || [];
    this.canonicalUrl = data.canonicalUrl;
    this.openGraphTags = data.openGraphTags || this.createDefaultOpenGraphTags();
    this.twitterCardTags = data.twitterCardTags || this.createDefaultTwitterCardTags();
    this.structuredData = data.structuredData || this.createDefaultStructuredData();
    this.lastModified = data.lastModified || new Date();
    this.seoScore = data.seoScore || 0;
  }

  // Factory method to create from existing page data
  static fromPageData(pageData: any): SEOPageModel {
    return new SEOPageModel({
      url: pageData.url || pageData.canonicalUrl,
      title: pageData.title || pageData.metaTitle,
      metaDescription: pageData.metaDescription,
      h1Tag: pageData.h1,
      wordCount: this.calculateWordCount(pageData.content || ''),
      canonicalUrl: pageData.canonicalUrl,
      lastModified: new Date()
    });
  }

  // Calculate word count from content
  static calculateWordCount(content: string): number {
    if (!content) return 0;
    
    // Remove HTML tags and count words
    const textContent = content.replace(/<[^>]*>/g, ' ');
    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  // Extract links from content
  extractLinks(content: string, baseUrl: string): Link[] {
    const links: Link[] = [];
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const href = match[1];
      const anchorText = match[2];
      
      // Determine if link is internal or external
      const isInternal = href.startsWith('/') || href.includes(baseUrl);
      
      links.push({
        sourceUrl: this.url,
        targetUrl: href,
        anchorText: anchorText.trim(),
        linkType: isInternal ? 'internal' : 'external',
        isNoFollow: match[0].includes('rel="nofollow"'),
        context: this.extractLinkContext(content, match.index)
      });
    }

    return links;
  }

  // Extract context around a link
  private extractLinkContext(content: string, linkIndex: number): string {
    const contextLength = 100;
    const start = Math.max(0, linkIndex - contextLength);
    const end = Math.min(content.length, linkIndex + contextLength);
    return content.substring(start, end).replace(/<[^>]*>/g, ' ').trim();
  }

  // Update internal links
  updateInternalLinks(links: Link[]): void {
    this.internalLinks = links.filter(link => link.linkType === 'internal');
    this.outgoingLinks = links.filter(link => link.linkType === 'external');
  }

  // Update meta information
  updateMetaInformation(title: string, description: string, h1: string): void {
    this.title = title;
    this.metaDescription = description;
    this.h1Tag = h1;
    this.lastModified = new Date();
  }

  // Update Open Graph tags
  updateOpenGraphTags(tags: Partial<OpenGraphData>): void {
    this.openGraphTags = { ...this.openGraphTags, ...tags };
    this.lastModified = new Date();
  }

  // Update Twitter Card tags
  updateTwitterCardTags(tags: Partial<TwitterCardData>): void {
    this.twitterCardTags = { ...this.twitterCardTags, ...tags };
    this.lastModified = new Date();
  }

  // Update structured data
  updateStructuredData(data: SchemaMarkup): void {
    this.structuredData = data;
    this.lastModified = new Date();
  }

  // Calculate SEO score based on various factors
  calculateSEOScore(): number {
    let score = 0;
    const maxScore = 100;

    // Title optimization (20 points)
    if (this.title && this.title.length >= 30 && this.title.length <= 60) {
      score += 20;
    } else if (this.title && this.title.length > 0) {
      score += 10;
    }

    // Meta description optimization (20 points)
    if (this.metaDescription && this.metaDescription.length >= 150 && this.metaDescription.length <= 160) {
      score += 20;
    } else if (this.metaDescription && this.metaDescription.length > 0) {
      score += 10;
    }

    // H1 tag optimization (15 points)
    if (this.h1Tag && this.h1Tag.length > 0) {
      score += 15;
    }

    // Word count optimization (15 points)
    if (this.wordCount >= 300) {
      score += 15;
    } else if (this.wordCount >= 150) {
      score += 8;
    }

    // Internal linking (15 points)
    if (this.internalLinks.length >= 3) {
      score += 15;
    } else if (this.internalLinks.length > 0) {
      score += 8;
    }

    // Canonical URL (5 points)
    if (this.canonicalUrl) {
      score += 5;
    }

    // Open Graph tags (5 points)
    if (this.openGraphTags.title && this.openGraphTags.description) {
      score += 5;
    }

    // Twitter Card tags (5 points)
    if (this.twitterCardTags.title && this.twitterCardTags.description) {
      score += 5;
    }

    this.seoScore = Math.min(score, maxScore);
    return this.seoScore;
  }

  // Validate page data
  validate(): string[] {
    const errors: string[] = [];

    if (!this.url) {
      errors.push('URL is required');
    }

    if (!this.title) {
      errors.push('Title is required');
    } else if (this.title.length > 60) {
      errors.push('Title should be 60 characters or less');
    }

    if (!this.metaDescription) {
      errors.push('Meta description is required');
    } else if (this.metaDescription.length > 160) {
      errors.push('Meta description should be 160 characters or less');
    }

    if (!this.h1Tag) {
      errors.push('H1 tag is required');
    }

    if (this.wordCount < 300) {
      errors.push('Page should have at least 300 words');
    }

    if (this.internalLinks.length < 3) {
      errors.push('Page should have at least 3 internal links');
    }

    return errors;
  }

  // Convert to JSON
  toJSON(): Record<string, any> {
    return {
      url: this.url,
      title: this.title,
      metaDescription: this.metaDescription,
      h1Tag: this.h1Tag,
      wordCount: this.wordCount,
      internalLinks: this.internalLinks,
      outgoingLinks: this.outgoingLinks,
      canonicalUrl: this.canonicalUrl,
      openGraphTags: this.openGraphTags,
      twitterCardTags: this.twitterCardTags,
      structuredData: this.structuredData,
      lastModified: isNaN(this.lastModified.getTime()) ? new Date().toISOString() : this.lastModified.toISOString(),
      seoScore: this.seoScore
    };
  }

  // Create from JSON
  static fromJSON(json: Record<string, any>): SEOPageModel {
    const data = {
      ...json,
      lastModified: new Date(json.lastModified)
    };
    return new SEOPageModel(data);
  }

  // Private helper methods
  private createDefaultOpenGraphTags(): OpenGraphData {
    return {
      title: this.title,
      description: this.metaDescription,
      image: '',
      url: this.url,
      type: 'website',
      siteName: 'A1 Furniture Polish'
    };
  }

  private createDefaultTwitterCardTags(): TwitterCardData {
    return {
      card: 'summary_large_image',
      title: this.title,
      description: this.metaDescription,
      image: ''
    };
  }

  private createDefaultStructuredData(): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: this.title,
      description: this.metaDescription,
      url: this.url
    };
  }
}