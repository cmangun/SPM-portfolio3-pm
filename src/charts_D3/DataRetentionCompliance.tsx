import React from 'react';
import { chartColors } from './colors';

interface RetentionPolicy {
  dataType: string;
  category: 'PII' | 'PHI' | 'Financial' | 'ML Training' | 'Logs' | 'General';
  retentionPeriod: string;
  retentionDays: number;
  currentOldestDays: number;
  recordCount: number;
  complianceStatus: 'Compliant' | 'Warning' | 'Violation';
  autoDelete: boolean;
}

interface DataRetentionComplianceProps {
  data?: RetentionPolicy[];
  lastAudit?: string;
}

const defaultData: RetentionPolicy[] = [
  { dataType: 'Customer PII', category: 'PII', retentionPeriod: '7 years', retentionDays: 2555, currentOldestDays: 1890, recordCount: 2450000, complianceStatus: 'Compliant', autoDelete: true },
  { dataType: 'Model Training Data', category: 'ML Training', retentionPeriod: '3 years', retentionDays: 1095, currentOldestDays: 1120, recordCount: 18500000, complianceStatus: 'Warning', autoDelete: false },
  { dataType: 'Inference Logs', category: 'Logs', retentionPeriod: '90 days', retentionDays: 90, currentOldestDays: 88, recordCount: 890000000, complianceStatus: 'Compliant', autoDelete: true },
  { dataType: 'Audit Trail', category: 'General', retentionPeriod: '10 years', retentionDays: 3650, currentOldestDays: 2100, recordCount: 45000000, complianceStatus: 'Compliant', autoDelete: false },
  { dataType: 'Patient Health Records', category: 'PHI', retentionPeriod: '6 years', retentionDays: 2190, currentOldestDays: 2400, recordCount: 1200000, complianceStatus: 'Violation', autoDelete: false },
  { dataType: 'Financial Transactions', category: 'Financial', retentionPeriod: '7 years', retentionDays: 2555, currentOldestDays: 2100, recordCount: 78000000, complianceStatus: 'Compliant', autoDelete: true },
  { dataType: 'Feature Store Snapshots', category: 'ML Training', retentionPeriod: '1 year', retentionDays: 365, currentOldestDays: 340, recordCount: 52000000, complianceStatus: 'Compliant', autoDelete: true },
  { dataType: 'API Request Logs', category: 'Logs', retentionPeriod: '30 days', retentionDays: 30, currentOldestDays: 45, recordCount: 2100000000, complianceStatus: 'Violation', autoDelete: true },
];

export const DataRetentionCompliance: React.FC<DataRetentionComplianceProps> = ({
  data = defaultData,
  lastAudit = '2024-12-10',
}) => {
  const compliant = data.filter(d => d.complianceStatus === 'Compliant').length;
  const warning = data.filter(d => d.complianceStatus === 'Warning').length;
  const violation = data.filter(d => d.complianceStatus === 'Violation').length;
  const totalRecords = data.reduce((sum, d) => sum + d.recordCount, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Compliant': return { bg: chartColors.background, border: chartColors.border, text: chartColors.text.primary };
      case 'Warning': return { bg: chartColors.surface, border: chartColors.text.primary, text: chartColors.text.primary };
      case 'Violation': return { bg: chartColors.text.primary, border: chartColors.text.primary, text: chartColors.background };
      default: return { bg: chartColors.background, border: chartColors.border, text: chartColors.text.primary };
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'PII': return { weight: 'bold' as const };
      case 'PHI': return { weight: 'bold' as const };
      case 'Financial': return { weight: 'bold' as const };
      default: return { weight: 'normal' as const };
    }
  };

  const formatRecords = (n: number) => {
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)}B`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Data Retention Compliance
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Aging vs policy • Last audit: {lastAudit}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>DATA TYPES</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>COMPLIANT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{compliant}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>WARNING</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{warning}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: violation > 0 ? chartColors.text.primary : chartColors.surface, color: violation > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>VIOLATIONS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{violation}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL RECORDS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{formatRecords(totalRecords)}</div>
        </div>
      </div>

      {/* Retention Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Data Type</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Policy</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Oldest Data</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Records</th>
            <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Auto-Delete</th>
            <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            const statusStyle = getStatusStyle(item.complianceStatus);
            const catStyle = getCategoryStyle(item.category);
            const agingPct = (item.currentOldestDays / item.retentionDays) * 100;
            return (
              <tr key={item.dataType} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>
                  {item.dataType}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}` }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    backgroundColor: catStyle.weight === 'bold' ? chartColors.surface : chartColors.background,
                    border: `1px solid ${chartColors.border}`,
                    fontSize: '0.7rem',
                    fontWeight: catStyle.weight
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>
                  {item.retentionPeriod}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>
                  <div>{Math.floor(item.currentOldestDays / 365)}y {Math.floor((item.currentOldestDays % 365) / 30)}m</div>
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: chartColors.border, 
                    marginTop: '0.25rem',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: `${Math.min(agingPct, 100)}%`, 
                      height: '100%', 
                      backgroundColor: agingPct > 100 ? chartColors.text.primary : agingPct > 90 ? chartColors.gray[400] : chartColors.gray[300]
                    }} />
                  </div>
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right', fontFamily: 'monospace' }}>
                  {formatRecords(item.recordCount)}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                  {item.autoDelete ? '✓' : '—'}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem',
                    backgroundColor: statusStyle.bg,
                    border: `1px solid ${statusStyle.border}`,
                    color: statusStyle.text,
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    {item.complianceStatus}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Actions Needed */}
      {violation > 0 && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>⚠ ACTION REQUIRED</div>
          <div style={{ fontSize: '0.875rem' }}>
            {data.filter(d => d.complianceStatus === 'Violation').map(d => (
              <div key={d.dataType} style={{ marginBottom: '0.5rem' }}>
                • <strong>{d.dataType}</strong>: Data exceeds {d.retentionPeriod} retention policy by {Math.floor((d.currentOldestDays - d.retentionDays) / 30)} months. 
                Immediate deletion required for {formatRecords(Math.floor(d.recordCount * 0.1))} records.
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRetentionCompliance;
