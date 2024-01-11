import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteMovie, removeFavoriteMovie, favoriteMovies, addOrUpdateRatingMovie, getMoviesRatings, deleteRatingMovie, watchlistMovies, addMovieWatchlist, removeMovieWatchlist, seenMovie } from '../controllers/userMovieController.js';
import e from 'express';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /user/movies/favorites:
 *   get:
 *     summary: Get user's favorite movies.
 *     description: Retrieve a list of user's favorite movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of favorite movies
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/favorites', extractUserInfo, favoriteMovies);


/**
 * @swagger
 * /user/movie/addfavorite:
 *   post:
 *     summary: Add a movie to user's favorites.
 *     description: Add a movie to the list of user's favorite movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 description: The ID of the movie to be added to favorites.
 *             required:
 *               - movie_id
 *     responses:
 *       200:
 *         description: Successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/addfavorite', extractUserInfo, addFavoriteMovie);


/**
 * @swagger
 * /user/movie/removefavorite:
 *   post:
 *     summary: Remove a movie from user's favorites.
 *     description: Remove a movie from the list of user's favorite movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 description: The ID of the movie to be removed from favorites.
 *             required:
 *               - movie_id
 *     responses:
 *       200:
 *         description: Successful removal from favorites
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/removefavorite', extractUserInfo, removeFavoriteMovie);


/**
 * @swagger
 * /user/movies/ratings:
 *   get:
 *     summary: Get user's ratings movies.
 *     description: Retrieve a list of user's ratings movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of ratings movies
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/ratings', extractUserInfo, getMoviesRatings);



router.post('/addrating', extractUserInfo, addOrUpdateRatingMovie);
router.post('/deleterating', extractUserInfo, deleteRatingMovie);


/**
 * @swagger
 * /user/movies/watchlist:
 *   get:
 *     summary: Get user's watchlist movies.
 *     description: Retrieve a list of user's watchlist movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of watchlist movies
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/watchlist', extractUserInfo, watchlistMovies);


/**
 * @swagger
 * /user/movie/addwatchlist:
 *   post:
 *     summary: Add a movie to user's watchlist.
 *     description: Add a movie to the list of user's watchlist movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 description: The ID of the movie to be added to watchlist.
 *             required:
 *               - movie_id
 *     responses:
 *       200:
 *         description: Successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/addwatchlist', extractUserInfo, addMovieWatchlist);


/**
 * @swagger
 * /user/movie/removewatchlist:
 *   post:
 *     summary: Remove a movie from user's watchlist.
 *     description: Remove a movie from the list of user's watchlist movies.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 description: The ID of the movie to be removed from watchlist.
 *             required:
 *               - movie_id
 *     responses:
 *       200:
 *         description: Successful removal from watchlist
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/removewatchlist', extractUserInfo, removeMovieWatchlist);



router.post('/seen', extractUserInfo, seenMovie);

export default router;