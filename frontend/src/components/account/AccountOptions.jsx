import React, { useState, useEffect } from "react";
import AccountHeader from './AccountHeader';

import './assets/accountOptions.css';
import Loading from "../../utils/Loading";
import AccountOptionsContent from "./AccountOptionsContent";

const AccountOptions = ({ optionType }) => {
    const [activeTab, setActiveTab] = useState('movies');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (token === null) return;
        setMedia([]);
        fetch(`http://localhost:8080/user/${activeTab}/${optionType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMedia(data);
            })
            .catch((error) => console.error('Erreur de recherche :', error))
            .finally(() => setLoading(false));
    }, [token, activeTab, optionType]);

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
                <AccountOptionsContent media={media} optionType={optionType} activeTab={activeTab} />
            </div>
        </div>
    );
};

export default AccountOptions;
