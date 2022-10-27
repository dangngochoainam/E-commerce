import ListProduct from '../../components/ListProduct';
import Navbar from '../../layouts/Navbar';
import React from 'react';
import Carousel from '../../components/Carousel';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Carousel />
      </div>
      <ListProduct />
    </>
  );
};

export default LandingPage;
