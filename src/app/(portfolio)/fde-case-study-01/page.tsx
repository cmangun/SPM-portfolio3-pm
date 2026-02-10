import FDECaseStudy01 from '@/pages/fde/FDECaseStudy01';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Pfizer CoCo AI - Enterprise Content Platform | Senior Project Director Case Study",
    description: "Senior Project Director case study: Led enterprise content platform delivery for Pfizer, reducing MLR review cycles by 65% and achieving $2.08M annual savings through structured governance and cross-functional coordination.",
    keywords: [
        'Senior Project Director',
        'Healthcare Project Management',
        'Pfizer',
        'MLR compliance',
        'regulated marketing',
        'cross-functional delivery',
        'enterprise content platform',
        'healthcare agency',
        'project governance',
        'pharmaceutical marketing',
    ],
    openGraph: {
        title: "Pfizer CoCo AI - Enterprise Content Platform | Christopher Mangun",
        description: "Senior Project Director case study: Led enterprise content platform delivery reducing MLR cycles by 65% with $2.08M annual savings.",
        url: `${siteConfig.url}/fde-case-study-01`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-01`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Pfizer CoCo AI - Enterprise Content Platform for Pharmaceutical Marketing',
    description: 'Senior Project Director led enterprise content platform delivery reducing MLR cycles by 65%, achieving $2.08M annual savings with zero compliance violations.',
    client: 'Pfizer',
    slug: 'fde-case-study-01',
    systemType: 'Enterprise Content Platform, MLR Governance, Regulated Marketing',
    outcome: 'Reduced MLR cycles by 65%, $2.08M annual savings, zero compliance violations',
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
