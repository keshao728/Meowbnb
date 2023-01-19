import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import './SpotBrowser.css'

const SpotBrowser = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => state.spots.allSpots)
  const allSpotsArr = Object.values(allSpots)
  // dont put object.values in useSelector bc it always changes
  // console.log("------------------------", state.spots)
  // console.log("ADDDDDD SPOTTTTTT", allSpots)
  const [filterSpot, setFilterSpot] = useState("")
  // const [finalSpot, setFinalSpot] = useState([])

  // useEffect(() => {
  //   const filteredArr = allSpotsArr.filter(spot => spot.place.includes(filterSpot));
  //   setFinalSpot(filteredArr)
  // })

  // console.log("FILTERED PLACES", finalSpot)


  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const filteredArr = allSpotsArr.filter(spot => spot.place.includes(filterSpot));

  // setFinalSpot(filteredArr)
  // console.log(filteredArr, "GODDAMIT")
  // console.log(allSpotsDisplay, "SHIBA")

  // if (filteredArr) {
  //   sessionLinks = (
  //     <div>
  //       {filteredArr.map(spot => {
  //           <div className="all-spot">
  //             {/* {console.log(spot)} */}
  //             <NavLink className="spots" to={`spots/${spot.id}`}>
  //               <div className="individual-spots">
  //                 <div>
  //                   <img className="spot-image"
  //                     key={spot.previewImage}
  //                     src={spot.previewImage ? spot.previewImage : 'https://imgur.com/WghnM0b.png'}
  //                     onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}
  //                     alt={spot.previewImage}
  //                   />
  //                 </div>
  //                 <div className="spot-info">
  //                   <div className="address-star">
  //                     <div className="address" key={spot.name}>{spot.city}, {spot.state}</div>
  //                     <span className="spot-star">
  //                       <i className="fa-solid fa-paw"></i>
  //                       &nbsp;
  //                       {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
  //                     </span>
  //                   </div>
  //                   <div className="price">
  //                     <strong>
  //                       ${spot.price}
  //                     </strong>
  //                     &nbsp;
  //                     night
  //                   </div>
  //                 </div>
  //               </div>
  //             </NavLink>
  //           </div>
  //         })
  //       }
  //     </div>
  //   )
  // }

  let allSpotDetails;
  if (filteredArr.length > 0) {
    allSpotDetails = filteredArr.map(spot => {
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
    allSpotDetails = allSpotsArr.map(spot => {
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
      <div className="nav-no-spot">
        <img
          className="nav-no-spot-img"
          alt="no-spot-meow"
          src="https://drive.google.com/uc?export=view&id=1j_TgRhozzklKVuQfq1OVo3eBRXGPai3K" title="Meowbnb logo" />
        <h4 className="no-spot"> No listing yet.. </h4>
      </div>
    )
  }



  return (
    <div>
      <div className="nav-wrapper-1">
        <div className='nav-place'>
          <div className={filterSpot === "All" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("All")}>
            <img className="nav-place-img" src="https://imgur.com/9aXhDUr.png" />
            <div>All</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Play zone" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Play zone")}>
            <img className="nav-place-img" src="https://imgur.com/bboPy36.png" />
            <div>Play zone</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Sleep-only" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Sleep-only")}>
            <img className="nav-place-img" src="https://imgur.com/hpmirKZ.png" />
            <div>Sleep-only</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Tree" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Tree")}>
            <img className="nav-place-img" src="https://imgur.com/xgffVdE.png" />
            <div>Tree </div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Box" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Box")}>
            <img className="nav-place-img" src="https://imgur.com/7oxOZy7.png" />
            <div>Box</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "No human" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("No human")}>
            <img className="nav-place-img" src="https://imgur.com/cIIP3LF.png" />
            <div>No human</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Furball" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Furball")}>
            <img className="nav-place-img" src="https://imgur.com/B2UcvKy.png" />
            <div>Furball</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "Catnip" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Catnip")}>
            <img className="nav-place-img" src="https://imgur.com/u6LVB8Y.png" />
            <div>Catnip</div>
            <div className="nav-place-underline"></div>
          </div>


          <div className={filterSpot === "Shared" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Shared")}>
            <img className="nav-place-img" src="https://imgur.com/atditdJ.png" />
            <div>Shared</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Petting home" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Petting home")}>
            <img className="nav-place-img" src="https://imgur.com/XIsDXKA.png" />
            <div>Petting home</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Nature" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Nature")}>
            <img className="nav-place-img" src="https://imgur.com/SGK10E3.png" />
            <div>Nature</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "No-meows-land" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("No-meows-land")}>
            <img className="nav-place-img" src="https://imgur.com/uQOxjcy.png" />
            <div>No-meows-land</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Snacks" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Snacks")}>
            <img className="nav-place-img" src="https://imgur.com/UQ1veNy.png" />
            <div>Snacks</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Evil" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Evil")}>
            <img className="nav-place-img" src="https://imgur.com/f0dNDBx.png" />
            <div>Evil</div>
            <div className="nav-place-underline"></div>
          </div>

          <div className={filterSpot === "Others" ? "nav-individual-place nav-clicked " : 'nav-individual-place'} onClick={() => setFilterSpot("Others")}>
            <img className="nav-place-img" src="https://imgur.com/zgtELKc.png" />
            <div>Others</div>
            <div className="nav-place-underline"></div>
          </div>

        </div>
      </div>
      <div className={filterSpot === "All" ? "all-spot-display" : filteredArr.length > 0 ? "all-spot-display" : "no-spot-display"}>
        {allSpotDetails}
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
