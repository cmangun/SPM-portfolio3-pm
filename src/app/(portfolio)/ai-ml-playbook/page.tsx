import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import AiMlPlaybookEmbed from './AiMlPlaybookEmbed';

export const metadata: Metadata = {
    title: "AI/ML Production Playbook - 12-Month Enterprise Roadmap | Senior Project Director",
    description: "Enterprise AI/ML Production Playbook: 12-month roadmap for regulated environments covering governance frameworks, MLOps pipelines, and compliance automation.",
    keywords: [
        'AI/ML Playbook',
        'Enterprise AI Roadmap',
        'MLOps',
        'AI Governance',
        'Senior Project Director',
        'Healthcare AI',
        'Regulated AI Deployment',
    ],
    openGraph: {
        title: "AI/ML Production Playbook | Christopher Mangun",
        description: "12-month enterprise AI/ML production roadmap for regulated environments.",
        url: `${siteConfig.url}/ai-ml-playbook`,
    },
    alternates: {
        canonical: `${siteConfig.url}/ai-ml-playbook`,
    },
};

export default function AiMlPlaybookPage() {
    return <AiMlPlaybookEmbed />;
}
