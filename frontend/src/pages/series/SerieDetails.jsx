import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import SerieDataSeason from "../../components/series/SerieDataSeason";
import DisplaySerieDetails from "../../components/series/DisplaySerieDetails";

const SerieDetails = () => {

    const { id } = useParams();
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [serieDetails, setSerieDetails] = useState([]);

    const {
        serieSeasonsDetails,
        serieSeasonsCreditsActors,
        serieSeasonsCreditsCrew,
        serieSeasonsVideos,
        serieSeasonsImages,
        serieSeasonsRecommendations
    } = SerieDataSeason({season: selectedSeason, id: id});

    useEffect(() => {
        fetch(`http://localhost:8080/series/${id}`).then((response) => response.json()).then((data) => {
            setSerieDetails(data);
        });
    }, [id, selectedSeason]);

    const handleSeasonChange = (newSeason) => {
        setSelectedSeason(newSeason);
    };

    return (
        <div>
            <DisplaySerieDetails serie={serieDetails} season={serieSeasonsDetails} crew={serieSeasonsCreditsCrew}
            actors={serieSeasonsCreditsActors} videos={serieSeasonsVideos} images={serieSeasonsImages} 
            recommendations={serieSeasonsRecommendations}  selectedSeason={selectedSeason} handleSeasonChange={handleSeasonChange}/>
        </div>
    );
}

export default SerieDetails;
