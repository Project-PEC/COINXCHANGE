import express from 'express';
import { addReview, getReview, getReviewByUsername } from '../Controllers/review.js';

const router = express.Router();

router.post('/addReview/:username/:coinId',addReview);
router.get('/getReview/:coinId',getReview);
router.get('/getReviewByUsername/:username',getReviewByUsername);

export default router;