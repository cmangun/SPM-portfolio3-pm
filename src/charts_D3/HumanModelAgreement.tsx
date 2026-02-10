import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface AgreementData {
  date: string;
  modelDecisions: number;
  humanAgreed: number;
  humanOverride: number;
  agreementRate: number;
}

interface HumanModelAgreementProps {
  data?: AgreementData[];
  modelName?: string;
  targetAgreement?: number;
}

const defaultData: AgreementData[] = [
  { date: '2024-06', modelDecisions: 4200, humanAgreed: 3780, humanOverride: 420, agreementRate: 90.0 },
  { date: '2024-07', modelDecisions: 4500, humanAgreed: 4095, humanOverride: 405, agreementRate: 91.0 },
  { date: '2024-08', modelDecisions: 4800, humanAgreed: 4272, humanOverride: 528, agreementRate: 89.0 },
  { date: '2024-09', modelDecisions: 5100, humanAgreed: 4692, humanOverride: 408, agreementRate: 92.0 },
  { date: '2024-10', modelDecisions: 5400, humanAgreed: 5022, humanOverride: 378, agreementRate: 93.0 },
  { date: '2024-11', modelDecisions: 5200, humanAgreed: 4888, humanOverride: 312, agreementRate: 94.0 },
];

export const HumanModelAgreement: React.FC<HumanModelAgreementProps> = ({
  data = defaultData,
  modelName = 'Fraud Detection v3.2',
  targetAgreement = 90,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 650;
  const height = 300;
  const margin = { top: 30, right: 50, bottom: 40, left: 60 };

  const avgAgreement = data.reduce((sum, d) => sum + d.agreementRate, 0) / data.length;
  const trend = data[data.length - 1].agreementRate - data[0].agreementRate;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(data.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([80, 100])
      .range([innerHeight, 0]);

    // Target line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', y(targetAgreement))
      .attr('y2', y(targetAgreement))
      .attr('stroke', chartColors.gray[400])
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '8,4');

    g.append('text')
      .attr('x', innerWidth + 5)
      .attr('y', y(targetAgreement) + 4)
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.7rem')
      .text(`Target: ${targetAgreement}%`);

    // Line
    const line = d3.line<AgreementData>()
      .x(d => x(d.date) || 0)
      .y(d => y(d.agreementRate))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 2.5)
      .attr('d', line);

    // Points
    g.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.date) || 0)
      .attr('cy', d => y(d.agreementRate))
      .attr('r', 5)
      .attr('fill', d => d.agreementRate >= targetAgreement ? chartColors.text.primary : chartColors.background)
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 2);

    // Values
    g.selectAll('.value')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => x(d.date) || 0)
      .attr('y', d => y(d.agreementRate) - 12)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.primary)
      .attr('font-size', '0.75rem')
      .attr('font-weight', 600)
      .text(d => `${d.agreementRate}%`);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .selectAll('text')
      .attr('font-size', '0.75rem');

  }, [data, targetAgreement]);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Human-Model Agreement Rate
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Calibration over time • {modelName}
      </p>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG AGREEMENT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{avgAgreement.toFixed(1)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>CURRENT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data[data.length - 1].agreementRate}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TREND (6M)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{trend >= 0 ? '+' : ''}{trend.toFixed(1)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TARGET</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{targetAgreement}%</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Detail Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Period</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Model Decisions</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Human Agreed</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Human Override</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Agreement %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={d.date} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{d.date}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{d.modelDecisions.toLocaleString()}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{d.humanAgreed.toLocaleString()}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{d.humanOverride.toLocaleString()}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{d.agreementRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HumanModelAgreement;
