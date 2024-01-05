import db from '../utils/pg.js';
import { fetchMovie } from './movieController.js';

const apiKey = '7f0799a761376830477332b8577e17fe';
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjA3OTlhNzYxMzc2ODMwNDc3MzMyYjg1NzdlMTdmZSIsInN1YiI6IjY1NjlhYjRkZDA0ZDFhMDBlY2ZhOTFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dg7J1QNfiLW7bGCLaFo6Fz8CcwU-HABY89b7Ac_emNw';

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

    const tmdbRating = rating * 2;

    try {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${mediaId}/rating?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                value: tmdbRating,
            }),
        });

        if (!tmdbResponse.ok) {
            throw new Error(`TMDB API error: ${tmdbResponse}`);
        }

        const tmdbData = await tmdbResponse.json();
        console.log('TMDB Response:', tmdbData);

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
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${mediaId}/rating`, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${apiToken}`,
            }
        });

        if (!tmdbResponse.ok) {
            throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
        }

        const tmdbData = await tmdbResponse.json();
        console.log('TMDB Response:', tmdbData);

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

export const addMovieComment = async (req, res) => {
    const userId = req.userId;
    const { movieId, comment, date } = req.body;

    try {
        await db.query('INSERT INTO public."moviecomments" (user_id, movie_id, comment, date) VALUES ($1, $2, $3, $4)', [userId, movieId, comment, date]);
        res.json({ message: 'Commentaire ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
export const getMovieComments = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'SELECT mc.id, mc.comment, mc.date, u.firstname, u.lastname, u.username, mr.rating FROM public."moviecomments" mc JOIN public.users u ON mc.user_id = u.user_id LEFT JOIN public.MovieRatings mr ON mc.user_id = mr.user_id AND mc.movie_id = mr.movie_id WHERE mc.movie_id = $1',
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

