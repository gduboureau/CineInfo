import express from 'express';
import { PopularSeries, AiringTodaySeries, TopRatedSeries, DiscoverSeries, SerieGenres, SeriesDetails, SeriesRecommendations } from '../controllers/serieController.js';
import seriesDetailsRoutes from './seriesDetailsRoutes.js';
const router = express.Router();

router.get('/genres', SerieGenres);
router.get('/popular', PopularSeries);
router.get('/airing-today', AiringTodaySeries);
router.get('/top-rated', TopRatedSeries);
router.get('/discover', DiscoverSeries);
router.use('/:id/&:season', seriesDetailsRoutes);
router.get('/:id/', (req, res) => SeriesDetails(req, res));
router.get('/:id/recommendations', (req, res) => SeriesRecommendations(req, res));

export default router;
