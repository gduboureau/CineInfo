import React, { useState } from "react";
import AccountHeader from "../../components/account/AccountHeader";

import './assets/watchlist.css';

const Watchlist = () => {
    const [activeTab, setActiveTab] = useState('movies');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className="watchlist">
            <AccountHeader />
            <div className="watchlist-content">
                <div className="title-group">
                    <h2>Watchlist</h2>
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
                        <p>Aucun film</p>
                    </div>
                )}

                {activeTab === 'series' && (
                    <div className="series-content">
                        <p>Aucune série</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watchlist;