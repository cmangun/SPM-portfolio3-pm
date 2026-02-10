import FDECaseStudy01 from '@/pages/fde/FDECaseStudy01';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "CoCo AI - Enterprise RAG Platform | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Delivered enterprise RAG platform for Pfizer reducing MLR cycles by 65%, achieving $2.08M annual savings. Production AI system with AI governance, vector search, and HIPAA compliance.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Enterprise RAG',
        'Pfizer AI',
        'MLR automation',
        'healthcare AI',
        'AI governance',
        'vector search',
        'HIPAA compliance',
        'production AI systems',
        'enterprise knowledge systems',
    ],
    openGraph: {
        title: "CoCo AI - Enterprise RAG Platform | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: Enterprise RAG platform reducing MLR cycles by 65% with $2.08M annual savings.",
        url: `${siteConfig.url}/fde-case-study-01`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-01`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'CoCo AI - Enterprise RAG Platform for Pharmaceutical Content',
    description: 'Forward-Deployed AI Architect delivered enterprise RAG platform reducing MLR cycles by 65%, achieving $2.08M annual savings with zero compliance violations.',
    client: 'Pfizer',
    slug: 'fde-case-study-01',
    systemType: 'Enterprise RAG Platform, AI Governance, Knowledge Systems',
    outcome: 'Production AI system deployed with zero compliance violations, 65% MLR cycle reduction, $2.08M annual savings',
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
            <FDECaseStudy01 />
        </>
    );
};

export default page;
