import React from 'react';
import { chartColors } from './colors';

interface APIDependency {
  name: string;
  type: 'Internal' | 'External' | 'Vendor';
  status: 'Healthy' | 'Degraded' | 'Down';
  latencyP99: number;
  availability: number;
  callsPerDay: number;
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  dependents: string[];
}

interface APIDependencyMapProps {
  data?: APIDependency[];
  systemName?: string;
}

const defaultData: APIDependency[] = [
  { name: 'Feature Store API', type: 'Internal', status: 'Healthy', latencyP99: 45, availability: 99.95, callsPerDay: 2500000, criticality: 'Critical', dependents: ['Fraud Detection', 'Risk Scoring', 'Recommendations'] },
  { name: 'Model Registry', type: 'Internal', status: 'Healthy', latencyP99: 120, availability: 99.99, callsPerDay: 15000, criticality: 'High', dependents: ['All Models'] },
  { name: 'OpenAI API', type: 'Vendor', status: 'Healthy', latencyP99: 850, availability: 99.5, callsPerDay: 180000, criticality: 'Critical', dependents: ['NLP Services', 'Chat Agent'] },
  { name: 'AWS Bedrock', type: 'Vendor', status: 'Degraded', latencyP99: 1200, availability: 98.8, callsPerDay: 95000, criticality: 'High', dependents: ['Document AI', 'Embeddings'] },
  { name: 'Customer Data API', type: 'Internal', status: 'Healthy', latencyP99: 65, availability: 99.92, callsPerDay: 890000, criticality: 'Critical', dependents: ['Personalization', 'Risk Scoring'] },
  { name: 'Stripe API', type: 'External', status: 'Healthy', latencyP99: 250, availability: 99.99, callsPerDay: 45000, criticality: 'High', dependents: ['Payment ML'] },
  { name: 'Credit Bureau API', type: 'External', status: 'Healthy', latencyP99: 1800, availability: 99.2, callsPerDay: 12000, criticality: 'Critical', dependents: ['Risk Scoring', 'Underwriting'] },
  { name: 'Vector DB', type: 'Internal', status: 'Down', latencyP99: 0, availability: 85.0, callsPerDay: 0, criticality: 'High', dependents: ['RAG Pipeline', 'Search'] },
];

export const APIDependencyMap: React.FC<APIDependencyMapProps> = ({
  data = defaultData,
  systemName = 'ML Platform',
}) => {
  const byType = data.reduce((acc, d) => {
    if (!acc[d.type]) acc[d.type] = [];
    acc[d.type].push(d);
    return acc;
  }, {} as Record<string, APIDependency[]>);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Healthy': return { bg: chartColors.background, border: chartColors.border, indicator: '●' };
      case 'Degraded': return { bg: chartColors.surface, border: chartColors.text.primary, indicator: '◐' };
      case 'Down': return { bg: chartColors.text.primary, border: chartColors.text.primary, indicator: '○' };
      default: return { bg: chartColors.background, border: chartColors.border, indicator: '?' };
    }
  };

  const getCriticalityWeight = (criticality: string) => {
    switch (criticality) {
      case 'Critical': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      default: return 1;
    }
  };

  const healthyCount = data.filter(d => d.status === 'Healthy').length;
  const degradedCount = data.filter(d => d.status === 'Degraded').length;
  const downCount = data.filter(d => d.status === 'Down').length;

  const avgAvailability = data.reduce((sum, d) => sum + d.availability, 0) / data.length;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        API Dependency Map
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1rem' }}>
        External service dependencies • {systemName}
      </p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>TOTAL APIS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.length}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>● HEALTHY</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{healthyCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>◐ DEGRADED</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{degradedCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `2px solid ${chartColors.text.primary}`, backgroundColor: downCount > 0 ? chartColors.surface : chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>○ DOWN</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{downCount}</div>
        </div>
        <div style={{ padding: '1rem', border: `1px solid ${chartColors.border}`, backgroundColor: chartColors.surface }}>
          <div style={{ fontSize: '0.75rem', color: chartColors.text.secondary }}>AVG AVAILABILITY</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{avgAvailability.toFixed(1)}%</div>
        </div>
      </div>

      {/* Dependency Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {['Internal', 'External', 'Vendor'].map(type => (
          <div key={type}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: chartColors.surface, 
              borderBottom: `2px solid ${chartColors.text.primary}`,
              fontWeight: 600,
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              {type} ({byType[type]?.length || 0})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {byType[type]?.sort((a, b) => getCriticalityWeight(b.criticality) - getCriticalityWeight(a.criticality)).map(api => {
                const style = getStatusStyle(api.status);
                return (
                  <div 
                    key={api.name}
                    style={{ 
                      padding: '0.75rem',
                      backgroundColor: style.bg,
                      border: `2px solid ${style.border}`,
                      color: api.status === 'Down' ? chartColors.background : chartColors.text.primary
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{style.indicator} {api.name}</span>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        padding: '0.1rem 0.3rem',
                        backgroundColor: api.status === 'Down' ? chartColors.background : chartColors.surface,
                        color: api.status === 'Down' ? chartColors.text.primary : chartColors.text.primary,
                        border: `1px solid ${api.status === 'Down' ? chartColors.background : chartColors.border}`
                      }}>
                        {api.criticality}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                      <div>
                        <div style={{ opacity: 0.7 }}>P99</div>
                        <div style={{ fontWeight: 500 }}>{api.latencyP99}ms</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>Avail</div>
                        <div style={{ fontWeight: 500 }}>{api.availability}%</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>Calls/day</div>
                        <div style={{ fontWeight: 500 }}>{(api.callsPerDay / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.8 }}>
                      → {api.dependents.slice(0, 2).join(', ')}{api.dependents.length > 2 ? ` +${api.dependents.length - 2}` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', borderTop: `1px solid ${chartColors.border}`, paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>●</span><span>Healthy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>◐</span><span>Degraded</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>○</span><span>Down</span>
        </div>
      </div>
    </div>
  );
};

export default APIDependencyMap;
