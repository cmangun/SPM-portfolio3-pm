
import PortfolioWebglMain from '@/pages/portfolios/portfolio-webgl/PortfolioWebglMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Christopher Mangun — Forward Deployed Engineer | Enterprise AI",
    description: "Forward Deployed Engineer delivering enterprise and regulated AI systems from pilot to production. Ownership across architecture, governance, reliability, and adoption. View case studies and engagements.",
    keywords: ["Forward Deployed Engineer", "Enterprise AI", "Healthcare AI", "Life Sciences", "Regulated AI", "RAG Systems", "MLOps", "HIPAA Compliance"],
    openGraph: {
        title: "Christopher Mangun — Forward Deployed Engineer | Enterprise AI",
        description: "Forward Deployed Engineer delivering enterprise and regulated AI systems from pilot to production, with ownership across architecture, governance, reliability, and organizational adoption.",
        type: "website",
    },
};

const page = () => {
    return (
        <PortfolioWebglMain />
    );
};

export default page;