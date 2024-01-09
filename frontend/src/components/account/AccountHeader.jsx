import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Loading from "../../utils/Loading";

import './assets/accountHeader.css';

const AccountHeader = () => {
    const [userInfos, setUserInfos] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8080/user/infos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserInfos(data);
            }).then(() => setLoading(false))
            .catch(error => console.error('Erreur de requête :', error));
    }, [token]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="account-header">
            <div className="account-infos">
                <div className="account-logo">
                    {userInfos.username ? (
                        <img src={`http://localhost:8080/user/profile-image/${userInfos.username}`} alt="pp default" className="center-left" />
                    ) : null}                
                </div>
                <div className="account-details">
                    {userInfos && (
                        <div className="account-name">
                            <h2>{userInfos.firstname} {userInfos.lastname}</h2>
                            <p>@{userInfos.username}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="account-categories">
                <nav>
                    <ul>
                        <li>
                            <Link to={`/account/${userInfos.username}/watchlist`}>Ma watchlist</Link>
                        </li>
                        <li>
                            <Link to={`/account/${userInfos.username}/favorites`}>Mes favoris</Link>
                        </li>
                        <li>
                            <Link to={`/account/${userInfos.username}/ratings`}>Mes notes</Link>
                        </li>
                        <li>
                            <Link to={`/account/${userInfos.username}/settings`}>Paramètres</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default AccountHeader;