"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';

const advisoryServices = [
    {
        category: 'Strategic Advisory',
        services: [
            {
                title: 'AI Readiness Assessment',
                price: '$8,500',
                duration: '1 week',
                description: 'Comprehensive evaluation of your organization\'s data infrastructure, team capabilities, and regulatory posture for AI/ML adoption.',
                deliverable: 'Executive roadmap with prioritized initiatives and ROI projections.'
            },
            {
                title: 'ML Strategy & Roadmap',
                price: '$15,000',
                duration: '2-3 weeks',
                description: 'Define your 12-24 month AI/ML vision aligned with business objectives, clinical workflows, and compliance requirements.',
                deliverable: 'Includes build-vs-buy analysis and vendor landscape review.'
            },
            {
                title: 'Board/Executive AI Briefing',
                price: '$4,500',
                duration: 'Half-day',
                description: 'Demystify AI for leadership. Covers opportunity identification, risk landscape, competitive positioning, and investment considerations—tailored to healthcare and pharma.',
                deliverable: null
            },
        ]
    },
    {
        category: 'Architecture & Technical Review',
        services: [
            {
                title: 'Production ML Architecture Review',
                price: '$12,000',
                duration: '2 weeks',
                description: 'Deep-dive audit of your existing ML systems for scalability, reliability, and compliance gaps.',
                deliverable: 'Prioritized remediation plan with effort estimates.'
            },
            {
                title: 'HIPAA/PHI Data Pipeline Audit',
                price: '$18,000',
                duration: '2-3 weeks',
                description: 'End-to-end review of data flows, access controls, encryption, and audit logging.',
                deliverable: 'Identifies compliance vulnerabilities before they become findings.'
            },
            {
                title: 'MLOps Maturity Assessment',
                price: '$10,000',
                duration: '1-2 weeks',
                description: 'Evaluate your model lifecycle management, CI/CD practices, monitoring, and drift detection against industry benchmarks.',
                deliverable: 'Maturity scorecard with gap analysis.'
            },
            {
                title: 'Cloud Cost & Efficiency Review',
                price: '$7,500',
                duration: '1 week',
                description: 'Identify waste and optimization opportunities in your ML infrastructure across AWS, Azure, or GCP.',
                deliverable: 'Typical savings: 20-40% reduction in compute spend.'
            },
        ]
    },
    {
        category: 'Regulatory & Compliance',
        services: [
            {
                title: 'FDA 510(k) AI/ML Preparation',
                price: '$25,000+',
                duration: '4-6 weeks',
                description: 'Guidance on documentation, validation protocols, and submission strategy for Software as a Medical Device (SaMD).',
                deliverable: 'Includes predetermined change control plan framework.'
            },
            {
                title: 'RAG System Compliance Framework',
                price: '$20,000',
                duration: '3-4 weeks',
                description: 'Design and implement guardrails for retrieval-augmented generation in regulated contexts—MLR review integration, hallucination mitigation, audit trails, and human-in-the-loop workflows.',
                deliverable: null
            },
            {
                title: 'Clinical AI Governance Design',
                price: '$15,000',
                duration: '2-3 weeks',
                description: 'Establish policies, review boards, and monitoring protocols for responsible AI deployment in clinical settings.',
                deliverable: 'Aligns with emerging FDA and ONC guidance.'
            },
        ]
    },
    {
        category: 'Implementation Support',
        services: [
            {
                title: 'Production Deployment Sprint',
                price: '$35,000+',
                duration: '4-6 weeks',
                description: 'Hands-on leadership to take a validated model from development to production-ready deployment with monitoring, alerting, and rollback capabilities.',
                deliverable: null
            },
            {
                title: 'Team Scaling & Hiring Strategy',
                price: '$8,000',
                duration: '1-2 weeks',
                description: 'Define roles, interview frameworks, and organizational structure for building or expanding your ML engineering team.',
                deliverable: 'Includes compensation benchmarking.'
            },
            {
                title: 'Vendor Selection & Due Diligence',
                price: '$12,000',
                duration: '2 weeks',
                description: 'Structured evaluation of AI/ML vendors, platforms, or acquisition targets.',
                deliverable: 'Technical deep-dive plus commercial and integration risk assessment.'
            },
        ]
    },
];

const retainerOptions = [
    {
        title: 'Fractional AI Architect',
        price: '$12,000/month',
        hours: '15-20 hrs/month',
        description: 'Ongoing strategic and technical guidance. Includes architecture reviews, team mentorship, vendor negotiations, and executive advisory.',
    },
    {
        title: 'Advisory Board Seat',
        price: '$4,000/month',
        hours: '4-6 hrs/month',
        description: 'Strategic counsel, investor/board preparation, and network access. Ideal for startups navigating healthcare AI.',
    },
];

