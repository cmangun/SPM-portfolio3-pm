import React from 'react';
import { chartColors } from './colors';

interface ChangeRequest {
  id: string;
  title: string;
  type: 'Standard' | 'Normal' | 'Emergency';
  risk: 'High' | 'Medium' | 'Low';
  requestor: string;
  stage: 'Draft' | 'Technical Review' | 'Security Review' | 'CAB Queue' | 'CAB Approved' | 'Scheduled' | 'Implemented';
  scheduledDate?: string;
  systems: string[];
}

interface ChangeAdvisoryBoardProps {
  data?: ChangeRequest[];
  nextCABDate?: string;
}

const defaultData: ChangeRequest[] = [
  { id: 'CHG-4521', title: 'Model v3.2 Deployment - Fraud Detection', type: 'Normal', risk: 'High', requestor: 'ML Platform', stage: 'CAB Queue', systems: ['prod-ml-01', 'api-gateway'] },
  { id: 'CHG-4522', title: 'Feature Store Schema Migration', type: 'Standard', risk: 'Medium', requestor: 'Data Eng', stage: 'Technical Review', systems: ['feature-store', 'etl-pipelines'] },
  { id: 'CHG-4523', title: 'GPU Cluster Expansion', type: 'Normal', risk: 'Low', requestor: 'Infrastructure', stage: 'Security Review', systems: ['k8s-ml-cluster'] },
  { id: 'CHG-4524', title: 'API Rate Limit Update', type: 'Standard', risk: 'Low', requestor: 'Platform', stage: 'CAB Approved', scheduledDate: '2024-12-18', systems: ['api-gateway'] },
  { id: 'CHG-4525', title: 'Model Monitoring Dashboard', type: 'Standard', risk: 'Low', requestor: 'MLOps', stage: 'Scheduled', scheduledDate: '2024-12-16', systems: ['grafana', 'prometheus'] },
  { id: 'CHG-4526', title: 'Hotfix: Inference Timeout', type: 'Emergency', risk: 'High', requestor: 'SRE', stage: 'Implemented', systems: ['prod-inference'] },
  { id: 'CHG-4527', title: 'Training Pipeline Optimization', type: 'Normal', risk: 'Medium', requestor: 'ML Platform', stage: 'Draft', systems: ['training-cluster', 'mlflow'] },
];

const stages = ['Draft', 'Technical Review', 'Security Review', 'CAB Queue', 'CAB Approved', 'Scheduled', 'Implemented'];

export const ChangeAdvisoryBoard: React.FC<ChangeAdvisoryBoardProps> = ({
  data = defaultData,
  nextCABDate = '2024-12-19 14:00 UTC',
}) => {
  const byStage = stages.reduce((acc, stage) => {
    acc[stage] = data.filter(d => d.stage === stage);
    return acc;
  }, {} as Record<string, ChangeRequest[]>);

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'High': return { border: `2px solid ${chartColors.text.primary}`, fontWeight: 700 };
      case 'Medium': return { border: `1px solid ${chartColors.text.primary}` };
      default: return { border: `1px solid ${chartColors.border}` };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'Emergency': return { bg: chartColors.text.primary, color: chartColors.background };
      case 'Normal': return { bg: chartColors.gray[400], color: chartColors.text.primary };
      default: return { bg: chartColors.surface, color: chartColors.text.primary };
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem', color: chartColors.text.primary }}>
            Change Advisory Board Pipeline
          </h2>
          <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary }}>
            CAB approval funnel for AI/ML changes
          </p>
        </div>
        <div style={{ padding: '0.75rem 1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>NEXT CAB MEETING</div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>{nextCABDate}</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {stages.map(stage => (
          <div key={stage} style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.border}` }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: chartColors.text.primary }}>{byStage[stage]?.length || 0}</div>
            <div style={{ fontSize: '0.65rem', color: chartColors.text.secondary }}>{stage.replace(' ', '\n')}</div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', minHeight: '300px' }}>
        {stages.map(stage => (
          <div key={stage} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: stage === 'CAB Queue' ? chartColors.text.primary : chartColors.surface,
              color: stage === 'CAB Queue' ? chartColors.background : chartColors.text.primary,
              fontWeight: 600, 
              fontSize: '0.7rem',
              textAlign: 'center',
              borderBottom: `2px solid ${chartColors.text.primary}`
            }}>
              {stage.toUpperCase()}
            </div>
            {byStage[stage]?.map(change => {
              const typeStyle = getTypeLabel(change.type);
              return (
                <div 
                  key={change.id}
                  style={{ 
                    padding: '0.5rem', 
                    backgroundColor: chartColors.surface,
                    ...getRiskStyle(change.risk),
                    fontSize: '0.7rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{change.id}</span>
                    <span style={{ 
                      padding: '0.1rem 0.3rem', 
                      backgroundColor: typeStyle.bg, 
                      color: typeStyle.color,
                      fontSize: '0.6rem',
                      fontWeight: 500
                    }}>
                      {change.type[0]}
                    </span>
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem', lineHeight: 1.2 }}>{change.title}</div>
                  <div style={{ color: chartColors.text.secondary, fontSize: '0.6rem' }}>{change.requestor}</div>
                  {change.scheduledDate && (
                    <div style={{ marginTop: '0.25rem', fontSize: '0.6rem', fontWeight: 600 }}>▣ {change.scheduledDate}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', fontSize: '0.75rem', borderTop: `1px solid ${chartColors.border}`, paddingTop: '1rem' }}>
        <div><strong>Risk:</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', border: `2px solid ${chartColors.text.primary}` }} />
          <span>High</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', border: `1px solid ${chartColors.text.primary}` }} />
          <span>Medium</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', border: `1px solid ${chartColors.border}` }} />
          <span>Low</span>
        </div>
        <div style={{ marginLeft: '2rem' }}><strong>Type:</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.text.primary }} />
          <span>Emergency</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.gray[400] }} />
          <span>Normal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.border}` }} />
          <span>Standard</span>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdvisoryBoard;
