'use client';
/**
 * FDE Case Study 01: CoCo — AI-Enhanced Intranet
 * 5-Phase FDE Narrative with Accordion Layout + Charts
 * 
 * ENHANCED: Replaced static images with D3 chart artifacts
 */
import { useState } from 'react';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import FDEFooter from '@/layouts/footers/FDEFooter';
import Image from 'next/image';

// Charts
import FunnelChart from '@/charts_D3/FunnelChart';
import SystemContextDiagram from '@/charts_D3/SystemContextDiagram';
import ServiceHealthDashboard from '@/charts_D3/ServiceHealthDashboard';
import CustomerJourneyMap from '@/charts_D3/CustomerJourneyMap';
import WaterfallChart from '@/charts_D3/WaterfallChart';
import SecurityArchitectureDiagram from '@/charts_D3/SecurityArchitectureDiagram';
import ImplementationTimeline from '@/charts_D3/ImplementationTimeline';
import TechStackDisplay from '@/charts_D3/TechStackDisplay';
import TornadoChart from '@/charts_D3/TornadoChart';
import RAGPipeline from '@/charts_D3/RAGPipeline';
import DataLineageDAG from '@/charts_D3/DataLineageDAG';
import LatencyPercentiles from '@/charts_D3/LatencyPercentiles';
import SparklineGrid from '@/charts_D3/SparklineGrid';

// Only keep the logo image
import pfizerLogo from '@/../public/assets/img/fde/case-study-01/Pfizer_(2021).png';

// WebGL hero image from homepage slider
import heroImage from '@/../public/assets/img/webgl/home1.jpg';

// ============================================
// NEW CHART DATA FOR INLINE VISUALIZATIONS
// ============================================

// Hero: RAG Pipeline visualization
const heroRAGData = {
  title: 'CoCo RAG Architecture',
  steps: [
    { id: 'query', name: 'User Query', description: 'Natural language question via Teams', icon: '◈' },
    { id: 'retrieve', name: 'Retrieve', description: 'Vector + keyword hybrid search', icon: '◎' },
    { id: 'augment', name: 'Augment', description: 'Context injection with citations', icon: '▢' },
    { id: 'generate', name: 'Generate', description: 'LLM response with governance', icon: '◇' },
    { id: 'cite', name: 'Cite', description: 'Source attribution & audit log', icon: '✓' },
  ],
  sources: ['Veeva Vault', 'SharePoint', 'Workfront', 'CLM', 'Regional Drives'],
};

// Diagnose: Before/After Tornado Chart
const diagnoseTornadoData = [
  { category: 'Search Time', before: 25, after: 1, unit: 'min', improvement: '96%' },
  { category: 'MLR Rejection', before: 40, after: 5, unit: '%', improvement: '88%' },
  { category: 'Systems to Search', before: 20, after: 1, unit: '', improvement: '95%' },
  { category: 'Onboarding Time', before: 90, after: 7, unit: 'days', improvement: '92%' },
  { category: 'Rework Rate', before: 35, after: 8, unit: '%', improvement: '77%' },
];

// Architect: Data Lineage DAG
const architectDAGData = {
  nodes: [
    { id: 'veeva', label: 'Veeva Vault', type: 'source', x: 50, y: 50 },
    { id: 'sharepoint', label: 'SharePoint', type: 'source', x: 50, y: 120 },
    { id: 'workfront', label: 'Workfront', type: 'source', x: 50, y: 190 },
    { id: 'clm', label: 'CLM', type: 'source', x: 50, y: 260 },
    { id: 'ingest', label: 'Ingestion Layer', type: 'process', x: 200, y: 155 },
    { id: 'embed', label: 'Embedding Service', type: 'process', x: 350, y: 100 },
    { id: 'index', label: 'Cognitive Search', type: 'storage', x: 350, y: 210 },
    { id: 'rag', label: 'RAG Engine', type: 'process', x: 500, y: 155 },
    { id: 'mlr', label: 'MLR Gateway', type: 'governance', x: 650, y: 100 },
    { id: 'audit', label: 'Audit Logger', type: 'governance', x: 650, y: 210 },
    { id: 'teams', label: 'MS Teams', type: 'output', x: 800, y: 155 },
  ],
  edges: [
    { source: 'veeva', target: 'ingest' },
    { source: 'sharepoint', target: 'ingest' },
    { source: 'workfront', target: 'ingest' },
    { source: 'clm', target: 'ingest' },
    { source: 'ingest', target: 'embed' },
    { source: 'ingest', target: 'index' },
    { source: 'embed', target: 'rag' },
    { source: 'index', target: 'rag' },
    { source: 'rag', target: 'mlr' },
    { source: 'rag', target: 'audit' },
    { source: 'mlr', target: 'teams' },
  ],
};

// Engineer: Latency Percentiles
const engineerLatencyData = {
  services: [
    { name: 'RAG Pipeline', p50: 180, p95: 280, p99: 450, slo: 300 },
    { name: 'MLR Gateway', p50: 45, p95: 85, p99: 120, slo: 100 },
    { name: 'Vector Search', p50: 32, p95: 65, p99: 95, slo: 80 },
    { name: 'Citation Engine', p50: 15, p95: 35, p99: 55, slo: 50 },
    { name: 'Teams Bot', p50: 220, p95: 380, p99: 520, slo: 400 },
    { name: 'Audit Logger', p50: 8, p95: 15, p99: 25, slo: 30 },
  ],
};

