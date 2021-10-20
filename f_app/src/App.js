import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/page/Home';
import {Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Services from './components/page/Services';
import Products from './components/page/Products';
import SignUp from './components/page/Signup/SignUp';
import { ImageAnalyzer } from './components/ImageAnalyzer/ImageAnalyzer';
import { getUserInfo } from './api/Auth';
import Profile from './components/Profile/Profile';

function App() {
  const [username, setUsername] = useState("");
  const setUser = () => {
    setUsername("Updating State");
  }
  useEffect(() => {
    getUserInfo(setUsername);
  }, [username])
  return (
    <>
      <Router>
        <Navbar username={username} setUsername={setUser} />
        {username ? <Link to={'/profile/' + username}>
          <button>
            Profile
          </button>
        </Link> : <button/>}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={() => <SignUp setUsername={() => setUser()} />} />
          <Route path='/predict' component={ImageAnalyzer} />
          <Route path={'/profile/'+username} exact component={Profile} />
          <Redirect to='/' />;
        </Switch>
      </Router>
    </>
  );
}

export default App;