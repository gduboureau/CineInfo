import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import MovieTrailer from "../movies/MovieTrailer";


import "./assets/displaySeasonDetails.css";

const DisplaySeasonDetails = ({ serie }) => {

    const numberOfSeasons = serie.number_of_seasons;

    const [seasonsData, setSeasonsData] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        const fetchSeasonData = async (seasonNumber) => {
            try {
                const response = await fetch(`http://localhost:8080/series/${serie.id}/season/${seasonNumber}`);
                const seasonData = await response.json();

                return {
                    seasonNumber,
                    data: seasonData,
                };
            } catch (error) {
                console.error(`Erreur lors de la récupération des données de la saison ${seasonNumber}:`, error);
                return null;
            }
        };

        const fetchVideos = async (seasonNumber) => {
            try {
                const response = await fetch(`http://localhost:8080/series/${serie.id}/season/${seasonNumber}/videos`);
                const videoData = await response.json();

                const trailers = videoData.results.filter((video) => video.type === 'Trailer');

                return {
                    seasonNumber,
                    videos: trailers,
                };
            } catch (error) {
                console.error(`Erreur lors de la récupération des vidéos de la saison ${seasonNumber}:`, error);
                return null;
            }
        };

        const fetchSeasons = async () => {
            const promises = [];
            const videoPromises = [];

            for (let seasonNumber = 1; seasonNumber <= numberOfSeasons; seasonNumber++) {
                promises.push(fetchSeasonData(seasonNumber));
                videoPromises.push(fetchVideos(seasonNumber));
            }

            const seasons = await Promise.all(promises);
            const videosData = await Promise.all(videoPromises);

            const filteredSeasons = seasons.filter((season) => season !== null);
            setSeasonsData(filteredSeasons);

            const filteredVideos = videosData.filter((video) => video !== null);
            setVideos(filteredVideos);
        };

        fetchSeasons();
    }, [serie.id, numberOfSeasons]);

    return (
        <div className="series-season-container">
            {seasonsData.map((season, index) => (
                <div key={index} className="season-container">
                    <div className="season-poster">
                        {serie.poster_path ? (
                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${season.data.poster_path}`} alt={serie.title} />
                        ) : (
                            <div className="icon-div">
                                <FontAwesomeIcon icon={faImage} className="icon" />
                            </div>
                        )}
                    </div>
                    <div className="season-info">
                        <div className="season-title">
                            <h3>{season.data.name} &nbsp;
                                <FontAwesomeIcon
                                    className="arrow-episodes"
                                    icon={faChevronDown}
                                    size="2xs"
                                    style={{
                                        transform: `rotate(${selectedSeason === season ? 180 : 0}deg)`,
                                    }}
                                    onClick={() => {
                                        setSelectedSeason(selectedSeason === season ? null : season);
                                    }}
                                >
                                    {selectedSeason === season ? 'Masquer les détails' : 'Voir les détails'}
                                </FontAwesomeIcon>
                            </h3>
                        </div>
                        <div className="season-date">
                            <p>{new Date(season.data.air_date).getFullYear()}  &nbsp;-  &nbsp;
                                {season.data.episodes.length} épisodes</p>
                                <span className="trailer-season">
                                    <MovieTrailer videos={videos[index].videos} />
                                </span>
                        </div>
                        <div className="season-overview">
                            <p>{season.data.overview}</p>
                        </div>
                        {selectedSeason === season && (
                            <div className="season-episodes">
                                {season.data.episodes.map((episode, index) => (
                                    <div key={index} className="episode-container">
                                        <div className="episode-poster">
                                            {serie.poster_path ? (
                                                <img src={`https://www.themoviedb.org/t/p/original/${episode.still_path}`} alt={serie.title} />
                                            ) : (
                                                <div className="icon-div">
                                                    <FontAwesomeIcon icon={faImage} className="icon" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="episode-number">
                                                <p>Episode {episode.episode_number} : {episode.name}</p>
                                            </div>
                                            <div className="episode-date">
                                                <p>{new Date(episode.air_date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="episode-overview">
                                                <p>{episode.overview}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplaySeasonDetails;
