import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from './assets/logo-cine.png';
import { motion, AnimatePresence } from 'framer-motion';

import './assets/headerComponent.css';

const HeaderComponent = ({ isLogged }) => {
    const [userInfos, setUserInfos] = useState('');
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isProfileSubMenuOpen, setIsProfileSubMenuOpen] = useState(false);

    const navigate = useNavigate();

    const categories = [
        {
            title: 'Films',
            path: 'movies',
            submenu: [
                { title: 'Populaires', path: '/movies/popular' },
                { title: 'Du moment', path: '/movies/now-playing' },
                { title: 'A venir', path: '/movies/upcoming' },
                { title: 'Les mieux notés', path: '/movies/top-rated' },
            ],
        },
        {
            title: 'Séries',
            path: 'tv',
            submenu: [
                { title: 'Populaires', path: '/tv/popular' },
                { title: 'Diffusées aujourd\'hui', path: '/tv/airing-today' },
                { title: 'Les mieux notées', path: '/tv/top-rated' },
            ],
        },
    ];

    useEffect(() => {
        if (isLogged) {
            fetch('http://localhost:8080/user/infos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfos(data);
                })
                .catch(error => console.error('Erreur de requête :', error));
        }
    }, [isLogged]);


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

    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/');
        window.location.reload();
    }

    return (
        <header>
            <nav className={isLogged ? 'logged-nav' : 'public-nav'}>
                <div>
                    <Link to="/" className="homelink">
                        <img src={Logo} alt="Cine logo" className="cine-logo" />
                    </Link>
                </div>
                <ul className="categories">
                    {categories.map((category, index) => (
                        <li key={index} className="category-with-submenu" onMouseEnter={() => setIsSubMenuOpen(category.title)}
                            onMouseLeave={() => setIsSubMenuOpen(false)}>
                            <Link
                                to={`/${category.path}`}
                                className="category"
                            >
                                {category.title}
                            </Link>
                            <AnimatePresence>
                                {isSubMenuOpen === category.title && (
                                    <motion.div
                                        className="submenu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ul>
                                            {category.submenu.map((subitem, subindex) => (
                                                <li key={subindex}>
                                                    <Link to={subitem.path} className="subcategory">
                                                        {subitem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
                <div className="right-header">
                    <div className="search-input">
                        <input type="text" placeholder="Rechercher" onKeyDown={handleKeyPress} />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchSubmit} />
                    </div>
                    <div className='account'>
                        {isLogged ? (
                            <div className="profile-with-submenu" onMouseEnter={() => setIsProfileSubMenuOpen(true)}
                                onMouseLeave={() => setIsProfileSubMenuOpen(false)}>
                                <Link to={`/account/${userInfos.username}`}>
                                    <img src={userInfos.image} alt="pp"/>
                                </Link>
                                <AnimatePresence>
                                    {isProfileSubMenuOpen && (
                                        <motion.div
                                            className="profile-submenu"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ul>
                                                <li>
                                                    <Link to={`/account/${userInfos.username}`} className="profile-subcategory">
                                                        Mon compte
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/account/${userInfos.username}/settings`} className="profile-subcategory">
                                                        Paramètres
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="profile-subcategory" onClick={Logout}>
                                                        Se déconnecter
                                                    </Link>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="login">
                                Se connecter
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
