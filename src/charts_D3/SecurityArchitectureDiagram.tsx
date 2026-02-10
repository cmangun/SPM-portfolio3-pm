"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

interface SecurityLayer {
  id: string;
  name: string;
  description: string;
  controls: string[];
  compliance: string[];
  icon: string;
}

interface SecurityArchitectureDiagramProps {
  data?: {
    title: string;
    subtitle: string;
    layers: SecurityLayer[];
    certifications: string[];
  };
  width?: number;
  height?: number;
}

const defaultData = {
  title: 'HIPAA Security Architecture',
  subtitle: 'Defense-in-depth for PHI protection',
  layers: [
    {
      id: 'perimeter',
      name: 'Perimeter Security',
      description: 'Network edge protection',
      controls: ['Azure WAF', 'DDoS Protection', 'Geo-filtering'],
      compliance: ['SOC 2', 'HIPAA §164.312(e)'],
      icon: '🛡️'
    },
    {
      id: 'network',
      name: 'Network Security',
      description: 'Internal network controls',
      controls: ['VNet isolation', 'NSG rules', 'Private endpoints'],
      compliance: ['HIPAA §164.312(a)', 'SOC 2 CC6.1'],
      icon: '🔒'
    },
    {
      id: 'identity',
      name: 'Identity & Access',
      description: 'Authentication and authorization',
      controls: ['Azure AD', 'RBAC', 'MFA', 'PIM'],
      compliance: ['HIPAA §164.312(d)', 'SOC 2 CC6.2'],
      icon: '👤'
    },
    {
      id: 'application',
      name: 'Application Security',
      description: 'Code and runtime protection',
      controls: ['API validation', 'Input sanitization', 'OWASP Top 10'],
      compliance: ['HIPAA §164.312(c)', 'SOC 2 CC7.1'],
      icon: '⚙️'
    },
    {
      id: 'data',
      name: 'Data Protection',
      description: 'Encryption and masking',
      controls: ['AES-256 at rest', 'TLS 1.3 in transit', 'PII redaction'],
      compliance: ['HIPAA §164.312(a)(2)(iv)', 'SOC 2 CC6.7'],
      icon: '🗄️'
    },
    {
      id: 'monitoring',
      name: 'Audit & Monitoring',
      description: 'Logging and alerting',
      controls: ['Azure Monitor', 'Log Analytics', 'SIEM integration'],
      compliance: ['HIPAA §164.312(b)', 'SOC 2 CC7.2'],
      icon: '📊'
    },
  ],
  certifications: ['SOC 2 Type II', 'HIPAA BAA', 'ISO 27001', 'FedRAMP']
};

