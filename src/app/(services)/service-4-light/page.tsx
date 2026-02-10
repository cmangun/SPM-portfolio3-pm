import ServiceFourMain from '@/pages/services/service-4/ServiceFourMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Service 4 Light",
};

const page = () => {
    return (
        <ServiceFourMain />
    );
};

export default page;