import PortfolioParallaxSlider from '@/pages/portfolios/portfolio-parallax-slider/PortfolioParallaxSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio Parallax Slider",
};

const page = () => {
    return (
        <PortfolioParallaxSlider />
    );
};

export default page;