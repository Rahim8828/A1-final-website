import React, { useState, useEffect } from 'react';
import { SEOMonitor } from '../managers/SEOMonitor';
import { SEOReport, SEOHealthCheck, SEOIssue, SEOPage } from '../types';
import { SEOMonitorConfig } from '../types';

interface SEODashboardProps {
  pages: SEOPage[];
  config?: SEOMonitorConfig;
}

interface DashboardStats {
  totalPages: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  averageScore: number;
  lastUpdated: Date;
}

export const SEODashboard: React.FC<SEODashboardProps> = ({ pages, config }) => {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'issues' | 'performance' | 'recommendations'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  const defaultConfig: SEOMonitorConfig = {
    healthCheckInterval: 24,
    autoFixEnabled: true,
    alertingEnabled: true,
    bulkUpdateBatchSize: 10,
    rollbackEnabled: true,
    ...config
  };

  const seoMonitor = new SEOMonitor(defaultConfig);

  useEffect(() => {
    generateReport();
  }, [pages]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        generateReport();
      }, 5 * 60 * 1000); // Refresh every 5 minutes
      setRefreshInterval(interval);
    } else if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [autoRefresh]);

  const generateReport = async () => {
    setLoading(true);
    try {
      const newReport = seoMonitor.generateSEOReport(pages);
      setReport(newReport);
    } catch (error) {
      // Error generating SEO report - silently fail in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating SEO report:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getDashboardStats = (): DashboardStats => {
    if (!report) {
      return {
        totalPages: 0,
        criticalIssues: 0,
        warningIssues: 0,
        infoIssues: 0,
        averageScore: 0,
        lastUpdated: new Date()
      };
    }

    return {
      totalPages: report.totalPages,
      criticalIssues: report.criticalIssues,
      warningIssues: report.warningIssues,
      infoIssues: report.infoIssues,
      averageScore: report.overallScore,
      lastUpdated: report.generatedAt
    };
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: 'critical' | 'warning' | 'info'): string => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
    }
  };

  const handleAutoFix = async () => {
    if (!report) return;
    
    setLoading(true);
    try {
      const allIssues = report.healthChecks.flatMap(check => check.issues);
      const autoFixableIssues = allIssues.filter(issue => issue.autoFixable);
      
      if (autoFixableIssues.length > 0) {
        await seoMonitor.autoFixIssues(autoFixableIssues);
        await generateReport(); // Refresh report after fixes
      }
    } catch (error) {
      // Error during auto-fix - silently fail in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error during auto-fix:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const stats = getDashboardStats();

  if (loading && !report) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Generating SEO report...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Last updated: {stats.lastUpdated.toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              Auto-refresh
            </label>
            <button
              onClick={generateReport}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleAutoFix}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Auto-Fix Issues
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Pages</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalPages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
            {stats.averageScore}/100
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Critical Issues</h3>
          <p className="text-2xl font-bold text-red-600">{stats.criticalIssues}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Warning Issues</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.warningIssues}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Info Issues</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.infoIssues}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'issues', label: 'Issues' },
            { key: 'performance', label: 'Performance' },
            { key: 'recommendations', label: 'Recommendations' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {selectedTab === 'overview' && (
          <OverviewTab report={report} />
        )}
        {selectedTab === 'issues' && (
          <IssuesTab report={report} />
        )}
        {selectedTab === 'performance' && (
          <PerformanceTab report={report} />
        )}
        {selectedTab === 'recommendations' && (
          <RecommendationsTab report={report} />
        )}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ report: SEOReport | null }> = ({ report }) => {
  if (!report) return <div className="p-6">No data available</div>;

  const getScoreDistribution = () => {
    const distribution = { excellent: 0, good: 0, fair: 0, poor: 0 };
    report.healthChecks.forEach(check => {
      if (check.score >= 90) distribution.excellent++;
      else if (check.score >= 70) distribution.good++;
      else if (check.score >= 50) distribution.fair++;
      else distribution.poor++;
    });
    return distribution;
  };

  const scoreDistribution = getScoreDistribution();

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">SEO Overview</h2>
      
      {/* Score Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Score Distribution</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{scoreDistribution.excellent}</div>
            <div className="text-sm text-green-700">Excellent (90-100)</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{scoreDistribution.good}</div>
            <div className="text-sm text-blue-700">Good (70-89)</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{scoreDistribution.fair}</div>
            <div className="text-sm text-yellow-700">Fair (50-69)</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{scoreDistribution.poor}</div>
            <div className="text-sm text-red-700">Poor (0-49)</div>
          </div>
        </div>
      </div>

      {/* Top Issues */}
      <div>
        <h3 className="text-lg font-medium mb-4">Most Common Issues</h3>
        <TopIssuesChart healthChecks={report.healthChecks} />
      </div>
    </div>
  );
};

