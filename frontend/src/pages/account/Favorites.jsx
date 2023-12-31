import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountHeader from "../../components/account/AccountHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Loading from "../../utils/Loading";
import moment from 'moment';
import 'moment/locale/fr';

import './assets/favorites.css';

const Favorites = () => {
    const [activeTab, setActiveTab] = useState('movies');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if(token === null) return;
        fetch(`http://localhost:8080/user/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setFavorites(data);
            }
            )
            .catch((error) => console.error('Erreur de recherche :', error))
            .finally(() => setLoading(false));
    }, [token]);

    const formatDate = (date) => {
        const momentDate = moment(date).locale('fr');;
        return momentDate.format('D MMMM YYYY');
    };

    const handleFavoriteClick = (type, id, name) => {
       navigate(`/${type}/${id}/${name}`);
    };


    if(loading) return <Loading />;

    return (
        <div className="favorites">
            <AccountHeader />
            <div className="favorites-content">
                <div className="title-group">
                    <h2>Mes favoris</h2>
                    <div className="tabs">
                        <h3
                            onClick={() => handleTabChange('movies')}
                            className={activeTab === 'movies' ? 'active-tab' : ''}
                        > Films</h3>
                        <h3
                            onClick={() => handleTabChange('series')}
                            className={activeTab === 'series' ? 'active-tab' : ''}
                        >
                            Séries
                        </h3>
                    </div>
                </div>

                {activeTab === 'movies' && (
                    <div className="movies-content">
                        {favorites.map((favorite) => (
                            <div className="favorite" key={favorite.id}>
                                {favorite.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${favorite.poster_path}`} alt={favorite.title} onClick={() => handleFavoriteClick("movie", favorite.id, favorite.title)}/>
                                ) : (
                                    <div className="icon-div" onClick={() => handleFavoriteClick("movie", favorite.id, favorite.title)}>
                                        <FontAwesomeIcon icon={faImage} className="icon" />
                                    </div>
                                )}
                                <div className="details">
                                    <h3 className="title" onClick={() => handleFavoriteClick("movie", favorite.id, favorite.title)}>{favorite.title}</h3>
                                    <p className="date">{favorite.release_date ? formatDate(favorite.release_date) : ""}</p>
                                    <p className="overview">{favorite.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'series' && (
                    <div className="series-content">
                        <p>Aucune série favorite</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;