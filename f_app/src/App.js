import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/page/Home';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Services from './components/page/Services/Services';
import Products from './components/page/Products';
import SignUp from './components/page/Signup/SignUp';
import { ImageAnalyzer } from './components/ImageAnalyzer/ImageAnalyzer';
import { getUserInfo } from './api/Auth';
import Profile from './components/Profile/Profile';
import Messenger from './components/page/Messenger/Messenger';
import { io } from 'socket.io-client';
import { getConversations } from './api/Messenger';
import { getProfile } from './api/Profile';


function App() {
  const [username, setUsername] = useState("");
  const [unread, setUnread] = useState(false);
  const socket = useRef();


  const setUser = () => {
    setUsername("Updating State");
  }
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", async (data) => {
      setUnread(true);
    })
  }, [])
  useEffect(async() => {
    const t=await getUserInfo(setUsername);
    const x=await getConversations(t.username);
    for(const i in x)
    {
      if(x[i].read[t.username]===false)
      {
        setUnread(true);
        break;
      }
    }
  }, [username])
  return (
    <>
      <Router>
        <Navbar unread={unread} setUnread={setUnread} socket={socket} username={username} setUsername={setUser} />
        {username ? <Link to={'/profile/' + username}>
          <button>
            Profile
          </button>
        </Link> : <button />}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/messenger' component={Messenger}>
            {!username ? <Redirect to="/" /> : <Messenger setUnread={setUnread} socket={socket} />}
          </Route>
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={() => <SignUp setUsername={() => setUser()} />} />
          <Route path='/predict' component={ImageAnalyzer} />
          <Route path={'/profile/' + username} exact component={Profile} />
          <Redirect to='/' />;
        </Switch>
      </Router>
    </>
  );
}

export default App;