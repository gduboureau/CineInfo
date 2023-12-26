import React, { useState, useEffect } from 'react';
import './assets/CarouselPopmovies.css';

const Carousel = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/popular-movies');
        const responseJson = await response.json();
        setData(responseJson); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="carousel-container">
      <div className="carousel">
        {data.map((movie, index) => (
          <div
            key={index}
            className={`carousel-item`}
          >
            <img src={movie.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={handlePrev}>
        &#8249;
      </button>
      <button className="next" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
