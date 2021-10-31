import express from 'express';
import { getConvo, newConv, updateConvo } from '../Controllers/messenger.js';

const router=express.Router();

router.post("/",newConv)
router.post('/update',updateConvo);
router.get("/:userId",getConvo)

export default router;