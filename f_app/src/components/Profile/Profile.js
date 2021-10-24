import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../api/Auth';
import { editProfile, getProfile } from '../../api/Profile';
import axios from 'axios';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [doc, setDoc] = useState({});
    useEffect(async () => {
        const t = await getUserInfo();
        const temp = await getProfile(t);
        setUsername(t);
        setDoc(temp);
    }, [])
    const fileUploadHandler = async(file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mhabs7f9");

        axios.post("https://api.cloudinary.com/v1_1/dx0rf8u0t/image/upload", formData).then(async(res) => {
            setDoc({...doc,
                image:res.data.secure_url
            })
            const t= await editProfile(username,doc);
            console.log(t);
        })
    }
    const fileSelectedHandler = (e) => {
        const file = e.target.files[0];
        fileUploadHandler(file);

    }
    const email = doc.email;
    const name = doc.username;
    const coins = doc.Coins;
    const image=doc.image;
    return (
        <>
            <img style={{height:"200px",width:"200px",borderRadius:"200px"}} id="profileImage" src={image} />
            <p>Name: {name}</p>
            <p>email: {email}</p>
            <label for="profile image">Select image</label>
            <input id="profile image" type="file" onChange={fileSelectedHandler} />
        </>
    )
}
export default Profile;