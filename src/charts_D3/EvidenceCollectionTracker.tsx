"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography } from './colors';

// Evidence Collection Tracker - Audit-ready artifact inventory
const defaultData = {
  auditPeriod: 'FY 2024',
  targetDate: '2025-03-15',
  overallProgress: 78,
  totalArtifacts: 156,
  collected: 122,
  pending: 24,
  overdue: 10,
  categories: [
    { 
      name: 'Access Controls', 
      total: 28, 
      collected: 25, 
      pending: 2, 
      overdue: 1,
      artifacts: [
        { name: 'User Access Review Q1', status: 'collected', date: '2024-04-15', owner: 'IT Security' },
        { name: 'User Access Review Q2', status: 'collected', date: '2024-07-15', owner: 'IT Security' },
        { name: 'User Access Review Q3', status: 'collected', date: '2024-10-15', owner: 'IT Security' },
        { name: 'User Access Review Q4', status: 'pending', date: '2025-01-15', owner: 'IT Security' },
        { name: 'Privileged Access Logs', status: 'collected', date: '2024-12-01', owner: 'IT Security' },
      ]
    },
    { 
      name: 'Change Management', 
      total: 32, 
      collected: 28, 
      pending: 3, 
      overdue: 1,
      artifacts: [
        { name: 'CAB Meeting Minutes', status: 'collected', date: '2024-11-30', owner: 'IT Ops' },
        { name: 'Emergency Change Log', status: 'collected', date: '2024-12-10', owner: 'IT Ops' },
        { name: 'Release Notes Archive', status: 'pending', date: '2025-01-05', owner: 'DevOps' },
      ]
    },
    { 
      name: 'Incident Response', 
      total: 18, 
      collected: 15, 
      pending: 2, 
      overdue: 1,
      artifacts: [
        { name: 'IR Playbook v3.2', status: 'collected', date: '2024-09-01', owner: 'Security' },
        { name: 'Incident Reports 2024', status: 'collected', date: '2024-12-05', owner: 'Security' },
        { name: 'DR Test Results', status: 'overdue', date: '2024-11-30', owner: 'IT Ops' },
      ]
    },
    { 
      name: 'Data Protection', 
      total: 24, 
      collected: 18, 
      pending: 4, 
      overdue: 2,
      artifacts: [
        { name: 'Encryption Standards', status: 'collected', date: '2024-06-15', owner: 'Security' },
        { name: 'DLP Policy', status: 'collected', date: '2024-08-20', owner: 'Compliance' },
        { name: 'Data Classification Inventory', status: 'pending', date: '2025-01-10', owner: 'Data Gov' },
        { name: 'Backup Verification Logs', status: 'overdue', date: '2024-12-01', owner: 'IT Ops' },
      ]
    },
    { 
      name: 'Vendor Management', 
      total: 22, 
      collected: 16, 
      pending: 4, 
      overdue: 2,
      artifacts: [
        { name: 'Vendor Risk Assessments', status: 'collected', date: '2024-10-01', owner: 'Procurement' },
        { name: 'SOC 2 Reports (Vendors)', status: 'pending', date: '2025-01-15', owner: 'Compliance' },
        { name: 'Contract Renewals', status: 'overdue', date: '2024-11-15', owner: 'Legal' },
      ]
    },
    { 
      name: 'Training & Awareness', 
      total: 16, 
      collected: 14, 
      pending: 1, 
      overdue: 1,
      artifacts: [
        { name: 'Security Training Completion', status: 'collected', date: '2024-12-01', owner: 'HR' },
        { name: 'Phishing Test Results', status: 'collected', date: '2024-11-15', owner: 'Security' },
        { name: 'Policy Acknowledgments', status: 'pending', date: '2025-01-05', owner: 'HR' },
      ]
    },
    { 
      name: 'Model Governance', 
      total: 16, 
      collected: 6, 
      pending: 8, 
      overdue: 2,
      artifacts: [
        { name: 'Model Inventory', status: 'collected', date: '2024-11-01', owner: 'ML Ops' },
        { name: 'Model Validation Reports', status: 'pending', date: '2025-02-01', owner: 'Risk' },
        { name: 'Bias Assessments', status: 'overdue', date: '2024-12-01', owner: 'ML Ops' },
      ]
    },
  ],
  recentActivity: [
    { action: 'Uploaded', artifact: 'Security Training Completion', user: 'jane.doe@corp.com', date: '2024-12-12' },
    { action: 'Approved', artifact: 'Incident Reports 2024', user: 'ciso@corp.com', date: '2024-12-10' },
    { action: 'Requested', artifact: 'Model Validation Reports', user: 'auditor@external.com', date: '2024-12-08' },
  ],
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'collected': return { bg: '#e8e8e8', color: '#333', label: 'Collected' };
    case 'pending': return { bg: '#f5f5f5', color: '#666', label: 'Pending' };
    case 'overdue': return { bg: '#333', color: '#fff', label: 'Overdue' };
    default: return { bg: '#f0f0f0', color: '#666', label: status };
  }
};

