import React from 'react';
import { chartColors } from './colors';

interface DataSource {
  name: string;
  type: 'Database' | 'API' | 'File' | 'Stream';
  expectedFrequency: string;
  lastUpdate: string;
  latencyMinutes: number;
  status: 'Fresh' | 'Stale' | 'Critical';
  slaMinutes: number;
  consumers: string[];
}

interface DataFreshnessMonitorProps {
  data?: DataSource[];
}

const defaultData: DataSource[] = [
  { name: 'Customer Transactions', type: 'Database', expectedFrequency: 'Real-time', lastUpdate: '2024-12-13 12:45:23', latencyMinutes: 2, status: 'Fresh', slaMinutes: 15, consumers: ['Fraud Detection', 'Risk Scoring'] },
  { name: 'Feature Store', type: 'Database', expectedFrequency: 'Hourly', lastUpdate: '2024-12-13 12:00:00', latencyMinutes: 47, status: 'Fresh', slaMinutes: 60, consumers: ['All ML Models'] },
  { name: 'External Credit Bureau', type: 'API', expectedFrequency: 'Daily', lastUpdate: '2024-12-13 06:00:00', latencyMinutes: 407, status: 'Fresh', slaMinutes: 1440, consumers: ['Underwriting', 'Risk Scoring'] },
  { name: 'User Events Stream', type: 'Stream', expectedFrequency: 'Real-time', lastUpdate: '2024-12-13 12:44:58', latencyMinutes: 0, status: 'Fresh', slaMinutes: 5, consumers: ['Recommendations', 'Personalization'] },
  { name: 'Product Catalog', type: 'Database', expectedFrequency: 'Hourly', lastUpdate: '2024-12-13 10:00:00', latencyMinutes: 167, status: 'Stale', slaMinutes: 120, consumers: ['Search', 'Recommendations'] },
  { name: 'Market Data Feed', type: 'API', expectedFrequency: '15 min', lastUpdate: '2024-12-13 12:30:00', latencyMinutes: 17, status: 'Stale', slaMinutes: 15, consumers: ['Trading ML', 'Risk Analytics'] },
  { name: 'Training Data Export', type: 'File', expectedFrequency: 'Weekly', lastUpdate: '2024-12-08 00:00:00', latencyMinutes: 7727, status: 'Fresh', slaMinutes: 10080, consumers: ['Model Training'] },
  { name: 'Compliance Reports', type: 'Database', expectedFrequency: 'Daily', lastUpdate: '2024-12-11 00:00:00', latencyMinutes: 2927, status: 'Critical', slaMinutes: 1440, consumers: ['Audit', 'Compliance'] },
];

export const DataFreshnessMonitor: React.FC<DataFreshnessMonitorProps> = ({
  data = defaultData,
}) => {
  const fresh = data.filter(d => d.status === 'Fresh').length;
  const stale = data.filter(d => d.status === 'Stale').length;
  const critical = data.filter(d => d.status === 'Critical').length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Fresh': return { bg: chartColors.background, border: chartColors.border, text: chartColors.text.primary, indicator: '●' };
      case 'Stale': return { bg: chartColors.surface, border: chartColors.text.primary, text: chartColors.text.primary, indicator: '◐' };
      case 'Critical': return { bg: chartColors.text.primary, border: chartColors.text.primary, text: chartColors.background, indicator: '○' };
      default: return { bg: chartColors.background, border: chartColors.border, text: chartColors.text.primary, indicator: '?' };
    }
  };

  const formatLatency = (minutes: number) => {
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
    return `${Math.floor(minutes / 1440)}d ${Math.floor((minutes % 1440) / 60)}h ago`;
  };

  const getLatencyPct = (source: DataSource) => {
    return Math.min((source.latencyMinutes / source.slaMinutes) * 100, 150);
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Data Freshness Monitor
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Staleness by source • As of {new Date().toLocaleTimeString()}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL SOURCES</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● FRESH</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{fresh}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>◐ STALE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{stale}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: critical > 0 ? chartColors.text.primary : chartColors.surface, color: critical > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>○ CRITICAL</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{critical}</div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {data.map(source => {
          const statusStyle = getStatusStyle(source.status);
          const latencyPct = getLatencyPct(source);
          return (
            <div 
              key={source.name}
              style={{ 
                padding: '1rem',
                backgroundColor: statusStyle.bg,
                border: `2px solid ${statusStyle.border}`,
                color: statusStyle.text
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{statusStyle.indicator} {source.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{source.type} • {source.expectedFrequency}</div>
                </div>
                <span style={{ 
                  padding: '0.2rem 0.5rem',
                  backgroundColor: source.status === 'Critical' ? chartColors.background : chartColors.surface,
                  color: source.status === 'Critical' ? chartColors.text.primary : chartColors.text.primary,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  border: `1px solid ${chartColors.border}`
                }}>
                  {source.status}
                </span>
              </div>

              {/* Latency Bar */}
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                  <span>Last Update: {formatLatency(source.latencyMinutes)}</span>
                  <span>SLA: {source.slaMinutes < 60 ? `${source.slaMinutes}m` : `${Math.floor(source.slaMinutes / 60)}h`}</span>
                </div>
                <div style={{ 
                  height: '6px', 
                  backgroundColor: source.status === 'Critical' ? chartColors.background : chartColors.border,
                  position: 'relative'
                }}>
                  <div style={{ 
                    width: `${Math.min(latencyPct, 100)}%`,
                    height: '100%',
                    backgroundColor: source.status === 'Critical' ? chartColors.background : 
                                     latencyPct > 100 ? chartColors.text.primary : 
                                     latencyPct > 80 ? chartColors.gray[400] : chartColors.gray[300]
                  }} />
                  {/* SLA marker */}
                  <div style={{ 
                    position: 'absolute',
                    left: '100%',
                    top: '-2px',
                    height: '10px',
                    width: '2px',
                    backgroundColor: source.status === 'Critical' ? chartColors.background : chartColors.text.primary
                  }} />
                </div>
                {latencyPct > 100 && (
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, marginTop: '0.25rem' }}>
                    ▲ {Math.round(latencyPct - 100)}% over SLA
                  </div>
                )}
              </div>

              {/* Consumers */}
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                Consumers: {source.consumers.join(', ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', fontSize: '0.75rem', borderTop: `1px solid ${chartColors.border}`, paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>●</span><span>Fresh (within SLA)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>◐</span><span>Stale (approaching SLA)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>○</span><span>Critical (SLA breached)</span>
        </div>
      </div>
    </div>
  );
};

export default DataFreshnessMonitor;
