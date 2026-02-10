'use client';
/**
 * FDE Case Study 05: Abbott Libre Patient-Critical Systems
 * Real-time reliability for CGM (Continuous Glucose Monitoring)
 * 5-Phase FDE Narrative with Accordion Layout + Charts
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
import ErrorBudgetTracker from '@/charts_D3/ErrorBudgetTracker';
import IncidentTimeline from '@/charts_D3/IncidentTimeline';
import RealTimeGlucoseChart from '@/charts_D3/RealTimeGlucoseChart';
import TechStackDisplay from '@/charts_D3/TechStackDisplay';

// Images for Case Study 05
import abbottLogo from '@/../public/assets/img/logo/abbott-logo.png';

// WebGL hero image from homepage slider  
import heroImage from '@/../public/assets/img/webgl/abbott_libre_featured.jpg';

// Chart Data
const diagnoseGapData = [
  { stage: 'Total Patients', value: 4200000, color: '#333' },
  { stage: 'App Connected', value: 3800000, color: '#444' },
  { stage: 'Real-time Sync', value: 3200000, color: '#555' },
  { stage: 'Alert Enabled', value: 2800000, color: '#666' },
  { stage: 'Caregiver Linked', value: 2100000, color: '#777' },
];

const architectSystemData = {
  system: {
    name: 'Libre CGM Platform',
    description: 'Real-time glucose monitoring with patient safety alerts and caregiver notifications',
    type: 'Medical Device Software',
  },
  users: [
    {
      id: 'patient',
      name: 'Patient',
      icon: '◉',
      description: 'Diabetes patient with CGM sensor',
      interactions: ['View readings', 'Receive alerts', 'Share data'],
    },
    {
      id: 'caregiver',
      name: 'Caregiver',
      icon: '◎',
      description: 'Family member or care provider',
      interactions: ['Monitor patient', 'Receive alerts', 'View trends'],
    },
    {
      id: 'clinician',
      name: 'Clinician',
      icon: '◈',
      description: 'Healthcare provider',
      interactions: ['Review history', 'Adjust settings', 'Care planning'],
    },
  ],
  externalSystems: [
    {
      id: 'sensor',
      name: 'CGM Sensor',
      type: 'Medical Device',
      icon: '▣',
      description: 'Wearable glucose sensor',
      protocol: 'BLE',
      direction: 'inbound' as const,
      dataFlow: ['Glucose readings', 'Sensor status', 'Calibration'],
    },
    {
      id: 'mobile-app',
      name: 'Libre App',
      type: 'Mobile Application',
      icon: '▤',
      description: 'Patient mobile interface',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Readings display', 'Alerts', 'Settings'],
    },
    {
      id: 'cloud',
      name: 'LibreView Cloud',
      type: 'Cloud Platform',
      icon: '▥',
      description: 'Data aggregation and analytics',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Historical data', 'Reports', 'Sharing'],
    },
    {
      id: 'alerts',
      name: 'Alert Service',
      type: 'Notification System',
      icon: '▦',
      description: 'Critical alert delivery',
      protocol: 'Push/SMS',
      direction: 'outbound' as const,
      dataFlow: ['Low glucose', 'High glucose', 'Signal loss'],
    },
  ],
  internalComponents: [
    { name: 'Real-time Pipeline', description: 'Sub-second data processing' },
    { name: 'Alert Engine', description: 'Threshold monitoring' },
    { name: 'Trend Analysis', description: 'Predictive glucose patterns' },
    { name: 'Sync Service', description: 'Multi-device coordination' },
  ],
};

// Tech Stack for Libre CGM Platform
const libreTechStack = [
  {
    name: 'Real-Time Infrastructure',
    color: '#666',
    items: [
      { name: 'AWS', category: 'Cloud', description: 'Global infrastructure', proficiency: 'expert' as const },
      { name: 'Redis', category: 'Cache', description: 'Real-time data store', proficiency: 'expert' as const },
      { name: 'Kubernetes', category: 'Orchestration', description: 'Container platform', proficiency: 'expert' as const },
    ]
  },
  {
    name: 'Monitoring',
    color: '#666',
    items: [
      { name: 'Prometheus', category: 'Metrics', description: 'Time-series metrics', proficiency: 'expert' as const },
      { name: 'Grafana', category: 'Visualization', description: 'Dashboards', proficiency: 'advanced' as const },
      { name: 'Datadog', category: 'APM', description: 'Application monitoring', proficiency: 'advanced' as const },
    ]
  },
  {
    name: 'Compliance',
    color: '#1a1a1a',
    items: [
      { name: 'HIPAA', category: 'Regulation', description: 'PHI protection', proficiency: 'expert' as const },
      { name: 'FDA', category: 'Regulation', description: 'Medical device software', proficiency: 'expert' as const },
    ]
  },
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

const FDECaseStudy05 = () => {
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
                      <Image src={abbottLogo} alt="Abbott" width={120} height={40} className="fde-client-logo-img" />
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title">Libre</h1>
                        <p className="fde-hero-subtitle" >Patient-Critical Real-Time Glucose Monitoring</p>
                        
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Alert delivery failures during peak load; sync delays affecting 4M+ patients; caregiver notification gaps</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Rebuilt real-time pipeline achieving 99.99% alert delivery with sub-second latency for patient safety</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="Abbott Libre CGM Platform" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">4M+</span>
                        <span className="fde-metric-desc">Patients monitored</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">99.99%</span>
                        <span className="fde-metric-desc">Alert delivery</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">&lt;1s</span>
                        <span className="fde-metric-desc">Alert latency</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">0</span>
                        <span className="fde-metric-desc">Missed critical alerts</span>
                      </div>
                    </div>
                  </section>

                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                    
                    {/* DIAGNOSE */}
                    <AccordionSection
                      title="Discovery & Assessment"
                      subtitle="Alert failures, sync delays, reliability gaps"
                      isOpen={openSections.diagnose}
                      onToggle={() => toggleSection('diagnose')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>When alerts fail, patients are at risk.</h3>
                            <p>
                              Abbott&apos;s FreeStyle Libre is a continuous glucose monitor worn by 4+ million 
                              diabetes patients. The system sends real-time readings to mobile apps and 
                              can alert patients and caregivers when glucose levels are dangerously high 
                              or low.
                            </p>
                            <p>
                              The existing alert infrastructure was showing cracks. During peak usage 
                              (mornings, meal times), alert delivery was delayed. Some caregiver 
                              notifications were failing silently. Sync between devices could lag 
                              by minutes—unacceptable for a patient safety system.
                            </p>
                            <p>
                              I embedded with the reliability engineering team. Mapped every data path 
                              from sensor to notification. Identified single points of failure and 
                              capacity bottlenecks.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>4M+</strong>
                                <span>patients at risk</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>2-5 min</strong>
                                <span>alert delays</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>3%</strong>
                                <span>silent failures</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Diagnose: Data Challenges */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>RWE Data Challenges</div>
                              {[{n:'Fragmented Data',d:'Multiple EHR systems, labs, claims'},{n:'Quality Issues',d:'Inconsistent coding, missing values'},{n:'Access Delays',d:'6-week analyst wait times'},{n:'No Reuse',d:'Each study starts from scratch'}].map((r,i)=><div key={i} style={{marginBottom:'10px',paddingBottom:'10px',borderBottom:i<3?'1px solid #e5e5e5':'none'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a'}}>{r.n}</div><div style={{fontSize:'10px',color:'#666'}}>{r.d}</div></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Patient Engagement Funnel</h4>
                            <p>Tracking patient progression through platform features—gaps indicate reliability issues.</p>
                          </div>
                          <div className="fde-chart-container">
                            <FunnelChart data={diagnoseGapData} title="Libre Feature Adoption" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ARCHITECT */}
                    <AccordionSection
                      title="Planning & Alignment"
                      subtitle="Real-time pipeline, alert delivery, redundancy"
                      isOpen={openSections.architect}
                      onToggle={() => toggleSection('architect')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>Every millisecond matters.</h3>
                            <p>
                              Redesigned the real-time pipeline with patient safety as the primary 
                              constraint. Alert delivery is now a separate, prioritized path with 
                              its own capacity allocation and redundancy.
                            </p>
                            <p>
                              Architecture principles: no single points of failure for critical alerts, 
                              multi-channel delivery (push + SMS + email), automatic retry with 
                              escalation, and complete delivery confirmation tracking.
                            </p>
                            <div className="fde-capabilities">
                              <div><strong>Priority Queues:</strong> Critical alerts bypass normal processing</div>
                              <div><strong>Multi-Channel:</strong> Push, SMS, and email redundancy</div>
                              <div><strong>Confirmation:</strong> Delivery verification for every alert</div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Architect: RWE Platform */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data Platform Architecture</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{l:'Ingestion',items:['EHR Connectors','Claims APIs','Lab Feeds']},{l:'Processing',items:['Data Quality','Feature Store','ML Pipelines']}].map((layer,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px'}}><div style={{fontSize:'12px',fontWeight:'600',color:'#1a1a1a',marginBottom:'8px'}}>{layer.l}</div>{layer.items.map((item,j)=><div key={j} style={{fontSize:'10px',color:'#666',marginBottom:'2px'}}>• {item}</div>)}</div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Libre CGM System Context</h4>
                            <p>End-to-end data flow from sensor to patient and caregiver notifications.</p>
                          </div>
                          <div className="fde-chart-container">
                            <SystemContextDiagram data={architectSystemData} title="Libre Real-Time Platform" width={800} height={600} />
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Live Glucose Monitor Simulation</h4>
                            <p>Interactive demonstration of real-time CGM data with alerts and trend analysis.</p>
                          </div>
                          <div className="fde-chart-container">
                            <RealTimeGlucoseChart title="Continuous Glucose Monitor" width={700} height={400} animate={true} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENGINEER */}
                    <AccordionSection
                      title="Execution & Delivery"
                      subtitle="Performance standards, reliability governance, incident response"
                      isOpen={openSections.engineer}
                      onToggle={() => toggleSection('engineer')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>99.99% is not optional. It&apos;s the floor.</h3>
                            <p>
                              Implemented SRE practices with error budgets specifically designed for 
                              patient safety systems. The error budget for critical alerts is essentially 
                              zero—any missed alert triggers immediate incident response.
                            </p>
                            <p>
                              Built comprehensive observability: real-time dashboards for alert delivery, 
                              automatic anomaly detection, and on-call escalation for any delivery 
                              degradation.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>99.99%</strong>
                                <span>delivery SLO</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>&lt;1s</strong>
                                <span>alert latency</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>0</strong>
                                <span>missed criticals</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Engineer: Platform Metrics */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Platform Performance</div>
                              {[{m:'Data Access',b:'6 wk',a:'2 d',c:'#333'},{m:'Studies Active',b:'3',a:'15+',c:'#333'},{m:'Query Time',b:'4 hr',a:'< 5 min',c:'#333'},{m:'Reusable Features',b:'0',a:'200+',c:'#333'}].map((s,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><span style={{fontSize:'11px',color:'#333'}}>{s.m}</span><span style={{fontSize:'11px'}}><span style={{color:'#999',textDecoration:'line-through'}}>{s.b}</span> → <span style={{color:s.c,fontWeight:'600'}}>{s.a}</span></span></div>)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Alert Delivery Error Budget</h4>
                            <p>Real-time tracking of error budget consumption against 99.99% SLO target.</p>
                          </div>
                          <div className="fde-chart-container">
                            <ErrorBudgetTracker title="Critical Alert Delivery SLO" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENABLE */}
                    <AccordionSection
                      title="Launch & Adoption"
                      subtitle="Runbooks, on-call training, incident procedures"
                      isOpen={openSections.enable}
                      onToggle={() => toggleSection('enable')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>When the alert fires, everyone knows what to do.</h3>
                            <p>
                              Created comprehensive runbooks for every failure mode. Trained on-call 
                              engineers on patient safety implications. Established clear escalation 
                              paths with medical team involvement for critical incidents.
                            </p>
                            <p>
                              Regular chaos engineering exercises: we deliberately introduce failures 
                              to verify that redundancy works and that the team responds correctly.
                            </p>
                            <div className="fde-before-after">
                              <div className="fde-before">
                                <h4>Before</h4>
                                <ul>
                                  <li>✕ 2-5 min alert delays</li>
                                  <li>✕ Silent delivery failures</li>
                                  <li>✕ No delivery confirmation</li>
                                </ul>
                              </div>
                              <div className="fde-after">
                                <h4>After</h4>
                                <ul>
                                  <li>✓ Sub-second delivery</li>
                                  <li>✓ Multi-channel redundancy</li>
                                  <li>✓ 100% confirmation tracking</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Enable: Team Adoption */}
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Research Enablement</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[{n:'50+',l:'Analysts Trained'},{n:'15+',l:'Active Studies'},{n:'5M+',l:'Patient Records'},{n:'200+',l:'Reusable Features'}].map((m,i)=><div key={i} style={{padding:'12px',backgroundColor:'#f8f8f8',borderRadius:'6px',textAlign:'center'}}><div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>{m.n}</div><div style={{fontSize:'9px',color:'#666'}}>{m.l}</div></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fde-chart-section">
                          <div className="fde-chart-header">
                            <h4>Incident Response Timeline</h4>
                            <p>Sample incident showing detection, response, and resolution within SLA.</p>
                          </div>
                          <div className="fde-chart-container">
                            <IncidentTimeline title="Alert Delivery Incident Response" width={700} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* IMPACT */}
                    <AccordionSection
                      title="Impact"
                      subtitle="Patient safety metrics, reliability achievements"
                      isOpen={openSections.impact}
                      onToggle={() => toggleSection('impact')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The Result</h3>
                            <p>
                              Alert delivery now runs at 99.99% with sub-second latency. Zero missed 
                              critical alerts since the new architecture launched. Caregiver notification 
                              reliability improved from 97% to 99.95%.
                            </p>
                            <p>
                              The platform now handles 4M+ patients with room to scale. The reliability 
                              improvements have directly contributed to better patient outcomes—caregivers 
                              trust the alerts, and patients trust the system.
                            </p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">2-5 min</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">&lt;1 sec</span>
                                <span className="fde-impact-label">Alert Latency</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">97%</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">99.99%</span>
                                <span className="fde-impact-label">Delivery Rate</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">Unknown</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">0 missed</span>
                                <span className="fde-impact-label">Critical Alerts</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            {/* Impact: ROI Summary */}
                            <div style={{ backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '8px', color: '#fff' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform Impact</div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>95%</div><div style={{ fontSize: '12px', color: '#ccc' }}>Faster Data Access</div></div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>5×</div><div style={{ fontSize: '10px', color: '#aaa' }}>More Studies</div></div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>99.9%</div><div style={{ fontSize: '10px', color: '#aaa' }}>Uptime</div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Technology Stack</h4>
                            <p>Core technologies powering the patient-critical real-time platform.</p>
                          </div>
                          <div className="fde-chart-container">
                            <TechStackDisplay categories={libreTechStack} title="" layout="grid" showProficiency={true} />
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

export default FDECaseStudy05;