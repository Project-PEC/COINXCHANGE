import express from 'express';
import { addReview, getReview } from '../Controllers/review.js';

const router = express.Router();

router.post('/addReview/:username/:coinId',addReview);
router.get('/getReview/:coinId',getReview);

export default router;