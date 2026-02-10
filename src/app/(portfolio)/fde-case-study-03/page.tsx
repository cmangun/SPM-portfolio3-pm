import FDECaseStudy03 from '@/pages/fde/FDECaseStudy03';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Alinity Analytics - GxP-Compliant ML Pipeline | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Migrated 27,000+ device ML pipeline to AWS with zero FDA audit findings. Reduced deployment time by 88% with HIPAA-compliant architecture.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Abbott AI',
        'FDA compliance',
        'GxP compliance',
        'medical device AI',
        'MLOps',
        'AWS migration',
        'HIPAA compliance',
        'audit trails',
    ],
    openGraph: {
        title: "Alinity Analytics - GxP-Compliant ML Pipeline | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: 27K+ devices, zero FDA findings, 88% faster deployments.",
        url: `${siteConfig.url}/fde-case-study-03`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-03`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Alinity Analytics - GxP-Compliant ML Pipeline for Medical Devices',
    description: 'Forward-Deployed AI Architect delivered AWS migration for 27,000+ device ML pipeline with zero FDA audit findings and 88% deployment time reduction.',
    client: 'Abbott',
    slug: 'fde-case-study-03',
    systemType: 'GxP-Compliant ML Pipeline, Medical Device Analytics, MLOps',
    outcome: 'Production AI system with zero FDA audit findings, 88% faster deployments, 99.99% uptime',
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
            <FDECaseStudy03 />
        </>
    );
};

export default page;
