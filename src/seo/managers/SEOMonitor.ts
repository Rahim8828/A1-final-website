// SEO Monitor Implementation for Automated Health Checks

import { ISEOMonitor } from '../interfaces';
import {
  SEOMonitorConfig,
  SEOPage,
  SEOHealthCheck,
  SEOIssue,
  SEOReport,
  BulkUpdateOperation,
  BulkUpdateResult
} from '../types';

export class SEOMonitor implements ISEOMonitor {
  public config: SEOMonitorConfig;
  private healthCheckTimer?: NodeJS.Timeout;
  private bulkOperations: Map<string, BulkUpdateOperation> = new Map();

  constructor(config: SEOMonitorConfig) {
    this.config = config;
  }

  /**
   * Performs comprehensive health check on a single page
   * @param page - The SEO page to check
   * @returns SEOHealthCheck with issues and recommendations
   */
  performHealthCheck(page: SEOPage): SEOHealthCheck {
    const issues = this.detectSEOIssues(page);
    const score = this.calculateHealthScore(page, issues);
    const recommendations = this.generatePageRecommendations(page, issues);

    return {
      pageUrl: page.url,
      timestamp: new Date(),
      issues,
      score,
      recommendations
    };
  }

  /**
   * Performs bulk health checks on multiple pages
   * @param pages - Array of pages to check
   * @returns Array of health check results
   */
  performBulkHealthCheck(pages: SEOPage[]): SEOHealthCheck[] {
    return pages.map(page => this.performHealthCheck(page));
  }

  /**
   * Detects SEO issues on a page
   * @param page - The page to analyze
   * @returns Array of detected issues
   */
  detectSEOIssues(page: SEOPage): SEOIssue[] {
    const issues: SEOIssue[] = [];

    // Check for missing H1 tag
    if (!page.h1Tag || page.h1Tag.trim().length === 0) {
      issues.push({
        pageUrl: page.url,
        issueType: 'missing_h1',
        severity: 'critical',
        description: 'Page is missing H1 tag',
        autoFixable: true,
        fixAction: 'Generate H1 tag from page title'
      });
    }

    // Check for low word count
    if ((page.wordCount || 0) < 300) {
      issues.push({
        pageUrl: page.url,
        issueType: 'low_word_count',
        severity: 'warning',
        description: `Page has only ${page.wordCount} words, minimum 300 recommended`,
        autoFixable: false,
        fixAction: 'Add more relevant content to reach minimum word count'
      });
    }

    // Check for missing meta description
    if (!page.metaDescription || page.metaDescription.trim().length === 0) {
      issues.push({
        pageUrl: page.url,
        issueType: 'missing_meta',
        severity: 'critical',
        description: 'Page is missing meta description',
        autoFixable: true,
        fixAction: 'Generate meta description from page content'
      });
    }

    // Check meta description length
    if (page.metaDescription && (page.metaDescription.length < 150 || page.metaDescription.length > 160)) {
      issues.push({
        pageUrl: page.url,
        issueType: 'missing_meta',
        severity: 'warning',
        description: `Meta description length is ${page.metaDescription.length} characters, should be 150-160`,
        autoFixable: true,
        fixAction: 'Optimize meta description length'
      });
    }

    // Check for insufficient internal links
    const internalLinkCount = page.internalLinks?.length || 0;
    if (internalLinkCount < 3) {
      issues.push({
        pageUrl: page.url,
        issueType: 'orphan_page',
        severity: 'warning',
        description: `Page has only ${internalLinkCount} internal links, minimum 3 recommended`,
        autoFixable: true,
        fixAction: 'Generate additional internal links to related content'
      });
    }

    // Check for missing canonical URL
    if (!page.canonicalUrl) {
      issues.push({
        pageUrl: page.url,
        issueType: 'missing_canonical',
        severity: 'info',
        description: 'Page is missing canonical URL',
        autoFixable: true,
        fixAction: 'Set canonical URL to page URL'
      });
    }

    // Check for poor keyword density (this would need content analysis)
    if ((page.seoScore || 0) < 50) {
      issues.push({
        pageUrl: page.url,
        issueType: 'poor_keyword_density',
        severity: 'warning',
        description: 'Page has poor SEO score, likely due to keyword optimization issues',
        autoFixable: false,
        fixAction: 'Review and optimize keyword usage and content structure'
      });
    }

    return issues;
  }

