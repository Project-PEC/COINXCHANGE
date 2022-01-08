import axios from "axios";
import { editProfile } from "./Profile";

let url="http://localhost:8080/backend/";
url="https://coinxchange.herokuapp.com/backend/";
export const addCoin = async (username, data, profile) => {
    const url = url+"/addCoin/" + username;
    return await axios.post(url, data)
        .then(async (res) => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getCoin = async (Coin) => {
    return await axios.get(url+"/coin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const getCoinOfUser=async(username)=>{
    return await axios.get(url+"/getCoin/"+ username )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const getUserCoin = async (username, id) => {
    return await axios.get(url+"/getCoin/"+ username )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const editCoinByPublisher=async(data)=>{
    return await axios.post(url+"/editCoinByPublisher",data)
    .then(res=>{
        return res.data.doc;
    })
    .catch(err=>
        console.log(err));
}

export const editCoin = async (id,data) => {
    return await axios.post(url+"/"+id+"/editCoin",data)
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteCoin = async (id) => {
    return await axios.post(url+"/"+id+"/deleteCoin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}