import CareerMain from '@/pages/about/career/CareerMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Career light",
};

const page = () => {
    return (
        <CareerMain />
    );
};

export default page;