import PortfolioSlicerElegant from '@/pages/portfolios/portfolio-slider-elegant/PortfolioSlicerElegant';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Senior Project Director | Portfolio Slicer elegant Light",
};

const page = () => {
  return (
    <PortfolioSlicerElegant />
  );
};

export default page;