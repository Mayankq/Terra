import React, { useState, useEffect, useRef } from 'react';

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    const parentHeight = carouselRef.current.parentElement.offsetHeight;
    carouselRef.current.style.height = `${parentHeight}px`;
  }, []);

  return (
    <div
      ref={carouselRef}
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            top: 0,
            left: index === idx ? 0 : '100%',
            transition: 'left 0.5s ease-in-out',
            width: '100%',
            height: '100%',
          }}
        >
          <img src={image} alt={`slide-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
      <button onClick={prevSlide} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1, color: 'black', backgroundColor: 'white', borderRadius:'50%', height:'20px', width:'20px'}}>
        &lt;
      </button>
      <button onClick={nextSlide} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1, color: 'black', backgroundColor: 'white', borderRadius:'50%', height:'20px', width:'20px'}}>
        &gt;
      </button>
    </div>
  );
};

export default ImageCarousel;
