import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayMovieDetails from "../../components/movies/DisplayMovieDetails";
import Loading from "../../utils/Loading";

const MovieDetails = () => {

    const { id } = useParams();
    const [MovieDetails, setMovieDetails] = useState([]);
    const [MovieCreditsActors, setMovieCreditsActors] = useState([]);
    const [MovieCreditsCrew, setMovieCreditsCrew] = useState([]);
    const [MovieVideos, setMovieVideos] = useState([]);
    const [MovieImages, setMovieImages] = useState([]);
    const [MovieRecommendations, setMovieRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = fetch(`http://localhost:8080/movies/${id}`).then((response) =>
            response.json()
        );

        const fetchMovieCredits = fetch(`http://localhost:8080/movies/${id}/credits`).then(
            (response) => response.json()
        );

        const fetchMovieVideos = fetch(`http://localhost:8080/movies/${id}/videos`).then(
            (response) => response.json()
        );

        const fetchMovieImages = fetch(`http://localhost:8080/movies/${id}/images`).then(
            (response) => response.json()
        );

        const fetchMovieRecommendations = fetch(`http://localhost:8080/movies/${id}/recommendations`).then(
            (response) => response.json()
        );

        Promise.all([fetchMovieDetails, fetchMovieCredits, fetchMovieVideos, fetchMovieImages, fetchMovieRecommendations])
            .then(([movieDetailsData, creditsData, videosData, imagesData, recommendationsData]) => {
                setMovieDetails(movieDetailsData);
                setMovieCreditsCrew(creditsData.crew);
                setMovieCreditsActors(creditsData.cast);
                setMovieVideos(videosData.results);
                setMovieImages(imagesData.backdrops);
                setMovieRecommendations(recommendationsData);
            })
            .catch((error) => console.error("Erreur de récupération des données du film :", error)).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div className="movie-detail">
            <DisplayMovieDetails movie={MovieDetails} crew={MovieCreditsCrew} actors={MovieCreditsActors} 
            videos={MovieVideos} images={MovieImages} recommendations={MovieRecommendations}/>
        </div>
    );
}

export default MovieDetails;
