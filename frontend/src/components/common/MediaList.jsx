import React, { useState, useEffect } from 'react';
import DisplayMedia from '../../components/common/DisplayMedia';

import './assets/mediaList.css';

const MediaList = ({ mediaType, mediaList, title }) => {
    const [media, setMedia] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8080/${mediaType}/${mediaList}?page=${page}`, {
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
    }, [page, mediaType, mediaList]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className={`media-list`}>
            <h2 className="media-title">{title}</h2>
            <DisplayMedia mediaType={mediaType} media={media} />
            <button onClick={handleLoadMore}>Voir plus</button>
        </div>
    );
};

export default MediaList;
