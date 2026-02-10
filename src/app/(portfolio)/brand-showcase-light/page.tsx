import BrandShowcaseMain from '@/pages/portfolios/brand-showcase/BrandShowcaseMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Brand Showcase Light",
};

const page = () => {
    return (
        <BrandShowcaseMain />
    );
};

export default page;