  /**
   * Automatically fixes resolvable SEO issues
   * @param issues - Array of issues to fix
   * @returns Result of the bulk fix operation
   */
  async autoFixIssues(issues: SEOIssue[]): Promise<BulkUpdateResult> {
    const operationId = `auto-fix-${Date.now()}`;
    const successfulPages: string[] = [];
    const failedPages: string[] = [];
    const errors: Record<string, string> = {};

    if (!this.config.autoFixEnabled) {
      return {
        operationId,
        successfulPages: [],
        failedPages: issues.map(issue => issue.pageUrl),
        errors: { 'auto-fix': 'Auto-fix is disabled in configuration' },
        rollbackAvailable: false
      };
    }

    // Group issues by page for batch processing
    const issuesByPage = new Map<string, SEOIssue[]>();
    issues.forEach(issue => {
      if (issue.autoFixable) {
        const pageIssues = issuesByPage.get(issue.pageUrl) || [];
        pageIssues.push(issue);
        issuesByPage.set(issue.pageUrl, pageIssues);
      }
    });

    // Process each page's issues
    for (const [pageUrl, pageIssues] of Array.from(issuesByPage.entries())) {
      try {
        await this.fixPageIssues(pageUrl, pageIssues);
        successfulPages.push(pageUrl);
      } catch (error) {
        failedPages.push(pageUrl);
        errors[pageUrl] = error instanceof Error ? error.message : 'Unknown error during auto-fix';
      }
    }

    // Store operation for potential rollback
    const operation: BulkUpdateOperation = {
      id: operationId,
      type: 'meta_update',
      pages: [...successfulPages, ...failedPages],
      changes: { autoFixedIssues: issues.filter(i => i.autoFixable) },
      status: failedPages.length === 0 ? 'completed' : 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
      errors: Object.keys(errors).length > 0 ? Object.values(errors) : undefined
    };

    this.bulkOperations.set(operationId, operation);

    return {
      operationId,
      successfulPages,
      failedPages,
      errors,
      rollbackAvailable: this.config.rollbackEnabled
    };
  }

  /**
   * Generates critical issue alert message
   * @param issues - Array of critical issues
   * @returns Formatted alert message
   */
  generateCriticalIssueAlert(issues: SEOIssue[]): string {
    const criticalIssues = issues.filter(issue => issue.severity === 'critical');
    
    if (criticalIssues.length === 0) {
      return '';
    }

    const alertLines = [
      '🚨 CRITICAL SEO ISSUES DETECTED 🚨',
      '',
      `Found ${criticalIssues.length} critical SEO issues that require immediate attention:`,
      ''
    ];

    // Group issues by type for better readability
    const issuesByType = new Map<string, SEOIssue[]>();
    criticalIssues.forEach(issue => {
      const typeIssues = issuesByType.get(issue.issueType) || [];
      typeIssues.push(issue);
      issuesByType.set(issue.issueType, typeIssues);
    });

    for (const [issueType, typeIssues] of Array.from(issuesByType.entries())) {
      alertLines.push(`${this.getIssueTypeDisplayName(issueType)} (${typeIssues.length} pages):`);
      typeIssues.slice(0, 5).forEach((issue: SEOIssue) => { // Show max 5 examples
        alertLines.push(`  • ${issue.pageUrl}: ${issue.description}`);
      });
      if (typeIssues.length > 5) {
        alertLines.push(`  • ... and ${typeIssues.length - 5} more pages`);
      }
      alertLines.push('');
    }

    alertLines.push('RECOMMENDED ACTIONS:');
    const autoFixableCount = criticalIssues.filter(i => i.autoFixable).length;
    if (autoFixableCount > 0) {
      alertLines.push(`• ${autoFixableCount} issues can be auto-fixed`);
    }
    
    const manualFixCount = criticalIssues.length - autoFixableCount;
    if (manualFixCount > 0) {
      alertLines.push(`• ${manualFixCount} issues require manual intervention`);
    }

    return alertLines.join('\n');
  }

  /**
   * Sends alert notification
   * @param alert - Alert message to send
   */
  async sendAlert(alert: string): Promise<void> {
    if (!this.config.alertingEnabled || !alert) {
      return;
    }

    // In a real implementation, this would send to email, Slack, etc.
    console.error('SEO ALERT:', alert);
    
    // Could integrate with external alerting systems:
    // - Email notifications
    // - Slack webhooks
    // - SMS alerts
    // - Dashboard notifications
  }

