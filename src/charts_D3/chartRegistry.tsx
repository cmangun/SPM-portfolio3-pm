// src/charts_D3/chartRegistry.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// CHART REGISTRY — Maps chartKeys to chart configs
// Used by CaseStudyTemplate to render charts from section.chartKeys
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';

// Import chart components
import FunnelChart from './FunnelChart';
import GanttChart from './GanttChart';
import WaterfallChart from './WaterfallChart';
import CalendarHeatmap from './CalendarHeatmap';
import RAGPipeline from './RAGPipeline';
import SystemContextDiagram from './SystemContextDiagram';
import ServiceHealthDashboard from './ServiceHealthDashboard';
import CustomerJourneyMap from './CustomerJourneyMap';
import ModelCard from './ModelCard';
import LatencyPercentiles from './LatencyPercentiles';
import DataQualityScorecard from './DataQualityScorecard';
import OrgHealthDashboard from './OrgHealthDashboard';
import UnitEconomics from './UnitEconomics';
import SparklineGrid from './SparklineGrid';
import RACIMatrix from './RACIMatrix';
import RiskRegister from './RiskRegister';
import DataLineageDAG from './DataLineageDAG';
import BusinessModelCanvas from './BusinessModelCanvas';
import PatientJourneySankey from './PatientJourneySankey';
import MLPipeline from './MLPipeline';
import CICDPipeline from './CICDPipeline';
import ErrorBudgetTracker from './ErrorBudgetTracker';
import OKRTracker from './OKRTracker';
import HCPEngagementFunnel from './HCPEngagementFunnel';
import ModelRegistry from './ModelRegistry';
import ProjectPlanChart from './ProjectPlanChart';
import LayerModelChart from './LayerModelChart';

// Enterprise Charts - Compliance & Governance
import FinOpsShowback from './FinOpsShowback';
import DecisionConfidenceDistribution from './DecisionConfidenceDistribution';
import HumanModelAgreement from './HumanModelAgreement';
import ReviewLatencyPercentiles from './ReviewLatencyPercentiles';
import ChangeAdvisoryBoard from './ChangeAdvisoryBoard';
import ProductionFreezeCalendar from './ProductionFreezeCalendar';
import RollbackFrequencyTrend from './RollbackFrequencyTrend';
import APIDependencyMap from './APIDependencyMap';
import ConsentManagement from './ConsentManagement';
import DataRetentionCompliance from './DataRetentionCompliance';
import SchemaDriftTracker from './SchemaDriftTracker';
import DataFreshnessMonitor from './DataFreshnessMonitor';
import RTORPOCompliance from './RTORPOCompliance';
import FailoverEventLog from './FailoverEventLog';
import BusinessContinuityScorecard from './BusinessContinuityScorecard';
import AIInvestmentPortfolio from './AIInvestmentPortfolio';
import StrategicInitiativeTracker from './StrategicInitiativeTracker';
import QuarterlyBusinessReview from './QuarterlyBusinessReview';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface ChartConfig {
  key: string;
  title: string;
  subtitle?: string;
  phase: 'diagnose' | 'architect' | 'engineer' | 'enable' | 'impact' | 'any';
  tags?: string[];
  // Component factory: receives chart data, returns rendered component
  render: (data: unknown) => React.ReactNode;
}

export type ChartRegistry = Record<string, ChartConfig>;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART REGISTRY — All available charts for case studies
// ═══════════════════════════════════════════════════════════════════════════════

