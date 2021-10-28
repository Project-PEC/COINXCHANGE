import mongoose from 'mongoose';
const Message = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: { type: String },
        text: { type: String }
    },
    { timestamps: true }
)
const MessageModel = mongoose.model('MessageModel', Message);
export default MessageModel;