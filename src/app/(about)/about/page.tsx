import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import AboutMain from './AboutMain';

export const metadata: Metadata = {
    title: 'About | Senior Project Director',
    description: 'Senior Project Director and Senior Project Director with 15+ years delivering enterprise AI/ML systems for Pfizer, Abbott, Novartis, Sanofi, and Medtronic. Expert in RAG, AI governance, MLOps, and HIPAA/FDA compliance.',
    keywords: [
        'Senior Project Director',
        'Senior Project Director',
        'Senior Project Director',
        'healthcare AI expert',
        'Christopher Mangun',
        'AI consultant credentials',
        'healthcare ML engineer',
        'pharma AI specialist',
        'regulated AI expert',
        'enterprise AI consultant',
        'RAG systems expert',
        'AI governance architect',
    ],
    openGraph: {
        title: 'About Christopher Mangun | Senior Project Director',
        description: 'Senior Project Director with 15+ years delivering production-grade AI systems for regulated enterprises.',
        url: `${siteConfig.url}/about`,
    },
    alternates: {
        canonical: `${siteConfig.url}/about`,
    },
};

export default function AboutPage() {
    return <AboutMain />;
}
