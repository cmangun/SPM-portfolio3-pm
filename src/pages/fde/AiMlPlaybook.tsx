'use client';
/**
 * AI/ML Production Playbook v7.5
 * Standalone 12-Month Enterprise Roadmap for Regulated Environments
 *
 * Duplicated from the enterprise-ai-playbook-demo for the SPM Portfolio site
 * with the Portfolio back link pointing to the SPM homepage.
 */
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// WebGL hero image from homepage slider
import heroImage from '@/../public/assets/img/webgl/AiPlaybook.jpg';

// Charts
import MonthlyRoadmap from '@/charts_D3/MonthlyRoadmap';
import LayerModelChart from '@/charts_D3/LayerModelChart';
import OKRTracker from '@/charts_D3/OKRTracker';
import SparklineGrid from '@/charts_D3/SparklineGrid';
import WaterfallChart from '@/charts_D3/WaterfallChart';

// Governance Framework Layer Model
const governanceLayerData = {
  title: 'Phase Exit Contract Framework',
  subtitle: 'Every phase requires explicit contracts before proceeding',
  layers: [
    {
      id: 'truth',
      number: 1,
      title: 'Truth Contract',
      bullets: ['New truths recorded with evidence', 'Unknowns named (not hidden)', 'Assumptions time-boxed'],
      whyItExists: 'Reality is shared—fewer arguments downstream'
    },
    {
      id: 'economic',
      number: 2,
      title: 'Economic Contract',
      bullets: ['Unit of AI Work defined', 'Cost ceiling and guardrails set', 'Kill thresholds documented'],
      whyItExists: 'Model that cannot pay for itself is liability not asset'
    },
    {
      id: 'risk',
      number: 3,
      title: 'Risk Contract',
      bullets: ['Risks introduced/retired listed', 'Abuse and failure modes reviewed', 'Compliance implications confirmed'],
      whyItExists: 'Risk is designed out—fewer heroics required'
    },
    {
      id: 'ownership',
      number: 4,
      title: 'Ownership Contract',
      bullets: ['Named owner assigned (not committee)', 'Escalation path defined', 'Review cadence scheduled'],
      whyItExists: 'Explicit ownership—fewer surprises at handoff'
    },
  ],
};

// Executive Control Surface OKRs
const executiveOKRData = {
  period: 'Monthly Executive Review',
  company: 'Enterprise AI Program',
  overallProgress: 94,
  objectives: [
    {
      id: 'obj-1',
      title: 'Unit Economics Health',
      owner: 'Finance',
      ownerRole: 'CFO',
      icon: 'target',
      color: '#333',
      confidence: 96,
      keyResults: [
        { id: 'kr-1-1', title: 'Cost per inference < $0.02', target: 0.02, current: 0.018, unit: '$', status: 'complete' as const, inverse: true },
        { id: 'kr-1-2', title: 'Value per inference > $0.15', target: 0.15, current: 0.21, unit: '$', status: 'complete' as const },
        { id: 'kr-1-3', title: 'Break-even within 6 months', target: 6, current: 4, unit: 'mo', status: 'complete' as const, inverse: true },
      ]
    },
    {
      id: 'obj-2',
      title: 'Model Performance',
      owner: 'ML Engineering',
      ownerRole: 'Director',
      icon: 'trending',
      color: '#333',
      confidence: 92,
      keyResults: [
        { id: 'kr-2-1', title: 'Accuracy drift < 5%', target: 5, current: 2.3, unit: '%', status: 'complete' as const, inverse: true },
        { id: 'kr-2-2', title: 'Error rate < 0.5%', target: 0.5, current: 0.12, unit: '%', status: 'complete' as const, inverse: true },
        { id: 'kr-2-3', title: 'Human override rate 5-15%', target: 10, current: 8.5, unit: '%', status: 'complete' as const },
      ]
    },
    {
      id: 'obj-3',
      title: 'Operational Resilience',
      owner: 'SRE',
      ownerRole: 'VP Engineering',
      icon: 'shield',
      color: '#333',
      confidence: 98,
      keyResults: [
        { id: 'kr-3-1', title: 'Time-to-rollback < 15 min', target: 15, current: 8, unit: 'min', status: 'complete' as const, inverse: true },
        { id: 'kr-3-2', title: 'Compliance gap = 0', target: 0, current: 0, unit: 'gaps', status: 'complete' as const },
        { id: 'kr-3-3', title: 'Bus factor > 2', target: 2, current: 4, unit: 'people', status: 'complete' as const },
      ]
    },
  ]
};

