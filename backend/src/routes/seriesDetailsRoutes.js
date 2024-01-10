import express from 'express';
import { SeriesDetails, SeriesCredits, SeriesVideos, SeriesImages, SeriesRecommendations } from '../controllers/serieController.js';
import { getSerieComments, addSerieComment } from '../controllers/userSerieController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Cast:
 *       type: array
 *       description: List of cast members.
 *       items:
 *         $ref: '#/components/schemas/CastMember'
 *
 *     CastMember:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Whether the cast member is an adult.
 *         gender:
 *           type: integer
 *           description: Gender of the cast member (1 for female, 2 for male).
 *         id:
 *           type: integer
 *           description: Unique identifier for the cast member.
 *         known_for_department:
 *           type: string
 *           description: The department the cast member is known for (e.g., "Acting").
 *         name:
 *           type: string
 *           description: The name of the cast member.
 *         original_name:
 *           type: string
 *           description: The original name of the cast member.
 *         popularity:
 *           type: number
 *           description: Popularity score of the cast member.
 *         profile_path:
 *           type: string
 *           description: Path to the profile image of the cast member.
 *         roles:
 *           type: array
 *           description: List of roles played by the cast member.
 *           items:
 *             $ref: '#/components/schemas/CastRole'
 *         total_episode_count:
 *           type: integer
 *           description: Total number of episodes the cast member has participated in.
 *         order:
 *           type: integer
 *           description: Order of the cast member in the cast list.
 *
 *     CastRole:
 *       type: object
 *       properties:
 *         credit_id:
 *           type: string
 *           description: Unique identifier for the credit.
 *         character:
 *           type: string
 *           description: The character played by the cast member.
 *         episode_count:
 *           type: integer
 *           description: Number of episodes the character appears in.
  *     Crew:
 *       type: array
 *       description: List of crew members.
 *       items:
 *         $ref: '#/components/schemas/CrewMember'
 *
 *     CrewMember:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Whether the crew member is an adult.
 *         gender:
 *           type: integer
 *           description: Gender of the crew member (1 for female, 2 for male).
 *         id:
 *           type: integer
 *           description: Unique identifier for the crew member.
 *         known_for_department:
 *           type: string
 *           description: The department the crew member is known for (e.g., "Creator").
 *         name:
 *           type: string
 *           description: The name of the crew member.
 *         original_name:
 *           type: string
 *           description: The original name of the crew member.
 *         popularity:
 *           type: number
 *           description: Popularity score of the crew member.
 *         profile_path:
 *           type: string
 *           description: Path to the profile image of the crew member.
 *         credit_id:
 *           type: string
 *           description: Unique identifier for the crew member's credit.
 *         department:
 *           type: string
 *           description: The department the crew member belongs to (e.g., "Production").
 *         job:
 *           type: string
 *           description: The job/role of the crew member.
 * 
 *     TVVideoResult:
 *       type: object
 *       properties:
 *         iso_639_1:
 *           type: string
 *           description: ISO 639-1 code for the video language.
 *         iso_3166_1:
 *           type: string
 *           description: ISO 3166-1 code for the video region.
 *         name:
 *           type: string
 *           description: The name or title of the video.
 *         key:
 *           type: string
 *           description: Unique key for the video on the hosting site (e.g., YouTube).
 *         site:
 *           type: string
 *           description: Hosting site of the video (e.g., YouTube).
 *         size:
 *           type: integer
 *           description: Size or resolution of the video.
 *         type:
 *           type: string
 *           description: Type of the video (e.g., "Trailer").
 *         official:
 *           type: boolean
 *           description: Indicates whether the video is official.
 *         published_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the video was published.
 *         id:
 *           type: string
 *           description: Unique identifier for the video result.
 *     TVVideos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the set of videos.
 *         results:
 *           type: array
 *           description: List of video results.
 *           items:
 *             $ref: '#/components/schemas/TVVideoResult'
  *     TVImage:
 *       type: object
 *       properties:
 *         aspect_ratio:
 *           type: number
 *           description: Aspect ratio of the image.
 *         height:
 *           type: integer
 *           description: Height of the image.
 *         iso_639_1:
 *           type: string
 *           description: ISO 639-1 code for the image language.
 *         file_path:
 *           type: string
 *           description: Path to the image file.
 *         vote_average:
 *           type: number
 *           description: Average vote for the image.
 *         vote_count:
 *           type: integer
 *           description: Number of votes for the image.
 *         width:
 *           type: integer
 *           description: Width of the image.
 *
 *     TVImages:
 *       type: object
 *       properties:
 *         backdrops:
 *           type: array
 *           description: List of backdrop images.
 *           items:
 *             $ref: '#/components/schemas/Image'
 *         id:
 *           type: integer
 *           description: Unique identifier for the set of images.
 *         logos:
 *           type: array
 *           description: List of logo images.
 *           items:
 *             $ref: '#/components/schemas/TVImage'
 *     TVRecommendation:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Indicates if the content is for adults.
 *         backdrop_path:
 *           type: string
 *           description: Path to the backdrop image.
 *         genre_ids:
 *           type: array
 *           description: List of genre IDs associated with the content.
 *           items:
 *             type: integer
 *         id:
 *           type: integer
 *           description: Unique identifier for the content.
 *         origin_country:
 *           type: array
 *           description: List of origin countries for the content.
 *           items:
 *             type: string
 *         original_language:
 *           type: string
 *           description: Original language of the content.
 *         original_name:
 *           type: string
 *           description: Original name of the content.
 *         overview:
 *           type: string
 *           description: Overview or summary of the content.
 *         popularity:
 *           type: number
 *           description: Popularity score of the content.
 *         poster_path:
 *           type: string
 *           description: Path to the poster image.
 *         first_air_date:
 *           type: string
 *           description: Date of the first air/release.
 *         name:
 *           type: string
 *           description: Name or title of the content.
 *         vote_average:
 *           type: number
 *           description: Average vote for the content.
 *         vote_count:
 *           type: integer
 *           description: Number of votes for the content.
 *
 *     TVRecommendations:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Page number of the recommendations.
 *         results:
 *           type: array
 *           description: List of content recommendations.
 *           items:
 *             $ref: '#/components/schemas/TVRecommendation'
 *     SerieComment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the comment.
 *         comment:
 *           type: string
 *           description: The text of the comment.
 *         season:
 *           type: integer
 *           description: The season to which the comment is related.
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the comment was made.
 *         firstname:
 *           type: string
 *           description: First name of the user who made the comment.
 *         lastname:
 *           type: string
 *           description: Last name of the user who made the comment.
 *         username:
 *           type: string
 *           description: Username of the user who made the comment.
 *         rating:
 *           type: number
 *           description: The rating given by the user for the TV series.
 *     AddSerieCommentRequest:
 *       type: object
 *       properties:
 *         serieId:
 *           type: integer
 *           description: The ID of the TV series for which the comment is added.
 *         comment:
 *           type: string
 *           description: The text of the comment.
 *         season:
 *           type: integer
 *           description: The season to which the comment is related.
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the comment was made.
 */



