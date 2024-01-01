import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { getUserInfos, addFavoriteMovie, removeFavoriteMovie, favoriteMovies, addOrUpdateRatingMovie, getMoviesRatings, deleteRatingMovie } from '../controllers/userController.js';

const router = express.Router();

router.get('/infos', extractUserInfo, getUserInfos);
router.get('/movies/favorites', extractUserInfo, favoriteMovies);
router.post('/movies/addfavorite', extractUserInfo, addFavoriteMovie);
router.post('/movies/removefavorite', extractUserInfo, removeFavoriteMovie);
router.get('/movies/ratings', extractUserInfo, getMoviesRatings);
router.post('/movies/addrating', extractUserInfo, addOrUpdateRatingMovie);
router.post('/movies/deleterating', extractUserInfo, deleteRatingMovie);

export default router;