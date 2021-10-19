import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/page/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/page/Services';
import Products from './components/page/Products';
import SignUp from './components/page/SignUp';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { getUserInfo } from './api/Auth';

function App() {
  const [username, setUsername] = useState("");
  const setUser=()=>{
    setUsername("Updating State");
  }
  useEffect(() => {
    getUserInfo(setUsername);
  },[username])
  console.log(username+" is logged in!")
  return (
    <>
      <Router>
        <Navbar username={username} setUsername={setUser} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={() => <SignUp setUsername={()=>setUser()} />} />
          <Route path='/predict' component={ImageAnalyzer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;