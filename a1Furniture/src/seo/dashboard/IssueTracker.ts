// Issue Tracking and Resolution Monitoring System

import { SEOIssue, SEOHealthCheck, SEOPage } from '../types';

export interface TrackedIssue extends SEOIssue {
  id: string;
  firstDetected: Date;
  lastSeen: Date;
  occurrenceCount: number;
  resolutionAttempts: ResolutionAttempt[];
  status: 'open' | 'in_progress' | 'resolved' | 'ignored';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  notes: string[];
}

export interface ResolutionAttempt {
  id: string;
  timestamp: Date;
  method: 'auto_fix' | 'manual_fix' | 'bulk_update' | 'script_execution';
  description: string;
  success: boolean;
  errorMessage?: string;
  performedBy: 'system' | string; // 'system' for automated, or user identifier
}

export interface IssueMetrics {
  totalIssues: number;
  openIssues: number;
  resolvedIssues: number;
  criticalIssues: number;
  averageResolutionTime: number; // in hours
  resolutionRate: number; // percentage
  topIssueTypes: [string, number][];
  issuesByPage: Map<string, TrackedIssue[]>;
}

export interface IssueFilter {
  severity?: 'critical' | 'warning' | 'info';
  status?: 'open' | 'in_progress' | 'resolved' | 'ignored';
  issueType?: string;
  pageUrl?: string;
  assignedTo?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}

export class IssueTracker {
  private trackedIssues: Map<string, TrackedIssue> = new Map();
  private issueHistory: TrackedIssue[] = [];
  private nextIssueId = 1;

  /**
   * Updates tracked issues based on current health check results
   * @param healthChecks - Current health check results
   * @returns Updated issue metrics
   */
  updateIssues(healthChecks: SEOHealthCheck[]): IssueMetrics {
    const currentIssues = new Map<string, SEOIssue>();
    const now = new Date();

    // Collect all current issues with unique identifiers
    healthChecks.forEach(check => {
      check.issues.forEach(issue => {
        const issueKey = this.generateIssueKey(issue);
        currentIssues.set(issueKey, issue);
      });
    });

    // Update existing issues and mark resolved ones
    for (const [issueKey, trackedIssue] of Array.from(this.trackedIssues.entries())) {
      if (currentIssues.has(issueKey)) {
        // Issue still exists - update last seen and occurrence count
        trackedIssue.lastSeen = now;
        trackedIssue.occurrenceCount++;
      } else if (trackedIssue.status === 'open' || trackedIssue.status === 'in_progress') {
        // Issue no longer exists - mark as resolved
        this.resolveIssue(issueKey, {
          id: this.generateResolutionId(),
          timestamp: now,
          method: 'auto_fix',
          description: 'Issue automatically resolved - no longer detected in health checks',
          success: true,
          performedBy: 'system'
        });
      }
    }

    // Add new issues
    for (const [issueKey, issue] of Array.from(currentIssues.entries())) {
      if (!this.trackedIssues.has(issueKey)) {
        const trackedIssue: TrackedIssue = {
          ...issue,
          id: this.generateIssueId(),
          firstDetected: now,
          lastSeen: now,
          occurrenceCount: 1,
          resolutionAttempts: [],
          status: 'open',
          priority: this.calculateIssuePriority(issue),
          tags: this.generateIssueTags(issue),
          notes: []
        };
        
        this.trackedIssues.set(issueKey, trackedIssue);
      }
    }

    return this.calculateMetrics();
  }

  /**
   * Records a resolution attempt for an issue
   * @param issueId - ID of the issue
   * @param attempt - Resolution attempt details
   * @returns Success status
   */
  recordResolutionAttempt(issueId: string, attempt: Omit<ResolutionAttempt, 'id'>): boolean {
    const issue = this.findIssueById(issueId);
    if (!issue) {
      return false;
    }

    const resolutionAttempt: ResolutionAttempt = {
      ...attempt,
      id: this.generateResolutionId()
    };

    issue.resolutionAttempts.push(resolutionAttempt);
    
    if (attempt.success) {
      issue.status = 'resolved';
    } else {
      issue.status = 'in_progress';
    }

    return true;
  }

  /**
   * Resolves an issue
   * @param issueKey - Key of the issue to resolve
   * @param resolution - Resolution details
   */
  private resolveIssue(issueKey: string, resolution: ResolutionAttempt): void {
    const issue = this.trackedIssues.get(issueKey);
    if (issue) {
      issue.status = 'resolved';
      issue.resolutionAttempts.push(resolution);
      
      // Move to history for long-term tracking
      this.issueHistory.push({ ...issue });
    }
  }

