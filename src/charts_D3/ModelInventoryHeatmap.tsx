"use client";
import React, { useState } from 'react';
import { chartColors, chartTypography, getHeatmapColor } from './colors';

// Model Inventory Heatmap - Coverage by business unit, risk tier, age
const defaultData = {
  lastUpdated: '2024-12-13',
  totalModels: 156,
  businessUnits: ['Risk', 'Lending', 'Marketing', 'Operations', 'Compliance', 'Finance', 'HR', 'Customer Svc'],
  riskTiers: ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'],
  matrix: [
    // Risk
    [{ count: 5, validated: 5, avgAge: 14 }, { count: 8, validated: 7, avgAge: 18 }, { count: 4, validated: 4, avgAge: 24 }, { count: 2, validated: 2, avgAge: 30 }],
    // Lending
    [{ count: 6, validated: 6, avgAge: 12 }, { count: 10, validated: 9, avgAge: 20 }, { count: 6, validated: 5, avgAge: 28 }, { count: 3, validated: 3, avgAge: 36 }],
    // Marketing
    [{ count: 2, validated: 2, avgAge: 8 }, { count: 6, validated: 5, avgAge: 15 }, { count: 12, validated: 10, avgAge: 22 }, { count: 8, validated: 6, avgAge: 32 }],
    // Operations
    [{ count: 1, validated: 1, avgAge: 6 }, { count: 4, validated: 4, avgAge: 12 }, { count: 8, validated: 7, avgAge: 18 }, { count: 6, validated: 5, avgAge: 26 }],
    // Compliance
    [{ count: 4, validated: 4, avgAge: 10 }, { count: 5, validated: 5, avgAge: 16 }, { count: 3, validated: 3, avgAge: 20 }, { count: 1, validated: 1, avgAge: 28 }],
    // Finance
    [{ count: 3, validated: 3, avgAge: 11 }, { count: 7, validated: 6, avgAge: 19 }, { count: 5, validated: 4, avgAge: 25 }, { count: 4, validated: 3, avgAge: 34 }],
    // HR
    [{ count: 0, validated: 0, avgAge: 0 }, { count: 2, validated: 2, avgAge: 14 }, { count: 5, validated: 4, avgAge: 20 }, { count: 4, validated: 3, avgAge: 28 }],
    // Customer Svc
    [{ count: 2, validated: 2, avgAge: 9 }, { count: 5, validated: 4, avgAge: 17 }, { count: 8, validated: 6, avgAge: 23 }, { count: 6, validated: 4, avgAge: 31 }],
  ],
  summary: {
    byTier: [
      { tier: 'Tier 1', count: 23, validated: 23, percentage: 100 },
      { tier: 'Tier 2', count: 47, validated: 42, percentage: 89 },
      { tier: 'Tier 3', count: 51, validated: 43, percentage: 84 },
      { tier: 'Tier 4', count: 35, validated: 27, percentage: 77 },
    ],
    byAge: [
      { range: '0-12 mo', count: 42, percentage: 27 },
      { range: '12-24 mo', count: 58, percentage: 37 },
      { range: '24-36 mo', count: 38, percentage: 24 },
      { range: '36+ mo', count: 18, percentage: 12 },
    ],
  },
  alerts: [
    { type: 'overdue', message: '8 models overdue for validation', count: 8 },
    { type: 'aging', message: '18 models >36 months old', count: 18 },
    { type: 'coverage', message: '2 business units below 80% validation', count: 2 },
  ],
};

const getIntensity = (count: number, maxCount: number) => {
  if (count === 0) return 0;
  return Math.min(10, Math.round((count / maxCount) * 10));
};

const getValidationColor = (validated: number, total: number) => {
  if (total === 0) return '#f5f5f5';
  const pct = (validated / total) * 100;
  if (pct >= 100) return '#333';
  if (pct >= 90) return '#555';
  if (pct >= 80) return '#777';
  if (pct >= 70) return '#999';
  return '#bbb';
};

