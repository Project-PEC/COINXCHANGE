import axios from "axios"
import { editCoinByPublisher } from "./Coin";
let url2="http://localhost:8080";
url2="https://coinxchange.herokuapp.com";
export const getProfile=async(username)=>{
    const url=url2+"/"+username;
    return await axios.get(url).then(res=>res.data.doc);
}
export const editProfile=async(username,data)=>{
    const url=url2+"/"+username+'/edit';
    for(let i in data.Coins)
    {
        const x=await editCoinByPublisher({...data.Coins[i],location:data.location});
    }
    return await axios.post(url,data).then(res=>res.data.doc);
}
export const editProfileImage=async(username,data)=>{
    const url=url2+"/"+username+'/editImage';
    return await axios.post(url,data).then(res=>res.data.doc);
}