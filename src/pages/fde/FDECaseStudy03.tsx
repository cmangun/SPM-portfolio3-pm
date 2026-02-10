'use client';
/**
 * FDE Case Study 03: Abbott Alinity Advanced Analytics
 * AI/ML diagnostics platform - 27,000+ devices globally
 * 5-Phase FDE Narrative with Accordion Layout + Charts
 * UPDATED: Replaced static images with inline chart components
 */
import { useState } from 'react';
import Image from 'next/image';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import FDEFooter from '@/layouts/footers/FDEFooter';

// Charts
import GanttChart from '@/charts_D3/GanttChart';
import LayerModelChart from '@/charts_D3/LayerModelChart';
import ServiceHealthDashboard from '@/charts_D3/ServiceHealthDashboard';
import StackedBarChart from '@/charts_D3/StackedBarChart';
import BeforeAfterComparison from '@/charts_D3/BeforeAfterComparison';
import TechStackDisplay from '@/charts_D3/TechStackDisplay';

// Logo only
import abbottLogo from '@/../public/assets/img/logo/abbott-logo.png';

// WebGL hero image from homepage slider
import heroImage from '@/../public/assets/img/webgl/alinity.jpg';

// Chart Data
const diagnoseGanttData = [
  { id: 1, task: 'Legacy System Assessment', start: 0, duration: 6, progress: 100, category: 'Discovery' },
  { id: 2, task: 'HIPAA Gap Analysis', start: 4, duration: 4, progress: 100, category: 'Compliance' },
  { id: 3, task: 'Data Pipeline Audit', start: 6, duration: 4, progress: 100, category: 'Discovery' },
  { id: 4, task: 'AWS Architecture Design', start: 8, duration: 4, progress: 100, category: 'Architecture' },
  { id: 5, task: 'Security Review', start: 10, duration: 4, progress: 100, category: 'Compliance' },
  { id: 6, task: 'Migration Planning', start: 12, duration: 3, progress: 100, category: 'Architecture' },
];

const architectLayerData = {
  title: 'GxP-Compliant AWS Architecture',
  subtitle: 'HIPAA-compliant ML pipeline for 27,000+ diagnostic devices',
  layers: [
    { id: 'ingestion', number: 1, title: 'Device Ingestion Layer', bullets: ['IoT Gateway', 'Device authentication', 'Data validation'], whyItExists: 'Secure ingestion from 27,000+ Alinity devices globally' },
    { id: 'streaming', number: 2, title: 'Streaming Layer', bullets: ['Kinesis streams', 'Real-time processing', 'Event buffering'], whyItExists: 'Handle burst traffic from diagnostic labs worldwide' },
    { id: 'processing', number: 3, title: 'ML Processing Layer', bullets: ['SageMaker pipelines', 'Feature engineering', 'Model inference'], whyItExists: 'Run predictive models on diagnostic data in real-time' },
    { id: 'storage', number: 4, title: 'Data Lake', bullets: ['S3 with encryption', 'Parquet format', 'Lifecycle policies'], whyItExists: 'HIPAA-compliant storage with 7-year retention' },
    { id: 'analytics', number: 5, title: 'Analytics Layer', bullets: ['Redshift cluster', 'QuickSight dashboards', 'Ad-hoc queries'], whyItExists: 'Business intelligence for operations and R&D teams' },
    { id: 'governance', number: 6, title: 'Governance Layer', bullets: ['IAM policies', 'CloudTrail audit', 'Config rules'], whyItExists: 'FDA 21 CFR Part 11 compliance and audit readiness' },
    { id: 'network', number: 7, title: 'Network Layer', bullets: ['VPC isolation', 'PrivateLink', 'WAF protection'], whyItExists: 'Zero-trust network architecture for PHI protection' },
  ],
};

const engineerServiceData = {
  services: [
    { name: 'Device Gateway', status: 'healthy' as const, uptime: 99.99, latency: { p50: 45, p95: 85, p99: 120 }, errorRate: 0.01, throughput: 150000, lastIncident: '90d ago' },
    { name: 'ML Pipeline', status: 'healthy' as const, uptime: 99.95, latency: { p50: 180, p95: 350, p99: 500 }, errorRate: 0.02, throughput: 45000, lastIncident: '30d ago' },
    { name: 'Data Lake', status: 'healthy' as const, uptime: 99.999, latency: { p50: 25, p95: 50, p99: 80 }, errorRate: 0.001, throughput: 200000, lastIncident: '180d ago' },
    { name: 'Analytics API', status: 'healthy' as const, uptime: 99.9, latency: { p50: 120, p95: 250, p99: 400 }, errorRate: 0.03, throughput: 8500, lastIncident: '14d ago' },
    { name: 'Audit Service', status: 'healthy' as const, uptime: 99.999, latency: { p50: 15, p95: 30, p99: 50 }, errorRate: 0.001, throughput: 500000, lastIncident: '365d ago' },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 42, p95: 80, p99: 115 }, { hour: '04:00', p50: 38, p95: 72, p99: 105 },
    { hour: '08:00', p50: 52, p95: 98, p99: 140 }, { hour: '12:00', p50: 50, p95: 95, p99: 135 },
    { hour: '16:00', p50: 50, p95: 95, p99: 135 }, { hour: '20:00', p50: 42, p95: 80, p99: 115 },
  ]
};

