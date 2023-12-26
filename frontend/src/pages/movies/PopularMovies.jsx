import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";
import "./assets/movies.css";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movies/popular", {
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
        <div className="popular-movies">
            <h2 className="movie-title">Films populaires</h2>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default PopularMovies;