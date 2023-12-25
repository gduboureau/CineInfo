import React from "react";
import { useParams } from "react-router-dom";

const SerieDetails = () => {
    const { id, name } = useParams();

    return (
        <div>
            <h2>Détails de la série</h2>
            <p>ID : {id}</p>
            <p>Titre : {name}</p>
        </div>
    );
}

export default SerieDetails;
