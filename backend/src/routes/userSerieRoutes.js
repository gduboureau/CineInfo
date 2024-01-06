import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteSerie, removeFavoriteSerie, favoriteSeries, getSeriesRatings, addOrUpdateRatingSerie, deleteRatingSerie, addSerieToWatchlist, removeSerieWatchlist, getWatchlistSeries, seenEpisodeSeries, addEpisodeRating, deleteEpisodeRating, getEpisodeRatings } from '../controllers/userSerieController.js';

const router = express.Router({ mergeParams: true });

router.get('/favorites', extractUserInfo, favoriteSeries);
router.post('/addfavorite', extractUserInfo, addFavoriteSerie);
router.post('/removefavorite', extractUserInfo, removeFavoriteSerie);
router.get('/ratings', extractUserInfo, getSeriesRatings);
router.post('/addrating', extractUserInfo, addOrUpdateRatingSerie);
router.post('/deleterating', extractUserInfo, deleteRatingSerie);
router.post('/addwatchlist', extractUserInfo, addSerieToWatchlist);
router.post('/removewatchlist', extractUserInfo, removeSerieWatchlist);
router.get('/watchlist', extractUserInfo, getWatchlistSeries);
router.post('/seen', extractUserInfo, seenEpisodeSeries);
router.post('/addepisoderating', extractUserInfo, addEpisodeRating);
router.post('/deleteepisoderating', extractUserInfo, deleteEpisodeRating);
router.get('/episoderatings', extractUserInfo, getEpisodeRatings);
export default router;