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
      <>
        <div className='dropdown-button'>
          <button className="user-buttons" onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}>
            <i className="fas fa-bars" />
            <i className="fas fa-user-circle" />
          </button>
          <div className={dropdown()}>
            <div className='dropdown-menu'>
              <div>
                <div id="menu-item"><LoginFormModal /></div>
              </div>
              <div>
                <div id="menu-item"><SignupFormModal /></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='navigations'>
      <div className='left-nav'>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
