import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { withRouter } from 'react-router';
import { logOutUser } from '../../api/Auth';


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
  if (unread) hasRead = <span>(Unread)</span>
  let authLink = <Link
    to='/sign-up'
    className='nav-links-mobile'
    onClick={closeMobileMenu}
  >
    Sign Up
  </Link>

  if (username) {
    authLink = <Link
      to='/'
      className='nav-links-mobile'
      onClick={() => logOutUser(setUsername)}
    >
      LogOut
    </Link>
  }
  window.addEventListener('resize', showButton);
  const logOut = () => logOutUser(setUsername);
  const faltu = () => localStorage.removeItem('token');
  let messanger = <span></span>
  if (username) {
    messanger = <Link className="nav-links" to='/messenger' onClick={closeMobileMenu}><button onClick={() => { console.log('pressed'); setUnread(false) }}>Messanger{hasRead}</button></Link>
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
          {button && <Button onClick={username ? logOut : faltu} link={username ? '/' : '/sign-up'} buttonStyle='btn--outline'>{username ? "LogOut" : "SIGN UP"}</Button>}
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);