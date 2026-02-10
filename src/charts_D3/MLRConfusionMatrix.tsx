"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

interface MLRConfusionMatrixProps {
  data?: {
    title: string;
    subtitle: string;
    matrix: {
      truePositive: number;
      falsePositive: number;
      trueNegative: number;
      falseNegative: number;
    };
    labels?: {
      positive: string;
      negative: string;
    };
  };
  width?: number;
  height?: number;
}

const defaultData = {
  title: 'MLR Validation Model Performance',
  subtitle: 'Claims Extraction & Compliance Classification',
  matrix: {
    truePositive: 7544,
    falsePositive: 656,
    trueNegative: 3892,
    falseNegative: 408,
  },
  labels: {
    positive: 'Compliant',
    negative: 'Non-Compliant',
  }
};

const MLRConfusionMatrix: React.FC<MLRConfusionMatrixProps> = ({
  data = defaultData,
  width = 700,
  height = 500
}) => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const { truePositive, falsePositive, trueNegative, falseNegative } = data.matrix;
  const total = truePositive + falsePositive + trueNegative + falseNegative;
  
  // Calculate metrics
  const precision = truePositive / (truePositive + falsePositive);
  const recall = truePositive / (truePositive + falseNegative);
  const f1 = 2 * (precision * recall) / (precision + recall);
  const accuracy = (truePositive + trueNegative) / total;
  const specificity = trueNegative / (trueNegative + falsePositive);

  const margin = { top: 80, right: 200, bottom: 80, left: 100 };
  const cellSize = 140;
  const gap = 8;
  const matrixWidth = cellSize * 2 + gap;
  const matrixHeight = cellSize * 2 + gap;
  const matrixX = margin.left;
  const matrixY = margin.top;

  const maxValue = Math.max(truePositive, falsePositive, trueNegative, falseNegative);

  const getCellColor = (value: number, isDiagonal: boolean) => {
    const intensity = value / maxValue;
    if (isDiagonal) {
      // Green for correct predictions
      return `rgba(0, 128, 128, ${0.3 + intensity * 0.6})`;
    }
    // Red/gray for errors
    return `rgba(200, 50, 50, ${0.2 + intensity * 0.5})`;
  };

  const cells = [
    { 
      id: 'tp', 
      label: 'True Positive', 
      value: truePositive, 
      x: 0, 
      y: 0, 
      isDiagonal: true,
      description: 'Correctly identified as compliant'
    },
    { 
      id: 'fp', 
      label: 'False Positive', 
      value: falsePositive, 
      x: 1, 
      y: 0, 
      isDiagonal: false,
      description: 'Incorrectly flagged as compliant'
    },
    { 
      id: 'fn', 
      label: 'False Negative', 
      value: falseNegative, 
      x: 0, 
      y: 1, 
      isDiagonal: false,
      description: 'Missed non-compliant content'
    },
    { 
      id: 'tn', 
      label: 'True Negative', 
      value: trueNegative, 
      x: 1, 
      y: 1, 
      isDiagonal: true,
      description: 'Correctly identified as non-compliant'
    },
  ];

  const formatNumber = (n: number) => n.toLocaleString();
  const formatPercent = (n: number) => `${(n * 100).toFixed(1)}%`;

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
          {data.subtitle} • n={formatNumber(total)} samples
        </text>

        {/* Matrix */}
        <g transform={`translate(${matrixX}, ${matrixY})`}>
          {/* Column headers */}
          <text
            x={matrixWidth / 2}
            y={-35}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill={chartColors.charcoal}
          >
            Predicted
          </text>
          <text
            x={cellSize / 2}
            y={-15}
            textAnchor="middle"
            fontSize={11}
            fill={chartColors.gray}
          >
            {data.labels?.positive || 'Positive'}
          </text>
          <text
            x={cellSize + gap + cellSize / 2}
            y={-15}
            textAnchor="middle"
            fontSize={11}
            fill={chartColors.gray}
          >
            {data.labels?.negative || 'Negative'}
          </text>

          {/* Row headers */}
          <text
            x={-50}
            y={matrixHeight / 2}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill={chartColors.charcoal}
            transform={`rotate(-90, -50, ${matrixHeight / 2})`}
          >
            Actual
          </text>
          <text
            x={-15}
            y={cellSize / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={11}
            fill={chartColors.gray}
          >
            {data.labels?.positive || 'Positive'}
          </text>
          <text
            x={-15}
            y={cellSize + gap + cellSize / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={11}
            fill={chartColors.gray}
          >
            {data.labels?.negative || 'Negative'}
          </text>

          {/* Cells */}
          {cells.map((cell) => {
            const cx = cell.x * (cellSize + gap);
            const cy = cell.y * (cellSize + gap);
            const isHovered = hoveredCell === cell.id;
            const pct = (cell.value / total) * 100;

            return (
              <g
                key={cell.id}
                onMouseEnter={() => setHoveredCell(cell.id)}
                onMouseLeave={() => setHoveredCell(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={cx}
                  y={cy}
                  width={cellSize}
                  height={cellSize}
                  fill={getCellColor(cell.value, cell.isDiagonal)}
                  stroke={isHovered ? chartColors.charcoal : '#e0e0e0'}
                  strokeWidth={isHovered ? 3 : 1}
                  rx={8}
                />
                <text
                  x={cx + cellSize / 2}
                  y={cy + cellSize / 2 - 15}
                  textAnchor="middle"
                  fontSize={24}
                  fontWeight={700}
                  fill={chartColors.charcoal}
                >
                  {formatNumber(cell.value)}
                </text>
                <text
                  x={cx + cellSize / 2}
                  y={cy + cellSize / 2 + 10}
                  textAnchor="middle"
                  fontSize={12}
                  fill={chartColors.gray}
                >
                  {pct.toFixed(1)}%
                </text>
                <text
                  x={cx + cellSize / 2}
                  y={cy + cellSize / 2 + 30}
                  textAnchor="middle"
                  fontSize={10}
                  fill={cell.isDiagonal ? chartColors.teal : '#c44'}
                  fontWeight={500}
                >
                  {cell.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Metrics Panel */}
        <g transform={`translate(${width - margin.right + 30}, ${matrixY})`}>
          <text
            x={0}
            y={0}
            fontSize={13}
            fontWeight={600}
            fill={chartColors.charcoal}
          >
            Performance Metrics
          </text>

          {[
            { label: 'Accuracy', value: accuracy, target: 0.90, important: true },
            { label: 'Precision', value: precision, target: 0.88, important: true },
            { label: 'Recall', value: recall, target: 0.92, important: true },
            { label: 'F1 Score', value: f1, target: 0.90, important: true },
            { label: 'Specificity', value: specificity, target: 0.85, important: false },
          ].map((metric, i) => {
            const passTarget = metric.value >= metric.target;
            return (
              <g key={metric.label} transform={`translate(0, ${25 + i * 50})`}>
                <text
                  x={0}
                  y={0}
                  fontSize={11}
                  fill={chartColors.gray}
                >
                  {metric.label}
                </text>
                <text
                  x={0}
                  y={20}
                  fontSize={metric.important ? 20 : 16}
                  fontWeight={700}
                  fill={passTarget ? chartColors.teal : '#c44'}
                >
                  {formatPercent(metric.value)}
                </text>
                <text
                  x={75}
                  y={20}
                  fontSize={10}
                  fill={passTarget ? chartColors.teal : '#c44'}
                >
                  {passTarget ? '✓' : '✗'} target {formatPercent(metric.target)}
                </text>
              </g>
            );
          })}
        </g>

        {/* Hover tooltip */}
        {hoveredCell && (
          <g transform={`translate(${matrixX + matrixWidth / 2}, ${matrixY + matrixHeight + 35})`}>
            <rect
              x={-150}
              y={0}
              width={300}
              height={40}
              fill="#f8f8f8"
              stroke="#e0e0e0"
              rx={4}
            />
            <text
              x={0}
              y={25}
              textAnchor="middle"
              fontSize={11}
              fill={chartColors.charcoal}
            >
              {cells.find(c => c.id === hoveredCell)?.description}
            </text>
          </g>
        )}
      </svg>

      {/* Interpretation Guide */}
      <div style={{ 
        marginTop: '16px', 
        padding: '16px', 
        backgroundColor: '#f8f8f8', 
        borderRadius: '8px',
        fontSize: '12px',
        color: chartColors.charcoal
      }}>
        <strong>Key Insights:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>
            <strong>False Positives ({formatNumber(falsePositive)}):</strong> Content incorrectly approved — {formatPercent(falsePositive / total)} of total.
            Risk: Non-compliant content reaching market.
          </li>
          <li>
            <strong>False Negatives ({formatNumber(falseNegative)}):</strong> Content incorrectly rejected — {formatPercent(falseNegative / total)} of total.
            Impact: Unnecessary manual review cycles.
          </li>
          <li>
            Model achieves {formatPercent(precision)} precision, meaning {formatPercent(1 - precision)} of "compliant" predictions require human override.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MLRConfusionMatrix;
