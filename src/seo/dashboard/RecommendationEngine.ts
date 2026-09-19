// SEO Improvement Recommendations Engine

import { SEOHealthCheck, SEOIssue, SEOPage, SEOReport } from '../types';
import { TrackedIssue, IssueMetrics } from './IssueTracker';
import { PerformanceTracker, CoreWebVitalsMetrics, SEOPerformanceMetrics } from './PerformanceTracker';

export interface SEORecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'technical' | 'content' | 'performance' | 'meta' | 'linking' | 'mobile';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  affectedPages: string[];
  actionItems: string[];
  estimatedTimeToImplement: string;
  expectedImpact: string;
  resources: string[];
  tags: string[];
  createdAt: Date;
  implementationStatus: 'pending' | 'in_progress' | 'completed' | 'dismissed';
}

export interface RecommendationFilter {
  priority?: 'low' | 'medium' | 'high' | 'critical';
  category?: 'technical' | 'content' | 'performance' | 'meta' | 'linking' | 'mobile';
  impact?: 'low' | 'medium' | 'high';
  effort?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'in_progress' | 'completed' | 'dismissed';
  tags?: string[];
}

export interface RecommendationMetrics {
  totalRecommendations: number;
  pendingRecommendations: number;
  completedRecommendations: number;
  highPriorityRecommendations: number;
  averageImplementationTime: number;
  recommendationsByCategory: Map<string, number>;
  implementationRate: number;
}

export class RecommendationEngine {
  private recommendations: Map<string, SEORecommendation> = new Map();
  private nextRecommendationId = 1;

  /**
   * Generates comprehensive SEO recommendations based on health checks and metrics
   * @param report - SEO report with health checks
   * @param issueMetrics - Issue tracking metrics
   * @param performanceTracker - Performance tracking data
   * @returns Array of generated recommendations
   */
  generateRecommendations(
    report: SEOReport,
    issueMetrics?: IssueMetrics,
    performanceTracker?: PerformanceTracker
  ): SEORecommendation[] {
    const newRecommendations: SEORecommendation[] = [];

    // Analyze critical issues
    newRecommendations.push(...this.analyzeCriticalIssues(report));

    // Analyze content quality issues
    newRecommendations.push(...this.analyzeContentIssues(report));

    // Analyze technical SEO issues
    newRecommendations.push(...this.analyzeTechnicalIssues(report));

    // Analyze performance issues
    if (performanceTracker) {
      newRecommendations.push(...this.analyzePerformanceIssues(performanceTracker));
    }

    // Analyze meta tag issues
    newRecommendations.push(...this.analyzeMetaTagIssues(report));

    // Analyze internal linking issues
    newRecommendations.push(...this.analyzeLinkingIssues(report));

    // Analyze mobile optimization issues
    newRecommendations.push(...this.analyzeMobileIssues(report));

    // Generate strategic recommendations based on overall performance
    newRecommendations.push(...this.generateStrategicRecommendations(report, issueMetrics));

    // Store new recommendations
    newRecommendations.forEach(rec => {
      this.recommendations.set(rec.id, rec);
    });

    return newRecommendations;
  }

