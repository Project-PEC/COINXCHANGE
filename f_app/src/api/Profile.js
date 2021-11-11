import axios from "axios"
import { editCoinByPublisher } from "./Coin";

export const getProfile=async(username)=>{
    const url="http://localhost:8080/"+username;
    return await axios.get(url).then(res=>res.data.doc);
}
export const editProfile=async(username,data)=>{
    const url="http://localhost:8080/"+username+'/edit';
    for(let i in data.Coins)
    {
        const x=await editCoinByPublisher({...data.Coins[i],location:data.location});
    }
    return await axios.post(url,data).then(res=>res.data.doc);
}
export const editProfileImage=async(username,data)=>{
    const url="http://localhost:8080/"+username+'/editImage';
    return await axios.post(url,data).then(res=>res.data.doc);
}