"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

interface CostItem {
  category: string;
  investment: number;
  savings: number;
  type: 'infrastructure' | 'software' | 'personnel' | 'operations';
}

interface CostBreakdownChartProps {
  data?: {
    title: string;
    period: string;
    items: CostItem[];
    currency?: string;
  };
  width?: number;
  height?: number;
}

const defaultData = {
  title: 'Total Cost of Ownership Analysis',
  period: 'Annual (Year 1)',
  currency: '$',
  items: [
    { category: 'Cloud Infrastructure', investment: 222000, savings: 0, type: 'infrastructure' as const },
    { category: 'API/ML Services', investment: 98400, savings: 0, type: 'software' as const },
    { category: 'Development Team', investment: 540000, savings: 0, type: 'personnel' as const },
    { category: 'Maintenance', investment: 144000, savings: 0, type: 'operations' as const },
    { category: 'Search Time Reduction', investment: 0, savings: 850000, type: 'operations' as const },
    { category: 'MLR Cycle Improvement', investment: 0, savings: 720000, type: 'operations' as const },
    { category: 'Error Reduction', investment: 0, savings: 380000, type: 'operations' as const },
    { category: 'Productivity Gains', investment: 0, savings: 130000, type: 'personnel' as const },
  ]
};

const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  data = defaultData,
  width = 800,
  height = 500
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const margin = { top: 60, right: 200, bottom: 100, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const totalInvestment = data.items.reduce((sum, item) => sum + item.investment, 0);
  const totalSavings = data.items.reduce((sum, item) => sum + item.savings, 0);
  const netBenefit = totalSavings - totalInvestment;
  const roi = ((totalSavings - totalInvestment) / totalInvestment) * 100;

  const maxValue = Math.max(totalInvestment, totalSavings);
  const scale = innerHeight / maxValue;

  const formatCurrency = (v: number) => {
    if (v >= 1000000) return `${data.currency}${(v / 1000000).toFixed(2)}M`;
    if (v >= 1000) return `${data.currency}${(v / 1000).toFixed(0)}K`;
    return `${data.currency}${v}`;
  };

  // Group items by investment vs savings
  const investmentItems = data.items.filter(i => i.investment > 0);
  const savingsItems = data.items.filter(i => i.savings > 0);

  const barWidth = 120;
  const stackGap = 4;

  // Calculate stacked positions for investment
  let investmentY = innerHeight;
  const investmentStacks = investmentItems.map(item => {
    const h = item.investment * scale;
    const y = investmentY - h;
    investmentY = y - stackGap;
    return { ...item, y, height: h };
  });

  // Calculate stacked positions for savings
  let savingsY = innerHeight;
  const savingsStacks = savingsItems.map(item => {
    const h = item.savings * scale;
    const y = savingsY - h;
    savingsY = y - stackGap;
    return { ...item, y, height: h };
  });

  const typeColors: Record<string, string> = {
    infrastructure: '#333333',
    software: '#555555',
    personnel: '#777777',
    operations: '#999999',
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', borderRadius: '8px', padding: '20px' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Title */}
        <text
          x={margin.left}
          y={25}
          fontSize={18}
          fontWeight={700}
          fill={chartColors.charcoal}
        >
          {data.title}
        </text>
        <text
          x={margin.left}
          y={45}
          fontSize={12}
          fill={chartColors.gray}
        >
          {data.period}
        </text>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y-axis */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = innerHeight - (pct * innerHeight);
            const value = pct * maxValue;
            return (
              <g key={i}>
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={y}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeDasharray={i === 0 ? 'none' : '4,4'}
                />
                <text
                  x={-10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill={chartColors.gray}
                >
                  {formatCurrency(value)}
                </text>
              </g>
            );
          })}

          {/* Investment Bar */}
          <g transform={`translate(${innerWidth * 0.25 - barWidth / 2}, 0)`}>
            {investmentStacks.map((item, i) => (
              <g
                key={i}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <rect
                  x={0}
                  y={item.y}
                  width={barWidth}
                  height={item.height - stackGap}
                  fill={typeColors[item.type]}
                  opacity={hoveredBar === i ? 1 : 0.85}
                  rx={4}
                  style={{ cursor: 'pointer' }}
                />
                {item.height > 25 && (
                  <text
                    x={barWidth / 2}
                    y={item.y + item.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="#fff"
                    fontWeight={500}
                  >
                    {formatCurrency(item.investment)}
                  </text>
                )}
              </g>
            ))}
            {/* Label */}
            <text
              x={barWidth / 2}
              y={innerHeight + 20}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill={chartColors.charcoal}
            >
              Investment
            </text>
            <text
              x={barWidth / 2}
              y={innerHeight + 35}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={chartColors.charcoal}
            >
              {formatCurrency(totalInvestment)}
            </text>
          </g>

          {/* Savings Bar */}
          <g transform={`translate(${innerWidth * 0.75 - barWidth / 2}, 0)`}>
            {savingsStacks.map((item, i) => (
              <g
                key={i}
                onMouseEnter={() => setHoveredBar(100 + i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <rect
                  x={0}
                  y={item.y}
                  width={barWidth}
                  height={item.height - stackGap}
                  fill={chartColors.teal}
                  opacity={hoveredBar === 100 + i ? 1 : 0.85}
                  rx={4}
                  style={{ cursor: 'pointer' }}
                />
                {item.height > 25 && (
                  <text
                    x={barWidth / 2}
                    y={item.y + item.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="#fff"
                    fontWeight={500}
                  >
                    {formatCurrency(item.savings)}
                  </text>
                )}
              </g>
            ))}
            {/* Label */}
            <text
              x={barWidth / 2}
              y={innerHeight + 20}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill={chartColors.teal}
            >
              Savings
            </text>
            <text
              x={barWidth / 2}
              y={innerHeight + 35}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={chartColors.teal}
            >
              {formatCurrency(totalSavings)}
            </text>
          </g>

          {/* Arrow and Net Benefit */}
          <g transform={`translate(${innerWidth * 0.5}, ${innerHeight * 0.3})`}>
            <line
              x1={-60}
              x2={60}
              y1={0}
              y2={0}
              stroke={chartColors.charcoal}
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L9,3 z" fill={chartColors.charcoal} />
              </marker>
            </defs>
          </g>
        </g>

        {/* ROI Summary Panel */}
        <g transform={`translate(${width - margin.right + 20}, ${margin.top})`}>
          <rect
            x={0}
            y={0}
            width={170}
            height={180}
            fill="#f8f8f8"
            rx={8}
          />
          
          <text x={15} y={25} fontSize={12} fontWeight={600} fill={chartColors.charcoal}>
            ROI Summary
          </text>

          <text x={15} y={55} fontSize={10} fill={chartColors.gray}>
            Net Benefit
          </text>
          <text x={15} y={75} fontSize={20} fontWeight={700} fill={netBenefit >= 0 ? chartColors.teal : '#c00'}>
            {formatCurrency(netBenefit)}
          </text>

          <text x={15} y={105} fontSize={10} fill={chartColors.gray}>
            Return on Investment
          </text>
          <text x={15} y={125} fontSize={20} fontWeight={700} fill={chartColors.charcoal}>
            {roi.toFixed(1)}%
          </text>

          <text x={15} y={155} fontSize={10} fill={chartColors.gray}>
            Payback Period
          </text>
          <text x={15} y={172} fontSize={14} fontWeight={600} fill={chartColors.charcoal}>
            {(totalInvestment / (totalSavings / 12)).toFixed(1)} months
          </text>
        </g>

        {/* Legend */}
        <g transform={`translate(${width - margin.right + 20}, ${margin.top + 200})`}>
          <text x={0} y={0} fontSize={11} fontWeight={600} fill={chartColors.charcoal}>
            Cost Categories
          </text>
          {Object.entries(typeColors).map(([type, color], i) => (
            <g key={type} transform={`translate(0, ${18 + i * 20})`}>
              <rect x={0} y={0} width={14} height={14} fill={color} rx={2} />
              <text x={20} y={11} fontSize={10} fill={chartColors.charcoal}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </text>
            </g>
          ))}
          <g transform={`translate(0, ${18 + 4 * 20})`}>
            <rect x={0} y={0} width={14} height={14} fill={chartColors.teal} rx={2} />
            <text x={20} y={11} fontSize={10} fill={chartColors.charcoal}>
              Savings
            </text>
          </g>
        </g>
      </svg>

      {/* Detailed breakdown table */}
      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: chartColors.gray }}>Category</th>
              <th style={{ textAlign: 'right', padding: '8px', color: chartColors.gray }}>Investment</th>
              <th style={{ textAlign: 'right', padding: '8px', color: chartColors.gray }}>Savings</th>
              <th style={{ textAlign: 'right', padding: '8px', color: chartColors.gray }}>Net</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px', color: chartColors.charcoal }}>{item.category}</td>
                <td style={{ textAlign: 'right', padding: '8px', color: item.investment > 0 ? chartColors.charcoal : chartColors.gray }}>
                  {item.investment > 0 ? formatCurrency(item.investment) : '-'}
                </td>
                <td style={{ textAlign: 'right', padding: '8px', color: item.savings > 0 ? chartColors.teal : chartColors.gray }}>
                  {item.savings > 0 ? formatCurrency(item.savings) : '-'}
                </td>
                <td style={{ textAlign: 'right', padding: '8px', fontWeight: 600, color: (item.savings - item.investment) >= 0 ? chartColors.teal : chartColors.charcoal }}>
                  {formatCurrency(item.savings - item.investment)}
                </td>
              </tr>
            ))}
            <tr style={{ borderTop: '2px solid #333', fontWeight: 700 }}>
              <td style={{ padding: '8px' }}>Total</td>
              <td style={{ textAlign: 'right', padding: '8px' }}>{formatCurrency(totalInvestment)}</td>
              <td style={{ textAlign: 'right', padding: '8px', color: chartColors.teal }}>{formatCurrency(totalSavings)}</td>
              <td style={{ textAlign: 'right', padding: '8px', color: chartColors.teal }}>{formatCurrency(netBenefit)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CostBreakdownChart;
