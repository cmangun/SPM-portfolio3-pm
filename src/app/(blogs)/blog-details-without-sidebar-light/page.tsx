import BlogDetailsWithoutSidebar from '@/pages/blogs/blog-details-without-sidebar/BlogDetailsWithoutSidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Blog Details Without Sidebar Light",
};

const page = () => {
    return (
        <BlogDetailsWithoutSidebar />
    );
};

export default page;