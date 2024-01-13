import db from '../utils/pg.js';
import { fetchSerie } from './serieController.js';

const apiKey = process.env.APIkey;
const apiToken = process.env.APItoken;

export const favoriteSeries = async (req, res) => {
    const userId = req.userId;
    let favorites = [];

    try {
        const result = await db.query('SELECT * FROM public."favoriteseries" WHERE user_id = $1', [userId]);
        const seriePromises = result.rows.map(async (favorite) => {
            const serieId = favorite.serie_id;
            try {
                const cacheKey = `serie_${serieId}`;
                const apiUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`;
                const serieDetails = await fetchSerie(cacheKey, apiUrl);
                return serieDetails;
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

const postRating = async (url, rating) => {
    const tmdbRating = rating * 2;
    try {
        const tmdbResponse = await fetch(url, {
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
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de la note :', error.message);
        throw new Error('Internal Server Error');
    }
}

export const deleteRating = async (url) => {
    try {
        const tmdbResponse = await fetch(url, {
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
    } catch (error) {
        console.error('Erreur lors de la suppression de la note :', error.message);
        throw new Error('Internal Server Error');
    }
}

export const addOrUpdateRatingSerie = async (req, res) => {
    const userId = req.userId;
    const { mediaId, rating } = req.body;

    try {
        const url = `https://api.themoviedb.org/3/tv/${mediaId}/rating?api_key=${apiKey}`;
        await postRating(url, rating);

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
        const url = `https://api.themoviedb.org/3/tv/${mediaId}/rating`;
        await deleteRating(url);

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

export const addSerieToWatchlist = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        const cacheKey = `serie_${mediaId}`;
        const apiUrl = `https://api.themoviedb.org/3/tv/${mediaId}?api_key=${apiKey}&language=fr-FR`;
        const seriesDetails = await fetchSerie(cacheKey, apiUrl);

        const seasons = seriesDetails.seasons;

        const filteredSeasons = seasons.filter(season => season.season_number !== 0);

        for (const season of filteredSeasons) {
            const cacheKey = `series_details_${mediaId}_season_${season.season_number}`;
            const apiUrl = `https://api.themoviedb.org/3/tv/${mediaId}/season/${season.season_number}?api_key=${apiKey}&language=fr-FR`;
            const seasonDetails = await fetchSerie(cacheKey, apiUrl);
            const episodes = seasonDetails.episodes;

            for (const episode of episodes) {
                await db.query('INSERT INTO public."watchlistseries"(user_id, serie_id, season, episode) VALUES($1, $2, $3, $4)',
                    [userId, mediaId, season.season_number, episode.episode_number]);
            }
        }

        res.json({ message: 'Série ajoutée à la watchlist avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la série à la watchlist:', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}


export const removeSerieWatchlist = async (req, res) => {
    const userId = req.userId;
    const { mediaId } = req.body;

    try {
        await db.query('DELETE FROM public."watchlistseries" WHERE user_id = $1 AND serie_id = $2', [userId, mediaId]);
        res.json({ message: 'Série supprimée de la watchlist' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la série de la watchlist :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getWatchlistSeries = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."watchlistseries" WHERE user_id = $1', [userId]);
        const series = await Promise.all(result.rows.map(async (row) => {
            const serieId = row.serie_id;
            const seasonNumber = row.season;
            const episodeNumber = row.episode;

            const cacheKey = `serie_${serieId}`;
            const apiUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`;

            const serieDetails = await fetchSerie(cacheKey, apiUrl);

            const cacheKeySeason = `series_details_${serieId}_season_${seasonNumber}`;
            const apiUrlSeason = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=${apiKey}&language=fr-FR`;

            const seasonDetails = await fetchSerie(cacheKeySeason, apiUrlSeason);

            const episode = seasonDetails.episodes.find(episode => episode.episode_number === episodeNumber);
            episode.seen = row.seen;

            return {
                serieId,
                serieDetails,
                seasons: [
                    {
                        seasonNumber,
                        seasonDetails,
                        episodes: [episode],
                    },
                ],
            };
        }));

        const groupedBySeries = series.reduce((acc, item) => {
            const { serieId, serieDetails, seasons } = item;
            const serieKey = String(serieId);

            if (!acc[serieKey]) {
                acc[serieKey] = {
                    serieDetails,
                    seasons,
                };
            } else {
                const existingSeries = acc[serieKey];
                const existingSeason = existingSeries.seasons.find(season => season.seasonNumber === seasons[0].seasonNumber);
                if (existingSeason) {
                    existingSeason.episodes.push(...seasons[0].episodes);
                } else {
                    existingSeries.seasons.push(...seasons);
                }
            }
            return acc;
        }, {});

        res.json(Object.values(groupedBySeries));
    } catch (error) {
        console.error('Erreur lors de la récupération de la watchlist :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const seenEpisodeSeries = async (req, res) => {
    const userId = req.userId;
    const { serieId, seasonNumber, episodeNumber, seen } = req.body;

    try {
        await db.query('UPDATE public."watchlistseries" SET seen = $1 WHERE user_id = $2 AND serie_id = $3 AND season = $4 AND episode = $5', [seen, userId, serieId, seasonNumber, episodeNumber]);
        const message = seen ? 'Episode marqué comme vu' : 'Episode marqué comme non vu';
        res.json({ message: message });
    } catch (error) {
        console.error('Erreur lors du marquage de l\'épisode comme vu ou non vu :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const addEpisodeRating = async (req, res) => {
    const userId = req.userId;
    const { serieId, seasonNumber, episodeNumber, rating } = req.body;

    try {
        const url = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${apiKey}`;
        await postRating(url, rating);

        await db.query(`
            INSERT INTO public."SeriesEpisodeRatings" (user_id, serie_id, season, episode, rating)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, serie_id, season, episode) DO UPDATE
            SET rating = EXCLUDED.rating
        `, [userId, serieId, seasonNumber, episodeNumber, rating]);

        res.json({ message: 'Note ajoutée ou mise à jour' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const deleteEpisodeRating = async (req, res) => {
    const userId = req.userId;
    const { serieId, seasonNumber, episodeNumber } = req.body;

    try {
        const url = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}/episode/${episodeNumber}/rating`;
        await deleteRating(url);

        await db.query('DELETE FROM public."SeriesEpisodeRatings" WHERE user_id = $1 AND serie_id = $2 AND season = $3 AND episode = $4', [userId, serieId, seasonNumber, episodeNumber]);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getEpisodeRatings = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."SeriesEpisodeRatings" WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};










