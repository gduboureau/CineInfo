import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id, title } = useParams();

    return (
        <div>
            <h2>Détails du film</h2>
            <p>ID : {id}</p>
            <p>Titre : {title}</p>
        </div>
    );
}

export default MovieDetails;
