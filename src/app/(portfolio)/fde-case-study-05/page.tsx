import FDECaseStudy05 from '@/pages/fde/FDECaseStudy05';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Libre CGM - Patient-Critical Real-Time Systems | Forward-Deployed AI Architect Case Study",
    description: "Forward-Deployed AI Architect case study: Rebuilt real-time glucose monitoring pipeline for 4M+ patients achieving 99.99% alert delivery with sub-second latency and zero missed critical alerts.",
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Abbott AI',
        'medical device AI',
        'real-time systems',
        'patient safety',
        'CGM systems',
        'healthcare reliability',
        'critical systems',
        'HIPAA compliance',
    ],
    openGraph: {
        title: "Libre CGM - Patient-Critical Real-Time Systems | Christopher Mangun",
        description: "Forward-Deployed AI Architect case study: 4M+ patients, 99.99% alert delivery, zero missed critical alerts.",
        url: `${siteConfig.url}/fde-case-study-05`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-05`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Libre CGM - Patient-Critical Real-Time Glucose Monitoring',
    description: 'Forward-Deployed AI Architect delivered real-time alert pipeline for 4M+ patients with 99.99% delivery rate and zero missed critical alerts.',
    client: 'Abbott',
    slug: 'fde-case-study-05',
    systemType: 'Real-Time Systems, Patient Safety, Medical Device Platform',
    outcome: 'Production system with 99.99% alert delivery, sub-second latency, zero missed critical alerts',
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
            <FDECaseStudy05 />
        </>
    );
};

export default page;
