'use client';
import React from 'react';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

// Inline SVG icons - using Simple Icons and custom paths
const CertIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  // AWS - Amazon Web Services logo
  aws: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.026-.527.27-.353 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.609zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.191-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.087-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
    </svg>
  ),
  // Google Cloud Platform
  gcp: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.19 2.38a9.344 9.344 0 00-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.111-.247 10.941l.006-.007-.007.03a6.717 6.717 0 004.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 00-8.825-6.893zm-.405 4.482a5.527 5.527 0 015.52 5.52 5.527 5.527 0 01-5.52 5.52 5.527 5.527 0 01-5.52-5.52 5.527 5.527 0 015.52-5.52z"/>
    </svg>
  ),
  // ML/AI - Neural network style
  ml: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="4" cy="6" r="2"/>
      <circle cx="4" cy="12" r="2"/>
      <circle cx="4" cy="18" r="2"/>
      <circle cx="12" cy="9" r="2"/>
      <circle cx="12" cy="15" r="2"/>
      <circle cx="20" cy="12" r="2"/>
      <line x1="6" y1="6" x2="10" y2="9"/>
      <line x1="6" y1="12" x2="10" y2="9"/>
      <line x1="6" y1="12" x2="10" y2="15"/>
      <line x1="6" y1="18" x2="10" y2="15"/>
      <line x1="14" y1="9" x2="18" y2="12"/>
      <line x1="14" y1="15" x2="18" y2="12"/>
    </svg>
  ),
  // Data/Database
  data: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 5v6c0 1.657-4.03 3-9 3s-9-1.343-9-3V5"/>
      <path d="M21 11v6c0 1.657-4.03 3-9 3s-9-1.343-9-3v-6"/>
    </svg>
  ),
  // DevOps - Infinity/cycle
  devops: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 12c-2.21 0-4-1.343-4-3s1.79-3 4-3c1.333 0 2.507.502 3.234 1.257"/>
      <path d="M12 12c2.21 0 4 1.343 4 3s-1.79 3-4 3c-1.333 0-2.507-.502-3.234-1.257"/>
      <path d="M16 6l2.5-2.5M18.5 3.5L16 6M8 18l-2.5 2.5M5.5 20.5L8 18"/>
    </svg>
  ),
  // Security - Shield with check
  security: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  // Healthcare - Heart with pulse
  healthcare: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      <path d="M4 12h4l2-3 3 6 2-3h5"/>
    </svg>
  ),
  // Six Sigma - Graph trending up
  sigma: ({ size = 32, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M3 20h18"/>
      <path d="M3 20V4"/>
      <path d="M7 16l4-4 3 3 6-8"/>
      <path d="M17 7h3v3"/>
    </svg>
  ),
  // Checkmark
  check: ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  // Code brackets
  code: ({ size = 40, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M8 6l-6 6 6 6"/>
      <path d="M16 6l6 6-6 6"/>
      <path d="M14 4l-4 16"/>
    </svg>
  ),
  // Shield
  shield: ({ size = 40, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
    </svg>
  ),
  // Heart rate
  heartRate: ({ size = 40, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      <path d="M4 12h4l2-3 3 6 2-3h5"/>
    </svg>
  ),
};

const certifications = [
    {
        id: 1,
        category: 'Architecture & Systems',
        title: 'AWS Certified Solutions Architect',
        icon: 'aws',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'Cloud architecture design',
            'High availability & fault tolerance',
            'Cost optimization',
        ],
    },
    {
        id: 2,
        category: 'Architecture & Systems',
        title: 'GCP Professional Cloud Architect',
        icon: 'gcp',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'End-to-end system design',
            'Multi-service orchestration',
            'Cost, scalability, resilience',
        ],
    },
    {
        id: 3,
        category: 'ML Lifecycle (Real, Not Theoretical)',
        title: 'GCP Professional ML Engineer',
        icon: 'ml',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'Training, serving, monitoring',
            'Production constraints',
            'Responsible ML practices',
        ],
    },
    {
        id: 4,
        category: 'Data Reality',
        title: 'GCP Professional Data Engineer',
        icon: 'data',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'Pipelines, streaming, analytics',
            'Feature engineering at scale',
            'Data reliability (where ML fails most often)',
        ],
    },
    {
        id: 5,
        category: 'Operations & Reliability',
        title: 'GCP Professional DevOps Engineer',
        icon: 'devops',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'CI/CD',
            'SRE concepts',
            'Incident response, observability',
        ],
    },
    {
        id: 6,
        category: 'Security & Compliance',
        title: 'GCP Cloud Security Engineer',
        icon: 'security',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'Cloud governance',
            'HIPAA / SOC2 / ISO alignment',
            'Shared responsibility clarity',
        ],
    },
    {
        id: 7,
        category: 'Domain Authority',
        title: 'Stanford AI/ML Healthcare',
        icon: 'healthcare',
        verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/UK29FBM3G4GB',
        skills: [
            'Clinical context',
            'Regulated decision environments',
        ],
    },
    {
        id: 8,
        category: 'Process & Execution Discipline',
        title: 'Six Sigma Black Belt',
        icon: 'sigma',
        verifyUrl: 'https://www.credly.com/users/christopher-mangun',
        skills: [
            'Outcome orientation',
            'Risk reduction',
            'Continuous improvement',
        ],
    },
];

