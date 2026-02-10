import ArchitectureHubMain from '@/pages/homes/architecture-hub/ArchitectureHubMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Architecture hub light",
};

const page = () => {
    return (
        <ArchitectureHubMain />
    );
};

export default page;