import React, { useState } from "react";
import AccountHeader from "../../components/account/AccountHeader";

import './assets/ratings.css';

const Ratings = () => {
    const [activeTab, setActiveTab] = useState('movies');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="ratings">
            <AccountHeader />
            <div className="ratings-content">
            <div className="title-group">
                <h2>Mes notes</h2>
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
                    <p>Vous avez noté aucun film</p>
                </div>
            )}

            {activeTab === 'series' && (
                <div className="series-content">
                    <p>Vous avez noté aucune série</p>
                </div>
            )}
        </div>
        </div>
    );
}

export default Ratings;
