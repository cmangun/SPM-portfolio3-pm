"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const credentials = [
    { name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', icon: '/assets/img/svg-icons/Cloud.svg' },
    { name: 'Google Professional Machine Learning Engineer', issuer: 'Google Cloud', icon: '/assets/img/svg-icons/Settings 1.svg' },
    { name: 'Microsoft Azure AI Engineer Associate', issuer: 'Microsoft', icon: '/assets/img/svg-icons/Desktop Monitor.svg' },
    { name: 'AWS Machine Learning Specialty', issuer: 'Amazon Web Services', icon: '/assets/img/svg-icons/Chart Statistics 1.svg' },
    { name: 'Lean Six Sigma Black Belt', issuer: 'IASSC', icon: '/assets/img/svg-icons/Trend Up 1.svg' },
    { name: 'Stanford AI/ML Healthcare Specialization', issuer: 'Stanford University', icon: '/assets/img/svg-icons/Graduation Hat.svg' },
];

const clients = [
    { name: 'Pfizer', years: '2024-2025' },
    { name: 'Abbott', years: '2018-2020' },
    { name: 'IPG Health', years: '2020-2024' },
    { name: 'Novartis', years: '2020-2024' },
    { name: 'Sanofi', years: '2020-2024' },
    { name: 'Medtronic', years: '2017-2018' },
    { name: 'Eli Lilly', years: '2014-2016' },
    { name: 'Amgen', years: '2015-2017' },
];

