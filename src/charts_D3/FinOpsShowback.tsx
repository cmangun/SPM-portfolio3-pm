import React from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface ShowbackItem {
  costCenter: string;
  department: string;
  models: number;
  computeHours: number;
  storageTB: number;
  apiCalls: number;
  totalCost: number;
  allocated: number;
  variance: number;
}

interface FinOpsShowbackProps {
  data?: ShowbackItem[];
  period?: string;
  totalBudget?: number;
}

const defaultData: ShowbackItem[] = [
  { costCenter: 'CC-1001', department: 'Risk Analytics', models: 12, computeHours: 4500, storageTB: 2.3, apiCalls: 1200000, totalCost: 45000, allocated: 42000, variance: -3000 },
  { costCenter: 'CC-1002', department: 'Fraud Detection', models: 8, computeHours: 8200, storageTB: 5.1, apiCalls: 3400000, totalCost: 78000, allocated: 75000, variance: -3000 },
  { costCenter: 'CC-1003', department: 'Customer Insights', models: 15, computeHours: 3100, storageTB: 1.8, apiCalls: 890000, totalCost: 32000, allocated: 35000, variance: 3000 },
  { costCenter: 'CC-1004', department: 'Operations ML', models: 6, computeHours: 2200, storageTB: 0.9, apiCalls: 450000, totalCost: 21000, allocated: 20000, variance: -1000 },
  { costCenter: 'CC-1005', department: 'Marketing AI', models: 10, computeHours: 1800, storageTB: 1.2, apiCalls: 670000, totalCost: 18000, allocated: 22000, variance: 4000 },
  { costCenter: 'CC-1006', department: 'HR Analytics', models: 4, computeHours: 800, storageTB: 0.4, apiCalls: 120000, totalCost: 8000, allocated: 10000, variance: 2000 },
];

export const FinOpsShowback: React.FC<FinOpsShowbackProps> = ({
  data = defaultData,
  period = 'November 2024',
  totalBudget = 220000,
}) => {
  const totalSpend = data.reduce((sum, d) => sum + d.totalCost, 0);
  const totalAllocated = data.reduce((sum, d) => sum + d.allocated, 0);
  const totalVariance = totalAllocated - totalSpend;

  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
  const formatNumber = (n: number) => n.toLocaleString();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        FinOps Showback Report
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1.5rem' }}>
        AI/ML cost allocation by cost center • {period}
      </p>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.25rem' }}>TOTAL BUDGET</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: chartColors.text.primary }}>{formatCurrency(totalBudget)}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.25rem' }}>ACTUAL SPEND</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: chartColors.text.primary }}>{formatCurrency(totalSpend)}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.25rem' }}>ALLOCATED</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: chartColors.text.primary }}>{formatCurrency(totalAllocated)}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.25rem' }}>VARIANCE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: totalVariance >= 0 ? chartColors.text.primary : chartColors.text.primary }}>
            {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
          </div>
        </div>
      </div>

      {/* Showback Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Cost Center</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Department</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Models</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Compute Hrs</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Storage (TB)</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>API Calls</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Total Cost</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Allocated</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}`, fontWeight: 600 }}>Variance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.costCenter} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace' }}>{item.costCenter}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}` }}>{item.department}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{item.models}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{formatNumber(item.computeHours)}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{item.storageTB.toFixed(1)}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{formatNumber(item.apiCalls)}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right', fontWeight: 500 }}>{formatCurrency(item.totalCost)}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right' }}>{formatCurrency(item.allocated)}</td>
              <td style={{ padding: '0.75rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right', fontWeight: 500 }}>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  backgroundColor: item.variance >= 0 ? chartColors.surface : chartColors.background,
                  border: `1px solid ${item.variance >= 0 ? chartColors.border : chartColors.text.primary}`
                }}>
                  {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: chartColors.surface, fontWeight: 600 }}>
            <td colSpan={6} style={{ padding: '0.75rem', borderTop: `2px solid ${chartColors.text.primary}` }}>TOTAL</td>
            <td style={{ padding: '0.75rem', borderTop: `2px solid ${chartColors.text.primary}`, textAlign: 'right' }}>{formatCurrency(totalSpend)}</td>
            <td style={{ padding: '0.75rem', borderTop: `2px solid ${chartColors.text.primary}`, textAlign: 'right' }}>{formatCurrency(totalAllocated)}</td>
            <td style={{ padding: '0.75rem', borderTop: `2px solid ${chartColors.text.primary}`, textAlign: 'right' }}>
              {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Cost Breakdown Bar */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.5rem' }}>SPEND BY DEPARTMENT</div>
        <div style={{ display: 'flex', height: '2rem', border: `1px solid ${chartColors.border}` }}>
          {data.map((item, idx) => {
            const width = (item.totalCost / totalSpend) * 100;
            const patterns = ['', 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', ''];
            return (
              <div
                key={item.costCenter}
                style={{
                  width: `${width}%`,
                  backgroundColor: idx % 2 === 0 ? chartColors.text.primary : chartColors.gray[400],
                  backgroundImage: patterns[idx % 3],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={`${item.department}: ${formatCurrency(item.totalCost)} (${width.toFixed(1)}%)`}
              >
                {width > 10 && (
                  <span style={{ fontSize: '0.625rem', color: idx % 2 === 0 ? chartColors.background : chartColors.text.primary, fontWeight: 500 }}>
                    {width.toFixed(0)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
          {data.map((item, idx) => (
            <div key={item.costCenter} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: idx % 2 === 0 ? chartColors.text.primary : chartColors.gray[400] }} />
              <span>{item.department}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinOpsShowback;
