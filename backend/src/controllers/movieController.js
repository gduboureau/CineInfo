import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = '7f0799a761376830477332b8577e17fe';

const fetchMovies = async (req, res, cacheKey, apiUrl) => {
    try {
        /*await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return res.json(cachedData);
        }
*/
        const tmdbResponse = await fetch(apiUrl);
        const tmdbData = await tmdbResponse.json();
        const movies = tmdbData.results;
        //await saveToCache(cacheKey, movies);
        res.json(movies);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const MovieGenres = async (req, res) => {
    const cacheKey = 'movie_genres';
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`;
    try {
        await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return res.json(cachedData);
        }

        const tmdbResponse = await fetch(apiUrl);
        const tmdbData = await tmdbResponse.json();
        const genres = tmdbData.genres;
        await saveToCache(cacheKey, genres);
        res.json(genres);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const DiscoverMovies = async (req, res) => {
    const page = req.query.page || 1;
    const genres = req.query.genres || '';
    let cacheKey = `discover_movies_page_${page}`;
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=fr-FR&page=${page}`;
    if(genres){
        cacheKey += `_${genres}`;
        apiUrl += `&with_genres=${genres}`;
    }
    await fetchMovies(req, res, cacheKey, apiUrl);
};



export const PopularMovies = async (req, res) => {
    const page = req.query.page || 1;
    const genres = req.query.genres || '';
    let cacheKey = `popular_movies_page_${page}`;
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}&language=fr-FR`;
    if(genres){
        cacheKey += `_${genres}`;
        apiUrl += `&with_genres=${genres}`;
    }
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const NowPlayingMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `now_playing_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const UpcomingMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `upcoming_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const TopRatedMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `top_rated_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};
