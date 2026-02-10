import FDECaseStudy06 from '@/pages/fde/FDECaseStudy06';
import { Metadata } from 'next';
import { siteConfig, generateCaseStudySchema } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: "Medtronic GI Genius - FDA 510(k) Clearance Program | Senior Project Director Case Study",
    description: "Senior Project Director case study: Directed FDA 510(k) clearance program for AI medical device. Coordinated clinical, regulatory, and engineering teams through successful validation. 500+ sites deployed.",
    keywords: [
        'Senior Project Director',
        'Healthcare Project Management',
        'Medtronic',
        'GI Genius',
        'FDA 510(k)',
        'medical device',
        'clinical trials',
        'regulatory clearance',
        'project governance',
        'healthcare launch',
    ],
    openGraph: {
        title: "Medtronic GI Genius - FDA 510(k) Clearance Program | Christopher Mangun",
        description: "Senior Project Director case study: Directed FDA 510(k) clearance program for AI medical device deployed to 500+ sites.",
        url: `${siteConfig.url}/fde-case-study-06`,
    },
    alternates: {
        canonical: `${siteConfig.url}/fde-case-study-06`,
    },
};

const caseStudySchema = generateCaseStudySchema({
    title: 'Medtronic GI Genius - FDA 510(k) AI Medical Device Clearance Program',
    description: 'Senior Project Director directed FDA 510(k) clearance program for AI medical device, coordinating clinical, regulatory, and engineering teams. Deployed to 500+ sites.',
    client: 'Medtronic',
    slug: 'fde-case-study-06',
    systemType: 'FDA Clearance, Medical Device Launch, Clinical Trial Coordination',
    outcome: 'FDA 510(k) cleared, 500+ sites deployed, 82,000+ procedures/month',
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
