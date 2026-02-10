import TeamMain from '@/pages/team/team-light/TeamMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Team Light",
};

const page = () => {
    return (
        <TeamMain />
    );
};

export default page;