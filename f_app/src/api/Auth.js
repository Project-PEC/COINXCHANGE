import axios from 'axios';

export const registerUser = (registerUsername, registerPassword,registerEmail, setUsername) => {
    const data = {
        username: registerUsername,
        password: registerPassword,
        email:registerEmail
    }
    axios.post("http://localhost:8080/register", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user", registerUsername);
        else {
            localStorage.removeItem("user"); setUsername(registerUsername);
            localStorage.setItem("token", res.data.token);
            console.log(res.data.message);
        }
        window.location.href = '/';
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
            console.log(res.data.message);
            setUsername(loginUsername);
        }
        window.location.href = '/';

    })
        .catch(err => {
            console.log(err);
        })
};
export const getUserInfo = (setUsername) => {
    axios.get("http://localhost:8080/user", {

        headers: {
            "x-access-token": localStorage.getItem("token") ? localStorage.getItem("token") : ""
        }
    })
        .then((res) => {
            if (!res.data.auth) localStorage.setItem("user", res.data.username);
            else localStorage.removeItem("user");
            setUsername(res.data.username);
        })
        .catch(err => {
            console.log(err);
        })
}
export const logOutUser = (setUsername) => {
    setUsername("");
    localStorage.removeItem('token');
}