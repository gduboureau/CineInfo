import React, { useState } from "react";
import "./assets/recommandations.css";
import DisplayMovies from "./movies/DisplayMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Recommendations = ({ movies }) => {
    const [visibleRecommendations, setVisibleRecommendations] = useState(5);
    const displayedMovies = movies.slice(0, visibleRecommendations);

    return (
        <div className="movies-recommendations-container no-space-between">
            {movies.length === 0 ? (
                <p className="no-recommandations">Aucunes recommandations disponibles...</p>
            ) : (
                <div className="small-movies-container">
                    <DisplayMovies movies={displayedMovies} />
                    {movies.length > displayedMovies.length && (
                        <div className="show-more-movies">
                            <FontAwesomeIcon className="arrow-movies" icon={faArrowDown} style={{ color: "white", cursor: "pointer" }} onClick={() => setVisibleRecommendations(prevVisibleRecommendations => prevVisibleRecommendations + 5)} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Recommendations;
