"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, modelLifecycle } from './colors';

// Model Validation Pipeline - Independent validation status & findings
const defaultData = {
  period: 'Q4 2024',
  pendingValidations: 12,
  inProgress: 5,
  completed: 34,
  averageDuration: 21, // days
  pipeline: [
    { 
      id: 'VAL-2024-047', 
      model: 'Credit Risk Scoring v3.1', 
      modelId: 'MDL-001',
      tier: 'tier1',
      stage: 'documentation-review',
      progress: 35,
      startDate: '2024-12-01',
      targetDate: '2025-01-15',
      validator: 'External - Deloitte',
      validationType: 'annual',
      findings: { critical: 0, high: 1, medium: 2, low: 3 },
    },
    { 
      id: 'VAL-2024-048', 
      model: 'Fraud Detection v2.8', 
      modelId: 'MDL-002',
      tier: 'tier1',
      stage: 'testing',
      progress: 65,
      startDate: '2024-11-15',
      targetDate: '2024-12-31',
      validator: 'Internal MRM',
      validationType: 'annual',
      findings: { critical: 0, high: 0, medium: 4, low: 2 },
    },
    { 
      id: 'VAL-2024-049', 
      model: 'Churn Prediction v1.5', 
      modelId: 'MDL-003',
      tier: 'tier2',
      stage: 'findings-review',
      progress: 85,
      startDate: '2024-10-15',
      targetDate: '2024-12-20',
      validator: 'Internal MRM',
      validationType: 'change',
      findings: { critical: 0, high: 2, medium: 1, low: 5 },
    },
    { 
      id: 'VAL-2024-050', 
      model: 'Pricing Optimizer v4.0', 
      modelId: 'MDL-004',
      tier: 'tier1',
      stage: 'queued',
      progress: 0,
      startDate: '2024-12-15',
      targetDate: '2025-02-15',
      validator: 'External - PwC',
      validationType: 'new',
      findings: { critical: 0, high: 0, medium: 0, low: 0 },
    },
    { 
      id: 'VAL-2024-046', 
      model: 'AML Monitor v5.2', 
      modelId: 'MDL-006',
      tier: 'tier1',
      stage: 'complete',
      progress: 100,
      startDate: '2024-09-01',
      targetDate: '2024-11-30',
      validator: 'External - KPMG',
      validationType: 'annual',
      findings: { critical: 0, high: 1, medium: 3, low: 4 },
      signOffDate: '2024-11-28',
    },
  ],
  stages: [
    { id: 'queued', name: 'Queued', count: 4 },
    { id: 'documentation-review', name: 'Doc Review', count: 2 },
    { id: 'testing', name: 'Testing', count: 2 },
    { id: 'findings-review', name: 'Findings', count: 1 },
    { id: 'remediation', name: 'Remediation', count: 0 },
    { id: 'signoff', name: 'Sign-Off', count: 1 },
    { id: 'complete', name: 'Complete', count: 34 },
  ],
  findingsSummary: {
    critical: 0,
    high: 4,
    medium: 10,
    low: 14,
    open: 8,
    remediated: 20,
  },
  validators: [
    { name: 'Internal MRM', active: 3, completed: 18 },
    { name: 'Deloitte', active: 1, completed: 8 },
    { name: 'PwC', active: 1, completed: 5 },
    { name: 'KPMG', active: 0, completed: 3 },
  ],
};

const getStageStyle = (stage: string, isActive: boolean) => {
  if (stage === 'complete') return { bg: '#333', color: '#fff' };
  if (isActive) return { bg: '#1a1a1a', color: '#fff' };
  return { bg: '#f5f5f5', color: '#888' };
};

const getTierLabel = (tier: string) => {
  const labels: Record<string, string> = {
    tier1: 'T1',
    tier2: 'T2',
    tier3: 'T3',
    tier4: 'T4',
  };
  return labels[tier] || tier;
};