  /**
   * Gets filtered list of tracked issues
   * @param filter - Filter criteria
   * @returns Filtered issues
   */
  getIssues(filter?: IssueFilter): TrackedIssue[] {
    let issues = Array.from(this.trackedIssues.values());

    if (!filter) {
      return issues;
    }

    if (filter.severity) {
      issues = issues.filter(issue => issue.severity === filter.severity);
    }

    if (filter.status) {
      issues = issues.filter(issue => issue.status === filter.status);
    }

    if (filter.issueType) {
      issues = issues.filter(issue => issue.issueType === filter.issueType);
    }

    if (filter.pageUrl) {
      issues = issues.filter(issue => issue.pageUrl.includes(filter.pageUrl!));
    }

    if (filter.assignedTo) {
      issues = issues.filter(issue => issue.assignedTo === filter.assignedTo);
    }

    if (filter.dateRange) {
      issues = issues.filter(issue => 
        issue.firstDetected >= filter.dateRange!.start && 
        issue.firstDetected <= filter.dateRange!.end
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      issues = issues.filter(issue => 
        filter.tags!.some(tag => issue.tags.includes(tag))
      );
    }

    return issues;
  }

  /**
   * Gets issue by ID
   * @param issueId - Issue ID
   * @returns Tracked issue or undefined
   */
  getIssueById(issueId: string): TrackedIssue | undefined {
    return this.findIssueById(issueId);
  }

  /**
   * Updates issue status
   * @param issueId - Issue ID
   * @param status - New status
   * @param assignedTo - Optional assignee
   * @returns Success status
   */
  updateIssueStatus(issueId: string, status: TrackedIssue['status'], assignedTo?: string): boolean {
    const issue = this.findIssueById(issueId);
    if (!issue) {
      return false;
    }

    issue.status = status;
    if (assignedTo !== undefined) {
      issue.assignedTo = assignedTo;
    }

    return true;
  }

  /**
   * Adds a note to an issue
   * @param issueId - Issue ID
   * @param note - Note to add
   * @returns Success status
   */
  addIssueNote(issueId: string, note: string): boolean {
    const issue = this.findIssueById(issueId);
    if (!issue) {
      return false;
    }

    const timestampedNote = `[${new Date().toLocaleString()}] ${note}`;
    issue.notes.push(timestampedNote);
    return true;
  }

  /**
   * Adds tags to an issue
   * @param issueId - Issue ID
   * @param tags - Tags to add
   * @returns Success status
   */
  addIssueTags(issueId: string, tags: string[]): boolean {
    const issue = this.findIssueById(issueId);
    if (!issue) {
      return false;
    }

    tags.forEach(tag => {
      if (!issue.tags.includes(tag)) {
        issue.tags.push(tag);
      }
    });

    return true;
  }

  /**
   * Gets comprehensive issue metrics
   * @returns Current issue metrics
   */
  getMetrics(): IssueMetrics {
    return this.calculateMetrics();
  }

  /**
   * Gets issue trends over time
   * @param days - Number of days to analyze
   * @returns Trend data
   */
  getIssueTrends(days: number = 30): {
    date: string;
    newIssues: number;
    resolvedIssues: number;
    totalOpen: number;
  }[] {
    const trends: Map<string, { newIssues: number; resolvedIssues: number; totalOpen: number }> = new Map();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Initialize trend data for each day
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      trends.set(dateKey, { newIssues: 0, resolvedIssues: 0, totalOpen: 0 });
    }

    // Count new issues by day
    [...Array.from(this.trackedIssues.values()), ...this.issueHistory].forEach(issue => {
      const detectedDate = issue.firstDetected.toISOString().split('T')[0];
      const trendData = trends.get(detectedDate);
      if (trendData) {
        trendData.newIssues++;
      }

      // Count resolved issues
      if (issue.status === 'resolved' && issue.resolutionAttempts.length > 0) {
        const lastResolution = issue.resolutionAttempts[issue.resolutionAttempts.length - 1];
        const resolvedDate = lastResolution.timestamp.toISOString().split('T')[0];
        const resolvedTrendData = trends.get(resolvedDate);
        if (resolvedTrendData) {
          resolvedTrendData.resolvedIssues++;
        }
      }
    });

    // Calculate running total of open issues
    let runningTotal = 0;
    return Array.from(trends.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => {
        runningTotal += data.newIssues - data.resolvedIssues;
        return {
          date,
          newIssues: data.newIssues,
          resolvedIssues: data.resolvedIssues,
          totalOpen: Math.max(0, runningTotal)
        };
      });
  }

