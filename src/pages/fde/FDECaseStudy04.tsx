'use client';
/**
 * FDE Case Study 04: Pfizer Global Content Automation
 * Human-in-the-loop governance, MLR automation, RAG pipeline
 * 5-Phase FDE Narrative with Accordion Layout + Charts
 * 
 * ENHANCED: Added model metrics, escalation flow, confusion matrix, lessons learned
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
import RACIMatrix from '@/charts_D3/RACIMatrix';
import RAGPipeline from '@/charts_D3/RAGPipeline';
import LatencyPercentiles from '@/charts_D3/LatencyPercentiles';
import SparklineGrid from '@/charts_D3/SparklineGrid';
import EscalationFlowDiagram from '@/charts_D3/EscalationFlowDiagram';
import MLRConfusionMatrix from '@/charts_D3/MLRConfusionMatrix';

// Images for Case Study 04
import pfizerLogo from '@/../public/assets/img/fde/case-study-01/Pfizer_(2021).png';

// WebGL hero image from homepage slider  
import heroImage from '@/../public/assets/img/webgl/pfizer-content-auto.jpg';

// Chart Data - MLR Content Workflow RACI
const mlrRACIData = {
  project: 'MLR Content Automation',
  lastUpdated: 'Mar 2024',
  workstreams: [
    { id: 'ws1', name: 'Content Drafting', category: 'Creation' },
    { id: 'ws2', name: 'Claims Extraction', category: 'Validation' },
    { id: 'ws3', name: 'RAG Validation', category: 'Validation' },
    { id: 'ws4', name: 'MLR Review', category: 'Approval' },
    { id: 'ws5', name: 'Legal Sign-off', category: 'Approval' },
    { id: 'ws6', name: 'Publication', category: 'Delivery' },
  ],
  stakeholders: [
    { id: 'p1', name: 'Content Team', role: 'Content Creator', team: 'Creative', initials: 'CT' },
    { id: 'p2', name: 'AI System', role: 'Automation', team: 'Platform', initials: 'AI' },
    { id: 'p3', name: 'MLR Lead', role: 'MLR Reviewer', team: 'Compliance', initials: 'ML' },
    { id: 'p4', name: 'Medical', role: 'Medical Advisor', team: 'Medical', initials: 'MD' },
    { id: 'p5', name: 'Legal', role: 'Legal Counsel', team: 'Legal', initials: 'LG' },
    { id: 'p6', name: 'Brand Lead', role: 'Brand Manager', team: 'Marketing', initials: 'BL' },
  ],
  assignments: {
    'ws1-p1': 'R', 'ws1-p6': 'A', 'ws1-p3': 'C',
    'ws2-p2': 'R', 'ws2-p1': 'I', 'ws2-p3': 'A',
    'ws3-p2': 'R', 'ws3-p3': 'A', 'ws3-p4': 'C',
    'ws4-p3': 'R', 'ws4-p4': 'C', 'ws4-p6': 'A', 'ws4-p5': 'I',
    'ws5-p5': 'R', 'ws5-p3': 'C', 'ws5-p6': 'A',
    'ws6-p1': 'R', 'ws6-p6': 'A', 'ws6-p3': 'I', 'ws6-p5': 'I',
  } as Record<string, string>,
};

const enableSparklineData = [
  { 
    label: 'Content Velocity', 
    values: [120, 135, 150, 168, 185, 200, 218, 235, 250, 268, 285, 300],
    current: 300,
    change: 150,
    format: (v: number) => `${v}/mo`
  },
  { 
    label: 'Review Time', 
    values: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 4],
    current: 4,
    change: -71.4,
    format: (v: number) => `${v}d`
  },
  { 
    label: 'Auto-Validation', 
    values: [15, 22, 30, 38, 45, 52, 58, 65, 70, 75, 78, 82],
    current: 82,
    change: 446.7,
    format: (v: number) => `${v}%`
  },
  { 
    label: 'Error Rate', 
    values: [8.5, 7.8, 7.0, 6.2, 5.5, 4.8, 4.2, 3.6, 3.0, 2.5, 2.1, 1.8],
    current: 1.8,
    change: -78.8,
    format: (v: number) => `${v.toFixed(1)}%`
  },
];

// Escalation Flow Data - NEW
const escalationFlowData = {
  title: 'AI Validation Escalation Framework',
  subtitle: 'Confidence-based routing for MLR content review',
  thresholds: [
    {
      level: 'Auto-Approve',
      minConfidence: 95,
      maxConfidence: 100,
      action: 'Direct approval with audit log',
      sla: 'Instant',
      volume: 42
    },
    {
      level: 'Fast-Track Review',
      minConfidence: 80,
      maxConfidence: 95,
      action: 'Expedited human review queue',
      sla: '< 2 hours',
      volume: 31
    },
    {
      level: 'Standard Review',
      minConfidence: 60,
      maxConfidence: 80,
      action: 'Normal MLR review queue',
      sla: '< 24 hours',
      volume: 19
    },
    {
      level: 'Senior Review',
      minConfidence: 0,
      maxConfidence: 60,
      action: 'Senior reviewer + AI explanation',
      sla: '< 48 hours',
      volume: 8
    },
  ]
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

const FDECaseStudy04 = () => {
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
                  <section className="fde-hero-section">
                    <div className="fde-logo-container">
                      <Image src={pfizerLogo} alt="Pfizer" width={150} height={48} className="fde-client-logo-img" />
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title" >Content Automation</h1>
                        <p className="fde-hero-subtitle" >MLR Workflow Optimization & Content Review Process Redesign</p>
                        
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Manual MLR reviews creating 14-day bottlenecks; inconsistent claim validation across regions; no traceability</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>MLR workflow optimization with structured governance and cross-team coordination, reducing review turnaround by 71%</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="Pfizer Content Automation Platform" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">71%</span>
                        <span className="fde-metric-desc">Faster reviews</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">82%</span>
                        <span className="fde-metric-desc">Auto-validation rate</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">300</span>
                        <span className="fde-metric-desc">Assets/month</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">100%</span>
                        <span className="fde-metric-desc">Audit traceability</span>
                      </div>
                    </div>
                  </section>

                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                    
                    {/* DIAGNOSE */}
                    <AccordionSection
                      title="Discovery & Assessment"
                      subtitle="Workflow complexity, approval bottlenecks, compliance gaps"
                      isOpen={openSections.diagnose}
                      onToggle={() => toggleSection('diagnose')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Every piece of content. Every claim. Every region. Manual review.</h3>
                            <p>
                              Pfizer&apos;s global content operations span dozens of brands across hundreds 
                              of markets. Every promotional asset requires MLR (Medical, Legal, Regulatory) 
                              review. Every claim must be validated against approved sources.
                            </p>
                            <p>
                              The existing process was entirely manual. Content creators submitted assets, 
                              waited days for reviewer availability, received feedback via email, made 
                              revisions, and resubmitted. Average cycle: 14 days. And no system tracked 
                              which version of which claim was approved for which market.
                            </p>
                            <p>
                              I mapped the entire workflow—every handoff, every approval gate, every 
                              potential failure point. The RACI was a mess of overlapping responsibilities.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>14</strong>
                                <span>day review cycle</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>0%</strong>
                                <span>automation</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>8+</strong>
                                <span>stakeholder handoffs</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Diagnose: MLR Pain Points */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MLR Review Bottlenecks</div>
                              {[{n:'Manual Review',d:'14-day average cycle time'},{n:'Inconsistent',d:'Reviewer-dependent outcomes'},{n:'No Reuse',d:'Prior decisions not leveraged'},{n:'Compliance Risk',d:'FDA citation concerns'}].map((r,i)=><div key={i} style={{marginBottom:'10px',paddingBottom:'10px',borderBottom:i<3?'1px solid #e5e5e5':'none'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a'}}>{r.n}</div><div style={{fontSize:'10px',color:'#666'}}>{r.d}</div></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Content Workflow RACI Matrix</h4>
                            <p>Mapping responsibilities across 8 stakeholder groups for 5 core workflow stages.</p>
                          </div>
                          <div className="fde-chart-container">
                            <RACIMatrix data={mlrRACIData} title="MLR Content Workflow" width={700} height={400} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ARCHITECT */}
                    <AccordionSection
                      title="Planning & Alignment"
                      subtitle="RAG pipeline, claims validation, human-in-the-loop governance"
                      isOpen={openSections.architect}
                      onToggle={() => toggleSection('architect')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>AI acceleration. Human judgment. Full traceability.</h3>
                            <p>
                              The solution isn&apos;t to remove humans from MLR review—it&apos;s to make their 
                              time count. The RAG pipeline pre-validates claims against approved sources, 
                              flags potential issues, and routes only the exceptions to human reviewers.
                            </p>
                            <p>
                              Architecture: content ingestion → claim extraction → RAG validation against 
                              approved claims library → confidence scoring → routing. High-confidence 
                              validations proceed automatically. Low-confidence items queue for human review.
                            </p>
                            <div className="fde-pipeline">
                              <span className="fde-pipeline-step">Ingest</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Extract</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Validate</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Route</span>
                              <span className="fde-pipeline-arrow">→</span>
                              <span className="fde-pipeline-step">Approve</span>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Architect: RAG Pipeline */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MLR RAG Architecture</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                                {['Content Ingestion → Vector Store','Prior Decisions → Knowledge Graph','AI Review → Confidence Score','Human Validation → Approval'].map((step,i)=><div key={i} style={{padding:'10px',backgroundColor:'#f8f8f8',borderRadius:'4px',fontSize:'11px',color:'#333',borderLeft:'3px solid #1a1a1a'}}>{step}</div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Content Automation RAG Pipeline</h4>
                            <p>Retrieval-augmented validation with human-in-the-loop governance for low-confidence decisions.</p>
                          </div>
                          <div className="fde-chart-container">
                            <RAGPipeline title="MLR Content Validation Pipeline" width={700} height={400} />
                          </div>
                        </div>

                        {/* NEW: Escalation Flow Diagram */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>AI Validation Escalation Framework</h4>
                            <p>Confidence-based routing ensures high-risk decisions always get human oversight.</p>
                          </div>
                          <div className="fde-chart-container">
                            <EscalationFlowDiagram data={escalationFlowData} width={800} height={450} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENGINEER */}
                    <AccordionSection
                      title="Execution & Delivery"
                      subtitle="Latency optimization, throughput scaling, reliability"
                      isOpen={openSections.engineer}
                      onToggle={() => toggleSection('engineer')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Sub-second validation. 300+ assets per month.</h3>
                            <p>
                              The RAG pipeline processes content in real-time. Claim extraction runs 
                              as content is uploaded. Validation happens immediately. Reviewers see 
                              pre-validated content with confidence scores and source citations.
                            </p>
                            <p>
                              Performance targets: validation response under 2 seconds, 99.5% uptime, complete 
                              audit trail for every decision. The system handles 300+ assets per month 
                              with capacity to scale 10x without architecture changes.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>&lt;2s</strong>
                                <span>p95 validation</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>99.5%</strong>
                                <span>uptime</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>10x</strong>
                                <span>scale headroom</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Engineer: Review Metrics */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MLR Performance</div>
                              {[{m:'Cycle Time',b:'14d',a:'9d',c:'#333'},{m:'First-Pass Rate',b:'62%',a:'84%',c:'#333'},{m:'Rejections',b:'38%',a:'12%',c:'#333'},{m:'Asset Reuse',b:'1.2×',a:'2.3×',c:'#333'}].map((s,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><span style={{fontSize:'11px',color:'#333'}}>{s.m}</span><span style={{fontSize:'11px'}}><span style={{color:'#999',textDecoration:'line-through'}}>{s.b}</span> → <span style={{color:s.c,fontWeight:'600'}}>{s.a}</span></span></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Validation Latency Distribution</h4>
                            <p>Pipeline latency percentiles showing sub-second performance for claim validation.</p>
                          </div>
                          <div className="fde-chart-container">
                            <LatencyPercentiles title="Claim Validation Latency" width={700} height={350} />
                          </div>
                        </div>

                        {/* NEW: Model Performance Metrics */}
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Model Performance Metrics</h4>
                            <p>Claims extraction and compliance classification model performance across 12,500 validation samples.</p>
                          </div>
                          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                              {/* Claims Extraction Model */}
                              <div style={{ padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
                                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Claims Extraction Model</h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>91%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Precision</div>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>94%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Recall</div>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>92.5%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>F1 Score</div>
                                  </div>
                                </div>
                                <div style={{ fontSize: '11px', color: '#666' }}>
                                  <strong>Model:</strong> Fine-tuned BERT<br />
                                  <strong>Training samples:</strong> 45,000 labeled claims<br />
                                  <strong>Support:</strong> 12,500 validation samples
                                </div>
                              </div>
                              
                              {/* Compliance Classification Model */}
                              <div style={{ padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
                                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Compliance Classification Model</h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>88%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Precision</div>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>92%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Recall</div>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>90%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>F1 Score</div>
                                  </div>
                                </div>
                                <div style={{ fontSize: '11px', color: '#666' }}>
                                  <strong>Model:</strong> Ensemble (BERT + Rules)<br />
                                  <strong>Classes:</strong> Compliant, Non-Compliant, Needs Review<br />
                                  <strong>Support:</strong> 8,200 validation samples
                                </div>
                              </div>
                            </div>
                            
                            {/* Confusion Matrix Summary */}
                            <div style={{ marginTop: '24px' }}>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>Compliance Classification Confusion Matrix</h5>
                              <div className="fde-chart-container">
                                <MLRConfusionMatrix width={700} height={400} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENABLE */}
                    <AccordionSection
                      title="Launch & Adoption"
                      subtitle="Workflow adoption, training, operational metrics"
                      isOpen={openSections.enable}
                      onToggle={() => toggleSection('enable')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Trust the system. Verify the exceptions.</h3>
                            <p>
                              Rolled out to content teams with a trust-building approach: start with 
                              human review of all AI recommendations, gradually increase auto-approval 
                              thresholds as confidence grows.
                            </p>
                            <p>
                              Today, 82% of claims validate automatically. Reviewers focus on the 18% 
                              that need human judgment—novel claims, edge cases, regional variations. 
                              Their expertise is amplified, not replaced.
                            </p>
                            <div className="fde-before-after">
                              <div className="fde-before">
                                <h4>Before</h4>
                                <ul>
                                  <li>✕ 14-day cycles</li>
                                  <li>✕ 100% manual review</li>
                                  <li>✕ Email-based tracking</li>
                                </ul>
                              </div>
                              <div className="fde-after">
                                <h4>After</h4>
                                <ul>
                                  <li>✓ 4-day cycles</li>
                                  <li>✓ 82% auto-validated</li>
                                  <li>✓ Full audit trail</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Enable: Adoption Metrics */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enterprise Rollout</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{n:'500+',l:'Active Users'},{n:'12',l:'Brands Enabled'},{n:'92%',l:'Adoption Rate'},{n:'4.2',l:'Satisfaction'}].map((m,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px',textAlign:'center'}}><div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>{m.n}</div><div style={{fontSize:'9px',color:'#666'}}>{m.l}</div></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Operational Metrics — 12 Month Trend</h4>
                            <p>Key performance indicators showing continuous improvement in content velocity and quality.</p>
                          </div>
                          <div className="fde-chart-container">
                            <SparklineGrid data={enableSparklineData} title="Content Automation KPIs" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* IMPACT - ENHANCED */}
                    <AccordionSection
                      title="Impact"
                      subtitle="Cycle time, throughput, compliance confidence"
                      isOpen={openSections.impact}
                      onToggle={() => toggleSection('impact')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The Result</h3>
                            <p>
                              Review cycles dropped from 14 days to 4 days—71% faster. Content velocity 
                              increased from 120 to 300 assets per month. Error rates fell from 8.5% 
                              to 1.8%.
                            </p>
                            <p>
                              More importantly: every claim, every validation, every approval is now 
                              traceable. When regulators ask &quot;how do you know this claim is approved?&quot;, 
                              there&apos;s a complete audit trail with source documents and validation timestamps.
                            </p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">14 days</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">4 days</span>
                                <span className="fde-impact-label">Review Cycle</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">120/mo</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">300/mo</span>
                                <span className="fde-impact-label">Asset Velocity</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">8.5%</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">1.8%</span>
                                <span className="fde-impact-label">Error Rate</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Impact: ROI Summary */}
                            <div style={{ backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '8px', color: '#fff' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Impact</div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>35%</div><div style={{ fontSize: '12px', color: '#ccc' }}>Faster MLR Cycles</div></div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>2.3×</div><div style={{ fontSize: '10px', color: '#aaa' }}>Asset Reuse</div></div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>88%</div><div style={{ fontSize: '10px', color: '#aaa' }}>Less Rework</div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* NEW: Lessons Learned */}
                        <div className="fde-lessons-learned" style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8f8f8', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                          <h4 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>Lessons Learned</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#333' }}>What Worked Well</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>Starting with 100% human review built trust—gradual automation increase was accepted because users saw the AI &quot;learning&quot;</li>
                                <li>Confidence scoring + explanations made AI decisions transparent—reviewers understood why claims were flagged</li>
                                <li>Complete audit trail became a regulatory asset—turned compliance from cost center to competitive advantage</li>
                              </ul>
                            </div>
                            <div>
                              <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#666' }}>What We&apos;d Do Differently</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                                <li>Would have built a &quot;similar claims&quot; suggestion feature earlier—reviewers frequently asked &quot;what did we approve before?&quot;</li>
                                <li>Regional rules engine should have been configurable from day one—each new market required code changes for 4 months</li>
                                <li>Invested more in false negative analysis—a few missed non-compliant claims in month 2 eroded initial trust</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fff', borderRadius: '6px', borderLeft: '4px solid #1a1a1a' }}>
                            <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', color: '#333' }}>
                              &quot;The biggest insight: we&apos;re not automating reviewers away. We&apos;re giving them superpowers. The best reviewers now handle 3x the volume because they&apos;re only seeing the hard cases.&quot;
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

export default FDECaseStudy04;