// Adoption Sparklines
const adoptionSparklineData = [
  {
    label: 'Organizations Using',
    values: [2, 4, 6, 9, 12, 15, 18, 22, 26, 31, 38, 45],
    current: 45,
    change: 125,
    format: (v: number) => `${v}`
  },
  {
    label: 'Avg Implementation Time',
    values: [14, 13.5, 13, 12.5, 12, 11.5, 11, 10.5, 10, 9.5, 9, 8.5],
    current: 8.5,
    change: -39.3,
    format: (v: number) => `${v}mo`
  },
  {
    label: 'Phase Completion Rate',
    values: [68, 71, 74, 77, 80, 82, 84, 86, 88, 90, 92, 94],
    current: 94,
    change: 38.2,
    format: (v: number) => `${v}%`
  },
  {
    label: 'Compliance Pass Rate',
    values: [82, 84, 86, 88, 90, 91, 92, 93, 94, 95, 96, 98],
    current: 98,
    change: 19.5,
    format: (v: number) => `${v}%`
  },
];

// Impact Waterfall - Failure Prevention Value
const impactWaterfallData = [
  { label: 'Potential Loss', value: 180, type: 'total' as const },
  { label: 'Invisible Drift ($47M)', value: -47, type: 'decrease' as const },
  { label: 'Helpful Hallucination ($2.3M)', value: -23, type: 'decrease' as const },
  { label: 'Orphaned Model ($9.6M)', value: -10, type: 'decrease' as const },
  { label: 'Compliance Surprise ($123M)', value: -64, type: 'decrease' as const },
  { label: 'Value Protected', value: 36, type: 'total' as const },
];

// Phase data
const phases = [
  { month: '01', name: 'Ontology', quarter: 'Q1', focus: 'Establishes shared vocabulary and conceptual boundaries before any coding begins. Domain expert identification, concept harvesting, and terminology alignment.' },
  { month: '02', name: 'Problem Space', quarter: 'Q1', focus: 'Stress-tests problem definition and validates assumptions across stakeholder perspectives. Boundary definition and validation.' },
  { month: '03', name: 'Discovery', quarter: 'Q1', focus: 'Translates business needs into machine learning problem statements with data inventory. Stakeholder interviews and data assessment.' },
  { month: '04', name: 'Alignment', quarter: 'Q2', focus: 'Locks stakeholder alignment, designs end-to-end architecture, validates ROI projection. First economic gate.' },
  { month: '05', name: 'Integration', quarter: 'Q2', focus: 'Connects ML system to enterprise infrastructure, security, and compliance frameworks. Cloud selection and IaC modules.' },
  { month: '06', name: 'Build', quarter: 'Q2', focus: 'Constructs reproducible model pipelines with mandatory telemetry instrumentation. Reproducible builds with telemetry.' },
  { month: '07', name: 'Validation', quarter: 'Q3', focus: 'Rigorous testing across functional, performance, fairness, and security dimensions with evidence pack. Bias checks and pen testing.' },
  { month: '08', name: 'Pre-Production', quarter: 'Q3', focus: 'Staging deployment with load testing and statistical validation of rollout design. Second economic gate.' },
  { month: '09', name: 'Hypercare', quarter: 'Q3', focus: 'Intensive post-launch support with 24/7 monitoring and rapid iteration on emergent issues.' },
  { month: '10', name: 'Production', quarter: 'Q4', focus: 'Full rollout with deployment patterns, autoscaling, and operational runbooks. Rollback plans validated.' },
  { month: '11', name: 'Reliability', quarter: 'Q4', focus: 'Establishes observability stack, on-call rotations, and model decay detection. Logging and tracing.' },
  { month: '12', name: 'Continuous Improvement', quarter: 'Q4', focus: 'Automation, knowledge sharing, technical debt assessment, and ROI validation. Third economic gate.' },
];

// Failure autopsies
const failureAutopsies = [
  { name: 'The Invisible Drift', industry: 'Financial Services', loss: '$47M direct losses', root: 'No economic kill threshold, tracked ML metrics not business outcomes', prevention: 'Cost Telemetry Contract with kill thresholds' },
  { name: 'The Helpful Hallucination', industry: 'Healthcare', loss: '$2.3M settlement + 18mo delay', root: 'Skipped Phase 7 validation, no hallucination detection', prevention: 'Domain expert sampling, red team evaluation' },
  { name: 'The Orphaned Model', industry: 'E-Commerce', loss: '$8.2M lost revenue', root: 'Retraining pipeline on departed engineer\'s laptop', prevention: 'Named owner assignment, Model Card requirement' },
  { name: 'The Compliance Surprise', industry: 'Insurance', loss: '$123M (fine + class action)', root: 'Legal consulted at end not beginning, zip code as race proxy', prevention: 'Phase 3.4 regulatory constraint mapping' },
];

