import PortfolioInteractiveScroll from '@/pages/portfolios/portfolio-interactive-scroll/PortfolioInteractiveScroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio Interactive With Scroll",
};

const page = () => {
    return (
        <PortfolioInteractiveScroll />
    );
};

export default page;