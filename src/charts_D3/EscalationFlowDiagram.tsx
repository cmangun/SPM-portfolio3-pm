"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

interface EscalationFlowDiagramProps {
  data?: {
    title: string;
    subtitle: string;
    thresholds: {
      level: string;
      minConfidence: number;
      maxConfidence: number;
      action: string;
      sla: string;
      volume: number;
    }[];
  };
  width?: number;
  height?: number;
}

const defaultData = {
  title: 'AI Validation Escalation Framework',
  subtitle: 'Confidence-based routing for MLR content review',
  thresholds: [
    {
      level: 'Auto-Approve',
      minConfidence: 95,
      maxConfidence: 100,
      action: 'Direct approval with audit log',
      sla: 'Instant',
      volume: 42
    },
    {
      level: 'Fast-Track Review',
      minConfidence: 80,
      maxConfidence: 95,
      action: 'Expedited human review queue',
      sla: '< 2 hours',
      volume: 31
    },
    {
      level: 'Standard Review',
      minConfidence: 60,
      maxConfidence: 80,
      action: 'Normal MLR review queue',
      sla: '< 24 hours',
      volume: 19
    },
    {
      level: 'Senior Review',
      minConfidence: 0,
      maxConfidence: 60,
      action: 'Senior reviewer + AI explanation',
      sla: '< 48 hours',
      volume: 8
    },
  ]
};

