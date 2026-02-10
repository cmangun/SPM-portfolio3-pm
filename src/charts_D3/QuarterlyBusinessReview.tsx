import React from 'react';
import { chartColors } from './colors';

interface QBRMetric {
  category: string;
  metric: string;
  q1Actual: number | string;
  q2Actual: number | string;
  q3Actual: number | string;
  q4Target: number | string;
  q4Actual?: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'Green' | 'Yellow' | 'Red';
}

interface QBRSection {
  title: string;
  metrics: QBRMetric[];
}

interface QuarterlyBusinessReviewProps {
  data?: QBRSection[];
  quarter?: string;
  year?: number;
}

const defaultData: QBRSection[] = [
  {
    title: 'Operational Excellence',
    metrics: [
      { category: 'Ops', metric: 'Model Availability', q1Actual: 99.2, q2Actual: 99.5, q3Actual: 99.7, q4Target: 99.9, q4Actual: 99.8, unit: '%', trend: 'up', status: 'Yellow' },
      { category: 'Ops', metric: 'Inference Latency P95', q1Actual: 145, q2Actual: 128, q3Actual: 112, q4Target: 100, q4Actual: 105, unit: 'ms', trend: 'up', status: 'Yellow' },
      { category: 'Ops', metric: 'Incident Count', q1Actual: 12, q2Actual: 8, q3Actual: 5, q4Target: 3, q4Actual: 4, unit: '#', trend: 'up', status: 'Yellow' },
      { category: 'Ops', metric: 'MTTR', q1Actual: 85, q2Actual: 62, q3Actual: 45, q4Target: 30, q4Actual: 38, unit: 'min', trend: 'up', status: 'Yellow' },
    ]
  },
  {
    title: 'Model Performance',
    metrics: [
      { category: 'Model', metric: 'Fraud Detection Precision', q1Actual: 92.1, q2Actual: 93.4, q3Actual: 94.2, q4Target: 95.0, q4Actual: 94.8, unit: '%', trend: 'up', status: 'Yellow' },
      { category: 'Model', metric: 'Recommendation CTR', q1Actual: 3.2, q2Actual: 3.8, q3Actual: 4.1, q4Target: 4.5, q4Actual: 4.6, unit: '%', trend: 'up', status: 'Green' },
      { category: 'Model', metric: 'Churn Prediction AUC', q1Actual: 0.81, q2Actual: 0.83, q3Actual: 0.85, q4Target: 0.87, q4Actual: 0.86, unit: '', trend: 'up', status: 'Yellow' },
      { category: 'Model', metric: 'Models in Production', q1Actual: 12, q2Actual: 15, q3Actual: 18, q4Target: 20, q4Actual: 21, unit: '#', trend: 'up', status: 'Green' },
    ]
  },
  {
    title: 'Financial Impact',
    metrics: [
      { category: 'Finance', metric: 'Fraud Losses Prevented', q1Actual: 2.1, q2Actual: 2.8, q3Actual: 3.2, q4Target: 3.5, q4Actual: 3.7, unit: '$M', trend: 'up', status: 'Green' },
      { category: 'Finance', metric: 'ML Infrastructure Cost', q1Actual: 420, q2Actual: 480, q3Actual: 510, q4Target: 500, q4Actual: 545, unit: '$K', trend: 'down', status: 'Red' },
      { category: 'Finance', metric: 'Revenue from Personalization', q1Actual: 1.2, q2Actual: 1.8, q3Actual: 2.4, q4Target: 3.0, q4Actual: 2.9, unit: '$M', trend: 'up', status: 'Yellow' },
      { category: 'Finance', metric: 'Cost per Inference', q1Actual: 0.012, q2Actual: 0.010, q3Actual: 0.008, q4Target: 0.007, q4Actual: 0.0075, unit: '$', trend: 'up', status: 'Yellow' },
    ]
  },
  {
    title: 'Governance & Compliance',
    metrics: [
      { category: 'Gov', metric: 'Model Documentation Coverage', q1Actual: 65, q2Actual: 78, q3Actual: 88, q4Target: 100, q4Actual: 95, unit: '%', trend: 'up', status: 'Yellow' },
      { category: 'Gov', metric: 'Human Override Rate', q1Actual: 8.2, q2Actual: 6.5, q3Actual: 5.1, q4Target: 4.0, q4Actual: 4.8, unit: '%', trend: 'up', status: 'Yellow' },
      { category: 'Gov', metric: 'Bias Audits Completed', q1Actual: 3, q2Actual: 5, q3Actual: 7, q4Target: 8, q4Actual: 8, unit: '#', trend: 'stable', status: 'Green' },
      { category: 'Gov', metric: 'Regulatory Findings', q1Actual: 2, q2Actual: 1, q3Actual: 0, q4Target: 0, q4Actual: 0, unit: '#', trend: 'stable', status: 'Green' },
    ]
  },
];

