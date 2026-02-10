import FDECaseStudy02 from '@/pages/fde/FDECaseStudy02';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "AI Playbooks - Multi-Tenant Compliance Platform | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Delivered regulated content systems for $51M portfolio across 13 pharma brands with zero HIPAA violations over 4 years. Enterprise AI platform with compliance automation.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'pharma AI',
        'IPG Health',
        'compliance automation',
        'HIPAA compliance',
        'multi-tenant AI',
        'regulated AI systems',
        'MLR automation',
        'enterprise compliance',
    ],
    openGraph: {
        title: "AI Playbooks - Multi-Tenant Compliance Platform | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: $51M portfolio, 13 pharma brands, zero HIPAA violations over 4 years.",
        url: `${siteConfig.url}/fde-case-study-02`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-02`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'AI Playbooks - Regulated Content Systems for Global Pharmaceutical Markets',
    description: 'Forward-Deployed AI Architect delivered multi-tenant compliance platform managing $51M portfolio across 13 pharma brands with zero HIPAA violations.',
    client: 'IPG Health',
    slug: 'fde-case-study-02',
    systemType: 'Multi-Tenant Compliance Platform, AI Governance, MLR Automation',
    outcome: 'Production AI system with zero HIPAA violations over 4 years, 60% cost reduction, scaled team from 5 to 60+ engineers',
});

const page = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(caseStudySchema),
                }}
            />
            <FDECaseStudy02 />
        </>
    );
};

export default page;
