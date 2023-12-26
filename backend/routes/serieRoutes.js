import express from 'express';
import { PopularSeries, AiringTodaySeries, TopRatedSeries } from '../src/controllers/serieController.js';

const router = express.Router();

router.get('/popular', PopularSeries);
router.get('/airing-today', AiringTodaySeries);
router.get('/top-rated', TopRatedSeries);

export default router;