// LLM-specific controls
const llmControls = [
  { id: 'L.1', risk: 'Prompt Injection', phase: 'Build (6)', mitigation: 'Input sanitization + allow-list', owner: 'Security' },
  { id: 'L.2', risk: 'Tool-Call Drift', phase: 'Build (6)', mitigation: 'Schema version pinning', owner: 'Platform' },
  { id: 'L.3', risk: 'Retrieval Contamination', phase: 'Validation (7)', mitigation: 'Signed data sources', owner: 'Data' },
  { id: 'L.4', risk: 'Context Window Decay', phase: 'Pre-Prod (8)', mitigation: 'Max length + truncation audit', owner: 'ML' },
  { id: 'L.5', risk: 'Hallucination', phase: 'Validation (7)', mitigation: 'Factual grounding + sampling', owner: 'ML' },
  { id: 'L.6', risk: 'Output Validation', phase: 'Pre-Prod (8)', mitigation: 'PII scrubbing + format check', owner: 'Security' },
  { id: 'L.7', risk: 'Agent Loop Escape', phase: 'Build (6)', mitigation: 'Hard budget caps (steps, tokens, cost, time)', owner: 'Platform' },
  { id: 'L.8', risk: 'Tool Misuse', phase: 'Validation (7)', mitigation: 'Mandatory tool allowlists (default deny)', owner: 'Security' },
];

// Implementation templates
const templates = [
  { id: 'T.1', name: 'RACI Matrix', desc: 'AI/ML lifecycle responsibilities across phases' },
  { id: 'T.2', name: 'Risk Register', desc: 'Named risks with mitigation owners and review cadences' },
  { id: 'T.3', name: 'Model Card', desc: 'Standardized model documentation for auditability' },
  { id: 'T.4', name: 'Datasheet for Datasets', desc: 'Provenance, quality, and bias documentation' },
  { id: 'T.5', name: 'Cost Telemetry Contract', desc: 'Six mandatory metrics with kill thresholds' },
  { id: 'T.6', name: 'Incident Response Runbook', desc: 'Escalation paths and rollback procedures' },
];

// Section nav items
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'phases', label: 'The 12 Phases' },
  { id: 'governance', label: 'Governance' },
  { id: 'failures', label: 'Failure Studies' },
  { id: 'controls', label: 'Controls' },
  { id: 'templates', label: 'Templates' },
  { id: 'adoption', label: 'Adoption' },
  { id: 'impact', label: 'Impact' },
];

const sectionStyle = {
  padding: '60px 0',
  borderBottom: '1px solid #1a1a1a',
};

