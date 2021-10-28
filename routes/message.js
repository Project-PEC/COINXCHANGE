import express from 'express';
import { newMsg,getMsgs } from '../Controllers/messenger.js';

const router=express.Router();

router.post('/',newMsg);
router.get('/:conversationId',getMsgs);

export default router;