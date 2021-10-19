import mongoose from 'mongoose';
const user=new mongoose.Schema({
    username:String,
    password:String,
    email:String
})
const userModel=mongoose.model('userModel',user);
export default userModel;