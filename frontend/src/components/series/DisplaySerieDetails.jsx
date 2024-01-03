import React, { useState, useEffect } from "react";
import Actors from "../Actors";
import Videos from "../Videos";
import Images from "../Images";
import Recommendations from "../Recommendations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import MediaOptions from "../common/MediaOptions";
import MovieTrailer from "../movies/MovieTrailer";
import "./assets/displaySeriesDetails.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";



const DisplaySerieDetails = ({ serie, season, crew, actors, videos, images, recommendations, selectedSeason, handleSeasonChange }) => {

    const [selectedCategory, setSelectedCategory] = useState("actors");

    useEffect(() => {
        setSelectedCategory("actors");
        window.scrollTo(0, 0);
    }, []);

    const releaseDate = new Date(season.air_date);
    const year = releaseDate.getFullYear();
    const month = releaseDate.getMonth() + 1;
    const day = releaseDate.getDate();

    const formattedDate = `${day}/${month}/${year}`;

    const topDirector = crew.find((member) => member.department === "Directing");
    const topWriter = crew.find((member) => member.department === "Writing");
    const topProducer = crew.find((member) => member.department === "Production");

    let backgroundStyle = {};

    if (serie.backdrop_path) {
        backgroundStyle = {
            backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${serie.backdrop_path}')`,
        };
    }

    const seasons = [...Array(serie.number_of_seasons).keys()].map((seasonNumber) => seasonNumber + 1);
    const otherSeasons = seasons.filter((seasonNumber) => seasonNumber !== selectedSeason);


    return (
        <div className="serie-details-container">
            <div className="serie-header">
                <div className="background-link">
                    <div className="background-container" style={backgroundStyle}>
                        <div className="serie-header-container">
                            <div className="serie-image">
                                {season.poster_path ? (
                                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${season.poster_path}`} alt={season.name} />
                                ) : (
                                    <div className="icon-div">
                                        <FontAwesomeIcon icon={faImage} className="icon" />
                                    </div>

                                )}
                            </div>
                            <div className="serie-header-infos">
                                <div className="serie-title-and-season">
                                    <div className="serie-title">
                                        <p>{serie.original_name}</p>
                                    </div>
                                    <div className="serie-season-selector custom-dropdown">
                                        <button className="custom-dropdown-button">{`Saison ${selectedSeason}`}</button>
                                        <FontAwesomeIcon icon={faChevronDown} className="icon-left" />
                                        <div className="custom-dropdown-content">
                                            {otherSeasons.map((seasonNumber) => (
                                                <a key={seasonNumber} onClick={() => handleSeasonChange(seasonNumber)}>
                                                    {`Saison ${seasonNumber}`}
                                                </a>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="serie-date-trailer">
                                    <span>{formattedDate} &nbsp;{videos.length !== 0 && videos.type === "Trailer" ? "-" : ""}</span>
                                    <MovieTrailer videos={videos} />
                                </div>
                                <MediaOptions media={serie} mediaType={"series"} />
                                <div className="serie-tagline">
                                    <p>{serie.tagline}</p>
                                </div>
                                <div className="serie-description">
                                    <p>{season.overview}</p>
                                </div>
                                <div>
                                    <ul className="serie-crew">
                                        <li>
                                            <div className="crew-item">
                                                <p className="title">Réalisateur</p>
                                                <p className="value">{topDirector ? topDirector.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="crew-item">
                                                <p className="title">Scénariste</p>
                                                <p className="value">{topWriter ? topWriter.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="crew-item">
                                                <p className="title">Producteur</p>
                                                <p className="value">{topProducer ? topProducer.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="serie-details-categories">
                <div className="category-titles">
                    <div
                        className={`serie-details-category-title ${selectedCategory === "actors" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("actors")}
                    >
                        <p>Acteurs</p>
                    </div>
                    <div
                        className={`serie-details-category-title ${selectedCategory === "video" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("video")}
                    >
                        <p>Vidéos ({videos.length})</p>
                    </div>
                    <div
                        className={`serie-details-category-title ${selectedCategory === "image" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("image")}
                    >
                        <p>Images ({images.length})</p>
                    </div>
                    <div
                        className={`serie-details-category-title ${selectedCategory === "recommandation" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("recommandation")}
                    >
                        <p>Recommendations</p>
                    </div>
                    <div
                        className={`serie-details-category-title ${selectedCategory === "avis" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("avis")}
                    >
                        <p>Avis</p>
                    </div>
                </div>
                <div className="category-content">
                    {selectedCategory === "actors" && <Actors actors={actors} />}
                    {selectedCategory === "video" && <Videos videos={videos} />}
                    {selectedCategory === "image" && <Images images={images} />}
                    {selectedCategory === "recommandation" && <Recommendations movies={recommendations} />}
                    {selectedCategory === "avis" && "Contenu des avis"}
                </div>
            </div>
        </div>
    );
};

export default DisplaySerieDetails;