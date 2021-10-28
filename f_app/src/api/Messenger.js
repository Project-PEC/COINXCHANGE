import axios from 'axios';

export const getConversations = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/conversation/" + id);
        return res.data;
    }
    catch(err)
    {
        console.log(err);
    }
}
export const getMessages=async(id)=>{
    try{
        const res = await axios.get("http://localhost:8080/message/"+id);
        return (res).data;
    }
    catch(err)
    {
        console.log(err);
    }
}

export const sendMessage=async(message)=>{
    try{
        const res = await axios.post("http://localhost:8080/message/",message);
        return (res).data;
    }
    catch(err)
    {
        console.log(err);
    }
}