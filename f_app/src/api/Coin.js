import axios from "axios";
import { editProfile } from "./Profile";

export const addCoin = async (username, data, profile) => {
    const url = "http://localhost:8080/addCoin/" + username;
    return await axios.post(url, data)
        .then(async (res) => {
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
export const getCoinOfUser=async(username)=>{
    return await axios.get("http://localhost:8080/getCoin/"+ username )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const getUserCoin = async (username, id) => {
    return await axios.get("http://localhost:8080/getCoin/"+ username )
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

export const editCoin = async (id,data) => {
    return await axios.post("http://localhost:8080/"+id+"/editCoin",data)
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteCoin = async (id) => {
    return await axios.post("http://localhost:8080/"+id+"/deleteCoin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}