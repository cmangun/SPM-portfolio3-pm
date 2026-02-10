import PortfolioWebglMain from '@/pages/portfolios/portfolio-webgl/PortfolioWebglMain';
import { Metadata } from 'next';
import { siteConfig, faqSchema, homePageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: `${siteConfig.name} | Senior Project Director`,
    description: 'Senior Project Director and Launch Lead with 15+ years delivering complex, regulated healthcare programs across pharma, diagnostics, medical devices, and enterprise marketing environments. Proven track record leading multi-brand portfolios, owning timelines and budgets, coordinating cross-functional teams, and ensuring compliance across medical, legal, and regulatory (MLR) workflows.',
    keywords: [
        // Canonical Role Keywords (ATS Priority)
        'Senior Project Director',
        'Healthcare Project Director',
        'Project Director Healthcare',
        'Senior Project Manager Healthcare',
        'Healthcare Portfolio Manager',
        'Regulated Marketing Project Director',
        'Healthcare Agency Project Director',
        'Pharma Project Director',
        'Healthcare Launch Lead',
        'PMO Healthcare',
        // Core Capabilities
        'MLR Compliance',
        'Medical Legal Regulatory',
        'Cross-Functional Delivery',
        'Healthcare Program Management',
        'Portfolio Management',
        'Timeline Management',
        'Budget Management',
        'Stakeholder Alignment',
        // Compliance
        'FDA Compliance',
        'HIPAA Compliance',
        'Regulatory Submissions',
        'Audit-Ready Documentation',
        // Domain
        'healthcare project management',
        'pharma project director',
        'life sciences project management',
        'medical device project management',
        'healthcare marketing delivery',
        'AI-enabled healthcare platforms',
    ],
    openGraph: {
        title: `${siteConfig.name} | Senior Project Director`,
        description: 'Senior Project Director delivering production-grade AI systems for regulated enterprises. 15+ years experience with Pfizer, Abbott, Novartis, Sanofi, and Medtronic.',
        type: 'website',
        url: siteConfig.url,
        images: [
            {
                url: `${siteConfig.url}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Christopher Mangun - Senior Project Director',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} | Senior Project Director`,
        description: 'Senior Project Director delivering production-grade AI systems for regulated enterprises.',
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
