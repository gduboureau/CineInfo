import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import UserScoreChart from "../common/UserScoreChart.jsx";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import RatingModal from "../common/RatingModal.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./assets/mediaOptions.css";

const MediaOptions = ({ media, mediaType }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isRated, setIsRated] = useState(false);
    const [rating, setRating] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [ratingModal, setRatingModal] = useState(false);

    const token = sessionStorage.getItem("token");

    const fetchFavorites = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${mediaType}/favorites`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            data.forEach((item) => {
                if (item.id === media.id) {
                    setIsFavorited(true);
                }
            });
        } catch (error) {
            console.error("Erreur de recherche des favoris :", error);
        }
    };

    const fetchRatings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${mediaType}/ratings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            data.forEach((item) => {
                if (item.id === media.id) {
                    setIsRated(true);
                    setRating(item.rating);
                }
            });
        } catch (error) {
            console.error("Erreur de recherche des évaluations :", error);
        }
    };

    useEffect(() => {
        if (token === null) return;

        const fetchData = async () => {
            await fetchFavorites();
            await fetchRatings();
        };

        fetchData();
    }, [media.id, token, rating]);

    const handleMouseOut = () => {
        setIsHovered("");
    };

    const handleFavoriteClick = () => {
        if (token === null) return;

        setIsFavorited(!isFavorited);

        const endpoint = isFavorited ? "removefavorite" : "addfavorite";

        fetch(`http://localhost:8080/user/${mediaType}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mediaId: media.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const successMessage =
                    endpoint === 'addfavorite'
                        ? `Ajouté aux favoris avec succès`
                        : `Retiré des favoris avec succès`;

                toast.success(successMessage);
            })
            .catch((error) => console.error("Erreur de recherche :", error));
    };

    const handleRatingModal = () => {
        if (token === null) return;
        setRatingModal(true);
    }

    return (
        <div className="media-options">
            <ToastContainer position="top-right" autoClose={3000} />
            <ul>
                <li className="note-li">
                    <UserScoreChart percent={Math.ceil(media.vote_average * 10)} />
                    <div className="note-text"> Note des utilisateurs</div>
                </li>
                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("favorites")}
                    onMouseOut={handleMouseOut}
                    onClick={handleFavoriteClick}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: isFavorited ? "red" : "white" }}
                    />
                    {isHovered === "favorites" && (
                        <span className="tooltip">
                            {token
                                ? "Ajouter aux favoris"
                                : "Connectez-vous pour l'ajouter à vos favoris"}
                        </span>
                    )}
                </li>
                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("watchlist")}
                    onMouseOut={handleMouseOut}
                >
                    <FontAwesomeIcon icon={faBookmark} style={{ color: "white" }} />
                    {isHovered === "watchlist" && (
                        <span className="tooltip">
                            {token
                                ? "Ajouter à ma watchlist"
                                : "Connectez-vous pour l'ajouter à votre watchlist"}
                        </span>
                    )}
                </li>

                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("ratings")}
                    onMouseOut={handleMouseOut}
                    onClick={handleRatingModal}
                >
                    <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: isRated ? "yellow" : "white" }}
                    />
                    {isHovered === "ratings" && (
                        <span className="tooltip">
                            {!token && "Connectez-vous pour noter ce film"}
                            {token && !isRated && "Noter"}
                            {token && isRated && `Vous avez mis la note de ${rating}/5`}
                        </span>
                    )}
                </li>
                {ratingModal && (
                    <RatingModal
                        media={media}
                        mediaType={mediaType}
                        rating={rating}
                        setRating={setRating}
                        setIsRated={setIsRated}
                        onClose={() => setRatingModal(false)}
                    />
                )}
            </ul>
        </div>
    );
};

export default MediaOptions;