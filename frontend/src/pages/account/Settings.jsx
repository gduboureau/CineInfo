import React from "react";
import AccountHeader from "../../components/account/AccountHeader";

import './assets/settings.css'

const Settings = () => {

    return (
        <div className="settings">
            <AccountHeader />
            <div className="settings-content">
                <div className="title-group">
                    <h2>Paramètres</h2>
                </div>
            </div>
        </div>
    );
}

export default Settings;