const EscalationFlowDiagram: React.FC<EscalationFlowDiagramProps> = ({
  data = defaultData,
  width = 800,
  height = 450
}) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const margin = { top: 70, right: 30, bottom: 60, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const nodeHeight = 70;
  const nodeWidth = 170;
  const verticalGap = 15;

  // Calculate positions - vertical flow
  const startX = margin.left + innerWidth / 2 - nodeWidth / 2;
  const positions = data.thresholds.map((_, i) => ({
    x: startX,
    y: margin.top + i * (nodeHeight + verticalGap)
  }));

  const getNodeColor = (index: number, isHovered: boolean) => {
    const colors = ['#2a9d8f', '#48a999', '#6ab3a3', '#999'];
    return isHovered ? chartColors.charcoal : colors[index] || '#999';
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
          x={width / 2}
          y={25}
          textAnchor="middle"
          fontSize={18}
          fontWeight={700}
          fill={chartColors.charcoal}
        >
          {data.title}
        </text>
        <text
          x={width / 2}
          y={48}
          textAnchor="middle"
          fontSize={12}
          fill={chartColors.gray}
        >
          {data.subtitle}
        </text>

        {/* Input node */}
        <g transform={`translate(${margin.left + 30}, ${margin.top + 30})`}>
          <circle
            cx={0}
            cy={0}
            r={25}
            fill={chartColors.charcoal}
          />
          <text
            x={0}
            y={5}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="#fff"
          >
            Content
          </text>
          {/* Arrow to first node */}
          <line
            x1={25}
            x2={startX - margin.left - 30 - 10}
            y1={0}
            y2={nodeHeight / 2 - 30}
            stroke={chartColors.gray}
            strokeWidth={2}
            strokeDasharray="4,4"
          />
        </g>

        {/* Confidence scale on left */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text
            x={-10}
            y={-10}
            fontSize={10}
            fontWeight={600}
            fill={chartColors.charcoal}
          >
            AI Confidence
          </text>
          {[100, 95, 80, 60, 0].map((val, i) => (
            <g key={val} transform={`translate(0, ${i * (nodeHeight + verticalGap) / 1.25})`}>
              <text
                x={60}
                y={0}
                textAnchor="end"
                fontSize={10}
                fill={chartColors.gray}
              >
                {val}%
              </text>
              <line
                x1={65}
                x2={75}
                y1={-3}
                y2={-3}
                stroke={chartColors.gray}
                strokeWidth={1}
              />
            </g>
          ))}
          {/* Vertical line */}
          <line
            x1={75}
            x2={75}
            y1={-3}
            y2={innerHeight - 30}
            stroke={chartColors.gray}
            strokeWidth={1}
          />
        </g>

        {/* Flow arrows between nodes */}
        {positions.slice(0, -1).map((pos, i) => (
          <g key={`arrow-${i}`}>
            <line
              x1={pos.x + nodeWidth / 2}
              x2={positions[i + 1].x + nodeWidth / 2}
              y1={pos.y + nodeHeight}
              y2={positions[i + 1].y}
              stroke={chartColors.gray}
              strokeWidth={2}
              markerEnd="url(#arrowhead)"
            />
          </g>
        ))}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={chartColors.gray} />
          </marker>
        </defs>

        {/* Escalation nodes */}
        {data.thresholds.map((threshold, index) => {
          const pos = positions[index];
          const isHovered = hoveredLevel === index;

          return (
            <g
              key={index}
              transform={`translate(${pos.x}, ${pos.y})`}
              onMouseEnter={() => setHoveredLevel(index)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Node box */}
              <rect
                x={0}
                y={0}
                width={nodeWidth}
                height={nodeHeight}
                fill={getNodeColor(index, isHovered)}
                rx={8}
              />

              {/* Confidence range badge */}
              <rect
                x={5}
                y={5}
                width={60}
                height={18}
                fill="rgba(255,255,255,0.2)"
                rx={3}
              />
              <text
                x={35}
                y={17}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill="#fff"
              >
                {threshold.minConfidence}-{threshold.maxConfidence}%
              </text>

              {/* Level name */}
              <text
                x={nodeWidth / 2}
                y={38}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="#fff"
              >
                {threshold.level}
              </text>

              {/* SLA */}
              <text
                x={nodeWidth / 2}
                y={55}
                textAnchor="middle"
                fontSize={10}
                fill="rgba(255,255,255,0.8)"
              >
                SLA: {threshold.sla}
              </text>

              {/* Volume indicator */}
              <text
                x={nodeWidth - 10}
                y={17}
                textAnchor="end"
                fontSize={11}
                fontWeight={700}
                fill="#fff"
              >
                {threshold.volume}%
              </text>

              {/* Action detail on right */}
              <g transform={`translate(${nodeWidth + 15}, 0)`}>
                <line
                  x1={0}
                  x2={20}
                  y1={nodeHeight / 2}
                  y2={nodeHeight / 2}
                  stroke={chartColors.gray}
                  strokeWidth={1}
                />
                <text
                  x={25}
                  y={nodeHeight / 2 - 5}
                  fontSize={10}
                  fontWeight={500}
                  fill={chartColors.charcoal}
                >
                  {threshold.action}
                </text>
                <text
                  x={25}
                  y={nodeHeight / 2 + 10}
                  fontSize={9}
                  fill={chartColors.gray}
                >
                  {threshold.volume}% of submissions
                </text>
              </g>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${margin.left}, ${height - 35})`}>
          <text fontSize={10} fill={chartColors.gray}>
            Flow direction: Higher confidence → Lower human involvement • All decisions logged for audit trail
          </text>
        </g>
      </svg>

      {/* Escalation triggers */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <strong style={{ color: chartColors.charcoal }}>Escalation Triggers:</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
          {[
            { trigger: 'Novel claim not in library', escalateTo: 'Senior Review' },
            { trigger: 'Conflicting regional rules', escalateTo: 'Senior Review' },
            { trigger: 'Fair balance edge case', escalateTo: 'Standard Review' },
            { trigger: 'Template format mismatch', escalateTo: 'Fast-Track Review' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: chartColors.gray }}>•</span>
              <span style={{ color: chartColors.charcoal }}>{item.trigger}</span>
              <span style={{ color: chartColors.gray }}>→</span>
              <span style={{ fontWeight: 600, color: chartColors.teal }}>{item.escalateTo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscalationFlowDiagram;