  /**
   * Gets filtered recommendations
   * @param filter - Filter criteria
   * @returns Filtered recommendations
   */
  getRecommendations(filter?: RecommendationFilter): SEORecommendation[] {
    let recommendations = Array.from(this.recommendations.values());

    if (!filter) {
      return recommendations.sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority));
    }

    if (filter.priority) {
      recommendations = recommendations.filter(rec => rec.priority === filter.priority);
    }

    if (filter.category) {
      recommendations = recommendations.filter(rec => rec.category === filter.category);
    }

    if (filter.impact) {
      recommendations = recommendations.filter(rec => rec.impact === filter.impact);
    }

    if (filter.effort) {
      recommendations = recommendations.filter(rec => rec.effort === filter.effort);
    }

    if (filter.status) {
      recommendations = recommendations.filter(rec => rec.implementationStatus === filter.status);
    }

    if (filter.tags && filter.tags.length > 0) {
      recommendations = recommendations.filter(rec =>
        filter.tags!.some(tag => rec.tags.includes(tag))
      );
    }

    return recommendations.sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority));
  }

  /**
   * Updates recommendation implementation status
   * @param recommendationId - Recommendation ID
   * @param status - New status
   * @returns Success status
   */
  updateRecommendationStatus(recommendationId: string, status: SEORecommendation['implementationStatus']): boolean {
    const recommendation = this.recommendations.get(recommendationId);
    if (recommendation) {
      recommendation.implementationStatus = status;
      return true;
    }
    return false;
  }

  /**
   * Gets recommendation metrics
   * @returns Comprehensive metrics
   */
  getRecommendationMetrics(): RecommendationMetrics {
    const recommendations = Array.from(this.recommendations.values());
    
    const totalRecommendations = recommendations.length;
    const pendingRecommendations = recommendations.filter(rec => rec.implementationStatus === 'pending').length;
    const completedRecommendations = recommendations.filter(rec => rec.implementationStatus === 'completed').length;
    const highPriorityRecommendations = recommendations.filter(rec => rec.priority === 'high' || rec.priority === 'critical').length;

    const recommendationsByCategory = new Map<string, number>();
    recommendations.forEach(rec => {
      recommendationsByCategory.set(rec.category, (recommendationsByCategory.get(rec.category) || 0) + 1);
    });

    const implementationRate = totalRecommendations > 0 ? (completedRecommendations / totalRecommendations) * 100 : 0;

    return {
      totalRecommendations,
      pendingRecommendations,
      completedRecommendations,
      highPriorityRecommendations,
      averageImplementationTime: 0, // Would need implementation time tracking
      recommendationsByCategory,
      implementationRate
    };
  }

  /**
   * Gets prioritized action plan
   * @param maxRecommendations - Maximum number of recommendations to include
   * @returns Prioritized action plan
   */
  getPrioritizedActionPlan(maxRecommendations: number = 10): SEORecommendation[] {
    const pendingRecommendations = this.getRecommendations({ status: 'pending' });
    
    // Sort by priority, impact, and effort (high impact, low effort preferred)
    return pendingRecommendations
      .sort((a, b) => {
        const priorityDiff = this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority);
        if (priorityDiff !== 0) return priorityDiff;
        
        const impactDiff = this.getImpactWeight(b.impact) - this.getImpactWeight(a.impact);
        if (impactDiff !== 0) return impactDiff;
        
        return this.getEffortWeight(a.effort) - this.getEffortWeight(b.effort); // Lower effort preferred
      })
      .slice(0, maxRecommendations);
  }

  // Private analysis methods

  /**
   * Analyzes critical issues and generates recommendations
   * @param report - SEO report
   * @returns Critical issue recommendations
   */
  private analyzeCriticalIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    const criticalIssues = report.healthChecks.flatMap(check => 
      check.issues.filter(issue => issue.severity === 'critical')
    );

    if (criticalIssues.length === 0) return recommendations;

    // Group critical issues by type
    const issuesByType = new Map<string, SEOIssue[]>();
    criticalIssues.forEach(issue => {
      const issues = issuesByType.get(issue.issueType) || [];
      issues.push(issue);
      issuesByType.set(issue.issueType, issues);
    });

    issuesByType.forEach((issues, issueType) => {
      const affectedPages = issues.map(issue => issue.pageUrl);
      
      switch (issueType) {
        case 'missing_h1':
          recommendations.push(this.createRecommendation({
            title: 'Fix Missing H1 Tags',
            description: `${issues.length} pages are missing H1 tags, which are critical for SEO and accessibility.`,
            priority: 'critical',
            category: 'meta',
            impact: 'high',
            effort: 'low',
            affectedPages,
            actionItems: [
              'Audit all pages missing H1 tags',
              'Generate unique H1 tags based on page content and target keywords',
              'Implement automated H1 tag generation for new pages',
              'Verify H1 tags are properly structured and contain primary keywords'
            ],
            estimatedTimeToImplement: '1-2 days',
            expectedImpact: 'Improved search rankings and click-through rates',
            resources: ['SEO team', 'Development team'],
            tags: ['critical', 'meta-tags', 'quick-win']
          }));
          break;

        case 'missing_meta':
          recommendations.push(this.createRecommendation({
            title: 'Fix Missing Meta Descriptions',
            description: `${issues.length} pages are missing meta descriptions, impacting search result snippets.`,
            priority: 'critical',
            category: 'meta',
            impact: 'high',
            effort: 'medium',
            affectedPages,
            actionItems: [
              'Generate compelling meta descriptions for all affected pages',
              'Ensure meta descriptions are 150-160 characters long',
              'Include target keywords naturally in meta descriptions',
              'Set up automated meta description generation for new pages'
            ],
            estimatedTimeToImplement: '2-3 days',
            expectedImpact: 'Better search result snippets and improved CTR',
            resources: ['Content team', 'SEO team'],
            tags: ['critical', 'meta-tags', 'content']
          }));
          break;

        case 'orphan_page':
          recommendations.push(this.createRecommendation({
            title: 'Fix Orphan Pages',
            description: `${issues.length} pages have insufficient internal links, making them hard to discover.`,
            priority: 'high',
            category: 'linking',
            impact: 'high',
            effort: 'medium',
            affectedPages,
            actionItems: [
              'Identify relevant parent pages for each orphan page',
              'Create contextual internal links from related content',
              'Update navigation menus and sitemaps',
              'Implement automated internal linking suggestions'
            ],
            estimatedTimeToImplement: '3-5 days',
            expectedImpact: 'Improved page authority and crawlability',
            resources: ['SEO team', 'Content team'],
            tags: ['high-priority', 'internal-linking', 'site-structure']
          }));
          break;
      }
    });

    return recommendations;
  }

  /**
   * Analyzes content quality issues
   * @param report - SEO report
   * @returns Content recommendations
   */
  private analyzeContentIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    const lowWordCountPages = report.healthChecks.filter(check => 
      check.issues.some(issue => issue.issueType === 'low_word_count')
    );

    if (lowWordCountPages.length > 0) {
      recommendations.push(this.createRecommendation({
        title: 'Improve Content Length and Quality',
        description: `${lowWordCountPages.length} pages have insufficient content (< 300 words).`,
        priority: 'medium',
        category: 'content',
        impact: 'medium',
        effort: 'high',
        affectedPages: lowWordCountPages.map(check => check.pageUrl),
        actionItems: [
          'Audit content on pages with low word count',
          'Expand content with relevant, valuable information',
          'Add location-specific and service-specific details',
          'Include FAQ sections and detailed service descriptions',
          'Ensure content provides genuine value to users'
        ],
        estimatedTimeToImplement: '1-2 weeks',
        expectedImpact: 'Better search rankings and user engagement',
        resources: ['Content team', 'Subject matter experts'],
        tags: ['content-quality', 'user-experience', 'seo-fundamentals']
      }));
    }

    return recommendations;
  }

  /**
   * Analyzes technical SEO issues
   * @param report - SEO report
   * @returns Technical recommendations
   */
  private analyzeTechnicalIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    
    // Check for missing canonical URLs
    const missingCanonicalPages = report.healthChecks.filter(check =>
      check.issues.some(issue => issue.issueType === 'missing_canonical')
    );

    if (missingCanonicalPages.length > 0) {
      recommendations.push(this.createRecommendation({
        title: 'Implement Canonical URLs',
        description: `${missingCanonicalPages.length} pages are missing canonical URLs.`,
        priority: 'medium',
        category: 'technical',
        impact: 'medium',
        effort: 'low',
        affectedPages: missingCanonicalPages.map(check => check.pageUrl),
        actionItems: [
          'Add canonical tags to all pages',
          'Ensure canonical URLs point to the preferred version',
          'Set up automated canonical tag generation',
          'Review and fix any duplicate content issues'
        ],
        estimatedTimeToImplement: '1-2 days',
        expectedImpact: 'Prevent duplicate content penalties',
        resources: ['Development team'],
        tags: ['technical-seo', 'duplicate-content', 'quick-win']
      }));
    }

    return recommendations;
  }

  /**
   * Analyzes performance issues
   * @param performanceTracker - Performance tracking data
   * @returns Performance recommendations
   */
  private analyzePerformanceIssues(performanceTracker: PerformanceTracker): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    const performanceIssues = performanceTracker.getPerformanceIssues();

    if (performanceIssues.length > 0) {
      const slowPages = performanceIssues.filter(issue => 
        issue.issues.some(i => i.includes('LCP') || i.includes('Load Time'))
      );

      if (slowPages.length > 0) {
        recommendations.push(this.createRecommendation({
          title: 'Optimize Page Loading Speed',
          description: `${slowPages.length} pages have slow loading times affecting Core Web Vitals.`,
          priority: 'high',
          category: 'performance',
          impact: 'high',
          effort: 'medium',
          affectedPages: slowPages.map(page => page.url),
          actionItems: [
            'Optimize images with proper compression and lazy loading',
            'Minimize CSS and JavaScript bundles',
            'Implement browser caching strategies',
            'Optimize server response times',
            'Consider using a Content Delivery Network (CDN)'
          ],
          estimatedTimeToImplement: '1-2 weeks',
          expectedImpact: 'Improved Core Web Vitals and search rankings',
          resources: ['Development team', 'DevOps team'],
          tags: ['performance', 'core-web-vitals', 'user-experience']
        }));
      }
    }

    return recommendations;
  }

  /**
   * Analyzes meta tag issues
   * @param report - SEO report
   * @returns Meta tag recommendations
   */
  private analyzeMetaTagIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    
    // Check for pages that might benefit from social media tags
    const pagesNeedingSocialTags = report.healthChecks.filter(check => check.score < 80);

    if (pagesNeedingSocialTags.length > 0) {
      recommendations.push(this.createRecommendation({
        title: 'Implement Social Media Meta Tags',
        description: 'Add Open Graph and Twitter Card tags to improve social media sharing.',
        priority: 'medium',
        category: 'meta',
        impact: 'medium',
        effort: 'low',
        affectedPages: pagesNeedingSocialTags.map(check => check.pageUrl),
        actionItems: [
          'Add Open Graph meta tags (og:title, og:description, og:image)',
          'Implement Twitter Card meta tags',
          'Create high-quality social sharing images',
          'Test social media sharing appearance'
        ],
        estimatedTimeToImplement: '2-3 days',
        expectedImpact: 'Better social media engagement and traffic',
        resources: ['Development team', 'Design team'],
        tags: ['social-media', 'meta-tags', 'engagement']
      }));
    }

    return recommendations;
  }

  /**
   * Analyzes internal linking issues
   * @param report - SEO report
   * @returns Linking recommendations
   */
  private analyzeLinkingIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    
    // Check overall internal linking health
    const averageScore = report.overallScore;
    
    if (averageScore < 70) {
      recommendations.push(this.createRecommendation({
        title: 'Improve Internal Linking Strategy',
        description: 'Enhance internal linking to improve site structure and page authority distribution.',
        priority: 'medium',
        category: 'linking',
        impact: 'high',
        effort: 'medium',
        affectedPages: report.healthChecks.map(check => check.pageUrl),
        actionItems: [
          'Conduct comprehensive internal linking audit',
          'Create topic clusters and pillar pages',
          'Implement contextual internal linking',
          'Use descriptive anchor text with relevant keywords',
          'Set up automated internal linking suggestions'
        ],
        estimatedTimeToImplement: '1-2 weeks',
        expectedImpact: 'Improved page authority and search rankings',
        resources: ['SEO team', 'Content team'],
        tags: ['internal-linking', 'site-architecture', 'seo-strategy']
      }));
    }

    return recommendations;
  }

  /**
   * Analyzes mobile optimization issues
   * @param report - SEO report
   * @returns Mobile recommendations
   */
  private analyzeMobileIssues(report: SEOReport): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];
    
    // Assume mobile issues if overall score is low
    if (report.overallScore < 75) {
      recommendations.push(this.createRecommendation({
        title: 'Optimize for Mobile Experience',
        description: 'Improve mobile responsiveness and user experience.',
        priority: 'high',
        category: 'mobile',
        impact: 'high',
        effort: 'medium',
        affectedPages: report.healthChecks.map(check => check.pageUrl),
        actionItems: [
          'Implement responsive design principles',
          'Optimize touch targets and button sizes',
          'Improve mobile page loading speed',
          'Test mobile usability across devices',
          'Optimize mobile navigation and user flow'
        ],
        estimatedTimeToImplement: '2-3 weeks',
        expectedImpact: 'Better mobile search rankings and user experience',
        resources: ['Development team', 'UX team'],
        tags: ['mobile-optimization', 'user-experience', 'responsive-design']
      }));
    }

    return recommendations;
  }

  /**
   * Generates strategic recommendations based on overall performance
   * @param report - SEO report
   * @param issueMetrics - Issue metrics
   * @returns Strategic recommendations
   */
  private generateStrategicRecommendations(report: SEOReport, issueMetrics?: IssueMetrics): SEORecommendation[] {
    const recommendations: SEORecommendation[] = [];

    // If there are many issues, recommend systematic approach
    if (report.criticalIssues + report.warningIssues > 50) {
      recommendations.push(this.createRecommendation({
        title: 'Implement Systematic SEO Improvement Process',
        description: 'Establish a systematic approach to address the high volume of SEO issues.',
        priority: 'high',
        category: 'technical',
        impact: 'high',
        effort: 'medium',
        affectedPages: [],
        actionItems: [
          'Set up automated SEO monitoring and alerting',
          'Implement daily SEO health checks',
          'Create SEO issue triage and resolution workflow',
          'Establish SEO performance benchmarks and KPIs',
          'Schedule regular SEO audits and reviews'
        ],
        estimatedTimeToImplement: '1 week',
        expectedImpact: 'Systematic improvement in SEO health',
        resources: ['SEO team', 'Development team', 'Management'],
        tags: ['process-improvement', 'automation', 'monitoring']
      }));
    }

    // If overall score is low, recommend comprehensive audit
    if (report.overallScore < 60) {
      recommendations.push(this.createRecommendation({
        title: 'Conduct Comprehensive SEO Audit',
        description: 'Perform a thorough SEO audit to identify and prioritize all optimization opportunities.',
        priority: 'critical',
        category: 'technical',
        impact: 'high',
        effort: 'high',
        affectedPages: [],
        actionItems: [
          'Analyze technical SEO foundation',
          'Review content strategy and keyword targeting',
          'Audit site architecture and internal linking',
          'Assess mobile and performance optimization',
          'Create detailed improvement roadmap'
        ],
        estimatedTimeToImplement: '2-3 weeks',
        expectedImpact: 'Comprehensive SEO improvement strategy',
        resources: ['SEO consultant', 'Technical team', 'Content team'],
        tags: ['comprehensive-audit', 'strategy', 'foundation']
      }));
    }

    return recommendations;
  }

  /**
   * Creates a recommendation with generated ID and timestamp
   * @param recommendation - Recommendation data without ID and timestamp
   * @returns Complete recommendation
   */
  private createRecommendation(recommendation: Omit<SEORecommendation, 'id' | 'createdAt' | 'implementationStatus'>): SEORecommendation {
    return {
      ...recommendation,
      id: `rec-${this.nextRecommendationId++}`,
      createdAt: new Date(),
      implementationStatus: 'pending'
    };
  }

  /**
   * Gets priority weight for sorting
   * @param priority - Priority level
   * @returns Numeric weight
   */
  private getPriorityWeight(priority: string): number {
    switch (priority) {
      case 'critical': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  /**
   * Gets impact weight for sorting
   * @param impact - Impact level
   * @returns Numeric weight
   */
  private getImpactWeight(impact: string): number {
    switch (impact) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  /**
   * Gets effort weight for sorting (lower is better)
   * @param effort - Effort level
   * @returns Numeric weight
   */
  private getEffortWeight(effort: string): number {
    switch (effort) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 2;
    }
  }
}

export default RecommendationEngine;