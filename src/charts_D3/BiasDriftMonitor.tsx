"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography } from './colors';

// Bias Drift Monitor - Fairness metrics over time
const defaultData = {
  modelName: 'Credit Decisioning Model v3.1',
  modelId: 'MDL-001',
  monitoringPeriod: 'Last 90 Days',
  lastUpdated: '2024-12-13',
  overallStatus: 'warning',
  protectedAttributes: ['gender', 'age', 'ethnicity', 'income_bracket'],
  metrics: [
    {
      name: 'Demographic Parity',
      description: 'Equal approval rates across groups',
      threshold: 0.80,
      current: 0.85,
      trend: 'stable',
      status: 'passing',
      history: [0.88, 0.87, 0.86, 0.85, 0.85, 0.84, 0.85, 0.85],
    },
    {
      name: 'Equalized Odds',
      description: 'Equal TPR and FPR across groups',
      threshold: 0.80,
      current: 0.78,
      trend: 'declining',
      status: 'warning',
      history: [0.85, 0.84, 0.83, 0.82, 0.81, 0.80, 0.79, 0.78],
    },
    {
      name: 'Calibration',
      description: 'Predicted probabilities match outcomes',
      threshold: 0.85,
      current: 0.91,
      trend: 'stable',
      status: 'passing',
      history: [0.90, 0.91, 0.90, 0.91, 0.92, 0.91, 0.91, 0.91],
    },
    {
      name: 'Individual Fairness',
      description: 'Similar individuals treated similarly',
      threshold: 0.75,
      current: 0.72,
      trend: 'declining',
      status: 'failing',
      history: [0.80, 0.79, 0.78, 0.77, 0.76, 0.74, 0.73, 0.72],
    },
  ],
  groupBreakdown: [
    { attribute: 'Gender', groups: [{ name: 'Male', rate: 0.68 }, { name: 'Female', rate: 0.64 }, { name: 'Other', rate: 0.62 }] },
    { attribute: 'Age', groups: [{ name: '18-25', rate: 0.52 }, { name: '26-40', rate: 0.72 }, { name: '41-60', rate: 0.75 }, { name: '60+', rate: 0.70 }] },
    { attribute: 'Ethnicity', groups: [{ name: 'Group A', rate: 0.70 }, { name: 'Group B', rate: 0.65 }, { name: 'Group C', rate: 0.63 }, { name: 'Group D', rate: 0.68 }] },
  ],
  alerts: [
    { severity: 'high', message: 'Individual Fairness below threshold for 3 consecutive weeks', date: '2024-12-10' },
    { severity: 'medium', message: 'Equalized Odds trending downward', date: '2024-12-05' },
    { severity: 'low', message: 'Age group 18-25 approval rate 20% below average', date: '2024-12-01' },
  ],
  recommendations: [
    'Review feature weights for age-correlated variables',
    'Conduct disparate impact analysis on recent cohorts',
    'Consider retraining with balanced sampling',
  ],
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'passing': return { bg: '#e8e8e8', color: '#333', icon: '✓' };
    case 'warning': return { bg: '#666', color: '#fff', icon: '!' };
    case 'failing': return { bg: '#1a1a1a', color: '#fff', icon: '✗' };
    default: return { bg: '#f0f0f0', color: '#666', icon: '?' };
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving': return '↑';
    case 'declining': return '↓';
    case 'stable': return '→';
    default: return '•';
  }
};

interface BiasDriftMonitorProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BiasDriftMonitor: React.FC<BiasDriftMonitorProps> = ({
  data = defaultData,
  width = 700,
  height = 560,
  title = "Bias Drift Monitor"
}) => {
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const metric = data.metrics[selectedMetric];

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>{data.modelName} • {data.monitoringPeriod}</p>
          </div>
          <div style={{
            padding: '0.35rem 0.75rem',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            ...getStatusStyle(data.overallStatus),
          }}>
            {data.overallStatus}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {data.metrics.map((m, i) => {
          const style = getStatusStyle(m.status);
          const isSelected = selectedMetric === i;
          return (
            <div
              key={i}
              onClick={() => setSelectedMetric(i)}
              style={{
                padding: '0.75rem',
                background: isSelected ? '#1a1a1a' : '#f8f8f8',
                color: isSelected ? '#fff' : '#333',
                cursor: 'pointer',
                border: `2px solid ${isSelected ? '#1a1a1a' : '#e0e0e0'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{(m.current * 100).toFixed(0)}%</span>
                <span style={{
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  background: isSelected ? style.bg : style.bg,
                  color: isSelected && style.bg === '#e8e8e8' ? '#333' : style.color,
                }}>
                  {style.icon}
                </span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 500 }}>{m.name}</div>
              <div style={{ fontSize: 9, color: isSelected ? '#aaa' : '#888', marginTop: '0.15rem' }}>
                Threshold: {(m.threshold * 100).toFixed(0)}% {getTrendIcon(m.trend)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Metric Detail */}
      <div style={{ 
        marginBottom: '1.25rem', 
        padding: '1rem', 
        background: '#fafafa',
        border: '1px solid #ddd',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{metric.name}</div>
            <div style={{ fontSize: 11, color: '#666' }}>{metric.description}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#888' }}>Trend: <strong>{metric.trend}</strong> {getTrendIcon(metric.trend)}</div>
          </div>
        </div>

        {/* Sparkline */}
        <div style={{ display: 'flex', alignItems: 'end', gap: 2, height: 40, marginBottom: '0.75rem' }}>
          {metric.history.map((val, i) => {
            const height = ((val - 0.5) / 0.5) * 40; // Scale 0.5-1.0 to 0-40px
            const isAboveThreshold = val >= metric.threshold;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: Math.max(4, height),
                  background: isAboveThreshold ? '#666' : '#333',
                  position: 'relative',
                }}
              >
                {i === metric.history.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 9,
                    fontWeight: 600,
                  }}>
                    {(val * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ 
          borderTop: `2px dashed #888`, 
          marginTop: -((metric.threshold - 0.5) / 0.5) * 40 - 2,
          position: 'relative',
        }}>
          <span style={{ 
            position: 'absolute', 
            right: 0, 
            top: -8, 
            fontSize: 9, 
            color: '#888',
            background: '#fafafa',
            padding: '0 0.25rem',
          }}>
            Threshold: {(metric.threshold * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Group Breakdown */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Approval Rate by Group</div>
        {data.groupBreakdown.map((attr, i) => (
          <div key={i} style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 10, color: '#666', marginBottom: '0.35rem' }}>{attr.attribute}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {attr.groups.map((g, j) => {
                const avgRate = attr.groups.reduce((a, b) => a + b.rate, 0) / attr.groups.length;
                const deviation = ((g.rate - avgRate) / avgRate) * 100;
                return (
                  <div key={j} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: 6, background: '#e0e0e0', marginBottom: '0.2rem' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${g.rate * 100}%`, 
                        background: Math.abs(deviation) > 10 ? '#333' : '#888',
                      }} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>{(g.rate * 100).toFixed(0)}%</div>
                    <div style={{ fontSize: 9, color: '#888' }}>{g.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Active Alerts</div>
        {data.alerts.map((alert, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem',
            marginBottom: '0.35rem',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderLeft: `3px solid ${alert.severity === 'high' ? '#1a1a1a' : alert.severity === 'medium' ? '#666' : '#999'}`,
          }}>
            <span style={{ fontSize: 10, color: '#888', width: 70 }}>{alert.date}</span>
            <span style={{ fontSize: 11, flex: 1 }}>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiasDriftMonitor;
