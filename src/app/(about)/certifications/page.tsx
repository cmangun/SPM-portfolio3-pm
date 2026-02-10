import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import CertificationsMain from './CertificationsMain';

export const metadata: Metadata = {
    title: 'Certifications | Christopher Mangun - Healthcare AI Consultant',
    description: 'Professional certifications including AWS Solutions Architect, GCP Professional Cloud Architect, ML Engineer, Data Engineer, DevOps Engineer, Cloud Security Engineer, Stanford AI/ML Healthcare, and Six Sigma Black Belt.',
    keywords: [
        'AWS Solutions Architect',
        'GCP Professional Cloud Architect',
        'GCP ML Engineer certification',
        'healthcare AI certifications',
        'Six Sigma Black Belt',
        'Stanford AI healthcare',
        'GCP Cloud Security Engineer',
        'enterprise ML credentials',
        'Christopher Mangun certifications',
    ],
    openGraph: {
        title: 'Certifications | Christopher Mangun - Healthcare AI Consultant',
        description: 'Professional certifications spanning cloud architecture, ML engineering, data engineering, DevOps, security, and healthcare AI.',
        url: `${siteConfig.url}/certifications`,
    },
    alternates: {
        canonical: `${siteConfig.url}/certifications`,
    },
};

export default function CertificationsPage() {
    return <CertificationsMain />;
}
