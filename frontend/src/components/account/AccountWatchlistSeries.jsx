import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';

import "./assets/accountWatchlistSeries.css";

const AccountWatchlistSeries = ({ media, setMedia, formatDate }) => {
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleInput = (event, serieId, seasonNumber, episodeNumber) => {
        const seen = event.target.checked;
        fetch(`http://localhost:8080/user/series/seen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
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
                <div className="media" key={item.serieDetails.id}>
                    {item.serieDetails.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.serieDetails.poster_path}`} alt={item.serieDetails.id} />
                    ) : (
                        <div className="icon-div">
                            <FontAwesomeIcon icon={faImage} className="icon" />
                        </div>
                    )}
                    <div className="details">
                        <h3 className="title">
                            {item.serieDetails.name} &nbsp;
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
                        </h3>
                        <p className="date">{item.serieDetails.first_air_date ? formatDate(item.serieDetails.first_air_date) : ""}</p>
                        <p className="overview">{item.serieDetails.overview}</p>
                        {selectedSerie === item.serieDetails.id && (
                            <div className="episode-details">
                                {item.seasons.map((season) => (
                                    <div key={season.seasonNumber}>
                                        <p>{season.seasonDetails.name} &nbsp;
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
                                            ></FontAwesomeIcon></p>
                                        <p>{season.seasonDetails.overview}</p>
                                        {selectedSeason === season.seasonDetails.id && (
                                            <div className="episode-details">
                                                {season.episodes.map((episode) => (
                                                    <div key={episode.episode_number}>
                                                        <p>{episode.name}</p>
                                                        <p>{episode.overview}</p>
                                                        <input
                                                            type="checkbox"
                                                            checked={episode.seen || false}
                                                            onChange={(event) => handleInput(event, item.serieDetails.id, season.seasonNumber, episode.episode_number)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default AccountWatchlistSeries;
