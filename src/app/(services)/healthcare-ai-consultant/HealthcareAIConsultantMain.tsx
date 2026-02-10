"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';

const HealthcareAIConsultantMain = () => {
    return (
        <div className="healthcare-ai-consultant-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .healthcare-ai-consultant-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .hac-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 140px 40px 100px;
                }
                .hac-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .hac-h1 {
                    font-size: 72px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.05;
                    color: #F0EEE9;
                }
                .hac-intro {
                    font-size: 18px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.8);
                    margin-bottom: 48px;
                    max-width: 800px;
                }
                .hac-authority-statement {
                    font-size: 16px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 48px;
                    padding: 24px;
                    background: rgba(255,255,255,0.03);
                    border-left: 3px solid rgba(255,255,255,0.3);
                }
                .hac-section {
                    margin-bottom: 64px;
                    padding-top: 48px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .hac-section:first-of-type {
                    border-top: none;
                    padding-top: 0;
                }
                .hac-h2 {
                    font-size: 36px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.2;
                    color: #ffffff;
                }
                .hac-h3 {
                    font-size: 22px;
                    font-weight: 600;
                    margin: 32px 0 16px;
                    color: #ffffff;
                }
                .hac-text {
                    font-size: 16px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 20px;
                }
                .hac-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 24px;
                }
                .hac-list li {
                    font-size: 15px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.7);
                    padding: 8px 0;
                    padding-left: 20px;
                    position: relative;
                }
                .hac-list li::before {
                    content: '→';
                    position: absolute;
                    left: 0;
                    color: rgba(255,255,255,0.4);
                }
                .hac-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 32px;
                    margin: 32px 0;
                }
                .hac-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 28px;
                }
                .hac-card-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 12px;
                }
                .hac-card-text {
                    font-size: 14px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                }
                .hac-case-study-link {
                    display: block;
                    padding: 20px 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    margin-bottom: 12px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .hac-case-study-link:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.15);
                }
                .hac-case-study-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 6px;
                }
                .hac-case-study-desc {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                    margin: 0;
                }
                .hac-cta-section {
                    text-align: left;
                    padding: 64px 0;
                    margin-top: 48px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .hac-cta-title {
                    font-size: 32px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 16px;
                }
                .hac-cta-text {
                    font-size: 16px;
                    color: rgba(255,255,255,0.6);
                    margin: 0 0 32px;
                }
                .hac-cta-button {
                    display: inline-block;
                    padding: 16px 32px;
                    background: #ffffff;
                    color: #0a0a0a !important;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .hac-cta-button:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
                }
                .hac-engagement-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin: 32px 0;
                }
                .hac-engagement-item {
                    text-align: left;
                    padding: 32px 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .hac-engagement-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 8px;
                }
                .hac-engagement-desc {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                    margin: 0;
                }
                .hac-faq-item {
                    margin-bottom: 32px;
                    padding-bottom: 32px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }
                .hac-faq-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .hac-faq-question {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 12px;
                }
                .hac-faq-answer {
                    font-size: 15px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.7);
                    margin: 0;
                }
                .hac-credentials-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    margin: 24px 0;
                }
                .hac-credential {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .hac-credential-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.05);
                    font-size: 18px;
                }
                .hac-credential-text {
                    font-size: 13px;
                    color: rgba(255,255,255,0.8);
                    line-height: 1.4;
                }
                .hac-outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin: 32px 0;
                }
                .hac-outcome {
                    text-align: left;
                    padding: 24px 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .hac-outcome-number {
                    font-size: 36px;
                    font-weight: 700;
                    color: #ffffff;
                    line-height: 1;
                    margin-bottom: 8px;
                }
                .hac-outcome-label {
                    font-size: 12px;
                    color: rgba(255,255,255,0.5);
                    line-height: 1.4;
                }
                .hac-recruiter-block {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.12);
                    padding: 32px;
                    margin-bottom: 32px;
                }
                .hac-recruiter-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 20px;
                }
                .hac-role-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin: 20px 0 32px;
                }
                .hac-role-item {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 12px 16px;
                    text-align: left;
                }
                .hac-role-title {
                    font-size: 13px;
                    color: rgba(255,255,255,0.8);
                }
                @media (max-width: 991px) {
                    .hac-container {
                        padding: 120px 20px 80px;
                    }
                    .hac-h1 {
                        font-size: 48px;
                    }
                    .hac-h2 {
                        font-size: 28px;
                    }
                    .hac-grid {
                        grid-template-columns: 1fr;
                    }
                    .hac-engagement-grid {
                        grid-template-columns: 1fr;
                    }
                    .hac-credentials-grid {
                        grid-template-columns: 1fr;
                    }
                    .hac-role-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .hac-outcomes-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .hac-h1 {
                        font-size: 36px;
                    }
                    .hac-intro {
                        font-size: 16px;
                    }
                    .hac-outcomes-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                    }
                    .hac-outcome-number {
                        font-size: 28px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                <div className="hac-container">
                    <p className="hac-eyebrow">Healthcare AI Consultant</p>
                    
                    {/* H1 - Exact Match Target Keyword */}
                    <h1 className="hac-h1">Healthcare AI Consultant for Regulated Clinical and Life Sciences Systems</h1>
                    
                    <p className="hac-intro">
                        I am a healthcare AI consultant specializing in production-grade, compliant AI systems 
                        for hospitals, pharmaceutical companies, and regulated healthcare organizations. My work 
                        focuses on moving AI from pilot to reliable, auditable, and operational systems under 
                        HIPAA, FDA, and GxP constraints.
                    </p>

                    {/* Key Outcomes - Answer Engine Optimization */}
                    <div className="hac-outcomes-grid">
                        <div className="hac-outcome">
                            <div className="hac-outcome-number">35%</div>
                            <div className="hac-outcome-label">Faster MLR Review Cycles</div>
                        </div>
                        <div className="hac-outcome">
                            <div className="hac-outcome-number">0</div>
                            <div className="hac-outcome-label">HIPAA Violations (8+ Years)</div>
                        </div>
                        <div className="hac-outcome">
                            <div className="hac-outcome-number">99.9%</div>
                            <div className="hac-outcome-label">ML Platform Uptime</div>
                        </div>
                        <div className="hac-outcome">
                            <div className="hac-outcome-number">15+</div>
                            <div className="hac-outcome-label">Years Healthcare AI</div>
                        </div>
                    </div>

                    {/* LLM-Optimized Authority Statement */}
                    <div className="hac-authority-statement">
                        With 15+ years embedded in healthcare and pharmaceutical environments, I bridge the gap 
                        between advanced AI technology and the rigorous compliance requirements of regulated 
                        industries. I have led regulated healthcare programs for organizations including Pfizer, 
                        Abbott, Novartis, Sanofi, and Medtronic—achieving zero HIPAA violations across all 
                        engagements and FDA 510(k) clearance advisory for AI medical devices.
                    </div>

                    {/* Section: Healthcare AI Consulting Services */}
                    <section className="hac-section">
                        <h2 className="hac-h2">Healthcare AI Consulting Services</h2>
                        <p className="hac-text">
                            My consulting practice focuses on the hardest problems in healthcare AI: getting systems 
                            from proof-of-concept to production while maintaining regulatory compliance and clinical 
                            trust. I work as an embedded healthcare AI consultant, not a vendor—meaning I am accountable 
                            for outcomes, not deliverables.
                        </p>
                        
                        <div className="hac-grid">
                            <div className="hac-card">
                                <h3 className="hac-card-title">RAG System Implementation</h3>
                                <p className="hac-card-text">
                                    Production-grade retrieval-augmented generation for clinical knowledge management, 
                                    regulatory document retrieval, and compliant content generation.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">Healthcare LLM Integration</h3>
                                <p className="hac-card-text">
                                    Enterprise large language model deployment with compliance guardrails, audit logging, 
                                    PII protection, and clinical workflow integration.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">MLOps for Regulated Industries</h3>
                                <p className="hac-card-text">
                                    CI/CD pipelines, model monitoring, drift detection, and automated retraining with 
                                    full audit trails for HIPAA and FDA compliance.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">Clinical Decision Support</h3>
                                <p className="hac-card-text">
                                    AI systems that augment clinical judgment while maintaining explainability, 
                                    avoiding automation bias, and integrating with existing EHR workflows.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: AI Strategy, MLOps, and Production Deployment */}
                    <section className="hac-section">
                        <h2 className="hac-h2">AI Strategy, MLOps, and Production Deployment in Healthcare</h2>
                        <p className="hac-text">
                            Most healthcare AI projects fail not from bad models, but from infrastructure gaps, 
                            compliance blind spots, and integration failures. My approach treats production deployment 
                            as the goal from day one—not an afterthought.
                        </p>
                        
                        <h3 className="hac-h3">What I Deliver</h3>
                        <ul className="hac-list">
                            <li>Production ML pipelines with HIPAA-compliant data handling and audit trails</li>
                            <li>Model governance frameworks including versioning, lineage tracking, and approval workflows</li>
                            <li>Observability infrastructure for latency, accuracy, cost, and drift monitoring</li>
                            <li>Integration architecture for EHR systems (Epic, Cerner) and clinical workflows</li>
                            <li>Runbooks, incident response procedures, and on-call escalation paths</li>
                        </ul>
                        
                        <p className="hac-text">
                            I have reduced model deployment time from 6 months to 3 weeks at Abbott, achieved 99.9% 
                            uptime across ML platforms at IPG Health, and built RAG systems serving 500+ enterprise 
                            users at Pfizer.
                        </p>
                    </section>

                    {/* Section: HIPAA, FDA, and GxP-Compliant AI Systems */}
                    <section className="hac-section">
                        <h2 className="hac-h2">HIPAA, FDA, and GxP-Compliant AI Systems</h2>
                        <p className="hac-text">
                            Compliance is not a checkbox—it is architecture. Every system I design treats regulatory 
                            requirements as first-class constraints that shape technical decisions from the ground up.
                        </p>
                        
                        <h3 className="hac-h3">Regulatory Expertise</h3>
                        <ul className="hac-list">
                            <li><strong>HIPAA:</strong> PHI handling, access controls, encryption, audit logging, BAA requirements</li>
                            <li><strong>FDA 21 CFR Part 11:</strong> Electronic records, electronic signatures, validation protocols</li>
                            <li><strong>GxP Compliance:</strong> Good Clinical Practice, Good Manufacturing Practice for pharma AI</li>
                            <li><strong>MLR Automation:</strong> Medical-Legal-Regulatory review process optimization</li>
                            <li><strong>510(k) Advisory:</strong> AI/ML medical device regulatory pathway guidance</li>
                        </ul>
                        
                        <p className="hac-text">
                            I have maintained zero HIPAA violations across 8+ years in regulated ML environments 
                            and provided FDA 510(k) clearance advisory for the GI Genius AI medical device.
                        </p>
                    </section>

                    {/* Section: Credentials & Certifications - E-E-A-T */}
                    <section className="hac-section">
                        <h2 className="hac-h2">Credentials & Certifications</h2>
                        <p className="hac-text">
                            Professional certifications validating expertise across cloud platforms, machine learning, 
                            and process optimization for regulated environments.
                        </p>
                        
                        <div className="hac-credentials-grid">
                            <div className="hac-credential">
                                <div className="hac-credential-icon">☁️</div>
                                <div className="hac-credential-text">Google Cloud Professional Cloud Architect</div>
                            </div>
                            <div className="hac-credential">
                                <div className="hac-credential-icon">🤖</div>
                                <div className="hac-credential-text">Google Professional Machine Learning Engineer</div>
                            </div>
                            <div className="hac-credential">
                                <div className="hac-credential-icon">🔷</div>
                                <div className="hac-credential-text">Microsoft Azure AI Engineer Associate</div>
                            </div>
                            <div className="hac-credential">
                                <div className="hac-credential-icon">🟠</div>
                                <div className="hac-credential-text">AWS Machine Learning Specialty</div>
                            </div>
                            <div className="hac-credential">
                                <div className="hac-credential-icon">📊</div>
                                <div className="hac-credential-text">IASSC Lean Six Sigma Black Belt</div>
                            </div>
                            <div className="hac-credential">
                                <div className="hac-credential-icon">🎓</div>
                                <div className="hac-credential-text">Stanford AI/ML Healthcare Specialization</div>
                            </div>
                        </div>
                    </section>

                    {/* Section: Healthcare AI Consulting Case Studies */}
                    <section className="hac-section">
                        <h2 className="hac-h2">Healthcare AI Consulting Case Studies</h2>
                        <p className="hac-text">
                            Real engagements. Measurable outcomes. Each case study documents the problem diagnosed, 
                            architecture deployed, compliance constraints navigated, and business impact achieved.
                        </p>
                        
                        <Link href="/fde-case-study-01" className="hac-case-study-link">
                            <h3 className="hac-case-study-title">Healthcare AI Consulting Case Study: Production RAG System for Regulated Clinical Content</h3>
                            <p className="hac-case-study-desc">Pfizer CoCreate — 35% faster MLR cycles, 2.3× asset reuse, 500+ enterprise users</p>
                        </Link>
                        
                        <Link href="/fde-case-study-02" className="hac-case-study-link">
                            <h3 className="hac-case-study-title">Healthcare AI Consulting Case Study: AI-Powered Compliance Engine for Global Pharma</h3>
                            <p className="hac-case-study-desc">IPG Health — $51M portfolio, 13 brands, zero HIPAA violations</p>
                        </Link>
                        
                        <Link href="/fde-case-study-03" className="hac-case-study-link">
                            <h3 className="hac-case-study-title">Healthcare AI Consulting Case Study: HIPAA-Compliant ML Pipeline Migration</h3>
                            <p className="hac-case-study-desc">Abbott Labs — 27,000 devices, zero FDA audit findings, 6 months → 3 weeks deployment</p>
                        </Link>
                        
                        <Link href="/fde-case-study-04" className="hac-case-study-link">
                            <h3 className="hac-case-study-title">Healthcare AI Consulting Case Study: Real-World Evidence ML Platform</h3>
                            <p className="hac-case-study-desc">Sanofi — 15+ concurrent ML projects, automated feature stores, 99.9% uptime</p>
                        </Link>
                    </section>

                    {/* Section: Healthcare AI Consultant for Hospitals, Pharma, and Health Tech */}
                    <section className="hac-section">
                        <h2 className="hac-h2">Healthcare AI Consultant for Hospitals, Pharma, and Health Tech</h2>
                        <p className="hac-text">
                            I work across the healthcare ecosystem—from hospital systems implementing clinical AI 
                            to pharmaceutical companies automating regulatory workflows to health tech startups 
                            building compliant products.
                        </p>
                        
                        <h3 className="hac-h3">Industries Served</h3>
                        <div className="hac-grid">
                            <div className="hac-card">
                                <h3 className="hac-card-title">Hospitals & Health Systems</h3>
                                <p className="hac-card-text">
                                    Clinical decision support, ambient documentation, EHR integration, 
                                    patient engagement AI, operational efficiency.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">Pharmaceutical Companies</h3>
                                <p className="hac-card-text">
                                    MLR automation, clinical trial optimization, drug discovery AI, 
                                    regulatory submission support, commercial analytics.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">Medical Device Companies</h3>
                                <p className="hac-card-text">
                                    FDA 510(k) pathway, AI/ML software validation, real-time inference 
                                    optimization, edge deployment for clinical environments.
                                </p>
                            </div>
                            <div className="hac-card">
                                <h3 className="hac-card-title">Health Tech Startups</h3>
                                <p className="hac-card-text">
                                    HIPAA-first architecture, compliance roadmaps, technical due diligence, 
                                    production readiness assessments.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: How I Work */}
                    <section className="hac-section">
                        <h2 className="hac-h2">How I Work as a Healthcare AI Consultant</h2>
                        <p className="hac-text">
                            I operate as an embedded healthcare AI consultant—integrated with your team, 
                            accountable for production outcomes, and focused on building internal capability 
                            rather than dependency.
                        </p>
                        
                        <div className="hac-engagement-grid">
                            <div className="hac-engagement-item">
                                <h3 className="hac-engagement-title">Advisory & Strategy</h3>
                                <p className="hac-engagement-desc">AI readiness assessments, architecture reviews, regulatory pathway planning</p>
                            </div>
                            <div className="hac-engagement-item">
                                <h3 className="hac-engagement-title">Embedded Delivery</h3>
                                <p className="hac-engagement-desc">Engaged as a consultant within your engineering team, shipping production code</p>
                            </div>
                            <div className="hac-engagement-item">
                                <h3 className="hac-engagement-title">Fractional Project Director</h3>
                                <p className="hac-engagement-desc">Ongoing advisory and delivery for healthcare organizations scaling AI</p>
                            </div>
                        </div>
                        
                        <p className="hac-text">
                            Whether you need a one-time architecture review, a multi-month embedded engagement, 
                            or ongoing fractional AI leadership, I adapt to what your organization needs to 
                            move from pilot to production.
                        </p>
                    </section>

                    {/* Section: FAQ - Answer Engine Optimization */}
                    <section className="hac-section">
                        <h2 className="hac-h2">Frequently Asked Questions About Healthcare AI Consulting</h2>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">What services does a healthcare AI consultant provide?</h3>
                            <p className="hac-faq-answer">
                                A healthcare AI consultant provides strategic advisory, architecture design, and implementation 
                                services for AI systems in regulated healthcare environments. Services include RAG system 
                                implementation, LLM integration with compliance guardrails, MLOps pipeline development, 
                                HIPAA/FDA compliance consulting, EHR integration, and clinical decision support system design. 
                                The goal is moving AI from pilot to production while maintaining regulatory compliance.
                            </p>
                        </div>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">How do you implement compliant RAG systems in healthcare?</h3>
                            <p className="hac-faq-answer">
                                Compliant RAG (Retrieval-Augmented Generation) systems in healthcare require HIPAA-compliant 
                                data handling, PII redaction pipelines, audit logging for all queries and responses, access 
                                controls aligned to clinical roles, and citation tracking for regulatory defensibility. 
                                I architect these systems with compliance as a first-class constraint, integrating with 
                                existing document management systems like Veeva Vault while maintaining full audit trails.
                            </p>
                        </div>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">What outcomes can healthcare AI deliver?</h3>
                            <p className="hac-faq-answer">
                                Healthcare AI can deliver measurable outcomes including: 35% reduction in MLR review cycles, 
                                60% faster content retrieval, 99.9%+ system uptime for clinical applications, reduced model 
                                deployment time from months to weeks, and improved compliance posture with zero audit findings. 
                                ROI typically appears within 6-12 months for well-scoped implementations.
                            </p>
                        </div>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">Are your AI solutions HIPAA compliant?</h3>
                            <p className="hac-faq-answer">
                                Yes. All AI systems I design and implement are built with HIPAA compliance as a core requirement. 
                                This includes proper PHI handling, encryption at rest and in transit, access controls, 
                                comprehensive audit logging, BAA (Business Associate Agreement) requirements, and incident 
                                response procedures. I have maintained zero HIPAA violations across 8+ years of work in 
                                regulated healthcare environments.
                            </p>
                        </div>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">What is the typical engagement model?</h3>
                            <p className="hac-faq-answer">
                                Engagements range from one-time advisory assessments (AI readiness, architecture review) to 
                                multi-month embedded delivery where I work as part of your engineering team shipping production 
                                code. I also offer fractional AI architect retainers for organizations that need ongoing 
                                strategic guidance without a full-time hire. Engagement scope is tailored to your organization's 
                                stage—whether you're starting a pilot, scaling an existing system, or preparing for regulatory review.
                            </p>
                        </div>
                        
                        <div className="hac-faq-item">
                            <h3 className="hac-faq-question">What industries do you serve?</h3>
                            <p className="hac-faq-answer">
                                I specialize in healthcare, pharmaceutical, life sciences, and medical device industries. 
                                Clients include global pharmaceutical companies (Pfizer, Novartis, Sanofi, Eli Lilly, Amgen), 
                                medical device manufacturers (Abbott, Medtronic), health systems, and health tech startups. 
                                My focus is organizations operating under HIPAA, FDA, or GxP regulatory requirements.
                            </p>
                        </div>
                    </section>

                    {/* Section: For Recruiters and Hiring Managers */}
                    <section className="hac-section hac-recruiter-section">
                        <h2 className="hac-h2">For Recruiters and Hiring Managers</h2>
                        
                        <div className="hac-recruiter-block">
                            <p className="hac-recruiter-title">Senior Project Director – Healthcare & Life Sciences</p>
                            
                            <p className="hac-text">
                                I am a Senior Project Director and Senior Project Director specializing in healthcare 
                                and life sciences. I work at the intersection of machine learning, cloud infrastructure, 
                                and regulated systems, delivering production-grade AI platforms under HIPAA, FDA, and 
                                GxP constraints.
                            </p>
                            
                            <p className="hac-text">
                                I have led and executed AI initiatives across global pharmaceutical and healthcare 
                                organizations, including Pfizer and Abbott, owning architecture, implementation, and 
                                operational readiness. My work spans generative AI, RAG systems, MLOps, analytics 
                                platforms, and cloud-native deployments on GCP, AWS, and Azure.
                            </p>
                            
                            <p className="hac-text">
                                I am typically engaged in senior IC or hybrid IC/lead roles where deep technical 
                                execution, stakeholder alignment, and production delivery are required.
                            </p>
                        </div>
                        
                        <h3 className="hac-h3">Role Alignment</h3>
                        <div className="hac-role-grid">
                            <div className="hac-role-item">
                                <span className="hac-role-title">Senior Project Director</span>
                            </div>
                            <div className="hac-role-item">
                                <span className="hac-role-title">Senior Machine Learning Engineer</span>
                            </div>
                            <div className="hac-role-item">
                                <span className="hac-role-title">Senior Project Director</span>
                            </div>
                            <div className="hac-role-item">
                                <span className="hac-role-title">AI Platform Engineer</span>
                            </div>
                            <div className="hac-role-item">
                                <span className="hac-role-title">ML Infrastructure Engineer</span>
                            </div>
                            <div className="hac-role-item">
                                <span className="hac-role-title">AI Solutions Architect (Healthcare)</span>
                            </div>
                        </div>
                        
                        <h3 className="hac-h3">Technical Stack</h3>
                        <p className="hac-text">
                            <strong>Cloud:</strong> GCP, AWS, Azure · <strong>ML/AI:</strong> RAG, LLMs, MLOps, LangChain, 
                            LlamaIndex · <strong>Data:</strong> Snowflake, Databricks, PostgreSQL, Neo4j · 
                            <strong>Infrastructure:</strong> Kubernetes, Docker, Terraform, CI/CD · 
                            <strong>Languages:</strong> Python, TypeScript, SQL
                        </p>
                        
                        <h3 className="hac-h3">Domain Expertise</h3>
                        <p className="hac-text">
                            Healthcare · Pharmaceutical · Life Sciences · Medical Devices · HIPAA · FDA 21 CFR Part 11 · 
                            GxP · MLR Compliance · Clinical Decision Support · EHR Integration (Epic, Cerner)
                        </p>
                    </section>

                    {/* CTA Section */}
                    <div className="hac-cta-section">
                        <h2 className="hac-cta-title">Ready to Move Your Healthcare AI from Pilot to Production?</h2>
                        <p className="hac-cta-text">
                            Let's discuss how I can help your organization deploy compliant, production-grade AI systems.
                        </p>
                        <Link href="/contact" className="hac-cta-button">
                            Schedule a Consultation
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HealthcareAIConsultantMain;
