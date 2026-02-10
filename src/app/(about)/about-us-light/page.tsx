import AboutUsLightMain from '@/pages/about/about-us/AboutUsLightMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | About Us light",
};

const page = () => {
    return (
        <AboutUsLightMain />
    );
};

export default page;