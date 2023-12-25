import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = '7f0799a761376830477332b8577e17fe';

const fetchMovies = async (req, res, cacheKey, apiUrl) => {
    try {
        await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return res.json(cachedData);
        }

        const tmdbResponse = await fetch(apiUrl);
        const tmdbData = await tmdbResponse.json();
        const movies = tmdbData.results;
        await saveToCache(cacheKey, movies);
        res.json(movies);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const PopularMovies = async (req, res) => {
    const cacheKey = 'popular_movies';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const NowPlayingMovies = async (req, res) => {
    const cacheKey = 'now_playing_movies';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const UpcomingMovies = async (req, res) => {
    const cacheKey = 'upcoming_movies';
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const TopRatedMovies = async (req, res) => {
    const cacheKey = 'top_rated_movies';
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};
