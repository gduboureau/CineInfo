import express from 'express';
import { PopularSeries, AiringTodaySeries, TopRatedSeries, OnTheAirSeries, DiscoverSeries, SerieGenres } from '../controllers/serieController.js';
import seriesDetailsRoutes from './seriesDetailsRoutes.js';
import seriesSeasonsRoutes from './seriesSeasonsRoutes.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Series
 *   description: Endpoints for retrieving TV series information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TVSeries:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *         backdrop_path:
 *           type: string
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *         id:
 *           type: integer
 *         origin_country:
 *           type: array
 *           items:
 *             type: string
 *         original_language:
 *           type: string
 *         original_name:
 *           type: string
 *         overview:
 *           type: string
 *         popularity:
 *           type: number
 *         poster_path:
 *           type: string
 *         first_air_date:
 *           type: string
 *         name:
 *           type: string
 *         vote_average:
 *           type: number
 *         vote_count:
 *           type: integer
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /series/genres:
 *   get:
 *     summary: Get TV Series Genres
 *     description: Retrieve a list of TV series genres.
 *     tags: [Series]
 *     responses:
 *       200:
 *         description: Success. Returns a list of TV series genres.
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
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get('/genres', SerieGenres);

/**
 * @swagger
 * /series/popular:
 *   get:
 *     summary: Get Popular TV Series
 *     description: Retrieve a list of popular TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results.
 *     responses:
 *       200:
 *         description: Success. Returns a list of popular TV series.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/popular', PopularSeries);

/**
 * @swagger
 * /series/airing-today:
 *   get:
 *     summary: Airing Today Series
 *     description: Retrieve a list of series airing today.
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results.
 *     responses:
 *       200:
 *         description: Success. Returns a list of series airing today.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/airing-today', AiringTodaySeries);

/**
 * @swagger
 * /series/on-the-air:
 *   get:
 *     summary: On The Air Series
 *     description: Retrieve a list of series currently on the air.
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results.
 *     responses:
 *       200:
 *         description: Success. Returns a list of series currently on the air.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/on-the-air', OnTheAirSeries);

/**
 * @swagger
 * /series/top-rated:
 *   get:
 *     summary: Top Rated Series
 *     description: Retrieve a list of top-rated series.
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results.
 *     responses:
 *       200:
 *         description: Success. Returns a list of top-rated series.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/top-rated', TopRatedSeries);

/**
 * @swagger
 * /series/discover:
 *   get:
 *     summary: Discover Series
 *     description: Retrieve a list of discovered series based on specified criteria.
 *     tags: [Series]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for paginated results.
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Genres to include in the search (optional).
 *     responses:
 *       200:
 *         description: Success. Returns a list of series.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/discover', DiscoverSeries);

router.use('/:id', seriesDetailsRoutes);
router.use('/:id/season/:season', seriesSeasonsRoutes);

export default router;
