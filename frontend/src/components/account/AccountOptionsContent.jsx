import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/fr';
import "./assets/accountOptionsContent.css";


const AccountOptionsContent = ({ media, optionType, activeTab }) => {

    const navigate = useNavigate();

    const handleMediaClick = (type, id, name) => {
        navigate(`/${type.slice(0, -1)}/${id}/${name}`);
    };

    const formatDate = (date) => {
        const momentDate = moment(date).locale('fr');
        return momentDate.format(`D MMMM YYYY`);
    };

    return (
        <div className="account-options-media">
            {media.length > 0 ? (
                media.map((item) => (
                    <div className="media" key={item.id}>
                        {item.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`} alt={item.id} onClick={() => handleMediaClick(activeTab, item.id, optionType === 'series' ? item.name : item.title)} />
                        ) : (
                            <div className="icon-div" onClick={() => handleMediaClick(activeTab, item.id, optionType === 'series' ? item.name : item.title)}>
                                <FontAwesomeIcon icon={faImage} className="icon" />
                            </div>
                        )}
                        <div className="details">
                            <h3 className="title" onClick={() => handleMediaClick(activeTab, item.id, optionType === 'series' ? item.name : item.title)}>
                                {optionType === 'series' ? item.name : item.title}
                            </h3>
                            <p className="date">{item.release_date ? formatDate(item.release_date) : (item.first_air_date ? formatDate(item.first_air_date) : "")}</p>
                            <p className="overview">{item.overview}</p>
                            {optionType === 'ratings' && (
                                <p className="rating">Note : {item.rating}/5</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-content">
                    {optionType === 'ratings' && activeTab === 'movies' && "Vous n'avez pas encore noté de films"}
                    {optionType === 'favorites' && activeTab === 'movies' && "Vous n'avez pas encore ajouté de films à vos favoris."}
                    {optionType === 'ratings' && activeTab === 'series' && "Vous n'avez pas encore noté de séries"}
                    {optionType === 'favorites' && activeTab === 'series' && "Vous n'avez pas encore ajouté de séries à vos favoris."}
                </p>
            )}
        </div>
    );
}

export default AccountOptionsContent;
