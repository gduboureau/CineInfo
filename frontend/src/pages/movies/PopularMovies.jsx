import React from "react";
import MediaList from "../../components/common/MediaList";

const PopularMovies = () => {

    return (
        <div className="popular-movies">
            <MediaList mediaType="movies" mediaList="popular" title="Films populaires" />
        </div>
    )
}

export default PopularMovies;