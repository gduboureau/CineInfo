import React from "react";
import moment from 'moment';
import 'moment/locale/fr';

import "./assets/displaySeries.css";

const DisplaySeries = ({ series }) => {

    return (
        <div className="series-container">
            {series.map((serie) => (
                <div key={serie.id} className="serie">
                    <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
                    <p>{serie.name}</p>
                    <p>{moment(serie.first_air_date).locale('fr').format('D MMM YYYY')}</p>
                </div>
            ))}
        </div>
    );

}

export default DisplaySeries;