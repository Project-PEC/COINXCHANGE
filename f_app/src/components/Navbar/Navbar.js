import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { withRouter } from 'react-router';
import { logOutUser } from '../../api/Auth';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = ({ username, setUsername, socket, unread, setUnread }) => {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  });

  let hasRead = <span></span>
  if (unread) hasRead = <span className="newMessage">*</span>
  let authLink = <Link
    to='/sign-up'
    className='nav-links-mobile'
    onClick={closeMobileMenu}
  >
    Sign Up
  </Link>

  if (username) {
    authLink = <>
      <Link
        to={'/profile/' + username}
        className='nav-links-mobile'
      >
        Profile
      </Link>
      <Link
        to='/'
        className='nav-links-mobile'
        onClick={() => { socket.current.emit('forceDisconnect'); logOutUser(setUsername) }}
      >
        LogOut
      </Link>
    </>
  }
  window.addEventListener('resize', showButton);
  const logOut = () => { socket.current.emit('forceDisconnect'); logOutUser(setUsername); }
  const faltu = () => { socket.current.emit('forceDisconnect'); localStorage.removeItem('token'); }
  let messanger = <span></span>
  if (username) {
    messanger = <Link className="nav-links" to='/messenger' onClick={() => { closeMobileMenu(); setUnread(false) }}>Messanger{hasRead}</Link>
  }
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            COINXCHANGE

            <i class="fas fa-dollar-sign" />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li>
              {messanger}
            </li>
            <li>
              {authLink}
            </li>
          </ul>
          {(button &&
            username) ? <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            <img src="https://img.icons8.com/doodle/48/000000/user.png" style={{height:"40px",width:"50px"}} alt="User-icon"/>Welcome
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="dropdownMenu">
              <Dropdown.Item><Link to={"/profile/" + username}>Profile</Link></Dropdown.Item>
              <Dropdown.Item><Button onClick={username ? logOut : faltu} link={username ? '/' : '/sign-up'} buttonStyle='btn--outline'>{username ? "LogOut" : "SIGN UP"}</Button></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            :
            button&&<Button onClick={username ? logOut : faltu} link={username ? '/' : '/sign-up'} buttonStyle='btn--outline'>{username ? "LogOut" : "SIGN UP"}</Button>}
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);