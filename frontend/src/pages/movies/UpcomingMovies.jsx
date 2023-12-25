import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";

const UpcomingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movies/upcoming", {
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
        <div className="upcoming-movies">
            <h3>Films à venir</h3>
            <DisplayMovies movies={movies} />
        </div>
    )
}

export default UpcomingMovies;