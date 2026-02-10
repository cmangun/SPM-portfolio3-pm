import FDECaseStudy04 from '@/pages/fde/FDECaseStudy04';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Pfizer Content Automation - MLR Workflow Optimization | Senior Project Director Case Study",
    description: "Senior Project Director case study: Owned MLR workflow optimization initiative at Pfizer. Reduced content review turnaround by 71% through process redesign and cross-team coordination.",
    keywords: [
        'Senior Project Director',
        'MLR workflow optimization',
        'Pfizer',
        'content automation',
        'regulated marketing',
        'cross-functional coordination',
        'healthcare project management',
        'review cycle reduction',
        'process optimization',
        'pharmaceutical compliance',
    ],
    openGraph: {
        title: "Pfizer Content Automation - MLR Workflow Optimization | Christopher Mangun",
        description: "Senior Project Director case study: Reduced content review turnaround by 71% through MLR workflow optimization.",
        url: `${siteConfig.url}/fde-case-study-04`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-04`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Pfizer Content Automation - MLR Workflow Optimization',
    description: 'Senior Project Director owned MLR workflow optimization reducing content review turnaround by 71% through process redesign and cross-team coordination.',
    client: 'Pfizer',
    slug: 'fde-case-study-04',
    systemType: 'MLR Workflow Optimization, Content Automation, Process Redesign',
    outcome: '71% review turnaround reduction, streamlined MLR processes',
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
