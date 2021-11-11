import mongoose from 'mongoose';
const Coin=new mongoose.Schema({
    image:[String],
    title:String,
    description:String,
    publisher:String,
    location:String
})
const coinModel=mongoose.model('coinModel',Coin);
export default coinModel;