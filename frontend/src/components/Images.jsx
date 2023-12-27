import React, { useState, useEffect } from "react";
import "./assets/images.css";
import Loading from "../utils/Loading";

const Images = ({ images }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const imagePromises = images.map((image) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${image.file_path}`;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(imagePromises)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des images :", error);
                setLoading(false);
            });
    }, [images]);

    return (
        <div className="movies-image">
            {loading && <div className="loading-images"><Loading /></div>}
            {!loading && (
                <div className="movie-image-container">
                    {images.map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${image.file_path}`} alt={image.name} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Images;
