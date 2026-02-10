import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import ServicesMain from './ServicesMain';

export const metadata: Metadata = {
    title: 'Healthcare AI Consulting Services',
    description: 'Enterprise AI/ML consulting services for healthcare, pharma, and regulated industries. RAG implementation, LLM integration, MLOps pipelines, and HIPAA/FDA compliance consulting.',
    keywords: [
        'healthcare AI consulting services',
        'RAG implementation consultant',
        'healthcare LLM integration',
        'MLOps consultant healthcare',
        'HIPAA AI compliance',
        'FDA AI consultant',
        'enterprise AI services',
        'medical AI consulting',
    ],
    openGraph: {
        title: 'Healthcare AI Consulting Services | Christopher Mangun',
        description: 'Enterprise AI/ML consulting for regulated industries. RAG systems, LLM integration, MLOps, and compliance.',
        url: `${siteConfig.url}/services`,
    },
    alternates: {
        canonical: `${siteConfig.url}/services`,
    },
};

export default function ServicesPage() {
    return <ServicesMain />;
}
