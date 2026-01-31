// SEO Dashboard System Usage Example

import { SEODashboardSystem } from '../dashboard';
import { SEOPage } from '../types';

// Example configuration for the dashboard system
const dashboardConfig = {
  seoMonitor: {
    healthCheckInterval: 24, // Check every 24 hours
    autoFixEnabled: true,
    alertingEnabled: true,
    bulkUpdateBatchSize: 10,
    rollbackEnabled: true
  },
  dailyReport: {
    reportFormat: 'html' as const,
    includeDetailedIssues: true,
    includeRecommendations: true,
    includePerformanceMetrics: true,
    scheduledTime: '09:00',
    timezone: 'UTC',
    emailRecipients: ['seo-team@company.com'],
    slackWebhook: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
  },
  performanceThresholds: {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    seoScore: { good: 80, needsImprovement: 60 },
    loadTime: { good: 3000, needsImprovement: 5000 }
  }
};

// Initialize the dashboard system
const dashboardSystem = new SEODashboardSystem(dashboardConfig);

// Example function to demonstrate dashboard usage
export async function demonstrateDashboard() {
  console.log('🚀 SEO Dashboard System Demo');
  console.log('============================\n');

  // Sample pages data (in real usage, this would come from your page generation system)
  const samplePages: SEOPage[] = [
    {
      url: '/furniture-polish-mumbai',
      title: 'Professional Furniture Polish Services in Mumbai | A1 Furniture Polish',
      metaDescription: 'Get expert furniture polishing services in Mumbai. Professional wood polish, restoration, and repair services. Book online for best rates.',
      h1Tag: 'Professional Furniture Polish Services in Mumbai',
      wordCount: 850,
      internalLinks: [
        {
          sourceUrl: '/furniture-polish-mumbai',
          targetUrl: '/services/wood-polishing',
          anchorText: 'wood polishing services',
          linkType: 'internal',
          isNoFollow: false,
          context: 'Our comprehensive wood polishing services include...'
        },
        {
          sourceUrl: '/furniture-polish-mumbai',
          targetUrl: '/locations/bandra',
          anchorText: 'Bandra furniture polish',
          linkType: 'internal',
          isNoFollow: false,
          context: 'We provide services in Bandra and surrounding areas...'
        }
      ],
      outgoingLinks: [],
      canonicalUrl: '/furniture-polish-mumbai',
      openGraphTags: {
        title: 'Professional Furniture Polish Services in Mumbai',
        description: 'Get expert furniture polishing services in Mumbai. Professional wood polish, restoration, and repair services.',
        image: '/images/furniture-polish-mumbai.jpg',
        url: '/furniture-polish-mumbai',
        type: 'website',
        siteName: 'A1 Furniture Polish'
      },
      twitterCardTags: {
        card: 'summary_large_image',
        title: 'Professional Furniture Polish Services in Mumbai',
        description: 'Get expert furniture polishing services in Mumbai. Professional wood polish, restoration, and repair services.',
        image: '/images/furniture-polish-mumbai.jpg',
        site: '@A1FurniturePolish'
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'A1 Furniture Polish',
        description: 'Professional furniture polishing services in Mumbai'
      },
      lastModified: new Date(),
      seoScore: 85
    },
    {
      url: '/sofa-repair-andheri',
      title: 'Sofa Repair Services in Andheri',
      metaDescription: '', // Missing meta description - will be flagged
      h1Tag: '', // Missing H1 - will be flagged
      wordCount: 180, // Low word count - will be flagged
      internalLinks: [], // No internal links - will be flagged as orphan page
      outgoingLinks: [],
      canonicalUrl: '/sofa-repair-andheri',
      openGraphTags: {
        title: '',
        description: '',
        image: '',
        url: '',
        type: 'website',
        siteName: ''
      },
      twitterCardTags: {
        card: 'summary',
        title: '',
        description: '',
        image: ''
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage'
      },
      lastModified: new Date(),
      seoScore: 25 // Poor SEO score
    }
  ];

  try {
    // 1. Perform comprehensive analysis
    console.log('1. Performing comprehensive SEO analysis...');
    const analysis = await dashboardSystem.performComprehensiveAnalysis(samplePages);
    
    console.log(`   📊 Analyzed ${analysis.report.totalPages} pages`);
    console.log(`   📈 Overall SEO Score: ${analysis.report.overallScore}/100`);
    console.log(`   🚨 Critical Issues: ${analysis.report.criticalIssues}`);
    console.log(`   ⚠️  Warning Issues: ${analysis.report.warningIssues}`);
    console.log(`   ℹ️  Info Issues: ${analysis.report.infoIssues}`);
    console.log(`   💡 Recommendations Generated: ${analysis.recommendations.length}\n`);

    // 2. Show issue tracking metrics
    console.log('2. Issue Tracking Metrics:');
    console.log(`   📋 Total Issues: ${analysis.issueMetrics.totalIssues}`);
    console.log(`   🔓 Open Issues: ${analysis.issueMetrics.openIssues}`);
    console.log(`   ✅ Resolved Issues: ${analysis.issueMetrics.resolvedIssues}`);
    console.log(`   🔥 Critical Issues: ${analysis.issueMetrics.criticalIssues}`);
    console.log(`   📊 Resolution Rate: ${analysis.issueMetrics.resolutionRate.toFixed(1)}%\n`);

    // 3. Show top recommendations
    console.log('3. Top Priority Recommendations:');
    const { recommendationEngine } = dashboardSystem.getComponents();
    const topRecommendations = recommendationEngine.getPrioritizedActionPlan(3);
    
    topRecommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec.title} (${rec.priority.toUpperCase()})`);
      console.log(`      Impact: ${rec.impact} | Effort: ${rec.effort} | Category: ${rec.category}`);
      console.log(`      Affected Pages: ${rec.affectedPages.length}`);
      console.log(`      Estimated Time: ${rec.estimatedTimeToImplement}\n`);
    });

    // 4. Record some performance metrics
    console.log('4. Recording Performance Metrics...');
    const { performanceTracker } = dashboardSystem.getComponents();
    
    // Simulate Core Web Vitals data
    performanceTracker.recordCoreWebVitals({
      url: '/furniture-polish-mumbai',
      timestamp: new Date(),
      lcp: 2200, // Good LCP
      fid: 80,   // Good FID
      cls: 0.08, // Good CLS
      fcp: 1800,
      ttfb: 300,
      tbt: 150
    });

    performanceTracker.recordCoreWebVitals({
      url: '/sofa-repair-andheri',
      timestamp: new Date(),
      lcp: 4500, // Poor LCP - will trigger alert
      fid: 250,  // Poor FID - will trigger alert
      cls: 0.15, // Fair CLS
      fcp: 3200,
      ttfb: 800,
      tbt: 400
    });

    // Record SEO performance
    performanceTracker.recordSEOPerformance({
      url: '/furniture-polish-mumbai',
      timestamp: new Date(),
      seoScore: 85,
      loadTime: 2800,
      mobileScore: 88,
      desktopScore: 92,
      accessibilityScore: 95,
      bestPracticesScore: 90,
      pwaScore: 75
    });

    performanceTracker.recordSEOPerformance({
      url: '/sofa-repair-andheri',
      timestamp: new Date(),
      seoScore: 25,
      loadTime: 5200, // Slow load time - will trigger alert
      mobileScore: 45,
      desktopScore: 55,
      accessibilityScore: 60,
      bestPracticesScore: 40,
      pwaScore: 30
    });

    const performanceSummary = performanceTracker.getPerformanceSummary();
    console.log(`   📊 Performance Summary:`);
    console.log(`      Good Core Web Vitals: ${performanceSummary.goodCoreWebVitals}/${performanceSummary.totalPages}`);
    console.log(`      Average LCP: ${performanceSummary.averageLCP.toFixed(0)}ms`);
    console.log(`      Average SEO Score: ${performanceSummary.averageSEOScore.toFixed(1)}/100`);
    console.log(`      Active Alerts: ${performanceSummary.activeAlerts}\n`);

    // 5. Show performance issues
    const performanceIssues = performanceTracker.getPerformanceIssues();
    if (performanceIssues.length > 0) {
      console.log('5. Performance Issues Detected:');
      performanceIssues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue.url}`);
        issue.issues.forEach(issueDesc => {
          console.log(`      - ${issueDesc}`);
        });
        console.log('');
      });
    }

    // 6. Generate and show sample report
    console.log('6. Generating Sample Daily Report...');
    const { reportGenerator } = dashboardSystem.getComponents();
    const htmlReport = await reportGenerator.generateDailyReport(samplePages);
    
    console.log(`   📄 HTML Report Generated (${htmlReport.length} characters)`);
    console.log(`   📧 Report would be sent to: ${dashboardConfig.dailyReport.emailRecipients?.join(', ')}`);
    console.log(`   💬 Slack notification would be sent to configured webhook\n`);

    // 7. Show scheduler status
    const schedulerStatus = reportGenerator.getSchedulerStatus();
    console.log('7. Report Scheduler Status:');
    console.log(`   🔄 Active: ${schedulerStatus.isActive}`);
    console.log(`   ⏰ Next Run: ${schedulerStatus.nextRunTime.toLocaleString()}`);
    if (schedulerStatus.lastRunTime) {
      console.log(`   ✅ Last Run: ${schedulerStatus.lastRunTime.toLocaleString()}`);
    }
    console.log('');

    // 8. Demonstrate automated monitoring (without actually starting it)
    console.log('8. Automated Monitoring Setup:');
    console.log('   📅 Daily health checks scheduled');
    console.log('   📊 Automated report generation configured');
    console.log('   🚨 Critical issue alerting enabled');
    console.log('   🔧 Auto-fix capabilities enabled for resolvable issues\n');

    console.log('✅ Dashboard demonstration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Analyzed ${samplePages.length} pages`);
    console.log(`   - Detected ${analysis.report.criticalIssues + analysis.report.warningIssues} issues`);
    console.log(`   - Generated ${analysis.recommendations.length} recommendations`);
    console.log(`   - Recorded performance metrics for Core Web Vitals tracking`);
    console.log(`   - Set up automated monitoring and reporting`);

  } catch (error) {
    console.error('❌ Error during dashboard demonstration:', error);
  }
}

