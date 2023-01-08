import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCurrentSpots, deleteSpot } from "../../store/spots"
import { locationReviewsThunk, resetData } from "../../store/reviews"
import { NavLink, Redirect } from "react-router-dom"
import * as moment from 'moment';
import "./UserSpots.css"

const UserSpots = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => state.spots.allSpots)
  const allSpotsArr = Object.values(allSpots)
  const { spotId } = useParams()
  // console.log("USERSPOT SPOTID", spotId)


  // const testSpots = useSelector(state => state.spots)
  // console.log('this is a test', testSpots)

  // const allReviewsArr = useSelector(state => Object.values(state.reviews.spot));
  // const allReviews = useSelector(state => state);
  // console.log("this is all my reviews in UserSpot Component", allReviews)

  // const allReviewsArr = Object.values(allReviews)
  // console.log("this is ARR of all review in Userspot Component", allReviewsArr)
  const sessionUser = useSelector(state => state.session.user)


  // console.log(allReviewsArr)

  useEffect(() => {
    dispatch(getCurrentSpots())
    dispatch(locationReviewsThunk(spotId))
    return (() => dispatch(resetData()))
  }, [dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const ownedSpots = allSpotsArr?.filter((spot) => spot.ownerId === sessionUser.id);
  // console.log('Owned Spot - UserSpots Component', ownedSpots)

  // if (!ownedSpots || !ownedSpots.length) {
  //   return <h2 className="no-spot"> MEOWMEOW No Spots! </h2>
  // }



  // const deleteUserSpot = async (spotId) => {
  //   await dispatch(deleteSpot(spotId))
  // }

  return (
    <div className="user-spots-mother">
      <div className="message-spot-mother">
        <div className="message-spot-container">
          <div className="user-spot-message">Welcome, {sessionUser.username}!</div>
          {allSpotsArr && <div className="user-spot-your-spot">Your spots</div>}
        </div>
      </div>
      <div className="spot-mother">
          <div className="no-spot-mother">
            {allSpotsArr < 1 && (<img className="no-spot-meow" alt="no-spot-meow" src="https://drive.google.com/uc?export=view&id=1j_TgRhozzklKVuQfq1OVo3eBRXGPai3K" title="Meowbnb logo" />)}
            {allSpotsArr < 1 && <h4 className="no-spot"> No listing yet.. </h4>}
          </div>
        {ownedSpots?.map((spot) => (
          <div className="all-owned-spot">
            <NavLink className="user-spots" to={`/spots/${spot.id}`}>
              <div className="user-spots-left">
                <img className="user-spot-image" key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
              </div>

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
                  {spot.avgStarRating > 0 ? Number(spot.avgStarRating).toFixed(2) : 'New'}
                </div>
              </div>

              <div>{moment(spot.createdAt).fromNow()}</div>

              <div className="user-spot-buttons">
                <NavLink to={`/spots/${spot.id}/edit`}>
                  <button className="delete-edit">
                    Edit
                  </button>
                </NavLink>
                {/* <button className="logout-button" onClick={() => history.push('/my-spots')}>My Spot</button> */}
                <button className="delete-edit"
                  onClick={() => dispatch(deleteSpot(spot.id))}>
                  Delete
                </button>
              </div>

            </NavLink>

          </div>
        ))}
      </div>
    </div>
  )
}

export default UserSpots
