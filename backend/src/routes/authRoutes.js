import express from 'express';
import { login, register, resetPassword, extendToken } from '../controllers/authController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user by providing email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the user
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 expiration:
 *                   type: string
 *                   description: Token expiration time
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing required details.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               username:
 *                 type: string
 *                 description: User's username
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *               defaultImage:
 *                 type: string
 *                 description: URL of the user's default image
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the new user
 *       400:
 *         description: Invalid input or email/username already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user's password
 *     description: Reset user's password and send the new password via email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: User's email
 *     responses:
 *       200:
 *         description: Password reset successful, email sent
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /auth/extend-token:
 *   post:
 *     summary: Extend user's access token
 *     description: Extend the expiration time of the user's access token.
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token extension successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Updated access token for the user
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 */
router.post('/extend-token', extractUserInfo, extendToken);

export default router;
