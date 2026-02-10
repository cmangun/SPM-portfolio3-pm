import FDECaseStudy04 from '@/pages/fde/FDECaseStudy04';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Content Automation - Human-in-the-Loop MLR Governance | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Delivered RAG-powered content automation with human-in-the-loop governance, reducing MLR review time by 71% with 82% auto-validation rate.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Pfizer AI',
        'human-in-the-loop',
        'HITL',
        'MLR automation',
        'content automation',
        'RAG pipeline',
        'AI governance',
        'compliance automation',
    ],
    openGraph: {
        title: "Content Automation - Human-in-the-Loop MLR Governance | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: 71% faster reviews, 82% auto-validation, 100% audit traceability.",
        url: `${siteConfig.url}/fde-case-study-04`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-04`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Content Automation - Human-in-the-Loop MLR Governance at Global Scale',
    description: 'Forward-Deployed AI Architect delivered RAG-powered content automation with human-in-the-loop governance, reducing review time by 71%.',
    client: 'Pfizer',
    slug: 'fde-case-study-04',
    systemType: 'RAG Pipeline, Human-in-the-Loop AI, Content Automation',
    outcome: 'Production AI system with 71% faster reviews, 82% auto-validation rate, 100% audit traceability',
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
            <FDECaseStudy04 />
        </>
    );
};

export default page;
