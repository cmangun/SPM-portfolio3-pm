import PortfolioCoverflowMain from '@/pages/portfolios/portfolio-coverflow/PortfolioCoverflowMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forward Deployed Engineer | Portfolio Coverflow Slider Light",
};

const page = () => {
  return (
    <PortfolioCoverflowMain />
  );
};

export default page;