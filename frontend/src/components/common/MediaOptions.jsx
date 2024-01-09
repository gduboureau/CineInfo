import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import UserScoreChart from "../common/UserScoreChart.jsx";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import RatingModal from "../common/RatingModal.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./assets/mediaOptions.css";
import Loading from "../../utils/Loading.jsx";

const MediaOptions = ({ media, mediaType }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isRated, setIsRated] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [rating, setRating] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [ratingModal, setRatingModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

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

    const fetchWatchlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${mediaType}/watchlist`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            data.forEach((item) => {
                if (mediaType === "movies" && item.id === media.id) {
                    setIsWatchlisted(true);
                }
                if (mediaType === "series" && item.serieDetails.id === media.id) {
                    setIsWatchlisted(true);
                }
            });
        } catch (error) {
            console.error("Erreur de recherche de la watchlist :", error);
        }
    };


    useEffect(() => {
        setLoading(true);
        if (token === null) {
            setLoading(false);
            return;
        }

        setIsFavorited(false);
        setIsRated(false);
        setIsWatchlisted(false);

        const fetchData = async () => {
            await fetchFavorites();
            await fetchRatings();
            await fetchWatchlist();
        };

        fetchData();
        setLoading(false);
    }, [media, token, rating]);

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
                const successMessage =
                    endpoint === 'addfavorite'
                        ? `Ajouté aux favoris avec succès`
                        : `Retiré des favoris avec succès`;

                toast.success(successMessage);
            })
            .catch((error) => console.error("Erreur de recherche :", error));
    };

    const handleWatchlistClick = () => {
        if (token === null) return;

        setIsWatchlisted(!isWatchlisted);

        const endpoint = isWatchlisted ? "removewatchlist" : "addwatchlist";

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
                const successMessage =
                    endpoint === 'addwatchlist'
                        ? `Ajouté à votre watchlist avec succès`
                        : `Retiré de votre watchlist avec succès`;

                toast.success(successMessage);
            })
            .catch((error) => console.error("Erreur de recherche :", error));
    };

    const handleRatingModal = () => {
        if (token === null) return;
        setRatingModal(true);
    }

    if(loading) return <Loading />

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
                            {token && isFavorited && "Retirer des favoris"}
                            {token && !isFavorited && "Ajouter aux favoris"}
                            {!token && "Connectez-vous pour l'ajouter à vos favoris"}
                        </span>
                    )}
                </li>
                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("watchlist")}
                    onMouseOut={handleMouseOut}
                    onClick={handleWatchlistClick}
                >
                    <FontAwesomeIcon icon={faBookmark} style={{ color: isWatchlisted ? "pink" : "white" }} />
                    {isHovered === "watchlist" && (
                        <span className="tooltip">
                            {token && isWatchlisted && "Retirer de ma watchlist"}
                            {token && !isWatchlisted && "Ajouter à ma watchlist"}
                            {!token && "Connectez-vous pour l'ajouter à votre watchlist"}
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
