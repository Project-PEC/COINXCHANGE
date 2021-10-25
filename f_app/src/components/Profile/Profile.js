import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../api/Auth';
import { editProfile, getProfile } from '../../api/Profile';
import axios from 'axios';
import './Profile.css';

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
            <div className="pf-container">
                <div className='pf-wrapper'>
                    <div className="pic--wrap">
                        <img id="profileImage" src={image}/>
                        <p class="img__description">
                            <label for="profile image">Select image </label>
                            <input id="profile image" type="file" onChange={fileSelectedHandler} />
                        </p>
                    </div>
                    <div className="items">
                        <strong>Name: {name}</strong>
                        <strong>Email: {email}</strong>
                    </div>
                    <div className="items">
                        <p>Can add bio about coins</p>
                        <p>Private/public profile</p>
                        <strong>Collection:</strong>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;