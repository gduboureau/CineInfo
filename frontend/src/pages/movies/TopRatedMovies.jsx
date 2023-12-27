import React  from "react";
import MediaList from "../../components/common/MediaList";

const TopRatedMovies = () => {

    return (
        <div className="top-rated-movies">
            <MediaList mediaType="movies" mediaList="top-rated" title="Films les mieux notés"  />
        </div>
    )
}

export default TopRatedMovies;