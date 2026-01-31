// Performance Metrics Tracking for Core Web Vitals and SEO Performance

export interface CoreWebVitalsMetrics {
  url: string;
  timestamp: Date;
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift (score)
  fcp: number; // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
  tbt: number; // Total Blocking Time (ms)
}

export interface SEOPerformanceMetrics {
  url: string;
  timestamp: Date;
  seoScore: number;
  loadTime: number;
  mobileScore: number;
  desktopScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  pwaScore: number;
}

export interface PerformanceTrend {
  date: string;
  averageLCP: number;
  averageFID: number;
  averageCLS: number;
  averageSEOScore: number;
  pagesAnalyzed: number;
}

export interface PerformanceAlert {
  id: string;
  timestamp: Date;
  type: 'core_web_vitals' | 'seo_score' | 'load_time' | 'mobile_performance';
  severity: 'warning' | 'critical';
  message: string;
  affectedPages: string[];
  threshold: number;
  actualValue: number;
  resolved: boolean;
}

export interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number }; // 2500ms, 4000ms
  fid: { good: number; needsImprovement: number }; // 100ms, 300ms
  cls: { good: number; needsImprovement: number }; // 0.1, 0.25
  seoScore: { good: number; needsImprovement: number }; // 80, 60
  loadTime: { good: number; needsImprovement: number }; // 3000ms, 5000ms
}

export class PerformanceTracker {
  private coreWebVitalsHistory: CoreWebVitalsMetrics[] = [];
  private seoPerformanceHistory: SEOPerformanceMetrics[] = [];
  private performanceAlerts: PerformanceAlert[] = [];
  private nextAlertId = 1;
  private thresholds: PerformanceThresholds;

