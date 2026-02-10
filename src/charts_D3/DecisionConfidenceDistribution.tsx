import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface ConfidenceBucket {
  range: string;
  min: number;
  max: number;
  count: number;
  humanDeferred: number;
  autoDecided: number;
}

interface DecisionConfidenceDistributionProps {
  data?: ConfidenceBucket[];
  modelName?: string;
  confidenceThreshold?: number;
}

const defaultData: ConfidenceBucket[] = [
  { range: '0-10%', min: 0, max: 10, count: 120, humanDeferred: 120, autoDecided: 0 },
  { range: '10-20%', min: 10, max: 20, count: 85, humanDeferred: 85, autoDecided: 0 },
  { range: '20-30%', min: 20, max: 30, count: 145, humanDeferred: 145, autoDecided: 0 },
  { range: '30-40%', min: 30, max: 40, count: 210, humanDeferred: 210, autoDecided: 0 },
  { range: '40-50%', min: 40, max: 50, count: 380, humanDeferred: 380, autoDecided: 0 },
  { range: '50-60%', min: 50, max: 60, count: 520, humanDeferred: 520, autoDecided: 0 },
  { range: '60-70%', min: 60, max: 70, count: 890, humanDeferred: 890, autoDecided: 0 },
  { range: '70-80%', min: 70, max: 80, count: 1450, humanDeferred: 0, autoDecided: 1450 },
  { range: '80-90%', min: 80, max: 90, count: 2100, humanDeferred: 0, autoDecided: 2100 },
  { range: '90-100%', min: 90, max: 100, count: 3200, humanDeferred: 0, autoDecided: 3200 },
];

export const DecisionConfidenceDistribution: React.FC<DecisionConfidenceDistributionProps> = ({
  data = defaultData,
  modelName = 'Credit Risk Model v2.1',
  confidenceThreshold = 70,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 700;
  const height = 350;
  const margin = { top: 40, right: 30, bottom: 50, left: 60 };

  const totalDecisions = data.reduce((sum, d) => sum + d.count, 0);
  const humanDeferred = data.reduce((sum, d) => sum + d.humanDeferred, 0);
  const autoDecided = data.reduce((sum, d) => sum + d.autoDecided, 0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.range))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Threshold line
    const thresholdIdx = data.findIndex(d => d.min >= confidenceThreshold);
    if (thresholdIdx > 0) {
      const thresholdX = x(data[thresholdIdx].range) || 0;
      g.append('line')
        .attr('x1', thresholdX)
        .attr('x2', thresholdX)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', chartColors.text.primary)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

      g.append('text')
        .attr('x', thresholdX + 5)
        .attr('y', 15)
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.75rem')
        .attr('font-weight', 600)
        .text(`Threshold: ${confidenceThreshold}%`);
    }

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.range) || 0)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.count))
      .attr('fill', d => d.min >= confidenceThreshold ? chartColors.text.primary : chartColors.gray[400])
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 1);

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '0.7rem');

    // Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(6))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    // Labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.75rem')
      .text('Model Confidence Score');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -45)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.75rem')
      .text('Number of Decisions');

  }, [data, confidenceThreshold]);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Decision Confidence Distribution
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        When model defers to human • {modelName}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL DECISIONS</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{totalDecisions.toLocaleString()}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>HUMAN DEFERRED</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{humanDeferred.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>{((humanDeferred/totalDecisions)*100).toFixed(1)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AUTO-DECIDED</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{autoDecided.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>{((autoDecided/totalDecisions)*100).toFixed(1)}%</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>THRESHOLD</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{confidenceThreshold}%</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.gray[400], border: `1px solid ${chartColors.text.primary}` }} />
          <span>Human Review Required (below threshold)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.text.primary }} />
          <span>Auto-Decided (above threshold)</span>
        </div>
      </div>
    </div>
  );
};

export default DecisionConfidenceDistribution;
