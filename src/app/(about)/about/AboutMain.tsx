"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const credentials = [
    { name: 'Lean Six Sigma Black Belt', issuer: 'IASSC', icon: '/assets/img/svg-icons/Trend Up 1.svg' },
    { name: 'Certified Scrum Master (CSM)', issuer: 'Scrum Alliance', icon: '/assets/img/svg-icons/Settings 1.svg' },
    { name: 'Stanford AI/ML Healthcare Specialization', issuer: 'Stanford University', icon: '/assets/img/svg-icons/Graduation Hat.svg' },
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', icon: '/assets/img/svg-icons/Cloud.svg' },
    { name: 'Google Cloud Professional Architect', issuer: 'Google Cloud', icon: '/assets/img/svg-icons/Desktop Monitor.svg' },
    { name: 'Google Professional Machine Learning Engineer', issuer: 'Google Cloud', icon: '/assets/img/svg-icons/Chart Statistics 1.svg' },
];

const clients = [
    { name: 'Pfizer', years: '2024-2025' },
    { name: 'IPG Health', years: '2020-2024' },
    { name: 'Novartis', years: '2020-2024' },
    { name: 'Sanofi', years: '2020-2024' },
    { name: 'Abbott', years: '2018-2020' },
    { name: 'Medtronic', years: '2017-2018' },
    { name: 'Eli Lilly', years: '2014-2016' },
    { name: 'Amgen', years: '2015-2017' },
];

const expertise = [
    { category: 'Program & Project Leadership', icon: '/assets/img/svg-icons/Light Bulb.svg', items: ['PMO governance & delivery execution', 'Timeline ownership & dependency management', 'Cross-functional team leadership', 'Risk identification & mitigation', 'Executive & client communication'] },
    { category: 'Regulated Healthcare Delivery', icon: '/assets/img/svg-icons/Shield Checkmark.svg', items: ['MLR workflows & compliance', 'Audit-ready documentation', 'Pharma, diagnostics & medical device', 'HCP/Patient launch programs', 'Portfolio & budget oversight', 'Scope control & change management'] },
    { category: 'Process & Operations', icon: '/assets/img/svg-icons/Chart Statistics 2.svg', items: ['Process standardization', 'Workflow optimization', 'Agile methodologies', 'Status & governance cadences', 'Deliverable quality assurance'] },
    { category: 'Technical & Digital Fluency', icon: '/assets/img/svg-icons/Cloud.svg', items: ['AI-enabled platforms', 'Enterprise data systems', 'Digital marketing platforms', 'Healthcare systems & interoperability'] },
];

