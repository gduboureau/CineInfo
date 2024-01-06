import React, { useState, useEffect, useRef } from "react";
import AccountHeader from './AccountHeader';

import './assets/accountOptions.css';
import Loading from "../../utils/Loading";
import AccountOptionsContent from "./AccountOptionsContent";

const AccountOptions = ({ optionType }) => {
    const [activeTab, setActiveTab] = useState('movies');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seenFilter, setSeenFilter] = useState('unseen');
    const detailsRef = useRef(null);

    const token = sessionStorage.getItem('token');

    const handleTabChange = (tab) => {
        setLoading(true);
        setActiveTab(tab);
        setSeenFilter('unseen');
        closeDetails();
    };

    const handleSeenFilterChange = (filter) => {
        setSeenFilter(filter);
        closeDetails();
    };

    const closeDetails = () => {
        if (detailsRef.current) {
            detailsRef.current.removeAttribute("open");
        }
    };

    const fetchDataAndUpdateMedia = () => {
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
                    const filteredMedia = data.filter((item) => {
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
    };

    useEffect(() => {
        fetchDataAndUpdateMedia();
    }, [token, activeTab, optionType, seenFilter]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="account-options">
            <div>
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
                    </div>
                    {optionType === 'watchlist' && activeTab === "movies" && (

                        <details ref={detailsRef} className="custom-select">
                            <summary className="radios">
                                <input type="radio" name="item" id="Tous" title="Tous" checked={seenFilter === 'all'} onChange={() => handleSeenFilterChange('all')} />
                                <input type="radio" name="item" id="Vus" title="Vus" checked={seenFilter === 'seen'} onChange={() => handleSeenFilterChange('seen')} />
                                <input type="radio" name="item" id="Non vus" title="Non vus" checked={seenFilter === 'unseen'} onChange={() => handleSeenFilterChange('unseen')} />
                            </summary>
                            <ul className="list">
                                <li onClick={() => handleSeenFilterChange('all')}>
                                    <label htmlFor="all">
                                        Tous
                                        <span></span>
                                    </label>
                                </li>
                                <li onClick={() => handleSeenFilterChange('seen')}>
                                    <label htmlFor="seen">Vus</label>
                                </li>
                                <li onClick={() => handleSeenFilterChange('unseen')}>
                                    <label htmlFor="unseen">Non vus</label>
                                </li>
                            </ul>
                        </details>
                    )}
                </div>
                <AccountOptionsContent media={media} optionType={optionType} activeTab={activeTab} setMedia={setMedia} fetchDataAndUpdateMedia={fetchDataAndUpdateMedia} />
            </div>
        </div>
    );
};

export default AccountOptions;
