import express from 'express';
import { extractUserInfo } from '../utils/token.js';
import { getUserInfos, updateUserInfo, getImageUser, updateImage } from '../controllers/userController.js';
import userMovieRoutes from './userMovieRoutes.js';
import userSerieRoutes from './userSerieRoutes.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The unique identifier for the user.
 *         mail:
 *           type: string
 *           description: The email address of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         firstname:
 *           type: string
 *           description: The first name of the user.
 *         lastname:
 *           type: string
 *           description: The last name of the user.
 *         image:
 *           type: string
 *           description: The URL or path to the user's profile image.
 * 
 *     UserUpdateRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The new username for the user.
 *         mail:
 *           type: string
 *           description: The new email address for the user.
 *         password:
 *           type: string
 *           description: The new password for the user.
 *         lastname:
 *           type: string
 *           description: The new last name for the user.
 *         firstname:
 *           type: string
 *           description: The new first name for the user.
 *         image:
 *           type: string
 *           description: The URL or path to the new profile image for the user.
 * 
 *     UserImageUpdateRequest:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           description: The base64-encoded image data for the new profile image.
 */

/**
 * @swagger
 * /user/infos:
 *   get:
 *     summary: Get user information.
 *     description: Retrieve information about the authenticated user.
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
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       500:
 *         description: Internal server error.
 */
router.get('/infos', extractUserInfo, getUserInfos);

/**
 * @swagger
 * /user/update:
 *   post:
 *     summary: Update user information.
 *     description: Update information about the authenticated user.
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
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *     responses:
 *       200:
 *         description: User information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       500:
 *         description: Internal server error.
 */
router.post('/update', extractUserInfo, updateUserInfo);

/**
 * @swagger
 * /user/profile-image/{username}:
 *   get:
 *     summary: Get user profile image.
 *     description: Retrieve the profile image of a user by username.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile image retrieved successfully.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error.
 */
router.get('/profile-image/{username}', getImageUser);

/**
 * @swagger
 * /user/update-image:
 *   post:
 *     summary: Update user profile image.
 *     description: Update the profile image of the authenticated user.
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
 *             $ref: '#/components/schemas/UserImageUpdateRequest'
 *     responses:
 *       200:
 *         description: Profile image updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/update-image', extractUserInfo, updateImage);

router.use('/movies', userMovieRoutes);
router.use('/series', userSerieRoutes);


export default router;