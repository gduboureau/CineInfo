import express from 'express';
import { search } from '../src/controllers/searchController.js';

const router = express.Router();

router.post('/', search)

export default router;
