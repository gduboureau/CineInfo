import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { getUserInfos, updateUserInfo } from '../controllers/userController.js';
import userMovieRoutes from './userMovieRoutes.js';
import userSerieRoutes from './userSerieRoutes.js';

const router = express.Router();

router.get('/infos', extractUserInfo, getUserInfos);
router.post('/update', extractUserInfo, updateUserInfo);

router.use('/movies', userMovieRoutes);
router.use('/series', userSerieRoutes);


export default router;