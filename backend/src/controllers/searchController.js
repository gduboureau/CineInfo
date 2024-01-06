import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache } from '../redis/redis.js';

const apiKey = process.env.APIkey;

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

        const cachedDataMovies = await getFromCache(cacheKeyMovies);

        if (cachedDataMovies) {
            console.log(`Serving movie search results for "${searchValue}" from cache.`);
        }
        else {
            const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&include_adult=false&language=fr-FR`;
            const movieResponse = await fetch(movieSearchUrl);
            const movieSearchData = await movieResponse.json();

            await saveToCache(cacheKeyMovies, movieSearchData);
        }

        const cachedDataTV = await getFromCache(cacheKeyTV);

        if (cachedDataTV) {
            console.log(`Serving TV search results for "${searchValue}" from cache.`);;
            return res.json({ movies: cachedDataMovies, tv: cachedDataTV });
        } else {
            const tvSearchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchValue}&include_adult=false&language=fr-FR`;
            const tvResponse = await fetch(tvSearchUrl);
            const tvSearchData = await tvResponse.json();

            await saveToCache(cacheKeyTV, tvSearchData);
            return res.json({ movies: cachedDataMovies, tv: tvSearchData });
        }
    } catch (error) {
        console.error(`Erreur lors de la recherche pour "${searchValue}":`, error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
