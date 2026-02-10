"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Cloud Cost Allocation - By team/model/environment
const defaultData = {
  period: 'December 2024',
  totalSpend: 287450,
  budgeted: 300000,
  variance: -4.2,
  byTeam: [
    { team: 'ML Platform', spend: 89234, budget: 95000, models: 12 },
    { team: 'Risk Analytics', spend: 67890, budget: 65000, models: 8 },
    { team: 'Marketing AI', spend: 45678, budget: 50000, models: 6 },
    { team: 'Operations', spend: 34567, budget: 35000, models: 5 },
    { team: 'Customer Svc', spend: 28901, budget: 30000, models: 4 },
    { team: 'Research', spend: 21180, budget: 25000, models: 3 },
  ],
  byEnvironment: [
    { env: 'Production', spend: 172470, percentage: 60 },
    { env: 'Development', spend: 57490, percentage: 20 },
    { env: 'Staging', spend: 28745, percentage: 10 },
    { env: 'Training', spend: 28745, percentage: 10 },
  ],
  byResource: [
    { resource: 'GPU Compute', spend: 143725, percentage: 50 },
    { resource: 'Storage', spend: 57490, percentage: 20 },
    { resource: 'Inference API', spend: 43118, percentage: 15 },
    { resource: 'Data Transfer', spend: 28745, percentage: 10 },
    { resource: 'Other', spend: 14372, percentage: 5 },
  ],
  topModels: [
    { model: 'LLM Gateway', spend: 45230, daily: 1459 },
    { model: 'Fraud Detection', spend: 32450, daily: 1047 },
    { model: 'Recommendation Engine', spend: 28900, daily: 932 },
    { model: 'Document Processing', spend: 21340, daily: 688 },
  ],
  trend: [
    { month: 'Sep', spend: 245000 },
    { month: 'Oct', spend: 268000 },
    { month: 'Nov', spend: 279000 },
    { month: 'Dec', spend: 287450 },
  ],
};

interface CloudCostAllocationProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CloudCostAllocation: React.FC<CloudCostAllocationProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Cloud Cost Allocation"
}) => {
  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}K`;

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
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>AI/ML Infrastructure • {data.period}</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>${(data.totalSpend / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Total Spend</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>${(data.budgeted / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Budget</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: data.variance < 0 ? '#444' : '#333' }}>{data.variance}%</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Variance</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.byTeam.reduce((a, b) => a + b.models, 0)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Active Models</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* By Team */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Team</div>
          {data.byTeam.map((team, i) => {
            const utilization = (team.spend / team.budget) * 100;
            return (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: '0.2rem' }}>
                  <span>{team.team}</span>
                  <span style={{ fontWeight: 600, color: utilization > 100 ? '#333' : '#666' }}>
                    {formatCurrency(team.spend)} / {formatCurrency(team.budget)}
                  </span>
                </div>
                <div style={{ height: 6, background: '#e0e0e0' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, utilization)}%`, 
                    background: utilization > 100 ? '#333' : utilization > 90 ? '#666' : '#888',
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* By Environment & Resource */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Environment</div>
          <div style={{ display: 'flex', height: 24, marginBottom: '0.75rem' }}>
            {data.byEnvironment.map((env, i) => (
              <div key={i} style={{
                width: `${env.percentage}%`,
                background: i === 0 ? '#333' : i === 1 ? '#666' : i === 2 ? '#888' : '#aaa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 9,
              }}>
                {env.percentage}%
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: 9, marginBottom: '1rem' }}>
            {data.byEnvironment.map((env, i) => (
              <span key={i}>
                <span style={{ 
                  display: 'inline-block', 
                  width: 8, 
                  height: 8, 
                  background: i === 0 ? '#333' : i === 1 ? '#666' : i === 2 ? '#888' : '#aaa',
                  marginRight: 4,
                }} />
                {env.env}: {formatCurrency(env.spend)}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Resource</div>
          {data.byResource.slice(0, 4).map((res, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '0.25rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <span>{res.resource}</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(res.spend)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Models */}
      <div style={{ marginTop: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Top Spending Models</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {data.topModels.map((model, i) => (
            <div key={i} style={{ padding: '0.5rem', background: '#f8f8f8', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{formatCurrency(model.spend)}</div>
              <div style={{ fontSize: 9, color: '#666', marginTop: '0.15rem' }}>{model.model}</div>
              <div style={{ fontSize: 8, color: '#888' }}>${model.daily}/day</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudCostAllocation;