// Issues Tab Component
const IssuesTab: React.FC<{ report: SEOReport | null }> = ({ report }) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  if (!report) return <div className="p-6">No data available</div>;

  const allIssues = report.healthChecks.flatMap(check => check.issues);
  const filteredIssues = allIssues.filter(issue => {
    const severityMatch = filterSeverity === 'all' || issue.severity === filterSeverity;
    const typeMatch = filterType === 'all' || issue.issueType === filterType;
    return severityMatch && typeMatch;
  });

  const issueTypes = [...new Set(allIssues.map(issue => issue.issueType))];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">SEO Issues</h2>
        <div className="flex space-x-4">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Types</option>
            {issueTypes.map(type => (
              <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredIssues.map((issue, index) => (
          <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityBorderColor(issue.severity)}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                    {issue.severity.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">{issue.issueType.replace(/_/g, ' ')}</span>
                </div>
                <h4 className="font-medium mt-1">{issue.pageUrl}</h4>
                <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                {issue.fixAction && (
                  <p className="text-blue-600 text-sm mt-2">
                    <strong>Fix:</strong> {issue.fixAction}
                  </p>
                )}
              </div>
              {issue.autoFixable && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Auto-fixable
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No issues found matching the selected filters.
        </div>
      )}
    </div>
  );
};

// Performance Tab Component
const PerformanceTab: React.FC<{ report: SEOReport | null }> = ({ report }) => {
  if (!report) return <div className="p-6">No data available</div>;

  const lowScorePages = report.healthChecks
    .filter(check => check.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Performance Analysis</h2>
      
      {/* Performance Metrics */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Core Web Vitals Status</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Core Web Vitals monitoring requires integration with performance measurement tools.
            This feature tracks Largest Contentful Paint (LCP), First Input Delay (FID), 
            and Cumulative Layout Shift (CLS) metrics.
          </p>
        </div>
      </div>

      {/* Low Performing Pages */}
      <div>
        <h3 className="text-lg font-medium mb-4">Pages Needing Attention</h3>
        <div className="space-y-3">
          {lowScorePages.map((check, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{check.pageUrl}</h4>
                <p className="text-sm text-gray-600">
                  {check.issues.length} issues found
                </p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(check.score)}`}>
                  {check.score}/100
                </div>
                <div className="text-xs text-gray-500">SEO Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Recommendations Tab Component
const RecommendationsTab: React.FC<{ report: SEOReport | null }> = ({ report }) => {
  if (!report) return <div className="p-6">No data available</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">SEO Recommendations</h2>
      
      <div className="space-y-4">
        {report.recommendations.map((recommendation, index) => (
          <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                {index + 1}
              </div>
              <p className="text-blue-900">{recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {report.recommendations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No specific recommendations available. Your SEO performance looks good!
        </div>
      )}
    </div>
  );
};

// Helper Components
const TopIssuesChart: React.FC<{ healthChecks: SEOHealthCheck[] }> = ({ healthChecks }) => {
  const issueTypeCounts = new Map<string, number>();
  
  healthChecks.forEach(check => {
    check.issues.forEach(issue => {
      issueTypeCounts.set(issue.issueType, (issueTypeCounts.get(issue.issueType) || 0) + 1);
    });
  });

  const sortedIssues = Array.from(issueTypeCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxCount = Math.max(...sortedIssues.map(([, count]) => count));

  return (
    <div className="space-y-3">
      {sortedIssues.map(([issueType, count]) => (
        <div key={issueType} className="flex items-center">
          <div className="w-32 text-sm text-gray-600 capitalize">
            {issueType.replace(/_/g, ' ')}
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${(count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="w-12 text-sm font-medium text-right">{count}</div>
        </div>
      ))}
    </div>
  );
};

// Helper functions
const getSeverityColor = (severity: 'critical' | 'warning' | 'info'): string => {
  switch (severity) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'warning': return 'text-yellow-600 bg-yellow-50';
    case 'info': return 'text-blue-600 bg-blue-50';
  }
};

const getSeverityBorderColor = (severity: 'critical' | 'warning' | 'info'): string => {
  switch (severity) {
    case 'critical': return 'border-red-500';
    case 'warning': return 'border-yellow-500';
    case 'info': return 'border-blue-500';
  }
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export default SEODashboard;