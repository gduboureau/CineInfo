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

            const cacheKeySeason = `serie_${serieId}_season_${seasonNumber}`;
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
    const tmdbRating = rating * 2;

    try {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${apiKey}`, {
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
            INSERT INTO public."episoderatings" (user_id, serie_id, season, episode, rating)
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
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating`, {
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
        await db.query('DELETE FROM public."episoderatings" WHERE user_id = $1 AND serie_id = $2 AND season = $3 AND episode = $4', [userId, serieId, seasonNumber, episodeNumber]);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getEpisodeRatings = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."episoderatings" WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération de la note :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};










