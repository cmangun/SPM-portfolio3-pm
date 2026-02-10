'use client';

import Link from 'next/link';

const PLAYBOOK_URL = 'https://enterprise-ai-playbook-demo.vercel.app';

export default function AiMlPlaybookEmbed() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a' }}>
            {/* Back navigation bar */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                    background: '#111',
                    borderBottom: '1px solid #222',
                    flexShrink: 0,
                }}
            >
                <Link
                    href="/"
                    style={{
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                >
                    &larr; Portfolio
                </Link>
                <span style={{ color: '#64748b', fontSize: '13px' }}>
                    AI/ML Production Playbook
                </span>
            </div>

            {/* Embedded playbook */}
            <iframe
                src={PLAYBOOK_URL}
                style={{
                    flex: 1,
                    width: '100%',
                    border: 'none',
                }}
                title="AI/ML Production Playbook - 12-Month Enterprise Roadmap"
                allow="fullscreen"
            />
        </div>
    );
}
