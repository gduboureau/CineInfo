import React from "react";
import MediaList from "../../components/common/MediaList";

const UpcomingMovies = () => {

    return (
        <div className="upcoming-movies">
            <MediaList mediaType="movies" mediaList="upcoming" title="Films à venir" />
        </div>
    )
}

export default UpcomingMovies;