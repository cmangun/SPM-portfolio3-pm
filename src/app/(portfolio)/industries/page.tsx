import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import IndustriesMain from './IndustriesMain';

export const metadata: Metadata = {
    title: 'Industries | Pharma, Medical Devices, Life Sciences',
    description: 'AI consulting for pharmaceutical, medical device, life sciences, and healthcare technology companies. HIPAA, FDA, and MLR compliance expertise.',
    keywords: [
        'pharma AI consultant',
        'pharmaceutical AI',
        'medical device AI consultant',
        'life sciences AI',
        'healthcare technology AI',
        'biotech AI consulting',
        'clinical AI systems',
        'FDA AI compliance',
    ],
    openGraph: {
        title: 'Industries | Healthcare AI Consultant',
        description: 'AI consulting for pharma, medical devices, life sciences, and healthcare technology.',
        url: `${siteConfig.url}/industries`,
    },
    alternates: {
        canonical: `${siteConfig.url}/industries`,
    },
};

export default function IndustriesPage() {
    return <IndustriesMain />;
}
