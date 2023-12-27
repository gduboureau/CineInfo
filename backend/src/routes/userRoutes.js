import express from 'express';
import { getUserInfos } from '../controllers/userController.js';

const router = express.Router();

router.get('/infos', getUserInfos);

export default router;