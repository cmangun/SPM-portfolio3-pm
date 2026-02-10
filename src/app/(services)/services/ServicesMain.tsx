"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: 'Project Delivery & Execution',
        slug: 'project-delivery',
        icon: '/assets/img/svg-icons/Trend Up 1.svg',
        description: 'End-to-end project planning, timeline management, cross-functional coordination, and stakeholder alignment. Deliverable governance, quality assurance, budget tracking, scope control, and resource planning for regulated healthcare programs.',
        keywords: ['Timeline Management', 'Cross-Functional Coordination', 'Deliverable QA', 'Scope Control'],
        caseStudy: {
            title: 'Pfizer CoLab Enterprise',
            result: '35% faster MLR cycles',
            link: '/fde-case-study-01'
        }
    },
    {
        id: 2,
        title: 'Regulated Review & Compliance',
        slug: 'regulated-compliance',
        icon: '/assets/img/svg-icons/Shield Checkmark.svg',
        description: 'MLR submission tracking and coordination, claims substantiation and evidence alignment, audit-ready documentation and compliance checkpoints, and digital channel governance for regulated content across pharma, diagnostics, and medical device programs.',
        keywords: ['MLR Compliance', 'Claims Substantiation', 'Audit Documentation', 'Regulatory Governance'],
        caseStudy: {
            title: 'Medtronic GI Genius',
            result: 'FDA 510(k) clearance',
            link: '/fde-case-study-06'
        }
    },
    {
        id: 3,
        title: 'Portfolio & Program Operations',
        slug: 'portfolio-operations',
        icon: '/assets/img/svg-icons/Chart Statistics 1.svg',
        description: 'Multi-brand portfolio management, status reporting and executive communication, risk identification, tracking, and mitigation, process standardization and workflow optimization across concurrent healthcare initiatives.',
        keywords: ['Portfolio Management', 'Risk Mitigation', 'Status Reporting', 'Process Optimization'],
        caseStudy: {
            title: 'IPG Health — 13 Brands',
            result: '$51M portfolio delivered',
            link: '/fde-case-study-02'
        }
    },
    {
        id: 4,
        title: 'Strategic Delivery Enablement',
        slug: 'strategic-enablement',
        icon: '/assets/img/svg-icons/Light Bulb.svg',
        description: 'Brief-to-execution translation for creative and production teams, stakeholder mapping and communication planning, operational playbook development, and launch readiness and adoption planning for healthcare programs.',
        keywords: ['Brief Translation', 'Launch Readiness', 'Playbook Development', 'Adoption Planning'],
        caseStudy: {
            title: 'Abbott Alinity Migration',
            result: '65% efficiency improvement',
            link: '/fde-case-study-03'
        }
    },
];

const ServicesMain = () => {
    return (
        <div className="services-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .services-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .services-hero {
                    padding: 140px 40px 80px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .services-hero-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .services-hero-title {
                    font-size: 96px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.1;
                    color: #F0EEE9;
                }
                .services-hero-subtitle {
                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    line-height: 1.6;
                }
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    padding: 0 40px 100px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .service-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 40px;
                    transition: all 0.3s ease;
                }
                .service-card:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.15);
                    transform: translateY(-4px);
                }
                .service-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 20px;
                }
                .service-icon {
                    filter: invert(1) brightness(0.7);
                }
                .service-number {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.3);
                }
                .service-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0 0 16px;
                    color: #ffffff;
                }
                .service-description {
                    font-size: 15px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.65);
                    margin-bottom: 24px;
                }
                .service-keywords {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 32px;
                }
                .service-keyword {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 4px 12px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    color: rgba(255,255,255,0.5);
                }
                .case-study-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    text-decoration: none;
                    color: rgba(255,255,255,0.6);
                    transition: color 0.3s;
                }
                .case-study-link:hover {
                    color: #ffffff;
                }
                .case-study-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .case-study-result {
                    font-size: 14px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.8);
                }
                @media (max-width: 991px) {
                    .services-hero {
                        padding: 120px 20px 60px;
                    }
                    .services-hero-title {
                        font-size: 56px;
                    }
                    .services-grid {
                        grid-template-columns: 1fr;
                        padding: 0 20px 60px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                <section className="services-hero">
                    <p className="services-hero-eyebrow">Execution &amp; Delivery Leadership</p>
                    <h1 className="services-hero-title">Capabilities</h1>
                    <p className="services-hero-subtitle">
                        I lead regulated healthcare programs from strategy through delivery — coordinating 
                        cross-functional teams, managing timelines and budgets, and ensuring compliant, 
                        on-time execution across pharma, diagnostics, and medical device environments.
                    </p>
                </section>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-header">
                                <Image 
                                    src={service.icon}
                                    alt={service.title}
                                    width={32}
                                    height={32}
                                    className="service-icon"
                                />
                                <span className="service-number">0{service.id}</span>
                            </div>
                            <h2 className="service-title">{service.title}</h2>
                            <p className="service-description">{service.description}</p>
                            <div className="service-keywords">
                                {service.keywords.map((kw, i) => (
                                    <span key={i} className="service-keyword">{kw}</span>
                                ))}
                            </div>
                            <Link href={service.caseStudy.link} className="case-study-link">
                                <span>
                                    <span className="case-study-label">Case Study: {service.caseStudy.title}</span>
                                    <br />
                                    <span className="case-study-result">{service.caseStudy.result}</span>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ServicesMain;
