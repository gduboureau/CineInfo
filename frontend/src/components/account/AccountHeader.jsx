import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import './assets/accountHeader.css';

const AccountHeader = () => {
    const [userInfos, setUserInfos] = useState('');

    const token = sessionStorage.getItem('token');

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
            })
            .catch(error => console.error('Erreur de requête :', error));
    }, [token]);

    return (
        <div className="account-header">
            <div className="account-infos">
                <div className="account-logo">
                    <img src={userInfos.image} alt="Photo de profil par défaut" />
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