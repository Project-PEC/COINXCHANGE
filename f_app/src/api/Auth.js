import axios from 'axios';

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
        props.history.push('/');
    })
        .catch(err => {
            console.log(err);
        })
};
export const loginUser = (loginUsername, loginPassword, setUsername, props) => {
    const data = {
        username: loginUsername,
        password: loginPassword
    }
    axios.post("http://localhost:8080/login", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user", loginUsername);
        else {
            localStorage.removeItem("user");
            localStorage.setItem("token", res.data.token);
            setUsername(loginUsername);
        }
        console.log(res.data.message);

        props.history.push('/');
        // window.location.href = '/';

    })
        .catch(err => {
            console.log(err);
        })
};
export const getUserInfo = async(setUsername) => {
    return await axios.get("http://localhost:8080/user", {

        headers: {
            "x-access-token": localStorage.getItem("token") ? localStorage.getItem("token") : ""
        }
    })
        .then((res) => {
            if (!res.data.auth) localStorage.setItem("user", res.data.username);
            else localStorage.removeItem("user");
            if(setUsername)
            setUsername(res.data.username);
            return res.data.username;
        })
        .catch(err => {
            console.log(err);
        })
}
export const logOutUser = (setUsername) => {
    setUsername("");
    localStorage.removeItem('token');
    console.log("Logged out successfully");
}