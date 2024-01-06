import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/fr';
import { ToastContainer, toast } from 'react-toastify';
import "./assets/accountOptionsContent.css";
import AccountWatchlistSeries from "./AccountWatchlistSeries";

const AccountOptionsContent = ({ media, optionType, activeTab, setMedia }) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleMediaClick = (type, id, name) => {
        if (type === 'movies') {
            navigate(`/movie/${id}/${name}`);
        } else {
            navigate(`/tv/${id}/${name}`);
        }
    };

    const formatDate = (date) => {
        const momentDate = moment(date).locale('fr');
        return momentDate.format(`D MMMM YYYY`);
    };

    const handleInput = (event) => {
        if (token === null) return;
        const seen = event.target.checked;
        const id = event.target.id.split('-')[1];
        fetch(`http://localhost:8080/user/movies/seen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ mediaId: id, seen: seen }),
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedMedia = media.map((item) => {
                    if (item.id.toString() === id) {
                        item.seen = seen;
                    }
                    return item;
                });
                setMedia(updatedMedia);
                toast.success(data.message);
            })
            .catch((error) => console.error('Erreur de requête :', error));
    };

    return (
        <div className="account-options-media">
            <ToastContainer />
            {media.length > 0 && (
                <>
                    {(activeTab === 'series' && optionType === 'watchlist') ? (
                        <AccountWatchlistSeries media={media} setMedia={setMedia} formatDate={formatDate} handleMediaClick={handleMediaClick} />
                    ) : (
                        media.map((item) => (
                            <div className="media" key={item.id}>
                                {item.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`} alt={item.id} onClick={() => handleMediaClick(activeTab, item.id, activeTab === 'series' ? item.name : item.title)} />
                                ) : (
                                    <div className="icon-div" onClick={() => handleMediaClick(activeTab, item.id, activeTab === 'series' ? item.name : item.title)}>
                                        <FontAwesomeIcon icon={faImage} className="icon" />
                                    </div>
                                )}
                                <div className="details">
                                    <h3 className="title" onClick={() => handleMediaClick(activeTab, item.id, activeTab === 'series' ? item.name : item.title)}>
                                        {activeTab === 'series' ? item.name : item.title}
                                    </h3>
                                    <p className="date">{item.release_date ? formatDate(item.release_date) : (item.first_air_date ? formatDate(item.first_air_date) : "")}</p>
                                    <p className="overview">{item.overview}</p>
                                    {optionType === 'ratings' && (
                                        <p className="rating">Note : {item.rating}/5</p>
                                    )}
                                </div>
                                {optionType === 'watchlist' && activeTab === "movies" && (
                                    <div className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            id={`check-${item.id}`}
                                            checked={item.seen || false}
                                            onChange={handleInput} />
                                        <label htmlFor={`check-${item.id}`}>
                                            <span></span>{/* This span is needed to create the "checkbox" element */}
                                        </label>
                                    </div>
                                )}
                            </div>
                        )))}
                </>
            )}
            {
                media.length === 0 && (
                    <p className="no-content">
                        {optionType === 'ratings' && activeTab === 'movies' && "Vous n'avez pas encore noté de films"}
                        {optionType === 'favorites' && activeTab === 'movies' && "Vous n'avez pas encore ajouté de films à vos favoris."}
                        {optionType === 'watchlist' && activeTab === 'movies' && "Vous n'avez pas encore ajouté de films à votre watchlist."}
                        {optionType === 'ratings' && activeTab === 'series' && "Vous n'avez pas encore noté de séries"}
                        {optionType === 'favorites' && activeTab === 'series' && "Vous n'avez pas encore ajouté de séries à vos favoris."}
                        {optionType === 'watchlist' && activeTab === 'series' && "Vous n'avez pas encore ajouté de séries à votre watchlist."}
                    </p>
                )
            }
        </div >
    );
}

export default AccountOptionsContent;
