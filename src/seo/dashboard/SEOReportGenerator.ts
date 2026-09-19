// SEO Report Generator for Automated Daily Reports

import { SEOMonitor } from '../managers/SEOMonitor';
import { SEOReport, SEOHealthCheck, SEOIssue, SEOPage, SEOMonitorConfig } from '../types';

export interface DailyReportConfig {
  emailRecipients?: string[];
  slackWebhook?: string;
  reportFormat: 'html' | 'json' | 'csv' | 'pdf';
  includeDetailedIssues: boolean;
  includeRecommendations: boolean;
  includePerformanceMetrics: boolean;
  scheduledTime: string; // HH:MM format
  timezone: string;
}

export interface ReportScheduler {
  isActive: boolean;
  nextRunTime: Date;
  lastRunTime?: Date;
  intervalId?: NodeJS.Timeout;
}

export class SEOReportGenerator {
  private seoMonitor: SEOMonitor;
  private config: DailyReportConfig;
  private scheduler: ReportScheduler;

  constructor(seoMonitor: SEOMonitor, config: DailyReportConfig) {
    this.seoMonitor = seoMonitor;
    this.config = config;
    this.scheduler = {
      isActive: false,
      nextRunTime: this.calculateNextRunTime()
    };
  }

  /**
   * Generates a comprehensive daily SEO report
   * @param pages - Pages to include in the report
   * @returns Generated report in specified format
   */
  async generateDailyReport(pages: SEOPage[]): Promise<string> {
    const report = this.seoMonitor.generateSEOReport(pages);
    
    switch (this.config.reportFormat) {
      case 'html':
        return this.generateHTMLReport(report);
      case 'json':
        return this.generateJSONReport(report);
      case 'csv':
        return this.generateCSVReport(report);
      case 'pdf':
        return this.generatePDFReport(report);
      default:
        return this.generateHTMLReport(report);
    }
  }

