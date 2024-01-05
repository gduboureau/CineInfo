import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteMovie, removeFavoriteMovie, favoriteMovies, addOrUpdateRatingMovie, getMoviesRatings, deleteRatingMovie, watchlistMovies, addMovieWatchlist, removeMovieWatchlist, seenMovie } from '../controllers/userMovieController.js';
import e from 'express';

const router = express.Router({ mergeParams: true });

router.get('/favorites', extractUserInfo, favoriteMovies);
router.post('/addfavorite', extractUserInfo, addFavoriteMovie);
router.post('/removefavorite', extractUserInfo, removeFavoriteMovie);
router.get('/ratings', extractUserInfo, getMoviesRatings);
router.post('/addrating', extractUserInfo, addOrUpdateRatingMovie);
router.post('/deleterating', extractUserInfo, deleteRatingMovie);
router.get('/watchlist', extractUserInfo, watchlistMovies);
router.post('/addwatchlist', extractUserInfo, addMovieWatchlist);
router.post('/removewatchlist', extractUserInfo, removeMovieWatchlist);
router.post('/seen', extractUserInfo, seenMovie);

export default router;