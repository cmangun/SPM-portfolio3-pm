"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, riskTiers, getRiskColor } from './colors';

// Model Risk Tiering Matrix - SR 11-7 / OCC 2011-12 compliance
const defaultData = {
  lastReview: '2024-12-01',
  nextReview: '2025-03-01',
  totalModels: 47,
  tierSummary: {
    tier1: { count: 8, label: 'Critical', color: '#1a1a1a', description: 'Revenue-critical, customer-facing, regulatory' },
    tier2: { count: 15, label: 'High', color: '#444', description: 'Significant business impact, complex models' },
    tier3: { count: 18, label: 'Medium', color: '#777', description: 'Moderate impact, standard validation' },
    tier4: { count: 6, label: 'Low', color: '#aaa', description: 'Limited impact, basic monitoring' },
  },
  models: [
    { id: 'MDL-001', name: 'Credit Risk Scoring', tier: 'tier1', businessUnit: 'Lending', owner: 'Risk Analytics', materialityScore: 95, complexityScore: 88, validationStatus: 'current', lastValidation: '2024-09-15', nextValidation: '2025-03-15' },
    { id: 'MDL-002', name: 'Fraud Detection', tier: 'tier1', businessUnit: 'Security', owner: 'Fraud Ops', materialityScore: 92, complexityScore: 85, validationStatus: 'current', lastValidation: '2024-10-01', nextValidation: '2025-04-01' },
    { id: 'MDL-003', name: 'Customer Churn Prediction', tier: 'tier2', businessUnit: 'Marketing', owner: 'CRM Analytics', materialityScore: 78, complexityScore: 72, validationStatus: 'current', lastValidation: '2024-08-20', nextValidation: '2025-08-20' },
    { id: 'MDL-004', name: 'Pricing Optimization', tier: 'tier1', businessUnit: 'Revenue', owner: 'Pricing Team', materialityScore: 90, complexityScore: 82, validationStatus: 'due', lastValidation: '2024-06-15', nextValidation: '2024-12-15' },
    { id: 'MDL-005', name: 'Document Classification', tier: 'tier3', businessUnit: 'Operations', owner: 'Doc Processing', materialityScore: 55, complexityScore: 60, validationStatus: 'current', lastValidation: '2024-07-01', nextValidation: '2025-07-01' },
    { id: 'MDL-006', name: 'AML Transaction Monitoring', tier: 'tier1', businessUnit: 'Compliance', owner: 'AML Team', materialityScore: 98, complexityScore: 90, validationStatus: 'current', lastValidation: '2024-11-01', nextValidation: '2025-05-01' },
    { id: 'MDL-007', name: 'Customer Segmentation', tier: 'tier3', businessUnit: 'Marketing', owner: 'Analytics', materialityScore: 45, complexityScore: 50, validationStatus: 'current', lastValidation: '2024-05-15', nextValidation: '2025-05-15' },
    { id: 'MDL-008', name: 'Demand Forecasting', tier: 'tier2', businessUnit: 'Supply Chain', owner: 'Planning', materialityScore: 75, complexityScore: 70, validationStatus: 'overdue', lastValidation: '2024-03-01', nextValidation: '2024-09-01' },
  ],
  tieringCriteria: [
    { criterion: 'Revenue Impact', weight: 25, description: 'Direct revenue attribution' },
    { criterion: 'Regulatory Exposure', weight: 25, description: 'Compliance/audit requirements' },
    { criterion: 'Customer Impact', weight: 20, description: 'Customer-facing decisions' },
    { criterion: 'Model Complexity', weight: 15, description: 'Technical sophistication' },
    { criterion: 'Data Sensitivity', weight: 15, description: 'PII/PHI/confidential data' },
  ],
  validationFrequency: {
    tier1: '6 months',
    tier2: '12 months',
    tier3: '18 months',
    tier4: '24 months',
  },
};

const getTierStyle = (tier: string) => {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    tier1: { bg: '#1a1a1a', color: '#fff', label: 'Tier 1 - Critical' },
    tier2: { bg: '#444', color: '#fff', label: 'Tier 2 - High' },
    tier3: { bg: '#888', color: '#fff', label: 'Tier 3 - Medium' },
    tier4: { bg: '#ccc', color: '#333', label: 'Tier 4 - Low' },
  };
  return styles[tier] || styles.tier3;
};

const getValidationStyle = (status: string) => {
  switch (status) {
    case 'current': return { bg: '#e8e8e8', color: '#333' };
    case 'due': return { bg: '#666', color: '#fff' };
    case 'overdue': return { bg: '#1a1a1a', color: '#fff' };
    default: return { bg: '#f0f0f0', color: '#666' };
  }
};

interface ModelRiskTieringMatrixProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ModelRiskTieringMatrix: React.FC<ModelRiskTieringMatrixProps> = ({
  data = defaultData,
  width = 700,
  height = 580,
  title = "Model Risk Tiering Matrix"
}) => {
  const [filterTier, setFilterTier] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const filteredModels = filterTier === 'all' 
    ? data.models 
    : data.models.filter(m => m.tier === filterTier);

  const selectedModelData = data.models.find(m => m.id === selectedModel);

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>SR 11-7 / OCC 2011-12 Compliance</p>
          </div>
          <div style={{ fontSize: 11, color: '#888', textAlign: 'right' }}>
            <div>Last Review: {data.lastReview}</div>
            <div>Next Review: {data.nextReview}</div>
          </div>
        </div>
      </div>

      {/* Tier Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {Object.entries(data.tierSummary).map(([tier, info]) => {
          const isSelected = filterTier === tier;
          return (
            <div 
              key={tier}
              onClick={() => setFilterTier(isSelected ? 'all' : tier)}
              style={{
                padding: '0.75rem',
                background: isSelected ? info.color : '#f8f8f8',
                color: isSelected ? '#fff' : info.color,
                border: `2px solid ${info.color}`,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700 }}>{info.count}</div>
              <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 600 }}>{info.label}</div>
            </div>
          );
        })}
      </div>

      {/* Model Table */}
      <div style={{ marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Model</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Tier</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Business Unit</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Materiality</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Complexity</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #ddd', fontSize: 10, textTransform: 'uppercase' }}>Validation</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.map(model => {
              const tierStyle = getTierStyle(model.tier);
              const valStyle = getValidationStyle(model.validationStatus);
              return (
                <tr 
                  key={model.id}
                  onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
                  style={{ 
                    cursor: 'pointer',
                    background: selectedModel === model.id ? '#f8f8f8' : '#fff',
                  }}
                >
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 600 }}>{model.name}</div>
                    <div style={{ fontSize: 10, color: '#888' }}>{model.id}</div>
                  </td>
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.5rem',
                      fontSize: 9,
                      fontWeight: 700,
                      background: tierStyle.bg,
                      color: tierStyle.color,
                    }}>
                      {model.tier.toUpperCase().replace('TIER', 'T')}
                    </span>
                  </td>
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0' }}>{model.businessUnit}</td>
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                      <div style={{ width: 40, height: 6, background: '#e0e0e0' }}>
                        <div style={{ height: '100%', width: `${model.materialityScore}%`, background: '#333' }} />
                      </div>
                      <span style={{ fontSize: 10, width: 25 }}>{model.materialityScore}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                      <div style={{ width: 40, height: 6, background: '#e0e0e0' }}>
                        <div style={{ height: '100%', width: `${model.complexityScore}%`, background: '#666' }} />
                      </div>
                      <span style={{ fontSize: 10, width: 25 }}>{model.complexityScore}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.625rem 0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: valStyle.bg,
                      color: valStyle.color,
                    }}>
                      {model.validationStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Model Details */}
      {selectedModelData && (
        <div style={{ 
          padding: '1rem', 
          background: '#fafafa',
          border: '1px solid #ddd',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedModelData.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>Owner: {selectedModelData.owner}</div>
            </div>
            <span style={{
              padding: '0.25rem 0.5rem',
              fontSize: 10,
              fontWeight: 600,
              ...getTierStyle(selectedModelData.tier),
            }}>
              {getTierStyle(selectedModelData.tier).label}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: 11 }}>
            <div>
              <div style={{ color: '#888', fontSize: 10, textTransform: 'uppercase' }}>Last Validation</div>
              <div style={{ fontWeight: 600 }}>{selectedModelData.lastValidation}</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 10, textTransform: 'uppercase' }}>Next Validation</div>
              <div style={{ fontWeight: 600 }}>{selectedModelData.nextValidation}</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 10, textTransform: 'uppercase' }}>Frequency</div>
              <div style={{ fontWeight: 600 }}>{data.validationFrequency[selectedModelData.tier as keyof typeof data.validationFrequency]}</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 10, textTransform: 'uppercase' }}>Business Unit</div>
              <div style={{ fontWeight: 600 }}>{selectedModelData.businessUnit}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tiering Criteria */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Tiering Criteria</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {data.tieringCriteria.map((crit, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '0.5rem',
              background: '#f8f8f8',
              textAlign: 'center',
              fontSize: 10,
            }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{crit.weight}%</div>
              <div style={{ fontWeight: 500, marginTop: '0.15rem' }}>{crit.criterion}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelRiskTieringMatrix;
