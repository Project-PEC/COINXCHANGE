import axios from 'axios';

export const registerUser = (registerUsername,registerPassword) => {
    const data = {
        username: registerUsername,
        password: registerPassword
    }
    axios.post("http://localhost:8080/register", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user",registerUsername);
        else localStorage.removeItem("user");
        localStorage.setItem("token", res.data.token);
        console.log(res.data.message);
    })
        .catch(err => {
            console.log(err);
        })
};
export const loginUser = (loginUsername,loginPassword,) => {
    const data = {
        username: loginUsername,
        password: loginPassword
    }
    axios.post("http://localhost:8080/login", data).then((res) => {
        if (!res.data.auth) localStorage.setItem("user",loginUsername);
        else localStorage.removeItem("user");
        localStorage.setItem("token", res.data.token);
        console.log(res.data.message);

    })
        .catch(err => {
            console.log(err);
        })
};
export const getUserInfo = () => {
    axios.get("http://localhost:8080/user", {

        headers: {
            "x-access-token": localStorage.getItem("token")?localStorage.getItem("token"):""
        }
    })
    .then((res) => {
        if (!res.data.auth) localStorage.setItem("user",res.data.username);
        else localStorage.removeItem("user");
        console.log(res.data.username,res.data.auth,res.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}
export const logOutUser=()=>{
    localStorage.removeItem('token');
}