  /**
   * Gets resolution performance metrics
   * @returns Resolution performance data
   */
  getResolutionPerformance(): {
    averageResolutionTime: number;
    resolutionRateByType: Map<string, number>;
    resolutionRateBySeverity: Map<string, number>;
    mostEffectiveResolutionMethods: [string, number][];
  } {
    const resolvedIssues = [...Array.from(this.trackedIssues.values()), ...this.issueHistory]
      .filter(issue => issue.status === 'resolved');

    // Calculate average resolution time
    const resolutionTimes = resolvedIssues
      .filter(issue => issue.resolutionAttempts.length > 0)
      .map(issue => {
        const lastResolution = issue.resolutionAttempts[issue.resolutionAttempts.length - 1];
        return lastResolution.timestamp.getTime() - issue.firstDetected.getTime();
      });

    const averageResolutionTime = resolutionTimes.length > 0 
      ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length / (1000 * 60 * 60) // Convert to hours
      : 0;

    // Resolution rate by issue type
    const resolutionRateByType = new Map<string, number>();
    const issueTypeGroups = new Map<string, { total: number; resolved: number }>();

    [...Array.from(this.trackedIssues.values()), ...this.issueHistory].forEach(issue => {
      const group = issueTypeGroups.get(issue.issueType) || { total: 0, resolved: 0 };
      group.total++;
      if (issue.status === 'resolved') {
        group.resolved++;
      }
      issueTypeGroups.set(issue.issueType, group);
    });

    issueTypeGroups.forEach((group, issueType) => {
      resolutionRateByType.set(issueType, (group.resolved / group.total) * 100);
    });

    // Resolution rate by severity
    const resolutionRateBySeverity = new Map<string, number>();
    const severityGroups = new Map<string, { total: number; resolved: number }>();

    [...Array.from(this.trackedIssues.values()), ...this.issueHistory].forEach(issue => {
      const group = severityGroups.get(issue.severity) || { total: 0, resolved: 0 };
      group.total++;
      if (issue.status === 'resolved') {
        group.resolved++;
      }
      severityGroups.set(issue.severity, group);
    });

    severityGroups.forEach((group, severity) => {
      resolutionRateBySeverity.set(severity, (group.resolved / group.total) * 100);
    });

    // Most effective resolution methods
    const methodCounts = new Map<string, number>();
    resolvedIssues.forEach(issue => {
      issue.resolutionAttempts
        .filter(attempt => attempt.success)
        .forEach(attempt => {
          methodCounts.set(attempt.method, (methodCounts.get(attempt.method) || 0) + 1);
        });
    });

    const mostEffectiveResolutionMethods = Array.from(methodCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      averageResolutionTime,
      resolutionRateByType,
      resolutionRateBySeverity,
      mostEffectiveResolutionMethods
    };
  }

  /**
   * Exports issue data for external analysis
   * @param format - Export format
   * @returns Exported data
   */
  exportIssueData(format: 'json' | 'csv'): string {
    const issues = Array.from(this.trackedIssues.values());

    if (format === 'json') {
      return JSON.stringify({
        exportedAt: new Date().toISOString(),
        totalIssues: issues.length,
        issues: issues.map(issue => ({
          ...issue,
          resolutionTime: issue.status === 'resolved' && issue.resolutionAttempts.length > 0
            ? issue.resolutionAttempts[issue.resolutionAttempts.length - 1].timestamp.getTime() - issue.firstDetected.getTime()
            : null
        }))
      }, null, 2);
    }

    if (format === 'csv') {
      const headers = [
        'ID', 'Page URL', 'Issue Type', 'Severity', 'Status', 'Priority',
        'First Detected', 'Last Seen', 'Occurrence Count', 'Resolution Attempts',
        'Assigned To', 'Tags', 'Description'
      ];

      const rows = issues.map(issue => [
        issue.id,
        issue.pageUrl,
        issue.issueType,
        issue.severity,
        issue.status,
        issue.priority,
        issue.firstDetected.toISOString(),
        issue.lastSeen.toISOString(),
        issue.occurrenceCount,
        issue.resolutionAttempts.length,
        issue.assignedTo || '',
        issue.tags.join(';'),
        issue.description
      ]);

      return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
    }

    return '';
  }

