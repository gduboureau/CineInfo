import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';

import "./assets/displaySeries.css";

const DisplaySeries = ({ series }) => {

    const navigate = useNavigate();

    const handleClick = (id, name) => {
        navigate(`/tv/${id}/${name}`);
    }

    return (
        <div className="series-container">
            {series.map((serie) => (
                <div key={serie.id} className="serie">
                    <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} onClick={() => handleClick(serie.id, serie.name)} />
                    <p className="name" onClick={() => handleClick(serie.id, serie.name)}>{serie.name}</p>
                    <p>{moment(serie.first_air_date).locale('fr').format('D MMM YYYY')}</p>
                </div>
            ))}
        </div>
    );

}

export default DisplaySeries;