// Enable: Onboarding Sparklines
const enableSparklineData = [
  { 
    label: 'Users Onboarded', 
    values: [50, 120, 250, 380, 520, 650, 780, 850, 920, 980, 1000, 1000],
    current: 1000,
    change: 1900,
    format: (v: number) => `${v}`
  },
  { 
    label: 'Avg. Time to Productive', 
    values: [21, 18, 14, 12, 10, 9, 8, 7, 7, 7, 7, 7],
    current: 7,
    change: -67,
    format: (v: number) => `${v}d`
  },
  { 
    label: 'First-Pass Approval Rate', 
    values: [58, 62, 68, 72, 78, 82, 85, 88, 90, 92, 94, 95],
    current: 95,
    change: 64,
    format: (v: number) => `${v}%`
  },
  { 
    label: 'User Satisfaction (NPS)', 
    values: [45, 52, 58, 62, 68, 72, 75, 78, 80, 82, 84, 86],
    current: 86,
    change: 91,
    format: (v: number) => `${v}`
  },
];

// ============================================
// EXISTING CHART DATA
// ============================================

const diagnoseFunnelData = [
  { stage: 'Content Requests', value: 1000, color: '#333' },
  { stage: 'Initial Draft', value: 720, color: '#444' },
  { stage: 'MLR Submission', value: 580, color: '#555' },
  { stage: 'First Review', value: 420, color: '#666' },
  { stage: 'Revisions', value: 340, color: '#777' },
  { stage: 'Approved', value: 200, color: '#888' },
];

const architectSystemData = {
  system: {
    name: 'CoCo RAG Platform',
    description: 'AI-enhanced knowledge retrieval with governed access to 20+ enterprise systems',
    type: 'Software System',
  },
  users: [
    {
      id: 'content-producer',
      name: 'Content Producer',
      icon: '/assets/img/svg-icons/Edit 1.svg',
      description: 'Creates marketing and promotional content',
      interactions: ['Search assets', 'Get templates', 'Check compliance'],
    },
    {
      id: 'mlr-reviewer',
      name: 'MLR Reviewer',
      icon: '/assets/img/svg-icons/Clipboard Check.svg',
      description: 'Reviews content for regulatory compliance',
      interactions: ['Review submissions', 'Check claims', 'Approve assets'],
    },
    {
      id: 'brand-manager',
      name: 'Brand Manager',
      icon: '/assets/img/svg-icons/Chart Statistics 1.svg',
      description: 'Manages brand consistency across campaigns',
      interactions: ['Track assets', 'Monitor usage', 'View analytics'],
    },
    {
      id: 'new-hire',
      name: 'New Hire',
      icon: '/assets/img/svg-icons/Graduation Hat.svg',
      description: 'Onboarding staff needing guidance',
      interactions: ['Ask questions', 'Find processes', 'Get training'],
    },
  ],
  externalSystems: [
    {
      id: 'veeva-vault',
      name: 'Veeva Vault',
      type: 'Content Management',
      icon: '/assets/img/svg-icons/Folder.svg',
      description: 'Regulated content repository',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Approved assets', 'Claims library', 'MLR status'],
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'Document Store',
      icon: '/assets/img/svg-icons/Document 1.svg',
      description: 'Enterprise file storage',
      protocol: 'Graph API',
      direction: 'inbound' as const,
      dataFlow: ['Templates', 'Guidelines', 'SOPs'],
    },
    {
      id: 'workfront',
      name: 'Workfront',
      type: 'Project Management',
      icon: '/assets/img/svg-icons/Calendar Check.svg',
      description: 'Campaign workflow tracking',
      protocol: 'REST API',
      direction: 'inbound' as const,
      dataFlow: ['Project status', 'Deadlines', 'Assignments'],
    },
    {
      id: 'azure-ml',
      name: 'Azure ML',
      type: 'ML Platform',
      icon: '/assets/img/svg-icons/Chemistry Flask 1.svg',
      description: 'Model serving and inference',
      protocol: 'gRPC',
      direction: 'outbound' as const,
      dataFlow: ['Embeddings', 'Retrieval', 'Generation'],
    },
    {
      id: 'cognitive-search',
      name: 'Cognitive Search',
      type: 'Search Index',
      icon: '/assets/img/svg-icons/Search.svg',
      description: 'Hybrid search infrastructure',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Vector search', 'Keyword search', 'Facets'],
    },
    {
      id: 'teams',
      name: 'MS Teams',
      type: 'Chat Interface',
      icon: '/assets/img/svg-icons/Chat Message.svg',
      description: 'User interaction layer',
      protocol: 'Bot Framework',
      direction: 'bidirectional' as const,
      dataFlow: ['User queries', 'Responses', 'Citations'],
    },
  ],
  internalComponents: [
    { name: 'RAG Pipeline', description: 'Retrieval-augmented generation' },
    { name: 'MLR Gateway', description: 'Compliance validation layer' },
    { name: 'Graph-RAG', description: 'Relationship mapping' },
    { name: 'Citation Engine', description: 'Source attribution' },
    { name: 'Audit Logger', description: 'Full query tracing' },
  ],
};

