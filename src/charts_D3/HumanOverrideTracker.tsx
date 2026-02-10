"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, hitlColors } from './colors';

// Human Override Tracker - The playbook's key "Executive Control Surface" metric
const defaultData = {
  period: 'Last 30 Days',
  totalDecisions: 45782,
  humanOverrides: 1847,
  overrideRate: 4.03,
  targetRate: 5.0,
  status: 'healthy',
  summary: {
    automated: { count: 43935, percentage: 95.97 },
    humanReview: { count: 2891, percentage: 6.31 },
    humanOverride: { count: 1847, percentage: 4.03 },
    escalated: { count: 312, percentage: 0.68 },
  },
  byReason: [
    { reason: 'Edge case / Outlier', count: 584, percentage: 31.6 },
    { reason: 'Customer escalation', count: 421, percentage: 22.8 },
    { reason: 'Regulatory requirement', count: 312, percentage: 16.9 },
    { reason: 'Model uncertainty', count: 287, percentage: 15.5 },
    { reason: 'Business exception', count: 156, percentage: 8.4 },
    { reason: 'Other', count: 87, percentage: 4.7 },
  ],
  byModel: [
    { model: 'Credit Decisioning', overrides: 623, total: 18234, rate: 3.42 },
    { model: 'Fraud Detection', overrides: 412, total: 12456, rate: 3.31 },
    { model: 'Pricing Engine', overrides: 387, total: 8923, rate: 4.34 },
    { model: 'Claims Processing', overrides: 289, total: 4123, rate: 7.01 },
    { model: 'Customer Routing', overrides: 136, total: 2046, rate: 6.65 },
  ],
  trend: [
    { week: 'W1', rate: 3.8, target: 5.0 },
    { week: 'W2', rate: 4.1, target: 5.0 },
    { week: 'W3', rate: 4.3, target: 5.0 },
    { week: 'W4', rate: 4.0, target: 5.0 },
  ],
  outcomes: {
    overrideCorrect: 78,
    modelCorrect: 18,
    inconclusive: 4,
  },
  alerts: [
    { type: 'info', message: 'Override rate within healthy range (2-8%)', time: 'Now' },
    { type: 'warning', message: 'Claims Processing override rate above 7%', time: '2h ago' },
  ],
};

interface HumanOverrideTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const HumanOverrideTracker: React.FC<HumanOverrideTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 560,
  title = "Human Override Tracker"
}) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'byModel' | 'byReason'>('overview');

  const getStatusColor = () => {
    if (data.overrideRate < 2) return { bg: '#666', label: 'Low - Review Thresholds' };
    if (data.overrideRate > 8) return { bg: '#1a1a1a', label: 'High - Review Model' };
    return { bg: '#444', label: 'Healthy' };
  };

  const status = getStatusColor();

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Executive Control Surface • {data.period}</p>
          </div>
          <div style={{
            padding: '0.35rem 0.75rem',
            fontSize: 10,
            fontWeight: 600,
            background: status.bg,
            color: '#fff',
          }}>
            {status.label}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.overrideRate.toFixed(1)}%</div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#ccc' }}>Override Rate</div>
          <div style={{ fontSize: 9, color: '#aaa', marginTop: '0.25rem' }}>Target: {data.targetRate}%</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.totalDecisions.toLocaleString()}</div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#666' }}>Total Decisions</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.humanOverrides.toLocaleString()}</div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#666' }}>Human Overrides</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.outcomes.overrideCorrect}%</div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#666' }}>Override Accuracy</div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
        {(['overview', 'byModel', 'byReason'] as const).map(view => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: 10,
              border: `1px solid ${selectedView === view ? chartColors.primary : '#ddd'}`,
              background: selectedView === view ? chartColors.primary : '#fff',
              color: selectedView === view ? '#fff' : '#666',
              cursor: 'pointer',
            }}
          >
            {view === 'overview' ? 'Overview' : view === 'byModel' ? 'By Model' : 'By Reason'}
          </button>
        ))}
      </div>

      {/* Content based on view */}
      {selectedView === 'overview' && (
        <>
          {/* Decision Flow */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Decision Flow</div>
            <div style={{ display: 'flex', height: 24, marginBottom: '0.5rem' }}>
              <div style={{ width: `${data.summary.automated.percentage}%`, background: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10 }}>
                Automated ({data.summary.automated.percentage.toFixed(1)}%)
              </div>
              <div style={{ width: `${data.summary.humanOverride.percentage}%`, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9 }}>
                Override
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: 10, color: '#666' }}>
              <span>■ Automated: {data.summary.automated.count.toLocaleString()}</span>
              <span style={{ color: '#333' }}>■ Human Override: {data.summary.humanOverride.count.toLocaleString()}</span>
              <span>■ Escalated: {data.summary.escalated.count.toLocaleString()}</span>
            </div>
          </div>

          {/* Weekly Trend */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Weekly Trend</div>
            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem', height: 60 }}>
              {data.trend.map((week, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: `${(week.rate / 8) * 50}px`,
                    background: week.rate > week.target ? '#333' : '#666',
                    marginBottom: '0.25rem',
                  }} />
                  <div style={{ fontSize: 10, fontWeight: 600 }}>{week.rate}%</div>
                  <div style={{ fontSize: 9, color: '#888' }}>{week.week}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedView === 'byModel' && (
        <div>
          {data.byModel.map((model, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500 }}>{model.model}</span>
                <span style={{ fontWeight: 600, color: model.rate > 6 ? '#333' : '#666' }}>{model.rate.toFixed(1)}%</span>
              </div>
              <div style={{ height: 8, background: '#e0e0e0' }}>
                <div style={{ height: '100%', width: `${(model.rate / 10) * 100}%`, background: model.rate > 6 ? '#333' : '#666' }} />
              </div>
              <div style={{ fontSize: 9, color: '#888', marginTop: '0.15rem' }}>
                {model.overrides.toLocaleString()} overrides / {model.total.toLocaleString()} decisions
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'byReason' && (
        <div>
          {data.byReason.map((reason, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{reason.reason}</div>
              </div>
              <div style={{ width: 100, marginRight: '1rem' }}>
                <div style={{ height: 6, background: '#e0e0e0' }}>
                  <div style={{ height: '100%', width: `${reason.percentage}%`, background: '#444' }} />
                </div>
              </div>
              <div style={{ width: 60, textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{reason.count}</div>
                <div style={{ fontSize: 9, color: '#888' }}>{reason.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts */}
      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0' }}>
        {data.alerts.map((alert, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: 10,
            padding: '0.35rem 0',
            color: alert.type === 'warning' ? '#333' : '#666',
          }}>
            <span>{alert.type === 'warning' ? '⚠' : 'ℹ'}</span>
            <span style={{ flex: 1 }}>{alert.message}</span>
            <span style={{ color: '#888' }}>{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HumanOverrideTracker;
