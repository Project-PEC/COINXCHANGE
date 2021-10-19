import mongoose from 'mongoose';
const user=new mongoose.Schema({
    username:String,
    password:String
})
const userModel=mongoose.model('userModel',user);
export default userModel;