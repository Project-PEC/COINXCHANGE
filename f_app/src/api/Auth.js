import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();


export const registerUser = (registerUsername, registerPassword, registerEmail, setUsername, props) => {
    const data = {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail
    }
    axios.post("http://localhost:8080/register", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user", registerUsername);
        else {
            localStorage.removeItem("user"); setUsername(registerUsername);
            localStorage.setItem("token", res.data.token);
            setUsername(registerUsername)
        }
        console.log(res.data.message);
        toast("Registered Successfully!");
        props.history.push('/');
    })
        .catch(err => {
            console.log(err);
        })
};
export const loginUser = async(loginUsername, loginPassword, setUsername, props) => {
    const data = {
        username: loginUsername,
        password: loginPassword
    }
    return await axios.post("http://localhost:8080/login", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user", loginUsername);
        else {
            localStorage.removeItem("user");
            localStorage.setItem("token", res.data.token);
            setUsername(loginUsername);
        }
        toast("Logged-in Successfully!");
        props.history.push('/');
        return res.data.message;


        // window.location.href = '/';

    })
        .catch(err => {
            console.log(err);
        })
};
export const getUserInfo = async (setUsername) => {
    return await axios.get("http://localhost:8080/user", {

        headers: {
            "x-access-token": localStorage.getItem("token") ? localStorage.getItem("token") : ""
        }
    })
        .then((res) => {
            if (!res.data.auth) localStorage.setItem("user", res.data.username);
            else localStorage.removeItem("user");
            if (setUsername)
                setUsername(res.data.username);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}


export const logOutUser = (setUsername) => {
    toast("Logged Out successfully");
    setUsername("");
    localStorage.removeItem('token');
    console.log("Logged out successfully");
}