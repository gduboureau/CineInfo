import React from "react";

import MediaList from "../../components/common/MediaList";

const NowPlayingMovies = () => {

    return (
        <div className="now-playing-movies">
            <MediaList mediaType="movies" mediaList="now-playing" title="Films du moment" />
        </div>
    )
}

export default NowPlayingMovies;