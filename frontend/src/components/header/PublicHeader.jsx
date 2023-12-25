import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from "./assets/logo-cine.png";

import './assets/publicHeader.css';

const PublicHeader = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        const searchInput = document.querySelector(".search-input input");
        const searchValue = searchInput.value.toLowerCase();

        navigate(`/search?query=${searchValue}`);
        window.location.reload();

    }

    return (
        <header>
            <nav className="public-nav">
                <div>
                    <Link to="/" className="homelink">
                        <img src={Logo} alt="Cine logo" className="cine-logo" />
                    </Link>
                </div>
                <ul className="categories">
                    <li className="category-with-submenu">
                        <Link to={"/movies"} className="category">
                            Films
                        </Link>
                        <div className="submenu">
                            <ul>
                                <li>
                                    <Link to={"/movies/popular"} className="subcategory">
                                        Populaires
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/movies/now-playing"} className="subcategory">
                                        Du moment
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/movies/upcoming"} className="subcategory">
                                        A venir
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/movies/top-rated"} className="subcategory">
                                        Les mieux notés
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="category-with-submenu">
                        <Link to={"/tv"} className="category">
                            Séries
                        </Link>
                        <div className="submenu">
                            <ul>
                                <li>
                                    <Link to={"/tv/popular"} className="subcategory">
                                        Populaires
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/tv/airing-today"} className="subcategory">
                                        Diffusées aujourd'hui
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/tv/top-rated"} className="subcategory">
                                        Les mieux notés
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="right-header">
                    <div className="search-input">
                        <input type="text" placeholder="Rechercher" onKeyDown={handleKeyPress} />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchSubmit} />
                    </div>
                    <div>
                        <Link to={"/login"} state={{ prev: location.pathname }} className="login">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default PublicHeader;
