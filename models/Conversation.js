import mongoose from 'mongoose';
const Conversation = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {timestamps:true}
)
const ConversationModel = mongoose.model('ConversationModel', Conversation);
export default ConversationModel;