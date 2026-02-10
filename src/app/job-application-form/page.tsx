
import JobApplicationForm from '@/pages/job-application-form/JobApplicationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Senior Project Director | Job Application form",
};

const page = () => {
    return (
        <JobApplicationForm />
    );
};

export default page;


