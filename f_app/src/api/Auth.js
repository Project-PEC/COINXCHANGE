import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

let url="http://localhost:8080/";
url="https://coinxchange.herokuapp.com/";
export const registerUser = (registerUsername, registerPassword, registerEmail, setUsername, props) => {
    const data = {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail
    }
    axios.post(url+"/register", data).then((res) => {
        if (!res.data.auth){
            localStorage.setItem("user", registerUsername);
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } 
        else {
            localStorage.removeItem("user"); setUsername(registerUsername);
            localStorage.setItem("token", res.data.token);
            setUsername(registerUsername);
            toast.success("Registered Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.history.push('/');
        }
        console.log(res.data.message);
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
    return await axios.post(url+"/login", data).then((res) => {
        if (!res.data.auth){
            localStorage.setItem("user", loginUsername);
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } 
        else {
            localStorage.removeItem("user");
            localStorage.setItem("token", res.data.token);
            setUsername(loginUsername);
            toast.success("Logged-in Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.history.push('/');
        }
        return res.data.message;


        // window.location.href = '/';

    })
        .catch(err => {
            console.log(err);
        })
};
export const getUserInfo = async (setUsername) => {
    return await axios.get(url+"/user", {

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
    toast("Logged Out successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    setUsername("");
    localStorage.removeItem('token');
    console.log("Logged out successfully");
}