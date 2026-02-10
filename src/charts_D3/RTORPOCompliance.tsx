import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface SystemRTORPO {
  system: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  rtoTarget: number; // minutes
  rtoActual: number;
  rpoTarget: number; // minutes
  rpoActual: number;
  lastTested: string;
  testResult: 'Pass' | 'Fail' | 'Partial';
}

interface RTORPOComplianceProps {
  data?: SystemRTORPO[];
}

const defaultData: SystemRTORPO[] = [
  { system: 'Fraud Detection API', tier: 'Tier 1', rtoTarget: 15, rtoActual: 8, rpoTarget: 5, rpoActual: 2, lastTested: '2024-11-15', testResult: 'Pass' },
  { system: 'Model Inference Service', tier: 'Tier 1', rtoTarget: 15, rtoActual: 12, rpoTarget: 5, rpoActual: 3, lastTested: '2024-11-20', testResult: 'Pass' },
  { system: 'Feature Store', tier: 'Tier 1', rtoTarget: 30, rtoActual: 45, rpoTarget: 15, rpoActual: 18, lastTested: '2024-10-30', testResult: 'Fail' },
  { system: 'Training Pipeline', tier: 'Tier 2', rtoTarget: 240, rtoActual: 180, rpoTarget: 60, rpoActual: 45, lastTested: '2024-11-10', testResult: 'Pass' },
  { system: 'ML Monitoring', tier: 'Tier 2', rtoTarget: 120, rtoActual: 95, rpoTarget: 30, rpoActual: 28, lastTested: '2024-11-18', testResult: 'Pass' },
  { system: 'Data Lake ETL', tier: 'Tier 2', rtoTarget: 480, rtoActual: 520, rpoTarget: 120, rpoActual: 90, lastTested: '2024-10-25', testResult: 'Partial' },
  { system: 'Model Registry', tier: 'Tier 3', rtoTarget: 1440, rtoActual: 720, rpoTarget: 480, rpoActual: 240, lastTested: '2024-09-15', testResult: 'Pass' },
  { system: 'Experiment Tracker', tier: 'Tier 3', rtoTarget: 1440, rtoActual: 600, rpoTarget: 480, rpoActual: 360, lastTested: '2024-08-20', testResult: 'Pass' },
];

export const RTORPOCompliance: React.FC<RTORPOComplianceProps> = ({
  data = defaultData,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 700;
  const height = 350;
  const margin = { top: 40, right: 100, bottom: 60, left: 140 };

  const passCount = data.filter(d => d.testResult === 'Pass').length;
  const failCount = data.filter(d => d.testResult === 'Fail').length;
  const partialCount = data.filter(d => d.testResult === 'Partial').length;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
      .domain(data.map(d => d.system))
      .range([0, innerHeight])
      .padding(0.3);

    const maxTime = Math.max(...data.map(d => Math.max(d.rtoTarget, d.rtoActual)));
    const x = d3.scaleLinear()
      .domain([0, maxTime * 1.1])
      .range([0, innerWidth]);

    // System rows
    data.forEach(d => {
      const yPos = y(d.system) || 0;
      const barHeight = y.bandwidth();

      // RTO Target line
      g.append('line')
        .attr('x1', x(d.rtoTarget))
        .attr('x2', x(d.rtoTarget))
        .attr('y1', yPos)
        .attr('y2', yPos + barHeight)
        .attr('stroke', chartColors.text.primary)
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,3');

      // RTO Actual bar
      const rtoCompliant = d.rtoActual <= d.rtoTarget;
      g.append('rect')
        .attr('x', 0)
        .attr('y', yPos + 2)
        .attr('width', x(d.rtoActual))
        .attr('height', barHeight / 2 - 4)
        .attr('fill', rtoCompliant ? chartColors.gray[300] : chartColors.text.primary);

      // RPO Actual bar
      const rpoCompliant = d.rpoActual <= d.rpoTarget;
      g.append('rect')
        .attr('x', 0)
        .attr('y', yPos + barHeight / 2 + 2)
        .attr('width', x(d.rpoActual))
        .attr('height', barHeight / 2 - 4)
        .attr('fill', rpoCompliant ? chartColors.gray[200] : chartColors.gray[500]);

      // Labels
      g.append('text')
        .attr('x', x(d.rtoActual) + 5)
        .attr('y', yPos + barHeight / 4 + 4)
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.65rem')
        .text(`RTO: ${d.rtoActual}m`);

      g.append('text')
        .attr('x', x(d.rpoActual) + 5)
        .attr('y', yPos + barHeight * 3 / 4 + 4)
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.65rem')
        .text(`RPO: ${d.rpoActual}m`);
    });

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d => `${d}m`))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.8rem')
      .text('Recovery Time (minutes)');

  }, [data]);

  const getStatusIndicator = (result: string) => {
    switch(result) {
      case 'Pass': return '●';
      case 'Fail': return '○';
      case 'Partial': return '◐';
      default: return '?';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        RTO/RPO Compliance Dashboard
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Recovery time vs recovery point objectives by system tier
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL SYSTEMS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● COMPLIANT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{passCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>◐ PARTIAL</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{partialCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: failCount > 0 ? chartColors.text.primary : chartColors.surface, color: failCount > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>○ NON-COMPLIANT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{failCount}</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Detail Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>System</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Tier</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>RTO Target</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>RTO Actual</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>RPO Target</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>RPO Actual</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Last Test</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={d.system} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{d.system}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{d.tier}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{formatTime(d.rtoTarget)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: d.rtoActual > d.rtoTarget ? 600 : 400 }}>{formatTime(d.rtoActual)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{formatTime(d.rpoTarget)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: d.rpoActual > d.rpoTarget ? 600 : 400 }}>{formatTime(d.rpoActual)}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{d.lastTested}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{getStatusIndicator(d.testResult)} {d.testResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RTORPOCompliance;
