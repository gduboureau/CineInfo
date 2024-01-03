import {useEffect, useState} from "react";

const SerieDataSeason = ({season, id}) => {
    const [SerieSeasonsDetails, setSerieSeasonsDetails] = useState([]);
    const [SerieSeasonsCreditsActors, setSerieSeasonsCreditsActors] = useState([]);
    const [SerieSeasonsCreditsCrew, setSerieSeasonsCreditsCrew] = useState([]);
    const [SerieSeasonsVideos, setSerieSeasonsVideos] = useState([]);
    const [SerieSeasonsImages, setSerieSeasonsImages] = useState([]);
    const [SerieSeasonsRecommendations, setSerieSeasonsRecommendations] = useState([]);

    useEffect(() => {
        const fetchSerieDetails = fetch(`http://localhost:8080/series/${id}/&${season}`).then((response) =>
            response.json()
        );

        const fetchSerieCredits = fetch(`http://localhost:8080/series/${id}/&${season}/credits`).then((response) => 
            response.json()
        );

        const fetchSerieVideos = fetch(`http://localhost:8080/series/${id}/&${season}/videos`).then(
            (response) => response.json()
        );

        const fetchSerieImages = fetch(`http://localhost:8080/series/${id}/&${season}/images`).then(
            (response) => response.json()
        );

        const fetchSerieRecommendations = fetch(`http://localhost:8080/series/${id}/recommendations`).then(
            (response) => response.json()
        );

        Promise.all([fetchSerieDetails,fetchSerieCredits,fetchSerieVideos,fetchSerieImages,fetchSerieRecommendations])
            .then(([SerieDetailsData, creditsData, videosData, imagesData, recommendationsData]) => {
                setSerieSeasonsDetails(SerieDetailsData);
                setSerieSeasonsCreditsActors(creditsData.cast);
                setSerieSeasonsCreditsCrew(creditsData.crew);
                setSerieSeasonsVideos(videosData.results);
                setSerieSeasonsImages(imagesData.posters);
                setSerieSeasonsRecommendations(recommendationsData.results);
            })
            .catch((error) => console.error("Erreur de récupération des données de la série :", error));
    }, [id, season]);

    return {
        serieSeasonsDetails: SerieSeasonsDetails,
        serieSeasonsCreditsActors: SerieSeasonsCreditsActors,
        serieSeasonsCreditsCrew: SerieSeasonsCreditsCrew,
        serieSeasonsVideos: SerieSeasonsVideos,
        serieSeasonsImages: SerieSeasonsImages,
        serieSeasonsRecommendations: SerieSeasonsRecommendations
    };
}

export default SerieDataSeason;
