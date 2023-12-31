import express from 'express';
import { getUserInfos, addFavorite, removeFavorite, getAllFavorites } from '../controllers/userController.js';

const router = express.Router();

router.get('/infos', getUserInfos);
router.get('/favorites', getAllFavorites);
router.post('/addfavorite', addFavorite);
router.post('/removefavorite', removeFavorite);

export default router;