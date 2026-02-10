import React from 'react';
import { chartColors } from './colors';

interface BCPMetric {
  category: string;
  metric: string;
  target: string;
  current: string;
  score: number; // 0-100
  status: 'On Track' | 'At Risk' | 'Critical';
  trend: 'up' | 'down' | 'stable';
  lastAssessed: string;
}

interface BCPCategory {
  name: string;
  weight: number;
  score: number;
  metrics: BCPMetric[];
}

interface BusinessContinuityScorecardProps {
  data?: BCPCategory[];
  overallScore?: number;
  lastReviewDate?: string;
  nextReviewDate?: string;
}

const defaultData: BCPCategory[] = [
  {
    name: 'Recovery Capability',
    weight: 30,
    score: 78,
    metrics: [
      { category: 'Recovery', metric: 'RTO Compliance', target: '100%', current: '87.5%', score: 88, status: 'At Risk', trend: 'up', lastAssessed: '2024-12-01' },
      { category: 'Recovery', metric: 'RPO Compliance', target: '100%', current: '91.3%', score: 91, status: 'On Track', trend: 'stable', lastAssessed: '2024-12-01' },
      { category: 'Recovery', metric: 'DR Test Success Rate', target: '95%', current: '66.7%', score: 70, status: 'Critical', trend: 'down', lastAssessed: '2024-11-15' },
    ]
  },
  {
    name: 'Documentation',
    weight: 20,
    score: 85,
    metrics: [
      { category: 'Documentation', metric: 'Runbook Coverage', target: '100%', current: '92%', score: 92, status: 'On Track', trend: 'up', lastAssessed: '2024-12-10' },
      { category: 'Documentation', metric: 'Contact List Currency', target: '100%', current: '78%', score: 78, status: 'At Risk', trend: 'down', lastAssessed: '2024-12-05' },
    ]
  },
  {
    name: 'Testing & Exercises',
    weight: 25,
    score: 65,
    metrics: [
      { category: 'Testing', metric: 'Annual DR Tests Completed', target: '4', current: '2', score: 50, status: 'At Risk', trend: 'stable', lastAssessed: '2024-12-01' },
      { category: 'Testing', metric: 'Tabletop Exercises', target: '2', current: '2', score: 100, status: 'On Track', trend: 'stable', lastAssessed: '2024-11-20' },
      { category: 'Testing', metric: 'Findings Remediated', target: '100%', current: '45%', score: 45, status: 'Critical', trend: 'up', lastAssessed: '2024-12-10' },
    ]
  },
  {
    name: 'Infrastructure Resilience',
    weight: 25,
    score: 82,
    metrics: [
      { category: 'Infrastructure', metric: 'Multi-Region Coverage', target: '100%', current: '88%', score: 88, status: 'On Track', trend: 'up', lastAssessed: '2024-12-01' },
      { category: 'Infrastructure', metric: 'Backup Verification', target: '100%', current: '94%', score: 94, status: 'On Track', trend: 'stable', lastAssessed: '2024-12-05' },
      { category: 'Infrastructure', metric: 'Single Points of Failure', target: '0', current: '3', score: 70, status: 'At Risk', trend: 'down', lastAssessed: '2024-11-30' },
    ]
  },
];

export const BusinessContinuityScorecard: React.FC<BusinessContinuityScorecardProps> = ({
  data = defaultData,
  overallScore = 77,
  lastReviewDate = '2024-12-10',
  nextReviewDate = '2025-01-15',
}) => {

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case 'On Track': return '●';
      case 'At Risk': return '◐';
      case 'Critical': return '○';
      default: return '?';
    }
  };

  const getTrendArrow = (trend: string) => {
    switch(trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      case 'stable': return '—';
      default: return '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return chartColors.gray[300];
    if (score >= 60) return chartColors.gray[400];
    return chartColors.text.primary;
  };

  const weightedScore = data.reduce((sum, cat) => sum + (cat.score * cat.weight / 100), 0);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Business Continuity Scorecard
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        ML/AI Systems Resilience Assessment
      </p>

      {/* Overall Score */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Big Score */}
        <div style={{ 
          padding: '1.5rem', 
          border: `3px solid ${chartColors.text.primary}`,
          textAlign: 'center',
          backgroundColor: chartColors.surface
        }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.5rem' }}>OVERALL SCORE</div>
          <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>{Math.round(weightedScore)}</div>
          <div style={{ fontSize: '0.8rem', color: chartColors.text.secondary, marginTop: '0.5rem' }}>/ 100</div>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: chartColors.text.secondary }}>
            <div>Last Review: {lastReviewDate}</div>
            <div>Next Review: {nextReviewDate}</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {data.map(cat => (
            <div key={cat.name} style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
              <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary, marginBottom: '0.25rem' }}>{cat.name.toUpperCase()}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>{cat.score}</div>
              <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>Weight: {cat.weight}%</div>
              {/* Mini bar */}
              <div style={{ marginTop: '0.5rem', height: '6px', backgroundColor: chartColors.border }}>
                <div style={{ width: `${cat.score}%`, height: '100%', backgroundColor: getScoreColor(cat.score) }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      {data.map(cat => (
        <div key={cat.name} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: `2px solid ${chartColors.text.primary}`, paddingBottom: '0.5rem' }}>
            {cat.name} <span style={{ fontWeight: 400, color: chartColors.text.secondary }}>({cat.weight}% weight)</span>
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ backgroundColor: chartColors.surface }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `1px solid ${chartColors.border}` }}>Metric</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Target</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Current</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Score</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Status</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Trend</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Last Assessed</th>
              </tr>
            </thead>
            <tbody>
              {cat.metrics.map((m, idx) => (
                <tr key={m.metric} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{m.metric}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{m.target}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{m.current}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>
                    <span style={{ 
                      display: 'inline-block',
                      width: '40px',
                      padding: '0.2rem',
                      backgroundColor: getScoreColor(m.score),
                      color: m.score < 60 ? chartColors.background : chartColors.text.primary,
                      fontWeight: 600
                    }}>{m.score}</span>
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>
                    {getStatusIndicator(m.status)} {m.status}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{getTrendArrow(m.trend)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontSize: '0.75rem' }}>{m.lastAssessed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', borderTop: `1px solid ${chartColors.border}`, paddingTop: '1rem', color: chartColors.text.secondary }}>
        <span>● On Track (≥80)</span>
        <span>◐ At Risk (60-79)</span>
        <span>○ Critical (&lt;60)</span>
        <span style={{ marginLeft: 'auto' }}>▲ Improving • — Stable • ▼ Declining</span>
      </div>
    </div>
  );
};

export default BusinessContinuityScorecard;
