import ShopModernMain from '@/pages/homes/shop-modern/ShopModernMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Shop Modern Light",
};

const page = () => {
    return (
        <ShopModernMain />
    );
};

export default page;