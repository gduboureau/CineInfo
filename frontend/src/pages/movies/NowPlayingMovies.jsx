import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";
import "./assets/movies.css";

const NowPlayingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movies/now-playing", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Erreur de recherche :", error));
    }, []);


    return (
        <div className="now-playing-movies">
            <h2 className="movie-title">Films du moment</h2>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default NowPlayingMovies;