import { Metadata } from 'next';
import AdvisoryMain from './AdvisoryMain';

export const metadata: Metadata = {
    title: 'Healthcare AI Advisory Services | Strategic Consulting for Regulated AI',
    description: 'Bespoke AI advisory services for healthcare and pharmaceutical organizations. AI readiness assessments, ML strategy, FDA 510(k) preparation, HIPAA compliance audits, and fractional AI architect retainers.',
    keywords: 'healthcare AI advisory, AI readiness assessment, ML strategy consulting, FDA 510k AI, HIPAA compliance audit, MLOps assessment, fractional AI architect, healthcare AI consultant',
    openGraph: {
        title: 'Healthcare AI Advisory Services | Christopher Mangun',
        description: 'Strategic AI consulting for regulated healthcare environments. From readiness assessments to FDA preparation.',
        type: 'website',
    },
};

export default function AdvisoryPage() {
    return <AdvisoryMain />;
}
