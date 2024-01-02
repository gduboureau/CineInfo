import express from 'express';
import { SeriesDetailsBySeason, SeriesCreditsBySeason, SeriesVideosBySeason, SeriesImagesBySeason } from '../controllers/serieController.js';


const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => SeriesDetailsBySeason(req, res));
router.get('/credits', (req, res) => SeriesCreditsBySeason(req, res));
router.get('/videos', (req, res) => SeriesVideosBySeason(req, res));
router.get('/images', (req, res) => SeriesImagesBySeason(req, res));

export default router;
