import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import AboutMain from './AboutMain';

export const metadata: Metadata = {
    title: 'About | Forward-Deployed AI Architect',
    description: 'Forward-Deployed AI Architect and Principal AI Platform Engineer with 15+ years delivering enterprise AI/ML systems for Pfizer, Abbott, Novartis, Sanofi, and Medtronic. Expert in RAG, AI governance, MLOps, and HIPAA/FDA compliance.',
    keywords: [
        'Forward Deployed Engineer',
        'Principal AI Architect',
        'Principal AI Platform Engineer',
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
        title: 'About Christopher Mangun | Forward-Deployed AI Architect',
        description: 'Forward-Deployed AI Architect with 15+ years delivering production-grade AI systems for regulated enterprises.',
        url: `${siteConfig.url}/about`,
    },
    alternates: {
        canonical: `${siteConfig.url}/about`,
    },
};

export default function AboutPage() {
    return <AboutMain />;
}
