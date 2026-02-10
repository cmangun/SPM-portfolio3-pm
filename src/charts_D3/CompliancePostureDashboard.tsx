"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, complianceStatus, getComplianceColor } from './colors';

// Compliance Posture Dashboard - Multi-framework status (SOC2, ISO27001, HIPAA, GDPR)
const defaultData = {
  lastAssessment: '2024-12-01',
  nextAssessment: '2025-03-01',
  overallScore: 87,
  frameworks: [
    { 
      id: 'soc2', 
      name: 'SOC 2 Type II', 
      status: 'compliant', 
      score: 94, 
      controls: { total: 89, compliant: 84, partial: 4, nonCompliant: 1 },
      lastAudit: '2024-09-15',
      nextAudit: '2025-09-15',
      auditor: 'Deloitte',
      findings: 2,
    },
    { 
      id: 'iso27001', 
      name: 'ISO 27001:2022', 
      status: 'compliant', 
      score: 91, 
      controls: { total: 114, compliant: 104, partial: 8, nonCompliant: 2 },
      lastAudit: '2024-06-20',
      nextAudit: '2025-06-20',
      auditor: 'BSI',
      findings: 5,
    },
    { 
      id: 'hipaa', 
      name: 'HIPAA', 
      status: 'compliant', 
      score: 88, 
      controls: { total: 45, compliant: 40, partial: 4, nonCompliant: 1 },
      lastAudit: '2024-08-10',
      nextAudit: '2025-08-10',
      auditor: 'KPMG',
      findings: 3,
    },
    { 
      id: 'gdpr', 
      name: 'GDPR', 
      status: 'partial', 
      score: 82, 
      controls: { total: 52, compliant: 43, partial: 7, nonCompliant: 2 },
      lastAudit: '2024-07-05',
      nextAudit: '2025-01-05',
      auditor: 'PwC',
      findings: 8,
    },
    { 
      id: 'ccpa', 
      name: 'CCPA', 
      status: 'compliant', 
      score: 90, 
      controls: { total: 28, compliant: 25, partial: 3, nonCompliant: 0 },
      lastAudit: '2024-10-01',
      nextAudit: '2025-10-01',
      auditor: 'EY',
      findings: 1,
    },
    { 
      id: 'fedramp', 
      name: 'FedRAMP Moderate', 
      status: 'partial', 
      score: 76, 
      controls: { total: 325, compliant: 248, partial: 52, nonCompliant: 25 },
      lastAudit: '2024-04-15',
      nextAudit: '2025-04-15',
      auditor: 'Coalfire',
      findings: 18,
    },
  ],
  recentFindings: [
    { id: 'F-001', framework: 'GDPR', severity: 'high', title: 'Data retention policy gaps', status: 'remediation', dueDate: '2025-01-15' },
    { id: 'F-002', framework: 'FedRAMP', severity: 'medium', title: 'Incomplete access logging', status: 'in-progress', dueDate: '2025-02-01' },
    { id: 'F-003', framework: 'ISO 27001', severity: 'low', title: 'Documentation update needed', status: 'open', dueDate: '2025-03-01' },
  ],
  controlCategories: [
    { category: 'Access Control', score: 92 },
    { category: 'Data Protection', score: 85 },
    { category: 'Incident Response', score: 88 },
    { category: 'Risk Management', score: 90 },
    { category: 'Vendor Management', score: 78 },
    { category: 'Asset Management', score: 86 },
  ],
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    compliant: { bg: '#e8e8e8', color: '#333', label: 'Compliant' },
    partial: { bg: '#f0f0f0', color: '#444', label: 'Partial' },
    nonCompliant: { bg: '#ddd', color: '#1a1a1a', label: 'Non-Compliant' },
  };
  return styles[status] || styles.partial;
};

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case 'critical': return { bg: '#1a1a1a', color: '#fff' };
    case 'high': return { bg: '#444', color: '#fff' };
    case 'medium': return { bg: '#888', color: '#fff' };
    case 'low': return { bg: '#ccc', color: '#333' };
    default: return { bg: '#e0e0e0', color: '#666' };
  }
};

interface CompliancePostureDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CompliancePostureDashboard: React.FC<CompliancePostureDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 580,
  title = "Compliance Posture Dashboard"
}) => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const selectedFw = data.frameworks.find(f => f.id === selectedFramework);

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Multi-framework compliance status</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: '#888' }}>
            <div>Last Assessment: {data.lastAssessment}</div>
            <div>Next Assessment: {data.nextAssessment}</div>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem', 
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f8f8f8',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: chartColors.primary }}>{data.overallScore}%</div>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase' }}>Overall Score</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {data.frameworks.map(fw => {
              const badge = getStatusBadge(fw.status);
              return (
                <div 
                  key={fw.id}
                  onClick={() => setSelectedFramework(selectedFramework === fw.id ? null : fw.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: selectedFramework === fw.id ? chartColors.primary : badge.bg,
                    color: selectedFramework === fw.id ? '#fff' : badge.color,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: `1px solid ${selectedFramework === fw.id ? chartColors.primary : '#ccc'}`,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{fw.score}%</div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase' }}>{fw.name.split(' ')[0]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Framework Details (if selected) */}
      {selectedFw && (
        <div style={{ 
          marginBottom: '1.25rem', 
          padding: '1rem', 
          border: '1px solid #ddd',
          background: '#fafafa',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedFw.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>Auditor: {selectedFw.auditor}</div>
            </div>
            <div style={{
              padding: '0.25rem 0.5rem',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              ...getStatusBadge(selectedFw.status),
            }}>
              {getStatusBadge(selectedFw.status).label}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '0.5rem', background: '#fff', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedFw.controls.total}</div>
              <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase' }}>Total Controls</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem', background: '#fff', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#444' }}>{selectedFw.controls.compliant}</div>
              <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase' }}>Compliant</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem', background: '#fff', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#888' }}>{selectedFw.controls.partial}</div>
              <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase' }}>Partial</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem', background: '#fff', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>{selectedFw.controls.nonCompliant}</div>
              <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase' }}>Non-Compliant</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', fontSize: 11, color: '#666' }}>
            <span>Last Audit: {selectedFw.lastAudit}</span>
            <span>Next Audit: {selectedFw.nextAudit}</span>
            <span>Open Findings: {selectedFw.findings}</span>
          </div>
        </div>
      )}

      {/* Control Categories */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.75rem', color: '#333' }}>Control Categories</div>
        {data.controlCategories.map((cat, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: '0.2rem' }}>
              <span>{cat.category}</span>
              <span style={{ fontWeight: 600 }}>{cat.score}%</span>
            </div>
            <div style={{ height: 6, background: '#e0e0e0' }}>
              <div style={{ 
                height: '100%', 
                width: `${cat.score}%`, 
                background: cat.score >= 90 ? '#444' : cat.score >= 80 ? '#666' : '#888',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Findings */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.75rem', color: '#333' }}>Open Findings</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>ID</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Framework</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Severity</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Finding</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Due</th>
            </tr>
          </thead>
          <tbody>
            {data.recentFindings.map(finding => {
              const sevStyle = getSeverityStyle(finding.severity);
              return (
                <tr key={finding.id}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', fontFamily: 'monospace' }}>{finding.id}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{finding.framework}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{
                      padding: '0.15rem 0.35rem',
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: sevStyle.bg,
                      color: sevStyle.color,
                    }}>
                      {finding.severity}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{finding.title}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', color: '#888' }}>{finding.dueDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompliancePostureDashboard;
