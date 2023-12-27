import React from "react";
import MediaList from "../../components/common/MediaList";

const TopRatedSeries = () => {

    return (
        <div className="top-rated-series">
            <MediaList mediaType="series" mediaList="top-rated" title="Séries les mieux notées" />
        </div>
    )
}

export default TopRatedSeries;