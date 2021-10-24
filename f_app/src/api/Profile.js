import axios from "axios"

export const getProfile=async(username)=>{
    const url="http://localhost:8080/"+username;
    return await axios.get(url).then(res=>res.data.doc);
}