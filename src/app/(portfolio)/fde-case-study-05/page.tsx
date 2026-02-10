import FDECaseStudy05 from '@/pages/fde/FDECaseStudy05';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Abbott Libre CGM - Patient-Critical Platform Delivery | Senior Project Director Case Study",
    description: "Senior Project Director case study: Led delivery of patient-critical monitoring platform serving 4M+ patients. Achieved 99.99% system reliability through rigorous project governance.",
    keywords: [
        'Senior Project Director',
        'Healthcare Project Management',
        'Abbott',
        'Libre CGM',
        'patient monitoring',
        'medical device',
        'project governance',
        'regulated delivery',
        'healthcare technology',
        'continuous glucose monitoring',
    ],
    openGraph: {
        title: "Abbott Libre CGM - Patient-Critical Platform Delivery | Christopher Mangun",
        description: "Senior Project Director case study: Led patient-critical platform serving 4M+ patients with 99.99% reliability.",
        url: `${siteConfig.url}/fde-case-study-05`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-05`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Abbott Libre CGM - Patient-Critical Monitoring Platform Delivery',
    description: 'Senior Project Director led delivery of patient-critical monitoring platform serving 4M+ patients with 99.99% system reliability.',
    client: 'Abbott Laboratories',
    slug: 'fde-case-study-05',
    systemType: 'Patient Monitoring, Medical Device Delivery, Healthcare Technology',
    outcome: '4M+ patients served, 99.99% reliability, rigorous project governance',
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
