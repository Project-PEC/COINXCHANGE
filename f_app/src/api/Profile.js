import axios from "axios"

export const getProfile=async(username)=>{
    const url="http://localhost:8080/"+username;
    return await axios.get(url).then(res=>res.data.doc);
}
export const editProfile=async(username,data)=>{
    const url="http://localhost:8080/"+username+'/edit';
    return await axios.post(url,data).then(res=>res.data.doc);
}
export const editProfileImage=async(username,data)=>{
    const url="http://localhost:8080/"+username+'/editImage';
    return await axios.post(url,data).then(res=>res.data.doc);
}