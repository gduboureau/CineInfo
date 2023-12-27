import express from 'express';
import authRoutes from './authRoutes.js';
import movieRoutes from './movieRoutes.js';
import searchRoutes from './searchRoutes.js';
import serieRoutes from './serieRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/search', searchRoutes);
router.use('/series', serieRoutes);
router.use('/user', userRoutes);


export default router;
