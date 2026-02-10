"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Budget vs Actual Variance - FinOps tracking for AI/ML spend
const defaultData = {
  period: 'FY 2024',
  totalBudget: 3200000,
  totalActual: 3450000,
  variance: 7.8,
  varianceAmount: 250000,
  status: 'over-budget',
  categories: [
    { name: 'Compute (GPU/TPU)', budget: 1200000, actual: 1380000, variance: 15.0, forecast: 1450000 },
    { name: 'LLM APIs', budget: 600000, actual: 720000, variance: 20.0, forecast: 780000 },
    { name: 'Data Storage', budget: 400000, actual: 380000, variance: -5.0, forecast: 390000 },
    { name: 'MLOps Tools', budget: 350000, actual: 340000, variance: -2.9, forecast: 350000 },
    { name: 'Training Data', budget: 300000, actual: 310000, variance: 3.3, forecast: 320000 },
    { name: 'Personnel', budget: 250000, actual: 240000, variance: -4.0, forecast: 245000 },
    { name: 'Other', budget: 100000, actual: 80000, variance: -20.0, forecast: 85000 },
  ],
  quarterly: [
    { quarter: 'Q1', budget: 750000, actual: 720000, variance: -4.0 },
    { quarter: 'Q2', budget: 780000, actual: 810000, variance: 3.8 },
    { quarter: 'Q3', budget: 820000, actual: 890000, variance: 8.5 },
    { quarter: 'Q4', budget: 850000, actual: 1030000, variance: 21.2 },
  ],
  drivers: [
    { driver: 'GPT-4 usage 40% above forecast', impact: 120000 },
    { driver: 'New model training initiatives', impact: 85000 },
    { driver: 'Increased inference volume', impact: 65000 },
    { driver: 'Storage optimization savings', impact: -20000 },
  ],
  forecast: {
    yearEnd: 3650000,
    varianceToForecast: 14.1,
  },
};

interface BudgetVarianceChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BudgetVarianceChart: React.FC<BudgetVarianceChartProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Budget vs Actual Variance"
}) => {
  const formatCurrency = (val: number) => val >= 1000000 ? `$${(val / 1000000).toFixed(2)}M` : `$${(val / 1000).toFixed(0)}K`;

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>AI/ML FinOps • {data.period}</p>
          </div>
          <div style={{
            padding: '0.35rem 0.75rem',
            fontSize: 10,
            fontWeight: 600,
            background: data.variance > 10 ? '#1a1a1a' : data.variance > 0 ? '#666' : '#e8e8e8',
            color: data.variance > 0 ? '#fff' : '#333',
            textTransform: 'uppercase',
          }}>
            {data.variance > 0 ? '+' : ''}{data.variance}% Variance
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(data.totalBudget)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Budget</div>
        </div>
        <div style={{ background: data.variance > 0 ? '#333' : '#444', color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(data.totalActual)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Actual</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: data.varianceAmount > 0 ? '#333' : '#666' }}>
            {data.varianceAmount > 0 ? '+' : ''}{formatCurrency(data.varianceAmount)}
          </div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Variance $</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(data.forecast.yearEnd)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>YE Forecast</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Category</div>
        {data.categories.map((cat, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: '0.2rem' }}>
              <span>{cat.name}</span>
              <span style={{ color: cat.variance > 0 ? '#333' : '#666' }}>
                {formatCurrency(cat.actual)} / {formatCurrency(cat.budget)}
                <span style={{ marginLeft: 8, fontWeight: 600 }}>
                  {cat.variance > 0 ? '+' : ''}{cat.variance.toFixed(1)}%
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', height: 8, background: '#e0e0e0' }}>
              <div style={{ 
                width: `${(cat.budget / data.totalBudget) * 100}%`, 
                background: '#888',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${Math.min(100, (cat.actual / cat.budget) * 100)}%`,
                  background: cat.variance > 10 ? '#1a1a1a' : cat.variance > 0 ? '#444' : '#666',
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quarterly & Drivers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Quarterly Trend */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Quarterly Trend</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {data.quarterly.map((q, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 60, justifyContent: 'flex-end' }}>
                  <div style={{ 
                    width: '60%', 
                    height: `${(q.budget / 1000000) * 50}px`, 
                    background: '#ccc',
                    marginBottom: 2,
                  }} />
                  <div style={{ 
                    width: '60%', 
                    height: `${(q.actual / 1000000) * 50}px`, 
                    background: q.variance > 10 ? '#333' : '#666',
                    position: 'relative',
                    marginTop: -((q.budget / 1000000) * 50 + 2),
                  }} />
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: q.variance > 10 ? '#333' : '#666' }}>
                  {q.variance > 0 ? '+' : ''}{q.variance}%
                </div>
                <div style={{ fontSize: 8, color: '#888' }}>{q.quarter}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: 9, marginTop: '0.5rem', color: '#666' }}>
            <span>□ Budget</span>
            <span>■ Actual</span>
          </div>
        </div>

        {/* Variance Drivers */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Variance Drivers</div>
          {data.drivers.map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.35rem 0',
              borderBottom: '1px solid #f0f0f0',
              fontSize: 10,
            }}>
              <span style={{ flex: 1 }}>{d.driver}</span>
              <span style={{ 
                fontWeight: 600, 
                color: d.impact > 0 ? '#333' : '#666',
              }}>
                {d.impact > 0 ? '+' : ''}{formatCurrency(d.impact)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetVarianceChart;
