import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfStroke as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

import "./assets/ratingModal.css";

const RatingModal = ({ media, mediaType, rating, setRating, setIsRated, onClose }) => {
    const [selectedRating, setSelectedRating] = useState(rating);

    useEffect(() => {
        setSelectedRating(rating);
    }, [rating]);

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

    const handleSaveNote = () => {
        fetch(`http://localhost:8080/user/${mediaType}/addrating`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                mediaId: media.id,
                rating: selectedRating,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRating(selectedRating);
                toast.success('Note enregistrée avec succès');
            })
            .catch((error) => {
                console.error("Erreur de recherche :", error);
                toast.error('Erreur lors de l\'enregistrement de la note');
            });
        onClose();
    };

    const handleDeleteNote = () => {
        fetch(`http://localhost:8080/user/${mediaType}/deleterating`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                mediaId: media.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRating(0);
                setIsRated(false);
            })
            .catch((error) => {
                console.error("Erreur de recherche :", error);
                toast.error('Erreur lors de la suppression de la note');
            });

    };

    return (
        <div className="rating-modal" onMouseLeave={() => setSelectedRating(0)}>
            <span className="close" onClick={onClose}>
                &times;
            </span>
            <div className="stars">
                <FontAwesomeIcon className='remove-icon' icon={faCircleMinus} style={{ cursor: "pointer" }} onClick={() => handleDeleteNote()} />
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
};

export default RatingModal;
