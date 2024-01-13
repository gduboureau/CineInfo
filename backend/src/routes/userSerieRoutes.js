import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { addFavoriteSerie, removeFavoriteSerie, favoriteSeries, getSeriesRatings, addOrUpdateRatingSerie, deleteRatingSerie, addSerieToWatchlist, removeSerieWatchlist, getWatchlistSeries, seenEpisodeSeries, addEpisodeRating, deleteEpisodeRating, getEpisodeRatings } from '../controllers/userSerieController.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /user/series/favorites:
 *   get:
 *     summary: Get the user's favorite series.
 *     description: Retrieve the list of series added to the user's favorites.
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
 *         description: Favorite series retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVSeries'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get('/favorites', extractUserInfo, favoriteSeries);

/**
 * @swagger
 * /user/series/addfavorite:
 *   post:
 *     summary: Add a series to the user's favorites.
 *     description: Add a series to the user's favorite list.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID of the series to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be added.
 *     responses:
 *       200:
 *         description: Series successfully added to favorites.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/addfavorite', extractUserInfo, addFavoriteSerie);

/**
 * @swagger
 * /user/series/removefavorite:
 *   delete:
 *     summary: Remove a series from the user's favorites.
 *     description: Remove a series from the user's favorite list.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID of the series to be removed.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be removed.
 *     responses:
 *       200:
 *         description: Series successfully removed from favorites.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.delete('/removefavorite', extractUserInfo, removeFavoriteSerie);

/**
 * @swagger
 * /user/series/ratings:
 *   get:
 *     summary: Get ratings for series by the user.
 *     description: Retrieve the ratings given by the user to different series.
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
 *         description: Ratings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                     description: Indicates if the series is for adults.
 *                   backdrop_path:
 *                     type: string
 *                     description: The backdrop path of the series.
 *                   genre_ids:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     description: The genre IDs associated with the series.
 *                   id:
 *                     type: integer
 *                     description: The ID of the series.
 *                   original_language:
 *                     type: string
 *                     description: The original language of the series.
 *                   original_title:
 *                     type: string
 *                     description: The original title of the series.
 *                   overview:
 *                     type: string
 *                     description: A brief overview of the series.
 *                   popularity:
 *                     type: number
 *                     description: The popularity of the series.
 *                   poster_path:
 *                     type: string
 *                     description: The poster path of the series.
 *                   release_date:
 *                     type: string
 *                     description: The release date of the series.
 *                   title:
 *                     type: string
 *                     description: The title of the series.
 *                   video:
 *                     type: boolean
 *                     description: Indicates if the series has video content.
 *                   vote_average:
 *                     type: number
 *                     description: The average vote for the series.
 *                   vote_count:
 *                     type: integer
 *                     description: The number of votes for the series.
 *                   rating:
 *                     type: number
 *                     format: decimal
 *                     description: The rating given by the user (out of 5).
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get('/ratings', extractUserInfo, getSeriesRatings);

/**
 * @swagger
 * /user/series/addrating:
 *   post:
 *     summary: Add or update a series rating for the user.
 *     description: Add or update the rating for a series by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID and rating of the series to be rated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be rated.
 *               rating:
 *                 type: number
 *                 description: The rating given by the user (out of 5).
 *     responses:
 *       200:
 *         description: Rating successfully added or updated.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/addrating', extractUserInfo, addOrUpdateRatingSerie);

/**
 * @swagger
 * /user/series/deleterating:
 *   delete:
 *     summary: Delete a series rating for the user.
 *     description: Delete the rating for a series by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID of the series to be rated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be rated.
 *     responses:
 *       200:
 *         description: Rating successfully deleted.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.delete('/deleterating', extractUserInfo, deleteRatingSerie);

/**
 * @swagger
 * /user/series/addwatchlist:
 *   post:
 *     summary: Add a series to the user's watchlist.
 *     description: Add a series to the user's watchlist, including all its seasons and episodes.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID of the series to be added to the watchlist.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be added to the watchlist.
 *     responses:
 *       200:
 *         description: Series successfully added to the watchlist.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/addwatchlist', extractUserInfo, addSerieToWatchlist);

/**
 * @swagger
 * /user/series/removewatchlist:
 *   delete:
 *     summary: Remove a series from the user's watchlist.
 *     description: Remove a series from the user's watchlist, including all its seasons and episodes.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID of the series to be removed from the watchlist.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *                 description: The ID of the series to be removed from the watchlist.
 *     responses:
 *       200:
 *         description: Series successfully removed from the watchlist.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.delete('/removewatchlist', extractUserInfo, removeSerieWatchlist);

/**
 * @swagger
 * /user/series/watchlist:
 *   get:
 *     summary: Get the user's watchlist.
 *     description: Retrieve the series added to the user's watchlist, including details about each series, seasons, and episodes.
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
 *         description: Watchlist retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   serieDetails:
 *                     $ref: '#/components/schemas/TVSeries'
 *                   seasons:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         seasonNumber:
 *                           type: integer
 *                           description: The season number.
 *                         seasonDetails:
 *                           type: object
 *                           properties: # <-- Corrected indentation
 *                             _id:
 *                               type: string
 *                             air_date:
 *                               type: string
 *                             episodes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   air_date:
 *                                     type: string
 *                                   episode_number:
 *                                     type: integer
 *                                     description: The episode number.
 *                                   episode_type:
 *                                     type: string
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                                   overview:
 *                                     type: string
 *                                   production_code:
 *                                     type: string
 *                                   runtime:
 *                                     type: integer
 *                                   season_number:
 *                                     type: integer
 *                                   show_id:
 *                                     type: integer
 *                                   still_path:
 *                                     type: string
 *                                   vote_average:
 *                                     type: number
 *                                   vote_count:
 *                                     type: integer
 *                                   crew:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         job:
 *                                           type: string
 *                                         department:
 *                                           type: string
 *                                         credit_id:
 *                                           type: string
 *                                         adult:
 *                                           type: boolean
 *                                         gender:
 *                                           type: integer
 *                                         id:
 *                                           type: integer
 *                                         known_for_department:
 *                                           type: string
 *                                         name:
 *                                           type: string
 *                                         original_name:
 *                                           type: string
 *                                         popularity:
 *                                           type: number
 *                                         profile_path:
 *                                           type: string
 *                                   guest_stars:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         character:
 *                                           type: string
 *                                         credit_id:
 *                                           type: string
 *                                         order:
 *                                           type: integer
 *                                         adult:
 *                                           type: boolean
 *                                         gender:
 *                                           type: integer
 *                                         id:
 *                                           type: integer
 *                                         known_for_department:
 *                                           type: string
 *                                         name:
 *                                           type: string
 *                                         original_name:
 *                                           type: string
 *                                         popularity:
 *                                           type: number
 *                                         profile_path:
 *                                           type: string
 *                         episodes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   air_date:
 *                                     type: string
 *                                   episode_number:
 *                                     type: integer
 *                                     description: The episode number.
 *                                   episode_type:
 *                                     type: string
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                                   overview:
 *                                     type: string
 *                                   production_code:
 *                                     type: string
 *                                   runtime:
 *                                     type: integer
 *                                   season_number:
 *                                     type: integer
 *                                   show_id:
 *                                     type: integer
 *                                   still_path:
 *                                     type: string
 *                                   vote_average:
 *                                     type: number
 *                                   vote_count:
 *                                     type: integer
 *                                   crew:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         job:
 *                                           type: string
 *                                         department:
 *                                           type: string
 *                                         credit_id:
 *                                           type: string
 *                                         adult:
 *                                           type: boolean
 *                                         gender:
 *                                           type: integer
 *                                         id:
 *                                           type: integer
 *                                         known_for_department:
 *                                           type: string
 *                                         name:
 *                                           type: string
 *                                         original_name:
 *                                           type: string
 *                                         popularity:
 *                                           type: number
 *                                         profile_path:
 *                                           type: string
 *                                   guest_stars:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         character:
 *                                           type: string
 *                                         credit_id:
 *                                           type: string
 *                                         order:
 *                                           type: integer
 *                                         adult:
 *                                           type: boolean
 *                                         gender:
 *                                           type: integer
 *                                         id:
 *                                           type: integer
 *                                         known_for_department:
 *                                           type: string
 *                                         name:
 *                                           type: string
 *                                         original_name:
 *                                           type: string
 *                                         popularity:
 *                                           type: number
 *                                         profile_path:
 *                                           type: string
 *                                         seen:
 *                                          type: boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get('/watchlist', extractUserInfo, getWatchlistSeries);

/**
 * @swagger
 * /user/series/seen:
 *   post:
 *     summary: Mark an episode as seen or unseen for the user.
 *     description: Mark a specific episode of a series as seen or unseen by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID, season number, episode number, and seen status of the episode.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serieId:
 *                 type: integer
 *                 description: The ID of the series containing the episode.
 *               seasonNumber:
 *                 type: integer
 *                 description: The season number of the episode.
 *               episodeNumber:
 *                 type: integer
 *                 description: The episode number to be marked as seen or unseen.
 *               seen:
 *                 type: boolean
 *                 description: The status indicating whether the episode is seen (true) or unseen (false).
 *     responses:
 *       200:
 *         description: Episode marked as seen or unseen successfully.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/seen', extractUserInfo, seenEpisodeSeries);

/**
 * @swagger
 * /user/series/addepisoderating:
 *   post:
 *     summary: Add or update an episode rating for the user.
 *     description: Add or update the rating for a specific episode of a series by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID, season number, episode number, and rating of the episode to be rated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serieId:
 *                 type: integer
 *                 description: The ID of the series containing the episode.
 *               seasonNumber:
 *                 type: integer
 *                 description: The season number of the episode.
 *               episodeNumber:
 *                 type: integer
 *                 description: The episode number to be rated.
 *               rating:
 *                 type: number
 *                 description: The rating given by the user (out of 5).
 *     responses:
 *       200:
 *         description: Episode rating successfully added or updated.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/addepisoderating', extractUserInfo, addEpisodeRating);

/**
 * @swagger
 * /user/series/deleteepisoderating:
 *   delete:
 *     summary: Delete an episode rating for the user.
 *     description: Delete the rating for a specific episode of a series by the user.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Media ID, season number, and episode number of the episode to be unrated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serieId:
 *                 type: integer
 *                 description: The ID of the series containing the episode.
 *               seasonNumber:
 *                 type: integer
 *                 description: The season number of the episode.
 *               episodeNumber:
 *                 type: integer
 *                 description: The episode number to be unrated.
 *     responses:
 *       200:
 *         description: Episode rating successfully deleted.
*       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.delete('/deleteepisoderating', extractUserInfo, deleteEpisodeRating);

/**
 * @swagger
 * /user/series/episoderatings:
 *   get:
 *     summary: Get ratings for episodes by the user.
 *     description: Retrieve the ratings given by the user to different episodes.
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
 *         description: Ratings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: The unique identifier for the episode rating.
 *                   serie_id:
 *                     type: integer
 *                     description: The ID of the series containing the episode.
 *                   season:
 *                     type: integer
 *                     description: The season number of the episode.
 *                   episode:
 *                     type: integer
 *                     description: The episode number.
 *                   rating:
 *                     type: number
 *                     format: decimal
 *                     description: The rating given by the user (out of 5).
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get('/episoderatings', extractUserInfo, getEpisodeRatings);

export default router;