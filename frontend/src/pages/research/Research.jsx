import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/fr';

import './assets/research.css';

const Research = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchValue = new URLSearchParams(location.search).get("query");

    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("movie");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ searchValue }),
                });

                const data = await response.json();
                setMovies(data.movies && data.movies.results ? data.movies.results : []);
                setTv(data.tv && data.tv.results ? data.tv.results : []);
            } catch (error) {
                console.error("Erreur de recherche :", error);
            }
        };

        fetchData();
    }, [searchValue]);

    const formatDate = (date) => {
        const momentDate = moment(date).locale('fr');;
        return momentDate.format('D MMMM YYYY');
    };

    const handleItemClick = (selectedCategory, id, title) => {
        navigate(`/${selectedCategory}/${id}/${title}`);
    };

    return (
        <div className="search">
            <div className="search-panel">
                <h3>Résultats de votre recherche</h3>
                <div className="search-menu">
                    <ul>
                        <li onClick={() => setSelectedCategory("movie")}>Films {(movies.length)}</li>
                        <li onClick={() => setSelectedCategory("tv")}>Séries {(tv.length)}</li>
                    </ul>
                </div>
            </div>
            <div className="search-results">
                {selectedCategory === "movie" && (
                    <div>
                        {movies.map((movie) => (
                            <div key={movie.id} className="wrapper">
                                {movie.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} onClick={() => handleItemClick(selectedCategory, movie.id, movie.title)} />
                                ) : (
                                    <div className="icon-div" onClick={() => handleItemClick(selectedCategory, movie.id, movie.title)}>
                                        <FontAwesomeIcon icon={faImage} className="icon" />
                                    </div>
                                )}
                                <div className="details">
                                    <h3 className="title" onClick={() => handleItemClick(selectedCategory, movie.id, movie.title)}>{movie.title}</h3>
                                    <p className="date">{movie.release_date ? formatDate(movie.release_date) : ""}</p>
                                    <p className="overview">{movie.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedCategory === "tv" && (
                    <div>
                        {tv.map((serie) => (
                            <div key={serie.id} className="wrapper">
                                {serie.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${serie.poster_path}`} alt={serie.name} onClick={() => handleItemClick(selectedCategory, serie.id, serie.name)} />
                                ) : (
                                    <div className="icon-div" onClick={() => handleItemClick(selectedCategory, serie.id, serie.name)}>
                                        <FontAwesomeIcon icon={faImage} className="icon" />
                                    </div>
                                )}
                                <div className="details">
                                    <h2 className="title" onClick={() => handleItemClick(selectedCategory, serie.id, serie.name)}>{serie.name}</h2>
                                    <p className="date">{serie.first_air_date ? formatDate(serie.first_air_date) : ""}</p>
                                    <p className="overview">{serie.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Research;
