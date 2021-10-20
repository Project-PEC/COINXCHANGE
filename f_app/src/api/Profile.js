import axios from "axios"

export const getProfile=(username)=>{
    const url="http://localhost:8080/"+username;
    axios.get(url)
    .then((res)=>{
        console.log(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
}