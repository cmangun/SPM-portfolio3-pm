"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography } from './colors';

// Model Approval Workflow - Stage-gate with sign-offs
const defaultData = {
  totalInPipeline: 14,
  avgCycleTime: 28,
  stages: [
    { id: 'development', name: 'Development', count: 3, avgDays: 45 },
    { id: 'peer-review', name: 'Peer Review', count: 2, avgDays: 7 },
    { id: 'validation', name: 'Validation', count: 4, avgDays: 21 },
    { id: 'risk-review', name: 'Risk Review', count: 2, avgDays: 10 },
    { id: 'approval', name: 'Final Approval', count: 1, avgDays: 5 },
    { id: 'deployment', name: 'Deployment', count: 2, avgDays: 3 },
  ],
  models: [
    { id: 'MDL-051', name: 'Pricing Optimizer v4.0', stage: 'validation', daysInStage: 8, owner: 'Pricing Team', priority: 'high', signoffs: { development: true, peerReview: true, validation: false, riskReview: false, approval: false } },
    { id: 'MDL-052', name: 'Churn Predictor v2.1', stage: 'risk-review', daysInStage: 3, owner: 'CRM Analytics', priority: 'medium', signoffs: { development: true, peerReview: true, validation: true, riskReview: false, approval: false } },
    { id: 'MDL-053', name: 'Fraud Detection v3.0', stage: 'approval', daysInStage: 2, owner: 'Fraud Ops', priority: 'critical', signoffs: { development: true, peerReview: true, validation: true, riskReview: true, approval: false } },
    { id: 'MDL-054', name: 'Document Classifier v1.2', stage: 'peer-review', daysInStage: 4, owner: 'Operations', priority: 'low', signoffs: { development: true, peerReview: false, validation: false, riskReview: false, approval: false } },
  ],
  approvers: [
    { role: 'Model Developer', stage: 'development', name: 'Development Team' },
    { role: 'Technical Reviewer', stage: 'peer-review', name: 'ML Engineering' },
    { role: 'Model Validator', stage: 'validation', name: 'MRM Team' },
    { role: 'Risk Officer', stage: 'risk-review', name: 'Chief Risk Officer' },
    { role: 'Business Owner', stage: 'approval', name: 'Business Sponsor' },
  ],
  recentApprovals: [
    { model: 'AML Monitor v5.2', approvedBy: 'J. Smith (CRO)', date: '2024-12-10', cycleTime: 24 },
    { model: 'Customer Seg v3.1', approvedBy: 'M. Chen (VP Analytics)', date: '2024-12-05', cycleTime: 32 },
  ],
};

const getStageIndex = (stageId: string) => {
  const stages = ['development', 'peer-review', 'validation', 'risk-review', 'approval', 'deployment'];
  return stages.indexOf(stageId);
};

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case 'critical': return { bg: '#1a1a1a', color: '#fff' };
    case 'high': return { bg: '#444', color: '#fff' };
    case 'medium': return { bg: '#888', color: '#fff' };
    case 'low': return { bg: '#ccc', color: '#333' };
    default: return { bg: '#e0e0e0', color: '#666' };
  }
};

interface ModelApprovalWorkflowProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ModelApprovalWorkflow: React.FC<ModelApprovalWorkflowProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Model Approval Workflow"
}) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

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
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Stage-gate approval pipeline</p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.totalInPipeline}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>In Pipeline</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.avgCycleTime}d</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Avg Cycle Time</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.stages.find(s => s.id === 'approval')?.count || 0}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Pending Approval</div>
        </div>
      </div>

      {/* Stage Pipeline */}
      <div style={{ display: 'flex', marginBottom: '1.25rem' }}>
        {data.stages.map((stage, i) => (
          <div key={stage.id} style={{
            flex: 1,
            padding: '0.5rem 0.25rem',
            background: stage.count > 0 ? '#333' : '#f5f5f5',
            color: stage.count > 0 ? '#fff' : '#888',
            textAlign: 'center',
            borderRight: i < data.stages.length - 1 ? '2px solid #fff' : 'none',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{stage.count}</div>
            <div style={{ fontSize: 8, textTransform: 'uppercase' }}>{stage.name}</div>
          </div>
        ))}
      </div>

      {/* Models in Pipeline */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Models in Pipeline</div>
        {data.models.map(model => {
          const stageIdx = getStageIndex(model.stage);
          const prioStyle = getPriorityStyle(model.priority);
          return (
            <div key={model.id} style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: '#fff',
              border: '1px solid #e0e0e0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{
                    padding: '0.1rem 0.35rem',
                    fontSize: 9,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: prioStyle.bg,
                    color: prioStyle.color,
                    marginRight: '0.5rem',
                  }}>
                    {model.priority}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{model.name}</span>
                </div>
                <span style={{ fontSize: 10, color: '#888' }}>{model.daysInStage}d in stage</span>
              </div>
              
              {/* Progress Bar */}
              <div style={{ display: 'flex', gap: 2, marginBottom: '0.5rem' }}>
                {data.stages.map((stage, i) => (
                  <div key={stage.id} style={{
                    flex: 1,
                    height: 8,
                    background: i < stageIdx ? '#333' : i === stageIdx ? '#666' : '#e0e0e0',
                  }} />
                ))}
              </div>

              {/* Sign-offs */}
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: 9 }}>
                {Object.entries(model.signoffs).map(([key, signed]) => (
                  <span key={key} style={{
                    padding: '0.15rem 0.35rem',
                    background: signed ? '#e8e8e8' : '#f5f5f5',
                    color: signed ? '#333' : '#999',
                  }}>
                    {signed ? '✓' : '○'} {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Approvals */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Recent Approvals</div>
        {data.recentApprovals.map((approval, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.4rem 0',
            borderBottom: '1px solid #f0f0f0',
            fontSize: 11,
          }}>
            <span style={{ fontWeight: 500 }}>{approval.model}</span>
            <span style={{ color: '#666' }}>{approval.approvedBy}</span>
            <span style={{ color: '#888' }}>{approval.date}</span>
            <span style={{ fontWeight: 600 }}>{approval.cycleTime}d cycle</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelApprovalWorkflow;
