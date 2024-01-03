import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteMovie, removeFavoriteMovie, favoriteMovies, addOrUpdateRatingMovie, getMoviesRatings, deleteRatingMovie } from '../controllers/userMovieController.js';

const router = express.Router({ mergeParams: true });

router.get('/favorites', extractUserInfo, favoriteMovies);
router.post('/addfavorite', extractUserInfo, addFavoriteMovie);
router.post('/removefavorite', extractUserInfo, removeFavoriteMovie);
router.get('/ratings', extractUserInfo, getMoviesRatings);
router.post('/addrating', extractUserInfo, addOrUpdateRatingMovie);
router.post('/deleterating', extractUserInfo, deleteRatingMovie);

export default router;