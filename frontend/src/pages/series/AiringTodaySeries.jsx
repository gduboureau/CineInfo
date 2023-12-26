import React, { useState, useEffect } from "react";

import DisplaySeries from "../../components/series/DisplaySeries";
import "./assets/series.css";

const AiringTodaySeries = () => {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8080/series/airing-today?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSeries(prevSeries => {
                    const newSeries = data.filter(newSerie => !prevSeries.some(prevSerie => prevSerie.id === newSerie.id));
                    return [...prevSeries, ...newSeries];
                });

            })
            .catch((error) => console.error("Erreur de recherche :", error));
    }, [page]);


    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="airing-today-series">
            <h2 className="serie-title">Séries diffusées aujourd'hui</h2>
            <DisplaySeries series={series} />
            <button onClick={handleLoadMore}>Voir plus</button>
        </div>
    )
}

export default AiringTodaySeries;