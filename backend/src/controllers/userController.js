import jwt from 'jsonwebtoken';
import db from '../utils/pg.js';
const secretKey = 'key';

export const getUserInfos = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE user_id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getAllFavorites = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    let favorites = [];

    try {
        const result = await db.query('SELECT * FROM public."favoritemovies" WHERE user_id = $1', [userId]);
        const moviePromises = result.rows.map(async (favorite) => {
            const movieId = favorite.movie_id;
            try {
                const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7f0799a761376830477332b8577e17fe&language=fr-FR`);
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



export const addFavorite = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const { movieId } = req.body;

    try {
        await db.query('INSERT INTO public."favoritemovies" (user_id, movie_id) VALUES ($1, $2)', [userId, movieId]);
        res.json({ message: 'Favori ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const removeFavorite = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const { movieId } = req.body;

    try {
        await db.query('DELETE FROM public."favoritemovies" WHERE user_id = $1 AND movie_id = $2', [userId, movieId]);
        res.json({ message: 'Favori supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}