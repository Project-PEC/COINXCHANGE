import { getProfile } from "./profile.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const newConv = async (req, res) => {
    const readObj = {}
    readObj[req.body.senderId] = true;
    readObj[req.body.receiverId] = true;
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
        read: readObj
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const getConvo = async (req, res) => {
    try {
        let conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });

        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const newMsg = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMsg = await newMessage.save();
        res.status(200).json(savedMsg);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const getMsgs = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const updateConvo = async (req, res) => {
    try {
        const resu=await Conversation.findOne({ $or: [{ members: [req.body.user, req.body.toChange] }, { members: [req.body.toChange, req.body.user] }] });
        let readObj=resu.read;
        readObj[req.body.toChange]=req.body.changed;
        const result = await Conversation.findOneAndUpdate({ $or: [{ members: [req.body.user, req.body.toChange] }, { members: [req.body.toChange, req.body.user] }] },
            { $set: { read: readObj } })
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
}