const engineerServiceData = {
  services: [
    { 
      name: 'RAG Pipeline', 
      status: 'healthy' as const,
      uptime: 99.7,
      latency: { p50: 180, p95: 280, p99: 450 },
      errorRate: 0.03,
      throughput: 4200,
      lastIncident: '14d ago'
    },
    { 
      name: 'MLR Gateway', 
      status: 'healthy' as const,
      uptime: 99.9,
      latency: { p50: 45, p95: 85, p99: 120 },
      errorRate: 0.01,
      throughput: 1800,
      lastIncident: '30d ago'
    },
    { 
      name: 'Vector Search', 
      status: 'healthy' as const,
      uptime: 99.8,
      latency: { p50: 32, p95: 65, p99: 95 },
      errorRate: 0.02,
      throughput: 8500,
      lastIncident: '7d ago'
    },
    { 
      name: 'Citation Engine', 
      status: 'healthy' as const,
      uptime: 99.95,
      latency: { p50: 15, p95: 35, p99: 55 },
      errorRate: 0.01,
      throughput: 4200,
      lastIncident: '21d ago'
    },
    { 
      name: 'Teams Bot', 
      status: 'healthy' as const,
      uptime: 99.6,
      latency: { p50: 220, p95: 380, p99: 520 },
      errorRate: 0.05,
      throughput: 3200,
      lastIncident: '3d ago'
    },
    { 
      name: 'Audit Logger', 
      status: 'healthy' as const,
      uptime: 99.99,
      latency: { p50: 8, p95: 15, p99: 25 },
      errorRate: 0.001,
      throughput: 12500,
      lastIncident: '60d ago'
    },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 165, p95: 260, p99: 420 },
    { hour: '01:00', p50: 155, p95: 245, p99: 395 },
    { hour: '02:00', p50: 148, p95: 235, p99: 380 },
    { hour: '03:00', p50: 145, p95: 228, p99: 372 },
    { hour: '04:00', p50: 142, p95: 225, p99: 370 },
    { hour: '05:00', p50: 150, p95: 240, p99: 390 },
    { hour: '06:00', p50: 165, p95: 265, p99: 430 },
    { hour: '07:00', p50: 180, p95: 290, p99: 470 },
    { hour: '08:00', p50: 195, p95: 310, p99: 500 },
    { hour: '09:00', p50: 205, p95: 325, p99: 525 },
    { hour: '10:00', p50: 210, p95: 332, p99: 535 },
    { hour: '11:00', p50: 208, p95: 330, p99: 532 },
    { hour: '12:00', p50: 210, p95: 335, p99: 540 },
    { hour: '13:00', p50: 205, p95: 328, p99: 530 },
    { hour: '14:00', p50: 200, p95: 320, p99: 515 },
    { hour: '15:00', p50: 195, p95: 312, p99: 505 },
    { hour: '16:00', p50: 190, p95: 305, p99: 495 },
    { hour: '17:00', p50: 185, p95: 295, p99: 478 },
    { hour: '18:00', p50: 178, p95: 282, p99: 458 },
    { hour: '19:00', p50: 172, p95: 272, p99: 442 },
    { hour: '20:00', p50: 158, p95: 255, p99: 415 },
    { hour: '21:00', p50: 162, p95: 260, p99: 420 },
    { hour: '22:00', p50: 168, p95: 268, p99: 432 },
    { hour: '23:00', p50: 170, p95: 270, p99: 438 },
  ]
};

const enableJourneyData = {
  persona: {
    name: 'New Content Producer',
    role: 'Marketing Associate',
    company: 'Publicis Health',
    avatar: '●',
  },
  goal: 'Create compliant content for Paxlovid campaign within first week',
  stages: [
    {
      id: 'day-one',
      name: 'Day 1',
      icon: '▶',
      color: '#333',
      duration: 'Morning',
      touchpoints: [
        { channel: 'Teams Welcome', type: 'bot' },
        { channel: 'CoCo Introduction', type: 'training' },
      ],
      actions: ['Receives Teams welcome message', 'CoCo introduces itself', 'Asks first question about process'],
      thoughts: ['"Where do I even start?"', '"This bot seems helpful"', '"I can just ask questions!"'],
      emotions: { score: 3, label: 'Uncertain' },
      painPoints: ['Overwhelmed by new systems'],
      opportunities: ['Immediate access to CoCo'],
    },
    {
      id: 'first-search',
      name: 'First Search',
      icon: '◐',
      color: '#444',
      duration: 'Day 1-2',
      touchpoints: [
        { channel: 'CoCo Search', type: 'product' },
        { channel: 'Template Library', type: 'content' },
      ],
      actions: ['Searches for Paxlovid templates', 'Gets approved templates with citations', 'Finds brand guidelines instantly'],
      thoughts: ['"Found it in seconds!"', '"No digging through folders"', '"Citations give me confidence"'],
      emotions: { score: 4, label: 'Relieved' },
      painPoints: ['Learning brand specifics'],
      opportunities: ['Contextual suggestions'],
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      icon: '◑',
      color: '#555',
      duration: 'Day 2-3',
      touchpoints: [
        { channel: 'CoCo Q&A', type: 'product' },
        { channel: 'Claims Library', type: 'content' },
      ],
      actions: ['Asks about fair balance requirements', 'Gets approved claims with references', 'Creates first draft with guidance'],
      thoughts: ['"CoCo knows the regulations"', '"Using pre-approved claims saves time"', '"Much faster than expected"'],
      emotions: { score: 4, label: 'Confident' },
      painPoints: ['Compliance uncertainty'],
      opportunities: ['Real-time compliance hints'],
    },
    {
      id: 'mlr-submission',
      name: 'MLR Submission',
      icon: '◒',
      color: '#666',
      duration: 'Day 3-4',
      touchpoints: [
        { channel: 'CoCo Process Guide', type: 'product' },
        { channel: 'MLR System', type: 'external' },
      ],
      actions: ['Asks "How do I submit to MLR?"', 'Gets step-by-step process', 'Submits with correct template'],
      thoughts: ['"Clear instructions helped"', '"Right template = faster approval"', '"No rookie mistakes"'],
      emotions: { score: 5, label: 'Accomplished' },
      painPoints: ['Process complexity'],
      opportunities: ['MLR pre-flight check'],
    },
    {
      id: 'first-approval',
      name: 'First Approval',
      icon: '●',
      color: '#777',
      duration: 'Day 5-7',
      touchpoints: [
        { channel: 'MLR Notification', type: 'external' },
        { channel: 'CoCo Celebration', type: 'product' },
      ],
      actions: ['Receives approval notification', 'First-pass approval achieved', 'Shares success with team'],
      thoughts: ['"Approved on first try!"', '"CoCo made me productive fast"', '"I can do this"'],
      emotions: { score: 5, label: 'Proud' },
      painPoints: [],
      opportunities: ['Success tracking dashboard'],
    },
  ],
};