  /**
   * Generates comprehensive SEO report
   * @param pages - Pages to include in the report
   * @returns Detailed SEO report
   */
  generateSEOReport(pages: SEOPage[]): SEOReport {
    const healthChecks = this.performBulkHealthCheck(pages);
    const allIssues = healthChecks.flatMap(check => check.issues);
    
    const criticalIssues = allIssues.filter(issue => issue.severity === 'critical').length;
    const warningIssues = allIssues.filter(issue => issue.severity === 'warning').length;
    const infoIssues = allIssues.filter(issue => issue.severity === 'info').length;
    
    const overallScore = this.calculateOverallScore(healthChecks);
    const recommendations = this.generateRecommendations(healthChecks);

    return {
      generatedAt: new Date(),
      totalPages: pages.length,
      healthChecks,
      overallScore,
      criticalIssues,
      warningIssues,
      infoIssues,
      recommendations
    };
  }

  /**
   * Generates improvement recommendations based on health checks
   * @param healthChecks - Array of health check results
   * @returns Array of recommendation strings
   */
  generateRecommendations(healthChecks: SEOHealthCheck[]): string[] {
    const recommendations: string[] = [];
    const allIssues = healthChecks.flatMap(check => check.issues);
    
    // Analyze issue patterns
    const issueTypeCounts = new Map<string, number>();
    allIssues.forEach(issue => {
      issueTypeCounts.set(issue.issueType, (issueTypeCounts.get(issue.issueType) || 0) + 1);
    });

    // Generate recommendations based on most common issues
    const sortedIssueTypes = Array.from(issueTypeCounts.entries())
      .sort(([, a], [, b]) => b - a);

    sortedIssueTypes.forEach(([issueType, count]) => {
      const percentage = Math.round((count / healthChecks.length) * 100);
      
      switch (issueType) {
        case 'missing_h1':
          recommendations.push(`${percentage}% of pages are missing H1 tags. Implement automated H1 generation from page titles.`);
          break;
        case 'missing_meta':
          recommendations.push(`${percentage}% of pages have meta description issues. Review and optimize meta descriptions for 150-160 character length.`);
          break;
        case 'low_word_count':
          recommendations.push(`${percentage}% of pages have insufficient content. Add more relevant, valuable content to reach minimum 300 words per page.`);
          break;
        case 'orphan_page':
          recommendations.push(`${percentage}% of pages have insufficient internal linking. Implement automated internal link generation to improve site structure.`);
          break;
        case 'missing_canonical':
          recommendations.push(`${percentage}% of pages are missing canonical URLs. Implement canonical tag generation to prevent duplicate content issues.`);
          break;
        case 'poor_keyword_density':
          recommendations.push(`${percentage}% of pages have poor keyword optimization. Review content strategy and keyword targeting.`);
          break;
      }
    });

    // Add general recommendations based on overall performance
    const avgScore = healthChecks.reduce((sum, check) => sum + check.score, 0) / healthChecks.length;
    
    if (avgScore < 60) {
      recommendations.push('Overall SEO performance is below average. Consider implementing a comprehensive SEO audit and optimization strategy.');
    } else if (avgScore < 80) {
      recommendations.push('SEO performance is moderate. Focus on addressing the most common issues to improve overall scores.');
    } else {
      recommendations.push('SEO performance is good. Continue monitoring and maintain current optimization practices.');
    }

    return recommendations;
  }

  /**
   * Processes bulk update operations with data integrity checks
   * @param operation - The bulk update operation to process
   * @returns Result of the bulk operation
   */
  async processBulkUpdate(operation: BulkUpdateOperation): Promise<BulkUpdateResult> {
    const operationId = operation.id;
    const successfulPages: string[] = [];
    const failedPages: string[] = [];
    const errors: Record<string, string> = {};

    try {
      // Store operation for tracking
      operation.status = 'in_progress';
      this.bulkOperations.set(operationId, operation);

      // Process pages in batches to avoid overwhelming the system
      const batchSize = this.config.bulkUpdateBatchSize;
      const batches = this.chunkArray(operation.pages, batchSize);

      for (const batch of batches) {
        for (const pageUrl of batch) {
          try {
            // Validate data integrity before processing
            if (!this.validatePageUrl(pageUrl)) {
              throw new Error('Invalid page URL format');
            }

            // Apply changes based on operation type
            await this.applyBulkChanges(pageUrl, operation.type, operation.changes);
            successfulPages.push(pageUrl);
          } catch (error) {
            failedPages.push(pageUrl);
            errors[pageUrl] = error instanceof Error ? error.message : 'Unknown error';
          }
        }
      }

      // Update operation status
      operation.status = failedPages.length === 0 ? 'completed' : 'completed';
      operation.completedAt = new Date();
      operation.errors = Object.keys(errors).length > 0 ? Object.values(errors) : undefined;

      return {
        operationId,
        successfulPages,
        failedPages,
        errors,
        rollbackAvailable: this.config.rollbackEnabled
      };
    } catch (error) {
      // Mark operation as failed
      operation.status = 'failed';
      operation.completedAt = new Date();
      operation.errors = [error instanceof Error ? error.message : 'Unknown error'];

      return {
        operationId,
        successfulPages: [],
        failedPages: operation.pages,
        errors: { 'bulk-operation': error instanceof Error ? error.message : 'Unknown error' },
        rollbackAvailable: false
      };
    }
  }

