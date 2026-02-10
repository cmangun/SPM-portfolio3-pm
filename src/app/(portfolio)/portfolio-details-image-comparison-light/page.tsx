import PortfolioImageComparison from '@/pages/portfolios/portfolio-details-image-comparison/PortfolioImageComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio Details Image Comparison",
};

const page = () => {
    return (
        <PortfolioImageComparison />
    );
};

export default page;



