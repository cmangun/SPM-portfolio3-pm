import PortfolioSlicerMain from '@/pages/portfolios/portfolio-slicer/PortfolioSlicerMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Senior Project Director | Portfolio Slicer Light",
};

const page = () => {
  return (
    <PortfolioSlicerMain />
  );
};

export default page;