import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = '7f0799a761376830477332b8577e17fe';

export const search = async (req, res) => {

    const { searchValue } = req.body;
    console.log(`Searching for "${searchValue}"`);

    if (!searchValue) {
        return res.status(400).json({ error: 'Le terme de recherche est manquant.' });
    }

    const cacheKeyMovies = `search_movie_${searchValue}`;
    const cacheKeyTV = `search_tv_${searchValue}`;

    try {
        await connectToRedis();

        const [cachedDataMovies, cachedDataTV] = await Promise.all([
            getFromCache(cacheKeyMovies),
            getFromCache(cacheKeyTV),
        ]);

        if (cachedDataMovies && cachedDataTV) {
            console.log(`Serving search results for "${searchValue}" from cache.`);
            return res.json({ movies: cachedDataMovies, tv: cachedDataTV });
        }

        const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&include_adult=false&language=fr-FR`;
        const tvSearchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchValue}&include_adult=false&language=fr-FR`;

        const [movieResponse, tvResponse] = await Promise.all([
            fetch(movieSearchUrl),
            fetch(tvSearchUrl),
        ]);

        const [movieSearchData, tvSearchData] = await Promise.all([
            movieResponse.json(),
            tvResponse.json(),
        ]);

        await Promise.all([
            saveToCache(cacheKeyMovies, movieSearchData),
            saveToCache(cacheKeyTV, tvSearchData),
        ]);

        return res.json({ movies: movieSearchData, tv: tvSearchData });
    } catch (error) {
        console.error(`Erreur lors de la recherche pour "${searchValue}":`, error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