const enableBarData = [
  { category: 'Before', deployment: 180, validation: 90, rollback: 60 },
  { category: 'After', deployment: 21, validation: 14, rollback: 7 },
];

const beforeAfterData = {
  before: {
    title: 'Legacy On-Premises',
    subtitle: 'Constrained infrastructure with compliance gaps',
    items: [{ name: 'Physical servers (EOL)', icon: '▧' }, { name: 'Manual deployments', icon: '◉' }, { name: 'Incomplete audit logs', icon: '▤' }],
    metrics: [{ label: 'Deployment Time', value: '6 months', status: 'bad' as const }, { label: 'Uptime', value: '99.5%', status: 'bad' as const }],
    pain: ['6-month deployment cycles', 'Manual validation prone to error', 'Incomplete audit trails'],
  },
  after: {
    title: 'GxP-Compliant AWS',
    subtitle: 'Scalable, auditable, FDA-ready infrastructure',
    items: [{ name: 'AWS SageMaker + EKS', icon: '○' }, { name: 'GitOps CI/CD', icon: '⟳' }, { name: 'CloudTrail audit logs', icon: '▥' }],
    metrics: [{ label: 'Deployment Time', value: '3 weeks', status: 'good' as const }, { label: 'Uptime', value: '99.99%', status: 'good' as const }],
    benefits: ['Automated compliance validation', 'Complete audit trail', 'Multi-region DR'],
  },
  transformation: [
    { label: 'Deployment Time', before: '6 months', after: '3 weeks', improvement: '88% faster' },
    { label: 'Platform Uptime', before: '99.5%', after: '99.99%', improvement: '10x fewer outages' },
    { label: 'FDA Audit Findings', before: '12 gaps', after: '0 findings', improvement: '100% compliant' },
  ],
};

const alinityTechStack = [
  { name: 'ML Platform', color: '#666', items: [{ name: 'SageMaker', category: 'ML', description: 'Model training', proficiency: 'expert' as const }, { name: 'AWS', category: 'Cloud', description: 'Infrastructure', proficiency: 'expert' as const }] },
  { name: 'Compliance', color: '#1a1a1a', items: [{ name: 'HIPAA', category: 'Regulation', description: 'PHI protection', proficiency: 'expert' as const }, { name: 'FDA', category: 'Regulation', description: '21 CFR Part 11', proficiency: 'expert' as const }] },
];

const AccordionSection = ({ title, subtitle, isOpen, onToggle, children }: { title: string; subtitle: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; }) => (
  <div className="fde-accordion-section">
    <button className={`fde-accordion-header ${isOpen ? 'active' : ''}`} onClick={onToggle} aria-expanded={isOpen}>
      <div className="fde-accordion-header-content">
        <h2 className="fde-accordion-title">{title}</h2>
        <p className="fde-accordion-subtitle">{subtitle}</p>
      </div>
      <span className="fde-accordion-icon">{isOpen ? '−' : '+'}</span>
    </button>
    <div className={`fde-accordion-content ${isOpen ? 'open' : ''}`}>{children}</div>
  </div>
);

