import db from '../utils/pg.js';
import { fetchMovie } from './movieController.js';

const apiKey = '7f0799a761376830477332b8577e17fe';

export const getUserInfos = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE user_id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const favoriteMovies = async (req, res) => {
    const userId = req.userId;
    let favorites = [];

    try {
        const result = await db.query('SELECT * FROM public."favoritemovies" WHERE user_id = $1', [userId]);
        const moviePromises = result.rows.map(async (favorite) => {
            const movieId = favorite.movie_id;
            try {
                const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`);
                const movie = await tmdbResponse.json();
                return movie;
            } catch (error) {
                console.error(`Error fetching movie details:`, error);
                return null;
            }
        });
        favorites = await Promise.all(moviePromises);
        favorites = favorites.filter(movie => movie !== null);
        res.json(favorites);
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const addFavoriteMovie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('INSERT INTO public."favoritemovies" (user_id, movie_id) VALUES ($1, $2)', [userId, mediaId]);
        res.json({ message: 'Favori ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const removeFavoriteMovie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('DELETE FROM public."favoritemovies" WHERE user_id = $1 AND movie_id = $2', [userId, mediaId]);
        res.json({ message: 'Favori supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const addOrUpdateRatingMovie = async (req, res) => {
    const userId = req.userId;
    const { mediaId, rating } = req.body;

    try {
        await db.query(`
            INSERT INTO public."movieratings" (user_id, movie_id, rating)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, movie_id) DO UPDATE
            SET rating = EXCLUDED.rating
        `, [userId, mediaId, rating]);

        res.json({ message: 'Note ajoutée ou mise à jour' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const deleteRatingMovie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('DELETE FROM public."movieratings" WHERE user_id = $1 AND movie_id = $2', [userId, mediaId]);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getMoviesRatings = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."movieratings" WHERE user_id = $1', [userId]);
        const moviesWithRatings = await Promise.all(result.rows.map(async (row) => {
            const movieId = row.movie_id;
            const cacheKey = `movie_${movieId}`;
            const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`;
            const movieDetails = await fetchMovie(cacheKey, apiUrl);
            return { ...movieDetails, rating: row.rating };
        }));

        res.json(moviesWithRatings);
    } catch (error) {
        console.error('Erreur lors de la récupération de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};