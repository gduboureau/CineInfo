import React, { useState } from "react";

import "./assets/displayMovieDetails.css";
import MovieTrailer from "./MovieTrailer";
import Actors from "../Actors";
import Videos from "../Videos";
import Images from "../Images";

const DisplayMovieDetails = ({ movie, crew, actors, videos, images }) => {

    const [selectedCategory, setSelectedCategory] = useState("actors");

    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    const month = releaseDate.getMonth() + 1;
    const day = releaseDate.getDate();

    const formattedDate = `${day}/${month}/${year}`;

    const runtimeInMinutes = movie.runtime;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    const topDirector = crew.find((member) => member.job === "Director");
    const topWriter = crew.find((member) => member.department === "Writing");
    const topProducer = crew.find((member) => member.job === "Producer");

    const backgroundStyle = {
        backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}')`,
    };

    return (
        <div className="movie-details-container">
            <div className="movie-header">
                <a className="background-link">
                    <div className="background-container" style={backgroundStyle}>
                        <div className="movie-header-container">
                            <div className="movie-image">
                                <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="movie-header-infos">
                                <div className="movie-title">
                                    <p>{movie.title}</p>
                                </div>
                                <div className="movie-date-trailer">
                                    <span>{formattedDate} - &nbsp;{`${hours}h ${minutes}m`} &nbsp;{videos.length !== 0 ? "-" : ""}</span>
                                    <MovieTrailer videos={videos} />
                                </div>
                                <div className="movie-tagline">
                                    <p>{movie.tagline}</p>
                                </div>
                                <div className="movie-description">
                                    <p>{movie.overview}</p>
                                </div>
                                <div>
                                    <ul className="movie-crew">
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
                                                <p className="title">Poducteur</p>
                                                <p className="value">{topProducer ? topProducer.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="movie-details-categories">
                <div className="category-titles">
                    <div
                        className={`movie-details-category-title ${selectedCategory === "actors" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("actors")}
                    >
                        <p>Acteurs</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "video" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("video")}
                    >
                        <p>Vidéos ({videos.length})</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "image" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("image")}
                    >
                        <p>Images ({images.length})</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "recommandation" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("recommandation")}
                    >
                        <p>Recommendations</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "avis" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("avis")}
                    >
                        <p>Avis</p>
                    </div>
                </div>
                <div className="category-content">
                    {selectedCategory === "actors" && <Actors actors={actors} />}
                    {selectedCategory === "video" && <Videos videos={videos} />}
                    {selectedCategory === "image" && <Images images={images} />}
                    {selectedCategory === "recommandation" && "Contenu des recommandations"}
                    {selectedCategory === "avis" && "Contenu des avis"}
                </div>
            </div>
        </div>
    );
};

export default DisplayMovieDetails;