import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import CaseStudiesMain from './CaseStudiesMain';

export const metadata: Metadata = {
    title: 'Case Studies | Senior Project Director Portfolio',
    description: 'Senior Project Director case studies from Pfizer, Abbott, Medtronic, and IPG Health. Production AI systems with real results: 65% MLR cycle reduction, FDA 510(k) clearance, 99.99% reliability, zero compliance violations.',
    keywords: [
        'Senior Project Director portfolio',
        'Senior Project Director healthcare',
        'Enterprise RAG architecture',
        'AI governance platform',
        'Regulated AI systems',
        'Healthcare AI compliance',
        'MLOps for regulated environments',
        'AI auditability and traceability',
        'Enterprise knowledge systems',
        'healthcare AI case studies',
        'AI implementation examples',
        'pharma AI case study',
        'medical device AI',
    ],
    openGraph: {
        title: 'Case Studies | Senior Project Director',
        description: 'Senior Project Director case studies with production results from Pfizer, Abbott, Medtronic, and more.',
        url: `${siteConfig.url}/case-studies`,
    },
    alternates: {
        canonical: `${siteConfig.url}/case-studies`,
    },
};

export default function CaseStudiesPage() {
    return <CaseStudiesMain />;
}
