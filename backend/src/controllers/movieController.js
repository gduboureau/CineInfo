import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = process.env.APIkey;

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
        await saveToCache(cacheKey, movies, 86400);
        res.json(movies);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const fetchMovie = async (cacheKey, apiUrl) => {
    try {
        await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return cachedData;
        }

        const tmdbResponse = await fetch(apiUrl);
        const movie = await tmdbResponse.json();
        await saveToCache(cacheKey, movie, 86400);
        return movie;
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        throw new Error('Internal Server Error');
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
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=fr-FR&page=${page}&region=FR`;
    if (genres) {
        cacheKey += `_${genres}`;
        apiUrl += `&with_genres=${genres}`;
    }
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const PopularMovies = async (req, res) => {
    const page = req.query.page || 1;
    let cacheKey = `popular_movies_page_${page}`;
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}&language=fr-FR&region=FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const NowPlayingMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `now_playing_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}&language=fr-FR&region=FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const UpcomingMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `upcoming_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${apiKey}&language=fr-FR&region=FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const TopRatedMovies = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `top_rated_movies_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}&language=fr-FR&region=FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
};

export const MovieDetails = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `movie_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;
    const movie = await fetchMovie(cacheKey, apiUrl);
    res.json(movie);
}

export const MovieCredits = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `movie_${id}_credits`;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=fr-FR`;
    const movie = await fetchMovie(cacheKey, apiUrl);
    res.json(movie);
}

export const MovieVideos = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `movie_${id}_videos`;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=fr-FR`;
    const movie = await fetchMovie(cacheKey, apiUrl);
    res.json(movie);
}

export const MovieImages = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `movie_${id}_images`;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
    const movie = await fetchMovie(cacheKey, apiUrl);
    res.json(movie);
}

export const MovieRecommendations = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `movie_${id}_recommendations`;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=fr-FR`;
    await fetchMovies(req, res, cacheKey, apiUrl);
}