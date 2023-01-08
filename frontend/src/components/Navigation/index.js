import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false)

  const url = useLocation().pathname;

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [spotId, setSpotId] = useState("");

  const data = useSelector(state => state.spots.allSpots);
  const dataArr = Object.values(data)


  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = dataArr.filter((value) => {
      if (value.city.toLowerCase().includes(searchWord.toLowerCase()) || value.state.toLowerCase().includes(searchWord.toLowerCase()) || value.country.toLowerCase().includes(searchWord.toLowerCase()) || value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.address.toLowerCase().includes(searchWord.toLowerCase())) {
        setSpotId(value.id)
        return value
      };
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  console.log(filteredData)

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

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
    <div className={
      url === "/" ? 'full-navigation' :
        url === "/spots/create" ? "partial-nav" :
        url === "/spots/hosting" ? "hosting-nav" :
          "full-navigation-1"}
      id="full-nav">
      <div className='left-nav' id="navs">
        <NavLink className="home-button" exact to="/">
          <img id="icon" src="https://drive.google.com/uc?export=view&id=1gemygEIn5eArP1LTHdzR6bXpt87jT3uO" alt="Meowbnb Icon"></img>
          <img id="logo" src="https://drive.google.com/uc?export=view&id=1EGZCbwX9pZ8eHc4JQDb8SlV88NHk9QYh" alt="Meowbnb Logo"></img>
        </NavLink>
      </div>

      <div className="search">
        <div className="search-wrap">
          <div>
            <input
              type="text"
              placeholder="Start your search"
              value={wordEntered}
              onChange={handleFilter}
              className="search-input"
            />
          </div>
          <div className="searchIcon">
            {filteredData.length === 0 ?
              <i className="fa-solid fa-magnifying-glass"></i>
              :
              <div className="search-cancel" onClick={clearInput}>x</div>
            }
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="data-result">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a className="data-item" href={`/spots/${value.id}`} target="_blank">
                  <div className='individual-city'>
                    <img className="data-image" src={value.previewImage} />
                    <div>
                      <div> {value.name} </div>
                      <div className='data-city-state'> at {value.city} {value.state}</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
