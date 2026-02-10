"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, auditActions, getContrastColor } from './colors';

// Audit Trail Timeline - Immutable decision log for SOX/HIPAA/GDPR compliance
const defaultData = {
  period: 'Last 30 Days',
  totalEvents: 1247,
  uniqueActors: 23,
  criticalActions: 18,
  entries: [
    { id: 'evt-001', timestamp: '2024-12-13T14:32:00Z', actor: 'sarah.chen@corp.com', actorRole: 'ML Engineer', action: 'approve', resource: 'Model v2.3.1', resourceType: 'model', details: 'Promoted to production after validation', hash: 'a3f8c2d1', immutable: true },
    { id: 'evt-002', timestamp: '2024-12-13T14:15:00Z', actor: 'risk.committee', actorRole: 'Committee', action: 'review', resource: 'Risk Assessment Q4', resourceType: 'document', details: 'Quarterly risk review completed', hash: 'b7e4f9a2', immutable: true },
    { id: 'evt-003', timestamp: '2024-12-13T13:45:00Z', actor: 'james.wilson@corp.com', actorRole: 'Data Scientist', action: 'update', resource: 'Feature Pipeline', resourceType: 'pipeline', details: 'Updated drift detection threshold', hash: 'c9d2e8f3', immutable: true },
    { id: 'evt-004', timestamp: '2024-12-13T12:20:00Z', actor: 'compliance.bot', actorRole: 'System', action: 'create', resource: 'Compliance Report', resourceType: 'report', details: 'Auto-generated monthly compliance report', hash: 'd1a5b7c4', immutable: true },
    { id: 'evt-005', timestamp: '2024-12-13T11:30:00Z', actor: 'michael.brown@corp.com', actorRole: 'CISO', action: 'reject', resource: 'Vendor Access Request', resourceType: 'access', details: 'Insufficient security documentation', hash: 'e2f6c8d5', immutable: true },
    { id: 'evt-006', timestamp: '2024-12-13T10:15:00Z', actor: 'anna.schmidt@corp.com', actorRole: 'Compliance Officer', action: 'approve', resource: 'Data Retention Policy', resourceType: 'policy', details: 'Annual policy renewal approved', hash: 'f3a7d9e6', immutable: true },
    { id: 'evt-007', timestamp: '2024-12-12T16:45:00Z', actor: 'system.scheduler', actorRole: 'System', action: 'delete', resource: 'Expired Training Data', resourceType: 'data', details: 'Automated retention policy execution', hash: 'g4b8e0f7', immutable: true },
    { id: 'evt-008', timestamp: '2024-12-12T15:30:00Z', actor: 'david.kim@corp.com', actorRole: 'ML Engineer', action: 'update', resource: 'Model Config', resourceType: 'config', details: 'Adjusted inference threshold', hash: 'h5c9f1g8', immutable: true },
  ],
  actionSummary: [
    { action: 'create', count: 234, percent: 19 },
    { action: 'update', count: 456, percent: 37 },
    { action: 'approve', count: 189, percent: 15 },
    { action: 'review', count: 201, percent: 16 },
    { action: 'reject', count: 45, percent: 4 },
    { action: 'delete', count: 122, percent: 10 },
  ],
};

const formatTimestamp = (ts: string) => {
  const date = new Date(ts);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

const getActionColor = (action: string) => {
  return auditActions[action as keyof typeof auditActions] || '#666';
};

const getActionIcon = (action: string) => {
  switch (action) {
    case 'create': return '+';
    case 'update': return '↻';
    case 'delete': return '×';
    case 'approve': return '✓';
    case 'reject': return '✗';
    case 'review': return '◉';
    default: return '•';
  }
};

interface AuditTrailTimelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const AuditTrailTimeline: React.FC<AuditTrailTimelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Audit Trail Timeline"
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredEntries = filter === 'all' 
    ? data.entries 
    : data.entries.filter(e => e.action === filter);

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
      <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: `1px solid #e0e0e0` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Immutable decision log • {data.period}</p>
          </div>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '0.25rem 0.5rem', 
            fontSize: 11, 
            fontFamily: 'monospace',
            color: '#666'
          }}>
            Chain verified ✓
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Total Events', value: data.totalEvents.toLocaleString() },
          { label: 'Unique Actors', value: data.uniqueActors },
          { label: 'Critical Actions', value: data.criticalActions },
          { label: 'Integrity', value: '100%' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: i === 0 ? chartColors.primary : '#f8f8f8',
            color: i === 0 ? '#fff' : chartColors.primary,
            padding: '0.75rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: i === 0 ? '#ccc' : '#666', textTransform: 'uppercase', marginTop: '0.2rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Action Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: 11,
            border: `1px solid ${filter === 'all' ? chartColors.primary : '#ddd'}`,
            background: filter === 'all' ? chartColors.primary : '#fff',
            color: filter === 'all' ? '#fff' : '#666',
            cursor: 'pointer',
          }}
        >
          All ({data.totalEvents})
        </button>
        {data.actionSummary.map(a => (
          <button
            key={a.action}
            onClick={() => setFilter(a.action)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: 11,
              border: `1px solid ${filter === a.action ? chartColors.primary : '#ddd'}`,
              background: filter === a.action ? chartColors.primary : '#fff',
              color: filter === a.action ? '#fff' : '#666',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {a.action} ({a.count})
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '0.4rem',
          top: 0,
          bottom: 0,
          width: 2,
          background: '#ddd',
        }} />

        {filteredEntries.map((entry, i) => {
          const { date, time } = formatTimestamp(entry.timestamp);
          const isExpanded = expandedId === entry.id;
          
          return (
            <div 
              key={entry.id}
              onClick={() => setExpandedId(isExpanded ? null : entry.id)}
              style={{
                position: 'relative',
                paddingBottom: '1rem',
                cursor: 'pointer',
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-1.25rem',
                top: '0.35rem',
                width: 12,
                height: 12,
                background: getActionColor(entry.action),
                border: `2px solid ${chartColors.white}`,
                boxShadow: '0 0 0 2px #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 8,
                color: '#fff',
                fontWeight: 700,
              }}>
                {getActionIcon(entry.action)}
              </div>

              {/* Entry content */}
              <div style={{
                background: isExpanded ? '#f8f8f8' : '#fff',
                border: `1px solid ${isExpanded ? '#ddd' : '#f0f0f0'}`,
                padding: '0.75rem',
                marginLeft: '0.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ 
                      fontSize: 10, 
                      color: '#888',
                      marginRight: '0.5rem',
                    }}>
                      {date} {time}
                    </span>
                    <span style={{
                      fontSize: 10,
                      padding: '0.1rem 0.35rem',
                      background: getActionColor(entry.action),
                      color: '#fff',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}>
                      {entry.action}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: 9,
                    color: '#999',
                    background: '#f5f5f5',
                    padding: '0.1rem 0.35rem',
                  }}>
                    #{entry.hash}
                  </span>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: chartColors.primary }}>
                    {entry.resource}
                  </div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: '0.15rem' }}>
                    <strong>{entry.actor}</strong> • {entry.actorRole}
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: 11, color: '#555', marginBottom: '0.5rem' }}>
                      {entry.details}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: 10, color: '#888' }}>
                      <span>Resource Type: {entry.resourceType}</span>
                      <span>Immutable: {entry.immutable ? 'Yes ✓' : 'No'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '1rem', 
        paddingTop: '0.75rem', 
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        color: '#888',
      }}>
        <span>Blockchain-anchored • Tamper-evident</span>
        <span>Last verified: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default AuditTrailTimeline;
