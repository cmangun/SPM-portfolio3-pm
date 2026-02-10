import ContactMeMain from '@/pages/contacts/contact-me/ContactMeMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Contact Me Light",
};

const page = () => {
    return (
        <ContactMeMain />
    );
};

export default page;