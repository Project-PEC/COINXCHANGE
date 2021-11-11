import express from 'express';
import { getUser, loginUser, registerUser, verifyJWT } from '../Controllers/user.js';
import { getProfile, editProfile, editProfileImage } from '../Controllers/profile.js';
import { addCoin, editCoinByPublisher, getCoin, getCoinOfUser, getUserCoin, editCoin, deleteCoin } from '../Controllers/coin.js';

const router = express.Router();

router.get('/coin',getCoin);
router.post('/editCoinByPublisher',editCoinByPublisher);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/user', verifyJWT, getUser);
router.post('/:id/edit', editProfile);
router.get('/:id', getProfile);
router.post('/AddCoin/:id', addCoin);
router.get('/getCoin/:username/:id', getUserCoin);
router.get('/getCoin/:username',getCoinOfUser);
router.post('/:id/editImage',editProfileImage);
router.post('/:id/editCoin', editCoin);
router.post('/:id/deleteCoin', deleteCoin);

export default router;