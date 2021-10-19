import React, { useState } from 'react';
import { getUserInfo, loginUser, registerUser,logOutUser } from '../api/Auth';

const Auth = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [loginUsername, setloginUsername] = useState("");
    const [registerPassword, setregisterPassword] = useState("");
    const [loginPassword, setloginPassword] = useState("");

    const register = () => registerUser(registerUsername,registerPassword,);
    const login = () => loginUser(loginUsername,loginPassword,);
    const getUser = () => getUserInfo();
    const logOut=()=>logOutUser();
    return (
        <>
            <h1>Register</h1>
            <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
            <input placeholder='password' onChange={e => setregisterPassword(e.target.value)} />
            <button onClick={register}>Submit</button>

            <h1>Login</h1>
            <input placeholder="username" onChange={e => setloginUsername(e.target.value)} />
            <input placeholder='password' onChange={e => setloginPassword(e.target.value)} />
            <button onClick={login}>Submit</button>

            <h1>Get User</h1>
            <button onSubmit={(e) => e.preventDefault()} onClick={getUser}>Submit</button>
            <button onClick={logOut}>Logout</button>
        </>
    )
}
export default Auth;