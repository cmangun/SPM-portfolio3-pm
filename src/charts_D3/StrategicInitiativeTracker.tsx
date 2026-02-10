import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface Milestone {
  name: string;
  targetDate: string;
  actualDate?: string;
  status: 'Complete' | 'On Track' | 'At Risk' | 'Delayed' | 'Upcoming';
}

interface Initiative {
  id: string;
  name: string;
  owner: string;
  sponsor: string;
  priority: 'P0' | 'P1' | 'P2';
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Complete';
  milestones: Milestone[];
  dependencies: string[];
  budget: number;
  spent: number;
}

interface StrategicInitiativeTrackerProps {
  data?: Initiative[];
  quarterLabel?: string;
}

const defaultData: Initiative[] = [
  {
    id: 'SI-001', name: 'Enterprise ML Platform', owner: 'J. Chen', sponsor: 'CTO',
    priority: 'P0', startDate: '2024-01', targetDate: '2024-12', progress: 85, status: 'On Track',
    milestones: [
      { name: 'Architecture Approved', targetDate: '2024-02', actualDate: '2024-02', status: 'Complete' },
      { name: 'MVP Launch', targetDate: '2024-06', actualDate: '2024-07', status: 'Complete' },
      { name: 'GA Release', targetDate: '2024-10', status: 'On Track' },
      { name: 'Migration Complete', targetDate: '2024-12', status: 'Upcoming' },
    ],
    dependencies: [], budget: 2500000, spent: 2100000
  },
  {
    id: 'SI-002', name: 'AI Governance Framework', owner: 'M. Rodriguez', sponsor: 'Chief Risk Officer',
    priority: 'P0', startDate: '2024-03', targetDate: '2024-09', progress: 100, status: 'Complete',
    milestones: [
      { name: 'Policy Draft', targetDate: '2024-04', actualDate: '2024-04', status: 'Complete' },
      { name: 'Board Approval', targetDate: '2024-06', actualDate: '2024-06', status: 'Complete' },
      { name: 'Training Rollout', targetDate: '2024-08', actualDate: '2024-09', status: 'Complete' },
    ],
    dependencies: [], budget: 400000, spent: 380000
  },
  {
    id: 'SI-003', name: 'Fraud Detection v3', owner: 'S. Patel', sponsor: 'Head of Risk',
    priority: 'P1', startDate: '2024-04', targetDate: '2025-02', progress: 60, status: 'At Risk',
    milestones: [
      { name: 'Data Pipeline Ready', targetDate: '2024-06', actualDate: '2024-07', status: 'Complete' },
      { name: 'Model Training', targetDate: '2024-09', actualDate: '2024-10', status: 'Complete' },
      { name: 'A/B Testing', targetDate: '2024-11', status: 'At Risk' },
      { name: 'Production Launch', targetDate: '2025-02', status: 'At Risk' },
    ],
    dependencies: ['SI-001'], budget: 1800000, spent: 1200000
  },
  {
    id: 'SI-004', name: 'Customer Personalization Engine', owner: 'A. Kim', sponsor: 'CMO',
    priority: 'P1', startDate: '2024-06', targetDate: '2025-03', progress: 35, status: 'Behind',
    milestones: [
      { name: 'Requirements Locked', targetDate: '2024-07', actualDate: '2024-08', status: 'Complete' },
      { name: 'Feature Store Integration', targetDate: '2024-10', status: 'Delayed' },
      { name: 'Model Development', targetDate: '2024-12', status: 'At Risk' },
      { name: 'Launch', targetDate: '2025-03', status: 'At Risk' },
    ],
    dependencies: ['SI-001', 'SI-003'], budget: 1200000, spent: 600000
  },
  {
    id: 'SI-005', name: 'MLOps Automation', owner: 'R. Johnson', sponsor: 'VP Engineering',
    priority: 'P2', startDate: '2024-05', targetDate: '2025-01', progress: 70, status: 'On Track',
    milestones: [
      { name: 'CI/CD Pipeline', targetDate: '2024-07', actualDate: '2024-07', status: 'Complete' },
      { name: 'Model Registry', targetDate: '2024-09', actualDate: '2024-09', status: 'Complete' },
      { name: 'Monitoring Dashboard', targetDate: '2024-11', status: 'On Track' },
      { name: 'Full Automation', targetDate: '2025-01', status: 'Upcoming' },
    ],
    dependencies: ['SI-001'], budget: 600000, spent: 420000
  },
];