  /**
   * Generates HTML format report
   * @param report - SEO report data
   * @returns HTML formatted report
   */
  private generateHTMLReport(report: SEOReport): string {
    const criticalIssues = report.healthChecks.flatMap(check => 
      check.issues.filter(issue => issue.severity === 'critical')
    );
    
    const warningIssues = report.healthChecks.flatMap(check => 
      check.issues.filter(issue => issue.severity === 'warning')
    );

    const topIssues = this.getTopIssueTypes(report.healthChecks);
    const lowPerformingPages = report.healthChecks
      .filter(check => check.score < 70)
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily SEO Report - ${report.generatedAt.toDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e5e5; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; border-left: 4px solid #007bff; }
        .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .stat-label { color: #666; font-size: 0.9em; }
        .critical { color: #dc3545; border-left-color: #dc3545; }
        .warning { color: #ffc107; border-left-color: #ffc107; }
        .success { color: #28a745; border-left-color: #28a745; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        .issue-list { list-style: none; padding: 0; }
        .issue-item { background: #f8f9fa; margin: 10px 0; padding: 15px; border-radius: 4px; border-left: 4px solid #dc3545; }
        .issue-item.warning { border-left-color: #ffc107; }
        .issue-item.info { border-left-color: #17a2b8; }
        .page-list { display: grid; gap: 10px; }
        .page-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 4px; }
        .score { font-weight: bold; padding: 5px 10px; border-radius: 20px; color: white; }
        .score.good { background: #28a745; }
        .score.fair { background: #ffc107; }
        .score.poor { background: #dc3545; }
        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 6px; border-left: 4px solid #007bff; }
        .recommendation-item { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
        .chart-container { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .chart-bar { display: flex; align-items: center; margin: 10px 0; }
        .chart-label { width: 150px; font-size: 0.9em; }
        .chart-bar-fill { height: 20px; background: #007bff; border-radius: 10px; margin: 0 10px; }
        .chart-value { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Daily SEO Health Report</h1>
            <p>Generated on ${report.generatedAt.toLocaleString()}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${report.totalPages}</div>
                <div class="stat-label">Total Pages</div>
            </div>
            <div class="stat-card ${report.overallScore >= 80 ? 'success' : report.overallScore >= 60 ? 'warning' : 'critical'}">
                <div class="stat-number">${report.overallScore}/100</div>
                <div class="stat-label">Average SEO Score</div>
            </div>
            <div class="stat-card critical">
                <div class="stat-number">${report.criticalIssues}</div>
                <div class="stat-label">Critical Issues</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-number">${report.warningIssues}</div>
                <div class="stat-label">Warning Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.infoIssues}</div>
                <div class="stat-label">Info Issues</div>
            </div>
        </div>

        ${criticalIssues.length > 0 ? `
        <div class="section">
            <h2>🚨 Critical Issues Requiring Immediate Attention</h2>
            <ul class="issue-list">
                ${criticalIssues.slice(0, 10).map(issue => `
                <li class="issue-item critical">
                    <strong>${issue.pageUrl}</strong><br>
                    <span style="color: #666;">${issue.description}</span>
                    ${issue.fixAction ? `<br><em>Fix: ${issue.fixAction}</em>` : ''}
                    ${issue.autoFixable ? '<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8em; margin-left: 10px;">Auto-fixable</span>' : ''}
                </li>
                `).join('')}
            </ul>
            ${criticalIssues.length > 10 ? `<p><em>... and ${criticalIssues.length - 10} more critical issues</em></p>` : ''}
        </div>
        ` : ''}

        <div class="section">
            <h2>📊 Most Common Issues</h2>
            <div class="chart-container">
                ${topIssues.map(([issueType, count]) => {
                  const percentage = Math.round((count / report.totalPages) * 100);
                  const maxCount = Math.max(...topIssues.map(([, c]) => c));
                  const barWidth = (count / maxCount) * 100;
                  return `
                  <div class="chart-bar">
                      <div class="chart-label">${issueType.replace(/_/g, ' ')}</div>
                      <div class="chart-bar-fill" style="width: ${barWidth}%;"></div>
                      <div class="chart-value">${count} (${percentage}%)</div>
                  </div>
                  `;
                }).join('')}
            </div>
        </div>

        ${lowPerformingPages.length > 0 ? `
        <div class="section">
            <h2>⚠️ Pages Needing Attention (Score < 70)</h2>
            <div class="page-list">
                ${lowPerformingPages.map(check => `
                <div class="page-item">
                    <div>
                        <strong>${check.pageUrl}</strong><br>
                        <small>${check.issues.length} issues found</small>
                    </div>
                    <div class="score ${check.score >= 60 ? 'fair' : 'poor'}">${check.score}/100</div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${this.config.includeRecommendations && report.recommendations.length > 0 ? `
        <div class="section">
            <h2>💡 SEO Recommendations</h2>
            <div class="recommendations">
                ${report.recommendations.map((rec, index) => `
                <div class="recommendation-item">
                    <strong>${index + 1}.</strong> ${rec}
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h2>📈 Summary</h2>
            <p>
                This report analyzed <strong>${report.totalPages}</strong> pages and found 
                <strong>${report.criticalIssues + report.warningIssues + report.infoIssues}</strong> total issues.
                ${report.criticalIssues > 0 ? `<strong style="color: #dc3545;">${report.criticalIssues} critical issues</strong> require immediate attention.` : 'No critical issues found.'}
            </p>
            <p>
                Overall SEO health score: <strong class="${report.overallScore >= 80 ? 'success' : report.overallScore >= 60 ? 'warning' : 'critical'}">${report.overallScore}/100</strong>
                ${report.overallScore >= 80 ? '(Excellent)' : report.overallScore >= 60 ? '(Good)' : '(Needs Improvement)'}
            </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 0.9em;">
            <p>Generated by SEO Monitoring System | Next report: ${this.scheduler.nextRunTime.toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  /**
   * Generates JSON format report
   * @param report - SEO report data
   * @returns JSON formatted report
   */
  private generateJSONReport(report: SEOReport): string {
    const reportData = {
      metadata: {
        generatedAt: report.generatedAt,
        totalPages: report.totalPages,
        overallScore: report.overallScore,
        reportFormat: 'json',
        version: '1.0'
      },
      summary: {
        criticalIssues: report.criticalIssues,
        warningIssues: report.warningIssues,
        infoIssues: report.infoIssues,
        totalIssues: report.criticalIssues + report.warningIssues + report.infoIssues
      },
      healthChecks: this.config.includeDetailedIssues ? report.healthChecks : report.healthChecks.map(check => ({
        pageUrl: check.pageUrl,
        score: check.score,
        issueCount: check.issues.length,
        timestamp: check.timestamp
      })),
      topIssues: this.getTopIssueTypes(report.healthChecks),
      recommendations: this.config.includeRecommendations ? report.recommendations : [],
      performanceMetrics: this.config.includePerformanceMetrics ? {
        averageScore: report.overallScore,
        scoreDistribution: this.getScoreDistribution(report.healthChecks),
        issueDistribution: this.getIssueDistribution(report.healthChecks)
      } : null
    };

    return JSON.stringify(reportData, null, 2);
  }

  /**
   * Generates CSV format report
   * @param report - SEO report data
   * @returns CSV formatted report
   */
  private generateCSVReport(report: SEOReport): string {
    const headers = ['Page URL', 'SEO Score', 'Critical Issues', 'Warning Issues', 'Info Issues', 'Total Issues', 'Last Checked'];
    const rows = report.healthChecks.map(check => {
      const criticalCount = check.issues.filter(i => i.severity === 'critical').length;
      const warningCount = check.issues.filter(i => i.severity === 'warning').length;
      const infoCount = check.issues.filter(i => i.severity === 'info').length;
      
      return [
        check.pageUrl,
        check.score,
        criticalCount,
        warningCount,
        infoCount,
        check.issues.length,
        check.timestamp.toISOString()
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  /**
   * Generates PDF format report (placeholder - would need PDF library)
   * @param report - SEO report data
   * @returns PDF report data
   */
  private generatePDFReport(report: SEOReport): string {
    // In a real implementation, this would use a PDF generation library like jsPDF or Puppeteer
    // For now, return HTML that could be converted to PDF
    return this.generateHTMLReport(report);
  }

  /**
   * Starts the automated daily report scheduler
   * @param pages - Function to get current pages for reporting
   */
  startDailyReportScheduler(getPages: () => Promise<SEOPage[]>): void {
    if (this.scheduler.isActive) {
      this.stopDailyReportScheduler();
    }

    const scheduleNextReport = () => {
      const now = new Date();
      const nextRun = this.calculateNextRunTime();
      const timeUntilNext = nextRun.getTime() - now.getTime();

      this.scheduler.nextRunTime = nextRun;
      this.scheduler.intervalId = setTimeout(async () => {
        try {
          await this.runScheduledReport(getPages);
          scheduleNextReport(); // Schedule the next report
        } catch (error) {
          console.error('Error running scheduled SEO report:', error);
          scheduleNextReport(); // Continue scheduling even if one report fails
        }
      }, timeUntilNext);
    };

    this.scheduler.isActive = true;
    scheduleNextReport();
  }

  /**
   * Stops the automated daily report scheduler
   */
  stopDailyReportScheduler(): void {
    if (this.scheduler.intervalId) {
      clearTimeout(this.scheduler.intervalId);
      this.scheduler.intervalId = undefined;
    }
    this.scheduler.isActive = false;
  }

  /**
   * Runs a scheduled report
   * @param getPages - Function to get current pages
   */
  private async runScheduledReport(getPages: () => Promise<SEOPage[]>): Promise<void> {
    try {
      const pages = await getPages();
      const reportContent = await this.generateDailyReport(pages);
      
      // Send report via configured channels
      await this.sendReport(reportContent);
      
      this.scheduler.lastRunTime = new Date();
      console.log(`Daily SEO report generated and sent at ${this.scheduler.lastRunTime.toLocaleString()}`);
    } catch (error) {
      console.error('Failed to generate or send daily SEO report:', error);
      throw error;
    }
  }

  /**
   * Sends the report via configured channels
   * @param reportContent - Generated report content
   */
  private async sendReport(reportContent: string): Promise<void> {
    const promises: Promise<void>[] = [];

    // Send via email (placeholder - would need email service integration)
    if (this.config.emailRecipients && this.config.emailRecipients.length > 0) {
      promises.push(this.sendEmailReport(reportContent));
    }

    // Send via Slack (placeholder - would need Slack integration)
    if (this.config.slackWebhook) {
      promises.push(this.sendSlackReport(reportContent));
    }

    // Save to file system
    promises.push(this.saveReportToFile(reportContent));

    await Promise.all(promises);
  }

  /**
   * Sends report via email (placeholder implementation)
   * @param reportContent - Report content to send
   */
  private async sendEmailReport(reportContent: string): Promise<void> {
    // In a real implementation, this would integrate with an email service like SendGrid, AWS SES, etc.
    console.log('Email report would be sent to:', this.config.emailRecipients);
    console.log('Report content length:', reportContent.length);
  }

  /**
   * Sends report via Slack (placeholder implementation)
   * @param reportContent - Report content to send
   */
  private async sendSlackReport(reportContent: string): Promise<void> {
    // In a real implementation, this would send to Slack webhook
    console.log('Slack report would be sent to:', this.config.slackWebhook);
    
    // For Slack, we'd typically send a summary with a link to the full report
    const report = JSON.parse(this.generateJSONReport(JSON.parse(reportContent)));
    const slackMessage = {
      text: `Daily SEO Report - ${new Date().toDateString()}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Daily SEO Health Report*\n*Overall Score:* ${report.metadata.overallScore}/100\n*Critical Issues:* ${report.summary.criticalIssues}\n*Total Pages:* ${report.metadata.totalPages}`
          }
        }
      ]
    };
    
    console.log('Slack message:', JSON.stringify(slackMessage, null, 2));
  }

  /**
   * Saves report to file system
   * @param reportContent - Report content to save
   */
  private async saveReportToFile(reportContent: string): Promise<void> {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `seo-report-${timestamp}.${this.config.reportFormat}`;
    
    // In a real implementation, this would save to a configured directory
    console.log(`Report saved as: ${filename}`);
    console.log('Report content preview:', reportContent.substring(0, 200) + '...');
  }

  /**
   * Calculates the next scheduled run time
   * @returns Next run time as Date
   */
  private calculateNextRunTime(): Date {
    const now = new Date();
    const [hours, minutes] = this.config.scheduledTime.split(':').map(Number);
    
    const nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);
    
    // If the scheduled time has already passed today, schedule for tomorrow
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    return nextRun;
  }

  /**
   * Gets the top issue types from health checks
   * @param healthChecks - Array of health check results
   * @returns Array of [issueType, count] tuples sorted by count
   */
  private getTopIssueTypes(healthChecks: SEOHealthCheck[]): [string, number][] {
    const issueTypeCounts = new Map<string, number>();
    
    healthChecks.forEach(check => {
      check.issues.forEach(issue => {
        issueTypeCounts.set(issue.issueType, (issueTypeCounts.get(issue.issueType) || 0) + 1);
      });
    });

    return Array.from(issueTypeCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  }

  /**
   * Gets score distribution for performance metrics
   * @param healthChecks - Array of health check results
   * @returns Score distribution object
   */
  private getScoreDistribution(healthChecks: SEOHealthCheck[]): Record<string, number> {
    const distribution = { excellent: 0, good: 0, fair: 0, poor: 0 };
    
    healthChecks.forEach(check => {
      if (check.score >= 90) distribution.excellent++;
      else if (check.score >= 70) distribution.good++;
      else if (check.score >= 50) distribution.fair++;
      else distribution.poor++;
    });
    
    return distribution;
  }

  /**
   * Gets issue distribution by severity
   * @param healthChecks - Array of health check results
   * @returns Issue distribution by severity
   */
  private getIssueDistribution(healthChecks: SEOHealthCheck[]): Record<string, number> {
    const distribution = { critical: 0, warning: 0, info: 0 };
    
    healthChecks.forEach(check => {
      check.issues.forEach(issue => {
        distribution[issue.severity]++;
      });
    });
    
    return distribution;
  }

  /**
   * Updates the report configuration
   * @param newConfig - New configuration to apply
   */
  updateConfig(newConfig: Partial<DailyReportConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // If scheduler is active and time changed, restart it
    if (this.scheduler.isActive && newConfig.scheduledTime) {
      // Would need to restart with new time - implementation depends on how getPages is provided
      console.log('Report schedule updated. Restart scheduler to apply new time.');
    }
  }

  /**
   * Gets current scheduler status
   * @returns Current scheduler information
   */
  getSchedulerStatus(): ReportScheduler {
    return { ...this.scheduler };
  }
}

export default SEOReportGenerator;