import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false)


  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };


  const dropdown = () => {
    if (showMenu) {
      return 'show-drop-menu'
    } else {
      return 'hide-drop-menu'
    }
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='right-nav' id="navs">
        <div className='dropdown-button'>
          <button className="user-buttons" onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}>
            <i className="fas fa-bars" />
            <img className='profile-pic' src="https://drive.google.com/uc?export=view&id=1e6AIQpUAr0_HcNJNaptcQAHEdO5aib5k" alt="Meowbnb Default Profile"></img>
          </button>
          <div className={dropdown()}>
            <div className='dropdown-menu'>
              <div className='menu-parent'>
                <div id="menu-item"><LoginFormModal /></div>
              </div>
              <div className='menu-parent'>
                <div id="menu-item"><SignupFormModal /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (this.props.location.pathname === '/spots/:spotId') {
  //   let nav = document.getElementById('full-nav')
  //   nav.style.backgroundColor = "red"
  // }

  return (
    <div className='full-navigation' id="full-nav">
      <div className='left-nav' id="navs">
        <NavLink className="home-button" exact to="/">
          <img id="icon" src="https://drive.google.com/uc?export=view&id=1gemygEIn5eArP1LTHdzR6bXpt87jT3uO" alt="Meowbnb Icon"></img>
          <img id="logo" src="https://drive.google.com/uc?export=view&id=1EGZCbwX9pZ8eHc4JQDb8SlV88NHk9QYh" alt="Meowbnb Logo"></img>
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
