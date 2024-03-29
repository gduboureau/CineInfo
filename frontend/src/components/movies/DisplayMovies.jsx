import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';
import noPicture from "../assets/no-picture.png";

import "./assets/displayMovies.css";

const DisplayMovies = ({ movies }) => {
    const navigate = useNavigate();

    const handleClick = (id, title) => {
        navigate(`/movie/${id}/${title}`);
    }

    useEffect(() => {
        const movieElements = document.querySelectorAll('.movie');
        movieElements.forEach((element) => {
            element.classList.add('visible');
        });
    }, [movies]);

    return (
        <div className="movies-container">
            {movies.map((movie) => (
                <div key={movie.id} className="movie">
                    <img
                        src={movie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` : noPicture}
                        alt={movie.title}
                        onClick={() => handleClick(movie.id, movie.title)}
                    />
                    <div className="movie-details">
                        <div className="movie-note">
                            <p>{Math.ceil(movie.vote_average * 10)}%</p>
                        </div>
                        <p className="title" onClick={() => handleClick(movie.id, movie.title)}>{movie.title}</p>
                        <p className="date">{moment(movie.release_date).locale('fr').format('D MMM YYYY')}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayMovies;