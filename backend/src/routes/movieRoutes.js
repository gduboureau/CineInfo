import express from 'express';
import movieDetailsRoutes from './movieDetailsRoutes.js';
import { PopularMovies, NowPlayingMovies, UpcomingMovies, TopRatedMovies, DiscoverMovies, MovieGenres } from '../controllers/movieController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints for movie-related operations
 */

/**
 * @swagger
 * /movies/genres:
 *   get:
 *     summary: Get movie genres
 *     description: Get the list of movie genres.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *     500:
 *       description: Internal server error
 */

router.get('/genres', MovieGenres);

/**
 * @swagger
 * /movies/popular:
 *   get:
 *     summary: Get popular movies
 *     description: Get the list of popular movies.
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // ... (Define properties for the movie object)
 *       500:
 *         description: Internal server error
 */
router.get('/popular', PopularMovies);
router.get('/now-playing', NowPlayingMovies);
router.get('/upcoming', UpcomingMovies);
router.get('/top-rated', TopRatedMovies);
router.get('/discover', DiscoverMovies);
router.use('/:id', movieDetailsRoutes);

export default router;
