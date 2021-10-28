import express from 'express';
import { getConvo, newConv } from '../Controllers/messenger.js';

const router=express.Router();

router.post("/",newConv)
router.get("/:userId",getConvo)

export default router;