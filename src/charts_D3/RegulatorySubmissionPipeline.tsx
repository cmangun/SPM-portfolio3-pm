"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography } from './colors';

// Regulatory Submission Pipeline - FDA/EMA/SEC filing status
const defaultData = {
  agency: 'FDA',
  submissionType: 'NDA',
  productName: 'AI-Dx Platform v2.0',
  targetDate: '2025-06-15',
  currentPhase: 'Pre-Submission',
  overallProgress: 45,
  phases: [
    { 
      id: 'pre-ind', 
      name: 'Pre-IND Meeting', 
      status: 'complete', 
      startDate: '2024-01-15', 
      endDate: '2024-03-01',
      progress: 100,
      owner: 'Regulatory Affairs',
      deliverables: [
        { name: 'Meeting Request Package', status: 'complete' },
        { name: 'Briefing Document', status: 'complete' },
        { name: 'FDA Meeting Minutes', status: 'complete' },
      ],
    },
    { 
      id: 'pre-sub', 
      name: 'Pre-Submission', 
      status: 'in-progress', 
      startDate: '2024-03-15', 
      endDate: '2024-12-31',
      progress: 65,
      owner: 'Regulatory Affairs',
      deliverables: [
        { name: 'Q-Submission Package', status: 'complete' },
        { name: 'FDA Feedback Response', status: 'in-progress' },
        { name: 'Updated Protocol', status: 'pending' },
      ],
    },
    { 
      id: 'compile', 
      name: 'Submission Compilation', 
      status: 'pending', 
      startDate: '2025-01-01', 
      endDate: '2025-03-15',
      progress: 0,
      owner: 'RA & Clinical',
      deliverables: [
        { name: 'CTD Modules 1-5', status: 'pending' },
        { name: 'Clinical Study Reports', status: 'pending' },
        { name: 'CMC Documentation', status: 'pending' },
        { name: 'Labeling Package', status: 'pending' },
      ],
    },
    { 
      id: 'submit', 
      name: 'Submission', 
      status: 'pending', 
      startDate: '2025-03-15', 
      endDate: '2025-03-31',
      progress: 0,
      owner: 'Regulatory Affairs',
      deliverables: [
        { name: 'eCTD Validation', status: 'pending' },
        { name: 'Gateway Submission', status: 'pending' },
        { name: 'Acknowledgment Receipt', status: 'pending' },
      ],
    },
    { 
      id: 'review', 
      name: 'FDA Review', 
      status: 'pending', 
      startDate: '2025-04-01', 
      endDate: '2025-06-15',
      progress: 0,
      owner: 'FDA',
      deliverables: [
        { name: 'Filing/Refuse to File', status: 'pending' },
        { name: 'Mid-Cycle Meeting', status: 'pending' },
        { name: 'PDUFA Decision', status: 'pending' },
      ],
    },
  ],
  keyDates: [
    { date: '2024-03-01', event: 'Pre-IND Meeting Complete', status: 'complete' },
    { date: '2024-09-15', event: 'Q-Submission Filed', status: 'complete' },
    { date: '2024-11-30', event: 'FDA Feedback Received', status: 'complete' },
    { date: '2025-01-15', event: 'Compilation Start', status: 'upcoming' },
    { date: '2025-03-15', event: 'NDA Submission', status: 'upcoming' },
    { date: '2025-06-15', event: 'PDUFA Date', status: 'upcoming' },
  ],
  riskItems: [
    { id: 'R1', risk: 'CMC documentation delays', impact: 'high', mitigation: 'Weekly vendor check-ins', status: 'monitoring' },
    { id: 'R2', risk: 'FDA additional questions', impact: 'medium', mitigation: 'Pre-emptive data package', status: 'mitigated' },
    { id: 'R3', risk: 'Labeling negotiation', impact: 'medium', mitigation: 'Early advisory committee input', status: 'open' },
  ],
  teamContacts: [
    { role: 'Regulatory Lead', name: 'Dr. Sarah Chen', email: 'sarah.chen@corp.com' },
    { role: 'Clinical Lead', name: 'Dr. James Wilson', email: 'james.wilson@corp.com' },
    { role: 'CMC Lead', name: 'Michael Brown', email: 'michael.brown@corp.com' },
  ],
};

const getPhaseStatusStyle = (status: string) => {
  switch (status) {
    case 'complete': return { bg: '#333', color: '#fff', border: '#333' };
    case 'in-progress': return { bg: '#fff', color: '#333', border: '#333' };
    case 'pending': return { bg: '#f5f5f5', color: '#888', border: '#ddd' };
    default: return { bg: '#f0f0f0', color: '#666', border: '#ddd' };
  }
};