const AboutMain = () => {
    return (
        <div className="about-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .about-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .about-hero {
                    padding: 140px 40px 80px;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .about-hero-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .about-hero-title {
                    font-size: 96px;
                    font-weight: 700;
                    margin: 0 0 32px;
                    line-height: 1.1;
                    color: #F0EEE9;
                }
                .about-hero-subtitle {
                    font-size: 24px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.7);
                    margin: 0 0 24px;
                }
                .about-hero-intro {
                    font-size: 20px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.8);
                    max-width: 700px;
                }
                .about-section {
                    padding: 60px 40px;
                    max-width: 1000px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }
                .section-title {
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 32px;
                }
                .section-title-h2 {
                    font-size: 28px;
                    font-weight: 600;
                    color: #ffffff;
                    margin-bottom: 24px;
                }
                .credentials-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }
                .credential-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 20px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                }
                .credential-icon {
                    filter: invert(1) brightness(0.6);
                    flex-shrink: 0;
                }
                .credential-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: #ffffff;
                    margin-bottom: 4px;
                }
                .credential-issuer {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                }
                .clients-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                .client-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 20px;
                    text-align: left;
                }
                .client-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    margin-bottom: 4px;
                }
                .client-years {
                    font-size: 12px;
                    color: rgba(255,255,255,0.4);
                }
                .expertise-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 32px;
                }
                .expertise-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }
                .expertise-icon {
                    filter: invert(1) brightness(0.5);
                }
                .expertise-category {
                    font-size: 14px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0;
                }
                .expertise-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .expertise-list li {
                    font-size: 13px;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 8px;
                    line-height: 1.4;
                }
                .story-content {
                    font-size: 16px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.7);
                    max-width: 700px;
                }
                .story-content p {
                    margin-bottom: 24px;
                }
                .story-highlight {
                    font-size: 24px;
                    font-weight: 600;
                    color: #ffffff;
                    line-height: 1.5;
                    margin: 40px 0;
                    padding-left: 24px;
                    border-left: 3px solid rgba(255,255,255,0.3);
                }
                .about-cta {
                    text-align: left;
                    padding: 80px 40px 100px;
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
                .how-i-work-content {
                    font-size: 17px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.8);
                    max-width: 700px;
                }
                .delivery-list {
                    list-style: none;
                    padding: 0;
                    margin: 24px 0 0 0;
                    max-width: 700px;
                }
                .delivery-list li {
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 12px;
                    padding-left: 20px;
                    position: relative;
                    line-height: 1.6;
                }
                .delivery-list li::before {
                    content: '—';
                    position: absolute;
                    left: 0;
                    color: rgba(255,255,255,0.3);
                }
                .differentiator {
                    margin-top: 24px;
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.7;
                }
                .leveling-statement {
                    margin-top: 32px;
                    padding: 20px 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    font-size: 14px;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.7;
                    font-style: italic;
                }
                .keywords-section {
                    margin-top: 40px;
                    padding: 24px;
                    background: rgba(255,255,255,0.02);
                    border-radius: 8px;
                }
                .keywords-title {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: rgba(255,255,255,0.3);
                    margin-bottom: 12px;
                }
                .keywords-list {
                    font-size: 12px;
                    color: rgba(255,255,255,0.4);
                    line-height: 1.8;
                }
                @media (max-width: 991px) {
                    .about-hero {
                        padding: 120px 20px 60px;
                    }
                    .about-hero-title {
                        font-size: 56px;
                    }
                    .about-hero-intro {
                        font-size: 17px;
                    }
                    .about-section {
                        padding: 40px 20px;
                    }
                    .credentials-grid {
                        grid-template-columns: 1fr;
                    }
                    .clients-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .expertise-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 24px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section */}
                <section className="about-hero">
                    <p className="about-hero-eyebrow">Senior Project Director</p>
                    <h1 className="about-hero-title">Christopher Mangun</h1>
                    <h2 className="about-hero-subtitle">Healthcare, Regulated Marketing &amp; AI-Enabled Platforms</h2>
                    <p className="about-hero-intro">
                        Senior Project Director and Launch Lead with 15+ years of experience delivering 
                        complex, regulated healthcare programs across pharma, diagnostics, medical devices, 
                        and enterprise marketing environments. Proven track record leading multi-brand portfolios, 
                        owning timelines and budgets, coordinating cross-functional teams, and ensuring compliance 
                        across medical, legal, and regulatory (MLR) workflows.
                    </p>
                    <p className="about-hero-intro" style={{ marginTop: '16px' }}>
                        Known for translating strategy into executable delivery plans, de-risking large programs, 
                        and driving operational excellence across high-stakes, high-visibility engagements.
                    </p>
                </section>

                {/* How I Work Section */}
                <section className="about-section">
                    <h2 className="section-title">How I Work</h2>
                    <p className="how-i-work-content">
                        I operate as an embedded project leader — owning delivery from kickoff through launch, 
                        managing dependencies, running status cadences, and ensuring every deliverable is 
                        compliant, on-time, and on-brand. My approach bridges clinical, regulatory, commercial, 
                        and creative teams — translating strategic objectives into executable plans and structured 
                        governance so programs move forward predictably.
                    </p>
                    <ul className="delivery-list">
                        <li>Facilitate structured kickoff and stakeholder alignment sessions</li>
                        <li>Define project timelines, milestones, and approval checkpoints</li>
                        <li>Run weekly status meetings and capture decision/action logs</li>
                        <li>Track regulated content through MLR review cycles</li>
                        <li>Coordinate dependencies across creative, strategy, digital, and compliance</li>
                        <li>Manage budgets, scope, and resource allocation</li>
                        <li>Drive delivery to schedule, on brand, and within scope</li>
                    </ul>
                    <p className="differentiator">
                        I keep teams aligned and projects moving forward. I anticipate blockers before they 
                        escalate and bring structure without slowing velocity.
                    </p>
                </section>

                {/* Background Section */}
                <section className="about-section">
                    <h2 className="section-title">Background</h2>
                    <div className="story-content">
                        <p>
                            From managing a $51M healthcare portfolio across 13 pharma brands at IPG Health, 
                            to leading enterprise platform delivery at Pfizer, to orchestrating a 27,000-device 
                            migration at Abbott with zero FDA audit findings — my career has been defined by 
                            delivering complex programs under real regulatory constraints.
                        </p>
                        <p className="story-highlight">
                            Zero HIPAA violations across $51M+ in regulated portfolios. 
                            Zero FDA audit findings on system migrations.
                        </p>
                        <p>
                            Based in New York, I partner with healthcare organizations and agencies that need 
                            someone who understands both the operational rigor of regulated delivery and the 
                            strategic depth of modern healthcare marketing and AI-enabled platforms.
                        </p>
                    </div>
                </section>

                {/* Credentials Section */}
                <section className="about-section">
                    <h2 className="section-title">Credentials</h2>
                    <div className="credentials-grid">
                        {credentials.map((cred, i) => (
                            <div key={i} className="credential-card">
                                <Image 
                                    src={cred.icon}
                                    alt={cred.name}
                                    width={24}
                                    height={24}
                                    className="credential-icon"
                                />
                                <div>
                                    <p className="credential-name">{cred.name}</p>
                                    <p className="credential-issuer">{cred.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Clients Section */}
                <section className="about-section">
                    <h2 className="section-title">Clients</h2>
                    <div className="clients-grid">
                        {clients.map((client, i) => (
                            <div key={i} className="client-card">
                                <p className="client-name">{client.name}</p>
                                <p className="client-years">{client.years}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Core Competencies Section */}
                <section className="about-section">
                    <h2 className="section-title">Core Competencies</h2>
                    <div className="expertise-grid">
                        {expertise.map((exp, i) => (
                            <div key={i}>
                                <div className="expertise-header">
                                    <Image 
                                        src={exp.icon}
                                        alt={exp.category}
                                        width={20}
                                        height={20}
                                        className="expertise-icon"
                                    />
                                    <p className="expertise-category">{exp.category}</p>
                                </div>
                                <ul className="expertise-list">
                                    {exp.items.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                    <div className="leveling-statement">
                        15+ years leading regulated healthcare programs across pharma, diagnostics, 
                        medical devices, and enterprise marketing environments. Deep expertise in 
                        cross-functional coordination, MLR compliance, and AI-enabled platform delivery.
                    </div>
                    
                    <div className="keywords-section">
                        <p className="keywords-title">Search Keywords &amp; Expertise</p>
                        <p className="keywords-list">
                            Senior Project Director healthcare • Healthcare project management • 
                            Regulated marketing delivery • MLR compliance • Pharma portfolio management • 
                            Cross-functional healthcare teams • Healthcare agency project director • 
                            Medical device launch management • Digital healthcare marketing
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <p className="cta-text">Let&apos;s discuss your next healthcare program</p>
                    <Link href="/contact" className="cta-button">
                        Get in Touch
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AboutMain;
