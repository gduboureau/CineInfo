import React, { useState } from "react";
import "./assets/videos.css";

const Videos = ({ videos }) => {
    return (
        <div className="movie-video-container">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div key={video.id} className="video-item">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            allowFullScreen
                        ></iframe>
                        <p>{video.name}</p>
                    </div>
                ))
            ) : (
                <div className="no-video-message">Pas de vidéo disponible...</div>
            )}
        </div>
    );
};

export default Videos;
