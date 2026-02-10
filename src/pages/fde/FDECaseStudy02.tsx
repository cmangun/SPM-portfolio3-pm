'use client';
/**
 * FDE Case Study 02: Enterprise AI/ML Playbook
 * 12-Month Production Roadmap for Regulated Environments
 * 5-Phase FDE Narrative with Accordion Layout + Charts
 * 
 * UPDATED: Replaced static images with inline chart components
 */
import { useState } from 'react';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import FDEFooter from '@/layouts/footers/FDEFooter';
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

const FDECaseStudy02 = () => {
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
                      <span style={{ 
                        display: 'inline-block',
                        padding: '8px 16px', 
                        backgroundColor: '#1a1a1a', 
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        borderRadius: '4px'
                      }}>
                        ENTERPRISE AI/ML PLAYBOOK v7.4
                      </span>
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title">$51M Healthcare Portfolio</h1>
                        <p className="fde-hero-subtitle">Multi-Brand Delivery Across 13 Pharmaceutical Brands</p>
                        
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Enterprise AI programs fail from missing evidence: unclear intent, no acceptance criteria, no telemetry contracts, no rollback plans, and no operating owners. Managing 13 concurrent pharma brands required a scalable delivery framework with governance, compliance, and cross-functional alignment</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Directed $51M portfolio across Novartis (6 brands) and Sanofi (7 brands) with structured governance, phased delivery, and cross-functional team scaling from 5 to 60+ members</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="AI/ML Playbook" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">12</span>
                        <span className="fde-metric-desc">Month roadmap</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">139</span>
                        <span className="fde-metric-desc">Chart taxonomy</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">4</span>
                        <span className="fde-metric-desc">Failure autopsies</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">3</span>
                        <span className="fde-metric-desc">ROI gates</span>
                      </div>
                    </div>
                  </section>

                  {/* ACCORDION SECTIONS */}
                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                    
                    {/* DIAGNOSE */}
                    <AccordionSection
                      title="Discovery & Assessment"
                      subtitle="Why enterprise AI programs fail: patterns from $180M+ in documented losses"
                      isOpen={openSections.diagnose}
                      onToggle={() => toggleSection('diagnose')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Most programs fail from missing evidence, not missing models.</h3>
                            <p>
                              After analyzing dozens of failed enterprise AI initiatives across financial services, 
                              healthcare, e-commerce, and insurance, clear patterns emerged. Teams weren&apos;t failing 
                              because of technical limitations—they were failing because of organizational gaps.
                            </p>
                            <p>
                              The common thread: <strong>skipped phases create compounding debt</strong>. When teams 
                              skip ontology work, they encode wrong assumptions. When they skip discovery, they build 
                              for the wrong problem. When they skip validation, they ship hallucinating systems.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>$47M</strong>
                                <span>Invisible Drift</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>$123M</strong>
                                <span>Compliance Surprise</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>18mo</strong>
                                <span>Avg recovery time</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Diagnose: Failure Pattern Summary */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Failure Autopsies — $180M+ in Losses</div>
                              {[{n:'Invisible Drift',l:'$47M',i:'Financial Services'},{n:'Helpful Hallucination',l:'$2.3M',i:'Healthcare'},{n:'Orphaned Model',l:'$8.2M',i:'E-Commerce'},{n:'Compliance Surprise',l:'$123M',i:'Insurance'}].map((f,i)=><div key={i} style={{marginBottom:'10px',paddingBottom:'10px',borderBottom:i<3?'1px solid #e5e5e5':'none'}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a'}}>{f.n}</span><span style={{fontSize:'12px',fontWeight:'700',color:'#666'}}>{f.l}</span></div><div style={{fontSize:'10px',color:'#666'}}>{f.i}</div></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Failure Autopsies — Pattern Recognition</h4>
                            <p>Four documented failures with root cause analysis and prevention strategies.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                              {[
                                { name: 'The Invisible Drift', industry: 'Financial Services', loss: '$47M direct losses', root: 'No economic kill threshold, tracked ML metrics not business outcomes', prevention: 'Cost Telemetry Contract with kill thresholds' },
                                { name: 'The Helpful Hallucination', industry: 'Healthcare', loss: '$2.3M settlement + 18mo delay', root: 'Skipped Phase 7 validation, no hallucination detection', prevention: 'Domain expert sampling, red team evaluation' },
                                { name: 'The Orphaned Model', industry: 'E-Commerce', loss: '$8.2M lost revenue', root: 'Retraining pipeline on departed engineer\'s laptop', prevention: 'Named owner assignment, Model Card requirement' },
                                { name: 'The Compliance Surprise', industry: 'Insurance', loss: '$123M (fine + class action)', root: 'Legal consulted at end not beginning, zip code as race proxy', prevention: 'Phase 3.4 regulatory constraint mapping' },
                              ].map((autopsy, i) => (
                                <div key={i} style={{ padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px', borderLeft: '4px solid #1a1a1a' }}>
                                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>{autopsy.name}</div>
                                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>{autopsy.industry}</div>
                                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>{autopsy.loss}</div>
                                  <div style={{ fontSize: '11px', color: '#333', marginBottom: '4px' }}><strong>Root:</strong> {autopsy.root}</div>
                                  <div style={{ fontSize: '11px', color: '#333' }}><strong>Prevention:</strong> {autopsy.prevention}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ARCHITECT */}
                    <AccordionSection
                      title="Planning & Alignment"
                      subtitle="12-month phased roadmap with governance contracts at every phase exit"
                      isOpen={openSections.architect}
                      onToggle={() => toggleSection('architect')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>A year of deliberate organizational change, not twelve months of model building.</h3>
                            <p>
                              The playbook describes 12 phases across 4 quarters. Each quarter solves a human 
                              problem before it becomes a technical or financial one. The sequence matters—
                              skipping phases creates debt that surfaces later, usually at the worst possible time.
                            </p>
                            <p>
                              <strong>Q1 Diagnostics:</strong> Align people on reality before building anything expensive.
                              <strong> Q2 Architect:</strong> Reduce ambiguity so teams stop arguing and start shipping.
                              <strong> Q3 Engineer:</strong> Build with guardrails so operators don&apos;t carry risk.
                              <strong> Q4 Enable:</strong> Make the system survivable after handoff.
                            </p>
                            
                            <div className="fde-tech-stack" style={{ marginTop: '24px', padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
                              <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Gate Types</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                                <div><strong>HJG</strong> Human Judgment Gate (not automatable)</div>
                                <div><strong>$</strong> Economic Gate (ROI validation required)</div>
                                <div><strong>⚠</strong> Irreversibility Flag (costly to unwind)</div>
                                <div><strong>CT</strong> Cost Telemetry Contract (kill bindings)</div>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Architect: Phase Exit Contracts Summary */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phase Exit Contracts</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{n:'Truth',d:'Reality is shared'},{n:'Economic',d:'Model pays for itself'},{n:'Risk',d:'Risk designed out'},{n:'Ownership',d:'Named owner assigned'}].map((c,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a',marginBottom:'4px'}}>{c.n} Contract</div><div style={{fontSize:'10px',color:'#666'}}>{c.d}</div></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>12-Month Production Roadmap</h4>
                            <p>Quarterly view with monthly phases. ROI gates at Phase 4, 8, and 12.</p>
                          </div>
                          <div className="fde-chart-container">
                            <MonthlyRoadmap title="Enterprise AI/ML Roadmap" width={700} height={500} />
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Phase Exit Contract Framework</h4>
                            <p>Every phase requires four explicit contracts before proceeding. No exceptions.</p>
                          </div>
                          <div className="fde-chart-container">
                            <LayerModelChart data={governanceLayerData} />
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Monthly Phase Detail</h4>
                            <p>Each phase has specific deliverables and exit criteria.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                              {[
                                { month: '01', name: 'Ontology', focus: 'Domain expert ID, concept harvesting' },
                                { month: '02', name: 'Problem Space', focus: 'Boundary definition, validation' },
                                { month: '03', name: 'Discovery', focus: 'Stakeholder interviews, data assessment' },
                                { month: '04', name: 'Alignment', focus: 'Priorities, pipeline design [ROI]' },
                                { month: '05', name: 'Integration', focus: 'Cloud selection, IaC modules' },
                                { month: '06', name: 'Build', focus: 'Reproducible builds, telemetry' },
                                { month: '07', name: 'Validation', focus: 'Tests, bias checks, pen testing' },
                                { month: '08', name: 'Pre-Prod', focus: 'Staging, load testing [ROI]' },
                                { month: '09', name: 'Hypercare', focus: 'Launch readiness, rapid iteration' },
                                { month: '10', name: 'Production', focus: 'Deployment, rollback plans' },
                                { month: '11', name: 'Reliability', focus: 'Logging/tracing, on-call' },
                                { month: '12', name: 'Continuous', focus: 'Automation, documentation [ROI]' },
                              ].map((phase, i) => (
                                <div key={i} style={{ padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '6px', borderLeft: '3px solid #1a1a1a' }}>
                                  <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', marginBottom: '4px' }}>MONTH {phase.month}</div>
                                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>{phase.name}</div>
                                  <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>{phase.focus}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENGINEER */}
                    <AccordionSection
                      title="Execution & Delivery"
                      subtitle="139-chart taxonomy, executive control surface, LLM-specific controls"
                      isOpen={openSections.engineer}
                      onToggle={() => toggleSection('engineer')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>&quot;Done&quot; is a capability that can be measured, audited, and re-learned by a new team.</h3>
                            <p>
                              The playbook includes a taxonomy of 139 charts across 13 categories, mapped to specific 
                              phases. Categories include MLOps & Model Lifecycle (22 charts), Data Quality (14), 
                              SRE/Operations (16), Compliance & Audit (10), Human-in-the-Loop (6), and more.
                            </p>
                            <p>
                              For executives, we defined 6 monthly monitoring signals: Unit Economics Health, Model 
                              Performance Decay, Error Rate by Consequence, Human Override Rate, Time-to-Rollback, 
                              and Compliance Drift.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>139</strong>
                                <span>charts in taxonomy</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>13</strong>
                                <span>chart categories</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>8</strong>
                                <span>LLM risk patterns</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Engineer: Chart Taxonomy Summary */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>139-Chart Taxonomy</div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                {[{c:'MLOps',n:22},{c:'Data Quality',n:14},{c:'SRE/Ops',n:16},{c:'Compliance',n:10},{c:'HITL',n:6},{c:'Business',n:12},{c:'Cost',n:8},{c:'Security',n:9},{c:'Risk',n:7}].map((cat,i)=><div key={i} style={{padding:'10px',backgroundColor:'#f8f8f8',borderRadius:'4px',textAlign:'center'}}><div style={{fontSize:'16px',fontWeight:'700',color:'#1a1a1a'}}>{cat.n}</div><div style={{fontSize:'9px',color:'#666'}}>{cat.c}</div></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Executive Control Surface — Monthly Signals</h4>
                            <p>6 monitoring signals for CIO/CTO with critical thresholds.</p>
                          </div>
                          <div className="fde-chart-container">
                            <OKRTracker data={executiveOKRData} title="Executive AI Observability" width={700} height={450} />
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>LLM-Specific Controls</h4>
                            <p>Risk patterns L.1-L.8 with named owners and mitigation strategies.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Risk</th>
                                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Phase</th>
                                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Mitigation</th>
                                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Owner</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.1 Prompt Injection</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Build (6)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Input sanitization + allow-list</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Security</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.2 Tool-Call Drift</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Build (6)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Schema version pinning</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Platform</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.3 Retrieval Contamination</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Validation (7)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Signed data sources</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Data</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.4 Context Window Decay</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Pre-Prod (8)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Max length + truncation audit</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>ML</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.5 Hallucination</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Validation (7)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Factual grounding + sampling</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>ML</td></tr>
                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>L.6 Output Validation</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Pre-Prod (8)</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>PII scrubbing + format check</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Security</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENABLE */}
                    <AccordionSection
                      title="Launch & Adoption"
                      subtitle="Implementation templates, model cards, incident response, adoption tracking"
                      isOpen={openSections.enable}
                      onToggle={() => toggleSection('enable')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Systems that work, are trusted, and remain governable after leadership attention moves elsewhere.</h3>
                            <p>
                              The playbook includes implementation templates for RACI Matrix (T.1), Risk Register (T.2), 
                              Model Cards (T.3), Datasheets for Datasets (T.4), Cost Telemetry Contracts (T.5), and 
                              Incident Response Runbooks (T.6).
                            </p>
                            <div className="fde-before-after">
                              <div className="fde-before">
                                <h4>Without Playbook</h4>
                                <ul>
                                  <li>✕ Unclear ownership</li>
                                  <li>✕ No kill criteria</li>
                                  <li>✕ Late compliance</li>
                                  <li>✕ Tribal memory</li>
                                </ul>
                              </div>
                              <div className="fde-after">
                                <h4>With Playbook</h4>
                                <ul>
                                  <li>✓ Named owners at every phase</li>
                                  <li>✓ Economic kill thresholds</li>
                                  <li>✓ Compliance from Phase 3</li>
                                  <li>✓ Documented, transferable</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Enable: Templates Summary */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Implementation Templates</div>
                              {[{id:'T.1',n:'RACI Matrix'},{id:'T.2',n:'Risk Register'},{id:'T.3',n:'Model Card'},{id:'T.4',n:'Datasheet'},{id:'T.5',n:'Cost Telemetry'},{id:'T.6',n:'Incident Runbook'}].map((t,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}><span style={{fontSize:'10px',fontWeight:'700',color:'#1a1a1a',backgroundColor:'#e5e5e5',padding:'2px 6px',borderRadius:'3px'}}>{t.id}</span><span style={{fontSize:'12px',color:'#333'}}>{t.n}</span></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Playbook Adoption Trends — 12 Month View</h4>
                            <p>Key metrics showing adoption across organizations and implementation improvements.</p>
                          </div>
                          <div className="fde-chart-container">
                            <SparklineGrid data={adoptionSparklineData} title="Enterprise AI/ML Playbook KPIs" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* IMPACT */}
                    <AccordionSection
                      title="Impact"
                      subtitle="Value protected, failure prevention, organizational outcomes"
                      isOpen={openSections.impact}
                      onToggle={() => toggleSection('impact')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The goal is durability—systems that work after leadership attention moves elsewhere.</h3>
                            <p>
                              A good year ends with: fewer arguments (reality is shared), fewer heroics (risk is 
                              designed out), fewer surprises (incentives and ownership are explicit), and continuity 
                              (system functions when original team leaves).
                            </p>
                            <p>
                              Organizations using the playbook report 39% faster implementations, 98% compliance pass 
                              rates, and the ability to say &quot;no&quot; as confidently as &quot;yes&quot;—because the economic and 
                              risk analysis is explicit.
                            </p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">14 months</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">8.5 months</span>
                                <span className="fde-impact-label">Implementation Time</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">68%</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">94%</span>
                                <span className="fde-impact-label">Phase Completion</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">82%</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">98%</span>
                                <span className="fde-impact-label">Compliance Pass Rate</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Impact: ROI Summary */}
                            <div style={{ backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '8px', color: '#fff' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Value Summary</div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>$144M</div>
                                <div style={{ fontSize: '12px', color: '#ccc' }}>Value Protected</div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>39%</div><div style={{ fontSize: '10px', color: '#aaa' }}>Faster Implementation</div></div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>98%</div><div style={{ fontSize: '10px', color: '#aaa' }}>Compliance Pass</div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Failure Prevention Value — $144M Protected</h4>
                            <p>Breakdown of potential losses prevented through playbook governance patterns.</p>
                          </div>
                          <div className="fde-chart-container">
                            <WaterfallChart data={impactWaterfallData} title="Value Protection (in $M)" width={700} height={350} />
                          </div>
                        </div>

                        <div className="fde-lessons-learned" style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8f8f8', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                          <h4 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>Key Principles</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>What &quot;Done&quot; Means</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>&quot;Done&quot; is not a model that runs—it&apos;s a capability that can be measured, audited, and re-learned</li>
                                <li>Architecture is in contracts between modules, not in code</li>
                                <li>Models are processes not products</li>
                              </ul>
                            </div>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>What Breaks Teams</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>Compliance treated as sign-off not design constraint</li>
                                <li>Economic viability treated as constraint to work around</li>
                                <li>Autonomy treated as default rather than earned privilege</li>
                              </ul>
                            </div>
                          </div>
                          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fff', borderRadius: '6px', borderLeft: '4px solid #1a1a1a' }}>
                            <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', color: '#333' }}>
                              &quot;Skipping phases creates debt that surfaces later—usually at the worst possible time. The playbook forces those decisions earlier.&quot;
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

export default FDECaseStudy02;
