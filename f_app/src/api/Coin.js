import axios from "axios";


export const getCoin = async(Coin) => {
    return await axios.get("http://localhost:8080/coin")
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}