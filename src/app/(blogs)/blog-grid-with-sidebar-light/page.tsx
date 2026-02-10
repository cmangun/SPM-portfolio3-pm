import BlogGridWithSidebar from '@/pages/blogs/blog-grid-with-sidebar/BlogGridWithSidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Blog Grid With Sidebar Light",
};

const page = () => {
    return (
        <BlogGridWithSidebar />
    );
};

export default page;