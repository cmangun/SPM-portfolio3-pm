"use client";
import React from 'react';
import { chartColors, chartTypography, dataClassification } from './colors';

// Data Classification Matrix - PII/PHI/Confidential inventory
const defaultData = {
  lastScan: '2024-12-13',
  totalDatasets: 247,
  totalTables: 1834,
  classified: 1756,
  unclassified: 78,
  classifications: [
    { level: 'Restricted', count: 234, tables: 89, description: 'PII/PHI - Highest protection', color: '#1a1a1a' },
    { level: 'Confidential', count: 456, tables: 312, description: 'Business-sensitive data', color: '#444' },
    { level: 'Internal', count: 892, tables: 678, description: 'Internal use only', color: '#777' },
    { level: 'Public', count: 174, tables: 677, description: 'No restrictions', color: '#aaa' },
  ],
  dataTypes: [
    { type: 'PII', count: 156, examples: 'SSN, Email, Phone, Address' },
    { type: 'PHI', count: 78, examples: 'Medical records, Diagnoses, Prescriptions' },
    { type: 'PCI', count: 45, examples: 'Credit cards, Bank accounts' },
    { type: 'Financial', count: 234, examples: 'Revenue, Costs, Transactions' },
    { type: 'Operational', count: 567, examples: 'Logs, Metrics, Configs' },
  ],
  byDomain: [
    { domain: 'Customer Data', restricted: 89, confidential: 124, internal: 234, public: 12 },
    { domain: 'Financial', restricted: 45, confidential: 178, internal: 145, public: 23 },
    { domain: 'Operations', restricted: 12, confidential: 67, internal: 345, public: 89 },
    { domain: 'Analytics', restricted: 34, confidential: 56, internal: 123, public: 34 },
    { domain: 'ML/AI', restricted: 54, confidential: 31, internal: 45, public: 16 },
  ],
  complianceMapping: [
    { regulation: 'GDPR', datasets: 234, status: 'compliant' },
    { regulation: 'HIPAA', datasets: 78, status: 'compliant' },
    { regulation: 'PCI-DSS', datasets: 45, status: 'compliant' },
    { regulation: 'CCPA', datasets: 156, status: 'review' },
  ],
  recentChanges: [
    { date: '2024-12-12', dataset: 'customer_profiles', change: 'Upgraded to Restricted', user: 'dpo@corp.com' },
    { date: '2024-12-10', dataset: 'ml_features_v3', change: 'Added PII flag', user: 'mlops@corp.com' },
    { date: '2024-12-08', dataset: 'marketing_events', change: 'Classified as Internal', user: 'auto-scan' },
  ],
};

interface DataClassificationMatrixProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DataClassificationMatrix: React.FC<DataClassificationMatrixProps> = ({
  data = defaultData,
  width = 700,
  height = 540,
  title = "Data Classification Matrix"
}) => {
  const classificationPercent = Math.round((data.classified / data.totalTables) * 100);

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>PII/PHI/Confidential inventory • Last scan: {data.lastScan}</p>
          </div>
          <div style={{
            padding: '0.5rem 0.75rem',
            background: data.unclassified > 50 ? '#333' : '#f5f5f5',
            color: data.unclassified > 50 ? '#fff' : '#333',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{classificationPercent}%</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase' }}>Classified</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {data.classifications.map((c, i) => (
          <div key={i} style={{
            padding: '0.75rem',
            background: c.color,
            color: i < 2 ? '#fff' : '#333',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{c.count}</div>
            <div style={{ fontSize: 10, fontWeight: 600 }}>{c.level}</div>
            <div style={{ fontSize: 8, opacity: 0.8 }}>{c.tables} tables</div>
          </div>
        ))}
      </div>

      {/* Data Types & By Domain */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Sensitive Data Types */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Sensitive Data Types</div>
          {data.dataTypes.map((dt, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.4rem 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <div style={{ width: 60 }}>
                <span style={{
                  padding: '0.15rem 0.4rem',
                  fontSize: 9,
                  fontWeight: 600,
                  background: i < 3 ? '#333' : '#888',
                  color: '#fff',
                }}>
                  {dt.type}
                </span>
              </div>
              <div style={{ flex: 1, fontSize: 10, color: '#666' }}>{dt.examples}</div>
              <div style={{ width: 40, textAlign: 'right', fontWeight: 600, fontSize: 11 }}>{dt.count}</div>
            </div>
          ))}
        </div>

        {/* By Domain */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>By Data Domain</div>
          {data.byDomain.map((domain, i) => {
            const total = domain.restricted + domain.confidential + domain.internal + domain.public;
            return (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: '0.2rem' }}>
                  <span>{domain.domain}</span>
                  <span style={{ color: '#888' }}>{total} datasets</span>
                </div>
                <div style={{ display: 'flex', height: 8 }}>
                  <div style={{ width: `${(domain.restricted / total) * 100}%`, background: '#1a1a1a' }} />
                  <div style={{ width: `${(domain.confidential / total) * 100}%`, background: '#444' }} />
                  <div style={{ width: `${(domain.internal / total) * 100}%`, background: '#777' }} />
                  <div style={{ width: `${(domain.public / total) * 100}%`, background: '#aaa' }} />
                </div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: 9, marginTop: '0.5rem', color: '#666' }}>
            <span>■ Restricted</span>
            <span style={{ color: '#444' }}>■ Confidential</span>
            <span style={{ color: '#777' }}>■ Internal</span>
            <span style={{ color: '#aaa' }}>■ Public</span>
          </div>
        </div>
      </div>

      {/* Compliance Mapping */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Regulatory Compliance Mapping</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {data.complianceMapping.map((reg, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '0.5rem',
              background: '#f8f8f8',
              textAlign: 'center',
              borderLeft: `3px solid ${reg.status === 'compliant' ? '#444' : '#888'}`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{reg.datasets}</div>
              <div style={{ fontSize: 10, fontWeight: 500 }}>{reg.regulation}</div>
              <div style={{ 
                fontSize: 8, 
                marginTop: '0.2rem',
                color: reg.status === 'compliant' ? '#444' : '#888',
                textTransform: 'uppercase',
              }}>
                {reg.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Changes */}
      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.35rem' }}>Recent Classification Changes</div>
        {data.recentChanges.map((change, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '0.75rem',
            padding: '0.3rem 0',
            fontSize: 10,
            borderBottom: '1px solid #f5f5f5',
          }}>
            <span style={{ color: '#888', width: 70 }}>{change.date}</span>
            <span style={{ fontWeight: 500, width: 120 }}>{change.dataset}</span>
            <span style={{ flex: 1, color: '#666' }}>{change.change}</span>
            <span style={{ color: '#888' }}>{change.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataClassificationMatrix;
