import mongoose from 'mongoose';
const Review=new mongoose.Schema({
    coinId:String,
    rating: Number,
    text:String,
    user:String,
    publisher:String
})
const reviewModel=mongoose.model('reviewModel',Review);
export default reviewModel;