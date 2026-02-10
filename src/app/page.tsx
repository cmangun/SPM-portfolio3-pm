import PortfolioWebglMain from '@/pages/portfolios/portfolio-webgl/PortfolioWebglMain';
import { Metadata } from 'next';
import { siteConfig, faqSchema, homePageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: `${siteConfig.name} | Forward-Deployed AI Architect & Principal AI Platform Engineer`,
    description: 'Forward-Deployed AI Architect and Principal AI Platform Engineer delivering production-grade AI systems for regulated enterprises. Specializing in Retrieval-Augmented Generation (RAG), enterprise knowledge platforms, and AI governance for healthcare and life sciences under HIPAA, FDA, and GxP constraints.',
    keywords: [
        // Canonical Role Keywords (ATS Priority)
        'Forward Deployed Engineer',
        'FDE',
        'Principal AI Architect',
        'Principal AI Platform Engineer',
        'Enterprise AI Architect',
        'Machine Learning Platform Engineer',
        'MLOps Architect',
        'AI Governance Architect',
        'Regulated AI Systems Engineer',
        'Healthcare AI Architect',
        'Production AI Systems Lead',
        // Core Capabilities
        'Retrieval-Augmented Generation',
        'RAG',
        'Vector Search',
        'Enterprise Knowledge Systems',
        'AI Governance',
        'Human-in-the-Loop',
        'HITL',
        'MLOps',
        // Compliance
        'FDA 21 CFR Part 11',
        'HIPAA Compliance',
        'SOC 2',
        'Audit Trails',
        // Domain
        'healthcare AI consultant',
        'pharma AI consultant',
        'regulated AI systems',
        'enterprise RAG systems',
        'AI consultant New York',
    ],
    openGraph: {
        title: `${siteConfig.name} | Forward-Deployed AI Architect`,
        description: 'Forward-Deployed AI Architect delivering production-grade AI systems for regulated enterprises. 15+ years experience with Pfizer, Abbott, Novartis, Sanofi, and Medtronic.',
        type: 'website',
        url: siteConfig.url,
        images: [
            {
                url: `${siteConfig.url}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Christopher Mangun - Forward-Deployed AI Architect',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} | Forward-Deployed AI Architect`,
        description: 'Forward-Deployed AI Architect delivering production-grade AI systems for regulated enterprises.',
        images: [`${siteConfig.url}/og-image.png`],
    },
    alternates: {
        canonical: siteConfig.url,
    },
};

export default function Home() {
    return (
        <>
            {/* Homepage Schema - Person + ProfessionalService + Website */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(homePageSchema),
                }}
            />
            {/* FAQ Schema for AI discoverability */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <PortfolioWebglMain />
        </>
    );
}
