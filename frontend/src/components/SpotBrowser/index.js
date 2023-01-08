import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import './SpotBrowser.css'

const SpotBrowser = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => state.spots.allSpots)
  // dont put object.values in useSelector bc it always changes
  // console.log("------------------------", state.spots)
  // console.log("ADDDDDD SPOTTTTTT", allSpots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const allSpotDetails = Object.values(allSpots).map(spot => {
    return (
      <div className="all-spot">
        <NavLink className="spots" to={`spots/${spot.id}`}>
          <div className="individual-spots">
            <div>
              <img className="spot-image"
                key={spot.previewImage}
                src={spot.previewImage ? spot.previewImage : 'https://imgur.com/WghnM0b.png'}
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



  return (
    <div className="all-spot-display">
      {allSpotDetails}
    </div>
  )
}

export default SpotBrowser