  private defaultThresholds: PerformanceThresholds = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    seoScore: { good: 80, needsImprovement: 60 },
    loadTime: { good: 3000, needsImprovement: 5000 }
  };

  constructor(thresholds: Partial<PerformanceThresholds> = {}) {
    this.thresholds = { ...this.defaultThresholds, ...thresholds };
  }

  /**
   * Records Core Web Vitals metrics for a page
   * @param metrics - Core Web Vitals measurements
   */
  recordCoreWebVitals(metrics: CoreWebVitalsMetrics): void {
    this.coreWebVitalsHistory.push(metrics);
    this.checkCoreWebVitalsThresholds(metrics);
    
    // Keep only last 1000 entries per page to manage memory
    this.pruneHistory();
  }

  /**
   * Records SEO performance metrics for a page
   * @param metrics - SEO performance measurements
   */
  recordSEOPerformance(metrics: SEOPerformanceMetrics): void {
    this.seoPerformanceHistory.push(metrics);
    this.checkSEOPerformanceThresholds(metrics);
    
    // Keep only last 1000 entries per page to manage memory
    this.pruneHistory();
  }

  /**
   * Gets latest Core Web Vitals for a specific page
   * @param url - Page URL
   * @returns Latest metrics or undefined
   */
  getLatestCoreWebVitals(url: string): CoreWebVitalsMetrics | undefined {
    return this.coreWebVitalsHistory
      .filter(metric => metric.url === url)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  /**
   * Gets latest SEO performance for a specific page
   * @param url - Page URL
   * @returns Latest metrics or undefined
   */
  getLatestSEOPerformance(url: string): SEOPerformanceMetrics | undefined {
    return this.seoPerformanceHistory
      .filter(metric => metric.url === url)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  /**
   * Gets Core Web Vitals trends over time
   * @param days - Number of days to analyze
   * @param url - Optional specific page URL
   * @returns Trend data
   */
  getCoreWebVitalsTrends(days: number = 30, url?: string): PerformanceTrend[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let filteredMetrics = this.coreWebVitalsHistory.filter(
      metric => metric.timestamp >= startDate
    );

    if (url) {
      filteredMetrics = filteredMetrics.filter(metric => metric.url === url);
    }

    // Group by date
    const dailyMetrics = new Map<string, CoreWebVitalsMetrics[]>();
    filteredMetrics.forEach(metric => {
      const dateKey = metric.timestamp.toISOString().split('T')[0];
      const dayMetrics = dailyMetrics.get(dateKey) || [];
      dayMetrics.push(metric);
      dailyMetrics.set(dateKey, dayMetrics);
    });

    // Calculate daily averages
    return Array.from(dailyMetrics.entries())
      .map(([date, metrics]) => ({
        date,
        averageLCP: this.calculateAverage(metrics.map(m => m.lcp)),
        averageFID: this.calculateAverage(metrics.map(m => m.fid)),
        averageCLS: this.calculateAverage(metrics.map(m => m.cls)),
        averageSEOScore: 0, // Will be filled from SEO performance data
        pagesAnalyzed: new Set(metrics.map(m => m.url)).size
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Gets SEO performance trends over time
   * @param days - Number of days to analyze
   * @param url - Optional specific page URL
   * @returns Trend data with SEO scores
   */
  getSEOPerformanceTrends(days: number = 30, url?: string): PerformanceTrend[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let filteredMetrics = this.seoPerformanceHistory.filter(
      metric => metric.timestamp >= startDate
    );

    if (url) {
      filteredMetrics = filteredMetrics.filter(metric => metric.url === url);
    }

    // Group by date
    const dailyMetrics = new Map<string, SEOPerformanceMetrics[]>();
    filteredMetrics.forEach(metric => {
      const dateKey = metric.timestamp.toISOString().split('T')[0];
      const dayMetrics = dailyMetrics.get(dateKey) || [];
      dayMetrics.push(metric);
      dailyMetrics.set(dateKey, dayMetrics);
    });

    // Calculate daily averages
    return Array.from(dailyMetrics.entries())
      .map(([date, metrics]) => ({
        date,
        averageLCP: 0, // Will be filled from Core Web Vitals data
        averageFID: 0,
        averageCLS: 0,
        averageSEOScore: this.calculateAverage(metrics.map(m => m.seoScore)),
        pagesAnalyzed: new Set(metrics.map(m => m.url)).size
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Gets combined performance trends
   * @param days - Number of days to analyze
   * @param url - Optional specific page URL
   * @returns Combined trend data
   */
  getCombinedTrends(days: number = 30, url?: string): PerformanceTrend[] {
    const coreWebVitalsTrends = this.getCoreWebVitalsTrends(days, url);
    const seoTrends = this.getSEOPerformanceTrends(days, url);

    // Merge trends by date
    const combinedTrends = new Map<string, PerformanceTrend>();

    coreWebVitalsTrends.forEach(trend => {
      combinedTrends.set(trend.date, trend);
    });

    seoTrends.forEach(trend => {
      const existing = combinedTrends.get(trend.date);
      if (existing) {
        existing.averageSEOScore = trend.averageSEOScore;
      } else {
        combinedTrends.set(trend.date, trend);
      }
    });

    return Array.from(combinedTrends.values())
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Gets performance summary for all pages
   * @returns Performance summary
   */
  getPerformanceSummary(): {
    totalPages: number;
    goodCoreWebVitals: number;
    needsImprovementCoreWebVitals: number;
    poorCoreWebVitals: number;
    averageLCP: number;
    averageFID: number;
    averageCLS: number;
    averageSEOScore: number;
    activeAlerts: number;
  } {
    const latestMetrics = this.getLatestMetricsPerPage();
    const totalPages = latestMetrics.length;

    let goodCWV = 0;
    let needsImprovementCWV = 0;
    let poorCWV = 0;

    const lcpValues: number[] = [];
    const fidValues: number[] = [];
    const clsValues: number[] = [];
    const seoScores: number[] = [];

    latestMetrics.forEach(({ coreWebVitals, seoPerformance }) => {
      if (coreWebVitals) {
        lcpValues.push(coreWebVitals.lcp);
        fidValues.push(coreWebVitals.fid);
        clsValues.push(coreWebVitals.cls);

        // Classify Core Web Vitals performance
        const lcpGood = coreWebVitals.lcp <= this.thresholds.lcp.good;
        const fidGood = coreWebVitals.fid <= this.thresholds.fid.good;
        const clsGood = coreWebVitals.cls <= this.thresholds.cls.good;

        const lcpNeedsImprovement = coreWebVitals.lcp <= this.thresholds.lcp.needsImprovement;
        const fidNeedsImprovement = coreWebVitals.fid <= this.thresholds.fid.needsImprovement;
        const clsNeedsImprovement = coreWebVitals.cls <= this.thresholds.cls.needsImprovement;

        if (lcpGood && fidGood && clsGood) {
          goodCWV++;
        } else if (lcpNeedsImprovement && fidNeedsImprovement && clsNeedsImprovement) {
          needsImprovementCWV++;
        } else {
          poorCWV++;
        }
      }

      if (seoPerformance) {
        seoScores.push(seoPerformance.seoScore);
      }
    });

    const activeAlerts = this.performanceAlerts.filter(alert => !alert.resolved).length;

    return {
      totalPages,
      goodCoreWebVitals: goodCWV,
      needsImprovementCoreWebVitals: needsImprovementCWV,
      poorCoreWebVitals: poorCWV,
      averageLCP: this.calculateAverage(lcpValues),
      averageFID: this.calculateAverage(fidValues),
      averageCLS: this.calculateAverage(clsValues),
      averageSEOScore: this.calculateAverage(seoScores),
      activeAlerts
    };
  }

  /**
   * Gets pages with performance issues
   * @returns Pages that need attention
   */
  getPerformanceIssues(): {
    url: string;
    issues: string[];
    coreWebVitals?: CoreWebVitalsMetrics;
    seoPerformance?: SEOPerformanceMetrics;
  }[] {
    const latestMetrics = this.getLatestMetricsPerPage();
    const issuePages: {
      url: string;
      issues: string[];
      coreWebVitals?: CoreWebVitalsMetrics;
      seoPerformance?: SEOPerformanceMetrics;
    }[] = [];

    latestMetrics.forEach(({ url, coreWebVitals, seoPerformance }) => {
      const issues: string[] = [];

      if (coreWebVitals) {
        if (coreWebVitals.lcp > this.thresholds.lcp.needsImprovement) {
          issues.push(`Poor LCP: ${coreWebVitals.lcp}ms (should be < ${this.thresholds.lcp.good}ms)`);
        }
        if (coreWebVitals.fid > this.thresholds.fid.needsImprovement) {
          issues.push(`Poor FID: ${coreWebVitals.fid}ms (should be < ${this.thresholds.fid.good}ms)`);
        }
        if (coreWebVitals.cls > this.thresholds.cls.needsImprovement) {
          issues.push(`Poor CLS: ${coreWebVitals.cls} (should be < ${this.thresholds.cls.good})`);
        }
      }

      if (seoPerformance) {
        if (seoPerformance.seoScore < this.thresholds.seoScore.needsImprovement) {
          issues.push(`Low SEO Score: ${seoPerformance.seoScore} (should be > ${this.thresholds.seoScore.good})`);
        }
        if (seoPerformance.loadTime > this.thresholds.loadTime.needsImprovement) {
          issues.push(`Slow Load Time: ${seoPerformance.loadTime}ms (should be < ${this.thresholds.loadTime.good}ms)`);
        }
      }

      if (issues.length > 0) {
        issuePages.push({
          url,
          issues,
          coreWebVitals,
          seoPerformance
        });
      }
    });

    return issuePages.sort((a, b) => b.issues.length - a.issues.length);
  }

  /**
   * Gets active performance alerts
   * @returns Active alerts
   */
  getActiveAlerts(): PerformanceAlert[] {
    return this.performanceAlerts.filter(alert => !alert.resolved);
  }

  /**
   * Resolves a performance alert
   * @param alertId - Alert ID to resolve
   * @returns Success status
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.performanceAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      return true;
    }
    return false;
  }

  /**
   * Gets performance comparison between two time periods
   * @param currentDays - Days for current period
   * @param previousDays - Days for previous period
   * @returns Performance comparison
   */
  getPerformanceComparison(currentDays: number = 7, previousDays: number = 7): {
    current: {
      averageLCP: number;
      averageFID: number;
      averageCLS: number;
      averageSEOScore: number;
    };
    previous: {
      averageLCP: number;
      averageFID: number;
      averageCLS: number;
      averageSEOScore: number;
    };
    changes: {
      lcpChange: number;
      fidChange: number;
      clsChange: number;
      seoScoreChange: number;
    };
  } {
    const now = new Date();
    
    // Current period
    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - currentDays);
    
    // Previous period
    const previousStart = new Date(now);
    previousStart.setDate(previousStart.getDate() - currentDays - previousDays);
    const previousEnd = new Date(now);
    previousEnd.setDate(previousEnd.getDate() - currentDays);

    const currentCWV = this.coreWebVitalsHistory.filter(
      metric => metric.timestamp >= currentStart && metric.timestamp <= now
    );
    
    const previousCWV = this.coreWebVitalsHistory.filter(
      metric => metric.timestamp >= previousStart && metric.timestamp <= previousEnd
    );

    const currentSEO = this.seoPerformanceHistory.filter(
      metric => metric.timestamp >= currentStart && metric.timestamp <= now
    );
    
    const previousSEO = this.seoPerformanceHistory.filter(
      metric => metric.timestamp >= previousStart && metric.timestamp <= previousEnd
    );

    const current = {
      averageLCP: this.calculateAverage(currentCWV.map(m => m.lcp)),
      averageFID: this.calculateAverage(currentCWV.map(m => m.fid)),
      averageCLS: this.calculateAverage(currentCWV.map(m => m.cls)),
      averageSEOScore: this.calculateAverage(currentSEO.map(m => m.seoScore))
    };

    const previous = {
      averageLCP: this.calculateAverage(previousCWV.map(m => m.lcp)),
      averageFID: this.calculateAverage(previousCWV.map(m => m.fid)),
      averageCLS: this.calculateAverage(previousCWV.map(m => m.cls)),
      averageSEOScore: this.calculateAverage(previousSEO.map(m => m.seoScore))
    };

    const changes = {
      lcpChange: previous.averageLCP > 0 ? ((current.averageLCP - previous.averageLCP) / previous.averageLCP) * 100 : 0,
      fidChange: previous.averageFID > 0 ? ((current.averageFID - previous.averageFID) / previous.averageFID) * 100 : 0,
      clsChange: previous.averageCLS > 0 ? ((current.averageCLS - previous.averageCLS) / previous.averageCLS) * 100 : 0,
      seoScoreChange: previous.averageSEOScore > 0 ? ((current.averageSEOScore - previous.averageSEOScore) / previous.averageSEOScore) * 100 : 0
    };

    return { current, previous, changes };
  }

  /**
   * Exports performance data
   * @param format - Export format
   * @param days - Number of days to include
   * @returns Exported data
   */
  exportPerformanceData(format: 'json' | 'csv', days: number = 30): string {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const coreWebVitals = this.coreWebVitalsHistory.filter(
      metric => metric.timestamp >= startDate
    );
    
    const seoPerformance = this.seoPerformanceHistory.filter(
      metric => metric.timestamp >= startDate
    );

    if (format === 'json') {
      return JSON.stringify({
        exportedAt: new Date().toISOString(),
        period: `${days} days`,
        coreWebVitals,
        seoPerformance,
        summary: this.getPerformanceSummary()
      }, null, 2);
    }

    if (format === 'csv') {
      const headers = [
        'URL', 'Timestamp', 'Type', 'LCP', 'FID', 'CLS', 'SEO Score', 'Load Time'
      ];

      const rows: string[][] = [];

      coreWebVitals.forEach(metric => {
        rows.push([
          metric.url,
          metric.timestamp.toISOString(),
          'Core Web Vitals',
          metric.lcp.toString(),
          metric.fid.toString(),
          metric.cls.toString(),
          '',
          ''
        ]);
      });

      seoPerformance.forEach(metric => {
        rows.push([
          metric.url,
          metric.timestamp.toISOString(),
          'SEO Performance',
          '',
          '',
          '',
          metric.seoScore.toString(),
          metric.loadTime.toString()
        ]);
      });

      return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
    }

    return '';
  }

  // Private helper methods

  /**
   * Checks Core Web Vitals against thresholds and creates alerts
   * @param metrics - Core Web Vitals metrics
   */
  private checkCoreWebVitalsThresholds(metrics: CoreWebVitalsMetrics): void {
    const alerts: Omit<PerformanceAlert, 'id'>[] = [];

    if (metrics.lcp > this.thresholds.lcp.needsImprovement) {
      alerts.push({
        timestamp: new Date(),
        type: 'core_web_vitals',
        severity: 'critical',
        message: `LCP exceeds threshold: ${metrics.lcp}ms > ${this.thresholds.lcp.needsImprovement}ms`,
        affectedPages: [metrics.url],
        threshold: this.thresholds.lcp.needsImprovement,
        actualValue: metrics.lcp,
        resolved: false
      });
    }

    if (metrics.fid > this.thresholds.fid.needsImprovement) {
      alerts.push({
        timestamp: new Date(),
        type: 'core_web_vitals',
        severity: 'critical',
        message: `FID exceeds threshold: ${metrics.fid}ms > ${this.thresholds.fid.needsImprovement}ms`,
        affectedPages: [metrics.url],
        threshold: this.thresholds.fid.needsImprovement,
        actualValue: metrics.fid,
        resolved: false
      });
    }

    if (metrics.cls > this.thresholds.cls.needsImprovement) {
      alerts.push({
        timestamp: new Date(),
        type: 'core_web_vitals',
        severity: 'critical',
        message: `CLS exceeds threshold: ${metrics.cls} > ${this.thresholds.cls.needsImprovement}`,
        affectedPages: [metrics.url],
        threshold: this.thresholds.cls.needsImprovement,
        actualValue: metrics.cls,
        resolved: false
      });
    }

    alerts.forEach(alert => {
      this.performanceAlerts.push({
        ...alert,
        id: `alert-${this.nextAlertId++}`
      });
    });
  }

  /**
   * Checks SEO performance against thresholds and creates alerts
   * @param metrics - SEO performance metrics
   */
  private checkSEOPerformanceThresholds(metrics: SEOPerformanceMetrics): void {
    const alerts: Omit<PerformanceAlert, 'id'>[] = [];

    if (metrics.seoScore < this.thresholds.seoScore.needsImprovement) {
      alerts.push({
        timestamp: new Date(),
        type: 'seo_score',
        severity: 'warning',
        message: `SEO score below threshold: ${metrics.seoScore} < ${this.thresholds.seoScore.needsImprovement}`,
        affectedPages: [metrics.url],
        threshold: this.thresholds.seoScore.needsImprovement,
        actualValue: metrics.seoScore,
        resolved: false
      });
    }

    if (metrics.loadTime > this.thresholds.loadTime.needsImprovement) {
      alerts.push({
        timestamp: new Date(),
        type: 'load_time',
        severity: 'warning',
        message: `Load time exceeds threshold: ${metrics.loadTime}ms > ${this.thresholds.loadTime.needsImprovement}ms`,
        affectedPages: [metrics.url],
        threshold: this.thresholds.loadTime.needsImprovement,
        actualValue: metrics.loadTime,
        resolved: false
      });
    }

    alerts.forEach(alert => {
      this.performanceAlerts.push({
        ...alert,
        id: `alert-${this.nextAlertId++}`
      });
    });
  }

  /**
   * Gets latest metrics per page
   * @returns Latest metrics grouped by page
   */
  private getLatestMetricsPerPage(): {
    url: string;
    coreWebVitals?: CoreWebVitalsMetrics;
    seoPerformance?: SEOPerformanceMetrics;
  }[] {
    const pageMetrics = new Map<string, {
      url: string;
      coreWebVitals?: CoreWebVitalsMetrics;
      seoPerformance?: SEOPerformanceMetrics;
    }>();

    // Get latest Core Web Vitals per page
    const coreWebVitalsByPage = new Map<string, CoreWebVitalsMetrics>();
    this.coreWebVitalsHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .forEach(metric => {
        if (!coreWebVitalsByPage.has(metric.url)) {
          coreWebVitalsByPage.set(metric.url, metric);
        }
      });

    // Get latest SEO performance per page
    const seoPerformanceByPage = new Map<string, SEOPerformanceMetrics>();
    this.seoPerformanceHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .forEach(metric => {
        if (!seoPerformanceByPage.has(metric.url)) {
          seoPerformanceByPage.set(metric.url, metric);
        }
      });

    // Combine all pages
    const allUrls = new Set([
      ...Array.from(coreWebVitalsByPage.keys()),
      ...Array.from(seoPerformanceByPage.keys())
    ]);

    allUrls.forEach(url => {
      pageMetrics.set(url, {
        url,
        coreWebVitals: coreWebVitalsByPage.get(url),
        seoPerformance: seoPerformanceByPage.get(url)
      });
    });

    return Array.from(pageMetrics.values());
  }

  /**
   * Calculates average of an array of numbers
   * @param values - Array of numbers
   * @returns Average value
   */
  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  /**
   * Prunes old history to manage memory usage
   */
  private pruneHistory(): void {
    const maxEntriesPerPage = 100;
    
    // Prune Core Web Vitals history
    const coreWebVitalsByPage = new Map<string, CoreWebVitalsMetrics[]>();
    this.coreWebVitalsHistory.forEach(metric => {
      const pageMetrics = coreWebVitalsByPage.get(metric.url) || [];
      pageMetrics.push(metric);
      coreWebVitalsByPage.set(metric.url, pageMetrics);
    });

    this.coreWebVitalsHistory = [];
    coreWebVitalsByPage.forEach(pageMetrics => {
      const sortedMetrics = pageMetrics
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, maxEntriesPerPage);
      this.coreWebVitalsHistory.push(...sortedMetrics);
    });

    // Prune SEO performance history
    const seoPerformanceByPage = new Map<string, SEOPerformanceMetrics[]>();
    this.seoPerformanceHistory.forEach(metric => {
      const pageMetrics = seoPerformanceByPage.get(metric.url) || [];
      pageMetrics.push(metric);
      seoPerformanceByPage.set(metric.url, pageMetrics);
    });

    this.seoPerformanceHistory = [];
    seoPerformanceByPage.forEach(pageMetrics => {
      const sortedMetrics = pageMetrics
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, maxEntriesPerPage);
      this.seoPerformanceHistory.push(...sortedMetrics);
    });

    // Prune old alerts (keep last 500)
    this.performanceAlerts = this.performanceAlerts
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 500);
  }
}

export default PerformanceTracker;