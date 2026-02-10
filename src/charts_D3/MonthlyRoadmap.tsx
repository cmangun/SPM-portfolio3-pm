"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// 12-Month Roadmap data interface
interface RoadmapTask {
  task: string;
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  category: string;
  progress: number;
  isQuarter?: boolean;
}

const defaultData: RoadmapTask[] = [
  // Q1: Diagnostics
  { task: 'Q1: Diagnostics', startMonth: 1, endMonth: 3, category: 'Q1', progress: 100, isQuarter: true },
  { task: '01 Ontology', startMonth: 1, endMonth: 1, category: 'Q1', progress: 100 },
  { task: '02 Problem Space', startMonth: 2, endMonth: 2, category: 'Q1', progress: 100 },
  { task: '03 Discovery', startMonth: 3, endMonth: 3, category: 'Q1', progress: 100 },
  // Q2: Architect
  { task: 'Q2: Architect', startMonth: 4, endMonth: 6, category: 'Q2', progress: 100, isQuarter: true },
  { task: '04 Alignment & Design', startMonth: 4, endMonth: 4, category: 'Q2', progress: 100 },
  { task: '05 Integration', startMonth: 5, endMonth: 5, category: 'Q2', progress: 100 },
  { task: '06 Build', startMonth: 6, endMonth: 6, category: 'Q2', progress: 100 },
  // Q3: Engineer
  { task: 'Q3: Engineer', startMonth: 7, endMonth: 9, category: 'Q3', progress: 100, isQuarter: true },
  { task: '07 Validation', startMonth: 7, endMonth: 7, category: 'Q3', progress: 100 },
  { task: '08 Pre-Production', startMonth: 8, endMonth: 8, category: 'Q3', progress: 100 },
  { task: '09 Hypercare', startMonth: 9, endMonth: 9, category: 'Q3', progress: 100 },
  // Q4: Enable
  { task: 'Q4: Enable', startMonth: 10, endMonth: 12, category: 'Q4', progress: 100, isQuarter: true },
  { task: '10 Production', startMonth: 10, endMonth: 10, category: 'Q4', progress: 100 },
  { task: '11 Reliability', startMonth: 11, endMonth: 11, category: 'Q4', progress: 100 },
  { task: '12 Continuous Improvement', startMonth: 12, endMonth: 12, category: 'Q4', progress: 100 },
];

