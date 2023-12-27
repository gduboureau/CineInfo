import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = '7f0799a761376830477332b8577e17fe';

const fetchSeries = async (req, res, cacheKey, apiUrl) => {
    try {
        await connectToRedis();
        /*const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return res.json(cachedData);
        }*/

        const tmdbResponse = await fetch(apiUrl);
        const tmdbData = await tmdbResponse.json();
        const series = tmdbData.results;
        //await saveToCache(cacheKey, series);
        res.json(series);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const DiscoverSeries = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `discover_series_page_${page}`;
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=fr-FR&page=${page}`;
    await fetchSeries(req, res, cacheKey, apiUrl);
}

export const PopularSeries = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `popular_series_page-${page}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=${page}`;
    await fetchSeries(req, res, cacheKey, apiUrl);
};

export const AiringTodaySeries = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `airing-today_series_page-${page}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=fr-FR&page=${page}`;
    await fetchSeries(req, res, cacheKey, apiUrl);
};

export const TopRatedSeries = async (req, res) => {
    const page = req.query.page || 1;
    const cacheKey = `top_rated_series_page-${page}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=fr-FR&page=${page}`;
    await fetchSeries(req, res, cacheKey, apiUrl);
};
