import PortfolioDetailsGallery from '@/pages/portfolios/portfolio-details-gallery/PortfolioDetailsGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio Details Gallery Light",
};

const page = () => {
    return (
        <PortfolioDetailsGallery />
    );
};

export default page;



