import React from "react";
import Login from "../pages/connection/Login"
import Signup from "../pages/connection/Signup";
import { Routes, Route } from 'react-router-dom';
import Homepage from "../pages/homepage/Homepage";
import Layout from "../components/header/Layout";
import Error from "../utils/Error";
import Research from "../pages/research/Research";
import SerieDetails from "../pages/series/SerieDetails";
import MovieDetails from "../pages/movies/MovieDetails";
import PopularMovies from "../pages/movies/PopularMovies";
import NowPlayingMovies from "../pages/movies/NowPlayingMovies";
import UpcomingMovies from "../pages/movies/UpcomingMovies";
import TopRatedMovies from "../pages/movies/TopRatedMovies";
import PopularSeries from "../pages/series/PopularSeries";
import AiringTodaySeries from "../pages/series/AiringTodaySeries";
import TopRatedSeries from "../pages/series/TopRatedSeries";
import AllMovies from "../pages/movies/AllMovies";
import AllSeries from "../pages/series/AllSeries";
import Account from "../components/account/AccountHeader";
import Ratings from "../pages/account/Ratings";
import Watchlist from "../pages/account/Watchlist";
import Favorites from "../pages/account/Favorites";
import Settings from "../pages/account/Settings";


const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Research />} />
                <Route path="/movies" element={<AllMovies />} />
                <Route path="/movies/popular" element={<PopularMovies />} />
                <Route path="/movies/now-playing" element={<NowPlayingMovies />} />
                <Route path="/movies/upcoming" element={<UpcomingMovies />} />
                <Route path="/movies/top-rated" element={<TopRatedMovies />} />
                <Route path="/tv" element={<AllSeries />} />
                <Route path="/tv/popular" element={<PopularSeries />} />
                <Route path="/tv/airing-today" element={<AiringTodaySeries />} />
                <Route path="/tv/top-rated" element={<TopRatedSeries />} />
                <Route path="/movie/:id/:title" element={<MovieDetails />} />
                <Route path="/tv/:id/:name" element={<SerieDetails />} />
                <Route path="/account/:username" element={<Account />} />
                <Route path="/account/:username/ratings" element={<Ratings />} />
                <Route path="/account/:username/watchlist" element={<Watchlist />} />
                <Route path="/account/:username/favorites" element={<Favorites />} />
                <Route path="/account/:username/settings" element={<Settings />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default PublicRouter