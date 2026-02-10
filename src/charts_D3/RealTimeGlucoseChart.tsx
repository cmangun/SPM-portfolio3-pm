'use client';
/**
 * RealTimeGlucoseChart - Live glucose monitoring simulation with alerts
 * Simulates CGM data with hypo/hyper alerts and trend arrows
 */
import React, { useEffect, useState, useRef } from 'react';

interface GlucoseReading {
  time: number;
  value: number;
  inRange: boolean;
}

interface AlertZone {
  type: 'low' | 'high' | 'urgent-low' | 'urgent-high';
  min: number;
  max: number;
  color: string;
  label: string;
}

interface RealTimeGlucoseChartProps {
  title?: string;
  width?: number;
  height?: number;
  animate?: boolean;
}

const alertZones: AlertZone[] = [
  { type: 'urgent-low', min: 0, max: 54, color: '#666', label: 'Urgent Low' },
  { type: 'low', min: 54, max: 70, color: '#666', label: 'Low' },
  { type: 'high', min: 180, max: 250, color: '#666', label: 'High' },
  { type: 'urgent-high', min: 250, max: 400, color: '#666', label: 'Urgent High' },
];

const getTrendArrow = (current: number, previous: number): { arrow: string; label: string; color: string } => {
  const diff = current - previous;
  const rate = diff / 5; // mg/dL per minute
  
  if (rate > 3) return { arrow: '↑↑', label: 'Rising rapidly', color: '#666' };
  if (rate > 1) return { arrow: '↑', label: 'Rising', color: '#666' };
  if (rate > 0.5) return { arrow: '↗', label: 'Rising slowly', color: '#666' };
  if (rate < -3) return { arrow: '↓↓', label: 'Falling rapidly', color: '#666' };
  if (rate < -1) return { arrow: '↓', label: 'Falling', color: '#666' };
  if (rate < -0.5) return { arrow: '↘', label: 'Falling slowly', color: '#666' };
  return { arrow: '→', label: 'Steady', color: '#1a1a1a' };
};

const getGlucoseColor = (value: number): string => {
  if (value < 54 || value > 250) return '#666';
  if (value < 70 || value > 180) return '#666';
  return '#1a1a1a';
};

