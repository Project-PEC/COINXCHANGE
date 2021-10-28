import mongoose from 'mongoose';
const coin=new mongoose.Schema({
    image:[String],
    title:String,
    descriptin:String,
    publisher:String
})
const coinModel=mongoose.model('coinModel',coin);
export default coinModel;