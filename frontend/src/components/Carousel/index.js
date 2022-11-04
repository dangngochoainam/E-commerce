import React from 'react';
const images = [
  'https://salt.tikicdn.com/cache/w1080/ts/banner/4d/cc/1a/d27ea25b47039326673fe25eeaf2d995.png.webp',
  'https://salt.tikicdn.com/cache/w1080/ts/banner/66/b0/ec/986ca0dae637aa8dfc8d383a5d3c82c3.png.webp',
  'https://salt.tikicdn.com/cache/w1080/ts/banner/9f/77/cc/2c315f204ec10ab580865d5c3630674c.png.webp',
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = React.useState(0);

  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: 'smooth',

      block: 'nearest',

      inline: 'start',
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    'absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  return (
    <div className="p-2 flex justify-center xl:w-4/6 items-center">
      <div className="relative w-full overflow-hidden">
        {/* {sliderControl(true)} */}
        <button
          type="button"
          onClick={previousImage}
          className={`${arrowStyle} ${'left-2'}`}
          style={{ top: '40%' }}
        >
          <span role="img" aria-label={`Arrow ${'left'}`}>
            {'◀'}
          </span>
        </button>
        <div className="carousel flex">
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
              <img src={img} className="w-full object-contain" alt="ảnh" />
            </div>
          ))}
        </div>
        {/* {sliderControl()} */}
        <button
          type="button"
          onClick={nextImage}
          className={`${arrowStyle} ${'right-2'}`}
          style={{ top: '40%' }}
        >
          <span role="img" aria-label={`Arrow ${'right'}`}>
            {'▶'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;


