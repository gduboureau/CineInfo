import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteMovie, removeFavoriteMovie, favoriteMovies, addOrUpdateRatingMovie, getMoviesRatings, deleteRatingMovie, watchlistMovies, addMovieWatchlist, removeMovieWatchlist, seenMovie } from '../controllers/userMovieController.js';

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
 * /user/movies/addfavorite:
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
 * /user/movies/removefavorite:
 *   delete:
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

router.delete('/removefavorite', extractUserInfo, removeFavoriteMovie);


/**
 * @swagger
 * /user/movies/ratings:
 *   get:
 *     summary: Get user movie ratings.
 *     description: Retrieve the list of movies rated by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of user movie ratings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: integer
 *                     description: The ID of the movie.
 *                   title:
 *                     type: string
 *                     description: The title of the movie.
 *                   rating:
 *                     type: number
 *                     description: The rating given by the user.
 *                   adult:
 *                     type: boolean
 *                     description: Indicates if the movie is for adults.
 *                   backdrop_path:
 *                     type: string
 *                     description: The backdrop path of the movie.
 *                   genres:
 *                     type: array
 *                     description: The genres of the movie.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                   budget:
 *                     type: integer
 *                     description: The budget of the movie.
 *                   homepage:
 *                     type: string
 *                     description: The movie's homepage URL.
 *                   imdb_id:
 *                     type: string
 *                     description: The IMDb ID of the movie.
 *                   original_language:
 *                     type: string
 *                     description: The original language of the movie.
 *                   original_title:
 *                     type: string
 *                     description: The original title of the movie.
 *                   overview:
 *                     type: string
 *                     description: The movie's description.
 *                   popularity:
 *                     type: number
 *                     description: The popularity of the movie.
 *                   poster_path:
 *                     type: string
 *                     description: The poster path of the movie.
 *                   production_companies:
 *                     type: array
 *                     description: The production companies of the movie.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         logo_path:
 *                           type: string
 *                         name:
 *                           type: string
 *                         origin_country:
 *                           type: string
 *                   production_countries:
 *                     type: array
 *                     description: The production countries of the movie.
 *                     items:
 *                       type: object
 *                       properties:
 *                         iso_3166_1:
 *                           type: string
 *                         name:
 *                           type: string
 *                   release_date:
 *                     type: string
 *                     description: The release date of the movie.
 *                   revenue:
 *                     type: integer
 *                     description: The revenue of the movie.
 *                   runtime:
 *                     type: integer
 *                     description: The duration of the movie in minutes.
 *                   spoken_languages:
 *                     type: array
 *                     description: The spoken languages in the movie.
 *                     items:
 *                       type: object
 *                       properties:
 *                         english_name:
 *                           type: string
 *                         iso_639_1:
 *                           type: string
 *                         name:
 *                           type: string
 *                   status:
 *                     type: string
 *                     description: The release status of the movie.
 *                   tagline:
 *                     type: string
 *                     description: The tagline of the movie.
 *                   video:
 *                     type: boolean
 *                     description: Indicates if the movie has an associated video.
 *                   vote_average:
 *                     type: number
 *                     description: The average votes for the movie.
 *                   vote_count:
 *                     type: integer
 *                     description: The total number of votes for the movie.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/ratings', extractUserInfo, getMoviesRatings);

/**
 * @swagger
 * /user/movies/addrating:
 *   post:
 *     summary: Add or update a movie rating by the user.
 *     description: Add or update a movie rating by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token for authentication. Include the word 'Bearer' followed by the token.
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
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the movie to be rated.
 *               rating:
 *                 type: number
 *                 description: The rating given by the user.
 *             required:
 *               - mediaId
 *               - rating
 *     responses:
 *       200:
 *         description: Rating added or updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/addrating', extractUserInfo, addOrUpdateRatingMovie);

/**
 * @swagger
 * /user/movies/deleterating:
 *   delete:
 *     summary: Delete a movie rating by the user.
 *     description: Delete a movie rating by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token for authentication. Include the word 'Bearer' followed by the token.
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
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the movie whose rating should be deleted.
 *             required:
 *               - mediaId
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleterating', extractUserInfo, deleteRatingMovie);

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
 * /user/movies/addwatchlist:
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
 * /user/movies/removewatchlist:
 *   delete:
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

router.delete('/removewatchlist', extractUserInfo, removeMovieWatchlist);

/**
 * @swagger
 * /user/movies/seen:
 *   post:
 *     summary: Mark a movie as seen or unseen by the user.
 *     description: Mark a movie as seen or unseen by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token for authentication. Include the word 'Bearer' followed by the token.
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
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the movie to be marked as seen or unseen.
 *               seen:
 *                 type: boolean
 *                 description: A boolean indicating whether the movie is seen or not.
 *             required:
 *               - mediaId
 *               - seen
 *     responses:
 *       200:
 *         description: Movie marked as seen or unseen successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/seen', extractUserInfo, seenMovie);


export default router;