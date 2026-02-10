import React from 'react';
import { chartColors } from './colors';

interface SchemaChange {
  id: string;
  table: string;
  field: string;
  changeType: 'Added' | 'Removed' | 'Modified' | 'Type Changed';
  oldValue?: string;
  newValue?: string;
  detectedAt: string;
  impact: 'Breaking' | 'Non-Breaking' | 'Unknown';
  affectedPipelines: string[];
  status: 'Acknowledged' | 'Investigating' | 'Resolved' | 'New';
}

interface SchemaDriftTrackerProps {
  data?: SchemaChange[];
  totalTables?: number;
  monitoredSources?: number;
}

const defaultData: SchemaChange[] = [
  { id: 'SD-001', table: 'customers', field: 'credit_score', changeType: 'Type Changed', oldValue: 'INT', newValue: 'FLOAT', detectedAt: '2024-12-13 08:23', impact: 'Breaking', affectedPipelines: ['Risk Scoring', 'Feature Store ETL'], status: 'Investigating' },
  { id: 'SD-002', table: 'transactions', field: 'fraud_flag', changeType: 'Added', newValue: 'BOOLEAN', detectedAt: '2024-12-12 14:15', impact: 'Non-Breaking', affectedPipelines: ['Fraud Detection'], status: 'Acknowledged' },
  { id: 'SD-003', table: 'user_events', field: 'session_id', changeType: 'Removed', oldValue: 'VARCHAR(255)', detectedAt: '2024-12-12 09:45', impact: 'Breaking', affectedPipelines: ['Recommendations', 'User Analytics'], status: 'New' },
  { id: 'SD-004', table: 'products', field: 'category_id', changeType: 'Modified', oldValue: 'NOT NULL', newValue: 'NULLABLE', detectedAt: '2024-12-11 16:30', impact: 'Unknown', affectedPipelines: ['Product ML', 'Search'], status: 'Resolved' },
  { id: 'SD-005', table: 'orders', field: 'shipping_method', changeType: 'Added', newValue: 'ENUM', detectedAt: '2024-12-10 11:00', impact: 'Non-Breaking', affectedPipelines: [], status: 'Acknowledged' },
];

export const SchemaDriftTracker: React.FC<SchemaDriftTrackerProps> = ({
  data = defaultData,
  totalTables = 156,
  monitoredSources = 12,
}) => {
  const byStatus = data.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const breakingChanges = data.filter(d => d.impact === 'Breaking').length;

  const getImpactStyle = (impact: string) => {
    switch (impact) {
      case 'Breaking': return { bg: chartColors.text.primary, color: chartColors.background };
      case 'Non-Breaking': return { bg: chartColors.surface, color: chartColors.text.primary };
      default: return { bg: chartColors.gray[300], color: chartColors.text.primary };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New': return { bg: chartColors.text.primary, color: chartColors.background };
      case 'Investigating': return { bg: chartColors.gray[400], color: chartColors.text.primary };
      case 'Acknowledged': return { bg: chartColors.surface, color: chartColors.text.primary };
      case 'Resolved': return { bg: chartColors.background, color: chartColors.text.secondary };
      default: return { bg: chartColors.background, color: chartColors.text.primary };
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'Added': return '+';
      case 'Removed': return '−';
      case 'Modified': return '~';
      case 'Type Changed': return '⇄';
      default: return '?';
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Schema Drift Tracker
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Breaking changes in data contracts
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.75rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>SOURCES</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{monitoredSources}</div>
        </div>
        <div style={{ padding: '0.75rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>TABLES</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{totalTables}</div>
        </div>
        <div style={{ padding: '0.75rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>CHANGES</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '0.75rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: breakingChanges > 0 ? chartColors.surface : chartColors.background }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>BREAKING</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{breakingChanges}</div>
        </div>
        <div style={{ padding: '0.75rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>NEW</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{byStatus['New'] || 0}</div>
        </div>
        <div style={{ padding: '0.75rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>INVESTIGATING</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{byStatus['Investigating'] || 0}</div>
        </div>
      </div>

      {/* Schema Changes Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}`, width: '60px' }}>ID</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Table.Field</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}`, width: '80px' }}>Change</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Details</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}`, width: '90px' }}>Impact</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Affected Pipelines</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}`, width: '100px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((change, idx) => {
            const impactStyle = getImpactStyle(change.impact);
            const statusStyle = getStatusStyle(change.status);
            return (
              <tr key={change.id} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  {change.id}
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{change.table}</span>
                  <span style={{ color: chartColors.text.secondary }}>.</span>
                  <span style={{ fontFamily: 'monospace' }}>{change.field}</span>
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    padding: '0.2rem 0.4rem',
                    backgroundColor: chartColors.surface,
                    border: `1px solid ${chartColors.border}`,
                    fontSize: '0.7rem'
                  }}>
                    <span style={{ fontWeight: 700 }}>{getChangeTypeIcon(change.changeType)}</span>
                    {change.changeType}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  {change.oldValue && <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{change.oldValue}</span>}
                  {change.oldValue && change.newValue && ' → '}
                  {change.newValue && <span style={{ fontWeight: 500 }}>{change.newValue}</span>}
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                  <span style={{ 
                    padding: '0.2rem 0.4rem',
                    backgroundColor: impactStyle.bg,
                    color: impactStyle.color,
                    fontSize: '0.7rem',
                    fontWeight: 500
                  }}>
                    {change.impact}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontSize: '0.7rem' }}>
                  {change.affectedPipelines.length > 0 
                    ? change.affectedPipelines.join(', ')
                    : <span style={{ color: chartColors.text.secondary }}>None identified</span>
                  }
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem',
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                    fontSize: '0.7rem',
                    border: `1px solid ${chartColors.border}`
                  }}>
                    {change.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.75rem', borderTop: `1px solid ${chartColors.border}`, paddingTop: '1rem' }}>
        <div><strong>Change Types:</strong></div>
        <span><strong>+</strong> Added</span>
        <span><strong>−</strong> Removed</span>
        <span><strong>~</strong> Modified</span>
        <span><strong>⇄</strong> Type Changed</span>
      </div>
    </div>
  );
};

export default SchemaDriftTracker;
