import express from 'express';
import { MovieDetails, MovieCredits, MovieVideos, MovieImages, MovieRecommendations } from '../controllers/movieController.js';
import { getMovieComments, addMovieComment } from '../controllers/userMovieController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints for movie-related operations
 */

router.get('/', (req, res) => MovieDetails(req, res));


/**
 * @swagger
 * /movies/{id}/credits:
 *   get:
 *     summary: Get credits for a movie
 *     description: Get credits information for a movie, including cast and crew.
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Successful retrieval of movie credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cast:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       adult:
 *                         type: boolean
 *                       gender:
 *                         type: integer
 *                       id:
 *                         type: integer
 *                       known_for_department:
 *                         type: string
 *                       name:
 *                         type: string
 *                       original_name:
 *                         type: string
 *                       popularity:
 *                         type: number
 *                       profile_path:
 *                         type: string
 *                       cast_id:
 *                         type: integer
 *                       character:
 *                         type: string
 *                       credit_id:
 *                         type: string
 *                       order:
 *                         type: integer
 *                 crew:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       adult:
 *                         type: boolean
 *                       gender:
 *                         type: integer
 *                       id:
 *                         type: integer
 *                       known_for_department:
 *                         type: string
 *                       name:
 *                         type: string
 *                       original_name:
 *                         type: string
 *                       popularity:
 *                         type: number
 *                       profile_path:
 *                         type: string
 *                       credit_id:
 *                         type: string
 *                       department:
 *                         type: string
 *                       job:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

router.get('/credits', (req, res) => MovieCredits(req, res));


/**
 * @swagger
 * /movies/{id}/videos:
 *   get:
 *     summary: Get videos for a movie
 *     description: Get videos (Trailer) associated with a movie.
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Successful retrieval of movie trailers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       iso_639_1:
 *                         type: string
 *                       iso_3166_1:
 *                         type: string
 *                       name:
 *                         type: string
 *                       key:
 *                         type: string
 *                       site:
 *                         type: string
 *                       size:
 *                         type: integer
 *                       type:
 *                         type: string
 *                       official:
 *                         type: boolean
 *                       published_at:
 *                         type: string
 *                       id:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

router.get('/videos', (req, res) => MovieVideos(req, res));


/**
 * @swagger
 * /movies/{id}/images:
 *   get:
 *     summary: Get images for a movie.
 *     description: Get images associated with a movie like posters, backdrops, cover, etc.
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Successful retrieval of movie images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 backdrops:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       aspect_ratio:
 *                         type: number
 *                       height:
 *                         type: integer
 *                       iso_639_1:
 *                         type: string
 *                       file_path:
 *                         type: string
 *                       vote_average:
 *                         type: number
 *                       vote_count:
 *                         type: integer
 *                       width:
 *                         type: integer
 *                 logos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       aspect_ratio:
 *                         type: number
 *                       height:
 *                         type: integer
 *                       iso_639_1:
 *                         type: string
 *                       file_path:
 *                         type: string
 *                       vote_average:
 *                         type: number
 *                       vote_count:
 *                         type: integer
 *                       width:
 *                         type: integer
 *                 posters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       aspect_ratio:
 *                         type: number
 *                       height:
 *                         type: integer
 *                       iso_639_1:
 *                         type: string
 *                       file_path:
 *                         type: string
 *                       vote_average:
 *                         type: number
 *                       vote_count:
 *                         type: integer
 *                       width:
 *                         type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/images', (req, res) => MovieImages(req, res));


/**
 * @swagger
 * /movies/{id}/recommendations:
 *   get:
 *     summary: Get movie recommendations
 *     description: Get movie recommendations based on the provided movie ID.
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Successful retrieval of movie recommendations
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
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   original_language:
 *                     type: string
 *                   original_title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   poster_path:
 *                     type: string
 *                   media_type:
 *                     type: string
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   popularity:
 *                     type: number
 *                   release_date:
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

router.get('/recommendations', (req, res) => MovieRecommendations(req, res));


/**
 * @swagger
 * /movies/comments:
 *   get:
 *     summary: Get comments for a movie
 *     description: Get comments associated with a movie.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful retrieval of movie comments
 *       500:
 *         description: Internal server error
 */

router.get('/comments', getMovieComments);


/**
 * @swagger
 * /movies/comments:
 *   post:
 *     summary: Add a comment to a movie
 *     description: Add a new comment to a movie.
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment to be added
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       500:
 *         description: Internal server error
 */

router.post('/comments', extractUserInfo, addMovieComment);


export default router;
