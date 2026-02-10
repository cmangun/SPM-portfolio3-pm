import BlogListMain from '@/pages/blogs/blog-list/BlogListMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Blog List Light",
};

const page = () => {
    return (
        <BlogListMain />
    );
};

export default page;