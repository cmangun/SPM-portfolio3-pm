import DesignAgencyMain from '@/pages/homes/design-agency/DesignAgencyMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Design Agency Light",
};

const page = () => {
    return (
        <DesignAgencyMain />
    );
};

export default page;