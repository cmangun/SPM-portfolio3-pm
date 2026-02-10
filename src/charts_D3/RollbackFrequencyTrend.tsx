import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface RollbackEvent {
  date: string;
  model: string;
  reason: string;
  impactMinutes: number;
  causedBy: 'Performance' | 'Bug' | 'Data Issue' | 'Config' | 'External';
}

interface RollbackFrequencyTrendProps {
  data?: RollbackEvent[];
  monthlyData?: { month: string; count: number; mttr: number }[];
}

const defaultMonthlyData = [
  { month: '2024-06', count: 4, mttr: 45 },
  { month: '2024-07', count: 6, mttr: 52 },
  { month: '2024-08', count: 3, mttr: 38 },
  { month: '2024-09', count: 5, mttr: 41 },
  { month: '2024-10', count: 2, mttr: 35 },
  { month: '2024-11', count: 3, mttr: 28 },
];

const defaultEvents: RollbackEvent[] = [
  { date: '2024-11-28', model: 'Fraud Detection v3.2', reason: 'Latency spike detected', impactMinutes: 15, causedBy: 'Performance' },
  { date: '2024-11-18', model: 'Recommendation Engine', reason: 'Null pointer in feature extraction', impactMinutes: 32, causedBy: 'Bug' },
  { date: '2024-11-05', model: 'Risk Scoring v2.1', reason: 'Feature drift above threshold', impactMinutes: 28, causedBy: 'Data Issue' },
  { date: '2024-10-22', model: 'NLP Classifier', reason: 'Config mismatch', impactMinutes: 45, causedBy: 'Config' },
  { date: '2024-10-08', model: 'Fraud Detection v3.1', reason: 'Upstream API change', impactMinutes: 55, causedBy: 'External' },
];

export const RollbackFrequencyTrend: React.FC<RollbackFrequencyTrendProps> = ({
  data = defaultEvents,
  monthlyData = defaultMonthlyData,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 600;
  const height = 250;
  const margin = { top: 30, right: 60, bottom: 40, left: 50 };

  const totalRollbacks = monthlyData.reduce((sum, d) => sum + d.count, 0);
  const avgMTTR = monthlyData.reduce((sum, d) => sum + d.mttr, 0) / monthlyData.length;
  const trend = monthlyData[monthlyData.length - 1].count - monthlyData[0].count;

  const byCause = data.reduce((acc, d) => {
    acc[d.causedBy] = (acc[d.causedBy] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(monthlyData.map(d => d.month))
      .range([0, innerWidth])
      .padding(0.5);

    const yLeft = d3.scaleLinear()
      .domain([0, d3.max(monthlyData, d => d.count) || 0])
      .nice()
      .range([innerHeight, 0]);

    const yRight = d3.scaleLinear()
      .domain([0, d3.max(monthlyData, d => d.mttr) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Bars for count
    g.selectAll('.bar')
      .data(monthlyData)
      .enter()
      .append('rect')
      .attr('x', d => (x(d.month) || 0) - 20)
      .attr('y', d => yLeft(d.count))
      .attr('width', 40)
      .attr('height', d => innerHeight - yLeft(d.count))
      .attr('fill', chartColors.gray[400])
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 1);

    // Line for MTTR
    const line = d3.line<typeof monthlyData[0]>()
      .x(d => x(d.month) || 0)
      .y(d => yRight(d.mttr))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(monthlyData)
      .attr('fill', 'none')
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 2.5)
      .attr('d', line);

    g.selectAll('.mttr-point')
      .data(monthlyData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.month) || 0)
      .attr('cy', d => yRight(d.mttr))
      .attr('r', 4)
      .attr('fill', chartColors.background)
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 2);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('g')
      .call(d3.axisLeft(yLeft).ticks(5))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('g')
      .attr('transform', `translate(${innerWidth},0)`)
      .call(d3.axisRight(yRight).ticks(5).tickFormat(d => `${d}m`))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    // Labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -35)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.7rem')
      .text('Rollback Count');

    g.append('text')
      .attr('transform', 'rotate(90)')
      .attr('x', innerHeight / 2)
      .attr('y', -innerWidth - 45)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.7rem')
      .text('MTTR (minutes)');

  }, [monthlyData]);

  const getCauseStyle = (cause: string) => {
    switch (cause) {
      case 'Performance': return { char: 'P' };
      case 'Bug': return { char: 'B' };
      case 'Data Issue': return { char: 'D' };
      case 'Config': return { char: 'C' };
      case 'External': return { char: 'E' };
      default: return { char: '?' };
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Rollback Frequency Trend
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Production stability indicator • Last 6 months
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL ROLLBACKS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{totalRollbacks}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG MTTR</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{avgMTTR.toFixed(0)}m</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>6M TREND</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{trend >= 0 ? '+' : ''}{trend}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>THIS MONTH</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{monthlyData[monthlyData.length - 1].count}</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Cause Breakdown */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
        {Object.entries(byCause).map(([cause, count]) => (
          <div key={cause} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
            <div style={{ 
              width: '1.5rem', height: '1.5rem', 
              backgroundColor: chartColors.surface, 
              border: `1px solid ${chartColors.text.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: '0.7rem'
            }}>
              {getCauseStyle(cause).char}
            </div>
            <span>{cause}: {count}</span>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>RECENT ROLLBACKS</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Date</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Model</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Reason</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Cause</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((event, idx) => (
            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace' }}>{event.date}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{event.model}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{event.reason}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'center' }}>
                <span style={{ padding: '0.2rem 0.5rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.border}` }}>
                  {event.causedBy}
                </span>
              </td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, textAlign: 'right', fontWeight: 500 }}>{event.impactMinutes}m</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RollbackFrequencyTrend;
