import React from "react";
import { Link, useLocation } from "react-router-dom";

import './assets/publicHeader.css'


const PublicHeader = () => {
    const location = useLocation();

    return (
        <header>
            <nav className="public-nav">
                <div>
                    <Link to={"/login"} state={{ prev: location.pathname }} className="login">
                        Se connecter
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default PublicHeader