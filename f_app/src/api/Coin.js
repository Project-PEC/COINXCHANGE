import axios from "axios";

export const addCoin = async(username, data) => {
    const url="http://localhost:8080/addCoin/"+username;
    return await axios.post(url, data)
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getCoin = async(Coin) => {
    return await axios.get("http://localhost:8080/coin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}