const CertificationsMain = () => {
    const CheckIcon = CertIcons.check;
    
    return (
        <div className="certifications-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
            <style>{`
                .certifications-page {
                    color: #1a1a1a;
                    font-family: var(--font-inter), sans-serif;
                }
                .cert-hero {
                    padding: 140px 40px 60px;
                    max-width: 1100px;
                    margin: 0 auto;
                    border-bottom: 1px solid #eee;
                }
                .cert-hero-label {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: #999;
                    margin-bottom: 16px;
                }
                .cert-hero-title {
                    font-size: 64px;
                    font-weight: 800;
                    color: #1a1a1a;
                    letter-spacing: -2px;
                    line-height: 1;
                    margin: 0 0 24px;
                }
                .cert-hero-desc {
                    font-size: 18px;
                    line-height: 1.6;
                    color: #666;
                    max-width: 700px;
                    margin: 0;
                }
                .cert-grid-section {
                    padding: 80px 40px;
                    background-color: #f8f8f8;
                }
                .cert-grid-container {
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .cert-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                .cert-card {
                    background: #ffffff;
                    border: 1px solid #e5e5e5;
                    padding: 32px;
                }
                .cert-card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                .cert-card-icon {
                    color: #666;
                    flex-shrink: 0;
                }
                .cert-card-category {
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #999;
                }
                .cert-card-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin: 0 0 20px;
                    line-height: 1.3;
                }
                .cert-card-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .cert-card-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 10px;
                    line-height: 1.4;
                }
                .cert-card-list li:last-child {
                    margin-bottom: 0;
                }
                .cert-check-icon {
                    flex-shrink: 0;
                    margin-top: 2px;
                    color: #888;
                }
                .cert-verify-link {
                    display: inline-block;
                    margin-top: 16px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #1a1a1a;
                    text-decoration: none;
                    padding: 6px 12px;
                    border: 1px solid #ddd;
                    transition: all 0.15s ease;
                }
                .cert-verify-link:hover {
                    background: #1a1a1a;
                    color: #fff;
                    border-color: #1a1a1a;
                }
                .cert-stack-section {
                    padding: 80px 40px;
                    background-color: #ffffff;
                    border-top: 1px solid #e5e5e5;
                }
                .cert-stack-container {
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .cert-stack-title {
                    font-size: 36px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin: 0 0 20px;
                }
                .cert-stack-desc {
                    font-size: 16px;
                    line-height: 1.7;
                    color: #666;
                    margin: 0;
                    max-width: 700px;
                }
                .cert-stack-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                    margin-top: 48px;
                }
                .cert-stack-item {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .cert-stack-icon {
                    margin-bottom: 16px;
                    color: #555;
                }
                .cert-stack-item-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin: 0 0 8px;
                }
                .cert-stack-item-subtitle {
                    font-size: 14px;
                    color: #999;
                    margin: 0;
                }
                @media (max-width: 991px) {
                    .cert-hero {
                        padding: 120px 20px 50px;
                    }
                    .cert-hero-title {
                        font-size: 48px;
                        letter-spacing: -1px;
                    }
                    .cert-hero-desc {
                        font-size: 16px;
                    }
                    .cert-grid-section {
                        padding: 60px 20px;
                    }
                    .cert-grid {
                        gap: 20px;
                    }
                    .cert-card {
                        padding: 24px;
                    }
                    .cert-card-title {
                        font-size: 18px;
                    }
                    .cert-stack-section {
                        padding: 60px 20px;
                    }
                    .cert-stack-title {
                        font-size: 28px;
                    }
                    .cert-stack-grid {
                        gap: 24px;
                    }
                }
                @media (max-width: 768px) {
                    .cert-hero {
                        padding: 100px 16px 40px;
                    }
                    .cert-hero-label {
                        font-size: 10px;
                    }
                    .cert-hero-title {
                        font-size: 36px;
                    }
                    .cert-hero-desc {
                        font-size: 15px;
                    }
                    .cert-grid-section {
                        padding: 40px 16px;
                    }
                    .cert-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    .cert-card {
                        padding: 20px;
                    }
                    .cert-card-title {
                        font-size: 17px;
                        margin-bottom: 16px;
                    }
                    .cert-card-list li {
                        font-size: 13px;
                    }
                    .cert-stack-section {
                        padding: 40px 16px;
                    }
                    .cert-stack-title {
                        font-size: 24px;
                    }
                    .cert-stack-desc {
                        font-size: 14px;
                    }
                    .cert-stack-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                }
                @media (max-width: 480px) {
                    .cert-hero {
                        padding: 90px 12px 32px;
                    }
                    .cert-hero-title {
                        font-size: 28px;
                    }
                    .cert-hero-desc {
                        font-size: 14px;
                    }
                    .cert-grid-section {
                        padding: 32px 12px;
                    }
                    .cert-card {
                        padding: 16px;
                    }
                    .cert-card-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    .cert-card-title {
                        font-size: 16px;
                    }
                    .cert-card-list li {
                        font-size: 12px;
                    }
                    .cert-stack-section {
                        padding: 32px 12px;
                    }
                    .cert-stack-title {
                        font-size: 20px;
                    }
                    .cert-stack-desc {
                        font-size: 13px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={true} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="cert-hero">
                    <p className="cert-hero-label">Professional Credentials</p>
                    <h1 className="cert-hero-title">Certifications</h1>
                    <p className="cert-hero-desc">
                        Validated expertise across the full stack of enterprise AI delivery—from 
                        architecture and ML operations to security, compliance, and process discipline.
                    </p>
                </section>

                {/* Certifications Grid */}
                <section className="cert-grid-section">
                    <div className="cert-grid-container">
                        <div className="cert-grid">
                            {certifications.map((cert) => {
                                const IconComponent = CertIcons[cert.icon];
                                return (
                                    <div key={cert.id} className="cert-card">
                                        <div className="cert-card-header">
                                            {IconComponent && <IconComponent size={28} className="cert-card-icon" />}
                                            <span className="cert-card-category">
                                                {cert.category}
                                            </span>
                                        </div>
                                        <h3 className="cert-card-title">{cert.title}</h3>
                                        <ul className="cert-card-list">
                                            {cert.skills.map((skill, index) => (
                                                <li key={index}>
                                                    <CheckIcon size={16} className="cert-check-icon" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                        {cert.verifyUrl && (
                                            <a 
                                                href={cert.verifyUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="cert-verify-link"
                                            >
                                                Verify →
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why This Stack Section */}
                <section className="cert-stack-section">
                    <div className="cert-stack-container">
                        <h2 className="cert-stack-title">Why This Certification Stack Matters</h2>
                        <p className="cert-stack-desc">
                            Most AI projects fail not because of model accuracy, but because of 
                            infrastructure gaps, data quality issues, deployment complexity, and 
                            compliance oversights. This certification stack reflects the full spectrum 
                            of skills required to lead regulated healthcare programs across complex environments.
                        </p>
                        <div className="cert-stack-grid">
                            <div className="cert-stack-item">
                                <CertIcons.code size={40} className="cert-stack-icon" />
                                <p className="cert-stack-item-title">Architecture + ML + Data</p>
                                <p className="cert-stack-item-subtitle">Complete technical ownership</p>
                            </div>
                            <div className="cert-stack-item">
                                <CertIcons.shield size={40} className="cert-stack-icon" />
                                <p className="cert-stack-item-title">DevOps + Security</p>
                                <p className="cert-stack-item-subtitle">Production-grade reliability</p>
                            </div>
                            <div className="cert-stack-item">
                                <CertIcons.heartRate size={40} className="cert-stack-icon" />
                                <p className="cert-stack-item-title">Healthcare + Six Sigma</p>
                                <p className="cert-stack-item-subtitle">Domain depth + execution rigor</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CertificationsMain;
