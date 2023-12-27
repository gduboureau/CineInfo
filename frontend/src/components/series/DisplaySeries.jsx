import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';

import "./assets/displaySeries.css";

const DisplaySeries = ({ series }) => {

    const navigate = useNavigate();

    const handleClick = (id, name) => {
        navigate(`/tv/${id}/${name}`);
    }

    useEffect(() => {
        const serieElements = document.querySelectorAll('.serie');
        serieElements.forEach((element) => {
            element.classList.add('visible');
        });
    }, [series]);

    return (
        <div className="series-container">
            {series.map((serie) => (
                <div key={serie.id} className="serie">
                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${serie.poster_path}`} alt={serie.name} onClick={() => handleClick(serie.id, serie.name)} />
                    <div className="serie-details">
                        <div className="serie-note">
                            <p>{Math.ceil(serie.vote_average * 10)}%</p>
                        </div>
                        <p className="name" onClick={() => handleClick(serie.id, serie.name)}>{serie.name}</p>
                        <p className="date">{moment(serie.first_air_date).locale('fr').format('D MMM YYYY')}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default DisplaySeries;