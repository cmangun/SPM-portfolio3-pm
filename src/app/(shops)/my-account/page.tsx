
import MyAccountMain from '@/pages/shops/my-account/MyAccountMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | My Account Main",
};

const page = () => {

    return (
        <MyAccountMain />
    );
};

export default page;