import ListProduct from '../../components/ListProduct';
import Navbar from '../../layouts/Navbar';
import React from 'react';
import Carousel from '../../components/Carousel';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Carousel />
        <div className="p-2 flex justify-center xl:w-2/6 items-center">
          <img
            className="w-full h-full object-cover"
            src="https://salt.tikicdn.com/cache/w750/ts/banner/d9/3e/82/c267a7d49303eafe00143a4a210c83bc.png.webp"
            alt="Ảnh"
          />
        </div>
      </div>
      <ListProduct />
    </>
  );
};

export default LandingPage;