  // Private helper methods

  /**
   * Generates a unique key for an issue
   * @param issue - SEO issue
   * @returns Unique issue key
   */
  private generateIssueKey(issue: SEOIssue): string {
    return `${issue.pageUrl}:${issue.issueType}:${issue.severity}`;
  }

  /**
   * Generates a unique issue ID
   * @returns Unique issue ID
   */
  private generateIssueId(): string {
    return `issue-${this.nextIssueId++}`;
  }

  /**
   * Generates a unique resolution ID
   * @returns Unique resolution ID
   */
  private generateResolutionId(): string {
    return `resolution-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Finds an issue by ID
   * @param issueId - Issue ID
   * @returns Tracked issue or undefined
   */
  private findIssueById(issueId: string): TrackedIssue | undefined {
    for (const issue of Array.from(this.trackedIssues.values())) {
      if (issue.id === issueId) {
        return issue;
      }
    }
    return undefined;
  }

  /**
   * Calculates issue priority based on severity and type
   * @param issue - SEO issue
   * @returns Calculated priority
   */
  private calculateIssuePriority(issue: SEOIssue): TrackedIssue['priority'] {
    if (issue.severity === 'critical') {
      return 'critical';
    }
    
    if (issue.severity === 'warning') {
      // High priority for certain warning types
      if (['missing_h1', 'missing_meta', 'orphan_page'].includes(issue.issueType)) {
        return 'high';
      }
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Generates relevant tags for an issue
   * @param issue - SEO issue
   * @returns Array of tags
   */
  private generateIssueTags(issue: SEOIssue): string[] {
    const tags: string[] = [];
    
    // Add severity tag
    tags.push(issue.severity);
    
    // Add category tags based on issue type
    if (['missing_h1', 'missing_meta'].includes(issue.issueType)) {
      tags.push('meta-tags');
    }
    
    if (['orphan_page', 'broken_links'].includes(issue.issueType)) {
      tags.push('internal-linking');
    }
    
    if (['low_word_count', 'duplicate_content'].includes(issue.issueType)) {
      tags.push('content-quality');
    }
    
    if (['slow_loading', 'poor_core_web_vitals'].includes(issue.issueType)) {
      tags.push('performance');
    }
    
    // Add auto-fixable tag
    if (issue.autoFixable) {
      tags.push('auto-fixable');
    }
    
    return tags;
  }

  /**
   * Calculates comprehensive issue metrics
   * @returns Current metrics
   */
  private calculateMetrics(): IssueMetrics {
    const issues = Array.from(this.trackedIssues.values());
    const resolvedIssues = this.issueHistory.filter(issue => issue.status === 'resolved');
    
    const totalIssues = issues.length + resolvedIssues.length;
    const openIssues = issues.filter(issue => issue.status === 'open').length;
    const criticalIssues = issues.filter(issue => issue.severity === 'critical').length;
    
    // Calculate average resolution time
    const resolutionTimes = resolvedIssues
      .filter(issue => issue.resolutionAttempts.length > 0)
      .map(issue => {
        const lastResolution = issue.resolutionAttempts[issue.resolutionAttempts.length - 1];
        return lastResolution.timestamp.getTime() - issue.firstDetected.getTime();
      });
    
    const averageResolutionTime = resolutionTimes.length > 0 
      ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length / (1000 * 60 * 60)
      : 0;
    
    const resolutionRate = totalIssues > 0 ? (resolvedIssues.length / totalIssues) * 100 : 0;
    
    // Top issue types
    const issueTypeCounts = new Map<string, number>();
    issues.forEach(issue => {
      issueTypeCounts.set(issue.issueType, (issueTypeCounts.get(issue.issueType) || 0) + 1);
    });
    
    const topIssueTypes = Array.from(issueTypeCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
    
    // Issues by page
    const issuesByPage = new Map<string, TrackedIssue[]>();
    issues.forEach(issue => {
      const pageIssues = issuesByPage.get(issue.pageUrl) || [];
      pageIssues.push(issue);
      issuesByPage.set(issue.pageUrl, pageIssues);
    });
    
    return {
      totalIssues,
      openIssues,
      resolvedIssues: resolvedIssues.length,
      criticalIssues,
      averageResolutionTime,
      resolutionRate,
      topIssueTypes,
      issuesByPage
    };
  }
}

export default IssueTracker;