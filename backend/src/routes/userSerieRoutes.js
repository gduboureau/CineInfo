import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteSerie, removeFavoriteSerie, favoriteSeries, getSeriesRatings, addOrUpdateRatingSerie, deleteRatingSerie} from '../controllers/userSerieController.js';

const router = express.Router({ mergeParams: true });

router.get('/favorites', extractUserInfo, favoriteSeries);
router.post('/addfavorite', extractUserInfo, addFavoriteSerie);
router.post('/removefavorite', extractUserInfo, removeFavoriteSerie);
router.get('/ratings', extractUserInfo, getSeriesRatings);
router.post('/addrating', extractUserInfo, addOrUpdateRatingSerie);
router.post('/deleterating', extractUserInfo, deleteRatingSerie);


export default router;