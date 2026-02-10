"use client";
import React from 'react';
import { chartColors, chartTypography, changeColors } from './colors';

// Change Failure Rate - DORA metric visualization
const defaultData = {
  period: 'Last 90 Days',
  currentRate: 8.2,
  target: 15,
  industryBenchmark: 12,
  rating: 'Elite',
  totalDeployments: 456,
  failedDeployments: 37,
  rollbacks: 28,
  hotfixes: 9,
  byTeam: [
    { team: 'ML Platform', deployments: 124, failures: 8, rate: 6.5 },
    { team: 'Risk Models', deployments: 89, failures: 6, rate: 6.7 },
    { team: 'Customer AI', deployments: 78, failures: 9, rate: 11.5 },
    { team: 'Fraud Detection', deployments: 92, failures: 7, rate: 7.6 },
    { team: 'Operations', deployments: 73, failures: 7, rate: 9.6 },
  ],
  trend: [
    { month: 'Sep', rate: 12.3, deployments: 98 },
    { month: 'Oct', rate: 10.5, deployments: 112 },
    { month: 'Nov', rate: 9.1, deployments: 124 },
    { month: 'Dec', rate: 8.2, deployments: 122 },
  ],
  failureCategories: [
    { category: 'Configuration Error', count: 14, percentage: 38 },
    { category: 'Dependency Failure', count: 9, percentage: 24 },
    { category: 'Performance Issue', count: 7, percentage: 19 },
    { category: 'Data Issue', count: 5, percentage: 14 },
    { category: 'Other', count: 2, percentage: 5 },
  ],
  doraMetrics: [
    { metric: 'Change Failure Rate', value: '8.2%', rating: 'Elite', benchmark: '<15%' },
    { metric: 'Deployment Frequency', value: '5.1/day', rating: 'Elite', benchmark: 'On-demand' },
    { metric: 'Lead Time', value: '2.3 days', rating: 'High', benchmark: '<1 week' },
    { metric: 'MTTR', value: '1.8 hrs', rating: 'Elite', benchmark: '<1 hour' },
  ],
  recentFailures: [
    { date: '2024-12-12', service: 'Recommendation API', cause: 'Config drift', mttr: 45 },
    { date: '2024-12-10', service: 'Feature Store', cause: 'Memory limit', mttr: 90 },
    { date: '2024-12-08', service: 'Model Registry', cause: 'Auth timeout', mttr: 30 },
  ],
};

const getRatingStyle = (rating: string) => {
  switch (rating.toLowerCase()) {
    case 'elite': return { bg: '#1a1a1a', color: '#fff' };
    case 'high': return { bg: '#444', color: '#fff' };
    case 'medium': return { bg: '#888', color: '#fff' };
    case 'low': return { bg: '#ccc', color: '#333' };
    default: return { bg: '#e0e0e0', color: '#666' };
  }
};

interface ChangeFailureRateProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ChangeFailureRate: React.FC<ChangeFailureRateProps> = ({
  data = defaultData,
  width = 700,
  height = 540,
  title = "Change Failure Rate"
}) => {
  const ratingStyle = getRatingStyle(data.rating);

  return (
    <div style={{
      fontFamily: chartTypography.fontFamily,
      background: chartColors.white,
      border: `1px solid ${chartColors.border}`,
      width,
      minHeight: height,
      padding: '1.5rem',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>DORA Metric • {data.period}</p>
          </div>
          <div style={{
            padding: '0.35rem 0.75rem',
            fontSize: 11,
            fontWeight: 600,
            ...ratingStyle,
          }}>
            {data.rating} Performer
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.currentRate}%</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Failure Rate</div>
          <div style={{ fontSize: 9, color: '#aaa' }}>Target: &lt;{data.target}%</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.totalDeployments}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Deployments</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.rollbacks}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Rollbacks</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.hotfixes}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Hotfixes</div>
        </div>
      </div>

      {/* Trend & By Team */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Trend */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Monthly Trend</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 4, height: 60 }}>
            {data.trend.map((month, i) => {
              const height = (month.rate / 15) * 50;
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ 
                    height, 
                    background: month.rate > data.target ? '#333' : '#666',
                    marginBottom: 4,
                  }} />
                  <div style={{ fontSize: 10, fontWeight: 600 }}>{month.rate}%</div>
                  <div style={{ fontSize: 9, color: '#888' }}>{month.month}</div>
                </div>
              );
            })}
          </div>
          {/* Target line reference */}
          <div style={{ fontSize: 9, color: '#888', marginTop: '0.5rem', textAlign: 'center' }}>
            ─ ─ Target: {data.target}%
          </div>
        </div>

        {/* By Team */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Team</div>
          {data.byTeam.map((team, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.3rem 0', fontSize: 10 }}>
              <span style={{ width: 90 }}>{team.team}</span>
              <div style={{ flex: 1, height: 6, background: '#e0e0e0', marginRight: 8 }}>
                <div style={{ 
                  height: '100%', 
                  width: `${(team.rate / 15) * 100}%`, 
                  background: team.rate > 10 ? '#333' : '#666',
                }} />
              </div>
              <span style={{ width: 35, textAlign: 'right', fontWeight: 600 }}>{team.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* DORA Metrics & Failure Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* DORA */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>DORA Metrics</div>
          {data.doraMetrics.map((metric, i) => {
            const style = getRatingStyle(metric.rating);
            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.4rem 0',
                borderBottom: '1px solid #f0f0f0',
                fontSize: 10,
              }}>
                <span>{metric.metric}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{metric.value}</span>
                  <span style={{
                    padding: '0.1rem 0.3rem',
                    fontSize: 8,
                    fontWeight: 600,
                    background: style.bg,
                    color: style.color,
                  }}>
                    {metric.rating}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Failure Categories */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Failure Categories</div>
          {data.failureCategories.map((cat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0', fontSize: 10 }}>
              <span style={{ flex: 1 }}>{cat.category}</span>
              <div style={{ width: 60, height: 6, background: '#e0e0e0', marginRight: 8 }}>
                <div style={{ height: '100%', width: `${cat.percentage}%`, background: '#555' }} />
              </div>
              <span style={{ width: 25, textAlign: 'right' }}>{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Failures */}
      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.35rem' }}>Recent Failures</div>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: 10, color: '#666' }}>
          {data.recentFailures.map((f, i) => (
            <div key={i} style={{ flex: 1, padding: '0.35rem', background: '#f8f8f8' }}>
              <div style={{ fontWeight: 500, color: '#333' }}>{f.service}</div>
              <div>{f.cause} • MTTR: {f.mttr}m</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeFailureRate;
