import express from 'express';
import { PopularMovies, NowPlayingMovies, UpcomingMovies, TopRatedMovies, MovieDetails, MovieCredits, MovieVideos, MovieImages, DiscoverMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', PopularMovies);
router.get('/now-playing', NowPlayingMovies);
router.get('/upcoming', UpcomingMovies);
router.get('/top-rated', TopRatedMovies);
router.get('/:id', (req, res) => MovieDetails(req, res));
router.get('/:id/credits', (req, res) => MovieCredits(req, res));
router.get('/:id/videos', (req, res) => MovieVideos(req, res));
router.get('/:id/images', (req, res) => MovieImages(req, res));
router.get('/discover', DiscoverMovies);

export default router;