interface EvidenceCollectionTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const EvidenceCollectionTracker: React.FC<EvidenceCollectionTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 560,
  title = "Evidence Collection Tracker"
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const daysUntilTarget = Math.ceil((new Date(data.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Audit-ready artifact inventory • {data.auditPeriod}</p>
          </div>
          <div style={{ 
            textAlign: 'right',
            padding: '0.5rem 0.75rem',
            background: daysUntilTarget < 30 ? '#333' : '#f5f5f5',
            color: daysUntilTarget < 30 ? '#fff' : '#333',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{daysUntilTarget}</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase' }}>Days to Audit</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.overallProgress}%</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>Complete</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.totalArtifacts}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Total</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#444' }}>{data.collected}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Collected</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#888' }}>{data.pending}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Pending</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center', borderLeft: '3px solid #333' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>{data.overdue}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Overdue</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['all', 'collected', 'pending', 'overdue'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: 11,
              border: `1px solid ${filterStatus === status ? chartColors.primary : '#ddd'}`,
              background: filterStatus === status ? chartColors.primary : '#fff',
              color: filterStatus === status ? '#fff' : '#666',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '1.25rem' }}>
        {data.categories.map((cat, i) => {
          const isExpanded = expandedCategory === cat.name;
          const progress = Math.round((cat.collected / cat.total) * 100);
          
          // Filter logic
          if (filterStatus !== 'all') {
            const hasMatchingStatus = cat.artifacts?.some(a => a.status === filterStatus);
            if (!hasMatchingStatus && filterStatus !== 'collected') return null;
          }

          return (
            <div key={i} style={{ marginBottom: '0.5rem' }}>
              <div 
                onClick={() => setExpandedCategory(isExpanded ? null : cat.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: isExpanded ? '#f5f5f5' : '#fff',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{cat.name}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: 10, color: '#888', marginTop: '0.2rem' }}>
                    <span>{cat.collected}/{cat.total} collected</span>
                    {cat.overdue > 0 && <span style={{ color: '#333', fontWeight: 600 }}>{cat.overdue} overdue</span>}
                  </div>
                </div>
                <div style={{ width: 100, marginRight: '1rem' }}>
                  <div style={{ height: 6, background: '#e0e0e0' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: cat.overdue > 0 ? '#666' : '#444' }} />
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, width: 45, textAlign: 'right' }}>{progress}%</div>
                <div style={{ marginLeft: '0.75rem', color: '#999' }}>{isExpanded ? '▼' : '▶'}</div>
              </div>

              {isExpanded && cat.artifacts && (
                <div style={{ background: '#fafafa', border: '1px solid #e0e0e0', borderTop: 'none', padding: '0.75rem' }}>
                  {cat.artifacts.filter(a => filterStatus === 'all' || a.status === filterStatus).map((artifact, j) => {
                    const statusStyle = getStatusStyle(artifact.status);
                    return (
                      <div key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: j < cat.artifacts.length - 1 ? '1px solid #e8e8e8' : 'none',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12 }}>{artifact.name}</div>
                          <div style={{ fontSize: 10, color: '#888' }}>{artifact.owner} • Due: {artifact.date}</div>
                        </div>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          fontSize: 9,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          background: statusStyle.bg,
                          color: statusStyle.color,
                        }}>
                          {statusStyle.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Recent Activity</div>
        {data.recentActivity.map((activity, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: 11, padding: '0.35rem 0', color: '#666' }}>
            <span style={{ color: '#888', width: 80 }}>{activity.date}</span>
            <span style={{ fontWeight: 500, color: '#333' }}>{activity.action}</span>
            <span style={{ flex: 1 }}>{activity.artifact}</span>
            <span style={{ color: '#888' }}>{activity.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceCollectionTracker;
