import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentSpots, deleteSpot } from "../../store/spots"
import { NavLink, Redirect } from "react-router-dom"

const UserSpots = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => Object.values(state.spots))
  console.log("ALL SPOTTTTTT", allSpots)


  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCurrentSpots())
  }, [dispatch])

  if (!allSpots || !allSpots.length) {
    return <h2> MEOWMEOW No Spots </h2>
}

  if (!sessionUser) return <Redirect to="/" />


  const deleteUserSpot = async (spot) => {
    await dispatch(deleteSpot(spot))
  }

  const spotDetails = allSpots.map(spot => {
    return (
      <div className="all-spot">
        <NavLink className="spots" to={`spots/${spot.id}`}>
          <div className="individual-spots">
            <div>
              <img className="spot-image" key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
            </div>
            <div className="spot-info">
              <div className="address-star" key={spot.name}>{spot.city}, {spot.state}
                <span className="spot-star">
                  <i class="fa-solid fa-star"></i>
                  &nbsp;
                  {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
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
        {/* should i put edit here too? */}
        <div>
          <button className="delete"
            onClick={() => deleteUserSpot(spot.id)}>
            Delete
          </button>
        </div>
      </div>
    )
  })


  return (
    <div>
      {spotDetails}
    </div>
  )
}

export default UserSpots
