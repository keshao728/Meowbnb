import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import './SpotBrowser.css'

const SpotBrowser = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => Object.values(state.spots))
  // console.log("------------------------", state.spots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const allSpotDetails = allSpots.map(spot => {
    return (
      <div className="all-spot">
        <NavLink className="spots" to={`spots/${spot.id}`}>
          <div className="individual-spots">
            <div>
              <img className="spot-image" src={spot.previewImage} alt={spot.previewImage} />
            </div>
            <div className="spot-info">
              <div className="address-star">{spot.city}, {spot.state}
                <span className="spot-star">
                  <i class="fa-solid fa-star"></i>
                  &nbsp;
                  {spot.avgRating > 0 ? spot.avgRating : 'New'}
                </span>
              </div>
              <div>
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
