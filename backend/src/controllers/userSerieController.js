import db from '../utils/pg.js';
import { fetchSerie } from './serieController.js';

const apiKey = '7f0799a761376830477332b8577e17fe';
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjA3OTlhNzYxMzc2ODMwNDc3MzMyYjg1NzdlMTdmZSIsInN1YiI6IjY1NjlhYjRkZDA0ZDFhMDBlY2ZhOTFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dg7J1QNfiLW7bGCLaFo6Fz8CcwU-HABY89b7Ac_emNw';

export const favoriteSeries = async (req, res) => {
    const userId = req.userId;
    let favorites = [];

    try {
        const result = await db.query('SELECT * FROM public."favoriteseries" WHERE user_id = $1', [userId]);
        const seriePromises = result.rows.map(async (favorite) => {
            const serieId = favorite.serie_id;
            try {
                const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`);
                const serie = await tmdbResponse.json();
                return serie;
            } catch (error) {
                console.error(`Error fetching serie details:`, error);
                return null;
            }
        });
        favorites = await Promise.all(seriePromises);
        favorites = favorites.filter(serie => serie !== null);
        res.json(favorites);
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const addFavoriteSerie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('INSERT INTO public."favoriteseries" (user_id, serie_id) VALUES ($1, $2)', [userId, mediaId]);
        res.json({ message: 'Favori ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const removeFavoriteSerie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('DELETE FROM public."favoriteseries" WHERE user_id = $1 AND serie_id = $2', [userId, mediaId]);
        res.json({ message: 'Favori supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression du favori :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const addOrUpdateRatingSerie = async (req, res) => {
    const userId = req.userId;
    const { mediaId, rating } = req.body;

    const tmdbRating = rating * 2;

    try {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/rating?api_key=${apiKey}`, {
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
            INSERT INTO public."serieratings" (user_id, serie_id, rating)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, serie_id) DO UPDATE
            SET rating = EXCLUDED.rating
        `, [userId, mediaId, rating]);

        res.json({ message: 'Note ajoutée ou mise à jour' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const deleteRatingSerie = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/rating`, {
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

        await db.query('DELETE FROM public."serieratings" WHERE user_id = $1 AND serie_id = $2', [userId, mediaId]);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getSeriesRatings = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."serieratings" WHERE user_id = $1', [userId]);
        const seriesWithRatings = await Promise.all(result.rows.map(async (row) => {
            const serieId = row.serie_id;
            const cacheKey = `serie_${serieId}`;
            const apiUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`;
            const serieDetails = await fetchSerie(cacheKey, apiUrl);
            return { ...serieDetails, rating: row.rating };
        }));

        res.json(seriesWithRatings);
    } catch (error) {
        console.error('Erreur lors de la récupération de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const addSerieComment = async (req, res) => {
    const userId = req.userId;
    const { serieId, comment, season, date } = req.body;

    try {
        await db.query('INSERT INTO public."seriecomments" (user_id, serie_id, comment, season, date) VALUES ($1, $2, $3, $4, $5)', [userId, serieId, comment, season, date]);
        res.json({ message: 'Commentaire ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
export const getSerieComments = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'SELECT mc.id, mc.comment, mc.season, mc.date, u.firstname, u.lastname, u.username, mr.rating FROM public."seriecomments" mc JOIN public.users u ON mc.user_id = u.user_id LEFT JOIN public.SerieRatings mr ON mc.user_id = mr.user_id AND mc.serie_id = mr.serie_id WHERE mc.serie_id = $1',
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
