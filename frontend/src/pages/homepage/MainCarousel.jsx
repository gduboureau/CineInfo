import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/MainCarousel.css';

const MainCarousel  = ({ movies }) => {
  function Arrow({ direction, onClick }) {
    return (
      <div
        className={`arrow ${direction}`}
        onClick={onClick}
      >
        {direction === 'left' ? (
          <FontAwesomeIcon icon={faChevronLeft} />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} />
        )}
      </div>
    );
  }

  var settings = {
    // dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "29%",
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    autoplay: true,
    autoplaySpeed: 7000
  };



  return (
    <div className="carousel-popmovies-container">
      <div className="carousel-popmovies">
        <Slider {...settings}>
            {movies.slice(0, 10).map((movie, index) => (
              <div key={index} className={`carousel-item`}>
                <img src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${movie.backdrop_path}`} alt={`Slide ${index + 1}`} />
                <div className='content-overlay'>
                  <p className='title'>{movie.title}</p>
                  <p className='dureenote'>1h50 | {movie.vote_average.toFixed(1)}/10</p>
                  <p className='overview'>{movie.overview.length > 500 ? 
                      movie.overview.substring(0, 500) + '...' : movie.overview}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainCarousel;
