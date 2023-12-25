import React, { useState, useEffect } from "react";

import DisplaySeries from "../../components/series/DisplaySeries";

const AiringTodaySeries = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/series/airing-today", {
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
        <div className="airing-today-series">
            <h3>Séries diffusées aujourd'hui</h3>
            <DisplaySeries series={series} />
        </div>
    )
}

export default AiringTodaySeries;