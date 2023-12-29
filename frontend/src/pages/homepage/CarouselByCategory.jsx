import React from 'react';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/CarouselByCategory.css';

const CarouselByCategory = ({ movies }) => {

    const navigate = useNavigate();

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

    const settings = {
        speed: 1500,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        infinite: true,
    };

    const handleMovieClick = (movie) => {
      navigate(`/movie/${movie.id}/${movie.title}`);
    };

    return (
        <div className='carouselbycategory'>
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div key={index} className={`carousel-item`} onClick={() => handleMovieClick(movie)}>
                        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarouselByCategory;
