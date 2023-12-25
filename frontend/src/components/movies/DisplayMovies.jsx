import React from "react";
import moment from 'moment';
import 'moment/locale/fr';

import "./assets/displayMovies.css";

const DisplayMovies = ({ movies }) => {

    return (
        <div className="movies-container">
            {movies.map((movie) => (
                <div key={movie.id} className="movie">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <p>{movie.title}</p>
                    <p>{moment(movie.release_date).locale('fr').format('D MMM YYYY')}</p>
                </div>
            ))}
        </div>
    );

}

export default DisplayMovies;