import React, { useState, useEffect } from "react";

import DisplaySeries from "../../components/series/DisplaySeries";

const PopularSeries = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/series/popular", {
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
        <div className="popular-series">
            <h3>Séries populaires</h3>
            <DisplaySeries series={series} />
        </div>
    )
}

export default PopularSeries;