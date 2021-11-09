import axios from "axios";

export const addReview = async (username, coinId, data) => {
    const url = "http://localhost:8080/addReview/" + username + "/" + coinId;
    return await axios.post(url, data)
        .then(async (res) => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getReview = async (coinId) => {
    return await axios.get("http://localhost:8080/getReview/"+ coinId )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}