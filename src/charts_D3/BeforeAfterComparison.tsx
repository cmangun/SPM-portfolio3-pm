'use client';
/**
 * BeforeAfterComparison - Side-by-side architecture comparison
 * Shows legacy vs modern architecture transformation
 * Black/white/gray color palette
 */
import React from 'react';

interface ArchitectureItem {
  name: string;
  icon?: string;
  status?: 'legacy' | 'modern' | 'neutral';
}

interface ComparisonData {
  before: {
    title: string;
    subtitle: string;
    items: ArchitectureItem[];
    metrics: { label: string; value: string; status: 'bad' | 'neutral' }[];
    pain: string[];
  };
  after: {
    title: string;
    subtitle: string;
    items: ArchitectureItem[];
    metrics: { label: string; value: string; status: 'good' | 'neutral' }[];
    benefits: string[];
  };
  transformation: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
}

interface BeforeAfterComparisonProps {
  data: ComparisonData;
  title?: string;
  width?: number;
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  data,
  title,
  width = 800,
}) => {
  return (
    <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
      {title && (
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#1a1a1a', 
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {title}
        </h3>
      )}
      
      {/* Main Comparison Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr', 
        gap: '24px',
        alignItems: 'stretch'
      }}>
        {/* BEFORE Column */}
        <div style={{ 
          backgroundColor: '#fafafa', 
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '24px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '24px',
            backgroundColor: '#666',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '4px 12px',
            borderRadius: '4px'
          }}>
            Before
          </div>
          
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1a1a1a',
            marginTop: '8px',
            marginBottom: '4px'
          }}>
            {data.before.title}
          </h4>
          <p style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginBottom: '20px' 
          }}>
            {data.before.subtitle}
          </p>
          
          {/* Architecture Items */}
          <div style={{ marginBottom: '20px' }}>
            {data.before.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                marginBottom: '8px',
                fontSize: '13px',
                color: '#333'
              }}>
                <span style={{ opacity: 0.6 }}>{item.icon || '▢'}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '8px',
            marginBottom: '16px'
          }}>
            {data.before.metrics.map((metric, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '12px 8px',
                backgroundColor: metric.status === 'bad' ? '#f5f5f5' : '#f5f5f5',
                borderRadius: '6px',
                border: metric.status === 'bad' ? '1px solid #999' : '1px solid #e5e5e5'
              }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: metric.status === 'bad' ? '#666' : '#666'
                }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pain Points */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              fontWeight: '600', 
              color: '#999', 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              Pain Points
            </div>
            {data.before.pain.map((pain, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '12px',
                color: '#666',
                marginBottom: '6px'
              }}>
                <span style={{ color: '#666' }}>✕</span>
                <span>{pain}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Arrow / Transformation Indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textAlign: 'center'
          }}>
            Migration
          </div>
        </div>
        
        {/* AFTER Column */}
        <div style={{ 
          backgroundColor: '#fff', 
          border: '2px solid #1a1a1a',
          borderRadius: '8px',
          padding: '24px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '24px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '4px 12px',
            borderRadius: '4px'
          }}>
            After
          </div>
          
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1a1a1a',
            marginTop: '8px',
            marginBottom: '4px'
          }}>
            {data.after.title}
          </h4>
          <p style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginBottom: '20px' 
          }}>
            {data.after.subtitle}
          </p>
          
          {/* Architecture Items */}
          <div style={{ marginBottom: '20px' }}>
            {data.after.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: '#fafafa',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginBottom: '8px',
                fontSize: '13px',
                color: '#333'
              }}>
                <span style={{ color: '#1a1a1a' }}>{item.icon || '▣'}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '8px',
            marginBottom: '16px'
          }}>
            {data.after.metrics.map((metric, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '12px 8px',
                backgroundColor: metric.status === 'good' ? '#1a1a1a' : '#f5f5f5',
                borderRadius: '6px',
                border: metric.status === 'good' ? '1px solid #1a1a1a' : '1px solid #e5e5e5'
              }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: metric.status === 'good' ? '#fff' : '#666'
                }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: '10px', color: metric.status === 'good' ? 'rgba(255,255,255,0.7)' : '#666', marginTop: '2px' }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Benefits */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              fontWeight: '600', 
              color: '#999', 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              Benefits
            </div>
            {data.after.benefits.map((benefit, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '12px',
                color: '#666',
                marginBottom: '6px'
              }}>
                <span style={{ color: '#1a1a1a' }}>✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Transformation Metrics Table */}
      <div style={{ 
        marginTop: '32px',
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e5e5e5',
          fontSize: '12px',
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          Key Transformation Metrics
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <th style={{ 
                padding: '10px 16px', 
                textAlign: 'left', 
                fontSize: '11px', 
                fontWeight: '600',
                color: '#666',
                borderBottom: '1px solid #e5e5e5'
              }}>
                Metric
              </th>
              <th style={{ 
                padding: '10px 16px', 
                textAlign: 'center', 
                fontSize: '11px', 
                fontWeight: '600',
                color: '#666',
                borderBottom: '1px solid #e5e5e5'
              }}>
                Before
              </th>
              <th style={{ 
                padding: '10px 16px', 
                textAlign: 'center', 
                fontSize: '11px', 
                fontWeight: '600',
                color: '#1a1a1a',
                borderBottom: '1px solid #e5e5e5'
              }}>
                After
              </th>
              <th style={{ 
                padding: '10px 16px', 
                textAlign: 'center', 
                fontSize: '11px', 
                fontWeight: '600',
                color: '#1a1a1a',
                borderBottom: '1px solid #e5e5e5'
              }}>
                Improvement
              </th>
            </tr>
          </thead>
          <tbody>
            {data.transformation.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < data.transformation.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#333' }}>
                  {row.label}
                </td>
                <td style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  color: '#666',
                  backgroundColor: '#f5f5f5'
                }}>
                  {row.before}
                </td>
                <td style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  color: '#1a1a1a',
                  fontWeight: '600',
                  backgroundColor: '#fafafa'
                }}>
                  {row.after}
                </td>
                <td style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}>
                  {row.improvement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