const FDECaseStudy03 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ diagnose: false, architect: false, engineer: false, enable: false, impact: false });
  const toggleSection = (section: string) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  return (
    <ScrollSmoothProvider>
      <CursorAndBackgroundProvider>
        <AnimationWrapper>
          <div className="fde-page fde-accordion-page">
            <div id="magic-cursor" className='cursor-bg-red'><div id="ball"></div></div>
            <BackToTop />
            <PortfolioWebglHeader darkText={true} hideNameOnSlider={true} />

            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main>
                  <section className="fde-hero-section">
                    <div className="fde-logo-container">
                      <Image src={abbottLogo} alt="Abbott" width={120} height={40} className="fde-client-logo-img" />
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title">Alinity</h1>
                        <p className="fde-hero-subtitle">Global Data Migration for 27,000+ Diagnostic Devices</p>
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Legacy data pipeline couldn&apos;t scale across 27,000 devices; 6-month deployment cycles; FDA audit compliance at risk across distributed global teams</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Managed HIPAA-compliant AWS migration with zero FDA audit findings, reducing deployment cycles from 6 months to 3 weeks through disciplined delivery planning</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="Abbott Alinity Analytics Platform" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item"><span className="fde-metric-number">27K+</span><span className="fde-metric-desc">Devices connected</span></div>
                      <div className="fde-metric-item"><span className="fde-metric-number">0</span><span className="fde-metric-desc">FDA audit findings</span></div>
                      <div className="fde-metric-item"><span className="fde-metric-number">88%</span><span className="fde-metric-desc">Faster deployments</span></div>
                      <div className="fde-metric-item"><span className="fde-metric-number">99.99%</span><span className="fde-metric-desc">Uptime achieved</span></div>
                    </div>
                  </section>

                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                    
                    <AccordionSection title="Discovery & Assessment" subtitle="Legacy constraints, compliance gaps, scalability limits" isOpen={openSections.diagnose} onToggle={() => toggleSection('diagnose')}>
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>27,000 devices. Legacy infrastructure. FDA watching.</h3>
                            <p>Abbott&apos;s Alinity diagnostic platform connects 27,000+ devices globally. The existing on-prem infrastructure was hitting limits with 6-month deployment cycles and incomplete audit trails.</p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric"><strong>6 mo</strong><span>deployment cycles</span></div>
                              <div className="fde-inline-metric"><strong>27K</strong><span>devices to support</span></div>
                              <div className="fde-inline-metric"><strong>FDA</strong><span>inspection pending</span></div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Legacy Infrastructure Risks</div>
                              {[{n:'Data Silos',d:'27K devices across disconnected systems'},{n:'Compliance Gap',d:'No audit trail for model changes'},{n:'Manual Ops',d:'6-month deployment cycles'},{n:'Single Point',d:'Critical scripts on individual laptops'}].map((r,i)=><div key={i} style={{marginBottom:'10px',paddingBottom:'10px',borderBottom:i<3?'1px solid #e5e5e5':'none'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a'}}>{r.n}</div><div style={{fontSize:'10px',color:'#666'}}>{r.d}</div></div>)}
                            </div>
                          </div>
                        </div>
                        <div className="fde-chart-section">
                          <div className="fde-chart-header"><h4>Migration Discovery Timeline</h4><p>Three-month discovery phase.</p></div>
                          <div className="fde-chart-container"><GanttChart data={diagnoseGanttData} title="Discovery & Planning Phase" width={700} height={300} /></div>
                        </div>
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header"><h4>Legacy vs. Cloud Architecture</h4><p>Side-by-side comparison.</p></div>
                          <div className="fde-chart-container"><BeforeAfterComparison data={beforeAfterData} title="Infrastructure Transformation" width={800} /></div>
                        </div>
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Planning & Alignment" subtitle="GxP-compliant AWS, HIPAA controls, audit architecture" isOpen={openSections.architect} onToggle={() => toggleSection('architect')}>
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>AWS architecture built for FDA inspection.</h3>
                            <p>Designed a 7-layer architecture on AWS that meets GxP requirements for medical device software.</p>
                            <div className="fde-capabilities">
                              <div><strong>Compliance:</strong> FDA 21 CFR Part 11, HIPAA, SOC 2</div>
                              <div><strong>Scale:</strong> 150K+ events/second peak throughput</div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hybrid Cloud Architecture</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{l:'AWS',items:['SageMaker','S3','RDS','Lambda']},{l:'Azure',items:['ML Workspace','Data Factory','Synapse','AKS']}].map((cloud,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a',marginBottom:'8px'}}>{cloud.l}</div>{cloud.items.map((item,j)=><div key={j} style={{fontSize:'10px',color:'#666',marginBottom:'2px'}}>• {item}</div>)}</div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fde-chart-section">
                          <div className="fde-chart-header"><h4>GxP-Compliant AWS Architecture</h4><p>Seven-layer architecture for FDA audit readiness.</p></div>
                          <div className="fde-chart-container"><LayerModelChart data={architectLayerData} /></div>
                        </div>
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Execution & Delivery" subtitle="Migration execution, performance standards, reliability metrics" isOpen={openSections.engineer} onToggle={() => toggleSection('engineer')}>
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Zero-downtime migration. Zero audit findings.</h3>
                            <p>Migrated the entire ML pipeline to AWS without disrupting device connectivity using blue-green deployment.</p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric"><strong>99.99%</strong><span>uptime SLA</span></div>
                              <div className="fde-inline-metric"><strong>150K</strong><span>events/sec peak</span></div>
                              <div className="fde-inline-metric"><strong>&lt;100ms</strong><span>response time</span></div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Performance Standards</div>
                              {[{m:'Deployment Time',b:'6 mo',a:'3 wk',c:'#333'},{m:'Uptime',b:'95%',a:'99.9%',c:'#333'},{m:'FDA Findings',b:'3',a:'0',c:'#333'},{m:'Data Scientists',b:'12',a:'45',c:'#333'}].map((s,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><span style={{fontSize:'11px',color:'#333'}}>{s.m}</span><span style={{fontSize:'11px'}}><span style={{color:'#999',textDecoration:'line-through'}}>{s.b}</span> → <span style={{color:s.c,fontWeight:'600'}}>{s.a}</span></span></div>)}
                            </div>
                          </div>
                        </div>
                        <div className="fde-chart-section">
                          <div className="fde-chart-header"><h4>Platform Service Health</h4><p>Real-time monitoring across all pipeline services.</p></div>
                          <div className="fde-chart-container"><ServiceHealthDashboard data={engineerServiceData} title="Alinity ML Pipeline Health" width={700} height={450} /></div>
                        </div>
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Launch & Adoption" subtitle="Team training, runbooks, operational handoff" isOpen={openSections.enable} onToggle={() => toggleSection('enable')}>
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>From 6 months to 3 weeks.</h3>
                            <p>Established CI/CD pipelines with automated compliance checks. Trained 45+ data scientists on the new platform.</p>
                            <div className="fde-before-after">
                              <div className="fde-before"><h4>Before</h4><ul><li>✕ 6-month deployments</li><li>✕ Manual validation</li><li>✕ Incomplete audit trails</li></ul></div>
                              <div className="fde-after"><h4>After</h4><ul><li>✓ 3-week deployments</li><li>✓ Automated validation</li><li>✓ Complete audit trails</li></ul></div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MLOps Adoption</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{n:'45',l:'Data Scientists'},{n:'100%',l:'CI/CD Coverage'},{n:'MLflow',l:'Experiment Tracking'},{n:'0',l:'Manual Deploys'}].map((m,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px',textAlign:'center'}}><div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>{m.n}</div><div style={{fontSize:'9px',color:'#666'}}>{m.l}</div></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fde-chart-section">
                          <div className="fde-chart-header"><h4>Deployment Time Comparison</h4><p>Before and after migration in days.</p></div>
                          <div className="fde-chart-container"><StackedBarChart data={enableBarData} title="Deployment Cycle Reduction" keys={['deployment', 'validation', 'rollback']} width={700} height={300} /></div>
                        </div>
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Impact" subtitle="FDA audit results, deployment velocity, reliability" isOpen={openSections.impact} onToggle={() => toggleSection('impact')}>
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The Result</h3>
                            <p>The FDA inspection came and went with zero findings. Model deployment time dropped 88%. The platform now handles 150K+ events/sec with 99.99% uptime.</p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric"><span className="fde-impact-before">6 months</span><span className="fde-impact-arrow">→</span><span className="fde-impact-after">3 weeks</span><span className="fde-impact-label">Deployment Time</span></div>
                              <div className="fde-impact-metric"><span className="fde-impact-before">Audit gaps</span><span className="fde-impact-arrow">→</span><span className="fde-impact-after">0 findings</span><span className="fde-impact-label">FDA Inspection</span></div>
                              <div className="fde-impact-metric"><span className="fde-impact-before">99.5%</span><span className="fde-impact-arrow">→</span><span className="fde-impact-after">99.99%</span><span className="fde-impact-label">Platform Uptime</span></div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '8px', color: '#fff' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Migration Outcomes</div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>0</div><div style={{ fontSize: '12px', color: '#ccc' }}>FDA Audit Findings</div></div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>87%</div><div style={{ fontSize: '10px', color: '#aaa' }}>Faster Deploy</div></div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>3.8×</div><div style={{ fontSize: '10px', color: '#aaa' }}>Team Scale</div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header"><h4>Technology Stack</h4><p>Core technologies powering the GxP-compliant ML platform.</p></div>
                          <div className="fde-chart-container"><TechStackDisplay categories={alinityTechStack} title="" layout="grid" showProficiency={true} /></div>
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

export default FDECaseStudy03;
