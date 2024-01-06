import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import DisplaySerieDetails from "../../components/series/DisplaySerieDetails";

const SerieDetails = () => {

    const { id } = useParams();
    const [SerieDetails, setSerieDetails] = useState([]);
    const [SerieCreditsActors, setSerieCreditsActors] = useState([]);
    const [SerieCreditsCrew, setSerieCreditsCrew] = useState([]);
    const [SerieVideos, setSerieVideos] = useState([]);
    const [SerieImages, setSerieImages] = useState([]);
    const [SerieRecommendations, setSerieRecommendations] = useState([]);

    useEffect(() => {

        const fetchSerieDetails = fetch(`http://localhost:8080/series/${id}`).then((response) =>
            response.json()
        );

        const fetchSerieCredits = fetch(`http://localhost:8080/series/${id}/credits`).then((response) => 
            response.json()
        );

        const fetchSerieVideos = fetch(`http://localhost:8080/series/${id}/videos`).then(
            (response) => response.json()
        );

        const fetchSerieImages = fetch(`http://localhost:8080/series/${id}/images`).then(
            (response) => response.json()
        );

        const fetchSerieRecommendations = fetch(`http://localhost:8080/series/${id}/recommendations`).then(
            (response) => response.json()
        );

        Promise.all([fetchSerieDetails,fetchSerieCredits,fetchSerieVideos,fetchSerieImages,fetchSerieRecommendations])
            .then(([SerieDetailsData, creditsData, videosData, imagesData, recommendationsData]) => {
                setSerieDetails(SerieDetailsData);
                setSerieCreditsActors(creditsData.cast);
                setSerieCreditsCrew(creditsData.crew);
                setSerieVideos(videosData.results);
                setSerieImages(imagesData.backdrops);
                setSerieRecommendations(recommendationsData.results);
            })
            .catch((error) => console.error("Erreur de récupération des données de la série :", error));
    }, [id]);

    return (
        <div>
            <DisplaySerieDetails serie={SerieDetails} crew={SerieCreditsCrew}
            actors={SerieCreditsActors} videos={SerieVideos} images={SerieImages} 
            recommendations={SerieRecommendations} />
        </div>
    );
}

export default SerieDetails;
