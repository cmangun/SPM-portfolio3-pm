'use client';
/**
 * ImplementationTimeline - Project phases with milestones
 * Shows deployment timeline with phases, milestones, and deliverables
 */
import React from 'react';

interface Milestone {
  name: string;
  week: number;
  type: 'start' | 'checkpoint' | 'delivery' | 'go-live';
}

interface Phase {
  id: string;
  name: string;
  startWeek: number;
  endWeek: number;
  color: string;
  deliverables: string[];
  team?: string;
}

interface TimelineData {
  title: string;
  totalWeeks: number;
  phases: Phase[];
  milestones: Milestone[];
}

interface ImplementationTimelineProps {
  data: TimelineData;
  width?: number;
  height?: number;
}

const ImplementationTimeline: React.FC<ImplementationTimelineProps> = ({
  data,
  width = 800,
  height = 400,
}) => {
  const padding = { top: 60, right: 40, bottom: 80, left: 140 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const weekWidth = chartWidth / data.totalWeeks;
  const rowHeight = chartHeight / data.phases.length;
  
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'start': return '◆';
      case 'checkpoint': return '●';
      case 'delivery': return '■';
      case 'go-live': return '★';
      default: return '●';
    }
  };
  
  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'start': return '#666';
      case 'checkpoint': return '#444';
      case 'delivery': return '#1a1a1a';
      case 'go-live': return '#333';
      default: return '#666';
    }
  };
  
  return (
    <div style={{ width: '100%', maxWidth: width, overflow: 'hidden' }}>
      <div style={{
        fontSize: '16px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '20px'
      }}>
        {data.title}
      </div>
      
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <svg width={width} height={height} style={{ display: 'block', minWidth: width }}>
        {/* Week grid lines and labels */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {Array.from({ length: data.totalWeeks + 1 }, (_, i) => (
            <g key={i}>
              <line
                x1={i * weekWidth}
                y1={-10}
                x2={i * weekWidth}
                y2={chartHeight + 10}
                stroke="#e5e5e5"
                strokeDasharray={i % 4 === 0 ? 'none' : '2,4'}
              />
              {i % 2 === 0 && (
                <text
                  x={i * weekWidth}
                  y={chartHeight + 30}
                  fontSize="10"
                  fill="#666"
                  textAnchor="middle"
                >
                  W{i}
                </text>
              )}
              {i % 4 === 0 && i > 0 && (
                <text
                  x={i * weekWidth}
                  y={chartHeight + 45}
                  fontSize="9"
                  fill="#999"
                  textAnchor="middle"
                >
                  Month {i / 4}
                </text>
              )}
            </g>
          ))}
        </g>
        
        {/* Phase rows */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {data.phases.map((phase, i) => {
            const y = i * rowHeight;
            const barX = phase.startWeek * weekWidth;
            const barWidth = (phase.endWeek - phase.startWeek) * weekWidth;
            
            return (
              <g key={phase.id}>
                {/* Row background */}
                <rect
                  x={-padding.left}
                  y={y}
                  width={width}
                  height={rowHeight}
                  fill={i % 2 === 0 ? '#fafafa' : '#fff'}
                />
                
                {/* Phase label */}
                <text
                  x={-12}
                  y={y + rowHeight / 2}
                  fontSize="12"
                  fontWeight="600"
                  fill="#1a1a1a"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {phase.name}
                </text>
                
                {/* Phase bar */}
                <rect
                  x={barX}
                  y={y + 8}
                  width={barWidth}
                  height={rowHeight - 16}
                  rx={4}
                  fill={phase.color}
                  opacity={0.9}
                />
                
                {/* Phase duration label */}
                <text
                  x={barX + barWidth / 2}
                  y={y + rowHeight / 2}
                  fontSize="11"
                  fontWeight="600"
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {phase.endWeek - phase.startWeek}w
                </text>
                
                {/* Deliverables tooltip area */}
                <title>
                  {phase.name}: {phase.deliverables.join(', ')}
                </title>
              </g>
            );
          })}
        </g>
        
        {/* Milestones */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {data.milestones.map((milestone, i) => {
            const x = milestone.week * weekWidth;
            
            return (
              <g key={i}>
                {/* Milestone line */}
                <line
                  x1={x}
                  y1={-20}
                  x2={x}
                  y2={chartHeight + 5}
                  stroke={getMilestoneColor(milestone.type)}
                  strokeWidth={2}
                  strokeDasharray="4,4"
                />
                
                {/* Milestone marker */}
                <text
                  x={x}
                  y={-30}
                  fontSize="14"
                  fill={getMilestoneColor(milestone.type)}
                  textAnchor="middle"
                >
                  {getMilestoneIcon(milestone.type)}
                </text>
                
                {/* Milestone label */}
                <text
                  x={x}
                  y={-42}
                  fontSize="9"
                  fontWeight="600"
                  fill={getMilestoneColor(milestone.type)}
                  textAnchor="middle"
                  transform={`rotate(-45, ${x}, -42)`}
                >
                  {milestone.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      </div>
      
      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#666' }}>◆</span>
          <span style={{ fontSize: '11px', color: '#666' }}>Start</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#444' }}>●</span>
          <span style={{ fontSize: '11px', color: '#666' }}>Checkpoint</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#1a1a1a' }}>■</span>
          <span style={{ fontSize: '11px', color: '#666' }}>Delivery</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#333' }}>★</span>
          <span style={{ fontSize: '11px', color: '#666' }}>Go-Live</span>
        </div>
      </div>
      
      {/* Deliverables Summary */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px'
        }}>
          Phase Deliverables
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {data.phases.map(phase => (
            <div key={phase.id}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: phase.color,
                marginBottom: '6px'
              }}>
                {phase.name}
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '16px',
                fontSize: '11px',
                color: '#666'
              }}>
                {phase.deliverables.map((d, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImplementationTimeline;
