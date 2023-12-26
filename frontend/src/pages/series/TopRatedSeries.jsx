import React, { useState, useEffect } from "react";

import DisplaySeries from "../../components/series/DisplaySeries";
import "./assets/series.css";

const TopRatedSeries = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/series/top-rated", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setSeries(data))
            .catch((error) => console.error("Erreur de recherche :", error));
    }, []);


    return (
        <div className="top-rated-series">
            <h2 className="serie-title">Séries les mieux notées</h2>
            <DisplaySeries series={series} />
        </div>
    )
}

export default TopRatedSeries;