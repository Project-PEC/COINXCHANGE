import mongoose from 'mongoose';
const profile=new mongoose.Schema({
    username:String,
    email:String,
    image:String,
    Coins:[String]
})
const profileModel=mongoose.model('profileModel',profile);
export default profileModel;