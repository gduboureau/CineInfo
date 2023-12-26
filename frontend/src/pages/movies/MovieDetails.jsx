import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayMovieDetails from "../../components/movies/DisplayMovieDetails";

const MovieDetails = () => {

    const { id } = useParams();
    const [MovieDetails, setMovieMDetails] = useState([]);
    const [MovieCreditsActors, setMovieCreditsActors] = useState([]);
    const [MovieCreditsCrew, setMovieCreditsCrew] = useState([]);
    const [MovieVideos, setMovieVideos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/movies/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovieMDetails(data);
            })
            .catch((error) => console.error("Erreur de récupération des données du film :", error));
        fetch(`http://localhost:8080/movies/${id}/credits`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovieCreditsCrew(data.crew);
                setMovieCreditsActors(data.cast);
            })
            .catch((error) => console.error("Erreur de récupération des données du film :", error));
        fetch(`http://localhost:8080/movies/${id}/videos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovieVideos(data.results);
            })
            .catch((error) => console.error("Erreur de récupération des données du film :", error));
    }, [id]);

    return (
        <div className="movie-detail">
            <DisplayMovieDetails movie={MovieDetails} crew={MovieCreditsCrew} actors={MovieCreditsActors} videos={MovieVideos}/>
        </div>
    );
}

export default MovieDetails;