interface ModelValidationPipelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ModelValidationPipeline: React.FC<ModelValidationPipelineProps> = ({
  data = defaultData,
  width = 700,
  height = 560,
  title = "Model Validation Pipeline"
}) => {
  const [selectedValidation, setSelectedValidation] = useState<string | null>(null);

  const selectedVal = data.pipeline.find(v => v.id === selectedValidation);
  const activeValidations = data.pipeline.filter(v => v.stage !== 'complete' && v.stage !== 'queued');

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
        <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Independent validation status • {data.period}</p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.inProgress}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#ccc' }}>In Progress</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.pendingValidations}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Pending</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.completed}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>YTD Complete</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.averageDuration}d</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Avg Duration</div>
        </div>
      </div>

      {/* Stage Pipeline */}
      <div style={{ display: 'flex', marginBottom: '1.25rem' }}>
        {data.stages.map((stage, i) => {
          const isActive = activeValidations.some(v => v.stage === stage.id);
          const style = getStageStyle(stage.id, isActive);
          return (
            <div 
              key={stage.id}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                background: style.bg,
                color: style.color,
                textAlign: 'center',
                borderRight: i < data.stages.length - 1 ? '1px solid #fff' : 'none',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700 }}>{stage.count}</div>
              <div style={{ fontSize: 8, textTransform: 'uppercase' }}>{stage.name}</div>
            </div>
          );
        })}
      </div>

      {/* Active Validations */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Active Validations</div>
        {data.pipeline.filter(v => v.stage !== 'complete').map(val => (
          <div 
            key={val.id}
            onClick={() => setSelectedValidation(selectedValidation === val.id ? null : val.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: selectedValidation === val.id ? '#f5f5f5' : '#fff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  padding: '0.1rem 0.3rem',
                  fontSize: 9,
                  fontWeight: 700,
                  background: val.tier === 'tier1' ? '#1a1a1a' : val.tier === 'tier2' ? '#666' : '#999',
                  color: '#fff',
                }}>
                  {getTierLabel(val.tier)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{val.model}</span>
              </div>
              <div style={{ fontSize: 10, color: '#888', marginTop: '0.2rem' }}>
                {val.validator} • {val.validationType} • Target: {val.targetDate}
              </div>
            </div>
            <div style={{ width: 120, marginRight: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: '0.2rem' }}>
                <span style={{ textTransform: 'capitalize' }}>{val.stage.replace('-', ' ')}</span>
                <span>{val.progress}%</span>
              </div>
              <div style={{ height: 6, background: '#e0e0e0' }}>
                <div style={{ height: '100%', width: `${val.progress}%`, background: '#333' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {val.findings.critical > 0 && <span style={{ padding: '0.15rem 0.35rem', fontSize: 9, background: '#1a1a1a', color: '#fff' }}>C:{val.findings.critical}</span>}
              {val.findings.high > 0 && <span style={{ padding: '0.15rem 0.35rem', fontSize: 9, background: '#444', color: '#fff' }}>H:{val.findings.high}</span>}
              {val.findings.medium > 0 && <span style={{ padding: '0.15rem 0.35rem', fontSize: 9, background: '#888', color: '#fff' }}>M:{val.findings.medium}</span>}
              {val.findings.low > 0 && <span style={{ padding: '0.15rem 0.35rem', fontSize: 9, background: '#ccc', color: '#333' }}>L:{val.findings.low}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Findings Summary & Validators */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Findings */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Findings Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', marginBottom: '0.5rem' }}>
            {[
              { label: 'Critical', count: data.findingsSummary.critical, bg: '#1a1a1a' },
              { label: 'High', count: data.findingsSummary.high, bg: '#444' },
              { label: 'Medium', count: data.findingsSummary.medium, bg: '#888' },
              { label: 'Low', count: data.findingsSummary.low, bg: '#ccc' },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f8f8' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: f.bg }}>{f.count}</div>
                <div style={{ fontSize: 9, color: '#666' }}>{f.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: 11 }}>
            <div style={{ flex: 1, padding: '0.5rem', background: '#f8f8f8', textAlign: 'center' }}>
              <span style={{ fontWeight: 600 }}>{data.findingsSummary.open}</span> Open
            </div>
            <div style={{ flex: 1, padding: '0.5rem', background: '#f8f8f8', textAlign: 'center' }}>
              <span style={{ fontWeight: 600 }}>{data.findingsSummary.remediated}</span> Remediated
            </div>
          </div>
        </div>

        {/* Validators */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Validators</div>
          {data.validators.map((v, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.4rem 0',
              borderBottom: '1px solid #f0f0f0',
              fontSize: 11,
            }}>
              <span>{v.name}</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: '#666' }}>{v.active} active</span>
                <span style={{ fontWeight: 600 }}>{v.completed} YTD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelValidationPipeline;
