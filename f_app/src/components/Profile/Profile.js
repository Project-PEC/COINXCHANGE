import React,{useEffect, useState} from 'react';
import { getUserInfo } from '../../api/Auth';
import { getProfile } from '../../api/Profile';

const Profile=()=>{
    const [username,setUsername]=useState("");
    useEffect(()=>{
        getUserInfo(setUsername);
        getProfile(username);
    })
    return(
        <>
            
        </>
    )
}
export default Profile;