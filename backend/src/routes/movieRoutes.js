import express from 'express';
import { PopularMovies, NowPlayingMovies, UpcomingMovies, TopRatedMovies, DiscoverMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', PopularMovies);
router.get('/now-playing', NowPlayingMovies);
router.get('/upcoming', UpcomingMovies);
router.get('/top-rated', TopRatedMovies);
router.get('/discover', DiscoverMovies);

export default router;