export const QuarterlyBusinessReview: React.FC<QuarterlyBusinessReviewProps> = ({
  data = defaultData,
  quarter = 'Q4',
  year = 2024,
}) => {

  const getTrendArrow = (trend: string) => {
    switch(trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      case 'stable': return '—';
      default: return '';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case 'Green': return '●';
      case 'Yellow': return '◐';
      case 'Red': return '○';
      default: return '?';
    }
  };

  const allMetrics = data.flatMap(s => s.metrics);
  const greenCount = allMetrics.filter(m => m.status === 'Green').length;
  const yellowCount = allMetrics.filter(m => m.status === 'Yellow').length;
  const redCount = allMetrics.filter(m => m.status === 'Red').length;
  const overallHealth = greenCount / allMetrics.length * 100;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem', color: chartColors.text.primary }}>
            Quarterly Business Review - AI/ML
          </h2>
          <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary }}>
            {quarter} {year} Performance Summary
          </p>
        </div>
        <div style={{ textAlign: 'right', padding: '0.75rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>OVERALL HEALTH</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{overallHealth.toFixed(0)}%</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL METRICS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{allMetrics.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● ON TARGET</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{greenCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>◐ NEEDS ATTENTION</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{yellowCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: redCount > 0 ? chartColors.text.primary : chartColors.surface, color: redCount > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>○ OFF TRACK</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{redCount}</div>
        </div>
      </div>

      {/* Sections */}
      {data.map(section => (
        <div key={section.title} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: `2px solid ${chartColors.text.primary}`, paddingBottom: '0.5rem' }}>
            {section.title}
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ backgroundColor: chartColors.surface }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `1px solid ${chartColors.border}`, width: '25%' }}>Metric</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>Q1</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>Q2</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>Q3</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>Q4 Target</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>Q4 Actual</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Trend</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {section.metrics.map((m, idx) => (
                <tr key={m.metric} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{m.metric}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{m.q1Actual}{m.unit}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{m.q2Actual}{m.unit}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{m.q3Actual}{m.unit}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{m.q4Target}{m.unit}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{m.q4Actual}{m.unit}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{getTrendArrow(m.trend)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{getStatusIndicator(m.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Executive Summary Box */}
      <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface, marginTop: '1rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>Executive Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Key Wins</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li>Recommendation CTR exceeded target by 2%</li>
              <li>Fraud losses prevented up 18% vs Q3</li>
              <li>Zero regulatory findings for second consecutive quarter</li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Areas for Focus</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li>Infrastructure costs 9% over budget</li>
              <li>P95 latency slightly above target</li>
              <li>Model documentation still at 95% coverage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.75rem', color: chartColors.text.secondary }}>
        <span>● On Target</span>
        <span>◐ Needs Attention</span>
        <span>○ Off Track</span>
        <span style={{ marginLeft: 'auto' }}>▲ Improving • — Stable • ▼ Declining</span>
      </div>
    </div>
  );
};

export default QuarterlyBusinessReview;
