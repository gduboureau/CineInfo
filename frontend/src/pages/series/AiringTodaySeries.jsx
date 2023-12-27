import React from "react";
import MediaList from "../../components/common/MediaList";

const AiringTodaySeries = () => {

    return (
        <div className="airing-today-series">
            <MediaList mediaType="series" mediaList="airing-today" title="Séries diffusées aujourd'hui" />
        </div>
    )
}

export default AiringTodaySeries;