import express from 'express';
import { getUser, loginUser, registerUser, verifyJWT } from '../Controllers/user.js';
import { getProfile, editProfile } from '../Controllers/profile.js';
import { getCoin } from '../Controllers/coin.js';

const router = express.Router();

router.get('/coin',getCoin);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/user', verifyJWT, getUser);
router.post('/:id/edit', editProfile);
router.get('/:id', getProfile);

export default router;