const categoryColors: Record<string, string> = {
  'Q1': '#333',
  'Q2': '#444',
  'Q3': '#555',
  'Q4': '#666',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthlyRoadmapProps {
  data?: RoadmapTask[];
  width?: number;
  height?: number;
  title?: string;
}

const MonthlyRoadmap: React.FC<MonthlyRoadmapProps> = ({
  data = defaultData,
  width = 700,
  height = 500,
  title = "12-Month Production Roadmap"
}) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const margin = { top: 80, right: 20, bottom: 40, left: 180 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const monthWidth = innerWidth / 12;
  const rowHeight = innerHeight / data.length;

  // Quarter backgrounds
  const quarterBounds = [
    { label: 'Q1: Diagnose', start: 0, end: 3 },
    { label: 'Q2: Architect', start: 3, end: 6 },
    { label: 'Q3: Engineer', start: 6, end: 9 },
    { label: 'Q4: Enable', start: 9, end: 12 },
  ];

  // ROI Gates
  const roiGates = [
    { month: 4, label: 'Gate 1' },
    { month: 8, label: 'Gate 2' },
    { month: 12, label: 'Gate 3' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <style jsx>{`
        .roadmap-container {
          width: 100%;
          overflow-x: auto;
        }
        @media (max-width: 768px) {
          .roadmap-container svg {
            min-width: 600px;
          }
        }
      `}</style>
      
      <div className="roadmap-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
          onMouseLeave={() => setHoveredTask(null)}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Quarter header backgrounds */}
            {quarterBounds.map((q, i) => (
              <g key={`quarter-bg-${i}`}>
                <rect
                  x={q.start * monthWidth}
                  y={-60}
                  width={(q.end - q.start) * monthWidth}
                  height={24}
                  fill={i % 2 === 0 ? '#f0f0f0' : '#e8e8e8'}
                  rx={4}
                />
                <text
                  x={q.start * monthWidth + ((q.end - q.start) * monthWidth) / 2}
                  y={-44}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={chartColors.charcoal}
                >
                  {q.label}
                </text>
              </g>
            ))}

            {/* Month labels */}
            {monthNames.map((month, i) => (
              <text
                key={`month-${i}`}
                x={i * monthWidth + monthWidth / 2}
                y={-20}
                textAnchor="middle"
                fontSize={10}
                fill={chartColors.gray}
                fontWeight={400}
              >
                {month}
              </text>
            ))}

            {/* Month grid lines */}
            {Array.from({ length: 13 }).map((_, i) => (
              <line
                key={`grid-${i}`}
                x1={i * monthWidth}
                x2={i * monthWidth}
                y1={0}
                y2={innerHeight}
                stroke={chartColors.light}
                strokeWidth={1}
                strokeDasharray={i % 3 === 0 ? 'none' : '2,2'}
              />
            ))}

            {/* ROI Gate markers */}
            {roiGates.map((gate, i) => (
              <g key={`gate-${i}`}>
                <line
                  x1={gate.month * monthWidth}
                  x2={gate.month * monthWidth}
                  y1={-10}
                  y2={innerHeight + 20}
                  stroke="#c00"
                  strokeWidth={2}
                  strokeDasharray="4,2"
                />
                <rect
                  x={gate.month * monthWidth - 24}
                  y={innerHeight + 8}
                  width={48}
                  height={18}
                  fill="#c00"
                  rx={3}
                />
                <text
                  x={gate.month * monthWidth}
                  y={innerHeight + 20}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={600}
                  fill="white"
                >
                  {gate.label}
                </text>
              </g>
            ))}

            {/* Row backgrounds */}
            {data.map((task, i) => (
              <rect
                key={`row-${i}`}
                x={0}
                y={i * rowHeight}
                width={innerWidth}
                height={rowHeight}
                fill={task.isQuarter ? '#f5f5f5' : (i % 2 === 0 ? chartColors.background : 'white')}
              />
            ))}

            {/* Task bars */}
            {data.map((task, i) => {
              const isHovered = hoveredTask === task.task;
              const x = (task.startMonth - 1) * monthWidth;
              const barWidth = (task.endMonth - task.startMonth + 1) * monthWidth - 4;
              const y = i * rowHeight + rowHeight * 0.2;
              const barHeight = rowHeight * 0.6;
              const color = categoryColors[task.category] || chartColors.gray;

              return (
                <g key={task.task} onMouseEnter={() => setHoveredTask(task.task)}>
                  {/* Task label */}
                  <text
                    x={-8}
                    y={i * rowHeight + rowHeight / 2}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={task.isQuarter ? 11 : 10}
                    fill={isHovered ? chartColors.charcoal : chartColors.charcoalLight}
                    fontWeight={task.isQuarter ? 700 : (isHovered ? 600 : 400)}
                  >
                    {task.task}
                  </text>

                  {/* Task bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={color}
                    fillOpacity={task.isQuarter ? 0.9 : 0.7}
                    rx={4}
                    stroke={isHovered ? chartColors.charcoal : 'transparent'}
                    strokeWidth={2}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <title>{`${task.task}\n${monthNames[task.startMonth - 1]} - ${monthNames[task.endMonth - 1]}`}</title>
                  </rect>

                  {/* Progress indicator */}
                  {task.progress === 100 && barWidth > 30 && (
                    <text
                      x={x + barWidth / 2}
                      y={y + barHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9}
                      fontWeight={600}
                      fill="white"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '24px',
        flexWrap: 'wrap',
        fontSize: '11px',
        justifyContent: 'center'
      }}>
        {quarterBounds.map((q, i) => (
          <div key={q.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              backgroundColor: categoryColors[`Q${i + 1}`], 
              borderRadius: '3px' 
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{q.label}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '14px', 
            height: '3px', 
            backgroundColor: '#c00', 
            borderRadius: '2px' 
          }} />
          <span style={{ color: chartColors.charcoalLight }}>ROI Gate</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRoadmap;
