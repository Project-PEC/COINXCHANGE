import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/page/Home';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Services from './components/page/Services/Services';
import Products from './components/page/Products/Products';
import SignUp from './components/page/Signup/SignUp';
import { ImageAnalyzer } from './components/ImageAnalyzer/ImageAnalyzer';
import { getUserInfo } from './api/Auth';
import Profile from './components/Profile/Profile';
import Messenger from './components/page/Messenger/Messenger';
import { io } from 'socket.io-client';
import { getConversations } from './api/Messenger';
import { getProfile } from './api/Profile';
import AddCoin from './components/AddCoin/AddCoin';
import ShowProfile from './components/page/showProfile/showProfile';
import ShowCoin from './components/ShowCoin/ShowCoin';
import Review from './components/Review/Review';
import EditCoin from './components/EditCoin/EditCoin';
// import ShowReview from './components/ShowReview/ShowReview';


function App() {
  const [username, setUsername] = useState("");
  const [unread, setUnread] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [show, setShow] = useState(true);

  const socket = useRef();



  const setUser = () => {
    setUsername("Updating State");
  }
  useEffect(() => {
    socket.current = io(("https://socket-for-coinxchange.herokuapp.com/"))
    // socket.current = io("ws://localhost:8900/")
    socket.current.on("getMessage", async (data) => {
      setUnread(true);
    })
  }, [])
  useEffect(async () => {
    const t = await getUserInfo(setUsername);
    if (t && t.auth) {
      const x = await getConversations(t.username);

      const profile = await getProfile(t.username);
      socket.current.emit("addUser", profile.username, profile.image);
      socket.current.on("getUsers", users => {
        const result = users.filter(user => user.userId != profile.username);
        setOnlineUsers(result);
      })


      for (const i in x) {
        if (x[i].read[t.username] === false) {
          setUnread(true);
          break;
        }
      }
    }
  }, [username])
  let routes =
    <div>
      <Switch>

        <Route exact path='/' exact component={() => < Home username={username} />} />
        <Route exact path='/services' component={() => < Services username={username} />} />
        <Route exact path='/messenger' component={Messenger}>
          {!username ? <Redirect to="/" /> : <Messenger onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers} setUnread={setUnread} socket={socket} />}
        </Route>
        <Route exact path='/products' component={Products} />
        <Route exact path='/predict' component={ImageAnalyzer} />
        <Route exact path={'/profile/' + username} exact component={Profile} />
        <Route exact path='/view/:id' component={ShowProfile} />
        <Route exact path={'/AddCoin/' + username} exact component={() => < AddCoin username={username} />} />
        <Route exact path={'/getCoin/:username/:id'} exact component={ShowCoin} />
        <Route exact path={'/:id/editCoin'} exact component={EditCoin} />
        <Redirect to='/' />
      </Switch>
    </div>
  if (!username) {
    routes =
      <div>
        <Switch>
          <Route exact path='/' exact component={() => < Home username={username} />} />
          <Route exact path='/services' component={() => < Services username={username} />} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/sign-up' component={() => <SignUp setUsername={() => setUser()} />} />
          <Route exact path='/predict' component={ImageAnalyzer} />
          <Route exact path='/view/:id' component={ShowProfile} />
          <Route exact path={'/getCoin/:username/:id'} exact component={ShowCoin} />
          {/* <Route path={'/getReview/:coinId'} exact component={ShowReview} /> */}
          {/* <Route path={'/addReview/:username/:coinId'} exact component={Review} /> */}
          <Redirect to='/sign-up' />;)
        </Switch>
      </div>
  }
  return (
    <>
      <Router>
        <Navbar unread={unread} setUnread={setUnread} socket={socket} username={username} setUsername={setUser} />

        {routes}
      </Router>
    </>
  );
}

export default App;