const securityArchitectureData = {
  title: 'CoCo Security & Compliance Architecture',
  subtitle: 'HIPAA-compliant RAG platform with enterprise-grade data protection',
  layers: [
    {
      id: 'perimeter',
      name: 'Perimeter Security',
      description: 'Network edge protection',
      controls: ['Azure WAF', 'DDoS Protection', 'Geo-filtering'],
      compliance: ['SOC 2', 'HIPAA §164.312(e)'],
      icon: '△'
    },
    {
      id: 'network',
      name: 'Network Security',
      description: 'Internal network controls',
      controls: ['VNet isolation', 'NSG rules', 'Private endpoints'],
      compliance: ['HIPAA §164.312(a)', 'SOC 2 CC6.1'],
      icon: '◆'
    },
    {
      id: 'identity',
      name: 'Identity & Access',
      description: 'Authentication and authorization',
      controls: ['Azure AD', 'RBAC', 'MFA', 'PIM'],
      compliance: ['HIPAA §164.312(d)', 'SOC 2 CC6.2'],
      icon: '◉'
    },
    {
      id: 'application',
      name: 'Application Security',
      description: 'Code and runtime protection',
      controls: ['API validation', 'Input sanitization', 'OWASP Top 10'],
      compliance: ['HIPAA §164.312(c)', 'SOC 2 CC7.1'],
      icon: '⚙'
    },
    {
      id: 'data',
      name: 'Data Protection',
      description: 'Encryption and masking',
      controls: ['AES-256 at rest', 'TLS 1.3 in transit', 'PII redaction'],
      compliance: ['HIPAA §164.312(a)(2)(iv)', 'SOC 2 CC6.7'],
      icon: '▣'
    },
    {
      id: 'monitoring',
      name: 'Audit & Monitoring',
      description: 'Logging and alerting',
      controls: ['Azure Monitor', 'Log Analytics', 'SIEM integration'],
      compliance: ['HIPAA §164.312(b)', 'SOC 2 CC7.2'],
      icon: '▥'
    },
  ],
  certifications: ['SOC 2 Type II', 'HIPAA BAA', 'ISO 27001', 'FDA 21 CFR Part 11']
};

const impactWaterfallData = [
  { label: 'Search Savings', value: 78, type: 'total' as const },
  { label: 'MLR Reduction', value: 62.4, type: 'increase' as const },
  { label: 'Reduced Rework', value: 45.6, type: 'increase' as const },
  { label: 'Faster Onboarding', value: 22.2, type: 'increase' as const },
  { label: 'Total Savings', value: 208.2, type: 'total' as const },
];

const cocoTimelineData = {
  title: 'CoCo Implementation Timeline — 12 Weeks',
  totalWeeks: 14,
  phases: [
    {
      id: 'discovery',
      name: 'Discovery',
      startWeek: 0,
      endWeek: 2,
      color: '#666',
      deliverables: ['Stakeholder interviews', 'System mapping', 'Requirements doc'],
    },
    {
      id: 'architecture',
      name: 'Architecture',
      startWeek: 2,
      endWeek: 4,
      color: '#555',
      deliverables: ['RAG design', 'Integration specs', 'Security review'],
    },
    {
      id: 'build',
      name: 'Build & Integrate',
      startWeek: 4,
      endWeek: 9,
      color: '#333',
      deliverables: ['RAG pipeline', 'Veeva connector', 'Teams bot', 'MLR gateway'],
    },
    {
      id: 'pilot',
      name: 'Pilot',
      startWeek: 9,
      endWeek: 11,
      color: '#444',
      deliverables: ['200 user pilot', 'Feedback loops', 'Performance tuning'],
    },
    {
      id: 'rollout',
      name: 'Full Rollout',
      startWeek: 11,
      endWeek: 13,
      color: '#1a1a1a',
      deliverables: ['1,000 users', 'Training complete', 'Runbooks handed off'],
    },
  ],
  milestones: [
    { name: 'Kickoff', week: 0, type: 'start' as const },
    { name: 'Architecture Sign-off', week: 4, type: 'checkpoint' as const },
    { name: 'MVP Ready', week: 8, type: 'delivery' as const },
    { name: 'Pilot Complete', week: 11, type: 'checkpoint' as const },
    { name: 'Go-Live', week: 13, type: 'go-live' as const },
  ],
};

