import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { getUserInfos, updateUserInfo, getImageUser, updateImage } from '../controllers/userController.js';
import userMovieRoutes from './userMovieRoutes.js';
import userSerieRoutes from './userSerieRoutes.js';

const router = express.Router();

router.get('/infos', extractUserInfo, getUserInfos);
router.post('/update', extractUserInfo, updateUserInfo);
router.get('/profile-image/:username', getImageUser);
router.post('/update-image', extractUserInfo, updateImage);

router.use('/movies', userMovieRoutes);
router.use('/series', userSerieRoutes);


export default router;