import React, { useState, useEffect } from "react";

import DisplayMovies from "../../components/movies/DisplayMovies";
import "./assets/movies.css";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8080/movies/popular?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(prevMovies => {
                    const newMovies = data.filter(newMovie => !prevMovies.some(prevMovie => prevMovie.id === newMovie.id));
                    return [...prevMovies, ...newMovies];
                });
            })
            .catch((error) => console.error("Erreur de recherche :", error));
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="popular-movies">
            <h2 className="movie-title">Films populaires</h2>
            <DisplayMovies movies={movies} />
            <button onClick={handleLoadMore}>Voir plus</button>
        </div>
    )
}

export default PopularMovies;