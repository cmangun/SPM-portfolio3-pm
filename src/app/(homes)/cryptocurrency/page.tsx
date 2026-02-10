import CryptoCurrencyMain from '@/pages/homes/cryptocurrency/CryptoCurrencyMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Cryptocurrency Light",
};


const page = () => {
    return (
        <CryptoCurrencyMain />
    );
};

export default page;