import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface LatencyPercentile {
  percentile: string;
  value: number;
  target: number;
}

interface ReviewLatencyPercentilesProps {
  data?: LatencyPercentile[];
  distribution?: { bucket: string; count: number }[];
  modelName?: string;
  period?: string;
}

const defaultData: LatencyPercentile[] = [
  { percentile: 'p50', value: 12, target: 15 },
  { percentile: 'p75', value: 28, target: 30 },
  { percentile: 'p90', value: 65, target: 60 },
  { percentile: 'p95', value: 120, target: 120 },
  { percentile: 'p99', value: 240, target: 180 },
];

const defaultDistribution = [
  { bucket: '0-5m', count: 450 },
  { bucket: '5-15m', count: 820 },
  { bucket: '15-30m', count: 540 },
  { bucket: '30-60m', count: 280 },
  { bucket: '1-2h', count: 150 },
  { bucket: '2-4h', count: 80 },
  { bucket: '4-8h', count: 45 },
  { bucket: '8h+', count: 35 },
];

export const ReviewLatencyPercentiles: React.FC<ReviewLatencyPercentilesProps> = ({
  data = defaultData,
  distribution = defaultDistribution,
  modelName = 'HITL Review Queue',
  period = 'Last 30 days',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 650;
  const height = 280;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  const totalReviews = distribution.reduce((sum, d) => sum + d.count, 0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(distribution.map(d => d.bucket))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(distribution, d => d.count) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Bars
    g.selectAll('.bar')
      .data(distribution)
      .enter()
      .append('rect')
      .attr('x', d => x(d.bucket) || 0)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.count))
      .attr('fill', (d, i) => i < 3 ? chartColors.text.primary : i < 5 ? chartColors.gray[400] : chartColors.gray[300])
      .attr('stroke', chartColors.text.primary)
      .attr('stroke-width', 1);

    // Count labels
    g.selectAll('.count')
      .data(distribution)
      .enter()
      .append('text')
      .attr('x', d => (x(d.bucket) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.primary)
      .attr('font-size', '0.7rem')
      .attr('font-weight', 500)
      .text(d => d.count);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '0.7rem');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', chartColors.text.secondary)
      .attr('font-size', '0.75rem')
      .text('Time to Human Decision');

  }, [distribution]);

  const formatTime = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    return `${(mins / 60).toFixed(1)}h`;
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Review Latency Percentiles
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Time-to-human-decision • {modelName} • {period}
      </p>

      {/* Percentile Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {data.map(d => {
          const isOver = d.value > d.target;
          return (
            <div 
              key={d.percentile}
              style={{ 
                padding: '0.75rem', 
                border: `2px solid ${isOver ? chartColors.text.primary : chartColors.border}`,
                backgroundColor: chartColors.surface,
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, fontWeight: 600 }}>
                {d.percentile.toUpperCase()}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: chartColors.text.primary }}>
                {formatTime(d.value)}
              </div>
              <div style={{ fontSize: '0.7rem', color: chartColors.text.secondary }}>
                Target: {formatTime(d.target)}
              </div>
              {isOver && (
                <div style={{ fontSize: '0.65rem', fontWeight: 600, marginTop: '0.25rem' }}>
                  ▲ {((d.value / d.target - 1) * 100).toFixed(0)}% over
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Distribution Chart */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary, marginBottom: '0.5rem', fontWeight: 600 }}>
          LATENCY DISTRIBUTION ({totalReviews.toLocaleString()} reviews)
        </div>
        <svg ref={svgRef} width={width} height={height} />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.text.primary }} />
          <span>Within SLA (≤30m)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.gray[400] }} />
          <span>At Risk (30m-2h)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: chartColors.gray[300] }} />
          <span>Breach (&gt;2h)</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewLatencyPercentiles;
