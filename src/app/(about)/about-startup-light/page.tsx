import AboutStartupMain from '@/pages/about/about-startup/AboutStartupMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forward Deployed Engineer | About Startup light",
};

const page = () => {
  return (
    <AboutStartupMain />
  );
};

export default page;