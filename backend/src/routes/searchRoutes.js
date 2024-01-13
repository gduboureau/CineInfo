import express from 'express';
import { search } from '../controllers/searchController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Indicates if the movie is for adults.
 *         backdrop_path:
 *           type: string
 *           description: The backdrop path of the movie.
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *           description: The genre IDs associated with the movie.
 *         id:
 *           type: integer
 *           description: The ID of the movie.
 *         original_language:
 *           type: string
 *           description: The original language of the movie.
 *         original_title:
 *           type: string
 *           description: The original title of the movie.
 *         overview:
 *           type: string
 *           description: A brief overview of the movie.
 *         popularity:
 *           type: number
 *           description: The popularity of the movie.
 *         poster_path:
 *           type: string
 *           description: The poster path of the movie.
 *         release_date:
 *           type: string
 *           description: The release date of the movie.
 *         title:
 *           type: string
 *           description: The title of the movie.
 *         video:
 *           type: boolean
 *           description: Indicates if the movie has video content.
 *         vote_average:
 *           type: number
 *           description: The average vote for the movie.
 *         vote_count:
 *           type: integer
 *           description: The number of votes for the movie.
 *
 * @swagger
 * tags:
 *   name: Search
 *   description: Endpoints for search-related operations
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
 *                 movies:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       description: The current page number.
 *                     results:
 *                       type: array
 *                       description: Movie search results.
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
 *                 series:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       description: The current page number.
 *                     results:
 *                       type: array
 *                       description: Series search results.
 *                       items:
 *                         $ref: '#/components/schemas/TVSeries'
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
