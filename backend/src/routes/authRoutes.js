import express from 'express';
import { login, register,resetPassword, extendToken } from '../controllers/authController.js';
import { extractUserInfo } from '../utils/token.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/extend-token', extractUserInfo, extendToken);

export default router;