// Function to demonstrate React dashboard component usage
export function getDashboardComponentProps(pages: SEOPage[]) {
  return {
    pages,
    config: dashboardConfig.seoMonitor
  };
}

// Export the dashboard system for use in other parts of the application
export { dashboardSystem };

// Example of how to integrate with existing page generation system
export async function integrateWithPageGeneration() {
  console.log('🔗 Integrating SEO Dashboard with Page Generation System...\n');

  // This would typically be called after page generation
  const mockGeneratedPages: SEOPage[] = [
    // ... your generated pages would go here
  ];

  // Perform analysis on newly generated pages
  const analysis = await dashboardSystem.performComprehensiveAnalysis(mockGeneratedPages);
  
  // Check for critical issues that need immediate attention
  if (analysis.report.criticalIssues > 0) {
    console.log(`🚨 ALERT: ${analysis.report.criticalIssues} critical SEO issues detected!`);
    
    // Get auto-fixable issues
    const { seoMonitor } = dashboardSystem.getComponents();
    const allIssues = analysis.report.healthChecks.flatMap(check => check.issues);
    const autoFixableIssues = allIssues.filter(issue => issue.autoFixable);
    
    if (autoFixableIssues.length > 0) {
      console.log(`🔧 Attempting to auto-fix ${autoFixableIssues.length} issues...`);
      const fixResult = await seoMonitor.autoFixIssues(autoFixableIssues);
      console.log(`✅ Successfully fixed ${fixResult.successfulPages.length} pages`);
      
      if (fixResult.failedPages.length > 0) {
        console.log(`❌ Failed to fix ${fixResult.failedPages.length} pages - manual intervention required`);
      }
    }
  }

  return analysis;
}

// Run the demonstration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateDashboard().catch(console.error);
}