import express from 'express';
import { MovieDetails, MovieCredits, MovieVideos, MovieImages, MovieRecommendations } from '../controllers/movieController.js';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => MovieDetails(req, res));
router.get('/credits', (req, res) => MovieCredits(req, res));
router.get('/videos', (req, res) => MovieVideos(req, res));
router.get('/images', (req, res) => MovieImages(req, res));
router.get('/recommendations', (req, res) => MovieRecommendations(req, res));

export default router;