// Accordion Section Component
const AccordionSection = ({ 
  title, 
  subtitle,
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  subtitle: string;
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode;
}) => {
  return (
    <div className="fde-accordion-section">
      <button 
        className={`fde-accordion-header ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="fde-accordion-header-content">
          <h2 className="fde-accordion-title">{title}</h2>
          <p className="fde-accordion-subtitle">{subtitle}</p>
        </div>
        <span className="fde-accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`fde-accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Inline Chart Component for smaller visualizations
const InlineMetricChart = ({ data }: { data: typeof diagnoseTornadoData }) => {
  return (
    <div style={{ 
      backgroundColor: '#f8f8f8', 
      padding: '20px', 
      borderRadius: '8px',
      border: '1px solid #e5e5e5'
    }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Before → After Transformation
      </div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>{item.category}</span>
            <span style={{ fontSize: '11px', color: '#333', fontWeight: '600' }}>↓{item.improvement}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              flex: 1, 
              height: '8px', 
              backgroundColor: '#e5e5e5', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(item.before / Math.max(...data.map(d => d.before))) * 100}%`,
                height: '100%',
                backgroundColor: '#999',
                borderRadius: '4px'
              }} />
            </div>
            <span style={{ fontSize: '11px', color: '#666', minWidth: '50px' }}>{item.before}{item.unit}</span>
            <span style={{ fontSize: '11px', color: '#999' }}>→</span>
            <div style={{ 
              flex: 1, 
              height: '8px', 
              backgroundColor: '#e5e5e5', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(item.after / Math.max(...data.map(d => d.before))) * 100}%`,
                height: '100%',
                backgroundColor: '#333',
                borderRadius: '4px'
              }} />
            </div>
            <span style={{ fontSize: '11px', color: '#333', fontWeight: '600', minWidth: '50px' }}>{item.after}{item.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Inline RAG Flow Component
const InlineRAGFlow = () => {
  const steps = [
    { icon: '◈', label: 'Query', desc: 'Teams' },
    { icon: '◎', label: 'Retrieve', desc: 'Vector + BM25' },
    { icon: '▢', label: 'Augment', desc: 'Context' },
    { icon: '◇', label: 'Generate', desc: 'GPT-4' },
    { icon: '✓', label: 'Cite', desc: 'Sources' },
  ];
  
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      padding: '24px', 
      borderRadius: '8px',
      color: '#fff'
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        RAG Pipeline Architecture
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{step.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>{step.label}</div>
              <div style={{ fontSize: '10px', color: '#888' }}>{step.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ 
                width: '40px', 
                height: '2px', 
                backgroundColor: '#333',
                margin: '0 12px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  right: '-4px',
                  top: '-3px',
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: '6px solid #333'
                }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #333' }}>
        <div style={{ fontSize: '10px', color: '#666' }}>
          Sources: Veeva Vault · SharePoint · Workfront · CLM · Regional Drives
        </div>
      </div>
    </div>
  );
};

// Inline Data Flow Component
const InlineDataFlow = () => {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px',
      border: '1px solid #e5e5e5'
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Data Integration Architecture
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '12px', alignItems: 'center' }}>
        {/* Sources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['Veeva Vault', 'SharePoint', 'Workfront', 'CLM'].map((src, i) => (
            <div key={i} style={{ 
              padding: '8px 12px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '500',
              color: '#333'
            }}>
              {src}
            </div>
          ))}
        </div>
        
        {/* Arrow */}
        <div style={{ fontSize: '20px', color: '#ccc' }}>→</div>
        
        {/* Processing */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1a1a1a', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>RAG Engine</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Embed → Index → Retrieve</div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <span style={{ padding: '2px 6px', backgroundColor: '#333', borderRadius: '3px', fontSize: '9px', color: '#888' }}>MLR Gate</span>
            <span style={{ padding: '2px 6px', backgroundColor: '#333', borderRadius: '3px', fontSize: '9px', color: '#888' }}>Audit</span>
          </div>
        </div>
        
        {/* Arrow */}
        <div style={{ fontSize: '20px', color: '#ccc' }}>→</div>
        
        {/* Output */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f8f8', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #333'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '8px' }}>◈</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>MS Teams</div>
          <div style={{ fontSize: '10px', color: '#666' }}>With Citations</div>
        </div>
      </div>
    </div>
  );
};

// Inline Latency Chart
const InlineLatencyChart = ({ data }: { data: typeof engineerLatencyData }) => {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px',
      border: '1px solid #e5e5e5'
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Service Latency (ms) — p50 / p95 / p99
      </div>
      {data.services.map((svc, i) => {
        const maxLatency = Math.max(...data.services.map(s => s.p99));
        const meetsP95SLO = svc.p95 <= svc.slo;
        return (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>{svc.name}</span>
              <span style={{ 
                fontSize: '10px', 
                color: meetsP95SLO ? '#333' : '#666',
                fontWeight: '600'
              }}>
                SLO: {svc.slo}ms {meetsP95SLO ? '✓' : '✗'}
              </span>
            </div>
            <div style={{ position: 'relative', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
              {/* p99 bar */}
              <div style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${(svc.p99 / maxLatency) * 100}%`,
                height: '100%',
                backgroundColor: '#ddd',
                borderRadius: '4px'
              }} />
              {/* p95 bar */}
              <div style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${(svc.p95 / maxLatency) * 100}%`,
                height: '100%',
                backgroundColor: '#999',
                borderRadius: '4px'
              }} />
              {/* p50 bar */}
              <div style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${(svc.p50 / maxLatency) * 100}%`,
                height: '100%',
                backgroundColor: '#333',
                borderRadius: '4px'
              }} />
              {/* Labels */}
              <div style={{ 
                position: 'absolute', 
                right: '8px', 
                top: '2px',
                fontSize: '10px',
                color: '#666'
              }}>
                {svc.p50} / {svc.p95} / {svc.p99}
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '10px', color: '#888' }}>
        <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#333', borderRadius: '2px', marginRight: '4px' }}></span>p50</span>
        <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#999', borderRadius: '2px', marginRight: '4px' }}></span>p95</span>
        <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#ddd', borderRadius: '2px', marginRight: '4px' }}></span>p99</span>
      </div>
    </div>
  );
};

// Inline Sparkline Grid
const InlineSparklines = ({ data }: { data: typeof enableSparklineData }) => {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px',
      border: '1px solid #e5e5e5'
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Enablement Metrics — 12 Week Trend
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {data.map((metric, i) => {
          const max = Math.max(...metric.values);
          const min = Math.min(...metric.values);
          const range = max - min || 1;
          const points = metric.values.map((v, j) => {
            const x = (j / (metric.values.length - 1)) * 100;
            const y = 100 - ((v - min) / range) * 100;
            return `${x},${y}`;
          }).join(' ');
          
          return (
            <div key={i} style={{ padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#666' }}>{metric.label}</span>
                <span style={{ 
                  fontSize: '10px', 
                  color: metric.change > 0 ? '#333' : '#666',
                  fontWeight: '600'
                }}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <svg viewBox="0 0 100 30" style={{ flex: 1, height: '30px' }}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>
                  {metric.format(metric.current)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FDECaseStudy01 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    diagnose: false,
    architect: false,
    engineer: false,
    enable: false,
    impact: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <ScrollSmoothProvider>
      <CursorAndBackgroundProvider>
        <AnimationWrapper>
          <div className="fde-page fde-accordion-page">
            <div id="magic-cursor" className='cursor-bg-red'>
              <div id="ball"></div>
            </div>

            <BackToTop />
            <PortfolioWebglHeader darkText={true} hideNameOnSlider={true} />

            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main>
                  {/* HERO */}
                  <section className="fde-hero-section">
                    <div className="fde-logo-container">
                      <Image src={pfizerLogo} alt="Pfizer" width={150} height={48} className="fde-client-logo-img" />
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title">CoCo</h1>
                        <p className="fde-hero-subtitle" >AI-Enhanced Intranet for Enterprise Knowledge & Onboarding</p>
                        
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>1,000 new hires across 20+ fragmented systems with 40% MLR rejection rates</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Governed RAG platform reducing cycles by 65%, tripling throughput, saving $2.08M annually</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="CoCo AI Platform" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">65%</span>
                        <span className="fde-metric-desc">Faster MLR cycles</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">3×</span>
                        <span className="fde-metric-desc">Throughput increase</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">$2.08M</span>
                        <span className="fde-metric-desc">Annual savings</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">~1,000</span>
                        <span className="fde-metric-desc">Staff onboarded</span>
                      </div>
                    </div>
                  </section>

                  {/* ACCORDION SECTIONS */}
                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                    
                    {/* DIAGNOSE */}
                    <AccordionSection
                      title="Diagnose"
                      subtitle="Review cycle time, revision rate, search time"
                      isOpen={openSections.diagnose}
                      onToggle={() => toggleSection('diagnose')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>1,000 new hires. 12 weeks. 20+ fragmented systems.</h3>
                            <p>
                              Pfizer split its marketing business between IPG and Publicis right before peak 
                              vaccine season. Publicis inherited Paxlovid, Abrysvo, and Comirnaty—and needed 
                              to scale from zero to nearly 1,000 staff in weeks.
                            </p>
                            <p>
                              I embedded with Pfizer, Publicis, and IPG for two weeks before writing any code. 
                              Shadowed content producers. Sat with MLR reviewers. Mapped the actual workflow.
                            </p>
                            <p>
                              What I found: staff spent 25+ minutes per asset just searching for approved 
                              templates and prior claims. 40% of MLR submissions were rejected—not for content 
                              issues, but for using wrong templates or outdated claims.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>25+</strong>
                                <span>min to find one asset</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>40%</strong>
                                <span>MLR rejection rate</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>20+</strong>
                                <span>disconnected systems</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* REPLACED: Static image with Before/After metrics chart */}
                            <InlineMetricChart data={diagnoseTornadoData} />
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>MLR Content Pipeline — Before CoCo</h4>
                            <p>Only 20% of content requests made it through to approval, with 40% rejected at first review due to template and claim errors.</p>
                          </div>
                          <div className="fde-chart-container">
                            <FunnelChart data={diagnoseFunnelData} title="Content Request to Approval Funnel" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ARCHITECT */}
                    <AccordionSection
                      title="Architect"
                      subtitle="Architecture sign-off, SLO definitions"
                      isOpen={openSections.architect}
                      onToggle={() => toggleSection('architect')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>CoCo: an AI-enhanced intranet that answers questions and finds content.</h3>
                            <p>
                              CoCo—&quot;Company Companion&quot;—is embedded in Microsoft Teams. Instead of 
                              searching 20 systems, employees ask CoCo. It retrieves approved content, answers 
                              policy questions, and guides new hires through processes—with citations back to 
                              source documents.
                            </p>
                            <p>
                              Architecture choices: RAG layer over existing systems of record. Azure ML + AKS 
                              for the pipeline. Cognitive Search for hybrid retrieval. Graph-RAG for relationship 
                              mapping across brands and regions. MLR gateway for compliance checks before any 
                              content surfaces.
                            </p>
                            <div className="fde-pipeline">
                              <span className="fde-pipeline-step">User asks</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Retrieve</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Generate</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Cite</span>
                            </div>
                            <p className="fde-sources">
                              Sources: Veeva Vault · SharePoint · Workfront · CLM · Regional Drives
                            </p>
                          </div>
                          <div className="fde-column-image">
                            {/* REPLACED: Static image with Data Flow diagram */}
                            <InlineDataFlow />
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>CoCo System Context (C4 Diagram)</h4>
                            <p>The platform integrates with 6 core systems while maintaining a single conversation interface via Teams.</p>
                          </div>
                          <div className="fde-chart-container">
                            <SystemContextDiagram data={architectSystemData} title="CoCo RAG Platform Architecture" width={800} height={600} />
                          </div>
                        </div>

                        {/* Security Architecture Section */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Security & Compliance Architecture</h4>
                            <p>Defense-in-depth model with HIPAA, SOC 2, and FDA 21 CFR Part 11 compliance.</p>
                          </div>
                          <div className="fde-chart-container">
                            <SecurityArchitectureDiagram data={securityArchitectureData} width={800} height={600} />
                          </div>
                        </div>

                        {/* Disaster Recovery Section */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Disaster Recovery & Business Continuity</h4>
                            <p>Multi-region architecture with automated failover and tested recovery procedures.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
                              {[
                                { metric: 'RTO', target: '< 4 hours', achieved: '2.5 hours', status: 'Met' },
                                { metric: 'RPO', target: '< 1 hour', achieved: '15 minutes', status: 'Met' },
                                { metric: 'Failover Tests', target: 'Quarterly', achieved: 'Monthly', status: 'Exceeded' },
                                { metric: 'Last DR Drill', target: '< 90 days', achieved: '28 days ago', status: 'Met' },
                              ].map((item, i) => (
                                <div key={i} style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>{item.metric}</div>
                                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>{item.achieved}</div>
                                  <div style={{ fontSize: '10px', color: '#999' }}>Target: {item.target}</div>
                                  <div style={{ marginTop: '8px', fontSize: '10px', fontWeight: '600', color: item.status === 'Exceeded' ? '#333' : '#666' }}>{item.status}</div>
                                </div>
                              ))}
                            </div>
                            
                            <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>DR Architecture</h5>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                              <div style={{ padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '6px' }}>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>Primary Region: US-East</div>
                                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#555' }}>
                                  <li>Azure AKS cluster (3 nodes)</li>
                                  <li>Cosmos DB (multi-master)</li>
                                  <li>Cognitive Search (standard tier)</li>
                                </ul>
                              </div>
                              <div style={{ padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '6px' }}>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>DR Region: US-West</div>
                                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#555' }}>
                                  <li>Hot standby AKS cluster</li>
                                  <li>Geo-replicated storage</li>
                                  <li>Traffic Manager failover</li>
                                </ul>
                              </div>
                            </div>
                            
                            <h5 style={{ margin: '24px 0 12px', fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>Tested Scenarios</h5>
                            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Scenario</th>
                                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Expected</th>
                                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Actual</th>
                                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Single AZ failure</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Auto-heal &lt;5min</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>3 minutes</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#333', fontWeight: '600' }}>✓</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Region failure</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Manual failover &lt;4hr</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>2.5 hours</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#333', fontWeight: '600' }}>✓</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Data corruption</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Point-in-time &lt;1hr</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee' }}>45 minutes</td><td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#333', fontWeight: '600' }}>✓</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Implementation Timeline */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Implementation Timeline — 12 Weeks</h4>
                            <p>From discovery through full rollout with key milestones and deliverables.</p>
                          </div>
                          <div className="fde-chart-container">
                            <ImplementationTimeline data={cocoTimelineData} width={800} height={400} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENGINEER */}
                    <AccordionSection
                      title="Engineer"
                      subtitle="p95 latency, uptime, error rate"
                      isOpen={openSections.engineer}
                      onToggle={() => toggleSection('engineer')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Production RAG with governed retrieval and compliance gates.</h3>
                            <p>
                              CoCo doesn&apos;t replace Veeva, SharePoint, or Workfront. It sits on top. 
                              The systems of record remain authoritative. CoCo indexes their content, 
                              understands relationships, and retrieves the right information—with every 
                              answer traceable back to its source.
                            </p>
                            <p>
                              Built with clear SLOs: sub-second retrieval, 99.9% uptime, full audit trail. 
                              Every response includes citations. Every query is logged. MLR gateway validates 
                              compliance before content surfaces to users.
                            </p>
                            <div className="fde-capabilities">
                              <div><strong>Answers:</strong> &quot;What&apos;s the fair balance for Abrysvo?&quot;</div>
                              <div><strong>Finds:</strong> &quot;Find approved Comirnaty templates for US market.&quot;</div>
                              <div><strong>Guides:</strong> &quot;How do I submit to MLR?&quot;</div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* REPLACED: Static image with Latency chart */}
                            <InlineLatencyChart data={engineerLatencyData} />
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>CoCo Service Health Dashboard</h4>
                            <p>Real-time monitoring across all platform services. Target SLOs: p95 &lt;300ms, 99.7% uptime, &lt;0.1% error rate.</p>
                          </div>
                          <div className="fde-chart-container">
                            <ServiceHealthDashboard data={engineerServiceData} title="Platform Service Health" width={700} height={520} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENABLE */}
                    <AccordionSection
                      title="Enable"
                      subtitle="User activation, satisfaction, training completion"
                      isOpen={openSections.enable}
                      onToggle={() => toggleSection('enable')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Agentic onboarding: learn by doing, not by reading manuals.</h3>
                            <p>
                              Traditional onboarding fails at scale. You can&apos;t have 200 trainers for 
                              1,000 new hires. CoCo turns onboarding into an agentic experience: new employees 
                              ask questions as they arise, get immediate answers with context, and become 
                              productive in days instead of months.
                            </p>
                            <p>
                              Trained 200+ users across content production, MLR review, and brand management. 
                              Created playbooks for common workflows. Established feedback loops to continuously 
                              improve retrieval quality.
                            </p>
                            <div className="fde-before-after">
                              <div className="fde-before">
                                <h4>Before</h4>
                                <ul>
                                  <li>✕ Week-long training</li>
                                  <li>✕ 200-page manual</li>
                                  <li>✕ 3-4 months to productive</li>
                                </ul>
                              </div>
                              <div className="fde-after">
                                <h4>After</h4>
                                <ul>
                                  <li>✓ Day-one access</li>
                                  <li>✓ Ask as you go</li>
                                  <li>✓ Productive in days</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* REPLACED: Static image with Sparkline metrics */}
                            <InlineSparklines data={enableSparklineData} />
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>New Hire Onboarding Journey</h4>
                            <p>From first day to first approval in under a week — powered by CoCo&apos;s guided assistance.</p>
                          </div>
                          <div className="fde-chart-container">
                            <CustomerJourneyMap data={enableJourneyData} title="Content Producer Onboarding Journey" width={800} height={600} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* IMPACT */}
                    <AccordionSection
                      title="Impact"
                      subtitle="Cycle time, throughput, savings, expansion readiness"
                      isOpen={openSections.impact}
                      onToggle={() => toggleSection('impact')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The Result</h3>
                            <p>
                              Publicis onboarded nearly 1,000 staff in time for peak vaccine season. MLR cycles 
                              dropped from 42 days to 14 days. Content throughput tripled. New hires were 
                              productive in days because CoCo was always there to answer questions, find content, 
                              and guide them through unfamiliar processes.
                            </p>
                            <p>
                              CoCo became the default way to work—not because it was mandated, but because it 
                              was faster. Today it serves as Pfizer&apos;s vaccines content backbone, with 
                              expansion planned for additional therapeutic areas.
                            </p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">42 days</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">14 days</span>
                                <span className="fde-impact-label">MLR Cycle Time</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">272/mo</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">816/mo</span>
                                <span className="fde-impact-label">Asset Throughput</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">25 min</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">&lt;1 min</span>
                                <span className="fde-impact-label">Content Search</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* REPLACED: Static image with ROI Summary */}
                            <div style={{ 
                              backgroundColor: '#1a1a1a', 
                              padding: '24px', 
                              borderRadius: '8px',
                              color: '#fff'
                            }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Annual Value Summary
                              </div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>$2.08M</div>
                                <div style={{ fontSize: '12px', color: '#ccc' }}>Annual Savings</div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>96.5%</div>
                                  <div style={{ fontSize: '10px', color: '#aaa' }}>Year 1 ROI</div>
                                </div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>6 mo</div>
                                  <div style={{ fontSize: '10px', color: '#aaa' }}>Payback Period</div>
                                </div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>490%</div>
                                  <div style={{ fontSize: '10px', color: '#aaa' }}>3-Year ROI</div>
                                </div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>0</div>
                                  <div style={{ fontSize: '10px', color: '#aaa' }}>Compliance Issues</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Annual Value Creation — $2.08M</h4>
                            <p>Breakdown of cost savings and productivity gains from CoCo deployment.</p>
                          </div>
                          <div className="fde-chart-container">
                            <WaterfallChart data={impactWaterfallData} title="CoCo ROI Breakdown ($10K units)" width={700} height={350} />
                          </div>
                        </div>

                        {/* Total Cost of Ownership */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Total Cost of Ownership Analysis</h4>
                            <p>Investment breakdown vs. realized savings — 96.5% ROI in Year 1.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                              <div>
                                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Annual Investment: $1.06M</h5>
                                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Azure Infrastructure</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$222K</td></tr>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>OpenAI API Costs</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$98K</td></tr>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Cognitive Search</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$54K</td></tr>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Development Team</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$540K</td></tr>
                                    <tr><td style={{ padding: '8px 0' }}>Maintenance & Support</td><td style={{ padding: '8px 0', textAlign: 'right' }}>$144K</td></tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#333' }}>Annual Savings: $2.08M</h5>
                                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Search Time Savings</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$780K</td></tr>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>MLR Cycle Reduction</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$624K</td></tr>
                                    <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Reduced Rework</td><td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>$456K</td></tr>
                                    <tr><td style={{ padding: '8px 0' }}>Faster Onboarding</td><td style={{ padding: '8px 0', textAlign: 'right' }}>$222K</td></tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '6px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
                              <div>
                                <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>Net Annual Benefit</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>$1.02M</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>Payback Period</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>6 months</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>Year 1 ROI</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>96.5%</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>3-Year ROI</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>490%</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lessons Learned */}
                        <div className="fde-lessons-learned" style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8f8f8', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                          <h4 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>Lessons Learned</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#333' }}>What Worked Well</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>Embedding with users for 2 weeks before coding — shadowing revealed the real bottlenecks</li>
                                <li>Graph-RAG for relationship mapping — dramatically improved cross-brand content discovery</li>
                                <li>Teams integration — zero friction adoption because CoCo met users where they worked</li>
                              </ul>
                            </div>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#666' }}>What We&apos;d Do Differently</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>Started with smaller pilot (50 users) before scaling — initial feedback loop was too slow</li>
                                <li>Invested earlier in prompt engineering playbooks — inconsistent prompts caused retrieval variance</li>
                                <li>Built synthetic test datasets sooner — production testing delayed the feedback cycle</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fff', borderRadius: '6px', borderLeft: '4px solid #1a1a1a' }}>
                            <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', color: '#333' }}>
                              &quot;The biggest ROI came not from the AI itself, but from finally having a single source of truth. 
                              CoCo forced us to clean up 20+ fragmented systems into one governed knowledge layer.&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    </div>
                  </div>
                </main>

                <FDEFooter bgColor="#1a1a1a" />
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </CursorAndBackgroundProvider>
    </ScrollSmoothProvider>
  );
};

export default FDECaseStudy01;
