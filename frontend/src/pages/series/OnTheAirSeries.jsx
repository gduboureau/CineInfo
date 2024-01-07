import React from "react";
import MediaList from "../../components/common/MediaList";

const OnTheAirSeries = () => {

    return (
        <div className="on-the-air-series">
            <MediaList mediaType="series" mediaList="on-the-air" title="Séries en cours de diffusion" />
        </div>
    )
}

export default OnTheAirSeries;