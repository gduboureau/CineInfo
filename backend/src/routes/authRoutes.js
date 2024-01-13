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
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user.
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success. Returns the authentication token along with user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 username:
 *                   type: string
 *                 expiration:
 *                   type: string
 *                   description: Token expiration time (e.g., '1h').
 *       400:
 *         description: Bad Request. Invalid email or password.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */
router.post('/login', login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User Registration
 *     description: Register a new user.
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
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               defaultImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success. Returns the authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request. Email or password already in use.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */
router.post('/register', register);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Reset the password for a user.
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
 *     responses:
 *       200:
 *         description: Success. Email sent to the user with a new password.
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /extend-token:
 *   post:
 *     summary: Extend Token Validity
 *     description: Extend the validity of the authentication token.
 *     tags: [Authentication]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication. Include the word 'Bearer' followed by the token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Returns the new authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 */
router.post('/extend-token', extractUserInfo, extendToken);

export default router;
