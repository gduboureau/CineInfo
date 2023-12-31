import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import UserScoreChart from "../common/UserScoreChart.jsx";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./assets/movieOptions.css";
import Loading from "../../utils/Loading";

const MovieOptions = ({ movie }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayRating, setDisplayRating] = useState(false);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token === null) return;
        fetch(`http://localhost:8080/user/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.map((item) => {
                    if (item.id === movie.id) {
                        setIsFavorited(true);
                    }
                    return null;
                });
            })
            .catch((error) => console.error('Erreur de recherche :', error))
            .finally(() => setLoading(false));
    }, [movie.id, token]);

    const handleFavoriteClick = () => {
        if (token === null) return;
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            fetch(`http://localhost:8080/user/addfavorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ movieId: movie.id }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Erreur de recherche :', error));
        } else {
            fetch(`http://localhost:8080/user/removefavorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ movieId: movie.id }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Erreur de recherche :', error));
        };
    }

    const handleMouseOut = () => {
        setIsHovered("");
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="movie-options">
            <ul>
                <li className="note-li">
                    <UserScoreChart percent={Math.ceil(movie.vote_average * 10)} />
                    <div className="note-text"> Note des utilisateurs</div>
                </li>
                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("favorites")}
                    onMouseOut={handleMouseOut}
                    onClick={handleFavoriteClick}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: isFavorited ? "red" : "white" }}
                    />
                    {isHovered === "favorites" && <span className="tooltip">{token ? "Ajouter aux favoris" : "Connectez-vous pour l'ajouter à vos favoris"}</span>}
                </li>
                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("watchlist")}
                    onMouseOut={handleMouseOut}>
                    <FontAwesomeIcon icon={faBookmark} style={{ color: 'white' }} />
                    {isHovered === "watchlist" && <span className="tooltip">{token ? "Ajouter à ma watchlist" : "Connectez-vous pour l'ajouter à votre watchlist"}</span>}
                </li>

                <li
                    className="icons"
                    onMouseOver={() => setIsHovered("ratings")}
                    onMouseOut={handleMouseOut}
                    onClick={() => setDisplayRating(!displayRating)}>
                    <FontAwesomeIcon icon={solidStar} style={{ color: 'white' }} />
                    {isHovered === "ratings" && (
                        <span className="tooltip">
                            {token
                                ? "Noter"
                                : "Connectez-vous pour ajouter une note"}
                        </span>
                    )}
                </li>
            </ul>
        </div>
    );

}

export default MovieOptions;