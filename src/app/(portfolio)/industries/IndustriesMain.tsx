"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const industries = [
    {
        id: 1,
        title: 'Pharmaceutical',
        slug: 'pharmaceutical',
        icon: '/assets/img/svg-icons/Drugs 1.svg',
        description: 'AI systems for drug discovery support, clinical trial optimization, MLR compliance automation, and commercial content velocity.',
        clients: ['Pfizer', 'Novartis', 'Sanofi', 'Eli Lilly', 'Amgen'],
        challenges: ['MLR review bottlenecks', 'Content reuse at scale', 'Regulatory documentation', 'Knowledge management'],
        caseStudies: [
            { title: 'Pfizer CoCo AI', link: '/fde-case-study-01' },
            { title: 'Pfizer Content Automation', link: '/fde-case-study-04' },
        ]
    },
    {
        id: 2,
        title: 'Medical Devices',
        slug: 'medical-devices',
        icon: '/assets/img/svg-icons/Stethoscope.svg',
        description: 'AI for diagnostic systems, FDA 510(k) regulatory pathways, real-time patient monitoring, and clinical decision support.',
        clients: ['Abbott', 'Medtronic'],
        challenges: ['FDA clearance pathways', 'Real-time inference', 'Patient safety requirements', 'Clinical validation'],
        caseStudies: [
            { title: 'Abbott Alinity Analytics', link: '/fde-case-study-03' },
            { title: 'Medtronic GI Genius', link: '/fde-case-study-06' },
        ]
    },
    {
        id: 3,
        title: 'Life Sciences',
        slug: 'life-sciences',
        icon: '/assets/img/svg-icons/DNA.svg',
        description: 'ML platforms for research data, biomarker analysis, real-world evidence generation, and scientific content management.',
        clients: ['IPG Health', 'Syneos Health'],
        challenges: ['Multi-brand content operations', 'RWE data pipelines', 'Scientific accuracy', 'Team scaling'],
        caseStudies: [
            { title: 'IPG AI Playbooks', link: '/fde-case-study-02' },
        ]
    },
    {
        id: 4,
        title: 'Healthcare Technology',
        slug: 'healthcare-technology',
        icon: '/assets/img/svg-icons/Heart Rate Monitor.svg',
        description: 'Patient-facing AI systems, continuous monitoring platforms, HIPAA-compliant infrastructure, and health data interoperability.',
        clients: ['Abbott'],
        challenges: ['99.99% uptime requirements', 'Patient data privacy', 'Real-time alerting', 'Scale reliability'],
        caseStudies: [
            { title: 'Abbott Libre CGM', link: '/fde-case-study-05' },
        ]
    },
];

const IndustriesMain = () => {
    return (
        <div className="industries-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .industries-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .industries-hero {
                    padding: 140px 40px 80px;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .industries-hero-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .industries-hero-title {
                    font-size: 96px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.1;
                    color: #F0EEE9;
                }
                .industries-hero-subtitle {
                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    line-height: 1.6;
                }
                .industries-list {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 40px 100px;
                }
                .industry-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 48px;
                    margin-bottom: 24px;
                    transition: all 0.3s ease;
                }
                .industry-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.12);
                }
                .industry-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }
                .industry-icon {
                    filter: invert(1) brightness(0.7);
                    margin-bottom: 12px;
                }
                .industry-number {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.3);
                    margin-bottom: 12px;
                }
                .industry-title {
                    font-size: 32px;
                    font-weight: 700;
                    margin: 0;
                    color: #ffffff;
                }
                .industry-clients {
                    text-align: right;
                }
                .clients-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 8px;
                }
                .clients-list {
                    font-size: 13px;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                }
                .industry-description {
                    font-size: 16px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.65);
                    margin-bottom: 28px;
                    max-width: 700px;
                }
                .industry-challenges {
                    margin-bottom: 28px;
                }
                .challenges-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 12px;
                }
                .challenges-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .challenge-tag {
                    font-size: 12px;
                    font-weight: 500;
                    padding: 8px 14px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 100px;
                    color: rgba(255,255,255,0.6);
                }
                .industry-case-studies {
                    padding-top: 24px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .case-studies-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 12px;
                }
                .case-studies-links {
                    display: flex;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .case-study-link {
                    font-size: 14px;
                    font-weight: 500;
                    color: #ffffff;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }
                .case-study-link:hover {
                    opacity: 0.7;
                }
                .industries-cta {
                    text-align: left;
                    padding: 60px 40px 100px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    max-width: 1000px;
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
                    .industries-hero {
                        padding: 120px 20px 60px;
                    }
                    .industries-hero-title {
                        font-size: 56px;
                    }
                    .industries-list {
                        padding: 0 20px 60px;
                    }
                    .industry-card {
                        padding: 30px;
                    }
                    .industry-header {
                        flex-direction: column;
                        gap: 16px;
                    }
                    .industry-clients {
                        text-align: left;
                    }
                    .industry-title {
                        font-size: 26px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="industries-hero">
                    <p className="industries-hero-eyebrow">Industries</p>
                    <h1 className="industries-hero-title">Regulated AI Expertise</h1>
                    <p className="industries-hero-subtitle">
                        15+ years leading regulated healthcare programs across pharma, diagnostics, medical devices, and enterprise marketing.
                    </p>
                </section>

                {/* Industries List */}
                <section className="industries-list">
                    {industries.map((industry) => (
                        <div key={industry.id} className="industry-card">
                            <div className="industry-header">
                                <div>
                                    <Image 
                                        src={industry.icon}
                                        alt={industry.title}
                                        width={40}
                                        height={40}
                                        className="industry-icon"
                                    />
                                    <h2 className="industry-title">{industry.title}</h2>
                                </div>
                                <div className="industry-clients">
                                    <p className="clients-label">Clients</p>
                                    <p className="clients-list">{industry.clients.join(' • ')}</p>
                                </div>
                            </div>
                            <p className="industry-description">{industry.description}</p>
                            <div className="industry-challenges">
                                <p className="challenges-label">Common Challenges</p>
                                <div className="challenges-list">
                                    {industry.challenges.map((challenge, i) => (
                                        <span key={i} className="challenge-tag">{challenge}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="industry-case-studies">
                                <p className="case-studies-label">Case Studies</p>
                                <div className="case-studies-links">
                                    {industry.caseStudies.map((cs, i) => (
                                        <Link key={i} href={cs.link} className="case-study-link">
                                            {cs.title} →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="industries-cta">
                    <p className="cta-text">Have a regulated AI challenge?</p>
                    <Link href="/contact" className="cta-button">
                        Let's Talk
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default IndustriesMain;