const RealTimeGlucoseChart: React.FC<RealTimeGlucoseChartProps> = ({
  title = 'Continuous Glucose Monitor',
  width = 700,
  height = 400,
  animate = true,
}) => {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [currentReading, setCurrentReading] = useState(105);
  const [alerts, setAlerts] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize with historical data
  useEffect(() => {
    const initialData: GlucoseReading[] = [];
    let value = 110;
    
    for (let i = 0; i < 60; i++) {
      // Simulate realistic glucose patterns
      const noise = (Math.random() - 0.5) * 8;
      const trend = Math.sin(i / 10) * 15;
      value = Math.max(60, Math.min(220, value + noise + trend * 0.1));
      
      initialData.push({
        time: Date.now() - (60 - i) * 60000 * 5, // 5-min intervals
        value: Math.round(value),
        inRange: value >= 70 && value <= 180
      });
    }
    
    setReadings(initialData);
    setCurrentReading(Math.round(value));
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  // Animate new readings
  useEffect(() => {
    if (!animate) return;
    
    intervalRef.current = setInterval(() => {
      setReadings(prev => {
        const lastValue = prev[prev.length - 1]?.value || 105;
        const noise = (Math.random() - 0.5) * 10;
        const meanReversion = (105 - lastValue) * 0.05;
        const newValue = Math.max(55, Math.min(240, lastValue + noise + meanReversion));
        const rounded = Math.round(newValue);
        
        setCurrentReading(rounded);
        
        // Check for alerts
        const newAlerts: string[] = [];
        if (rounded < 54) newAlerts.push('🚨 URGENT LOW - Take fast-acting glucose');
        else if (rounded < 70) newAlerts.push('⚠️ Low glucose - Consider a snack');
        else if (rounded > 250) newAlerts.push('🚨 URGENT HIGH - Check ketones');
        else if (rounded > 180) newAlerts.push('⚠️ High glucose - Monitor trend');
        setAlerts(newAlerts);
        
        const newReading = {
          time: Date.now(),
          value: rounded,
          inRange: rounded >= 70 && rounded <= 180
        };
        
        return [...prev.slice(-59), newReading];
      });
    }, 2000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animate]);
  
  // Chart dimensions
  const padding = { top: 40, right: 60, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom - 100; // Space for current reading
  
  // Scales
  const yMin = 40;
  const yMax = 280;
  const yScale = (value: number) => chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight;
  const xScale = (index: number) => (index / (readings.length - 1)) * chartWidth;
  
  // Generate path
  const linePath = readings.length > 1
    ? readings.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(r.value)}`).join(' ')
    : '';
  
  // Previous reading for trend
  const prevReading = readings[readings.length - 2]?.value || currentReading;
  const trend = getTrendArrow(currentReading, prevReading);
  
  // Time in range calculation
  const inRangeCount = readings.filter(r => r.inRange).length;
  const timeInRange = readings.length > 0 ? Math.round((inRangeCount / readings.length) * 100) : 0;
  
  return (
    <div style={{ width: '100%', maxWidth: width }}>
      {/* Current Reading Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px 12px 0 0',
        color: '#fff'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ 
              fontSize: '48px', 
              fontWeight: '700',
              color: getGlucoseColor(currentReading)
            }}>
              {currentReading}
            </span>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>mg/dL</span>
            <span style={{ 
              fontSize: '32px', 
              marginLeft: '8px',
              color: trend.color
            }}>
              {trend.arrow}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: trend.color, marginTop: '4px' }}>
            {trend.label}
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: '11px', 
            color: 'rgba(255,255,255,0.5)', 
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            Time in Range (70-180)
          </div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '700',
            color: timeInRange >= 70 ? '#1a1a1a' : timeInRange >= 50 ? '#666' : '#666'
          }}>
            {timeInRange}%
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={{
          padding: '12px 24px',
          backgroundColor: alerts[0].includes('URGENT') ? '#f5f5f5' : '#f5f5f5',
          borderLeft: `4px solid ${alerts[0].includes('URGENT') ? '#666' : '#666'}`
        }}>
          {alerts.map((alert, i) => (
            <div key={i} style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
              {alert}
            </div>
          ))}
        </div>
      )}
      
      {/* Chart */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderTop: alerts.length === 0 ? '1px solid #e5e5e5' : 'none',
        borderRadius: alerts.length === 0 ? '0 0 12px 12px' : '0 0 12px 12px',
        padding: '20px'
      }}>
        <svg width={width - 40} height={chartHeight + padding.top + padding.bottom}>
          <defs>
            <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Target Range Background */}
            <rect
              x={0}
              y={yScale(180)}
              width={chartWidth}
              height={yScale(70) - yScale(180)}
              fill="#eee"
              opacity={0.5}
            />
            
            {/* Low Zone */}
            <rect
              x={0}
              y={yScale(70)}
              width={chartWidth}
              height={yScale(54) - yScale(70)}
              fill="#fef3c7"
              opacity={0.5}
            />
            
            {/* Urgent Low Zone */}
            <rect
              x={0}
              y={yScale(54)}
              width={chartWidth}
              height={yScale(yMin) - yScale(54)}
              fill="#ddd"
              opacity={0.5}
            />
            
            {/* High Zone */}
            <rect
              x={0}
              y={yScale(250)}
              width={chartWidth}
              height={yScale(180) - yScale(250)}
              fill="#fef3c7"
              opacity={0.5}
            />
            
            {/* Urgent High Zone */}
            <rect
              x={0}
              y={yScale(yMax)}
              width={chartWidth}
              height={yScale(250) - yScale(yMax)}
              fill="#ddd"
              opacity={0.5}
            />
            
            {/* Grid Lines */}
            {[70, 100, 140, 180, 250].map(v => (
              <g key={v}>
                <line
                  x1={0}
                  y1={yScale(v)}
                  x2={chartWidth}
                  y2={yScale(v)}
                  stroke="#e5e5e5"
                  strokeDasharray={v === 70 || v === 180 ? "none" : "4,4"}
                />
                <text
                  x={chartWidth + 8}
                  y={yScale(v)}
                  dy="4"
                  fontSize="11"
                  fill="#999"
                >
                  {v}
                </text>
              </g>
            ))}
            
            {/* Target Range Labels */}
            <text x={chartWidth + 8} y={yScale(125)} fontSize="10" fill="#1a1a1a" fontWeight="600">
              Target
            </text>
            
            {/* Glucose Line */}
            {linePath && (
              <>
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Current point */}
                <circle
                  cx={xScale(readings.length - 1)}
                  cy={yScale(currentReading)}
                  r={6}
                  fill={getGlucoseColor(currentReading)}
                  stroke="#fff"
                  strokeWidth={2}
                />
                
                {/* Pulse animation for current */}
                <circle
                  cx={xScale(readings.length - 1)}
                  cy={yScale(currentReading)}
                  r={6}
                  fill="none"
                  stroke={getGlucoseColor(currentReading)}
                  strokeWidth={2}
                  opacity={0.5}
                >
                  <animate
                    attributeName="r"
                    from="6"
                    to="16"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
            
            {/* X-axis labels */}
            <text x={0} y={chartHeight + 25} fontSize="10" fill="#999">5h ago</text>
            <text x={chartWidth / 2} y={chartHeight + 25} fontSize="10" fill="#999" textAnchor="middle">2.5h ago</text>
            <text x={chartWidth} y={chartHeight + 25} fontSize="10" fill="#999" textAnchor="end">Now</text>
          </g>
        </svg>
        
        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e5e5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#eee', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: '#666' }}>Target (70-180)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#fef3c7', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: '#666' }}>Caution</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ddd', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: '#666' }}>Urgent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeGlucoseChart;
