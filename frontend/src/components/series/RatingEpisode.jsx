import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfStroke as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

import "./assets/ratingEpisode.css";

const RatingEpisode = ({ serieId, seasonNumber, episodeNumber, onClose, top, left }) => {
    const [selectedRating, setSelectedRating] = useState(0);


    const handleStarHover = (event, index) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = offsetX / rect.width;

        if (percentage <= 0.5) {
            setSelectedRating(index - 0.5);
        } else {
            setSelectedRating(index);
        }
    };

    useEffect(() => {
        setSelectedRating(0);
        fetch(`http://localhost:8080/user/series/episoderatings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

            .then((response) => response.json())
            .then((data) => {
                data.forEach((item) => {
                    if (item.serie_id === serieId && item.season === seasonNumber && item.episode === episodeNumber) {
                        setSelectedRating(item.rating);
                    }
                });
            })

    }, [serieId, episodeNumber, seasonNumber]);

    const handleSaveNote = () => {
        fetch(`http://localhost:8080/user/series/addepisoderating`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                serieId: serieId,
                seasonNumber: seasonNumber,
                episodeNumber: episodeNumber,
                rating: selectedRating,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success('Note enregistrée avec succès');
            })
            .catch((error) => {
                console.error("Erreur de recherche :", error);
                toast.error('Erreur lors de l\'enregistrement de la note');
            });
        onClose();
    };

    const handleDeleteNote = () => {
        fetch(`http://localhost:8080/user/series/deleteepisoderating`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                serieId: serieId,
                seasonNumber: seasonNumber,
                episodeNumber: episodeNumber,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSelectedRating(0);
                toast.success('Note supprimée avec succès');
            })
            .catch((error) => {
                console.error("Erreur de recherche :", error);
                toast.error('Erreur lors de la suppression de la note');
            });
    };


    return (
        <div className="rating-episode" onMouseLeave={() => setSelectedRating(0)} style={{ position: 'absolute', top: top, left: left }}>
            <div className="stars">
                <FontAwesomeIcon className='remove-icon' icon={faCircleMinus} style={{ cursor: "pointer", marginRight: "3px" }} onClick={() => handleDeleteNote()} />
                {[1, 2, 3, 4, 5].map((index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={
                            selectedRating >= index
                                ? solidStar
                                : selectedRating >= index - 0.5
                                    ? halfStar
                                    : regularStar
                        }
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(event) => handleStarHover(event, index)}
                        onClick={() => handleSaveNote()}
                    />
                ))}
            </div>
        </div>
    );
}

export default RatingEpisode;