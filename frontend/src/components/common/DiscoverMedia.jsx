import React, { useState, useEffect } from 'react';
import DisplayMedia from '../../components/common/DisplayMedia';

import './assets/discoverMedia.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DiscoverMedia = ({ mediaType }) => {
    const [media, setMedia] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/${mediaType}/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setGenres(data))
            .catch((error) => console.error('Erreur de recherche :', error));
    }, [mediaType]);

    useEffect(() => {
        fetchMedia();
    }, [page, selectedGenres]);

    const fetchMedia = () => {
        let url = `http://localhost:8080/${mediaType}/discover?page=${page}`;

        if (selectedGenres.length > 0) {
            const genresQueryParam = selectedGenres.join(',');
            url = `http://localhost:8080/${mediaType}/discover?page=${page}&genres=${genresQueryParam}`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMedia((prevMedia) => {
                    const newMedia = data.filter(
                        (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
                    );
                    return [...prevMedia, ...newMedia];
                });
            })
            .catch((error) => console.error('Erreur de recherche :', error));
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleGenreClick = (genreId) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genreId)
                ? prevSelectedGenres.filter((selectedGenre) => selectedGenre !== genreId)
                : [...prevSelectedGenres, genreId]
        );
    };

    const handleSearchGenres = () => {
        setPage(1);
        setMedia([]);
        fetchMedia();
    };

    const [isGenresVisible, setIsGenresVisible] = useState(false);

    const toggleGenresVisibility = () => {
        setIsGenresVisible((prevIsGenresVisible) => !prevIsGenresVisible);
    }

    return (
        <div className='discover-media'>
            <div className='filter-panel'>
                <div className='genres-panel'>
                    <div className="genres-title" onClick={toggleGenresVisibility}>
                    <p>Filtrer</p>
                    <FontAwesomeIcon icon={isGenresVisible ? faChevronDown : faChevronRight} />
                    </div>
                    {isGenresVisible && (
                        <ul className='genre-list'>
                            {genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className={selectedGenres.includes(genre.id) ? 'selected' : ''}
                                    onClick={() => handleGenreClick(genre.id)}
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button onClick={handleSearchGenres}>Rechercher</button>
            </div>

            <div className="media-display">
                <DisplayMedia mediaType={mediaType} media={media} />
                <FontAwesomeIcon className="see-more-icone" onClick={handleLoadMore} icon={faChevronDown} size='xl'/>
            </div>
        </div>
    );
};

export default DiscoverMedia;
