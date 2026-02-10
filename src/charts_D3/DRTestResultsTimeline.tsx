"use client";
import React from 'react';
import { chartColors, chartTypography } from './colors';

// DR Test Results Timeline - Disaster recovery validation history
const defaultData = {
  lastTest: '2024-11-15',
  nextScheduled: '2025-02-15',
  overallStatus: 'passing',
  targetRTO: 4, // hours
  targetRPO: 1, // hour
  tests: [
    { 
      date: '2024-11-15', 
      type: 'Full DR', 
      status: 'passed',
      rtoActual: 3.2,
      rpoActual: 0.5,
      systemsRecovered: 24,
      systemsTotal: 24,
      duration: 4.5,
      findings: 2,
    },
    { 
      date: '2024-08-12', 
      type: 'Full DR', 
      status: 'passed',
      rtoActual: 3.8,
      rpoActual: 0.8,
      systemsRecovered: 24,
      systemsTotal: 24,
      duration: 5.2,
      findings: 3,
    },
    { 
      date: '2024-05-10', 
      type: 'Full DR', 
      status: 'partial',
      rtoActual: 5.1,
      rpoActual: 1.2,
      systemsRecovered: 22,
      systemsTotal: 24,
      duration: 6.8,
      findings: 5,
    },
    { 
      date: '2024-02-08', 
      type: 'Full DR', 
      status: 'passed',
      rtoActual: 3.5,
      rpoActual: 0.6,
      systemsRecovered: 23,
      systemsTotal: 23,
      duration: 4.8,
      findings: 2,
    },
  ],
  tabletopExercises: [
    { date: '2024-10-20', scenario: 'Ransomware Attack', participants: 18, status: 'completed' },
    { date: '2024-07-15', scenario: 'Cloud Region Failure', participants: 22, status: 'completed' },
    { date: '2024-04-10', scenario: 'Data Center Loss', participants: 15, status: 'completed' },
  ],
  systemsStatus: [
    { system: 'ML Platform', rtoTarget: 2, rtoActual: 1.8, status: 'passing' },
    { system: 'Model Registry', rtoTarget: 1, rtoActual: 0.8, status: 'passing' },
    { system: 'Feature Store', rtoTarget: 2, rtoActual: 2.1, status: 'at-risk' },
    { system: 'Inference APIs', rtoTarget: 0.5, rtoActual: 0.4, status: 'passing' },
    { system: 'Data Pipeline', rtoTarget: 4, rtoActual: 3.2, status: 'passing' },
  ],
  openFindings: [
    { id: 'DR-2024-01', finding: 'Feature Store replication lag', severity: 'medium', status: 'remediation' },
    { id: 'DR-2024-02', finding: 'Runbook documentation gaps', severity: 'low', status: 'open' },
  ],
};

interface DRTestResultsTimelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DRTestResultsTimeline: React.FC<DRTestResultsTimelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "DR Test Results Timeline"
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'passed': case 'passing': return { bg: '#e8e8e8', color: '#333' };
      case 'partial': case 'at-risk': return { bg: '#666', color: '#fff' };
      case 'failed': return { bg: '#333', color: '#fff' };
      default: return { bg: '#f0f0f0', color: '#666' };
    }
  };

  const daysUntilNext = Math.ceil((new Date(data.nextScheduled).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div style={{
      fontFamily: chartTypography.fontFamily,
      background: chartColors.white,
      border: `1px solid ${chartColors.border}`,
      width,
      minHeight: height,
      padding: '1.5rem',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: chartColors.primary }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: '#666' }}>Business continuity validation</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem 0.75rem', background: '#f8f8f8', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{daysUntilNext}</div>
              <div style={{ fontSize: 8, color: '#666', textTransform: 'uppercase' }}>Days to Next</div>
            </div>
            <div style={{
              padding: '0.5rem 0.75rem',
              ...getStatusStyle(data.overallStatus),
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{data.overallStatus}</div>
            </div>
          </div>
        </div>
      </div>

      {/* RTO/RPO Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ background: chartColors.primary, color: '#fff', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.tests[0].rtoActual}h</div>
          <div style={{ fontSize: 9, color: '#ccc' }}>Last RTO</div>
          <div style={{ fontSize: 8, color: '#aaa' }}>Target: {data.targetRTO}h</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.tests[0].rpoActual}h</div>
          <div style={{ fontSize: 9, color: '#666' }}>Last RPO</div>
          <div style={{ fontSize: 8, color: '#888' }}>Target: {data.targetRPO}h</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.tests[0].systemsRecovered}/{data.tests[0].systemsTotal}</div>
          <div style={{ fontSize: 9, color: '#666' }}>Systems</div>
        </div>
        <div style={{ background: '#f8f8f8', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{data.openFindings.length}</div>
          <div style={{ fontSize: 9, color: '#666' }}>Open Findings</div>
        </div>
      </div>

      {/* Test Timeline */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Test History</div>
        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          <div style={{ position: 'absolute', left: '0.4rem', top: 0, bottom: 0, width: 2, background: '#ddd' }} />
          {data.tests.map((test, i) => {
            const style = getStatusStyle(test.status);
            return (
              <div key={i} style={{ position: 'relative', paddingBottom: '0.75rem' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.25rem',
                  top: '0.35rem',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: style.bg,
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px #ddd',
                }} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  background: '#f8f8f8',
                  marginLeft: '0.5rem',
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{test.type}</div>
                    <div style={{ fontSize: 10, color: '#888' }}>{test.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: 10 }}>
                    <span>RTO: {test.rtoActual}h</span>
                    <span>RPO: {test.rpoActual}h</span>
                    <span>{test.systemsRecovered}/{test.systemsTotal} systems</span>
                    <span style={{
                      padding: '0.1rem 0.35rem',
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: style.bg,
                      color: style.color,
                    }}>
                      {test.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Systems & Findings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Critical Systems */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>System Recovery Status</div>
          {data.systemsStatus.map((sys, i) => {
            const style = getStatusStyle(sys.status);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.35rem 0', borderBottom: '1px solid #f0f0f0', fontSize: 10 }}>
                <span style={{ flex: 1 }}>{sys.system}</span>
                <span style={{ width: 50 }}>RTO: {sys.rtoActual}h</span>
                <span style={{
                  padding: '0.1rem 0.3rem',
                  fontSize: 8,
                  background: style.bg,
                  color: style.color,
                }}>
                  {sys.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tabletop Exercises */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '0.5rem' }}>Tabletop Exercises</div>
          {data.tabletopExercises.map((ex, i) => (
            <div key={i} style={{ padding: '0.35rem 0', borderBottom: '1px solid #f0f0f0', fontSize: 10 }}>
              <div style={{ fontWeight: 500 }}>{ex.scenario}</div>
              <div style={{ color: '#888' }}>{ex.date} • {ex.participants} participants</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DRTestResultsTimeline;