const AiMlPlaybook = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div style={{ background: '#0d0d0d', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      {/* Fixed Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(13, 13, 13, 0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #222',
      }}>
        {/* Top bar with Portfolio back link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 32px' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
            &larr; Portfolio
          </Link>
          <span style={{ color: '#64748b', fontSize: '13px' }}>v7.5</span>
        </div>
        {/* Phase navigation */}
        <nav style={{ display: 'flex', gap: '0', overflowX: 'auto', borderTop: '1px solid #1a1a1a' }}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 500,
                color: activeSection === s.id ? '#fff' : '#64748b',
                textDecoration: 'none',
                borderBottom: activeSection === s.id ? '2px solid #fff' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '120px 24px 60px' }}>

        {/* OVERVIEW */}
        <section id="overview" style={sectionStyle}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 12px',
              backgroundColor: '#1a1a1a', border: '1px solid #333',
              color: '#94a3b8', fontSize: '11px', fontWeight: 600,
              letterSpacing: '1px', borderRadius: '4px',
            }}>
              ENTERPRISE AI/ML PLAYBOOK v7.5
            </span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
            AI &amp; ML Production Playbook
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', margin: '0 0 40px', lineHeight: 1.5 }}>
            12-Month Enterprise Roadmap for Regulated Environments
          </p>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
            <Image
              src={heroImage}
              alt="AI/ML Playbook"
              width={400}
              height={280}
              style={{ borderRadius: '8px', objectFit: 'cover', border: '1px solid #222' }}
            />
          </div>

          {/* Key metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
            {[
              { n: '12', d: 'Month roadmap' },
              { n: '139', d: 'Chart taxonomy' },
              { n: '4', d: 'Failure autopsies' },
              { n: '3', d: 'ROI gates' },
            ].map((m, i) => (
              <div key={i} style={{ padding: '20px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>{m.n}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{m.d}</div>
              </div>
            ))}
          </div>

          {/* Core thesis */}
          <div style={{ padding: '24px', backgroundColor: '#111', borderRadius: '8px', borderLeft: '4px solid #94a3b8' }}>
            <p style={{ margin: 0, fontSize: '15px', color: '#e0e0e0', lineHeight: 1.6 }}>
              Most production AI failures are organizational before they are technical. This playbook is a governance
              framework for deploying AI/ML systems in enterprises—emphasizing human decision-making, economic viability,
              and operational durability over pure technical optimization.
            </p>
          </div>
        </section>

        {/* THE 12 PHASES */}
        <section id="phases" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>The 12 Phases</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            Quarterly organization with ROI gates at phases 4, 8, and 12.
          </p>

          {/* Quarter groupings */}
          {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
            <div key={quarter} style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {quarter} — {quarter === 'Q1' ? 'Diagnostics' : quarter === 'Q2' ? 'Architect' : quarter === 'Q3' ? 'Engineer' : 'Enable'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {phases.filter(p => p.quarter === quarter).map((phase, i) => (
                  <div key={i} style={{
                    padding: '16px', backgroundColor: '#111', borderRadius: '8px',
                    border: '1px solid #222', borderLeft: '3px solid #94a3b8',
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                      PHASE {phase.month}
                      {(phase.month === '04' || phase.month === '08' || phase.month === '12') &&
                        <span style={{ marginLeft: '8px', color: '#f59e0b', fontSize: '10px' }}>$ ROI GATE</span>
                      }
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{phase.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>{phase.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Roadmap Chart */}
          <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}>
            <MonthlyRoadmap title="Enterprise AI/ML Roadmap" width={700} height={500} />
          </div>
        </section>

        {/* GOVERNANCE */}
        <section id="governance" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Governance Framework</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            Every phase requires explicit sign-off on four contracts before proceeding.
          </p>

          {/* Phase Exit Contracts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {governanceLayerData.layers.map((layer, i) => (
              <div key={i} style={{ padding: '20px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>CONTRACT {layer.number}</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>{layer.title}</div>
                <ul style={{ margin: '0 0 12px', paddingLeft: '16px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                  {layer.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>{layer.whyItExists}</div>
              </div>
            ))}
          </div>

          {/* Gate Types */}
          <div style={{ padding: '20px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', marginBottom: '40px' }}>
            <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Gate Types</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
              <div><strong style={{ color: '#fff' }}>HJG</strong> Human Judgment Gate (not automatable)</div>
              <div><strong style={{ color: '#fff' }}>$</strong> Economic Gate (ROI validation required)</div>
              <div><strong style={{ color: '#fff' }}>&amp;#9888;</strong> Irreversibility Flag (costly to unwind)</div>
              <div><strong style={{ color: '#fff' }}>CT</strong> Cost Telemetry Contract (kill bindings)</div>
            </div>
          </div>

          {/* Layer Model Chart */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}>
            <LayerModelChart data={governanceLayerData} />
          </div>
        </section>

        {/* FAILURE CASE STUDIES */}
        <section id="failures" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Failure Case Studies</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            $180M+ in documented losses from skipped phases and missing governance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {failureAutopsies.map((autopsy, i) => (
              <div key={i} style={{
                padding: '20px', backgroundColor: '#111', borderRadius: '8px',
                border: '1px solid #222', borderLeft: '4px solid #ef4444',
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{autopsy.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{autopsy.industry}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f87171', marginBottom: '12px' }}>{autopsy.loss}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}><strong style={{ color: '#fff' }}>Root:</strong> {autopsy.root}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}><strong style={{ color: '#fff' }}>Prevention:</strong> {autopsy.prevention}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTROLS */}
        <section id="controls" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Controls &amp; Monitoring</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            139-chart taxonomy, executive control surface, and LLM-specific risk patterns.
          </p>

          {/* Executive Control Surface */}
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Executive Control Surface</h3>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '40px' }}>
            <OKRTracker data={executiveOKRData} title="Executive AI Observability" width={700} height={450} />
          </div>

          {/* LLM-Specific Controls */}
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>LLM-Specific Controls</h3>
          <div style={{ backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1a1a1a' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #222' }}>ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #222' }}>Risk</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #222' }}>Phase</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #222' }}>Mitigation</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #222' }}>Owner</th>
                </tr>
              </thead>
              <tbody>
                {llmControls.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ padding: '10px 16px', color: '#64748b', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '10px 16px', color: '#e0e0e0' }}>{c.risk}</td>
                    <td style={{ padding: '10px 16px', color: '#94a3b8' }}>{c.phase}</td>
                    <td style={{ padding: '10px 16px', color: '#94a3b8' }}>{c.mitigation}</td>
                    <td style={{ padding: '10px 16px', color: '#fff', fontWeight: 600 }}>{c.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Agentic AI Extension */}
          <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Agentic AI Extension</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              For systems where models orchestrate tools or other models, the playbook adds:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                'Mandatory tool allowlists (default deny)',
                'Hard budget caps (steps, tokens, cost, time)',
                'Human-in-the-loop gates for irreversible actions',
                'Comprehensive tracing with trace IDs',
                'Sandbox execution with resource limits',
                'Stop authority with named kill authority',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                  <span style={{ color: '#22c55e', fontSize: '14px', lineHeight: 1 }}>&#10003;</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Implementation Templates</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            Production-ready artifacts for governance, compliance, and operations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {templates.map((t, i) => (
              <div key={i} style={{ padding: '20px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 700, color: '#fff',
                  backgroundColor: '#333', padding: '4px 8px', borderRadius: '4px', flexShrink: 0,
                }}>{t.id}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '24px', backgroundColor: '#1a0000', borderRadius: '8px', border: '1px solid #331111' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#f87171' }}>Without Playbook</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', lineHeight: 2, color: '#94a3b8' }}>
                <li>Unclear ownership</li>
                <li>No kill criteria</li>
                <li>Late compliance</li>
                <li>Tribal memory</li>
              </ul>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#001a00', borderRadius: '8px', border: '1px solid #113311' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#4ade80' }}>With Playbook</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', lineHeight: 2, color: '#94a3b8' }}>
                <li>Named owners at every phase</li>
                <li>Economic kill thresholds</li>
                <li>Compliance from Phase 3</li>
                <li>Documented, transferable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ADOPTION */}
        <section id="adoption" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Adoption Trends</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            12-month view of playbook adoption across organizations.
          </p>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}>
            <SparklineGrid data={adoptionSparklineData} title="Enterprise AI/ML Playbook KPIs" width={700} height={350} />
          </div>
        </section>

        {/* IMPACT */}
        <section id="impact" style={sectionStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Impact</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>
            Value protected, failure prevention, and organizational outcomes.
          </p>

          {/* Impact metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {[
              { before: '14 months', after: '8.5 months', label: 'Implementation Time' },
              { before: '68%', after: '94%', label: 'Phase Completion' },
              { before: '82%', after: '98%', label: 'Compliance Pass Rate' },
            ].map((m, i) => (
              <div key={i} style={{ padding: '24px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', color: '#64748b', textDecoration: 'line-through' }}>{m.before}</span>
                  <span style={{ color: '#64748b' }}>&rarr;</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>{m.after}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Value summary */}
          <div style={{ padding: '32px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222', textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>$144M</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Value Protected</div>
          </div>

          {/* Waterfall Chart */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '40px' }}>
            <WaterfallChart data={impactWaterfallData} title="Value Protection (in $M)" width={700} height={350} />
          </div>

          {/* Key Principles */}
          <div style={{ padding: '24px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 20px' }}>Key Principles</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>What &quot;Done&quot; Means</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', lineHeight: 1.8, color: '#94a3b8' }}>
                  <li>&quot;Done&quot; is not a model that runs—it&apos;s a capability that can be measured, audited, and re-learned</li>
                  <li>Architecture is in contracts between modules, not in code</li>
                  <li>Models are processes not products</li>
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>What Breaks Teams</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', lineHeight: 1.8, color: '#94a3b8' }}>
                  <li>Compliance treated as sign-off not design constraint</li>
                  <li>Economic viability treated as constraint to work around</li>
                  <li>Autonomy treated as default rather than earned privilege</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0d0d0d', borderRadius: '6px', borderLeft: '4px solid #94a3b8' }}>
              <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', color: '#e0e0e0' }}>
                &quot;Economic viability is not a constraint—it is the governing force. Systems that cannot pay for themselves are liabilities.&quot;
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #222', padding: '40px 0' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 300, color: '#fff' }}>Christopher Mangun</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Senior Project Director Portfolio</div>
            </div>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>
              &larr; Back to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AiMlPlaybook;
