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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *         description: Success. Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /extend-token:
 *   post:
 *     summary: Extend Token Validity
 *     description: Extend the validity of the authentication token.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
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
 *       500:
 *         description: Internal Server Error. Failed to process the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/extend-token', extractUserInfo, extendToken);

export default router;