const AdvisoryMain = () => {
    return (
        <div className="advisory-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .advisory-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .advisory-hero {
                    padding: 140px 40px 80px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .advisory-hero-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .advisory-hero-title {
                    font-size: 96px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.0;
                    color: #F0EEE9;
                }
                .advisory-hero-subtitle {
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    line-height: 1.6;
                }
                .advisory-section {
                    padding: 60px 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .section-header {
                    margin-bottom: 40px;
                }
                .section-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                }
                .services-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .service-row {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 28px 32px;
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    gap: 32px;
                    align-items: start;
                    transition: all 0.3s ease;
                }
                .service-row:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.12);
                }
                .service-info {
                    flex: 1;
                }
                .service-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 8px;
                }
                .service-description {
                    font-size: 14px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                }
                .service-deliverable {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                    margin-top: 8px;
                    font-style: italic;
                }
                .service-price {
                    font-size: 20px;
                    font-weight: 700;
                    color: #ffffff;
                    white-space: nowrap;
                    min-width: 120px;
                    text-align: right;
                }
                .service-duration {
                    font-size: 14px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);
                    white-space: nowrap;
                    min-width: 100px;
                    text-align: right;
                }
                .retainer-section {
                    padding: 80px 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .retainer-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    margin-top: 40px;
                }
                .retainer-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 40px;
                    transition: all 0.3s ease;
                }
                .retainer-card:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.15);
                }
                .retainer-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 8px;
                }
                .retainer-meta {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 16px;
                }
                .retainer-price {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ffffff;
                }
                .retainer-hours {
                    font-size: 14px;
                    color: rgba(255,255,255,0.5);
                }
                .retainer-description {
                    font-size: 15px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                }
                .includes-section {
                    padding: 60px 40px 100px;
                    max-width: 1200px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .includes-title {
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 24px;
                }
                .includes-list {
                    display: flex;
                    gap: 40px;
                    flex-wrap: wrap;
                }
                .includes-item {
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .includes-item::before {
                    content: '✓';
                    color: rgba(255,255,255,0.4);
                }
                .advisory-cta {
                    text-align: left;
                    padding: 80px 40px 120px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .cta-text {
                    font-size: 28px;
                    font-weight: 500;
                    margin-bottom: 12px;
                    color: rgba(255,255,255,0.9);
                }
                .cta-subtext {
                    font-size: 16px;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 32px;
                }
                .cta-button {
                    display: inline-block;
                    padding: 18px 48px;
                    background: #ffffff;
                    color: #0a0a0a !important;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .cta-button:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
                    color: #0a0a0a !important;
                }
                @media (max-width: 991px) {
                    .advisory-hero {
                        padding: 120px 20px 60px;
                    }
                    .advisory-hero-title {
                        font-size: 48px;
                    }
                    .advisory-section {
                        padding: 40px 20px;
                    }
                    .service-row {
                        grid-template-columns: 1fr;
                        gap: 16px;
                        padding: 24px;
                    }
                    .service-price,
                    .service-duration {
                        text-align: left;
                    }
                    .retainer-grid {
                        grid-template-columns: 1fr;
                    }
                    .retainer-section {
                        padding: 60px 20px;
                    }
                    .includes-section {
                        padding: 40px 20px 80px;
                    }
                    .includes-list {
                        flex-direction: column;
                        gap: 16px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="advisory-hero">
                    <p className="advisory-hero-eyebrow">Advisory Services</p>
                    <h1 className="advisory-hero-title">Healthcare AI Advisory</h1>
                    <p className="advisory-hero-subtitle">
                        Bespoke AI solutions for regulated environments. Strategic guidance from readiness assessment through production deployment.
                    </p>
                </section>

                {/* Service Categories */}
                {advisoryServices.map((category, catIndex) => (
                    <section key={catIndex} className="advisory-section">
                        <div className="section-header">
                            <h2 className="section-title">{category.category}</h2>
                        </div>
                        <div className="services-list">
                            {category.services.map((service, svcIndex) => (
                                <div key={svcIndex} className="service-row">
                                    <div className="service-info">
                                        <h3 className="service-title">{service.title}</h3>
                                        <p className="service-description">{service.description}</p>
                                        {service.deliverable && (
                                            <p className="service-deliverable">{service.deliverable}</p>
                                        )}
                                    </div>
                                    <div className="service-price">{service.price}</div>
                                    <div className="service-duration">{service.duration}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* Retainer Options */}
                <section className="retainer-section">
                    <div className="section-header">
                        <h2 className="section-title">Retainer Options</h2>
                    </div>
                    <div className="retainer-grid">
                        {retainerOptions.map((retainer, index) => (
                            <div key={index} className="retainer-card">
                                <h3 className="retainer-title">{retainer.title}</h3>
                                <div className="retainer-meta">
                                    <span className="retainer-price">{retainer.price}</span>
                                    <span className="retainer-hours">{retainer.hours}</span>
                                </div>
                                <p className="retainer-description">{retainer.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* All Engagements Include */}
                <section className="includes-section">
                    <h3 className="includes-title">All engagements include</h3>
                    <div className="includes-list">
                        <span className="includes-item">Signed NDA and BAA (where applicable)</span>
                        <span className="includes-item">Executive summary deliverable</span>
                        <span className="includes-item">30-day follow-up call</span>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="advisory-cta">
                    <p className="cta-text">Ready to discuss your AI initiative?</p>
                    <p className="cta-subtext">Schedule a discovery call to scope your engagement</p>
                    <Link href="/contact" className="cta-button">
                        Get in Touch
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AdvisoryMain;
