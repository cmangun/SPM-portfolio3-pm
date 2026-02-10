import PortfolioCreativeSkewSlider from '@/pages/portfolios/portfolio-skew-slider/PortfolioCreativeSkewSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Portfolio Creative skew Slider",
};

const page = () => {
    return (
        <PortfolioCreativeSkewSlider />
    );
};

export default page;