  /**
   * Rolls back a bulk update operation
   * @param operationId - ID of the operation to rollback
   * @returns Result of the rollback operation
   */
  async rollbackBulkUpdate(operationId: string): Promise<BulkUpdateResult> {
    const operation = this.bulkOperations.get(operationId);
    
    if (!operation) {
      return {
        operationId,
        successfulPages: [],
        failedPages: [],
        errors: { 'rollback': 'Operation not found or not eligible for rollback' },
        rollbackAvailable: false
      };
    }

    if (!this.config.rollbackEnabled) {
      return {
        operationId,
        successfulPages: [],
        failedPages: operation.pages,
        errors: { 'rollback': 'Rollback is disabled in configuration' },
        rollbackAvailable: false
      };
    }

    try {
      // Create rollback operation
      const rollbackOperationId = `rollback-${operationId}-${Date.now()}`;
      const successfulPages: string[] = [];
      const failedPages: string[] = [];
      const errors: Record<string, string> = {};

      // Reverse the changes made by the original operation
      for (const pageUrl of operation.pages) {
        try {
          await this.rollbackPageChanges(pageUrl, operation.type, operation.changes);
          successfulPages.push(pageUrl);
        } catch (error) {
          failedPages.push(pageUrl);
          errors[pageUrl] = error instanceof Error ? error.message : 'Rollback failed';
        }
      }

      // Mark original operation as rolled back
      operation.status = 'rolled_back';
      
      return {
        operationId: rollbackOperationId,
        successfulPages,
        failedPages,
        errors,
        rollbackAvailable: false // Can't rollback a rollback
      };
    } catch (error) {
      return {
        operationId,
        successfulPages: [],
        failedPages: operation.pages,
        errors: { 'rollback': error instanceof Error ? error.message : 'Rollback failed' },
        rollbackAvailable: false
      };
    }
  }

  /**
   * Validates data integrity across pages
   * @param pages - Pages to validate
   * @returns True if data integrity is maintained
   */
  validateDataIntegrity(pages: SEOPage[]): boolean {
    try {
      // Check for duplicate URLs
      const urls = new Set<string>();
      for (const page of pages) {
        if (urls.has(page.url)) {
          return false; // Duplicate URL found
        }
        urls.add(page.url);
      }

      // Check for duplicate titles and meta descriptions
      const titles = new Set<string>();
      const metaDescriptions = new Set<string>();
      
      for (const page of pages) {
        if (page.title && titles.has(page.title)) {
          return false; // Duplicate title found
        }
        if (page.metaDescription && metaDescriptions.has(page.metaDescription)) {
          return false; // Duplicate meta description found
        }
        
        if (page.title) titles.add(page.title);
        if (page.metaDescription) metaDescriptions.add(page.metaDescription);
      }

      // Validate required fields
      for (const page of pages) {
        if (!page.url || !page.title) {
          return false; // Missing required fields
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Starts automated health check scheduler
   */
  startHealthCheckScheduler(): void {
    if (this.healthCheckTimer) {
      this.stopHealthCheckScheduler();
    }

    const intervalMs = this.config.healthCheckInterval * 60 * 60 * 1000; // Convert hours to milliseconds
    
    this.healthCheckTimer = setInterval(async () => {
      try {
        // This would typically load all pages from the system
        // For now, we'll just log that the health check would run
        console.log(`Automated SEO health check scheduled to run every ${this.config.healthCheckInterval} hours`);
        
        // In a real implementation:
        // const allPages = await this.loadAllPages();
        // const report = this.generateSEOReport(allPages);
        // const criticalIssues = report.healthChecks.flatMap(check => 
        //   check.issues.filter(issue => issue.severity === 'critical')
        // );
        // 
        // if (criticalIssues.length > 0) {
        //   const alert = this.generateCriticalIssueAlert(criticalIssues);
        //   await this.sendAlert(alert);
        // }
      } catch (error) {
        console.error('Error during scheduled health check:', error);
      }
    }, intervalMs);
  }

  /**
   * Stops automated health check scheduler
   */
  stopHealthCheckScheduler(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = undefined;
    }
  }

  // Private helper methods

  /**
   * Calculates health score for a page based on issues
   */
  private calculateHealthScore(page: SEOPage, issues: SEOIssue[]): number {
    let score = 100;
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 5;
          break;
      }
    });

    return Math.max(0, score);
  }

