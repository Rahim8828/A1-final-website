// SEO Dashboard and Monitoring System - Main Export

export { SEOReportGenerator } from './SEOReportGenerator';
export { IssueTracker } from './IssueTracker';
export { PerformanceTracker } from './PerformanceTracker';
export { RecommendationEngine } from './RecommendationEngine';

export type {
  DailyReportConfig,
  ReportScheduler
} from './SEOReportGenerator';

export type {
  TrackedIssue,
  ResolutionAttempt,
  IssueMetrics,
  IssueFilter
} from './IssueTracker';

export type {
  CoreWebVitalsMetrics,
  SEOPerformanceMetrics,
  PerformanceTrend,
  PerformanceAlert,
  PerformanceThresholds
} from './PerformanceTracker';

export type {
  SEORecommendation,
  RecommendationFilter,
  RecommendationMetrics
} from './RecommendationEngine';

// Main dashboard integration class
import { SEOMonitor } from '../managers/SEOMonitor';
import { SEOPage, SEOMonitorConfig } from '../types';
import { SEOReportGenerator, DailyReportConfig } from './SEOReportGenerator';
import { IssueTracker } from './IssueTracker';
import { PerformanceTracker, PerformanceThresholds } from './PerformanceTracker';
import { RecommendationEngine } from './RecommendationEngine';

export interface SEODashboardConfig {
  seoMonitor: SEOMonitorConfig;
  dailyReport: DailyReportConfig;
  performanceThresholds: PerformanceThresholds;
}

export class SEODashboardSystem {
  private seoMonitor: SEOMonitor;
  private reportGenerator: SEOReportGenerator;
  private issueTracker: IssueTracker;
  private performanceTracker: PerformanceTracker;
  private recommendationEngine: RecommendationEngine;

  constructor(config: SEODashboardConfig) {
    this.seoMonitor = new SEOMonitor(config.seoMonitor);
    this.reportGenerator = new SEOReportGenerator(this.seoMonitor, config.dailyReport);
    this.issueTracker = new IssueTracker();
    this.performanceTracker = new PerformanceTracker(config.performanceThresholds);
    this.recommendationEngine = new RecommendationEngine();
  }

  /**
   * Performs comprehensive SEO analysis and updates all tracking systems
   * @param pages - Pages to analyze
   * @returns Complete dashboard data
   */
  async performComprehensiveAnalysis(pages: SEOPage[]) {
    // Generate SEO report
    const report = this.seoMonitor.generateSEOReport(pages);
    
    // Update issue tracking
    const issueMetrics = this.issueTracker.updateIssues(report.healthChecks);
    
    // Generate recommendations
    const recommendations = this.recommendationEngine.generateRecommendations(
      report,
      issueMetrics,
      this.performanceTracker
    );

    return {
      report,
      issueMetrics,
      recommendations,
      performanceSummary: this.performanceTracker.getPerformanceSummary(),
      recommendationMetrics: this.recommendationEngine.getRecommendationMetrics()
    };
  }

  /**
   * Starts automated monitoring and reporting
   * @param getPages - Function to retrieve current pages
   */
  startAutomatedMonitoring(getPages: () => Promise<SEOPage[]>) {
    // Start health check scheduler
    this.seoMonitor.startHealthCheckScheduler();
    
    // Start daily report scheduler
    this.reportGenerator.startDailyReportScheduler(getPages);
  }

  /**
   * Stops automated monitoring and reporting
   */
  stopAutomatedMonitoring() {
    this.seoMonitor.stopHealthCheckScheduler();
    this.reportGenerator.stopDailyReportScheduler();
  }

  /**
   * Gets all system components for direct access
   */
  getComponents() {
    return {
      seoMonitor: this.seoMonitor,
      reportGenerator: this.reportGenerator,
      issueTracker: this.issueTracker,
      performanceTracker: this.performanceTracker,
      recommendationEngine: this.recommendationEngine
    };
  }
}

export default SEODashboardSystem;