/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Retrieve details of a TV series.
 *     description: Retrieve details of a TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       200:
 *         description: Success. Returns the TV series details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TVSeries'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', (req, res) => SeriesDetails(req, res));

/**
 * @swagger
 * /series/{id}/credits:
 *   get:
 *     summary: Get Serie Credits
 *     description: Retrieve credits of a TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       200:
 *         description: Success. Returns credits of a TV series.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cast:
 *                   $ref: '#/components/schemas/Cast'
 *                 crew:
 *                   $ref: '#/components/schemas/Crew'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/credits', (req, res) => SeriesCredits(req, res));

/**
 * @swagger
 * /series/{id}/videos:
 *   get:
 *     summary: Get Serie Videos
 *     description: Retrieve videos of a TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       200:
 *         description: Success. Returns videos of a TV series.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TVVideos'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/videos', (req, res) => SeriesVideos(req, res));

/**
 * @swagger
 * /series/{id}/images:
 *   get:
 *     summary: Get Serie Images
 *     description: Retrieve images of a TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       200:
 *         description: Success. Returns images of a TV series.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TVImages'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/images', (req, res) => SeriesImages(req, res));

/**
 * @swagger
 * /series/{id}/recommendations:
 *   get:
 *     summary: Get Serie Recommendations
 *     description: Retrieve recommendations for a TV series.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       200:
 *         description: Success. Returns recommendations for a TV series.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendations'
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/recommendations', (req, res) => SeriesRecommendations(req, res));

/**
 * @swagger
 * /series/{id}/comments:
 *   get:
 *     summary: Get comments for a TV series.
 *     description: Retrieve comments and ratings for a TV series based on its ID.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *     responses:
 *       '200':
 *         description: Successful response with an array of comments and ratings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SerieComment'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/comments', getSerieComments);

/**
 * @swagger
 * /series/{id}/comments:
 *   post:
 *     summary: Add a comment for a TV series.
 *     description: Add a comment for a TV series, requires authentication.
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddSerieCommentRequest'
 *     responses:
 *       '200':
 *         description: Successful response with a message indicating the comment was added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the comment was added successfully.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/comments', extractUserInfo, addSerieComment);

export default router;
