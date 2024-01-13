import express from 'express';
import { SeriesDetailsBySeason } from '../controllers/serieController.js';
import { SeriesVideosBySeason } from '../controllers/serieController.js';
import { addSerieComment } from '../controllers/userSerieController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /series/{id}/season/{season}:
 *   get:
 *     summary: Get Series Details by Season
 *     description: Retrieve details of a TV series for a specific season.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: integer
 *         description: The season number.
 *     responses:
 *       200:
 *         description: Success. Returns details of a TV series for a specific season.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the series details.
 *                 air_date:
 *                   type: string
 *                   format: date
 *                   description: Air date of the season.
 *                 episodes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       air_date:
 *                         type: string
 *                         format: date
 *                         description: Air date of the episode.
 *                       episode_number:
 *                         type: integer
 *                         description: Episode number.
 *                       episode_type:
 *                         type: string
 *                         description: Type of the episode (e.g., "standard").
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the episode.
 *                       name:
 *                         type: string
 *                         description: Name of the episode.
 *                       overview:
 *                         type: string
 *                         description: Overview of the episode.
 *                       production_code:
 *                         type: string
 *                         description: Production code of the episode.
 *                       runtime:
 *                         type: integer
 *                         description: Runtime of the episode.
 *                       season_number:
 *                         type: integer
 *                         description: Season number of the episode.
 *                       show_id:
 *                         type: integer
 *                         description: ID of the TV series.
 *                       still_path:
 *                         type: string
 *                         description: Path to the still image of the episode.
 *                       vote_average:
 *                         type: number
 *                         description: Average vote for the episode.
 *                       vote_count:
 *                         type: integer
 *                         description: Number of votes for the episode.
 *                       crew:
 *                         type: array
 *                         description: List of crew members for the episode.
 *                         items:
 *                           type: object
 *                           properties:
 *                             department:
 *                               type: string
 *                               description: Department of the crew member (e.g., "Writing").
 *                             job:
 *                               type: string
 *                               description: Job role of the crew member (e.g., "Writer").
 *                             credit_id:
 *                               type: string
 *                               description: Unique identifier for the credit.
 *                             adult:
 *                               type: boolean
 *                               description: Whether the crew member is an adult.
 *                             gender:
 *                               type: integer
 *                               description: Gender of the crew member (1 for female, 2 for male).
 *                             id:
 *                               type: integer
 *                               description: Unique identifier for the crew member.
 *                             known_for_department:
 *                               type: string
 *                               description: The department the crew member is known for (e.g., "Writing").
 *                             name:
 *                               type: string
 *                               description: The name of the crew member.
 *                             original_name:
 *                               type: string
 *                               description: The original name of the crew member.
 *                             popularity:
 *                               type: number
 *                               description: Popularity score of the crew member.
 *                             profile_path:
 *                               type: string
 *                               description: Path to the profile image of the crew member.
 *                       guest_stars:
 *                         type: array
 *                         description: List of guest stars for the episode.
 *                         items:
 *                           type: object
 *                           properties:
 *                             character:
 *                               type: string
 *                               description: Character played by the guest star.
 *                             credit_id:
 *                               type: string
 *                               description: Unique identifier for the credit.
 *                             order:
 *                               type: integer
 *                               description: Order of the guest star in the cast list.
 *                             adult:
 *                               type: boolean
 *                               description: Whether the guest star is an adult.
 *                             gender:
 *                               type: integer
 *                               description: Gender of the guest star (1 for female, 2 for male).
 *                             id:
 *                               type: integer
 *                               description: Unique identifier for the guest star.
 *                             known_for_department:
 *                               type: string
 *                               description: The department the guest star is known for (e.g., "Acting").
 *                             name:
 *                               type: string
 *                               description: The name of the guest star.
 *                             original_name:
 *                               type: string
 *                               description: The original name of the guest star.
 *                             popularity:
 *                               type: number
 *                               description: Popularity score of the guest star.
 *                             profile_path:
 *                               type: string
 *                               description: Path to the profile image of the guest star.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */

router.get('/', (req, res) => {SeriesDetailsBySeason(req, res)});

/**
 * @swagger
 * /series/{id}/season/{season}/videos:
 *   get:
 *     summary: Get Series Videos by Season
 *     description: Retrieve videos of a TV series for a specific season.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: integer
 *         description: The season number.
 *     responses:
 *       200:
 *         description: Success. Returns videos of a TV series for a specific season.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the TV series.
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       iso_639_1:
 *                         type: string
 *                         description: ISO 639-1 code of the video.
 *                       iso_3166_1:
 *                         type: string
 *                         description: ISO 3166-1 code of the video.
 *                       name:
 *                         type: string
 *                         description: Name of the video.
 *                       key:
 *                         type: string
 *                         description: Key of the video.
 *                       site:
 *                         type: string
 *                         description: Site where the video is hosted.
 *                       size:
 *                         type: integer
 *                         description: Size of the video.
 *                       type:
 *                         type: string
 *                         description: Type of the video.
 *                       official:
 *                         type: boolean
 *                         description: Whether the video is official.
 *                       published_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the video was published.
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the video.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */

router.get('/videos', (req, res) => {SeriesVideosBySeason(req, res)});

/**
 * @swagger
 * /series/{id}/season/{season}/comments:
 *   post:
 *     summary: Add Series Comment
 *     description: Add a comment to a TV series for a specific season.
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the TV series.
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: integer
 *         description: The season number.
 *     requestBody:
 *       description: Comment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serieId:
 *                 type: integer
 *                 description: The ID of the TV series.
 *               comment:
 *                 type: string
 *                 description: The comment to be added.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the comment.
 *     responses:
 *       200:
 *         description: Success. Comment added to the TV series for a specific season.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */
router.post('/comments', extractUserInfo, addSerieComment);

export default router;
