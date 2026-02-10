import BlogStandardMain from '@/pages/blogs/blog-standard/BlogStandardMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Blog Standard Light",
};

const page = () => {
    return (
        <BlogStandardMain />
    );
};

export default page;