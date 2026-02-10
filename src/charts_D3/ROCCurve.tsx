'use client';
/**
 * ROCCurve - Receiver Operating Characteristic curve for model performance
 * Shows model discrimination ability with AUC and operating points
 */
import React from 'react';

interface ROCPoint {
  fpr: number; // False Positive Rate (1 - Specificity)
  tpr: number; // True Positive Rate (Sensitivity)
  threshold?: number;
}

interface ROCData {
  modelName: string;
  points: ROCPoint[];
  auc: number;
  operatingPoint?: {
    fpr: number;
    tpr: number;
    threshold: number;
    label: string;
  };
  comparisonModels?: {
    name: string;
    points: ROCPoint[];
    auc: number;
    color: string;
  }[];
}

interface ROCCurveProps {
  data: ROCData;
  title?: string;
  width?: number;
  height?: number;
  showConfidenceInterval?: boolean;
}

const ROCCurve: React.FC<ROCCurveProps> = ({
  data,
  title = 'ROC Curve',
  width = 500,
  height = 500,
}) => {
  const padding = { top: 40, right: 120, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Scale functions
  const xScale = (fpr: number) => fpr * chartWidth;
  const yScale = (tpr: number) => chartHeight - (tpr * chartHeight);
  
  // Generate path for ROC curve
  const generatePath = (points: ROCPoint[]) => {
    const sorted = [...points].sort((a, b) => a.fpr - b.fpr);
    return sorted.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.fpr)} ${yScale(p.tpr)}`).join(' ');
  };
  
  // Generate area under curve
  const generateArea = (points: ROCPoint[]) => {
    const sorted = [...points].sort((a, b) => a.fpr - b.fpr);
    const pathUp = sorted.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.fpr)} ${yScale(p.tpr)}`).join(' ');
    const pathDown = `L ${xScale(1)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`;
    return pathUp + pathDown;
  };
  
  // Get AUC interpretation
  const getAUCInterpretation = (auc: number) => {
    if (auc >= 0.97) return { label: 'Excellent', color: '#1a1a1a' };
    if (auc >= 0.93) return { label: 'Outstanding', color: '#333' };
    if (auc >= 0.90) return { label: 'Excellent', color: '#84cc16' };
    if (auc >= 0.80) return { label: 'Good', color: '#eab308' };
    if (auc >= 0.70) return { label: 'Fair', color: '#666' };
    return { label: 'Poor', color: '#666' };
  };
  
  const interpretation = getAUCInterpretation(data.auc);
  
  return (
    <div style={{ width: '100%', maxWidth: width }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>
            {title}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {data.modelName}
          </div>
        </div>
        <div style={{
          textAlign: 'right',
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>
            Area Under Curve (AUC)
          </div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: interpretation.color 
          }}>
            {data.auc.toFixed(3)}
          </div>
          <div style={{ 
            fontSize: '10px', 
            fontWeight: '600', 
            color: interpretation.color,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {interpretation.label}
          </div>
        </div>
      </div>
      
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(v => (
            <g key={v}>
              {/* Horizontal grid */}
              <line
                x1={0}
                y1={yScale(v)}
                x2={chartWidth}
                y2={yScale(v)}
                stroke="#e5e5e5"
                strokeDasharray={v === 0 || v === 1 ? 'none' : '4,4'}
              />
              {/* Vertical grid */}
              <line
                x1={xScale(v)}
                y1={0}
                x2={xScale(v)}
                y2={chartHeight}
                stroke="#e5e5e5"
                strokeDasharray={v === 0 || v === 1 ? 'none' : '4,4'}
              />
              {/* Y-axis labels */}
              <text
                x={-8}
                y={yScale(v)}
                fontSize="10"
                fill="#666"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {(v * 100).toFixed(0)}%
              </text>
              {/* X-axis labels */}
              <text
                x={xScale(v)}
                y={chartHeight + 20}
                fontSize="10"
                fill="#666"
                textAnchor="middle"
              >
                {(v * 100).toFixed(0)}%
              </text>
            </g>
          ))}
          
          {/* Diagonal reference line (random classifier) */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={0}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="8,4"
          />
          <text
            x={chartWidth / 2 + 20}
            y={chartHeight / 2 + 20}
            fontSize="10"
            fill="#999"
            transform={`rotate(-45, ${chartWidth / 2 + 20}, ${chartHeight / 2 + 20})`}
          >
            Random (AUC = 0.5)
          </text>
          
          {/* Comparison models */}
          {data.comparisonModels?.map((model, i) => (
            <g key={i}>
              <path
                d={generatePath(model.points)}
                fill="none"
                stroke={model.color}
                strokeWidth={1.5}
                strokeDasharray="6,3"
                opacity={0.7}
              />
            </g>
          ))}
          
          {/* Area under main curve */}
          <path
            d={generateArea(data.points)}
            fill="url(#rocGradient)"
          />
          
          {/* Main ROC curve */}
          <path
            d={generatePath(data.points)}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Operating point */}
          {data.operatingPoint && (
            <g>
              {/* Crosshair lines */}
              <line
                x1={xScale(data.operatingPoint.fpr)}
                y1={yScale(data.operatingPoint.tpr)}
                x2={xScale(data.operatingPoint.fpr)}
                y2={chartHeight}
                stroke="#1a1a1a"
                strokeDasharray="4,4"
                opacity={0.7}
              />
              <line
                x1={0}
                y1={yScale(data.operatingPoint.tpr)}
                x2={xScale(data.operatingPoint.fpr)}
                y2={yScale(data.operatingPoint.tpr)}
                stroke="#1a1a1a"
                strokeDasharray="4,4"
                opacity={0.7}
              />
              
              {/* Point marker */}
              <circle
                cx={xScale(data.operatingPoint.fpr)}
                cy={yScale(data.operatingPoint.tpr)}
                r={8}
                fill="#1a1a1a"
                stroke="#fff"
                strokeWidth={2}
              />
              
              {/* Label */}
              <rect
                x={xScale(data.operatingPoint.fpr) + 12}
                y={yScale(data.operatingPoint.tpr) - 30}
                width={120}
                height={50}
                rx={4}
                fill="#fff"
                stroke="#1a1a1a"
                strokeWidth={1}
              />
              <text
                x={xScale(data.operatingPoint.fpr) + 22}
                y={yScale(data.operatingPoint.tpr) - 14}
                fontSize="10"
                fontWeight="600"
                fill="#1a1a1a"
              >
                {data.operatingPoint.label}
              </text>
              <text
                x={xScale(data.operatingPoint.fpr) + 22}
                y={yScale(data.operatingPoint.tpr)}
                fontSize="9"
                fill="#666"
              >
                Sens: {(data.operatingPoint.tpr * 100).toFixed(1)}%
              </text>
              <text
                x={xScale(data.operatingPoint.fpr) + 22}
                y={yScale(data.operatingPoint.tpr) + 12}
                fontSize="9"
                fill="#666"
              >
                Spec: {((1 - data.operatingPoint.fpr) * 100).toFixed(1)}%
              </text>
            </g>
          )}
          
          {/* Axis labels */}
          <text
            x={chartWidth / 2}
            y={chartHeight + 45}
            fontSize="12"
            fill="#333"
            textAnchor="middle"
          >
            False Positive Rate (1 - Specificity)
          </text>
          <text
            x={-chartHeight / 2}
            y={-40}
            fontSize="12"
            fill="#333"
            textAnchor="middle"
            transform="rotate(-90)"
          >
            True Positive Rate (Sensitivity)
          </text>
        </g>
      </svg>
      
      {/* Legend and metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginTop: '16px'
      }}>
        {/* Legend */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            Legend
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '3px', backgroundColor: '#1a1a1a' }} />
            <span style={{ fontSize: '11px', color: '#333' }}>{data.modelName}</span>
          </div>
          {data.comparisonModels?.map((model, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: model.color, opacity: 0.7 }} />
              <span style={{ fontSize: '11px', color: '#666' }}>{model.name} (AUC: {model.auc.toFixed(3)})</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '1px', backgroundColor: '#ccc' }} />
            <span style={{ fontSize: '11px', color: '#999' }}>Random classifier</span>
          </div>
        </div>
        
        {/* Performance metrics */}
        {data.operatingPoint && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: '600',
              color: '#1a1a1a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              Operating Point
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>
                  {(data.operatingPoint.tpr * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>Sensitivity</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>
                  {((1 - data.operatingPoint.fpr) * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>Specificity</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROCCurve;
