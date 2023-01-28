import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './SpotBrowser.css'

const SpotBrowser = () => {
  const dispatch = useDispatch()
  const [filterSpot, setFilterSpot] = useState("")
  const [cardsLoading, setCardsLoading] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const allSpots = useSelector(state => state.spots.allSpots)
  // dont put object.values in useSelector bc it always changes
  const allSpotsArr = Object.values(allSpots)
  const filteredArr = allSpotsArr.filter(spot => spot.place.includes(filterSpot));


  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])


  //SKELETON CARD LOADING EFFECT
  useEffect(() => {
    let timeoutId;
    if (isLoaded) {
      let timer = cardsLoading;
      timeoutId = setTimeout(() => {
        if (timer >= allSpotsArr.length) return;
        setCardsLoading((c) => c + 1)
        timer++;
        timeoutId = setTimeout(() => {
          timeoutId()
        }, 100)
      }, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [cardsLoading, allSpotsArr, isLoaded])

  setTimeout(() => setIsLoaded(true), 1000)

  //SKELETON CARDS
  const cardSkeleton = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <div key={i} style={{ zIndex: '-1' }} >
        <SkeletonTheme baseColor="#DEDEDE" highlightColor="#EEEEEE" >
          <div className="individual-spots">
            <Skeleton className="spot-image" borderRadius={15} />
            <div>
              <div className="address-star1">
                <Skeleton className="address" width={120} />
                <Skeleton className="spot-star" width={50} />
              </div>
              <Skeleton width={80} />
            </div>
          </div>
        </SkeletonTheme>
      </div>
    ))
  }

  //NAVBAR ON SCROLL
  const nav = document.querySelector('.nav-wrapper-1');

  if (nav) {
    window.addEventListener('scroll', () => {
      const top = window.scrollY > 20;
      if (top) {
        nav.style.borderBottom = '1px solid #ebebeb';
        nav.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
      } else {
        nav.style.borderBottom = 'none';
        nav.style.boxShadow = 'none';
      }
    });
  }

  //CONDITIONS FOR FILTERED SPOTS DISPLAYING
  let allSpotDetails;
  if (filteredArr.length > 0) {
    allSpotDetails = filteredArr.slice(0, cardsLoading).map(spot => {
      return (
        <div className="all-spot">
          <NavLink className="spots" to={`spots/${spot.id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className="individual-spots">
              <div>
                <img className="spot-image"
                  key={spot.previewImage}
                  src={spot.previewImage ? spot.previewImage : 'https://imgur.com/WghnM0b.png'}
                  onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}
                  alt={spot.previewImage}
                />
              </div>

              <div className="spot-info">
                <div className="address-star">
                  <div className="address" key={spot.name}>{spot.city}, {spot.state}</div>
                  <span className="spot-star">
                    <i className="fa-solid fa-paw"></i>
                    &nbsp;
                    {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
                  </span>

                </div>
                <div className="price">
                  <strong>
                    ${spot.price}
                  </strong>
                  &nbsp;
                  night
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      )
    })
  } else if (filterSpot === "All") {
    allSpotDetails = allSpotsArr.slice(0, cardsLoading).map(spot => {
      return (
        <div className="all-spot">
          <NavLink className="spots" to={`spots/${spot.id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className="individual-spots">
              <div>
                <img className="spot-image"
                  key={spot.previewImage}
                  src={spot.previewImage ? spot.previewImage : 'https://imgur.com/WghnM0b.png'}
                  onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}
                  alt={spot.previewImage}
                />
              </div>

              <div className="spot-info">
                <div className="address-star">
                  <div className="address" key={spot.name}>{spot.city}, {spot.state}</div>
                  <span className="spot-star">
                    <i className="fa-solid fa-paw"></i>
                    &nbsp;
                    {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
                  </span>
                </div>
                <div className="price">
                  <strong>
                    ${spot.price}
                  </strong>
                  &nbsp;
                  night
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      )
    })
  } else {
    allSpotDetails = (
      <div>
        {isLoaded &&
          <div className="nav-no-spot">
            <img
              className="nav-no-spot-img"
              alt="no-spot-meow"
              src="https://drive.google.com/uc?export=view&id=1j_TgRhozzklKVuQfq1OVo3eBRXGPai3K" title="Meowbnb logo" />
            <h4 className="no-spot"> No listing yet.. </h4>
          </div>
        }
      </div>
    )
  }



  return (
    <div>
      <div className="nav-wrapper-1">
        <div className='nav-place'>
          <div className={filterSpot === "All" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("All")}>
            <img className="nav-place-img" src="https://imgur.com/9aXhDUr.png" alt="nav filter" />
            <div>All</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Play zone" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Play zone")}>
            <img className="nav-place-img" src="https://imgur.com/bboPy36.png" alt="nav filter" />
            <div>Play zone</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Sleep-only" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Sleep-only")}>
            <img className="nav-place-img" src="https://imgur.com/hpmirKZ.png" alt="nav filter" />
            <div>Sleep-only</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Tree" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Tree")}>
            <img className="nav-place-img" src="https://imgur.com/xgffVdE.png" alt="nav filter" />
            <div>Tree </div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Box" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Box")}>
            <img className="nav-place-img" src="https://imgur.com/7oxOZy7.png" alt="nav filter" />
            <div>Box</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "No human" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("No human")}>
            <img className="nav-place-img" src="https://imgur.com/cIIP3LF.png" alt="nav filter" />
            <div>No human</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Furball" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Furball")}>
            <img className="nav-place-img" src="https://imgur.com/B2UcvKy.png" alt="nav filter" />
            <div>Furball</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "Catnip" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Catnip")}>
            <img className="nav-place-img" src="https://imgur.com/u6LVB8Y.png" alt="nav filter" />
            <div>Catnip</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "Shared" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Shared")}>
            <img className="nav-place-img" src="https://imgur.com/atditdJ.png" alt="nav filter" />
            <div>Shared</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Petting home" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Petting home")}>
            <img className="nav-place-img" src="https://imgur.com/XIsDXKA.png" alt="nav filter" />
            <div>Petting home</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Nature" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Nature")}>
            <img className="nav-place-img" src="https://imgur.com/SGK10E3.png" alt="nav filter" />
            <div>Nature</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "No-meows-land" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("No-meows-land")}>
            <img className="nav-place-img" src="https://imgur.com/uQOxjcy.png" alt="nav filter" />
            <div>No-meows-land</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Snacks" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Snacks")}>
            <img className="nav-place-img" src="https://imgur.com/UQ1veNy.png" alt="nav filter" />
            <div>Snacks</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Evil" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Evil")}>
            <img className="nav-place-img" src="https://imgur.com/f0dNDBx.png" alt="nav filter" />
            <div>Evil</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Others" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Others")}>
            <img className="nav-place-img" src="https://imgur.com/zgtELKc.png" alt="nav filter" />
            <div>Others</div>
            <div className="nav-place-underline"></div>
          </div>

        </div>
      </div>
      <div className={filterSpot === "All" ? "all-spot-display" : filteredArr.length > 0 ? "all-spot-display" : "no-spot-display"}>
        {isLoaded && allSpotDetails}
        {isLoaded && cardSkeleton(allSpotsArr.length - cardsLoading)}
      </div>
      <div className="all-spot-footer-wrapper">
        <div className="all-spot-footer">
          <div className="all-spot-footer-left">
            <div>© 2023 Meowbnb, Inc. &nbsp;&nbsp;·&nbsp;&nbsp;</div>
            <a className="proj-directory" href="https://github.com/keshao728/Meowbnb" target="_blank" rel="noreferrer">
              Project Github
            </a>
          </div>
          <div className="dev-socials">
            <div className="dev-socials-links">
              <a href="https://github.com/keshao728" className="dev-link" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i></a>
            </div>

            <div className="dev-socials-links">
              <a href="https://www.linkedin.com/in/keyingshao/" className="dev-link" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotBrowser
