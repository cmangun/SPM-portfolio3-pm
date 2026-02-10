
import PortfolioPinterestMain from '@/pages/portfolios/portfolio-pinterest/PortfolioPinterestMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Portfolio Pinterest Light",
};

const page = () => {
    return (
        <PortfolioPinterestMain />
    );
};

export default page;