const expertise = [
    { category: 'AI/ML Systems', icon: '/assets/img/svg-icons/Light Bulb.svg', items: ['RAG Systems', 'Graph-RAG', 'LLM Integration', 'NLP', 'Fine-tuning', 'Prompt Engineering'] },
    { category: 'Platforms', icon: '/assets/img/svg-icons/Cloud.svg', items: ['Azure ML', 'AWS SageMaker', 'AKS', 'MLflow', 'Kubeflow', 'Vertex AI'] },
    { category: 'Data', icon: '/assets/img/svg-icons/Chart Statistics 2.svg', items: ['PostgreSQL', 'Neo4j', 'Pinecone', 'Qdrant', 'Delta Lake', 'Snowflake'] },
    { category: 'Compliance', icon: '/assets/img/svg-icons/Shield Checkmark.svg', items: ['HIPAA', 'FDA 21 CFR Part 11', 'MLR Compliance', 'SOC 2', 'Model Explainability'] },
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
                .cta-buttons {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
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
                .cta-button-outline {
                    background: transparent;
                    color: #ffffff;
                    border: 1px solid rgba(255,255,255,0.3);
                }
                .cta-button-outline:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.5);
                }
                .toolchain-section {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 32px;
                    margin-top: 40px;
                }
                .toolchain-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px 40px;
                }
                .toolchain-row {
                    display: flex;
                    gap: 16px;
                }
                .toolchain-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.5);
                    min-width: 100px;
                }
                .toolchain-value {
                    font-size: 13px;
                    color: rgba(255,255,255,0.8);
                    line-height: 1.5;
                }
                .how-i-work-content {
                    font-size: 17px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.8);
                    max-width: 700px;
                }
                .failure-mode-callout {
                    margin-top: 32px;
                    padding: 24px;
                    background: rgba(255,255,255,0.02);
                    border-left: 3px solid rgba(255,255,255,0.2);
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
                .differentiator {
                    margin-top: 24px;
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.7;
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
                    .toolchain-grid {
                        grid-template-columns: 1fr;
                    }
                    .cta-buttons {
                        flex-direction: column;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                {/* Hero Section - AEO OPTIMIZED */}
                <section className="about-hero">
                    <p className="about-hero-eyebrow">Forward-Deployed AI Architect</p>
                    <h1 className="about-hero-title">Christopher Mangun</h1>
                    {/* H2 with role language for search intent */}
                    <h2 className="about-hero-subtitle">Principal AI Platform Engineer — Enterprise AI Systems for Regulated Environments</h2>
                    {/* AEO-OPTIMIZED INTRO - Exact phrases for AI summarizers */}
                    <p className="about-hero-intro">
                        I am a Forward-Deployed AI Architect and Principal AI Platform Engineer specializing 
                        in the design and deployment of production-grade AI systems for regulated enterprises. 
                        My work spans Retrieval-Augmented Generation (RAG), enterprise search, AI governance, 
                        MLOps, and human-in-the-loop systems, with deep experience in healthcare, life sciences, 
                        and compliance-driven environments.
                    </p>
                    <p className="about-hero-intro" style={{ marginTop: '16px' }}>
                        I have led AI initiatives from ambiguous discovery through production delivery, 
                        audit readiness, and organizational adoption—ensuring systems are reliable, 
                        explainable, secure, and compliant.
                    </p>
                </section>

                {/* How I Work Section - NEW */}
                <section className="about-section">
                    <h2 className="section-title">How I Work</h2>
                    <p className="how-i-work-content">
                        I operate as a Forward-Deployed Engineer embedded with stakeholders, owning the full 
                        lifecycle from discovery and system design through production deployment, audit readiness, 
                        and organizational adoption. My focus is on systems that are reliable, explainable, and 
                        safe to operate in regulated environments.
                    </p>
                    
                    {/* Differentiator */}
                    <p className="differentiator">
                        My work focuses on building AI systems that organizations can safely rely on—not 
                        prototypes, demos, or prompt wrappers.
                    </p>
                    
                    {/* Failure Mode Callout */}
                    <div className="failure-mode-callout">
                        A core design principle across my work is anticipating failure modes—model drift, 
                        retrieval degradation, governance gaps, and operational misuse—and designing systems 
                        that surface issues early rather than hide them.
                    </div>
                </section>

                {/* Background Section */}
                <section className="about-section">
                    <h2 className="section-title">Background</h2>
                    <div className="story-content">
                        <p>
                            I've spent my career at the intersection of enterprise technology and 
                            healthcare compliance. From migrating ML pipelines through FDA audits at 
                            Abbott, to building the first MCP-RAG knowledge platform for pharmaceutical 
                            content at Pfizer, I've learned that the hardest part of AI isn't the 
                            algorithms—it's shipping systems that work in production under real constraints.
                        </p>
                        <p className="story-highlight">
                            Zero HIPAA violations across $51M+ in regulated AI portfolios. 
                            Zero FDA audit findings on ML system migrations.
                        </p>
                        <p>
                            Based in New York, I work with healthcare organizations that need someone 
                            who understands both the technical depth of modern AI systems and the 
                            regulatory reality of deploying them in clinical and commercial environments.
                        </p>
                    </div>
                </section>

                {/* Representative Toolchain - NEW */}
                <section className="about-section">
                    <h2 className="section-title">Representative Toolchain</h2>
                    <div className="toolchain-section">
                        <div className="toolchain-grid">
                            <div className="toolchain-row">
                                <span className="toolchain-label">Architecture</span>
                                <span className="toolchain-value">Cloud-native, service-oriented AI platforms</span>
                            </div>
                            <div className="toolchain-row">
                                <span className="toolchain-label">AI Systems</span>
                                <span className="toolchain-value">Retrieval-Augmented Generation (RAG), enterprise search</span>
                            </div>
                            <div className="toolchain-row">
                                <span className="toolchain-label">Governance</span>
                                <span className="toolchain-value">Audit logging, policy enforcement, HITL workflows</span>
                            </div>
                            <div className="toolchain-row">
                                <span className="toolchain-label">MLOps</span>
                                <span className="toolchain-value">CI/CD, evaluation pipelines, monitoring and alerting</span>
                            </div>
                            <div className="toolchain-row">
                                <span className="toolchain-label">Data</span>
                                <span className="toolchain-value">Vector databases, structured metadata stores</span>
                            </div>
                            <div className="toolchain-row">
                                <span className="toolchain-label">Languages</span>
                                <span className="toolchain-value">Python, TypeScript</span>
                            </div>
                        </div>
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

                {/* Expertise Section */}
                <section className="about-section">
                    <h2 className="section-title">Technical Expertise</h2>
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
                    
                    {/* Leveling Statement - NEW */}
                    <div className="leveling-statement">
                        This portfolio reflects Principal-level ownership across problem definition, system 
                        architecture, production delivery, regulatory alignment, and long-term operational stewardship.
                    </div>
                    
                    {/* Search Keywords Section - SEO/AEO */}
                    <div className="keywords-section">
                        <p className="keywords-title">Search Keywords & Expertise</p>
                        <p className="keywords-list">
                            Forward Deployed Engineer portfolio • Principal AI Architect healthcare • 
                            Enterprise RAG architecture • AI governance platform • Regulated AI systems • 
                            Healthcare AI compliance • MLOps for regulated environments • 
                            AI auditability and traceability • Enterprise knowledge systems
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <p className="cta-text">Let's discuss your AI initiative</p>
                    <Link href="/contact" className="cta-button">
                        Get in Touch
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AboutMain;
