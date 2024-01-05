import React, { useState, useEffect } from "react";
import AccountHeader from './AccountHeader';

import './assets/accountOptions.css';
import Loading from "../../utils/Loading";
import AccountOptionsContent from "./AccountOptionsContent";

const AccountOptions = ({ optionType }) => {
    const [activeTab, setActiveTab] = useState('movies');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seenFilter, setSeenFilter] = useState('all');

    const token = sessionStorage.getItem('token');

    const handleTabChange = (tab) => {
        setLoading(true);
        setActiveTab(tab);
        setSeenFilter('all');
    };

    const handleSeenFilterChange = (filter) => {
        setSeenFilter(filter);
    };

    useEffect(() => {
        if (token === null) return;
        setMedia([]);
        const url = `http://localhost:8080/user/${activeTab}/${optionType}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (optionType === 'watchlist' && activeTab === 'movies') {
                    const filteredMedia = data.sort((a, b) => {
                        const aSeen = a.seen ? 1 : 0;
                        const bSeen = b.seen ? 1 : 0;
                        return aSeen - bSeen;
                    }).filter((item) => {
                        if (seenFilter === 'all') {
                            return true;
                        } else {
                            return item.seen === (seenFilter === 'seen');
                        }
                    });
                    setMedia(filteredMedia);
                } else {
                    setMedia(data);
                }
            })
            .catch((error) => console.error('Erreur de recherche :', error))
            .finally(() => setLoading(false));
    }, [token, activeTab, optionType, seenFilter]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="account-options">
            <AccountHeader />
            <div className="account-options-content">
                <div className="title-group">
                    <h2>
                        {optionType === 'ratings' && "Mes notes"}
                        {optionType === 'favorites' && "Mes favoris"}
                        {optionType === 'watchlist' && "Ma watchlist"}
                    </h2>
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
                    {optionType === 'watchlist' && activeTab === "movies" && (
                        <select
                            value={seenFilter}
                            onChange={(e) => handleSeenFilterChange(e.target.value)}
                        >
                            <option value="all">Tous</option>
                            <option value="seen">Vus</option>
                            <option value="unseen">Non vus</option>
                        </select>
                    )}
                </div>
                <AccountOptionsContent media={media} optionType={optionType} activeTab={activeTab} setMedia={setMedia} />
            </div>
        </div>
    );
};

export default AccountOptions;
