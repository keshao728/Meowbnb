import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"

const SpotBrowser = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => Object.values(state.spots))
  // console.log("------------------------", state.spots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const allSpotDetails = allSpots.map(spot => {
    return (
      <NavLink to={`spots/${spot.id}`}>
        <div>
          <div>
            <img src={spot.previewImage} alt={spot.previewImage} />
          </div>
          {/* <div>{spot.name}</div> */}
          {/* <div>{spot.aveRating}</div> */}
          <div>{spot.city}, {spot.country}
            <span>
              {spot.avgRating}
            </span>
          </div>
          <div>{spot.country}</div>
          <div>{spot.price}</div>
        </div>
      </NavLink>
    )
  })



  return (
    <div>
      {allSpotDetails}
    </div>
  )
}

export default SpotBrowser
