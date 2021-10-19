import React, { useState } from 'react';
import { loginUser, registerUser } from '../../api/Auth';
import '../../App.css';
import './SignUp.css';

// const mode = 'login';

const LoginComponent = (props) => {
    return (
        <div>
            <div className={`form-block-wrapper form-block-wrapper--is-${props.mode}`} ></div>
            <section className={`form-block form-block--is-${props.mode}`}>
                <header className="form-block__header">
                    <h1>{props.mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                    <div className="form-block__toggle-block">
                        <span>{props.mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={() => props.toggleMode()} />
                        <label htmlFor="form-toggler"></label>
                    </div>
                </header>
                <LoginForm
                    onChangeUsername={props.onChangeUsername}
                    onChangePassword={props.onChangePassword}
                    mode={props.mode} onSubmit={props.onSubmit} />
            </section>
        </div>
    )
}


const LoginForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-block__input-wrapper">
                <div className="form-group form-group--login">
                    <Input OnChange={props.onChangeUsername} type="text" id="username" label="user name" disabled={props.mode === 'signup'} />
                    <Input OnChange={props.onChangePassword} type="password" id="password" label="password" disabled={props.mode === 'signup'} />
                </div>
                <div className="form-group form-group--signup">
                    <Input type="text" id="fullname" label="full name" disabled={props.mode === 'login'} />
                    <Input type="email" id="email" label="email" disabled={props.mode === 'login'} />
                    <Input type="password" id="createpassword" label="password" disabled={props.mode === 'login'} />
                </div>
            </div>
            <button className="button button--primary full-width" type="submit">{props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
        </form>
    )
}


const Input = (props) => (
    <input className="form-group__input" onChange={(e) => props.OnChange(e.target.value)} type={props.type} id={props.id} placeholder={props.label} disabled={props.disabled} />
);

const SignUP = (props) => {
    const [mode, setMode] = useState('login');
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const register = () => registerUser(username, password,);
    const login = () => loginUser(username, password,);

    const reqFunc = mode === 'login' ? login : register;
    const toggleMode = () => {
        var newMode = mode === 'login' ? 'signup' : 'login';
        setMode(newMode);
    }
    return (
        <div className={`app app--is-${mode}`}>
            <LoginComponent
                onChangeUsername={setUserName}
                onChangePassword={setPassword}
                toggleMode={toggleMode}
                mode={mode}
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        reqFunc();
                        props.history.push('/');
                    }
                }
            />
        </div>)
};

export default SignUP;


