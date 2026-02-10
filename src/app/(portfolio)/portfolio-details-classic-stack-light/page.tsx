import PortfolioDetailsClassic from '@/pages/portfolios/portfolio-details-classic-stack/PortfolioDetailsClassic';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio details classic Light",
};

const page = () => {
    return (
        <PortfolioDetailsClassic />
    );
};

export default page;