import AboutMeMain from '@/pages/about/about-me/AboutMeMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Senior Project Director | About Me light",
};

const page = () => {
    return (
          <AboutMeMain/>
    );
};

export default page;