interface ModelInventoryHeatmapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ModelInventoryHeatmap: React.FC<ModelInventoryHeatmapProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Model Inventory Heatmap"
}) => {
  const [viewMode, setViewMode] = useState<'count' | 'validation' | 'age'>('count');
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const maxCount = Math.max(...data.matrix.flat().map(c => c.count));

  const getCellValue = (cell: { count: number; validated: number; avgAge: number }) => {
    switch (viewMode) {
      case 'count': return cell.count;
      case 'validation': return cell.count > 0 ? Math.round((cell.validated / cell.count) * 100) : 0;
      case 'age': return cell.avgAge;
      default: return cell.count;
    }
  };

  const getCellColor = (cell: { count: number; validated: number; avgAge: number }) => {
    if (cell.count === 0) return '#f5f5f5';
    switch (viewMode) {
      case 'count':
        return getHeatmapColor(getIntensity(cell.count, maxCount) * 10);
      case 'validation':
        return getValidationColor(cell.validated, cell.count);
      case 'age':
        // Older = darker
        const ageIntensity = Math.min(10, Math.round(cell.avgAge / 4));
        return getHeatmapColor(ageIntensity * 10);
      default:
        return '#e0e0e0';
    }
  };

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
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>{data.totalModels} models • Updated {data.lastUpdated}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {(['count', 'validation', 'age'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: 10,
                  border: `1px solid ${viewMode === mode ? chartColors.primary : '#ddd'}`,
                  background: viewMode === mode ? chartColors.primary : '#fff',
                  color: viewMode === mode ? '#fff' : '#666',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {mode === 'count' ? 'Count' : mode === 'validation' ? 'Validation %' : 'Avg Age'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `100px repeat(${data.riskTiers.length}, 1fr)`, gap: 2 }}>
          {/* Header row */}
          <div style={{ padding: '0.5rem', fontSize: 10, fontWeight: 600 }}></div>
          {data.riskTiers.map((tier, i) => (
            <div key={i} style={{ 
              padding: '0.5rem', 
              fontSize: 10, 
              fontWeight: 600, 
              textAlign: 'center',
              background: '#f5f5f5',
            }}>
              {tier}
            </div>
          ))}

          {/* Data rows */}
          {data.businessUnits.map((bu, rowIdx) => (
            <React.Fragment key={rowIdx}>
              <div style={{ 
                padding: '0.5rem', 
                fontSize: 11, 
                fontWeight: 500,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
              }}>
                {bu}
              </div>
              {data.matrix[rowIdx].map((cell, colIdx) => {
                const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                return (
                  <div
                    key={colIdx}
                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      background: getCellColor(cell),
                      color: getIntensity(cell.count, maxCount) > 5 || viewMode === 'validation' && cell.count > 0 && (cell.validated / cell.count) > 0.8 ? '#fff' : '#333',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.15s',
                      zIndex: isHovered ? 10 : 1,
                      position: 'relative',
                    }}
                  >
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                      {viewMode === 'validation' && cell.count > 0 ? `${getCellValue(cell)}%` : getCellValue(cell)}
                      {viewMode === 'age' && cell.count > 0 && <span style={{ fontSize: 10, fontWeight: 400 }}>mo</span>}
                    </div>
                    {isHovered && cell.count > 0 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#1a1a1a',
                        color: '#fff',
                        padding: '0.5rem',
                        fontSize: 10,
                        whiteSpace: 'nowrap',
                        zIndex: 100,
                        marginBottom: 4,
                      }}>
                        <div>{cell.count} models</div>
                        <div>{cell.validated} validated ({Math.round((cell.validated / cell.count) * 100)}%)</div>
                        <div>Avg age: {cell.avgAge} mo</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {/* By Tier */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.5rem' }}>By Risk Tier</div>
          {data.summary.byTier.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '0.25rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <span>{t.tier}</span>
              <span><strong>{t.count}</strong> ({t.percentage}% val)</span>
            </div>
          ))}
        </div>

        {/* By Age */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.5rem' }}>By Age</div>
          {data.summary.byAge.map((a, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '0.25rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <span>{a.range}</span>
              <span><strong>{a.count}</strong> ({a.percentage}%)</span>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '0.5rem' }}>Alerts</div>
          {data.alerts.map((alert, i) => (
            <div key={i} style={{ 
              padding: '0.35rem 0.5rem', 
              marginBottom: '0.35rem',
              background: '#f8f8f8',
              borderLeft: '3px solid #333',
              fontSize: 10,
            }}>
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelInventoryHeatmap;
