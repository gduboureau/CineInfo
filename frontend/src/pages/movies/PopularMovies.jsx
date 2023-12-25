import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";

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
            <h3>Films populaires</h3>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default PopularMovies;