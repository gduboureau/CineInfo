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

export const fetchSerie = async (cacheKey, apiUrl) => {
    try {
        /*await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return cachedData;
        }*/

        const tmdbResponse = await fetch(apiUrl);
        const serie = await tmdbResponse.json();
        //await saveToCache(cacheKey, movies);
        return serie;
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        throw new Error('Internal Server Error');
    }
};


export const SerieGenres = async (req, res) => {
    const cacheKey = 'serie_genres';
    const apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=fr-FR`;
    try {
        /*await connectToRedis();
        const cachedData = await getFromCache(cacheKey);

        if (cachedData) {
            console.log(`Serving ${cacheKey} from cache.`);
            return res.json(cachedData);
        }*/

        const tmdbResponse = await fetch(apiUrl);
        const tmdbData = await tmdbResponse.json();
        const genres = tmdbData.genres;
        //await saveToCache(cacheKey, genres);
        res.json(genres);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const DiscoverSeries = async (req, res) => {
    const page = req.query.page || 1;
    const genres = req.query.genres || '';
    let cacheKey = `discover_series_page_${page}`;
    if(genres){
        cacheKey += `_${genres}`;
    }
    let apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=fr-FR&page=${page}`;
    if (genres) {
        apiUrl += `&with_genres=${genres}`;
    }
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

export const SeriesDetails = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `series_details_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
}

export const SeriesCredits = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `series_credits_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${apiKey}&language=fr-FR`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
};

export const SeriesVideos = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `series_videos_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=fr-FR`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
    
};

export const SeriesImages = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `series_images_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/images?api_key=${apiKey}`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
};

export const SeriesRecommendations = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `series_recommendations_${id}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
};

export const SeriesDetailsBySeason = async (req, res) => {
    const { id, season  } = req.params;
    const cacheKey = `series_details_${id}_season_${season}`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season }?api_key=${apiKey}&language=fr-FR`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
}


export const SeriesVideosBySeason = async (req, res) => {
    const { id, season  } = req.params;
    const cacheKey = `series_videos_${id}_season_${season }`;
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season }/videos?api_key=${apiKey}`;
    const data = await fetchSerie(cacheKey, apiUrl);
    res.json(data);
}