  /**
   * Generates page-specific recommendations
   */
  private generatePageRecommendations(page: SEOPage, issues: SEOIssue[]): string[] {
    const recommendations: string[] = [];
    
    issues.forEach(issue => {
      if (issue.fixAction) {
        recommendations.push(issue.fixAction);
      }
    });

    // Add general recommendations based on page analysis
    if ((page.seoScore || 0) < 80) {
      recommendations.push('Consider comprehensive SEO optimization to improve overall page score');
    }

    if (!page.openGraphTags?.title || !page.openGraphTags?.description) {
      recommendations.push('Add Open Graph tags for better social media sharing');
    }

    if (!page.twitterCardTags?.title || !page.twitterCardTags?.description) {
      recommendations.push('Add Twitter Card tags for better Twitter sharing');
    }

    return recommendations;
  }

  /**
   * Fixes issues for a specific page
   */
  private async fixPageIssues(pageUrl: string, issues: SEOIssue[]): Promise<void> {
    // In a real implementation, this would interact with the page data store
    // For now, we'll simulate the fix operations
    
    for (const issue of issues) {
      switch (issue.issueType) {
        case 'missing_h1':
          // Generate H1 from title
          console.log(`Fixed missing H1 for ${pageUrl}`);
          break;
        case 'missing_meta':
          // Generate meta description
          console.log(`Fixed missing meta description for ${pageUrl}`);
          break;
        case 'missing_canonical':
          // Set canonical URL
          console.log(`Fixed missing canonical URL for ${pageUrl}`);
          break;
        case 'orphan_page':
          // Generate internal links
          console.log(`Fixed orphan page issue for ${pageUrl}`);
          break;
      }
    }
  }

  /**
   * Gets display name for issue type
   */
  private getIssueTypeDisplayName(issueType: string): string {
    const displayNames: Record<string, string> = {
      'missing_h1': 'Missing H1 Tags',
      'low_word_count': 'Low Word Count',
      'missing_meta': 'Meta Description Issues',
      'orphan_page': 'Insufficient Internal Links',
      'slow_loading': 'Slow Loading Pages',
      'duplicate_content': 'Duplicate Content',
      'missing_canonical': 'Missing Canonical URLs',
      'poor_keyword_density': 'Poor Keyword Optimization'
    };
    
    return displayNames[issueType] || issueType;
  }

  /**
   * Calculates overall score from health checks
   */
  private calculateOverallScore(healthChecks: SEOHealthCheck[]): number {
    if (healthChecks.length === 0) return 0;
    
    const totalScore = healthChecks.reduce((sum, check) => sum + check.score, 0);
    return Math.round(totalScore / healthChecks.length);
  }

  /**
   * Splits array into chunks of specified size
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Validates page URL format
   */
  private validatePageUrl(url: string): boolean {
    try {
      // Check if it's a valid URL format
      if (!url || typeof url !== 'string' || url.trim().length === 0) {
        return false;
      }
      
      // If it starts with http/https, validate as absolute URL
      if (url.startsWith('http://') || url.startsWith('https://')) {
        new URL(url);
        return true;
      }
      
      // If it starts with /, validate as relative URL
      if (url.startsWith('/')) {
        return url.length > 1 && !url.includes('..') && !url.includes('//');
      }
      
      // For other cases like "invalid-url", return false
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Applies bulk changes to a page
   */
  private async applyBulkChanges(pageUrl: string, operationType: string, changes: Record<string, any>): Promise<void> {
    // In a real implementation, this would update the actual page data
    console.log(`Applied ${operationType} changes to ${pageUrl}:`, changes);
  }

  /**
   * Rolls back changes for a page
   */
  private async rollbackPageChanges(pageUrl: string, operationType: string, changes: Record<string, any>): Promise<void> {
    // In a real implementation, this would revert the page data
    console.log(`Rolled back ${operationType} changes for ${pageUrl}:`, changes);
  }
}