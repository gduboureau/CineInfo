import express from 'express';
import movieDetailsRoutes from './movieDetailsRoutes.js';
import { PopularMovies, NowPlayingMovies, UpcomingMovies, TopRatedMovies, DiscoverMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', PopularMovies);
router.get('/now-playing', NowPlayingMovies);
router.get('/upcoming', UpcomingMovies);
router.get('/top-rated', TopRatedMovies);
router.use('/:id', movieDetailsRoutes);
router.get('/discover', DiscoverMovies);

export default router;
