import express from 'express';
import { getUser, loginUser, registerUser, verifyJWT } from '../Controllers/user.js';
import { getProfile } from '../Controllers/profile.js';

const router =express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/user',verifyJWT,getUser);
router.get('/:id',getProfile)
export default router;