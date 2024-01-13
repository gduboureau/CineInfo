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
 * components:
 *   schemas:
 *     MovieDetailsResponse:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Indique si le film est destiné aux adultes.
 *         backdrop_path:
 *           type: string
 *           description: URL vers l'image de fond.
 *         belongs_to_collection:
 *           type: object
 *           description: Détails sur la collection à laquelle le film appartient.
 *           properties:
 *             id:
 *               type: integer
 *               description: L'ID de la collection.
 *             name:
 *               type: string
 *               description: Le nom de la collection.
 *         budget:
 *           type: integer
 *           description: Le budget du film.
 *         genres:
 *           type: array
 *           description: Liste des genres associés au film.
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'ID du genre.
 *               name:
 *                 type: string
 *                 description: Le nom du genre.
 *         homepage:
 *           type: string
 *           description: URL vers la page d'accueil du film.
 *         id:
 *           type: integer
 *           description: L'ID du film.
 *         imdb_id:
 *           type: string
 *           description: L'ID IMDb du film.
 *         original_language:
 *           type: string
 *           description: La langue originale du film.
 *         original_title:
 *           type: string
 *           description: Le titre original du film.
 *         overview:
 *           type: string
 *           description: Aperçu ou résumé du film.
 *         popularity:
 *           type: number
 *           description: Score de popularité du film.
 *         poster_path:
 *           type: string
 *           description: URL vers l'image de l'affiche.
 *         production_companies:
 *           type: array
 *           description: Liste des sociétés de production associées au film.
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'ID de la société de production.
 *               logo_path:
 *                 type: string
 *                 description: URL vers le logo de la société de production.
 *               name:
 *                 type: string
 *                 description: Le nom de la société de production.
 *               origin_country:
 *                 type: string
 *                 description: Le pays d'origine de la société de production.
 *         production_countries:
 *           type: array
 *           description: Liste des pays de production associés au film.
 *           items:
 *             type: object
 *             properties:
 *               iso_3166_1:
 *                 type: string
 *                 description: Le code ISO 3166-1 du pays.
 *               name:
 *                 type: string
 *                 description: Le nom du pays.
 *         release_date:
 *           type: string
 *           format: date
 *           description: La date de sortie du film.
 *         revenue:
 *           type: integer
 *           description: Les revenus générés par le film.
 *         runtime:
 *           type: integer
 *           description: La durée du film en minutes.
 *         spoken_languages:
 *           type: array
 *           description: Liste des langues parlées dans le film.
 *           items:
 *             type: object
 *             properties:
 *               english_name:
 *                 type: string
 *                 description: Le nom anglais de la langue.
 *               iso_639_1:
 *                 type: string
 *                 description: Le code ISO 639-1 de la langue.
 *               name:
 *                 type: string
 *                 description: Le nom de la langue.
 *         status:
 *           type: string
 *           description: Le statut du film (par exemple, "Sorti").
 *         tagline:
 *           type: string
 *           description: La phrase d'accroche du film.
 *         title:
 *           type: string
 *           description: Le titre du film.
 *         video:
 *           type: boolean
 *           description: Indique s'il y a une vidéo disponible pour le film.
 *         vote_average:
 *           type: number
 *           description: La note moyenne.
 *         vote_count:
 *           type: integer
 *           description: Le nombre total de votes.
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtenir les détails d'un film.
 *     description: Récupérer les détails d'un film en utilisant son ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: L'ID du film.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 930564
 *     responses:
 *       200:
 *         description: Détails du film récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/MovieDetailsResponse'
 *               
 *       500:
 *         description: Erreur interne du serveur.
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
 *           example: 930564
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
 *           example: 930564
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
 *           example: 930564
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
 *           example: 930564
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
 * components:
 *   schemas:
 *     MovieCommentRequest:
 *       type: object
 *       properties:
 *         movieId:
 *           type: integer
 *           description: The ID of the movie for which the comment is being added.
 *         comment:
 *           type: string
 *           description: The text of the comment.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment is made.
 */


/**
 * @swagger
 *  /movie/comments:
 *   get:
 *     summary: Get comments for a specific movie.
 *     description: Retrieve comments for a movie, including user information and ratings if available.
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: id
 *         type: integer
 *         description: The ID of the movie for which comments are requested.
 *         required: true
 * 
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the comment.
 *                   comment:
 *                     type: string
 *                     description: The text of the comment.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the comment was made.
 *                   username:
 *                     type: string
 *                     description: The username of the user who made the comment.
 *                   image:
 *                     type: string
 *                     description: The URL or path to the user's profile image.
 *                   rating:
 *                     type: integer
 *                     description: The rating given by the user for the movie (if available).
 *       500:
 *         description: Internal server error.
 */
router.get('/comments', getMovieComments);

/**
 * @swagger
 *  /movie/comments:
 *   post:
 *     summary: Add a comment to a movie.
 *     description: Add a user's comment to a specific movie.
 *     tags: [Movies]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: commentData
 *         description: The data for the comment.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/MovieCommentRequest'
 *     responses:
 *       200:
 *         description: Comment added successfully.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.post('/comments', extractUserInfo, addMovieComment);

export default router;
