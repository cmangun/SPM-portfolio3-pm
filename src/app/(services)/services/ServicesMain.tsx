"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: 'RAG Implementation',
        slug: 'rag-implementation',
        icon: '/assets/img/svg-icons/Search.svg',
        description: 'Design and deploy retrieval-augmented generation systems for enterprise knowledge management. Hybrid search, vector databases, and compliance-ready architectures.',
        keywords: ['Vector Search', 'Knowledge Graphs', 'Semantic Retrieval', 'Hybrid Search'],
        caseStudy: {
            title: 'Pfizer CoCo AI',
            result: '35% faster MLR cycles',
            link: '/fde-case-study-01'
        }
    },
    {
        id: 2,
        title: 'LLM Integration',
        slug: 'llm-integration',
        icon: '/assets/img/svg-icons/Chat Message.svg',
        description: 'Integrate large language models into healthcare workflows with governance guardrails, cost controls, and audit logging for regulated environments.',
        keywords: ['GPT-4 / Claude', 'Fine-tuning', 'Prompt Engineering', 'Model Governance'],
        caseStudy: {
            title: 'Pfizer Content Automation',
            result: '71% review time reduction',
            link: '/fde-case-study-04'
        }
    },
    {
        id: 3,
        title: 'MLOps & Pipelines',
        slug: 'mlops-healthcare',
        icon: '/assets/img/svg-icons/Settings 1.svg',
        description: 'Build production ML pipelines with experiment tracking, model registry, automated testing, and drift detection for healthcare data systems.',
        keywords: ['CI/CD for ML', 'Model Monitoring', 'Feature Stores', 'Automated Retraining'],
        caseStudy: {
            title: 'Abbott Alinity',
            result: '6 months → 3 weeks deployment',
            link: '/fde-case-study-03'
        }
    },
    {
        id: 4,
        title: 'AI Compliance',
        slug: 'ai-compliance',
        icon: '/assets/img/svg-icons/Shield Checkmark.svg',
        description: 'Navigate HIPAA, FDA 21 CFR Part 11, and MLR requirements for AI systems. Audit-ready documentation, model explainability, and responsible AI frameworks.',
        keywords: ['HIPAA Compliance', 'FDA 510(k)', 'MLR Automation', 'Audit Trails'],
        caseStudy: {
            title: 'Medtronic GI Genius',
            result: 'FDA 510(k) clearance',
            link: '/fde-case-study-06'
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
                    font-weight: 500;
                    padding: 6px 12px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 100px;
                    color: rgba(255,255,255,0.6);
                }
                .service-case-study {
                    padding-top: 24px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .case-study-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 8px;
                }
                .case-study-link {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-decoration: none;
                    color: #ffffff;
                    transition: opacity 0.3s ease;
                }
                .case-study-link:hover {
                    opacity: 0.7;
                }
                .case-study-title {
                    font-size: 14px;
                    font-weight: 500;
                }
                .case-study-result {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                }
                .services-cta {
                    text-align: left;
                    padding: 60px 40px 100px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .cta-text {
                    font-size: 24px;
                    font-weight: 500;
                    margin-bottom: 24px;
                    color: rgba(255,255,255,0.9);
                }
                .cta-button {
                    display: inline-block;
                    padding: 16px 40px;
                    background: #ffffff;
                    color: #0a0a0a;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .cta-button:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
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
                    .service-card {
                        padding: 30px;
                    }
                    .service-title {
                        font-size: 24px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="services-hero">
                    <p className="services-hero-eyebrow">Services</p>
                    <h1 className="services-hero-title">Healthcare AI Consulting</h1>
                    <p className="services-hero-subtitle">
                        Enterprise AI/ML systems for regulated industries. From pilot to production with compliance built in.
                    </p>
                </section>

                {/* Services Grid */}
                <section className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-header">
                                <Image 
                                    src={service.icon}
                                    alt={service.title}
                                    width={36}
                                    height={36}
                                    className="service-icon"
                                />
                            </div>
                            <h2 className="service-title">{service.title}</h2>
                            <p className="service-description">{service.description}</p>
                            <div className="service-keywords">
                                {service.keywords.map((keyword, i) => (
                                    <span key={i} className="service-keyword">{keyword}</span>
                                ))}
                            </div>
                            <div className="service-case-study">
                                <p className="case-study-label">Related Case Study</p>
                                <Link href={service.caseStudy.link} className="case-study-link">
                                    <span className="case-study-title">{service.caseStudy.title}</span>
                                    <span className="case-study-result">{service.caseStudy.result} →</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="services-cta">
                    <p className="cta-text">Ready to discuss your AI initiative?</p>
                    <Link href="/contact" className="cta-button">
                        Get in Touch
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default ServicesMain;
