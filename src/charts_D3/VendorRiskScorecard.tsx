"use client";
import React from 'react';
import { chartColors, chartTypography, vendorRisk } from './colors';

// Vendor Risk Scorecard - Third-party AI/ML provider risk assessment
const defaultData = {
  lastAssessment: '2024-12-01',
  nextAssessment: '2025-03-01',
  overallRiskScore: 72,
  vendors: [
    { 
      name: 'OpenAI', 
      tier: 'tier1', 
      riskScore: 68,
      category: 'LLM Provider',
      contract: { value: 450000, expiry: '2025-06-30' },
      scores: { security: 75, compliance: 72, operational: 65, financial: 60 },
      criticalDependency: true,
      findings: 3,
      slaCompliance: 99.2,
    },
    { 
      name: 'AWS', 
      tier: 'tier1', 
      riskScore: 82,
      category: 'Cloud Infrastructure',
      contract: { value: 1200000, expiry: '2025-12-31' },
      scores: { security: 88, compliance: 85, operational: 80, financial: 75 },
      criticalDependency: true,
      findings: 1,
      slaCompliance: 99.9,
    },
    { 
      name: 'Databricks', 
      tier: 'tier2', 
      riskScore: 78,
      category: 'Data Platform',
      contract: { value: 320000, expiry: '2025-04-15' },
      scores: { security: 82, compliance: 78, operational: 76, financial: 76 },
      criticalDependency: false,
      findings: 2,
      slaCompliance: 99.5,
    },
    { 
      name: 'Anthropic', 
      tier: 'tier2', 
      riskScore: 71,
      category: 'LLM Provider',
      contract: { value: 180000, expiry: '2025-09-30' },
      scores: { security: 78, compliance: 70, operational: 68, financial: 68 },
      criticalDependency: false,
      findings: 2,
      slaCompliance: 98.8,
    },
    { 
      name: 'Weights & Biases', 
      tier: 'tier3', 
      riskScore: 85,
      category: 'MLOps',
      contract: { value: 45000, expiry: '2025-08-31' },
      scores: { security: 88, compliance: 82, operational: 86, financial: 84 },
      criticalDependency: false,
      findings: 0,
      slaCompliance: 99.7,
    },
  ],
  riskFactors: [
    { factor: 'Data Processing Location', status: 'monitoring', vendors: 2 },
    { factor: 'SOC 2 Certification', status: 'compliant', vendors: 5 },
    { factor: 'Business Continuity Plan', status: 'compliant', vendors: 5 },
    { factor: 'Incident Response SLA', status: 'warning', vendors: 1 },
  ],
  expiringContracts: [
    { vendor: 'Databricks', expiry: '2025-04-15', daysRemaining: 123, value: 320000 },
    { vendor: 'OpenAI', expiry: '2025-06-30', daysRemaining: 199, value: 450000 },
  ],
};

const getTierStyle = (tier: string) => {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    tier1: { bg: '#1a1a1a', color: '#fff', label: 'Critical' },
    tier2: { bg: '#666', color: '#fff', label: 'Important' },
    tier3: { bg: '#999', color: '#fff', label: 'Standard' },
    tier4: { bg: '#ccc', color: '#333', label: 'Low Risk' },
  };
  return styles[tier] || styles.tier3;
};

const getRiskColor = (score: number) => {
  if (score >= 80) return '#444';
  if (score >= 70) return '#666';
  if (score >= 60) return '#888';
  return '#333';
};

interface VendorRiskScorecardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const VendorRiskScorecard: React.FC<VendorRiskScorecardProps> = ({
  data = defaultData,
  width = 700,
  height = 540,
  title = "Vendor Risk Scorecard"
}) => {
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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Third-party AI/ML provider assessment</p>
          </div>
          <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#f8f8f8' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: getRiskColor(data.overallRiskScore) }}>{data.overallRiskScore}</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#666' }}>Overall Score</div>
          </div>
        </div>
      </div>

      {/* Vendor Table */}
      <div style={{ marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: 9, textTransform: 'uppercase' }}>Vendor</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Tier</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Risk Score</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>SLA</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: 9, textTransform: 'uppercase' }}>Findings</th>
              <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: 9, textTransform: 'uppercase' }}>Contract</th>
            </tr>
          </thead>
          <tbody>
            {data.vendors.map((vendor, i) => {
              const tierStyle = getTierStyle(vendor.tier);
              return (
                <tr key={i}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 600 }}>{vendor.name}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>{vendor.category}</div>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      fontSize: 9,
                      fontWeight: 600,
                      background: tierStyle.bg,
                      color: tierStyle.color,
                    }}>
                      {tierStyle.label}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{ 
                      fontSize: 14, 
                      fontWeight: 700, 
                      color: getRiskColor(vendor.riskScore),
                    }}>
                      {vendor.riskScore}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    {vendor.slaCompliance}%
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.1rem 0.4rem',
                      fontSize: 10,
                      fontWeight: 600,
                      background: vendor.findings > 0 ? '#f0f0f0' : '#e8e8e8',
                      color: vendor.findings > 2 ? '#333' : '#666',
                    }}>
                      {vendor.findings}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>${(vendor.contract.value / 1000).toFixed(0)}K</div>
                    <div style={{ fontSize: 9, color: '#888' }}>Exp: {vendor.contract.expiry}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Risk Factors & Expiring Contracts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Risk Factors</div>
          {data.riskFactors.map((factor, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.4rem 0',
              borderBottom: '1px solid #f0f0f0',
              fontSize: 10,
            }}>
              <span>{factor.factor}</span>
              <span style={{
                padding: '0.15rem 0.4rem',
                fontSize: 9,
                background: factor.status === 'compliant' ? '#e8e8e8' : factor.status === 'monitoring' ? '#f0f0f0' : '#ddd',
                color: factor.status === 'warning' ? '#333' : '#666',
                textTransform: 'capitalize',
              }}>
                {factor.status}
              </span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Expiring Contracts (180d)</div>
          {data.expiringContracts.map((contract, i) => (
            <div key={i} style={{
              padding: '0.5rem',
              marginBottom: '0.35rem',
              background: '#f8f8f8',
              borderLeft: contract.daysRemaining < 150 ? '3px solid #333' : '3px solid #888',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ fontWeight: 600 }}>{contract.vendor}</span>
                <span>${(contract.value / 1000).toFixed(0)}K</span>
              </div>
              <div style={{ fontSize: 9, color: '#888', marginTop: '0.15rem' }}>
                Expires: {contract.expiry} ({contract.daysRemaining} days)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0', fontSize: 10, color: '#888', display: 'flex', justifyContent: 'space-between' }}>
        <span>Last Assessment: {data.lastAssessment}</span>
        <span>Next Assessment: {data.nextAssessment}</span>
      </div>
    </div>
  );
};

export default VendorRiskScorecard;
