// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
// import
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="full-right-nav">
      <div className='right-nav' id="navs">
        <div className='host-parent'>
          <NavLink className="host" to="/spots/create">
            Host a Spot
          </NavLink>
        </div>
      </div>
      <div className="whole-button">
        <button className="user-button" onClick={openMenu}>
          <i className="fas fa-bars" />
          <img className='profile-pic' src="https://drive.google.com/uc?export=view&id=1e6AIQpUAr0_HcNJNaptcQAHEdO5aib5k" alt="Meowbnb Default Profile"></img>
        </button>
        {showMenu && (
          <div className="user-dropdown-menu">
            <div className="user-info">
              <div className='menu-parent'>
                <div id='user-menu-item' className="user-name">{user.username}</div>
              </div>
              <div className='menu-parent'>
                <div id='user-menu-item'>{user.email}</div>
              </div>
            </div>
            <div>
              <NavLink to="/spots/my-spots">
                <button className="logout-button" id="user-hover-effect">
                  My Spots
                </button>
              </NavLink>
              <NavLink to="/spots/my-reviews">
                <button className="logout-button" id="user-hover-effect">
                  My Reviews
                </button>
              </NavLink>
              {/* <button className="logout-button" onClick={() => history.push('/my-spots')}>My Spot</button> */}
            </div>
            <div>
              <button className="user-logout-button" id="user-hover-effect"onClick={logout}>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
