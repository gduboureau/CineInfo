import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";

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
            <h3>Films les mieus notés</h3>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default TopRatedMovies;