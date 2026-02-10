import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import ContactPageMain from './ContactPageMain';

export const metadata: Metadata = {
    title: 'Contact | Hire Healthcare AI Consultant',
    description: 'Contact Christopher Mangun for healthcare AI consulting. Enterprise RAG, LLM integration, MLOps, and HIPAA/FDA compliance consulting for pharma and medical devices.',
    keywords: [
        'hire healthcare AI consultant',
        'AI consultant contact',
        'healthcare AI consulting inquiry',
        'pharma AI consultant New York',
        'medical device AI expert',
        'enterprise AI consulting',
    ],
    openGraph: {
        title: 'Contact | Healthcare AI Consultant',
        description: 'Get in touch to discuss your healthcare AI initiative.',
        url: `${siteConfig.url}/contact`,
    },
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
};

export default function ContactPage() {
    return <ContactPageMain />;
}
