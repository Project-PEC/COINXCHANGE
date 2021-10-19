import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { getUserInfo, logOutUser } from '../api/Auth';


const Navbar = () => {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [username, setUsername] = useState("");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    getUserInfo(setUsername);

    showButton();
  });

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
      onClick={logOutUser}
    >
      LogOut
    </Link>
  }
  window.addEventListener('resize', showButton);
  console.log("Here: ", username)
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
              {authLink}
            </li>
          </ul>
          {button && <Button onClick={logOutUser} link={username?'/':'/sign-up'} buttonStyle='btn--outline'>{username?"LogOut":"SIGN UP"}</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;