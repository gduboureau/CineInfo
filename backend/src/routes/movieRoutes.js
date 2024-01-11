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
 *     summary: Get movie genres.
 *     description: Get a list of movie genres.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of movie genres
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
 *     summary: Get popular movies.
 *     description: Get a list of popular movies.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of popular movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                   backdrop_path:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   id:
 *                     type: integer
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   popularity:
 *                     type: number
 *                   poster_path:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: boolean
 *                   vote_average:
 *                     type: number
 *                   vote_count:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/popular', PopularMovies);


/**
 * @swagger
 * /movies/now-playing:
 *   get:
 *     summary: Get now playing movies.
 *     description: Get a list of movies currently playing.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of now playing movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                   backdrop_path:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   id:
 *                     type: integer
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   popularity:
 *                     type: number
 *                   poster_path:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: boolean
 *                   vote_average:
 *                     type: number
 *                   vote_count:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/now-playing', NowPlayingMovies);


/**
 * @swagger
 * /movies/upcoming:
 *   get:
 *     summary: Get upcoming movies
 *     description: Get the list of upcoming movies.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of upcoming movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                   backdrop_path:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   id:
 *                     type: integer
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   popularity:
 *                     type: number
 *                   poster_path:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: boolean
 *                   vote_average:
 *                     type: number
 *                   vote_count:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/upcoming', UpcomingMovies);


/**
 * @swagger
 * /movies/top-rated:
 *   get:
 *     summary: Get top-rated movies
 *     description: Get the list of top-rated movies.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of top-rated movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                   backdrop_path:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   id:
 *                     type: integer
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   popularity:
 *                     type: number
 *                   poster_path:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: boolean
 *                   vote_average:
 *                     type: number
 *                   vote_count:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/top-rated', TopRatedMovies);


/**
 * @swagger
 * /movies/discover:
 *   get:
 *     summary: Discover movies
 *     description: Discover movies based on specified criteria.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of discovered movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                   backdrop_path:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   id:
 *                     type: integer
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   popularity:
 *                     type: number
 *                   poster_path:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: boolean
 *                   vote_average:
 *                     type: number
 *                   vote_count:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/discover', DiscoverMovies);


router.use('/:id', movieDetailsRoutes);

export default router;
