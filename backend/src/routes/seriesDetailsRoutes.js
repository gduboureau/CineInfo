import express from 'express';
import { SeriesDetails, SeriesCredits, SeriesVideos, SeriesImages, SeriesRecommendations } from '../controllers/serieController.js';
import { getSerieComments, addSerieComment } from '../controllers/userSerieController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => SeriesDetails(req, res));
router.get('/credits', (req, res) => SeriesCredits(req, res));
router.get('/videos', (req, res) => SeriesVideos(req, res));
router.get('/images', (req, res) => SeriesImages(req, res));
router.get('/recommendations', (req, res) => SeriesRecommendations(req, res));
router.get('/comments', getSerieComments);
router.post('/comments', extractUserInfo, addSerieComment);

export default router;
