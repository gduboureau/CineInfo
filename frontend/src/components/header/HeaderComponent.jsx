import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from './assets/logo-cine.png';

import './assets/headerComponent.css';

const HeaderComponent = ({ isLogged }) => {
    const [userInfos, setUserInfos] = useState('');
    const [loading, setLoading] = useState(true);

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
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserInfos(data);
                })
                .catch(error => console.error('Erreur de requête :', error))
                .finally(() => setLoading(false));
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


    if(loading){
        return <div>Chargement...</div>
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
                        <li key={index} className="category-with-submenu">
                            <Link to={`/${category.path}`} className="category">
                                {category.title}
                            </Link>
                            <div className="submenu">
                                <ul>
                                    {category.submenu.map((subitem, subindex) => (
                                        <li key={subindex}>
                                            <Link to={subitem.path} className="subcategory">
                                                {subitem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                            <Link to="/account">
                                <p>{userInfos.firstname[0]}{userInfos.lastname[0]}</p>
                            </Link>
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
