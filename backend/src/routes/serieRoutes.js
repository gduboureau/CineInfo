import express from 'express';
import { PopularSeries, AiringTodaySeries, TopRatedSeries, DiscoverSeries } from '../controllers/serieController.js';

const router = express.Router();

router.get('/popular', PopularSeries);
router.get('/airing-today', AiringTodaySeries);
router.get('/top-rated', TopRatedSeries);
router.get('/discover', DiscoverSeries);

export default router;
