import express from 'express';
import { SeriesDetailsBySeason } from '../controllers/serieController.js';
import { SeriesVideosBySeason } from '../controllers/serieController.js';


const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {SeriesDetailsBySeason(req, res)});
router.get('/videos', (req, res) => {SeriesVideosBySeason(req, res)});


export default router;
