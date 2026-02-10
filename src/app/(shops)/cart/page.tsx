
import CartMain from '@/pages/shops/cart/CartMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Cart Main",
};

const page = () => {

    return (
        <CartMain />
    );
};

export default page;