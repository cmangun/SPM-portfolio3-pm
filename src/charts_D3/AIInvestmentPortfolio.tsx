import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface AIInvestment {
  initiative: string;
  category: 'Foundation' | 'Growth' | 'Innovation' | 'Optimization';
  phase: 'Discovery' | 'Build' | 'Scale' | 'Mature';
  totalBudget: number;
  spent: number;
  forecast: number;
  roi: number | null; // null if not yet measurable
  expectedROI: number;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Complete';
  startDate: string;
  targetDate: string;
  owner: string;
}

interface AIInvestmentPortfolioProps {
  data?: AIInvestment[];
  fiscalYear?: string;
}

const defaultData: AIInvestment[] = [
  { initiative: 'ML Platform Foundation', category: 'Foundation', phase: 'Mature', totalBudget: 2500000, spent: 2100000, forecast: 2400000, roi: 185, expectedROI: 150, status: 'On Track', startDate: '2024-01', targetDate: '2024-12', owner: 'Platform Team' },
  { initiative: 'Fraud Detection v3', category: 'Growth', phase: 'Scale', totalBudget: 1800000, spent: 1200000, forecast: 1750000, roi: 320, expectedROI: 250, status: 'On Track', startDate: '2024-03', targetDate: '2025-02', owner: 'Risk Team' },
  { initiative: 'Customer Personalization', category: 'Growth', phase: 'Build', totalBudget: 1200000, spent: 600000, forecast: 1350000, roi: null, expectedROI: 200, status: 'At Risk', startDate: '2024-06', targetDate: '2025-03', owner: 'Marketing AI' },
  { initiative: 'GenAI Copilots', category: 'Innovation', phase: 'Discovery', totalBudget: 800000, spent: 250000, forecast: 850000, roi: null, expectedROI: 180, status: 'On Track', startDate: '2024-09', targetDate: '2025-06', owner: 'Innovation Lab' },
  { initiative: 'MLOps Automation', category: 'Optimization', phase: 'Build', totalBudget: 600000, spent: 350000, forecast: 580000, roi: 145, expectedROI: 300, status: 'On Track', startDate: '2024-05', targetDate: '2025-01', owner: 'MLOps Team' },
  { initiative: 'Data Quality Platform', category: 'Foundation', phase: 'Build', totalBudget: 900000, spent: 450000, forecast: 1100000, roi: null, expectedROI: 175, status: 'Behind', startDate: '2024-04', targetDate: '2024-12', owner: 'Data Team' },
  { initiative: 'Model Monitoring v2', category: 'Optimization', phase: 'Scale', totalBudget: 400000, spent: 320000, forecast: 390000, roi: 210, expectedROI: 200, status: 'Complete', startDate: '2024-02', targetDate: '2024-10', owner: 'SRE Team' },
];

export const AIInvestmentPortfolio: React.FC<AIInvestmentPortfolioProps> = ({
  data = defaultData,
  fiscalYear = 'FY2024-25',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 700;
  const height = 350;
  const margin = { top: 40, right: 120, bottom: 60, left: 60 };

  const totalBudget = data.reduce((sum, d) => sum + d.totalBudget, 0);
  const totalSpent = data.reduce((sum, d) => sum + d.spent, 0);
  const totalForecast = data.reduce((sum, d) => sum + d.forecast, 0);
  const avgROI = data.filter(d => d.roi !== null).reduce((sum, d) => sum + (d.roi || 0), 0) / data.filter(d => d.roi !== null).length;

  const categoryTotals = d3.rollup(data, v => d3.sum(v, d => d.totalBudget), d => d.category);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const phases = ['Discovery', 'Build', 'Scale', 'Mature'];
    const categories = ['Foundation', 'Growth', 'Innovation', 'Optimization'];

    const x = d3.scaleBand()
      .domain(phases)
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleBand()
      .domain(categories)
      .range([0, innerHeight])
      .padding(0.1);

    const bubbleScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d.totalBudget) || 1])
      .range([15, 50]);

    // Grid
    phases.forEach(phase => {
      categories.forEach(cat => {
        g.append('rect')
          .attr('x', x(phase) || 0)
          .attr('y', y(cat) || 0)
          .attr('width', x.bandwidth())
          .attr('height', y.bandwidth())
          .attr('fill', 'none')
          .attr('stroke', chartColors.border)
          .attr('stroke-dasharray', '2,2');
      });
    });

    // Bubbles
    data.forEach(d => {
      const xPos = (x(d.phase) || 0) + x.bandwidth() / 2;
      const yPos = (y(d.category) || 0) + y.bandwidth() / 2;
      const radius = bubbleScale(d.totalBudget);

      // Outer circle (budget)
      g.append('circle')
        .attr('cx', xPos)
        .attr('cy', yPos)
        .attr('r', radius)
        .attr('fill', d.status === 'Complete' ? chartColors.gray[300] : chartColors.background)
        .attr('stroke', d.status === 'Behind' ? chartColors.text.primary : chartColors.gray[500])
        .attr('stroke-width', d.status === 'Behind' || d.status === 'At Risk' ? 3 : 2);

      // Inner arc (spent)
      const spentPct = d.spent / d.totalBudget;
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 4)
        .startAngle(0)
        .endAngle(spentPct * 2 * Math.PI);

      g.append('path')
        .attr('transform', `translate(${xPos},${yPos})`)
        .attr('d', arc as any)
        .attr('fill', d.roi && d.roi >= d.expectedROI ? chartColors.gray[400] : chartColors.gray[300]);

      // Label
      g.append('text')
        .attr('x', xPos)
        .attr('y', yPos + radius + 14)
        .attr('text-anchor', 'middle')
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.65rem')
        .attr('font-weight', 500)
        .text(d.initiative.length > 18 ? d.initiative.slice(0, 16) + '...' : d.initiative);
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight + 10})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '0.8rem')
      .attr('font-weight', 500);

    g.append('g')
      .attr('transform', 'translate(-10,0)')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('font-size', '0.8rem')
      .attr('font-weight', 500);

    // Axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.75rem')
      .text('Initiative Phase →');

  }, [data]);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case 'Complete': return '●';
      case 'On Track': return '●';
      case 'At Risk': return '◐';
      case 'Behind': return '○';
      default: return '?';
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        AI Investment Portfolio
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Spend vs value by initiative • {fiscalYear}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL BUDGET</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{formatCurrency(totalBudget)}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>YTD SPENT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{formatCurrency(totalSpent)}</div>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>{((totalSpent/totalBudget)*100).toFixed(0)}% utilized</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${totalForecast > totalBudget ? chartColors.text.primary : chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>FULL YEAR FORECAST</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{formatCurrency(totalForecast)}</div>
          <div style={{ fontSize: '0.7rem', color: totalForecast > totalBudget ? chartColors.text.primary : chartColors.text.secondary }}>
            {totalForecast > totalBudget ? `${formatCurrency(totalForecast - totalBudget)} over` : 'Within budget'}
          </div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG REALIZED ROI</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{avgROI.toFixed(0)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>INITIATIVES</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
          <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>{data.filter(d => d.status === 'Complete').length} complete</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Detail Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Initiative</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Category</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Phase</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Budget</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Spent</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>ROI</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Status</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={d.initiative} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{d.initiative}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{d.category}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{d.phase}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{formatCurrency(d.totalBudget)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{formatCurrency(d.spent)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>
                {d.roi !== null ? `${d.roi}%` : '—'}
              </td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{getStatusIndicator(d.status)} {d.status}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{d.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AIInvestmentPortfolio;
