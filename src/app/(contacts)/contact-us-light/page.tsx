import ContactUsMain from '@/pages/contacts/contact-us/ContactUsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Contact Us Light",
};

const page = () => {
    return (
        <ContactUsMain />
    );
};

export default page;