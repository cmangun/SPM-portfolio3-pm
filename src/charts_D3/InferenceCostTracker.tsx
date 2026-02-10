"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Inference Cost Tracker - Token costs, GPU hours, API spend per model
const defaultData = {
  period: 'December 2024 MTD',
  totalCost: 156780,
  totalRequests: 12450000,
  avgCostPerRequest: 0.0126,
  models: [
    { 
      name: 'GPT-4 Gateway', 
      requests: 2340000, 
      tokens: { input: 890000000, output: 234000000 },
      cost: 67890, 
      avgLatency: 1.2,
      costPerRequest: 0.029,
      trend: 'up',
    },
    { 
      name: 'Claude API', 
      requests: 1890000, 
      tokens: { input: 567000000, output: 189000000 },
      cost: 45230, 
      avgLatency: 0.9,
      costPerRequest: 0.024,
      trend: 'stable',
    },
    { 
      name: 'Internal LLM', 
      requests: 4560000, 
      tokens: { input: 1200000000, output: 400000000 },
      cost: 23400, 
      avgLatency: 0.3,
      costPerRequest: 0.005,
      trend: 'down',
    },
    { 
      name: 'Embedding Model', 
      requests: 3660000, 
      tokens: { input: 2340000000, output: 0 },
      cost: 12340, 
      avgLatency: 0.1,
      costPerRequest: 0.003,
      trend: 'stable',
    },
  ],
  gpuUtilization: {
    allocated: 48,
    used: 36,
    utilization: 75,
    costPerHour: 12.50,
    monthlyProjection: 43200,
  },
  dailyTrend: [
    { day: '12/07', cost: 4890, requests: 890000 },
    { day: '12/08', cost: 5120, requests: 920000 },
    { day: '12/09', cost: 5340, requests: 945000 },
    { day: '12/10', cost: 5230, requests: 932000 },
    { day: '12/11', cost: 5450, requests: 960000 },
    { day: '12/12', cost: 5670, requests: 985000 },
    { day: '12/13', cost: 5890, requests: 1020000 },
  ],
  alerts: [
    { type: 'warning', message: 'GPT-4 costs up 15% vs last week' },
    { type: 'info', message: 'Internal LLM migration saving $12K/mo' },
  ],
};

interface InferenceCostTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const InferenceCostTracker: React.FC<InferenceCostTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Inference Cost Tracker"
}) => {
  const formatCurrency = (val: number) => val >= 1000 ? `$${(val / 1000).toFixed(1)}K` : `$${val.toFixed(0)}`;
  const formatNumber = (val: number) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${(val / 1000).toFixed(0)}K`;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

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
        <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>AI/ML Inference Spend • {data.period}</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>${(data.totalCost / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Total Cost</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{formatNumber(data.totalRequests)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Requests</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>${(data.avgCostPerRequest * 1000).toFixed(1)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Per 1K Req</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.gpuUtilization.utilization}%</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>GPU Util</div>
        </div>
      </div>

      {/* Model Breakdown */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Cost by Model</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.4rem', textAlign: 'left', fontSize: 9, textTransform: 'uppercase' }}>Model</th>
              <th style={{ padding: '0.4rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>Requests</th>
              <th style={{ padding: '0.4rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>Tokens</th>
              <th style={{ padding: '0.4rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>Cost</th>
              <th style={{ padding: '0.4rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>$/Req</th>
              <th style={{ padding: '0.4rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.models.map((model, i) => (
              <tr key={i}>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', fontWeight: 500 }}>{model.name}</td>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{formatNumber(model.requests)}</td>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontSize: 10, color: '#666' }}>
                  {formatNumber(model.tokens.input + model.tokens.output)}
                </td>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(model.cost)}</td>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>${model.costPerRequest.toFixed(3)}</td>
                <td style={{ padding: '0.5rem 0.4rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                  <span style={{ color: model.trend === 'up' ? '#333' : model.trend === 'down' ? '#888' : '#666' }}>
                    {getTrendIcon(model.trend)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daily Trend */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Daily Spend (7 days)</div>
        <div style={{ display: 'flex', alignItems: 'end', gap: 4, height: 50 }}>
          {data.dailyTrend.map((day, i) => {
            const maxCost = Math.max(...data.dailyTrend.map(d => d.cost));
            const height = (day.cost / maxCost) * 45;
            return (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height, background: '#444', marginBottom: 4 }} />
                <div style={{ fontSize: 9, color: '#888' }}>{day.day.split('/')[1]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GPU & Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: '#f8f8f8' }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.5rem' }}>GPU Resources</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
            <span>Allocated: {data.gpuUtilization.allocated} GPUs</span>
            <span>Used: {data.gpuUtilization.used} GPUs</span>
          </div>
          <div style={{ height: 6, background: '#e0e0e0', marginTop: '0.35rem' }}>
            <div style={{ height: '100%', width: `${data.gpuUtilization.utilization}%`, background: '#444' }} />
          </div>
          <div style={{ fontSize: 9, color: '#888', marginTop: '0.35rem' }}>
            ${data.gpuUtilization.costPerHour}/hr • Projected: ${(data.gpuUtilization.monthlyProjection / 1000).toFixed(1)}K/mo
          </div>
        </div>
        <div>
          {data.alerts.map((alert, i) => (
            <div key={i} style={{
              padding: '0.5rem',
              marginBottom: '0.35rem',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderLeft: `3px solid ${alert.type === 'warning' ? '#333' : '#888'}`,
              fontSize: 10,
            }}>
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InferenceCostTracker;
