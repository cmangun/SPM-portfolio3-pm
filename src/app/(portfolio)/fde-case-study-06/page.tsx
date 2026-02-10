import FDECaseStudy06 from '@/pages/fde/FDECaseStudy06';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "GI Genius - FDA 510(k) AI Medical Device | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Guided technical strategy and regulatory documentation for FDA 510(k) cleared AI colonoscopy device achieving 99.7% sensitivity and 14% ADR improvement.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Medtronic AI',
        'FDA 510(k)',
        'medical device AI',
        'AI regulatory',
        'clinical AI',
        'model validation',
        'FDA compliance',
        'healthcare AI clearance',
    ],
    openGraph: {
        title: "GI Genius - FDA 510(k) AI Medical Device | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: FDA 510(k) cleared, 99.7% sensitivity, 14% ADR improvement.",
        url: `${siteConfig.url}/fde-case-study-06`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-06`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'GI Genius - FDA 510(k) Cleared AI for Polyp Detection',
    description: 'Forward-Deployed AI Architect guided technical strategy for FDA 510(k) cleared AI colonoscopy device with 99.7% sensitivity validation.',
    client: 'Medtronic',
    slug: 'fde-case-study-06',
    systemType: 'FDA-Cleared AI Medical Device, Model Validation, Regulatory Pathway',
    outcome: 'FDA 510(k) clearance achieved, 99.7% sensitivity, 14% ADR improvement, 500+ clinical sites',
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
            <FDECaseStudy06 />
        </>
    );
};

export default page;
