import React from 'react';
import { chartColors } from './colors';

interface ConsentRecord {
  category: string;
  totalUsers: number;
  consented: number;
  declined: number;
  pending: number;
  lastUpdated: string;
}

interface ConsentByRegion {
  region: string;
  framework: string;
  consentRate: number;
  optOutRate: number;
  pendingRequests: number;
}

interface ConsentManagementProps {
  data?: ConsentRecord[];
  byRegion?: ConsentByRegion[];
  requestsThisMonth?: { type: string; count: number }[];
}

const defaultData: ConsentRecord[] = [
  { category: 'AI/ML Processing', totalUsers: 125000, consented: 98500, declined: 15200, pending: 11300, lastUpdated: '2024-12-13' },
  { category: 'Automated Decision-Making', totalUsers: 125000, consented: 87200, declined: 28400, pending: 9400, lastUpdated: '2024-12-13' },
  { category: 'Profiling & Personalization', totalUsers: 125000, consented: 105300, declined: 12800, pending: 6900, lastUpdated: '2024-12-13' },
  { category: 'Third-Party Data Sharing', totalUsers: 125000, consented: 45600, declined: 68200, pending: 11200, lastUpdated: '2024-12-13' },
  { category: 'Marketing Communications', totalUsers: 125000, consented: 62300, declined: 55400, pending: 7300, lastUpdated: '2024-12-13' },
];

const defaultByRegion: ConsentByRegion[] = [
  { region: 'EU (GDPR)', framework: 'GDPR', consentRate: 72.3, optOutRate: 18.5, pendingRequests: 145 },
  { region: 'California (CCPA)', framework: 'CCPA/CPRA', consentRate: 68.9, optOutRate: 22.1, pendingRequests: 89 },
  { region: 'Brazil (LGPD)', framework: 'LGPD', consentRate: 78.4, optOutRate: 14.2, pendingRequests: 34 },
  { region: 'UK (UK-GDPR)', framework: 'UK-GDPR', consentRate: 71.8, optOutRate: 19.3, pendingRequests: 67 },
  { region: 'Rest of World', framework: 'Various', consentRate: 82.5, optOutRate: 8.2, pendingRequests: 23 },
];

const defaultRequests = [
  { type: 'Access Requests (DSAR)', count: 234 },
  { type: 'Deletion Requests', count: 156 },
  { type: 'Opt-Out Requests', count: 412 },
  { type: 'Correction Requests', count: 89 },
  { type: 'Portability Requests', count: 67 },
];

export const ConsentManagement: React.FC<ConsentManagementProps> = ({
  data = defaultData,
  byRegion = defaultByRegion,
  requestsThisMonth = defaultRequests,
}) => {
  const totalUsers = data[0]?.totalUsers || 0;
  const avgConsentRate = data.reduce((sum, d) => sum + (d.consented / d.totalUsers) * 100, 0) / data.length;
  const totalPending = data.reduce((sum, d) => sum + d.pending, 0);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Consent Management Dashboard
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        GDPR/CCPA consent status • AI/ML data processing
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL USERS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{totalUsers.toLocaleString()}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG CONSENT RATE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{avgConsentRate.toFixed(1)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>PENDING CONSENTS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{totalPending.toLocaleString()}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>REQUESTS THIS MONTH</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{requestsThisMonth.reduce((sum, r) => sum + r.count, 0)}</div>
        </div>
      </div>

      {/* Consent by Category */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>CONSENT BY CATEGORY</div>
        {data.map(cat => {
          const consentPct = (cat.consented / cat.totalUsers) * 100;
          const declinePct = (cat.declined / cat.totalUsers) * 100;
          const pendingPct = (cat.pending / cat.totalUsers) * 100;
          return (
            <div key={cat.category} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500 }}>{cat.category}</span>
                <span style={{ color: chartColors.text.secondary }}>
                  {cat.consented.toLocaleString()} consented / {cat.declined.toLocaleString()} declined / {cat.pending.toLocaleString()} pending
                </span>
              </div>
              <div style={{ display: 'flex', height: '1.5rem', border: `1px solid ${chartColors.border}` }}>
                <div 
                  style={{ width: `${consentPct}%`, backgroundColor: chartColors.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title={`Consented: ${consentPct.toFixed(1)}%`}
                >
                  {consentPct > 15 && <span style={{ fontSize: '0.7rem', color: chartColors.background, fontWeight: 500 }}>{consentPct.toFixed(0)}%</span>}
                </div>
                <div 
                  style={{ width: `${declinePct}%`, backgroundColor: chartColors.gray[400], display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title={`Declined: ${declinePct.toFixed(1)}%`}
                >
                  {declinePct > 10 && <span style={{ fontSize: '0.7rem', color: chartColors.text.primary, fontWeight: 500 }}>{declinePct.toFixed(0)}%</span>}
                </div>
                <div 
                  style={{ width: `${pendingPct}%`, backgroundColor: chartColors.surface }}
                  title={`Pending: ${pendingPct.toFixed(1)}%`}
                />
              </div>
            </div>
          );
        })}
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '1rem', height: '0.75rem', backgroundColor: chartColors.text.primary }} />
            <span>Consented</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '1rem', height: '0.75rem', backgroundColor: chartColors.gray[400] }} />
            <span>Declined</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '1rem', height: '0.75rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.border}` }} />
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* By Region */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>BY REGION / FRAMEWORK</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ backgroundColor: chartColors.surface }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Region</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Framework</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Consent %</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Opt-Out %</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Pending</th>
              </tr>
            </thead>
            <tbody>
              {byRegion.map((region, idx) => (
                <tr key={region.region} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{region.region}</td>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>
                    <span style={{ padding: '0.15rem 0.4rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.border}`, fontSize: '0.7rem' }}>
                      {region.framework}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right', fontWeight: 500 }}>{region.consentRate}%</td>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{region.optOutRate}%</td>
                  <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{region.pendingRequests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>REQUESTS THIS MONTH</div>
          {requestsThisMonth.map(req => (
            <div key={req.type} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontSize: '0.8rem' }}>
              <span>{req.type}</span>
              <span style={{ fontWeight: 600 }}>{req.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsentManagement;
