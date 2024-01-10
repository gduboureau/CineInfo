import express from 'express';
import { search } from '../controllers/searchController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Search
 *  description: Endpoints for search-related operations
 */

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search for movies and TV shows.
 *     description: |
 *       This endpoint allows users to search for movies and TV shows using a search term.
 *       It retrieves data from The Movie Database (TMDb) API.
 *     tags: [Search]
 *     requestBody:
 *       description: Search parameters.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchValue:
 *                 type: string
 *                 description: The search term.
 *                 example: "Berlin"
 *     responses:
 *       200:
 *         description: Search results retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: The current page number.
 *                 results:
 *                   type: array
 *                   description: Movie search results.
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *                       overview:
 *                         type: string
 *                         description: A brief overview of the movie.
 *                       release_date:
 *                         type: string
 *                         description: The release date of the movie.
 *                       poster_path:
 *                         type: string
 *                         description: The poster path of the movie.
 *                       popularity:
 *                         type: number
 *                         description: The popularity of the movie.
 *                       vote_average:
 *                         type: number
 *                         description: The average vote for the movie.
 *                       vote_count:
 *                         type: integer
 *                         description: The number of votes for the movie.
 *                       adult:
 *                         type: boolean
 *                         description: Indicates if the movie is for adults.
 *                       backdrop_path:
 *                         type: string
 *                         description: The backdrop path of the movie.
 *                       genre_ids:
 *                         type: array
 *                         description: The genre IDs associated with the movie.
 *                         items:
 *                           type: integer
 *                           description: Genre ID.
 *                       original_language:
 *                         type: string
 *                         description: The original language of the movie.
 *                       original_title:
 *                         type: string
 *                         description: The original title of the movie.
 *                       video:
 *                         type: boolean
 *                         description: Indicates if the movie has video content.
 *                 tv:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       description: The current page number.
 *                     results:
 *                       type: array
 *                       description: TV show search results.
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: The name of the TV show.
 *                           overview:
 *                             type: string
 *                             description: A brief overview of the TV show.
 *                           first_air_date:
 *                             type: string
 *                             description: The first air date of the TV show.
 *                           poster_path:
 *                             type: string
 *                             description: The poster path of the TV show.
 *                           popularity:
 *                             type: number
 *                             description: The popularity of the TV show.
 *                           vote_average:
 *                             type: number
 *                             description: The average vote for the TV show.
 *                           vote_count:
 *                             type: integer
 *                             description: The number of votes for the TV show.
 *                           adult:
 *                             type: boolean
 *                             description: Indicates if the TV show is for adults.
 *                           backdrop_path:
 *                             type: string
 *                             description: The backdrop path of the TV show.
 *                           genre_ids:
 *                             type: array
 *                             description: The genre IDs associated with the TV show.
 *                             items:
 *                               type: integer
 *                               description: Genre ID.
 *                           origin_country:
 *                             type: array
 *                             description: The origin countries of the TV show.
 *                             items:
 *                               type: string
 *                               description: Origin country code.
 *                           original_language:
 *                             type: string
 *                             description: The original language of the TV show.
 *                           original_name:
 *                             type: string
 *                             description: The original name of the TV show.
 *                           video:
 *                             type: boolean
 *                             description: Indicates if the TV show has video content.
 *       400:
 *         description: Bad request. The search term is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Le terme de recherche est manquant."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Erreur interne du serveur."
 */
router.post('/', search);

export default router;
