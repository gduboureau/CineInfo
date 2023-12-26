import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";
import "./assets/movies.css";

const TopRatedMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movies/top-rated", {
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
        <div className="top-rated-movies">
            <h2 className="movie-title">Films les mieux notés</h2>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default TopRatedMovies;