export const StrategicInitiativeTracker: React.FC<StrategicInitiativeTrackerProps> = ({
  data = defaultData,
  quarterLabel = 'Q4 2024',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 750;
  const height = 280;
  const margin = { top: 30, right: 40, bottom: 30, left: 200 };

  const onTrack = data.filter(d => d.status === 'On Track').length;
  const atRisk = data.filter(d => d.status === 'At Risk').length;
  const behind = data.filter(d => d.status === 'Behind').length;
  const complete = data.filter(d => d.status === 'Complete').length;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
      .domain(data.map(d => d.id))
      .range([0, innerHeight])
      .padding(0.3);

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, innerWidth]);

    // Progress bars
    data.forEach(d => {
      const yPos = y(d.id) || 0;
      const barHeight = y.bandwidth();

      // Background
      g.append('rect')
        .attr('x', 0)
        .attr('y', yPos)
        .attr('width', innerWidth)
        .attr('height', barHeight)
        .attr('fill', chartColors.surface)
        .attr('stroke', chartColors.border);

      // Progress fill
      g.append('rect')
        .attr('x', 0)
        .attr('y', yPos)
        .attr('width', x(d.progress))
        .attr('height', barHeight)
        .attr('fill', d.status === 'Complete' ? chartColors.gray[400] : 
                      d.status === 'On Track' ? chartColors.gray[300] :
                      d.status === 'At Risk' ? chartColors.gray[500] : chartColors.text.primary);

      // Milestones
      d.milestones.forEach((m, idx) => {
        const milestoneX = x((idx + 1) / d.milestones.length * 100);
        g.append('line')
          .attr('x1', milestoneX)
          .attr('x2', milestoneX)
          .attr('y1', yPos)
          .attr('y2', yPos + barHeight)
          .attr('stroke', m.status === 'Complete' ? chartColors.gray[600] : chartColors.border)
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', m.status === 'Complete' ? 'none' : '3,2');
      });

      // Progress label
      g.append('text')
        .attr('x', x(d.progress) + 8)
        .attr('y', yPos + barHeight / 2 + 4)
        .attr('fill', chartColors.text.primary)
        .attr('font-size', '0.75rem')
        .attr('font-weight', 600)
        .text(`${d.progress}%`);
    });

    // Y Axis (initiative names)
    g.append('g')
      .call(d3.axisLeft(y).tickFormat(id => {
        const init = data.find(d => d.id === id);
        return init ? `${init.priority} ${init.name.slice(0, 25)}` : '';
      }))
      .selectAll('text')
      .attr('font-size', '0.7rem');

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d}%`))
      .selectAll('text')
      .attr('font-size', '0.75rem');

  }, [data]);

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case 'Complete': return '●';
      case 'On Track': return '●';
      case 'At Risk': return '◐';
      case 'Behind': return '○';
      case 'Delayed': return '○';
      case 'Upcoming': return '◯';
      default: return '?';
    }
  };

  const formatCurrency = (val: number) => val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${(val / 1000).toFixed(0)}K`;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Strategic Initiative Tracker
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        Multi-quarter AI/ML initiatives • {quarterLabel}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL INITIATIVES</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● COMPLETE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{complete}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● ON TRACK</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{onTrack}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.text.primary}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>◐ AT RISK</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{atRisk}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: behind > 0 ? chartColors.text.primary : chartColors.surface, color: behind > 0 ? chartColors.background : chartColors.text.primary }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>○ BEHIND</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{behind}</div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} />

      {/* Detail Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Initiative</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Priority</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Owner</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Target</th>
            <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `2px solid ${chartColors.text.primary}` }}>Budget</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Progress</th>
            <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `2px solid ${chartColors.text.primary}` }}>Status</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Next Milestone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => {
            const nextMilestone = d.milestones.find(m => m.status !== 'Complete');
            return (
              <tr key={d.id} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 500 }}>{d.name}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{d.priority}</td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{d.owner}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{d.targetDate}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: `1px solid ${chartColors.border}` }}>{formatCurrency(d.budget)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}`, fontWeight: 600 }}>{d.progress}%</td>
                <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: `1px solid ${chartColors.border}` }}>{getStatusIndicator(d.status)} {d.status}</td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontSize: '0.7rem' }}>
                  {nextMilestone ? `${nextMilestone.name} (${nextMilestone.targetDate})` : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StrategicInitiativeTracker;
