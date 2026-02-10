"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// Board Risk Summary - One-pager for directors/executives
const defaultData = {
  reportDate: 'December 2024',
  preparedFor: 'Board of Directors',
  overallRiskRating: 'Moderate',
  riskScore: 68,
  executiveSummary: 'AI/ML risk posture improved from Q3. Model validation backlog cleared. Two new Tier 1 models deployed with enhanced monitoring.',
  keyMetrics: [
    { metric: 'Model Risk Score', value: 72, target: 75, status: 'on-track', trend: 'improving' },
    { metric: 'Compliance Score', value: 87, target: 85, status: 'exceeding', trend: 'stable' },
    { metric: 'Operational Risk', value: 65, target: 70, status: 'at-risk', trend: 'declining' },
    { metric: 'Vendor Risk', value: 78, target: 75, status: 'exceeding', trend: 'improving' },
  ],
  riskHighlights: [
    { category: 'Model Governance', rating: 'Low', items: ['All Tier 1 models validated', 'MRM team fully staffed', 'Automated monitoring deployed'] },
    { category: 'Regulatory', rating: 'Low', items: ['SOC 2 Type II certified', 'GDPR compliant', 'FedRAMP authorization in progress'] },
    { category: 'Operational', rating: 'Medium', items: ['Override rate within target', 'MTTR improved 23%', 'GPU capacity at 75%'] },
    { category: 'Third-Party', rating: 'Low', items: ['All vendors assessed', 'No critical findings', '2 contracts expiring Q2'] },
  ],
  topRisks: [
    { id: 1, risk: 'LLM cost growth exceeding budget projections', impact: 'High', likelihood: 'Medium', mitigation: 'Implementing token optimization and caching' },
    { id: 2, risk: 'Single vendor dependency for primary LLM', impact: 'High', likelihood: 'Low', mitigation: 'Multi-provider strategy approved' },
    { id: 3, risk: 'Data privacy in RAG implementations', impact: 'Medium', likelihood: 'Medium', mitigation: 'PII detection layer deployed' },
  ],
  keyDecisions: [
    { decision: 'Approve $2.4M AI infrastructure investment', status: 'For Approval', deadline: '2024-12-20' },
    { decision: 'Ratify updated AI Ethics Policy', status: 'For Approval', deadline: '2024-12-20' },
    { decision: 'Note: Q4 AI/ML audit results', status: 'For Information', deadline: null },
  ],
  quarterComparison: [
    { quarter: 'Q1', score: 58 },
    { quarter: 'Q2', score: 62 },
    { quarter: 'Q3', score: 65 },
    { quarter: 'Q4', score: 68 },
  ],
};

const getRatingStyle = (rating: string) => {
  switch (rating.toLowerCase()) {
    case 'low': return { bg: '#e8e8e8', color: '#333', label: 'Low Risk' };
    case 'medium': case 'moderate': return { bg: '#666', color: '#fff', label: 'Moderate' };
    case 'high': return { bg: '#333', color: '#fff', label: 'High Risk' };
    default: return { bg: '#f0f0f0', color: '#666', label: rating };
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'exceeding': return { color: '#333', icon: '▲' };
    case 'on-track': return { color: '#666', icon: '●' };
    case 'at-risk': return { color: '#888', icon: '▼' };
    default: return { color: '#999', icon: '○' };
  }
};

interface BoardRiskSummaryProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BoardRiskSummary: React.FC<BoardRiskSummaryProps> = ({
  data = defaultData,
  width = 700,
  height = 640,
  title = "AI/ML Risk Summary"
}) => {
  const ratingStyle = getRatingStyle(data.overallRiskRating);

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
      <div style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid #1a1a1a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: chartColors.primary }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 11, color: '#666' }}>{data.preparedFor} • {data.reportDate}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{data.riskScore}</div>
              <div style={{ fontSize: 9, color: '#888', textTransform: 'uppercase' }}>Risk Score</div>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              ...ratingStyle,
              fontWeight: 600,
              fontSize: 12,
            }}>
              {ratingStyle.label}
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{ 
        marginBottom: '1.25rem', 
        padding: '0.75rem', 
        background: '#f8f8f8',
        borderLeft: '4px solid #1a1a1a',
        fontSize: 12,
        lineHeight: 1.5,
      }}>
        {data.executiveSummary}
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {data.keyMetrics.map((metric, i) => {
          const statusStyle = getStatusStyle(metric.status);
          return (
            <div key={i} style={{ padding: '0.75rem', background: '#f8f8f8', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: statusStyle.color }}>
                {metric.value}
                <span style={{ fontSize: 12, marginLeft: 2 }}>{statusStyle.icon}</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 500, marginTop: '0.15rem' }}>{metric.metric}</div>
              <div style={{ fontSize: 9, color: '#888' }}>Target: {metric.target}</div>
            </div>
          );
        })}
      </div>

      {/* Risk Highlights */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
          Risk Category Summary
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          {data.riskHighlights.map((cat, i) => {
            const style = getRatingStyle(cat.rating);
            return (
              <div key={i} style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{cat.category}</span>
                  <span style={{
                    padding: '0.1rem 0.4rem',
                    fontSize: 9,
                    fontWeight: 600,
                    background: style.bg,
                    color: style.color,
                  }}>
                    {cat.rating}
                  </span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: 10, color: '#666' }}>
                  {cat.items.map((item, j) => (
                    <li key={j} style={{ marginBottom: '0.15rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Risks */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
          Top Risks Requiring Attention
        </div>
        {data.topRisks.map((risk, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '0.75rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid #f0f0f0',
            fontSize: 11,
          }}>
            <span style={{
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#333',
              color: '#fff',
              fontWeight: 700,
              fontSize: 10,
            }}>
              {risk.id}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{risk.risk}</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: '0.15rem' }}>
                Mitigation: {risk.mitigation}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 10 }}>
              <div>Impact: <strong>{risk.impact}</strong></div>
              <div>Likelihood: <strong>{risk.likelihood}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Decisions */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
          Board Actions Required
        </div>
        {data.keyDecisions.map((decision, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.4rem 0',
            borderBottom: '1px solid #f0f0f0',
            fontSize: 11,
          }}>
            <span style={{ flex: 1 }}>{decision.decision}</span>
            <span style={{
              padding: '0.15rem 0.5rem',
              fontSize: 9,
              fontWeight: 600,
              background: decision.status === 'For Approval' ? '#333' : '#e8e8e8',
              color: decision.status === 'For Approval' ? '#fff' : '#666',
              marginLeft: '0.5rem',
            }}>
              {decision.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardRiskSummary;
