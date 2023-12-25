import React from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../utils/AccountService";

import './assets/loggedHeader.css'

const LoggedHeader = () => {
    const logout = () => {
        accountService.logout();
    }

    return (
        <header>
            <nav className="logged-nav">
                <div>
                    <Link to="/" className="logout" onClick={logout}>
                        Se déconnecter
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default LoggedHeader