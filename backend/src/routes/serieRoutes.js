import express from 'express';
import { PopularSeries, AiringTodaySeries, TopRatedSeries, DiscoverSeries, SerieGenres } from '../controllers/serieController.js';
import seriesDetailsRoutes from './seriesDetailsRoutes.js';
import seriesSeasonsRoutes from './seriesSeasonsRoutes.js';
const router = express.Router();

router.get('/genres', SerieGenres);
router.get('/popular', PopularSeries);
router.get('/airing-today', AiringTodaySeries);
router.get('/top-rated', TopRatedSeries);
router.get('/discover', DiscoverSeries);
router.use('/:id', seriesDetailsRoutes);
router.use('/:id/season/:season', seriesSeasonsRoutes);

export default router;
