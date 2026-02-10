
import PortfolioHorizontalShowcase from '@/pages/portfolios/portfolio-horizontal-showcase/PortfolioHorizontalShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Portfolio Horizontal Showcase Light",
};

const page = () => {
    return (
        <PortfolioHorizontalShowcase />
    );
};

export default page;