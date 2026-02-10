import ResumePage from '@/pages/fde/ResumePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume | Christopher Mangun - Forward Deployed AI Engineer',
};

export default function Page() {
    return <ResumePage />;
}
