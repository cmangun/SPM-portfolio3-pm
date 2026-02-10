
import TeamDetailsMain from '@/pages/team/team-details/TeamDetailsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forward Deployed Engineer | Team details light",
};

const page = () => {
  return (
    <TeamDetailsMain />
  );
};

export default page;