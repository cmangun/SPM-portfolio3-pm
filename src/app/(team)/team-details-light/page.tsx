
import TeamDetailsMain from '@/pages/team/team-details/TeamDetailsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Senior Project Director | Team details light",
};

const page = () => {
  return (
    <TeamDetailsMain />
  );
};

export default page;