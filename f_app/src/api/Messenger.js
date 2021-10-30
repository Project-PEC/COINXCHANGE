import axios from 'axios';
import { getProfile } from './Profile';

export const getConversations = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/conversation/" + id);
        let conversations = res.data;
        for (const i in conversations) {
            const image1 = await getProfile(conversations[i].members[0]);
            const image2 = await getProfile(conversations[i].members[1]);
            console.log(conversations[i]);
            const imageObj = {};
            imageObj[conversations[i].members[0]] = image1.image;
            imageObj[conversations[i].members[1]] = image2.image;
            conversations[i] = { ...conversations[i], images: imageObj }
        }
        return conversations;
    }
    catch (err) {
        console.log(err);
    }
}
export const getMessages = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/message/" + id);
        return (res).data;
    }
    catch (err) {
        console.log(err);
    }
}

export const sendMessage = async (message) => {
    try {
        const res = await axios.post("http://localhost:8080/message/", message);
        return (res).data;
    }
    catch (err) {
        console.log(err);
    }
}
export const newConvo = async (data) => {
    try {
        const res = await axios.post("http://localhost:8080/conversation/", data);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const updateConvo=async(data)=>{
    try{
        const res=await axios.post("http://localhost:8080/conversation/update",data);
        return res.data;
    }
    catch(err)
    {
        console.log(err);
    }
}