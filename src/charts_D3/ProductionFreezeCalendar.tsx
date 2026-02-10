import React from 'react';
import { chartColors } from './colors';

interface FreezeWindow {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'Hard Freeze' | 'Soft Freeze' | 'Change Window';
  systems: string[];
  reason: string;
}

interface ProductionFreezeCalendarProps {
  data?: FreezeWindow[];
  year?: number;
  month?: number;
}

const defaultData: FreezeWindow[] = [
  { id: 'F-001', name: 'Year-End Freeze', startDate: '2024-12-20', endDate: '2025-01-05', type: 'Hard Freeze', systems: ['All Production'], reason: 'Holiday Period - No Changes' },
  { id: 'F-002', name: 'Quarterly Close', startDate: '2024-12-28', endDate: '2024-12-31', type: 'Hard Freeze', systems: ['Finance ML', 'Reporting'], reason: 'Q4 Financial Close' },
  { id: 'F-003', name: 'Maintenance Window', startDate: '2024-12-15', endDate: '2024-12-15', type: 'Change Window', systems: ['ML Platform'], reason: 'Scheduled Maintenance' },
  { id: 'F-004', name: 'Model Release Window', startDate: '2024-12-18', endDate: '2024-12-18', type: 'Change Window', systems: ['Inference APIs'], reason: 'Approved Deployment Window' },
  { id: 'F-005', name: 'Peak Traffic Period', startDate: '2024-12-23', endDate: '2024-12-26', type: 'Soft Freeze', systems: ['Customer-Facing'], reason: 'High Traffic Expected' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ProductionFreezeCalendar: React.FC<ProductionFreezeCalendarProps> = ({
  data = defaultData,
  year = 2024,
  month = 12,
}) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startPad = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const getDayFreezes = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return data.filter(f => dateStr >= f.startDate && dateStr <= f.endDate);
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Hard Freeze': return { bg: chartColors.text.primary, color: chartColors.background, pattern: '' };
      case 'Soft Freeze': return { bg: chartColors.gray[400], color: chartColors.text.primary, pattern: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)' };
      case 'Change Window': return { bg: chartColors.surface, color: chartColors.text.primary, pattern: '' };
      default: return { bg: chartColors.background, color: chartColors.text.primary, pattern: '' };
    }
  };

  const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month - 1 && today.getDate() === day;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '1.5rem', backgroundColor: chartColors.background }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: chartColors.text.primary }}>
        Production Freeze Calendar
      </h2>
      <p style={{ fontSize: '0.875rem', color: chartColors.text.secondary, marginBottom: '1.5rem' }}>
        Blackout periods and change windows • {monthName} {year}
      </p>

      {/* Calendar Grid */}
      <div style={{ border: `1px solid ${chartColors.border}`, marginBottom: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: chartColors.surface }}>
          {daysOfWeek.map(day => (
            <div key={day} style={{ padding: '0.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.75rem', borderBottom: `2px solid ${chartColors.text.primary}` }}>
              {day}
            </div>
          ))}
        </div>
        {/* Days */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {calendarDays.map((day, idx) => {
            const freezes = day ? getDayFreezes(day) : [];
            const hardFreeze = freezes.find(f => f.type === 'Hard Freeze');
            const softFreeze = freezes.find(f => f.type === 'Soft Freeze');
            const changeWindow = freezes.find(f => f.type === 'Change Window');

            return (
              <div 
                key={idx}
                style={{ 
                  minHeight: '80px',
                  padding: '0.5rem',
                  borderRight: (idx + 1) % 7 !== 0 ? `1px solid ${chartColors.border}` : 'none',
                  borderBottom: `1px solid ${chartColors.border}`,
                  backgroundColor: hardFreeze ? chartColors.text.primary : softFreeze ? chartColors.gray[300] : chartColors.background,
                }}
              >
                {day && (
                  <>
                    <div style={{ 
                      fontWeight: isToday(day) ? 700 : 400, 
                      fontSize: '0.875rem',
                      color: hardFreeze ? chartColors.background : chartColors.text.primary,
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      {day}
                      {isToday(day) && <span style={{ fontSize: '0.6rem', backgroundColor: hardFreeze ? chartColors.background : chartColors.text.primary, color: hardFreeze ? chartColors.text.primary : chartColors.background, padding: '0.1rem 0.3rem' }}>TODAY</span>}
                    </div>
                    {freezes.map(f => (
                      <div 
                        key={f.id}
                        style={{ 
                          fontSize: '0.6rem', 
                          padding: '0.15rem 0.25rem',
                          marginBottom: '0.15rem',
                          backgroundColor: f.type === 'Hard Freeze' ? chartColors.background : f.type === 'Change Window' ? chartColors.surface : 'transparent',
                          color: f.type === 'Hard Freeze' ? chartColors.text.primary : chartColors.text.primary,
                          border: f.type === 'Change Window' ? `1px solid ${chartColors.text.primary}` : 'none',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={`${f.name}: ${f.reason}`}
                      >
                        {f.type === 'Change Window' ? '✓ ' : ''}{f.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1.5rem', height: '1rem', backgroundColor: chartColors.text.primary }} />
          <span>Hard Freeze (No Changes)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1.5rem', height: '1rem', backgroundColor: chartColors.gray[300] }} />
          <span>Soft Freeze (Emergency Only)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1.5rem', height: '1rem', backgroundColor: chartColors.surface, border: `1px solid ${chartColors.text.primary}` }} />
          <span>Change Window (Approved)</span>
        </div>
      </div>

      {/* Freeze Details */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ backgroundColor: chartColors.surface }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Freeze Window</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Type</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Dates</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Systems</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: `2px solid ${chartColors.text.primary}` }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {data.map((f, idx) => {
            const style = getTypeStyle(f.type);
            return (
              <tr key={f.id} style={{ backgroundColor: idx % 2 === 0 ? chartColors.background : chartColors.surface }}>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{f.name}</td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: style.bg, color: style.color, fontSize: '0.7rem' }}>
                    {f.type}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}`, fontFamily: 'monospace' }}>
                  {f.startDate === f.endDate ? f.startDate : `${f.startDate} → ${f.endDate}`}
                </td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{f.systems.join(', ')}</td>
                <td style={{ padding: '0.5rem', borderBottom: `1px solid ${chartColors.border}` }}>{f.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionFreezeCalendar;
