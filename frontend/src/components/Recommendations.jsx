import React, { useState } from "react";
import "./assets/recommandations.css";
import DisplayMovies from "./movies/DisplayMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Recommendations = ({ movies }) => {

    const [visibleRecommendations, setVisibleRecommendations] = useState(5);

    const handleShowMore = () => {
        setVisibleRecommendations(prevVisibleRecommendations => prevVisibleRecommendations + 5);
    }
    const displayedMovies = movies.slice(0, visibleRecommendations);

    return (
        <div className="movies-recommandations-container no-space-between">
            <div className="small-movies-container">
                <DisplayMovies movies={displayedMovies} />
                {movies.length > displayedMovies.length && (
                    <div className="show-more-movies">
                        <FontAwesomeIcon className="arrow-movies" icon={faArrowDown} style={{color: "white", cursor: "pointer"}} onClick={handleShowMore}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