export const chartRegistry: ChartRegistry = {
  // ─────────────────────────────────────────────────────────────────────────────
  // DIAGNOSE PHASE CHARTS
  // ─────────────────────────────────────────────────────────────────────────────
  FunnelChart: {
    key: 'FunnelChart',
    title: 'Content Funnel – Draft → Approved',
    subtitle: 'Track volume and drop-off across workflow stages',
    phase: 'diagnose',
    tags: ['pipeline', 'volume', 'conversion'],
    render: (data) => <FunnelChart data={data as unknown[]} />,
  },
  RACIMatrix: {
    key: 'RACIMatrix',
    title: 'RACI Accountability Matrix',
    subtitle: 'Who owns what across workstreams',
    phase: 'diagnose',
    tags: ['governance', 'accountability', 'ownership'],
    render: (data) => <RACIMatrix data={data as Record<string, unknown>} />,
  },
  ProjectPlanChart: {
    key: 'ProjectPlanChart',
    title: 'Project Plan',
    subtitle: '6-phase execution roadmap with tasks and deliverables',
    phase: 'diagnose',
    tags: ['planning', 'roadmap', 'execution'],
    render: (data) => <ProjectPlanChart data={data as Record<string, unknown>} />,
  },
  RiskRegister: {
    key: 'RiskRegister',
    title: 'Risk Register',
    subtitle: 'Identified risks with severity and mitigation',
    phase: 'diagnose',
    tags: ['risk', 'governance', 'compliance'],
    render: (data) => <RiskRegister data={data as Record<string, unknown>} />,
  },
  CalendarHeatmap: {
    key: 'CalendarHeatmap',
    title: 'Production Volume Heatmap',
    subtitle: 'Daily activity patterns across the year',
    phase: 'diagnose',
    tags: ['seasonality', 'volume', 'patterns'],
    render: (data) => {
      // CalendarHeatmap expects data.data (array of {date, value})
      const heatmapData = data as { year?: number; title?: string; metric?: string; data?: { date: string; value: number }[] };
      return <CalendarHeatmap data={heatmapData.data} title={heatmapData.title} />;
    },
  },
  DataLineageDAG: {
    key: 'DataLineageDAG',
    title: 'Data Lineage DAG',
    subtitle: 'How data flows through the system',
    phase: 'diagnose',
    tags: ['data', 'architecture', 'lineage'],
    render: (data) => <DataLineageDAG data={data as Record<string, unknown>} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARCHITECT PHASE CHARTS
  // ─────────────────────────────────────────────────────────────────────────────
  SystemContextDiagram: {
    key: 'SystemContextDiagram',
    title: 'System Context (C4)',
    subtitle: 'Users, systems, and integration boundaries',
    phase: 'architect',
    tags: ['architecture', 'c4', 'context'],
    render: (data) => <SystemContextDiagram data={data as Record<string, unknown>} />,
  },
  RAGPipeline: {
    key: 'RAGPipeline',
    title: 'RAG Pipeline Architecture',
    subtitle: 'Ingestion → Indexing → Retrieval → Response',
    phase: 'architect',
    tags: ['rag', 'ai', 'architecture'],
    render: (data) => <RAGPipeline data={data as Record<string, unknown>} />,
  },
  LayerModelChart: {
    key: 'LayerModelChart',
    title: 'Layer Model',
    subtitle: 'Architecture stack from identity to experience',
    phase: 'architect',
    tags: ['architecture', 'layers', 'stack'],
    render: (data) => <LayerModelChart data={data as Record<string, unknown>} />,
  },
  GanttChart: {
    key: 'GanttChart',
    title: 'Implementation Timeline',
    subtitle: 'Project phases and milestones',
    phase: 'architect',
    tags: ['timeline', 'planning', 'milestones'],
    render: (data) => <GanttChart data={data as unknown[]} />,
  },
  ModelCard: {
    key: 'ModelCard',
    title: 'Model Card',
    subtitle: 'Model documentation, guardrails, and limitations',
    phase: 'architect',
    tags: ['ai', 'documentation', 'governance'],
    render: (data) => <ModelCard data={data as Record<string, unknown>} />,
  },
  BusinessModelCanvas: {
    key: 'BusinessModelCanvas',
    title: 'Business Model Canvas',
    subtitle: 'Value proposition and operating model',
    phase: 'architect',
    tags: ['strategy', 'business', 'value'],
    render: (data) => <BusinessModelCanvas data={data as Record<string, unknown>} />,
  },
  MLPipeline: {
    key: 'MLPipeline',
    title: 'ML Pipeline Architecture',
    subtitle: 'Training → Validation → Deployment',
    phase: 'architect',
    tags: ['ml', 'architecture', 'pipeline'],
    render: (data) => <MLPipeline data={data as Record<string, unknown>} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENGINEER PHASE CHARTS
  // ─────────────────────────────────────────────────────────────────────────────
  ServiceHealthDashboard: {
    key: 'ServiceHealthDashboard',
    title: 'Service Health Dashboard',
    subtitle: 'Uptime, latency, error rates across services',
    phase: 'engineer',
    tags: ['sre', 'health', 'monitoring'],
    render: (data) => <ServiceHealthDashboard data={data as Record<string, unknown>} />,
  },
  LatencyPercentiles: {
    key: 'LatencyPercentiles',
    title: 'Latency Percentiles',
    subtitle: 'p50, p95, p99 response times over time',
    phase: 'engineer',
    tags: ['sre', 'latency', 'performance'],
    render: (data) => <LatencyPercentiles data={data as Record<string, unknown>} />,
  },
  DataQualityScorecard: {
    key: 'DataQualityScorecard',
    title: 'Data Quality Scorecard',
    subtitle: 'Freshness, accuracy, and completeness metrics',
    phase: 'engineer',
    tags: ['data', 'quality', 'observability'],
    render: (data) => <DataQualityScorecard data={data as Record<string, unknown>} />,
  },
  CICDPipeline: {
    key: 'CICDPipeline',
    title: 'CI/CD Pipeline',
    subtitle: 'Build, test, deploy stages and health',
    phase: 'engineer',
    tags: ['devops', 'cicd', 'deployment'],
    render: (data) => <CICDPipeline data={data as Record<string, unknown>} />,
  },
  ErrorBudgetTracker: {
    key: 'ErrorBudgetTracker',
    title: 'Error Budget Tracker',
    subtitle: 'SLO consumption and remaining budget',
    phase: 'engineer',
    tags: ['sre', 'slo', 'reliability'],
    render: (data) => <ErrorBudgetTracker data={data as Record<string, unknown>} />,
  },
  ModelRegistry: {
    key: 'ModelRegistry',
    title: 'Model Registry',
    subtitle: 'Deployed models, versions, and status',
    phase: 'engineer',
    tags: ['ml', 'mlops', 'registry'],
    render: (data) => <ModelRegistry data={data as Record<string, unknown>} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENABLE PHASE CHARTS
  // ─────────────────────────────────────────────────────────────────────────────
  CustomerJourneyMap: {
    key: 'CustomerJourneyMap',
    title: 'Customer Journey Map',
    subtitle: 'User experience across touchpoints',
    phase: 'enable',
    tags: ['ux', 'journey', 'adoption'],
    render: (data) => <CustomerJourneyMap data={data as Record<string, unknown>} />,
  },
  OrgHealthDashboard: {
    key: 'OrgHealthDashboard',
    title: 'Org Health Dashboard',
    subtitle: 'Team adoption, engagement, and satisfaction',
    phase: 'enable',
    tags: ['adoption', 'engagement', 'org'],
    render: (data) => <OrgHealthDashboard data={data as Record<string, unknown>} />,
  },
  PatientJourneySankey: {
    key: 'PatientJourneySankey',
    title: 'Patient Journey Sankey',
    subtitle: 'Flow through treatment stages',
    phase: 'enable',
    tags: ['healthcare', 'journey', 'flow'],
    render: (data) => <PatientJourneySankey data={data as Record<string, unknown>} />,
  },
  HCPEngagementFunnel: {
    key: 'HCPEngagementFunnel',
    title: 'HCP Engagement Funnel',
    subtitle: 'Healthcare provider adoption stages',
    phase: 'enable',
    tags: ['healthcare', 'hcp', 'adoption'],
    render: (data) => <HCPEngagementFunnel data={data as Record<string, unknown>} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // IMPACT PHASE CHARTS
  // ─────────────────────────────────────────────────────────────────────────────
  WaterfallChart: {
    key: 'WaterfallChart',
    title: 'ROI Waterfall',
    subtitle: 'Cost breakdown and savings attribution',
    phase: 'impact',
    tags: ['roi', 'savings', 'finance'],
    render: (data) => <WaterfallChart data={data as unknown[]} />,
  },
  UnitEconomics: {
    key: 'UnitEconomics',
    title: 'Unit Economics',
    subtitle: 'LTV, CAC, payback, and margins',
    phase: 'impact',
    tags: ['finance', 'economics', 'roi'],
    render: (data) => <UnitEconomics data={data as Record<string, unknown>} />,
  },
  SparklineGrid: {
    key: 'SparklineGrid',
    title: 'KPI Trend Grid',
    subtitle: 'Key metrics over time with sparklines',
    phase: 'impact',
    tags: ['kpi', 'trends', 'metrics'],
    render: (data) => <SparklineGrid data={data as unknown[]} />,
  },
  OKRTracker: {
    key: 'OKRTracker',
    title: 'OKR Tracker',
    subtitle: 'Objectives and key results progress',
    phase: 'impact',
    tags: ['okr', 'goals', 'progress'],
    render: (data) => <OKRTracker data={data as Record<string, unknown>} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - COST GOVERNANCE
  // ─────────────────────────────────────────────────────────────────────────────
  FinOpsShowback: {
    key: 'FinOpsShowback',
    title: 'FinOps Showback Report',
    subtitle: 'AI/ML cost allocation by cost center',
    phase: 'enable',
    tags: ['finops', 'cost', 'allocation', 'enterprise'],
    render: (data) => <FinOpsShowback data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - HUMAN-IN-THE-LOOP OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  DecisionConfidenceDistribution: {
    key: 'DecisionConfidenceDistribution',
    title: 'Decision Confidence Distribution',
    subtitle: 'Model confidence histogram with human review thresholds',
    phase: 'engineer',
    tags: ['hitl', 'confidence', 'threshold', 'enterprise'],
    render: (data) => <DecisionConfidenceDistribution data={data as unknown[]} />,
  },
  HumanModelAgreement: {
    key: 'HumanModelAgreement',
    title: 'Human-Model Agreement Rate',
    subtitle: 'Calibration tracking and override analysis',
    phase: 'engineer',
    tags: ['hitl', 'agreement', 'calibration', 'enterprise'],
    render: (data) => <HumanModelAgreement data={data as unknown[]} />,
  },
  ReviewLatencyPercentiles: {
    key: 'ReviewLatencyPercentiles',
    title: 'Review Latency Percentiles',
    subtitle: 'Time-to-human-decision SLA compliance',
    phase: 'engineer',
    tags: ['hitl', 'latency', 'sla', 'enterprise'],
    render: (data) => <ReviewLatencyPercentiles data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - CHANGE MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────────
  ChangeAdvisoryBoard: {
    key: 'ChangeAdvisoryBoard',
    title: 'Change Advisory Board Pipeline',
    subtitle: 'CAB approval funnel and change request status',
    phase: 'engineer',
    tags: ['cab', 'change', 'approval', 'enterprise'],
    render: (data) => <ChangeAdvisoryBoard data={data as unknown[]} />,
  },
  ProductionFreezeCalendar: {
    key: 'ProductionFreezeCalendar',
    title: 'Production Freeze Calendar',
    subtitle: 'Blackout periods and change windows',
    phase: 'engineer',
    tags: ['freeze', 'blackout', 'calendar', 'enterprise'],
    render: (data) => <ProductionFreezeCalendar data={data as unknown[]} />,
  },
  RollbackFrequencyTrend: {
    key: 'RollbackFrequencyTrend',
    title: 'Rollback Frequency Trend',
    subtitle: 'Production stability and MTTR tracking',
    phase: 'engineer',
    tags: ['rollback', 'stability', 'mttr', 'enterprise'],
    render: (data) => <RollbackFrequencyTrend data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - VENDOR & THIRD-PARTY
  // ─────────────────────────────────────────────────────────────────────────────
  APIDependencyMap: {
    key: 'APIDependencyMap',
    title: 'API Dependency Map',
    subtitle: 'External service dependencies and health',
    phase: 'architect',
    tags: ['api', 'dependency', 'vendor', 'enterprise'],
    render: (data) => <APIDependencyMap data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - DATA GOVERNANCE
  // ─────────────────────────────────────────────────────────────────────────────
  ConsentManagement: {
    key: 'ConsentManagement',
    title: 'Consent Management Dashboard',
    subtitle: 'GDPR/CCPA consent rates and DSAR tracking',
    phase: 'enable',
    tags: ['consent', 'gdpr', 'ccpa', 'privacy', 'enterprise'],
    render: (data) => <ConsentManagement data={data as unknown[]} />,
  },
  DataRetentionCompliance: {
    key: 'DataRetentionCompliance',
    title: 'Data Retention Compliance',
    subtitle: 'Retention policy adherence by data type',
    phase: 'enable',
    tags: ['retention', 'compliance', 'data', 'enterprise'],
    render: (data) => <DataRetentionCompliance data={data as unknown[]} />,
  },
  SchemaDriftTracker: {
    key: 'SchemaDriftTracker',
    title: 'Schema Drift Tracker',
    subtitle: 'Breaking changes in data contracts',
    phase: 'engineer',
    tags: ['schema', 'drift', 'contract', 'enterprise'],
    render: (data) => <SchemaDriftTracker data={data as unknown[]} />,
  },
  DataFreshnessMonitor: {
    key: 'DataFreshnessMonitor',
    title: 'Data Freshness Monitor',
    subtitle: 'Staleness by source with SLA tracking',
    phase: 'engineer',
    tags: ['freshness', 'staleness', 'sla', 'enterprise'],
    render: (data) => <DataFreshnessMonitor data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - OPERATIONAL RESILIENCE
  // ─────────────────────────────────────────────────────────────────────────────
  RTORPOCompliance: {
    key: 'RTORPOCompliance',
    title: 'RTO/RPO Compliance',
    subtitle: 'Recovery objectives vs actual performance',
    phase: 'enable',
    tags: ['rto', 'rpo', 'resilience', 'enterprise'],
    render: (data) => <RTORPOCompliance data={data as unknown[]} />,
  },
  FailoverEventLog: {
    key: 'FailoverEventLog',
    title: 'Failover Event Log',
    subtitle: 'DR event history and recovery timeline',
    phase: 'enable',
    tags: ['failover', 'dr', 'event', 'enterprise'],
    render: (data) => <FailoverEventLog data={data as unknown[]} />,
  },
  BusinessContinuityScorecard: {
    key: 'BusinessContinuityScorecard',
    title: 'Business Continuity Scorecard',
    subtitle: 'BCP readiness by critical system',
    phase: 'enable',
    tags: ['bcp', 'continuity', 'scorecard', 'enterprise'],
    render: (data) => <BusinessContinuityScorecard data={data as unknown[]} />,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERPRISE CHARTS - EXECUTIVE & BOARD
  // ─────────────────────────────────────────────────────────────────────────────
  AIInvestmentPortfolio: {
    key: 'AIInvestmentPortfolio',
    title: 'AI Investment Portfolio',
    subtitle: 'Spend vs value by initiative',
    phase: 'impact',
    tags: ['investment', 'portfolio', 'roi', 'enterprise'],
    render: (data) => <AIInvestmentPortfolio data={data as unknown[]} />,
  },
  StrategicInitiativeTracker: {
    key: 'StrategicInitiativeTracker',
    title: 'Strategic Initiative Tracker',
    subtitle: 'Multi-quarter initiative progress',
    phase: 'impact',
    tags: ['strategic', 'initiative', 'progress', 'enterprise'],
    render: (data) => <StrategicInitiativeTracker data={data as unknown[]} />,
  },
  QuarterlyBusinessReview: {
    key: 'QuarterlyBusinessReview',
    title: 'Quarterly Business Review',
    subtitle: 'Standardized QBR template',
    phase: 'impact',
    tags: ['qbr', 'review', 'executive', 'enterprise'],
    render: (data) => <QuarterlyBusinessReview data={data as unknown[]} />,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get chart config by key
 */
export function getChartConfig(key: string): ChartConfig | undefined {
  return chartRegistry[key];
}

/**
 * Get all charts for a specific phase
 */
export function getChartsByPhase(phase: ChartConfig['phase']): ChartConfig[] {
  return Object.values(chartRegistry).filter(c => c.phase === phase || c.phase === 'any');
}

/**
 * Get all available chart keys
 */
export function getAvailableChartKeys(): string[] {
  return Object.keys(chartRegistry);
}

/**
 * Check if a chart key is valid
 */
export function isValidChartKey(key: string): boolean {
  return key in chartRegistry;
}

export default chartRegistry;
