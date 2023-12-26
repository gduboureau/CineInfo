
const APIKEY = '7f0799a761376830477332b8577e17fe';

// Fonction pour obtenir les films populaires depuis l'API TMDb
const getPopularMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=fr-FR`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies from TMDb:', error);
        return null;
    }
};

export { getPopularMovies };