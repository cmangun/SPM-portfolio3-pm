import FDECaseStudy03 from '@/pages/fde/FDECaseStudy03';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Abbott Alinity - Global Device Migration | Senior Project Director Case Study",
    description: "Senior Project Director case study: Managed global data migration for 27,000 diagnostic devices at Abbott. Zero FDA audit findings through disciplined delivery planning and stakeholder alignment.",
    keywords: [
        'Senior Project Director',
        'Healthcare Project Management',
        'Abbott',
        'FDA compliance',
        'device migration',
        'agile delivery',
        'diagnostics',
        'program management',
        'stakeholder alignment',
        'regulated delivery',
    ],
    openGraph: {
        title: "Abbott Alinity - Global Device Migration | Christopher Mangun",
        description: "Senior Project Director case study: Managed 27,000-device migration with zero FDA audit findings and 65% efficiency improvement.",
        url: `${siteConfig.url}/fde-case-study-03`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-03`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Abbott Alinity - Global Diagnostic Device Migration',
    description: 'Senior Project Director managed global data migration for 27,000 diagnostic devices with zero FDA audit findings and 65% efficiency improvement.',
    client: 'Abbott Laboratories',
    slug: 'fde-case-study-03',
    systemType: 'Global Migration, Program Delivery, Diagnostics Operations',
    outcome: '27,000 devices migrated, zero FDA audit findings, 65% efficiency improvement',
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
