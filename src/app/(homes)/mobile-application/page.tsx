import MobileApplicationMain from '@/pages/homes/mobile-application/MobileApplicationMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Mobile Application Light",
};

const page = () => {
    return (
        <MobileApplicationMain />
    );
};

export default page;