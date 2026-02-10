import FDECaseStudy02 from '@/pages/fde/FDECaseStudy02';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "$51M Healthcare Portfolio - Multi-Brand Delivery | Senior Project Director Case Study",
    description: "Senior Project Director case study: Directed $51M healthcare portfolio across 13 pharma brands (Novartis, Sanofi). Scaled delivery team from 5 to 60+ while maintaining timeline and regulatory compliance.",
    keywords: [
        'Senior Project Director',
        'Healthcare Portfolio Management',
        'Novartis',
        'Sanofi',
        'pharma marketing',
        'MLR compliance',
        'multi-brand delivery',
        'healthcare agency',
        'project governance',
        'DELCI launch',
    ],
    openGraph: {
        title: "$51M Healthcare Portfolio - Multi-Brand Delivery | Christopher Mangun",
        description: "Senior Project Director case study: Directed $51M healthcare portfolio across 13 pharma brands, scaling team from 5 to 60+.",
        url: `${siteConfig.url}/fde-case-study-02`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-02`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: '$51M Healthcare Portfolio - Multi-Brand Pharmaceutical Delivery',
    description: 'Senior Project Director directed $51M healthcare portfolio across 13 pharma brands, scaling team from 5 to 60+ with regulatory compliance.',
    client: 'IPG Health / Novartis / Sanofi',
    slug: 'fde-case-study-02',
    systemType: 'Portfolio Management, Multi-Brand Delivery, Healthcare Marketing',
    outcome: '$51M portfolio managed, 13 brands delivered, team scaled 5 to 60+',
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