const getDeliverableIcon = (status: string) => {
  switch (status) {
    case 'complete': return '✓';
    case 'in-progress': return '◐';
    case 'pending': return '○';
    default: return '○';
  }
};

interface RegulatorySubmissionPipelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RegulatorySubmissionPipeline: React.FC<RegulatorySubmissionPipelineProps> = ({
  data = defaultData,
  width = 700,
  height = 600,
  title = "Regulatory Submission Pipeline"
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>('pre-sub');

  const selectedPhaseData = data.phases.find(p => p.id === selectedPhase);
  const daysToTarget = Math.ceil((new Date(data.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>{data.productName} • {data.agency} {data.submissionType}</p>
          </div>
          <div style={{ 
            textAlign: 'right',
            padding: '0.5rem 0.75rem',
            background: daysToTarget < 90 ? '#333' : '#f5f5f5',
            color: daysToTarget < 90 ? '#fff' : '#333',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{daysToTarget}</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase' }}>Days to PDUFA</div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Overall Progress</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{data.overallProgress}%</span>
        </div>
        <div style={{ height: 10, background: '#e0e0e0' }}>
          <div style={{ height: '100%', width: `${data.overallProgress}%`, background: '#333' }} />
        </div>
      </div>

      {/* Phase Pipeline */}
      <div style={{ display: 'flex', marginBottom: '1.5rem', gap: 0 }}>
        {data.phases.map((phase, i) => {
          const style = getPhaseStatusStyle(phase.status);
          const isSelected = selectedPhase === phase.id;
          
          return (
            <div 
              key={phase.id}
              onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
              style={{
                flex: 1,
                position: 'relative',
                padding: '0.75rem 0.5rem',
                background: isSelected ? '#1a1a1a' : style.bg,
                color: isSelected ? '#fff' : style.color,
                border: `1px solid ${style.border}`,
                marginLeft: i > 0 ? -1 : 0,
                cursor: 'pointer',
                textAlign: 'center',
                zIndex: isSelected ? 2 : 1,
              }}
            >
              <div style={{ fontSize: 9, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Phase {i + 1}</div>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{phase.name}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: '0.25rem' }}>{phase.progress}%</div>
            </div>
          );
        })}
      </div>

      {/* Phase Details */}
      {selectedPhaseData && (
        <div style={{ 
          marginBottom: '1.25rem', 
          padding: '1rem', 
          background: '#fafafa',
          border: '1px solid #ddd',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedPhaseData.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>
                {selectedPhaseData.startDate} → {selectedPhaseData.endDate} • Owner: {selectedPhaseData.owner}
              </div>
            </div>
            <span style={{
              padding: '0.2rem 0.5rem',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              background: getPhaseStatusStyle(selectedPhaseData.status).bg,
              color: getPhaseStatusStyle(selectedPhaseData.status).color,
              border: `1px solid ${getPhaseStatusStyle(selectedPhaseData.status).border}`,
            }}>
              {selectedPhaseData.status}
            </span>
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>Deliverables</div>
          {selectedPhaseData.deliverables.map((del, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0',
              fontSize: 12,
              borderBottom: i < selectedPhaseData.deliverables.length - 1 ? '1px solid #e8e8e8' : 'none',
            }}>
              <span style={{ 
                width: 16, 
                height: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: del.status === 'complete' ? '#333' : '#e0e0e0',
                color: del.status === 'complete' ? '#fff' : '#666',
                fontSize: 10,
                fontWeight: 700,
              }}>
                {getDeliverableIcon(del.status)}
              </span>
              <span style={{ flex: 1 }}>{del.name}</span>
              <span style={{ fontSize: 10, color: '#888', textTransform: 'capitalize' }}>{del.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Key Dates & Risks side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Key Dates */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Key Milestones</div>
          {data.keyDates.slice(0, 4).map((kd, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0',
              fontSize: 11,
              borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: kd.status === 'complete' ? '#333' : kd.status === 'upcoming' ? '#888' : '#ccc',
              }} />
              <span style={{ width: 70, color: '#888', fontSize: 10 }}>{kd.date}</span>
              <span style={{ flex: 1, color: kd.status === 'complete' ? '#666' : '#333' }}>{kd.event}</span>
            </div>
          ))}
        </div>

        {/* Risk Items */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Active Risks</div>
          {data.riskItems.map((risk, i) => (
            <div key={i} style={{
              padding: '0.5rem',
              marginBottom: '0.35rem',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderLeft: `3px solid ${risk.impact === 'high' ? '#333' : '#888'}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 500 }}>{risk.risk}</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: '0.15rem' }}>{risk.mitigation}</div>
            </div>
          ))}
        </div>
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
        <span>Target: {data.targetDate}</span>
        <span>Current Phase: {data.currentPhase}</span>
      </div>
    </div>
  );
};

export default RegulatorySubmissionPipeline;
