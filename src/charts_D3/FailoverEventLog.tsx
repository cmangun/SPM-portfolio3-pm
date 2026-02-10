import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface FailoverEvent {
  id: string;
  timestamp: string;
  system: string;
  fromRegion: string;
  toRegion: string;
  trigger: 'Automatic' | 'Manual' | 'Scheduled';
  reason: string;
  duration: number; // seconds
  dataLoss: number; // records
  status: 'Success' | 'Failed' | 'Partial';
  rootCause: string;
}

interface FailoverEventLogProps {
  data?: FailoverEvent[];
}

const defaultData: FailoverEvent[] = [
  { id: 'FO-001', timestamp: '2024-12-10 03:45:22', system: 'Fraud Detection API', fromRegion: 'us-east-1', toRegion: 'us-west-2', trigger: 'Automatic', reason: 'Health check failures', duration: 47, dataLoss: 0, status: 'Success', rootCause: 'Network partition in us-east-1' },
  { id: 'FO-002', timestamp: '2024-12-08 14:22:10', system: 'Model Inference Service', fromRegion: 'us-west-2', toRegion: 'us-east-1', trigger: 'Manual', reason: 'Scheduled maintenance', duration: 180, dataLoss: 0, status: 'Success', rootCause: 'Planned DR test' },
  { id: 'FO-003', timestamp: '2024-12-05 09:15:33', system: 'Feature Store', fromRegion: 'eu-west-1', toRegion: 'eu-central-1', trigger: 'Automatic', reason: 'Latency degradation', duration: 95, dataLoss: 12, status: 'Partial', rootCause: 'Database replication lag' },
  { id: 'FO-004', timestamp: '2024-11-28 18:30:00', system: 'ML Monitoring', fromRegion: 'us-east-1', toRegion: 'us-west-2', trigger: 'Scheduled', reason: 'DR test', duration: 120, dataLoss: 0, status: 'Success', rootCause: 'Quarterly DR exercise' },
  { id: 'FO-005', timestamp: '2024-11-22 02:10:45', system: 'Data Lake ETL', fromRegion: 'us-west-2', toRegion: 'us-east-1', trigger: 'Automatic', reason: 'Zone failure', duration: 420, dataLoss: 847, status: 'Failed', rootCause: 'Multi-zone outage, backup also impacted' },
  { id: 'FO-006', timestamp: '2024-11-15 11:05:00', system: 'Training Pipeline', fromRegion: 'us-east-1', toRegion: 'us-west-2', trigger: 'Manual', reason: 'Cost optimization', duration: 600, dataLoss: 0, status: 'Success', rootCause: 'Spot instance availability' },
  { id: 'FO-007', timestamp: '2024-11-10 16:45:22', system: 'Model Registry', fromRegion: 'eu-west-1', toRegion: 'us-east-1', trigger: 'Automatic', reason: 'Provider outage', duration: 85, dataLoss: 0, status: 'Success', rootCause: 'AWS EU region degradation' },
];

export const FailoverEventLog: React.FC<FailoverEventLogProps> = ({
  data = defaultData,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 700;
  const height = 200;
  const margin = { top: 30, right: 30, bottom: 40, left: 50 };

  const successCount = data.filter(d => d.status === 'Success').length;
  const failCount = data.filter(d => d.status === 'Failed').length;
  const partialCount = data.filter(d => d.status === 'Partial').length;
  const avgDuration = data.reduce((sum, d) => sum + d.duration, 0) / data.length;
  const totalDataLoss = data.reduce((sum, d) => sum + d.dataLoss, 0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S');
    const dates = data.map(d => parseDate(d.timestamp)!).filter(Boolean);
    
    const x = d3.scaleTime()
      .domain(d3.extent(dates) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.duration)) * 1.2])
      .range([innerHeight, 0]);

    // Events
    data.forEach(d => {
      const date = parseDate(d.timestamp);
      if (!date) return;

      const xPos = x(date);
      const yPos = y(d.duration);

      // Vertical line
      g.append('line')
        .attr('x1', xPos)
        .attr('x2', xPos)
        .attr('y1', innerHeight)
        .attr('y2', yPos)
        .attr('stroke', d.status === 'Failed' ? chartColors.text.primary : chartColors.gray[400])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', d.trigger === 'Scheduled' ? '4,2' : 'none');

      // Event marker
      g.append('circle')
        .attr('cx', xPos)
        .attr('cy', yPos)
        .attr('r', d.status === 'Failed' ? 8 : 6)
        .attr('fill', d.status === 'Success' ? chartColors.gray[300] : d.status === 'Partial' ? chartColors.gray[500] : chartColors.text.primary)
        .attr('stroke', chartColors.text.primary)
        .attr('stroke-width', d.status === 'Failed' ? 3 : 2);

      // Duration label
      g.append('text')
        .attr('x', xPos)
        .attr('y', yPos - 12)
        .attr('text-anchor', 'middle')
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.65rem')
        .attr('font-weight', 500)
        .text(`${d.duration}s`);
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%m/%d') as any))
      .selectAll('text')
      .attr('font-size', '0.75rem');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}s`))
      .selectAll('text')
      .attr('font-size', '0.75rem');

  }, [data]);

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case 'Success': return '●';
      case 'Failed': return '○';
      case 'Partial': return '◐';
      default: return '?';
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch(trigger) {
      case 'Automatic': return '↯';
      case 'Manual': return '○';
      case 'Scheduled': return '▣';
      default: return '?';
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Failover Event Log
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Regional failover history • Last 30 days
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL EVENTS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● SUCCESS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{successCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: failCount > 0 ? chartColors.text.primary : chartColors.surface, color: failCount > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>○ FAILED</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{failCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG DURATION</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{Math.round(avgDuration)}s</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${totalDataLoss > 0 ? chartColors.text.primary : chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>DATA LOSS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{totalDataLoss.toLocaleString()}</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Event Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>ID</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Timestamp</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>System</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>From → To</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Trigger</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Duration</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Data Loss</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={d.id} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace' }}>{d.id}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{d.timestamp}</td>
              <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{d.system}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontSize: '0.7rem' }}>{d.fromRegion} → {d.toRegion}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{getTriggerIcon(d.trigger)} {d.trigger}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{d.duration}s</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}`, fontWeight: d.dataLoss > 0 ? 600 : 400 }}>{d.dataLoss > 0 ? d.dataLoss.toLocaleString() : '—'}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{getStatusIndicator(d.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.75rem', color: chartColors.text.secondary }}>
        <span>↯ Automatic</span>
        <span>○ Manual</span>
        <span>▣ Scheduled</span>
        <span style={{ marginLeft: 'auto' }}>● Success • ◐ Partial • ○ Failed</span>
      </div>
    </div>
  );
};

export default FailoverEventLog;
