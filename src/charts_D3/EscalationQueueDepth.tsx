"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Escalation Queue Depth - Human review backlog monitoring
const defaultData = {
  timestamp: new Date().toISOString(),
  currentDepth: 47,
  target: 30,
  avgWaitTime: 23, // minutes
  targetWaitTime: 15,
  status: 'warning',
  byPriority: [
    { priority: 'Critical', count: 3, avgWait: 8, target: 5 },
    { priority: 'High', count: 12, avgWait: 18, target: 15 },
    { priority: 'Medium', count: 24, avgWait: 28, target: 30 },
    { priority: 'Low', count: 8, avgWait: 45, target: 60 },
  ],
  byType: [
    { type: 'Model Override', count: 18, percentage: 38 },
    { type: 'Compliance Review', count: 12, percentage: 26 },
    { type: 'Customer Escalation', count: 9, percentage: 19 },
    { type: 'Exception Request', count: 5, percentage: 11 },
    { type: 'Other', count: 3, percentage: 6 },
  ],
  reviewers: [
    { name: 'Team A', active: 4, queue: 18, avgResolution: 12 },
    { name: 'Team B', active: 3, queue: 15, avgResolution: 14 },
    { name: 'Team C', active: 2, queue: 14, avgResolution: 18 },
  ],
  hourlyTrend: [
    { hour: '6AM', depth: 12 },
    { hour: '8AM', depth: 28 },
    { hour: '10AM', depth: 45 },
    { hour: '12PM', depth: 52 },
    { hour: '2PM', depth: 47 },
    { hour: '4PM', depth: 38 },
  ],
  stats: {
    resolvedToday: 156,
    avgResolutionTime: 14,
    breachedSLA: 8,
    escalatedToManager: 3,
  },
};

interface EscalationQueueDepthProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const EscalationQueueDepth: React.FC<EscalationQueueDepthProps> = ({
  data = defaultData,
  width = 700,
  height = 480,
  title = "Escalation Queue Depth"
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return '#1a1a1a';
      case 'High': return '#444';
      case 'Medium': return '#777';
      case 'Low': return '#aaa';
      default: return '#ccc';
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Human review backlog • Real-time</p>
          </div>
          <div style={{
            padding: '0.35rem 0.75rem',
            fontSize: 10,
            fontWeight: 600,
            background: data.status === 'healthy' ? '#e8e8e8' : data.status === 'warning' ? '#666' : '#333',
            color: data.status === 'healthy' ? '#333' : '#fff',
            textTransform: 'uppercase',
          }}>
            {data.status}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: data.currentDepth > data.target ? '#333' : '#444', color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.currentDepth}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Queue Depth</div>
          <div style={{ fontSize: 9, color: '#aaa' }}>Target: {data.target}</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: data.avgWaitTime > data.targetWaitTime ? '#333' : '#666' }}>{data.avgWaitTime}m</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Avg Wait</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.stats.resolvedToday}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Resolved Today</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center', borderLeft: data.stats.breachedSLA > 5 ? '3px solid #333' : 'none' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: data.stats.breachedSLA > 5 ? '#333' : '#666' }}>{data.stats.breachedSLA}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>SLA Breach</div>
        </div>
      </div>

      {/* Priority Breakdown & Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* By Priority */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Priority</div>
          {data.byPriority.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.35rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{
                width: 60,
                fontSize: 9,
                fontWeight: 600,
                padding: '0.15rem 0.35rem',
                background: getPriorityColor(p.priority),
                color: i < 2 ? '#fff' : '#333',
              }}>
                {p.priority}
              </span>
              <span style={{ width: 30, textAlign: 'center', fontSize: 14, fontWeight: 700, marginLeft: '0.5rem' }}>{p.count}</span>
              <div style={{ flex: 1, marginLeft: '0.5rem' }}>
                <div style={{ height: 6, background: '#e0e0e0' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (p.avgWait / p.target) * 100)}%`, background: p.avgWait > p.target ? '#333' : '#888' }} />
                </div>
              </div>
              <span style={{ width: 45, textAlign: 'right', fontSize: 10, color: p.avgWait > p.target ? '#333' : '#666' }}>{p.avgWait}m</span>
            </div>
          ))}
        </div>

        {/* Hourly Trend */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Today's Trend</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 4, height: 60 }}>
            {data.hourlyTrend.map((h, i) => {
              const height = (h.depth / 60) * 50;
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height, background: h.depth > data.target ? '#333' : '#888', marginBottom: 4 }} />
                  <div style={{ fontSize: 8, color: '#888' }}>{h.hour}</div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: '2px dashed #ccc', marginTop: -25, position: 'relative' }}>
            <span style={{ position: 'absolute', right: 0, top: -10, fontSize: 8, color: '#888', background: '#fff', padding: '0 4px' }}>
              Target: {data.target}
            </span>
          </div>
        </div>
      </div>

      {/* Reviewers & Types */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Reviewers */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Reviewer Teams</div>
          {data.reviewers.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #f0f0f0', fontSize: 10 }}>
              <span style={{ fontWeight: 500 }}>{r.name}</span>
              <span>{r.active} active</span>
              <span>{r.queue} queued</span>
              <span>{r.avgResolution}m avg</span>
            </div>
          ))}
        </div>

        {/* By Type */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Type</div>
          {data.byType.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0', fontSize: 10 }}>
              <span style={{ flex: 1 }}>{t.type}</span>
              <div style={{ width: 60, height: 6, background: '#e0e0e0', marginRight: 8 }}>
                <div style={{ height: '100%', width: `${t.percentage}%`, background: '#555' }} />
              </div>
              <span style={{ width: 25, textAlign: 'right' }}>{t.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscalationQueueDepth;
