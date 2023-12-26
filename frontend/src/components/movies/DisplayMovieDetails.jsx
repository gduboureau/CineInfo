import React, { useState } from "react";

import "./assets/displayMovieDetails.css";
import MovieTrailer from "./MovieTrailer";

const DisplayMovieDetails = ({ movie, crew, actors, videos }) => {

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

    actors = actors.slice(0, 8);

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
                                    <span>{formattedDate} - &nbsp;{`${hours}h ${minutes}m`} &nbsp;-</span>
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
                                                <p className="title">Director</p>
                                                <p className="value">{topDirector ? topDirector.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="crew-item">
                                                <p className="title">Writer</p>
                                                <p className="value">{topWriter ? topWriter.name : "Non disponible"}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="crew-item">
                                                <p className="title">Producer</p>
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
                        <p>Actors</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "video" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("video")}
                    >
                        <p>Videos</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "image" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("image")}
                    >
                        <p>Images</p>
                    </div>
                    <div
                        className={`movie-details-category-title ${selectedCategory === "recommandation" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("recommandation")}
                    >
                        <p>recommandation</p>
                    </div>
                </div>
                <div className="category-content">
                    {selectedCategory === "actors" && "Contenu des acteurs"}
                    {selectedCategory === "video" && "Contenu des vidéos"}
                    {selectedCategory === "image" && "Contenu des images"}
                    {selectedCategory === "recommandation" && "Contenu des recommandations"}
                </div>
            </div>
        </div>
    );
};

export default DisplayMovieDetails;