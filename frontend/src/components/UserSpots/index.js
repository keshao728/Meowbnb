import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentSpots, deleteSpot } from "../../store/spots"
import UpdateSpotModal from "../UpdateSpot/UpdateSpotModal"
import { resetData } from "../../store/reviews"
import { NavLink, Redirect } from "react-router-dom"
import * as moment from 'moment';
import "./UserSpots.css"

const UserSpots = () => {
  const dispatch = useDispatch()
  const [id, setId] = useState()

  const allSpots = useSelector(state => state.spots.allSpots)
  const allSpotsArr = Object.values(allSpots)
  const sessionUser = useSelector(state => state.session.user)
  const ownedSpots = allSpotsArr?.filter((spot) => spot.ownerId === sessionUser.id);

  useEffect(() => {
    dispatch(getCurrentSpots())
    // dispatch(locationReviewsThunk(spotId))
    return (() => dispatch(resetData()))
  }, [dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  // const deleteUserSpot = async (spotId) => {
  //   await dispatch(deleteSpot(spotId))
  // }

  return (
    <div className="user-spots-mother">
      <div className="message-spot-mother">
        <div className="message-spot-container">
          <div className="user-welcome-host">
            <div className="user-spot-message">Welcome, {sessionUser.username}!</div>
            <NavLink className="user-host" to="/spots/create">
              + Create listing
            </NavLink>
          </div>
          {allSpotsArr && <div className="user-spot-your-spot">Your spots</div>}
        </div>
      </div>
      <div className="spot-mother">
        <div className="no-spot-mother">
          {allSpotsArr < 1 && (<img className="no-spot-meow" alt="no-spot-meow" src="https://drive.google.com/uc?export=view&id=1j_TgRhozzklKVuQfq1OVo3eBRXGPai3K" title="Meowbnb logo" />)}
          {allSpotsArr < 1 && <h4 className="no-spot"> No listing yet.. </h4>}
        </div>
        <div className="all-owned-spot-wrapper">
          {ownedSpots?.map((spot) => (
            <div className="all-owned-spot">
              <div className="all-owned-spot-container">
                <NavLink className="user-spots" to={`/spots/${spot.id}`}>
                  <div className="user-spots-left">
                    <img className="user-spot-image" key={spot?.previewImage} src={spot?.previewImage} alt={spot?.previewImage} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                  </div>

                  <div className="user-spots-texts">
                    <div className="user-spots-middle">
                      <div className="user-spot-name">{spot.name}</div>
                      <div className="user-address-star" key={spot.name}>{spot.address}, {spot.city}, {spot.state}</div>
                    </div>

                    <div className="user-price-per">
                      <strong>
                        ${spot.price}
                      </strong>
                      &nbsp;/&nbsp;night
                    </div>

                    <div className="user-spot-rating">
                      <i className="fa-solid fa-paw"></i>
                      <div>
                        {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
                      </div>
                    </div>

                    <div>{moment(spot.createdAt).fromNow()}</div>
                  </div>
                </NavLink>

                <div className="user-spot-buttons">
                  <div onClick={() => setId(spot.id)}>
                    <UpdateSpotModal id={id} />
                  </div>

                  <button className="delete-edit"
                    onClick={() => dispatch(deleteSpot(spot.id))}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSpots
