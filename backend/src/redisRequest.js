import { connectToRedis, getFromCache, saveToCache, closeConnection } from './redis/redis.js';
import { getPopularMovies } from './apiRequest.js';

const getPopularMoviesWithCache = async () => {
    const cacheKey = 'popular_movies';

    try {
        await connectToRedis();
        const cachedData = await getFromCache(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const popularMovies = await getPopularMovies();
        if (popularMovies) {
            await saveToCache(cacheKey, popularMovies);
            return popularMovies;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error in getPopularMoviesWithCache:', error);
        return [];
    } finally {
        closeConnection();
    }
};

export { getPopularMoviesWithCache };
