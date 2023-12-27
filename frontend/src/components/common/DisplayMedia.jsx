import React from "react";
import DisplayMovies from "../movies/DisplayMovies";
import DisplaySeries from "../series/DisplaySeries";

const DisplayMedia = ({ mediaType, media }) => {
    if (mediaType === "movies") {
        return (
            <DisplayMovies movies={media} />
        )
    } else {
        return (
            <DisplaySeries series={media} />
        )
    }
}

export default DisplayMedia;