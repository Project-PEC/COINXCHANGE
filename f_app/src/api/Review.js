import axios from "axios";
let url="http://localhost:8080";
// url="";
export const addReview = async (username, coinId, data) => {
    const url = url+"/addReview/" + username + "/" + coinId;
    return await axios.post(url, data)
        .then(async (res) => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getReview = async (coinId) => {
    return await axios.get(url+"/getReview/"+ coinId )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}
export const getReviewByUsername=async(username)=>{
    return await axios.get(url+"/getReviewByUsername/"+username )
        .then((res) => {
            return res.data.doc;
        })
        .catch(err => {
            console.log(err);
        })
}