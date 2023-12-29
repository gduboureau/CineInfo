import React, {useState} from "react";
import AccountHeader from "../../components/account/AccountHeader";

import './assets/favorites.css';

const Favorites = () => {
    const [activeTab, setActiveTab] = useState('movies');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
                    <p>Aucun film favori</p>
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