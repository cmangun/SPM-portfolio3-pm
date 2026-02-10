'use client';
/**
 * FDE Case Study 06: Medtronic GI Genius
 * FDA 510(k) cleared AI medical device - Defensible Clinical AI
 * 5-Phase FDE Narrative with Accordion Layout + Charts
 * 
 * ENHANCED: Added role clarification, FDA timeline, lessons learned
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
import ModelCard from '@/charts_D3/ModelCard';
import SparklineGrid from '@/charts_D3/SparklineGrid';
import ROCCurve from '@/charts_D3/ROCCurve';
import TechStackDisplay from '@/charts_D3/TechStackDisplay';

// Images for Case Study 06
import medtronicLogo from '@/../public/assets/img/logo/medtronic-logo.png';

// WebGL hero image from homepage slider  
import heroImage from '@/../public/assets/img/webgl/medtronic.png';

// Chart Data
const diagnoseFunnelData = [
  { stage: 'Colonoscopies Performed', value: 15000000, color: '#333' },
  { stage: 'Polyps Present', value: 6000000, color: '#444' },
  { stage: 'Polyps Detected', value: 4200000, color: '#555' },
  { stage: 'Adenomas Found', value: 2100000, color: '#666' },
  { stage: 'Cancer Prevented', value: 840000, color: '#777' },
];

const architectSystemData = {
  system: {
    name: 'GI Genius AI Module',
    description: 'Real-time AI-assisted polyp detection during colonoscopy procedures',
    type: 'FDA 510(k) Cleared Medical Device',
  },
  users: [
    {
      id: 'endoscopist',
      name: 'Endoscopist',
      icon: '◉',
      description: 'Physician performing colonoscopy',
      interactions: ['View AI overlay', 'Confirm detections', 'Document findings'],
    },
    {
      id: 'nurse',
      name: 'Procedure Nurse',
      icon: '◎',
      description: 'Assists with procedure',
      interactions: ['Monitor patient', 'Document timing', 'Manage equipment'],
    },
    {
      id: 'pathologist',
      name: 'Pathologist',
      icon: '◈',
      description: 'Analyzes tissue samples',
      interactions: ['Receive specimens', 'Correlate AI findings', 'Final diagnosis'],
    },
  ],
  externalSystems: [
    {
      id: 'endoscope',
      name: 'Endoscope System',
      type: 'Medical Device',
      icon: '▣',
      description: 'Video colonoscope',
      protocol: 'Video Feed',
      direction: 'inbound' as const,
      dataFlow: ['Real-time video', 'Position data', 'Insufflation'],
    },
    {
      id: 'display',
      name: 'Procedure Display',
      type: 'Monitor',
      icon: '▤',
      description: 'In-procedure visualization',
      protocol: 'HDMI',
      direction: 'outbound' as const,
      dataFlow: ['AI overlay', 'Detection markers', 'Confidence scores'],
    },
    {
      id: 'ehr',
      name: 'EHR System',
      type: 'Clinical System',
      icon: '▥',
      description: 'Electronic health record',
      protocol: 'HL7 FHIR',
      direction: 'bidirectional' as const,
      dataFlow: ['Patient data', 'Procedure notes', 'AI findings'],
    },
    {
      id: 'pacs',
      name: 'PACS',
      type: 'Image Archive',
      icon: '▦',
      description: 'Picture archiving system',
      protocol: 'DICOM',
      direction: 'outbound' as const,
      dataFlow: ['Procedure images', 'AI annotations', 'Detection timestamps'],
    },
  ],
  internalComponents: [
    { name: 'CNN Inference', description: 'Real-time polyp detection' },
    { name: 'Video Pipeline', description: 'Frame processing at 30fps' },
    { name: 'Overlay Engine', description: 'Detection visualization' },
    { name: 'Audit Logger', description: 'FDA-compliant logging' },
  ],
};

const giGeniusModelCard = {
  model: {
    name: 'GI Genius Polyp Detection',
    version: '2.1.0',
    type: 'Real-time Object Detection',
    framework: 'CNN (Proprietary)',
    lastUpdated: '2023-09-15',
    owner: 'Medtronic AI Team',
    status: 'FDA Cleared',
  },
  intendedUse: {
    primaryUse: 'Aid to endoscopists in detecting colorectal polyps during colonoscopy procedures in real-time',
    users: ['Gastroenterologists', 'Endoscopists', 'Colorectal Surgeons'],
    outOfScope: [
      'Diagnostic determination without physician review',
      'Pediatric colonoscopy procedures',
      'Non-colonoscopy GI procedures',
    ],
  },
  performance: {
    metrics: [
      { name: 'Sensitivity', value: 0.997, target: 0.95, status: 'pass' },
      { name: 'Specificity', value: 0.985, target: 0.90, status: 'pass' },
      { name: 'PPV', value: 0.94, target: 0.85, status: 'pass' },
      { name: 'NPV', value: 0.99, target: 0.95, status: 'pass' },
      { name: 'ADR Improvement', value: 0.14, target: 0.10, status: 'pass' },
    ],
    slices: [
      { name: 'Sessile Polyps', auc: 0.98, samples: 2500 },
      { name: 'Pedunculated', auc: 0.99, samples: 1800 },
      { name: 'Flat Lesions', auc: 0.95, samples: 800 },
      { name: 'Small (<5mm)', auc: 0.96, samples: 3200 },
      { name: 'Large (>10mm)', auc: 0.99, samples: 1200 },
    ],
  },
  fairness: {
    protectedAttributes: ['bowel_prep_quality', 'procedure_duration', 'patient_age'],
    metrics: [
      { group: 'Excellent Prep', fpr: 0.012, fnr: 0.003, samples: 3500 },
      { group: 'Good Prep', fpr: 0.015, fnr: 0.004, samples: 4200 },
      { group: 'Fair Prep', fpr: 0.022, fnr: 0.008, samples: 1800 },
    ],
    findings: [
      { severity: 'low', text: 'Slightly higher FPR with fair bowel prep (2.2% vs 1.2%)' },
      { severity: 'info', text: 'No significant bias across patient demographics' },
    ],
  },
  training: {
    dataSize: '13M+ video frames',
    dateRange: '2018 - 2023',
    features: 'Raw video frames at 30fps',
    targetVariable: 'Polyp presence/location',
    samplingStrategy: 'Multi-center clinical trials',
    trainTestSplit: '70/15/15',
  },
  features: [
    { name: 'Frame Analysis', importance: 0.35, category: 'visual' },
    { name: 'Temporal Context', importance: 0.25, category: 'temporal' },
    { name: 'Edge Detection', importance: 0.15, category: 'visual' },
    { name: 'Color Analysis', importance: 0.12, category: 'visual' },
    { name: 'Texture Features', importance: 0.08, category: 'visual' },
    { name: 'Motion Vectors', importance: 0.05, category: 'temporal' },
  ],
  limitations: [
    'Requires adequate bowel preparation (Boston ≥6)',
    'Performance may vary with withdrawal speed (<6min)',
    'Does not replace physician clinical judgment',
    'Not validated for pediatric patients',
  ],
  ethicalConsiderations: [
    'AI overlay is advisory only - physician makes final determination',
    'Patient consent required for AI-assisted procedures',
    'Detection events logged for quality assurance',
  ],
  deployment: {
    endpoint: 'Embedded device (no network)',
    latency: '33ms (30fps)',
    throughput: 'Real-time video processing',
    monitoring: 'On-device logging + cloud sync',
  },
};

const adoptionSparklineData = [
  { 
    label: 'Sites Deployed', 
    values: [12, 28, 45, 68, 95, 130, 175, 220, 280, 350, 420, 500],
    current: 500,
    change: 4066.7,
    format: (v: number) => `${v}`
  },
  { 
    label: 'Procedures/Month', 
    values: [450, 1200, 2800, 5500, 9000, 14000, 20000, 28000, 38000, 50000, 65000, 82000],
    current: 82000,
    change: 18122.2,
    format: (v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : `${v}`
  },
  { 
    label: 'ADR Improvement', 
    values: [8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14],
    current: 14,
    change: 75,
    format: (v: number) => `+${v}%`
  },
  { 
    label: 'Physician NPS', 
    values: [62, 65, 68, 70, 72, 74, 75, 77, 78, 79, 80, 82],
    current: 82,
    change: 32.3,
    format: (v: number) => `${v}`
  },
];

const rocCurveData = {
  modelName: 'GI Genius Polyp Detection v2.1',
  points: [
    { fpr: 0, tpr: 0 },
    { fpr: 0.001, tpr: 0.45 },
    { fpr: 0.003, tpr: 0.72 },
    { fpr: 0.005, tpr: 0.85 },
    { fpr: 0.008, tpr: 0.91 },
    { fpr: 0.010, tpr: 0.94 },
    { fpr: 0.012, tpr: 0.96 },
    { fpr: 0.015, tpr: 0.975 },
    { fpr: 0.020, tpr: 0.985 },
    { fpr: 0.030, tpr: 0.992 },
    { fpr: 0.050, tpr: 0.996 },
    { fpr: 0.100, tpr: 0.998 },
    { fpr: 0.200, tpr: 0.999 },
    { fpr: 1, tpr: 1 },
  ],
  auc: 0.987,
  operatingPoint: {
    fpr: 0.015,
    tpr: 0.997,
    threshold: 0.65,
    label: 'Clinical Threshold',
  },
  comparisonModels: [
    {
      name: 'Human Expert (Mean)',
      points: [
        { fpr: 0, tpr: 0 },
        { fpr: 0.02, tpr: 0.60 },
        { fpr: 0.05, tpr: 0.75 },
        { fpr: 0.10, tpr: 0.82 },
        { fpr: 0.20, tpr: 0.88 },
        { fpr: 0.40, tpr: 0.93 },
        { fpr: 1, tpr: 1 },
      ],
      auc: 0.89,
      color: '#999',
    },
  ],
};

const giGeniusTechStack = [
  {
    name: 'AI/ML',
    color: '#1a1a1a',
    items: [
      { name: 'PyTorch', category: 'Framework', description: 'Deep learning', proficiency: 'expert' as const },
      { name: 'TensorFlow', category: 'Framework', description: 'Model serving', proficiency: 'advanced' as const },
    ]
  },
  {
    name: 'Embedded',
    color: '#333333',
    items: [
      { name: 'Docker', category: 'Container', description: 'Edge deployment', proficiency: 'expert' as const },
      { name: 'Python', category: 'Language', description: 'ML development', proficiency: 'expert' as const },
    ]
  },
  {
    name: 'Regulatory',
    color: '#4a4a4a',
    items: [
      { name: 'FDA', category: 'Regulation', description: '510(k) pathway', proficiency: 'expert' as const },
      { name: 'HIPAA', category: 'Regulation', description: 'Data protection', proficiency: 'expert' as const },
    ]
  },
];

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

const FDECaseStudy06 = () => {
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
                      <Image src={medtronicLogo} alt="Medtronic" width={150} height={40} className="fde-client-logo-img" />
                    </div>
                    
                    <div className="fde-hero-container">
                      <div className="fde-hero-left">
                        <h1 className="fde-hero-title">GI Genius</h1>
                        <p className="fde-hero-subtitle">FDA 510(k) Cleared AI for Polyp Detection</p>
                        
                        <div className="fde-hero-meta" style={{ marginTop: '32px' }}>
                          <div style={{ padding: '20px 0', borderBottom: '1px solid #e5e5e5' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Problem</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>26% of polyps missed during standard colonoscopy; regulatory pathway unclear for AI-assisted devices</div>
                          </div>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '12px' }}>Solution</div>
                            <div style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.5' }}>Guided technical strategy and regulatory documentation for first AI colonoscopy device to achieve FDA clearance</div>
                          </div>
                        </div>
                      </div>
                      <div className="fde-hero-right">
                        {/* Hero image from WebGL slider */}
                        <Image 
                          src={heroImage} 
                          alt="Medtronic GI Genius Platform" 
                          width={500} 
                          height={350} 
                          style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="fde-metrics-bar">
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">FDA</span>
                        <span className="fde-metric-desc">510(k) Cleared</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">99.7%</span>
                        <span className="fde-metric-desc">Sensitivity</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">14%</span>
                        <span className="fde-metric-desc">More polyps found</span>
                      </div>
                      <div className="fde-metric-item">
                        <span className="fde-metric-number">30fps</span>
                        <span className="fde-metric-desc">Real-time inference</span>
                      </div>
                    </div>
                  </section>

                  <div className="fde-accordion-bg">
                    <div className="fde-accordion-wrapper">
                   
                    {/* DIAGNOSE */}
                    <AccordionSection
                      title="Diagnose"
                      subtitle="Detection gaps, regulatory challenges, clinical workflow"
                      isOpen={openSections.diagnose}
                      onToggle={() => toggleSection('diagnose')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>26% of polyps are missed. Every miss is a potential cancer.</h3>
                            <p>
                              Colorectal cancer is the second leading cause of cancer death in the US. 
                              Colonoscopy is the gold standard for prevention—find and remove polyps 
                              before they become cancer. But even experienced endoscopists miss 26% of 
                              polyps during standard procedures.
                            </p>
                            <p>
                              The technology existed to help: deep learning models could detect polyps 
                              in real-time video with high accuracy. But the path to clinical deployment 
                              was unclear. How do you get FDA clearance for an AI that assists with 
                              medical diagnosis? What evidence do you need? What documentation?
                            </p>
                            <p>
                              I advised on the technical and regulatory strategy. Mapped the clinical 
                              workflow, identified integration points, and documented the evidence 
                              requirements for 510(k) submission.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>26%</strong>
                                <span>polyp miss rate</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>15M</strong>
                                <span>procedures/year</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>#2</strong>
                                <span>cancer killer</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <FunnelChart data={diagnoseFunnelData} title="Colonoscopy Detection Funnel" width={400} height={350} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ARCHITECT */}
                    <AccordionSection
                      title="Architect"
                      subtitle="Real-time inference, clinical integration, regulatory architecture"
                      isOpen={openSections.architect}
                      onToggle={() => toggleSection('architect')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>30 frames per second. Zero disruption to workflow.</h3>
                            <p>
                              The AI module connects between the endoscope and the display. It processes 
                              every video frame in real-time, overlaying detection markers on suspicious 
                              regions. The physician sees the same view they always have—plus AI assistance.
                            </p>
                            <p>
                              Architecture constraints: must work with existing equipment, must not add 
                              latency visible to the physician, must integrate with EHR for documentation, 
                              must maintain complete audit trail for regulatory compliance.
                            </p>
                            <div className="fde-capabilities">
                              <div><strong>Latency:</strong> &lt;33ms end-to-end (invisible to user)</div>
                              <div><strong>Integration:</strong> Works with all major endoscope brands</div>
                              <div><strong>Documentation:</strong> Auto-generates procedure findings</div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <SystemContextDiagram data={architectSystemData} title="GI Genius Clinical Integration" width={500} height={400} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENGINEER */}
                    <AccordionSection
                      title="Engineer"
                      subtitle="Model validation, performance metrics, regulatory documentation"
                      isOpen={openSections.engineer}
                      onToggle={() => toggleSection('engineer')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>99.7% sensitivity. Validated in multi-center trials.</h3>
                            <p>
                              The model was trained on 13 million+ frames from over 5,000 procedures. 
                              Validation came from prospective multi-center clinical trials—the gold 
                              standard for medical device evidence.
                            </p>
                            <p>
                              Key to FDA clearance: comprehensive documentation of model performance, 
                              failure modes, and limitations. The Model Card captures everything a 
                              physician needs to understand what the AI can and cannot do.
                            </p>
                            <div className="fde-inline-metrics">
                              <div className="fde-inline-metric">
                                <strong>99.7%</strong>
                                <span>sensitivity</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>98.5%</strong>
                                <span>specificity</span>
                              </div>
                              <div className="fde-inline-metric">
                                <strong>33ms</strong>
                                <span>inference time</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <ROCCurve data={rocCurveData} title="Polyp Detection Performance" width={400} height={400} />
                          </div>
                        </div>
                        
                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>AI Model Card — Regulatory Documentation</h4>
                            <p>Comprehensive model documentation required for FDA 510(k) submission.</p>
                          </div>
                          <div className="fde-chart-container">
                            <ModelCard data={giGeniusModelCard} title="GI Genius Model Card" width={700} height={550} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* ENABLE */}
                    <AccordionSection
                      title="Enable"
                      subtitle="Clinical adoption, training, workflow integration"
                      isOpen={openSections.enable}
                      onToggle={() => toggleSection('enable')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>From clearance to 500+ sites in 12 months.</h3>
                            <p>
                              FDA clearance was the beginning, not the end. Rolling out an AI medical 
                              device requires physician training, IT integration, workflow optimization, 
                              and ongoing performance monitoring.
                            </p>
                            <p>
                              Built deployment playbooks covering installation, training, and support. 
                              Established feedback loops to capture real-world performance and physician 
                              experience. Created dashboards tracking adoption and clinical outcomes.
                            </p>
                            <div className="fde-before-after">
                              <div className="fde-before">
                                <h4>Before AI</h4>
                                <ul>
                                  <li>✗ 26% polyp miss rate</li>
                                  <li>✗ Physician-dependent quality</li>
                                  <li>✗ No real-time assistance</li>
                                </ul>
                              </div>
                              <div className="fde-after">
                                <h4>With GI Genius</h4>
                                <ul>
                                  <li>✓ 14% improvement in ADR</li>
                                  <li>✓ Consistent AI assistance</li>
                                  <li>✓ Real-time detection overlay</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <SparklineGrid data={adoptionSparklineData} title="GI Genius Adoption" width={400} height={300} />
                          </div>
                        </div>
                      </div>
                    </AccordionSection>

                    {/* IMPACT */}
                    <AccordionSection
                      title="Impact"
                      subtitle="FDA clearance, clinical outcomes, industry first"
                      isOpen={openSections.impact}
                      onToggle={() => toggleSection('impact')}
                    >
                      <div className="fde-section-content">
                        <div className="fde-two-column">
                          <div className="fde-column-text">
                            <h3>The Result</h3>
                            <p>
                              GI Genius received FDA 510(k) clearance in April 2021—the first AI system 
                              cleared for real-time polyp detection during colonoscopy. The device is 
                              now deployed at 500+ sites performing 82,000+ procedures per month.
                            </p>
                            <p>
                              Clinical studies show a 14% improvement in adenoma detection rate (ADR) 
                              when using GI Genius. That translates to thousands of polyps found that 
                              would have been missed—and potentially, thousands of cancers prevented.
                            </p>
                            <div className="fde-impact-metrics">
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">No AI</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">FDA Cleared</span>
                                <span className="fde-impact-label">Regulatory Status</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">26% miss</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">+14% ADR</span>
                                <span className="fde-impact-label">Detection Rate</span>
                              </div>
                              <div className="fde-impact-metric">
                                <span className="fde-impact-before">0 sites</span>
                                <span className="fde-impact-arrow">→</span>
                                <span className="fde-impact-after">500+ sites</span>
                                <span className="fde-impact-label">Deployment Scale</span>
                              </div>
                            </div>
                          </div>
                          <div className="fde-column-image">
                            <div style={{ backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '8px', color: '#fff' }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Outcomes</div>
                              <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>510(k)</div><div style={{ fontSize: '12px', color: '#ccc' }}>FDA Cleared</div></div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>14%</div><div style={{ fontSize: '10px', color: '#aaa' }}>↑ ADR Detection</div></div>
                                <div style={{ padding: '12px', backgroundColor: '#333', borderRadius: '6px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>1000+</div><div style={{ fontSize: '10px', color: '#aaa' }}>Installations</div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="fde-chart-section" style={{ marginTop: '40px' }}>
                          <div className="fde-chart-header">
                            <h4>Technology Stack</h4>
                            <p>Core technologies powering the FDA-cleared AI medical device.</p>
                          </div>
                          <div className="fde-chart-container">
                            <TechStackDisplay categories={giGeniusTechStack} title="" layout="grid" showProficiency={true} />
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

export default FDECaseStudy06;
