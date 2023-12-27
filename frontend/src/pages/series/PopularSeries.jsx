import React from "react";
import MediaList from "../../components/common/MediaList";

const PopularSeries = () => {

    return (
        <div className="popular-series">
            <MediaList mediaType="series" mediaList="popular" title="Séries populaires" />
        </div>
    )
}

export default PopularSeries;