const SecurityArchitectureDiagram: React.FC<SecurityArchitectureDiagramProps> = ({
  data = defaultData,
  width = 800,
  height = 600
}) => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const layerHeight = 70;
  const layerGap = 8;
  const startY = 80;
  const margin = { left: 40, right: 280 };

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
          x={width / 2 - 100}
          y={30}
          textAnchor="middle"
          fontSize={18}
          fontWeight={700}
          fill={chartColors.charcoal}
        >
          {data.title}
        </text>
        <text
          x={width / 2 - 100}
          y={50}
          textAnchor="middle"
          fontSize={12}
          fill={chartColors.gray}
        >
          {data.subtitle}
        </text>

        {/* Security Layers */}
        {data.layers.map((layer, index) => {
          const y = startY + index * (layerHeight + layerGap);
          const isHovered = hoveredLayer === layer.id;
          const isSelected = selectedLayer === layer.id;
          const layerWidth = width - margin.left - margin.right;
          
          // Nested effect - each layer slightly smaller
          const indent = index * 15;
          const currentWidth = layerWidth - indent * 2;
          const x = margin.left + indent;

          return (
            <g
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Layer background */}
              <rect
                x={x}
                y={y}
                width={currentWidth}
                height={layerHeight}
                fill={isHovered || isSelected ? '#f0f0f0' : '#fafafa'}
                stroke={isSelected ? chartColors.charcoal : (isHovered ? chartColors.gray : '#e0e0e0')}
                strokeWidth={isSelected ? 2 : 1}
                rx={8}
              />

              {/* Layer number badge */}
              <circle
                cx={x + 25}
                cy={y + layerHeight / 2}
                r={16}
                fill={chartColors.charcoal}
              />
              <text
                x={x + 25}
                y={y + layerHeight / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight={700}
                fill="#fff"
              >
                {index + 1}
              </text>

              {/* Layer name */}
              <text
                x={x + 55}
                y={y + 25}
                fontSize={14}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {layer.name}
              </text>

              {/* Layer description */}
              <text
                x={x + 55}
                y={y + 43}
                fontSize={11}
                fill={chartColors.gray}
              >
                {layer.description}
              </text>

              {/* Controls tags */}
              {layer.controls.slice(0, 3).map((control, ci) => (
                <g key={ci}>
                  <rect
                    x={x + 55 + ci * 95}
                    y={y + 50}
                    width={88}
                    height={16}
                    fill="rgba(0,0,0,0.05)"
                    rx={3}
                  />
                  <text
                    x={x + 55 + ci * 95 + 44}
                    y={y + 61}
                    textAnchor="middle"
                    fontSize={9}
                    fill={chartColors.charcoal}
                  >
                    {control}
                  </text>
                </g>
              ))}
            </g>
          );
        })}

        {/* Right Panel - Certifications */}
        <g transform={`translate(${width - margin.right + 20}, ${startY})`}>
          <text
            x={0}
            y={0}
            fontSize={12}
            fontWeight={600}
            fill={chartColors.charcoal}
          >
            Certifications
          </text>
          
          {data.certifications.map((cert, i) => (
            <g key={i} transform={`translate(0, ${20 + i * 35})`}>
              <rect
                x={0}
                y={0}
                width={120}
                height={28}
                fill="rgba(0,128,128,0.1)"
                stroke={chartColors.teal}
                strokeWidth={1}
                rx={4}
              />
              <text
                x={60}
                y={18}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={chartColors.teal}
              >
                {cert}
              </text>
            </g>
          ))}

          {/* Key metrics */}
          <g transform={`translate(0, ${180})`}>
            <text
              x={0}
              y={0}
              fontSize={12}
              fontWeight={600}
              fill={chartColors.charcoal}
            >
              Security Metrics
            </text>
            
            {[
              { label: 'Incidents (12mo)', value: '0' },
              { label: 'Audit Findings', value: '0' },
              { label: 'Pen Test Score', value: 'A+' },
              { label: 'Compliance', value: '100%' },
            ].map((metric, i) => (
              <g key={i} transform={`translate(0, ${20 + i * 30})`}>
                <text
                  x={0}
                  y={0}
                  fontSize={10}
                  fill={chartColors.gray}
                >
                  {metric.label}
                </text>
                <text
                  x={0}
                  y={16}
                  fontSize={16}
                  fontWeight={700}
                  fill={chartColors.charcoal}
                >
                  {metric.value}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* Bottom legend */}
        <g transform={`translate(${margin.left}, ${height - 40})`}>
          <text fontSize={10} fill={chartColors.gray}>
            Defense-in-depth model: Each layer provides independent protection. Outer layers protect inner layers.
          </text>
        </g>
      </svg>

      {/* Selected layer detail panel */}
      {selectedLayer && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ margin: '0 0 12px', color: chartColors.charcoal }}>
            {data.layers.find(l => l.id === selectedLayer)?.name} - Compliance Mapping
          </h4>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <strong style={{ fontSize: '11px', color: chartColors.gray }}>Controls</strong>
              <ul style={{ margin: '8px 0 0', paddingLeft: '16px', fontSize: '12px' }}>
                {data.layers.find(l => l.id === selectedLayer)?.controls.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong style={{ fontSize: '11px', color: chartColors.gray }}>Compliance References</strong>
              <ul style={{ margin: '8px 0 0', paddingLeft: '16px', fontSize: '12px' }}>
                {data.layers.find(l => l.id === selectedLayer)?.compliance.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityArchitectureDiagram;
