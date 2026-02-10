import CorporateAgencyMain from '@/pages/homes/corporate-agency/CorporateAgencyMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Corporate Agency Light",
};

const page = () => {
    return (
        <CorporateAgencyMain />
    );
};

export default page;