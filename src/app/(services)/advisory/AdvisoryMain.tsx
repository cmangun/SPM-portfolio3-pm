"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';

const phases = [
    {
        number: '01',
        title: 'Discovery & Kickoff',
        description: 'Stakeholder interviews, scope definition, dependency mapping, and alignment on objectives, constraints, and success criteria.',
        deliverables: ['Kickoff deck & alignment summary', 'Stakeholder map', 'Scope & dependency documentation', 'Risk register initialization'],
    },
    {
        number: '02',
        title: 'Alignment & Planning',
        description: 'Timeline creation, milestone definition, approval matrices, resource planning, and establishment of governance cadences.',
        deliverables: ['Project timeline with milestones', 'RACI / approval matrix', 'Budget & resource plan', 'Status meeting cadence'],
    },
    {
        number: '03',
        title: 'Execution & Coordination',
        description: 'Weekly status cadences, cross-team facilitation, risk tracking, MLR submission management, and deliverable progression through review cycles.',
        deliverables: ['Weekly status reports & action logs', 'Risk & issue tracking', 'MLR submission tracking', 'Cross-functional coordination'],
    },
    {
        number: '04',
        title: 'Delivery & Governance',
        description: 'MLR review management, deliverable QA against brand and regulatory standards, handoff documentation, and compliance sign-off.',
        deliverables: ['Deliverable acceptance & QA', 'Compliance documentation', 'Handoff packages', 'Stakeholder sign-off'],
    },
    {
        number: '05',
        title: 'Optimization & Handoff',
        description: 'Post-delivery review, process improvement documentation, adoption support, and knowledge transfer to ensure continuity.',
        deliverables: ['Post-mortem & lessons learned', 'Process improvement recommendations', 'Adoption & training support', 'Knowledge transfer documentation'],
    },
];

const principles = [
    { title: 'Clarity Under Constraint', description: 'Regulated environments demand precision. I ensure every deliverable, decision, and communication is clear, documented, and defensible.' },
    { title: 'Proactive Risk Management', description: 'I anticipate blockers before they escalate. Risk registers, dependency maps, and early escalation protocols keep programs on track.' },
    { title: 'Cross-Functional Alignment', description: 'Healthcare programs involve medical, legal, regulatory, creative, strategy, and production teams. I keep them synchronized without slowing velocity.' },
    { title: 'Governance Without Friction', description: 'Structure should accelerate delivery, not impede it. I build governance that teams actually use — lightweight, visible, and actionable.' },
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
                    max-width: 1000px;
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
                    line-height: 1.1;
                    color: #F0EEE9;
                }
                .advisory-hero-subtitle {
                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    line-height: 1.6;
                }
                .advisory-section {
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
                    margin-bottom: 40px;
                }
                .phase-card {
                    display: flex;
                    gap: 32px;
                    margin-bottom: 48px;
                    padding-bottom: 48px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .phase-card:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .phase-number {
                    font-size: 48px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.1);
                    min-width: 80px;
                    line-height: 1;
                }
                .phase-content {
                    flex: 1;
                }
                .phase-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 12px;
                }
                .phase-description {
                    font-size: 15px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.65);
                    margin-bottom: 16px;
                }
                .phase-deliverables {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .phase-deliverables li {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 6px;
                    padding-left: 16px;
                    position: relative;
                }
                .phase-deliverables li::before {
                    content: '—';
                    position: absolute;
                    left: 0;
                    color: rgba(255,255,255,0.2);
                }
                .principles-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                .principle-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 28px;
                }
                .principle-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 8px;
                }
                .principle-description {
                    font-size: 14px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                }
                .advisory-cta {
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
                @media (max-width: 991px) {
                    .advisory-hero {
                        padding: 120px 20px 60px;
                    }
                    .advisory-hero-title {
                        font-size: 56px;
                    }
                    .advisory-section {
                        padding: 40px 20px;
                    }
                    .phase-card {
                        flex-direction: column;
                        gap: 16px;
                    }
                    .principles-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                <section className="advisory-hero">
                    <p className="advisory-hero-eyebrow">Delivery Methodology</p>
                    <h1 className="advisory-hero-title">Project Approach</h1>
                    <p className="advisory-hero-subtitle">
                        A structured, repeatable approach to delivering regulated healthcare programs — 
                        from discovery through launch and beyond. Built for clarity, compliance, and 
                        cross-functional alignment.
                    </p>
                </section>

                <section className="advisory-section">
                    <h2 className="section-title">Delivery Phases</h2>
                    {phases.map((phase) => (
                        <div key={phase.number} className="phase-card">
                            <span className="phase-number">{phase.number}</span>
                            <div className="phase-content">
                                <h3 className="phase-title">{phase.title}</h3>
                                <p className="phase-description">{phase.description}</p>
                                <ul className="phase-deliverables">
                                    {phase.deliverables.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="advisory-section">
                    <h2 className="section-title">Operating Principles</h2>
                    <div className="principles-grid">
                        {principles.map((p, i) => (
                            <div key={i} className="principle-card">
                                <h3 className="principle-title">{p.title}</h3>
                                <p className="principle-description">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="advisory-cta">
                    <p className="cta-text">Ready to discuss your next healthcare program?</p>
                    <Link href="/contact" className="cta-button">
                        Get in Touch
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AdvisoryMain;
