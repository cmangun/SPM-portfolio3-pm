import DesignStudioMain from '@/pages/homes/design-studio/DesignStudioMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Design Studio Light",
};

const page = () => {
    return (
        <DesignStudioMain />
    );
};

export default page;