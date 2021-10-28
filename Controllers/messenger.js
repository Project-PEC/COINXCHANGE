import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const newConv = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
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
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const newMsg=async(req,res)=>{
    const newMessage=new Message(req.body);
    try{
        const savedMsg=await newMessage.save();
        res.status(200).json(savedMsg);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}
export const getMsgs=async(req,res)=>{
    try{
        const messages=await Message.find({
            conversationId:req.params.conversationId,
        });
        res.status(200).json(messages);
    }
    catch(err){
        res.status(500).json(err);
    }
}