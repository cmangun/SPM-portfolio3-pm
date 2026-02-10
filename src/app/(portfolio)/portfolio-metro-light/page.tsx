import PortfolioMetroMain from '@/pages/portfolios/portfolio-metro/PortfolioMetroMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Portfolio Metro Light",
};

const page = () => {
    return (
        <PortfolioMetroMain />
    );
};

export default page;