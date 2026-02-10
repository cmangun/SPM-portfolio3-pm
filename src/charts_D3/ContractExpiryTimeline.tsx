"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Contract Expiry Timeline - Renewal risk visibility
const defaultData = {
  totalContracts: 34,
  expiringNext90: 5,
  expiringNext180: 8,
  totalACV: 4250000,
  atRiskACV: 890000,
  contracts: [
    { vendor: 'OpenAI', type: 'LLM Provider', acv: 450000, expiry: '2025-01-15', daysRemaining: 33, autoRenew: false, status: 'negotiation', owner: 'ML Platform' },
    { vendor: 'AWS ML Services', type: 'Infrastructure', acv: 1200000, expiry: '2025-03-31', daysRemaining: 108, autoRenew: true, status: 'auto-renew', owner: 'Platform' },
    { vendor: 'Databricks', type: 'Data Platform', acv: 320000, expiry: '2025-02-15', daysRemaining: 64, autoRenew: false, status: 'review', owner: 'Data Eng' },
    { vendor: 'Anthropic', type: 'LLM Provider', acv: 180000, expiry: '2025-04-30', daysRemaining: 138, autoRenew: false, status: 'planning', owner: 'ML Platform' },
    { vendor: 'Weights & Biases', type: 'MLOps', acv: 45000, expiry: '2025-01-31', daysRemaining: 49, autoRenew: true, status: 'auto-renew', owner: 'ML Ops' },
    { vendor: 'Hugging Face', type: 'Model Hub', acv: 36000, expiry: '2025-05-15', daysRemaining: 153, autoRenew: true, status: 'auto-renew', owner: 'ML Platform' },
    { vendor: 'Scale AI', type: 'Data Labeling', acv: 120000, expiry: '2025-02-28', daysRemaining: 77, autoRenew: false, status: 'rfp', owner: 'Data Ops' },
    { vendor: 'Pinecone', type: 'Vector DB', acv: 65000, expiry: '2025-06-30', daysRemaining: 199, autoRenew: false, status: 'planning', owner: 'Platform' },
  ],
  byStatus: [
    { status: 'Auto-Renew', count: 12, acv: 1890000 },
    { status: 'Negotiation', count: 4, acv: 650000 },
    { status: 'RFP', count: 3, acv: 320000 },
    { status: 'Review', count: 8, acv: 890000 },
    { status: 'Planning', count: 7, acv: 500000 },
  ],
  timeline: [
    { month: 'Jan', count: 2, acv: 495000 },
    { month: 'Feb', count: 2, acv: 440000 },
    { month: 'Mar', count: 1, acv: 1200000 },
    { month: 'Apr', count: 1, acv: 180000 },
    { month: 'May', count: 1, acv: 36000 },
    { month: 'Jun', count: 1, acv: 65000 },
  ],
};

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'auto-renew': return { bg: '#e8e8e8', color: '#333' };
    case 'negotiation': return { bg: '#333', color: '#fff' };
    case 'rfp': return { bg: '#666', color: '#fff' };
    case 'review': return { bg: '#888', color: '#fff' };
    case 'planning': return { bg: '#aaa', color: '#333' };
    default: return { bg: '#f0f0f0', color: '#666' };
  }
};

const getDaysStyle = (days: number) => {
  if (days <= 30) return { color: '#1a1a1a', fontWeight: 700 };
  if (days <= 60) return { color: '#444', fontWeight: 600 };
  if (days <= 90) return { color: '#666', fontWeight: 500 };
  return { color: '#888', fontWeight: 400 };
};

interface ContractExpiryTimelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ContractExpiryTimeline: React.FC<ContractExpiryTimelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Contract Expiry Timeline"
}) => {
  const formatCurrency = (val: number) => val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${(val / 1000).toFixed(0)}K`;

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
        <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>AI/ML vendor contract renewals</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{formatCurrency(data.totalACV)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Total ACV</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.expiringNext90}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Next 90d</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.expiringNext180}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Next 180d</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center', borderLeft: '3px solid #333' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(data.atRiskACV)}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>At Risk ACV</div>
        </div>
      </div>

      {/* Contract Table */}
      <div style={{ marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: 9, textTransform: 'uppercase' }}>Vendor</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: 9, textTransform: 'uppercase' }}>Type</th>
              <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>ACV</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Days Left</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.contracts.slice(0, 6).map((contract, i) => {
              const statusStyle = getStatusStyle(contract.status);
              const daysStyle = getDaysStyle(contract.daysRemaining);
              return (
                <tr key={i}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 600 }}>{contract.vendor}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>{contract.owner}</div>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', color: '#666' }}>{contract.type}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontWeight: 600 }}>
                    {formatCurrency(contract.acv)}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center', ...daysStyle }}>
                    {contract.daysRemaining}d
                    <div style={{ fontSize: 8, color: '#888', fontWeight: 400 }}>{contract.expiry}</div>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      fontSize: 9,
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}>
                      {contract.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Timeline & Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Expiry Timeline */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Expiry Timeline (6 months)</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 4, height: 60 }}>
            {data.timeline.map((m, i) => {
              const maxACV = Math.max(...data.timeline.map(t => t.acv));
              const height = (m.acv / maxACV) * 50;
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height, background: m.count > 1 ? '#333' : '#666', marginBottom: 4 }} />
                  <div style={{ fontSize: 9, fontWeight: 600 }}>{m.count}</div>
                  <div style={{ fontSize: 8, color: '#888' }}>{m.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Status */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Status</div>
          {data.byStatus.map((s, i) => {
            const style = getStatusStyle(s.status);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0', fontSize: 10 }}>
                <span style={{
                  width: 80,
                  padding: '0.1rem 0.3rem',
                  fontSize: 9,
                  background: style.bg,
                  color: style.color,
                }}>
                  {s.status}
                </span>
                <span style={{ width: 25, textAlign: 'center', fontWeight: 600 }}>{s.count}</span>
                <span style={{ flex: 1, color: '#666' }}>{formatCurrency(s.acv)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContractExpiryTimeline;
