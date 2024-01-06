import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';

import "./assets/accountWatchlistSeries.css";

const AccountWatchlistSeries = ({ media, setMedia, formatDate, handleMediaClick }) => {
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleInput = (event, serieId, seasonNumber, episodeNumber) => {
        const seen = event.target.checked;
        fetch(`http://localhost:8080/user/series/seen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                serieId: serieId,
                seasonNumber: seasonNumber,
                episodeNumber: episodeNumber,
                seen: seen
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedMedia = media.map((item) => {
                    if (item.serieDetails.id === serieId) {
                        return {
                            ...item,
                            seasons: item.seasons.map((season) => {
                                if (season.seasonNumber === seasonNumber) {
                                    return {
                                        ...season,
                                        episodes: season.episodes.map((ep) => {
                                            if (ep.episode_number === episodeNumber) {
                                                return {
                                                    ...ep,
                                                    seen: seen
                                                };
                                            }
                                            return ep;
                                        })
                                    };
                                }
                                return season;
                            })
                        };
                    }
                    return item;
                });
                setMedia(updatedMedia);
                toast.success(data.message);
            })
            .catch((error) => console.error('Erreur de requête :', error));
    };

    return (
        <div className="account-watchlist-series">
            <ToastContainer />
            {media.length > 0 && media.map((item) => (
                <div className="serie" key={item.serieDetails.id}>
                    <div className="serie-header">
                        {item.serieDetails.poster_path ? (
                            <img className="serie-img" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.serieDetails.poster_path}`} alt={item.serieDetails.id} onClick={() => handleMediaClick("series", item.serieDetails.id, item.serieDetails.name)} />
                        ) : (
                            <div className="icon-div" onClick={() => handleMediaClick("series", item.serieDetails.id, item.serieDetails.name)}>
                                <FontAwesomeIcon icon={faImage} className="icon" />
                            </div>
                        )}
                        <div className="details">
                            <div className="title">
                                <h3 onClick={() => handleMediaClick("series", item.serieDetails.id, item.serieDetails.name)}>
                                    {item.serieDetails.name} &nbsp;

                                </h3>
                                <FontAwesomeIcon
                                    className="arrow-seasons"
                                    icon={faChevronDown}
                                    size="2xs"
                                    style={{
                                        transform: `rotate(${selectedSerie === item.id ? 180 : 0}deg)`,
                                    }}
                                    onClick={() => {
                                        setSelectedSerie((prevSelectedSerie) => (
                                            prevSelectedSerie === item.serieDetails.id ? null : item.serieDetails.id
                                        ));
                                    }}
                                ></FontAwesomeIcon>

                            </div>
                            <p className="date">{item.serieDetails.first_air_date ? formatDate(item.serieDetails.first_air_date) : ""}</p>
                            <p className="overview">{item.serieDetails.overview}</p>
                        </div>
                    </div>
                    {selectedSerie === item.serieDetails.id && (
                        <div className="seasons-details">
                            {item.seasons.sort((a, b) => a.seasonNumber - b.seasonNumber).map((season) => (
                                <div key={season.seasonNumber} className="season">
                                    <div className="season-infos">

                                        <div className="season-details">
                                            <h3 className="season-title">{season.seasonDetails.name} &nbsp;
                                                <FontAwesomeIcon
                                                    className="arrow-episodes"
                                                    icon={faChevronDown}
                                                    size="2xs"
                                                    style={{
                                                        transform: `rotate(${selectedSeason === season.seasonDetails.id ? 180 : 0}deg)`,
                                                    }}
                                                    onClick={() => {
                                                        setSelectedSeason((prevSelectedSeason) => (
                                                            prevSelectedSeason === season.seasonDetails.id ? null : season.seasonDetails.id
                                                        ));
                                                    }}
                                                ></FontAwesomeIcon></h3>
                                        </div>
                                    </div>
                                    {selectedSeason === season.seasonDetails.id && (
                                        <div className="episode-details">
                                            {season.episodes.sort((a, b) => a.episode_number - b.episode_number).map((episode) => (
                                                <div key={episode.episode_number} className="episode">
                                                    {episode.still_path ? (
                                                        <img src={`https://image.tmdb.org/t/p/original${episode.still_path}`} alt={episode.id} />
                                                    ) : (
                                                        <div className="icon-div">
                                                            <FontAwesomeIcon icon={faImage} className="icon" />
                                                        </div>
                                                    )}
                                                    <div className="episode-details">
                                                        <p className="episode-name">Episode {episode.episode_number} : {episode.name}</p>
                                                        <p className="episode-date">{formatDate(episode.air_date)} &bull; {episode.runtime}m</p>
                                                        <p className="episode-overview">{episode.overview}</p>
                                                    </div>
                                                    <div className="checkbox-wrapper">
                                                        <input
                                                            type="checkbox"
                                                            id={`check-${episode.episode_number}`}
                                                            checked={episode.seen || false}
                                                            onChange={(event) => handleInput(event, item.serieDetails.id, season.seasonNumber, episode.episode_number)}
                                                        />
                                                        <label htmlFor={`check-${episode.episode_number}`}>
                                                            <span></span>{/* This span is needed to create the "checkbox" element */}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}


                </div>
            ))}
        </div>
    );
}

export default AccountWatchlistSeries;
