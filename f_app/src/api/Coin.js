import axios from "axios";
import { editProfile } from "./Profile";

export const addCoin = async (username, data, profile) => {
    const url = "http://localhost:8080/addCoin/" + username;
    return await axios.post(url, data)
        .then(async (res) => {
            const x = await editProfile(username, { ...profile, Coins: [...profile.Coins,res.data] });
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getCoin = async (Coin) => {
    return await axios.get("http://localhost:8080/coin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getUserCoin = async (username, id) => {
    return await axios.get("http://localhost:8080/getCoin/"+ username + "/" + id )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const editCoinByPublisher=async(data)=>{
    return await axios.post("http://localhost:8080/editCoinByPublisher",data)
    .then(res=>{
        return res.data.doc;
    })
    .catch(err=>
        console.log(err));
}