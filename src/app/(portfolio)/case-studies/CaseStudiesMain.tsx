"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';

const caseStudies = [
    {
        id: 1,
        client: 'Pfizer',
        logo: '/assets/img/logo/pfizer-logo.png',
        title: 'CoCo AI',
        subtitle: 'Enterprise Knowledge Platform',
        description: 'Agentic RAG system for pharmaceutical knowledge retrieval and compliance automation.',
        result: '35% faster MLR cycles',
        tags: ['RAG', 'Azure ML', 'Graph-RAG', 'Compliance'],
        link: '/fde-case-study-01'
    },
    {
        id: 2,
        client: 'IPG Health',
        logo: '/assets/img/logo/ipg-logo.png',
        title: 'AI Playbooks',
        subtitle: 'Regulated Content Systems',
        description: 'ML platform enabling compliant content velocity across 13 pharmaceutical brands.',
        result: '5 → 60+ engineers scaled',
        tags: ['MLOps', 'Multi-brand', 'Content Automation'],
        link: '/fde-case-study-02'
    },
    {
        id: 3,
        client: 'Abbott',
        logo: '/assets/img/logo/abbott-logo.png',
        title: 'Alinity Analytics',
        subtitle: 'AI/ML Diagnostics',
        description: 'Cloud migration for 27,000+ diagnostic devices with zero FDA audit findings.',
        result: '6mo → 3wk deployment',
        tags: ['AWS', 'FDA Compliance', 'Edge ML'],
        link: '/fde-case-study-03'
    },
    {
        id: 4,
        client: 'Pfizer',
        logo: '/assets/img/logo/pfizer-logo.png',
        title: 'Content Automation',
        subtitle: 'AI Governance',
        description: 'Human-in-the-loop AI system for MLR review acceleration and content governance.',
        result: '71% review time reduction',
        tags: ['LLM', 'Human-in-loop', 'MLR'],
        link: '/fde-case-study-04'
    },
    {
        id: 5,
        client: 'Abbott',
        logo: '/assets/img/logo/abbott-logo.png',
        title: 'Libre CGM',
        subtitle: 'Reliability Engineering',
        description: 'Patient-critical continuous glucose monitoring serving 4M+ patients.',
        result: '99.99% reliability',
        tags: ['Real-time', 'Patient Safety', 'Scale'],
        link: '/fde-case-study-05'
    },
    {
        id: 6,
        client: 'Medtronic',
        logo: '/assets/img/logo/medtronic-logo.png',
        title: 'GI Genius',
        subtitle: 'FDA 510(k)',
        description: 'AI medical device regulatory pathway achieving FDA clearance for clinical use.',
        result: 'FDA 510(k) cleared',
        tags: ['FDA', 'Medical Device', 'Clinical AI'],
        link: '/fde-case-study-06'
    },
];

const CaseStudiesMain = () => {
    return (
        <div className="case-studies-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .case-studies-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .case-studies-hero {
                    padding: 140px 40px 80px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .case-studies-hero-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .case-studies-hero-title {
                    font-size: 96px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.1;
                    color: #F0EEE9;
                }
                .case-studies-hero-subtitle {
                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    line-height: 1.6;
                }
                .case-studies-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    padding: 0 40px 100px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .case-study-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 36px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    display: block;
                }
                .case-study-card:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.15);
                    transform: translateY(-4px);
                }
                .case-study-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 20px;
                }
                .case-study-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    opacity: 0.9;
                }
                .case-study-client {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .case-study-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 4px;
                    color: #ffffff;
                }
                .case-study-subtitle {
                    font-size: 14px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .case-study-description {
                    font-size: 14px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 20px;
                }
                .case-study-result {
                    font-size: 18px;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 20px;
                }
                .case-study-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .case-study-tag {
                    font-size: 11px;
                    font-weight: 500;
                    padding: 5px 10px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 100px;
                    color: rgba(255,255,255,0.5);
                }
                .case-studies-cta {
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
                    .case-studies-hero {
                        padding: 120px 20px 60px;
                    }
                    .case-studies-hero-title {
                        font-size: 56px;
                    }
                    .case-studies-grid {
                        grid-template-columns: 1fr;
                        padding: 0 20px 60px;
                    }
                    .case-study-card {
                        padding: 28px;
                    }
                    .case-study-title {
                        font-size: 22px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="case-studies-hero">
                    <p className="case-studies-hero-eyebrow">Case Studies</p>
                    <h1 className="case-studies-hero-title">Proven Results</h1>
                    <p className="case-studies-hero-subtitle">
                        Real implementations. Measurable outcomes. From pilot to production in regulated environments.
                    </p>
                </section>

                {/* Case Studies Grid */}
                <section className="case-studies-grid">
                    {caseStudies.map((cs) => (
                        <Link key={cs.id} href={cs.link} className="case-study-card">
                            <div className="case-study-header">
                                <img src={cs.logo} alt={cs.client} className="case-study-logo" />
                                <span className="case-study-client">{cs.client}</span>
                            </div>
                            <h2 className="case-study-title">{cs.title}</h2>
                            <p className="case-study-subtitle">{cs.subtitle}</p>
                            <p className="case-study-description">{cs.description}</p>
                            <p className="case-study-result">{cs.result}</p>
                            <div className="case-study-tags">
                                {cs.tags.map((tag, i) => (
                                    <span key={i} className="case-study-tag">{tag}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="case-studies-cta">
                    <p className="cta-text">Want similar results for your organization?</p>
                    <Link href="/contact" className="cta-button">
                        Start a Conversation
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default CaseStudiesMain;
