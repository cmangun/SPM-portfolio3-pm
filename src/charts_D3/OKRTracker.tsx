"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { chartColors } from './colors';

// Icon mapping to SVG files in /assets/img/svg-icons/
const iconPaths: Record<string, string> = {
  'dollar': '/assets/img/svg-icons/Dollar.svg',
  'rocket': '/assets/img/svg-icons/Trend Up 1.svg',
  'zap': '/assets/img/svg-icons/Charge.svg',
  'users': '/assets/img/svg-icons/User Profile 1.svg',
  'trending': '/assets/img/svg-icons/Chart Statistics 1.svg',
  'shield': '/assets/img/svg-icons/Shield Checkmark.svg',
  'target': '/assets/img/svg-icons/Target 1.svg',
  'settings': '/assets/img/svg-icons/Settings 1.svg',
};

// OKR Tracker data
const defaultData = {
  period: 'Q4 2024',
  company: 'DataFlow AI',
  overallProgress: 72,
  objectives: [
    {
      id: 'obj-1',
      title: 'Accelerate Enterprise Revenue Growth',
      owner: 'Sarah Chen',
      ownerRole: 'CRO',
      icon: 'dollar',
      color: chartColors.primary,
      confidence: 85,
      keyResults: [
        { id: 'kr-1-1', title: 'Achieve $8M in new ARR', current: 6.2, target: 8, unit: '$M', status: 'on-track' },
        { id: 'kr-1-2', title: 'Close 12 Enterprise deals (>$100K)', current: 9, target: 12, unit: 'deals', status: 'on-track' },
        { id: 'kr-1-3', title: 'Reduce sales cycle to 45 days', current: 52, target: 45, unit: 'days', status: 'at-risk', inverse: true },
        { id: 'kr-1-4', title: 'Expand NRR to 125%', current: 118, target: 125, unit: '%', status: 'behind' },
      ],
    },
    {
      id: 'obj-2',
      title: 'Launch Self-Serve Product Tier',
      owner: 'Mike Johnson',
      ownerRole: 'CPO',
      icon: 'rocket',
      color: chartColors.navy,
      confidence: 70,
      keyResults: [
        { id: 'kr-2-1', title: 'Ship PLG onboarding flow', current: 100, target: 100, unit: '%', status: 'complete' },
        { id: 'kr-2-2', title: 'Acquire 500 self-serve signups', current: 342, target: 500, unit: 'signups', status: 'on-track' },
        { id: 'kr-2-3', title: 'Convert 10% to paid', current: 6.8, target: 10, unit: '%', status: 'at-risk' },
        { id: 'kr-2-4', title: 'Achieve <2min time-to-value', current: 3.2, target: 2, unit: 'min', status: 'behind', inverse: true },
      ],
    },
    {
      id: 'obj-3',
      title: 'Scale Platform Reliability',
      owner: 'David Park',
      ownerRole: 'CTO',
      icon: 'zap',
      color: chartColors.primary,
      confidence: 90,
      keyResults: [
        { id: 'kr-3-1', title: 'Maintain 99.95% uptime', current: 99.97, target: 99.95, unit: '%', status: 'complete' },
        { id: 'kr-3-2', title: 'Reduce p99 latency to <100ms', current: 87, target: 100, unit: 'ms', status: 'complete', inverse: true },
        { id: 'kr-3-3', title: 'Zero Sev-1 incidents', current: 1, target: 0, unit: 'incidents', status: 'at-risk', inverse: true },
        { id: 'kr-3-4', title: 'Achieve SOC2 Type II cert', current: 85, target: 100, unit: '%', status: 'on-track' },
      ],
    },
    {
      id: 'obj-4',
      title: 'Build World-Class Team',
      owner: 'Lisa Wong',
      ownerRole: 'CHRO',
      icon: 'users',
      color: chartColors.secondary,
      confidence: 75,
      keyResults: [
        { id: 'kr-4-1', title: 'Hire 15 engineers', current: 11, target: 15, unit: 'hires', status: 'on-track' },
        { id: 'kr-4-2', title: 'Achieve eNPS >50', current: 42, target: 50, unit: 'score', status: 'at-risk' },
        { id: 'kr-4-3', title: 'Reduce attrition to <10%', current: 12, target: 10, unit: '%', status: 'at-risk', inverse: true },
        { id: 'kr-4-4', title: 'Complete 100% manager training', current: 78, target: 100, unit: '%', status: 'on-track' },
      ],
    },
  ],
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  'complete': { color: chartColors.primary, bg: chartColors.light, label: 'Complete' },
  'on-track': { color: chartColors.primary, bg: chartColors.light, label: 'On Track' },
  'at-risk': { color: chartColors.secondary, bg: chartColors.light, label: 'At Risk' },
  'behind': { color: chartColors.dark, bg: chartColors.light, label: 'Behind' },
};

