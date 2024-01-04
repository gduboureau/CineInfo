import React, { useState } from "react";
import "./assets/actors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import NoPicture from "./assets/no-picture.png";

const Actors = ({ actors }) => {

    const [visibleActors, setVisibleActors] = useState(10);

    const handleShowMore = () => {
        setVisibleActors(prevVisibleActors => prevVisibleActors + 10);
    };

    const displayedActors = actors.slice(0, visibleActors);

    return (
        <div className="actors-container">
            {displayedActors.map((actor) => (
                <div key={actor.id} className="actor-item">
                    <img
                        src={
                            actor.profile_path
                                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                                : NoPicture
                        } alt={actor.id} />
                    <p className="actor-name">{actor.name}</p>
                    <p>
                        {actor.roles
                            ? actor.roles[0].character
                            : actor.character
                        }
                    </p>
                </div>
            ))}
            {actors.length > visibleActors && (
                <div className="show-more-actors">
                    <FontAwesomeIcon className="arrow-actors" icon={faArrowDown} style={{ color: "#ffffff", cursor: "pointer" }} onClick={handleShowMore} />
                </div>
            )}
        </div>
    );
};

export default Actors;
