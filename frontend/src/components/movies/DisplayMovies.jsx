import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';

import "./assets/displayMovies.css";

const DisplayMovies = ({ movies }) => {
    const navigate = useNavigate();

    const handleClick = (id, title) => {
        navigate(`/movie/${id}/${title}`);
    }

    return (
        <div className="movies-container">
            {movies.map((movie) => (
                <div key={movie.id} className="movie">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} onClick={() => handleClick(movie.id, movie.title)} />
                    <div className="movie-details">
                        <div className="movie-note">
                            <p>{Math.ceil(movie.vote_average * 10)}%</p>
                        </div>
                        <p className="title" onClick={() => handleClick(movie.id, movie.title)}>{movie.title}</p>
                        <p>{moment(movie.release_date).locale('fr').format('D MMM YYYY')}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default DisplayMovies;