interface OKRTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const OKRTracker: React.FC<OKRTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "OKR Tracker"
}) => {
  const [expandedObjective, setExpandedObjective] = useState<string | null>(data.objectives[0].id);
  const [viewMode, setViewMode] = useState<'progress' | 'confidence'>('progress');

  const calculateProgress = (kr: typeof data.objectives[0]['keyResults'][0]) => {
    if (kr.inverse) {
      const improvement = (kr.target - kr.current) / kr.target;
      return Math.max(0, Math.min(100, 100 - (improvement * 100)));
    }
    return Math.min(100, (kr.current / kr.target) * 100);
  };

  const getObjectiveProgress = (obj: typeof data.objectives[0]) => {
    const total = obj.keyResults.reduce((sum, kr) => sum + calculateProgress(kr), 0);
    return Math.round(total / obj.keyResults.length);
  };

  const renderIcon = (iconName: string) => {
    const iconPath = iconPaths[iconName] || iconPaths['target'];
    return (
      <Image 
        src={iconPath} 
        alt={iconName} 
        width={20} 
        height={20} 
        style={{ filter: 'brightness(0) saturate(100%)' }}
      />
    );
  };

  return (
    <>
      <style jsx>{`
        .okr-container {
          width: 100%;
        }
        .okr-status-summary {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .okr-status-item {
          flex: 1;
          min-width: 60px;
          padding: 8px;
          border-radius: 6px;
          text-align: center;
        }
        .okr-status-count {
          font-size: 18px;
          font-weight: 700;
        }
        .okr-status-label {
          font-size: 9px;
        }
        .okr-objectives {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .okr-objective-card {
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.15s;
        }
        .okr-objective-header {
          padding: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .okr-icon-wrapper {
          width: 36px;
          height: 36px;
          min-width: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .okr-objective-info {
          flex: 1;
          min-width: 0;
        }
        .okr-objective-title {
          font-size: 12px;
          font-weight: 600;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .okr-objective-owner {
          font-size: 10px;
        }
        .okr-progress-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .okr-progress-bar-container {
          width: 80px;
          height: 8px;
          border-radius: 4px;
        }
        .okr-progress-value {
          font-size: 12px;
          font-weight: 600;
          width: 36px;
        }
        .okr-confidence-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }
        .okr-expand-icon {
          font-size: 12px;
          transition: transform 0.2s;
        }
        .okr-key-results {
          padding: 0 12px 12px;
          background-color: white;
        }
        .okr-kr-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
        }
        .okr-kr-dot {
          width: 8px;
          height: 8px;
          min-width: 8px;
          border-radius: 50%;
        }
        .okr-kr-info {
          flex: 1;
          min-width: 0;
        }
        .okr-kr-title {
          font-size: 11px;
          word-wrap: break-word;
        }
        .okr-kr-values {
          font-size: 10px;
        }
        .okr-kr-progress {
          width: 100px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .okr-kr-bar {
          flex: 1;
          height: 6px;
          border-radius: 3px;
        }
        .okr-kr-percent {
          font-size: 10px;
          width: 30px;
        }
        .okr-toggle-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
        }
        .okr-toggle-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          text-transform: capitalize;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .okr-status-summary {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }
          .okr-status-item {
            min-width: auto;
            padding: 6px;
          }
          .okr-status-count {
            font-size: 16px;
          }
          .okr-status-label {
            font-size: 8px;
          }
          .okr-objective-header {
            padding: 10px;
            gap: 8px;
            flex-wrap: wrap;
          }
          .okr-icon-wrapper {
            width: 32px;
            height: 32px;
            min-width: 32px;
          }
          .okr-objective-title {
            font-size: 11px;
            line-height: 1.3;
          }
          .okr-objective-owner {
            font-size: 9px;
          }
          .okr-progress-wrapper {
            order: 4;
            width: 100%;
            margin-top: 8px;
            padding-left: 40px;
          }
          .okr-progress-bar-container {
            flex: 1;
            width: auto;
          }
          .okr-confidence-badge {
            order: 4;
            width: 100%;
            margin-top: 8px;
            margin-left: 40px;
            text-align: center;
          }
          .okr-expand-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          .okr-objective-card {
            position: relative;
          }
          .okr-kr-item {
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px 0;
          }
          .okr-kr-progress {
            width: 100%;
            margin-left: 16px;
          }
        }
      `}</style>
      
      <div className="okr-container">
        {/* Status Summary */}
        <div className="okr-status-summary">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = data.objectives.flatMap(o => o.keyResults).filter(kr => kr.status === status).length;
            return (
              <div 
                key={status} 
                className="okr-status-item"
                style={{ backgroundColor: config.bg }}
              >
                <div className="okr-status-count" style={{ color: config.color }}>{count}</div>
                <div className="okr-status-label" style={{ color: config.color }}>{config.label}</div>
              </div>
            );
          })}
        </div>

        {/* Objectives */}
        <div className="okr-objectives">
          {data.objectives.map((obj) => {
            const isExpanded = expandedObjective === obj.id;
            const progress = getObjectiveProgress(obj);
            
            return (
              <div
                key={obj.id}
                className="okr-objective-card"
                style={{ border: `2px solid ${isExpanded ? obj.color : chartColors.light}` }}
              >
                {/* Objective Header */}
                <div
                  className="okr-objective-header"
                  onClick={() => setExpandedObjective(isExpanded ? null : obj.id)}
                  style={{ backgroundColor: isExpanded ? `${obj.color}10` : 'white' }}
                >
                  <div className="okr-icon-wrapper" style={{ backgroundColor: chartColors.light }}>
                    {renderIcon(obj.icon)}
                  </div>
                  
                  <div className="okr-objective-info">
                    <div className="okr-objective-title" style={{ color: chartColors.charcoal }}>
                      {obj.title}
                    </div>
                    <div className="okr-objective-owner" style={{ color: chartColors.gray }}>
                      {obj.owner} • {obj.ownerRole}
                    </div>
                  </div>

                  {viewMode === 'progress' ? (
                    <div className="okr-progress-wrapper">
                      <div className="okr-progress-bar-container" style={{ backgroundColor: chartColors.light }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: obj.color,
                          borderRadius: '4px',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <span className="okr-progress-value" style={{ color: obj.color }}>
                        {progress}%
                      </span>
                    </div>
                  ) : (
                    <div 
                      className="okr-confidence-badge"
                      style={{
                        backgroundColor: chartColors.light,
                        color: obj.confidence >= 80 ? chartColors.navy : chartColors.dark
                      }}
                    >
                      {obj.confidence}% confident
                    </div>
                  )}

                  <span 
                    className="okr-expand-icon"
                    style={{ 
                      color: chartColors.gray,
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  >
                    ▶
                  </span>
                </div>

                {/* Key Results */}
                {isExpanded && (
                  <div className="okr-key-results">
                    {obj.keyResults.map((kr) => {
                      const krProgress = calculateProgress(kr);
                      const statusStyle = statusConfig[kr.status];
                      
                      return (
                        <div 
                          key={kr.id} 
                          className="okr-kr-item"
                          style={{ borderBottom: `1px solid ${chartColors.light}` }}
                        >
                          <div 
                            className="okr-kr-dot"
                            style={{ backgroundColor: statusStyle.color }}
                          />
                          
                          <div className="okr-kr-info">
                            <div className="okr-kr-title" style={{ color: chartColors.charcoal }}>
                              {kr.title}
                            </div>
                            <div className="okr-kr-values" style={{ color: chartColors.gray }}>
                              {kr.current} / {kr.target} {kr.unit}
                            </div>
                          </div>

                          <div className="okr-kr-progress">
                            <div className="okr-kr-bar" style={{ backgroundColor: chartColors.light }}>
                              <div style={{
                                width: `${krProgress}%`,
                                height: '100%',
                                backgroundColor: statusStyle.color,
                                borderRadius: '3px'
                              }} />
                            </div>
                            <span className="okr-kr-percent" style={{ color: statusStyle.color }}>
                              {Math.round(krProgress)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="okr-toggle-buttons">
          {(['progress', 'confidence'] as const).map((mode) => (
            <button
              key={mode}
              className="okr-toggle-btn"
              onClick={() => setViewMode(mode)}
              style={{
                backgroundColor: viewMode === mode ? chartColors.primary : chartColors.light,
                color: viewMode === mode ? 'white' : chartColors.gray,
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default OKRTracker;
