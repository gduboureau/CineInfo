import React, { useState, useEffect } from "react";
import AccountHeader from "../../components/account/AccountHeader";

import './assets/settings.css'

const Settings = () => { //TO DO : change user infos
    const [userInfos, setUserInfos] = useState([]);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token === null) return;
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
        <div className="settings">
            <AccountHeader />
            <div className="settings-content">
                <div className="title-group">
                    <h2>Paramètres</h2>
                </div>
                <div className="settings-infos">
                    {userInfos && (
                        <div className="settings-name">
                            <h2>{userInfos.firstname} {userInfos.lastname}</h2>
                            <p>{userInfos.mail}</p>
                            <p>@{userInfos.username}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Settings;