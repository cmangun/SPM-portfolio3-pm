"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// SLA Compliance Tracker - Uptime, response time by service
const defaultData = {
  period: 'December 2024',
  overallCompliance: 98.7,
  target: 99.5,
  services: [
    { name: 'Inference API', sla: 99.9, actual: 99.92, uptime: 99.95, latencyP50: 45, latencyP99: 180, target: { uptime: 99.9, latencyP99: 200 }, status: 'compliant' },
    { name: 'Model Registry', sla: 99.5, actual: 99.78, uptime: 99.85, latencyP50: 120, latencyP99: 450, target: { uptime: 99.5, latencyP99: 500 }, status: 'compliant' },
    { name: 'Feature Store', sla: 99.5, actual: 99.12, uptime: 99.45, latencyP50: 85, latencyP99: 320, target: { uptime: 99.5, latencyP99: 400 }, status: 'at-risk' },
    { name: 'Training Pipeline', sla: 99.0, actual: 99.45, uptime: 99.60, latencyP50: 2400, latencyP99: 8500, target: { uptime: 99.0, latencyP99: 10000 }, status: 'compliant' },
    { name: 'Data Pipeline', sla: 99.0, actual: 98.89, uptime: 99.10, latencyP50: 340, latencyP99: 1200, target: { uptime: 99.0, latencyP99: 1500 }, status: 'breach' },
  ],
  incidents: [
    { date: '2024-12-10', service: 'Data Pipeline', duration: 47, impact: 'Delayed batch processing', cause: 'Memory exhaustion' },
    { date: '2024-12-05', service: 'Feature Store', duration: 23, impact: 'Increased latency', cause: 'Cache invalidation' },
    { date: '2024-12-01', service: 'Inference API', duration: 8, impact: 'Minor latency spike', cause: 'Deployment rollout' },
  ],
  monthlyTrend: [
    { month: 'Sep', compliance: 99.2 },
    { month: 'Oct', compliance: 99.4 },
    { month: 'Nov', compliance: 99.1 },
    { month: 'Dec', compliance: 98.7 },
  ],
  credits: {
    issued: 2,
    amount: 4500,
    customers: 3,
  },
};

interface SLAComplianceTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const SLAComplianceTracker: React.FC<SLAComplianceTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 500,
  title = "SLA Compliance Tracker"
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'compliant': return { bg: '#e8e8e8', color: '#333' };
      case 'at-risk': return { bg: '#666', color: '#fff' };
      case 'breach': return { bg: '#1a1a1a', color: '#fff' };
      default: return { bg: '#f0f0f0', color: '#666' };
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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Service level performance • {data.period}</p>
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            background: data.overallCompliance >= data.target ? '#e8e8e8' : '#333',
            color: data.overallCompliance >= data.target ? '#333' : '#fff',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{data.overallCompliance}%</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase' }}>Overall SLA</div>
          </div>
        </div>
      </div>

      {/* Service Table */}
      <div style={{ marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: 9, textTransform: 'uppercase' }}>Service</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>SLA Target</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Actual</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Uptime</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>P99 Latency</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.services.map((svc, i) => {
              const style = getStatusStyle(svc.status);
              return (
                <tr key={i}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', fontWeight: 500 }}>{svc.name}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>{svc.sla}%</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center', fontWeight: 600, color: svc.actual >= svc.sla ? '#444' : '#333' }}>
                    {svc.actual}%
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>{svc.uptime}%</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    {svc.latencyP99}ms
                    <span style={{ fontSize: 9, color: '#888', marginLeft: 4 }}>/{svc.target.latencyP99}</span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: style.bg,
                      color: style.color,
                    }}>
                      {svc.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Incidents & Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Recent Incidents */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Recent Incidents</div>
          {data.incidents.map((inc, i) => (
            <div key={i} style={{
              padding: '0.5rem',
              marginBottom: '0.35rem',
              background: '#f8f8f8',
              borderLeft: '3px solid #555',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                <span style={{ fontWeight: 600 }}>{inc.service}</span>
                <span style={{ color: '#888' }}>{inc.date}</span>
              </div>
              <div style={{ fontSize: 9, color: '#666', marginTop: '0.2rem' }}>
                {inc.duration}m downtime • {inc.cause}
              </div>
            </div>
          ))}
        </div>

        {/* Trend & Credits */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Monthly Trend</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 8, height: 50, marginBottom: '1rem' }}>
            {data.monthlyTrend.map((m, i) => {
              const height = ((m.compliance - 98) / 2) * 45;
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: Math.max(4, height), background: m.compliance >= data.target ? '#666' : '#333', marginBottom: 4 }} />
                  <div style={{ fontSize: 10, fontWeight: 600 }}>{m.compliance}%</div>
                  <div style={{ fontSize: 8, color: '#888' }}>{m.month}</div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: '0.75rem', background: '#f8f8f8' }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.35rem' }}>SLA Credits</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
              <span>Credits Issued: {data.credits.issued}</span>
              <span>Amount: ${data.credits.amount.toLocaleString()}</span>
              <span>Customers: {data.credits.customers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAComplianceTracker;
