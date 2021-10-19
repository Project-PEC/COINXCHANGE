import express from 'express';
import { getUser, loginUser, registerUser, verifyJWT } from '../Controllers/user.js';

const router =express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/user',verifyJWT,getUser);
export default router;